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

  // MVP PSEUDOCODE
/*
Interactable Elements:
Add Item Button
Cards on list (once added)

When I click add item:
    A modal with a search bar and other options appears.
    I can search cards and adjust their condition and foil status.
    When I search for a card in the search bar:
        It appears in the preview on the modal.
    When I confirm my selection:
        The modal closes.
        My selection is rendered to the appropriate side of the screen.
        Variables are updated to reflect the new card.

When I click a card on either list:
    That card and information about it appear on the main display.

When I click the X on a list item:
    That card is removed from the trade.

When I look at the trade summary section:
    I see both me and my partners total value added up.
    I see the difference (if any) between our values.
    There is a gradient representation of our values (mvp+)
*/