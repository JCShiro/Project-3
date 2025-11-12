console.log("This text means the JS is linked");
//ARRAY OF PLANET IMAGES
const planetImg = [
    {
        biomeName: "toxic",
        image: "Images/Biomes/Toxic.png"
    },
    {
        biomeName: "winter",
        image: "Images/Biomes/Winter.png"
    },
    {
        biomeName: "swamp",
        image:"Images/Biomes/Swamp.png"
    },
    {
        biomeName: "canyon",
        image:"Images/Biomes/Sandy.png"
    },
    {
        biomeName: "moon",
        image:"Images/Biomes/Moon.png"
    },
    {
        biomeName: "mesa",
        image:"Images/Biomes/Mesa.png"
    },
    {
        biomeName: "jungle",
        image:"Images/Biomes/Jungle.png"
    },
    {
        biomeName: "icemoss",
        image:"Images/Biomes/IceMoss.png"
    },
    {
        biomeName: "crimsonmoor",
        image:"Images/Biomes/CrimsonMoor.png"
    }
];
//References
let dataIndex = -1;
const locations = document.getElementById("planets");
const CurrentFactionImg = document.getElementById("planet_img");
const factionText = document.getElementById("faction_text");
const libText = document.getElementById("lib_text");
const activeText = document.getElementById("active_text");
const terrainText = document.getElementById("terrain_text");
const planetImages = document.getElementById("biome_img")
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
    // console.log(json);
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
//   console.log(data.biome.slug);
factionSelector(data);
//   console.log(data.faction);
//   console.log(data.planetIndex); //Console for testing
  BiomeImages(data,planetImg);
}
locations.onchange = () => {
  //   console.log("onchange") //Testing log
  const ID = locations.value;
  fetchData(ID);
};
function processData(json, ID) {
  for (let i = 0; i < json.length; i++) {
    // console.log(json[i].biome.slug); //Console for development
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
function factionSelector(data) {
  if (data.faction == "Illuminates") {
    CurrentFactionImg.src = "Images/Factions/Illuminate_Icon.webp";
  } else if (data.faction == "Automatons") {
    CurrentFactionImg.src = "Images/Factions/Automaton_icon.webp";
  } else if (data.faction == "Terminids") {
    CurrentFactionImg.src = "Images/Factions/Terminids_Icon.webp";
  } else {
    CurrentFactionImg.src = "Images/Factions/Super_Earth_Icon.webp";
  }
}
function BiomeImages(data){
    console.log(data.biome.slug)
    // console.log(planetImages)
    if (data.biome.slug == "moon"){
        planetImages.src = "Images/Biomes/Moon.png"
        // console.log(planetImages)
    }
    else if(data.biome.slug == "crimsonmoor"){
      planetImages.src = "Images/Biomes/CrimsonMoor.png"
    }
    else if(data.biome.slug == "icemoss"){
      planetImages.src = "Images/Biomes/IceMoss.png"
    }
    else if(data.biome.slug == "jungle"){
      planetImages.src = "Images/Biomes/Jungle.png"
    }
    else if(data.biome.slug == "canyon"){
      planetImages.src = "Images/Biomes/Sandy.png"
    }
    else if(data.biome.slug == "swamp"){
      planetImages.src = "Images/Biomes/Swamp.png"
    }
    else if(data.biome.slug == "winter"){
      planetImages.src = "Images/Biomes/Winter.png"
    }
    else if(data.biome.slug == "mesa" || "desert"){
      planetImages.src = "Images/Biomes/Mesa.png"
    }
    else if(data.biome.slug == "toxic"){
      planetImages.src = "Images/Biomes/Toxic.png"
    }
    else if(data.biome.slug == "desolate"){
      planetImages.src = "Images/Biomes/Sandy.png"
    }
    else{
      planetImages.src = "Images/Biomes/TextSuperDestroyerLibertyRefined.png"
        console.log("error");
    }
    console.log(planetImages.src)
}