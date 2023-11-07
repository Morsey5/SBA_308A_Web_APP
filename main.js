const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://pokedexapi.p.rapidapi.com/api/pokemon',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'f5d9e4ce1emsh228679f1a71f764p153104jsna13130b51f6d',
    'X-RapidAPI-Host': 'pokedexapi.p.rapidapi.com',
  },
  data: { query: 'all' },
};

const shuffleButton = document.getElementById('shuffleButton');
const pokemonName = document.getElementById('pokemon-name');
const pokemonNumber = document.getElementById('pokemon-number');
const pokemonType = document.getElementById('pokemon-type');

let allPokemonData = [];

shuffleButton.addEventListener('click', () => {
  getRandomPokemon();
});

async function getRandomPokemon() {
  if (allPokemonData.length === 0) {
    await fetchPokemonData();
  }

  if (allPokemonData.length > 0) {
    const randomIndex = Math.floor(Math.random() * allPokemonData.length);
    const randomPokemon = allPokemonData[randomIndex];

    pokemonName.textContent = `Name: ${randomPokemon.name}`;
    pokemonNumber.textContent = `Number: ${randomPokemon.number}`;
    pokemonType.textContent = `Type: ${randomPokemon.type}`;
  }
}

async function fetchPokemonData() {
  try {
    const response = await axios.request(options);
    allPokemonData = response.data.pokemons;
    getRandomPokemon();
  } catch (error) {
    console.error(error);
  }
}
