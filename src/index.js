import getContext from "./utils/getContext"
import createShader from "./utils/createShader"
import createProgram from "./utils/createProgram"

const vertexShaderSrc = 
`    #version 300 es
    in vec2 a_vert_pos;
    uniform vec2 u_resolution;
    void main() {
        vec2 normalized_coords = a_vert_pos / u_resolution;
        vec2 clipspace_coords = (normalized_coords * 2.0) - 1.0;
        gl_Position = vec4(clipspace_coords * vec2(1, -1), 0, 1);
    }
`
const fragShaderSrc = 
`   #version 300 es
    precision highp float;
    uniform vec4 u_color;
    out vec4 out_color;
    void main() {
        out_color = u_color;
    }
`

try {
    const canvas = document.querySelector("#viewport")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const gl = getContext("#viewport")
    const program = createProgram(
        gl,
        createShader(gl, vertexShaderSrc, gl.VERTEX_SHADER),
        createShader(gl, fragShaderSrc, gl.FRAGMENT_SHADER)
    )
    const uResLocation = gl.getUniformLocation(program, "u_resolution")
    const aVertPosLocation = gl.getAttribLocation(program, "a_vert_pos")
    const uColorLocation = gl.getUniformLocation(program, "u_color")
    const posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)
    gl.enableVertexAttribArray(aVertPosLocation)
    gl.vertexAttribPointer(aVertPosLocation, 2, gl.FLOAT, false, 0, 0)

    gl.useProgram(program)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uResLocation, canvas.width, canvas.height)
    gl.bindVertexArray(vao)

    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    for (let x = 0; x < 10; x++) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            rand(1000), rand(1000),
            rand(1000), rand(1000),
            rand(1000), rand(1000)
        ]), gl.STATIC_DRAW)
        gl.uniform4f(uColorLocation, rand(256) / 256, rand(256) / 256, rand(256) / 256, 1)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    function rand(n) {
        return Math.floor(Math.random() * n)
    }
} catch(e) {
    console.log(e.message)
}