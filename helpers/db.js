const mongoose = require('mongoose');



exports.connect = (async () => {
  try {
    var client = await mongoose.connect("mongodb+srv://bassant:todoapp@cluster0.sukyv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
    console.log('connected to DB');

  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  return client;

})();