"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data);
    
    try {
        return location.reload();
    } catch (e) {
        return loginErrorMessageBox();
    } 
 
}

userForm.registerFormCallback = (data) => {
    ApiConnector.login(login);
        
    try {
        return location.reload();
    } catch (e) {
        return registerErrorMessageBox();
    } 
}

