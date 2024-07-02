//
//  ControlChoiceViewController.swift
//  Lunar
//
//  Created by Alin Panaitiu on 01.10.2021.
//  Copyright © 2021 Alin. All rights reserved.
//

import Cocoa
import Combine
import Foundation

// MARK: - GradientView

final class GradientView: NSView {
    override var wantsDefaultClipping: Bool { false }
    @IBInspectable var firstColor: NSColor = .clear {
        didSet {
            updateView()
        }
    }

    @IBInspectable var secondColor: NSColor = .clear {
        didSet {
            updateView()
        }
    }

    func updateView() {
        let layer = CAGradientLayer()
        layer.colors = [firstColor, secondColor].map(\.cgColor)
        layer.startPoint = CGPoint(x: 0, y: 0)
        layer.endPoint = CGPoint(x: 0.5, y: 0.45)
        if let blur = CIFilter(name: "CIGaussianBlur", parameters: ["inputRadius": 20]) {
            layer.filters = [blur]
        }
        layer.masksToBounds = false
        self.layer = layer
    }
}

// MARK: - LunarTestViewController

final class LunarTestViewController: NSViewController {
    @IBOutlet var label: NSTextField!
    @objc dynamic var lunarTestText = "Checking Monitor"
    var taskKey = "lunarTestHighlighter"

    var lunarTestHighlighter: Repeater?

    override func viewDidAppear() {
        let end = {
            for d in DC.displays.values {
                d.testWindowController?.close()
                d.testWindowController = nil
            }
        }
        lunarTestHighlighter = Repeater(
            every: 2,
            name: taskKey,
            onFinish: end,
            onCancel: end
        ) { [weak self] in
            guard let self else {
                end()
                return
            }
            label.transition(1.5, easing: .easeInOutCubic)
            if label.textColor == .white {
                label.textColor = darkMauve
            } else {
                label.textColor = .white
            }
        }
    }

    override func viewDidLoad() {
        label.textColor = .white
    }
}

// MARK: - ControlReadResult

struct ControlReadResult {
    static var onlyBrightnessWorked = ControlReadResult(brightness: true, contrast: false, volume: false)
    static var allWorked = ControlReadResult(brightness: true, contrast: true, volume: true)
    static var noneWorked = ControlReadResult(brightness: false, contrast: false, volume: false)

    let brightness: Bool
    let contrast: Bool
    let volume: Bool

    var all: Bool { brightness && contrast }
}

// MARK: - ControlWriteResult

struct ControlWriteResult {
    static var onlyBrightnessWorked = ControlWriteResult(brightness: true, contrast: false, volume: false)
    static var allWorked = ControlWriteResult(brightness: true, contrast: true, volume: true)
    static var noneWorked = ControlWriteResult(brightness: false, contrast: false, volume: false)

    let brightness: Bool
    let contrast: Bool
    let volume: Bool

    var all: Bool { brightness && contrast }
}

// MARK: - ControlResult

struct ControlResult {
    static var onlyBrightnessWorked = ControlResult(type: .appleNative, read: .onlyBrightnessWorked, write: .onlyBrightnessWorked)
    static var allWorked = ControlResult(type: .ddc, read: .allWorked, write: .allWorked)
    static var noneWorked = ControlResult(type: .ddc, read: .noneWorked, write: .noneWorked)

    let type: DisplayControl
    let read: ControlReadResult
    let write: ControlWriteResult

    var all: Bool { read.all && write.all }
}

// MARK: - ControlChoiceViewController

final class ControlChoiceViewController: NSViewController {
    var cancelled = false
    @IBOutlet var displayImage: DisplayImage?

    @IBOutlet var _controlButton: NSButton!
    @IBOutlet var _ddcBlockersButton: NSButton!
    @IBOutlet var actionLabel: NSTextField!
    @IBOutlet var actionInfo: NSTextField!
    @IBOutlet var displayName: DisplayName!
    @IBOutlet var brightnessField: ScrollableTextField!
    @IBOutlet var contrastField: ScrollableTextField!

    @IBOutlet var brightnessCaption: NSTextField!
    @IBOutlet var contrastCaption: NSTextField!

    @IBOutlet var brightnessReadResult: NSTextField!
    @IBOutlet var contrastReadResult: NSTextField!
    @IBOutlet var volumeReadResult: NSTextField!

    @IBOutlet var brightnessWriteResult: NSTextField!
    @IBOutlet var contrastWriteResult: NSTextField!
    @IBOutlet var volumeWriteResult: NSTextField!

    @IBOutlet var volumeSlider: VolumeSlider!
    @IBOutlet var actionButton: Button!
    @IBOutlet var noButton: Button!
    @IBOutlet var yesButton: Button!
    @IBOutlet var skipButton: Button!

    var observers: Set<AnyCancellable> = []

    @objc dynamic var progress = 0.0
    @objc dynamic var volume: Double = 50

    var actionLabelColor = white.blended(withFraction: 0.2, of: lunarYellow)
    var actionInfoColor = white

    var wakeObserver: Cancellable?
    var screenObserver: Cancellable?

    var semaphore = DispatchSemaphore(value: 0, name: "Control Choice")
    var currentDisplay: Display?

    var displayProgressStep: Double = 0
    var controlProgressStep: Double = 0
    var progressForLastDisplay: Double = 0
    var progressForDisplay: Double = 0

