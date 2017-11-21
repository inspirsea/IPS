import { ParticleEmitter } from "./particle-emitter";
import { Context } from "./context";
import { IpsOptions } from "./model/ips-options";
import { IpsEmitterOptions } from "./model/ips-emitter-options";
import { Observable } from "rxjs/Observable";

export class ParticleSystem {

    public onLoad: Observable<string>;
    private particleEmitters: ParticleEmitter[] = [];
    private context: Context;
    private time: number = +Date.now().toString().slice(5);
    private delta: number;
    private width: number;
    private height: number;

    constructor(options: IpsOptions, canvas: HTMLCanvasElement, width: number, height: number) {
        this.context = new Context(options, canvas);
        this.onLoad = this.context.onLoad();
        this.width = width;
        this.height = height;
    }

    public setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public addEmitter(options: IpsEmitterOptions) {
        this.particleEmitters.push(new ParticleEmitter(this.context, options, this.width, this.height));
    }

    public update() {
        let newTime = +Date.now().toString().slice(5);
        this.delta = newTime - this.time;
        this.time = newTime;

        for (let particleEmitter of this.particleEmitters) {
            particleEmitter.update(this.delta);
        }
    }

    public render() {
        this.context.clear([0, 0, 0, 0]);
        for (let particleEmitter of this.particleEmitters) {
            particleEmitter.render(this.time);
        }
    }


}