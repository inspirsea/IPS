import { Particle } from "./particle";
import { Context } from "./context";
import { Renderer } from "./renderer";
import { RenderCall } from "./model/render-call";
import { EmitterOptions } from "./model/emitter-options";

export class ParticleEmitter {

    private length: number;
    private index: number = 0;
    private startPosition: Float32Array;
    private velocity: Float32Array;
    private startTime: Float32Array;
    private lifeTime: Float32Array;
    private color: [number, number, number, number];

    private renderer: Renderer;
    private renderCall: RenderCall;

    constructor(private context: Context, private options: EmitterOptions) {
        this.renderer = new Renderer(this.context);
        this.initPool(options);
        
        this.renderCall = {
            startPosition: this.startPosition,
            velocity: this.velocity,
            startTime: this.startTime,
            lifeTime: this.lifeTime,
            color: options.color,
            length: this.length
        }
    }

    public update(delta: number) {
        let nrOfParticles = Math.floor((this.options.particlesSec/1000) * delta);
        this.generateParticles(nrOfParticles);
        this.renderCall.startTime = this.startTime;
    }

    public render(time: number) {
        this.context.clear([0, 0, 0, 0]);
        this.renderer.render(this.renderCall, time);
    }

    private initPool(options: EmitterOptions) {
        let avgLifeSpan = (options.lifeTime.min + options.lifeTime.max) / 2;
        this.length = (options.particlesSec / (avgLifeSpan / 1000)) * 1.2;

        this.startPosition = new Float32Array(this.length * 3);
        this.velocity = new Float32Array(this.length * 3);
        this.lifeTime = new Float32Array(this.length);
        this.startTime = new Float32Array(this.length);
        
        for(let i = 0; i < this.length; i++) {
            let startTime = 0;
            let index3 = this.index * 3;
            this.startPosition[index3] = this.rand(this.options.start.min[0], this.options.start.max[0]);
            this.startPosition[index3 + 1] = this.rand(this.options.start.min[1], this.options.start.max[1]);
            this.startPosition[index3 + 2] = 0;

            this.velocity[index3] = this.rand(this.options.velocity.min[0], this.options.velocity.max[0]);
            this.velocity[index3 + 1] = this.rand(this.options.velocity.min[1], this.options.velocity.max[1]);
            this.velocity[index3 + 2] = 0;
            
            this.startTime[this.index] = startTime;
            this.lifeTime[this.index] = this.rand(this.options.lifeTime.min, this.options.lifeTime.max);

            if(this.index > this.length) {
                this.index = 0;
            } else {
                this.index++;
            }
        }
    }

    private generateParticles(nrOfParticles: number) {        
        let startTime = +Date.now().toString().slice(5);
        for(let i = 0; i < nrOfParticles; i++) {

            let index3 = this.index * 3;
            this.startPosition[index3] = this.rand(this.options.start.min[0], this.options.start.max[0]);
            this.startPosition[index3 + 1] = this.rand(this.options.start.min[1], this.options.start.max[1]);
            this.startPosition[index3 + 2] = 0;

            this.velocity[index3] = this.rand(this.options.velocity.min[0], this.options.velocity.max[0]);
            this.velocity[index3 + 1] = this.rand(this.options.velocity.min[1], this.options.velocity.max[1]);
            this.velocity[index3 + 2] = 0;
            
            this.startTime[this.index] = startTime;
            this.lifeTime[this.index] = this.rand(this.options.lifeTime.min, this.options.lifeTime.max);

            if(this.index > this.length) {
                this.index = 0;
            } else {
                this.index++;
            }
        }
    }

    private rand(min: number, max: number) {
        return min + (Math.random() * (max - min))
    }
}