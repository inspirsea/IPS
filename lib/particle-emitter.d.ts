import { Context } from "./context";
import { EmitterOptions } from "./model/emitter-options";
export declare class ParticleEmitter {
    private context;
    private options;
    private length;
    private index;
    private startPosition;
    private velocity;
    private startTime;
    private lifeTime;
    private color;
    private renderer;
    private renderCall;
    constructor(context: Context, options: EmitterOptions);
    update(delta: number): void;
    render(time: number): void;
    private initPool(options);
    private generateParticles(nrOfParticles);
    private rand(min, max);
}
