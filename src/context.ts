import { Observable, Subscription, Observer, Subject } from 'rxjs';
import { IpsOptions } from './model/ips-options';
import { ImageItem } from './model/image-item';

export class Context {
    public shaderProgram: WebGLProgram;
    public gl: WebGLRenderingContext;
    public textures: { [key: string]: WebGLTexture } = {};

    private loaded: Subject<string>;

    constructor(options: IpsOptions, canvas?: HTMLCanvasElement, gl?: WebGLRenderingContext) {
        if (canvas) {
            this.initContext(canvas);
        } else {
            this.gl = gl;
        }

        this.loaded = new Subject();

        this.initShaders(options);

        this.gl.viewport(0, 0, canvas.width, canvas.height);
    }

    public onLoad(): Subject<string> {
        return this.loaded;
    }

    public clear(color: number[]) {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.clearColor(color[0], color[1], color[2], color[3]);
    }

    private initContext(canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext("experimental-webgl");

        console.log("Context initialized...");
    }

    private initShaders(options: IpsOptions) {
        let vertexShader = this.compileShader(this.vertexShader, "vertex");
        let fragmentShader = this.compileShader(this.fragmentShader, "fragment");

        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
        this.gl.linkProgram(this.shaderProgram);

        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
            alert("Unable to initialize the shader program: " + this.gl.getProgramInfoLog(this.shaderProgram));
        }

        this.getDefaultImage().subscribe(it => {
            options.textures.push({
                key: "default",
                image: it
            });
            this.loadImages(options.textures).subscribe((imageItems) => {
                this.initTextures(this.gl, imageItems);
                this.loaded.next();
            });
        });
    }

    private loadImages(imageItems: ImageItem[]) {

        let imgLoaders: Observable<ImageItem>[] = [];

        for (let item of imageItems) {
            let loader = Observable.create((obs: Observer<ImageItem>) => {

                if (typeof item.image == "string") {
                    let img: HTMLImageElement = document.createElement("img");
                    img.crossOrigin = "Anonymous";
                    img.src = item.image;

                    img.onload = () => {
                        item.image = img;
                        obs.next(item);
                        obs.complete();
                    };
                } else {
                    obs.next(item);
                    obs.complete();
                }
            });

            imgLoaders.push(loader);
        }

        return Observable.forkJoin(imgLoaders);
    }

    private initTextures(gl: WebGLRenderingContext, imageItems: ImageItem[]) {

        for (let imageItem of imageItems) {

            let image = imageItem.image as HTMLImageElement;

            this.textures[imageItem.key] = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.textures[imageItem.key]);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

            if (this.isPowerOf2(image.width) && this.isPowerOf2(image.height)) {
                // Yes, it's a power of 2. Generate mips.
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                // No, it's not a power of 2. Turn of mips and set
                // wrapping to clamp to edge
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        }

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    }

    private isPowerOf2(value) {
        return (value & (value - 1)) == 0;
    }

    private compileShader(source: string, shaderType: string) {
        var shader: WebGLShader;

        if (shaderType == "fragment") {
            shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        } else if (shaderType == "vertex") {
            shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        }

        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.log("An error occurred compiling the shaders: " + this.gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    private getDefaultImage(): Observable<HTMLImageElement> {
        return Observable.create((obs: Observer<HTMLImageElement>) => {
            let defaultImg = document.createElement("img");
            defaultImg.src = this.defaultImgSrc;

            defaultImg.onload = function () {
                obs.next(defaultImg);
                obs.complete();
            };
        });
    }

    private vertexShader = `
    precision mediump float;
    
    attribute vec3 a_startPosition;
    attribute vec3 a_velocity;
    attribute float a_startTime;
    attribute float a_lifetime;
    attribute float a_size;
    
    uniform float u_growth;
    uniform float u_time;
    varying float v_lifetime;
    
    void main(void) {
      float time = (u_time - a_startTime);
      if (time <= a_lifetime) {
        gl_Position.xyz = a_startPosition + (a_velocity * time);
        gl_Position.w = 1.0;
      } else {
        gl_Position = vec4(-1000, -1000, 0, 0);
      }
    
      gl_PointSize = a_size + (time * u_growth);
    }
    `;

    private fragmentShader = `
    precision mediump float;
    
      uniform vec4 u_color;
    
      uniform sampler2D u_particleTexture;
    
      void main(void) {
        vec4 texColor;
        texColor = texture2D(u_particleTexture, gl_PointCoord);
        gl_FragColor = vec4(u_color) * texColor;
      }
    `;

    private defaultImgSrc = "data:image/png;base64,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";

}