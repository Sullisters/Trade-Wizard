// GLOBAL VARIABLES -------------------------------------------------------

// Current URL
var url;
var currentList = cardListOne;
var currentPrice;

// Trade Value Variables
// User 1
var userOneValue = 0;
// User 2
var userTwoValue = 0;
// Trade Difference
var tradeDifference;


// DOM SELECTORS ----------------------------------------------------------
// Save Trade Button
var saveTrade = document.getElementById("save-trade");
// Username and Avatar
var avatarOne = document.getElementById("user-one-avatar");
var usernameOne = document.getElementById("username-one");
var avatarTwo = document.getElementById("user-two-avatar");
var usernameTwo = document.getElementById("username-two");
// New Item Buttons
var addItemOne = document.getElementById("add-item-one");
var addItemTwo = document.getElementById("add-item-two");
// Clear List Buttons
var clearListOne = document.getElementById("clear-list-one");
var clearListTwo = document.getElementById("clear-list-two");
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
var userOneTotalDisplay = document.getElementById("user-one-total")
var userTwoTotalDisplay = document.getElementById("user-two-total")


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

          // If they checked the foil box, set the price we use to foil.
    if (foilCheck.checked) {
      currentPrice = data.prices.usd_foil;
    } else {
      currentPrice = data.prices.usd;
    }

      modalPreview.setAttribute("src", data.image_uris.png);
      // modalPreview.setAttribute("alt", data.name);
      pricePreview.textContent = "$" + currentPrice;
  });
}

// Removes the item when a user hits "delete" 
function deleteItem(event) {
  event.stopPropagation();
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
  //checks value of the trade
  if (userOneValue > userTwoValue){
    //checks if this trade favors user Two
    tradeDifference = (userOneValue - userTwoValue).toFixed(2);
    //changes summary background from red to green showing in user 2's favor 
    //outputs the difference in favor of user 2.
    tradeSumBackground.setAttribute("id", "gradient-two");
    tradeDiffDisplay.textContent = "Difference: $" + tradeDifference + " in " + usernameTwo.value +"'s favor.";
    //updates the totals based on cards in the list
    userOneTotalDisplay.textContent = usernameOne.value + "'s total: $" + userOneValue.toFixed(2); 
    userTwoTotalDisplay.textContent = usernameTwo.value + "'s total: $" + userTwoValue.toFixed(2);
  } else if(userOneValue < userTwoValue ){
    //checks if this trade favors user One. 
    //outputs the difference in favor of user 1
    tradeDifference = (userTwoValue - userOneValue).toFixed(2);
    //changes summary background if from green to red showing in favor of user 1
    tradeSumBackground.setAttribute("id", "gradient-one");
    tradeDiffDisplay.textContent = "Difference: $" + tradeDifference + " in " + usernameOne.value +"'s favor.";
    //updates the totals based on cards in the list
    userOneTotalDisplay.textContent = usernameOne.value + "'s total: $" + userOneValue.toFixed(2); 
    userTwoTotalDisplay.textContent = usernameTwo.value + "'s total: $" + userTwoValue.toFixed(2);
    }else if(userOneValue === userTwoValue){
      //checks if this trade is equal in value. then outputs the trade is equal.
    tradeDiffDisplay.textContent = "The trade is equal value."
    //changes the summary background to the neutral color if the trade is equal.
    tradeSumBackground.setAttribute("id", "equal-background")
    //updates the totals based on cards in the list
    userOneTotalDisplay.textContent = usernameOne.value + "'s total: $" + userOneValue.toFixed(2); 
    userTwoTotalDisplay.textContent = usernameTwo.value + "'s total: $" + userTwoValue.toFixed(2);
  }

}

// Updates the values and images of the main display based on a passed in url.
function updateMainDisplay() {
  fetch(url).then(
    function (response) {
    return response.json();
  }).then(function (data) {
    
      if (foilCheck.checked) {
      currentPrice = data.prices.usd_foil;
      } else {
        currentPrice = data.prices.usd;
      }
      // Update main card display to the cards that was confirmed last.
      cardImg.setAttribute("src", data.image_uris.png)
      cardImg.setAttribute("alt", data.name);
      cardPreviewPrice.textContent = "$" + currentPrice;
  })
}

function createListItem(currentList) {
  // Use our constructed URL to grab the correct card.
  fetch(url).then(
    function (response) {
    return response.json();
  }).then(function (data) {
  // Create the master list item.
  var newCard = document.createElement("li");
  // Create the list item content elements.
  var newName = document.createElement("p");
  var newPrice = document.createElement("p");
  var removeItem = document.createElement("button");
  // Store the url in the list item
  newCard.setAttribute("data-url", "https://api.scryfall.com/cards/named?order=usd&unique=prints&fuzzy="+ data.name)
  // If they checked the foil box, set the price we use to foil.
  if (foilCheck.checked) {
    currentPrice = data.prices.usd_foil;
    if (currentPrice == null) {
      currentPrice = "???";
    }
    newCard.setAttribute("data-foil", "foil")
   } else {
    currentPrice = data.prices.usd;
    if (currentPrice == null) {
      currentPrice = "???";
    }
    newCard.setAttribute("data-foil", "non-foil")
  }
  // Set list item content.
  newName.textContent = data.name;
  newPrice.textContent = "$" + currentPrice;
  removeItem.textContent = "Delete";
  removeItem.addEventListener("click", deleteItem)
  // Gives each list item a copy of its url as data-url
  newCard.setAttribute("data-name", data.name);
  // Append
  newCard.append(newName);
  newCard.append(newPrice);
  newCard.append(removeItem);
  // V Super weird catch
  if (currentList === undefined) {
    currentList = cardListOne;
  }
  // Append the master list to the page.
  currentList.appendChild(newCard);
  // Adds the price of the card to the appropriates player trade value.
  if (currentList === cardListOne) {
    if (currentPrice === "???") { 
    } else {
      userOneValue += Number(currentPrice);
    }
  } else if (currentList === cardListTwo) {
    if (currentPrice === "???") { 
    } else {
      userTwoValue += Number(currentPrice);
    }
  }
  // Update the main trade summary.
  updateSummary();
  // Update main card display to the cards that was confirmed last.
  constructURL(data.name)
  updateMainDisplay();
})}

