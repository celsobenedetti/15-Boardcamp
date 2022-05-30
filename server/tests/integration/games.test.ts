import app from "../../src/app";
import request from "supertest";

describe("/games routes tests", () => {
  test("GET /games", async () => {
    return request(app)
      .get("/games")
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
        return;
      });
  });

  describe("POST /games", () => {
    const gameBody = {
      name: "Valid Name",
      image: "https://validimage.png",
      stockTotal: 1,
      pricePerDay: 1,
    };

    it("Should return 400 if body is invalid", async () => {
      await request(app)
        .post("/games")
        .send({
          ...gameBody,
          name: "",
        })
        .expect(400)
        .then((res) => {
          expect(res.body).toHaveProperty("error");
          expect(res.body.error).toBe('"name" is not allowed to be empty');
          return;
        });

      await request(app)
        .post("/games")
        .send({
          ...gameBody,
          image: "",
        })
        .expect(400)
        .then((res) => {
          expect(res.body).toHaveProperty("error");
          expect(res.body.error).toBe('"image" is not allowed to be empty');
          return;
        });

      await request(app)
        .post("/games")
        .send({
          ...gameBody,
          stockTotal: 0,
        })
        .expect(400)
        .then((res) => {
          expect(res.body).toHaveProperty("error");
          expect(res.body.error).toBe('"stockTotal" must be greater than or equal to 1');
          return;
        });

      return request(app)
        .post("/games")
        .send({
          ...gameBody,
          pricePerDay: 0,
        })
        .expect(400)
        .then((res) => {
          expect(res.body).toHaveProperty("error");
          expect(res.body.error).toBe('"pricePerDay" must be greater than or equal to 1');
          return;
        });
    });

    it("Should return 400 if categoryId is not valid", async () => {
      return request(app)
        .post("/games")
        .send({ ...gameBody, categoryId: 0 })
        .expect(400)
        .then((res) => {
          expect(res.body).toHaveProperty("error");
          expect(res.body.error).toMatch(/category 0 not found in database/i);
          return;
        });
    });
  });
});
