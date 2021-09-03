import getContext from "./utils/getContext"
import createShader from "./utils/createShader"
import createProgram from "./utils/createProgram"
import MatrixUtil from "./utils/Matrix"
const texAtlasUrl = "http://localhost:1234/texatlas.png"
const vertexShaderSrc = 
`   #version 300 es

    in vec2 a_vert_pos;
    in vec2 a_tex_coords;
    
    uniform vec2 u_resolution;
    uniform mat3 u_matrix;
    uniform mat3 u_tex_matrix;

    out vec2 v_tex_coords;

    void main() {
        
        v_tex_coords = (u_tex_matrix * vec3(a_tex_coords, 1)).xy;
        
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

    in vec2 v_tex_coords;
    uniform sampler2D u_tex_unit;
    out vec4 out_color;
    void main() {
        out_color = texture(u_tex_unit, v_tex_coords);
    }
`

const image = new Image()
image.src = texAtlasUrl
image.onload = () => {
    try {
        // setup variables
        const canvas = document.querySelector("#viewport")
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const gl = getContext("#viewport")
        const program = createProgram(
            gl,
            createShader(gl, vertexShaderSrc, gl.VERTEX_SHADER),
            createShader(gl, fragShaderSrc, gl.FRAGMENT_SHADER)
        )

        // webgl variables
        const aVertPosLocation = gl.getAttribLocation(program, "a_vert_pos")
        const aTexCoordsLocation = gl.getAttribLocation(program, "a_tex_coords")
        const uResLocation = gl.getUniformLocation(program, "u_resolution")
        const uMatLocation = gl.getUniformLocation(program, "u_matrix")
        const uTexMatLocation = gl.getUniformLocation(program, "u_tex_matrix")
        const uTexUnitLocation = gl.getUniformLocation(program, "u_tex_unit")
        const posBuffer = gl.createBuffer()
        const texBuffer = gl.createBuffer()
        const texture = gl.createTexture()
        const matrixUtil = new MatrixUtil()
        const uMatrix = matrixUtil.create() // identity matrix
        const uTexMatrix = matrixUtil.create()
        const texUnit = 0
        // const vao = gl.createVertexArray()
    
        // initialization tasks
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -0.5, -0.5,
            0.5, -0.5,
            -0.5, 0.5,
            0.5, -0.5,
            0.5, 0.5,
            -0.5, 0.5
        ]), gl.STATIC_DRAW)
        gl.enableVertexAttribArray(aVertPosLocation)
        gl.vertexAttribPointer(aVertPosLocation, 2, gl.FLOAT, false, 0, 0)

        gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0, 0,
            1, 0,
            0, 1,
            1, 0,
            1, 1,
            0, 1
        ]), gl.STATIC_DRAW)
        gl.enableVertexAttribArray(aTexCoordsLocation)
        gl.vertexAttribPointer(aTexCoordsLocation, 2, gl.FLOAT, true, 0, 0)
        // gl.bindVertexArray(vao) // for our purpose, global vao suffices -- not having to use a custom vao should give some performance boost (albeit miniscule)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)

        // composite operation (blend-mode) setup (should be exposed)
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

        // texture states setup (need to be executed as soon as texture atlas loads)
        gl.activeTexture(gl.TEXTURE0 + texUnit)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.generateMipmap(gl.TEXTURE_2D)

        gl.useProgram(program)
        // clear canvas (needs to be exposed via API)
        gl.clearColor(0, 0, 0, 1)
        // viewport sync
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.uniform2f(uResLocation, canvas.width, canvas.height)
        
        let lastTs = 0
        let dt, angle = 0
        const crate = {"x":606,"y":302,"rotation":0,"width":88,"height":88}
        const width = crate.width
        const height = crate.height
        const rects = Array(100).fill(0).map(() => {
            return {
                x: rand(canvas.width - width),
                y: rand(canvas.height - height),
            }
        })
        function draw(ts) {
            dt = (ts - lastTs) / 1000
            lastTs = ts
            angle += dt * Math.PI / 4
            // console.log(`FRAME RATE: ${1/dt}`)
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
            rects.forEach(({ x, y }) => {
                // draw image function equivalent needs to be exposed as well
                matrixUtil.identity(uMatrix)
                matrixUtil.scale(uMatrix, width, height)
                matrixUtil.rotate(uMatrix, angle)
                matrixUtil.translate(uMatrix, x + (width / 2), y + (height / 2))

                matrixUtil.identity(uTexMatrix)
                matrixUtil.scale(uTexMatrix, width / image.width, height / image.height)
                matrixUtil.translate(uTexMatrix, crate.x / image.width, crate.y / image.height)

                gl.uniformMatrix3fv(uMatLocation, false, uMatrix)
                gl.uniformMatrix3fv(uTexMatLocation, false, uTexMatrix)
                gl.uniform1i(uTexUnitLocation, texUnit)
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
}