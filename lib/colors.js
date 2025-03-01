/**
 * @import {S10} from "./shared.js"
 */

/**
 * @typedef {Record<string, S10>} ColorScheme
 */

/**
 * @returns {ColorScheme}
 */
export function light() {
	return {
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
}

/**
 * @returns {ColorScheme}
 */
export function dark() {
	return {
		gray: [
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
		],
		slate: [
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
		],
		blue: [
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
		],
	}
}
