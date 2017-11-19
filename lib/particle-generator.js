"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParticleGenerator = /** @class */ (function () {
    function ParticleGenerator(options) {
        this.options = options;
        this.index = 0;
        this.startPosition = [];
        this.velocity = [];
        this.startTime = [];
        this.lifeTime = [];
        this.initPool(options);
    }
    ParticleGenerator.prototype.update = function () {
    };
    ParticleGenerator.prototype.getRenderCall = function () {
    };
    ParticleGenerator.prototype.initPool = function (options) {
        var avgLifeSpan = options.lifeTime.min + options.lifeTime.max;
        this.length = (options.particlesSec / (avgLifeSpan / 1000)) * 1.2;
        for (var i = 0; i < this.length; i++) {
            (_a = this.startPosition).push.apply(_a, [0, 0, 0]);
            (_b = this.velocity).push.apply(_b, [0, 0, 0]);
            this.startTime.push(0);
            this.lifeTime.push(0);
        }
        var _a, _b;
    };
    return ParticleGenerator;
}());
exports.ParticleGenerator = ParticleGenerator;
