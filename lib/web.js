var express = require('express')
  , exphbs = require('express-handlebars');

var Records = require('./records');

var app = express();

var hbs = exphbs({
  defaultLayout: 'main',
  helpers: {
    ifIsNthItem: function (options) {
      if (options.data.index % options.hash.nth === 0) {
        return options.fn(this);
      }
    },

    evenOddClass: function (options) {
      return (options.data.index % 2) ? 'odd' : 'even';
    },
  }
});

app.engine('handlebars', hbs);
app.set('view engine', 'handlebars');

// Serve static files out of ./dist/
app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.render('home', { records: Records.records });
});

app.listen(4000);

module.exports = app;
