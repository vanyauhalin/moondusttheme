import Color from "color"

/**
 * @typedef {Object} EditorTheme
 * @property {string} name
 * @property {Record<string, string>} colors
 * @property {TokenColor[]} tokenColors
 * @property {boolean} semanticHighlighting
 */

/**
 * @typedef {Object} TokenColor
 * @property {string[]} scope
 * @property {Object} settings
 * @property {string} settings.foreground
 */

/**
 * @typedef {ColorScheme & ColorTheme} ColorPalette
 */

/**
 * @typedef {Object} ColorScheme
 * @property {S10} gray
 * @property {S10} blue
 */

/**
 * @typedef {Object} ColorTheme
 * @property {string} background
 * @property {string} foreground
 * @property {S10} neutral
 * @property {S10} primary
 * @property {S1} error
 * @property {S1} info
 * @property {S1} warning
 * @property {S1} comment
 * @property {S2} plain
 * @property {S2} string
 */

/**
 * @typedef {[string]} S1
 * @typedef {[string, string]} S2
 * @typedef {[string, string, string, string, string, string, string, string, string, string]} S10
 */

/**
 * @returns {EditorTheme}
 */
export function lightTheme() {
  let ct = lightPallette()

  /** @type {EditorTheme} */
  let et = {
    name: "Moondust: Near Side of the Moon",
    colors: colors(ct),
    tokenColors: [],
    semanticHighlighting: true,
  }

  for (let m of syntaxes()) {
    let tp = tokenColors(ct, m())
    et.tokenColors.push(...tp)
  }

  return et
}

/**
 * @returns {ColorPalette}
 */
export function lightPallette() {
  /** @type {ColorScheme} */
  let s = {
    gray: [
      "#F6F7F8",
      "#E8EBED",
      "#D7DCDF",
      "#B6BEC3",
      "#8E979F",
      "#71787F",
      "#575E66",
      "#434A51",
      "#33383D",
      "#24292D",
    ],
    blue: [
      "#F2F8FC",
      "#E2EFF8",
      "#BBD7EC",
      "#8EBCE1",
      "#65A4D7",
      "#3882C2",
      "#1F639E",
      "#144B7B",
      "#113C5F",
      "#0E2E48",
    ],
  }

  /** @type {ColorTheme} */
  let t = {
    background: "#FFFFFF",
    foreground: s.gray[7],
    neutral: s.gray,
    primary: s.blue,
    error: ["#B35900"],
    info: [s.gray[4]],
    warning: ["#7D4E00"],
    comment: [s.gray[4]],
    plain: [s.gray[5], s.gray[7]],
    string: [s.blue[5], s.blue[7]],
  }

  return {...s, ...t}
}

/**
 * @param {ColorTheme} c
 * @returns {Record<string, string>}
 *
 * {@link https://github.com/microsoft/vscode-docs/blob/ab2cce3016320617879c9b4d3aa6684c44a04a8f/api/references/theme-color.md/ Visual Studio Code Reference}
 */
