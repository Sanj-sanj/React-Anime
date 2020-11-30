const Bundler = require("parcel-bundler");
const express = require("express");
const server = express();
let bundler = new Bundler("public/index.html");
const port = process.env.PORT || 3570;

server.use(bundler.middleware());
server.listen(port);
