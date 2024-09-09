/////////////////////////////////////////
// use node parser.js to run this file //
/////////////////////////////////////////

// Read unparsed JSON file
const fs = require("fs");
const data = JSON.parse(
  fs.readFileSync("lib/coordinates.json", "utf8")
).addressPoints_pingpong;

// Create nested Array and parse the valus as float numbers
const jsonData = data.map((entry) => ({
  geolocation: [parseFloat(entry[0]), parseFloat(entry[1])],
}));

// filter jsonData to get reduced dataset around Leipzig
const filteredData = jsonData.filter((item) => {
  const [lat, lon] = item.geolocation;
  return lat >= 52 && lat <= 53 && lon >= 12 && lon <= 13;
});

// convert to JSON
const jsonString = JSON.stringify(jsonData, null, 2);

// save file
fs.writeFileSync("filtered_output_data.json", filteredData);
