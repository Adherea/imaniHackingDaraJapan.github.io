# Imani Hacking Register Service API Documentation

**Base URL:** `https://imani-register-service.vercel.app/api/auth`

**Authentication:** All requests require a valid JSON Web Token (JWT) in the `Authorization` header. The token should be in the format `Bearer <token>`.

**Endpoints:**

* **Registration**

  * **URL:** `/register`
  * **Method:** `POST`
  * **Body:**
    ```json
    {
      "email": "user@example.com",
      "username": "johndoe",
      "password": "P@ssw0rd123"
    }
    ```
  * **Success Response:**
    ```json
    {
      "message": "User registered successfully"
    }
    ```
  * **Error Responses:**
    * **400 Bad Request:** Invalid user input or duplicate email/username
    * **500 Internal Server Error:** Unexpected error during registration

* **Login**

  * **URL:** `/login`
  * **Method:** `POST`
  * **Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "P@ssw0rd123"
    }
    ```
  * **Success Response:**
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4iLCJ1c2VybmFtZSI6Im5hbWUiLCJpYXQiOjE2NTYyMjI5MTF9.55r54_54354355435345345434543"
    }
    ```
  * **Error Responses:**
    * **401 Unauthorized:** Invalid email or password
    * **500 Internal Server Error:** Unexpected error during login

* **Logout**

  * **URL:** `/logout`
  * **Method:** `POST`
  * **Success Response:**
    ```json
    {
      "message": "Logged out successfully"
    }
    ```
  * **Error Responses:**
    * **401 Unauthorized:** Missing or invalid JWT
    * **500 Internal Server Error:** Unexpected error during logout