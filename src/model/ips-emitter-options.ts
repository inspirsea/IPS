import { MinMax } from "./min-max";
import { RenderMode } from "./render-mode";
import { IpsCoordinates } from "./ips-coordinates";

export interface IpsEmitterOptions {
    start: IpsCoordinates;
    velocity: IpsCoordinates;
    lifeTime: MinMax<number>;
    size: MinMax<number>;
    growth: number;    
    color: [number, number, number, number];
    particlesSec: number;
    renderMode: RenderMode
}