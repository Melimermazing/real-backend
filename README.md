# Recipe App - Appetit Comite
REBOOT Academy Backend Project

A web application to gather and serch for cooking/baking recipe. This app can generate random recipes into a menu planner that fit customer needs and shows all necessary ingredients from every recipes inside the menu planner. 

<p align="center">
<img width="461" alt="Captura de pantalla 2023-03-28 175148" src="https://user-images.githubusercontent.com/121776133/228312536-4a548c28-a8f1-4e95-bed3-f6310ba235f4.png">

-----------------------------------

### DB DIAGRAM
**DB diagram includes the following entities:**

- `User:` 
This table stores information about the users of the application, including their name, email, address and other details.

- `User_Allergen:`
This table contains information about the allergies of each user. This is a junction table that links the User table with the Allergen table, allowing the application to exclude recipes containing those allergens from the user's dietary preferences. 

- `Allergen:`
This table stores information about the different types of allergens that users may have, such as dairy, peanuts, or gluten.

- `Ingredient_Allergen:`
This table stores information about the allergens that are present in each ingredient. this is a junction table that links the Ingredient table with the Allergen table, allowing the application to exclude recipes containing those allergens from the user's dietary preferences. 

- `Ingredient:`
This table stores information about the different types of ingredients that can be used in recipes, such as type of protein, sugar, or salt.

- `Recipe_Ingredient:`
This table contains information about the ingredients that are used in each recipe. This is a junction table that links the Recipe table with the Ingredient table,  allowing the application to generate ingredients lists and exclude recipes containing ingredients the user does not want to use. 

- `Recipe:`
This table stores information about the different recipes in the application, such as the recipe name, description, and instructions.

- `Menu_Planner:`
This table stores information about the different menu plans, such as the date and the recipes included in the plan, allowing the application to generate random meal plans based on the user's preferences and dietary restrictions.

**Summary**
- The User, Allergen, Ingredient, and Recipe tables form the basis of the application's recipe management system. The relationships between these tables enable the application to generate random recipes based on the user's preferences and dietary restrictions. 

- The User_Allergen and Ingredient_Allergen tables allow the application to identify and exclude allergens from the recipe recommendations, while the Recipe_Ingredient table helps in identifying the ingredients required to make a recipe. 

- The Menu_Planner table allows the application to track which recipes are selected for a particular meal plan.

-----------------------------------

