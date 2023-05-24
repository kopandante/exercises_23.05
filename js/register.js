(() => {

    let email = document.querySelector('.email');
    let password = document.querySelector('.password');
    let submit =  document.querySelector('.submitBtn');

    if (localStorage.getItem('loggedIn')) {
        window.location = 'index.html';
    }

    submit.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (!email.value || !password.value) {
            alert('Empty input!');
            return;
        }

        let user = { 'email': email.value, 'password': password.value };
        let lsUsers = localStorage.getItem('users');
        let users;
        if (lsUsers) {
            users = JSON.parse(lsUsers);
            if (users.find(el => el['email'] === email.value)) {
                alert('User already exists!');
                window.location = 'auth.html';
                return;
            } else {
                users.push(user);
            }
        } else {
            users = [user];
        }
        localStorage.setItem('users', JSON.stringify(users));
        window.location = 'auth.html';
    })

})();