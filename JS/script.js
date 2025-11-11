console.log("This text means the JS is linked");
//ARRAY OF PLANET IMAGES
const planetImg = [{ image: "Images/1024px-Shete_Planet_Icon.jpg" }];
//References
let dataIndex = -1;
const locations = document.getElementById("planets");
const CurrentFactionImg = document.getElementById("planet_img");
const factionText = document.getElementById("faction_text");
const libText = document.getElementById("lib_text");
const activeText = document.getElementById("active_text");
const terrainText = document.getElementById("terrain_text");
//helldivers 2 planet api
const apiUrl = "https://helldiverstrainingmanual.com/api/v1/war/campaign";
console.log(apiUrl);
//FUNCTIONS
async function fetchData(ID) {
  try {
    // console.log("fetch") //Testing log
    // const planetURL = apiUrl //+ "/" + ID;
    // console.log(planetURL)
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("response status", response.status);
    }
    const json = await response.json();
    console.log(json);
    //we now have data
    processData(json, ID);
    // populateUI(json);
  } catch (err) {
    console.error(err);
  }
}
function populateUI(data) {
  document.getElementById("planet_text").innerHTML =
    "You are viewing: " + data.name;
  factionText.innerHTML = "Current owner: " + data.faction;
  libText.innerHTML = "Liberated: " + Math.floor(data.percentage) + "%";
  activeText.innerHTML = "Divers active: " + data.players;
  terrainText.innerHTML = "Terrain: " + data.biome.slug;
  if (data.faction == "Illuminates") {
    CurrentFactionImg.src = "Images/Factions/Illuminate_Icon.webp";
  } else if (data.faction == "Automatons") {
    CurrentFactionImg.src = "Images/Factions/Automaton_icon.webp";
  }else if (data.faction == "Terminids"){
    CurrentFactionImg.src = "Images/Factions/Terminids_Icon.webp"
  }else{
    CurrentFactionImg.src = "Images/Factions/Super_Earth_Icon.webp"
  }
    console.log(data.faction);
}
locations.onchange = () => {
  //   console.log("onchange") //Testing log
  const ID = locations.value;
  fetchData(ID);
};
function processData(json, ID) {
  for (let i = 0; i < json.length; i++) {
    console.log(json[i].biome.slug) //Console for development
    if (json[i].planetIndex == ID) {
      dataIndex = i;
      console.log("Found Planet");

      populateUI(json[dataIndex]);
      break;
    }
  }
  if (dataIndex == -1) {
    console.log("Planet not Found");
  }
}
