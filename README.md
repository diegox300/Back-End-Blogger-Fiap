# BACK END FOR SCHOOL BLOGGER V 1.1

BLOGGER BACK END V 1.1 is a NodeJS API that integrates a MongoDB Database, developed as an activity that integrates the knowledge acquired during the Backend and Software Quality module of the Post Tech FIAP Full Stack Development of Group 1 Class 2FSDT.

## Objective

The purpose of this API is to manage blog posts through CRUD (Create, Read, Update and Delete) operations, securely using jwt to secure private routes, making content management easier for administrators and users.

## Report of experiences and challenges

From the beginning, the group decided to version the code directly on GitHub, which allowed for an efficient organization of the project's initial structure and standards. At each step of the API implementation, all members were notified of new Pull Requests (PRs) opened on the main branch, ensuring continuous collaboration and joint code review.

The Phase 2 lessons were instrumental in the development of the project, providing the foundation we needed to move forward with confidence. Whenever doubts or obstacles arose, rewatching classes or looking for solutions on the internet made the problem-solving process more agile and effective.

In addition, the weekly group-wide meetings played a crucial role, fostering discussions and alignments that contributed to the continued progress and successful completion of the project.

---

## API Introduction Video

![Watch the presentation video here](https://youtu.be/51WeIR_iRRY)

---

## Technologies used

- Node.js
- TypeScript
- MongoDB
- Express
- Jest
- Swagger
- Docker
- Cloudinary

---

## Environments

Production

The Main branch reflects directly on the API in production, which is hosted on Vercel. Any updates or merges performed on this branch will be automatically reflected in the API in the production environment, so it is essential that the code is reviewed carefully before being integrated to ensure the stability of the system.

---

## Production Environment

Main Branch: We use the Main branch as our default branch for the [Production environment](https://tech-challenge-back-end.vercel.app/api-docs/)

Deploy: The deployment of applications is carried out through the [Vercel platform](https://vercel.com/)

Database: For data storage in production, we use the [MongoDB](https://www.mongodb.com/)

Cloudinary: The Cloudinary platform was used to upload the images of the posts [Cloudinary](https://cloudinary.com/home)

---

## Development Environment

To use the local API:

- Clone code on GitHub:

```bash
git clone https://github.com/diegox300/Back-End-Blogger-Fiap.git
```

## Application installation

This project is ready to run in a Docker environment. For this reason, only the installation of Docker will be required, and the manual installation of the project will not be necessary. You also don't need to manually install the database (MongoDB).

If you don't have Docker installed, follow the instructions for your operating system in the [official Docker documentation](https://docs.docker.com/get-started/get-docker/).

- Start the application using Docker:

```bash
docker-compose up --build
```

##### Check the API ENDPOINTS:

To facilitate the integration and use of our API, we provide detailed documentation through **Swagger**. In it, you will find all available endpoints, supported methods, examples of requests and responses, as well as information about required parameters.

```bash
http://localhost:8000/api-docs
```

---

##### Running Local Unit Tests:

To ensure that all API functionality is working properly, it is recommended to run unit tests. Follow the steps below to run the tests:

```bash
npm install
npm test
```

---

Questions and feedback:

For questions or suggestions, please contact:
• Email: postechfiap4@gmail.com

---

## Project Structure - MVC Standard

This project follows an approach based on the MVC (Model-View-Controller) pattern, adapted for API development.

The project structure is organized as follows:

Model: is responsible for representing and manipulating the data. Here, the definitions of schemas, entities, and interactions with the database are implemented. Example: Validation and persistence of data in MongoDB.

Controller: is responsible for receiving HTTP requests, processing them, invoking business logic in the Model, and returning the appropriate response to the client. The logic of the API endpoints is centralized in the controllers, which ensure that requests are handled appropriately.

Routes: Define the API endpoints and map the URLs to the corresponding controllers. They allow HTTP requests to be directed to the correct controllers based on the endpoint accessed.

- Basic Project Structure

```markdown
src
├── app.ts
├── config
│ └── cloudinary.ts
├── db
│ └── database.ts
├── docs
│ ├── Padroes_de_commits(Commit_Patterns).pdf
│ ├── por_que_utilizar_mongoDB.pdf
│ └── versionamento_semantico_2.0.0.pdf
├── env
│ └── index.ts
├── errors
│ ├── EmailAlreadyExistsError.ts
│ ├── InvalidCredentialsError.ts
│ └── UserNotFoundError.ts
├── http
│ └── controllers
│ ├── post
│ │ ├── create-post.ts
│ │ ├── deletePostById.ts
│ │ ├── find-post.ts
│ │ ├── find-posts-by-letter.ts
│ │ ├── get-all-posts-pagination.ts
│ │ ├── get-all-posts.ts
│ │ └── update-post.ts
│ └── user
│ ├── create-user.ts
│ ├── get-all-users.ts
│ ├── get-user-by-email.ts
│ ├── get-user-by-id.ts
│ └── login-user.ts
├── middleware
│ ├── asyncHandler.ts
│ ├── auth.ts
│ ├── error.ts
│ ├── swagger.ts
│ ├── upload.ts
│ ├── validateEmail.ts
│ └── validateObjectId.ts
├── models
│ ├── post.model.ts
│ └── user.model.ts
├── repositories
│ ├── post.repository.ts
│ └── user.repository.ts
├── routes
│ ├── index.ts
│ ├── post.routes.ts
│ └── user.routes.ts
├── server.ts
├── swagger
│ └── swagger.json
├── tests
│ ├── db
│ │ └── database.test.ts
│ ├── env
│ │ └── index.test.ts
│ ├── http
│ │ └── controllers
│ │ └── post
│ │ ├── create-post.test.ts
│ │ ├── deletePostById.test.ts
│ │ ├── find-post.test.ts
│ │ ├── get-all-posts.test.ts
│ │ └── update-post.test.ts
│ ├── middleware
│ │ └── validateObjectId.test.ts
│ ├── post.model.test.ts
│ ├── post.repository.test.ts
│ ├── post.routes.test.ts
│ ├── server
│ │ └── server.test.ts
│ ├── swagger
│ │ └── swagger.test.ts
│ └── use-cases
│ ├── delete-post-usecase.test.ts
│ ├── find-posts-usecase.test.ts
│ ├── get-all-posts-usecase.test.ts
│ └── update-post-usecase.test.ts
└── use-cases
├── factory
│ ├── posts
│ │ ├── make-create-posts-usecase.ts
│ │ ├── make-delete-post-usecase.ts
│ │ ├── make-find-posts-by-letter-usecase.ts
│ │ ├── make-find-posts-usecase.ts
│ │ ├── make-get-all-posts-pagination-usecase.ts
│ │ ├── make-get-all-posts-usecase.ts
│ │ └── make-update-post-usecase.ts
│ └── user
│ ├── make-create-user-usecase.ts
│ ├── make-find-user-by-email-usecase.ts
│ ├── make-find-user-by-id-usecase.ts
│ ├── make-get-all-users-usecase.ts
│ ├── make-get-user-usecase.ts
│ └── make-login-user-usecase.ts
├── posts
│ ├── create-posts-usecase.ts
│ ├── delete-post-usecase.ts
│ ├── find-posts-by-letter-usecase.ts
│ ├── find-posts-usecase.ts
│ ├── get-all-posts-pagination-usecase.ts
│ ├── get-all-posts-usecase.ts
│ └── update-post-usecase.ts
└── user
├── create-user-usecase.ts
├── find-user-by-email-usecase.ts
├── find-user-by-id-usecase.ts
├── get-all-users-usecase.ts
├── get-user-usecase.ts
└── login-user-usecase.ts
```

The API focuses on data management and responses via JSON, where the View layer is not necessary, since there is no rendering of interfaces.

In the project, Dependency Inversion (DIP) was applied to decouple high- and low-level modules, allowing greater flexibility in switching implementations and facilitating maintenance and testing. With the use of dependency injection, the application becomes more modular and ready to grow.

In addition, the other principles of SOLID have been followed to ensure scalability:

- SRP: Each class has a single responsibility,
- OCP: The code is open to extensions without needing modifications,
- LSP: Derived classes can override base classes without changing behavior,
- ISP: Specific interfaces avoid unnecessary dependencies.

These principles together promote a flexible and scalable design, making it easy to add new functionality without compromising the existing structure.

---
