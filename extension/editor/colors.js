// https://github.com/microsoft/vscode-docs/blob/ab2cce3016320617879c9b4d3aa6684c44a04a8f/api/references/theme-color.md

import Color from "color"

const wh  = "#FFFFFF"
const tr  = "#FFFFFF00"
const tr0 = "#FFFFFF33"
const tr1 = "#FFFFFF66"
const tr2 = "#FFFFFFCC"
const red = "#FF0000"

export function colors(editor) {
  const ebg    = editor.background
  const ea1    = editor.primary[1]
  const ea2    = editor.primary[2]
  const ea3    = editor.primary[3]
  const ea5    = editor.primary[5]
  const ea6    = editor.primary[6]
  const ep0    = editor.neutral[0]
  const ep0tr0 = Color(ep0).alpha(0.4).hexa()
  const ep1    = editor.neutral[1]
  const ep1tr0 = Color(ep1).alpha(0.4).hexa()
  const ep1tr1 = Color(ep1).alpha(0.8).hexa()
  const ep2    = editor.neutral[2]
  const ep3    = editor.neutral[3]
  const ep3tr0 = Color(ep3).alpha(0.4).hexa()
  const ep3tr1 = Color(ep3).alpha(0.6).hexa()
  const ep4    = editor.neutral[4]
  const ep4tr0 = Color(ep4).alpha(0.6).hexa()
  const ep5    = editor.neutral[5]
  const ep6    = editor.neutral[6]
  const ep7    = editor.neutral[7]
  const ep8    = editor.neutral[8]
  const le0    = editor.log.error[0]
  const li0    = editor.log.info[0]
  const lw0    = editor.log.warning[0]

  return {
    // Contrast colors
    // "contrastActiveBorder:"
    // "contrastBorder:"

    // Base colors
    "focusBorder": ea3,
    "foreground": ep7,
    // "disabledForeground":
    "widget.border": ep2,
    "widget.shadow": tr,
    "selection.background": ea2,
    "descriptionForeground": ep5,
    "errorForeground": "#b35900",
    "icon.foreground": ep5,
    // "sash.hoverBorder":

    // Window border
    // "window.activeBorder": none
    // "window.inactiveBorder": none

    // Text colors
    // "textBlockQuote.background":
    // "textBlockQuote.border":
    // "textCodeBlock.background":
    "textLink.activeForeground": ea5,
    "textLink.foreground": ea5,
    // "textSeparator.foreground":
    // "textPreformat.foreground":

    // Action colors
    "toolbar.hoverBackground": ep1,
    "toolbar.hoverOutline": tr,
    // TODO: When VSCode adds support for foreground colorization of the active
    // state, replace `ep1` with `ea5`.
    "toolbar.activeBackground": ep1,

    // Button control
    "button.background": ea5,
    "button.foreground": wh,
    "button.border": tr,
    "button.separator": tr0,
    "button.hoverBackground": ea6,
    "button.secondaryForeground": wh,
    "button.secondaryBackground": ep6,
    "button.secondaryHoverBackground": ep8,
    "checkbox.background": ep0,
    "checkbox.foreground": ep7,
    "checkbox.border": ep2,
    "checkbox.selectBackground": ep0,
    "checkbox.selectBorder": ep2,

    // Dropdown control
    "dropdown.background": ebg,
    "dropdown.listBackground": ebg,
    "dropdown.border": ep2,
    "dropdown.foreground": ep7,

    // Input control
    "input.background": ebg,
    "input.border": ep2,
    "input.foreground": ep7,
    "input.placeholderForeground": ep5,
    // "inputOption.activeBackground":
    // "inputOption.activeBorder":
    // "inputOption.activeForeground":
    // "inputOption.hoverBackground":
    // "inputValidation.errorBackground":
    // "inputValidation.errorForeground":
    // "inputValidation.errorBorder":
    // "inputValidation.infoBackground":
    // "inputValidation.infoForeground":
    // "inputValidation.infoBorder":
    // "inputValidation.warningBackground":
    // "inputValidation.warningForeground":
    // "inputValidation.warningBorder":

    // Scrollbar control
    "scrollbar.shadow": tr,
    "scrollbarSlider.activeBackground": ep3tr1,
    "scrollbarSlider.background": ep3tr0,
    "scrollbarSlider.hoverBackground": ep3tr1,

    // Badge
    "badge.foreground": wh,
    "badge.background": ea5,

    // Progress bar
    "progressBar.background": ea5,

    // Lists and trees
    "list.activeSelectionBackground": ea5,
    "list.activeSelectionForeground": wh,
    // "list.activeSelectionIconForeground":
    // "list.dropBackground":
    "list.focusBackground": tr,
    "list.focusForeground": ep7,
    "list.focusHighlightForeground": ea2,
    "list.focusOutline": ea3,
    "list.focusAndSelectionOutline": ea3,
    "list.highlightForeground": ea5,
    "list.hoverBackground": tr,
    "list.hoverForeground": ep7,
    "list.inactiveSelectionBackground": ep1,
    "list.inactiveSelectionForeground": ep7,
    // "list.inactiveSelectionIconForeground":
    "list.inactiveFocusBackground": tr,
    "list.inactiveFocusOutline": tr,
    // "list.invalidItemForeground" open directory, then delete in but keep open editor
    "list.errorForeground": ep7,
    "list.warningForeground": ep7,
    "listFilterWidget.background": ebg,
    // "listFilterWidget.outline":
    // "listFilterWidget.noMatchesOutline":
    "listFilterWidget.shadow": tr,
    // "list.filterMatchBackground":
    "list.filterMatchBorder": tr,
    // "list.deemphasizedForeground":
    // "tree.indentGuidesStroke":
    // "tree.inactiveIndentGuidesStroke":
    // "tree.tableColumnsBorder":
    // "tree.tableOddRowsBackground":

    // Activity Bar
    "activityBar.background": ep0,
    // "activityBar.dropBorder":
    "activityBar.foreground": ep6,
    "activityBar.inactiveForeground": ep4,
    "activityBar.border": ep2,
    "activityBarBadge.background": ea5,
    "activityBarBadge.foreground": wh,
    "activityBar.activeBorder": tr,
    "activityBar.activeBackground": tr,
    "activityBar.activeFocusBorder": ea3,

    // Profiles
    // "profileBadge.background":
    // "profileBadge.foreground":

    // Side Bar
    "sideBar.background": ep0,
    "sideBar.foreground": ep7,
    "sideBar.border": ep2,
    // "sideBar.dropBackground":
    "sideBarTitle.foreground": ep7,
    "sideBarSectionHeader.background": ep0,
    "sideBarSectionHeader.foreground": ep7,
    "sideBarSectionHeader.border": tr,

    // Minimap
    // "minimap.findMatchHighlight"
    // "minimap.selectionHighlight"
    // "minimap.errorHighlight"
    // "minimap.warningHighlight"
    "minimap.background": ebg,
    // "minimap.selectionOccurrenceHighlight"
    "minimap.foregroundOpacity": tr2,
    "minimapSlider.background": ep3tr0,
    "minimapSlider.hoverBackground": ep3tr1,
    "minimapSlider.activeBackground": ep3tr1,
    // "minimapGutter.addedBackground"
    // "minimapGutter.modifiedBackground"
    // "minimapGutter.deletedBackground"

    // Editor Groups & Tabs
    "editorGroup.border": ep2,
    // "editorGroup.dropBackground"
    "editorGroupHeader.noTabsBackground": ebg,
    "editorGroupHeader.tabsBackground": ep0,
    "editorGroupHeader.tabsBorder": ep2,
    "editorGroupHeader.border": tr,
    "editorGroup.emptyBackground": ebg,
    // editorGroup.focusedEmptyBorder
    // editorGroup.dropIntoPromptForeground
    // editorGroup.dropIntoPromptBackground
    // editorGroup.dropIntoPromptBorder
    "tab.activeBackground": ebg,
    "tab.unfocusedActiveBackground": ebg,
    "tab.activeForeground": ep7,
    "tab.border": ep2,
    "tab.activeBorder": ebg,
    "tab.unfocusedActiveBorder": ebg,
    "tab.activeBorderTop": ebg,
    "tab.unfocusedActiveBorderTop": ebg,
    "tab.lastPinnedBorder": ep2,
    "tab.inactiveBackground": ep0,
    "tab.unfocusedInactiveBackground": ep0,
    "tab.inactiveForeground": ep7,
    "tab.unfocusedActiveForeground": ep5,
    "tab.unfocusedInactiveForeground": ep5,
    // "tab.hoverBackground": none,
    // "tab.unfocusedHoverBackground": none,
    // "tab.hoverForeground": none,
    // "tab.unfocusedHoverForeground": none,
    // "tab.hoverBorder": none,
    // "tab.unfocusedHoverBorder": none,
    // "tab.activeModifiedBorder":
    // "tab.inactiveModifiedBorder":
    // "tab.unfocusedActiveModifiedBorder":
    // "tab.unfocusedInactiveModifiedBorder":
    // "editorPane.background":
    "sideBySideEditor.horizontalBorder": ep2,
    "sideBySideEditor.verticalBorder": ep2,

    // Editor colors
    "editor.background": ebg,
    "editor.foreground": ep7,
    "editorLineNumber.foreground": ep4,
    "editorLineNumber.activeForeground": ep7,
    // "editorLineNumber.dimmedForeground":
    "editorCursor.background": wh,
    "editorCursor.foreground": ep5,
    "editor.selectionBackground": ea2,
    // "editor.selectionForeground": none,
    // "editor.inactiveSelectionBackground": the same as an active
    "editor.selectionHighlightBackground": ea1,
    "editor.selectionHighlightBorder": tr,
    "editor.wordHighlightBackground": tr, // ep1tr0,
    "editor.wordHighlightBorder": tr, // ep3tr1,
    "editor.wordHighlightStrongBackground": tr, // ep1tr1,
    "editor.wordHighlightStrongBorder": tr, // ep3tr1,
    // "editor.wordHighlightTextBackground":
    // "editor.wordHighlightTextBorder":
    // "editor.findMatchBackground": ep1tr1, // ep4tr0,
    // "editor.findMatchHighlightBackground": ep1tr0, // ep3tr0,
    // "editor.findRangeHighlightBackground":
    // "editor.findMatchBorder": ep3tr1,
    // "editor.findMatchHighlightBorder": ep3tr1,
    // "editor.findRangeHighlightBorder":
    "search.resultsInfoForeground": ep7,
    // "searchEditor.findMatchBackground":
    // "searchEditor.findMatchBorder":
    // "searchEditor.textInputBorder":
    "editor.hoverHighlightBackground": tr,
    "editor.lineHighlightBackground": ep1tr0,
    "editor.lineHighlightBorder": tr,
    // "editorUnicodeHighlight.border":
    // "editorUnicodeHighlight.background":
    // "editorLink.activeForeground":
    // "editor.rangeHighlightBackground":
    // "editor.rangeHighlightBorder":
    // "editor.symbolHighlightBackground":
    // "editor.symbolHighlightBorder":
    "editorWhitespace.foreground": ep2,
    // "editorIndentGuide.background":
    // "editorIndentGuide.activeBackground":
    // "editorInlayHint.background":
    // "editorInlayHint.foreground":
    // "editorInlayHint.typeForeground":
    // "editorInlayHint.typeBackground":
    // "editorInlayHint.parameterForeground":
    // "editorInlayHint.parameterBackground":
    "editorRuler.foreground": ep0,
    // "editor.linkedEditingBackground":
    // "editorCodeLens.foreground":
    // "editorLightBulb.foreground":
    // "editorLightBulbAutoFix.foreground":
    "editorBracketMatch.background": ep1tr0,
    "editorBracketMatch.border": ep3tr1,
    "editorBracketHighlight.foreground1": tr,
    "editorBracketHighlight.foreground2": tr,
    "editorBracketHighlight.foreground3": tr,
    "editorBracketHighlight.foreground4": tr,
    "editorBracketHighlight.foreground5": tr,
    "editorBracketHighlight.foreground6": tr,
    "editorBracketHighlight.unexpectedBracket.foreground": tr,
    "editorBracketPairGuide.activeBackground1": tr,
    "editorBracketPairGuide.activeBackground2": tr,
    "editorBracketPairGuide.activeBackground3": tr,
    "editorBracketPairGuide.activeBackground4": tr,
    "editorBracketPairGuide.activeBackground5": tr,
    "editorBracketPairGuide.activeBackground6": tr,
    "editorBracketPairGuide.background1": tr,
    "editorBracketPairGuide.background2": tr,
    "editorBracketPairGuide.background3": tr,
    "editorBracketPairGuide.background4": tr,
    "editorBracketPairGuide.background5": tr,
    "editorBracketPairGuide.background6": tr,
    "editor.foldBackground": tr,
    "editorOverviewRuler.background": tr,
    "editorOverviewRuler.border": tr,
    "editorOverviewRuler.findMatchForeground": tr,
    "editorOverviewRuler.rangeHighlightForeground": tr,
    "editorOverviewRuler.selectionHighlightForeground": tr,
    "editorOverviewRuler.wordHighlightForeground": tr,
    "editorOverviewRuler.wordHighlightStrongForeground": tr,
    "editorOverviewRuler.wordHighlightTextForeground": tr,
    "editorOverviewRuler.modifiedForeground": tr,
    "editorOverviewRuler.addedForeground": tr,
    "editorOverviewRuler.deletedForeground": tr,
    "editorOverviewRuler.errorForeground": tr,
    "editorOverviewRuler.warningForeground": tr,
    "editorOverviewRuler.infoForeground": tr,
    "editorOverviewRuler.bracketMatchForeground": tr,
    "editorError.foreground": le0,
    // "editorError.border":
    // "editorError.background":
    "editorWarning.foreground": lw0,
    // "editorWarning.border":
    // "editorWarning.background":
    "editorInfo.foreground": li0,
    // "editorInfo.border":
    // "editorInfo.background":
    // "editorHint.foreground":
    // "editorHint.border":
    // "problemsErrorIcon.foreground":
    // "problemsWarningIcon.foreground":
    // "problemsInfoIcon.foreground":
    "editorUnnecessaryCode.border": tr,
    "editorUnnecessaryCode.opacity": tr1,
    "editorGutter.background": ebg,
    "editorGutter.modifiedBackground": ep3,
    "editorGutter.addedBackground": ep3,
    "editorGutter.deletedBackground": ep3,
    // "editorGutter.commentRangeForeground:"
    // "editorGutter.commentGlyphForeground:"
    // "editorGutter.commentUnresolvedGlyphForeground:"
    // "editorGutter.foldingControlForeground:"
    // "editorCommentsWidget.resolvedBorder":
    // "editorCommentsWidget.unresolvedBorder":
    // "editorCommentsWidget.rangeBackground":
    // "editorCommentsWidget.rangeBorder":
    // "editorCommentsWidget.rangeActiveBackground":
    // "editorCommentsWidget.rangeActiveBorder":

    // Diff editor colors
    "diffEditor.insertedTextBackground": "#80ccff80",
    // "diffEditor.insertedTextBorder":
    "diffEditor.removedTextBackground": "#f7993966",
    // "diffEditor.removedTextBorder":
    // "diffEditor.border":
    // "diffEditor.diagonalFill":
    "diffEditor.insertedLineBackground": "#b6e3ff4d",
    "diffEditor.removedLineBackground": "#ffddb04d",
    "diffEditorGutter.insertedLineBackground": ebg,
    "diffEditorGutter.removedLineBackground": ebg,
    // "diffEditorOverview.insertedForeground":
    // "diffEditorOverview.removedForeground":
    // "diffEditor.unchangedRegionBackground":
    // "diffEditor.unchangedRegionForeground":
    // "diffEditor.unchangedCodeBackground":
    // "diffEditor.move.border":

    // Chat colors
    // "chat.requestBackground":
    // "chat.requestBorder":

    // Inline Chat colors
    // "inlineChat.background":
    // "inlineChat.border":
    // "inlineChat.shadow":
    // "inlineChat.regionHighlight":
    // "inlineChatInput.border":
    // "inlineChatInput.focusBorder":
    // "inlineChatInput.placeholderForeground":
    // "inlineChatInput.background":
    // "inlineChatDiff.inserted":
    // "inlineChatDiff.removed":

    // Editor widget colors
    // "editorWidget.foreground":
    "editorWidget.background": ebg,
    "editorWidget.border": ep2,
    // "editorWidget.resizeBorder":
    "editorSuggestWidget.background": ebg,
    "editorSuggestWidget.border": ep2,
    "editorSuggestWidget.foreground": ep7,
    "editorSuggestWidget.focusHighlightForeground": ea2,
    "editorSuggestWidget.highlightForeground": ea5,
    "editorSuggestWidget.selectedBackground": ea5,
    "editorSuggestWidget.selectedForeground": wh,
    // "editorSuggestWidget.selectedIconForeground":
    "editorSuggestWidgetStatus.foreground": ep6,
    // "editorHoverWidget.foreground":
    // "editorHoverWidget.background":
    // "editorHoverWidget.border":
    // "editorHoverWidget.highlightForeground":
    // "editorHoverWidget.statusBarBackground":
    // "editorGhostText.border":
    // "editorGhostText.background":
    // "editorGhostText.foreground":
    // "editorStickyScroll.background":
    // "editorStickyScrollHover.background":
    // "debugExceptionWidget.background":
    // "debugExceptionWidget.border":
    // "editorMarkerNavigation.background":
    // "editorMarkerNavigationError.background":
    // "editorMarkerNavigationWarning.background":
    // "editorMarkerNavigationInfo.background":
    // "editorMarkerNavigationError.headerBackground":
    // "editorMarkerNavigationWarning.headerBackground":
    // "editorMarkerNavigationInfo.headerBackground":

    // Peek view colors
    "peekView.border": ep3,
    "peekViewEditor.background": ep0tr0,
    "peekViewEditorGutter.background": ep0tr0,
    // "peekViewEditor.matchHighlightBackground"
    // "peekViewEditor.matchHighlightBorder"
    "peekViewResult.background": ep0,
    "peekViewResult.fileForeground": ep7,
    "peekViewResult.lineForeground": ep7,
    // "peekViewResult.matchHighlightBackground"
    "peekViewResult.selectionBackground": ea5,
    "peekViewResult.selectionForeground": wh,
    "peekViewTitle.background": ep0,
    "peekViewTitleDescription.foreground": ep5,
    "peekViewTitleLabel.foreground": ep7,
    // "peekViewEditorStickyScroll.background"

    // Merge conflicts colors
    // "merge.currentHeaderBackground":
    // "merge.currentContentBackground":
    // "merge.incomingHeaderBackground":
    // "merge.incomingContentBackground":
    // "merge.border":
    // "merge.commonContentBackground":
    // "merge.commonHeaderBackground":
    // "editorOverviewRuler.currentContentForeground":
    // "editorOverviewRuler.incomingContentForeground":
    // "editorOverviewRuler.commonContentForeground":
    // "editorOverviewRuler.commentForeground":
    // "editorOverviewRuler.commentUnresolvedForeground":
    // "mergeEditor.change.background":
    // "mergeEditor.change.word.background":
    // "mergeEditor.conflict.unhandledUnfocused.border":
    // "mergeEditor.conflict.unhandledFocused.border":
    // "mergeEditor.conflict.handledUnfocused.border":
    // "mergeEditor.conflict.handledFocused.border":
    // "mergeEditor.conflict.handled.minimapOverViewRuler":
    // "mergeEditor.conflict.unhandled.minimapOverViewRuler":
    // "mergeEditor.conflictingLines.background":
    // "mergeEditor.changeBase.background":
    // "mergeEditor.changeBase.word.background":
    // "mergeEditor.conflict.input1.background":
    // "mergeEditor.conflict.input2.background":

    // Panel colors
    "panel.background": ep0,
    "panel.border": ep2,
    // "panel.dropBorder":
    "panelTitle.activeBorder": ep7,
    "panelTitle.activeForeground": ep7,
    "panelTitle.inactiveForeground": ep5,
    "panelInput.border": ep2,
    // "panelSection.border":
    // "panelSection.dropBackground":
    // "panelSectionHeader.background":
    // "panelSectionHeader.foreground":
    // "panelSectionHeader.border":

    // Status Bar colors
    "statusBar.background": ebg,
    "statusBar.foreground": ep6,
    "statusBar.border": ep2,
    "statusBar.debuggingBackground": ep6,
    "statusBar.debuggingForeground": wh,
    "statusBar.debuggingBorder": ep2,
    "statusBar.noFolderForeground": ep6,
    "statusBar.noFolderBackground": ebg,
    "statusBar.noFolderBorder": ep2,
    "statusBarItem.activeBackground": tr,
    "statusBarItem.hoverBackground": tr,
    "statusBarItem.prominentForeground": ep6,
    "statusBarItem.prominentBackground": ebg,
    "statusBarItem.prominentHoverBackground": tr,
    "statusBarItem.remoteBackground": ebg,
    "statusBarItem.remoteForeground": ep6,
    // "statusBarItem.errorBackground":
    // "statusBarItem.errorForeground":
    // "statusBarItem.warningBackground":
    // "statusBarItem.warningForeground":
    // "statusBarItem.compactHoverBackground":
    // "statusBarItem.focusBorder":
    // "statusBar.focusBorder":
    // "statusBar.offlineBackground":
    // "statusBar.offlineForeground":

    // Title Bar colors
    "titleBar.activeBackground": ep0,
    "titleBar.activeForeground": ep7,
    "titleBar.inactiveBackground": ep0,
    "titleBar.inactiveForeground": ep7,
    "titleBar.border": ep2,

    // Menu Bar colors
    // "menubar.selectionForeground":
    // "menubar.selectionBackground":
    // "menubar.selectionBorder":
    // "menu.foreground":
    // "menu.background":
    // "menu.selectionForeground":
    // "menu.selectionBackground":
    // "menu.selectionBorder":
    // "menu.separatorBackground":
    // "menu.border":

    // Command Center colors
    "commandCenter.foreground": ep7,
    "commandCenter.activeForeground": ep7,
    "commandCenter.background": ep1,
    "commandCenter.activeBackground": ep1,
    "commandCenter.border": ep2,
    // "commandCenter.inactiveForeground":
    // "commandCenter.inactiveBorder":
    "commandCenter.activeBorder": ep2,

    // Notification colors
    "notificationCenter.border": ep2,
    // "notificationCenterHeader.foreground":
    // "notificationCenterHeader.background":
    // "notificationToast.border":
    // "notifications.foreground":
    // "notifications.background":
    // "notifications.border":
    // "notificationLink.foreground":
    // "notificationsErrorIcon.foreground":
    // "notificationsWarningIcon.foreground":
    // "notificationsInfoIcon.foreground":

    // Banner colors
    // "banner.background":
    // "banner.foreground":
    // "banner.iconForeground":

    // Extensions colors
    // "extensionButton.prominentForeground":
    // "extensionButton.prominentBackground":
    // "extensionButton.prominentHoverBackground":
    "extensionButton.background": ea5,
    "extensionButton.foreground": wh,
    "extensionButton.hoverBackground": ea6,
    "extensionButton.separator": tr0,
    // "extensionBadge.remoteBackground":
    // "extensionBadge.remoteForeground":
    "extensionIcon.starForeground": ea5,
    "extensionIcon.verifiedForeground": ea5,
    // TODO: Wait for the foreground and background colors to be separated.
    // "extensionIcon.preReleaseForeground":
    // "extensionIcon.sponsorForeground":

    // Quick picker colors
    // "pickerGroup.border"
    // "pickerGroup.foreground"
    "quickInput.background": ebg,
    // "quickInput.foreground"
    // "quickInputList.focusBackground"
    // "quickInputList.focusForeground"
    // "quickInputList.focusIconForeground"
    // "quickInputTitle.background"

    // Keybinding label colors
    "keybindingLabel.background": ep0,
    "keybindingLabel.foreground": ep7,
    "keybindingLabel.border": ep2,
    "keybindingLabel.bottomBorder": ep2,

    // Keyboard shortcut table colors
    // "keybindingTable.headerBackground"
    // "keybindingTable.rowsBackground"

    // Integrated Terminal colors
    // "terminal.background"
    // "terminal.border"
    // "terminal.foreground"
    // "terminal.ansiBlack"
    // "terminal.ansiBlue"
    // "terminal.ansiBrightBlack"
    // "terminal.ansiBrightBlue"
    // "terminal.ansiBrightCyan"
    // "terminal.ansiBrightGreen"
    // "terminal.ansiBrightMagenta"
    // "terminal.ansiBrightRed"
    // "terminal.ansiBrightWhite"
    // "terminal.ansiBrightYellow"
    // "terminal.ansiCyan"
    // "terminal.ansiGreen"
    // "terminal.ansiMagenta"
    // "terminal.ansiRed"
    // "terminal.ansiWhite"
    // "terminal.ansiYellow"
    // "terminal.selectionBackground"
    // "terminal.selectionForeground"
    // "terminal.inactiveSelectionBackground"
    // "terminal.findMatchBackground"
    // "terminal.findMatchBorder"
    // "terminal.findMatchHighlightBackground"
    // "terminal.findMatchHighlightBorder"
    // "terminal.hoverHighlightBackground"
    // "terminalCursor.background"
    // "terminalCursor.foreground"
    // "terminal.dropBackground"
    // "terminal.tab.activeBorder"
    // "terminalCommandDecoration.defaultBackground"
    // "terminalCommandDecoration.successBackground"
    // "terminalCommandDecoration.errorBackground"
    // "terminalOverviewRuler.cursorForeground"
    // "terminalOverviewRuler.findMatchForeground"

    // Debug colors
    // "debugToolBar.background"
    // "debugToolBar.border"
    // "editor.stackFrameHighlightBackground"
    // "editor.focusedStackFrameHighlightBackground"
    // "editor.inlineValuesForeground"
    // "editor.inlineValuesBackground"
    // "debugView.exceptionLabelForeground"
    // "debugView.exceptionLabelBackground"
    // "debugView.stateLabelForeground"
    // "debugView.stateLabelBackground"
    // "debugView.valueChangedHighlight"
    // "debugTokenExpression.name"
    // "debugTokenExpression.value"
    // "debugTokenExpression.string"
    // "debugTokenExpression.boolean"
    // "debugTokenExpression.number"
    // "debugTokenExpression.error"

    // Testing colors
    // "testing.iconFailed"
    // "testing.iconErrored"
    // "testing.iconPassed"
    // "testing.runAction"
    // "testing.iconQueued"
    // "testing.iconUnset"
    // "testing.iconSkipped"
    // "testing.peekBorder"
    // "testing.peekHeaderBackground"
    // "testing.message.error.decorationForeground"
    // "testing.message.error.lineBackground"
    // "testing.message.info.decorationForeground"
    // "testing.message.info.lineBackground"

    // Welcome page colors
    "welcomePage.background": ebg,
    // "welcomePage.progress.background"
    // "welcomePage.progress.foreground"
    // "welcomePage.tileBackground"
    // "welcomePage.tileHoverBackground"
    // "welcomePage.tileBorder"
    // "walkThrough.embeddedEditorBackground"
    // "walkthrough.stepTitle.foreground"

    // Source Control colors
    // "scm.providerBorder"

    // Git colors
    "gitDecoration.addedResourceForeground": ep7,
    "gitDecoration.modifiedResourceForeground": ep7,
    "gitDecoration.deletedResourceForeground": ep7,
    "gitDecoration.renamedResourceForeground": ep7,
    "gitDecoration.stageModifiedResourceForeground": ep7,
    "gitDecoration.stageDeletedResourceForeground": ep7,
    "gitDecoration.untrackedResourceForeground": ep7,
    "gitDecoration.ignoredResourceForeground": ep5,
    "gitDecoration.conflictingResourceForeground": ep7,
    "gitDecoration.submoduleResourceForeground": ep6,

    // Settings Editor colors
    // "settings.headerForeground"
    // "settings.modifiedItemIndicator"
    // "settings.dropdownBackground"
    // "settings.dropdownForeground"
    // "settings.dropdownBorder"
    // "settings.dropdownListBorder"
    // "settings.checkboxBackground"
    // "settings.checkboxForeground"
    // "settings.checkboxBorder"
    // "settings.rowHoverBackground"
    // "settings.textInputBackground"
    // "settings.textInputForeground"
    // "settings.textInputBorder"
    // "settings.numberInputBackground"
    // "settings.numberInputForeground"
    // "settings.numberInputBorder"
    // "settings.focusedRowBackground"
    // "settings.focusedRowBorder"
    // "settings.headerBorder"
    // "settings.sashBorder"
    // "settings.settingsHeaderHoverForeground"

    // Breadcrumbs colors
    "breadcrumb.foreground": ep5,
    "breadcrumb.background": ebg,
    "breadcrumb.focusForeground": ep7,
    "breadcrumb.activeSelectionForeground": ep7,
    "breadcrumbPicker.background": ep0,

    // Snippets colors
    // "editor.snippetTabstopHighlightBackground"
    // "editor.snippetTabstopHighlightBorder"
    // "editor.snippetFinalTabstopHighlightBackground"
    // "editor.snippetFinalTabstopHighlightBorder"

    // Symbol Icons colors
    // "symbolIcon.arrayForeground"
    // "symbolIcon.booleanForeground"
    // "symbolIcon.classForeground"
    // "symbolIcon.colorForeground"
    // "symbolIcon.constantForeground"
    // "symbolIcon.constructorForeground"
    // "symbolIcon.enumeratorForeground"
    // "symbolIcon.enumeratorMemberForeground"
    // "symbolIcon.eventForeground"
    // "symbolIcon.fieldForeground"
    // "symbolIcon.fileForeground"
    // "symbolIcon.folderForeground"
    // "symbolIcon.functionForeground"
    // "symbolIcon.interfaceForeground"
    // "symbolIcon.keyForeground"
    // "symbolIcon.keywordForeground"
    // "symbolIcon.methodForeground"
    // "symbolIcon.moduleForeground"
    // "symbolIcon.namespaceForeground"
    // "symbolIcon.nullForeground"
    // "symbolIcon.numberForeground"
    // "symbolIcon.objectForeground"
    // "symbolIcon.operatorForeground"
    // "symbolIcon.packageForeground"
    // "symbolIcon.propertyForeground"
    // "symbolIcon.referenceForeground"
    // "symbolIcon.snippetForeground"
    // "symbolIcon.stringForeground"
    // "symbolIcon.structForeground"
    // "symbolIcon.textForeground"
    // "symbolIcon.typeParameterForeground"
    // "symbolIcon.unitForeground"
    // "symbolIcon.variableForeground"

    // Debug Icons colors
    "debugIcon.breakpointForeground": ep5,
    "debugIcon.breakpointDisabledForeground": ep3,
    // "debugIcon.breakpointUnverifiedForeground":
    // "debugIcon.breakpointCurrentStackframeForeground":
    // "debugIcon.breakpointStackframeForeground":
    // "debugIcon.startForeground"
    // "debugIcon.pauseForeground"
    // "debugIcon.stopForeground"
    // "debugIcon.disconnectForeground"
    // "debugIcon.restartForeground"
    // "debugIcon.stepOverForeground"
    // "debugIcon.stepIntoForeground"
    // "debugIcon.stepOutForeground"
    // "debugIcon.continueForeground"
    // "debugIcon.stepBackForeground"
    // "debugConsole.infoForeground"
    // "debugConsole.warningForeground"
    // "debugConsole.errorForeground"
    // "debugConsole.sourceForeground"
    // "debugConsoleInputIcon.foreground"

    // Notebook colors
    // "notebook.editorBackground"
    // "notebook.cellBorderColor"
    // "notebook.cellHoverBackground"
    // "notebook.cellInsertionIndicator"
    // "notebook.cellStatusBarItemHoverBackground"
    // "notebook.cellToolbarSeparator"
    // "notebook.cellEditorBackground"
    // "notebook.focusedCellBackground"
    // "notebook.focusedCellBorder"
    // "notebook.focusedEditorBorder"
    // "notebook.inactiveFocusedCellBorder"
    // "notebook.inactiveSelectedCellBorder"
    // "notebook.outputContainerBackgroundColor"
    // "notebook.outputContainerBorderColor"
    // "notebook.selectedCellBackground"
    // "notebook.selectedCellBorder"
    // "notebook.symbolHighlightBackground"
    // "notebookScrollbarSlider.activeBackground"
    // "notebookScrollbarSlider.background"
    // "notebookScrollbarSlider.hoverBackground"
    // "notebookStatusErrorIcon.foreground"
    // "notebookStatusRunningIcon.foreground"
    // "notebookStatusSuccessIcon.foreground"
    // "notebookEditorOverviewRuler.runningCellForeground"

    // Chart colors
    // "charts.foreground"
    // "charts.lines"
    // "charts.red"
    // "charts.blue"
    // "charts.yellow"
    // "charts.orange"
    // "charts.green"
    // "charts.purple"

    // Ports Colors
    // "ports.iconRunningProcessForeground"

    // Comments View colors
    // "commentsView.resolvedIcon"
    // "commentsView.unresolvedIcon"
  }
}
