const Driver = require('./Models/driver');

const driver1 = new Driver({
  name: 'John Doe',
  available: true,
  location: {
    type: 'Point',
    coordinates: [-122.4194, 37.7749]
  }
});

const driver2 = new Driver({
  name: 'Jane Smith',
  available: false,
  location: {
    type: 'Point',
    coordinates: [-122.4064, 37.7858]
  }
});

driver1.save();
driver2.save();