export function colors(c) {
  let wh  = "#FFFFFF"
  let tr  = "#FFFFFF00"
  let tr0 = "#FFFFFF33"
  let tr1 = "#FFFFFF66"
  let tr2 = "#FFFFFFCC"
  let red = "#FF0000"

  let ebg    = c.background
  let ea1    = c.primary[1]
  let ea2    = c.primary[2]
  let ea3    = c.primary[3]
  let ea5    = c.primary[5]
  let ea6    = c.primary[6]
  let ep0    = c.neutral[0]
  let ep0tr0 = Color(ep0).alpha(0.4).hexa()
  let ep1    = c.neutral[1]
  let ep1tr0 = Color(ep1).alpha(0.4).hexa()
  let ep1tr1 = Color(ep1).alpha(0.8).hexa()
  let ep2    = c.neutral[2]
  let ep3    = c.neutral[3]
  let ep3tr0 = Color(ep3).alpha(0.4).hexa()
  let ep3tr1 = Color(ep3).alpha(0.6).hexa()
  let ep4    = c.neutral[4]
  let ep4tr0 = Color(ep4).alpha(0.6).hexa()
  let ep5    = c.neutral[5]
  let ep6    = c.neutral[6]
  let ep7    = c.neutral[7]
  let ep8    = c.neutral[8]
  let le0    = c.error[0]
  let li0    = c.info[0]
  let lw0    = c.warning[0]

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

/**
 * @param {ColorTheme} ct
 * @param {Syntax} s
 * @return {TokenColor[]}
 */
export function tokenColors(ct, s) {
  /** @type {Record<string, TokenColor>} */
  let tr = {}

  let o = s.tokenColors(ct)
  for (let [s, c] of Object.entries(o)) {
    let tc = tr[c]
    if (!tc) {
      tc = {scope: [], settings: {foreground: c}}
      tr[c] = tc
    }
    tc.scope.push(s)
  }

  return Object.values(tr)
}

/**
 * @returns {(() => Syntax)[]}
 */
export function syntaxes() {
  return [
    c,
    css,
    dockerfile,
    fish,
    go,
    gomod,
    gosum,
    html,
    ini,
    js,
    json,
    jsonc,
    jsonl,
    jsx,
    makefile,
    rb,
    rs,
    sh,
    sql,
    swift,
    toml,
    ts,
    tsx,
    yaml,
  ]
}

/**
 * @typedef {Object} Syntax
 * @property {string} id
 * @property {string=} extends
 * @property {string} name
 * @property {Object} vscode
 * @property {string} vscode.name
 * @property {string} vscode.url
 * @property {string} vscode.scope
 * @property {string[]} vscode.files
 * @property {Object} example
 * @property {Object} example.author
 * @property {string} example.author.name
 * @property {string} example.author.url
 * @property {Object} example.source
 * @property {string} example.source.name
 * @property {string} example.source.file
 * @property {(c: ColorTheme) => Record<string, string>} tokenColors
 */

/**
 * @returns {Syntax}
 */
function c() {
  return {
    id: "c",
    name: "C",
    vscode: {
      name: "C/C++ Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.93.1/extensions/cpp/",
      scope: "source.c",
      files: ["https://github.com/microsoft/vscode/blob/1.93.1/extensions/cpp/syntaxes/c.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "CommonMark",
        url: "https://github.com/commonmark/",
      },
      source: {
        name: "cmark",
        file: "https://github.com/commonmark/cmark/blob/master/src/inlines.c/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s0 = c.string[0]
      let s1 = c.string[1]
      return {
        "comment.block.c": c0,
        "comment.block.documentation.c": c0,
        "comment.line.double-slash.c": c0,
        "comment.line.double-slash.documentation.c": c0,
        "constant.numeric.decimal.point.c": p0,
        "keyword.control.c": p0,
        "keyword.control.case.c": p0,
        "keyword.control.default.c": p0,
        "keyword.control.directive.conditional.c": p0,
        "keyword.control.directive.define.c": p0,
        "keyword.control.directive.include.c": p0,
        "keyword.control.directive.pragma.c": p0,
        "keyword.control.directive.undef.c": p0,
        "keyword.control.switch.c": p0,
        "keyword.operator.assignment.c": p0,
        "keyword.operator.assignment.compound.bitwise.c": p0,
        "keyword.operator.assignment.compound.c": p0,
        "keyword.operator.bitwise.shift.c": p0,
        "keyword.operator.c": p0,
        "keyword.operator.comparison.c": p0,
        "keyword.operator.decrement.c": p0,
        "keyword.operator.increment.c": p0,
        "keyword.operator.logical.c": p0,
        "keyword.operator.sizeof.c": p0,
        "keyword.operator.ternary.c": p0,
        "keyword.other.typedef.c": p0,
        "meta.preprocessor.include.c punctuation.definition.string.begin.c": p0,
        "meta.preprocessor.include.c punctuation.definition.string.end.c": p0,
        "punctuation.definition.begin.bracket.square.c": p0,
        "punctuation.definition.end.bracket.square.c": p0,
        "punctuation.definition.parameters.begin.c": p0,
        "punctuation.definition.parameters.end.c": p0,
        "punctuation.definition.string.begin.assembly.c": s0,
        "punctuation.definition.string.begin.c": s0,
        "punctuation.definition.string.end.assembly.c": s0,
        "punctuation.definition.string.end.c": s0,
        "punctuation.section.arguments.begin.bracket.round.c": p0,
        "punctuation.section.arguments.begin.bracket.round.function.member.c": p0,
        "punctuation.section.arguments.end.bracket.round.c": p0,
        "punctuation.section.arguments.end.bracket.round.function.member.c": p0,
        "punctuation.section.block.begin.bracket.curly.c": p0,
        "punctuation.section.block.begin.bracket.curly.switch.c": p0,
        "punctuation.section.block.end.bracket.curly.c": p0,
        "punctuation.section.block.end.bracket.curly.switch.c": p0,
        "punctuation.section.parameters.begin.bracket.round.c": p0,
        "punctuation.section.parameters.end.bracket.round.c": p0,
        "punctuation.section.parens.begin.bracket.round.assembly.c": p0,
        "punctuation.section.parens.begin.bracket.round.c": p0,
        "punctuation.section.parens.begin.bracket.round.conditional.switch.c": p0,
        "punctuation.section.parens.end.bracket.round.assembly.c": p0,
        "punctuation.section.parens.end.bracket.round.c": p0,
        "punctuation.section.parens.end.bracket.round.conditional.switch.c": p0,
        "punctuation.separator.colon.case.c": p0,
        "punctuation.separator.colon.case.default.c": p0,
        "punctuation.separator.delimiter.c": p0,
        "punctuation.separator.dot-access.c": p0,
        "punctuation.separator.pointer-access.c": p0,
        "punctuation.terminator.statement.c": p0,
        "source.c": p1,
        "storage.modifier.array.bracket.square.c": p0,
        "storage.modifier.c": p0,
        "storage.type.built-in.primitive.c": p0,
        "storage.type.enum.c": p0,
        "storage.type.struct.c": p0,
        "storage.type.union.c": p0,
        "string.quoted.double.c": s1,
        "string.quoted.single.c": s1,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function css() {
  return {
    id: "css",
    name: "CSS",
    vscode: {
      name: "CSS Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/css/",
      scope: "source.css",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/css/syntaxes/css.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "Julia Miocene",
        url: "https://github.com/Miocene/",
      },
      source: {
        name: "Portraits Pure CSS Animation",
        file: "https://github.com/Miocene/animations/blob/d83b89b38a0f286b374344e210ecd2a61fe6a671/2023_05_portraits/style.css/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s0 = c.string[0]
      let s1 = c.string[1]

      return {
        "comment.block.css": c0,
        "entity.name.function.namespace-prefix.css": p0,
        "keyword.control.at-rule.annotation.css": p0,
        "keyword.control.at-rule.character-variant.css": p0,
        "keyword.control.at-rule.charset.css": p0,
        "keyword.control.at-rule.counter-style.css": p0,
        "keyword.control.at-rule.css": p0,
        "keyword.control.at-rule.document.css": p0,
        "keyword.control.at-rule.font-face.css": p0,
        "keyword.control.at-rule.font-feature-values.css": p0,
        "keyword.control.at-rule.import.css": p0,
        "keyword.control.at-rule.keyframes.css": p0,
        "keyword.control.at-rule.media.css": p0,
        "keyword.control.at-rule.namespace.css": p0,
        "keyword.control.at-rule.ornaments.css": p0,
        "keyword.control.at-rule.page.css": p0,
        "keyword.control.at-rule.styleset.css": p0,
        "keyword.control.at-rule.stylistic.css": p0,
        "keyword.control.at-rule.supports.css": p0,
        "keyword.control.at-rule.swash.css": p0,
        "keyword.control.at-rule.viewport.css": p0,
        "keyword.operator.combinator.css": p0,
        "keyword.operator.comparison.css": p0,
        "keyword.operator.logical.and.media.css": p0,
        "keyword.operator.logical.not.media.css": p0,
        "keyword.operator.logical.only.media.css": p0,
        "keyword.operator.pattern.css": p0,
        "keyword.other.important.css": p0,
        "meta.at-rule.import.css punctuation.definition.string.begin.css": p0,
        "meta.at-rule.import.css punctuation.definition.string.end.css": p0,
        "meta.at-rule.import.css string.quoted.double.css": p1,
        "meta.at-rule.import.css string.quoted.single.css": p1,
        "meta.property-value.css punctuation.definition.string.begin.css": s1,
        "meta.property-value.css punctuation.definition.string.end.css": s1,
        "meta.property-value.css punctuation.section.function.begin.bracket.round.css": s1,
        "meta.property-value.css punctuation.section.function.end.bracket.round.css": s1,
        "meta.property-value.css punctuation.separator.list.comma.css": s1,
        "meta.property-value.css string.quoted.double.css": s1,
        "meta.property-value.css string.quoted.single.css": s1,
        "meta.property-value.css string.unquoted.attribute-value.css": s1,
        "meta.property-value.css": s1,
        "punctuation.definition.condition.begin.bracket.round.css": p0,
        "punctuation.definition.condition.end.bracket.round.css": p0,
        "punctuation.definition.entity.begin.bracket.square.css": p0,
        "punctuation.definition.entity.css": p0,
        "punctuation.definition.entity.end.bracket.square.css": p0,
        "punctuation.definition.parameters.begin.bracket.round.css": p0,
        "punctuation.definition.parameters.end.bracket.round.css": p0,
        "punctuation.definition.string.begin.css": s0,
        "punctuation.definition.string.end.css": s0,
        "punctuation.section.begin.bracket.curly.css": p0,
        "punctuation.section.document.begin.bracket.curly.css": p0,
        "punctuation.section.document.end.bracket.curly.css": p0,
        "punctuation.section.end.bracket.curly.css": p0,
        "punctuation.section.function.begin.bracket.round.css": p0,
        "punctuation.section.function.end.bracket.round.css": p0,
        "punctuation.section.keyframes.begin.bracket.curly.css": p0,
        "punctuation.section.keyframes.end.bracket.curly.css": p0,
        "punctuation.section.media.begin.bracket.curly.css": p0,
        "punctuation.section.media.end.bracket.curly.css": p0,
        "punctuation.section.property-list.begin.bracket.curly.css": p0,
        "punctuation.section.property-list.end.bracket.curly.css": p0,
        "punctuation.section.supports.begin.bracket.curly.css": p0,
        "punctuation.section.supports.end.bracket.curly.css": p0,
        "punctuation.separator.key-value.css": p0,
        "punctuation.separator.list.comma.css": p0,
        "punctuation.terminator.rule.css": p0,
        "source.css": p1,
        "string.quoted.double.css": s1,
        "string.quoted.single.css": s1,
        "string.unquoted.attribute-value.css": s1,
        "support.constant.media.css": p0,
        "variable.parameter.url.css": s1,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function dockerfile() {
  return {
    id: "dockerfile",
    name: "Dockerfile",
    vscode: {
      name: "Docker Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/docker/",
      scope: "source.dockerfile",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/docker/syntaxes/docker.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "NGINX",
        url: "https://github.com/nginxinc/",
      },
      source: {
        name: "NGINX Alpine Dockerfile",
        file: "https://github.com/nginxinc/docker-nginx/blob/1.25.4/stable/alpine/Dockerfile/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]

      return {
        "comment.line.number-sign.dockerfile": c0,
        "keyword.control.dockerfile": p0,
        "keyword.other.special-method.dockerfile": p0,
        "source.dockerfile": p1,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function fish() {
  return {
    id: "fish",
    name: "fish",
    vscode: {
      name: "Fish (bmalehorn)",
      url: "https://github.com/bmalehorn/vscode-fish/tree/2bdcfbea62cadc2a977eace3189d25b31df71e72/",
      scope: "source.fish",
      files: ["https://github.com/bmalehorn/vscode-fish/blob/2bdcfbea62cadc2a977eace3189d25b31df71e72/syntaxes/fish.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "Jorge Bucaran",
        url: "https://github.com/jorgebucaran/",
      },
      source: {
        name: "A plugin manager for Fish",
        file: "https://github.com/jorgebucaran/fisher/blob/4.4.4/functions/fisher.fish/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s0 = c.string[0]
      let s1 = c.string[1]

      return {
        "comment.line.number-sign.fish": c0,
        "keyword.control.fish": p0,
        "punctuation.definition.string.begin.fish": s0,
        "punctuation.definition.string.end.fish": s0,
        "punctuation.definition.variable.fish": p0,
        "source.fish": p1,
        "string.quoted.double.fish": s1,
        "string.quoted.single.fish": s1,
        "variable.language.fish": p1,
        "variable.other.normal.fish": p1,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function go() {
  return {
    id: "go",
    name: "Go",
    vscode: {
      name: "Go (golang)",
      url: "https://github.com/golang/vscode-go/tree/v0.41.2/",
      scope: "source.go",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/go/syntaxes/go.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "Alec Thomas",
        url: "https://github.com/alecthomas/",
      },
      source: {
        name: "Kong",
        file: "https://github.com/alecthomas/kong/blob/v0.9.0/kong.go/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s0 = c.string[0]
      let s1 = c.string[1]

      return {
        "comment.block.go": c0,
        "comment.line.double-slash.go": c0,
        "constant.numeric.decimal.point.go": p0,
        "constant.other.placeholder.go": p0,
        "keyword.channel.go": p0,
        "keyword.const.go": p0,
        "keyword.control.go": p0,
        "keyword.control.import.go": p0,
        "keyword.function.go": p0,
        "keyword.interface.go": p0,
        "keyword.map.go": p0,
        "keyword.operator.address.go": p0,
        "keyword.operator.arithmetic.bitwise.go": p0,
        "keyword.operator.arithmetic.go": p0,
        "keyword.operator.assignment.go": p0,
        "keyword.operator.channel.go": p0,
        "keyword.operator.comparison.go": p0,
        "keyword.operator.decrement.go": p0,
        "keyword.operator.ellipsis.go": p0,
        "keyword.operator.increment.go": p0,
        "keyword.operator.logical.go": p0,
        "keyword.package.go": p0,
        "keyword.struct.go": p0,
        "keyword.type.go": p0,
        "keyword.var.go": p0,
        "punctuation.definition.begin.bracket.curly.go": p0,
        "punctuation.definition.begin.bracket.round.go": p0,
        "punctuation.definition.begin.bracket.square.go": p0,
        "punctuation.definition.end.bracket.curly.go": p0,
        "punctuation.definition.end.bracket.round.go": p0,
        "punctuation.definition.end.bracket.square.go": p0,
        "punctuation.definition.imports.begin.bracket.round.go": p0,
        "punctuation.definition.imports.end.bracket.round.go": p0,
        "punctuation.definition.string.begin.go": s0,
        "punctuation.definition.string.end.go": s0,
        "punctuation.other.colon.go": p0,
        "punctuation.other.comma.go": p0,
        "punctuation.other.period.go": p0,
        "punctuation.separator.constant.numeric.go": p0,
        "punctuation.terminator.go": p0,
        "source.go": p1,
        "storage.type.boolean.go": p0,
        "storage.type.byte.go": p0,
        "storage.type.error.go": p0,
        "storage.type.numeric.go": p0,
        "storage.type.rune.go": p0,
        "storage.type.string.go": p0,
        "storage.type.uintptr.go": p0,
        "string.quoted.double.go": s1,
        "string.quoted.raw.go": s1,
        "string.quoted.rune.go": s1,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function gomod() {
  return {
    id: "go.mod",
    name: "Go Module",
    vscode: {
      name: "Go (golang)",
      url: "https://github.com/golang/vscode-go/tree/v0.41.2/",
      scope: "go.mod",
      files: ["https://github.com/golang/vscode-go/blob/v0.41.2/extension/syntaxes/go.mod.tmGrammar.json/"],
    },
    example: {
      author: {
        name: "Maas Lalani",
        url: "https://github.com/maaslalani/",
      },
      source: {
        name: "Invoice",
        file: "https://github.com/maaslalani/invoice/blob/v0.1.0/go.mod/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s1 = c.string[1]

      return {
        "comment.line.double-slash.go.mod": c0,
        "constant.language.go.mod": s1,
        "constant.other.placeholder.go.mod": p0,
        "keyword.go.mod": p0,
        "operator.go.mod": p0,
        "punctuation.definition.string.begin.go.mod": p0,
        "punctuation.definition.string.end.go.mod": p0,
        "go.mod": p1,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function gosum() {
  return {
    id: "go.sum",
    name: "Go Sum",
    vscode: {
      name: "Go (golang)",
      url: "https://github.com/golang/vscode-go/tree/v0.41.2/",
      scope: "go.sum",
      files: ["https://github.com/golang/vscode-go/blob/v0.41.2/extension/syntaxes/go.sum.tmGrammar.json/"],
    },
    example: {
      author: {
        name: "Maas Lalani",
        url: "https://github.com/maaslalani/",
      },
      source: {
        name: "Invoice",
        file: "https://github.com/maaslalani/invoice/blob/v0.1.0/go.sum/",
      },
    },
    tokenColors(c) {
      let p1 = c.plain[1]
      let s1 = c.string[1]

      return {
        "constant.language.go.sum": s1,
        "go.sum": p1,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function html() {
  return {
    id: "html",
    name: "HTML",
    vscode: {
      name: "HTML Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/html/",
      scope: "text.html.derivative",
      files: [
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/html/syntaxes/html-derivative.tmLanguage.json/",
        "https://github.com/microsoft/vscode/blob/1.87.0/extensions/html/syntaxes/html.tmLanguage.json/",
      ],
    },
    example: {
      author: {
        name: "Vadim Makeev",
        url: "https://github.com/pepelsbey/",
      },
      source: {
        name: "Two Columns Article",
        file: "https://github.com/pepelsbey/pepelsbey.dev/blob/6f3c41050ea299da49b3358e2c87108fd0404a52/src/articles/two-columns/demos/flexbox.html/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s1 = c.string[1]

      return {
        "comment.block.html": c0,
        "entity.other.attribute-name.html": p0,
        "meta.tag.custom.end.html entity.name.tag.html": p0,
        "meta.tag.custom.start.html entity.name.tag.html": p1,
        "meta.tag.inline.a.end.html entity.name.tag.html": p0,
        "meta.tag.inline.a.start.html entity.name.tag.html": p1,
        "meta.tag.inline.abbr.end.html entity.name.tag.html": p0,
        "meta.tag.inline.abbr.start.html entity.name.tag.html": p1,
        "meta.tag.inline.acronym.end.html entity.name.tag.html": p0,
        "meta.tag.inline.acronym.start.html entity.name.tag.html": p1,
        "meta.tag.inline.area.void.html entity.name.tag.html": p1,
        "meta.tag.inline.b.end.html entity.name.tag.html": p0,
        "meta.tag.inline.b.start.html entity.name.tag.html": p1,
        "meta.tag.inline.bdi.end.html entity.name.tag.html": p0,
        "meta.tag.inline.bdi.start.html entity.name.tag.html": p1,
        "meta.tag.inline.bdo.end.html entity.name.tag.html": p0,
        "meta.tag.inline.bdo.start.html entity.name.tag.html": p1,
        "meta.tag.inline.big.end.html entity.name.tag.html": p0,
        "meta.tag.inline.big.start.html entity.name.tag.html": p1,
        "meta.tag.inline.blink.end.html entity.name.tag.html": p0,
        "meta.tag.inline.blink.start.html entity.name.tag.html": p1,
        "meta.tag.inline.br.void.html entity.name.tag.html": p1,
        "meta.tag.inline.cite.end.html entity.name.tag.html": p0,
        "meta.tag.inline.cite.start.html entity.name.tag.html": p1,
        "meta.tag.inline.code.end.html entity.name.tag.html": p0,
        "meta.tag.inline.code.start.html entity.name.tag.html": p1,
        "meta.tag.inline.data.end.html entity.name.tag.html": p0,
        "meta.tag.inline.data.start.html entity.name.tag.html": p1,
        "meta.tag.inline.del.end.html entity.name.tag.html": p0,
        "meta.tag.inline.del.start.html entity.name.tag.html": p1,
        "meta.tag.inline.dfn.end.html entity.name.tag.html": p0,
        "meta.tag.inline.dfn.start.html entity.name.tag.html": p1,
        "meta.tag.inline.em.end.html entity.name.tag.html": p0,
        "meta.tag.inline.em.start.html entity.name.tag.html": p1,
        "meta.tag.inline.font.end.html entity.name.tag.html": p0,
        "meta.tag.inline.font.start.html entity.name.tag.html": p1,
        "meta.tag.inline.i.end.html entity.name.tag.html": p0,
        "meta.tag.inline.i.start.html entity.name.tag.html": p1,
        "meta.tag.inline.ins.end.html entity.name.tag.html": p0,
        "meta.tag.inline.ins.start.html entity.name.tag.html": p1,
        "meta.tag.inline.kbd.end.html entity.name.tag.html": p0,
        "meta.tag.inline.kbd.start.html entity.name.tag.html": p1,
        "meta.tag.inline.mark.end.html entity.name.tag.html": p0,
        "meta.tag.inline.mark.start.html entity.name.tag.html": p1,
        "meta.tag.inline.math.maligngroup.end.html entity.name.tag.html": p0,
        "meta.tag.inline.math.maligngroup.start.html entity.name.tag.html": p1,
        "meta.tag.inline.math.maligngroup.void.html entity.name.tag.html": p1,
        "meta.tag.inline.math.malignmark.end.html entity.name.tag.html": p0,
        "meta.tag.inline.math.malignmark.start.html entity.name.tag.html": p1,
        "meta.tag.inline.math.malignmark.void.html entity.name.tag.html": p1,
        "meta.tag.inline.math.mi.end.html entity.name.tag.html": p0,
        "meta.tag.inline.math.mi.start.html entity.name.tag.html": p1,
        "meta.tag.inline.math.mi.void.html entity.name.tag.html": p1,
        "meta.tag.inline.math.mn.end.html entity.name.tag.html": p0,
        "meta.tag.inline.math.mn.start.html entity.name.tag.html": p1,
        "meta.tag.inline.math.mn.void.html entity.name.tag.html": p1,
        "meta.tag.inline.math.mo.end.html entity.name.tag.html": p0,
        "meta.tag.inline.math.mo.start.html entity.name.tag.html": p1,
        "meta.tag.inline.math.mo.void.html entity.name.tag.html": p1,
        "meta.tag.inline.math.ms.end.html entity.name.tag.html": p0,
        "meta.tag.inline.math.ms.start.html entity.name.tag.html": p1,
        "meta.tag.inline.math.ms.void.html entity.name.tag.html": p1,
        "meta.tag.inline.math.mspace.end.html entity.name.tag.html": p0,
        "meta.tag.inline.math.mspace.start.html entity.name.tag.html": p1,
        "meta.tag.inline.math.mspace.void.html entity.name.tag.html": p1,
        "meta.tag.inline.math.mtext.end.html entity.name.tag.html": p0,
        "meta.tag.inline.math.mtext.start.html entity.name.tag.html": p1,
        "meta.tag.inline.math.mtext.void.html entity.name.tag.html": p1,
        "meta.tag.inline.q.end.html entity.name.tag.html": p0,
        "meta.tag.inline.q.start.html entity.name.tag.html": p1,
        "meta.tag.inline.rp.end.html entity.name.tag.html": p0,
        "meta.tag.inline.rp.start.html entity.name.tag.html": p1,
        "meta.tag.inline.rt.end.html entity.name.tag.html": p0,
        "meta.tag.inline.rt.start.html entity.name.tag.html": p1,
        "meta.tag.inline.ruby.end.html entity.name.tag.html": p0,
        "meta.tag.inline.ruby.start.html entity.name.tag.html": p1,
        "meta.tag.inline.s.end.html entity.name.tag.html": p0,
        "meta.tag.inline.s.start.html entity.name.tag.html": p1,
        "meta.tag.inline.samp.end.html entity.name.tag.html": p0,
        "meta.tag.inline.samp.start.html entity.name.tag.html": p1,
        "meta.tag.inline.small.end.html entity.name.tag.html": p0,
        "meta.tag.inline.small.start.html entity.name.tag.html": p1,
        "meta.tag.inline.span.end.html entity.name.tag.html": p0,
        "meta.tag.inline.span.start.html entity.name.tag.html": p1,
        "meta.tag.inline.strike.end.html entity.name.tag.html": p0,
        "meta.tag.inline.strike.start.html entity.name.tag.html": p1,
        "meta.tag.inline.strong.end.html entity.name.tag.html": p0,
        "meta.tag.inline.strong.start.html entity.name.tag.html": p1,
        "meta.tag.inline.sub.end.html entity.name.tag.html": p0,
        "meta.tag.inline.sub.start.html entity.name.tag.html": p1,
        "meta.tag.inline.sup.end.html entity.name.tag.html": p0,
        "meta.tag.inline.sup.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.a.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.a.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.a.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.animate.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.animate.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.animate.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.discard.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.discard.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.discard.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feBlend.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feBlend.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feBlend.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feColorMatrix.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feColorMatrix.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feColorMatrix.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feComposite.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feComposite.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feComposite.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feConvolveMatrix.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feConvolveMatrix.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feConvolveMatrix.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feDisplacementMap.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feDisplacementMap.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feDisplacementMap.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feDistantLight.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feDistantLight.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feDistantLight.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feDropShadow.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feDropShadow.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feDropShadow.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feFlood.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feFlood.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feFlood.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feFuncA.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feFuncA.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feFuncA.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feFuncB.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feFuncB.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feFuncB.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feFuncG.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feFuncG.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feFuncG.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feFuncR.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feFuncR.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feFuncR.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feGaussianBlur.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feGaussianBlur.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feGaussianBlur.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feMergeNode.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feMergeNode.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feMergeNode.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feMorphology.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feMorphology.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feMorphology.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feOffset.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feOffset.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feOffset.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.fePointLight.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.fePointLight.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.fePointLight.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feSpotLight.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feSpotLight.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feSpotLight.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feTile.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feTile.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feTile.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feTurbulence.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.feTurbulence.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.feTurbulence.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.hatchPath.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.hatchPath.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.hatchPath.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.mpath.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.mpath.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.mpath.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.set.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.set.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.set.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.solidcolor.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.solidcolor.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.solidcolor.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.stop.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.stop.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.stop.void.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.tspan.end.html entity.name.tag.html": p0,
        "meta.tag.inline.svg.tspan.start.html entity.name.tag.html": p1,
        "meta.tag.inline.svg.tspan.void.html entity.name.tag.html": p1,
        "meta.tag.inline.time.end.html entity.name.tag.html": p0,
        "meta.tag.inline.time.start.html entity.name.tag.html": p1,
        "meta.tag.inline.tt.end.html entity.name.tag.html": p0,
        "meta.tag.inline.tt.start.html entity.name.tag.html": p1,
        "meta.tag.inline.u.end.html entity.name.tag.html": p0,
        "meta.tag.inline.u.start.html entity.name.tag.html": p1,
        "meta.tag.inline.var.end.html entity.name.tag.html": p0,
        "meta.tag.inline.var.start.html entity.name.tag.html": p1,
        "meta.tag.inline.wbr.void.html entity.name.tag.html": p1,
        "meta.tag.inline.xmp.end.html entity.name.tag.html": p0,
        "meta.tag.inline.xmp.start.html entity.name.tag.html": p1,
        "meta.tag.metadata.base.void.html entity.name.tag.html": p1,
        "meta.tag.metadata.basefont.void.html entity.name.tag.html": p1,
        "meta.tag.metadata.cdata.html": p0,
        "meta.tag.metadata.doctype.html entity.other.attribute-name.html": p0,
        "meta.tag.metadata.doctype.html": p0,
        "meta.tag.metadata.isindex.void.html entity.name.tag.html": p1,
        "meta.tag.metadata.link.void.html entity.name.tag.html": p1,
        "meta.tag.metadata.meta.void.html entity.name.tag.html": p1,
        "meta.tag.metadata.noscript.end.html entity.name.tag.html": p0,
        "meta.tag.metadata.noscript.start.html entity.name.tag.html": p1,
        "meta.tag.metadata.processing.xml.html entity.other.attribute-name.html": p0,
        "meta.tag.metadata.processing.xml.html string.quoted.double.html": p0,
        "meta.tag.metadata.processing.xml.html string.quoted.single.html": p0,
        "meta.tag.metadata.processing.xml.html string.unquoted.html": p0,
        "meta.tag.metadata.processing.xml.html": p0,
        "meta.tag.metadata.script.end.html entity.name.tag.html": p0,
        "meta.tag.metadata.script.start.html entity.name.tag.html": p1,
        "meta.tag.metadata.style.end.html entity.name.tag.html": p0,
        "meta.tag.metadata.style.start.html entity.name.tag.html": p1,
        "meta.tag.metadata.svg.color-profile.end.html entity.name.tag.html": p0,
        "meta.tag.metadata.svg.color-profile.start.html entity.name.tag.html": p1,
        "meta.tag.metadata.svg.color-profile.void.html entity.name.tag.html": p1,
        "meta.tag.metadata.svg.desc.end.html entity.name.tag.html": p0,
        "meta.tag.metadata.svg.desc.start.html entity.name.tag.html": p1,
        "meta.tag.metadata.svg.desc.void.html entity.name.tag.html": p1,
        "meta.tag.metadata.svg.metadata.end.html entity.name.tag.html": p0,
        "meta.tag.metadata.svg.metadata.start.html entity.name.tag.html": p1,
        "meta.tag.metadata.svg.metadata.void.html entity.name.tag.html": p1,
        "meta.tag.metadata.svg.script.end.html entity.name.tag.html": p0,
        "meta.tag.metadata.svg.script.start.html entity.name.tag.html": p1,
        "meta.tag.metadata.svg.script.void.html entity.name.tag.html": p1,
        "meta.tag.metadata.svg.style.end.html entity.name.tag.html": p0,
        "meta.tag.metadata.svg.style.start.html entity.name.tag.html": p1,
        "meta.tag.metadata.svg.style.void.html entity.name.tag.html": p1,
        "meta.tag.metadata.svg.title.end.html entity.name.tag.html": p0,
        "meta.tag.metadata.svg.title.start.html entity.name.tag.html": p1,
        "meta.tag.metadata.svg.title.void.html entity.name.tag.html": p1,
        "meta.tag.metadata.title.end.html entity.name.tag.html": p0,
        "meta.tag.metadata.title.start.html entity.name.tag.html": p1,
        "meta.tag.object.applet.end.html entity.name.tag.html": p0,
        "meta.tag.object.applet.start.html entity.name.tag.html": p1,
        "meta.tag.object.audio.end.html entity.name.tag.html": p0,
        "meta.tag.object.audio.start.html entity.name.tag.html": p1,
        "meta.tag.object.canvas.end.html entity.name.tag.html": p0,
        "meta.tag.object.canvas.start.html entity.name.tag.html": p1,
        "meta.tag.object.embed.void.html entity.name.tag.html": p1,
        "meta.tag.object.frame.void.html entity.name.tag.html": p1,
        "meta.tag.object.iframe.end.html entity.name.tag.html": p0,
        "meta.tag.object.iframe.start.html entity.name.tag.html": p1,
        "meta.tag.object.img.void.html entity.name.tag.html": p1,
        "meta.tag.object.math.mglyph.end.html entity.name.tag.html": p0,
        "meta.tag.object.math.mglyph.start.html entity.name.tag.html": p1,
        "meta.tag.object.math.mglyph.void.html entity.name.tag.html": p1,
        "meta.tag.object.object.end.html entity.name.tag.html": p0,
        "meta.tag.object.object.start.html entity.name.tag.html": p1,
        "meta.tag.object.param.void.html entity.name.tag.html": p1,
        "meta.tag.object.picture.end.html entity.name.tag.html": p0,
        "meta.tag.object.picture.start.html entity.name.tag.html": p1,
        "meta.tag.object.source.void.html entity.name.tag.html": p1,
        "meta.tag.object.svg.a.end.html entity.name.tag.html": p0,
        "meta.tag.object.svg.a.start.html entity.name.tag.html": p1,
        "meta.tag.object.svg.circle.end.html entity.name.tag.html": p0,
        "meta.tag.object.svg.circle.start.html entity.name.tag.html": p1,
        "meta.tag.object.svg.circle.void.html entity.name.tag.html": p1,
        "meta.tag.object.svg.ellipse.end.html entity.name.tag.html": p0,
        "meta.tag.object.svg.ellipse.start.html entity.name.tag.html": p1,
        "meta.tag.object.svg.ellipse.void.html entity.name.tag.html": p1,
        "meta.tag.object.svg.feImage.end.html entity.name.tag.html": p0,
        "meta.tag.object.svg.feImage.start.html entity.name.tag.html": p1,
        "meta.tag.object.svg.feImage.void.html entity.name.tag.html": p1,
        "meta.tag.object.svg.foreignObject.end.html entity.name.tag.html": p0,
        "meta.tag.object.svg.foreignObject.start.html entity.name.tag.html": p1,
        "meta.tag.object.svg.foreignObject.void.html entity.name.tag.html": p1,
        "meta.tag.object.svg.image.end.html entity.name.tag.html": p0,
        "meta.tag.object.svg.image.start.html entity.name.tag.html": p1,
        "meta.tag.object.svg.image.void.html entity.name.tag.html": p1,
        "meta.tag.object.svg.line.end.html entity.name.tag.html": p0,
        "meta.tag.object.svg.line.start.html entity.name.tag.html": p1,
        "meta.tag.object.svg.line.void.html entity.name.tag.html": p1,
        "meta.tag.object.svg.path.end.html entity.name.tag.html": p0,
        "meta.tag.object.svg.path.start.html entity.name.tag.html": p1,
        "meta.tag.object.svg.path.void.html entity.name.tag.html": p1,
        "meta.tag.object.svg.polygon.end.html entity.name.tag.html": p0,
        "meta.tag.object.svg.polygon.start.html entity.name.tag.html": p1,
        "meta.tag.object.svg.polygon.void.html entity.name.tag.html": p1,
        "meta.tag.object.svg.polyline.end.html entity.name.tag.html": p0,
        "meta.tag.object.svg.polyline.start.html entity.name.tag.html": p1,
        "meta.tag.object.svg.polyline.void.html entity.name.tag.html": p1,
        "meta.tag.object.svg.rect.end.html entity.name.tag.html": p0,
        "meta.tag.object.svg.rect.start.html entity.name.tag.html": p1,
        "meta.tag.object.svg.rect.void.html entity.name.tag.html": p1,
        "meta.tag.object.svg.symbol.end.html entity.name.tag.html": p0,
        "meta.tag.object.svg.symbol.start.html entity.name.tag.html": p1,
        "meta.tag.object.svg.symbol.void.html entity.name.tag.html": p1,
        "meta.tag.object.svg.use.end.html entity.name.tag.html": p0,
        "meta.tag.object.svg.use.start.html entity.name.tag.html": p1,
        "meta.tag.object.svg.use.void.html entity.name.tag.html": p1,
        "meta.tag.object.svg.view.end.html entity.name.tag.html": p0,
        "meta.tag.object.svg.view.start.html entity.name.tag.html": p1,
        "meta.tag.object.svg.view.void.html entity.name.tag.html": p1,
        "meta.tag.object.track.void.html entity.name.tag.html": p1,
        "meta.tag.object.video.end.html entity.name.tag.html": p0,
        "meta.tag.object.video.start.html entity.name.tag.html": p1,
        "meta.tag.other.dir.end.html entity.name.tag.html": p0,
        "meta.tag.other.dir.start.html entity.name.tag.html": p1,
        "meta.tag.other.keygen.end.html entity.name.tag.html": p0,
        "meta.tag.other.keygen.start.html entity.name.tag.html": p1,
        "meta.tag.other.listing.end.html entity.name.tag.html": p0,
        "meta.tag.other.listing.start.html entity.name.tag.html": p1,
        "meta.tag.other.menuitem.end.html entity.name.tag.html": p0,
        "meta.tag.other.menuitem.start.html entity.name.tag.html": p1,
        "meta.tag.other.plaintext.end.html entity.name.tag.html": p0,
        "meta.tag.other.plaintext.start.html entity.name.tag.html": p1,
        "meta.tag.other.spacer.end.html entity.name.tag.html": p0,
        "meta.tag.other.spacer.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.altGlyph.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.altGlyph.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.altGlyph.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.altGlyphDef.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.altGlyphDef.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.altGlyphDef.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.altGlyphItem.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.altGlyphItem.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.altGlyphItem.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.animateColor.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.animateColor.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.animateColor.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.animateTransform.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.animateTransform.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.animateTransform.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.cursor.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.cursor.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.cursor.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.font-face-format.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.font-face-format.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.font-face-format.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.font-face-name.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.font-face-name.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.font-face-name.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.font-face-src.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.font-face-src.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.font-face-src.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.font-face-uri.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.font-face-uri.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.font-face-uri.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.font-face.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.font-face.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.font-face.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.font.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.font.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.font.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.glyph.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.glyph.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.glyph.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.glyphRef.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.glyphRef.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.glyphRef.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.hkern.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.hkern.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.hkern.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.missing-glyph.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.missing-glyph.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.missing-glyph.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.tref.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.tref.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.tref.void.html entity.name.tag.html": p1,
        "meta.tag.other.svg.vkern.end.html entity.name.tag.html": p0,
        "meta.tag.other.svg.vkern.start.html entity.name.tag.html": p1,
        "meta.tag.other.svg.vkern.void.html entity.name.tag.html": p1,
        "meta.tag.other.unrecognized.html.derivative entity.name.tag.html": p1,
        "meta.tag.other.unrecognized.html.derivative punctuation.definition.tag.begin.html": p1,
        "meta.tag.other.unrecognized.html.derivative punctuation.definition.tag.end.html": p1,
        "meta.tag.structure.address.end.html entity.name.tag.html": p0,
        "meta.tag.structure.address.start.html entity.name.tag.html": p1,
        "meta.tag.structure.article.end.html entity.name.tag.html": p0,
        "meta.tag.structure.article.start.html entity.name.tag.html": p1,
        "meta.tag.structure.aside.end.html entity.name.tag.html": p0,
        "meta.tag.structure.aside.start.html entity.name.tag.html": p1,
        "meta.tag.structure.blockquote.end.html entity.name.tag.html": p0,
        "meta.tag.structure.blockquote.start.html entity.name.tag.html": p1,
        "meta.tag.structure.body.end.html entity.name.tag.html": p0,
        "meta.tag.structure.body.start.html entity.name.tag.html": p1,
        "meta.tag.structure.button.end.html entity.name.tag.html": p0,
        "meta.tag.structure.button.start.html entity.name.tag.html": p1,
        "meta.tag.structure.caption.end.html entity.name.tag.html": p0,
        "meta.tag.structure.caption.start.html entity.name.tag.html": p1,
        "meta.tag.structure.center.end.html entity.name.tag.html": p0,
        "meta.tag.structure.center.start.html entity.name.tag.html": p1,
        "meta.tag.structure.col.void.html entity.name.tag.html": p1,
        "meta.tag.structure.colgroup.end.html entity.name.tag.html": p0,
        "meta.tag.structure.colgroup.start.html entity.name.tag.html": p1,
        "meta.tag.structure.datalist.end.html entity.name.tag.html": p0,
        "meta.tag.structure.datalist.start.html entity.name.tag.html": p1,
        "meta.tag.structure.dd.end.html entity.name.tag.html": p0,
        "meta.tag.structure.dd.start.html entity.name.tag.html": p1,
        "meta.tag.structure.details.end.html entity.name.tag.html": p0,
        "meta.tag.structure.details.start.html entity.name.tag.html": p1,
        "meta.tag.structure.dialog.end.html entity.name.tag.html": p0,
        "meta.tag.structure.dialog.start.html entity.name.tag.html": p1,
        "meta.tag.structure.div.end.html entity.name.tag.html": p0,
        "meta.tag.structure.div.start.html entity.name.tag.html": p1,
        "meta.tag.structure.dl.end.html entity.name.tag.html": p0,
        "meta.tag.structure.dl.start.html entity.name.tag.html": p1,
        "meta.tag.structure.dt.end.html entity.name.tag.html": p0,
        "meta.tag.structure.dt.start.html entity.name.tag.html": p1,
        "meta.tag.structure.fieldset.end.html entity.name.tag.html": p0,
        "meta.tag.structure.fieldset.start.html entity.name.tag.html": p1,
        "meta.tag.structure.figcaption.end.html entity.name.tag.html": p0,
        "meta.tag.structure.figcaption.start.html entity.name.tag.html": p1,
        "meta.tag.structure.figure.end.html entity.name.tag.html": p0,
        "meta.tag.structure.figure.start.html entity.name.tag.html": p1,
        "meta.tag.structure.footer.end.html entity.name.tag.html": p0,
        "meta.tag.structure.footer.start.html entity.name.tag.html": p1,
        "meta.tag.structure.form.end.html entity.name.tag.html": p0,
        "meta.tag.structure.form.start.html entity.name.tag.html": p1,
        "meta.tag.structure.frameset.end.html entity.name.tag.html": p0,
        "meta.tag.structure.frameset.start.html entity.name.tag.html": p1,
        "meta.tag.structure.h1.end.html entity.name.tag.html": p0,
        "meta.tag.structure.h1.start.html entity.name.tag.html": p1,
        "meta.tag.structure.h2.end.html entity.name.tag.html": p0,
        "meta.tag.structure.h2.start.html entity.name.tag.html": p1,
        "meta.tag.structure.h3.end.html entity.name.tag.html": p0,
        "meta.tag.structure.h3.start.html entity.name.tag.html": p1,
        "meta.tag.structure.h4.end.html entity.name.tag.html": p0,
        "meta.tag.structure.h4.start.html entity.name.tag.html": p1,
        "meta.tag.structure.h5.end.html entity.name.tag.html": p0,
        "meta.tag.structure.h5.start.html entity.name.tag.html": p1,
        "meta.tag.structure.h6.end.html entity.name.tag.html": p0,
        "meta.tag.structure.h6.start.html entity.name.tag.html": p1,
        "meta.tag.structure.head.end.html entity.name.tag.html": p0,
        "meta.tag.structure.head.start.html entity.name.tag.html": p1,
        "meta.tag.structure.header.end.html entity.name.tag.html": p0,
        "meta.tag.structure.header.start.html entity.name.tag.html": p1,
        "meta.tag.structure.hgroup.end.html entity.name.tag.html": p0,
        "meta.tag.structure.hgroup.start.html entity.name.tag.html": p1,
        "meta.tag.structure.hr.void.html entity.name.tag.html": p1,
        "meta.tag.structure.html.end.html entity.name.tag.html": p0,
        "meta.tag.structure.html.start.html entity.name.tag.html": p1,
        "meta.tag.structure.input.void.html entity.name.tag.html": p1,
        "meta.tag.structure.label.end.html entity.name.tag.html": p0,
        "meta.tag.structure.label.start.html entity.name.tag.html": p1,
        "meta.tag.structure.legend.end.html entity.name.tag.html": p0,
        "meta.tag.structure.legend.start.html entity.name.tag.html": p1,
        "meta.tag.structure.li.end.html entity.name.tag.html": p0,
        "meta.tag.structure.li.start.html entity.name.tag.html": p1,
        "meta.tag.structure.main.end.html entity.name.tag.html": p0,
        "meta.tag.structure.main.start.html entity.name.tag.html": p1,
        "meta.tag.structure.map.end.html entity.name.tag.html": p0,
        "meta.tag.structure.map.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.annotation-xml.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.annotation-xml.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.annotation-xml.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.annotation.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.annotation.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.annotation.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.maction.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.maction.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.maction.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.menclose.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.menclose.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.menclose.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.merror.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.merror.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.merror.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mfenced.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mfenced.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mfenced.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mfrac.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mfrac.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mfrac.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mlabeledtr.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mlabeledtr.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mlabeledtr.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mlongdiv.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mlongdiv.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mlongdiv.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mmultiscripts.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mmultiscripts.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mmultiscripts.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mover.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mover.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mover.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mpadded.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mpadded.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mpadded.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mphantom.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mphantom.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mphantom.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mprescripts.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mprescripts.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mprescripts.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mroot.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mroot.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mroot.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mrow.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mrow.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mrow.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mscarries.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mscarries.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mscarries.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mscarry.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mscarry.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mscarry.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.msgroup.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.msgroup.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.msgroup.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.msline.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.msline.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.msline.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.msqrt.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.msqrt.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.msqrt.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.msrow.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.msrow.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.msrow.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mstack.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mstack.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mstack.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mstyle.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mstyle.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mstyle.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.msub.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.msub.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.msub.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.msubsup.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.msubsup.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.msubsup.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.msup.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.msup.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.msup.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mtable.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mtable.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mtable.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mtd.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mtd.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mtd.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mtr.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.mtr.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.mtr.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.munder.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.munder.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.munder.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.munderover.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.munderover.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.munderover.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.none.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.none.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.none.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.semantics.end.html entity.name.tag.html": p0,
        "meta.tag.structure.math.semantics.start.html entity.name.tag.html": p1,
        "meta.tag.structure.math.semantics.void.html entity.name.tag.html": p1,
        "meta.tag.structure.math.start.html entity.name.tag.html": p1,
        "meta.tag.structure.menu.end.html entity.name.tag.html": p0,
        "meta.tag.structure.menu.start.html entity.name.tag.html": p1,
        "meta.tag.structure.meter.end.html entity.name.tag.html": p0,
        "meta.tag.structure.meter.start.html entity.name.tag.html": p1,
        "meta.tag.structure.nav.end.html entity.name.tag.html": p0,
        "meta.tag.structure.nav.start.html entity.name.tag.html": p1,
        "meta.tag.structure.noembed.end.html entity.name.tag.html": p0,
        "meta.tag.structure.noembed.start.html entity.name.tag.html": p1,
        "meta.tag.structure.noframes.end.html entity.name.tag.html": p0,
        "meta.tag.structure.noframes.start.html entity.name.tag.html": p1,
        "meta.tag.structure.ol.end.html entity.name.tag.html": p0,
        "meta.tag.structure.ol.start.html entity.name.tag.html": p1,
        "meta.tag.structure.optgroup.end.html entity.name.tag.html": p0,
        "meta.tag.structure.optgroup.start.html entity.name.tag.html": p1,
        "meta.tag.structure.option.end.html entity.name.tag.html": p0,
        "meta.tag.structure.option.start.html entity.name.tag.html": p1,
        "meta.tag.structure.output.end.html entity.name.tag.html": p0,
        "meta.tag.structure.output.start.html entity.name.tag.html": p1,
        "meta.tag.structure.p.end.html entity.name.tag.html": p0,
        "meta.tag.structure.p.start.html entity.name.tag.html": p1,
        "meta.tag.structure.pre.end.html entity.name.tag.html": p0,
        "meta.tag.structure.pre.start.html entity.name.tag.html": p1,
        "meta.tag.structure.progress.end.html entity.name.tag.html": p0,
        "meta.tag.structure.progress.start.html entity.name.tag.html": p1,
        "meta.tag.structure.section.end.html entity.name.tag.html": p0,
        "meta.tag.structure.section.start.html entity.name.tag.html": p1,
        "meta.tag.structure.select.end.html entity.name.tag.html": p0,
        "meta.tag.structure.select.start.html entity.name.tag.html": p1,
        "meta.tag.structure.slot.end.html entity.name.tag.html": p0,
        "meta.tag.structure.slot.start.html entity.name.tag.html": p1,
        "meta.tag.structure.summary.end.html entity.name.tag.html": p0,
        "meta.tag.structure.summary.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.animateMotion.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.animateMotion.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.animateMotion.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.clipPath.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.clipPath.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.clipPath.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.defs.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.defs.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.defs.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.feComponentTransfer.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.feComponentTransfer.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.feComponentTransfer.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.feDiffuseLighting.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.feDiffuseLighting.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.feDiffuseLighting.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.feMerge.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.feMerge.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.feMerge.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.feSpecularLighting.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.feSpecularLighting.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.feSpecularLighting.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.filter.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.filter.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.filter.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.g.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.g.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.g.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.hatch.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.hatch.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.hatch.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.linearGradient.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.linearGradient.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.linearGradient.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.marker.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.marker.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.marker.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.mask.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.mask.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.mask.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.mesh.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.mesh.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.mesh.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.meshgradient.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.meshgradient.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.meshgradient.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.meshpatch.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.meshpatch.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.meshpatch.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.meshrow.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.meshrow.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.meshrow.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.pattern.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.pattern.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.pattern.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.radialGradient.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.radialGradient.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.radialGradient.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.switch.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.switch.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.switch.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.text.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.text.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.text.void.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.textPath.end.html entity.name.tag.html": p0,
        "meta.tag.structure.svg.textPath.start.html entity.name.tag.html": p1,
        "meta.tag.structure.svg.textPath.void.html entity.name.tag.html": p1,
        "meta.tag.structure.table.end.html entity.name.tag.html": p0,
        "meta.tag.structure.table.start.html entity.name.tag.html": p1,
        "meta.tag.structure.tbody.end.html entity.name.tag.html": p0,
        "meta.tag.structure.tbody.start.html entity.name.tag.html": p1,
        "meta.tag.structure.td.end.html entity.name.tag.html": p0,
        "meta.tag.structure.td.start.html entity.name.tag.html": p1,
        "meta.tag.structure.template.end.html entity.name.tag.html": p0,
        "meta.tag.structure.template.start.html entity.name.tag.html": p1,
        "meta.tag.structure.textarea.end.html entity.name.tag.html": p0,
        "meta.tag.structure.textarea.start.html entity.name.tag.html": p1,
        "meta.tag.structure.tfoot.end.html entity.name.tag.html": p0,
        "meta.tag.structure.tfoot.start.html entity.name.tag.html": p1,
        "meta.tag.structure.th.end.html entity.name.tag.html": p0,
        "meta.tag.structure.th.start.html entity.name.tag.html": p1,
        "meta.tag.structure.thead.end.html entity.name.tag.html": p0,
        "meta.tag.structure.thead.start.html entity.name.tag.html": p1,
        "meta.tag.structure.tr.end.html entity.name.tag.html": p0,
        "meta.tag.structure.tr.start.html entity.name.tag.html": p1,
        "meta.tag.structure.ul.end.html entity.name.tag.html": p0,
        "meta.tag.structure.ul.start.html entity.name.tag.html": p1,
        "punctuation.definition.string.begin.html": p0,
        "punctuation.definition.string.end.html": p0,
        "punctuation.definition.tag.begin.html": p0,
        "punctuation.definition.tag.end.html": p0,
        "punctuation.separator.key-value.html": p0,
        "string.quoted.double.html": p1,
        "string.quoted.single.html": p1,
        "string.unquoted.html": p1,
        "text.html.basic": s1,
        "text.html.derivative": s1,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function ini() {
  return {
    id: "ini",
    name: "INI",
    vscode: {
      name: "Ini Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/ini/",
      scope: "source.ini",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/ini/syntaxes/ini.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "Nushell",
        url: "https://github.com/nushell/",
      },
      source: {
        name: "Nushell",
        file: "https://github.com/nushell/nushell/blob/0.91.0/tests/fixtures/formats/sample.ini/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s0 = c.string[0]
      let s1 = c.string[1]

      return {
        "comment.line.number-sign.ini": c0,
        "comment.line.semicolon.ini": c0,
        "entity.name.section.group-title.ini": p1,
        "keyword.other.definition.ini": p1,
        "punctuation.definition.entity.ini": p0,
        "punctuation.definition.string.begin.ini": s0,
        "punctuation.definition.string.end.ini": s0,
        "punctuation.separator.key-value.ini": p0,
        "source.ini": s1,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function js() {
  return {
    id: "js",
    name: "JavaScript",
    vscode: {
      name: "JavaScript Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/javascript/",
      scope: "source.js",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/javascript/syntaxes/JavaScript.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "Luke Edwards",
        url: "https://github.com/lukeed/",
      },
      source: {
        name: "uvu",
        file: "https://github.com/lukeed/uvu/blob/v0.5.6/src/assert.js/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s0 = c.string[0]
      let s1 = c.string[1]

      return {
        "comment.block.documentation.js": c0,
        "comment.block.js": c0,
        "comment.line.double-slash.js": c0,
        "comment.line.shebang.js": c0,
        "comment.line.triple-slash.directive.js keyword.operator.assignment.js": c0,
        "comment.line.triple-slash.directive.js punctuation.definition.string.begin.js": c0,
        "comment.line.triple-slash.directive.js punctuation.definition.string.end.js": c0,
        "comment.line.triple-slash.directive.js string.quoted.double.js": c0,
        "comment.line.triple-slash.directive.js string.quoted.single.js": c0,
        "comment.line.triple-slash.directive.js": c0,
        "entity.other.attribute-name.directive.js": c0,
        "keyword.control.as.js": p0,
        "keyword.control.assert.js": p0,
        "keyword.control.conditional.js": p0,
        "keyword.control.default.js": p0,
        "keyword.control.export.js": p0,
        "keyword.control.flow.js": p0,
        "keyword.control.from.js": p0,
        "keyword.control.js": p0,
        "keyword.control.loop.js": p0,
        "keyword.control.satisfies.js": p0,
        "keyword.control.switch.js": p0,
        "keyword.control.trycatch.js": p0,
        "keyword.control.type.js": p0,
        "keyword.control.with.js": p0,
        "keyword.generator.asterisk.js": p0,
        "keyword.operator.arithmetic.js": p0,
        "keyword.operator.assignment.compound.bitwise.js": p0,
        "keyword.operator.assignment.compound.js": p0,
        "keyword.operator.assignment.js": p0,
        "keyword.operator.bitwise.js": p0,
        "keyword.operator.bitwise.shift.js": p0,
        "keyword.operator.comparison.js": p0,
        "keyword.operator.decrement.js": p0,
        "keyword.operator.definiteassignment.js": p0,
        "keyword.operator.expression.delete.js": p0,
        "keyword.operator.expression.in.js": p0,
        "keyword.operator.expression.infer.js": p0,
        "keyword.operator.expression.instanceof.js": p0,
        "keyword.operator.expression.is.js": p0,
        "keyword.operator.expression.keyof.js": p0,
        "keyword.operator.expression.of.js": p0,
        "keyword.operator.expression.typeof.js": p0,
        "keyword.operator.expression.void.js": p0,
        "keyword.operator.increment.js": p0,
        "keyword.operator.logical.js": p0,
        "keyword.operator.new.js": p0,
        "keyword.operator.optional.js": p0,
        "keyword.operator.relational.js": p0,
        "keyword.operator.rest.js": p0,
        "keyword.operator.spread.js": p0,
        "keyword.operator.ternary.js": p0,
        "keyword.operator.type.annotation.js": p0,
        "keyword.other.debugger.js": p0,
        "meta.brace.round.js": p0,
        "meta.brace.square.js": p0,
        "meta.delimiter.decimal.period.js": p0,
        "meta.embedded.line.js": p1,
        "meta.export.js punctuation.definition.string.begin.js": p0,
        "meta.export.js punctuation.definition.string.end.js": p0,
        "meta.export.js string.quoted.double.js": p1,
        "meta.export.js string.quoted.single.js": p1,
        "meta.import-equals.external.js keyword.control.import.js": p0,
        "meta.import-equals.internal.js keyword.control.import.js": p0,
        "meta.import.js keyword.control.import.js": p0,
        "meta.import.js punctuation.definition.string.begin.js": p0,
        "meta.import.js punctuation.definition.string.end.js": p0,
        "meta.import.js string.quoted.double.js": p1,
        "meta.import.js string.quoted.single.js": p1,
        "meta.return.type.arrow.js punctuation.definition.string.begin.js": p0,
        "meta.return.type.arrow.js punctuation.definition.string.end.js": p0,
        "meta.return.type.arrow.js punctuation.definition.string.template.begin.js": p0,
        "meta.return.type.arrow.js punctuation.definition.string.template.end.js": p0,
        "meta.return.type.arrow.js string.quoted.double.js": p0,
        "meta.return.type.arrow.js string.quoted.single.js": p0,
        "meta.return.type.arrow.js string.template.js": p0,
        "meta.return.type.arrow.js": p0,
        "meta.return.type.js punctuation.definition.string.begin.js": p0,
        "meta.return.type.js punctuation.definition.string.end.js": p0,
        "meta.return.type.js punctuation.definition.string.template.begin.js": p0,
        "meta.return.type.js punctuation.definition.string.template.end.js": p0,
        "meta.return.type.js string.quoted.double.js": p0,
        "meta.return.type.js string.quoted.single.js": p0,
        "meta.return.type.js string.template.js": p0,
        "meta.return.type.js": p0,
        "meta.type.annotation.js punctuation.definition.string.begin.js": p0,
        "meta.type.annotation.js punctuation.definition.string.end.js": p0,
        "meta.type.annotation.js punctuation.definition.string.template.begin.js": p0,
        "meta.type.annotation.js punctuation.definition.string.template.end.js": p0,
        "meta.type.annotation.js string.quoted.double.js": p0,
        "meta.type.annotation.js string.quoted.single.js": p0,
        "meta.type.annotation.js string.template.js": p0,
        "meta.type.annotation.js": p0,
        "meta.type.declaration.js entity.name.type.alias.js": p1,
        "meta.type.declaration.js meta.definition.property.js variable.object.property.js": p1,
        "meta.type.declaration.js meta.method.declaration.js entity.name.function.js": p1,
        "meta.type.declaration.js meta.method.declaration.js meta.parameters.js variable.parameter.js": p1,
        "meta.type.declaration.js punctuation.definition.string.begin.js": p0,
        "meta.type.declaration.js punctuation.definition.string.end.js": p0,
        "meta.type.declaration.js punctuation.definition.string.template.begin.js": p0,
        "meta.type.declaration.js punctuation.definition.string.template.end.js": p0,
        "meta.type.declaration.js string.quoted.double.js": p0,
        "meta.type.declaration.js string.quoted.single.js": p0,
        "meta.type.declaration.js string.template.js": p0,
        "meta.type.declaration.js": p0,
        "meta.type.parameters.js punctuation.definition.string.begin.js": p0,
        "meta.type.parameters.js punctuation.definition.string.end.js": p0,
        "meta.type.parameters.js punctuation.definition.string.template.begin.js": p0,
        "meta.type.parameters.js punctuation.definition.string.template.end.js": p0,
        "meta.type.parameters.js string.quoted.double.js": p0,
        "meta.type.parameters.js string.quoted.single.js": p0,
        "meta.type.parameters.js string.template.js": p0,
        "meta.type.parameters.js": p0,
        "punctuation.accessor.js": p0,
        "punctuation.accessor.optional.js": p0,
        "punctuation.decorator.js": p0,
        "punctuation.definition.binding-pattern.array.js": p0,
        "punctuation.definition.binding-pattern.object.js": p0,
        "punctuation.definition.block.js": p0,
        "punctuation.definition.parameters.begin.js": p0,
        "punctuation.definition.parameters.end.js": p0,
        "punctuation.definition.section.case-statement.js": p0,
        "punctuation.definition.string.begin.js": s0,
        "punctuation.definition.string.end.js": s0,
        "punctuation.definition.string.template.begin.js": s0,
        "punctuation.definition.string.template.end.js": s0,
        "punctuation.definition.tag.begin.js": p0,
        "punctuation.definition.tag.end.js": p0,
        "punctuation.definition.template-expression.begin.js": p0,
        "punctuation.definition.template-expression.end.js": p0,
        "punctuation.definition.typeparameters.begin.js": p0,
        "punctuation.definition.typeparameters.end.js": p0,
        "punctuation.section.embedded.begin.js": p0,
        "punctuation.section.embedded.end.js": p0,
        "punctuation.separator.comma.js": p0,
        "punctuation.separator.key-value.js": p0,
        "punctuation.separator.label.js": p0,
        "punctuation.separator.parameter.js": p0,
        "punctuation.terminator.statement.js": p0,
        "source.js": p1,
        "storage.modifier.async.js": p0,
        "storage.modifier.js": p0,
        "storage.type.class.js": p0,
        "storage.type.enum.js": p0,
        "storage.type.function.arrow.js": p0,
        "storage.type.function.js": p0,
        "storage.type.interface.js": p0,
        "storage.type.js": p0,
        "storage.type.namespace.js": p0,
        "storage.type.property.js": p0,
        "storage.type.type.js": p0,
        "string.quoted.double.js": s1,
        "string.quoted.single.js": s1,
        "string.regexp.js keyword.other.js": p0,
        "string.regexp.js": s1,
        "string.template.js": s1,
        "support.type.builtin.js": p0,
        "support.type.primitive.js": p0,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function json() {
  return {
    id: "json",
    name: "JSON",
    vscode: {
      name: "JSON Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/json/",
      scope: "source.json",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/json/syntaxes/JSON.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "typicode",
        url: "https://github.com/typicode/",
      },
      source: {
        name: "JSON Server",
        file: "https://github.com/typicode/json-server/blob/v0.17.4/package.json/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s0 = c.string[0]
      let s1 = c.string[1]

      return {
        "comment.line.double-slash.js": c0,

        "comment.block.documentation.json": c0,
        "comment.block.json": c0,
        "meta.structure.dictionary.value.json punctuation.definition.string.begin.json": s0,
        "meta.structure.dictionary.value.json punctuation.definition.string.end.json": s0,
        "punctuation.definition.array.begin.json": p0,
        "punctuation.definition.array.end.json": p0,
        "punctuation.definition.dictionary.begin.json": p0,
        "punctuation.definition.dictionary.end.json": p0,
        "punctuation.definition.string.begin.json": p0,
        "punctuation.definition.string.end.json": p0,
        "punctuation.separator.array.json": p0,
        "punctuation.separator.dictionary.key-value.json": p0,
        "punctuation.separator.dictionary.pair.json": p0,
        "punctuation.support.type.property-name.begin.json": p0,
        "punctuation.support.type.property-name.end.json": p0,
        "source.json": s1,
        "string.json support.type.property-name.json": p1,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function jsonc() {
  let p = json()

  return {
    id: "jsonc",
    extends: p.id,
    name: "JSON with Comments",
    vscode: {
      name: "JSON Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/json/",
      scope: "source.json.comments",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/json/syntaxes/JSONC.tmLanguage.json/"],
    },
    example: p.example,
    tokenColors(c) {
      let r = p.tokenColors(c)
      return port(r, ".json", ".json.comments")
    },
  }
}

/**
 * @returns {Syntax}
 */
function jsonl() {
  let p = json()

  return {
    id: "jsonl",
    extends: p.id,
    name: "JSON Lines",
    vscode: {
      name: "JSON Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/json/",
      scope: "source.json.lines",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/json/syntaxes/JSONL.tmLanguage.json/"],
    },
    example: p.example,
    tokenColors(c) {
      let r = p.tokenColors(c)
      return port(r, ".json", ".json.lines")
    },
  }
}

/**
 * @returns {Syntax}
 */
function jsx() {
  let p = js()

  return {
    id: "jsx",
    extends: p.id,
    name: "JSX",
    vscode: {
      name: "JavaScript Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/javascript/",
      scope: "source.js.jsx",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/javascript/syntaxes/JavaScriptReact.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "Semantic",
        url: "https://github.com/Semantic-Org/",
      },
      source: {
        name: "Semantic UI React",
        file: "https://github.com/Semantic-Org/Semantic-UI-React/blob/v2.1.5/docs/src/components/ComponentDoc/ComponentDoc.js/",
      },
    },
    tokenColors(c) {
      let r = p.tokenColors(c)
      return port(r, ".js", ".js.jsx")
    }
  }
}

/**
 * @returns {Syntax}
 */
function makefile() {
  return {
    id: "makefile",
    name: "Makefile",
    vscode: {
      name: "Make Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/make/",
      scope: "source.makefile",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/make/syntaxes/make.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "Meta",
        url: "https://github.com/facebook/",
      },
      source: {
        name: "zstd",
        file: "https://github.com/facebook/zstd/blob/zstd-0.4.2/Makefile/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]

      return {
        "comment.line.number-sign.makefile constant.character.escape.continuation.makefile": c0,
        "comment.line.number-sign.makefile": c0,
        "constant.character.escape.continuation.makefile": p0,
        "constant.other.placeholder.makefile": p0,
        "keyword.control.-.makefile": p0,
        "keyword.control.@.makefile": p0,
        "keyword.control.+.makefile": p0,
        "keyword.control.define.makefile": p0,
        "keyword.control.else.makefile": p0,
        "keyword.control.endif.makefile": p0,
        "keyword.control.export.makefile": p0,
        "keyword.control.ifdef.makefile": p0,
        "keyword.control.ifeq.makefile": p0,
        "keyword.control.ifndef.makefile": p0,
        "keyword.control.ifneq.makefile": p0,
        "keyword.control.include.makefile": p0,
        "keyword.control.override.makefile": p0,
        "keyword.control.private.makefile": p0,
        "keyword.control.undefine.makefile": p0,
        "keyword.control.unexport.makefile": p0,
        "keyword.control.vpath.makefile": p0,
        "punctuation.definition.variable.makefile": p0,
        "punctuation.separator.delimeter.comma.makefile": p0,
        "punctuation.separator.key-value.makefile": p0,
        "source.makefile": p1,
        "support.function.target.DEFAULT.makefile": p0,
        "support.function.target.DELETE_ON_ERROR.makefile": p0,
        "support.function.target.EXPORT_ALL_VARIABLES.makefile": p0,
        "support.function.target.IGNORE.makefile": p0,
        "support.function.target.INTERMEDIATE.makefile": p0,
        "support.function.target.LOW_RESOLUTION_TIME.makefile": p0,
        "support.function.target.NOTPARALLEL.makefile": p0,
        "support.function.target.ONESHELL.makefile": p0,
        "support.function.target.PHONY.makefile": p0,
        "support.function.target.POSIX.makefile": p0,
        "support.function.target.PRECIOUS.makefile": p0,
        "support.function.target.SECONDARY.makefile": p0,
        "support.function.target.SECONDEXPANSION.makefile": p0,
        "support.function.target.SILENT.makefile": p0,
        "support.function.target.SUFFIXES.makefile": p0,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function rb() {
  return {
    id: "rb",
    name: "Ruby",
    vscode: {
      name: "Ruby Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/ruby/",
      scope: "source.ruby",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/ruby/syntaxes/ruby.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "Ruby",
        url: "https://github.com/ruby/",
      },
      source: {
        name: "OpenURI",
        file: "https://github.com/ruby/open-uri/blob/v0.4.1/lib/open-uri.rb/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s0 = c.string[0]
      let s1 = c.string[1]

      return {
        "source.ruby punctuation.separator.key-value": p0,
        "punctuation.section.embedded.end.ruby source.ruby": p0,

        "comment.block.documentation.ruby": c0,
        "comment.line.number-sign.ruby": c0,
        "keyword.control.class.ruby": p0,
        "keyword.control.def.ruby": p0,
        "keyword.control.module.ruby": p0,
        "keyword.control.pseudo-method.ruby": p0,
        "keyword.control.ruby": p0,
        "keyword.control.start-block.ruby": p0,
        "keyword.operator.arithmetic.ruby": p0,
        "keyword.operator.assignment.augmented.ruby": p0,
        "keyword.operator.assignment.ruby": p0,
        "keyword.operator.comparison.ruby": p0,
        "keyword.operator.logical.ruby": p0,
        "keyword.operator.other.ruby": p0,
        "keyword.other.special-method.ruby": p0,
        "meta.require.ruby punctuation.definition.string.begin.ruby": p0,
        "meta.require.ruby punctuation.definition.string.end.ruby": p0,
        "meta.require.ruby string.quoted.double.ruby": p1,
        "punctuation.definition.constant.ruby": p0,
        "punctuation.definition.parameters.ruby": p0,
        "punctuation.definition.string.begin.ruby": s0,
        "punctuation.definition.string.end.ruby": s0,
        "punctuation.definition.string.ruby": s0,
        "punctuation.definition.variable.ruby": p0,
        "punctuation.section.array.begin.ruby": p0,
        "punctuation.section.array.end.ruby": p0,
        "punctuation.section.embedded.begin.ruby": p0,
        "punctuation.section.embedded.end.ruby": p0,
        "punctuation.section.function.begin.ruby": p0,
        "punctuation.section.function.end.ruby": p0,
        "punctuation.section.function.ruby": p0,
        "punctuation.section.scope.begin.ruby": p0,
        "punctuation.section.scope.end.ruby": p0,
        "punctuation.separator.arguments.ruby": p0,
        "punctuation.separator.method.ruby": p0,
        "punctuation.separator.namespace.ruby": p0,
        "punctuation.separator.object.ruby": p0,
        "punctuation.separator.statement.ruby": p0,
        "source.ruby": p1,
        "string.interpolated.ruby": s1,
        "string.quoted.double.ruby": s1,
        "string.quoted.other.interpolated.ruby": s1,
        "string.quoted.single.ruby": s1,
        "string.regexp.classic.ruby": s1,
        "string.regexp.percent.ruby": s1,
        "support.function.kernel.lambda.ruby": p0,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function rs() {
  return {
    id: "rs",
    name: "Rust",
    vscode: {
      name: "Rust Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/rust/",
      scope: "source.rust",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/rust/syntaxes/rust.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "Rust",
        url: "https://github.com/rust-lang/"
      },
      source: {
        name: "Cargo",
        file: "https://github.com/rust-lang/cargo/blob/0.79.0/src/bin/cargo/main.rs/"
      }
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s0 = c.string[0]
      let s1 = c.string[1]

      return {
        "comment.block.documentation.rust": c0,
        "comment.block.rust": c0,
        "comment.line.documentation.rust": c0,
        "comment.line.double-slash.rust": c0,
        "entity.name.type.numeric.rust": p0,
        "entity.name.type.primitive.rust": p0,
        "keyword.control.rust": p0,
        "keyword.declaration.enum.rust": p0,
        "keyword.declaration.struct.rust": p0,
        "keyword.declaration.trait.rust": p0,
        "keyword.declaration.type.rust": p0,
        "keyword.operator.access.dot.rust": p0,
        "keyword.operator.arrow.fat.rust": p0,
        "keyword.operator.arrow.skinny.rust": p0,
        "keyword.operator.assignment.equal.rust": p0,
        "keyword.operator.assignment.rust": p0,
        "keyword.operator.borrow.and.rust": p0,
        "keyword.operator.comparison.rust": p0,
        "keyword.operator.dereference.rust": p0,
        "keyword.operator.key-value.rust": p0,
        "keyword.operator.logical.rust": p0,
        "keyword.operator.macro.dollar.rust": p0,
        "keyword.operator.math.rust": p0,
        "keyword.operator.namespace.rust": p0,
        "keyword.operator.question.rust": p0,
        "keyword.operator.range.rust": p0,
        "keyword.operator.subpattern.rust": p0,
        "keyword.other.crate.rust": p0,
        "keyword.other.fn.rust": p0,
        "keyword.other.rust": p0,
        "meta.attribute.rust punctuation.definition.string.rust": p0,
        "meta.attribute.rust string.quoted.double.rust": p0,
        "meta.attribute.rust": p0,
        "meta.interpolation.rust": p1,
        "punctuation.brackets.angle.rust": p0,
        "punctuation.brackets.curly.rust": p0,
        "punctuation.brackets.round.rust": p0,
        "punctuation.brackets.square.rust": p0,
        "punctuation.comma.rust": p0,
        "punctuation.definition.char.rust": s0,
        "punctuation.definition.interpolation.rust": p0,
        "punctuation.definition.lifetime.rust": p0,
        "punctuation.definition.string.raw.rust": s0,
        "punctuation.definition.string.rust": s0,
        "punctuation.semi.rust": p0,
        "punctuation.separator.dot.decimal.rust": p0,
        "source.rust": p1,
        "storage.modifier.mut.rust": p0,
        "storage.modifier.rust": p0,
        "storage.type.rust": p0,
        "string.quoted.byte.raw.rust": p0,
        "string.quoted.double.rust": s1,
        "string.quoted.single.char.rust": s1,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function sh() {
  return {
    id: "sh",
    name: "Shell Script",
    vscode: {
      name: "Shell Script Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/blob/1.89.0/extensions/shellscript/",
      scope: "source.shell",
      files: ["https://github.com/microsoft/vscode/blob/1.89.0/extensions/shellscript/syntaxes/shell-unix-bash.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "LLVM",
        url: "https://github.com/llvm/",
      },
      source: {
        name: "BOLT",
        file: "https://github.com/llvm/llvm-project/blob/llvmorg-18.1.5/bolt/utils/bughunter.sh/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s0 = c.string[0]
      let s1 = c.string[1]

      return {
        "comment.line.number-sign.shell": c0,
        "constant.character.escape.line-continuation.shell": p0,
        "entity.name.command.shell": p1,
        "keyword.control.break.shell": p0,
        "keyword.control.case.shell": p0,
        "keyword.control.continue.shell": p0,
        "keyword.control.do.shell": p0,
        "keyword.control.done.shell": p0,
        "keyword.control.elif.shell": p0,
        "keyword.control.else.shell": p0,
        "keyword.control.esac.shell": p0,
        "keyword.control.fi.shell": p0,
        "keyword.control.for.shell": p0,
        "keyword.control.if.shell": p0,
        "keyword.control.in.shell": p0,
        "keyword.control.return.shell": p0,
        "keyword.control.shell": p0,
        "keyword.control.then.shell": p0,
        "keyword.operator.assignment.compound.shell": p0,
        "keyword.operator.assignment.shell": p0,
        "keyword.operator.expansion.shell": p0,
        "keyword.operator.glob.shell": p0,
        "keyword.operator.heredoc.shell": p0,
        "keyword.operator.herestring.shell": p0,
        "keyword.operator.logical.regex.shell": p0,
        "keyword.operator.logical.shell": p0,
        "keyword.operator.pattern.case.default.shell": p0,
        "keyword.operator.pattern.case.shell": p0,
        "keyword.operator.pipe.shell": p0,
        "keyword.operator.redirect.0.shell": p0,
        "keyword.operator.redirect.3.shell": p0,
        "keyword.operator.redirect.4.shell": p0,
        "keyword.operator.redirect.5.shell": p0,
        "keyword.operator.redirect.6.shell": p0,
        "keyword.operator.redirect.7.shell": p0,
        "keyword.operator.redirect.8.shell": p0,
        "keyword.operator.redirect.9.shell": p0,
        "keyword.operator.redirect.shell": p0,
        "keyword.operator.redirect.stderr.shell": p0,
        "keyword.operator.redirect.stdout.shell": p0,
        "keyword.operator.tilde.shell": p0,
        "punctuation.definition.arguments.shell": p0,
        "punctuation.definition.array.shell": p0,
        "punctuation.definition.evaluation.backticks.shell": s0,
        "punctuation.definition.logical-expression.shell": p0,
        "punctuation.definition.string.begin.shell entity.name.command.shell": s0,
        "punctuation.definition.string.begin.shell": s0,
        "punctuation.definition.string.end.shell entity.name.command.shell": s0,
        "punctuation.definition.string.end.shell": s0,
        "punctuation.definition.string.heredoc.delimiter.shell": p0,
        "punctuation.definition.string.heredoc.quote.shell": p0,
        "punctuation.definition.subshell.single.shell": p0,
        "punctuation.definition.variable.shell variable.other.normal.shell": p0,
        "punctuation.definition.variable.shell variable.parameter.positional.all.shell": p0,
        "punctuation.definition.variable.shell variable.parameter.positional.shell": p0,
        "punctuation.definition.variable.shell": p0,
        "punctuation.section.array.shell": p0,
        "punctuation.section.function.definition.shell": p0,
        "punctuation.separator.statement.and.shell": p0,
        "punctuation.terminator.statement.case.shell": p0,
        "punctuation.terminator.statement.semicolon.shell": p0,
        "source.shell meta.statement.command.name.continuation string.quoted.double": s1,
        "source.shell meta.statement.command.name.continuation string.quoted.single": s1,
        "source.shell string.quoted.heredoc.no-indent": s1,
        "source.shell": p1,
        "storage.modifier.declare.shell": p0,
        "storage.modifier.export.shell": p0,
        "storage.modifier.local.shell": p0,
        "storage.modifier.readonly.shell": p0,
        "storage.modifier.typeset.shell": p0,
        "storage.type.alias.shell": p0,
        "storage.type.function.shell": p0,
        "string.quoted.double.shell": s1,
        "string.quoted.single.dollar.shell": s1,
        "string.quoted.single.shell": s1,
        "string.regexp.unquoted.shell": s1,
        "variable.other.normal.shell": p1,
        "variable.parameter.positional.all.shell": p1,
        "variable.parameter.positional.shell": p1,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function sql() {
  return {
    id: "sql",
    name: "SQL",
    vscode: {
      name: "SQL Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/sql/",
      scope: "source.sql",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/sql/syntaxes/sql.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "launchbadge",
        url: "https://github.com/launchbadge/",
      },
      source: {
        name: "SQLx",
        file: "https://github.com/launchbadge/sqlx/blob/v0.7.4/tests/sqlite/setup.sql/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s0 = c.string[0]
      let s1 = c.string[1]

      return {
        "comment.line.double-dash.sql": c0,
        "keyword.operator.comparison.sql": p0,
        "keyword.operator.concatenator.sql": p0,
        "keyword.operator.math.sql": p0,
        "keyword.other.alias.sql": p0,
        "keyword.other.authorization.sql": p0,
        "keyword.other.create.sql": p0,
        "keyword.other.data-integrity.sql": p0,
        "keyword.other.DDL.create.II.sql": p0,
        "keyword.other.DML.II.sql": p0,
        "keyword.other.DML.sql": p0,
        "keyword.other.LUW.sql": p0,
        "keyword.other.order.sql": p0,
        "keyword.other.sql": p0,
        "punctuation.definition.string.begin.sql": s0,
        "punctuation.definition.string.end.sql": s0,
        "punctuation.section.scope.begin.sql": p0,
        "punctuation.section.scope.end.sql": p0,
        "source.sql comment.block": c0,
        "source.sql": p1,
        "storage.modifier.sql": p0,
        "storage.type.sql": p0,
        "string.quoted.double.sql": s1,
        "string.quoted.single.sql": s1,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function swift() {
  return {
    id: "swift",
    name: "Swift",
    vscode: {
      name: "Swift Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/blob/1.90.2/extensions/swift/",
      scope: "source.swift",
      files: ["https://github.com/microsoft/vscode/blob/1.90.2/extensions/swift/syntaxes/swift.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "Alin Panaitiu",
        url: "https://github.com/alin23/",
      },
      source: {
        name: "Lunar",
        file: "https://github.com/alin23/Lunar/blob/v6.7.13/Lunar/Controllers/ControlChoiceViewController.swift/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s0 = c.string[0]
      let s1 = c.string[1]

      return {
        "comment.block.swift": c0,
        "comment.line.double-slash.swift": c0,
        "comment.line.triple-slash.documentation.swift": c0,
        "constant.language.boolean.swift": p1,
        "constant.language.nil.swift": p1,
        "constant.numeric.float.decimal.swift": p1,
        "constant.numeric.float.hexadecimal.swift": p1,
        "constant.numeric.integer.binary.swift": p1,
        "constant.numeric.integer.decimal.swift": p1,
        "constant.numeric.integer.hexadecimal.swift": p1,
        "constant.numeric.integer.octal.swift": p1,
        "constant.numeric.integer.swift": p1,
        "constant.numeric.swift": p1,
        "keyword.control.await.swift": p0,
        "keyword.control.branch.swift": p0,
        "keyword.control.consume.swift": p0,
        "keyword.control.copy.swift": p0,
        "keyword.control.defer.swift": p0,
        "keyword.control.exception.swift": p0,
        "keyword.control.import.preprocessor.conditional.swift": p0,
        "keyword.control.import.swift": p0,
        "keyword.control.loop.swift": p0,
        "keyword.control.transfer.swift": p0,
        "keyword.operator.assignment.swift": p0,
        "keyword.operator.custom.infix.dot.swift": p0,
        "keyword.operator.custom.infix.swift": p0,
        "keyword.operator.custom.postfix.swift": p0,
        "keyword.operator.custom.prefix.swift": p0,
        "keyword.operator.function-result.swift": p0,
        "keyword.operator.ternary.swift": p0,
        "keyword.operator.type-casting.swift": p0,
        "keyword.operator.type.optional.swift": p0,
        "keyword.other.capture-specifier.swift": p0,
        "keyword.other.declaration-specifier.accessibility.swift": p0,
        "keyword.other.declaration-specifier.swift": p0,
        "keyword.other.platform.all.swift": p0,
        "keyword.other.platform.os.swift": p0,
        "meta.attribute.available.swift": p0,
        "meta.definition.type.body.swift support.type.swift": p0,
        "meta.definition.typealias.swift entity.name.type.typealias.swift": p1,
        "meta.definition.typealias.swift": p0,
        "meta.function-result.swift support.type.swift": p0,
        "meta.function-result.swift": p0,
        "meta.generic-argument-clause.swift": p0,
        "meta.generic-parameter-clause.swift": p0,
        "meta.inheritance-clause.swift": p0,
        "meta.parameter-clause.swift support.type.swift": p0,
        "meta.parameter-clause.swift": p0,
        "punctuation.definition.arguments.begin.swift": p0,
        "punctuation.definition.arguments.end.swift": p0,
        "punctuation.definition.parameters.begin.swift": p0,
        "punctuation.definition.parameters.end.swift": p0,
        "punctuation.definition.preprocessor.swift": p0,
        "punctuation.definition.string.begin.raw.swift": s0,
        "punctuation.definition.string.begin.swift": s0,
        "punctuation.definition.string.end.raw.swift": s0,
        "punctuation.definition.string.end.swift": s0,
        "punctuation.definition.type.begin.swift": p0,
        "punctuation.definition.type.end.swift": p0,
        "punctuation.section.collection-type.begin.swift": p0,
        "punctuation.section.collection-type.end.swift": p0,
        "punctuation.section.embedded.begin.swift": p0,
        "punctuation.section.embedded.end.swift source.swift": p0,
        "punctuation.section.embedded.end.swift": p0,
        "punctuation.section.function.begin.swift": p0,
        "punctuation.section.function.end.swift": p0,
        "punctuation.section.scope.begin.swift": p0,
        "punctuation.section.scope.end.swift": p0,
        "punctuation.section.tuple-type.begin.swift": p0,
        "punctuation.section.tuple-type.end.swift": p0,
        "punctuation.section.tuple.begin.swift": p0,
        "punctuation.section.tuple.end.swift": p0,
        "punctuation.separator.argument-label.swift": p0,
        "punctuation.separator.generic-argument-clause.begin.swift": p0,
        "punctuation.separator.generic-argument-clause.end.swift": p0,
        "punctuation.separator.generic-parameter-clause.begin.swift": p0,
        "punctuation.separator.generic-parameter-clause.end.swift": p0,
        "punctuation.separator.generic-parameters.swift": p0,
        "punctuation.separator.inheritance-clause.swift": p0,
        "punctuation.separator.key-value.swift": p0,
        "source.swift": p1,
        "storage.modifier.async.swift": p0,
        "storage.modifier.attribute.swift": p0,
        "storage.modifier.exception.swift": p0,
        "storage.modifier.swift": p0,
        "storage.type.class.swift": p0,
        "storage.type.enum.case.swift": p0,
        "storage.type.enum.swift": p0,
        "storage.type.extension.swift": p0,
        "storage.type.function.swift": p0,
        "storage.type.protocol.swift": p0,
        "storage.type.struct.swift": p0,
        "string.quoted.double.block.swift": s1,
        "string.quoted.double.single-line.raw.swift": s1,
        "string.quoted.double.single-line.swift": s1,
        "support.variable.discard-value.swift": p0,
        "variable.parameter.function.swift": p1,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function toml() {
  return {
    id: "toml",
    name: "TOML",
    vscode: {
      name: "Even Better TOML (tamasfe)",
      url: "https://github.com/tamasfe/taplo/tree/release-even-better-toml-0.20.0/editors/vscode/",
      scope: "source.toml",
      files: ["https://github.com/tamasfe/taplo/blob/release-even-better-toml-0.20.0/editors/vscode/toml.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "jdx",
        url: "https://github.com/jdx/",
      },
      source: {
        name: "mise",
        file: "https://github.com/jdx/mise/blob/main/Cargo.toml/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s1 = c.string[1]

      return {
        "comment.line.number-sign.toml": c0,
        "meta.preprocessor.toml": c0,
        "punctuation.definition.array.table.toml": p0,
        "punctuation.definition.array.toml": p0,
        "punctuation.definition.table.inline.toml": p0,
        "punctuation.definition.table.toml": p0,
        "punctuation.eq.toml": p0,
        "punctuation.separator.array.toml": p0,
        "punctuation.separator.dot.toml": p0,
        "punctuation.separator.table.inline.toml": p0,
        "source.toml": s1,
        "support.type.property-name.array.toml": p1,
        "support.type.property-name.table.toml": p1,
        "support.type.property-name.toml": p1,
      }
    },
  }
}

/**
 * @returns {Syntax}
 */
function ts() {
  let p = js()

  return {
    id: "ts",
    extends: p.id,
    name: "TypeScript",
    vscode: {
      name: "TypeScript Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/typescript-basics/",
      scope: "source.ts",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/typescript-basics/syntaxes/TypeScript.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "Vitest",
        url: "https://github.com/vitest-dev/",
      },
      source: {
        name: "Vitest",
        file: "https://github.com/vitest-dev/vitest/blob/v1.4.0/packages/vitest/src/typecheck/collect.ts/",
      },
    },
    tokenColors(c) {
      let r = p.tokenColors(c)
      return port(r, ".js", ".ts")
    },
  }
}

/**
 * @returns {Syntax}
 */
function tsx() {
  let p = jsx()

  return {
    id: "tsx",
    extends: p.id,
    name: "TSX",
    vscode: {
      name: "TypeScript Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/typescript-basics/",
      scope: "source.tsx",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/typescript-basics/syntaxes/TypeScriptReact.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "The Washington Post",
        url: "https://github.com/washingtonpost/",
      },
      source: {
        name: "WPDS's UI Kit",
        file: "https://github.com/washingtonpost/wpds-ui-kit/blob/v1.23.1/ui/popover/src/play.stories.tsx/",
      },
    },
    tokenColors(c) {
      let r = p.tokenColors(c)
      return port(r, ".js.jsx", ".tsx")
    },
  }
}

/**
 * @returns {Syntax}
 */
function yaml() {
  return {
    id: "yaml",
    name: "YAML",
    vscode: {
      name: "YAML Language Basics (builtin)",
      url: "https://github.com/microsoft/vscode/tree/1.87.0/extensions/yaml/",
      scope: "source.yaml",
      files: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/yaml/syntaxes/yaml.tmLanguage.json/"],
    },
    example: {
      author: {
        name: "Google",
        url: "https://github.com/google/",
      },
      source: {
        name: "Brotli",
        file: "https://github.com/google/brotli/blob/v1.1.0/.github/workflows/release.yaml/",
      },
    },
    tokenColors(c) {
      let c0 = c.comment[0]
      let p0 = c.plain[0]
      let p1 = c.plain[1]
      let s0 = c.string[0]
      let s1 = c.string[1]

      return {
        "comment.line.number-sign.yaml": c0,
        "constant.language.merge.yaml": p0,
        "entity.name.tag.yaml": p1,
        "entity.other.document.begin.yaml": p0,
        "entity.other.document.end.yaml": p0,
        "keyword.control.flow.alias.yaml": p0,
        "keyword.control.flow.block-scalar.folded.yaml": p0,
        "keyword.control.flow.block-scalar.literal.yaml": p0,
        "keyword.control.property.anchor.yaml": p0,
        "meta.directive.yaml": p0,
        "punctuation.definition.block.sequence.item.yaml": p0,
        "punctuation.definition.directive.begin.yaml": p0,
        "punctuation.definition.key-value.begin.yaml": p0,
        "punctuation.definition.mapping.begin.yaml": p0,
        "punctuation.definition.mapping.end.yaml": p0,
        "punctuation.definition.sequence.begin.yaml": p0,
        "punctuation.definition.sequence.end.yaml": p0,
        "punctuation.definition.string.begin.yaml": s0,
        "punctuation.definition.string.end.yaml": s0,
        "punctuation.separator.key-value.mapping.yaml": p0,
        "punctuation.separator.mapping.yaml": p0,
        "punctuation.separator.sequence.yaml": p0,
        "source.yaml": s1,
        "storage.modifier.chomping-indicator.yaml": p0,
      }
    },
  }
}

/**
 * @param {Record<string, string>} t
 * @param {string} from
 * @param {string} to
 * @returns {Record<string, string>}
 */
function port(t, from, to) {
  /** @type {Record<string, string>} */
  let r = {}

  for (let [s, c] of Object.entries(t)) {
    let p = new RegExp(`(${from})(\\s+|$)`, "g")
    s = s.replace(p, `${to}$2`)
    r[s] = c
  }

  return r
}
