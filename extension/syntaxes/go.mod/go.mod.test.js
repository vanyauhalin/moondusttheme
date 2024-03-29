import {t} from "../../../shared/test.js"
import * as s from "./go.mod.js"

await t(s, import.meta.url)
