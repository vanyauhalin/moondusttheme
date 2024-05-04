/**
 * @typedef {import("../syntax.js").Syntax} Syntax
 */

/**
 * @returns {Syntax}
 */
export function dockerfile() {
  return {
    title: "Dockerfile",
    name: "dockerfile",
    scope: "source.dockerfile",
    grammars: ["https://github.com/microsoft/vscode/blob/1.87.0/extensions/docker/syntaxes/docker.tmLanguage.json/"],
    example: {
      author: {
        name: "NGINX",
        url: "https://github.com/nginxinc/"
      },
      source: {
        name: "NGINX Alpine Dockerfile",
        url: "https://github.com/nginxinc/docker-nginx/blob/1.25.4/stable/alpine/Dockerfile/"
      }
    },
    tokenColors(s) {
      const c0 = s.comment[0]
      const p0 = s.plain[0]
      const p1 = s.plain[1]

      return {
        "comment.line.number-sign.dockerfile": c0,
        "keyword.control.dockerfile": p0,
        "keyword.other.special-method.dockerfile": p0,
        "source.dockerfile": p1
      }
    }
  }
}
