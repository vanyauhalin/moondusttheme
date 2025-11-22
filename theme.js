/**
 * @typedef {object} ThemeSyntax
 * @property {string[]} comment
 * @property {string[]} plain
 * @property {string[]} string
 */

/**
 * @typedef {object} ThemeEditor
 * @property {string} background
 * @property {string[]} neutral
 * @property {string[]} accent
 * @property {string[]} error
 * @property {string[]} info
 * @property {string[]} warning
 */

/**
 * @typedef {object} Theme
 * @property {ThemeEditor} editor
 * @property {ThemeSyntax} syntax
 */

/**
 * @returns {Theme}
 */
export function lightTheme() {
	/** @type {string[]} */
	let gray = [
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
	]

	/** @type {string[]} */
	let blue = [
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
	]

	/** @type {ThemeEditor} */
	let editor = {
		background: "#FFFFFF",
		neutral: gray,
		accent: blue,
		error: ["#B35900"],
		info: [gray[4]],
		warning: ["#7D4E00"],
	}

	/** @type {ThemeSyntax} */
	let syntax = {
		comment: [gray[4]],
		plain: [gray[5], gray[7]],
		string: [blue[5], blue[7]],
	}

	/** @type {Theme} */
	let theme = {
		editor,
		syntax,
	}

	return theme
}

/**
 * @returns {Theme}
 */
export function darkTheme() {
	/** @type {string[]} */
	let gray = [
		"#D2D4D5",
		"#B1B6B9",
		"#89949A",
		"#637179",
		"#455259",
		"#343F46",
		"#2C343A",
		"#262C31",
		"#22272B",
		"#1E2225",
	]

	/** @type {string[]} */
	let slate = [
		"#B2D0EB",
		"#8FAFCC",
		"#6885A1",
		"#4D6680",
		"#3C5167",
		"#304255",
		"#273545",
		"#222D39",
		"#1F262E",
		"#1E2329",
	]

	/** @type {string[]} */
	let blue = [
		"#4D8FDB",
		"#3A82CF",
		"#2C75C3",
		"#2769B4",
		"#235D9F",
		"#1C4C82",
		"#173E6E",
		"#133358",
		"#112945",
		"#10243C",
	]

	/** @type {ThemeEditor} */
	let editor = {
		background: "#161A1D",
		neutral: gray,
		accent: blue,
		error: [""],
		info: [""],
		warning: [""],
	}

	/** @type {ThemeSyntax} */
	let syntax = {
		comment: [gray[3]],
		plain: [gray[2], gray[1]],
		string: [slate[2], slate[1]],
	}

	/** @type {Theme} */
	let theme = {
		editor,
		syntax,
	}

	return theme
}
