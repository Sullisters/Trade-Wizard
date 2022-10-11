// GLOBAL VARIABLES -------------------------------------------------------

// DOM SELECTORS ----------------------------------------------------------
var searchBar = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");

// FUNCTIONS --------------------------------------------------------------

// EVENT LISTENERS --------------------------------------------------------

// SCRYFALL API
function getPrice(card) {
    fetch("https://api.scryfall.com/cards/named?order=usd&unique=prints&fuzzy=" + card).then(
        function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
    });
}

searchButton.addEventListener("click", function () {
    getPrice(searchBar.value);
});