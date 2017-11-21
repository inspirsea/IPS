"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.toInternalOptions = function (options, width, height) {
        var glColor = Util.colorHexToGl(options.color);
        var internalOptions = {
            start: {
                x: {
                    min: Util.pixelToRelative(options.start.x.min, width),
                    max: Util.pixelToRelative(options.start.x.max, width)
                },
                y: {
                    min: Util.pixelToRelative(options.start.y.min, height),
                    max: Util.pixelToRelative(options.start.y.max, height),
                }
            },
            velocity: {
                x: {
                    min: options.velocity.x.min / 1000,
                    max: options.velocity.x.max / 1000
                },
                y: {
                    min: options.velocity.y.min / 1000,
                    max: options.velocity.y.max / 1000,
                }
            },
            lifeTime: { min: options.lifeTime.min, max: options.lifeTime.max },
            size: { min: options.size.min, max: options.size.max },
            growth: options.growth / 1000,
            color: [glColor[0], glColor[1], glColor[2], options.alpha],
            particlesSec: options.particlesSec,
            renderMode: options.renderMode
        };
        return internalOptions;
    };
    Util.colorHexToGl = function (hexcolor) {
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
