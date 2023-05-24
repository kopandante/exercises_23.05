(() => {

    if (!localStorage.getItem('loggedIn')) window.location = 'auth.html';

    let data = {
        'h4': document.querySelector('.title'),
        'p': document.querySelector('.description'),
        'img':  document.querySelector('.image'),
        'submit': document.querySelector('.addTodo'),
    }

    let current = {};

    data['h4'].value = 'Погладить котика';
    data['p'].value = 'Котик очень нуждается в поглаживании';
    data['img'].value = 'https://www.purina.ru/sites/default/files/2021-06/Getting-A-Cat_4f6f9e2c-d6f9-434e-9225-5da106a1c1a8_1_0_3.jpg';

    let create = (elements, parent) => {
        if (Array.isArray(elements)) {
            elements.forEach(el => create(el, parent));
        } else {
            let element = document.createElement(elements);
            if (elements === 'img') {
                element.src = data[elements].value;
            } else if (data[elements]) {
                element.textContent = data[elements].value;
            }
            if (parent) {
                parent.appendChild(element);
            }
            return element;
        }
    }

    let create_card = () => {
        let card = create('div', document.querySelector('.row'));
        create(['h4', 'img', 'p'], card);
        let buttonInline = create('div', card);
        create(['button', 'button'], buttonInline);

        let b1 = card.querySelector('button:first-of-type');
        b1.textContent = 'Delete';
        b1.addEventListener('click', (evt => del(card, evt)));

        let b2 = card.querySelector('button:last-of-type');
        b2.textContent = 'Edit';
        b2.addEventListener('click', (evt => load(card, evt)));

    }
    let add = (el) => {
        if (el) el.preventDefault();
        create_card();
        save_to_ls();
        resetForm();
    }

    let del = (card, evt) => {
        evt.preventDefault();
        card.remove()
        save_to_ls();
    }
    let load = (card, evt) => {
        evt.preventDefault();

        current['card'] = card;
        current['h4'] = current['card'].querySelector('h4');
        current['p'] = current['card'].querySelector('p');
        current['img'] = current['card'].querySelector('img');

        data['h4'].value = current['h4'].textContent;
        data['p'].value = current['p'].textContent;
        data['img'].value = current['img'].src;

        data['submit'].innerText = 'Save';
        data['submit'].removeEventListener('click', add);
        data['submit'].addEventListener('click', save);
    }

    let save = (ev) => {
        ev.preventDefault();

        current['h4'].textContent = data['h4'].value;
        current['p'].textContent = data['p'].value;
        current['img'].src = data['img'].value;

        save_to_ls();
        resetForm();
    }

    let resetForm = () => {

        data['h4'].value = 'Погладить другого котика';
        data['p'].value = 'Этот котик тоже нуждается в поглаживании';
        data['img'].value = 'https://www.purina.ru/sites/default/files/2021-10/abisinskaya-1.jpg';

        data['submit'].innerText = 'Add todo';
        data['submit'].removeEventListener('click', save);
        data['submit'].addEventListener('click', add);
    }


    data['submit'].addEventListener('click', add);

    let save_to_ls = () => {
        let cards = document.querySelectorAll('.row > div');
        let result = [];
        for (let card of cards) {
            console.log(card);
            let card_data = {
                'title': card.querySelector('h4').textContent,
                'description': card.querySelector('p').textContent,
                'imageUrl': card.querySelector('img').src,
            }
            result.push(card_data);
        }
        localStorage.setItem('todo_items', JSON.stringify(result));
    }

    let load_from_ls = () => {
        let ls_data = JSON.parse(localStorage.getItem('todo_items'));
        console.log(ls_data);
        for (let item of ls_data) {
            data['h4'].value = item['title'];
            data['p'].value = item['description'];
            data['img'].value = item['imageUrl'];
            create_card();
            resetForm();
        }
    }

    load_from_ls();

})();
