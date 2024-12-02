# Multilingual File Manager Application

This is a multilingual file manager application that demonstrates learned understanding of databases, asynchronous task handling, internationalization, and unit testing.

## Team Members

- Fatma Ben Azouz 
- Christabel Oluomachi Madubuike

## Demo Link

[Link to demonstration video](youtube.com)

## Features

- User Management: Secure user registration and login with password hashing.
- File Management: Users can create, read, update, and delete files within their designated directories.
- Multilingual Support (i18n): Enables users to select their preferred language for the user interface.
- Queuing System: Utilizes Redis to queue asynchronous tasks like file uploads.
- Unit Testing: Unit tests for core functionalities, including user authentication, file management, and the queuing system.

## Prerequisites

- Node.js
- MySQL

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/fatmabenazouz/multilingual-file_manager.git
   cd multilingual-file_manager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure MySQL database:

   - Create a MySQL database.
   - Update the database configuration in the `models/index.js` file.

4. Initialize i18next localization files:
   - Add your localization files in the `locales` directory.

## Running the Application

1. Start the server:

   ```bash
   node app.js
   ```

2. The server will run on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### User Endpoints

- **Register a User:**

  ```http
  POST /user/register
  ```

  Request Body:

  ```json
  {
    "fullNamename": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

- **Login a User:**

  ```http
  POST /user/login
  ```

  Request Body:

  ```json
  {
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

### File Endpoints

- **Create a File:**

  ```http
  POST /api/files
  ```

  Request Body:

  ```json
  {
    "userId": "userid",
    "name": "testfile.txt",
    "size": 1024,
    "type": "txt",
    "path": "/files/testfile.txt"
  }
  ```

- **Get All Files:**

  ```http
  GET /api/files
  ```

- **Get a File by ID:**

  ```http
  GET /api/files/:id
  ```

- **Update a File:**

  ```http
  PUT /api/files/:id
  ```

  Request Body:

  ```json
  {
    "name": "updatedfile.txt",
    "size": 2000,
    "type": "txt",
    "path": "/files/updatedfile.txt"
  }
  ```

- **Delete a File:**

  ```http
  DELETE /api/files/:id
  ```

## Running Tests

1. Run the tests:

   ```bash
   npm test
   ```

   or

   ```bash
   npm test -- --detectOpenHandles
   ```