import { IpsEmitterOptions } from "../model/ips-emitter-options";
import { IpsInternalEmitterOptions } from "../model/ips-internal-emitter-options";
export declare class Util {
    static toInternalOptions(options: IpsEmitterOptions, width: number, height: number): IpsInternalEmitterOptions;
    static colorHexToGl(hexcolor: string): [number, number, number];
    private static pixelToRelative(pixel, total);
}
