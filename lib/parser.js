// Read unparsed JSON file
const fs = require("fs");
const data = JSON.parse(
  fs.readFileSync("lib/coordinates.json", "utf8")
).addressPoints_pingpong;

// Create nested Array and parse the valus as float numbers
const jsonData = data.map((entry) => ({
  geolocation: [parseFloat(entry[0]), parseFloat(entry[1])],
}));

const filteredData = jsonData.filter();

// convert to JSON
const jsonString = JSON.stringify(jsonData, null, 2);

// save file
fs.writeFileSync("output_data.json", filteredData);
