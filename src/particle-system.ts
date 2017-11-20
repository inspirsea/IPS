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

    constructor(options: IpsOptions, canvas: HTMLCanvasElement) {
        this.context = new Context(options, canvas);
        this.onLoad = this.context.onLoad();
    }

    public addEmitter(options: IpsEmitterOptions) {
        this.particleEmitters.push(new ParticleEmitter(this.context, options));
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
        for (let particleEmitter of this.particleEmitters) {
            particleEmitter.render(this.time);
        }
    }


}