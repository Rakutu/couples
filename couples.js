(() => {
  let inputColumns = document.querySelector('.main__form-input')
  let settingsButton = document.querySelector('.main__form-btn');
  let form = document.querySelector('.main__form');
  let fieldPage = document.querySelector('.game-page__cards-fieldset');
  let restartButton = document.querySelector('.game-page__restart-btn')
  let fieldOnOage = false;
  let allCardsFlip = false;
  let cards, card, front, fronts, back, backs;

  // Получаем значение инпута, и выставляем количество строк и столбцов 
  function getColumnsNumber() {
    inputColumns.addEventListener('input', ()=> {
      columnsNumber = inputColumns.value

      if (columnsNumber % 2 == 0) {

            // Дизейблим кнопку, если число не совпадает по нашим критериям
            settingsButton.removeAttribute('disabled');
            settingsButton.classList.remove('disabled');
        } else if (columnsNumber == '') {
          settingsButton.setAttribute('disabled', true);
          settingsButton.classList.add('disabled');
        }
    })
  }

 

  // Настройка поля для игры
  function createCardField() {

    // Создаем элементы карточек 
    const setCardsOnfield = () => {
      for (let i = 0; i < columnsNumber**2; i++) {
        card = document.createElement('div');
        front = document.createElement('span');
        back = document.createElement('span');

        card.classList.add('card');
        front.classList.add('front');
        back.classList.add('back');

        card.appendChild(front);
        card.appendChild(back);
        fieldPage.appendChild(card);
        
      }
    }
    
    // Вычтавляем размер поля взависимости от параметров
    const fieldSize = () => {
      
    cards = document.querySelectorAll('.card');
    let backs = document.querySelectorAll('.back');

    if(columnsNumber >= 8) {
      fieldPage.classList.add(`fieldset--${columnsNumber}`);
         cards.forEach( (el) => {
           el.classList.add('card--8');
         })
    } else {
      fieldPage.classList.add(`fieldset--${columnsNumber}`);
    }
    
      // Парно нумеруем ячейки
      const setCardNumber = () => {
        for (let i in backs) {
          if (i < backs.length / 2) {
            backs[i].textContent = ++i;
          } else {
            backs[i].textContent = (++i - +(backs.length / 2))
          }
        }
      }


      setCardNumber();
    }

    
    setCardsOnfield();
    fieldSize();

    
      
  }

  // Прописываем логику игры
  function gameLogics() {
    
  
    // Создаем события для разворота карточек
    const addClickEvent = () => {

      if (fieldOnOage) {
        let cards = document.querySelectorAll('.card')
        let fronts = document.querySelectorAll('.front');
        let backs = document.querySelectorAll('.back');
        let hasFlippedCard = false;
        let firstCard, secondCard;
        let lockFlip = false;

        
        // Выставляем дата атрибут для карточки с соответствующим номером на ней
        const setCardId = () => {
          for (let i = 0; i < fronts.length; i++) {
            fronts[i].setAttribute('data-key', `${backs[i].innerHTML}`);
          }
        }
        
        setCardId();

        function reverseCard() {
          if (lockFlip) return;

          let currentFront = this;
          let currentBack = currentFront.nextSibling;
          let currentCard = currentBack.closest('.card');
          // let currentBackActiveCheck = currentBack.classList.contains('back--active');
          // let currentKey = currentCard.dataset.key;

          currentFront.classList.add('front--active');
          currentBack.classList.add('back--active');

          if(!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
          }

          secondCard = this;
          hasFlippedCard = false;

          checkCardsMatch();
          restartGame();
        }

        function checkCardsMatch() {

          let isMatch = firstCard.dataset.key === secondCard.dataset.key
          isMatch ? disableCards() : unflipCards();
        }

        function disableCards() {
          firstCard.removeEventListener('click', reverseCard)
          secondCard.removeEventListener('click', reverseCard)
        }

        function unflipCards() {
          lockFlip = true;
          setTimeout(() => {
            firstCard.classList.remove('front--active');
            firstCard.nextSibling.classList.remove('back--active');
            secondCard.classList.remove('front--active');
            secondCard.nextSibling.classList.remove('back--active'); 
            
            lockFlip = false;
          }, 800)
        }

        fronts.forEach(item => item.addEventListener('click', reverseCard))

        
      
      
      // window.addEventListener('click', (el) => {
      // })

    }
  }

    
    if (fieldOnOage) {
      let cards = document.querySelectorAll('.card');
  
      shuffle(cards);
    }


    addClickEvent();
  }

  
  function shuffle(arr) {
      
    for (let i = arr.length - 1; i > 0; i--) {
      let tmp = arr[i];
      let rnd = Math.floor(Math.random() * (i + 1));

      arr[i] = arr[rnd];
      arr[rnd] = tmp;
      fieldPage.append(arr[rnd])
    }

    return arr;
  }

  function restartGame() {
    fronts = document.querySelectorAll('.front');
    backs = document.querySelectorAll('.back');
    cards = document.querySelectorAll('.card')
    let count = 0;

    fronts.forEach((e) => {
      if(e.classList.contains('front--active')) {
        ++count;
      }
    })

    if (count === fronts.length) allCardsFlip = true;
    if (allCardsFlip) {
      restartButton.classList.add('is-active');

      restartButton.addEventListener('click', () => {
        fronts.forEach(frontSelector => {
          frontSelector.classList.remove('front--active');
        })
        backs.forEach(backSelector => {
          backSelector.classList.remove('back--active');
        })

        restartButton.classList.remove('is-active');
        allCardsFlip = false;
        count = 0;
        gameLogics();
      })
    }
  }
  

   // После подбора параметров выносим меню настройки за пределы экрана
  function settingsPageFloat() {
    let mainPage = document.querySelector('.main');

    form.addEventListener('submit', (el) => {
      el.preventDefault();

      mainPage.classList.add('main--disable');
      createCardField();
      fieldOnOage = true;
      gameLogics();
    })

    
  }

  window.addEventListener('DOMContentLoaded', () => {
    getColumnsNumber();
    settingsPageFloat();

  })

})()


