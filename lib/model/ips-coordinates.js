"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IpsCoordinates = /** @class */ (function () {
    function IpsCoordinates(xmin, xmax, ymin, ymax) {
        this.x = {
            min: xmin,
            max: xmax
        };
        this.y = {
            min: ymin,
            max: ymax
        };
    }
    return IpsCoordinates;
}());
exports.IpsCoordinates = IpsCoordinates;
