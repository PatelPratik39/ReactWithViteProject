const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json")
const port = 4000;


app.get("/api/users", (req, res) => {
    res.set("Allow-Control-Allow-Origin", "*")
  res.json(users);
});

app.listen(port, (error) => {
  console.log(`app is listening on PORT : ${port}`);
});
