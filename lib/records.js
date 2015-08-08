var fs = require('fs')
  , Mockaroo = require('mockaroo');

var exportable = {
  records: [],
};

function fetchNewRecords(callback) {
  var mockaroo = new Mockaroo.Client({
    apiKey: 'd76417f0',
  });

  mockaroo.generate({
    count: 100,
    // These are the same default fields used on the website.
    fields: [
      { name: 'id', type: 'Row Number' },
      { name: 'first_name', type: 'First Name' },
      { name: 'last_name', type: 'Last Name' },
      { name: 'email', type: 'Email Address' },
      { name: 'country', type: 'Country' },
      { name: 'ip_address', type: 'IP Address v4' },
    ]
  }).then(callback);
}

fs.exists('./records.json', function (exists) {
  if (exists === true) {
    fs.readFile('./records.json', { encoding: 'utf8' }, function (err, data) {
      if (err) {
        return console.error('There was an error reading from ./records.json:', err);
      }
      data = JSON.parse(data);
      dataLoaded(data);
    });
  } else {
    fetchNewRecords(function (records) {
      // Save a copy of the records so that we can load it faster next time.
      fs.writeFile('./records.json', JSON.stringify(records), function (err) {
        if (err) {
          return console.error('There was an error saving a local cache of records:', err);
        }
      });

      // Make use of the data.
      dataLoaded(records);
    });
  }
});

function dataLoaded(data) {
  exportable.records = data;
}

module.exports = exportable;
