# Systima Project
This project demonstrates automated testing for the Systima web application. It covers UI functionalities such as contact creation, purchase creation, and validation of form inputs using Playwright with TypeScript.

## Framework
The project uses the Playwright framework for end-to-end (E2E) testing.

## Prerequisites
Before setting up and running the project, ensure you have the following tools installed:

- **Node.js**: Version `20.8.0` or above. [Download Node.js](https://nodejs.org/)
- **pnpm**: Preferred package manager for managing dependencies. [Install pnpm](https://pnpm.io/installation)
- **Playwright**: Installed as a dependency in this project. [Learn more about Playwright](https://playwright.dev/)
## Setup Instructions
### 1. Clone the Repository
Run the following command to clone the project repository to your local machine:git clone https://github.com/ShutkaAndrew/Systima.project.git

### 2. Navigate to the Project Directory
Move into the project folder:
cd Systima.project

## Install Dependencies
Use pnpm to install the required project dependencies:
pnpm install

## Run All Tests
To execute all the tests in the project, run:
pnpm test

## Run Tests in Headed Mode
To debug or visually observe the tests in a browser:
pnpm exec playwright test --headed

## Run a Specific Test File
To run a specific test file, provide the test file path:
pnpm exec playwright test src/tests/contact.creation.success.spec.ts

## View Test Reports
After running the tests, view the HTML report with:
pnpm exec playwright show-report
