"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        if (response.success === true) {
          return location.reload();
        } else {
            return userForm.loginErrorMessageBox(error);
    }
    });
         
}

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        if (response.success = true) {
         return location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    });
    
}

