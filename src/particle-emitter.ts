import { Particle } from "./particle";
import { Context } from "./context";
import { Renderer } from "./renderer";
import { RenderCall } from "./model/render-call";
import { IpsEmitterOptions } from "./model/ips-emitter-options";
import { RenderMode } from "./model/render-mode";
import { Util } from "./util/util";
import { IpsInternalEmitterOptions } from "./model/ips-internal-emitter-options";

export class ParticleEmitter {

    private length: number;
    private index: number = 0;
    private startPosition: Float32Array;
    private velocity: Float32Array;
    private startTime: Float32Array;
    private lifeTime: Float32Array;
    private size: Float32Array;
    private growth: number;
    private color: [number, number, number, number];

    private renderer: Renderer;
    private renderCall: RenderCall;
    private updateParticles: (startTime: number) => void;
    private internalOptions: IpsInternalEmitterOptions;

    constructor(private context: Context, private options: IpsEmitterOptions, width: number, height: number) {
        this.internalOptions = Util.toInternalOptions(options, width, height);
        this.renderer = new Renderer(this.context);

        if(this.internalOptions.renderMode == RenderMode.Static) {
            this.updateParticles = this.setTimeValue;
        } else {
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
        }
    }

    public update(delta: number) {
        let nrOfParticles = Math.floor((this.internalOptions.particlesSec / 1000) * delta);
        this.generateParticles(nrOfParticles);
        this.renderCall.startTime = this.startTime;
    }

    public render(time: number) {
        this.renderer.render(this.renderCall, time);
    }

    private initPool(options: IpsInternalEmitterOptions) {
        let avgLifeSpan = (options.lifeTime.min + options.lifeTime.max) / 2;
        this.length = (options.particlesSec / (avgLifeSpan / 1000)) * 1.2;

        this.startPosition = new Float32Array(this.length * 3);
        this.velocity = new Float32Array(this.length * 3);
        this.lifeTime = new Float32Array(this.length);
        this.startTime = new Float32Array(this.length);
        this.size = new Float32Array(this.length);
        this.growth = options.growth;

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