"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var render_mode_1 = require("./model/render-mode");
var util_1 = require("./util/util");
var ParticleEmitter = /** @class */ (function () {
    function ParticleEmitter(context, options, width, height) {
        this.context = context;
        this.options = options;
        this.index = 0;
        this.internalOptions = util_1.Util.toInternalOptions(options, width, height);
        this.renderer = new renderer_1.Renderer(this.context);
        if (this.internalOptions.renderMode == render_mode_1.RenderMode.Static) {
            this.updateParticles = this.setTimeValue;
        }
        else {
            this.updateParticles = this.setParticleValues;
        }
        this.initPool(this.internalOptions);
        this.renderCall = {
            startPosition: this.startPosition,
            velocity: this.velocity,
            startTime: this.startTime,
            lifeTime: this.lifeTime,
            size: this.size,
            color: this.internalOptions.color,
            length: this.length,
            growth: this.growth
        };
    }
    ParticleEmitter.prototype.update = function (delta) {
        var nrOfParticles = Math.floor((this.internalOptions.particlesSec / 1000) * delta);
        this.generateParticles(nrOfParticles);
        this.renderCall.startTime = this.startTime;
    };
    ParticleEmitter.prototype.render = function (time) {
        this.renderer.render(this.renderCall, time);
    };
    ParticleEmitter.prototype.initPool = function (options) {
        var avgLifeSpan = (options.lifeTime.min + options.lifeTime.max) / 2;
        this.length = (options.particlesSec / (avgLifeSpan / 1000)) * 1.2;
        this.startPosition = new Float32Array(this.length * 3);
        this.velocity = new Float32Array(this.length * 3);
        this.lifeTime = new Float32Array(this.length);
        this.startTime = new Float32Array(this.length);
        this.size = new Float32Array(this.length);
        this.growth = options.growth;
        for (var i = 0; i < this.length; i++) {
            this.setParticleValues(0);
        }
    };
    ParticleEmitter.prototype.generateParticles = function (nrOfParticles) {
        var startTime = +Date.now().toString().slice(5);
        for (var i = 0; i < nrOfParticles; i++) {
            this.updateParticles(startTime);
        }
    };
    ParticleEmitter.prototype.setParticleValues = function (startTime) {
        var index3 = this.index * 3;
        this.startPosition[index3] = this.rand(this.internalOptions.start.x.min, this.internalOptions.start.x.max);
        this.startPosition[index3 + 1] = this.rand(this.internalOptions.start.y.min, this.internalOptions.start.y.max);
        this.startPosition[index3 + 2] = 0;
        this.velocity[index3] = this.rand(this.internalOptions.velocity.x.min, this.internalOptions.velocity.x.max);
        this.velocity[index3 + 1] = this.rand(this.internalOptions.velocity.y.min, this.internalOptions.velocity.y.max);
        this.velocity[index3 + 2] = 0;
        this.size[this.index] = this.rand(this.internalOptions.size.min, this.internalOptions.size.max);
        this.startTime[this.index] = startTime;
        this.lifeTime[this.index] = this.rand(this.internalOptions.lifeTime.min, this.internalOptions.lifeTime.max);
        if (this.index > this.length) {
            this.index = 0;
        }
        else {
            this.index++;
        }
    };
    ParticleEmitter.prototype.setTimeValue = function (startTime) {
        this.startTime[this.index] = startTime;
        if (this.index > this.length) {
            this.index = 0;
        }
        else {
            this.index++;
        }
    };
    ParticleEmitter.prototype.rand = function (min, max) {
        return min + (Math.random() * (max - min));
    };
    return ParticleEmitter;
}());
exports.ParticleEmitter = ParticleEmitter;
