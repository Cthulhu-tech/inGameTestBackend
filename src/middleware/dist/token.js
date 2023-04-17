"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TokenMiddleware = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var common_1 = require("@nestjs/common");
var TokenMiddleware = /** @class */ (function () {
    function TokenMiddleware() {
    }
    TokenMiddleware.prototype.use = function (req, res, next) {
        var payload = {};
        var token = req.headers['authorization'].split(' ')[1];
        try {
            payload = jsonwebtoken_1.verify(token, 'access');
        }
        catch (err) {
            throw new common_1.HttpException('Token not Valid', common_1.HttpStatus.UNAUTHORIZED);
        }
        req.body.payload = payload;
        next();
    };
    TokenMiddleware = __decorate([
        common_1.Injectable()
    ], TokenMiddleware);
    return TokenMiddleware;
}());
exports.TokenMiddleware = TokenMiddleware;
