# Backend - User Management Project

This project uses **NestJS** to create a protected API for user management, offering secure routes for both administrators and users, along with advanced features like importing users from an Excel file, sending personalized QR codes via email (using SendGrid), and attendance confirmation.

## Features

- **JWT Authentication** for protected routes.
- **Role-based routing** with admin and user access.
- **Email sending** with personalized QR codes via [SendGrid](https://sendgrid.com/).
- **Attendance confirmation** through scanned QR codes.
- **User import** from Excel files.

## Requirements

- **Node.js** v14+
- **NestJS**
- **XAMPP** for local MySQL database (currently connected to a Railway database; to edit the database connection, modify the settings in `app.module.ts`).
- **SendGrid** API Key for email sending.

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/riverbonilla1504/event_manager_lavenganza
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables in a `.env` file:
    ```plaintext
    JWT_SECRET_KEY=tomasin
    SENDGRID_API_KEY=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
    EMAIL=riverflorez.04@gmail.com (verified email for SendGrid API)
    ```

## Usage

1. Start the server:
    ```bash
    npm run start:dev
    ```
2. Access the API documentation at `http://localhost:3001/api` to view all available routes and endpoints.

## Scripts

- `start`: Start the server in production mode.
- `start:dev`: Start the server in development mode.
