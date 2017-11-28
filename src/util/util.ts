export class Util {

    public static colorHexToGl(hexcolor: string): [number, number, number] {

        if(hexcolor[0] == "#") {
            hexcolor = hexcolor.substr(1);
        }

        let r = parseInt(hexcolor.slice(0, 2), 16);
        let g = parseInt(hexcolor.slice(2, 4), 16);
        let b = parseInt(hexcolor.slice(4, 6), 16);

        return [r / 255, g / 255, b / 255];
    }

    public static pixelToRelative(pixel: number, total: number) {

        let half = total / 2;
        pixel = pixel - half;
        pixel = pixel / half;

        return pixel;
    }

}

