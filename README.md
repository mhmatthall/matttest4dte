# Test repo for the Down to Earth app

This repo is a dev prototype for testing things for the Down to Earth app — specifically things to do with pipeline, so we don't break the main repo.

[**View this repo hosted live: dtetest.matthall.io**](https://dtetest.matthall.io/)

## Deployment & hosting

Right so we started with Google App Engine, which is kind of easy to use but did take some time to understand all 80000 of Google's cloud products. However, there are [known latency issues with GAE that they just aren't fixing](https://issuetracker.google.com/issues/64458939), so we just swivelled that and now we're using [AWS Amplify](https://aws.amazon.com/amplify/). It's a nice backend for taking a Node.js-based app and hosting it, and jesus wept is it easy to use. In short: AWS > Google Cloud.

This repo is currently setup with basic CD on the AWS side, so whenever a commit is pushed to main, the site gets re-fetched, built, and deployed.

## Using this repo

### Prerequisites

- [Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm). The preferred way is to use Node Version Manager because there's lots of different versions of Node, but the installer works too.
- Get editor access to this repo by messaging Matt

### Instructions

1. Clone this repo
2. Run `npm install` to download the required dependencies
3. Run `npm run dev` to start a local dev server

Whenever you push a commit AWS will automatically redeploy the site, so within a few mins it'll be live at [dtetest.matthall.io](https://dtetest.matthall.io/).
