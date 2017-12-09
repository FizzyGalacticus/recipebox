# Contributing

Hello, and thanks for checking out our contributing page! If you're here, it means you're interested in helping out with RecipeBox! In that case, there are some things you should know.

## Purpose

This app is designed to help some of us learn some new things (React, SocketIO, MongoDB, etc), but also to provide a useful service for the public. For quite some time, we've wanted to have an application that I can store recipes in a modern way. Sure there are other sites that can do things like that, but a lot of them are very bulky and absolutely FULL of unwarranted ads and popups. We don't want that!

## Our Stack

We are using the following technologies in our application:
 * [React](https://reactjs.org/)
 * [Express](https://expressjs.com/)
 * [Socket.IO](https://socket.io/)
 * [MongoDB](https://www.mongodb.com/)
 * [GridFS](https://docs.mongodb.com/manual/core/gridfs/)
 * [Gulp](https://gulpjs.com/)

Our main application is written in React, and compiled down to pure JavaScript using Gulp.

We are using Express to serve our application, and Socket.IO helps cover communications between the server and all client connections.

For storing information, we are using MongoDB, and GridFS when we need to store files.

## Preparing Dev Environment

**This is assuming you are familiar with [Git](https://git-scm.com/), and have [Node](https://nodejs.org/en/) installed.**

Clone the repo:
```bash
git clone git@github.com:FizzyGalacticus/recipebox
```

Install node dependencies:
```bash
npm install && sudo npm i -g gulp # Need root to install global packages
```

That's it! You're ready to start working on RecipeBox!

## Running the Server

To run the instance of the server on your local machine, execute the following command:

```bash
sudo node server.js
```

Take note that this command is run as root -- that is because to bind to port 443 (the default SSL port) you must have root privileges.

## Project Structure

All development files for the application client is in the ```www``` folder, located in the root of the project. This folder's structure is similar to any web application, except that instead of CSS we use SCSS, and our JavaScript/JSX is broken up into multiple components for easier digestion.

Files for handling server-side functions will be included in the ```server``` directory, and structured based on purpose of modules. For instance, all database handling code should be in ```server/database/```, etc.

## Code Style Guide

We have a fairly strict style guide, but basically if it passes the ESLint checks, it should be fine. Please see the ```.eslintrc.js``` file in the root of the project.

Some things we are definitely picky about:
* Use tabs and not spaces. If you use spaces, you're wrong.
* Use "Egyptian" brackets.
* Must use ES6+ syntax.
* Use ```camelCase``` for regular variables.
* Use ```PascalCase``` for classnames.

More will probably be added in the future, as we discover things we've forgotten.