[![Recipe App _ Modified](https://user-images.githubusercontent.com/121776133/228273093-1d2a609c-f9a1-4907-a3a7-a9f85c1478b0.png)](https://dbdiagram.io/d/6422fabe5758ac5f1724d064)

-----------------------------------

### USER STORIES

- [ ] - Able to create an account.
- [ ] - Able to access and modify an account.
- [ ] - Able to register dietary preferences and retrictions, such as allergens.
- [ ] - Able to browse a list of available recipes by name or category.
- [ ] - Able to view the details of a recipe, allowing user to see the name, description, instruction and ingredients. 
- [ ] - Able to retrieve a random recipes based on preferences and dietary restrictions. 
- [ ] - Able to generate a new menu from available recipes. 
- [ ] - Able to update an existing menu/recipe in menu planner, allowing user to change the menu/recipe or ingredients if needed.
- [ ] - Able to delete an existing menu/recipe in menu planner, allowing user to remove menu/recipes that no longer wants to use.

-----------------------------------

### ENDPOINTS


```                                                    

██     ██  ██████  ██████  ██   ██ ██ ███    ██  ██████       ██████  ███    ██ 
██     ██ ██    ██ ██   ██ ██  ██  ██ ████   ██ ██           ██    ██ ████   ██ 
██  █  ██ ██    ██ ██████  █████   ██ ██ ██  ██ ██   ███     ██    ██ ██ ██  ██ 
██ ███ ██ ██    ██ ██   ██ ██  ██  ██ ██  ██ ██ ██    ██     ██    ██ ██  ██ ██ 
 ███ ███   ██████  ██   ██ ██   ██ ██ ██   ████  ██████       ██████  ██   ████ 
                                                                                
                                                                                          
```
### Auth Endpoints

| METHOD | ENDPOINT     | TOKEN | ROLE | DESCRIPTION           | POST PARAMS                                                 | RETURNS |
| ------ | ------------ | ----- | ---- | --------------------- | ----------------------------------------------------------- | ------- |
| POST   | /auth/signup | -     | -    | User Sign Up          |                                                             | token   |
| POST   | /auth/login  | -     | -    | Delete skills form DB |                                                             | token   |


### User Endpoints

| METHOD | ENDPOINT                                    | TOKEN | ROLE  | DESCRIPTION                                          | POST PARAMS     | RETURNS                       |
| ------ | ------------------------------------------- | ----- | ----- | ---------------------------------------------------- | --------------- | ----------------------------- |
| GET    | /user                                       | YES   | Admin | Get all users                                        | -               | [{ user }]                    |
| GET    | /user/:userId                               | YES   | Admin | Get one user                                         | userId          | { user }                      |            
| GET    | /user/me                                    | YES   | User  | Get user´s profile access                            |                 |                               |
| GET    | /user/me/menuPlanner                        | YES   | User  | GET user´s menu planner view                         |                 |                               |
| POST   | /user                                       | YES   | Admin | Add one user                                         |                 |                               |
| POST   | /user/me/menuPlanner                        | YES   | User  | Add one recipe to menu planner                       |                 |                               |
| DELETE | /user/:userId                               | YES   | Admin | Delete one user                                      |                 |                               |
| DELETE | /user/me                                    | YES   | User  | Delete personal perfile by user                      |                 |                               |
| DELETE | /user/me/menuPlanner/:recipeId              | YES   | User  | Delete one recipe from personal menu planner by user |                 |                               |
| DELETE | /:me/menuPlanner/                           | YES   | User  | Delete all recipes by user                           | -               |                               |
| PUT    | /user/:userId                               | YES   | Admin | Update one selected user                             |                 |                               |
| PUT    | /user/me                                    | YES   | User  | Update personal perfile by user                      |                 |                               |
| PUT    | /user/me/menuPlanner                        | YES   | User  | Update menu planner by user                          |                 |                               |

### Recipe endpoints

| METHOD | ENDPOINT                                    | TOKEN | ROLE  | DESCRIPTION                                          | POST PARAMS     | RETURNS                       |
| ------ | ------------------------------------------- | ----- | ----- | ---------------------------------------------------- | --------------- | ----------------------------- |
| GET    | /recipe                                     | YES   | User  | Get all recipes                                      | -               | [{ recipe }]                  |
| GET    | /recipe/id                                  | YES   | User  | Get one recipe                                       |                 | { recipe }                    |
| GET    | /recipe/ingredient                          | YES   | User  | Get all recipes with all ingredients                 | -               |                               |
| GET    | /recipe/:ingredientId                       | YES   | User  | Get all recipes from one selected ingredient         | -               |                               |
| POST   | /recipe                                     | YES   | Admin | Add one recipe                                       |                 |                               |
| POST   | /recipe/:recipeId/:ingredientId             | YES   | Admin | Add one ingredient into one selected recipe          |                 |                               |
| DELETE | /recipe/:recipeId                           | YES   | Admin | Delete one recipe                                    |                 |                               |
| PUT    | /recipe/:recipeId                           | YES   | Admin | Update one recipe                                    |                 |                               |

### Allergens endpoints

| METHOD | ENDPOINT                                    | TOKEN | ROLE  | DESCRIPTION                                          | POST PARAMS     | RETURNS                       |
| ------ | ------------------------------------------- | ----- | ----- | ---------------------------------------------------- | --------------- | ----------------------------- |
| GET    | /allergen                                   | YES   | User  | Get all allegens                                     | -               | [{ allergen }]                |
| GET    | /allergen/:allergenId                       | YES   | User  | Get one allergen                                     |                 | { allergen }                  |
| POST   | /allergen                                   | YES   | Admin | Add one allergen                                     |                 |                               |
| DELETE | /allergen/:allergenId                       | YES   | Admin | Delete one allergen                                  |                 |                               |
| PUT    | /allergen/:allergenId                       | YES   | Admin | Update one allergen                                  |                 |                               |


### Ingredients endpoints

| METHOD | ENDPOINT                                    | TOKEN | ROLE  | DESCRIPTION                                          | POST PARAMS     | RETURNS                       |
| ------ | ------------------------------------------- | ----- | ----- | ---------------------------------------------------- | --------------- | ----------------------------- |
| GET    | /ingredients                                | YES   | User  | Get all ingredients                                  | -               | [{ ingredients }]             |
| GET    | /ingredients/:ingredientId                  | YES   | User  | Get one ingredient                                   |                 | { ingredient }                |
| GET    | /ingredients/allergenId                     | YES   | User  | Get all ingredients that contain selected allergen   | -               |                               |
| POST   | /ingredients                                | YES   | Admin | Add one ingredient                                   |                 |                               |
| DELETE | /ingredient/:ingredientId                   | YES   | Admin | Delete one ingredient                                |                 |                               |
| PUT    | /ingredient/:ingredientId                   | YES   | Admin | Update one ingredient                                |                 |                               |

