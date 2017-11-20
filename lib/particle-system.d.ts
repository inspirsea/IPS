import { IpsOptions } from "./model/ips-options";
import { IpsEmitterOptions } from "./model/ips-emitter-options";
import { Observable } from "rxjs/Observable";
export declare class ParticleSystem {
    onLoad: Observable<string>;
    private particleEmitters;
    private context;
    private time;
    private delta;
    constructor(options: IpsOptions, canvas: HTMLCanvasElement);
    addEmitter(options: IpsEmitterOptions): void;
    update(): void;
    render(): void;
}
