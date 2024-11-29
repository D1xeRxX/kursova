window.onload = function () {
    const defaultSlide = document.querySelector('.main__offer__install');
    defaultSlide.classList.add('default-active'); 
};

function showSlide(type) {
    let slides = document.querySelectorAll('.main__offer__install');

    slides.forEach(slide => {
        const title = slide.querySelector('.main__offer__install-desc-title').textContent.trim();

        if (title === type) {
            slide.style.display = 'flex'; 
            setTimeout(() => {
                slide.classList.add('active'); 
                slide.classList.remove('default-active'); 
            }, 10);
        } else {
            slide.classList.remove('active'); 
            slide.classList.remove('default-active'); 
            setTimeout(() => (slide.style.display = 'none'), 500); 
        }
    });
}

document.getElementById('commercial').onclick = function () {
    showSlide('Commercial');
};

document.getElementById('residential').onclick = function () {
    showSlide('Residential');
};

document.getElementById('industrial').onclick = function () {
    showSlide('Industrial');
};


const slides = document.querySelectorAll('.main__clients__testimonial-comment');
let currentSlide = 0;

function changeSlide(next = true) {
    slides[currentSlide].classList.remove('active', 'slide-in-right', 'slide-in-left');
    const oldSlide = currentSlide;
    currentSlide = next ? (currentSlide + 1) % slides.length : (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('active', next ? 'slide-in-right' : 'slide-in-left');
}

document.getElementById('next').onclick = function () {
    changeSlide(true);
};

document.getElementById('prev').onclick = function () {
    changeSlide(false);
};

const time = 1000;
const step = 1;

function outNum(num, element, time = 2000, step = 1) {
    let n = 0;
    const t = Math.round(time / (num / step));

    const interval = setInterval(() => {
        n += step;
        if (n >= num) {
            clearInterval(interval);
            n = num; 
        }
        element.textContent = n;
    }, t);
}

function animateOnView(selector) {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const numText = element.textContent.replace(/\D/g, ''); 
                const num = parseInt(numText, 10);

                if (!isNaN(num)) {
                    outNum(num, element);
                }
                
                observer.unobserve(element); 
            }
        });
    }, {
        threshold: 0.5 
    });
    
    elements.forEach(element => observer.observe(element));
}

animateOnView('.main__welcome__desc-exp-years-title');

animateOnView('.main__reasons__poster-stats-item-num');

