const searchBtn = document.getElementById('search-btn');
const mealList = document.querySelector('.meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const searchInputText = document.getElementById('search-input-text');

//Get meal Lists that matches with the ingredients
//.trim() removes whitespace from both ends of a string
const getMealList = () => {
  let inputResult =  searchInputText.value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputResult}`)
    .then(response => response.json())
    .then(data => {
       let html = "";
       if(data.meals) {
           data.meals.forEach(meal => {
               html += `
               <div class="meal-item" data-id ="${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="healthy-food">
                    </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                </div>`
           })
           mealList.classList.remove('notFound');
       } else {
           mealList.style.display ="block";
           mealList.style.textAlign = "center";
           html = "Oops!! Sorry we didn't find any meal for your ingredient.";
           mealList.classList.add('notFound');
       }
       mealList.innerHTML = html;
    })
}
  searchInputText.value = '';
//Get Recipe for meals
const getMealRecipe = (e) => {
    e.preventDefault();
   if(e.target.classList.contains('recipe-btn')) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
    .then(response => response.json())
    .then(data => mealRecipeModal(data.meals))
   }
}

//Meal recipe Modal
const mealRecipeModal = (meal) => {
    meal = meal[0];
    let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruction">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
    </div>                    
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe')
}
//Event Listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', (meal) => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

