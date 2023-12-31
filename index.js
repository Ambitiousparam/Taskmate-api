const express = require("express");
const app = express();
const PORT = 3001;
const fs = require("fs");
const path = require("path");
const pathToFile = path.resolve("./data.json");



const getResources = () => JSON.parse(fs.readFileSync(pathToFile))

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.get("/api/resources/:id", (req, res) => {
  const resources = getResources();
  const{id} = req.params;
  const resource = resources.find(resource =>resource.id==id);
  res.send(resource);
})

app.post("/api/resources", (req, res) => {
  const resources = getResources();
  const resource = req.body;

  resource.createdAt = new Date();
  resource.status = "inactive";
  resource.id = Date.now().toString();
  resources.unshift(resource);

  fs.writeFile(pathToFile, JSON.stringify(resources, null, 2), (error) => {
    if (error) {
      return res.status(422).send("Cannot store data in the file!");
    }

    return res.send("Data has been saved!");
  })
})


app.listen(PORT, () => {
  console.log("Server is listening on port:" + PORT);
})