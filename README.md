
# Pocket Chips Backend

This is the backend for the Pocket Chips application, built using NestJS and TypeORM with PostgreSQL as the database.

## Features
- User authentication with JWT
- User registration and login
- Protected routes for authenticated users

## Prerequisites
- Node.js (version 16 or above)
- PostgreSQL
- Git

## Installation
1. Clone the repository:
   git clone https://github.com/your-username/pocket-chips-backend.git
2. Navigate to the project directory:
   cd pocket-chips-backend
3. Install the dependencies:
   npm install

## Configuration
1. Create a \`.env\` file in the root of the project and add the following environment variables:

   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASS=postgres
   DB_NAME=pocket_chips
   JWT_SECRET=someRandomSecret

2. Ensure your PostgreSQL server is running and has a database named \`pocket_chips\`.

## Running the Application
1. Start the development server:
   npm run start:dev

## API Endpoints
- **POST** \`/auth/signup\`: Register a new user
- **POST** \`/auth/signin\`: Login and get a JWT
- **GET** \`/users\`: Retrieve a list of all users (protected route)

## Contributing
Contributions are welcome! Feel free to fork this repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
EOL
