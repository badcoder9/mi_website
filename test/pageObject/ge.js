class GE {
    // flow start button
    get signInBtnTrigger(){
        return $('.navbar-end .buttons > a')
    }
    // register
    get registerBtnTrigger(){
        return $('[action="/login"] button[name="create_account"]')
    }    
    get submitBtnRegister(){
        return $('.modal-card > [action="/account/create"] button[name="register"]')
    }    
    get registerModal(){
        return $('.modal-card > [action="/account/create"]')
    } 
    get submitBtnLogIn(){
        return $('.modal-card > [action="/login"] button[name="sign_in"]')
    }
    get regName(){
        return $('.modal-card >[action="/account/create"] [name="first_name"]')
    }
    get regLastname(){
        return $('.modal-card >[action="/account/create"] [name="last_name"]')
    }
    get regEmail(){
        return $('.modal-card >[action="/account/create"] [name="email"]')
    }
    get regPw(){
        return $('.modal-card >[action="/account/create"] [name="password"]')
    }
    get regPwAuth(){
        return $('.modal-card >[action="/account/create"] [name="password_confirmation"]')
    }
    get regTerms(){
        return $('.modal-card >[action="/account/create"] label.checkbox')
    }
    get regSuccessMsg(){
        return $('//section[@class="modal-card-body"]/div[@class="media"]/div[@class="media-content"]/p/div')
    }
    get regCompleteBtn(){
        return $('.modal-card-body:has(.media) + .modal-card-foot > button.button')
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
    // forgot pw
    get forgotPwBtn(){
        return $('a.forgot-password')
    }
    get forgotPwModal(){
        return $('.modal-card [action="/password/email"]')
    }
    get requestPwResetBtn(){
        return $('.modal-card [action="/password/email"] button[type="submit"]')
    }
    get forgotPwEmail(){
        return $('.modal-card [action="/password/email"] input[type="email"]')
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

    async login (username, password) {
        await this.loginEmail.setValue(username)
        await this.loginPassword.setValue(password)
        await this.submitBtnLogIn.click()
    }
    async register (name, lastname, email, password, passwordAuth) {
        await this.regName.setValue(name)
        await this.regLastname.setValue(lastname)
        await this.regEmail.setValue(email)
        await this.regPw.setValue(password)
        await this.regPwAuth.setValue(passwordAuth)
        await this.regTerms.click()
        await this.submitBtnRegister.click()
    }

    
}

module.exports = new GE();