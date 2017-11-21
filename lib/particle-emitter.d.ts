import { Context } from "./context";
import { IpsEmitterOptions } from "./model/ips-emitter-options";
export declare class ParticleEmitter {
    private context;
    private options;
    private length;
    private index;
    private startPosition;
    private velocity;
    private startTime;
    private lifeTime;
    private size;
    private growth;
    private color;
    private renderer;
    private renderCall;
    private updateParticles;
    private internalOptions;
    constructor(context: Context, options: IpsEmitterOptions, width: number, height: number);
    update(delta: number): void;
    render(time: number): void;
    private initPool(options);
    private generateParticles(nrOfParticles);
    private setParticleValues(startTime);
    private setTimeValue(startTime);
    private rand(min, max);
}
