import { MinMax } from "./min-max";
export declare class IpsCoordinates {
    constructor(xmin: number, xmax: number, ymin: number, ymax: number);
    x: MinMax<number>;
    y: MinMax<number>;
}
