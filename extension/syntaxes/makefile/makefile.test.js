import {t} from "../../test.js"
import {makefile} from "./makefile.js"

await t(makefile, import.meta.url)
