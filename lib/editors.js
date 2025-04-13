/**
 * @import {S1, S10} from "./shared.js"
 */

import color from "color"
import * as colors from "./colors.js"

const wh = "#FFFFFF"
const tr = "#FFFFFF00"
// const red = "#FF0000"

/**
 * @typedef {object} EditorTheme
 * @property {string} background
 * @property {S10} neutral
 * @property {S10} accent
 * @property {S1} error
 * @property {S1} info
 * @property {S1} warning
 */

/**
 * @typedef {object} EditorFragment
 * @property {EditorColors} colors
 */

/**
 * @typedef {Record<string, string>} EditorColors
 */

/**
 * @returns {EditorFragment}
 */
export function light() {
	let cs = colors.light()

	/** @type {EditorTheme} */
	let et = {
		background: "#FFFFFF",
		neutral: cs.gray,
		accent: cs.blue,
		error: ["#B35900"],
		info: [cs.gray[4]],
		warning: ["#7D4E00"],
	}

	/** @type {EditorColors} */
	let ec = {
		...sharedColors(),
		...lightColors(et),
	}

	return {
		colors: compute(ec),
	}
}

/**
 * @returns {EditorFragment}
 */
export function dark() {
	let cs = colors.dark()

	/** @type {EditorTheme} */
	let et = {
		background: "#161A1D",
		neutral: cs.gray,
		accent: cs.blue,
		error: [""],
		info: [""],
		warning: [""],
	}

	/** @type {EditorColors} */
	let ec = {
		...sharedColors(),
		...darkColors(et),
	}

	return {
		colors: compute(ec),
	}
}

/**
 * @param {EditorTheme} et
 * @returns {EditorColors}
 */
function lightColors(et) {
	return {
		// Base colors
		"focusBorder": et.accent[3],
		"foreground": et.neutral[7],
		"widget.border": et.neutral[2],
		"selection.background": et.accent[2],
		"descriptionForeground": et.neutral[5],
		"errorForeground": et.error[0],

		// Text colors
		"textLink.activeForeground": et.accent[5],
		"textLink.foreground": et.accent[5],

		// Action colors
		"toolbar.hoverBackground": et.neutral[1],
		"toolbar.activeBackground": et.neutral[1],

		// Button control
		"button.background": et.accent[5],
		"button.foreground": wh,
		"button.separator": color(wh).alpha(0.2).hexa(),
		"button.hoverBackground": et.accent[6],
		"button.secondaryForeground": wh,
		"button.secondaryBackground": et.neutral[6],
		"button.secondaryHoverBackground": et.neutral[8],

		// Scrollbar control
		"scrollbarSlider.activeBackground": color(et.neutral[3]).alpha(0.6).hexa(),
		"scrollbarSlider.background": color(et.neutral[3]).alpha(0.4).hexa(),

		// Lists and trees
		"list.activeSelectionBackground": et.accent[5],
		"list.activeSelectionForeground": wh,
		"list.focusHighlightForeground": et.accent[2],
		"list.focusOutline": et.accent[3],
		"list.focusAndSelectionOutline": et.accent[3],
		"list.highlightForeground": et.accent[5],
		"list.inactiveSelectionBackground": et.neutral[1],

		// Activity Bar
		"activityBar.foreground": et.neutral[6],
		"activityBar.inactiveForeground": et.neutral[4],

		// Side Bar
		"sideBar.background": et.neutral[0],

		// Minimap
		"minimap.foregroundOpacity": color(wh).alpha(0.8).hexa(),

		// Editor colors
		"editor.background": et.background,
		"editorLineNumber.foreground": et.neutral[4],
		"editorCursor.background": wh,
		"editorCursor.foreground": et.neutral[5],
		"editor.selectionBackground": et.accent[2],
		"editor.selectionHighlightBackground": et.accent[1],
		"editor.lineHighlightBackground": color(et.neutral[1]).alpha(0.4).hexa(),
		"editorWhitespace.foreground": et.neutral[2],
		"editorRuler.foreground": et.neutral[0],
		"editorError.foreground": et.error[0],
		"editorWarning.foreground": et.warning[0],
		"editorInfo.foreground": et.info[0],
		"editorUnnecessaryCode.opacity": color(wh).alpha(0.4).hexa(),
		"editorGutter.modifiedBackground": et.neutral[3],

		// Diff editor colors
		"diffEditor.insertedTextBackground": "#80ccff80",
		"diffEditor.removedTextBackground": "#f7993966",
		"diffEditor.insertedLineBackground": "#b6e3ff4d",
		"diffEditor.removedLineBackground": "#ffddb04d",

		// Editor widget colors
		"editorSuggestWidgetStatus.foreground": et.neutral[6],

		// Peek view colors
		"peekView.border": et.neutral[3],
		"peekViewEditor.background": color(et.neutral[0]).alpha(0.4).hexa(),
		"peekViewEditorGutter.background": color(et.neutral[0]).alpha(0.4).hexa(),
		"peekViewResult.selectionBackground": et.accent[5],
		"peekViewResult.selectionForeground": wh,

		// Panel colors
		"panelTitle.activeBorder": et.neutral[7],

		// Status Bar colors
		"statusBar.foreground": et.neutral[6],
		"statusBar.debuggingBackground": et.neutral[6],
		"statusBar.debuggingForeground": wh,
		"statusBar.debuggingBorder": et.neutral[2],
		"statusBar.noFolderForeground": et.neutral[6],
		"statusBar.noFolderBackground": et.background,
		"statusBar.noFolderBorder": et.neutral[2],
		"statusBarItem.prominentForeground": et.neutral[6],
		"statusBarItem.remoteForeground": et.neutral[6],

		// Command Center colors
		"commandCenter.background": et.neutral[1],

		// Debug Icons colors
		"debugIcon.breakpointForeground": et.neutral[5],
		"debugIcon.breakpointDisabledForeground": et.neutral[3],
	}
}

