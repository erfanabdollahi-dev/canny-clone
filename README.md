# Canny Clone Backend

A RESTful API backend for a Canny-style feedback management platform.
Users can create feedback posts, vote on ideas, comment, manage boards, and track feature requests.

Built with **Node.js, Express, TypeScript, MongoDB, and Mongoose**.

---

## Features

### Authentication

* User registration
* User login
* JWT authentication
* Protected routes
* Role-based authorization
* Password hashing with bcrypt
* Password reset through email

### Users

* Get current authenticated user
* User roles:

  * User
  * Admin

### Boards

* Create and manage feedback boards
* Retrieve boards
* Find boards by slug

### Posts

* Create feedback posts
* Update and delete posts
* Pagination
* Filtering
* Search
* Status management
* Image upload support

### Comments

* Create comments
* Update comments
* Delete comments
* Comment management

### Voting

* Toggle post votes
* Track user votes

### Developer Features

* Swagger API documentation
* API versioning
* Request logging
* Centralized error handling
* Zod request validation

---

# Tech Stack

## Backend

* Node.js
* Express 5
* TypeScript

## Database

* MongoDB
* Mongoose

## Authentication

* JSON Web Tokens (JWT)
* bcrypt

## Validation

* Zod

## File Upload

* Multer

## Documentation

* Swagger / OpenAPI

## Logging

* Pino

---

# Project Structure

```
src
├── apps
│   ├── auth
│   ├── user
│   ├── board
│   ├── post
│   └── comment
│
├── config
├── database
├── docs
├── middlewares
├── utils
├── app.ts
└── server.ts
```

The project follows a modular architecture:

```
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

---

# Requirements

Before running the project, make sure you have:

* Node.js 20+
* MongoDB instance
* npm

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Enter the project:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create admin User:

```bash
npm run create-admin
```

---

# Environment Variables

Create a `.env` file:

```env

# data base info
MONGO_URI=mongodb://localhost:27017/canny-clone


# server 
PORT=5000
SERVER_URL=http://localhost:5000

JWT_SECRET=  your jwt secret

# resend api for sending emails
RESEND_API_KEY= resend api key for sending emails


#front end
FRONTEND_URL=http://localhost:3000
FRONTEND_PASSWORD_RESET_URL=http://localhost:3000/auth/reset-password



```

---

# Development

Run the development server:

```bash
npm run dev
```

The server will start with hot reload.

---

# Production Build

Build TypeScript:

```bash
npm run build
```

Start production server:

```bash
npm start
```

---

# API Documentation

Swagger documentation is available at:

```
GET /docs
```

Example:

```
http://localhost:5000/docs
```

---

# API Versioning

All API endpoints are versioned:

```
/api/v1
```

Example:

```
GET /api/v1/posts
```

---

# Authentication

Protected endpoints require a JWT token.

Header:

```http
Authorization: Bearer <token>
```

Swagger supports authentication through the **Authorize** button.

---

# Main Endpoints

## Authentication

```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password/:token
```

## Users

```
GET /api/v1/users/me
```

## Boards

```
GET /api/v1/boards
GET /api/v1/boards/:slug
```

## Posts

```
GET    /api/v1/posts
GET    /api/v1/posts/:id
POST   /api/v1/posts
PATCH  /api/v1/posts/:id
DELETE /api/v1/posts/:id
POST   /api/v1/posts/:id/vote
```

## Comments

```
GET    /api/v1/posts/:id/comments
POST   /api/v1/posts/:id/comments
PATCH  /api/v1/comments/:id
DELETE /api/v1/comments/:id
```

---

# Error Handling

The API uses centralized error handling.

Example response:

```json
{
  "message": "Validation failed",
  "errors": []
}
```

---

# Security

Implemented:

* Helmet security headers
* CORS configuration
* Password hashing
* JWT authentication
* Input validation

---

# Future Improvements

Possible future additions:

* Rate limiting
* Refresh tokens
* Notifications
* Real-time updates with WebSockets
* Advanced analytics
* Docker deployment

---

# License

This project is for educational and portfolio purposes.
