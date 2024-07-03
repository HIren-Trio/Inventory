# Inventory Management System

This is a comprehensive inventory management system with a React-based frontend and a Node.js backend. The system utilizes MongoDB Atlas for the database. It includes user and customer management features, where users can create customers and manage orders, while customers can log in and place orders.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

### User Management
- User registration and login
- Create, update, and delete customer profiles
- Manage inventory items (add, update, delete)
- Approve or reject customer orders

### Customer Management
- Customer registration and login
- Place orders for inventory items
- View order status (approved, rejected, pending)

## Technology Stack

### Frontend
- React
- Redux (for state management)
- React Router (for routing)

### Backend
- Node.js
- Express.js
- JWT (for authentication)
- MongoDB Atlas (database)

## Installation

### Prerequisites
- Node.js (v14 or above)
- npm or yarn
- MongoDB Atlas account

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/inventory-management-system.git
   cd inventory-management-system/Backend
   ```

2. Install backend dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the `Backend` directory with the following content:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=your_port
   ```

4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the `Frontend` directory:
   ```sh
   cd ../frontend
   ```

2. Install frontend dependencies:
   ```sh
   npm install
   ```

3. Start the frontend development server:
   ```sh
   npm start
   ```

## Usage

### User
1. Register and log in as a user.
2. Create customer profiles.
3. Manage inventory items.
4. View and manage customer orders (approve or reject).

### Customer
1. Register and log in as a customer.
2. Browse inventory items.
3. Place orders.
4. View order status.

## API Endpoints

### Authentication
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Log in a user


### Customer
- `GET /api/customer/getall` - Get all customers
- `POST /api/customer/add` - Create a new customer
- `PUT /api/customer/login` - login a customer

### Inventory
- `GET /api/inventory/getall` - Get all inventory items
- `POST /api/inventory/add` - Add a new inventory item
- `PUT /api/inventory/update/:id` - Update an inventory item
- `DELETE /api/inventory/delete/:id` - Delete an inventory item

### Orders
- `GET /api/order/getall` - Get all orders
- `POST /api/order/add/` - Create a new order
- `PUT /api/order/changestatus/:id` - Update an order (approve/reject)
- `POST /api/order/removeproduct/:id` - Delete an product from order

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.

## License

This project is licensed under the MIT License.


This `README.md` file includes all necessary information about the project, including features, technology stack, installation instructions, usage details, API endpoints, and contributing guidelines. Adjust the content according to your specific project details.

