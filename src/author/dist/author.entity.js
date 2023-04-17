"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthorEntity = void 0;
var book_entity_1 = require("src/book/book.entity");
var typeorm_1 = require("typeorm");
var AuthorEntity = /** @class */ (function () {
    function AuthorEntity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], AuthorEntity.prototype, "id");
    __decorate([
        typeorm_1.Column({ name: 'firstName' })
    ], AuthorEntity.prototype, "firstName");
    __decorate([
        typeorm_1.Column({ name: 'lastName' })
    ], AuthorEntity.prototype, "lastName");
    __decorate([
        typeorm_1.Column({
            type: 'date',
            nullable: true,
            name: 'dob'
        })
    ], AuthorEntity.prototype, "dob");
    __decorate([
        typeorm_1.ManyToMany(function () { return book_entity_1.BookEntity; }, function (books) { return books.authors; }, {
            cascade: ['insert', 'update'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }),
        typeorm_1.JoinTable({
            name: 'book_and_author'
        })
    ], AuthorEntity.prototype, "books");
    AuthorEntity = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique(['firstName', 'lastName', 'dob'])
    ], AuthorEntity);
    return AuthorEntity;
}());
exports.AuthorEntity = AuthorEntity;
