process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, server, db } = require("../server");
const setupData = require("./setup.json");
const User = require("../models/user");

// Configures Chai to make requests
chai.use(chaiHttp);

// Assertion type of use
const { expect } = chai;

before(async () => {
  await User.create(setupData.user);
  await User.create(setupData.admin);
});

after(async () => {
  await db.dropDatabase();
  await db.close();
  server.close();
});

describe("Connection to API", () => {
  it("Should connect to the API", async () => {
    let res = await chai.request(app).get("/api");
    // --- assertions ---
    expect(res).to.have.status(200);
    expect(res.body.message).to.deep.equal("API is active.");
  });
});

describe("Auth API", () => {
  require("./auth.test");
});

describe("Shop API", () => {
  require("./shop.test");
});

// describe("Customer API", () => {
//   require("./customer.test");
// });
