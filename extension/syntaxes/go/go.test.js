import {t} from "../../test.js"
import {go} from "./go.js"

await t(go, import.meta.url)
