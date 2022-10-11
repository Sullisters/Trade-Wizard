// GLOBAL VARIABLES -------------------------------------------------------

// DOM SELECTORS ----------------------------------------------------------
var addItemOne = document.getElementById("add-item-one");
var addItemTwo = document.getElementById("add-item-two");
var cardImg = document.getElementById("card-img");

// FUNCTIONS --------------------------------------------------------------

// EVENT LISTENERS --------------------------------------------------------

addItemOne.addEventListener("click", function () {
    openModal();
});

addItemTwo.addEventListener("click", function () {
    openModal();    
})

// NEW JAVASCRIPT FROM JRD-MODAL-BUTTON (BULMA)

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });

  });