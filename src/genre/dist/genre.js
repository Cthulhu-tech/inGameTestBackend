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
exports.Genre = void 0;
var common_1 = require("@nestjs/common");
var genre_1 = require("src/utils/mysql/seed/genre");
var checkType_1 = require("src/utils/check/checkType");
var genre_entity_1 = require("src/genre/genre.entity");
var typeorm_1 = require("@nestjs/typeorm");
var Genre = /** @class */ (function () {
    function Genre(genres) {
        this.genres = genres;
        this.check = new checkType_1.CheckType();
    }
    // find genre
    Genre.prototype.findGenre = function (bodyGenre) {
        return __awaiter(this, void 0, void 0, function () {
            var genres;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        genres = __assign({}, bodyGenre);
                        delete genres.id;
                        return [4 /*yield*/, this.genres.find({
                                where: genres
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // create genre
    Genre.prototype._createGenre = function (bodyGenre) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.genres.create(bodyGenre)];
            });
        });
    };
    // return array genre
    Genre.prototype.getGenreById = function (genres) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.check.checkType(genres, 'number', 'Genres');
                return [2 /*return*/, this.genres
                        .createQueryBuilder()
                        .where('id IN (:...id)', {
                        id: genres
                    })
                        .getMany()];
            });
        });
    };
    // retur all genre
    Genre.prototype.getAllGenre = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.genres.findAndCount()];
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
    // get method :id
    Genre.prototype.getGenreByIdGet = function (genres) {
        return __awaiter(this, void 0, void 0, function () {
            var genre;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.genres
                            .createQueryBuilder()
                            .where('id IN (:id)', {
                            id: genres
                        })
                            .getOne()];
                    case 1:
                        genre = _a.sent();
                        if (!genre)
                            throw new common_1.HttpException('Genre not found. Genre id: ' + genres, common_1.HttpStatus.NOT_FOUND);
                        return [2 /*return*/, genre];
                }
            });
        });
    };
    // delete method
    Genre.prototype.deleteGenreById = function (genres) {
        return __awaiter(this, void 0, void 0, function () {
            var idNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idNumber = Number(genres);
                        if (isNaN(idNumber))
                            throw new common_1.HttpException('Need Genre id', common_1.HttpStatus.BAD_REQUEST);
                        return [4 /*yield*/, this.getGenreByIdGet(idNumber)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.genres
                                .createQueryBuilder()["delete"]()
                                .where('id = :id', { id: idNumber })
                                .execute()];
                }
            });
        });
    };
    // patch method
    Genre.prototype.updateGenreByIdPatch = function (bodyGenre) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (Object.keys(bodyGenre).length <= 1)
                    throw new common_1.HttpException('At least one value is required', common_1.HttpStatus.BAD_REQUEST);
                return [2 /*return*/, this.updateGenreByIdPut(bodyGenre)];
            });
        });
    };
    // put method
    Genre.prototype.updateGenreByIdPut = function (bodyGenre) {
        return __awaiter(this, void 0, void 0, function () {
            var findGenre, newGenre;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isNaN(bodyGenre.id))
                            throw new common_1.HttpException('Need Author id', common_1.HttpStatus.BAD_REQUEST);
                        if (!bodyGenre.title)
                            throw new common_1.HttpException('Fill in all the fields', common_1.HttpStatus.BAD_REQUEST);
                        return [4 /*yield*/, this.getGenreByIdGet(bodyGenre.id)];
                    case 1:
                        findGenre = _a.sent();
                        findGenre.title = bodyGenre.title;
                        return [4 /*yield*/, this._createGenre(findGenre)];
                    case 2:
                        newGenre = _a.sent();
                        return [4 /*yield*/, this.genres.save(newGenre)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // post method
    Genre.prototype.createGenre = function (bodyGenre) {
        return __awaiter(this, void 0, void 0, function () {
            var findGenre, newGenre;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!bodyGenre.title)
                            throw new common_1.HttpException('Fill in all the fields', common_1.HttpStatus.BAD_REQUEST);
                        return [4 /*yield*/, this.findGenre(bodyGenre)];
                    case 1:
                        findGenre = _a.sent();
                        if (findGenre[0])
                            throw new common_1.HttpException('This Genre already exists. Genre Id: ' + findGenre[0].id, common_1.HttpStatus.BAD_REQUEST);
                        return [4 /*yield*/, this._createGenre(bodyGenre)];
                    case 2:
                        newGenre = _a.sent();
                        return [4 /*yield*/, this.genres.save(newGenre)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // only start
    Genre.prototype.create = function () {
        var _this = this;
        return genre_1.GenreArray.map(function (genre) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.genres
                            .findOneBy({
                            title: genre.title
                        })
                            .then(function (dbGenre) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if (dbGenre) {
                                            return [2 /*return*/, Promise.resolve(null)];
                                        }
                                        _b = (_a = Promise).resolve;
                                        return [4 /*yield*/, this.genres.save(genre)];
                                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                                }
                            });
                        }); })["catch"](function (error) { return Promise.reject(error); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
    };
    Genre = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(genre_entity_1.GenreEntity))
    ], Genre);
    return Genre;
}());
exports.Genre = Genre;
