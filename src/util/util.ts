import { IpsEmitterOptions } from "../model/ips-emitter-options";
import { IpsInternalEmitterOptions } from "../model/ips-internal-emitter-options";

export class Util {

    public static toInternalOptions(options: IpsEmitterOptions, width: number, height: number): IpsInternalEmitterOptions {
        
        let glColor = Util.colorHexToGl(options.color);
        
        let internalOptions: IpsInternalEmitterOptions = {
            start: {
                x:
                    {
                        min: Util.pixelToRelative(options.start.x.min, width),
                        max: Util.pixelToRelative(options.start.x.max, width)
                    },
                y:
                    {
                        min: Util.pixelToRelative(options.start.y.min, height),
                        max: Util.pixelToRelative(options.start.y.max, height),
                    }
            },
            velocity: {
                x: {
                    min: options.velocity.x.min / 1000,
                    max: options.velocity.x.max / 1000
                },
                y: {
                    min: options.velocity.y.min / 1000,
                    max: options.velocity.y.max / 1000,
                }
            },
            lifeTime: { min: options.lifeTime.min, max: options.lifeTime.max },
            size: { min: options.size.min, max: options.size.max },
            growth: options.growth/1000,
            color: [ glColor[0], glColor[1], glColor[2], options.alpha ],
            particlesSec: options.particlesSec,
            renderMode: options.renderMode
        };

        return internalOptions;
    }

    public static colorHexToGl(hexcolor: string): [number, number, number] {
        
        let r = parseInt(hexcolor.slice(0, 2), 16);
        let g = parseInt(hexcolor.slice(2, 4), 16);
        let b = parseInt(hexcolor.slice(4, 6), 16);
        
        return [r/255, g/255, b/255];
    }

    private static pixelToRelative(pixel: number, total: number) {

        let half = total / 2;
        pixel = pixel - half;
        pixel = pixel/half;

        return pixel;
    }

}

