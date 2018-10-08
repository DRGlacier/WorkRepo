window.onload = function() {
    //show/hide button to top
    window.onscroll = function() {
        const toTop = document.querySelector('.arrow-to-top')
        if (window.pageYOffset >= 600) {
            toTop.classList.add('active')
        } else {
            toTop.classList.remove('active')
        }
    }

    //activate menu button
    const burger = document.querySelector('.menuToggleBtn')
    burger.addEventListener('click', function() {
        menu = document.querySelector('.header__list')
        burger.classList.toggle('toggleBtnActive')
        menu.classList.toggle('menuActive')
    })

    //scroll
    const anchors = document.querySelectorAll('a[href*="#"]')
    for (let anchor of anchors) {
        anchor.addEventListener('click', function(e) {
            if (!this.getAttribute('data-noscroll')) {
                e.preventDefault()

                const blockID = anchor.getAttribute('href')

                document.querySelector('' + blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }
        })
    }

    //form animations
    const inputs = document.querySelectorAll('[data-type="input"]'),
        labels = document.querySelectorAll('[data-type="label"]')

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('focus', function() {
            labels[i].style.top = '-5px'
            labels[i].style.fontSize = '18px'
        })

        inputs[i].addEventListener('blur', function() {
            if (!this.value) {
                labels[i].style.top = '30px'
                labels[i].style.fontSize = '20px'
            }
        })
    }

    //form validate
    form = document.querySelector('form')

    form.onsubmit = function() {
        const nameReg = new RegExp('^[а-яА-ЯёЁa-zA-Z]'),
            mailReg = new RegExp('[@]'),
            phoneReg = new RegExp('[0-9]'),
            //fields
            nameFiled = document.querySelector('input[type="text"]'),
            mailFiled = document.querySelector('input[type="email"]'),
            phoneFiled = document.querySelector('input[type="tel"]')

        let nameValid = false,
            mailValid = false,
            phoneValid = false

        if (!nameReg.test(nameFiled.value)) {
            nameFiled.style.borderColor = 'red'
            document.querySelector('label[for=name]').style.color = 'red'
            nameValid = false
        } else {
            document.querySelector('label[for=name]').style.color = 'white'
            nameFiled.style.borderColor = 'white'
            nameValid = true
        }

        if (!mailReg.test(mailFiled.value)) {
            mailFiled.style.borderColor = 'red'
            document.querySelector('label[for=email]').style.color = 'red'
            mailValid = false
        } else {
            document.querySelector('label[for=email]').style.color = 'white'
            mailFiled.style.borderColor = 'white'
            mailValid = true
        }

        if (!phoneReg.test(phoneFiled.value)) {
            phoneFiled.style.borderColor = 'red'
            document.querySelector('label[for=phone]').style.color = 'red'
            phoneValid = false
        } else {
            document.querySelector('label[for=phone]').style.color = 'white'
            phoneFiled.style.borderColor = 'white'
            phoneValid = true
        }

        let valid = nameValid && mailValid && phoneValid

        return valid
    }
}
