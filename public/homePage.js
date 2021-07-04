const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((event) => { 
if (event.isTrusted === true) {
   location.reload();
}
});
};

ApiConnector.current((response) => {
  if (response.success === true) {
   ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

const getRates = () => {
    ApiConnector.getStocks((response) => {
    if (response.success === true) {
ratesBoard.clearTable();
ratesBoard.fillTable(response.data);
  }
});
}

function decorator(f, ms) {
    return function () {
        setTimeout(function () {
            f.apply(this);
        }, ms);
        };
    }
    const delayedGetRates = decorator(getRates, 60000);
    
    delayedGetRates(); 