    var didAppear = false

    var controlButton: HelpButton? { _controlButton as? HelpButton }
    var ddcBlockersButton: OnboardingHelpButton? { _ddcBlockersButton as? OnboardingHelpButton }

    func info(_ text: String, color: NSColor) {
        mainThread {
            actionLabel.stringValue = text
            actionLabel.transition(0.9, easing: .easeOutCubic)
            actionLabel.textColor = color
        }
        mainAsyncAfter(ms: 1000) { [weak self] in
            guard let self else { return }
            actionLabel.transition(1.0, easing: .easeOutCubic)
            actionLabel.textColor = actionLabelColor
        }
    }

    func hideAction() {
        mainThread {
            if let ddcBlockersButton {
                ddcBlockersButton.transition(0.8, easing: .easeOutExpo)
                ddcBlockersButton.alphaValue = 0.0
                ddcBlockersButton.close()
                ddcBlockersButton.isEnabled = false
                ddcBlockersButton.isHidden = true
            }

            actionInfo.transition(0.8, easing: .easeOutExpo)
            actionInfo.alphaValue = 0.0

            actionButton.transition(0.8, easing: .easeOutExpo)
            actionButton.alphaValue = 0.0
            actionButton.isEnabled = false
            actionButton.onClick = nil
        }
    }

    func hideQuestion() {
        mainThread {
            if let ddcBlockersButton {
                ddcBlockersButton.transition(0.8, easing: .easeOutExpo)
                ddcBlockersButton.alphaValue = 0.0
                ddcBlockersButton.close()
                ddcBlockersButton.isEnabled = false
                ddcBlockersButton.isHidden = true
            }

            actionInfo.transition(0.8, easing: .easeOutExpo)
            actionInfo.alphaValue = 0.0

            noButton.transition(0.8, easing: .easeOutExpo)
            noButton.alphaValue = 0.0
            noButton.isEnabled = false
            noButton.onClick = nil

            yesButton.transition(0.8, easing: .easeOutExpo)
            yesButton.alphaValue = 0.0
            yesButton.isEnabled = false
            yesButton.onClick = nil
        }
    }

    func waitForAction(_ text: String, buttonColor: NSColor, buttonText: NSAttributedString, action: @escaping (() -> Void)) {
        mainAsyncAfter(ms: 1100) { [weak self] in
            guard let self else { return }
            actionInfo.transition(0.5, easing: .easeInOutExpo)
            actionInfo.textColor = actionInfoColor
        }

        mainThread {
            actionInfo.stringValue = text
            actionInfo.transition(0.8, easing: .easeOutCubic)
            actionInfo.alphaValue = 1.0
            actionInfo.transition(1.0, easing: .easeOutCubic)
            actionInfo.textColor = peach

            actionButton.bg = buttonColor
            actionButton.attributedTitle = buttonText
            actionButton.isEnabled = true
            actionButton.transition(0.8, easing: .easeOutCubic)
            actionButton.alphaValue = 1.0
        }
        actionButton.onClick = { [weak self] in
            log.info("Clicked '\(buttonText.string)' on '\(text)'")
            guard let self else {
                self?.semaphore.signal()
                return
            }
            semaphore.signal()
            hideAction()
        }
        semaphore.wait(for: 0)
        guard !cancelled else { return }
        action()
    }

    func askQuestion(
        _ question: String,
        yesButtonText: String = "Yes",
        noButtonText: String = "No",
        ddcBlockerText: String? = nil,
        answer: @escaping ((Bool) -> Void)
    ) {
        mainAsyncAfter(ms: 1100) { [weak self] in
            guard let self else { return }
            actionInfo.transition(0.8, easing: .easeOutCubic)
            actionInfo.textColor = actionInfoColor
        }

        mainThread {
            actionInfo.stringValue = question
            actionInfo.transition(0.8, easing: .easeOutCubic)
            actionInfo.alphaValue = 1.0
            actionInfo.transition(1.0, easing: .easeOutCubic)
            actionInfo.textColor = peach

            noButton.transition(0.8, easing: .easeOutCubic)
            noButton.alphaValue = 1.0
            noButton.isEnabled = true
            noButton.attributedTitle = noButtonText.withTextColor(white)

            yesButton.transition(0.8, easing: .easeOutCubic)
            yesButton.alphaValue = 1.0
            yesButton.isEnabled = true
            yesButton.attributedTitle = yesButtonText.withTextColor(white)

            if let ddcBlockerText, let ddcBlockersButton {
                ddcBlockersButton.helpText = ddcBlockerText
                ddcBlockersButton.isEnabled = true
                ddcBlockersButton.isHidden = false
                ddcBlockersButton.transition(0.8, easing: .easeOutCubic)
                ddcBlockersButton.alphaValue = 1.0
                ddcBlockersButton.open(edge: .maxX)
            }
        }
        var answerResult = false
        noButton.onClick = { [weak self] in
            log.info("Answered 'no' to '\(question)'")
            guard let self else {
                self?.semaphore.signal()
                return
            }

            answerResult = false
            semaphore.signal()
            hideQuestion()
        }
        yesButton.onClick = { [weak self] in
            log.info("Answered 'yes' to '\(question)'")
            guard let self else {
                self?.semaphore.signal()
                return
            }
            answerResult = true
            semaphore.signal()
            hideQuestion()
        }
        semaphore.wait(for: 0)
        guard !cancelled else { return }
        answer(answerResult)
    }

