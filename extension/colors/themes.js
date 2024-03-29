import * as s from "./schemes.js"

/**
 * @typedef {Object} Theme
 * @property {Object} editor
 * @property {Syntax} syntax
 */

/**
 * @typedef {Object} Syntax
 * @property {[string]} comment
 * @property {[string, string]} plain
 * @property {[string, string]} string
 */

/**
 * @type {Theme}
 */
export const light = {
  editor: {
    background: s.light.white,
    foreground: s.light.gray[7],
    neutral: s.light.gray,
    primary: s.light.blue,
    log: {
      error: [
        "#B35900"
      ],
      info: [
        s.light.gray[4]
      ],
      warning: [
        "#7D4E00"
      ]
    }
    // diff: {
    //   added: [
    //     ""
    //   ],
    //   deleted: [
    //     ""
    //   ],
    //   modified: [
    //     ""
    //   ]
    // }
  },
  syntax: {
    comment: [
      s.light.gray[4]
    ],
    plain: [
      s.light.gray[5],
      s.light.gray[7]
    ],
    string: [
      s.light.blue[5],
      s.light.blue[7]
    ]
  }
}
