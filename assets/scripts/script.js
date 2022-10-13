// GLOBAL VARIABLES -------------------------------------------------------

// Current URL
var url;
var currentList;

// Trade Value Variables
// User 1
var userOneValue = 0;
// User 2
var userTwoValue = 0;
// Trade Difference
var tradeDifference;


// DOM SELECTORS ----------------------------------------------------------
// New Item Buttons
var addItemOne = document.getElementById("add-item-one");
var addItemTwo = document.getElementById("add-item-two");
// Main Card Preview
var cardImg = document.getElementById("card-img");
// Main Card Price Preview
var cardPreviewPrice = document.getElementById("display-card-price");
// Modal Card Preview
var modalPreview = document.getElementById("modal-preview");
var pricePreview = document.getElementById("price-preview");
// Modal Search
var searchBar = document.getElementById("search-bar");
var foilCheck = document.getElementById("foil-check");
var conditionCheck = document.getElementById("condition-check");
var confirmCard = document.getElementById("confirm-card");
// User Card Lists
var cardListOne = document.getElementById("card-list-one");
var cardListTwo = document.getElementById("card-list-two");
// Trade Summary
var tradeDiffDisplay = document.getElementById("trade-diff");
var tradeSumBackground = document.querySelector(".tradeSummary")
var userTotalsDisplay = document.getElementById("user-totals")


// FUNCTIONS --------------------------------------------------------------

// Construct URL
function constructURL(search) {
  url = "https://api.scryfall.com/cards/named?order=usd&unique=prints&fuzzy="+ search;
}

// Updates modal preview based on search bar contents.
function getPrice(url) {
  fetch(url).then(
      function (response) {
      return response.json();
    }).then(function (data) {
      modalPreview.setAttribute("src", data.image_uris.normal);
      modalPreview.setAttribute("alt", data.name);
      pricePreview.textContent = "$" + data.prices.usd;
  });
}

function deleteItem(event) {
  // Subtract the value of the removed card from the appropriate user.
  if (event.path[2].id == "card-list-one") {
    userOneValue -= Number((event.path[1].children[1].innerText).substring(1));
  } else {
    userTwoValue -= Number((event.path[1].children[1].innerText).substring(1));
  }
  // Remove the list item associated with the remove button pressed.
  event.path[1].remove();
  // Update the summary box with the new values.
  updateSummary();
}

// Updates the trade summary.
function updateSummary() {
  // Update the trade difference and round it to a cent.
  if (userOneValue > userTwoValue){
    tradeDifference = (userOneValue - userTwoValue).toFixed(2);
    tradeSumBackground.setAttribute("id", "gradient-two");
    tradeDiffDisplay.textContent = "Difference: $" + tradeDifference + " in user 2's favor.";
    userTotalsDisplay.textContent = "User 1 total: $" + userOneValue.toFixed(2) + " User 2 Total: $" + userTwoValue.toFixed(2);
  } else if(userOneValue < userTwoValue ){
  tradeDifference = (userTwoValue - userOneValue).toFixed(2);
  tradeSumBackground.setAttribute("id", "gradient-one");
  tradeDiffDisplay.textContent = "Difference: $" + tradeDifference + " in user 1's favor.";
  userTotalsDisplay.textContent = "User 1 total: $" + userOneValue.toFixed(2) + " User 2 Total: $" + userTwoValue.toFixed(2);
  }else if(userOneValue === userTwoValue){
    tradeDiffDisplay.textContent = "The trade is equal value."
    tradeSumBackground.setAttribute("id", "equal-background")
    userTotalsDisplay.textContent = "User 1 total: $" + userOneValue.toFixed(2) + " User 2 Total: $" + userTwoValue.toFixed(2);
  }

}

// EVENT LISTENERS --------------------------------------------------------

// Modal preview will update while card is being typed.
searchBar.addEventListener("keyup", function () {
  constructURL(searchBar.value);
  getPrice(url);
})

// Tracks which User's button was pressed.
addItemOne.addEventListener("click", function (event) {
  if (event.target.id === "add-item-one") {
    currentList = cardListOne;
  }
})

addItemTwo.addEventListener("click", function (event) {
  if (event.target.id === "add-item-two") {
    currentList = cardListTwo;
  }
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

// When a user confirms their card choice in the modal view.
confirmCard.addEventListener("click", function () {
  // Use our constructed URL to grab the correct card.
  fetch(url).then(
    function (response) {
    return response.json();
  }).then(function (data) {
  // Create the master list item.
  var newCard = document.createElement("li");
  // Format the list item to properly display its contents.
  newCard.style.display ="flex";
  newCard.style.justifyContent = "space-evenly";
  newCard.style.alignItems = "center";
  newCard.style.border = "3px solid black";
  // Create the list item content elements.
  var newName = document.createElement("p");
  var newPrice = document.createElement("p");
  var removeItem = document.createElement("button");
  // Set list item content.
  newName.textContent = data.name;
  newPrice.textContent = "$" + data.prices.usd;
  removeItem.textContent = "Delete";
  removeItem.addEventListener("click", deleteItem)
  // Append
  newCard.append(newName);
  newCard.append(newPrice);
  newCard.append(removeItem);
  // Append the master list to the page.
  currentList.appendChild(newCard);
  // Adds the price of the card to the appropriates player trade value.
  if (currentList === cardListOne) {
    userOneValue += Number(data.prices.usd);
  } else if (currentList === cardListTwo) {
    userTwoValue += Number(data.prices.usd);
  }
  // Update the main trade summary.
  updateSummary();
  // Update main card display to the cards that was confirmed last.
  cardImg.setAttribute("src", data.image_uris.normal)
  cardImg.setAttribute("alt", data.name);
  cardPreviewPrice.textContent = "$" + data.prices.usd;
  // Click off of the modal.
  var modalBackground = document.querySelector(".modal-background");
  modalBackground.click();
});
})

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