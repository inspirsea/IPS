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
    private width: number;
    private height: number;
    private fps = 60;
    private intervalTimer: number;

    constructor(options: IpsOptions, canvas: HTMLCanvasElement, width: number, height: number) {
        this.context = new Context(options, canvas);
        this.onLoad = this.context.onLoad();
        this.width = width;
        this.height = height;
    }

    public start() {
        this.intervalTimer = setInterval(this.run(), 0);
    }

    public stop() {
        clearInterval(this.intervalTimer);
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
        let delta = newTime - this.time;
        this.time = newTime;

        for (let particleEmitter of this.particleEmitters) {
            particleEmitter.update(delta);
        }
    }

    public render() {
        this.context.clear([0, 0, 0, 0]);
        for (let particleEmitter of this.particleEmitters) {
            particleEmitter.render(this.time);
        }
    }

    private run() {
        let loops = 0, skipTicks = 1000 / this.fps,
            maxFrameSkip = 3,
            nextGameTick = (new Date).getTime();

        return () => {
            loops = 0;

            while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {

                this.update();
                this.render();

                nextGameTick += skipTicks;
            };
        }
    }


}