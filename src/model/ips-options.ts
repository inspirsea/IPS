import { ImageItem } from "./image-item";

export class IpsOptions {
    color: string = "000000";
    alpha: number = 1;
    textures: ImageItem[] = [];
    startOnEntry: boolean = true;
}