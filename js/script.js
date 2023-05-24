(() => {

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

    console.log(typeof Array(3));
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

    let add = (el) => {
        el.preventDefault();
        let card = create('div', document.querySelector('.row'));
        create(['h4', 'img', 'p'], card);
        let buttonInline = create('div', card);
        create(['button', 'button'], buttonInline);

        let b1 = card.querySelector('button:first-of-type');
        b1.textContent = 'Delete';
        b1.addEventListener('click', () => { this.closest('.row > div').remove()} );

        let b2 = card.querySelector('button:last-of-type');
        b2.textContent = 'Edit';
        b2.addEventListener('click', load);

        resetForm();
    }

    let load =  () => {
        current['card'] = this.closest('.row > div');
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

})();
