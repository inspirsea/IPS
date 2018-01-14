# Particle-ins

## Description
Particle-ins is a library to quickly and efficiently create particle effects.

Written in Typescript, uses WebGL for rendering.

## Installation

```sh
$> npm install particle-ins
```

## Usage

Import the library.

```sh
import * as particle-ins from "particle-ins";
```

Or if you prefer

```sh
import { ParticleSystem, ...etc } from "particle-ins";
```

## Demo

Live demo!
[http://emilsunesson.com/code](http://emilsunesson.com/code)

## Api

### IpsOptions 

**color**: Color in hex

**alpha**: Alpha 0-1

**textures**: Custom textures

**startOnEntry**: Start particle system when canvas enters viewport stops when not in viewport. Default true;


To start particle system when startOnEntry is False.

```sh
        particleSystem.onLoad.subscribe(it => {
            particleSystem.start();
        });
```

#### Example

```sh
let customTexture: ImageItem = {
    image: "../assets/images/snowflake.png",
    key: "snow"
};

let options = new IpsOptions();
options.textures = [snowTexture];
options.color = "cccccc"
    
new ParticleSystem(options, canvas, 1000, 600);
```

### IpsEmitterOptions

**startPosition**: Min/max position of x and y

**velocity**: Min/max velocity of x and y

**particlesSec**: Number of particles emitted per second

**lifeTime**: lifetime of particles in milliseconds

**size**: Min/max size

**growth**: Growth plus value grows minus value shrinks

**color**: Color in hex

**alpha**: Alpha 0-1

**renderMode**: Static or dynamic rendering if static generate particles once otherwise generate continuously

**blendmodeSource**: Webgl blendmode source

**blendmodeTarget**: Webgl blendmode target

**positionType**: Pixel or relative position type

**textureKey**: Custom texture key

#### Example

```sh
let emitterOptions = new IpsEmitterOptions(
    new IpsCoordinates(-1, 1, 1, 1),
    new IpsCoordinates(-0.5, 0.5, -0.8, -0.8),
    1000,
    2500
);

emitterOptions.size = { min: 3, max: 8 }
emitterOptions.textureKey = "snow";
emitterOptions.positionType = IpsPositiontype.Relative;

particleSystem.addEmitter(emitterOptions);
```

