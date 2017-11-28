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