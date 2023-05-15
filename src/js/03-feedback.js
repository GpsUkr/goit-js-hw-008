import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', onFormSubmit);

let dataForm = {};

reloadPage();

function onInputData(e) {
    dataForm[e.target.name] = e.target.value.trim();
    localStorage.setItem(LOCAL_KEY, JSON.stringify(dataForm));
}

function reloadPage() {
    const data = localStorage.getItem(LOCAL_KEY)
    if (!data) return
    dataForm = JSON.parse(data)
    Object.entries(dataForm).forEach(([key, value]) => {
        form.elements[key].value = value
    })
}

function onFormSubmit(e) {
    e.preventDefault();
    console.log(dataForm);

    // if (email.value === '' || message.value === '') {
    //     return alert('Please fill in all the fields!');
    // }

    localStorage.removeItem(LOCAL_KEY);
    e.currentTarget.reset();
    dataForm = {};
}
