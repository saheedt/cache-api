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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = require("../../../../app");
var utils_1 = require("../../../../utils/");
var generateKey = utils_1.Helper.generateKey;
describe('[GET] /cache/:key', function () {
    it('should not return cache if key doesnt exist in db', function () { return __awaiter(void 0, void 0, void 0, function () {
        var key, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = generateKey();
                    return [4 /*yield*/, supertest_1.default(app_1.app).get("/api/v1/cache/" + key).send()];
                case 1:
                    response = _a.sent();
                    expect(response.body.cache).toBe(undefined);
                    expect(response.body.key).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('return cach if key exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app)
                        .post('/api/v1/cache')
                        .send({
                        team: 'Arsenal',
                        country: 'England',
                    })
                        .expect(201)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.app)
                            .get("/api/v1/cache/" + resp.body.cache.key)
                            .send()];
                case 2:
                    response = _a.sent();
                    expect(response.body.cache).toBeDefined();
                    expect(response.body.cache.key).toEqual(resp.body.cache.key);
                    expect(response.body.cache.data.team).toEqual(resp.body.cache.data.team);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('[GET] /cache', function () {
    it('should return an error if no record is found', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).get('/api/v1/cache').send()];
                case 1:
                    response = _a.sent();
                    expect(response.body.errors[0].message).toBe('No records found');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return all records keys', function () { return __awaiter(void 0, void 0, void 0, function () {
        var first, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app)
                        .post('/api/v1/cache')
                        .send({
                        team: 'Arsenal',
                        country: 'England',
                    })
                        .expect(201)];
                case 1:
                    first = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.app)
                            .post('/api/v1/cache')
                            .send({
                            team: 'Bayern Munchen',
                            country: 'Germany',
                        })
                            .expect(201)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.app)
                            .get("/api/v1/cache/")
                            .send()
                            .expect(200)];
                case 3:
                    response = _a.sent();
                    expect(response.body.keys.length).toEqual(2);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('[POST]/cache', function () {
    it('should return an error if request body attributes are missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app)
                        .post('/api/v1/cache')
                        .send({
                        team: 'Arsenal',
                    })
                        .expect(400)];
                case 1:
                    response = _a.sent();
                    expect(response.body.errors[0].message).toBe('A valid cache item team country is required');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should successfully create record', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app)
                        .post('/api/v1/cache')
                        .send({
                        team: 'Arsenal',
                        country: 'England',
                    })
                        .expect(201)];
                case 1:
                    response = _a.sent();
                    expect(response.body.cache.data.team).toEqual('Arsenal');
                    return [2 /*return*/];
            }
        });
    }); });
    describe('[PUT]/cache', function () {
        it('should return an error if request body attributes are missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var first, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(app_1.app)
                            .post('/api/v1/cache')
                            .send({
                            team: 'Arsenal',
                            country: 'England',
                        })
                            .expect(201)];
                    case 1:
                        first = _a.sent();
                        return [4 /*yield*/, supertest_1.default(app_1.app)
                                .put('/api/v1/cache')
                                .send({
                                key: first.body.cache.key,
                                team: 'Bayern Munchen',
                            })
                                .expect(400)];
                    case 2:
                        response = _a.sent();
                        expect(response.body.errors[0].message).toBe('A valid cache item team country is required');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should successfully update record', function () { return __awaiter(void 0, void 0, void 0, function () {
            var first, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(app_1.app)
                            .post('/api/v1/cache')
                            .send({
                            team: 'Arsenal',
                            country: 'England',
                        })
                            .expect(201)];
                    case 1:
                        first = _a.sent();
                        return [4 /*yield*/, supertest_1.default(app_1.app)
                                .put('/api/v1/cache')
                                .send({
                                key: first.body.cache.key,
                                team: 'Bayern Munchen',
                                country: 'Germany',
                            })
                                .expect(200)];
                    case 2:
                        response = _a.sent();
                        expect(response.body.cache.data.team).toEqual('Bayern Munchen');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('[Delete] /cache/:key', function () {
        it('should return an error if key doesnt exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var key, first, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = generateKey();
                        return [4 /*yield*/, supertest_1.default(app_1.app)
                                .post('/api/v1/cache')
                                .send({
                                team: 'Arsenal',
                                country: 'England',
                            })
                                .expect(201)];
                    case 1:
                        first = _a.sent();
                        return [4 /*yield*/, supertest_1.default(app_1.app)
                                .delete("/api/v1/cache/" + key)
                                .send()
                                .expect(404)];
                    case 2:
                        response = _a.sent();
                        expect(response.body.errors[0].message).toBe('Item specified for delete not found');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should successfully delete record', function () { return __awaiter(void 0, void 0, void 0, function () {
            var first, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(app_1.app)
                            .post('/api/v1/cache')
                            .send({
                            team: 'Arsenal',
                            country: 'England',
                        })
                            .expect(201)];
                    case 1:
                        first = _a.sent();
                        return [4 /*yield*/, supertest_1.default(app_1.app)
                                .delete("/api/v1/cache/" + first.body.cache.key)
                                .send()
                                .expect(200)];
                    case 2:
                        response = _a.sent();
                        expect(response.body.cache.data.team).toEqual('Arsenal');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('[Delete] /cache', function () {
        it('should return an empty array on delete all', function () { return __awaiter(void 0, void 0, void 0, function () {
            var key, first, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = generateKey();
                        return [4 /*yield*/, supertest_1.default(app_1.app)
                                .post('/api/v1/cache')
                                .send({
                                team: 'Arsenal',
                                country: 'England',
                            })
                                .expect(201)];
                    case 1:
                        first = _a.sent();
                        return [4 /*yield*/, supertest_1.default(app_1.app)
                                .delete("/api/v1/cache/")
                                .send()
                                .expect(200)];
                    case 2:
                        response = _a.sent();
                        expect(response.body.caches).toEqual([]);
                        expect(response.body.caches.length).toEqual(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
