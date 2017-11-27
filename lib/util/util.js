"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.colorHexToGl = function (hexcolor) {
        if (hexcolor[0] == "#") {
            hexcolor = hexcolor.substr(1);
        }
        var r = parseInt(hexcolor.slice(0, 2), 16);
        var g = parseInt(hexcolor.slice(2, 4), 16);
        var b = parseInt(hexcolor.slice(4, 6), 16);
        return [r / 255, g / 255, b / 255];
    };
    Util.pixelToRelative = function (pixel, total) {
        var half = total / 2;
        pixel = pixel - half;
        pixel = pixel / half;
        return pixel;
    };
    return Util;
}());
exports.Util = Util;
