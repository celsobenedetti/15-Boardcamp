"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../src/app"));
const db_1 = __importDefault(require("../../src/db"));
const supertest_1 = __importDefault(require("supertest"));
describe("/categories routes tests", () => {
    test("GET /categories", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(app_1.default)
            .get("/categories")
            .expect(200)
            .then((res) => {
            expect(res.body).toBeInstanceOf(Array);
            return;
        });
    }));
    describe("POST /category", () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield db_1.default.query("INSERT INTO categories (name) VALUES ('testCategory');", []);
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield db_1.default.query("DELETE FROM categories WHERE name = 'testCategory' OR name = 'successTest';", []);
        }));
        it("Should return 400 if name is empty", () => __awaiter(void 0, void 0, void 0, function* () {
            return (0, supertest_1.default)(app_1.default)
                .post("/categories")
                .send({ name: "" })
                .expect(400)
                .then((res) => {
                expect(res.body).toHaveProperty("error");
                expect(res.body.error).toMatch(/"name" is not allowed to be empty/i);
                return;
            });
        }));
        it("Should return 409 if category is already in database", () => __awaiter(void 0, void 0, void 0, function* () {
            return (0, supertest_1.default)(app_1.default)
                .post("/categories")
                .send({ name: "testCategory" })
                .expect(409)
                .then((res) => {
                expect(res.body).toHaveProperty("error");
                expect(res.body.error).toMatch(/category testCategory already exists/i);
                return;
            });
        }));
    });
});
