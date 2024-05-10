import {t} from "../../test.js"
import {sh} from "./sh.js"

await t(sh, import.meta.url)
