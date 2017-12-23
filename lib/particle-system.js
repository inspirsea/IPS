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
        this.setVisabilityManagement();
    }
    ParticleSystem.prototype.start = function () {
        this.time = this.getTime();
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
    ParticleSystem.prototype.update = function (delta) {
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
        var loops = 0, skipTicks = 1000 / this.fps, maxFrameSkip = 3, nextGameTick = this.getTime();
        return function () {
            while (_this.getTime() > nextGameTick && loops < maxFrameSkip) {
                var delta = nextGameTick - _this.time;
                _this.time = nextGameTick;
                _this.context.clear(_this.color);
                _this.update(delta);
                _this.render();
                nextGameTick += skipTicks;
            }
            ;
        };
    };
    ParticleSystem.prototype.setVisabilityManagement = function () {
        var _this = this;
        var visibilityChange = "";
        var hidden = "";
        var doc = document;
        if (typeof doc.hidden !== "undefined") {
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        }
        else if (typeof doc.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        }
        else if (typeof doc.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }
        document.addEventListener(visibilityChange, function () {
            if (document[hidden]) {
                _this.stop();
            }
            else {
                _this.start();
            }
        }, false);
    };
    ParticleSystem.prototype.getTime = function () {
        return +Date.now().toString().slice(5);
    };
    return ParticleSystem;
}());
exports.ParticleSystem = ParticleSystem;
