import {Application} from "@splinetool/runtime";
import IMask from "imask";
const axios = require('axios');
const css = require('sheetify');
import 'dotenv/config.js'


document.addEventListener("DOMContentLoaded", () => {
    css('./main.css')
    const token = process.env.TG_TOKEN;
    const chatId = process.env.TG_CHAT_ID;

    const body = document.querySelector('body');

    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'wrapper')

    const parent = document.createElement('div')
    parent.setAttribute('class', 'sub_parent')
    wrapper.appendChild(parent)

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
    const closeIcon = document.createElement('i')
    closeIcon.setAttribute('class', 'fa fa-close')
    dialogClose.appendChild(closeIcon)
    closeWrapper.appendChild(dialogClose)
    const dialogHeader = document.createElement('h2')
    dialogHeader.innerText = `Один шаг - и подарок Ваш!`
    const input = document.createElement('input')
    input.setAttribute('class', 'input')
    const submit = document.createElement('button')
    submit.setAttribute('class', 'submit')
    submit.innerText = 'Получить подарок'
    const logo = document.createElement('img')
    logo.setAttribute('src', 'https://cdn.jsdelivr.net/gh/Sundalia/widjety/assets/logoJB.svg')
    logo.setAttribute('class', 'logo')

    form.appendChild(closeWrapper)
    form.appendChild(dialogHeader)
    form.appendChild(input)
    form.appendChild(submit)
    form.appendChild(logo)

    wrapper.appendChild(dialog)

    const success = document.createElement('dialog')
    success.setAttribute('class', 'success')
    const successForm = document.createElement('form')
    successForm.setAttribute('class', 'form')
    const closeSuccessWrapper = document.createElement('div')
    closeSuccessWrapper.setAttribute('class', 'close_popup')
    const successClose = document.createElement('button')
    successClose.setAttribute('class', 'close_success_btn')
    closeSuccessWrapper.appendChild(successClose)
    const thanks = document.createElement('h2')
    thanks.innerText = `Спаибо за желание быть счастливыми!`
    const weCallU = document.createElement('h4')
    weCallU.innerText = `Мы свяжемся с вами в течение получаса`
    successForm.appendChild(closeSuccessWrapper)
    successForm.appendChild(thanks)
    successForm.appendChild(weCallU)
    successForm.appendChild(logo)
    success.appendChild(successForm)

    wrapper.appendChild(success)

    body.insertBefore(wrapper, body.firstChild)

    const mask = new IMask(input, {
        mask: '+7(000)000-00-00'
    })

    const delay = () => {
        return new Promise(resolve => setTimeout(resolve, 3000))
    }
    const spline = new Application(canvas)

    delay().then(()=> {
        spline.load('https://prod.spline.design/m52CqUnTm6OcO98L/scene.splinecode').then(() => {
            canvas.addEventListener("click", () => {
                takeOut.style.display = 'flex'
            })

            takeOut.addEventListener('click', () => {
                console.log('vvv')
                dialog.style.display = 'flex'
            })
            submit.onclick = () => {
                dialog.style.display = 'none'
                success.style.display = 'flex'
                const data = input.value

                axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                    chat_id: chatId,
                    text: `${data}`,
                }).then(() => {
                    console.log('sent')
                }).catch((error) => {
                    console.log(error)
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
})
