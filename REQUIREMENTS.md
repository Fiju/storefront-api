# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: `/products` (GET)
- Show: `/products/:id` (GET)
- Create: `/products` (POST) [token required]. Sample body data: `{"name": "Samsung A51", "price": "1000", "category": "Electronics"}`
- Top 5 most popular products: `/products/popular` (GET)

#### Users

- Index: `/users` (GET) [token required]
- Authenticate (New endpoint): `/users/authenticate` - This endpoint serves the purpose of signing in the user by gnerating their JWT and sending it as response (POST)
- Show: `/users/:id` (GET) [token required]
- Create: `/users` (POST). Sample body data: ` { "firstname": "Faizan", "lastname": "Shiraz", "password": "password" }`
- Remove (New endpoint): `/users` (DELETE) [token required]

#### Orders

- Create: `/orders` (POST) [token required]. Sample body data: `{"product_id": "1", "quantity": "1"}`
- Current Order by user: `/orders/:user_id` (GET) (args: user id)[token required]
- [OPTIONAL] Completed Orders by user: `/orders/completed` (GET) (args: user id)[token required]

## Data Shapes

#### Product

```
products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price NUMERIC NOT NULL,
  category VARCHAR(25)
);
```

#### User

```
users (
id SERIAL PRIMARY KEY,
firstname VARCHAR(25) NOT NULL,
lastname VARCHAR(25) NOT NULL,
password VARCHAR(100) NOT NULL
);
```

#### Orders

```
orders (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  status BIT NOT NULL,

  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```
