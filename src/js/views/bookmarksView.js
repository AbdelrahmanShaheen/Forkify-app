import PreviewView from './previewView.js';

class BookmarksView extends PreviewView {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = ` No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _message = '';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
