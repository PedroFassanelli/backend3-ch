import mongoose from "mongoose";
import supertest from "supertest";
import chai from "chai";
import app from "../src/app.js";

const expect = chai.expect;
const requester = supertest(app);

describe("Functional tests - Adoption Router", function () {
  // Increase timeout for DB operations
  this.timeout(10000);

  let testUser;
  let testPet;
  let testAdoption;

  // Create test user and pet via mocks/generateData, then fetch them 
  before(async function () {
    // Generate 1 user and 1 pet in the DB
    const { body: genBody } = await requester
      .post("/api/mocks/generateData")
      .send({ users: 1, pets: 2 });

    expect(genBody.status).to.equal("success");

    // Get the created user
    const { body: usersBody } = await requester.get("/api/users");
    testUser = usersBody.payload[usersBody.payload.length - 1];

    // Get the created pets (need 2: one for adoption, one already adopted for error case)
    const { body: petsBody } = await requester.get("/api/pets");
    const availablePets = petsBody.payload.filter((p) => !p.adopted);
    testPet = availablePets[availablePets.length - 1];
  });

  describe("GET /api/adoptions", () => {
    it("should return all adoptions with status success", async () => {
      const { statusCode, body } = await requester.get("/api/adoptions");
      expect(statusCode).to.equal(200);
      expect(body.status).to.equal("success");
      expect(body.payload).to.be.an("array");
    });
  });

  describe("GET /api/adoptions/:aid", () => {
    it("should return 404 for a non-existent adoption", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const { statusCode, body } = await requester.get(
        `/api/adoptions/${fakeId}`
      );
      expect(statusCode).to.equal(404);
      expect(body.status).to.equal("error");
      expect(body.error).to.equal("Adoption not found");
    });

    it("should return an adoption by its ID", async () => {
      // First, create an adoption to retrieve
      const { body: createBody } = await requester.post(
        `/api/adoptions/${testUser._id}/${testPet._id}`
      );
      expect(createBody.status).to.equal("success");

      // Now get all adoptions and find the one we just created
      const { body: allBody } = await requester.get("/api/adoptions");
      testAdoption = allBody.payload.find(
        (a) => a.owner === testUser._id && a.pet === testPet._id
      );
      expect(testAdoption).to.not.be.undefined;

      // Test GET by ID
      const { statusCode, body } = await requester.get(
        `/api/adoptions/${testAdoption._id}`
      );
      expect(statusCode).to.equal(200);
      expect(body.status).to.equal("success");
      expect(body.payload).to.have.property("_id", testAdoption._id);
      expect(body.payload).to.have.property("owner");
      expect(body.payload).to.have.property("pet");
    });
  });

  describe("POST /api/adoptions/:uid/:pid", () => {
    it("should return 404 if user does not exist", async () => {
      const fakeUserId = new mongoose.Types.ObjectId();
      const { statusCode, body } = await requester.post(
        `/api/adoptions/${fakeUserId}/${testPet._id}`
      );
      expect(statusCode).to.equal(404);
      expect(body.status).to.equal("error");
      expect(body.error).to.equal("user Not found");
    });

    it("should return 404 if pet does not exist", async () => {
      const fakePetId = new mongoose.Types.ObjectId();
      const { statusCode, body } = await requester.post(
        `/api/adoptions/${testUser._id}/${fakePetId}`
      );
      expect(statusCode).to.equal(404);
      expect(body.status).to.equal("error");
      expect(body.error).to.equal("Pet not found");
    });

    it("should return 400 if pet is already adopted", async () => {
      // testPet was already adopted in the GET /:aid test
      const { statusCode, body } = await requester.post(
        `/api/adoptions/${testUser._id}/${testPet._id}`
      );
      expect(statusCode).to.equal(400);
      expect(body.status).to.equal("error");
      expect(body.error).to.equal("Pet is already adopted");
    });

    it("should successfully create an adoption", async () => {
      // Get a fresh non-adopted pet
      const { body: petsBody } = await requester.get("/api/pets");
      const availablePet = petsBody.payload.find((p) => !p.adopted);
      expect(availablePet).to.not.be.undefined;

      const { statusCode, body } = await requester.post(
        `/api/adoptions/${testUser._id}/${availablePet._id}`
      );
      expect(statusCode).to.equal(200);
      expect(body.status).to.equal("success");
      expect(body.message).to.equal("Pet adopted");
    });
  });
});
