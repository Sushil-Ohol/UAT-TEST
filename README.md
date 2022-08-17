# ConstructivIQ - Web Application

React.js - Web Application for ConstructivIQ

# Table of contents:

- [Pre-reqs](#pre-reqs)
- [Getting started](#getting-started)
- [TypeScript + React JS](#typescript--node)
  - [Getting TypeScript](#getting-typescript)
  - [Project Structure](#project-structure)
- [Dependencies](#dependencies)
  - [`dependencies`](#dependencies)
  - [`devDependencies`](#devdependencies)
- [CI/CD - Github Actions](#github-action---cicd)
  - [Dev Branch Pipeline](#for-development-branch---devyml)

# Pre-reqs

To build and run this app locally you will need a few things:

- Install [Node.js](https://nodejs.org/en/)
- Install [VS Code](https://code.visualstudio.com/)
- If you don't have an `.env` file yet, create a copy of `.env.example` and rename it to `.env` and follow the comments from file to update the values in that file.

# Getting started

- Clone the repository

```
git clone --depth=1 https://github.com/ConstructivIQ/client.git
```

- Install dependencies

```
cd <project_name>
npm install
```

- Build and run the project

```
npm run build
npm start
```

Finally, navigate to `http://localhost:3000` and you should see the template being served and rendered locally!

## Project Structure

The most obvious difference in a TypeScript + Node project is the folder structure.
In a TypeScript project, it's best to have separate _source_ and _distributable_ files.
TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.
The `test` and `views` folders remain top level as expected.

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run build`

| Name              | Description                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| **.vscode**       | Contains VS Code specific settings                                                                         |
| **.github**       | Contains GitHub settings and configurations, including the GitHub Actions workflows                        |
| **dist**          | Contains the distributable (or output) from your TypeScript build. This is the code you ship               |
| **node_modules**  | Contains all your npm dependencies                                                                         |
| **src**           | Contains your source code that will be compiled to the dist requests                                       |
| **src/models**    | Response Type                                                                                              |
| **src/services**  | Axios package used to interact with server                                                                 |
| **src/index.tsx** | Center point of the application                                                                            |
| **src/index.css** | Common css                                                                                                 |
| **src/App.tsx**   | App component                                                                                              |
| **src/App.css**   | Component level styles                                                                                     |
|                   |
| package.json      | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped) |
| tsconfig.json     | Config settings for compiling server code written in TypeScript                                            |
| .eslintrc         | Config settings for ESLint code style checking                                                             |

# Dependencies

Dependencies are managed through `package.json`.
In that file you'll find two sections:

## `dependencies`

| Package            | Description                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| bootstrap          | Current version of the bootstrap file.                                                                                 |
| react              | Current version of react.                                                                                              |
| react-router-dom   | Current version of react-router-dom.                                                                                   |
| axios              | Package used to interact with http call.(https://www.npmjs.com/package/axios)                                          |
| axios-auth-refresh | Used to intercept request and tokens.                                                                                  |
| react-dropzone     | React hook to create a HTML5-compliant drag'n'drop zone for files.(https://react-dropzone.js.org/).                    |
| antd design        | Package used to for React UI component.(https://www.npmjs.com/package/antd)                                            |
| ag grid            | AG Grid is a fully-featured and highly customizable JavaScript data grid.(https://www.npmjs.com/package/ag-grid-react) |
| ag grid community  | AG Grid Community is free and open-sourced under the MIT license.(https://www.npmjs.com/package/ag-grid-community)     |
| ant-design-icons   | Added antd icons(https://ant.design/components/icon/)                                                                  |
| react-redux   | Added antd icons(https://react-redux.js.org)                                                                  |
| @reduxjs/toolkit   | Added antd icons(https://redux-toolkit.js.org)                                                                  |
## `devDependencies`

| Package | Description                                                         |
| ------- | ------------------------------------------------------------------- |
| @types  | Dependencies in this folder are `.d.ts` files used to provide types |

To install or update these dependencies you can use `npm install` or `npm update`.

# Github Action - CI/CD

### For Development Branch - 'dev.yml'

### `TRIGGERS` :- PR Merge.

Two jobs are configured as below

1. BUILD
2. DEPLOY

#### `BUILD JOB - Steps`:

1. BUILD/SELECT MACHINE/PLATFORM
   The machine is ubuntu-latest

2. CHECKOUT :
   Checkout code.

3. INSTALL NODE_JS :
   node-version: 13.x

4. INSTALL NPM PACKAGES :
   npm install

5. CONTINUOUS INTEGRAGTION :
   npm ci

6. BUILD : Build project
   npm run build

7. TEST : Run tests
   npm run test.
8. UPLOAD THE ARTIFACT : Upload production-ready build files
   name: production-files
   path: ./build

#### `DEPLOY JOB`

1.  After the successful completion of JOB BUILD this job will be triggered.

2.  Download artifact
    name: production-files
    path: ./build

3.  Deploy to gh-pages
    uses: peaceiris/actions-gh-pages@v3
    publish_dir: ./build

## License

Copyright (c) ConstructiveIQ. All rights reserved.
