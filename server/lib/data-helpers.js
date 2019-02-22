"use strict";
const ObjectId = require("mongodb").ObjectId;
// Simulates the kind of delay we see with network or filesystem operations

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insert(newTweet, function (err, result)
        {
          if (err) callback(err);

          callback(null);
          
        });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },
    updateTweets: function(id, count, callback) {
      const incrementAmount = parseInt(count, 10)
      console.log("increment: ", incrementAmount)
      db.collection("tweets").updateOne(
        {_id: ObjectId(id)}, 
        {$inc: {likes: incrementAmount}}, 
        function (err, result) {
          // console.log(err, result);
          callback(err, true);
        }
      );
      
    }

  };
};
