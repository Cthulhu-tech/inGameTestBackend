"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GenreModule = void 0;
var user_controller_1 = require("./user.controller");
var typeorm_1 = require("@nestjs/typeorm");
var genre_entity_1 = require("./genre.entity");
var common_1 = require("@nestjs/common");
var user_1 = require("./user");
var GenreModule = /** @class */ (function () {
    function GenreModule() {
    }
    GenreModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([genre_entity_1.GenreEntity])],
            controllers: [user_controller_1.GenreController],
            providers: [user_1.Genre]
        })
    ], GenreModule);
    return GenreModule;
}());
exports.GenreModule = GenreModule;