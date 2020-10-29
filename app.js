const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';

const appId = '00cad9f5';
const appKey = '22dd525610b4ab73e6c9ed758ea6194b';

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  fetchAPI();
});

async function fetchAPI(){
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${appKey}&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results){
  container.classList.remove('initial');
  let generatedHTML = '';
  results.map(result => {
    generatedHTML +=
    `
    <div class="item">
          <img src="${result.recipe.image}" alt="">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(0)}</p>
          <p class="item-data">Serving(s): ${result.recipe.yield}</p>
          <p class="item-data">Diet: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'Unavailable'}</p>
          <p class="item-data">Health: ${result.recipe.healthLabels}</p>
        </div>
    `
  })
  searchResultDiv.innerHTML = generatedHTML;
}