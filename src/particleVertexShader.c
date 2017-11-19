precision mediump float;

attribute vec3 a_startPosition;
attribute vec3 a_endPosition;
attribute float a_startTime;
attribute float a_lifetime;

uniform float u_time;
varying float v_lifetime;

void main(void) {
  float time = (u_time - a_startTime);
  if (time <= a_lifetime) {
    gl_Position.xyz = a_startPosition + (a_endPosition * time);
    gl_Position.w = 1.0;
  } else {
    gl_Position = vec4(-1000, -1000, 0, 0);
  }

  v_lifetime = 1.0 - (a_startTime / a_lifetime);
  v_lifetime = clamp(v_lifetime, 0.0, 1.0);
  gl_PointSize = 10.0;
}
