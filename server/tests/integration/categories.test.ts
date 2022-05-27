import app from "../../src/app";
import database from "../../src/db";
import request from "supertest";

describe("/categories routes tests", () => {
  test("GET /categories", async () => {
    return request(app)
      .get("/categories")
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
        return;
      });
  });

  describe("POST /category", () => {
    beforeAll(async () => {
      await database.query(
        "INSERT INTO categories (name) VALUES ('testCategory');",
        []
      );
    });

    afterAll(async () => {
      await database.query(
        "DELETE FROM categories WHERE name = 'testCategory' OR name = 'successTest';",
        []
      );
    });

    it("Should return 400 if name is empty", async () => {
      return request(app)
        .post("/categories")
        .send({ name: "" })
        .expect(400)
        .then((res) => {
          expect(res.body).toHaveProperty("error");
          expect(res.body.error).toMatch(/"name" is not allowed to be empty/i);
          return;
        });
    });

    it("Should return 409 if category is already in database", async () => {
      return request(app)
        .post("/categories")
        .send({ name: "testCategory" })
        .expect(409)
        .then((res) => {
          expect(res.body).toHaveProperty("error");
          expect(res.body.error).toMatch(
            /category testCategory already exists/i
          );
          return;
        });
    });
  });
});
