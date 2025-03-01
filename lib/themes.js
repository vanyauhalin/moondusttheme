import * as editors from "./editors.js"
import * as syntaxes from "./syntaxes.js"

/**
 * @typedef {object} Theme
 * @property {string} name
 * @property {editors.EditorColors} colors
 * @property {syntaxes.TokenColor[]} tokenColors
 * @property {boolean} semanticHighlighting
 */

/**
 * @returns {Theme}
 */
export function light() {
	let ef = editors.light()
	let sf = syntaxes.light()

	return {
		name: "Moondust: Near Side of the Moon",
		colors: ef.colors,
		tokenColors: sf.tokenColors,
		semanticHighlighting: true,
	}
}

/**
 * @returns {Theme}
 */
export function dark() {
	let ef = editors.dark()
	let sf = syntaxes.dark()

	return {
		name: "Moondust: Far Side of the Moon",
		colors: ef.colors,
		tokenColors: sf.tokenColors,
		semanticHighlighting: true,
	}
}
