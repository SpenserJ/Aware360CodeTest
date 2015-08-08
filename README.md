# Aware360 Coding Test - Spenser Jones

This is my solution to the challenge that Michael Borthwick put to me. I decided
to develop it as a Node.JS application, as I find it is a powerful language,
both for prototyping and developing production applications in.

## Description of challenge

* mockaroo.com is a random data generator.
* Using the 6 default fields on Mockaroo, generate 100 rows of data in any format you like.
* Using any language of your choice convert that raw data into an HTML table.
* Everything will have default black text with a white background.
* Alternating rows will be striped with a 10% grey background.
* The table must have a header with white text and an 80% grey background.
* The header (and it's style) must be repeated every 10 rows.

## Contents of Project

The main entry file for the application is `index.js`, which would typically
load up all of my controllers, however the challenge was quite simple and it
only needs to load up `lib/web.js`.

### lib/web.js

The Webserver controller is build with Express and Handlebars, serving static
content out of the `dist` directory. I have written some Handlebars helpers to
simplify the process of repeating the header every ten records, and
zebra-striping the rows.

The records are fetched from `lib/records.js`, and thanks to the
pass-by-reference nature of objects, and the fact that `require()` will only
instantiate a require once, after which it returns the same `module.exports`,
we can load the records from Mockaroo while the webserver is launching.

### lib/records.js

The Records controller uses the Mockaroo package from `npm`, and has a hardcoded
API key for development purposes. As this is a dummy account that I created with
a fake email address, I do not mind if it is in a public repository.

Upon initialization, it will check if a cached copy of the records already
exists, and if not, it will fetch 100 records of the six default fields from
Mockaroo.

### gulpfile.js

I have created a `gulpfile` ([Gulp](http://gulpjs.com/)) in order to simplify
compilation, minification, and concatenation of any public resources. As this is
a simple project, the only resource that was used is a CSS file. Using SASS as
a CSS preprocessor allowed me to reduce the amount of code required to style
the website, and allowed me to minify the output without complicating the source
stylesheets. Sourcemaps are currently enabled for easier debugging of the
styles, and would be disabled in a production environment.

## Running the project

Before the project will run, you must `npm install` the dependencies.

In order to launch the process, run `node index.js`. If you would like to modify
the code, I would suggest installing nodemon (`npm install -g nodemon`), and
running `nodemon index.js` instead.
