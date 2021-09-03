import getContext from "./utils/getContext"
import createShader from "./utils/createShader"
import createProgram from "./utils/createProgram"
import vertexShaderSrc from "./shaders/vertexShader"
import fragShaderSrc from "./shaders/fragmentShader"
import MatrixUtil from "./utils/Matrix"

class Webgl2Renderer {
    constructor(image, canvId="#viewport", viewport) {
        this.gl = getContext(canvId)
        this.program = createProgram(
            gl,
            createShader(gl, vertexShaderSrc, gl.VERTEX_SHADER),
            createShader(gl, fragShaderSrc, gl.FRAGMENT_SHADER)
        )
        this.image = image

        // webgl uniforms, attributes and buffers
        const aVertPosLocation = gl.getAttribLocation(program, "a_vert_pos")
        const aTexCoordsLocation = gl.getAttribLocation(program, "a_tex_coords")
        const posBuffer = gl.createBuffer()
        const texBuffer = gl.createBuffer()
        
        this.uResLocation = gl.getUniformLocation(program, "u_resolution")
        this.uMatLocation = gl.getUniformLocation(program, "u_matrix")
        this.uTexMatLocation = gl.getUniformLocation(program, "u_tex_matrix")
        this.matrixUtil = new MatrixUtil()
        this.uMatrix = matrixUtil.create() // identity matrix
        this.uTexMatrix = matrixUtil.create()
        
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
        gl.uniform1i(uTexUnitLocation, texUnit)
        gl.activeTexture(gl.TEXTURE0 + texUnit)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.generateMipmap(gl.TEXTURE_2D)
        
        gl.useProgram(program)
        this.blendMode = "source-over"
        this.resize()
        this.clear()
        viewport.on("change", this.resize.bind(this))
    }
    set clear() {
        this.gl.clearColor(0, 0, 0, 0)
    }
    set blendMode(val) {
        switch(val) {
            default:
                this.gl.enable(gl.BLEND)
                this.gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
        }
    }
    resize({ width, height }) {
        this.gl.viewport(0, 0, width, height)
        this.gl.uniform2f(this.uResLocation, width, height)
    }
    drawFrame(srcX, srcY, width, height, destX, destY, angle) {
        const { matrixUtil, uMatrix, uTexMatrix, uMatLocation, uTexMatLocation, image } = this
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