// switch (columnsNumber) {
//   case '4' : 
//     fieldPage.classList.add('fieldset--4');
//     break;
//   case '6' : 
//     fieldPage.classList.add('fieldset--6');
//     break;
//   case '8' : 
//     fieldPage.classList.add('fieldset--8');
//      cards.forEach( (el) => {
//        el.classList.add('card--8');
//      })
//     break;
//   case '10' : 
//     fieldPage.classList.add('fieldset--10');
//     cards.forEach( (el) => {
//       el.classList.add('card--8');
//     })
//     break;
//   }



// fronts.forEach( item => {
//   item.addEventListener('click', (el) => {
//     let currentFront = el.target;
//     let currentBack = currentFront.nextSibling;
//     let currentCard = currentBack.closest('.card');
//     let currentBackActiveCheck = currentBack.classList.contains('back--active');
//     let currentKey = currentCard.dataset.key;
//     let prevKey;
//     let allBacks = document.querySelectorAll('.back');

//     const reverseCard = () => {
//       if(!currentBackActiveCheck) {
//         currentBack.classList.add('back--active');
//         currentFront.classList.add('front--active');
//         prevKey = currentCard.dataset.key;
//         for (let i in allBacks) {
//           if(allBacks[i].classList.contains('back--active')) {
//             if(prevKey === currentKey) {
//               currentBack.classList.add('back--active');
//               currentFront.classList.add('front--active');
//             } else {
//               currentBack.classList.remove('back--active');
//               currentFront.classList.remove('front--active');
//             }
//           }
//         }
//       } 
//     }

//     reverseCard();

//   })
// })




// let allCards = document.querySelectorAll('.card');

// allCards.addEventListener('click', (el) => {})




  // function createSettingsForm() {
  //   let form = document.createElement('form');
  //   let input = document.createElement('input');
  //   let buttonWrapper = document.createElement('div');
  //   let button = document.createElement('button');

  //   form.classList.add('form-group', 'mb-3');
  //   input.classList.add('form-control');
  //   input.placeholder = 'Введите четное количество столбцов и строк';
  //   input.setAttribute('type', 'number');
  //   buttonWrapper.classList.add('input-group-append');
  //   button.classList.add('btn', 'btn-primary');
  //   button.textContent = 'Поехали!';

  //   buttonWrapper.append(button);
  //   form.append(buttonWrapper);
  //   form.append(input);

  //   return {
  //     form,
  //     input,
  //     button,
  //   }

  // }