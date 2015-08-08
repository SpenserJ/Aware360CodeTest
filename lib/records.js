var fs = require('fs')
  , Mockaroo = require('mockaroo');

// We make use of an object, as they are pass-by-reference, and we can alter
// the contents after something has already required this file.
var exportable = {
  records: [],
};

/**
 * Fetch some test data from Mockaroo.
 *
 * @param function callback
 *   A callback handler that will be called after the test data is ready.
 */
function fetchNewRecords(callback) {
  // A hardcoded API from a dummy account.
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

// Check if we have fetched the records previously, and have a local cache.
fs.exists('./records.json', function (exists) {
  if (exists === true) {
    // Read in the cached copy, parse it as JSON, and use that to run the site.
    fs.readFile('./records.json', { encoding: 'utf8' }, function (err, data) {
      if (err) {
        return console.error('There was an error reading from ./records.json:', err);
      }
      data = JSON.parse(data);
      dataLoaded(data);
    });
  } else {
    // Fetch new records from Mockaroo and save them to a cached file.
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

/**
 * Handle preparing the data after it has been loaded into the system.
 *
 * For now, this does very little, however it could easily emit events to
 * websocket clients, or fire off an EventEmitter so that other portions of the
 * application can react to this new data.
 *
 * @param array data
 *   A collection of (Object)records.
 */
function dataLoaded(data) {
  exportable.records = data;
}

module.exports = exportable;
