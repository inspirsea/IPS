import { Context } from "./context";
import { RenderCall } from "./model/render-call";

export class Renderer {

    private gl: WebGLRenderingContext;
    private glProgram: WebGLProgram;

    private a_startPosition_location: number;
    private a_velocity_location: number;
    private a_startTime_location: number;
    private a_lifetime_location: number;
    private a_size_location: number;

    private u_growth: WebGLUniformLocation; 
    private u_color: WebGLUniformLocation;
    private u_time_location: WebGLUniformLocation;
    private u_particleTexture_location: WebGLUniformLocation;

    private startBuffer;
    private endBuffer;
    private startTimeBuffer;
    private lifetimeBuffer;
    private sizeBuffer;

    constructor(private context: Context) {
        this.gl = this.context.gl;
        this.glProgram = this.context.shaderProgram;
        this.gl.useProgram(this.glProgram)
        this.gl.bindAttribLocation(this.glProgram, 0, "a_startPosition");
        this.gl.bindAttribLocation(this.glProgram, 1, "a_velocity");
        this.gl.bindAttribLocation(this.glProgram, 2, "a_startTime");
        this.gl.bindAttribLocation(this.glProgram, 3, "a_lifetime");
        this.gl.bindAttribLocation(this.glProgram, 4, "a_size");

        this.a_startPosition_location = this.gl.getAttribLocation(this.glProgram, "a_startPosition");
        this.a_velocity_location = this.gl.getAttribLocation(this.glProgram, "a_velocity");
        this.a_startTime_location = this.gl.getAttribLocation(this.glProgram, "a_startTime");
        this.a_lifetime_location = this.gl.getAttribLocation(this.glProgram, "a_lifetime");
        this.a_size_location = this.gl.getAttribLocation(this.glProgram, "a_size");
        
        this.u_growth = this.gl.getUniformLocation(this.glProgram, "u_growth");
        this.u_color = this.gl.getUniformLocation(this.glProgram, "u_color");
        this.u_time_location = this.gl.getUniformLocation(this.glProgram, "u_time");
        this.u_particleTexture_location = this.gl.getUniformLocation(this.glProgram, "u_particleTexture");
        
        this.startBuffer = this.gl.createBuffer();
        this.endBuffer = this.gl.createBuffer();
        this.startTimeBuffer = this.gl.createBuffer();
        this.lifetimeBuffer = this.gl.createBuffer();
        this.sizeBuffer = this.gl.createBuffer();
    }

    public render(renderCall: RenderCall, time: number) {
        this.context.gl.useProgram(this.glProgram);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.startBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, renderCall.startPosition, this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.endBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, renderCall.velocity, this.gl.STATIC_DRAW);
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.startTimeBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(renderCall.startTime), this.gl.STATIC_DRAW);
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lifetimeBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, renderCall.lifeTime, this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sizeBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, renderCall.size, this.gl.STATIC_DRAW);
        

        this.gl.enableVertexAttribArray(this.a_startPosition_location);
        this.gl.enableVertexAttribArray(this.a_velocity_location);
        this.gl.enableVertexAttribArray(this.a_startTime_location);
        this.gl.enableVertexAttribArray(this.a_lifetime_location);
        this.gl.enableVertexAttribArray(this.a_size_location);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.startBuffer)
        this.gl.vertexAttribPointer(this.a_startPosition_location, 3, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.endBuffer)
        this.gl.vertexAttribPointer(this.a_velocity_location, 3, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.startTimeBuffer)
        this.gl.vertexAttribPointer(this.a_startTime_location, 1, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lifetimeBuffer)
        this.gl.vertexAttribPointer(this.a_lifetime_location, 1, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sizeBuffer)
        this.gl.vertexAttribPointer(this.a_size_location, 1, this.gl.FLOAT, false, 0, 0);

        this.gl.activeTexture(this.gl.TEXTURE0);
        if(renderCall.textureKey != null) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.context.textures[renderCall.textureKey]);
        } else {
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.context.textures["default"]);
        }
        

        this.gl.uniform1f(this.u_growth, renderCall.growth);
        this.gl.uniform4f(this.u_color, renderCall.color[0], renderCall.color[1], renderCall.color[2], renderCall.color[3]);
        this.gl.uniform1i(this.u_particleTexture_location, 0);
        this.gl.uniform1f(this.u_time_location, time);

        this.gl.drawArrays(this.gl.POINTS, 0, renderCall.length);

        this.gl.disableVertexAttribArray(this.a_startPosition_location);
        this.gl.disableVertexAttribArray(this.a_velocity_location);
        this.gl.disableVertexAttribArray(this.a_startTime_location);
        this.gl.disableVertexAttribArray(this.a_lifetime_location);
        this.gl.disableVertexAttribArray(this.a_size_location);

    }



}