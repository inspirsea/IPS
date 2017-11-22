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
    constructor(options: IpsOptions, canvas: HTMLCanvasElement, width: number, height: number);
    start(): void;
    stop(): void;
    setSize(width: number, height: number): void;
    addEmitter(options: IpsEmitterOptions): void;
    update(): void;
    render(): void;
    private run();
}
