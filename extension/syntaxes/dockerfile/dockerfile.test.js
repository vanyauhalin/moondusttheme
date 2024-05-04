import {t} from "../../test.js"
import {dockerfile} from "./dockerfile.js"

await t(dockerfile, import.meta.url)
