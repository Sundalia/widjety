import { Application } from '@splinetool/runtime'
import './main.css'
import axios from "axios"
import IMask from "imask"


const canvas = document.getElementById('jetty_canvas')
const takeOut = document.getElementById('take_out')
const dialog = document.getElementById('dialog')
const input = document.getElementById('input')
const success = document.getElementById('success')
const submit = document.getElementById('submit')
const dialogClose = document.getElementById('close_popup_btn')
const successClose = document.getElementById('close_success_btn')


const token = import.meta.env.VITE_TG_TOKEN
const chatId = import.meta.env.VITE_TG_CHAT_ID


const spline = new Application(canvas)
const mask = new IMask(input, {
    mask: '+7(000)000-00-00'
})

const delay = ()=>{
    return new Promise(resolve => setTimeout(resolve,  3000))
}

await delay().then(()=> {
    spline.load('https://prod.spline.design/m52CqUnTm6OcO98L/scene.splinecode').then(() => {
        canvas.addEventListener("click", (e) => {
            takeOut.style.display = 'flex'
        })
        canvas.addEventListener("touchend", (e) => {
            takeOut.style.display = 'flex'
        })
        takeOut.addEventListener('click', (e) => {
            dialog.style.display = 'flex'
        })
        submit.onclick = () => {
            dialog.style.display = 'none'
            const data = input.value

            axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                chat_id: chatId,
                text: `${data}`,
            }).then((response) => {
                console.log('sent')
            }).catch((error) => {
                console.log(error)
            })
            success.style.display = 'flex'
            success.addEventListener('click', () => {
                success.style.display = 'none'
            })
        }
        dialogClose.addEventListener('click', () => {
            dialog.style.display = 'none'
        })
        successClose.addEventListener("click", () => {
            success.style.display = 'none'
        })
    })
})