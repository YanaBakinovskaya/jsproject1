
//window.addEventListener('load');
window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  //tabs
  function workWithTab(classNameParentTab, classNameTab, classNameTabContent) {
    let info = document.querySelector(classNameParentTab),
      tab = document.querySelectorAll(classNameTab),
      tabContent = document.querySelectorAll(classNameTabContent);

    function hideTabContent(a) {
      for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
      }
    }

    hideTabContent(1);

    function showTabContent(b) {
      if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
      }
    }

    info.addEventListener('click', function (event) {
      let target = event.target;
      if (target && target.classList.contains('info-header-tab')) {
        for (let i = 0; i < tab.length; i++) {
          if (target == tab[i]) {
            hideTabContent(0);
            showTabContent(i);
            break;
          }
        }
      }
    });
  }

  workWithTab('.info-header', '.info-header-tab', '.info-tabcontent');

  //timer
  let deadline = '2019-04-06';

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)));

    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds'),
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);

      function checkTime(i) {
        if (i < 10) {
          i = '0' + i;
        }
        return i;
      }

      function timerWithZero(elem, t) {
        elem.textContent = checkTime(t);
      }

      timerWithZero(hours, t.hours);
      timerWithZero(minutes, t.minutes);
      timerWithZero(seconds, t.seconds);

      if (t.total < 0) {
        timerWithZero(hours, 0);
        timerWithZero(minutes, 0);
        timerWithZero(seconds, 0);
        clearInterval(timeInterval);
      }
    }

  }

  setClock('timer', deadline);

  //scroll
  let navLink = document.querySelectorAll('[href^="#"]'),
    speed = 2;

  for (let i = 0; i < navLink.length; i++) {
    navLink[i].addEventListener('click', function (event) {
      event.preventDefault();
      let w = window.pageYOffset,
        hash = this.href.replace(/[^#]*(.*)/, '$1'),
        t = document.querySelector(hash).getBoundingClientRect().top,
        start = null;
      requestAnimationFrame(step);

      function step(time) {
        if (start === null) {
          start = time;
        }
        let progress = time - start,
          r = (t < 0 ? Math.max(w - progress / speed, w + t) : Math.min(w + progress / speed, w + t));
        window.scrollTo(0, r);
        if (r != w + t) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash; // URL с хэшем
        }
      }
    }, false);
  }

  // show modal

  let overlay = document.querySelector('.overlay'),
    popup = document.querySelector('.popup'),
    close = document.querySelector('.popup-close'),
    descBtn = document.querySelectorAll('.description-btn');
    descBtn.forEach(function(item) {
      item.classList.add('more');
    });

  let more = document.querySelectorAll('.more');

  more.forEach(function(item) {
    item.addEventListener('click', function () {
      overlay.style.display = 'block';
      this.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
      overlay.style.display = 'none';
      item.classList.remove('more-splash');
      document.body.style.overflow = '';
    });

    overlay.addEventListener('click', function (event) {
      let target = popup;
      if (!target.contains(event.target)) {
        overlay.style.display = 'none';
        item.classList.remove('more-splash');
        document.body.style.overflow = '';
      }
    });
  });
});