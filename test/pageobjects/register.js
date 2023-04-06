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
    // errors
    get submissionError(){
        return $$('p.is-danger')
    }
    get invalidSubmissionError(){
        return $('p.is-danger')
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
    get loginCloseBtn(){
        return $('div[class="animation-content"] > .modal-close')
    }
    
}

module.exports = new GE();