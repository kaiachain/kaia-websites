function CoursesCards() {
    setTimeout(() => {
        var swiper = new Swiper(".course-swiper", {
            spaceBetween: 24,
            slidesPerView: 1,
            breakpoints: {
                478: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 3,
                },
            },
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            updateOnWindowResize: true,
        });
    }, 200);
}

document.addEventListener("DOMContentLoaded", CoursesCards);
