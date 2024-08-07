const isTablet = window.innerWidth < 992;
const isMobile = window.innerWidth < 768;

function getSlidesNumber() {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
}

function CoursesCards() {
    setTimeout(() => {
        var swiper = new Swiper(".course-swiper", {
            spaceBetween: 24,
            slidesPerView: 3,
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
console.log("CoursesCards");
// window.addEventListener("resize", function () {
//     var ww = $(window).width();
//     console.log(ww);
//     if (ww >= 992) Swiper.params.slidesPerView = 3;
//     if (ww < 992) Swiper.params.slidesPerView = 2;
//     if (ww < 768) Swiper.params.slidesPerView = 1;
//     Swiper.reInit();
// });

document.addEventListener("DOMContentLoaded", CoursesCards);
