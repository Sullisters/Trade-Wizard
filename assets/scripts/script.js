// GLOBAL VARIABLES -------------------------------------------------------

// DOM SELECTORS ----------------------------------------------------------
// New Item Buttons
var addItemOne = document.getElementById("add-item-one");
var addItemTwo = document.getElementById("add-item-two");
// Main Card Preview
var cardImg = document.getElementById("card-img");
// Modal Card Preview
var modalPreview = document.getElementById("modal-preview");
var pricePreview = document.getElementById("price-preview");
// Modal Search
var searchBar = document.getElementById("search-bar");
var foilCheck = document.getElementById("foil-check");
var conditionCheck = document.getElementById("condition-check");
var confirmCard = document.getElementById("confirm-card");

// FUNCTIONS --------------------------------------------------------------

// Construct URL
function constructURL(condition) {
  var url;
}

// Updates modal preview based on card entered to search bar.
function getPrice(card) {
  fetch("https://api.scryfall.com/cards/named?order=usd&unique=prints&fuzzy="+ card).then(
      function (response) {
      return response.json();
    }).then(function (data) {
      modalPreview.setAttribute("src", data.image_uris.normal);
      modalPreview.setAttribute("alt", data.name);
      pricePreview.textContent = "$" + data.prices.usd;
      console.log(data);
  });
}

// EVENT LISTENERS --------------------------------------------------------

// Modal preview will update while card is being typed.
searchBar.addEventListener("keyup", function () {
  getPrice(searchBar.value)
})

// When the user confirms their card in the modal.
confirmCard.addEventListener("click", function () {
  // Create the list item
  var newCard = document.createElement("li");
  // Create the name item
  var newName = document.createElement("p");
  // Set Content
  newName.textContent = data

})

// MODEL JS (BULMA)

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
              We construct a url based on the choices selected.
              We construct an HTML element to host the new information
                      - Card Price
                      - Card Name
                      - Condition
                      - Foil (or no)
                      - an X to delete the item.
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