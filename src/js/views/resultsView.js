import PreviewView from './previewView.js';
class ResultsView extends PreviewView {
  _parentEl = document.querySelector('.results');
  _errorMessage = `No recipes found for your query! Please try again`;
  _message = '';
}

export default new ResultsView();
