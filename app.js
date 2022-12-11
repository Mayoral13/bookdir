const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const api = require("./api");
app.use(bodyparser.json());
app.use("/api/",api);
app.listen(3000,()=>{
    console.log(
    "APP IS WORKING")
});