    func setBrightness(_ brightness: Brightness) {
        mainThread {
            if brightnessField.alphaValue == 0 {
                brightnessField.transition(1.0, easing: .easeOutExpo)
                brightnessField.alphaValue = 1.0
                brightnessCaption.transition(1.0, easing: .easeOutExpo)
                brightnessCaption.alphaValue = 1.0
            }
        }
        for br in stride(
            from: brightnessField.integerValue,
            through: brightness.i,
            by: brightnessField.integerValue < brightness.i ? 1 : -1
        ) {
            mainThread { brightnessField.integerValue = br }
            guard wait(0.01) else { return }
        }
    }

    func setContrast(_ contrast: Contrast) {
        mainThread {
            if contrastField.alphaValue == 0 {
                contrastField.transition(1.0, easing: .easeOutExpo)
                contrastField.alphaValue = 1.0
                contrastCaption.transition(1.0, easing: .easeOutExpo)
                contrastCaption.alphaValue = 1.0
            }
        }

        for cr in stride(from: contrastField.integerValue, through: contrast.i, by: contrastField.integerValue < contrast.i ? 1 : -1) {
            mainThread { contrastField.integerValue = cr }
            guard wait(0.01) else { return }
        }
    }

    func setControl(_ control: DisplayControl, display: Display) {
        mainThread {
            guard !cancelled, let button = controlButton else { return }

            switch control {
            case .appleNative:
                button.bg = .clear
                button.attributedTitle = "Using Apple Native Protocol".withTextColor(green)
                button.helpText = NATIVE_CONTROLS_HELP_TEXT
            case .ddc:
                button.bg = .clear
                button.attributedTitle = "Using DDC Protocol".withTextColor(peach)
                button.helpText = HARDWARE_CONTROLS_HELP_TEXT
            case .network:
                button.bg = .clear
                button.attributedTitle = "Using DDC-over-Network Protocol".withTextColor(blue.highlight(withLevel: 0.2) ?? blue)
                button.helpText = NETWORK_CONTROLS_HELP_TEXT
            case .gamma:
                display.enabledControls[.gamma] = true
                button.bg = .clear
                if display.supportsGamma {
                    button.attributedTitle = "Using Gamma Approximation".withTextColor(red)
                    button.helpText = SOFTWARE_CONTROLS_HELP_TEXT
                } else {
                    button.attributedTitle = "Using Dark Overlay".withTextColor(red)
                    button.helpText = SOFTWARE_OVERLAY_HELP_TEXT
                }
            default:
                break
            }

            button.isEnabled = true
            button.isHidden = false
            button.transition(1.0, easing: .easeOutExpo)
            button.alphaValue = 1.0
        }
    }

    func setVolume(_ volume: UInt16) {
        mainThread {
            if volumeSlider.alphaValue == 0 {
                volumeSlider.isEnabled = true
                volumeSlider.isHidden = false
                volumeSlider.transition(1.0, easing: .easeOutExpo)
                volumeSlider.alphaValue = 1.0
            }
        }

        for vol in stride(from: self.volume.i, through: volume.i, by: self.volume.i < volume.i ? 4 : -4) {
            mainThread { self.volume = vol.d }
            guard wait(0.02) else { return }
        }
    }

    func setResult(_ resultControl: NSTextField, text: String, color: NSColor, transitionSpeed: TimeInterval = 1.5, alpha: Double = 1.0) {
        mainThread {
            resultControl.stringValue = text
            resultControl.textColor = color
            resultControl.transition(transitionSpeed)
            resultControl.alphaValue = alpha
        }
    }

    func testControl(_ control: Control, for display: Display) -> ControlResult {
        hideDisplayValues()
        hideAction()
        hideQuestion()

        let readWorked = testControlRead(control, for: display)
        setControlProgress(0.5)
        guard wait(1) else { return .allWorked }

        guard readWorked.all else {
            info("", color: peach)
            // var writeWorked = ControlWriteResult.noneWorked
            // waitForAction(
            //     "Reading didn't work for some values\nWrite the missing values manually and click the Continue button",
            //     buttonColor: lunarYellow, buttonText: "Continue".withTextColor(mauve)
            // ) { [weak self] in
            //     guard let self else { return }
            //     writeWorked = self.testControlWrite(control, for: display)
            // }
            let writeWorked = testControlWrite(control, for: display)
            return ControlResult(type: control.displayControl, read: readWorked, write: writeWorked)
        }

        info("Starting write tests", color: peach)
        guard wait(3) else { return .allWorked }
        let writeWorked = testControlWrite(control, for: display)
        return ControlResult(type: control.displayControl, read: readWorked, write: writeWorked)
    }

