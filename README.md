# Boomtown 🏙

Boomtown is a web application used to share and borrow items. This repository contains both client- and server-side code. The project uses Node, Express & Apollo on the server side and React, Apollo Client, React-Redux, React Router & React Final Form on the client side. It supports user authentication and persists user and item data in a Postgres database.

## ![Image of Boomtown](/client/public/boomtown_screenshot.png?raw=true)

---

### User Flow

Once signed up at the **/welcome** route, the user can browse the available items they wish to borrow at **/items**, then request to borrow them. They can share their own items by filling out the form on the **/share** page. They can view the items they've shared or borrowed and return the borrowed items on the **/profile** page.

---

### The Stack

| Backend/Front-end | Technologies Used                                                    |
| ----------------- | -------------------------------------------------------------------- |
| Backend           | PostgreSQL, Node, Express, JWT, and GraphQL (Apollo).                |
| Front-end         | React, Redux, React Router, React Context, Final Form, Apollo Client |

---

## Server

The server utilizes Apollo's Express middleware to enable flexible queries from the client. Unauthenticated users are able to query the _login_, _signup_ and _viewer_ endpoints. Authenticated users are able to query _user_, _item_ and _tags_ and are allowed to mutate the data in Postgres through _addItem_, _borrow_ & _return_ endpoints, as well as to _logout_.

Note that running the server requires an active instance of PostgreSQL running locally.

---

Commands must be run from the `server` directory:

### Installation

```bash
npm install
```

### Run

Development

```bash
npm run start:dev
```

Production

```bash
npm start
```

Retrieving data requires an active Postgres instance.

### Tests

Just linting:

```bash
npm run lint
```

Run linting, and fix any errors:

```bash
npm run lint:fix
```

Run Jest tests:

```
npm run jest
```

Run Jest tests, and watch for changes:

```bash
npm run jest:watch
```

Run all tests:

```bash
npm run test
```

## Client

The client is written in React. It utilizes Apollo client to interact with the server through GraphQL, React Context to retrieve the viewer, React Router for routing. The **/share** page contains a form (built w/ React Final Form) that changes the item preview automatically upon the user interacting with the form inputs. The state between the form and the preview is shared through React Redux.

Commands must be run from the `client` directory:

### Installation

```bash
npm install
```

### Run

```bash
npm start
```

### Build

```bash
npm run build
```

### Tests

Just linting:

```bash
npm run lint
```

Run linting, and fix any errors:

```bash
npm run lint:fix
```

Run all tests:

```bash
npm run test
```
