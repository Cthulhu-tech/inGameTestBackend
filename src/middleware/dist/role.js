"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleMiddleware = void 0;
var common_1 = require("@nestjs/common");
var RoleMiddleware = /** @class */ (function () {
    function RoleMiddleware() {
    }
    RoleMiddleware.prototype.use = function (req, res, next) {
        if (req.body.payload.role === 'admin') {
            return next();
        }
        if ((req.body.payload.role === 'user' || !req.body.payload.role) &&
            req.method === 'GET') {
            return next();
        }
        throw new common_1.HttpException('You do not have rights to change', common_1.HttpStatus.FORBIDDEN);
    };
    RoleMiddleware = __decorate([
        common_1.Injectable()
    ], RoleMiddleware);
    return RoleMiddleware;
}());
exports.RoleMiddleware = RoleMiddleware;
