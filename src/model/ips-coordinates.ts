import { MinMax } from "./min-max";

export class IpsCoordinates {

    constructor(xmin: number, xmax: number, ymin: number, ymax: number) {
        this.x = {
            min: xmin,
            max: xmax
        };

        this.y = {
            min: ymin,
            max: ymax
        }
    }

    public x: MinMax<number>;
    public y: MinMax<number>
}