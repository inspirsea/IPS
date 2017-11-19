"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var particle_emitter_1 = require("./particle-emitter");
var context_1 = require("./context");
var ParticleSystem = /** @class */ (function () {
    function ParticleSystem(options, canvas) {
        this.particleEmitters = [];
        this.time = +Date.now().toString().slice(5);
        this.context = new context_1.Context(options, canvas);
        this.onLoad = this.context.onLoad();
    }
    ParticleSystem.prototype.addEmitter = function (options) {
        this.particleEmitters.push(new particle_emitter_1.ParticleEmitter(this.context, options));
    };
    ParticleSystem.prototype.update = function () {
        var newTime = +Date.now().toString().slice(5);
        this.delta = newTime - this.time;
        this.time = newTime;
        for (var _i = 0, _a = this.particleEmitters; _i < _a.length; _i++) {
            var particleEmitter = _a[_i];
            particleEmitter.update(this.delta);
        }
    };
    ParticleSystem.prototype.render = function () {
        for (var _i = 0, _a = this.particleEmitters; _i < _a.length; _i++) {
            var particleEmitter = _a[_i];
            particleEmitter.render(this.time);
        }
    };
    return ParticleSystem;
}());
exports.ParticleSystem = ParticleSystem;
