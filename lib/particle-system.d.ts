import { ParticleEmitter } from "./particle-emitter";
import { IpsOptions } from "./model/ips-options";
import { IpsEmitterOptions } from "./model/ips-emitter-options";
import { Observable } from "rxjs/Observable";
export declare class ParticleSystem {
    onLoad: Observable<string>;
    private particleEmitters;
    private context;
    private time;
    private width;
    private height;
    private fps;
    private intervalTimer;
    private color;
    constructor(options: IpsOptions, canvas: HTMLCanvasElement, width: number, height: number);
    start(): void;
    stop(): void;
    setSize(width: number, height: number): void;
    addEmitter(options: IpsEmitterOptions): ParticleEmitter;
    removeEmitter(emitter: ParticleEmitter): void;
    update(delta: number): void;
    render(): void;
    private run();
    private setVisabilityManagement();
    private getTime();
}
