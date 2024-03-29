/**
 * @typedef {import("hast").Root} Root
 * @typedef {import("../../../../colors/themes.js").Syntax} Syntax
 */

import {r, w} from "../../../../../shared/test.js"

/**
 * @param {Syntax} s
 * @returns {Root}
 */
export function fn(s) {
  const c0 = w(s.comment[0])
  const p0 = w(s.plain[0])
  const p1 = w(s.plain[1])

  return r(
    c0("# Comment"),

    p0("FROM"), p1("node:14-alpine"), p0("AS"), p1("node"),
    p0("WORKDIR"), p1("/"),
    p0("COPY"), p1(". ."),
    p0("RUN"), p1("\\"),
      p1("npm install && \\"),
      p1("npm run build"),
    p0("CMD"), p1('["node", "main.js"]'),

    p0("ONBUILD RUN"), p1("echo"),
    p0("ADD"), p1(". ."),
    p0("ARG"), p1("NODE_ENV"),

    p0("ENTRYPOINT"), p1('["node", "main.js"]'),
    p0("ENV"), p1("NODE_ENV=$NODE_ENV"),
    p0("EXPOSE"), p1("3000"),
    p0("HEALTHCHECK"), p1("--interval=30s"),
    p0("LABEL"), p1("key=value"),
    p0("MAINTAINER"), p1("John Doe"),
    p0("SHELL"), p1('["/bin/sh", "-c"]'),
    p0("STOPSIGNAL"), p1("SIGTERM"),
    p0("USER"), p1("node"),
    p0("VOLUME"), p1("/var")
  )
}
