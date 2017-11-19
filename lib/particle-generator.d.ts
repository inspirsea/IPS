import { EmitterOptions } from "./model/emitter-options";
export declare class ParticleGenerator {
    private options;
    private length;
    private index;
    private startPosition;
    private velocity;
    private startTime;
    private lifeTime;
    private color;
    constructor(options: EmitterOptions);
    update(): void;
    getRenderCall(): void;
    private initPool(options);
}
