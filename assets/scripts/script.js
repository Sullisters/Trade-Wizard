// GLOBAL VARIABLES -------------------------------------------------------

// DOM SELECTORS ----------------------------------------------------------
var searchBar = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");

// FUNCTIONS --------------------------------------------------------------

function getPrice(card) {
    fetch("https://api.scryfall.com/cards/named?order=usd&unique=prints&fuzzy=" + card).then(
        function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        console.log(data.prices.usd)
        console.log(data.name)
    });
}

// EVENT LISTENERS --------------------------------------------------------

searchButton.addEventListener("click", function () {
    getPrice(searchBar.value);
});

// SCRYFALL API

// MAIN

getPrice("Doom Blade");

// MVP PSEUDOCODE
/*
Interactable Elements:
Add Item Button
Cards on list (once added)

When I click add item:
    A modal with a search bar and other options appears.
    I can search cards and adjust their condition and foil status.
    When I search for a card:
        It appears in the preview on the modal.
    When I confirm my selection:
        The modal closes.
        My selection is rendered to the appropriate side of the screen.
        Variables are updated to reflect the new card.

When I click a card on either list:
    That card and information about it appear on the main display.

When I click the X on a list item:
    That card is removed from the trade.
*/


