const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => { 
        if ( response.success === true) {
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

function getRates() {
    ApiConnector.getStocks((response) => {
      if (response.success === true) {
          ratesBoard.clearTable();
          ratesBoard.fillTable(response.data);
        }
    });
}

setInterval(function() {
    getRates(); 
}, 60000);

getRates();

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (response) => {
  ApiConnector.addMoney(response, (request) => {

 });
}
