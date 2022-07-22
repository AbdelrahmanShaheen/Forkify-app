import * as model from './model';
import { MODEL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import paginationView from './views/paginationView';
import resultsView from './views/resultsView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView.js';
import '../../node_modules/core-js/stable';
import '../../node_modules/regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';


const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //0) Update bookmarks view to mark selected bookmarked recipe.
    bookmarksView.update(model.state.bookmarks);
    //1) Update results view to mark selcted search results.
    resultsView.update(model.getSearchResultsPage());
    //2) Loading recipe
    await model.loadRecipe(id);
    //3) Rendering recipe :

    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1) Get search query.
    const query = searchView.getQuery();
    // if (!query) return;
    //2) Load search results.
    await model.loadSearchResults(query);
    //3) Render initial results.
    resultsView.render(model.getSearchResultsPage());
    //4) Render pagination buttons.
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function (goto) {
  const currPage = model.state.search.page;
  //1) Render new results.
  if (goto === 'next')
    resultsView.render(model.getSearchResultsPage(currPage + 1));
  if (goto === 'prev')
    resultsView.render(model.getSearchResultsPage(currPage - 1));
  //2) Render new pagination buttons.
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  model.updateServings(newServings);

  // this function is different than render
  // it renders all the necessary data that related to servings
  // so it renders only the data related to servings and ingredients
  //NOTE: render method inside the recipeView renders the whole view.
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlUploadRecipe = async function (recipe) {
  try {
    //Show loading spinner
    addRecipeView.renderSpinner();
    //Uploading the new recipe data
    await model.uploadRecipe(recipe);
    //Success message
    addRecipeView.renderMessage();
    //Render recipe
    recipeView.render(model.state.recipe);
    //Change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //Render the bookmark view.
    bookmarksView.render(model.state.bookmarks);
    //close form window
    setTimeout(function () {
      addRecipeView._toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlUploadRecipe);
};
init();
