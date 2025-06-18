import {Application} from "@splinetool/runtime";
import IMask from "imask";
const axios = require("axios").default;
const css = require('sheetify');


document.addEventListener("DOMContentLoaded", () => {
    css('./main.css')
    const token = "7981426506:AAGB3VXGzAKFC2RFutREfH_9hfxvKmFeyj0"
    const chatId = "-4792672488"

    const body = document.querySelector('body');

    const parent = document.createElement('div')
    parent.setAttribute('class', 'sub_parent')
    body.appendChild(parent)

    const takeOut = document.createElement('div')
    takeOut.setAttribute('class', 'take_out')
    parent.appendChild(takeOut)

    const canvas = document.createElement('canvas')
    canvas.setAttribute('class', 'jetty_canvas')
    parent.appendChild(canvas)

    const dialog = document.createElement('dialog')
    dialog.setAttribute('class', 'dialog')
    const form = document.createElement('form')
    form.setAttribute('class', 'form')
    dialog.appendChild(form)
    const closeWrapper = document.createElement('div')
    closeWrapper.setAttribute('class', 'close_popup')
    const dialogClose = document.createElement('button')
    dialogClose.setAttribute('class', 'close_popup_btn')
    const closeIcon = document.createElement('img')
    closeIcon.setAttribute('class', 'close_icon')
    closeIcon.setAttribute('src', 'https://cdn.jsdelivr.net/gh/Sundalia/widjety/assets/close.svg')
    dialogClose.appendChild(closeIcon)
    closeWrapper.appendChild(dialogClose)
    const dialogHeader = document.createElement('h2')
    dialogHeader.innerText = `Один шаг - и подарок Ваш!`
    const input = document.createElement('input')
    input.setAttribute('placeholder', '+7(999)00-00-000')
    input.setAttribute('class', 'input')
    const submit = document.createElement('button')
    submit.setAttribute('class', 'submit')
    submit.innerText = 'Получить подарок'
    const logoHref = document.createElement('a')
    logoHref.setAttribute('href', 'https://jetybox.com/')
    const logo = document.createElement('img')
    logo.setAttribute('src', 'https://cdn.jsdelivr.net/gh/Sundalia/widjety/assets/logoJB.svg')
    logo.setAttribute('class', 'logo')
    logoHref.appendChild(logo)

    form.appendChild(closeWrapper)
    form.appendChild(dialogHeader)
    form.appendChild(input)
    form.appendChild(submit)
    form.appendChild(logoHref)

    body.appendChild(dialog)

    const success = document.createElement('dialog')
    success.setAttribute('class', 'dialog')
    const successForm = document.createElement('form')
    successForm.setAttribute('class', 'form')
    const closeSuccessWrapper = document.createElement('div')
    closeSuccessWrapper.setAttribute('class', 'close_popup')
    const successClose = document.createElement('button')
    successClose.setAttribute('class', 'close_success_btn')
    const closeIconSuccess = document.createElement('img')
    closeIconSuccess.setAttribute('class', 'close_icon')
    closeIconSuccess.setAttribute('src', 'https://cdn.jsdelivr.net/gh/Sundalia/widjety/assets/close.svg')
    successClose.appendChild(closeIconSuccess)
    closeSuccessWrapper.appendChild(successClose)
    const thanks = document.createElement('h2')
    thanks.innerText = `Спасибо!`
    const weCallU = document.createElement('h4')
    weCallU.innerText = `Мы свяжемся с вами в течение получаса`
    const logoSuccess = document.createElement('img')
    const successHref = document.createElement('a')
    successHref.setAttribute('href', 'https://jetybox.com/')
    logoSuccess.setAttribute('src', 'https://cdn.jsdelivr.net/gh/Sundalia/widjety/assets/logoJB.svg')
    logoSuccess.setAttribute('class', 'logo')
    successHref.appendChild(logoSuccess)
    successForm.appendChild(closeSuccessWrapper)
    successForm.appendChild(thanks)
    successForm.appendChild(weCallU)
    successForm.appendChild(successHref)
    success.appendChild(successForm)

    body.appendChild(success)

    body.insertBefore(parent, body.firstChild)

    const mask = new IMask(input, {
        mask: '+7(000)000-00-00'
    })

    const delay = () => {
        return new Promise(resolve => setTimeout(resolve, 3000))
    }
    const spline = new Application(canvas)

    delay().then(()=> {
        spline.load('https://prod.spline.design/m52CqUnTm6OcO98L/scene.splinecode').then(() => {
            canvas.addEventListener("touchend", () => {
                takeOut.style.display = 'flex'
            })
            canvas.addEventListener("click", () => {
                takeOut.style.display = 'flex'
            })

            takeOut.addEventListener('touchend', (e) => {
                e.preventDefault()
                dialog.style.display = 'flex'
                takeOut.style.display = 'none'
            })
            takeOut.addEventListener('click', () => {
                dialog.style.display = 'flex'
                takeOut.style.display = 'none'
            })

            submit.onclick = async (event) => {
                if(input.value === '' ) {
                    event.preventDefault()
                    dialog.style.display = 'none'
                    success.style.display = 'flex'
                    const data = input.value
                    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                        chat_id: chatId,
                        text: `${data}+\nfrom:${window.location.href}`,

                    }).then((res) => {
                        console.log(res)
                    }).catch((error) => {
                        console.error(error)
                    })
                }else{
                    alert("Укажите номер телефона")
                }

            }
            dialogClose.addEventListener('touchend', (e) => {
                e.preventDefault()
                dialog.style.display = 'none'
            })
            dialogClose.addEventListener('click', (e) => {
                e.preventDefault()
                dialog.style.display = 'none'
            })

            successClose.addEventListener("touchend", (e) => {
                e.preventDefault()
                success.style.display = 'none'
            })
            successClose.addEventListener("click", (e) => {
                e.preventDefault()
                success.style.display = 'none'
            })
        })
    })
})
