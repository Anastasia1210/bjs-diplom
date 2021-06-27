"use strict";

class UserForm {
    
    loginForm = {};
    registerForm = {};
    loginErrorMessageBox = {};
    reisterErrorMessageBox = {};
    loginFormCallback(data);
    registerFormCallback;
        
    constructor(login, password){
        this.login = login;
        this.password = password;
    }

    setLoginErrorMessage() {
        return "Данная учетная запись не существует";
    }

    setRegisterErrorMessage(){
        return "Введенные данные некорректны";
    }

    loginFormAction() {

    }

}

class ApiConnector {

    login({login, password}, callback);
    register({login, password}, callback);
    
}