// Updates the localStorage to reflect the current trade.
function updateLS() {
  var storedUrl; 
  var storedFoil;
  var savedListOne = Array.from(cardListOne.children);
  var savedListTwo = Array.from(cardListTwo.children);
  var savedTrade = savedListOne.concat(savedListTwo);
  console.log(savedTrade);
  localStorage.clear();
for (let i = 0; i < savedTrade.length; i++) {
  if (i < savedListOne.length) {
    storedUrl = savedTrade[i].dataset.url;
    storedFoil = savedTrade[i].dataset.foil;
    localStorage.setItem(i, JSON.stringify({url: storedUrl, foil: storedFoil, side: 1}))
  } else {
    storedUrl = savedTrade[i].dataset.url;
    storedFoil = savedTrade[i].dataset.foil;
    localStorage.setItem(i, JSON.stringify({url: storedUrl, foil: storedFoil, side: 2}))
  }
}
}


function loadTrade() {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem(i) !== null) {
      var storedCard = JSON.parse(localStorage.getItem(i));
      url = storedCard.url;
      if (storedCard.foil === "foil") {
        foilCheck.checked = true;
      } else {
        foilCheck.checked = false;
      }
      console.log(storedCard.side)
      console.log(storedCard.url)
      if (storedCard.side === 2) {
        console.log("hitting");
        currentList = cardListTwo;
      }
      createListItem(currentList);

  }
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
      // Reset the modal form and preview.
      modalPreview.setAttribute("src", "");
      pricePreview.textContent = "";
      searchBar.value = "";
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
  // Create list item with contents using current url.
  createListItem(currentList);
  // Click off of the modal.
  var modalBackground = document.querySelector(".modal-background");
  modalBackground.click();
});

// Create event listener to bring already listed cards to the display.
document.addEventListener("click", function (event) {
    // Handles event bubbling for delete vs preview.
    event.stopPropagation();
    if (event.path[0].getAttribute("data-name") === null) {
      constructURL(event.path[1].getAttribute("data-name"));
    } else {
      constructURL(event.path[0].getAttribute("data-name"));
    }
    if (event.path[0].getAttribute("data-foil") === "foil") {
      foilCheck.checked = true;
    } else if (event.path[1].getAttribute("data-foil") === "foil") {
      foilCheck.checked = true;
    } else if (event.path[0].getAttribute("data-foil") === "foil") {
      foilCheck.checked = false;
    } else if (event.path[1].getAttribute("data-foil") === "foil") {
      foilCheck.checked = false;
    }
    updateMainDisplay();
  })

// Update the avatar based on what username has been entered.
usernameOne.addEventListener("keyup", function () {
  updateSummary();
  fetch("https://avatars.dicebear.com/api/croodles-neutral/" + usernameOne.value + ".svg?background=%23ffffff").then(
    function (response) {
              // Update avatar based on username.
              avatarOne.setAttribute("src", response.url);
              avatarOne.setAttribute("alt", usernameOne);
  })
})

// Update the avatar based on what username has been entered.
usernameTwo.addEventListener("keyup", function () {
  updateSummary();
  fetch("https://avatars.dicebear.com/api/croodles-neutral/" + usernameTwo.value + ".svg?background=%23ffffff").then(
    function (response) {
              // Update avatar based on username.
              avatarTwo.setAttribute("src", response.url);
              avatarTwo.setAttribute("alt", usernameTwo);
  })
})

// Clears the list when the user hits the "clear" button.
clearListOne.addEventListener("click", function () {
  cardListOne.innerHTML = '';
  userOneValue = 0;
  updateSummary();
})

clearListTwo.addEventListener("click", function () {
  cardListTwo.innerHTML = '';
  userTwoValue = 0;
  updateSummary();
})

foilCheck.addEventListener("click", function () {
  constructURL(searchBar.value);
  getPrice(url);
})

saveTrade.addEventListener("click", updateLS)

// Initialize the usernames and avatars.
usernameOne.value = "User One";
usernameTwo.value = "User Two";
fetch("https://avatars.dicebear.com/api/croodles-neutral/UserOne.svg?background=%23ffffff").then(function (response) {
    // Update avatar based on username.
    avatarTwo.setAttribute("src", response.url);
    avatarTwo.setAttribute("alt", usernameTwo);
  })
fetch("https://avatars.dicebear.com/api/croodles-neutral/UserTwo.svg?background=%23ffffff").then(function (response) {
    // Update avatar based on username.
    avatarOne.setAttribute("src", response.url);
    avatarOne.setAttribute("alt", usernameOne);
})
loadTrade();

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