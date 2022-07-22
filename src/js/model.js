// import { async } from 'regenerator-runtime';
import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config';
import { AJAX } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
  },
  bookmarks: [],
};
const createRecipeObject = function (recipe) {
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const { recipe } = await AJAX(`${API_URL}${id}?key=${KEY}`); //GET request
    state.recipe = createRecipeObject(recipe);
    state.recipe.bookmarked = state.bookmarks.some(
      bookmark => bookmark.id === id
    );
  } catch (error) {
    throw error;
  }
};
export const loadSearchResults = async function (query) {
  try {
    const { recipes } = await AJAX(`${API_URL}?search=${query}&key=${KEY}`); //GET request
    state.search.query = query;
    state.search.results = recipes.map(result => {
      return {
        id: result.id,
        image: result.image_url,
        publisher: result.publisher,
        title: result.title,
        ...(result.key && { key: result.key }),
      };
    });
    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    //calculate the new quantity.
    ing.quantity = (newServings / state.recipe.servings) * ing.quantity;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  //Add bookmark
  state.bookmarks.push(recipe);
  //Mark the recipe as bookmarked
  state.recipe.bookmarked = true;
  //Store bookmarks to localStorage
  persistBookmarks();
};
export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(recipe => recipe.id === id);
  state.bookmarks.splice(index, 1);
  //Store bookmarks to localStorage
  persistBookmarks();
  // Mark the recipe as not bookmarked
  state.recipe.bookmarked = false;
};
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(element => element[0].startsWith('ingredient') && element[1])
      .map(ing => {
        const ingArr = ing[1].split(',').map(element => element.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format :)'
          );
        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });
    const recipe = {
      cooking_time: +newRecipe.cookingTime,
      image_url: newRecipe.image,
      ingredients: ingredients,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      source_url: newRecipe.sourceUrl,
      title: newRecipe.title,
    };
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe); //POST request
    state.recipe = createRecipeObject(data.recipe);
    addBookmark(data.recipe);
  } catch (error) {
    throw error;
  }
};
const init = function () {
  const data = localStorage.getItem('bookmarks');
  if (data) state.bookmarks = JSON.parse(data);
};
init();
const clearBookmarks = function () {
  localStorage.clear();
};
// clearBookmarks();
