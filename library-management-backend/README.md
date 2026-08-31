# Library Management Backend API

Spring Boot REST API for the Library Management System.

**Base URL:** `http://localhost:8081`  
**Content-Type:** `application/json`

---

## Authentication

Book APIs require a JWT token. After login or register, use the token in the header:

```
Authorization: Bearer <your-jwt-token>
```

Each user can only view and manage **their own books**.

---

## Common Response Format

All endpoints return responses in this structure:

```json
{
  "success": true,
  "message": "Success message",
  "data": { },
  "timestamp": "2026-08-31T15:00:00"
}
```

### Error Response Format

```json
{
  "status": 400,
  "message": "Error message",
  "errors": {
    "fieldName": "Validation error message"
  },
  "timestamp": "2026-08-31T15:00:00"
}
```

---

## Auth APIs

### 1. Register User

**POST** `/api/auth/register`  
**Auth required:** No

**Request Body:**

```json
{
  "username": "john_doe",
  "password": "password123",
  "email": "john@example.com",
  "fullName": "John Doe"
}
```

| Field      | Type   | Required | Validation                          |
|------------|--------|----------|-------------------------------------|
| username   | string | Yes      | 3–50 characters                     |
| password   | string | Yes      | Minimum 6 characters                |
| email      | string | Yes      | Valid email format                  |
| fullName   | string | Yes      | Not blank                           |

**Success Response:** `201 Created`

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "username": "john_doe",
    "message": "Registration successful"
  },
  "timestamp": "2026-08-31T15:00:00"
}
```

---

### 2. Login User

**POST** `/api/auth/login`  
**Auth required:** No

**Request Body:**

```json
{
  "username": "john_doe",
  "password": "password123"
}
```

| Field    | Type   | Required |
|----------|--------|----------|
| username | string | Yes      |
| password | string | Yes      |

**Success Response:** `200 OK`

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "username": "john_doe",
    "message": "Login successful"
  },
  "timestamp": "2026-08-31T15:00:00"
}
```

---

## Book APIs

> All book endpoints require JWT authentication.  
> Users only see and manage books they created.

---

### 3. Create Book

**POST** `/api/books`  
**Auth required:** Yes

**Request Body:**

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A classic American novel set in the Jazz Age."
}
```

| Field       | Type   | Required |
|-------------|--------|----------|
| title       | string | Yes      |
| author      | string | Yes      |
| description | string | No       |

**Success Response:** `201 Created`

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel set in the Jazz Age."
  },
  "timestamp": "2026-08-31T15:00:00"
}
```

---

### 4. Get All Books (Logged-in User)

**GET** `/api/books`  
**Auth required:** Yes

**Request Body:** None

**Success Response:** `200 OK`

```json
{
  "success": true,
  "message": "Books fetched successfully",
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "description": "A classic American novel set in the Jazz Age."
    },
    {
      "id": 2,
      "title": "1984",
      "author": "George Orwell",
      "description": "A dystopian social science fiction novel."
    }
  ],
  "timestamp": "2026-08-31T15:00:00"
}
```

---

### 5. Get Book by ID

**GET** `/api/books/{id}`  
**Auth required:** Yes

**Path Parameter:**

| Parameter | Type | Example |
|-----------|------|---------|
| id        | long | 1       |

**Request Body:** None

**Success Response:** `200 OK`

```json
{
  "success": true,
  "message": "Book fetched successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel set in the Jazz Age."
  },
  "timestamp": "2026-08-31T15:00:00"
}
```

---

### 6. Update Book

**PUT** `/api/books/{id}`  
**Auth required:** Yes

**Path Parameter:**

| Parameter | Type | Example |
|-----------|------|---------|
| id        | long | 1       |

**Request Body:**

```json
{
  "title": "The Great Gatsby (Updated)",
  "author": "F. Scott Fitzgerald",
  "description": "Updated description for the book."
}
```

| Field       | Type   | Required |
|-------------|--------|----------|
| title       | string | Yes      |
| author      | string | Yes      |
| description | string | No       |

**Success Response:** `200 OK`

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby (Updated)",
    "author": "F. Scott Fitzgerald",
    "description": "Updated description for the book."
  },
  "timestamp": "2026-08-31T15:00:00"
}
```

---

### 7. Delete Book

**DELETE** `/api/books/{id}`  
**Auth required:** Yes

**Path Parameter:**

| Parameter | Type | Example |
|-----------|------|---------|
| id        | long | 1       |

**Request Body:** None

**Success Response:** `200 OK`

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null,
  "timestamp": "2026-08-31T15:00:00"
}
```

---

## HTTP Status Codes

| Status | Description                          |
|--------|--------------------------------------|
| 200    | Success                              |
| 201    | Created                              |
| 400    | Validation error / bad request       |
| 401    | Unauthorized (invalid or missing JWT)|
| 404    | Resource not found                   |
| 500    | Internal server error                |

---

## API Summary

| Method | Endpoint              | Auth | Description                    |
|--------|-----------------------|------|--------------------------------|
| POST   | `/api/auth/register`  | No   | Register new user              |
| POST   | `/api/auth/login`     | No   | Login user                     |
| POST   | `/api/books`          | Yes  | Create a book                  |
| GET    | `/api/books`          | Yes  | Get logged-in user's books     |
| GET    | `/api/books/{id}`     | Yes  | Get book by ID (own books only)|
| PUT    | `/api/books/{id}`     | Yes  | Update book (own books only)   |
| DELETE | `/api/books/{id}`     | Yes  | Delete book (own books only)   |

---

## How to Run

### Prerequisites

- Java 21
- MySQL running on port `3305`
- Database: `library_management`

```sql
CREATE DATABASE library_management;
```

### Start Backend

```bash
cd library-management-backend
./mvnw spring-boot:run
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Server runs at: **http://localhost:8081**

---

## Example cURL Requests

### Register

```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"john\",\"password\":\"password123\",\"email\":\"john@test.com\",\"fullName\":\"John Doe\"}"
```

### Login

```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"john\",\"password\":\"password123\"}"
```

### Create Book

```bash
curl -X POST http://localhost:8081/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d "{\"title\":\"1984\",\"author\":\"George Orwell\",\"description\":\"Dystopian novel\"}"
```

### Get All Books

```bash
curl -X GET http://localhost:8081/api/books \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Book

```bash
curl -X PUT http://localhost:8081/api/books/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d "{\"title\":\"1984 Updated\",\"author\":\"George Orwell\",\"description\":\"Updated\"}"
```

### Delete Book

```bash
curl -X DELETE http://localhost:8081/api/books/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```


```