    func testControlWrite(_ control: Control, for display: Display) -> ControlWriteResult {
        // #if DEBUG
        //     return .noneWorked
        // #endif

        let currentBrightness: UInt16 = brightnessField.integerValue == 0 ? 50 : brightnessField.integerValue.u16
        let currentContrast: UInt16 = contrastField.integerValue == 0 ? 50 : contrastField.integerValue.u16
        let currentVolume: UInt16 = volume == 0 ? 50 : volume.u16
        var brightnessWriteWorked = false
        var contrastWriteWorked = false
        var volumeWriteWorked = false

        if let control = control as? DDCControl {
            control.ignoreFaults = true
        }
        defer {
            if let control = control as? DDCControl {
                control.ignoreFaults = false
            }
        }

        let setWriteProgress = { value in self.setControlProgress(0.5 + (0.5 * value)) }
        info("Writing brightness", color: peach)
        setWriteProgress(0.1)
        guard wait(1.1) else { return .allWorked }

        display.withBrightnessTransition(.slow) {
            display.enabledControls[control.displayControl] = true

            var newBr: UInt16 = currentBrightness != 0 ? (control.isSoftware ? 25 : 0) : 50
            var oldBr: UInt16 = currentBrightness
            let write1Worked = control.setBrightness(
                newBr,
                oldValue: oldBr,
                force: true, transition: .smooth,
                onChange: { [weak self] br in self?.setBrightness(br) }
            )
            if control.isSoftware, !display.supportsGamma {
                setBrightness(newBr)
            }
            guard wait(4) else { return }
            setWriteProgress(0.15)

            oldBr = newBr
            newBr = 75
            let write2Worked = control.setBrightness(
                newBr,
                oldValue: oldBr,
                force: true, transition: .smooth,
                onChange: { [weak self] br in self?.setBrightness(br) }
            )
            if control.isSoftware, !display.supportsGamma {
                setBrightness(newBr)
            }
            guard wait(4) else { return }
            setWriteProgress(0.2)

            oldBr = newBr
            newBr = control.isSoftware ? 100 : 67
            let write3Worked = control.setBrightness(
                newBr,
                oldValue: oldBr,
                force: true, transition: .smooth,
                onChange: { [weak self] br in self?.setBrightness(br) }
            )
            if control.isSoftware, !display.supportsGamma {
                setBrightness(newBr)
            }
            brightnessWriteWorked = (write1Worked.i + write2Worked.i + write3Worked.i) >= 2
            setWriteProgress(0.25)
        }

        guard !control.isSoftware || display.supportsGamma else {
            setContrast(100)
            setVolume(50)

            setResult(contrastWriteResult, text: "Write not supported", color: peach)
            setResult(volumeWriteResult, text: "Write not supported", color: peach)

            return ControlWriteResult(brightness: true, contrast: false, volume: false)
        }

        if brightnessWriteWorked {
            setResult(brightnessWriteResult, text: "Write seemed to work", color: peach)
            askQuestion(
                control.isSoftware
                    ? "Was there any change in brightness on the tested display?"
                    : "Was there any change in brightness on the tested display?\nThe brightness value in the monitor settings should now be set to 67"
            ) { [weak self] itWorked in
                guard let self else { return }
                if itWorked {
                    setResult(brightnessWriteResult, text: "Write worked", color: green)
                } else {
                    brightnessWriteWorked = false
                    setResult(brightnessWriteResult, text: "Failed to write", color: red)
                }
            }
        } else {
            setResult(brightnessWriteResult, text: "Failed to write", color: red)
        }
        guard wait(1.1) else { return .allWorked }

        guard !control.isSoftware else {
            setContrast(100)
            setVolume(50)

            setResult(contrastWriteResult, text: "Write not supported", color: peach)
            setResult(volumeWriteResult, text: "Write not supported", color: peach)

            return ControlWriteResult(brightness: true, contrast: false, volume: false)
        }

        setWriteProgress(0.3)
        info("Writing contrast", color: peach)
        guard wait(1.1) else { return .allWorked }

        display.withBrightnessTransition {
            setWriteProgress(0.35)

            var newCr: UInt16 = currentContrast != 0 ? 0 : 50
            var oldCr: UInt16 = currentContrast
            let write1Worked = control.setContrast(
                newCr,
                oldValue: oldCr,
                transition: .smooth,
                onChange: { [weak self] br in self?.setContrast(br) }
            )
            guard wait(4) else { return }
            setWriteProgress(0.4)

            oldCr = newCr
            newCr = 75
            let write2Worked = control.setContrast(
                newCr,
                oldValue: oldCr,
                transition: .smooth,
                onChange: { [weak self] br in self?.setContrast(br) }
            )
            guard wait(4) else { return }
            setWriteProgress(0.45)

            oldCr = newCr
            newCr = 67
            let write3Worked = control.setContrast(
                newCr,
                oldValue: oldCr,
                transition: .smooth,
                onChange: { [weak self] br in self?.setContrast(br) }
            )
            contrastWriteWorked = (write1Worked.i + write2Worked.i + write3Worked.i) >= 2
            setWriteProgress(0.5)
        }

        if contrastWriteWorked {
            setResult(contrastWriteResult, text: "Write seemed to work", color: peach)
            askQuestion(
                "Was there any change in contrast on the tested display?\nThe contrast value in the monitor settings should now be set to 67"
            ) { [weak self] itWorked in
                guard let self else { return }
                if itWorked {
                    setResult(contrastWriteResult, text: "Write worked", color: green)
                } else {
                    contrastWriteWorked = false
                    setResult(contrastWriteResult, text: "Failed to write", color: red)
                }
            }
        } else {
            setResult(contrastWriteResult, text: "Failed to write", color: red)
        }
        guard wait(1.1) else { return .allWorked }

        setWriteProgress(0.55)
        info("Writing volume", color: peach)
        guard wait(1.1) else { return .allWorked }

        setVolume(0)
        let write1Worked = control.setVolume(0)
        guard wait(1) else { return .allWorked }
        setWriteProgress(0.6)

        setVolume(75)
        let write2Worked = control.setVolume(75)
        guard wait(1) else { return .allWorked }
        setWriteProgress(0.65)

        setVolume(23)
        let write3Worked = control.setVolume(23)
        volumeWriteWorked = (write1Worked.i + write2Worked.i + write3Worked.i) >= 2
        setWriteProgress(0.7)

        if volumeWriteWorked {
            setResult(volumeWriteResult, text: "Write seemed to work", color: peach)
            askQuestion(
                "Was there any change in volume on the tested display?\nThe volume value in the monitor settings should now be set to 23"
            ) { [weak self] itWorked in
                guard let self else { return }
                if itWorked {
                    setResult(volumeWriteResult, text: "Write worked", color: white)
                } else {
                    volumeWriteWorked = false
                    setResult(volumeWriteResult, text: "Failed to write", color: peach)
                }
            }
        } else {
            setResult(volumeWriteResult, text: "Failed to write", color: red)
        }
        guard wait(1.1) else { return .allWorked }

        setWriteProgress(0.8)
        info("Setting values before test", color: peach)
        guard wait(2) else { return .allWorked }

        _ = control.setBrightness(currentBrightness, oldValue: nil, force: true, transition: .smooth, onChange: nil)
        setBrightness(currentBrightness)
        setWriteProgress(0.85)
        guard wait(0.5) else { return .allWorked }

        _ = control.setContrast(currentContrast, oldValue: nil, transition: .smooth, onChange: nil)
        setContrast(currentContrast)
        setWriteProgress(0.9)
        guard wait(0.5) else { return .allWorked }

        _ = control.setVolume(currentVolume)
        setVolume(currentVolume)
        setWriteProgress(0.95)
        guard wait(0.5) else { return .allWorked }

        return ControlWriteResult(brightness: brightnessWriteWorked, contrast: contrastWriteWorked, volume: volumeWriteWorked)
    }

