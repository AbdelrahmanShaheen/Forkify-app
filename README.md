# Forkify-APP

Recipe application with custom recipe uploads, it's all about searching for recipes
and displaying them in a user interface.

## Build with

This app is built with vanilla JavaScript along with HTML and SCSS(not done by me). It uses PARCEL as module bundler , NPM as package manager and Babel to convert new JS code into compatible version for older browsers.

## About the API used for fetching recipe food data

- This app uses [Forkify API](https://forkify-api.herokuapp.com/v2) to get a list of recipes for a specific search query.
- Every user should have a personal API key for adding recipes but you will use mine.
- You can search for these recipes [Available search queries](https://forkify-api.herokuapp.com/phrases.html)

# Feauters in the APP

1. Search functionality: input field to send request to API with searched keywords
2. Display results(list of recipes) with pagination
3. Display recipe with cooking time, servings and ingredients
4. Change servings functionality: update all ingredients according to current number of servings
5. Bookmarking functionality: display list of all bookmarked recipes
6. Create your own recipes and these recipes will automatically be bookmarked.
7. Store bookmark data in the browser using local storage

# App Architecture

# Flowchart Diagram

![forkify-flowchart-part-3](https://user-images.githubusercontent.com/77184432/180443382-9bdb978a-a4d5-436b-a6af-9fbf5090a545.png)

# App Screenshots

1.  ![screenshot1](https://user-images.githubusercontent.com/77184432/180442985-b1a82ef3-64cd-451d-b2b4-677447f23c4c.png)
2.  ![Screenshot2](https://user-images.githubusercontent.com/77184432/180443059-de3dfe50-6e40-4f72-921e-d2045cd38c10.png)
3.  ![Screenshot3](https://user-images.githubusercontent.com/77184432/180443124-e81e9ff9-93bf-44a8-945f-679fb03f3787.png)

## Deployment/Live Demo

Deployed Website: [Forkify-Recipe-App](https://forkify-recipe-app1.netlify.app/)

## Screen record

[Forkify-Recipe-App](https://www.youtube.com/watch?v=sTk0ii0A9iU)

## Note

Not mobile friendly.

## Future Feauters

- Make the site responsive.
- Ability to delete your own recipes from the database conecting to the forkify API.
