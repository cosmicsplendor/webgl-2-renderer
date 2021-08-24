export default (gl, shaderSrc, shaderType) => {
    const shader = gl.createShader(shaderType)
    gl.shaderSource(shader, shaderSrc)
    gl.compileShader(shader)
    const success = gl.getShaderParameter(shader)
    if (!success) {
        throw new Error(`Couldn't compile shader: ${gl.getShaderInfoLog(shader)}`)
    }
    return shader
}