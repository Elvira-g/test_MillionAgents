const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const name = document.querySelector('.name');
const surname = document.querySelector('.surname');
const tel = document.querySelector('.tel');
const pass2 = document.querySelector('.pass-2');
const passConfirmation2 = document.querySelector('.passConfirmation2');
const errorField = document.querySelector('.error-field');

let password = '';
let passConf = '';
let result = {};

// Проверяем длину введенных данных
const isBetween = (length, min, max) => length < min || length > max ? false : true;

// Отменяем событие по-умолчанию после тправки данных
form.addEventListener('submit', function(e){
    e.preventDefault();
    let isNameValid = checkName(name);
    let isSurnameValid = checkSurname(surname);
    let isTelValid = checkTel(tel);
    let isPassValid = checkPass2(password);
    let isPassConfirmationValid = checkPassConfirmation2(password, passConf);
    let isFormValid = isNameValid && isSurnameValid && isTelValid && isPassValid && isPassConfirmationValid;
    if ( isFormValid ) {
        result.name = name.value;
        result.surname = surname.value;
        result.tel = tel.value;
        result.password = password;
        result.passConf = password;
        console.log(result)
        console.log('yes')
    } else {
        console.log('error')
    }

})


// Добавляем 7 при вводе номера телефона
tel.addEventListener('focus',(_) => {
    if(tel.value) {
        return
    } else {
       tel.value = '7' 
    }
})

// Отменяем ввод не цифр
tel.addEventListener('keypress', (e) => {
    if(!/\d/.test(e.key)) {
        e.preventDefault()
    }
})

// Удалаем ошибки при вводе новых данных
inputs.forEach((input) => {
    input.addEventListener('input', function(){
        removeError(input);
    })
})

// Обрабатываем введные данные в поле пароля, скрываем отображение
pass2.addEventListener('input', function () {
    if ( pass2.value.length != 0 ) {
        password += pass2.value[pass2.value.length - 1]; 
     }
     let newInput = pass2.value.replace(/\d|\w|[а-я]|[А-Я]/, '*');
     pass2.value = newInput;
})

passConfirmation2.addEventListener('input', function() {
    passConf += passConfirmation2.value[passConfirmation2.value.length - 1];
    let newInput = passConfirmation2.value.replace(/\d|\w|[а-я]|[А-Я]/, '*');
    passConfirmation2.value = newInput;

})

// Событие на удаление данных из поля пароля
pass2.addEventListener('keydown', function(e) {
    if(e.keyCode == 8) {
      password = '';
      pass2.value = '';
    }
    
})

passConfirmation2.addEventListener('keydown', function(e) {
    if(e.keyCode == 8) {
      passConf = '';
      passConfirmation2.value = '';
    }
    
})

// Проверяем имя
function checkName (name) {
    if (!isBetween(name.value.length, 1, 15)) {
        showError(name, 'Длина имени не может быть меньше 1 и больше 15');
        name.value = '';
        return false
    }
    const regExp = /[a-z]|[A-Z]/;
    if (!regExp.test(name.value)) {
        showError(name, 'Имя может содержать только латинские буквы');
        name.value = '';
        return false;
    } else {
        return true;
    }
}
// Проверяем фамилию
function checkSurname (surname) {
    if (surname.value.length < 2) {
        showError(surname, 'Длина фамилии не может быть меньше 2');
        surname.value = '';
        return false
    }
    const regExp = /[a-z]|[A-Z]/;
    if (!regExp.test(surname.value)) {
        showError(surname, 'Фамилия может содержать только латинские буквы');
        surname.value = '';
        return false;
    } else {
        return true;
    }
}

// Проверяем номер телефона
function checkTel (tel) {
    if (tel.value.length < 11 ) {
        showError(tel, 'Номер телефона не должен содержать 11 цифр');
        tel.value = '';
        return false;
    }
    const regExp = /[1-9]/;
    if (!regExp.test(tel.value)) {
        showError(tel, 'Данные введены неверно');
        tel.value = '';
        return false;
    } else {
        return true;
    }
}

// Проверяем пароль
function checkPass2 (pass) {
    if ( pass.length < 6 ){
        showError(pass2, 'Пароль должен быть не менее 6 символов');
        pass2.value = '';
        password = '';
        return false;
    }
    const regExp = /^(?=.*[а-я])(?=.*[А-Я])(?=.*[0-9])([0-9а-яА-Я]{6,})/;

    if (!regExp.test(pass)) {
        showError(pass2, 'Пароль должен содержать цифры, строчные и прописные буквы на кириллице');
        pass2.value = '';
        password = '';
        return false; 
    } else {
        return true;
    }
}
// Проверяем подтверждение пароля
function checkPassConfirmation2 (pass, passConf ) {
    if ( pass !== passConf) {
        showError(passConfirmation2, 'Пароль не совпадает');
        return false;
    } else {
        return true;
    }
}

// Выводим ошибку
function showError (input, message) {
    const error = input.nextElementSibling;
    error.style.color = 'red';
    error.innerHTML = message;
}
//Удаляем ошибку
function removeError (input) {
    const error = input.nextElementSibling;
    error.innerHTML = '';
}
