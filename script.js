const countKey = "7be657de-929c-4745-be3a-20f4570e5b30"
const siteName = "pokequiz.zulck.com";
const counturl = "https://api.countapi.xyz/hit/" + siteName + "/" + countKey;
fetch(counturl).then((response) => {
  return response.json();
}).then(json => {
  document.getElementById("count").innerHTML = "Number of Visits: " + json.value;
});
let score = 0;
let total = 0;
let mode = 0;
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

function generateImages() {
  let imgDiv = document.getElementById("imgDiv");
  for (let i = 0; i < pokeNames.length; i++) {
    let img = document.createElement("img");
    img.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (i + 1) + ".png";
    imgDiv.appendChild(img);
  }
}


function debugText(value) {
  document.getElementById("debug").innerHTML = value;
//  console.log(value);
}

document.getElementById("startQuizWho").onclick = (e) => {
  e.preventDefault();
  document.getElementById("quizDiv").classList = ["shownow"]

  document.getElementById("buttonrow").classList = ["buttonrow hideNow"]
  mode = 0;
  genQuestion("FR", mode);
}
document.getElementById("startQuizPic").onclick = (e) => {
  e.preventDefault();
  document.getElementById("quizDiv").classList = ["shownow"]

  document.getElementById("buttonrow").classList = ["buttonrow hideNow"]
  mode = 1;
  genQuestion("FR", mode);
}
document.getElementById("startQuizFacts").onclick = (e) => {
  e.preventDefault();
  document.getElementById("quizDiv").classList = ["shownow"]
  mode = 2;
  document.getElementById("buttonrow").classList = ["buttonrow hideNow"]
  genQuestion("FR", mode);

}

document.getElementById("submitAnswer").onclick = (e) => {
  e.preventDefault();
  let ibox = document.getElementById("fr")
  let qImage = document.getElementById("qimage");
  if (mode == 0) {
    qImage.classList = ["pokeimage lighten"];

  }
  let ans = document.getElementById("answer");
  ans.classList = ["showNow"];
  ans.innerHTML = capitalizeFLetter(wantedAnswer);
  if (ibox.value.toLowerCase() == wantedAnswer) {
    score += 1;
    ibox.classList = ["inputtext good"]
  } else {
    ibox.classList = ["inputtext bad"]
  }
  total += 1;
  document.getElementById("score").innerHTML = "Score: " + score + "/" + total;
  setTimeout(() => {
    genQuestion("FR", mode)
  }, 1500)
}


/* Subjects are as follows:
  0: Pokemon Sprite to Name.
  1: Pokemon name to type(s).
  2: Pokemon description to name. using https://pokeapi.co/api/v2/pokemon-species/1/
*/
let prePokemon = [];
let wantedAnswer = "";

function genQuestion(type, subject, number) {
  let optionDiv = document.getElementById("options");
  let freeDiv = document.getElementById("freeResponse");
  let questionEl = document.getElementById("question");
  let desc = document.getElementById("descriptione");

  let qImage = document.getElementById("qimage");
  qImage.classList = "pokeimage diss";
  let ans = document.getElementById("answer");
  ans.innerHTML = ".";
  ans.classList = "diss"
  let ibox = document.getElementById("fr")
  ibox.value = ""
  ibox.classList = "inputtext"
  if (type = "FR") {
    if (prePokemon.length >= pokeNames.length) {
      prePokemon = [];
      console.log("you did all the pokemon you ");
    }
    let pokemon = Math.floor(Math.random() * pokeNames.length);
    while (prePokemon.indexOf(pokemon) != -1) {
      pokemon = Math.floor(Math.random() * pokeNames.length);
    }
    if (subject == 0 || subject == 1) {

      //console.log(pokemon)
      question.innerHTML = "Who's that Pokémon?";
      fetch(pokeURLs[pokemon]).then(response => {
        return response.json();
      }).then(json => { // Populates the pokeNames array with Names for the Pokemon
      //  console.log(json);
        qImage.src = json.sprites.front_default;
        if (subject == 0) {
          qImage.classList = "pokeimage darken";
        } else {
          qImage.classList = "pokeimage fadeshow";
        }
      })
      //qImage.src= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (pokemon+1) + ".png";
      qImage.src = ""
      wantedAnswer = pokeNames[pokemon];
    }else{
      question.innerHTML = "Who's that Pokémon?";

      qImage.classList = "hidden";

      qImage.src = "";
      fetch(pokeURLs[pokemon]).then(response => {
        return response.json();
      }).then(json => { // Populates the pokeNames array with Names for the Pokemon
      //  console.log(json);
        fetch(json.species.url).then(r=>{
          return r.json();
        }).then((json)=>{
desc.classList = "fadeshow";
          let text = "Number: " + json.id;
          for(let i = 0;i<json.flavor_text_entries.length;i++){
            if(json.flavor_text_entries[i].language.name == "en"){
              text = json.flavor_text_entries[i].flavor_text;
            }
          }
          let re = new RegExp(pokeNames[pokemon],"gi")
          text = text.replace(re, "_____")


          desc.innerHTML = text;
        })

      })

      wantedAnswer = pokeNames[pokemon];

    }
    optionDiv.style.display = "none";
    freeDiv.style.display = "block";
  } else {


  }
}



function capitalizeFLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
