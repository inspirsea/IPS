import { Subject } from 'rxjs';
import { IpsOptions } from './model/ips-options';
export declare class Context {
    shaderProgram: WebGLProgram;
    gl: WebGLRenderingContext;
    textures: {
        [key: string]: WebGLTexture;
    };
    private loaded;
    constructor(options: IpsOptions, canvas?: HTMLCanvasElement, gl?: WebGLRenderingContext);
    onLoad(): Subject<string>;
    clear(color: number[]): void;
    private initContext(canvas);
    private initShaders(options);
    private initTextures(gl, options);
    private isPowerOf2(value);
    private compileShader(source, shaderType);
    private getDefaultImage();
    private vertexShader;
    private fragmentShader;
    private defaultImgSrc;
}
