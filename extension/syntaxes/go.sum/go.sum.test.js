import {t} from "../../test.js"
import {gosum} from "./go.sum.js"

await t(gosum, import.meta.url)
