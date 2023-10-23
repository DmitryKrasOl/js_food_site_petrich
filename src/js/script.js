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
   // timer end

   // my var Modal start
   /* 
      const modalButtons = document.querySelectorAll('[data-modal]');
      const modal = document.querySelector('.modal');
      const body = document.querySelector('body');
   
      body.addEventListener("click", function (e) {
   
         const target = e.target;
   
         if (target && target.hasAttribute('data-modal')) {
   
            modal.style.display = 'block';
         }
   
         if (target && target.hasAttribute('data-close')) {
   
            modal.style.display = 'none';
         }
      });
    */
   // my var modal end

   const
      modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');

   function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');

      // После вывода окна отменяем прокрутку у body, что бы сайт за модальным окном не скролился
      document.body.style.overflow = 'hidden';

      // В случае если ф-я openModal сработала один раз (если пользователь сам открыл окно). Она отменяет показ модального окна через задержку.
      clearInterval(modalTimerId);
   }

   // Прослушка для каждого выбранного в массив элемента
   modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
   });


   function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');

      // Востанавливаем скролл
      document.body.style.overflow = '';
   }


   modalCloseBtn.addEventListener('click', closeModal);

   // При клике на серое пространство вокруг модального окна закрываем модальное окно
   modal.addEventListener('click', (e) => {
      if (e.target === modal) {
         closeModal();
      }
   });

   // Реализация выхода из модального окна через нажатие клавиши ESC

   document.addEventListener('keydown', (e) => {
      // Сравниваем с кодом клавиши. А так же проверяем открыто ли окно, что бы код срабатывал только в случаи открытого окна
      if (e.code === "Escape" && modal.classList.contains('show')) {
         closeModal();
      }
   });

   // Вызов модального окна через время
   // const modalTimerId = setTimeout(openModal, 5000);

   //========================================================================================================================================================
   // Вызов окна в случаи полной прокрутки страницы до конца

   function showModalByScroll() {
      // если прокрученная пользователем часть плюс видимая пользователем часть будут больше или равны всей высоте документа
      // то запускаем открытие окна.
      if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal();

         // Удаляем событие после того как это условие на этом событии произошло один раз

         window.removeEventListener('scroll', showModalByScroll); // Полностью повторяем событие через метод removeEventListener()
      }
   }

   // Прослушиваем scroll окна
   window.addEventListener('scroll', showModalByScroll);

   //=========================== 2.13 Используем классы в реальной работе =============================================================================================================================

   // My var
   /*

   articlesArray = [
      {
         img: 'vegy.jpg',
         title: 'Меню "Фитнес"',
         text: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
         price: '229',
      },
      {
         img: 'elite.jpg',
         title: 'Меню “Премиум”',
         text: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
         price: '550',
      },
      {
         img: 'hamburger.jpg',
         title: 'Тайтл Гамбургер',
         text: 'Text hamburger  Text hamburger  Text hamburger  Text hamburger  Text hamburger  Text hamburger  Text hamburger  Text hamburger  Text hamburger  Text hamburger ',
         price: '1000',
      },
      // {
      //    img: 'post.jpg',
      //    title: 'Меню "Постное"',
      //    text: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      //    price: '809',
      // },

   ];

   class Titles {
      constructor(articlesArr) {
         this.articlesArr = articlesArr;
         this.articlesHtml = '';
         this.menuBox = document.querySelector('.container_menu');
      }

      generateHtml() {
         this.articlesArr.forEach((item) => {
            this.articlesHtml += `
               <div class="menu__item">
                  <img src="img/tabs/${item.img}" alt="elite" />
                  <h3 class="menu__item-subtitle">${item.title}</h3>
                  <div class="menu__item-descr">
                     ${item.text}
                  </div>
                  <div class="menu__item-divider"></div>
                  <div class="menu__item-price">
                     <div class="menu__item-cost">Цена:</div>
                     <div class="menu__item-total">
                        <span>${item.price}</span> грн/день
                     </div>
                  </div>
               </div>`;

            this.menuBox.innerHTML = this.articlesHtml;
         });
      }
   }

   const menu = new Titles(articlesArray);

   menu.generateHtml();
    */

   //========================================================================================================================================================
   // Ivan var

   class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;

         // Выбираем родителя карточек
         this.parent = document.querySelector(parentSelector);

         this.price = price;
         // Для перевода курса из доллара в гривны
         this.transfer = 27;

         // Высчитываем курс (меняем price)
         this.changeToUAH();
      }

      changeToUAH() {
         this.price = this.price * this.transfer;
      }

      render() {
         const element = document.createElement('div');
         element.innerHTML = `
            <div class="menu__item">
               <img src=${this.src} alt=${this.alt} />
               <h3 class="menu__item-subtitle">${this.title}</h3>
               <div class="menu__item-descr">${this.descr}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total">
                     <span>${this.price}</span> грн/день
                  </div>
               </div>
            </div>
         `;

         // Помещаем элемент внутрь родителя
         this.parent.append(element);
      }
   }

   // Пример использования объекта на месте (без создания переменной)

   new MenuCard(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      '.menu .container',
   ).render();

   new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      14,
      '.menu .container',
   ).render();

   new MenuCard(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      21,
      '.menu .container',
   ).render();

});

