"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Particle = /** @class */ (function () {
    function Particle(lifeTime, startTime, startPosition, velocity) {
        this.lifeTime = lifeTime;
        this.startTime = startTime;
        this.startPosition = startPosition;
        this.velocity = velocity;
    }
    return Particle;
}());
exports.Particle = Particle;
