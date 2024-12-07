document.addEventListener('DOMContentLoaded', () => {
    // ** Работа с аккордеонами **
    const accordions = document.querySelectorAll('.accordion__trigger');
    
    accordions.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const accordion = trigger.closest('.accordion'); 
            accordion.classList.toggle('open'); 
        });
    });

    // ** Вложенные ссылки в шапке **
    const linkExpandToggle = document.querySelector('.link_expand__toggle');
    const linkExpandContent = document.querySelector('.link_expand__content');

    linkExpandToggle.addEventListener('mouseenter', () => {
        linkExpandContent.parentElement.classList.add('open');
    });

    linkExpandToggle.addEventListener('mouseleave', () => {
        linkExpandContent.parentElement.classList.remove('open');
    });

    // ** Модальное окно **
    const makeRequestModal = document.querySelector('#make_request');
    const makeRequestButtons = document.querySelectorAll('#openModal');

    // Открытие модального окна по клику на кнопки
    makeRequestButtons.forEach(button => {
        button.addEventListener('click', () => {
            makeRequestModal.showModal();
        });
    });

    // Закрытие модального окна
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            makeRequestModal.close();
        });
    }

    // Закрытие модального окна при клике вне него
    makeRequestModal.addEventListener('click', (event) => {
        if (event.target === makeRequestModal) {
            makeRequestModal.close();
        }
    });

    // Закрытие модального окна при нажатии клавиши ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            makeRequestModal.close();
        }
    });

    // ** Валидация формы **
    const form = document.querySelector('.make_request_form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailField = form.email;
            const email = emailField.value;

            // Валидация email
            if (!email) {
                alert('Поле email не должно быть пустым.');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Введите корректный email.');
                return;
            }

            // Отправка данных с помощью fetch
            try {
                const response = await fetch('https://dummyjson.com/docs/products#products-add', { // Замените на фактический URL
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    alert('Заявка успешно отправлена!');
                    makeRequestModal.close();
                } else {
                    alert('Ошибка при отправке заявки.');
                }
            } catch (error) {
                alert('Произошла ошибка: ' + error.message);
            }
        });
    }

    // ** Открытие модального окна после секции "Вопрос-ответ" **
    const questionAnswerBlock = document.querySelector('.faq'); // Блок "Вопрос-ответ"
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0 // Срабатывание, когда блок полностью виден
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                makeRequestModal.showModal();
                observer.unobserve(entry.target); // Останавливаем наблюдение после открытия модального окна
            }
        });
    }, options);

    observer.observe(questionAnswerBlock);
});
