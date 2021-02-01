const chai = require("chai");
const chaiHttp = require("chai-http");
const bcrypt = require("bcrypt");
const { app } = require("../server");
const fakeData = require("./data.json");
const { sample } = require("./helpers");
const testRoute = "/api/customer";

// Configures Chai
chai.use(chaiHttp);

// Assertion type of use
const { expect } = chai;

// Able to hold sessions
const agent = chai.request.agent(app);

//closes session created by chai agent
after(() => agent.close());

describe("POST / | create customer functionality.", () => {
  //TODO: make sure that test env use sandbox creds for various apis
});

describe("PUT / | update customer functionality.", () => {});

describe("DELETE / | delete customer functionality.", () => {});

describe("GET /:id | retrieve customer functionality.", () => {});

describe("POST /card | create customer card payment functionality.", () => {});

describe("DELETE /card | delete customer card payment functionality.", () => {});
