import { Application } from './node_modules/@splinetool/runtime/build/runtime.js'
import './main.css'


const canvas = document.getElementById('jetty_canvas')
const takeOut = document.getElementById('take_out')
const dialog = document.getElementById('dialog')
const app = new Application(canvas)
app.load('https://prod.spline.design/m52CqUnTm6OcO98L/scene.splinecode').then(()=>{
    const text = app.findObjectById('671e929a-31eb-45fc-a746-1236a464a8b4')
    console.log(text)
    console.log(app.getAllObjects())
    canvas.addEventListener("click", (e) => {
        takeOut.style.display='flex'
        console.log('f')
    })
    takeOut.addEventListener('click', (e) => {
        dialog.showModal()
        console.log('open')
    })
    document.getElementById('submit').onclick = () => {
        dialog.close()
    }
})