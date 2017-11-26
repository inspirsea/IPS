import { Particle } from "./particle";
import { Context } from "./context";
import { Renderer } from "./renderer";
import { RenderCall } from "./model/render-call";
import { IpsEmitterOptions } from "./model/ips-emitter-options";
import { RenderMode } from "./model/render-mode";
import { Util } from "./util/util";
import { IpsInternalEmitterOptions } from "./model/ips-internal-emitter-options";
import { IpsCoordinates } from "./model/ips-coordinates";
import { MinMax } from "./model/min-max";
import { IpsPositionType } from "./model/ips-position-type";

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
    private positionType: IpsPositionType;
    private lifeTimeOption: number;
    private color: [number, number, number, number];
    private alpha: number;

    public set startOption(value: IpsCoordinates) {
        if(this.positionType == IpsPositionType.Pixel) {
            this._startOption.x.min = Util.pixelToRelative(value.x.min, this.width);
            this._startOption.x.max = Util.pixelToRelative(value.x.max, this.width);
            this._startOption.y.min = Util.pixelToRelative(value.x.min, this.height);
            this._startOption.y.max = Util.pixelToRelative(value.x.max, this.height);
        } else {
            this._startOption = value;
        }
    }

    public get startOption() {
        return this._startOption;
    }

    private _startOption: IpsCoordinates = new IpsCoordinates(0, 0, 0, 0);

    public set velocityOption(value: IpsCoordinates) {
        this._velocityOption.x.min = value.x.min/1000;
        this._velocityOption.x.max = value.x.max/1000;
        this._velocityOption.y.min = value.y.min/1000;
        this._velocityOption.y.max = value.y.max/1000;
    }

    public get velocityOption() {
        return this._velocityOption;
    }
    
    private _velocityOption: IpsCoordinates = new IpsCoordinates(0, 0, 0, 0);

    public set growthOption(value: number) {
        this._growthOption = value/1000;
    }

    public get growthOption() {
        return this._growthOption;
    }

    private _growthOption: number;

    
    public sizeOption: MinMax<number>;
    public textureKey: string;
    public blendmodeSource: number;
    public blendmodeTarget: number;
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

    public setColor(colorHex: string) {
        let color = Util.colorHexToGl(colorHex);
        this.color = [color[0], color[1], color[2], this.alpha];
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