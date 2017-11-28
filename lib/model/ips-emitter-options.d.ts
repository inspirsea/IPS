import { MinMax } from "./min-max";
import { RenderMode } from "./render-mode";
import { IpsCoordinates } from "./ips-coordinates";
import { IpsPositiontype } from "./ips-positiontype";
export declare class IpsEmitterOptions {
    startPosition: IpsCoordinates;
    velocity: IpsCoordinates;
    particlesSec: number;
    lifeTime: number;
    size: MinMax<number>;
    growth: number;
    color: string;
    alpha: number;
    renderMode: RenderMode;
    blendmodeSource: number;
    blendmodeTarget: number;
    positionType: IpsPositiontype;
    textureKey: string;
    constructor(startPosition: IpsCoordinates, velocity: IpsCoordinates, particlesSec: number, lifeTime?: number, size?: MinMax<number>, growth?: number, color?: string, alpha?: number, renderMode?: RenderMode, blendmodeSource?: number, blendmodeTarget?: number, positionType?: IpsPositiontype, textureKey?: string);
}
