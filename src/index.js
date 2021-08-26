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
    out vec4 out_color;
    void main() {
        out_color = vec4(1, 0.6, 0.8, 1);
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
    const vertices = [
        100, 100,
        300, 100,
        200, 200
    ]
    const posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
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
    gl.drawArrays(gl.TRIANGLES, 0, 3)
} catch(e) {
    console.log(e.message)
}