import {t} from "../../../shared/test.js"
import * as s from "./go.sum.js"

await t(s, import.meta.url)
