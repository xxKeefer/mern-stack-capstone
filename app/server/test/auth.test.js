const chai = require("chai");
const chaiHttp = require("chai-http");
const bcrypt = require("bcrypt");
const { app } = require("../server");
const fakeData = require("./test_data/auth.json");
const testRoute = "/api/auth";

// Configures Chai
chai.use(chaiHttp);

// Assertion type of use
const { expect } = chai;

// Able to hold sessions
const agent = chai.request.agent(app);

//closes session created by chai agent
after(() => agent.close());

describe("POST /signup | create user functionality.", () => {
  it("should NOT create a new user when there are MISSING FIELDS.", async () => {
    const malformedData = { ...fakeData.user };
    delete malformedData.username;

    const res = await chai
      .request(app)
      .post(`${testRoute}/signup`)
      .type("form")
      .send(malformedData);

    // --- assertions ---
    expect(res).to.have.status(400);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal(
      "User validation failed: username: Path `username` is required."
    );
  });

  it("should CREATE a new user with user permissions", async () => {
    const res = await chai
      .request(app)
      .post(`${testRoute}/signup`)
      .type("form")
      .send(fakeData.user);

    const passwordComparison = await bcrypt.compare(
      fakeData.user.password,
      res.body.password
    );

    // --- assertions ---
    expect(res.error).to.be.false;
    expect(res).to.have.status(201);
    expect(res.body).to.have.property("roles");
    expect(res.body.roles).to.be.an("array");
    expect(res.body.roles).to.deep.equal(["user"]);
    expect(res.body.username).to.equal(fakeData.user.username);
    expect(res.body.email).to.equal(fakeData.user.email);
    expect(passwordComparison).to.be.true;
  });

  it("should NOT create a new user when user ALREADY EXISTS.", async () => {
    const res = await chai
      .request(app)
      .post(`${testRoute}/signup`)
      .type("form")
      .send(fakeData.user);

    // --- assertions ---
    expect(res).to.have.status(400);
    expect(res.body).to.have.property("formError");
    expect(res.body.formError).to.deep.equal({
      type: "manual",
      name: "username",
      message: "username is taken.",
    });
  });
});

describe("POST /login |  authenticate user functionality.", () => {
  it("should NOT authenticate a user with an INVALID password.", async () => {
    malformedData = { ...fakeData.user };
    malformedData.password = "HorriblyWrong69!";
    const res = await chai
      .request(app)
      .post(`${testRoute}/login`)
      .type("form")
      .send(malformedData);

    // --- assertions ---
    expect(res).to.have.status(404);
    expect(res.body).to.have.property("formError");
    expect(res.body.formError).to.deep.equal({
      type: "manual",
      name: "email",
      message: "username or password incorrect.",
    });
  });

  it("should NOT authenticate a user with an INVALID username / email.", async () => {
    malformedData = { ...fakeData.user };
    malformedData.username = "JaneBlow";
    malformedData.email = "janeblow@email.com";
    const res = await chai
      .request(app)
      .post(`${testRoute}/login`)
      .type("form")
      .send(malformedData);

    // --- assertions ---
    expect(res).to.have.status(404);
    expect(res.body).to.have.property("formError");
    expect(res.body.formError).to.deep.equal({
      type: "manual",
      name: "email",
      message: "username or password incorrect.",
    });
  });

  it("should NOT authenticate a user WITHOUT a password.", async () => {
    malformedData = { ...fakeData.user };
    delete malformedData.password;
    const res = await chai
      .request(app)
      .post(`${testRoute}/login`)
      .type("form")
      .send(malformedData);

    // --- assertions ---
    expect(res).to.have.status(404);
    expect(res.body).to.have.property("formError");
    expect(res.body.formError).to.deep.equal({
      type: "manual",
      name: "email",
      message: "username or password incorrect.",
    });
  });

  it("should NOT authenticate a user WITHOUT a username / email.", async () => {
    malformedData = { ...fakeData.user };
    delete malformedData.username;
    delete malformedData.email;
    const res = await chai
      .request(app)
      .post(`${testRoute}/login`)
      .type("form")
      .send(malformedData);

    // --- assertions ---
    expect(res).to.have.status(404);
    expect(res.body).to.have.property("formError");
    expect(res.body.formError).to.deep.equal({
      type: "manual",
      name: "email",
      message: "username or password incorrect.",
    });
  });

  it("should AUTHENTICATE a user when submitting correct credentials.", async () => {
    const res = await agent
      .post(`${testRoute}/login`)
      .type("form")
      .send(fakeData.user);

    // --- assertions ---
    expect(res.error).to.be.false;
    expect(res).to.have.status(200);
    expect(res).to.have.cookie("connect.sid");
    expect(res.body).to.have.property("roles");
    expect(res.body.roles).to.be.an("array");
    expect(res.body.roles).to.deep.equal(["user"]);
    expect(res.body.username).to.equal(fakeData.user.username);
    expect(res.body.email).to.equal(fakeData.user.email);
  });

  it("should NOT authenticate a user when one is ALREADY authenticated.", async () => {
    const res = await agent
      .post(`${testRoute}/login`)
      .type("form")
      .send(fakeData.user);

    // --- assertions ---
    expect(res).to.have.status(401);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal(
      "a user already authenticated, log out first."
    );
  });
});

describe("POST /logout |  revoke authentication functionality.", () => {
  it("should DESTROY the current user session", async () => {
    const res = await agent.get(`${testRoute}/logout`);

    // --- assertions ---
    expect(res).to.have.status(204);
    expect(res).to.not.have.cookie("connect.sid");
  });

  it("should NOT destroy the current user session if there isn't one.", async () => {
    const res = await agent.get(`${testRoute}/logout`);

    // --- assertions ---
    expect(res).to.have.status(401);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal("no user authenticated, login first.");
  });
});

describe("POST /session | persist user data on front end refresh functionality.", () => {
  it("should RETURN session's CURRENT USER if a session exists", async () => {
    // --- log agent back in ---
    await agent.post(`${testRoute}/login`).type("form").send(fakeData.user);

    const res = await agent.get(`${testRoute}/session`);

    // --- assertions ---
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("user");
    expect(res.body.user).to.have.property("roles");
    expect(res.body.user.roles).to.be.an("array");
    expect(res.body.user.roles).to.deep.equal(["user"]);
    expect(res.body.user.username).to.equal(fakeData.user.username);
    expect(res.body.user.email).to.equal(fakeData.user.email);
  }).timeout(5000);

  it("should return NOTHING if no session exists.", async () => {
    // --- log the agent back out ---
    await agent.get(`${testRoute}/logout`);

    const res = await agent.get(`${testRoute}/session`);

    // --- assertions ---
    expect(res).to.have.status(404);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal("no session found.");
  });
});
