class Login {
    // flow start button
    get signInBtnTrigger(){
        return $('.navbar-end .buttons > a')
    }
    get submitBtnLogIn(){
        return $('.modal-card > [action="/login"] button[name="sign_in"]')
    }
    // login
    get loginModal(){
        return $('.modal-card > [action="/login"]')
    }   
    get loginEmail(){
        return $('[action="/login"] input[name="login_email"]')
    }
    get loginPassword(){
        return $('[action="/login"] input[type="password"]')
    }
    // errors
    get submissionError(){
        return $$('p.is-danger')
    }
    get invalidSubmissionError(){
        return $('p.is-danger')
    }

    async login (username, password) {
        await this.loginEmail.setValue(username)
        await this.loginPassword.setValue(password)
        await this.submitBtnLogIn.click()
    }
    get loginCloseBtn(){
        return $('div[class="animation-content"] > .modal-close')
    }  
    
    // logged in user
    get accountTriggerBtn(){
        return $('.account-menu > span:not([class])')
    }
    get accountHoverEl(){
        return $('.navbar-end .buttons div.dropdown.is-hoverable')
    }
    get accountDropdown(){
        return $('#dropdown-menu-account')
    }
    get accountDropdownAdr(){
        return $('#dropdown-menu-account a[href="/account/?tab=addresses"]')
    }
    get accountDropdownLogOut(){
        return $('#dropdown-menu-account a[href="/logout"]')
    }
}

module.exports = new Login();