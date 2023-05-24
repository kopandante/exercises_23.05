(() => {
    let email = document.querySelector('.email');
    let password = document.querySelector('.password');
    let submit =  document.querySelector('.submitBtn');
    let lsUsers = localStorage.getItem('users');

    if (localStorage.getItem('loggedIn')) window.location = 'index.html';
    if (!lsUsers) window.location = 'register.html';

    let check = (el) => {
        if (el['email'] !== email.value) return false;
        if (el['password'] !== password.value) {
            alert('Incorrect password!');
            return true;
        }
        localStorage.setItem('loggedIn', '1');
        window.location = 'index.html';
        return true;
    }

    submit.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (!email.value || !password.value) {
            alert('Empty input!');
            return;
        }

        if (!JSON.parse(lsUsers).find(el => check(el))) {
            alert('Email is not registered!');
        }
    })
})();

