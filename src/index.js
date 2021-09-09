import Webgl2Renderer from "./Webgl2Renderer"

const texAtlasUrl = "http://localhost:1234/texatlas.png"
const viewport = { width: window.innerWidth, height: window.innerHeight}
const image = new Image()

image.src = texAtlasUrl
image.addEventListener("load", () => {
    const renderer = new Webgl2Renderer({ image, cnvQry: "#viewport", viewport})
    const frame = {"x":606,"y":302,"rotation":0,"width":88,"height":88}
    const rand = n => Math.floor(Math.random() * n)
    const sprites = Array(100).fill(0).map(() => {
        return {
            pos: {
                x: rand(renderer.canvas.width - frame.width),
                y: rand(renderer.canvas.height - frame.height),
            },
            type: "TEXTURE",
            meta: {
                ...frame
            },
            w: frame.width,
            h: frame.height,
            rotation: 0,
            anchor: {
                x: frame.width / 2,
                y: frame.height / 2
            }
        }
    })

    let lastTs = 0
    let dt
    const start = ts => {
        dt = (ts - lastTs) / 1000
        lastTs = ts
        // console.log(`FRAME RATE: ${1/dt}`)
        renderer.clear()
        sprites.forEach(sprite => {
            sprite.rotation += dt * Math.PI
        })
        sprites.forEach(renderer.render.bind(renderer))
        requestAnimationFrame(start)
    }

    requestAnimationFrame(start)
})