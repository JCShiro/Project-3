console.log("This text means the JS is linked");
//ARRAY OF PLANET IMAGES
const planetImg = [
  {
    biomeName: "toxic",
    image: "Images/Biomes/Toxic.png",
  },
  {
    biomeName: "winter",
    image: "Images/Biomes/Winter.png",
  },
  {
    biomeName: "swamp",
    image: "Images/Biomes/Swamp.png",
  },
  {
    biomeName: "canyon",
    image: "Images/Biomes/Sandy.png",
  },
  {
    biomeName: "moon",
    image: "Images/Biomes/Moon.png",
  },
  {
    biomeName: "mesa",
    image: "Images/Biomes/Mesa.png",
  },
  {
    biomeName: "jungle",
    image: "Images/Biomes/Jungle.png",
  },
  {
    biomeName: "icemoss",
    image: "Images/Biomes/IceMoss.png",
  },
  {
    biomeName: "crimsonmoor",
    image: "Images/Biomes/CrimsonMoor.png",
  },
  {
    biomeName: "undergrowth",
    image: "Images/Biomes/Jungle.png",
  },
];
//References
//Create an index value for data elements
let dataIndex = 0;
//Get a JS reference for the selectors
const locations = document.getElementById("planets");
//get a reference for the faction image
const CurrentFactionImg = document.getElementById("planet_img");
//get a reference for the faction text
const factionText = document.getElementById("faction_text");
// get a reference for the liberation percentage text
const libText = document.getElementById("lib_text");
// get a reference for the divers active text
const activeText = document.getElementById("active_text");
// get a reference for the terrain type text
const terrainText = document.getElementById("terrain_text");
// get a reference for the terrain image
const planetImages = document.getElementById("biome_img");
//helldivers 2 planet api
// const apiUrl = "https://helldiverstrainingmanual.com/api/v1/war/campaign";
// console.log(apiUrl);
// LOCAL DATA
const apiUrl = "http://127.0.0.1:5500/offlineData.json"
//FUNCTIONS
locations.onchange = () => {
  //   console.log("onchange") //Testing log
  const ID = locations.value;
  fetchData(ID);
};
//<----------fetchData FUNCTION---------->
async function fetchData(ID) {
  //async means function does not need to be called. The ID parameter is passed through the function
  try {
    // console.log("fetch") //Testing log
    // console.log(planetURL)
    const response = await fetch(apiUrl); // Checks for a response from the api URL
    if (!response.ok) {
      //checks to see if there was a good response
      throw new Error("response status", response.status); //creates a new error and prints it to console
    }
    const json = await response.json(); //sets json to be the api's json file
    console.log(json); //Console for testing and dev
    //we now have data
    //calls the function processData and passes through json and ID
    processData(json, ID);
    // populateUI(json);
  } catch (err) {
    console.error(err);
  }
}
//<----------processData FUNCTION---------->
function processData(json, ID) {
  //creates an itterative loop that starts at 0 and ends at the length of the array in the json file
  for (let i = 0; i < json.length; i++) {
    // console.log(json[i].biome.slug); //Console for development
    if (json[i].planetIndex == ID) {
      //checks to see if the iterated planet id matches the selected planet id, if not the for loop is continued
      dataIndex = i; //sets the dataIndex to euqal the iterated value
      console.log("Found Planet"); //Console log for testing and debugging

      populateUI(json[dataIndex]); //calls the populateUI function and passes the selected json objects
      break;
    }
  }
  if (dataIndex == -1) {
    //if the planet isnt found, call a function that sets up a default response
    console.log("Planet not Found");
    defaultUi();
  }
}
//<----------populateUI FUNCTION---------->
function populateUI(data) {
  //named function with the data parameter passed through
  document.getElementById("planet_text").innerHTML =
    "You are viewing: " + data.name; //gets a reference for the planet text and changes the dext displayed to show the planets name
  factionText.innerHTML = "Current owner: " + data.faction; //changes the fation text to display the occupying faction
  libText.innerHTML = "Liberated: " + Math.floor(data.percentage) + "%"; //changes the liberated text to show the %liberated
  activeText.innerHTML = "Divers active: " + data.players; //changes the text to show how many players are active
  try {
    //tries to get the terrain data
    terrainText.innerHTML = "Terrain: " + data.biome.slug; //if successfull, changes the text
  } catch {
    terrainText.innerHTML = "Planet Inactive"; //if fails, change text to this
  }
  //   console.log(data.biome.slug);
  factionSelector(data); //calls factionSelector and passes data through it
  //   console.log(data.faction);
  //   console.log(data.planetIndex); //Console for testing
  BiomeImages(data, planetImg); //calls BiomeImages and passes data and planetImg array
}
//<----------factionSelector FUNCTION---------->
function factionSelector(data) {
  if (data.faction == "Illuminates") {
    //checks what the faction is
    CurrentFactionImg.src = "Images/Factions/Illuminate_Icon.webp"; //changes the image if true
  } else if (data.faction == "Automatons") {
    //repeat with new faction name
    CurrentFactionImg.src = "Images/Factions/Automaton_icon.webp";
  } else if (data.faction == "Terminids") {
    //repeat with new faction name
    CurrentFactionImg.src = "Images/Factions/Terminids_Icon.webp";
  } else {
    CurrentFactionImg.src = "Images/Factions/Super_Earth_Icon.webp"; //if not one of the 3 stated factions, default to this image
  }
}
//<----------BiomeImages FUNCTION---------->
function BiomeImages(data) {
  // console.log(data.biome.slug); //Console log for development
  for (i = 0; i < planetImg.length; i++) {
    //for loop that itterates through the array
    if (data.biome.slug == planetImg[i].biomeName) {
      //if the terrain data matches the selected terrain name in the array
      planetImages.src = planetImg[i].image; //change the image to matching image
      break;
    }
  }
}
