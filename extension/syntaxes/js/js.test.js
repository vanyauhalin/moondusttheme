import {t} from "../../test.js"
import {js} from "./js.js"

await t(js, import.meta.url)
