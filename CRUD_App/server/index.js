const express = require("express");
const fs = require("fs");
const app = express();
const users = require("./data.json");
const port = 8000;

app.use(express.json());

// get all users
app.get("/users", (req, res) => {
  return res.json(users);
});

// get single user
app.get("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let userList = users.filter((user) => user.id === id);
  return res.json(userList);
});

// post a single user
app.post("/users", (req, res) => {
  // let body = req.body;
  let { name, salary, department, machineId, experience } = req.body;
  if (!name || !salary || !department || !machineId || !experience) {
    res.status(400).send({ message: "All fileds should be inserted !" });
  }
  let id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  users.push({ id, name, salary, department, machineId, experience });

  console.log(users);
  fs.writeFile("./data.json", JSON.stringify(users), (err, data) => {
    return res.json({ message: "Succesfully added !!" });
  });

  // console.log(id, empName, salary, machineId, experience);
  // return res.json({ message: "Succesfully added !!" });
});

// To update any rows from the table using EDIT button, i have used here "PATCH" method

app.patch("/users/:id",(req, res) => {
  let id = Number(req.params.id)
  let body = req.body
  let index = users.findIndex(item => item.id === id)
  users.splice(index,1,{...body})
  fs.writeFile("./data.json", JSON.stringify(users), (err, data) => {
    return res.json(users);
  });
})

// DELETE method

app.delete("/users/:id",(req, res) =>{
  let id= Number(req.params.id);
  let userList = users.filter(user => user.id !== id);
  fs.writeFile("./data.json", JSON.stringify(userList), (err, data) => {
    return res.json(userList);
  });
})

app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Your App is listening on PORT : ${port}`);
  }
});
