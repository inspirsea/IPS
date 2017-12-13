# Particle-ins

### Description
Particle-ins is a library to quickly and efficiently create particle effects.

Written in Typescript, uses WebGL for rendering.

### Installation

```sh
$> npm install particle-ins
```

### Usage

Import the library.

```sh
import * as particle-ins from "particle-ins";
```

Or if you prefer

```sh
import { ParticleSystem, ...etc } from "particle-ins";
```

### Api

#### IpsOptions 

color: Color in hex

alpha: Alpha 0-1

textures: Custom textures

#### IpsEmitterOptions

**startPosition**: Min/max position of x and y

**velocity**: Min/max velocity of x and y

**particlesSec**: Number of particles emitted per second

**lifeTime**: lifetime of particles in milliseconds

**size**: Min/max size

**growth**: Growth plus value grows minus value shrinks

**color**: Color in hex

**alpha**: Alpha 0-1

**renderMode**: Static or dynamic rendering if static generate particles once otherwise generate continusly

**blendmodeSource**: Webgl blendmode source

**blendmodeTarget**: Webgl blendmode target

**positionType**: Pixel or relative position type

**textureKey**: If using custom texture else default

### Demo

Live demo!
[http://emilsunesson.com/code](http://emilsunesson.com/code)
