import getContext from "./utils/getContext"
import createShader from "./utils/createShader"
import createProgram from "./utils/createProgram"
import MatrixUtil from "./utils/Matrix"

const vertexShaderSrc = 
`   #version 300 es
    in vec2 a_vert_pos;
    uniform vec2 u_resolution;
    uniform mat3 u_matrix;
    void main() {
        vec2 pos_vec = (u_matrix * vec3(a_vert_pos, 1)).xy;

        // converting to clipspace
        vec2 normalized = pos_vec / u_resolution;
        vec2 clipspace = (normalized * 2.0) - 1.0;
        gl_Position = vec4(clipspace * vec2(1, -1), 0, 1);
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
    const uMatLocation = gl.getUniformLocation(program, "u_matrix")
    const uColorLocation = gl.getUniformLocation(program, "u_color")
    const posBuffer = gl.createBuffer()
    const matrixUtil = new MatrixUtil()
    const uMatrix = matrixUtil.create() // identity matrix
    // const vao = gl.createVertexArray()

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -0.5, -0.5,
        0.5, -0.5,
        -0.5, 0.5,
        0.5, -0.5,
        0.5, 0.5,
        -0.5, 0.5
    ]), gl.STATIC_DRAW)
    // gl.bindVertexArray(vao) // for our purpose, global vao suffices -- not having to use a custom vao should give some (albeit miniscule) performance boost
    gl.enableVertexAttribArray(aVertPosLocation)
    gl.vertexAttribPointer(aVertPosLocation, 2, gl.FLOAT, false, 0, 0)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.useProgram(program)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uResLocation, canvas.width, canvas.height)
    gl.clearColor(0, 0, 0, 1)
    
    let lastTs = 0
    let dt, angle = 0
    const width = 400
    const height = 400
    const rects = Array(10).fill(0).map(() => {
        return {
            x: rand(canvas.width - width),
            y: rand(canvas.height - height),
            color: [ Math.random(), Math.random(), Math.random(), 0.5 + Math.random()]
        }
    })
    function draw(ts) {
        dt = (ts - lastTs) / 1000
        lastTs = ts
        angle += dt * Math.PI / 4
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        rects.forEach(({ x, y, color}) => {
            matrixUtil.identity(uMatrix)
            matrixUtil.scale(uMatrix, width, height)
            matrixUtil.rotate(uMatrix, angle)
            matrixUtil.translate(uMatrix, x + (width / 2), y + (height / 2))
            gl.uniformMatrix3fv(uMatLocation, false, uMatrix)
            gl.uniform4fv(uColorLocation, color)
            gl.drawArrays(gl.TRIANGLES, 0, 6)
        })
        requestAnimationFrame(draw)
    }
    requestAnimationFrame(draw)
    function rand(n) {
        return Math.floor(Math.random() * n)
    }
} catch(e) {
    console.log(e.message)
}