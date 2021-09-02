class IMatrix { // this is just an utility class that has to be instantiated for use, because it holds a mutable field
    static createPlain() {
        return ([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ])
    }
    static cast(mat) {
        mat[0] = 1
        mat[1] = 0
        mat[2] = 0
        mat[3] = 0
        mat[4] = 1
        mat[5] = 0
        mat[6] = 0
        mat[7] = 0
        mat[8] = 1
        return mat
    }
    constructor() {
        this._mat = IMatrix.createPlain()
    }
    scaled(x, y=x) { // returns a scaled identity matrix; this IMatrix class is meant to be used internally by this module alone
        // transform operations on identity matrix return the same array by mutating (transforming) it everytime they are called
        const mat = IMatrix.cast(this._mat)
        mat[0] = x
        mat[4] = y
        return mat
    }
    rotated(rad) {
        const s = Math.sin(rad)
        const c = Math.cos(rad)
        const mat = IMatrix.cast(this._mat)
        mat[0] = c
        mat[1] = s
        mat[3] = -s
        mat[4] = c
        return mat
    }
    translated(x, y) {
        const mat = IMatrix.cast(this._mat)
        mat[6] = x
        mat[7] = y
        return mat
    }
}
class Matrix {
    constructor() {
        this.iMat = new IMatrix()
        this.temp = IMatrix.createPlain()
    }
    create() {
        return IMatrix.createPlain()
    }
    identity(mat) { // cast into identity matrix
        return IMatrix.cast(mat)
    }
    multiply(a, b) { // a and b are expected in a transposed form
        /**
         * transpose(matA * matB) = transpose(matB) * transpose(matA)
         */
        /**       A                     B
         *  _           _        _           _
         * |             |      |             |
         * |  0   1   2  |      |  0   1   2  |
         * |  3   4   5  |  *   |  3   4   5  |
         * |  6   7   8  |      |  6   7   8  |
         * |_           _|      |_           _|
         *                   =
         * [
         *      a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
         *      a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
         *      a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
         * 
         *      a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
         *      a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
         *      a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
         * 
         *      a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
         *      a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
         *      a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
         * ]
         * 
         */
        const { temp } = this
        temp[0] = a[0] * b[0] + a[1] * b[3] + a[2] * b[6]
        temp[1] = a[0] * b[1] + a[1] * b[4] + a[2] * b[7]
        temp[2] = a[0] * b[2] + a[1] * b[5] + a[2] * b[8]
        temp[3] = a[3] * b[0] + a[4] * b[3] + a[5] * b[6]
        temp[4] = a[3] * b[1] + a[4] * b[4] + a[5] * b[7]
        temp[5] = a[3] * b[2] + a[4] * b[5] + a[5] * b[8]
        temp[6] = a[6] * b[0] + a[7] * b[3] + a[8] * b[6]
        temp[7] = a[6] * b[1] + a[7] * b[4] + a[8] * b[7]
        temp[8] = a[6] * b[2] + a[7] * b[5] + a[8] * b[8]

        for (let i = 0; i < 9; i++) {
            a[i] = temp[i]
        }
    }
    rotate(mat, rad) { // accumulates the results into mat; these aren't pure functions
        return this.multiply(
            mat,
            this.iMat.rotated(rad)
        )
    }
    scale(mat, x, y) {
        return this.multiply(
            mat,
            this.iMat.scaled(x, y)
        )
    }
    translate(mat, x, y) {
        return this.multiply(
            mat,
            this.iMat.translated(x, y)
        )
    }
}

export default Matrix