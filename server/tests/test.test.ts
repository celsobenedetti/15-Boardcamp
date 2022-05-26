import app from "../src/app";
import request from "supertest";

test("Jest, TypeScript, Babel setup", async () => {
  await request(app)
    .get("/")
    .expect(200)
    .then((res) => {
      expect(res.text).toMatch(/hello world/i);
    });
});
