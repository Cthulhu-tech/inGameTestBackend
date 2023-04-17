"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var connect_1 = require("./utils/mysql/connect");
var author_module_1 = require("./author/author.module");
var genre_module_1 = require("./genre/genre.module");
var book_module_1 = require("./book/book.module");
var user_module_1 = require("./user/user.module");
var envConfig_1 = require("./utils/env/envConfig");
var token_1 = require("./middleware/token");
var common_1 = require("@nestjs/common");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer
            .apply(token_1.TokenMiddleware)
            .exclude({ path: '/user/login', method: common_1.RequestMethod.POST }, { path: '/user/refresh', method: common_1.RequestMethod.POST }, { path: '/genre', method: common_1.RequestMethod.GET }, { path: '/author', method: common_1.RequestMethod.GET }, { path: '/book', method: common_1.RequestMethod.GET }, { path: '/genre/:id', method: common_1.RequestMethod.GET }, { path: '/author/:id', method: common_1.RequestMethod.GET }, { path: '/book/:id', method: common_1.RequestMethod.GET })
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    };
    AppModule = __decorate([
        common_1.Module({
            imports: [
                envConfig_1.EnvConfig,
                connect_1.OrmConnection,
                book_module_1.BookModule,
                author_module_1.AuthorModule,
                genre_module_1.GenreModule,
                user_module_1.UserModule,
            ],
            controllers: [],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
