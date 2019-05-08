
//window.addEventListener('load');
window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  //tabs

  class WorkWithTab {
    constructor(classNameParentTab, classNameTab, classNameTabContent) {
      this.info = document.querySelector(classNameParentTab);
      this.tab = document.querySelectorAll(classNameTab);
      this.tabContent = document.querySelectorAll(classNameTabContent);
    }
    hideTabContent(a) {
      for (let i = a; i < this.tabContent.length; i++) {
        this.tabContent[i].classList.remove('show');
        this.tabContent[i].classList.add('hide');
      }
    }
    showTabContent(b) {
      if (this.tabContent[b].classList.contains('hide')) {
        this.tabContent[b].classList.remove('hide');
        this.tabContent[b].classList.add('show');
      }
    }
    event() {
      this.info.addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.classList.contains('info-header-tab')) {
          for (let i = 0; i < this.tab.length; i++) {
            if (target == this.tab[i]) {
              this.hideTabContent(0);
              this.showTabContent(i);
              break;
            }
          }
        }
      });
    }  
  }
  const tab = new WorkWithTab('.info-header', '.info-header-tab', '.info-tabcontent');
  tab.hideTabContent(1);
  tab.event();

  //timer
  let deadline = '2019-05-09';

  let getTimeRemaining = (endtime) => {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)));
      //t = Date.parse(endtime) - Date.parse((new Date().getTimezoneOffset())100060),
    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  let setClock = (id, endtime) => {
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

  };

  setClock('timer', deadline);

  //scroll
  let navLink = document.querySelectorAll('[href^="#"]'),
    speed = 2;

  for (let i = 0; i < navLink.length; i++) {
    navLink[i].addEventListener('click', (e) => {
      e.preventDefault();
      let w = window.pageYOffset,
        hash = navLink[i].href.replace(/[^#]*(.*)/, '$1'),
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
    descBtn.forEach((item) => {
      item.classList.add('more');
    });

  let more = document.querySelectorAll('.more');

  more.forEach((item) => {
    item.addEventListener('click', () => {
      overlay.style.display = 'block';
      item.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
      overlay.style.display = 'none';
      item.classList.remove('more-splash');
      document.body.style.overflow = '';
    });

    overlay.addEventListener('click', (e) => {
      let target = popup;
      if (!target.contains(e.target)) {
        overlay.style.display = 'none';
        item.classList.remove('more-splash');
        document.body.style.overflow = '';
      }
    });
  });
});