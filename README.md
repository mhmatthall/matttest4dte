# cronicl
> **cronicl**, _verb., Welsh translation of_ **chronicle**; to create a detailed record of events over time

An educational biodiversity monitoring app for engaging young people in citizen science, created by a team at [Swansea University](https://www.swansea.ac.uk/computational-foundry/epsrc-centre-for-doctoral-training/) in partnership with [Down to Earth](https://downtoearthproject.org.uk/).

cronicl is not yet released, so there is no guarantee of stability or future support. This repo is for development purposes only.

## Technology
- Hosted with [AWS Amplify Hosting](https://aws.amazon.com/amplify/hosting/)
  - Live demo is available at [dtetest.matthall.io](https://dtetest.matthall.io/)
  - CI/CD is setup to update the demo with every commit to this repo
  - AWS region is `eu-west-2` (London)
- The preferred IDE is vscode
- Database storage is hosted with AWS
  - Using [DynamoDB](https://aws.amazon.com/dynamodb/) for most data
  - Using [S3](https://aws.amazon.com/s3/) for media
- Backend is built with [Next.js](https://nextjs.org/)
  - Using the `pages` router
- Frontend is built with [React](https://react.dev/)
  - Following [Material Design 3](https://m3.material.io/) principles

## App structure
There are three main areas of the app:
1. **The landing** is the static, public-facing part of the app. It contains information about cronicl and links the user to the other parts of the app.
1. **The dashboard** is the main part of cronicl, with various menus able to provide different functionality.
   - Teachers use the dashboard to manage people, sites, captures, sessions, and more. This is how they manage the app.
   - Students use the dashboard to keep track of and explore what they've found and where.
1. **The game** is where Kahoot-like, interactive live sessions take place.
   - Games are setup by teachers in the dashboard
   - Students join games either by:
     - accepting an invite request through their dashboard (if they have an account)
     - entering a special join code that the teacher can show to students (if they don't have an account)

## Setup
Before you start setting up this repo, consider whether you need to do with the app. Basically anything outside of the frontend UI development should probably be handled by Matt.
- Remember that if you just want to test out the latest version of this app, you can go to [dtetest.matthall.io](https://dtetest.matthall.io/).
- Remember we have the stripped-down [test repo](https://github.com/mhmatthall/cronicl-pissaround) for you to develop in without worrying about breaking this one.
- If you are doing frontend development, **please** make sure you sketch (at least on paper; preferably on Figma) what you're trying to do first.

Here's what you'll need to get started with developing cronicl.

### Prerequisites
1. Download and install [vscode](https://code.visualstudio.com/)
1. Install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions for vscode
1. Download and install [`nvm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm).
   - Use [`nvm`](https://github.com/nvm-sh/nvm) on Linux/MacOS
   - Use [`nvm-windows`](https://github.com/coreybutler/nvm-windows) on Windows
1. Ask Matt to give you:
   - Editor access to this repo, so you can make changes
   - The secret keys you need to connect to the backend services

### Instructions
1. Clone this repo and **open the directory as a folder in vscode**
1. Run `npm install` to download the required dependencies
1. Create a file called `.env.local` in the root of the project to store the secret keys Matt gave you. It should look like this (fill in the blanks):
    ``` yaml
    DTE_TEST_AWS_ACCESS_KEY_ID=<the AWS access key id>
    DTE_TEST_AWS_SECRET_ACCESS_KEY=<the AWS secret access key>
    DTE_TEST_SESSION_SECRET=<the session cookie encryption password>
    ```
1. You should be ready to go. Try running `npm run dev` in the console to open the local dev server.

### Development
There are various commands that you'll need to work on the app, defined in the [package.json](./package.json) file. Here's what they do:
- `npm run dev` starts a local dev server at [localhost:8080](http://localhost:8080) which hot-reloads when you make changes
- `npm run build` builds the app (to the `./build` directory) ready for production
- `npm run start` will host the built version of the app locally on your computer, so you can test that the build worked
- `npm run lint` runs the linter, which checks that code styling is correct

#### Code convention
- Every time you save the file in vscode, the linter will run and keep your code conformant to the code convention for the app. Things might move around slightly when this happens.
- Import statements should be in the new style, like: `import Link from "next/link";`. Avoid using the old-style statements like: `let fs = using("fs");`.
- All frontend files containing React code should be saved as `.jsx` files. Any JS file without React components (mainly just backend and API routes) should be saved as `.js`.
- We aren't using TypeScript, but try to maintain [JSDoc](https://jsdoc.app/about-getting-started.html) code documentation wherever possible.
- We are using modular Sass, as opposed to plain CSS. All style code should be in a separate `.module.scss` file. The code is similar though, so just look at where else it's used in the repo for an idea (e.g. in [`/src/components/common`](/src/components/common)).
- Import other files using the [module path alias](https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases) '@' to keep import statements clean. The '@' symbol literally just means 'start at `./src`'. See:
    ``` jsx
    // Without the alias
    import Button from "../../../components/common/Button";

    // With the alias
    import Button from "@/components/common/Button";
    ```
- With React, prefer [functional components over class components](https://legacy.reactjs.org/docs/components-and-props.html#function-and-class-components) wherever possible. Class components are the old-fashioned way to do React components and they're worse in every way.

#### Testing
Before you push changes to this repo, make sure you test them first! You should make sure they work:
- locally on the dev build (using `npm run dev`)
- locally on the production build (using `npm run build` then `npm run start`)

#### Tips
- If you're looking at the Next.js documentation, make sure you select the 'pages' router docs rather than the 'app' router ones.
- Be acutely aware of potential future costs of using paid-for libraries and tools, and consider open source alternatives where possible.
- When designing the frontend, use the Material Design 3 (M3) docs as a trusted guide. It saves a lot of thinking when it comes to [responsive layouts](https://m3.material.io/foundations/layout/understanding-layout/overview), [consistency](https://m3.material.io/foundations/design-tokens/overview), [colour theory](https://m3.material.io/styles/color/overview), and [iconography](https://fonts.google.com/icons).
  - Using ready-made M3 components for cronicl:
    ``` jsx
    // ExampleComponent.jsx
    // Import the reusable M3 button component at the top of the file
    import Button from "@/components/common/Button";

    ...

    // Place the button in a component
    <Button
      label="Enter"
      variant="filled"
      type="submit"
      disabled={isSubmitting}
    />
    ```
  - Using the cronicl M3 design tokens for colours and sizes:
    ``` scss
    // ExampleComponent.module.scss
    @use "@/styles/theme";
    
    .container-filled {
      background-color: theme.$primary;
      color: theme.$on-primary;
      border-radius: theme.$corner-large;
      margin: theme.$compact-margin;
    }
    ```
  - Using the cronicl M3 design tokens for typography and elevation:
    ``` scss
    // ExampleComponent.module.scss
    @use "@/styles/m3";

    // For typography
    .label {
      @include m3.body-small;
      display: flex;
      align-items: center;
    }

    // For elevation
    .container-elevated {
      background: theme.$surface-container-low;
    }
    ```
  - Using material symbols for iconography:
    ``` scss
    // In ExampleComponent.module.scss
    @import "material-symbols";

    // Wrapper selector
    .symbol {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: theme.$medium-symbol;
    }
    ```
    ``` jsx
    // In ExampleComponent.jsx
    import style from "./ExampleComponent.module.scss";

    ...
    
    // Inserting a material symbol (the <span> element) into our wrapper <div> element.
    // Replace "NAME OF THE GLYPH" with a real icon name from https://fonts.google.com/icons, like "cake".
    <div className={style.symbol}>
      <span className={style["material-symbols-outlined"]}>{"NAME OF THE GLYPH"}</span>
    </div>
    ```

#### Repo structure
Here's where the key folders you'll need are in this repo:
- [`/src`](/src) — all the actual code for the app
  - [`/src/components`](/src/components) — the parts of the UI used to build the app
  - [`/src/pages`](/src/pages) — every file and folder in this directory maps directly to an app URL. For example, the code for the `/login` page can be found at [`/src/pages/login.jsx`](src/pages/login.jsx).
    - [`/src/pages/api`](/src/pages/api) — API routes
    - [`/src/pages/dashboard`](/src/pages/dashboard) — dashboard routes
    - [`/src/pages/play`](/src/pages/play) — game routes
