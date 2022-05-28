import app from "../../src/app";
import database from "../../src/db";
import request from "supertest";

describe("/customers routes tests", () => {
  test("GET /customers", async () => {
    return request(app)
      .get("/customers")
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
        return;
      });
  });

  describe("GET /customer/:id", () => {
    it("should return 404 if id is not found", async () => {
      return request(app)
        .get("/customers/0")
        .expect(404)
        .then((res) => {
          expect(res.body).toHaveProperty("error");
          expect(res.body.error).toMatch(/customer 0 not found in database/i);
          return;
        });
    });
  });
});
