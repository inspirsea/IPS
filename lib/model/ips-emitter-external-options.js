"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_mode_1 = require("./render-mode");
var IpsExternalEmitterOptions = /** @class */ (function () {
    function IpsExternalEmitterOptions(start, velocity, particlesSec) {
        this.start = start;
        this.velocity = velocity;
        this.particlesSec = particlesSec;
        this.lifeTime = { min: 1000, max: 1000 };
        this.size = { min: 10, max: 10 };
        this.renderMode = render_mode_1.RenderMode.Dynamic;
    }
    return IpsExternalEmitterOptions;
}());
exports.IpsExternalEmitterOptions = IpsExternalEmitterOptions;
