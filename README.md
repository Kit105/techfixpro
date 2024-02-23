
# TechFix Pro - MERN Stack

This project is a comprehensive MERN stack application designed to streamline the process of managing tech-related issues for a repair shop named "techfixpro." It provides CRUD functionality for both notes and user information, allowing employees to efficiently document and track customer tech issues. The project is ideal for tech repair shops looking to modernise their workflow and improve customer service by centralising issue management in an intuitive and user-friendly platform.


## Features

- Comprehensive user authentication and authorisation system
- Complete CRUD functionality for managing notes and user information 
- Role-based access control for different user roles
- Secure handling of user data and credentials
- Responsive frontend interface for seamless user experience
- Light/dark mode toggle



## Tech Stack

- **Frontend:** React, Redux, RTK Query, React Icons, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, MongooseJS, JSON Web Tokens (JWT), bcrypt
- **Other Tools:** dotenv, date-fns, uuid, express-rate-limiter, mongoose-sequence, express-async-handler, express-async-errors, cookie-parser, cors

## Installation

Clone the repository and navigate to the root directory:

```bash
git clone <repository-url>
cd <repository-directory>
```

This project uses npm for package management. The repository is divided into two parts:

1. Backend Web Service

Install the required packages for the web service:

```bash
npm install
```

Set up environment variables as specified in the environment variables section.

Start the web service in development mode using react-scripts:

```bash
npm run dev
```
This should open a webpage on port 3500, enabling the web services and API.

2. Frontend
Navigate to the frontend directory & install the required packages for the frontend:

```bash
cd frontend
npm install
```

Start the frontend server:

```bash
npm start
```
This will start the website on port 3000.

Ensure both the backend web service and frontend are running concurrently for full functionality.






## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`

`PORT`

`DATABASE_URI`

`ACCESS_TOKEN_SECRET`

`REFRESH_TOKEN_SECRET`



## Deployment

To deploy the project, follow these steps:

Backend Web Service:

Set up environment variables as specified in the environment variables section.

Ensure all necessary packages are installed by running:

```bash
npm install
```
Start the web service in production mode:

```bash
npm start
```

Frontend:

Navigate to the frontend directory:

```bash
cd frontend
```

Install the required packages for the frontend:

```bash
npm install
```

Build the production-ready frontend assets:

```bash
npm run build
```
<!-- ## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
``` -->


## Demo

A live demo of the project is available at [TechFixPro Demo](https://techfixpro.onrender.com/).

Please note that the login module may take some time to load initially due to server resource allocation on render.com. Thank you for your patience.
<!-- 
## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here) -->


<!-- ## API Reference -->

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License


## Acknowledgements

Special thanks to [Dave Gray](https://www.youtube.com/DaveGrayTeachesCode) for providing valuable tutorials and resources on web development using MERN stack.
