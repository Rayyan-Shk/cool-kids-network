# Cool Kids Network: A Full-Stack Web Application

## 🌟 Project Overview

Cool Kids Network is a comprehensive web application that demonstrates a full-stack development approach, showcasing user registration, authentication, and role-based access control. This project was an incredible journey of applying and integrating multiple technologies to create a robust and scalable web platform.

##  Problem Statement

The goal was to create a proof-of-concept application that:
- Allows user registration with automatic character generation
- Implements role-based access control
- Provides a seamless and intuitive user experience
- Demonstrates modern web development practices

## 🛠 Technical Stack

- **Frontend**: React.js
- **Backend**: Node.js
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM with PostgreSQL
- **Testing**: Jest (Unit and Integration)

##  Project Setup and Installation

### Prerequisites
- Node.js (v16 or later)
- npm
- PostgreSQL

### Repository Clone
```bash
git clone https://github.com/Rayyan-Shk/cool-kids-network.git
cd cool-kids-network
```

### Backend Setup
1. Navigate to backend directory
```bash
cd backend
```

2. Create `.env` file with the following configurations:
```
DATABASE_URL=postgresql://username:password@localhost:5432/coolkidsdb
JWT_SECRET=your_secret_key_here
PORT=5000
```

### Running the Application
From the project root directory, you can start both frontend and backend simultaneously:
```bash
npm install

npm run dev
```

### Testing
To run tests:
```bash
# For backend tests
cd backend
npm run test
```

### Role Management API Endpoint
- **Assign role**: `PATCH /api/users/role`
  ```json
  {
  "email": "123@gmail.com",
  "newRole": "Coolest Kid"
  }
  ```


##  Key Features

### User Registration and Character Generation
- Anonymous users can sign up with an email address
- Automatic character creation using randomuser.me API
- Default role assignment as "Cool Kid"

### Role-Based Access Control
Three distinct user roles with different access levels:
- **Cool Kid**: Basic access, can view personal character data
- **Cooler Kid**: Can view other users' names and countries
- **Coolest Kid**: Full access to user information, including emails and roles

### Frontend Navigation
- Navbar dynamically adjusts based on user role
- **Userlist Button**: 
  - Appears for Cooler and Coolest Kids
  - Displays user data according to role permissions
  - Cooler Kids see names and countries
  - Coolest Kids see complete user information

### API Endpoints
- User registration
- User login
- Role management
- User data retrieval based on role permissions

##  Technical Design Decisions

### Authentication
- Simplified authentication process (no password required)
- Email-based login and identification
- JWT for stateless authentication
- Secure secret key management via environment variables

### Data Management
- Prisma ORM for type-safe database interactions
- PostgreSQL as the robust, scalable database solution
- Separation of concerns between frontend and backend
- Clean, modular code structure

### Observability and Resilience
- Comprehensive logging
- Error handling
- Easily readable database schema
- Monitoring capabilities

##  Development Insights

Building this project was a transformative experience that tested and expanded my full-stack development skills. Key learnings include:

- Seamless integration of multiple technologies
- Importance of role-based access control
- API design and implementation
- Frontend-backend communication
- Test-driven development
- Environment configuration management

## Screenshots

1. Home Page

![Home Page](/frontend/public/Home-Page.png)

1. Registration Page

 ![Login](/frontend/public/Login.png)

2. User Dashboard

![Personal Card](/frontend/public/Personal-Card.png)

3. User List for Cooler/Coolest Kids

![User List](/frontend/public/User-List.png)

4. Api Endpoint (Postman)

![API Endpoint](/frontend/public/API.png)

##  Bonus Achievements

- Linter-compliant codebase
- Comprehensive unit and integration tests
- Continuous Integration (CI) setup
- User-friendly, intuitive design
- Dynamic role-based UI

##  Contribution

Feel free to fork, star, or contribute to this project.
