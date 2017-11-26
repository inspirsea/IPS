"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var render_mode_1 = require("./model/render-mode");
var util_1 = require("./util/util");
var ips_coordinates_1 = require("./model/ips-coordinates");
var ips_position_type_1 = require("./model/ips-position-type");
var ParticleEmitter = /** @class */ (function () {
    //End options
    function ParticleEmitter(context, options, width, height) {
        this.context = context;
        this.options = options;
        this.width = width;
        this.height = height;
        this.index = 0;
        this._startOption = new ips_coordinates_1.IpsCoordinates(0, 0, 0, 0);
        this._velocityOption = new ips_coordinates_1.IpsCoordinates(0, 0, 0, 0);
        this.renderer = new renderer_1.Renderer(this.context);
        this.setOptions(options);
        this.initPool(this.particlesSec, this.lifeTimeOption, this.growthOption);
        this.renderCall = {
            startPosition: this.startPosition,
            velocity: this.velocity,
            startTime: this.startTime,
            lifeTime: this.lifeTime,
            size: this.size,
            color: this.color,
            length: this.length,
            growth: this.growth,
            textureKey: this.textureKey,
            blendmodeSource: this.blendmodeSource,
            blendmodeTarget: this.blendmodeTarget
        };
    }
    Object.defineProperty(ParticleEmitter.prototype, "startOption", {
        get: function () {
            return this._startOption;
        },
        set: function (value) {
            if (this.positionType == ips_position_type_1.IpsPositionType.Pixel) {
                this._startOption.x.min = util_1.Util.pixelToRelative(value.x.min, this.width);
                this._startOption.x.max = util_1.Util.pixelToRelative(value.x.max, this.width);
                this._startOption.y.min = util_1.Util.pixelToRelative(value.x.min, this.height);
                this._startOption.y.max = util_1.Util.pixelToRelative(value.x.max, this.height);
            }
            else {
                this._startOption = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleEmitter.prototype, "velocityOption", {
        get: function () {
            return this._velocityOption;
        },
        set: function (value) {
            this._velocityOption.x.min = value.x.min / 1000;
            this._velocityOption.x.max = value.x.max / 1000;
            this._velocityOption.y.min = value.y.min / 1000;
            this._velocityOption.y.max = value.y.max / 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleEmitter.prototype, "growthOption", {
        get: function () {
            return this._growthOption;
        },
        set: function (value) {
            this._growthOption = value / 1000;
        },
        enumerable: true,
        configurable: true
    });
    ParticleEmitter.prototype.setOptions = function (options) {
        this.positionType = options.positionType;
        this.startOption = options.startPosition;
        this.velocityOption = options.velocity;
        this.lifeTimeOption = options.lifeTime;
        this.sizeOption = options.size;
        this.growthOption = options.growth;
        this.lifeTimeOption = options.lifeTime;
        this.sizeOption = options.size;
        this.particlesSec = options.particlesSec;
        this.textureKey = options.textureKey;
        this.blendmodeSource = options.blendmodeSource;
        this.blendmodeTarget = options.blendmodeTarget;
        this.alpha = options.alpha;
        this.setColor(options.color);
        if (options.renderMode == render_mode_1.RenderMode.Static) {
            this.updateParticles = this.setTimeValue;
        }
        else {
            this.updateParticles = this.setParticleValues;
        }
    };
    ParticleEmitter.prototype.setColor = function (colorHex) {
        var color = util_1.Util.colorHexToGl(colorHex);
        this.color = [color[0], color[1], color[2], this.alpha];
    };
    ParticleEmitter.prototype.update = function (delta) {
        var curentDelta = delta + this.deltaLeft;
        var nrOfParticles = Math.floor((this.particlesSec / 1000) * curentDelta);
        if (nrOfParticles == 0) {
            this.deltaLeft += delta;
        }
        else {
            this.deltaLeft = 0;
        }
        this.generateParticles(nrOfParticles);
        this.renderCall.startTime = this.startTime;
    };
    ParticleEmitter.prototype.render = function (time) {
        this.renderer.render(this.renderCall, time);
    };
    ParticleEmitter.prototype.initPool = function (particlesSec, lifetime, growth) {
        this.length = (particlesSec * (lifetime / 1000)) * 1.2;
        this.startPosition = new Float32Array(this.length * 3);
        this.velocity = new Float32Array(this.length * 3);
        this.lifeTime = new Float32Array(this.length);
        this.startTime = new Float32Array(this.length);
        this.size = new Float32Array(this.length);
        this.growth = growth;
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
        this.startPosition[index3] = this.rand(this.startOption.x.min, this.startOption.x.max);
        this.startPosition[index3 + 1] = this.rand(this.startOption.y.min, this.startOption.y.max);
        this.startPosition[index3 + 2] = 0;
        this.velocity[index3] = this.rand(this.velocityOption.x.min, this.velocityOption.x.max);
        this.velocity[index3 + 1] = this.rand(this.velocityOption.y.min, this.velocityOption.y.max);
        this.velocity[index3 + 2] = 0;
        this.size[this.index] = this.rand(this.sizeOption.min, this.sizeOption.max);
        this.startTime[this.index] = startTime;
        this.lifeTime[this.index] = this.lifeTimeOption;
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
