"use strict";
exports.__esModule = true;
exports.CheckType = void 0;
var common_1 = require("@nestjs/common");
var CheckType = /** @class */ (function () {
    function CheckType() {
    }
    CheckType.prototype.checkType = function (array, type, field) {
        var typeSet = new Set(array.map(function (x) { return typeof x; }));
        if (typeSet.size > 1 || typeof array[0] !== "" + type)
            throw new common_1.HttpException('All fields must be of data type ' +
                type.toUpperCase() +
                '. Field: ' +
                field, common_1.HttpStatus.BAD_REQUEST);
    };
    return CheckType;
}());
exports.CheckType = CheckType;
