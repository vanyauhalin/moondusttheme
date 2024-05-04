import {t} from "../../test.js"
import {gomod} from "./go.mod.js"

await t(gomod, import.meta.url)
