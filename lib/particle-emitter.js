"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var ParticleEmitter = /** @class */ (function () {
    function ParticleEmitter(context, options) {
        this.context = context;
        this.options = options;
        this.index = 0;
        this.renderer = new renderer_1.Renderer(this.context);
        this.initPool(options);
        this.renderCall = {
            startPosition: this.startPosition,
            velocity: this.velocity,
            startTime: this.startTime,
            lifeTime: this.lifeTime,
            color: options.color,
            length: this.length
        };
    }
    ParticleEmitter.prototype.update = function (delta) {
        var nrOfParticles = Math.floor((this.options.particlesSec / 1000) * delta);
        this.generateParticles(nrOfParticles);
        this.renderCall.startTime = this.startTime;
    };
    ParticleEmitter.prototype.render = function (time) {
        this.context.clear([0, 0, 0, 0]);
        this.renderer.render(this.renderCall, time);
    };
    ParticleEmitter.prototype.initPool = function (options) {
        var avgLifeSpan = (options.lifeTime.min + options.lifeTime.max) / 2;
        this.length = (options.particlesSec / (avgLifeSpan / 1000)) * 1.2;
        this.startPosition = new Float32Array(this.length * 3);
        this.velocity = new Float32Array(this.length * 3);
        this.lifeTime = new Float32Array(this.length);
        this.startTime = new Float32Array(this.length);
        for (var i = 0; i < this.length; i++) {
            var startTime = 0;
            var index3 = this.index * 3;
            this.startPosition[index3] = this.rand(this.options.start.min[0], this.options.start.max[0]);
            this.startPosition[index3 + 1] = this.rand(this.options.start.min[1], this.options.start.max[1]);
            this.startPosition[index3 + 2] = 0;
            this.velocity[index3] = this.rand(this.options.velocity.min[0], this.options.velocity.max[0]);
            this.velocity[index3 + 1] = this.rand(this.options.velocity.min[1], this.options.velocity.max[1]);
            this.velocity[index3 + 2] = 0;
            this.startTime[this.index] = startTime;
            this.lifeTime[this.index] = this.rand(this.options.lifeTime.min, this.options.lifeTime.max);
            if (this.index > this.length) {
                this.index = 0;
            }
            else {
                this.index++;
            }
        }
    };
    ParticleEmitter.prototype.generateParticles = function (nrOfParticles) {
        var startTime = +Date.now().toString().slice(5);
        for (var i = 0; i < nrOfParticles; i++) {
            var index3 = this.index * 3;
            this.startPosition[index3] = this.rand(this.options.start.min[0], this.options.start.max[0]);
            this.startPosition[index3 + 1] = this.rand(this.options.start.min[1], this.options.start.max[1]);
            this.startPosition[index3 + 2] = 0;
            this.velocity[index3] = this.rand(this.options.velocity.min[0], this.options.velocity.max[0]);
            this.velocity[index3 + 1] = this.rand(this.options.velocity.min[1], this.options.velocity.max[1]);
            this.velocity[index3 + 2] = 0;
            this.startTime[this.index] = startTime;
            this.lifeTime[this.index] = this.rand(this.options.lifeTime.min, this.options.lifeTime.max);
            if (this.index > this.length) {
                this.index = 0;
            }
            else {
                this.index++;
            }
        }
    };
    ParticleEmitter.prototype.rand = function (min, max) {
        return min + (Math.random() * (max - min));
    };
    return ParticleEmitter;
}());
exports.ParticleEmitter = ParticleEmitter;
