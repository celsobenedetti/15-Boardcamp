jest.useFakeTimers();
import app from "../../src/app";
import request from "supertest";
import { PoolFactory } from "../../src/db";

describe("/categories routes tests", () => {
  const poolFactory = new PoolFactory();

  test("GET /categories", async () => {
    request(app)
      .get("/categories")
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  describe("POST /category", () => {
    beforeAll(async () => {
      const connection = await poolFactory.createConnection();
      await connection.query(
        "INSERT INTO categories (name) VALUES ('testCategory');"
      );
      await connection.end();
    });

    afterAll(async () => {
      const connection = await poolFactory.createConnection();
      await connection.query(
        "DELETE FROM categories WHERE name = 'testCategory' OR name = 'successTest';"
      );
      await connection.end();
    });

    it("Should return 400 if name is empty", async () => {
      await request(app)
        .post("/categories")
        .send({ name: "" })
        .expect(400)
        .then((res) => {
          expect(res.body).toHaveProperty("error");
          expect(res.body.error).toMatch(/"name" is not allowed to be empty/i);
        });
      return;
    });

    it("Should return 409 if category is already in database", async () => {
      await request(app)
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