    func wait(_ seconds: TimeInterval) -> Bool {
        // #if DEBUG
        //     return !cancelled
        // #endif

        Thread.sleep(forTimeInterval: seconds)
        return !cancelled
    }

    func testControlRead(_ control: Control, for _: Display) -> ControlReadResult {
        var brightnessReadWorked = false
        var contrastReadWorked = false
        var volumeReadWorked = false

        let setReadProgress = { value in self.setControlProgress(0.5 * value) }

        guard !control.isSoftware else {
            setBrightness(100)
            setContrast(100)
            setVolume(50)

            setResult(brightnessReadResult, text: "Read not supported", color: peach)
            setResult(contrastReadResult, text: "Read not supported", color: peach)
            setResult(volumeReadResult, text: "Read not supported", color: peach)

            return .allWorked
        }

        info("Reading brightness", color: peach)
        guard wait(1.1) else { return .allWorked }
        var brightnessThatWasRead: UInt16 = 0
        if let br = (control.getBrightness() ?? control.getBrightness()), !(control is AppleNativeControl) || br <= 100 {
            brightnessReadWorked = true
            setBrightness(br)
            brightnessThatWasRead = br
            guard wait(1.1) else { return .allWorked }
            setReadProgress(0.15)

            setResult(brightnessReadResult, text: "Read worked", color: green)
            guard wait(1.1) else { return .allWorked }
            let _ = control.setBrightness(br, oldValue: nil, force: true, transition: .instant, onChange: nil)
        } else {
            setBrightness(0)
            guard wait(1.1) else { return .allWorked }
            setReadProgress(0.15)

            // setResult(brightnessReadResult, text: "Failed to read", color: red)
            guard wait(1.1) else { return .allWorked }
        }
        setReadProgress(0.33)

        info("Reading contrast", color: peach)
        guard wait(1.1) else { return .allWorked }
        if let cr = (control.getContrast() ?? control.getContrast()) {
            contrastReadWorked = true
            setContrast(cr)
            guard wait(1.1) else { return .allWorked }
            setReadProgress(0.45)

            setResult(contrastReadResult, text: "Read worked", color: green)
            guard wait(1.1) else { return .allWorked }
            if brightnessReadWorked {
                let _ = control.setBrightness(brightnessThatWasRead, oldValue: nil, force: true, transition: .instant, onChange: nil)
            } else {
                let _ = control.setContrast(cr, oldValue: nil, transition: .instant, onChange: nil)
            }
        } else {
            setContrast(0)
            guard wait(1.1) else { return .allWorked }
            setReadProgress(0.45)

            // setResult(contrastReadResult, text: "Failed to read", color: red)
            guard wait(1.1) else { return .allWorked }
        }
        setReadProgress(0.66)

        info("Reading volume", color: peach)
        guard wait(1.1) else { return .allWorked }
        if let vol = (control.getVolume() ?? control.getVolume()) {
            volumeReadWorked = true
            setVolume(vol)
            guard wait(1.1) else { return .allWorked }
            setReadProgress(0.8)

            setResult(volumeReadResult, text: "Read worked", color: white)
            guard wait(1.1) else { return .allWorked }
        } else {
            setVolume(0)
            guard wait(1.1) else { return .allWorked }
            setReadProgress(0.8)

            // setResult(volumeReadResult, text: "Failed to read", color: peach)
            guard wait(1.1) else { return .allWorked }
        }
        setReadProgress(0.9)

        return ControlReadResult(brightness: brightnessReadWorked, contrast: contrastReadWorked, volume: volumeReadWorked)
    }

