# Inventory Management and Support Ticketing Application for IT helpdesk

This project is a robust Inventory Management and Support Ticketing Application built using the MERN stack (MongoDB, Express, React, Node.js). It serves as the Capstone Project for KodeGo, showcasing the seamless integration of these technologies to efficiently manage inventory and handle support tickets.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

- Node.js installed on your machine.
- MongoDB instance set up (local or cloud-based).

### Installing

A step by step series of examples that tell you how to get a development env running

1. Clone the Repository:

   ```bash
   git clone https://github.com/HexeCalibre/MERN-Capstone.git
   cd MERN-Capstone
   ```

2. Install Dependencies:
   
   ```bash
   # Install frontend dependencies
   cd frontend
   npm i

   # Install backend dependencies
   cd ../backend
   npm i
   ```

3. Configure Environment Variables:
   
   • Create a .env file in the server directory and set your environment variables, including database connection details, and secret keys.

   ```env
   NODE_ENV = deployment
   PORT = 8000
   MONGO_URI = mongodb+srv://akosialbean:Local.123@mernauth.k4sbzml.mongodb.net/?retryWrites=true&w=majority
   JWT_SECRET = Local.123
   ```
4. Install concurrently:
   
   ```node
   npm i -D concurrently
   ```

5. Add script to package.json from the root directory:
   
   ```json
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\""
   ```

6. Run the Application:
   
   ```bash
   npm run dev
   ```
7. Access the Application:
   
   • Open a web browser and navigate to http://localhost:5000 to access the application.

### Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

    ```powershell
    Give an example
    ```
### And coding style tests

Explain what these tests test and why

    ```powershell
    Give an example
    ```
### Deployment

Add additional notes about how to deploy this on a live system

### Built With

* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [HTML5](https://html.spec.whatwg.org/)
* [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [React-Bootsrap](https://react-bootstrap.netlify.app/)
* [Node.js](https://nodejs.org/en)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)

# Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

# Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

# Authors

- **Ritz Carl Feliciano** - *Capstone Project* - [HexeCalibre](https://github.com/HexeCalibre)

See also the list of [contributors](https://github.com/HexeCalibre/project/contributors) who participated in this project.

# License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

# Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
