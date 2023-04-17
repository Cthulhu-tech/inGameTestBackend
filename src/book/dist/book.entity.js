"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BookEntity = void 0;
var author_entity_1 = require("src/author/author.entity");
var genre_entity_1 = require("src/genre/genre.entity");
var typeorm_1 = require("typeorm");
var BookEntity = /** @class */ (function () {
    function BookEntity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], BookEntity.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], BookEntity.prototype, "title");
    __decorate([
        typeorm_1.Column()
    ], BookEntity.prototype, "year_of_issue");
    __decorate([
        typeorm_1.Column()
    ], BookEntity.prototype, "edition");
    __decorate([
        typeorm_1.ManyToMany(function () { return author_entity_1.AuthorEntity; }, function (authors) { return authors.books; }, {
            cascade: ['insert', 'update'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }),
        typeorm_1.JoinTable({
            name: 'book_and_author'
        })
    ], BookEntity.prototype, "authors");
    __decorate([
        typeorm_1.ManyToMany(function () { return genre_entity_1.GenreEntity; }, function (genres) { return genres.book; }, {
            cascade: ['insert', 'update'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }),
        typeorm_1.JoinTable({
            name: 'book_and_genre'
        })
    ], BookEntity.prototype, "genre");
    BookEntity = __decorate([
        typeorm_1.Entity()
    ], BookEntity);
    return BookEntity;
}());
exports.BookEntity = BookEntity;
