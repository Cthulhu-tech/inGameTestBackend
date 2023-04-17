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
exports.User = void 0;
var common_1 = require("@nestjs/common");
var user_1 = require("src/utils/mysql/seed/user");
var typeorm_1 = require("@nestjs/typeorm");
var jsonwebtoken_1 = require("jsonwebtoken");
var user_entity_1 = require("./user.entity");
var bcrypt_1 = require("bcrypt");
var User = /** @class */ (function () {
    function User(user) {
        this.user = user;
    }
    User.prototype.findUser = function (bodyUser) {
        return __awaiter(this, void 0, void 0, function () {
            var _user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _user = __assign({}, bodyUser);
                        delete _user.password;
                        return [4 /*yield*/, this.user.findOne({
                                where: _user
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    User.prototype.createAccessToken = function (bodyUser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, jsonwebtoken_1.sign({ userId: bodyUser.id, role: bodyUser.role }, 'access', {
                        expiresIn: '15m'
                    })];
            });
        });
    };
    User.prototype.createRefreshToken = function (bodyUser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, jsonwebtoken_1.sign({ userId: bodyUser.id, role: bodyUser.role }, 'refresh', {
                        expiresIn: '7d'
                    })];
            });
        });
    };
    User.prototype.setRefreshToken = function (res, token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.cookie('refreshtoken', token, {
                    httpOnly: true,
                    path: '/',
                    expires: new Date(Date.now() + 432000000)
                });
                return [2 /*return*/];
            });
        });
    };
    User.prototype.refresh = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _refreshToken, payload, findUser, access, refresh, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        _refreshToken = req === null || req === void 0 ? void 0 : req.cookies['refreshtoken'];
                        payload = jsonwebtoken_1.verify(_refreshToken, 'refresh');
                        return [4 /*yield*/, this.findUser({
                                id: payload.userId,
                                role: payload.role
                            })];
                    case 1:
                        findUser = _a.sent();
                        if (findUser.refresh !== _refreshToken)
                            throw new common_1.HttpException('Token not Valid', common_1.HttpStatus.UNAUTHORIZED);
                        return [4 /*yield*/, this.createAccessToken(findUser)];
                    case 2:
                        access = _a.sent();
                        return [4 /*yield*/, this.createRefreshToken(findUser)];
                    case 3:
                        refresh = _a.sent();
                        return [4 /*yield*/, this.setRefreshToken(res, refresh)];
                    case 4:
                        _a.sent();
                        findUser.refresh = refresh;
                        return [4 /*yield*/, this.user.save(findUser)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, {
                                access: access
                            }];
                    case 6:
                        err_1 = _a.sent();
                        throw new common_1.HttpException('Token not Valid', common_1.HttpStatus.UNAUTHORIZED);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.login = function (bodyUser, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findUser, valid, access, refresh;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!bodyUser.email || !bodyUser.password)
                            throw new common_1.HttpException('Fill in all the fields', common_1.HttpStatus.BAD_REQUEST);
                        return [4 /*yield*/, this.findUser(bodyUser)];
                    case 1:
                        findUser = _a.sent();
                        if (!findUser)
                            throw new common_1.HttpException('User not found or Password not correct', common_1.HttpStatus.BAD_REQUEST);
                        return [4 /*yield*/, bcrypt_1.compare(bodyUser.password, findUser.password)];
                    case 2:
                        valid = _a.sent();
                        if (!valid)
                            throw new common_1.HttpException('User not found or Password not correct', common_1.HttpStatus.BAD_REQUEST);
                        bodyUser.id = findUser.id;
                        bodyUser.role = findUser.role;
                        return [4 /*yield*/, this.createAccessToken(bodyUser)];
                    case 3:
                        access = _a.sent();
                        return [4 /*yield*/, this.createRefreshToken(bodyUser)];
                    case 4:
                        refresh = _a.sent();
                        return [4 /*yield*/, this.setRefreshToken(res, refresh)];
                    case 5:
                        _a.sent();
                        findUser.refresh = refresh;
                        return [4 /*yield*/, this.user.save(findUser)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, {
                                access: access
                            }];
                }
            });
        });
    };
    // only start
    User.prototype.create = function () {
        var _this = this;
        return user_1.UserArray.map(function (user) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user
                            .findOneBy({
                            email: user.email
                        })
                            .then(function (dbUser) { return __awaiter(_this, void 0, void 0, function () {
                            var hashedPassword, _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if (dbUser) {
                                            return [2 /*return*/, Promise.resolve(null)];
                                        }
                                        return [4 /*yield*/, bcrypt_1.hash(user.password, 10)];
                                    case 1:
                                        hashedPassword = _c.sent();
                                        user.password = hashedPassword;
                                        _b = (_a = Promise).resolve;
                                        return [4 /*yield*/, this.user.save(user)];
                                    case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                                }
                            });
                        }); })["catch"](function (error) { return Promise.reject(error); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
    };
    User = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity))
    ], User);
    return User;
}());
exports.User = User;