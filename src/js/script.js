window.addEventListener('DOMContentLoaded', () => {

   // lesson 3
   // Табы начало 
   const
      tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

   console.log(tabsContent);

   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });

      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', function (event) {
      const target = event.target;

      if (target && target.classList.contains('tabheader__item')) {

         tabs.forEach((item, i) => {
            if (target == item) {
               console.log('target == item');
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });
   // Табы конец

   // Timer начало
   const deadline = '2023-10-11';

   function getTimeRemaining(endtime) {
      const
         // Время дедлайна
         t = Date.parse(endtime) - Date.parse(new Date()),
         // Высчитываем сколько суток в дедлайне. Остаток округляем.
         days = Math.floor(t / (1000 * 60 * 60 * 24)),
         // Высчитываем часы черз остаток всего времени от деления на 24 часа
         hours = Math.floor((t / (1000 * 60 * 60)) % 24),
         // Так же высчитываем минуты
         minutes = Math.floor((t / 1000 / 60) % 60),
         // Так же высчитываем секунды
         seconds = Math.floor((t / 1000) % 60);

      return {
         'total': t,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      };
   }

   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   // Выводим данные в HTML
   function setClock(selector, endtime) {
      const
         timer = document.querySelector(selector),
         days = document.querySelector('#days'),
         hours = document.querySelector('#hours'),
         minutes = document.querySelector('#minutes'),
         seconds = document.querySelector('#seconds'),
         // Запускаем расчет и вывод каждую секунду
         timeInterval = setInterval(updateClock, 1000);

      updateClock();

      function updateClock() {
         const t = getTimeRemaining(endtime);

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }

   setClock('.timer', deadline);
});