document.getElementById("main-action").onclick = function () {
    document.getElementById("cars").scrollIntoView({behavior: "smooth"});
}

var buttons = document.getElementsByClassName("car-button");

for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        document.getElementById("price").scrollIntoView({behavior: "smooth"});
    }
}

let form = document.forms.reqForm;

form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    let name = form.elements.name.value;
    let phone = form.elements.phone.value;
    let car = form.elements.car.value;

    if (!name || !phone || !car) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    if (!isValidName(name)) {
        alert('Имя может содержать только буквы');
        return;
    }

    if (!isValidCar(car)) {
        alert('Название автомобиля может содержать только буквы на латинице и цифры');
        return;
    }

    if (!isValidPhone(phone)) {
        alert('Некорректный номер телефона');
        return;
    }

    form.submit();
});

function isValidName(name) {
    const pattern = /^[а-яА-Я]+$/;
    return pattern.test(name);
}

function isValidCar(name) {
    const pattern = /^[a-zA-Z0-9]+$/;
    return pattern.test(name);
}

function isValidPhone(number) {
    const pattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    return pattern.test(number);
}


document.addEventListener("DOMContentLoaded", function () {

    // Картинка смещается влево при прокрутке (Автомобиль "подъезжает")
    const elem = document.querySelector(".main");
    document.addEventListener('scroll', () => {
        elem.style.backgroundPositionX = '-0' + (0.2 * window.scrollY) + 'px';
    })

    // Картинка смещается за курсором
    let layer = document.querySelector('.price-image');
    document.addEventListener('mousemove', (event) => {
        layer.style.transform = 'translate3d(' + ((event.clientX * 0.35) / 8) + 'px,' + ((event.clientY * 0.35) / 8) + 'px,0px)';
    });

});