# Bidding Platform API

## Introduction

This is a comprehensive RESTful API for a real-time bidding platform using Node.js, Express, Socket.io, and PostgreSQL. The API supports advanced CRUD operations, user authentication, role-based access control, real-time bidding, and notifications.

## Setup

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/bidding-platform.git
    cd bidding-platform
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file and configure your environment variables:
    ```env
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    DB_HOST=your_db_host
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

4. Run migrations to set up the database:
    ```sh
    npx sequelize-cli db:migrate
    ```

5. Start the server:
    ```sh
    npm start
    ```

## API Endpoints

### Users

- `POST /users/register`: Register a new user.
- `POST /users/login`: Authenticate a user and return a token.
- `GET /users/profile`: Get the profile of the logged-in user.

### Items

- `GET /items`: Retrieve all auction items (with pagination).
- `GET /items/:id`: Retrieve a single auction item by ID.
- `POST /items`: Create a new auction item. (Authenticated users, image upload)
- `PUT /items/:id`: Update an auction item by ID. (Authenticated users, only item owners or admins)
- `DELETE /items/:id`: Delete an auction item by ID. (Authenticated users, only item owners or admins)

### Bids

- `GET /items/:itemId/bids`: Retrieve all bids for a specific item.
- `POST /items/:itemId/bids`: Place a new bid on a specific item. (Authenticated users)

### Notifications

- `GET /notifications`: Retrieve notifications for the logged-in user.
- `POST /notifications/mark-read`: Mark notifications as read.

## WebSocket Events

### Bidding

- `connection`: Establish a new WebSocket connection.
- `bid`: Place a new bid on an item.
- `update`: Notify all connected clients about a new bid on an item.

### Notifications

- `notify`: Send notifications to users in real-time.

## Additional Features

- Validation and error handling
- Role-based access control
- Image upload using Multer
- Search and filtering for auction items
- Pagination for the `GET /items` endpoint
- Notification system to notify users about bids on their items and when they are outbid

## Testing

- Add unit and integration tests for the API using a testing framework like Mocha, Chai, or Jest.

## Bonus Features

- Rate limiting middleware to prevent abuse of the API.
- ESLint for code quality.
- Logging for API requests and errors.
- Password reset functionality.
- Docker for containerization.
