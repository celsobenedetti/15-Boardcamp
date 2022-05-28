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
const supertest_1 = __importDefault(require("supertest"));
describe("/games routes tests", () => {
    test("GET /games", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(app_1.default)
            .get("/games")
            .expect(200)
            .then((res) => {
            expect(res.body).toBeInstanceOf(Array);
            return;
        });
    }));
    describe("POST /games", () => {
        const gameBody = {
            name: "Valid Name",
            image: "https://validimage.png",
            stockTotal: 1,
            pricePerDay: 1,
        };
        it("Should return 400 if body is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .post("/games")
                .send(Object.assign(Object.assign({}, gameBody), { name: "" }))
                .expect(400)
                .then((res) => {
                expect(res.body).toHaveProperty("error");
                expect(res.body.error).toBe('"name" is not allowed to be empty');
                return;
            });
            yield (0, supertest_1.default)(app_1.default)
                .post("/games")
                .send(Object.assign(Object.assign({}, gameBody), { image: "" }))
                .expect(400)
                .then((res) => {
                expect(res.body).toHaveProperty("error");
                expect(res.body.error).toBe('"image" is not allowed to be empty');
                return;
            });
            yield (0, supertest_1.default)(app_1.default)
                .post("/games")
                .send(Object.assign(Object.assign({}, gameBody), { stockTotal: 0 }))
                .expect(400)
                .then((res) => {
                expect(res.body).toHaveProperty("error");
                expect(res.body.error).toBe('"stockTotal" must be greater than or equal to 1');
                return;
            });
            return (0, supertest_1.default)(app_1.default)
                .post("/games")
                .send(Object.assign(Object.assign({}, gameBody), { pricePerDay: 0 }))
                .expect(400)
                .then((res) => {
                expect(res.body).toHaveProperty("error");
                expect(res.body.error).toBe('"pricePerDay" must be greater than or equal to 1');
                return;
            });
        }));
        it("Should return 400 if categoryId is not valid", () => __awaiter(void 0, void 0, void 0, function* () {
            return (0, supertest_1.default)(app_1.default)
                .post("/games")
                .send(Object.assign(Object.assign({}, gameBody), { categoryId: 0 }))
                .expect(400)
                .then((res) => {
                expect(res.body).toHaveProperty("error");
                expect(res.body.error).toMatch(/category 0 not found in database/i);
                return;
            });
        }));
    });
});
