Vuetify Material Dashboard is a beautiful resource built over [Vuetify](https://vuetifyjs.com/en/) and [Vuex](https://vuex.vuejs.org/installation.html). It will help you get started developing dashboards in no time. Vuetify Material Dashboard is the official Vuejs version of the Original [Material Dashboard](https://www.creative-tim.com/product/material-dashboard). Using the Dashboard is pretty simple but requires basic knowledge of Javascript, [Vue](https://vuejs.org/v2/guide/), [Vuex](https://vuex.vuejs.org/installation.html) and [Vue-Router](https://router.vuejs.org/en/).

## Getting Started
- Install Nodejs from [Nodejs Official Page](https://nodejs.org/en/)
- Open your terminal
- Navigate to the project
- Run `npm install` or `yarn install` if you use [Yarn](https://yarnpkg.com/en/)
- Run `npm run dev` or `yarn serve` to start a local development server
- A new tab will be opened in your browser

You can also run additional npm tasks such as
- `npm run build` to build your app for production
- `npm run lint` to run linting.

## Vuetify
Vuetify is developed exactly according to Material Design spec. Every component is hand crafted to bring you the best possible UI tools to your next great app. The development doesn't stop at the core components outlined in Google's spec. Through the support of community members and sponsors, additional components will be designed and made available for everyone to enjoy.


## Vuex

Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It also integrates with Vue's official [devtools](https://github.com/vuejs/vue-devtools) extension to provide advanced features such as zero-config time-travel debugging and state snapshot export / import.

## Vue-cli

We used the latest 3.x [Vue CLI](https://github.com/vuejs/vue-cli) which aims to reduce project configuration
to as little as possible. Almost everything is inside `package.json` + some other related files such as
`.babel.config.js`, `.eslintrc.js` and `.postcssrc.js`.

Let us know what you think and what we can improve below. And good luck with development!


#### Special thanks
During the development of this dashboard, we have used many existing resources from awesome developers. We want to thank them for providing their tools open source:
- [Vuetify](https://vuetifyjs.com/en/) for the wonderful framework


Let us know your thoughts below. And good luck with development!

## Table of Contents

* [Versions](#versions)
* [Demo](#demo)
* [Quick Start](#quick-start)
* [Documentation](#documentation)
* [File Structure](#file-structure)
* [Browser Support](#browser-support)
* [Resources](#resources)
* [Reporting Issues](#reporting-issues)
* [Technical Support or Questions](#technical-support-or-questions)
* [Licensing](#licensing)
* [Useful Links](#useful-links)

## Documentation
The documentation for the Vuetify Material Dashboard is hosted at our [website](https://demos.creative-tim.com/vuetify-material-dashboard/documentation).


## File Structure

Within the download you'll find the following directories and files:

```
vuetify-material-dashboard
├── README.md
├── babel.config.js
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   ├── components
│   │   ├── core
│   │   │   ├── Drawer.vue
│   │   │   ├── Filter.vue
│   │   │   ├── Footer.vue
│   │   │   ├── Toolbar.vue
│   │   │   └── View.vue
│   │   ├── helper
│   │   │   └── Offset.vue
│   │   ├── index.js
│   │   └── material
│   │       ├── Card.vue
│   │       ├── ChartCard.vue
│   │       ├── Notification.vue
│   │       └── StatsCard.vue
│   ├── i18n
│   │   └── index.js
│   ├── lang
│   │   ├── en
│   │   │   ├── Common.json
│   │   │   ├── Core
│   │   │   │   ├── Footer.json
│   │   │   │   └── Toolbar.json
│   │   │   └── Home.json
│   │   └── index.js
│   ├── main.js
│   ├── plugins
│   │   ├── axios.js
│   │   ├── chartist.js
│   │   ├── index.js
│   │   ├── theme.js
│   │   └── vuetify.js
│   ├── router
│   │   ├── index.js
│   │   └── paths.js
│   ├── store
│   │   ├── actions.js
│   │   ├── getters.js
│   │   ├── index.js
│   │   ├── modules
│   │   │   ├── app
│   │   │   │   ├── mutations.js
│   │   │   │   └── state.js
│   │   │   └── index.js
│   │   ├── mutations.js
│   │   └── state.js
│   ├── styles
│   │   ├── index.scss
│   │   └── material-dashboard
│   ├── utils
│   │   └── vuex.js
│   └── views
│       ├── Dashboard.vue
│       ├── Icons.vue
│       ├── Maps.vue
│       ├── Notifications.vue
│       ├── TableList.vue
│       ├── Typography.vue
│       ├── Upgrade.vue
│       └── UserProfile.vue
├── vue.config.js
└── yarn.lock
```
