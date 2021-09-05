import getContext from "./utils/getContext"
import createShader from "./utils/createShader"
import createProgram from "./utils/createProgram"
import vertexShaderSrc from "./shaders/vertexShader"
import fragShaderSrc from "./shaders/fragmentShader"
import MatrixUtil from "./utils/Matrix"

class Webgl2Renderer {
    constructor(image, cnvQry="#viewport", viewport) {
        const gl = getContext(cnvQry)
        const program = createProgram(
            gl,
            createShader(gl, vertexShaderSrc, gl.VERTEX_SHADER),
            createShader(gl, fragShaderSrc, gl.FRAGMENT_SHADER)
        )
        this.canvas = document.querySelector(cnvQry)
        this.image = image
        this.gl = gl

        // webgl uniforms, attributes and buffers
        const aVertPosLocation = gl.getAttribLocation(program, "a_vert_pos")
        const aTexCoordsLocation = gl.getAttribLocation(program, "a_tex_coords")
        const posBuffer = gl.createBuffer()
        const texBuffer = gl.createBuffer()
        
        this.uResLocation = gl.getUniformLocation(program, "u_resolution")
        this.uMatLocation = gl.getUniformLocation(program, "u_matrix")
        this.uTexMatLocation = gl.getUniformLocation(program, "u_tex_matrix")
        this.matrixUtil = new MatrixUtil()
        this.uMatrix = this.matrixUtil.create() // identity matrix
        this.uTexMatrix = this.matrixUtil.create()
        
        // texture and position attributes initialization tasks
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
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
        
        // texture states setup
        const texture = gl.createTexture()
        const uTexUnitLocation = gl.getUniformLocation(program, "u_tex_unit")
        const texUnit = 0
        gl.useProgram(program)
        gl.activeTexture(gl.TEXTURE0 + texUnit)
        gl.uniform1i(uTexUnitLocation, texUnit)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.generateMipmap(gl.TEXTURE_2D)
        
        this.blendMode = "source-over"
        this.resize(viewport)
        this.clearColor = [ 0, 0, 0, 1 ]
        // viewport.on("change", this.resize.bind(this))
    }
    set clearColor(arr) {
        this.gl.clearColor(...arr)
    }
    set blendMode(val) {
        switch(val) {
            default:
                this.gl.enable(this.gl.BLEND)
                this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)
        }
    }
    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    }
    resize({ width, height }) {
        this.canvas.width = width
        this.canvas.height = height
        this.gl.viewport(0, 0, width, height)
        this.gl.uniform2f(this.uResLocation, width, height)
    }
    drawFrame(srcX, srcY, width, height, destX, destY, angle) {
        const { matrixUtil, uMatrix, uTexMatrix, uMatLocation, uTexMatLocation, image, gl } = this
        matrixUtil.identity(uMatrix)
        matrixUtil.scale(uMatrix, width, height)
        angle && matrixUtil.rotate(uMatrix, angle)
        matrixUtil.translate(uMatrix, destX + (width / 2), destY + (height / 2))

        matrixUtil.identity(uTexMatrix)
        matrixUtil.scale(uTexMatrix, width / image.width, height / image.height)
        matrixUtil.translate(uTexMatrix, srcX / image.width, srcY / image.height)

        gl.uniformMatrix3fv(uMatLocation, false, uMatrix)
        gl.uniformMatrix3fv(uTexMatLocation, false, uTexMatrix)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    render() {

    }
    renderRec() {

    }
}

export default Webgl2Renderer