let currentSlide = 0;

function toggleAnswer(question) {
    const answer = question.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
}

function showModal() {
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function callNumber() {
    alert("Звонок на номер +7 (000) 000-00-00");
}

window.onclick = function(event) {
    if (event.target === document.getElementById('myModal')) {
        closeModal();
    }
};

// Слайдер
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % document.querySelectorAll('.slide').length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + document.querySelectorAll('.slide').length) % document.querySelectorAll('.slide').length;
    showSlide(currentSlide);
}

// Бургер-меню
const burgerMenu = document.getElementById('burger-menu');
const navMenu = document.getElementById('nav-menu');
const closeBtn = document.getElementById('close-btn');

burgerMenu.onclick = function() {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
};

closeBtn.onclick = function() {
    navMenu.style.display = 'none';
};

// Инициализация первого слайда
showSlide(currentSlide);
