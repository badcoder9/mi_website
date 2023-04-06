class CART {
    get cartItems(){
        return $$('.cart-items .cart-item .ci-name')
    }
    get cartItemsQuantity(){
        return $$('.cart-items .cart-item .ci-qty select')
    }
    get promoCodeInput(){
        return $('.promo-code input')
    }
    get promoCodeApplyBtn(){
        return $('.promo-code button')
    }
    get Dialog(){
        return $('.dialog')
    }
    get DialogTitle(){
        return this.Dialog.$('.modal-card-head')
    }
    get DialogContentText(){
        return this.Dialog.$('.modal-card-body p > div')
    }
    get DialogOk(){
        return $('//footer[@class="modal-card-foot"]/button[contains(text(),"OK")]')
    }
    get signInModal(){
        return $('.user-identity-container ~ .modal')
    }
    get signInModalTitle(){
        return this.signInModal.$('.modal-card-title')
    }
    get signInModalClose(){
        return this.signInModal.$('.modal-close')
    }

    get goToShippingBtn(){
        return $('button[name="to_checkout"]')
    }
    get goToPaymentBtn(){
        return $('button[name="continue_to_delivery"]')
    }

    get accErrors(){
        return $$('[class="help is-danger"]')
    }

    get completedSteps(){
        return $$('.step-completed a')
    }

    get checkoutSignInBtn(){
        return $('.checkout-delivery .ca-signin .is-link')
    }

    get saveForTheNextOrderCheckbox(){
        return $('//label[@class="b-checkbox checkbox"]/span[contains(text()," Sačuvaj podatke za sledeće naručivanje ")]')
    }
    get passwordFieldGuestUser(){
        return $('//div[@class="field is-floating-in-label"][label[contains(text(),"Lozinka")]]')
    }
}

module.exports = new CART();