import {t} from "../../test.js"
import {sql} from "./sql.js"

await t(sql, import.meta.url)