    func hideDisplayValues() {
        mainThread {
            brightnessField.transition(0.5, easing: .easeOutExpo)
            brightnessField.alphaValue = 0
            brightnessCaption.transition(0.5, easing: .easeOutExpo)
            brightnessCaption.alphaValue = 0

            contrastField.transition(0.5, easing: .easeOutExpo)
            contrastField.alphaValue = 0
            contrastCaption.transition(0.5, easing: .easeOutExpo)
            contrastCaption.alphaValue = 0

            brightnessReadResult.transition(0.5, easing: .easeOutExpo)
            brightnessReadResult.alphaValue = 0
            brightnessWriteResult.transition(0.5, easing: .easeOutExpo)
            brightnessWriteResult.alphaValue = 0

            contrastReadResult.transition(0.5, easing: .easeOutExpo)
            contrastReadResult.alphaValue = 0
            contrastWriteResult.transition(0.5, easing: .easeOutExpo)
            contrastWriteResult.alphaValue = 0

            volumeSlider.transition(0.5, easing: .easeOutExpo)
            volumeSlider.alphaValue = 0

            volumeReadResult.transition(0.5, easing: .easeOutExpo)
            volumeReadResult.alphaValue = 0
            volumeWriteResult.transition(0.5, easing: .easeOutExpo)
            volumeWriteResult.alphaValue = 0
        }
    }

    func queueChange(_ change: @escaping () -> Void) {
        mainThread {
            guard let wc = view.window?.windowController as? OnboardWindowController else {
                return
            }
            wc.changes.append(change)
        }
    }

    func next() {
        guard let wc = view.window?.windowController as? OnboardWindowController else { return }
        wc.applyChanges()
        wc.pageController?.navigateForward(self)
    }

    func showTestWindow() {
        guard let d = currentDisplay else { return }
        mainThread {
            createWindow(
                "testWindowController",
                controller: &d.testWindowController,
                screen: d.nsScreen,
                show: true,
                backgroundColor: .clear,
                level: .screenSaver,
                fillScreen: false,
                stationary: true
            )
        }
        wakeObserver = wakeObserver ?? NSWorkspace.shared.notificationCenter
            .publisher(for: NSWorkspace.screensDidWakeNotification, object: nil)
            .debounce(for: .seconds(2), scheduler: RunLoop.main)
            .sink { [weak self] _ in
                self?.showTestWindow()
            }
        screenObserver = screenObserver ?? NotificationCenter.default
            .publisher(for: NSApplication.didChangeScreenParametersNotification, object: nil)
            .debounce(for: .seconds(2), scheduler: RunLoop.main)
            .sink { [weak self] _ in
                self?.showTestWindow()
            }
    }

    func networkProblemText(_ display: Display, control _: NetworkControl) -> String {
        var url = "http://<your-rpi-ip>:3485/displays"
        if let networkController = NetworkControl.controllersForDisplay[display.serial], let controlURL = networkController.url {
            url = controlURL.deletingLastPathComponent().appendingPathComponent("displays").absoluteString
        }

        let infoDict = display.infoDictionary

        let year = (infoDict[kDisplayYearOfManufacture] as? Int64) ?? 2017
        let serial = (infoDict[kDisplaySerialNumber] as? Int64) ?? 314_041
        let product = (infoDict[kDisplayProductID] as? Int64) ?? 23304
        let vendor = (infoDict[kDisplayVendorID] as? Int64)?.s ?? "GSM"
        let name = display.edidName

        return """
        ##### If you have technical knowledge about `SSH` and `curl`, you can check the following:

        * See if the controller is reachable using this curl command: `curl \(url)`
            * You should get a response similar to the one below:

            Display 1
              I2C bus:  /dev/i2c-2
              EDID synopsis:
                 Mfg id:               \(vendor)
                 Model:                \(name)
                 Product code:         \(product)
                 Serial number:
                 Binary serial number: \(serial)
                 Manufacture year:     \(year)
                 EDID version:         1.3
              VCP version:         2.1

            * If you get `Invalid Display` try turning your monitor off then turn it on after a few seconds
            * If you get `Display not found`, make sure your Pi is running an OS with a desktop environment, and the desktop is visible when the Pi HDMI input is active
        * Check that the server is running
            * SSH into your Pi
            * Run `sudo systemctl status ddcutil-server`
        * Check if `ddcutil` can correctly identify and control your monitor
            * SSH into your Pi
            * Run `ddcutil detect` _(you should get the same response as for the `curl` command)_
            * Cycle through a few brightness values to see if there's any change:
                * `ddcutil setvcp 0x10 25`
                * `ddcutil setvcp 0x10 100`
                * `ddcutil setvcp 0x10 50`
        """
    }

    func setDisplayProgress(_ value: Double, controlStep: Double) {
        mainThread {
            progress = progressForLastDisplay + displayProgressStep * value
            controlProgressStep = controlStep
            progressForDisplay = value
        }
    }

    func setControlProgress(_ value: Double) {
        mainThread {
            progress = progressForLastDisplay + displayProgressStep * progressForDisplay + value *
                (controlProgressStep * displayProgressStep * progressForDisplay)
        }
    }

