const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiExclude = require("chai-exclude");
const { app } = require("../server");
const fakeData = require("./test_data/shop.json");
const authRoute = "/api/auth";
const testRoute = "/api/shop";

// Configures Chai
chai.use(chaiHttp);
chai.use(chaiExclude);

// Assertion type of use
const { expect } = chai;

// Able to hold sessions
const user = chai.request.agent(app);
const admin = chai.request.agent(app);

before(async () => {
  // --- log user agent in ---
  await user.post(`${authRoute}/login`).type("form").send(fakeData.user);
  // --- log admin agent in ---
  await admin.post(`${authRoute}/login`).type("form").send(fakeData.admin);
});

//closes session created by chai agent
after(() => {
  user.close();
  admin.close;
});

describe("POST /add | add SINGLE item to catalog.", () => {
  it("should NOT be accessible to a NON AUTHENTICATED user.", async () => {
    const res = await chai
      .request(app)
      .post(`${testRoute}/add`)
      .type("form")
      .send(fakeData.valid_items.single_item);

    // --- assertions ---
    expect(res).to.have.status(403);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.deep.equal(
      "You are not authorized to see that."
    );
  });

  it("should NOT be accessible to a user WITHOUT the ADMIN role.", async () => {
    const res = await user
      .post(`${testRoute}/add`)
      .type("form")
      .send(fakeData.valid_items.single_item);

    // --- assertions ---
    expect(res).to.have.status(403);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.deep.equal(
      "You are not authorized to see that."
    );
  });

  it("should return an ERROR when not given a RELEASE ID.", async () => {
    const res = await admin
      .post(`${testRoute}/add`)
      .type("form")
      .send(fakeData.invalid_items.malformed.single_item.no_release);

    // --- assertions ---
    expect(res).to.have.status(400);
    expect(res.body.message).to.equal("Request failed with status code 404");
  }).timeout(5000);

  it("should return an ERROR when given an incorrect RELEASE ID.", async () => {
    const res = await admin
      .post(`${testRoute}/add`)
      .type("form")
      .send(fakeData.invalid_items.malformed.single_item.wrong_release);

    // --- assertions ---
    expect(res).to.have.status(400);
    expect(res.body.message).to.equal("Request failed with status code 404");
  });

  it("should return an ERROR when not given a PRICE.", async () => {
    const res = await admin
      .post(`${testRoute}/add`)
      .type("form")
      .send(fakeData.invalid_items.malformed.single_item.no_price);

    // --- assertions ---
    expect(res).to.have.status(400);
    expect(res.body).to.deep.equal({
      category: "INVALID_REQUEST_ERROR",
      code: "EXPECTED_INTEGER",
      detail: "Expected an integer value.",
      field:
        "object.item_data.variations[0].item_variation_data.price_money.amount",
    });
  }).timeout(5000);

  it("should return an ERROR when given a word for PRICE.", async () => {
    const res = await admin
      .post(`${testRoute}/add`)
      .type("form")
      .send(fakeData.invalid_items.malformed.single_item.string_price);

    // --- assertions ---
    expect(res).to.have.status(400);
    expect(res.body).to.deep.equal({
      category: "INVALID_REQUEST_ERROR",
      code: "EXPECTED_INTEGER",
      detail: "Expected an integer value.",
      field:
        "object.item_data.variations[0].item_variation_data.price_money.amount",
    });
  }).timeout(5000);

  // it("should return an ERROR when PRICE is a FLOAT.", async () => {
  //   const res = await admin
  //     .post(`${testRoute}/add`)
  //     .type("form")
  //     .send(fakeData.invalid_items.malformed.single_item.float_price);

  //   // --- assertions ---
  //   expect(res).to.have.status(400);
  //   expect(res.body).to.deep.equal({
  //     category: "INVALID_REQUEST_ERROR",
  //     code: "EXPECTED_INTEGER",
  //     detail: "Expected an integer value.",
  //     field:
  //       "object.item_data.variations[0].item_variation_data.price_money.amount",
  //   });
  // }).timeout(5000);

  // it("should add a SQUARE CATALOG item to the SQUARE API.", async () => {});

  // it("should create a RECORD in the mongo db DATABASE.", async () => {});

  it("should return newly created database record on success.", async () => {
    const res = await admin
      .post(`${testRoute}/add`)
      .type("form")
      .send(fakeData.valid_items.single_item);

    // --- assertions ---
    expect(res).to.have.status(201);
    expect(res.body)
      .excluding(fakeData.responses.exclusions)
      .to.deep.equal(fakeData.responses.single_item);
  }).timeout(5000);
});

// describe("POST /add-multi | add MULTIPLE items to catalog.", () => {});

// describe("GET /list | return list of ENTIRE catalog.", () => {});

// describe("GET /list-subset | return a FILTERED list of the catalog.", () => {});

// describe("GET /list-one | return a SINGLE item from the catalog.", () => {});

// describe("DELETE /delete | delete a SINGLE item from the catalog.", () => {});

// describe("DELETE /delete-multi | delete MULTIPLE items from the catalog.", () => {});

// describe("GET /item-count | return the stock level for a single item in the catalog.", () => {});

// describe("POST /item-stock-in | edit the stock level of a single item in the catalog.", () => {});
