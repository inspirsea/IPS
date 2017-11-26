"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var particle_emitter_1 = require("./particle-emitter");
var context_1 = require("./context");
var util_1 = require("./util/util");
var ParticleSystem = /** @class */ (function () {
    function ParticleSystem(options, canvas, width, height) {
        this.particleEmitters = [];
        this.time = +Date.now().toString().slice(5);
        this.fps = 60;
        this.context = new context_1.Context(options, canvas);
        this.onLoad = this.context.onLoad();
        this.width = width;
        this.height = height;
        var color = util_1.Util.colorHexToGl(options.color);
        this.color = [color[0], color[1], color[2], options.alpha];
    }
    ParticleSystem.prototype.start = function () {
        this.intervalTimer = setInterval(this.run(), 0);
    };
    ParticleSystem.prototype.stop = function () {
        clearInterval(this.intervalTimer);
    };
    ParticleSystem.prototype.setSize = function (width, height) {
        this.width = width;
        this.height = height;
    };
    ParticleSystem.prototype.addEmitter = function (options) {
        var emitter = new particle_emitter_1.ParticleEmitter(this.context, options, this.width, this.height);
        this.particleEmitters.push(emitter);
        return emitter;
    };
    ParticleSystem.prototype.removeEmitter = function (emitter) {
        var index = this.particleEmitters.indexOf(emitter);
        if (index != -1) {
            this.particleEmitters.splice(index, 1);
        }
    };
    ParticleSystem.prototype.update = function () {
        var newTime = +Date.now().toString().slice(5);
        var delta = newTime - this.time;
        this.time = newTime;
        for (var _i = 0, _a = this.particleEmitters; _i < _a.length; _i++) {
            var particleEmitter = _a[_i];
            particleEmitter.update(delta);
        }
    };
    ParticleSystem.prototype.render = function () {
        this.context.clear([0, 0, 0, 0]);
        for (var _i = 0, _a = this.particleEmitters; _i < _a.length; _i++) {
            var particleEmitter = _a[_i];
            particleEmitter.render(this.time);
        }
    };
    ParticleSystem.prototype.run = function () {
        var _this = this;
        var loops = 0, skipTicks = 1000 / this.fps, maxFrameSkip = 3, nextGameTick = (new Date).getTime();
        return function () {
            loops = 0;
            while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
                _this.context.clear(_this.color);
                _this.update();
                _this.render();
                nextGameTick += skipTicks;
            }
            ;
        };
    };
    return ParticleSystem;
}());
exports.ParticleSystem = ParticleSystem;
