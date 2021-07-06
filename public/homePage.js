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
const profileWidget = new ProfileWidget();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
      if (response.success === true) {
          profileWidget.showProfile(data);
          moneyManager.setMessage(response.data)
        } else {
          moneyManager.setMessage(response.error)
        }
    });
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success === true) {
            profileWidget.showProfile(data);
            moneyManager.setMessage(response.data)
        } else {
            moneyManager.setMessage(response.error)
        }
    });
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success === true) {
            profileWidget.showProfile(data);
            moneyManager.setMessage(response.data)
        } else {
            moneyManager.setMessage(response.error)
        }
    });
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data);
        moneyManager.updateUsersList(data);
    }
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavourites(data, (response) => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(data);
            moneyManager.updateUsersList(data); 
            moneyManager.setMessage(response.data)
        } else {
            moneyManager.setMessage(response.error)
        }
    });
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(data);
            moneyManager.updateUsersList(data); 
            moneyManager.setMessage(response.data)
        } else {
            moneyManager.setMessage(response.error)
        }
    });
}