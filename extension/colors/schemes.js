/**
 * @typedef {Object} ColorScheme
 * @property {string} white
 * @property {[string, string, string, string, string, string, string, string, string, string]} gray
 * @property {[string, string, string, string, string, string, string, string, string, string]} blue
 */

/**
 * @returns {ColorScheme}
 */
export function lightScheme() {
  const s = colorScheme()

  s.white   = "#FFFFFF" // hsl(  0,   0%, 100%)

  s.gray[0] = "#F6F7F8" // hsl(209,  13%,  97%)
  s.gray[1] = "#E8EBED" // hsl(209,  12%,  92%)
  s.gray[2] = "#D7DCDF" // hsl(208,  11%,  86%)
  s.gray[3] = "#B6BEC3" // hsl(208,  10%,  74%)
  s.gray[4] = "#8E979F" // hsl(208,   8%,  59%)
  s.gray[5] = "#71787F" // hsl(209,   6%,  47%)
  s.gray[6] = "#575E66" // hsl(210,   8%,  37%)
  s.gray[7] = "#434A51" // hsl(210,  10%,  29%)
  s.gray[8] = "#33383D" // hsl(210,   9%,  22%)
  s.gray[9] = "#24292D" // hsl(210,  11%,  16%)

  s.blue[0] = "#F2F8FC" // hsl(204,  66%,  97%)
  s.blue[1] = "#E2EFF8" // hsl(206,  62%,  93%)
  s.blue[2] = "#BBD7EC" // hsl(206,  56%,  83%)
  s.blue[3] = "#8EBCE1" // hsl(207,  58%,  72%)
  s.blue[4] = "#65A4D7" // hsl(207,  59%,  62%)
  s.blue[5] = "#3882C2" // hsl(208,  55%,  49%)
  s.blue[6] = "#1F639E" // hsl(208,  67%,  37%)
  s.blue[7] = "#144B7B" // hsl(208,  72%,  28%)
  s.blue[8] = "#113C5F" // hsl(207,  69%,  22%)
  s.blue[9] = "#0E2E48" // hsl(207,  67%,  17%)

  return s
}

/**
 * @returns {ColorScheme}
 */
export function darkScheme() {
  // todo: add dark variant.
  const s = colorScheme()
  return s
}

/**
 * @returns {ColorScheme}
 */
function colorScheme() {
  return {
    white: "",
    gray: ["", "", "", "", "", "", "", "", "", ""],
    blue: ["", "", "", "", "", "", "", "", "", ""]
  }
}
