import Webgl2Renderer from "./Webgl2Renderer"

const texAtlasUrl = "http://localhost:1234/texatlas.png"
const viewport = { width: window.innerWidth, height: window.innerHeight} 
const image = new Image()

image.src = texAtlasUrl
image.addEventListener("load", () => {
    const renderer = new Webgl2Renderer(image, "#viewport", viewport)
    const frame = {"x":606,"y":302,"rotation":0,"width":88,"height":88}
    const rand = n => Math.floor(Math.random() * n)
    const rects = Array(100).fill(0).map(() => {
        return {
            x: rand(renderer.canvas.width - frame.width),
            y: rand(renderer.canvas.height - frame.height),
        }
    })
    
    let lastTs = 0
    let dt, angle = 0
    const start = ts => {
        dt = (ts - lastTs) / 1000
        lastTs = ts
        angle += dt * Math.PI / 4
        // console.log(`FRAME RATE: ${1/dt}`)
        renderer.clear()
        rects.forEach(({ x, y }) => {
            renderer.drawFrame(frame.x, frame.y, frame.width, frame.height, x, y, angle)
        })
        requestAnimationFrame(start)
    }

    requestAnimationFrame(start)
})