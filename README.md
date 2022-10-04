# eCommerce

CRUD API example is written in [NodeJS](https://nodejs.org/en/) using [Express](https://expressjs.com) 
package and [MongoDB](https://www.mongodb.com) database.

## Requirements
- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com)
- Code Editor

## Instructions

- Clone the repository and move to the project directory:
 ```bash
   git clone https://github.com/ertgrlaltnts/eCommerce
   cd eCommerce
 ```
- To load the package:
 ```bash
   npm init
 ```
- Start:
 ```bash
   npm start
 ```
  
## Usage Examples
-  Get All Product
  ```bash
    curl -X GET localhost:8000/product
  ```
-  Get Product (by slug)
  ```bash
    curl -X GET localhost:8000/product/:slug
  ```
-  Add Product
  ```bash
    curl -X POST localhost:8000/product/create
      '{ "title" : "Table",
          "desc" : "Wooden Table",
          "rate": "3",
          "price" : 154,
          "amount": 2,
          "images" : [],
          "category" : "${_id}"
         }'
  ```
-  Delete Product (by slug)
  ```bash
    curl -X DELETE localhost:8000/product/:slug
  ```
-  Update Product (by slug)
  ```bash
    curl -X PUT localhost:8000/product/:slug
  '{ "title" : "Table",
          "desc" : "Wooden Table",
          "rate": "3",
          "price" : 154,
          "amount": 2,
          "images" : [],
          "category" : "${_id}"
         }'
  ```
  
 #### For the other uses, you can review the [authRouter.js](https://github.com/ertgrlaltnts/eCommerce/blob/main/routers/authRouter.js) , [orderRouter.js](https://github.com/ertgrlaltnts/eCommerce/blob/main/routers/orderRouter.js), [categoryRouter.js](https://github.com/ertgrlaltnts/eCommerce/blob/main/routers/categoryRouter.js) file.
