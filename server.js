const express = require("express");
const server = express();
const port = process.env.PORT || 1234;

server.use(express.static(__dirname + "/dist"));

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
