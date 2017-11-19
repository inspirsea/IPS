import { MinMax } from "./min-max";
export interface EmitterOptions {
    start: MinMax<[number, number]>;
    velocity: MinMax<[number, number]>;
    lifeTime: MinMax<number>;
    particlesSec: number;
    color: [number, number, number, number];
}
