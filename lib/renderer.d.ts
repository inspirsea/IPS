import { Context } from "./context";
import { RenderCall } from "./model/render-call";
export declare class Renderer {
    private context;
    private gl;
    private glProgram;
    private a_startPosition_location;
    private a_velocity_location;
    private a_startTime_location;
    private a_lifetime_location;
    private u_color;
    private u_time_location;
    private u_particleTexture_location;
    private startBuffer;
    private endBuffer;
    private startTimeBuffer;
    private lifetimeBuffer;
    constructor(context: Context);
    render(renderCall: RenderCall, time: number): void;
}
