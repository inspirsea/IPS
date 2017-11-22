import { MinMax } from "./min-max";
import { RenderMode } from "./render-mode";
import { IpsCoordinates } from "./ips-coordinates";
export declare class IpsEmitterOptions {
    start: IpsCoordinates;
    velocity: IpsCoordinates;
    particlesSec: number;
    lifeTime: MinMax<number>;
    size: MinMax<number>;
    growth: number;
    color: string;
    alpha: number;
    renderMode: RenderMode;
    textureKey: string;
    constructor(start: IpsCoordinates, velocity: IpsCoordinates, particlesSec: number);
}
