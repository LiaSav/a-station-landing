$(document).ready(function () {
  $('.slider').on('init', (slick, slick1) => {
    if (document.documentElement.clientWidth < 991) {
      slick1.$slideTrack[0].style.cssText += `
      position:relative;
      right: ${slick1.slideWidth - (slick1.slideWidth * 1.2)}px;
    `;
    }
  })
  $('.slider').on('init', (slick, slick1) => {
    if (document.documentElement.clientWidth < 575) {
      slick1.$slideTrack[0].style.cssText += `
      position:relative;
      right: ${slick1.slideWidth - (slick1.slideWidth * .2)}px;
    `;
    }
  })
  $('.slider').slick({
    speed: 1000,
    adaptiveHeight: true,
    swipe: true,
    // centerMode: false,
    slidesToShow: 1,
    lidesToScroll: 1,
    nextArrow: '<button type="button" class="slick-next"></button>',
    prevArrow: '<button type="button" class="slick-prev"></button>',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        }
      },
    ],
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      $('.pageup').css('display', 'block');
    } else {
      $('.pageup').css('display', 'none');
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const openElem = document.querySelector('#header-call-button'),
    openElemMobile = document.querySelector('.header__call-mobile'),
    openElemFooter = document.querySelector('#footer-call-button'),
    popup = document.querySelector('.popup'),
    closeElem = document.querySelector('.popup__close');
  openElem.addEventListener('click', function () {
    popup.classList.add('active');
  });
  openElemMobile.addEventListener('click', function () {
    popup.classList.add('active');
  });
  openElemFooter.addEventListener('click', function () {
    popup.classList.add('active');
  });
  closeElem.addEventListener('click', function () {
    popup.classList.remove('active');
  });

  const placeHolder = document.querySelector('.place-holder-pop-up'),
    input = document.querySelector('.input-tel-pop-up');
  placeHolder.addEventListener('click', function () {
    placeHolder.style.display = 'none';
    input.focus();
  });
});

var myElement = document.querySelector('header');
// construct an instance of Headroom, passing the element
var headroom = new Headroom(myElement, {
  onUnpin: function () { },
  onPin: function () { },
});
// initialise
headroom.init();

/** Стрелка переключатель в зависимости от положения на экране */
function sideSwitchArrow(swiper, arrow, container) {
  const mediumCordValue = document.documentElement.clientWidth / 2;
  document.body.append(arrow);
  container.style.cursor = 'none';
  arrow.style.cursor = 'none';
  arrow.style.zIndex = 1000;
  arrow.style.position = 'fixed';
  arrow.__proto__.hide = function () {
    this.style.opacity = '0';
    this.style.pointerEvents = 'none';
  };
  arrow.__proto__.show = function () {
    this.style.opacity = '1';
    // this.style.pointerEvents = 'auto';
  };
  arrow.dataset.side = 'leftSide';

  container.addEventListener('mousemove', desktopNavButtonHandler);
  container.addEventListener('mouseenter', () => {
    arrow.show();
  });
  container.addEventListener('mouseleave', () => {
    arrow.hide();
  });
  if (document.documentElement.clientWidth < 769) {
    window.removeEventListener('mousemove', desktopNavButtonHandler);
    arrow.remove();
  }

  /** Записывает координаты обьекта, на котором нужно скрыть стрелку переключения слайдера */
  /** ms ---> main-screen */

  function desktopNavButtonHandler(evt) {
    // arrow.style.position = 'fixed';
    arrow.style.left = `${evt.clientX - 18}px`;
    arrow.style.top = `${evt.clientY - 18}px`;

    getCursorSide(evt.clientX);
    handleArrowVisibility(evt);
  }

  function handleArrowVisibility() { }

  function getCursorSide(x) {
    if (x < mediumCordValue) {
      arrow.classList.add('left-side');
      arrow.dataset.side = 'leftSide';
      // switchGallerySlide('leftSide');
    } else {
      arrow.classList.remove('left-side');
      arrow.dataset.side = 'rightSide';
      // switchGallerySlide('rightSide')
    }
  }
  function changeMe() {
    switchGallerySlide(arrow.dataset.side);
  }
  container.addEventListener('click', changeMe);
  if (document.documentElement.clientWidth < 576) {
    container.removeEventListener('click', changeMe);
  }
  const navigate = {
    leftSide: () => {
      // swiper.slidePrev();
      document.querySelector('.slick-prev').click();
    },
    rightSide: () => {
      // swiper.slideNext();
      document.querySelector('.slick-next').click();
    },
  };

  function switchGallerySlide(side) {
    navigate[side]();
    return navigate.side;
  }

  // eslint-disable-next-line no-unused-vars
}
sideSwitchArrow({}, document.querySelector('.moving-arrow'), document.querySelector('.slider'));
/** СТрелка переключатель в зависимости от положения на єкране END */


const sectionBg = document.querySelector('[data-section-bg]');
const sectionBgWrapper = document.querySelector('[data-section-bg-wrapper]');
const changeBgLinks = document.querySelectorAll('[data-change-bg]');

changeBgLinks.forEach((link) => {

  link.addEventListener('mouseenter', () => {
    sectionBgWrapper.classList.add('with-bg');
    if (getComputedStyle(sectionBg).backgroundImage === `url('${link.dataset.changeBg}')`) return;
    gsap.timeline()
      .add(() => link.classList.add('current'))
      .to(sectionBg, { autoAlpha: 0, duration: 0.1 })
      .set(sectionBg, { backgroundImage: `url('${link.dataset.changeBg}')` })
      .to(sectionBg, { autoAlpha: 1, duration: 0.1 })
      .add(() => link.classList.remove('current'))
  })
  link.parentElement.addEventListener('mouseleave', () => {
    gsap.timeline()
      .to(sectionBg, { autoAlpha: 0, duration: 0.25 })
    sectionBgWrapper.classList.remove('with-bg');
  })

})
