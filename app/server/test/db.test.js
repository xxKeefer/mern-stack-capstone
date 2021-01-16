const { getNewReleases } = require("./db");
const { expect } = require("chai");
const mongoose = require("mongoose");

describe("getNewReleases", () => {
  it("gets all the records released in the previous year", async () => {
    mongoose.connect(process.env.DB_URL_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const db = mongoose.connection;
    //TEST GOES BELOW HERE

    // --- SETUP ---
    // create something looking like the model we're testing
    const fakeData = [
      // something we want
      {},
      // something we exclude
      {},
    ];

    //insert fake data to test db
    await db.collection("vinyls").insertMany(fakeData);

    // --- ACUTAL TEST ---
    const actual = await getNewReleases("2020");
    const finalDBState = await db.collection("vinyls").find().toArray();
    await db.dropDatabase(); // reset test db
    db.close();

    const expected = {}; // the thing we want from fakeData from "--- SETUP ---"

    expect(actual).to.deep.equal(expected); // we got what we want
    expect(finalDBState).to.deep.equal(fakeData); // nothing was altered in the DB during data retrieval

    //TEST GOES ABOVE HERE
  });
});