    func listenForDisplayConnections() {
        NotificationCenter.default
            .publisher(for: displayListChanged, object: nil)
            .debounce(for: .seconds(2), scheduler: RunLoop.main)
            .sink { [weak self] _ in
                self?.cancelled = true
                OnboardPageController.task?.cancel()

                log.debug("Restarting Onboarding after display list change")

                guard let w = self?.view.window else { return }

                _ = askBool(
                    message: "Display list changed",
                    info: """
                        The list of connected displays has changed
                        and the onboarding process can't continue.

                        Do you want to restart the onboarding process?
                    """,
                    okButton: "Restart Onboarding",
                    cancelButton: "Skip Onboarding",
                    window: w,
                    onCompletion: { [weak self] (restart: Bool) in
                        guard let self, let w = view.window, let wc = w.windowController as? OnboardWindowController else {
                            return
                        }

                        cancelled = true
                        OnboardPageController.task?.cancel()
                        semaphore.signal()

                        wc.changes = []
                        w.close()
                        wc.close()

                        for d in DC.displays.values {
                            d.testWindowController?.close()
                            d.testWindowController = nil
                        }

                        if restart {
                            mainAsyncAfter(ms: 1000) { appDelegate!.onboard() }
                        }
                    },
                    unique: true,
                    waitTimeout: 5.minutes
                )

            }.store(in: &observers)
    }

    override func viewDidAppear() {
        guard !didAppear else { return }
        didAppear = true
        uiCrumb("Control Tester")

        cancelled = false
        adaptiveModeDisabledByDiagnostics = false
        if DC.adaptiveModeKey != .manual {
            DC.disable()
            adaptiveModeDisabledByDiagnostics = true
        }

        listenForDisplayConnections()

        if let wc = view.window?.windowController as? OnboardWindowController {
            wc.setupSkipButton(skipButton, text: useOnboardingForDiagnostics ? "Stop Diagnostics" : nil) { [weak self] in
                self?.cancelled = true
                for d in DC.displays.values {
                    d.testWindowController?.close()
                    d.testWindowController = nil
                }

                self?.wakeObserver?.cancel()
                self?.wakeObserver = nil

                self?.screenObserver?.cancel()
                self?.screenObserver = nil

                self?.semaphore.signal()

                guard useOnboardingForDiagnostics else { return }
                self?.skipButton.isEnabled = false
                self?.skipButton.attributedTitle = "Stopping".withTextColor(.black)

                mainAsyncAfter(ms: 1500) {
                    self?.view.window?.close()
                    if adaptiveModeDisabledByDiagnostics {
                        DC.enable()
                    }
                }
            }
        }

        OnboardPageController.task = concurrentQueue.asyncAfter(ms: 10, name: ONBOARDING_TASK_KEY) { [weak self] in
            let displays = DC.externalDisplaysForTest
            guard let self, !self.cancelled, !OnboardPageController.task.isCancelled, let firstDisplay = displays.first else {
                return
            }

            mainThread {
                self.displayName.transition(0.5, easing: .easeOutExpo)
                self.displayName.alphaValue = 1.0
                self.displayName.display = firstDisplay
                self.setControl(firstDisplay.getBestControl(reapply: false).displayControl, display: firstDisplay)
            }
            waitForAction(
                "Lunar will try to read and then change the monitor brightness, contrast and volume\nIf Lunar can't revert the changes, you can do that by using the monitor's physical buttons",
                buttonColor: lunarYellow, buttonText: "Continue".withTextColor(mauve)
            ) {}

            displayProgressStep = 1.0 / displays.count.d
            for (i, d) in displays.enumerated() {
                testDisplay(d, index: i)
            }

            queueChange {
                DC.externalActiveDisplays.forEach { $0.resetControl() }
            }

            mainThread {
                for d in DC.displays.values {
                    d.testWindowController?.close()
                    d.testWindowController = nil
                }
                if useOnboardingForDiagnostics, self.cancelled { return }
                self.next()
            }
        }
    }

