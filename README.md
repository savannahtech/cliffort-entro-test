# Entro Coding Assignment

This repository contains my solution for the coding assignment provided by Entro. In this assignment, I have implemented the following functionalities:

## Tasks Page

- Display a list of tasks retrieved from the API, sorted by creation date.
- Display task details when clicking on a task, retrieved from the API.
- Ability to filter the task list both on the API and in the user interface.
- Ability to create, update, delete, and duplicate tasks, with changes reflected in both the API and the user interface.

## Task Relationships

- Implemented the ability to relate a task to a parent task.
## Pending Functionalities and Future Improvements

Although I've successfully completed several functionalities, due to time constraints, there are some features and improvements that I was not able to implement. Here's a list of the pending functionalities and possible solutions for them:

### Pagination

- **Status**: Pending
- **Description**: Implementing pagination for displaying a large number of tasks in smaller, more manageable chunks can greatly improve the user experience and performance.
- **Possible Solution**:
  - Modify the API endpoints to accept parameters like `page` and `itemsPerPage` to support pagination.
  - In the UI, update the task list to request the appropriate page of tasks and display pagination controls.
  - Handle the backend logic to return the correct page of tasks based on the requested page and items per page.
  - Update the frontend to render the paginated data and provide navigation controls.

### Deployment and CI/CD

- **Status**: Pending
- **Description**: Setting up Continuous Integration and Continuous Deployment (CI/CD) pipelines using GitHub Actions or other similar tools can automate the build, testing, and deployment processes, ensuring consistent and reliable releases.
- **Possible Solution**:
  - Configure GitHub Actions workflows to automatically build and test the application whenever changes are pushed to the repository.
  - Implement deployment steps to deploy the frontend and backend to a desired hosting platform (e.g., Heroku, Netlify, Vercel, AWS, etc.).
  - Configure environment variables and secrets in the CI/CD pipeline to securely store sensitive information.
  - Set up automatic deployments to staging and production environments based on branches and release tags.

### Unit Testing in UI and API

- **Status**: Pending
- **Description**: Unit testing is essential to ensure the correctness and reliability of the application's codebase. It helps catch bugs early and provides a safety net when making changes.
- **Possible Solution**:
  - For the UI, use testing libraries such as Jest and React Testing Library to write unit tests for React components.
  - For the API, use testing frameworks like Jest and Supertest to write unit and integration tests for the API routes and services.
  - Mock external dependencies and API calls to isolate the unit tests and improve test performance.
  - Write tests to cover various scenarios, including edge cases and common use cases, to ensure comprehensive test coverage.

### E2E Testing in UI with Cypress

- **Status**: Pending
- **Description**: End-to-End (E2E) testing is crucial for testing the entire application flow and interactions as a user would experience. E2E tests ensure that different parts of the application work together seamlessly.
- **Possible Solution**:
  - Utilize Cypress, a powerful E2E testing framework, to write tests that simulate user interactions, navigate through the application, and verify expected outcomes.
  - Write E2E tests to cover critical user flows, such as creating, updating, deleting tasks, applying filters, and interacting with different UI elements.
  - Leverage Cypress' API to locate elements, perform actions like clicking and typing, and make assertions about the application's state and behavior.
  - Set up Cypress to run tests in different browsers and environments to ensure cross-browser compatibility.
  - Combine E2E tests with mocked backend responses to create controlled test scenarios and ensure tests are deterministic.
  - Integrate E2E tests into the CI/CD pipeline to automatically run tests on each deployment, catching regressions early in the development process.

### Documentation for Code

- **Status**: Pending

#### Swagger for API Documentation

- **Possible Solution**:
  - Integrate Swagger into the Express API using libraries like `swagger-jsdoc` and `swagger-ui-express`.
  - Annotate the API routes and models with JSDoc-style comments containing OpenAPI specifications.
  - Set up a Swagger UI endpoint that displays the API documentation, including examples, data types, and expected responses.
  - Swagger can help API consumers and developers understand the API endpoints and experiment with different requests and responses.

#### Storybook for Frontend Component Documentation

- **Description**: Storybook is a powerful tool for documenting and visually testing UI components in isolation. It provides a dedicated environment to showcase each component's variations, states, and interactions.
- **Possible Solution**:
  - Set up Storybook in the React project using the `@storybook/react` package.
  - Create stories for each UI component, showcasing different use cases, props, and states.
  - Include documentation sections in the stories to describe component usage, props, and expected behavior.
  - Use Storybook's interactive UI to explore and test the UI components with different props and scenarios.
  - Storybook enhances collaboration between designers and developers by providing a visual representation of components and their states.

## Technologies Used

### Frontend

#### Next.js
- **Usage in Project**: Next.js was used as the foundation for the frontend of the application, providing server-side rendering for better performance and SEO optimization.

#### TypeScript

- **Usage in Project**: TypeScript was used both in the frontend and backend to ensure type safety, catch errors at compile time, and improve the overall codebase quality.

#### Material-UI

- **Usage in Project**: Material-UI components were utilized to build a consistent and responsive user interface, enhancing the user experience and overall design of the application.

#### React Query

- **Usage in Project**: React Query was used to manage API integrations, data fetching, caching, and handling loading and error states, enhancing the performance and data management of the frontend.

#### React Toastify

- **Usage in Project**: React Toastify was integrated to display toast notifications for various user interactions, such as success messages, errors, and notifications, enhancing the user experience.

#### React Context (State Management)

- **Usage in Project**: React Context was used for managing some part of the application's state. For current task Identification


### Backend

#### Node.js and Express

- **Usage in Project**: Node.js and Express were used to build the backend API endpoints for the application, handling HTTP requests and responses, and routing.

#### Prisma

- **Usage in Project**: Prisma was used to interact with the MongoDB database, simplifying database operations, schema management, and data validation.

#### MongoDB

- **Usage in Project**: MongoDB was chosen as the database solution for storing and managing task-related data in the backend.

## Cloning and Running the Application

To clone and run the application on your local machine, follow these steps:

### Prerequisites

- Node.js: Make sure you have Node.js installed. You can download it from [https://nodejs.org/](https://nodejs.org/).

### Clone the Repository

1. Clone the repository using Git:

   ```sh
   git clone https://github.com/savannahtech/cliffort-entro-test.git

2. Navigate to the project directory:

   ```sh
   cd your-cloned-to-path
   
### Running the Backend
Please refer to the [README.md](./server/README.md) in the server directory for instructions on setting up and running the backend.

### Running the Frontend
Please refer to the [README.md](./frontend/README.md) in the frontend directory for instructions on setting up and running the backend.


Thank you!