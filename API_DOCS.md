## Authentication (Auth Routes) - /api/auth

### POST /api/auth/register

**Description:** Registers a new user with username, email, and password.

**Request Body:**
{ "username": "string", "email": "string", "password": "string" }

**Response (201):**
{ "message": "User registered successfully", "userId": "string" }

**Error (400):**
{ "message": "User already exists" }

---

### POST /api/auth/login

**Description:** Authenticates a user using email and password, returning a JWT token.

**Request Body:**
{ "email": "string", "password": "string" }

**Response (200):**
{ "token": "string" }

**Error (400):**
{ "message": "Invalid email or password" }

---

## User Preferences - /api/preferences

### POST /api/preferences

**Description:** Saves user dietary and nutritional preferences.

**Request Body:**
{ "userId": "string", "dietaryRestrictions": ["string"], "allergyRestrictions": ["string"], "caloriesInTake": "number", "nutrientsSelection": ["string"] }

**Response (201):**
{ "message": "Preferences saved successfully", "data": { "userId": "string", "dietaryRestrictions": [...], "allergyRestrictions": [...], "caloriesInTake": number, "nutrientsSelection": [...] } }

**Error (400/500):**
{ "message": "Error message" }

---

### GET /api/preferences/my (Requires Authorization)

**Description:** Retrieves the current authenticated user’s saved preferences.

**Headers:**

- Authorization: Bearer <token>

**Response (200):**
{ "userId": "string", "dietaryRestrictions": [...], "allergyRestrictions": [...], "caloriesInTake": number, "nutrientsSelection": [...] }

---

## Meal Planning - /api/mealplan

### POST /api/mealplan/create (Requires Authorization)

**Description:** Creates a meal plan using Edamam’s Meal Planner API, based on given startDate, endDate, and preferences.

**Headers:**

- Authorization: Bearer <token>

**Request Body:**
{ "startDate": "YYYY-MM-DD", "endDate": "YYYY-MM-DD", "preferences": "object or array defining plan" }

**Response (200):**

- Edamam meal plan data.

**Error (4xx/5xx):**
{ "message": "Error details" }

---

### GET /api/mealplan/recipe/:recipeId (Requires Authorization)

**Description:** Fetches detailed information about a specific recipe by its recipeId from Edamam’s API.

**Headers:**

- Authorization: Bearer <token>

**Response (200):**

- Detailed recipe JSON.

**Error (4xx/5xx):**
{ "message": "Error details" }

---

## Recipe Search & Nutrition Analysis - /api/recipes (Main App)

### GET /api/recipes?query=<searchTerm>

**Description:** Searches for recipes using the Edamam recipe search API. Requires a query parameter.

**Query Parameter:** `query` (string)

**Response (200):**

- JSON containing recipe search results.

**Error (400/500):**
{ "message": "Error message" }

---

### POST /api/analyze

**Description:** Analyzes the nutritional content of a list of ingredients.

**Request Body:**
{ "ingredients": ["ingredient string 1", "ingredient string 2", ...] }

**Response (200):**

- Nutrition analysis results from Edamam.

**Error (400/500):**
{ "message": "Error message" }

---

## Recipe Details & Bulk Retrieval - /api/recipes/details

### POST /api/recipes/details (Requires Authorization)

**Description:** Retrieves detailed information for multiple recipes by their URIs.

**Headers:**

- Authorization: Bearer <token>

**Request Body:**
{ "uris": ["recipe-uri-1", "recipe-uri-2", ...] }

**Response (200):**

- An array of detailed recipe objects.

**Error (400/500):**
{ "message": "Error message" }

---

## Saved Recipes - /api/recipes

### POST /api/recipes/save (Requires Authorization)

**Description:** Saves a recipe to the authenticated user’s saved recipes.

**Headers:**

- Authorization: Bearer <token>

**Request Body:**
{ "label": "string", "image": "string", "source": "string", "shareAs": "string", "ingredients": ["string"], "healthLabels": ["string"], "dietLabels": ["string"], "mealType": "string", "calories": number, "uri": "string" }

**Response (201):**
{ "message": "Recipe saved successfully", "recipe": { ... } }

**Error (400/500):**
{ "message": "Error message" }

---

### GET /api/recipes/saved (Requires Authorization)

**Description:** Retrieves all saved recipes for the authenticated user.

**Headers:**

- Authorization: Bearer <token>

**Response (200):**

- An array of saved recipe objects.

---

## Progress Tracking - /api/progress

### POST /api/progress (Requires Authorization)

**Description:** Saves or updates the user’s health progress (weight, blood sugar, etc.) for a given date.

**Headers:**

- Authorization: Bearer <token>

**Request Body:**
{ "date": "YYYY-MM-DD", "weight": number, "bloodSugar": number, "bloodPressure": number, "cholesterol": number }

**Response (200):**
{ "message": "Progress saved successfully.", "data": { ...updated progress data... } }

**Error (400/500):**
{ "message": "Error message" }

---

### GET /api/progress (Requires Authorization)

**Description:** Retrieves the user’s progress data, optionally filtered by year and month query parameters.

**Headers:**

- Authorization: Bearer <token>

**Query Parameters (optional):** `year`, `month`

**Response (200):**
{ "data": [ { "date": "YYYY-MM-DD", "weight": ..., "bloodSugar": ..., "bloodPressure": ..., "cholesterol": ... } ... ] }

**Error (500):**
{ "message": "Error message" }
