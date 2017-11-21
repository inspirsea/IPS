"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var particle_emitter_1 = require("./particle-emitter");
var context_1 = require("./context");
var ParticleSystem = /** @class */ (function () {
    function ParticleSystem(options, canvas, width, height) {
        this.particleEmitters = [];
        this.time = +Date.now().toString().slice(5);
        this.context = new context_1.Context(options, canvas);
        this.onLoad = this.context.onLoad();
        this.width = width;
        this.height = height;
    }
    ParticleSystem.prototype.setSize = function (width, height) {
        this.width = width;
        this.height = height;
    };
    ParticleSystem.prototype.addEmitter = function (options) {
        this.particleEmitters.push(new particle_emitter_1.ParticleEmitter(this.context, options, this.width, this.height));
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
        this.context.clear([0, 0, 0, 0]);
        for (var _i = 0, _a = this.particleEmitters; _i < _a.length; _i++) {
            var particleEmitter = _a[_i];
            particleEmitter.render(this.time);
        }
    };
    return ParticleSystem;
}());
exports.ParticleSystem = ParticleSystem;
