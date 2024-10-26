# Frontend - User Management Dashboard

This project uses **React** to create a user interface for managing users, featuring a secure dashboard for administrators with user import options, email sending for attendance confirmation, and QR code generation for each user.

## Features

- **Secure user authentication**.
- **Admin dashboard** for user management.
- **Search and filter** functionality for efficient user lookup.
- **Email sending** with personalized QR codes via [SendGrid](https://sendgrid.com/).
- **Customizable columns** for user data import.
- **QR-based attendance confirmation** with a simple and intuitive UI.

## Requirements

- **Node.js** v14+
- **React** for frontend
- [Backend API](https://github.com/riverbonilla1504/event_manager_lavenganza) running on `localhost:3001`.

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/riverbonilla1504/event_manager_lavenganza
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```


## Usage

1. Start the application:
    ```bash
    npm start
    ```
2. Open `http://localhost:3000/login` in your browser to access the user management dashboard.

## Scripts

- `start`: Start the development server.
- `build`: Build the app for production.
- `test`: Run tests.

