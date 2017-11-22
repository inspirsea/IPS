import { MinMax } from "./min-max";
import { RenderMode } from "./render-mode";
import { IpsCoordinates } from "./ips-coordinates";

export class IpsEmitterOptions {

    public lifeTime: MinMax<number> = { min: 1000, max: 1000 };
    public size: MinMax<number> = { min: 10, max: 10 };
    public growth: number = 0;
    public color: string = "ffffff";
    public alpha: number = 1;
    public renderMode: RenderMode = RenderMode.Dynamic;
    public textureKey: string;

    constructor(
        public start: IpsCoordinates,
        public velocity: IpsCoordinates,
        public particlesSec: number) {
    }
}