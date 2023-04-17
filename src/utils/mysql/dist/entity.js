"use strict";
exports.__esModule = true;
exports.Entities = void 0;
var author_entity_1 = require("src/author/author.entity");
var genre_entity_1 = require("src/genre/genre.entity");
var book_entity_1 = require("src/book/book.entity");
var user_entity_1 = require("src/user/user.entity");
var text_entity_1 = require("src/text/text.entity");
exports.Entities = [
    author_entity_1.AuthorEntity,
    book_entity_1.BookEntity,
    genre_entity_1.GenreEntity,
    user_entity_1.UserEntity,
    text_entity_1.TextEntity,
];
