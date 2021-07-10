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

moneyManager.addMoneyCallback = (call) => {
  ApiConnector.addMoney(call, (response) => {
      if (response.success === true) {
          profileWidget.showProfile(response.data);
          moneyManager.setMessage(true, (call.amount + call.currency + ' уже в Вашем кармане'))
        } else {
          moneyManager.setMessage(false, response.error)
        }
    });
}

moneyManager.conversionMoneyCallback = (call) => {
    ApiConnector.convertMoney(call, (response) => {
        if (response.success === true) {
            profileWidget.showProfile(response.data);
            moneyManager.setMessage(true, '(Конвертация прошла успешно'))
        } else {
            moneyManager.setMessage(false, response.error)
        }
    });
}

moneyManager.sendMoneyCallback = (call) => {
    ApiConnector.transferMoney(call, (response) => {
        if (response.success === true) {
            profileWidget.showProfile(response.data);
            moneyManager.setMessage(('Ваша щедрость не знает границ!'))
        } else {
            moneyManager.setMessage(response.error)
        }
    });
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = (call) => {
    ApiConnector.addUserToFavorites(call, (response) => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data); 
            moneyManager.setMessage(true, (call.name + ' успешно добавлен в Адресную книгу'))
        } else {
            moneyManager.setMessage(false, response.error)
        }
    });
}

favoritesWidget.removeUserCallback = (call) => {
    ApiConnector.removeUserFromFavorites(call, (response) => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data); 
            moneyManager.setMessage(true, (("Контакт с ID #") + call + (' был(а) успешно удален(а)'))
        } else {
            moneyManager.setMessage(response.error)
        }
    });
}