# E-Commerce Website (Project Cyan)

## Table of contents

- [Ground rules for the group working](#ground-rules-for-the-group-working)
  - [Disagreements](#disagreements)
  - [Responsibility](#responsibility)
  - [Respect](#respect)
  - [DOD (Definition of Done)](#dod-definition-of-done)
- [Technologies used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Other](#other)
- [Features List](#features-list)
- [Models and Database structure](#models-and-database-structure)
- [Installation](#installation)
- [Testing](#testing)
- [Usage](#usage)

### Ground rules for the group working

#### Disagreements

##### If you can't solve an argument in either 5 minutes or 10 messages, take the arguement to Perttu (together, through a daily meeting or discord call). Perttu will consult software development team, if he runs in to a problem that he can not comment on.

#### Responsibility

##### When assigning an issue, it's the assignees responsibility to finish the task the way they see fit.

##### When working on an issue, a new branch should be created to it.

##### If a team member runs in to problems with their issue, it's their responsiblity to seek help and guidance from Perttu or other team members.

##### Only the assignee can close an issue or choose to divide the issue to multiple issues.

##### You can merge branches only when the definition of done is met.

#### Respect

##### Technologies and frameworks are added and decided for the project only when the whole team is in an understanding or Perttu makes the decision.

#### DOD (Definition of Done)

1. Meets the Issue requirements and specification.
2. Passes a code review, conducted by all team members before Sprint meeting. (A team member leaves a comment on GitLab, if there's a problem. Otherwise it's expected to have passed.)
3. Passes manual testing.

### Technologies used

#### Frontend

| Project             | Status                                         | Documentation                                     |
| ------------------- | ---------------------------------------------- | ------------------------------------------------- |
| [typescript]        | [![typescript-status]][typescript-package]     | https://www.typescriptlang.org/                   |
| [react]             | [![react-status]][react-package]               | https://reactjs.org/                              |
| [react-modal]       | [![react-modal-status]][react-modal-package]   |                                                   |
| [react-router]      | [![react-router-status]][react-router-package] | https://reactrouter.com/                          |
| [axios]             | [![axios-status]][axios-package]               |                                                   |
| [jsonwebtoken]      | [![jsonwebtoken-status]][jsonwebtoken-package] | https://github.com/auth0/node-jsonwebtoken#readme |
| [tailwindcss]       | [![tailwindcss-status]][tailwindcss-package]   | https://tailwindcss.com                           |
| [@headlessui/react] | [![headlessui-status]][headlessui-package]     | https://headlessui.dev/                           |

[typescript]: https://github.com/microsoft/TypeScript/
[typescript-status]: https://img.shields.io/npm/v/typescript.svg
[typescript-package]: https://www.npmjs.com/package/typescript
[react]: https://github.com/facebook/react
[react-status]: https://img.shields.io/npm/v/react.svg
[react-package]: https://www.npmjs.com/package/react
[react-modal]: https://github.com/reactjs/react-modal
[react-modal-status]: https://img.shields.io/npm/v/react-modal.svg
[react-modal-package]: https://www.npmjs.com/package/react-modal
[react-router]: https://github.com/facebook/react
[react-router-status]: https://img.shields.io/npm/v/react-router-dom.svg
[react-router-package]: https://www.npmjs.com/package/react-router-dom
[axios]: https://github.com/axios/axios
[axios-status]: https://img.shields.io/npm/v/axios.svg
[axios-package]: https://www.npmjs.com/package/axios
[tailwindcss]: github.com/tailwindlabs/tailwindcss
[tailwindcss-status]: https://img.shields.io/npm/v/tailwindcss.svg
[tailwindcss-package]: https://www.npmjs.com/package/tailwindcss
[jsonwebtoken]: github.com/auth0/node-jsonwebtoken
[jsonwebtoken-status]: https://img.shields.io/npm/v/jsonwebtoken.svg
[jsonwebtoken-package]: https://www.npmjs.com/package/jsonwebtoken
[@headlessui/react]: https://github.com/tailwindlabs/headlessui
[headlessui-status]: https://img.shields.io/npm/v/@headlessui/react.svg
[headlessui-package]: https://www.npmjs.com/package/@headlessui/react

Note: `autoprefixer` and `postcss` are also used together with `tailwindcss`

Other DevDependencies:

- prettier
- eslint
- eslint-config-airbnb-typescript-prettier

#### Backend

- bcrypt
- cors
- dotenv
- express
- express-fileupload
- express-validator
- jsonwebtoken
- nodemon
- passport
- passport-jwt
- pg
- pg-copy-streams
- pluralize
- uuid

DevDependencies:

- chai
- chai-http
- eslint
- eslint-config-airbnb-typescript-prettier
- mocha
- prettier
- ts-node
- typescript

#### Other

- Docker
- PostgreSQL
- pgAdmin
- dbdiagram.io
- Amazon Web Services (AWS)

### Features List

- "Should have strong SEO stuff"
- Authentication
  - `User` can create an account
  - `User` can log in
  - `User` has acess to My Profile, where:
    - can see a list of previous orders
    - can edit it's own information
  - Visitors need to be authenticated to be able to: Place Orders
  - Guests can: View Products, Search, Add to Cart
- Store

  - Has `Product` catalog
  - Products have `Product Categories`
  - Products have `Product Options`
  - Search Functionality

- `Order`
  - `Coupon Code` could be applied
- Shopping Cart
  - Store it in LocalStorage before placing the order
- Backend (Admin Panel)
  - See a list of all Products (consider importing data)
  - See a list of all Users (need some seeders)
  - See a list of all Orders
  - Add New Products
  - Delete Products
  - Edit Products

### Models and Database structure

[https://dbdiagram.io/d/5f9a8a363a78976d7b79a60b](https://dbdiagram.io/d/5f9a8a363a78976d7b79a60b)

### Installation

The project can be cloned locally with:

```sh
git clone https://gitlab.com/buutcampsprint/typescript2020/project-cyan/
```

The project is structured in **two** subprojects:

### client

To install the client npm dependencies:

```sh
 cd client
 npm install #or `yarn install`
```

### server

To install the server npm dependencies:

```sh
 cd server
 npm install #or `yarn install`
```

### Testing

- Automated testing is _currently set up for only for the server side_ and tests coverage is still very low.

  To run the whole test suite, the user should make sure that server is the current working directory and then run:

```sh
 npm test #or `yarn test`
```

For testing the server will run by default on port `5555`

- To test the API endpoints manually, we have prepared configuration files for `Postman` and `Insomnia` under `resources/API-Clients`.

### Usage

#### To boot up the server:

```sh
 cd server
 npm run watch #or `yarn watch`
```

For development the server will run by default on port `5000`

#### To boot up the client application:

```sh
 cd client
 npm start #or `yarn start`
```

For development the client will run by default on port `3000`

**Note:**

After making changes to `tailwind.config.js` the following command should be run to make sure the new css file gets generated.

```sh
 cd client
 npm run build:css #or `yarn build:css`
```

Before the application will be ready for production the unused styles should be purged. See https://tailwindcss.com/docs/optimizing-for-production.
