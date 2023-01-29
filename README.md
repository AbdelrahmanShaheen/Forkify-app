# Forkify-APP

<details>
<summary>Table of content</summary>

  - [About](#about)
  - [Build with](#build-with)
  - [About the API used for fetching recipe food data](#about-the-api-used-for-fetching-recipe-food-data)
  - [Features ✨](#features-)
  - [Project structure](#project-structure)
  - [App Architecture](#app-architecture)
  - [Flowchart Diagram](#flowchart-diagram)
  - [Screenshots 🖵](#screenshots-)
  - [Installation 📥](#installation-)
  - [How to use](#how-to-use)
    - [using live server](#using-live-server)
    - [using npm](#using-npm)
  - [Deployment/Live Demo](#deploymentlive-demo)
  - [Screen record](#screen-record)
  - [Note](#note)
  - [Future Feauters](#future-feauters)

</details>

## About

Recipe application with custom recipe uploads, it's all about searching for recipes
and displaying them in a user interface.

## Build with

This app is built with vanilla JavaScript along with HTML and SCSS. It uses PARCEL as module bundler , NPM as package manager and Babel to convert new JS code into compatible version for older browsers.

## About the API used for fetching recipe food data

- This app uses [Forkify API](https://forkify-api.herokuapp.com/v2) to get a list of recipes for a specific search query.
- Every user should have a personal API key for adding recipes but you will use mine.
- You can search for these recipes [Available search queries](https://forkify-api.herokuapp.com/phrases.html)

## Features ✨

- Search functionality: input field to send request to API with searched keywords
- Display results(list of recipes) with pagination
- Display recipe with cooking time, servings and ingredients
- Change servings functionality: update all ingredients according to current number of servings
- Bookmarking functionality: display list of all bookmarked recipes
- Create your own recipes and these recipes will automatically be bookmarked.
- Store bookmark data in the browser using local storage

## Project structure

<details>
<summary>Click to expand!</summary>

```bash
## Project Structure
📦Forkify-app
 ┣ 📂src
 ┃ ┣ 📂img
 ┃ ┃ ┣ 📜favicon.png
 ┃ ┃ ┣ 📜icons.svg
 ┃ ┃ ┗ 📜logo.png
 ┃ ┣ 📂js
 ┃ ┃ ┣ 📂views
 ┃ ┃ ┃ ┣ 📜addRecipeView.js
 ┃ ┃ ┃ ┣ 📜bookmarksView.js
 ┃ ┃ ┃ ┣ 📜paginationView.js
 ┃ ┃ ┃ ┣ 📜previewView.js
 ┃ ┃ ┃ ┣ 📜recipeView.js
 ┃ ┃ ┃ ┣ 📜resultsView.js
 ┃ ┃ ┃ ┣ 📜searchView.js
 ┃ ┃ ┃ ┗ 📜View.js
 ┃ ┃ ┣ 📜config.js
 ┃ ┃ ┣ 📜controller.js
 ┃ ┃ ┣ 📜helpers.js
 ┃ ┃ ┗ 📜model.js
 ┃ ┗ 📂sass
 ┃ ┃ ┣ 📜main.scss
 ┃ ┃ ┣ 📜_base.scss
 ┃ ┃ ┣ 📜_components.scss
 ┃ ┃ ┣ 📜_header.scss
 ┃ ┃ ┣ 📜_preview.scss
 ┃ ┃ ┣ 📜_recipe.scss
 ┃ ┃ ┣ 📜_searchResults.scss
 ┃ ┃ ┗ 📜_upload.scss
 ┣ 📜.gitignore
 ┣ 📜index.html
 ┣ 📜package.json
 ┗ 📜README.md

```

</details>

## App Architecture

I used i this app **the Model-View-Controller (MVC) Architecture**

- one model contains all the data about the application and also all the **AJAX** work.
- one controller contains the application logic ,it's a bridge between model and the views (which don't know about one another).
- i used multiple views(like: searchView ,recipeView ,resultsView , etc..) contain all the presentation logic like DOM work and rendering html code

I used **Publisher-Subscriber** design pattern.
so handling the events done in the controller and listening for events to handle it done in the view , so i used this approach to put everything in its place.

###### Below is the MVC implementation (RECIPE DISPLAY ONLY)

![forkify-architecture-recipe-loading](https://user-images.githubusercontent.com/77184432/180591784-8def0555-b7b3-4dc8-a614-5da2bb8ae001.png)

###### Below is the OOP Architecture implementation(ALL VIEWS IN THE APP)

![Views-architecture](https://user-images.githubusercontent.com/77184432/180591780-1aafcb9c-3f40-412b-b1f5-a039256b495f.png)

## Flowchart Diagram

<details>
<summary>Click to expand!</summary>

![forkify-flowchart-part-3](https://user-images.githubusercontent.com/77184432/180443382-9bdb978a-a4d5-436b-a6af-9fbf5090a545.png)

</details>

## Screenshots 🖵

<details>
<summary>First look</summary>

![screenshot1](https://user-images.githubusercontent.com/77184432/180442985-b1a82ef3-64cd-451d-b2b4-677447f23c4c.png)

</details>

<details>
<summary>Duck recipes</summary>

![Screenshot2](https://user-images.githubusercontent.com/77184432/180443059-de3dfe50-6e40-4f72-921e-d2045cd38c10.png)

</details>

<details>
<summary>Add recipe</summary>

![Screenshot3](https://user-images.githubusercontent.com/77184432/180443124-e81e9ff9-93bf-44a8-945f-679fb03f3787.png)

</details>

## Installation 📥

```bash
> git clone https://github.com/AbdelrahmanShaheen/Forkify-app
> cd Forkify-app/
> npm install
```

## How to use

### using live server

Use live server extension \
or
install nodejs : [nodejs](https://nodejs.org/en/download/) \
then install live server as an npm package

```bash
> npm install live-server -g
> live-server
```

### using npm

```bash
> npm run start
```

The application will be running on your localhost.

## Deployment/Live Demo

Deployed Website: [Forkify-Recipe-App](https://forkify-recipe-app1.netlify.app/)

## Screen record

[Forkify-Recipe-App](https://www.youtube.com/watch?v=sTk0ii0A9iU)

## Note

Not mobile friendly.

## Future Feauters

- Make the site responsive.
- Ability to delete your own recipes from the database conecting to the forkify API.
