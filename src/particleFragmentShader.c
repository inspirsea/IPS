precision mediump float;

  uniform vec4 u_color;

  uniform sampler2D u_particleTexture;

  void main(void) {
    vec4 texColor;
    texColor = texture2D(u_particleTexture, gl_PointCoord);
    gl_FragColor = vec4(u_color) * texColor;
  }