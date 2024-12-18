# assignment-2-book-shop

A RESTful API for managing book-related operations such as ordering books, calculating revenue, and managing product inventory. Built with Node.js, Express, and MongoDB, the application provides scalable, secure, and efficient APIs for a seamless user experience.

## Features

1. Product Management

    * Retrieve all books, filterable by title, author, or category.

    * Inventory management (reduce quantity when an order is placed, mark as out of stock when quantity reaches zero).

2. Order Management

Place orders with essential details like email, product ID, quantity, and total price.
Automatically handle inventory updates during order creation.
Return appropriate error messages for insufficient stock scenarios.

3. Revenue Calculation

    * Use MongoDB’s aggregation pipeline to compute total revenue from all orders.

    * Multiply book prices with quantities to calculate total revenue dynamically.

4. Robust Error Handling
    * Validates requests and gracefully handles errors, including invalid data and database issues.

5. Scalable Architecture
    * Implements modular architecture with clear separation of concerns: controllers, services, and routes.

## Endpoints
### Product Management
Retrieve All Products
Endpoint: /api/products
Method: GET
Query: ?searchTerm=<title|author|category> (optional)
Response:
json
Copy code

    {
    "status": true,
    "message": "Products retrieved successfully",
    "data": [
        {
        "_id": "product_id",
        "title": "Book Title",
        "author": "Author Name",
        "price": 20,
        "category": "Category Name",
        "description": "Book Description",
        "quantity": 10,
        "inStock": true
        }
    ]
    }
## Order Management
Place an Order
Endpoint: /api/orders
Method: POST
Request Body:

json
Copy code

    {
    "email": "customer@example.com",
    "product": "product_id",
    "quantity": 2,
    "totalPrice": 40
    }
Response:

json
Copy code

    {
    "status": true,
    "message": "Order created successfully",
    "data": {
        "_id": "order_id",
        "email": "customer@example.com",
        "product": "product_id",
        "quantity": 2,
        "totalPrice": 40,
        "createdAt": "2024-11-24T12:00:00.000Z",
        "updatedAt": "2024-11-24T12:00:00.000Z"
    }
    }

1. Handles stock updates: Reduces quantity and marks the product as out of stock if inventory reaches zero.
2. Returns an error if requested quantity exceeds stock availability.

## Revenue Calculation
Calculate Total Revenue
Endpoint: /api/orders/revenue
Method: GET
Response:
json
Copy code

    {
    "status": true,
    "message": "Revenue calculated successfully",
    "data": {
        "totalRevenue": 450
    }
    }

## Project Structure

    ├── src
    │   ├── controllers
    │   │   ├── product.controller.ts 
    │   │   ├── order.controller.ts    
    │   ├── models
    │   │   ├── product.model.ts        
    │   │   ├── order.model.ts          
    │   ├── services
    │   │   ├── product.service.ts      
    │   │   ├── order.service.ts        
    │   ├── routes
    │   │   ├── product.routes.ts       
    │   │   ├── order.routes.ts         
    │   ├── app.ts                      
    │   └── server.ts                   
    ├── .env                            
    ├── package.json
    ├── README.md
    └── tsconfig.json                  

## Technologies Used

* Node.js: Backend runtime environment.

* Express.js: Framework for building APIs.

* MongoDB: NoSQL database for storing products and orders.

* Mongoose: ODM library for MongoDB.

* TypeScript: Strongly typed JavaScript for enhanced reliability.