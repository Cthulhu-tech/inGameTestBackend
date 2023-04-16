"use strict";
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
exports.Book = void 0;
var common_1 = require("@nestjs/common");
var author_entity_1 = require("src/author/author.entity");
var genre_entity_1 = require("src/genre/genre.entity");
var typeorm_1 = require("@nestjs/typeorm");
var book_entity_1 = require("./book.entity");
var author_1 = require("src/author/author");
var genre_1 = require("src/genre/genre");
var Book = /** @class */ (function () {
    function Book(book, author, genre) {
        this.book = book;
        this.author = author;
        this.genre = genre;
        this._author = new author_1.Author(this.author);
        this._genre = new genre_1.Genre(this.genre);
    }
    Book.prototype.createBook = function (bodyBook) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.book.create(bodyBook)];
            });
        });
    };
    Book.prototype.getBookById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.book
                            .createQueryBuilder('book')
                            .leftJoinAndSelect('book.authors', 'authors')
                            .leftJoinAndSelect('book.genre', 'genre')
                            .where('book.id = :id', { id: id })
                            .getManyAndCount()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Book.prototype.getAllBook = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.book.findAndCount()];
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
    Book.prototype.saveBook = function (bodyBook) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _book, findAuthor, findGanre, id, findBookData;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!bodyBook.authors ||
                            ((_a = bodyBook.authors) === null || _a === void 0 ? void 0 : _a.length) <= 0 ||
                            !bodyBook.edition ||
                            !bodyBook.genre ||
                            ((_b = bodyBook.genre) === null || _b === void 0 ? void 0 : _b.length) <= 0 ||
                            !bodyBook.title ||
                            !bodyBook.year_of_issue)
                            throw new common_1.HttpException('Fill in all the fields', common_1.HttpStatus.BAD_REQUEST);
                        _book = {};
                        return [4 /*yield*/, this._author.getAuthorsById(bodyBook.authors)];
                    case 1:
                        findAuthor = _c.sent();
                        if (findAuthor.length < bodyBook.authors.length)
                            throw new common_1.HttpException('', common_1.HttpStatus.NOT_FOUND);
                        return [4 /*yield*/, this._genre.getGenreById(bodyBook.genre)];
                    case 2:
                        findGanre = _c.sent();
                        if (findGanre.length < bodyBook.genre.length)
                            throw new common_1.HttpException('', common_1.HttpStatus.NOT_FOUND);
                        _book.title = bodyBook.title;
                        _book.edition = bodyBook.edition;
                        _book.year_of_issue = bodyBook.year_of_issue;
                        _book.authors = findAuthor;
                        _book.genre = findGanre;
                        return [4 /*yield*/, this.book.save(_book)];
                    case 3:
                        id = (_c.sent()).id;
                        return [4 /*yield*/, this.getBookById([id])];
                    case 4:
                        findBookData = _c.sent();
                        return [2 /*return*/, {
                                data: findBookData[0],
                                count: findBookData[1]
                            }];
                }
            });
        });
    };
    Book.prototype.deleteBook = function (bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var findBook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!bookId || isNaN(Number(bookId)))
                            throw new common_1.HttpException('Need book id', common_1.HttpStatus.BAD_REQUEST);
                        return [4 /*yield*/, this.getBookById([bookId])];
                    case 1:
                        findBook = _a.sent();
                        if (findBook[1] <= 0)
                            throw new common_1.HttpException('Book: ' + bookId + ' - not found', common_1.HttpStatus.BAD_REQUEST);
                        return [2 /*return*/, this.book
                                .createQueryBuilder()["delete"]()
                                .where('id = :id', { id: bookId })
                                .execute()];
                }
            });
        });
    };
    Book.prototype.updateBook = function (bodyBook) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ''];
            });
        });
    };
    Book = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(book_entity_1.BookEntity)),
        __param(1, typeorm_1.InjectRepository(author_entity_1.AuthorEntity)),
        __param(2, typeorm_1.InjectRepository(genre_entity_1.GenreEntity))
    ], Book);
    return Book;
}());
exports.Book = Book;
