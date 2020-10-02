/**
 * @description Server configuration
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict";

const express = require("express");
const personRouter = require("./api/personApi");
const cors = require("./config/cors");
const app = express();

app.use(process.env.API_PATH, express.json(), cors, personRouter);

const PORT = process.env.PORT;
app.listen(PORT);