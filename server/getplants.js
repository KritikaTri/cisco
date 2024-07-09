const { Sequelize, Transaction, Op } = require("sequelize");
const { sequelize } = require("./getConnect.js");
const Plant = require("./models/PlantModel");

async function getPlants(req, res) {
    const { quantity, location } = req.body;
  
    try {
      const availablePlants = await Plant.findAll({
        where: {
          location: location,
          quantity:  quantity,
          available_Plants: { [Op.gt]: 0 },
        },
        attributes: ["quantity" , "location" , "available_plants"],
        order: [["quantity", "ASC"]],
      });
  
      if (availablePlants.length === 0) {
        return res
          .status(404)
          .json({ message: "No available plants as of now..." });
      }
  
      const plants = availablePlants.map((plant) => ({
        quantity: plant.quantity,
        location: plant.location,
        availablePlants: plant.available_plants,
      }));
  
      return res.json(plants);
    } catch (error) {
      console.error("Error fetching available plants:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching available plants." });
    }
  }



  async function deliverPlants(req, res) {
    const { location,quantity,plantname } = req.body;
  
    try {
      const result = await sequelize.transaction(
        {
          isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        },
        async (t) => {
          const plant = await Plant.findOne({
            where: {
              location: location,
              quantity: quantity,
              plant_name: plantname,
              available_plants: { [Op.gt]: 0 },
            },
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
  
          if (!plant) {
            throw new Error(
              "No available plant found for the selected route and day. sad"
            );
          }
  
          plant.available_plants -= 1;
          await plant.save({ transaction: t });
  
          return {
            message: `Plant with name ${plant.plant_name} in quantity ${plant.quantity}  have been successfully delivered.`,
          };
        }
      );
  
      // Handle successful booking
      return res.json(result);
    } catch (error) {
      console.error("Booking failed:", error);
  
      // Handle errors, including no available trips
      if (
        error.message ===
        "No available plants found for the selected route. sad"
      ) {
        return res.status(404).json({
          message: error.message,
         location,
         quantity,
        });
      }
  
      // Handle other errors
      return res
        .status(500)
        .json({ message: "An error occurred while trying to deliver the plant." });
    }
  }



module.exports = { getPlants, deliverPlants };