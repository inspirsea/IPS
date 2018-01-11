import { ParticleEmitter } from "./particle-emitter";
import { Context } from "./context";
import { IpsOptions } from "./model/ips-options";
import { IpsEmitterOptions } from "./model/ips-emitter-options";
import { Observable } from "rxjs/Observable";
import { Util } from "./util/util";

export class ParticleSystem {

    public onLoad: Observable<string>;
    private particleEmitters: ParticleEmitter[] = [];
    private context: Context;
    private time: number = +Date.now().toString().slice(5);
    private width: number;
    private height: number;
    private fps = 60;
    private intervalTimer: number;
    private color: [number, number, number, number];

    constructor(options: IpsOptions, canvas: HTMLCanvasElement, width: number, height: number) {
        this.context = new Context(options, canvas);
        this.onLoad = this.context.onLoad();
        this.width = width;
        this.height = height;
        let color = Util.colorHexToGl(options.color);
        this.color = [color[0], color[1], color[2], options.alpha];
    }

    public start() {
        this.time = this.getTime();
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
        let emitter = new ParticleEmitter(this.context, options, this.width, this.height);
        this.particleEmitters.push(emitter);

        return emitter;
    }

    public removeEmitter(emitter: ParticleEmitter) {
        let index = this.particleEmitters.indexOf(emitter);

        if (index != -1) {
            this.particleEmitters.splice(index, 1);
        }
    }

    public update(delta: number) {
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

    public destroy() {
        this.stop();
    }

    private run() {
        let loops = 0, skipTicks = 1000 / this.fps,
            maxFrameSkip = 3,
            nextGameTick = this.getTime();

        return () => {
            while (this.getTime() > nextGameTick && loops < maxFrameSkip) {
                let delta = nextGameTick - this.time;
                this.time = nextGameTick;

                this.context.clear(this.color);
                this.update(delta);
                this.render();

                nextGameTick += skipTicks;
            };
        }
    }

    private getTime() {
        return +Date.now().toString().slice(5);
    }
}