/**
 * @param {EditorTheme} et
 * @returns {EditorColors}
 */
function darkColors(et) {
	return {
		// Base colors
		"focusBorder": et.accent[3],
		"foreground": et.neutral[1],
		"widget.border": et.neutral[6],
		"selection.background": et.accent[5],
		"descriptionForeground": et.neutral[3],

		// Text colors
		"textLink.activeForeground": et.accent[0],
		"textLink.foreground": et.accent[0],

		// Action colors
		"toolbar.hoverBackground": et.neutral[7],
		"toolbar.activeBackground": et.neutral[7],

		// Button control
		"button.background": et.accent[4],
		"button.foreground": et.neutral[0],
		"button.separator": color(et.neutral[0]).alpha(0.44).hexa(),
		"button.hoverBackground": et.accent[3],
		"button.secondaryForeground": et.neutral[1],
		"button.secondaryBackground": et.neutral[5],
		"button.secondaryHoverBackground": et.neutral[4],

		// Scrollbar control
		"scrollbarSlider.activeBackground": color(et.neutral[3]).alpha(0.4).hexa(),
		"scrollbarSlider.background": color(et.neutral[3]).alpha(0.2).hexa(),

		// Lists and trees
		"list.activeSelectionBackground": et.accent[4],
		"list.activeSelectionForeground": et.neutral[0],
		"list.focusHighlightForeground": et.accent[8],
		"list.focusOutline": et.accent[3],
		"list.focusAndSelectionOutline": et.accent[3],
		"list.highlightForeground": et.accent[1],
		"list.inactiveSelectionBackground": et.neutral[7],

		// Activity Bar
		"activityBar.foreground": et.neutral[2],
		"activityBar.inactiveForeground": et.neutral[4],

		// Side Bar
		"sideBar.background": et.neutral[9],

		// Minimap
		"minimap.foregroundOpacity": color(wh).alpha(0.6).hexa(),

		// Editor colors
		"editor.background": et.background,
		"editorLineNumber.foreground": et.neutral[4],
		"editorCursor.background": et.neutral[0],
		"editorCursor.foreground": et.neutral[3],
		"editor.selectionBackground": et.accent[5],
		"editor.selectionHighlightBackground": et.accent[5],
		"editor.lineHighlightBackground": color(et.neutral[7]).alpha(0.44).hexa(),
		"editorWhitespace.foreground": et.neutral[5],
		"editorRuler.foreground": et.neutral[9],
		"editorUnnecessaryCode.opacity": color(wh).alpha(0.54).hexa(),
		"editorGutter.modifiedBackground": et.neutral[5],

		// Peek view colors
		"peekViewResult.selectionBackground": et.accent[4],

		// Panel colors
		"panelTitle.activeBorder": tr,

		// Status Bar colors
		"statusBar.foreground": et.neutral[2],
		"statusBar.noFolderBackground": "editor.background",

		// Command Center colors
		"commandCenter.background": et.neutral[8],

		// Debug Icons colors
		"debugIcon.breakpointForeground": et.neutral[3],
		"debugIcon.breakpointDisabledForeground": et.neutral[5],
	}
}

