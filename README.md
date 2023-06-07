# Test repo for the Down to Earth app

This repo is a dev prototype for testing things for the Down to Earth app — specifically things to do with pipeline, so we don't break the main repo.

[**View this repo hosted live: dtetest.matthall.io**](https://dtetest.matthall.io/)

## Technology

### Deployment & hosting

Right so we started with Google App Engine, which is kind of easy to use but did take some time to understand all 8000000 of Google's cloud products. However, there are [known latency issues with GAE that they just aren't fixing](https://issuetracker.google.com/issues/64458939), so we just swivelled that and now we're using [AWS Amplify](https://aws.amazon.com/amplify/). It's a nice backend for taking a Node.js-based app and hosting it, and jesus wept is it easy to use. In short: AWS > Google Cloud.

This repo is currently setup with basic CD on the AWS side, so whenever a commit is pushed to main, the site gets re-fetched, built, and deployed.

### Architecture

This is a Next.js project and so we're using their structure, which tightly couples the frontend and backend. The frontend is React, and the backend is Node.js.

- The frontend is rendered server-side, which means it's flattened into HTML by the time the user gets it. This is good for performance, because otherwise React on its own has to do a lot of work to render the page in the browser.
- The backend is going to house the actual system logic. All the fetching of data from the database, authentication, etc. will be done here.

## Installation

### Prerequisites

- [Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm). The preferred way is to use Node Version Manager because there's lots of different versions of Node, but the installer works too.
- Get editor access to this repo by messaging Matt

### Instructions

(I'm assuming we're all using vscode; I've set everything up for that)

1. Clone this repo
2. Run `npm install` to download the required dependencies
3. Install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions for vscode. These will make your life easier by automatically formatting your code to follow convention.
4. Done!

## Development

All the scripts can be viewed/edited in `package.json`.

- `npm run dev` starts a local dev server at [localhost:8080](http://localhost:8080) that auto-reloads when you make changes
- `npm run build` builds the site (to the `./build` directory) for production
- `npm run start` starts a local server that serves the built site (from the `./build` directory). This is usually used to test the production build locally right before deployment.
- `npm run lint` runs the linter, which will tell you if your code follows convention.

**Note:**
Right now, whenever you push a commit AWS will automatically redeploy the site, so within a few mins it'll be live at [dtetest.matthall.io](https://dtetest.matthall.io/).
