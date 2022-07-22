import View from './View.js';
import icons from 'url:../../img/icons.svg';
import { RES_PER_PAGE } from '../config';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _addRecipeBtn = document.querySelector('.nav__btn--add-recipe');
  _closeWindowBtn = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploaded :)';
  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerHideWindow();
  }
  _generateMarkup() {
    return `<div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="TEST" required name="title" type="text" />
    <label>URL</label>
    <input value="TEST234" required name="sourceUrl" type="text" />
    <label>Image URL</label>
    <input value="TEST234" required name="image" type="text" />
    <label>Publisher</label>
    <input value="TEST" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="23" required name="cookingTime" type="number" />
    <label>Servings</label>
    <input value="23" required name="servings" type="number" />
  </div>

  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <input
      value="0.5,kg,Rice"
      type="text"
      required
      name="ingredient-1"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 2</label>
    <input
      value="1,,Avocado"
      type="text"
      name="ingredient-2"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 3</label>
    <input
      value=",,salt"
      type="text"
      name="ingredient-3"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 4</label>
    <input
      type="text"
      name="ingredient-4"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 5</label>
    <input
      type="text"
      name="ingredient-5"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 6</label>
    <input
      type="text"
      name="ingredient-6"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
  </div>

  <button class="btn upload__btn">
    <svg>
      <use href="${icons}#icon-upload-cloud"></use>
    </svg>
    <span>Upload</span>
  </button>`;
  }
  _toggleWindow() {
    //rerender the upload recipe form.
    if (this._overlay.classList.contains('hidden'))
      this.render(this._data, true);
    //then toggle window
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  addHandlerShowWindow() {
    this._addRecipeBtn.addEventListener('click', this._toggleWindow.bind(this));
  }
  addHandlerHideWindow() {
    this._closeWindowBtn.addEventListener(
      'click',
      this._toggleWindow.bind(this)
    );
    this._overlay.addEventListener('click', this._toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      const recipe = Object.fromEntries(data);
      handler(recipe);
    });
  }
}
export default new AddRecipeView();
