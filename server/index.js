const express = require('express')
const { sequelize } = require("./getConnect"); 
const { getPlants,deliverPlants } = require("./getplants");

const app = express();
app.use(express.json());


sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

app.post("/getplants", getPlants);
app.post("/deliverplants", deliverPlants);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

