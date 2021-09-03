import getContext from "./utils/getContext"
import createShader from "./utils/createShader"
import createProgram from "./utils/createProgram"
import vertexShaderSrc from "./shaders/vertexShader"
import fragmentShaderSrc from "./shaders/fragmentShader"
import MatrixUtil from "./utils/Matrix"

class Webgl2Renderer {
    constructor() {
        this.gl = getContext("#viewport")
        this.program = createProgram(
            gl,
            createShader(gl, vertexShaderSrc, gl.VERTEX_SHADER),
            createShader(gl, fragShaderSrc, gl.FRAGMENT_SHADER)
        )
    }
    set clearColor(hexColor) {
        this.gl.clearColor(hexColor)
    }
    set blendMode() {
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    }
    resize() {
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.uniform2f(uResLocation, canvas.width, canvas.height)
    }
    drawFrame(srcX, srcY, width, height, destX, destY, angle) {
        const { matrixUtil, uMatrix, uTexMatrix, texUnit, uMatLocation, uTexMatLocation, uTexUnitLocation } = this
        matrixUtil.identity(uMatrix)
        matrixUtil.scale(uMatrix, width, height)
        angle && matrixUtil.rotate(uMatrix, angle)
        matrixUtil.translate(uMatrix, destX + (width / 2), destY + (height / 2))

        matrixUtil.identity(uTexMatrix)
        matrixUtil.scale(uTexMatrix, width / image.width, height / image.height)
        matrixUtil.translate(uTexMatrix, srcX / image.width, srcY / image.height)

        gl.uniformMatrix3fv(uMatLocation, false, uMatrix)
        gl.uniformMatrix3fv(uTexMatLocation, false, uTexMatrix)
        gl.uniform1i(uTexUnitLocation, texUnit)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
}

export default Webgl2Renderer