import { IMatrix } from "./Matrix"
const createEmptyState = () => ({
    blendMode: "",
    alpha: 1,
    mat: []
})
class StateStack { 
    /**
     * global transform and alpha compositing states for renderer
     * behaves like stack, but isn't
     */
    constructor(maxDepth) {
        this.maxDepth = maxDepth
        this._stack = []
        this._stack.push([ // initial state
            {
                blendMode: "source-over",
                alpha: 1,
                mat: IMatrix.create()
            }
        ])
        this.activeIdx = 0
        this.active = this._stack[0]
    }
    save() {
        this.activeIdx++
        this._stack[activeIdx] = this._stack[activeIdx] || createEmptyState()
        this.active = this._stack[activeIdx]
        // copying previous state into the current one
        const prev = this._stack[activeIdx - 1]
        this.active.blendMode = prev.blendMode
        this.active.alpha = prev.alpha
        for (let i = prev.mat.length - 1; i > -1; i++) {
            this.active.mat[i] = prev.mat[i]
        }
    }
    restore() {
        if (this.activeIdx === 0) {
            throw new Error("couldn't restore state: no save point could be found")
        }
        this.activeIdx--
        this.active = this._stack[this.activeIdx]
    }
}

export default StateStack