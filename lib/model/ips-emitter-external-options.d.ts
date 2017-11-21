import { MinMax } from "./min-max";
import { RenderMode } from "./render-mode";
import { IpsCoordinates } from "./ips-coordinates";
export declare class IpsExternalEmitterOptions {
    start: IpsCoordinates;
    velocity: IpsCoordinates;
    particlesSec: number;
    lifeTime: MinMax<number>;
    size: MinMax<number>;
    growth: 0;
    color: "000000";
    alpha: 1;
    renderMode: RenderMode;
    constructor(start: IpsCoordinates, velocity: IpsCoordinates, particlesSec: number);
}
