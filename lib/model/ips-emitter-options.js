"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_mode_1 = require("./render-mode");
var ips_position_type_1 = require("./ips-position-type");
var IpsEmitterOptions = /** @class */ (function () {
    function IpsEmitterOptions(startPosition, velocity, particlesSec, lifeTime, size, growth, color, alpha, renderMode, blendmodeSource, blendmodeTarget, positionType, textureKey) {
        if (lifeTime === void 0) { lifeTime = 1000; }
        if (size === void 0) { size = { min: 10, max: 10 }; }
        if (growth === void 0) { growth = 0; }
        if (color === void 0) { color = "ffffff"; }
        if (alpha === void 0) { alpha = 1; }
        if (renderMode === void 0) { renderMode = render_mode_1.RenderMode.Dynamic; }
        if (blendmodeSource === void 0) { blendmodeSource = WebGLRenderingContext.SRC_ALPHA; }
        if (blendmodeTarget === void 0) { blendmodeTarget = WebGLRenderingContext.ONE; }
        if (positionType === void 0) { positionType = ips_position_type_1.IpsPositionType.Pixel; }
        this.startPosition = startPosition;
        this.velocity = velocity;
        this.particlesSec = particlesSec;
        this.lifeTime = lifeTime;
        this.size = size;
        this.growth = growth;
        this.color = color;
        this.alpha = alpha;
        this.renderMode = renderMode;
        this.blendmodeSource = blendmodeSource;
        this.blendmodeTarget = blendmodeTarget;
        this.positionType = positionType;
        this.textureKey = textureKey;
    }
    return IpsEmitterOptions;
}());
exports.IpsEmitterOptions = IpsEmitterOptions;
