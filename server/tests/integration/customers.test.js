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
describe("/customers routes tests", () => {
    test("GET /customers", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(app_1.default)
            .get("/customers")
            .expect(200)
            .then((res) => {
            expect(res.body).toBeInstanceOf(Array);
            return;
        });
    }));
    describe("GET /customer/:id", () => {
        it("should return 404 if id is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            return (0, supertest_1.default)(app_1.default)
                .get("/customers/0")
                .expect(404)
                .then((res) => {
                expect(res.body).toHaveProperty("error");
                expect(res.body.error).toMatch(/customer 0 not found in database/i);
                return;
            });
        }));
    });
});