    func testDisplay(_ d: Display, index: Int) {
        for d in DC.displays.values {
            d.testWindowController?.close()
            d.testWindowController = nil
        }

        guard !cancelled else { return }
        progressForLastDisplay = displayProgressStep * index.d
        setDisplayProgress(0, controlStep: 0.25)
        defer { self.progress = self.displayProgressStep * (index + 1).d }

        currentDisplay = d
        // showTestWindow()
        mainThread {
            self.displayName.transition(0.5, easing: .easeOutExpo)
            self.displayName.alphaValue = 1.0
            self.displayName.display = d
        }

        let networkControl = NetworkControl(display: d)
        let appleNativeControl = AppleNativeControl(display: d)
        let ddcControl = DDCControl(display: d)
        let gammaControl = GammaControl(display: d)

        var result = ControlResult.noneWorked
        defer { d.controlResult = result }
        if appleNativeControl.isAvailable(), !cancelled {
            setControl(.appleNative, display: d)
            result = testControl(appleNativeControl, for: d)
            setDisplayProgress(0.25, controlStep: 0.25)

            if !result.write.brightness, d.isLEDCinema || d.isCinema {
                var nextStep = true
                askQuestion(
                    "On Cinema displays, you need to plug in the USB cable to get brightness controls\nYou can try that now and retry the test, or continue to the next step",
                    yesButtonText: "Next", noButtonText: "Retry"
                ) { nextStep = $0 }

                if nextStep {
                    queueChange {
                        d.enabledControls[.appleNative] = false
                        d.save()
                    }
                } else {
                    setDisplayProgress(0, controlStep: 0.25)
                    result = testControl(appleNativeControl, for: d)
                    setDisplayProgress(0.25, controlStep: 0.25)
                }
            }
        } else { setDisplayProgress(0.25, controlStep: 0.25) }

        if result.write.all {
            waitForAction(
                "The monitor is fully functional and ready to be used with Lunar",
                buttonColor: lunarYellow, buttonText: "Next step".withTextColor(mauve)
            ) {}
            return
        } else if result.write.brightness {
            waitForAction(
                "The monitor supports brightness controls and is ready to be used with Lunar",
                buttonColor: lunarYellow, buttonText: "Next step".withTextColor(mauve)
            ) {}
            return
        }

        ddcBlockersButton?.md.code.fontSize = 15
        if ddcControl.isAvailable(), !cancelled {
            setControl(.ddc, display: d)
            result = testControl(ddcControl, for: d)
            setDisplayProgress(0.5, controlStep: 0.25)

            var nextStep = false
            while !result.write.brightness, !nextStep {
                askQuestion(
                    "Some monitor settings can block brightness controls\nYou can try changing the listed settings and then retry the test",
                    yesButtonText: "Next", noButtonText: "Retry",
                    ddcBlockerText: d.possibleDDCBlockers()
                ) { nextStep = $0 }
                if nextStep {
//                    let ddcEnabled = result.write.volume || result.write.contrast
                    queueChange {
                        d.enabledControls[.ddc] = false
                        d.enabledControls[.gamma] = true
                        d.save()
                    }
                } else {
                    setDisplayProgress(0.25, controlStep: 0.25)
                    result = testControl(ddcControl, for: d)
                    setDisplayProgress(0.5, controlStep: 0.25)
                }
            }
        } else { setDisplayProgress(0.5, controlStep: 0.25) }

        if result.write.all {
            waitForAction(
                "The monitor is fully functional and ready to be used with Lunar",
                buttonColor: lunarYellow, buttonText: "Next step".withTextColor(mauve)
            ) {}
            return
        } else if result.write.brightness {
            waitForAction(
                "The monitor supports brightness controls and is ready to be used with Lunar\nUnfortunately, not all monitors support \(result.write.volume ? "contrast" : "volume") controls",
                buttonColor: lunarYellow, buttonText: "Next step".withTextColor(mauve)
            ) {}
            return
        }

        ddcBlockersButton?.md.code.fontSize = 13
        if networkControl.isAvailable(), !cancelled {
            setControl(.network, display: d)
            result = testControl(networkControl, for: d)
            setDisplayProgress(0.75, controlStep: 0.25)

            var nextStep = false
            while !result.write.brightness, !nextStep {
                askQuestion(
                    "The assigned network controller wasn't able to control this monitor",
                    yesButtonText: "Next", noButtonText: "Retry",
                    ddcBlockerText: networkProblemText(d, control: networkControl)
                ) { nextStep = $0 }
                if !nextStep {
                    setDisplayProgress(0.5, controlStep: 0.25)
                    result = testControl(ddcControl, for: d)
                    setDisplayProgress(0.75, controlStep: 0.25)
                }
            }
        } else { setDisplayProgress(0.75, controlStep: 0.1) }

        if result.write.all {
            waitForAction(
                "The monitor is fully functional and ready to be used with Lunar",
                buttonColor: lunarYellow, buttonText: "Next step".withTextColor(mauve)
            ) {}
            return
        } else if result.write.brightness {
            waitForAction(
                "The monitor supports brightness controls and is ready to be used with Lunar",
                buttonColor: lunarYellow, buttonText: "Next step".withTextColor(mauve)
            ) {}
            return
        }

        setControl(.gamma, display: d)
        result = testControl(gammaControl, for: d)
        setDisplayProgress(0.8, controlStep: 0.1)

        if d.supportsGamma, !result.write.brightness {
            d.useOverlay = true
            setControl(.gamma, display: d)
            result = testControl(gammaControl, for: d)
            setDisplayProgress(0.9, controlStep: 0.1)
        }

        waitForAction(
            "The monitor only supports software brightness dimming\nThe monitor's brightness should be set to its highest values manually using its physical buttons",
            buttonColor: lunarYellow, buttonText: "Next step".withTextColor(mauve)
        ) {}
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        hideDisplayValues()
        hideAction()
        hideQuestion()

        noButton.bg = red
        noButton.attributedTitle = "No".withTextColor(white)
        yesButton.bg = green
        yesButton.attributedTitle = "Yes".withTextColor(white)

        displayImage?.cornerRadius = 16
        displayImage?.standColor = peach
        displayImage?.screenColor = rouge

        actionLabel.textColor = actionLabelColor
        actionInfo.alphaValue = 0.0

        volumeSlider.minValue = 0
        volumeSlider.maxValue = 100
        volumeSlider.isEnabled = false
        volumeSlider.isHidden = true

        if let controlButton {
            controlButton.isEnabled = false
            controlButton.isHidden = true
        }

        if let ddcBlockersButton {
            ddcBlockersButton.isEnabled = false
            ddcBlockersButton.isHidden = true
        }
        POPOVERS["help"]!?.appearance = NSAppearance(named: .vibrantDark)
    }
}
