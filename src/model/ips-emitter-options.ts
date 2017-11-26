import { MinMax } from "./min-max";
import { RenderMode } from "./render-mode";
import { IpsCoordinates } from "./ips-coordinates";
import { IpsPositionType } from "./ips-position-type";

export class IpsEmitterOptions {

    constructor(
        public startPosition: IpsCoordinates,
        public velocity: IpsCoordinates,
        public particlesSec: number,
        public lifeTime: number = 1000,
        public size: MinMax<number> = { min: 10, max: 10 },
        public growth: number = 0,
        public color: string = "ffffff",
        public alpha: number = 1,
        public renderMode: RenderMode = RenderMode.Dynamic,
        public blendmodeSource = WebGLRenderingContext.SRC_ALPHA,
        public blendmodeTarget = WebGLRenderingContext.ONE,
        public positionType = IpsPositionType.Pixel,
        public textureKey?: string,
    ) {
    }
}