// const Bundler = require("parcel-bundler");
const express = require("express");
const server = express();
// let bundler = new Bundler("dist/index.html");
const port = process.env.PORT || 3570;

server.use(express.static(__dirname + "/dist"));
// server.use(bundler.middleware());
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
