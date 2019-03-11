# Gulp Webpack Builder
**Gulp Webpack Builder** - A simple web-development toolkit using Gulp task runner and Webpack bundler. Ideal for building static **HTML templates**,  **Wordpress theme** development, **Laravel**  and front-end project.
![enter image description here](https://gulp-webpack-builder.project.taknepoidet.ru/images/cover.jpg)

## List of Content

1.  [Features](#features)
2.  [Getting Started?](#getting-started)
3. [Commands](#commands)

## Features
| Features | Description |
|--|--|
| CSS | [SASS](http://sass-lang.com/), [Autoprefixer](https://github.com/postcss/autoprefixer), [clean-css](https://www.npmjs.com/package/gulp-clean-css) |
| JS | [Webpack](https://webpack.js.org/), [Babel](http://babeljs.io/) |
| Live Reload| [BrowserSync](http://www.browsersync.io/), [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware), [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware) |
| HTML | [gulp-file-include](https://www.npmjs.com/package/gulp-file-include), [gulp-nunjucks-render](https://www.npmjs.com/package/gulp-nunjucks-render) |
| Images | [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) |
| SVG sprite | [gulp-svg-sprite](https://github.com/jkphl/gulp-svg-sprite) |
| Deployment | [vinyl-ftp](https://www.npmjs.com/package/vinyl-ftp) |
| Lint| [ESLint](https://eslint.org), [Prettier](https://prettier.io) |

## Getting started?
### Recommendations
Make sure you have the following installed:
-   [Node.js](https://nodejs.org/)
-   [npm](https://www.npmjs.com/)  or  [yarn](https://yarnpkg.com/en/)
Recommended to use node 10 ([last LTS version](https://github.com/nodejs/Release#release-schedule))
### Install and start
#### Step 1 - clone
``` bash
git clone https://github.com/TakNePoidet/Gulp-Webpack-Builder.git <my-project-name>
cd <my-project-name>
``` 
#### Step 2 - run
``` bash
yarn
yarn start
```
or 
``` bash
npm install
npm run start
```
#### Step 3 - rename config file
``` bash
cp config.sample.js config.js
```

## Commands
``` bash
yarn <script> //alternative: npm run <script>
yarn start //Run development mode
yarn build //Compiles your App for production
yarn deploy //Push production version on remote server using FTP
yarn server//Start local server
yarn lint //lint
yarn lint:fix //lint --fix
``` 
