import { Context } from "./context";
import { Renderer } from "./renderer";
import { RenderCall } from "./model/render-call";
import { IpsEmitterOptions } from "./model/ips-emitter-options";
import { RenderMode } from "./model/render-mode";
import { Util } from "./util/util";
import { IpsCoordinates } from "./model/ips-coordinates";
import { MinMax } from "./model/min-max";
import { IpsPositiontype } from "./model/ips-positiontype";

export class ParticleEmitter {

    private length: number;
    private index: number = 0;
    private startPosition: Float32Array;
    private velocity: Float32Array;
    private startTime: Float32Array;
    private lifeTime: Float32Array;
    private size: Float32Array;
    private growth: number;
    private renderer: Renderer;
    private renderCall: RenderCall;
    private updateParticles: (startTime: number) => void;
    private deltaLeft: number;

    //Options
    private particlesSec: number;
    private renderMode: RenderMode;
    private positionType: IpsPositiontype;
    private lifeTimeOption: number;
    private color: [number, number, number, number] = [0, 0, 0, 1];
    private alpha: number;

    private set startOption(value: IpsCoordinates) {
        if (this.positionType == IpsPositiontype.Pixel) {
            this._startOption.x.min = Util.pixelToRelative(value.x.min, this.width);
            this._startOption.x.max = Util.pixelToRelative(value.x.max, this.width);
            this._startOption.y.min = Util.pixelToRelative(value.y.min, this.height);
            this._startOption.y.max = Util.pixelToRelative(value.y.max, this.height);
        } else {
            this._startOption = value;
        }
    }

    private get startOption() {
        return this._startOption;
    }

    private _startOption: IpsCoordinates = new IpsCoordinates(0, 0, 0, 0);

    private set velocityOption(value: IpsCoordinates) {
        this._velocityOption.x.min = value.x.min / 1000;
        this._velocityOption.x.max = value.x.max / 1000;
        this._velocityOption.y.min = value.y.min / 1000;
        this._velocityOption.y.max = value.y.max / 1000;
    }

    private get velocityOption() {
        return this._velocityOption;
    }

    private _velocityOption: IpsCoordinates = new IpsCoordinates(0, 0, 0, 0);

    private set growthOption(value: number) {
        this._growthOption = value / 1000;
    }

    private get growthOption() {
        return this._growthOption;
    }

    private _growthOption: number;

    private sizeOption: MinMax<number>;
    private textureKey: string;
    private blendmodeSource: number;
    private blendmodeTarget: number;
    //End options

    constructor(private context: Context, private options: IpsEmitterOptions, private width: number, private height: number) {
        this.renderer = new Renderer(this.context);

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
        }
    }

    private setOptions(options: IpsEmitterOptions) {

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

        if (options.renderMode == RenderMode.Static) {
            this.updateParticles = this.setTimeValue;
        } else {
            this.updateParticles = this.setParticleValues;
        }
    }

    public setStartOption(value: IpsCoordinates) {
        this.startOption = value;
    }

    public setBlendmodeSource(value: number) {
        this.blendmodeSource = value;
    }

    public setBlendmodeTarget(value: number) {
        this.blendmodeTarget = value;
    }

    public setTextureKey(value: string) {
        this.textureKey = value;
    }

    public setSizeOption(value: MinMax<number>) {
        this.sizeOption = value;
    }

    public setVelocityOption(value: IpsCoordinates) {
        this.velocityOption = value;
    }

    public setColor(colorHex: string) {
        let color = Util.colorHexToGl(colorHex);
        this.color[0] = color[0];
        this.color[1] = color[1];
        this.color[2] = color[2];
    }

    public setGrowth(value: number) {
        this.growthOption = value;
        this.renderCall.growth = this.growthOption;
    }

    public update(delta: number) {
        let curentDelta = delta + this.deltaLeft;
        let nrOfParticles = Math.floor((this.particlesSec / 1000) * curentDelta);
        if (nrOfParticles == 0) {
            this.deltaLeft += delta;
        } else {
            this.deltaLeft = 0;
        }
        this.generateParticles(nrOfParticles);
        this.renderCall.startTime = this.startTime;
    }

    public render(time: number) {
        this.renderer.render(this.renderCall, time);
    }

    private initPool(particlesSec: number, lifetime: number, growth: number) {
        this.length = (particlesSec * (lifetime / 1000)) * 1.2;

        this.startPosition = new Float32Array(this.length * 3);
        this.velocity = new Float32Array(this.length * 3);
        this.lifeTime = new Float32Array(this.length);
        this.startTime = new Float32Array(this.length);
        this.size = new Float32Array(this.length);
        this.growth = growth;

        for (let i = 0; i < this.length; i++) {
            this.setParticleValues(0);
        }
    }

    private generateParticles(nrOfParticles: number) {
        let startTime = +Date.now().toString().slice(5);
        for (let i = 0; i < nrOfParticles; i++) {
            this.updateParticles(startTime);
        }
    }

    private setParticleValues(startTime) {
        let index3 = this.index * 3;
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
        } else {
            this.index++;
        }
    }

    private setTimeValue(startTime) {
        this.startTime[this.index] = startTime;

        if (this.index > this.length) {
            this.index = 0;
        } else {
            this.index++;
        }
    }

    private rand(min: number, max: number) {
        return min + (Math.random() * (max - min))
    }
}