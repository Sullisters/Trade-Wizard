// GLOBAL VARIABLES -------------------------------------------------------

// DOM SELECTORS ----------------------------------------------------------
var searchBar = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");
var cardImg = document.getElementById("card-img");

// FUNCTIONS --------------------------------------------------------------

// EVENT LISTENERS --------------------------------------------------------

// SCRYFALL API
function getPrice(card) {
    fetch("https://api.scryfall.com/cards/named?order=usd&unique=prints&fuzzy=" + card).then(
        function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        cardImg.setAttribute("src", data.image_uris.normal);
        cardImg.setAttribute("alt", data.name); 
    });
}

searchButton.addEventListener("click", function () {
    getPrice(searchBar.value);
});