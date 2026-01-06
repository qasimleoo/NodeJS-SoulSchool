// const simple = require("./moduleSecond");
import simple from "./moduleES.mjs";
import { simple222 as s } from "./moduleES.mjs";

import * as hehe from "./moduleES.mjs";

simple();
s();
hehe.simple222();
hehe.default();