/**
 * @returns {EditorColors}
 */
function sharedColors() {
	return {
		// Contrast colors
		// "contrastActiveBorder:"
		// "contrastBorder:"

		// Base colors
		// "focusBorder"
		// "foreground"
		// "disabledForeground"
		// "widget.border"
		"widget.shadow": tr,
		// "selection.background"
		// "descriptionForeground"
		// "errorForeground"
		"icon.foreground": "descriptionForeground",
		// "sash.hoverBorder"

		// Window border
		// "window.activeBorder": none
		// "window.inactiveBorder": none

		// Text colors
		"textBlockQuote.background": "sideBar.background",
		"textBlockQuote.border": "sideBar.border",
		"textCodeBlock.background": "editor.background",
		// "textLink.activeForeground"
		// "textLink.foreground"
		"textSeparator.foreground": "sideBar.border",
		"textPreformat.foreground": "editor.foreground",

		// Action colors
		// "toolbar.hoverBackground"
		"toolbar.hoverOutline": tr,
		// "toolbar.activeBackground"

		// Button control
		// "button.background"
		// "button.foreground"
		"button.border": tr,
		// "button.separator"
		// "button.hoverBackground"
		// "button.secondaryForeground"
		// "button.secondaryBackground"
		// "button.secondaryHoverBackground"
		"checkbox.background": "sideBar.background",
		"checkbox.foreground": "sideBar.foreground",
		"checkbox.border": "sideBar.border",
		"checkbox.selectBackground": "checkbox.background",
		"checkbox.selectBorder": "checkbox.border",

		// Dropdown control
		"dropdown.background": "editor.background",
		"dropdown.listBackground": "editor.background",
		"dropdown.border": "widget.border",
		"dropdown.foreground": "editor.foreground",

		// Input control
		"input.background": "editor.background",
		"input.border": "widget.border",
		"input.foreground": "editor.foreground",
		"input.placeholderForeground": "descriptionForeground",
		// "inputOption.activeBackground"
		// "inputOption.activeBorder"
		// "inputOption.activeForeground"
		// "inputOption.hoverBackground"
		// "inputValidation.errorBackground"
		// "inputValidation.errorForeground"
		// "inputValidation.errorBorder"
		// "inputValidation.infoBackground"
		// "inputValidation.infoForeground"
		// "inputValidation.infoBorder"
		// "inputValidation.warningBackground"
		// "inputValidation.warningForeground"
		// "inputValidation.warningBorder"

		// Scrollbar control
		"scrollbar.shadow": "widget.shadow",
		// "scrollbarSlider.activeBackground"
		// "scrollbarSlider.background"
		"scrollbarSlider.hoverBackground": "scrollbarSlider.activeBackground",

		// Badge
		"badge.foreground": "button.foreground",
		"badge.background": "button.background",

		// Progress bar
		"progressBar.background": "button.background",

		// Lists and trees
		// "list.activeSelectionBackground"
		// "list.activeSelectionForeground"
		// "list.activeSelectionIconForeground"
		// "list.dropBackground"
		"list.focusBackground": tr,
		"list.focusForeground": "editor.foreground",
		// "list.focusHighlightForeground"
		// "list.focusOutline"
		// "list.focusAndSelectionOutline"
		// "list.highlightForeground"
		"list.hoverBackground": tr,
		"list.hoverForeground": "editor.foreground",
		// "list.inactiveSelectionBackground"
		"list.inactiveSelectionForeground": "editor.foreground",
		// "list.inactiveSelectionIconForeground"
		"list.inactiveFocusBackground": tr,
		"list.inactiveFocusOutline": tr,
		// "list.invalidItemForeground"
		"list.errorForeground": "editor.foreground",
		"list.warningForeground": "editor.foreground",
		"listFilterWidget.background": "editor.background",
		// "listFilterWidget.outline"
		// "listFilterWidget.noMatchesOutline"
		"listFilterWidget.shadow": "widget.shadow",
		// "list.filterMatchBackground"
		"list.filterMatchBorder": tr,
		// "list.deemphasizedForeground"
		// "tree.indentGuidesStroke"
		// "tree.inactiveIndentGuidesStroke"
		// "tree.tableColumnsBorder"
		// "tree.tableOddRowsBackground"

		// Activity Bar
		"activityBar.background": "sideBar.background",
		// "activityBar.dropBorder"
		// "activityBar.foreground"
		// "activityBar.inactiveForeground"
		"activityBar.border": "widget.border",
		"activityBarBadge.background": "badge.background",
		"activityBarBadge.foreground": "badge.foreground",
		"activityBar.activeBorder": tr,
		"activityBar.activeBackground": tr,
		"activityBar.activeFocusBorder": "focusBorder",

		// Profiles
		"profileBadge.background": "button.background",
		"profileBadge.foreground": "button.foreground",

		// Side Bar
		// "sideBar.background"
		"sideBar.foreground": "editor.foreground",
		"sideBar.border": "widget.border",
		// "sideBar.dropBackground"
		"sideBarTitle.foreground": "editor.foreground",
		"sideBarSectionHeader.background": "sideBar.background",
		"sideBarSectionHeader.foreground": "editor.foreground",
		"sideBarSectionHeader.border": tr,

		// Minimap
		// "minimap.findMatchHighlight"
		// "minimap.selectionHighlight"
		// "minimap.errorHighlight"
		// "minimap.warningHighlight"
		"minimap.background": "editor.background",
		// "minimap.selectionOccurrenceHighlight"
		// "minimap.foregroundOpacity"
		"minimapSlider.background": "scrollbarSlider.background",
		"minimapSlider.hoverBackground": "scrollbarSlider.hoverBackground",
		"minimapSlider.activeBackground": "scrollbarSlider.activeBackground",
		// "minimapGutter.addedBackground"
		// "minimapGutter.modifiedBackground"
		// "minimapGutter.deletedBackground"

		// Editor Groups & Tabs
		"editorGroup.border": "widget.border",
		// "editorGroup.dropBackground"
		"editorGroupHeader.noTabsBackground": "editor.background",
		"editorGroupHeader.tabsBackground": "sideBar.background",
		"editorGroupHeader.tabsBorder": "widget.border",
		"editorGroupHeader.border": tr,
		"editorGroup.emptyBackground": "editor.background",
		// editorGroup.focusedEmptyBorder
		// editorGroup.dropIntoPromptForeground
		// editorGroup.dropIntoPromptBackground
		// editorGroup.dropIntoPromptBorder
		"tab.activeBackground": "editor.background",
		"tab.unfocusedActiveBackground": "editor.background",
		"tab.activeForeground": "editor.foreground",
		"tab.border": "widget.border",
		"tab.activeBorder": "editor.background",
		"tab.unfocusedActiveBorder": "editor.background",
		"tab.activeBorderTop": "editor.background",
		"tab.unfocusedActiveBorderTop": "editor.background",
		"tab.lastPinnedBorder": "widget.border",
		"tab.inactiveBackground": "sideBar.background",
		"tab.unfocusedInactiveBackground": "sideBar.background",
		"tab.inactiveForeground": "editor.foreground",
		"tab.unfocusedActiveForeground": "descriptionForeground",
		"tab.unfocusedInactiveForeground": "descriptionForeground",
		// "tab.hoverBackground": none
		// "tab.unfocusedHoverBackground": none
		// "tab.hoverForeground": none
		// "tab.unfocusedHoverForeground": none
		// "tab.hoverBorder": none
		// "tab.unfocusedHoverBorder": none
		// "tab.activeModifiedBorder"
		// "tab.inactiveModifiedBorder"
		// "tab.unfocusedActiveModifiedBorder"
		// "tab.unfocusedInactiveModifiedBorder"
		// "editorPane.background"
		"sideBySideEditor.horizontalBorder": "widget.border",
		"sideBySideEditor.verticalBorder": "widget.border",

		// Editor colors
		// "editor.background"
		"editor.foreground": "foreground",
		// "editorLineNumber.foreground"
		"editorLineNumber.activeForeground": "editor.foreground",
		// "editorLineNumber.dimmedForeground"
		// "editorCursor.background"
		// "editorCursor.foreground"
		// "editor.selectionBackground"
		// "editor.selectionForeground": none
		// "editor.inactiveSelectionBackground"
		// "editor.selectionHighlightBackground"
		"editor.selectionHighlightBorder": tr,
		"editor.wordHighlightBackground": tr,
		"editor.wordHighlightBorder": tr,
		"editor.wordHighlightStrongBackground": tr,
		"editor.wordHighlightStrongBorder": tr,
		// "editor.wordHighlightTextBackground"
		// "editor.wordHighlightTextBorder"
		// "editor.findMatchBackground"
		// "editor.findMatchHighlightBackground"
		// "editor.findRangeHighlightBackground"
		// "editor.findMatchBorder"
		// "editor.findMatchHighlightBorder"
		// "editor.findRangeHighlightBorder"
		"search.resultsInfoForeground": "editor.foreground",
		// "searchEditor.findMatchBackground"
		// "searchEditor.findMatchBorder"
		// "searchEditor.textInputBorder"
		"editor.hoverHighlightBackground": tr,
		// "editor.lineHighlightBackground"
		"editor.lineHighlightBorder": tr,
		// "editorUnicodeHighlight.border"
		// "editorUnicodeHighlight.background"
		"editorLink.activeForeground": "textLink.foreground",
		// "editor.rangeHighlightBackground"
		// "editor.rangeHighlightBorder"
		// "editor.symbolHighlightBackground"
		// "editor.symbolHighlightBorder"
		// "editorWhitespace.foreground"
		// "editorIndentGuide.background"
		// "editorIndentGuide.activeBackground"
		// "editorInlayHint.background"
		// "editorInlayHint.foreground"
		// "editorInlayHint.typeForeground"
		// "editorInlayHint.typeBackground"
		// "editorInlayHint.parameterForeground"
		// "editorInlayHint.parameterBackground"
		// "editorRuler.foreground"
		// "editor.linkedEditingBackground"
		// "editorCodeLens.foreground"
		// "editorLightBulb.foreground"
		// "editorLightBulbAutoFix.foreground"
		"editorBracketMatch.background": tr,
		"editorBracketMatch.border": tr,
		"editorBracketHighlight.foreground1": tr,
		"editorBracketHighlight.foreground2": tr,
		"editorBracketHighlight.foreground3": tr,
		"editorBracketHighlight.foreground4": tr,
		"editorBracketHighlight.foreground5": tr,
		"editorBracketHighlight.foreground6": tr,
		// "editorBracketHighlight.unexpectedBracket.foreground"
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
		// "editorError.foreground"
		// "editorError.border"
		// "editorError.background"
		// "editorWarning.foreground"
		// "editorWarning.border"
		// "editorWarning.background"
		// "editorInfo.foreground"
		// "editorInfo.border"
		// "editorInfo.background"
		// "editorHint.foreground"
		// "editorHint.border"
		// "problemsErrorIcon.foreground"
		// "problemsWarningIcon.foreground"
		// "problemsInfoIcon.foreground"
		"editorUnnecessaryCode.border": tr,
		// "editorUnnecessaryCode.opacity"
		"editorGutter.background": "editor.background",
		// "editorGutter.modifiedBackground"
		"editorGutter.addedBackground": "editorGutter.modifiedBackground",
		"editorGutter.deletedBackground": "editorGutter.modifiedBackground",
		// "editorGutter.commentRangeForeground"
		// "editorGutter.commentGlyphForeground"
		// "editorGutter.commentUnresolvedGlyphForeground"
		// "editorGutter.foldingControlForeground"
		// "editorCommentsWidget.resolvedBorder"
		// "editorCommentsWidget.unresolvedBorder"
		// "editorCommentsWidget.rangeBackground"
		// "editorCommentsWidget.rangeBorder"
		// "editorCommentsWidget.rangeActiveBackground"
		// "editorCommentsWidget.rangeActiveBorder"

		// Diff editor colors
		// "diffEditor.insertedTextBackground"
		// "diffEditor.insertedTextBorder"
		// "diffEditor.removedTextBackground"
		// "diffEditor.removedTextBorder"
		// "diffEditor.border"
		// "diffEditor.diagonalFill"
		// "diffEditor.insertedLineBackground"
		// "diffEditor.removedLineBackground"
		"diffEditorGutter.insertedLineBackground": "editor.background",
		"diffEditorGutter.removedLineBackground": "editor.background",
		// "diffEditorOverview.insertedForeground"
		// "diffEditorOverview.removedForeground"
		// "diffEditor.unchangedRegionBackground"
		// "diffEditor.unchangedRegionForeground"
		// "diffEditor.unchangedCodeBackground"
		// "diffEditor.move.border"

		// Chat colors
		// "chat.requestBackground"
		// "chat.requestBorder"

		// Inline Chat colors
		// "inlineChat.background"
		"inlineChat.border": "widget.border",
		"inlineChat.shadow": "widget.shadow",
		// "inlineChat.regionHighlight"
		// "inlineChatInput.border"
		// "inlineChatInput.focusBorder"
		// "inlineChatInput.placeholderForeground"
		// "inlineChatInput.background"
		// "inlineChatDiff.inserted"
		// "inlineChatDiff.removed"

		// Editor widget colors
		"editorWidget.foreground": "editor.foreground",
		"editorWidget.background": "editor.background",
		"editorWidget.border": "widget.border",
		"editorWidget.resizeBorder": "widget.border",
		"editorSuggestWidget.background": "editor.background",
		"editorSuggestWidget.border": "widget.border",
		"editorSuggestWidget.foreground": "editor.foreground",
		"editorSuggestWidget.focusHighlightForeground": "list.focusHighlightForeground",
		"editorSuggestWidget.highlightForeground": "list.highlightForeground",
		"editorSuggestWidget.selectedBackground": "list.activeSelectionBackground",
		"editorSuggestWidget.selectedForeground": "list.activeSelectionForeground",
		// "editorSuggestWidget.selectedIconForeground"
		// "editorSuggestWidgetStatus.foreground"
		// "editorHoverWidget.foreground"
		// "editorHoverWidget.background"
		// "editorHoverWidget.border"
		// "editorHoverWidget.highlightForeground"
		// "editorHoverWidget.statusBarBackground"
		// "editorGhostText.border"
		// "editorGhostText.background"
		// "editorGhostText.foreground"
		// "editorStickyScroll.background"
		// "editorStickyScrollHover.background"
		// "debugExceptionWidget.background"
		// "debugExceptionWidget.border"
		// "editorMarkerNavigation.background"
		// "editorMarkerNavigationError.background"
		// "editorMarkerNavigationWarning.background"
		// "editorMarkerNavigationInfo.background"
		// "editorMarkerNavigationError.headerBackground"
		// "editorMarkerNavigationWarning.headerBackground"
		// "editorMarkerNavigationInfo.headerBackground"

		// Peek view colors
		"peekView.border": "widget.border",
		"peekViewEditor.background": "editor.background",
		"peekViewEditorGutter.background": "peekViewEditor.background",
		// "peekViewEditor.matchHighlightBackground"
		"peekViewEditor.matchHighlightBorder": tr,
		"peekViewResult.background": "sideBar.background",
		"peekViewResult.fileForeground": "foreground",
		"peekViewResult.lineForeground": "foreground",
		// "peekViewResult.matchHighlightBackground"
		// "peekViewResult.selectionBackground"
		"peekViewResult.selectionForeground": "foreground",
		"peekViewTitle.background": "sideBar.background",
		"peekViewTitleDescription.foreground": "descriptionForeground",
		"peekViewTitleLabel.foreground": "foreground",
		// "peekViewEditorStickyScroll.background"

		// Merge conflicts colors
		// "merge.currentHeaderBackground"
		// "merge.currentContentBackground"
		// "merge.incomingHeaderBackground"
		// "merge.incomingContentBackground"
		// "merge.border"
		// "merge.commonContentBackground"
		// "merge.commonHeaderBackground"
		// "editorOverviewRuler.currentContentForeground"
		// "editorOverviewRuler.incomingContentForeground"
		// "editorOverviewRuler.commonContentForeground"
		// "editorOverviewRuler.commentForeground"
		// "editorOverviewRuler.commentUnresolvedForeground"
		// "mergeEditor.change.background"
		// "mergeEditor.change.word.background"
		// "mergeEditor.conflict.unhandledUnfocused.border"
		// "mergeEditor.conflict.unhandledFocused.border"
		// "mergeEditor.conflict.handledUnfocused.border"
		// "mergeEditor.conflict.handledFocused.border"
		// "mergeEditor.conflict.handled.minimapOverViewRuler"
		// "mergeEditor.conflict.unhandled.minimapOverViewRuler"
		// "mergeEditor.conflictingLines.background"
		// "mergeEditor.changeBase.background"
		// "mergeEditor.changeBase.word.background"
		// "mergeEditor.conflict.input1.background"
		// "mergeEditor.conflict.input2.background"

		// Panel colors
		"panel.background": "sideBar.background",
		"panel.border": "sideBar.border",
		// "panel.dropBorder"
		// "panelTitle.activeBorder"
		"panelTitle.activeForeground": "foreground",
		"panelTitle.inactiveForeground": "descriptionForeground",
		"panelInput.border": "widget.border",
		// "panelSection.border"
		// "panelSection.dropBackground"
		// "panelSectionHeader.background"
		// "panelSectionHeader.foreground"
		// "panelSectionHeader.border"

		// Status Bar colors
		"statusBar.background": "editor.background",
		// "statusBar.foreground"
		"statusBar.border": "widget.border",
		// "statusBar.debuggingBackground"
		// "statusBar.debuggingForeground"
		// "statusBar.debuggingBorder"
		// "statusBar.noFolderForeground"
		// "statusBar.noFolderBackground"
		// "statusBar.noFolderBorder"
		"statusBarItem.activeBackground": tr,
		"statusBarItem.hoverBackground": tr,
		// "statusBarItem.prominentForeground"
		"statusBarItem.prominentBackground": "editor.background",
		"statusBarItem.prominentHoverBackground": tr,
		"statusBarItem.remoteBackground": "editor.background",
		// "statusBarItem.remoteForeground"
		// "statusBarItem.errorBackground"
		// "statusBarItem.errorForeground"
		// "statusBarItem.warningBackground"
		// "statusBarItem.warningForeground"
		// "statusBarItem.compactHoverBackground"
		"statusBarItem.focusBorder": "focusBorder",
		"statusBar.focusBorder": "focusBorder",
		// "statusBar.offlineBackground"
		// "statusBar.offlineForeground"

		// Title Bar colors
		"titleBar.activeBackground": "sideBar.background",
		"titleBar.activeForeground": "editor.foreground",
		"titleBar.inactiveBackground": "sideBar.background",
		"titleBar.inactiveForeground": "editor.foreground",
		"titleBar.border": "widget.border",

		// Menu Bar colors
		// "menubar.selectionForeground"
		// "menubar.selectionBackground"
		// "menubar.selectionBorder"
		"menu.foreground": "editor.foreground",
		"menu.background": "editor.background",
		"menu.selectionForeground": "button.foreground",
		"menu.selectionBackground": "button.background",
		"menu.selectionBorder": "button.background",
		"menu.separatorBackground": "widget.border",
		"menu.border": "widget.border",

		// Command Center colors
		"commandCenter.foreground": "foreground",
		"commandCenter.activeForeground": "foreground",
		// "commandCenter.background"
		"commandCenter.activeBackground": "commandCenter.background",
		"commandCenter.border": "widget.border",
		// "commandCenter.inactiveForeground"
		// "commandCenter.inactiveBorder"
		"commandCenter.activeBorder": "widget.border",

		// Notification colors
		"notificationCenter.border": "widget.border",
		// "notificationCenterHeader.foreground"
		// "notificationCenterHeader.background"
		// "notificationToast.border"
		// "notifications.foreground"
		// "notifications.background"
		// "notifications.border"
		// "notificationLink.foreground"
		// "notificationsErrorIcon.foreground"
		// "notificationsWarningIcon.foreground"
		// "notificationsInfoIcon.foreground"

		// Banner colors
		// "banner.background"
		// "banner.foreground"
		// "banner.iconForeground"

		// Extensions colors
		// "extensionButton.prominentForeground"
		// "extensionButton.prominentBackground"
		// "extensionButton.prominentHoverBackground"
		"extensionButton.background": "button.background",
		"extensionButton.foreground": "button.foreground",
		"extensionButton.hoverBackground": "button.hoverBackground",
		"extensionButton.separator": "button.separator",
		// "extensionBadge.remoteBackground"
		// "extensionBadge.remoteForeground"
		"extensionIcon.starForeground": "textLink.foreground",
		"extensionIcon.verifiedForeground": "textLink.foreground",
		// "extensionIcon.preReleaseForeground"
		// "extensionIcon.sponsorForeground"

		// Quick picker colors
		// "pickerGroup.border"
		// "pickerGroup.foreground"
		"quickInput.background": "editor.background",
		// "quickInput.foreground"
		// "quickInputList.focusBackground"
		// "quickInputList.focusForeground"
		// "quickInputList.focusIconForeground"
		// "quickInputTitle.background"

		// Keybinding label colors
		"keybindingLabel.background": "sideBar.background",
		"keybindingLabel.foreground": "foreground",
		"keybindingLabel.border": "widget.border",
		"keybindingLabel.bottomBorder": "widget.border",

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
		"welcomePage.background": "editor.background",
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
		"gitDecoration.addedResourceForeground": "foreground",
		"gitDecoration.modifiedResourceForeground": "foreground",
		"gitDecoration.deletedResourceForeground": "foreground",
		"gitDecoration.renamedResourceForeground": "foreground",
		"gitDecoration.stageModifiedResourceForeground": "foreground",
		"gitDecoration.stageDeletedResourceForeground": "foreground",
		"gitDecoration.untrackedResourceForeground": "foreground",
		"gitDecoration.ignoredResourceForeground": "descriptionForeground",
		"gitDecoration.conflictingResourceForeground": "foreground",
		"gitDecoration.submoduleResourceForeground": "descriptionForeground",

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
		"breadcrumb.foreground": "descriptionForeground",
		"breadcrumb.background": "editor.background",
		"breadcrumb.focusForeground": "editor.foreground",
		"breadcrumb.activeSelectionForeground": "editor.foreground",
		"breadcrumbPicker.background": "editor.background",

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
		// "debugIcon.breakpointForeground"
		// "debugIcon.breakpointDisabledForeground"
		// "debugIcon.breakpointUnverifiedForeground"
		// "debugIcon.breakpointCurrentStackframeForeground"
		// "debugIcon.breakpointStackframeForeground"
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
 * @param {EditorColors} r
 * @returns {EditorColors}
 * @throws {Error}
 */
function compute(r) {
	/** @type {Record<string, string>} */
	let t = {}

	for (let k of Object.keys(r).sort()) {
		let v = r[k]

		while (true) {
			if (!v) {
				throw new Error(`Could not compute '${k}'`)
			}

			if (v.startsWith("#")) {
				t[k] = v
				break
			}

			v = r[v]
		}
	}

	return t
}
