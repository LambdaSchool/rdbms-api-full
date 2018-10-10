const express = require("express");
const port = 3300;
const server = express();
const helmet = require("helmet");

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.send("API / endpoint is working");
});

server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);
