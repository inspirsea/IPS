import { MinMax } from "./min-max";
import { IpsCoordinates } from "./ips-coordinates";
import { RenderMode } from "./render-mode";
export interface IpsInternalEmitterOptions {
    start: IpsCoordinates;
    velocity: IpsCoordinates;
    lifeTime: MinMax<number>;
    size: MinMax<number>;
    growth: number;
    particlesSec: number;
    renderMode: RenderMode;
    color: [number, number, number, number];
    textureKey: string;
}
