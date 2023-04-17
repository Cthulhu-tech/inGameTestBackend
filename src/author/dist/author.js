"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.__esModule = true;
exports.Author = void 0;
var common_1 = require("@nestjs/common");
var checkType_1 = require("src/utils/check/checkType");
var typeorm_1 = require("@nestjs/typeorm");
var author_entity_1 = require("./author.entity");
var Author = /** @class */ (function () {
    function Author(author) {
        this.author = author;
        this.check = new checkType_1.CheckType();
    }
    Author.prototype.checkDate = function (_date) {
        var date = new Date(_date);
        if (date.toString() === 'Invalid Date')
            throw new common_1.HttpException('Need Valid date format: YYYY.MM.DD', common_1.HttpStatus.BAD_REQUEST);
        if (date.toString().includes('Incorrect DATE value'))
            throw new common_1.HttpException('Need correct DATE formate', common_1.HttpStatus.BAD_REQUEST);
    };
    Author.prototype.checkAuthorIsCreate = function (bodyAuthor, idNumber) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _findAuthor;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getAuthorByAllProperties(bodyAuthor)];
                    case 1:
                        _findAuthor = _b.sent();
                        if (Number((_a = _findAuthor[0]) === null || _a === void 0 ? void 0 : _a.id) === idNumber)
                            return [2 /*return*/, _findAuthor[0]];
                        if (_findAuthor[0])
                            throw new common_1.HttpException('This author already exists. Author Id: ' + _findAuthor[0].id, common_1.HttpStatus.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        });
    };
    Author.prototype.createAuthor = function (authors) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.author.create(authors)];
            });
        });
    };
    Author.prototype.saveAuthor = function (authors) {
        return __awaiter(this, void 0, void 0, function () {
            var save;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.author
                            .createQueryBuilder()
                            .insert()
                            .values(authors)
                            .orUpdate(['firstName', 'lastName'], ['externalId'])
                            .execute()];
                    case 1:
                        save = _a.sent();
                        return [2 /*return*/, save.generatedMaps];
                }
            });
        });
    };
    Author.prototype.getAuthorsById = function (authors) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.check.checkType(authors, 'number', 'Authors');
                        return [4 /*yield*/, this.author
                                .createQueryBuilder()
                                .where('id IN (:...id)', {
                                id: authors
                            })
                                .getMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Author.prototype.getAuthorByAllProperties = function (bodyAuthor) {
        return __awaiter(this, void 0, void 0, function () {
            var _author;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _author = __assign({}, bodyAuthor);
                        delete _author.id;
                        return [4 /*yield*/, this.author.find({
                                where: _author
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Author.prototype.saveAuthorPost = function (bodyAuthor) {
        return __awaiter(this, void 0, void 0, function () {
            var createAuthor, saveAuthor, findAuthor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(bodyAuthor === null || bodyAuthor === void 0 ? void 0 : bodyAuthor.firstName) || !(bodyAuthor === null || bodyAuthor === void 0 ? void 0 : bodyAuthor.lastName) || !(bodyAuthor === null || bodyAuthor === void 0 ? void 0 : bodyAuthor.dob))
                            throw new common_1.HttpException('Fill in all the fields', common_1.HttpStatus.BAD_REQUEST);
                        this.checkDate(new Date(bodyAuthor === null || bodyAuthor === void 0 ? void 0 : bodyAuthor.dob));
                        return [4 /*yield*/, this.createAuthor([bodyAuthor])];
                    case 1:
                        createAuthor = _a.sent();
                        return [4 /*yield*/, this.saveAuthor(createAuthor)];
                    case 2:
                        saveAuthor = _a.sent();
                        return [4 /*yield*/, this.checkAuthorIsCreate(bodyAuthor)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getAuthorsById([Number(saveAuthor[0].id)])];
                    case 4:
                        findAuthor = _a.sent();
                        return [2 /*return*/, {
                                data: findAuthor[0]
                            }];
                }
            });
        });
    };
    Author.prototype.updateAuthorPut = function (bodyAuthor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!(bodyAuthor === null || bodyAuthor === void 0 ? void 0 : bodyAuthor.firstName) || !(bodyAuthor === null || bodyAuthor === void 0 ? void 0 : bodyAuthor.lastName) || !(bodyAuthor === null || bodyAuthor === void 0 ? void 0 : bodyAuthor.dob))
                    throw new common_1.HttpException('Fill in all the fields', common_1.HttpStatus.BAD_REQUEST);
                return [2 /*return*/, this.updateAuthorPatch(bodyAuthor)];
            });
        });
    };
    Author.prototype.updateAuthorPatch = function (bodyAuthor) {
        return __awaiter(this, void 0, void 0, function () {
            var idNumber, findAuthor, saveAuthor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idNumber = Number(bodyAuthor.id);
                        if (Object.keys(bodyAuthor).length <= 1)
                            throw new common_1.HttpException('At least one value is required', common_1.HttpStatus.BAD_REQUEST);
                        if (isNaN(idNumber))
                            throw new common_1.HttpException('Need Author id', common_1.HttpStatus.BAD_REQUEST);
                        if (bodyAuthor.dob)
                            this.checkDate(new Date(bodyAuthor === null || bodyAuthor === void 0 ? void 0 : bodyAuthor.dob));
                        return [4 /*yield*/, this.getAuthorsById([idNumber])];
                    case 1:
                        findAuthor = _a.sent();
                        if (findAuthor.length <= 0)
                            throw new common_1.HttpException('Author not found', common_1.HttpStatus.NOT_FOUND);
                        if (bodyAuthor.firstName)
                            findAuthor[0].firstName = bodyAuthor.firstName;
                        else
                            bodyAuthor.firstName = findAuthor[0].firstName;
                        if (bodyAuthor.lastName)
                            findAuthor[0].lastName = bodyAuthor.lastName;
                        else
                            bodyAuthor.lastName = findAuthor[0].lastName;
                        if (bodyAuthor.dob)
                            findAuthor[0].dob = bodyAuthor.dob;
                        else
                            bodyAuthor.dob = findAuthor[0].dob;
                        return [4 /*yield*/, this.checkAuthorIsCreate(bodyAuthor, idNumber)];
                    case 2:
                        _a.sent();
                        findAuthor[0].id = idNumber;
                        return [4 /*yield*/, this.author.save(__assign(__assign({}, findAuthor[0]), { id: findAuthor[0].id }))];
                    case 3:
                        saveAuthor = _a.sent();
                        return [2 /*return*/, saveAuthor];
                }
            });
        });
    };
    Author.prototype.deleteAuthor = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var idNumber, findAuthor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idNumber = Number(id);
                        if (isNaN(idNumber))
                            throw new common_1.HttpException('Need Author id', common_1.HttpStatus.BAD_REQUEST);
                        return [4 /*yield*/, this.getAuthorsById([idNumber])];
                    case 1:
                        findAuthor = _a.sent();
                        if (findAuthor.length <= 0)
                            throw new common_1.HttpException('Author not found', common_1.HttpStatus.NOT_FOUND);
                        return [2 /*return*/, this.author
                                .createQueryBuilder()["delete"]()
                                .where('id = :id', { id: idNumber })
                                .execute()];
                }
            });
        });
    };
    Author.prototype.getAllAuthor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.author.findAndCount()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, {
                                count: data[1],
                                data: data[0]
                            }];
                }
            });
        });
    };
    Author = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(author_entity_1.AuthorEntity))
    ], Author);
    return Author;
}());
exports.Author = Author;
