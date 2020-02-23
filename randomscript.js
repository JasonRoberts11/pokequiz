const pokemonUrl = "https://pokeapi.co/api/v2/pokemon?limit=1000";
let pokeNames = [];
let pokeURLs = [];
fetch(pokemonUrl).then(response => {
  return response.json();
}).then(json => { // Populates the pokeNames array with Names for the Pokemon
  pokeNames = [];
  pokeURLs = [];
//  console.log(json);
  for (let i = 0; i < json.results.length; i++) {
    if (json.results[i].name.search("-") == -1) {
      pokeNames.push(json.results[i].name);
      pokeURLs.push(json.results[i].url);
    }
  }
});
let prePokemon = [];


document.getElementById("startRand").onclick = (e) => {
  e.preventDefault();
  document.getElementById("quizDiv").classList = ["shownow"]

  //document.getElementById("buttonrow").classList = ["buttonrow hideNow"]
//  mode = 1;
//  genQuestion("FR", mode);

let optionDiv = document.getElementById("options");
let freeDiv = document.getElementById("freeResponse");
let questionEl = document.getElementById("question");
let desc = document.getElementById("descriptione");
let ans = document.getElementById("answer");

let qImage = document.getElementById("qimage");

if (prePokemon.length >= pokeNames.length) {
  prePokemon = [];
  console.log("you did all the pokemon you ");
}
let pokemon = Math.floor(Math.random() * pokeNames.length);
while (prePokemon.indexOf(pokemon) != -1) {
  pokemon = Math.floor(Math.random() * pokeNames.length);
}

fetch(pokeURLs[pokemon]).then(response => {
  return response.json();
}).then(json => { // Populates the pokeNames array with Names for the Pokemon
//  console.log(json);
  qImage.src = json.sprites.front_default;
    qImage.classList = "pokeimage fadeshow";
    ans.classList = ["showNow"];
    ans.innerHTML = capitalizeFLetter(pokeNames[pokemon]);

})


}



function capitalizeFLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
