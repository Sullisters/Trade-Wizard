// GLOBAL VARIABLES -------------------------------------------------------

// DOM SELECTORS ----------------------------------------------------------

// FUNCTIONS --------------------------------------------------------------

// EVENT LISTENERS --------------------------------------------------------

// SCRYFALL API
function getPrice() {
    fetch("https://api.scryfall.com/cards/named?order=usd&unique=prints&fuzzy=doomblade").then(
        function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
    });
}

getPrice();