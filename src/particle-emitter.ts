import { Particle } from "./particle";
import { Context } from "./context";
import { Renderer } from "./renderer";
import { RenderCall } from "./model/render-call";
import { IpsEmitterOptions } from "./model/ips-emitter-options";
import { RenderMode } from "./model/render-mode";

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

    constructor(private context: Context, private options: IpsEmitterOptions) {
        this.renderer = new Renderer(this.context);

        if(options.renderMode == RenderMode.Static) {
            this.updateParticles = this.setTimeValue;
        } else {
            this.updateParticles = this.setParticleValues;
        }

        this.initPool(options);

        this.renderCall = {
            startPosition: this.startPosition,
            velocity: this.velocity,
            startTime: this.startTime,
            lifeTime: this.lifeTime,
            size: this.size,
            color: options.color,
            length: this.length,
            growth: this.growth
        }
    }

    public update(delta: number) {
        let nrOfParticles = Math.floor((this.options.particlesSec / 1000) * delta);
        this.generateParticles(nrOfParticles);
        this.renderCall.startTime = this.startTime;
    }

    public render(time: number) {
        this.context.clear([0, 0, 0, 0]);
        this.renderer.render(this.renderCall, time);
    }

    private initPool(options: IpsEmitterOptions) {
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
        this.startPosition[index3] = this.rand(this.options.start.x.min, this.options.start.x.max);
        this.startPosition[index3 + 1] = this.rand(this.options.start.y.min, this.options.start.y.max);
        this.startPosition[index3 + 2] = 0;

        this.velocity[index3] = this.rand(this.options.velocity.x.min, this.options.velocity.x.max);
        this.velocity[index3 + 1] = this.rand(this.options.velocity.y.min, this.options.velocity.y.max);
        this.velocity[index3 + 2] = 0;

        this.size[this.index] = this.rand(this.options.size.min, this.options.size.max);
        this.startTime[this.index] = startTime;
        this.lifeTime[this.index] = this.rand(this.options.lifeTime.min, this.options.lifeTime.max);

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