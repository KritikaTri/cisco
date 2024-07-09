const Plants = require("./models/PlantModel"); // Assuming this is the path to your Trip model
const { sequelize } = require("./getConnect"); // Assuming sequelize is exported from the sequelize.js file


async function populatePlants() {
   const mock_data= [{"plant_name":"American White Waterlily","quantity":12,"price":40,"location":"Delhi"},
    {"plant_name":"Chilean Needlegrass","quantity":54,"price":26,"location":"Bengaluru"},
    {"plant_name":"Bristly Oswego Blackberry","quantity":53,"price":24,"location":"Bengaluru"},
    {"plant_name":"Purple Meadowparsnip","quantity":57,"price":56,"location":"Chennai"},
    {"plant_name":"Smallhead Doll's Daisy","quantity":73,"price":90,"location":"Kolkata"},
    {"plant_name":"Hawai'i Beggarticks","quantity":4,"price":59,"location":"Delhi"},
    {"plant_name":"Sullivant's Fontinalis Moss","quantity":56,"price":8,"location":"Bengaluru"},]

    try{
        await sequelize.sync();

        for(const data of mock_data){
            await Plants.create({
                plant_name : data.plant_name,
                quantity: data.quantity,
                price: data.price,
                toLocation: data.toLocation,
            });
        }
        
    console.log("Data populated successfully");

} catch (error) {   
    console.error("Error populating data:", error);
}   
}
populatePlants();