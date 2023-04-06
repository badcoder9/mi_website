class PDP {
    // pdp main flow
    get productPageTitle(){
        return $('.product-title h1')
    }
    get productOptionsError(){
        return $('.has-text-danger')
    }
    get memoryOptions(){
        return $$('//div[@class="voption-name"][contains(text(),"Memorija")]/following-sibling::div[@class="voption-values"][1]/div[contains(@class, \'voption-value\')]')
    }
    get colorOptions(){
        return $$('//div[@class="voption-name"][contains(text(),"Boja")]/following-sibling::div[@class="voption-values"][1]/div[contains(@class, \'voption-value\')]')
    }
    get addToCartBtn(){
        return $('.add-to-cart-button')
    }
    get quantityContainer(){
        return $('.add-to-cart .quantity')
    }
    get quantityField(){
        return this.quantityContainer.$('input[type="tel"]')
    }
    get decQuantityBtn(){
        return this.quantityContainer.$('.fa-minus')
    }
    get incQuantityBtn(){
        return this.quantityContainer.$('.fa-plus')
    }
    get cartIconQty(){
        return $('.cart-badge-container .cart-qty')
    }
    get cartDropdown(){
        return $('.cart-box-container')
    }    
    get cartDropdownQty(){
        return this.cartDropdown.$('.total .items .num')
    }
    get cartDropdownMsg(){
        return this.cartDropdown.$('.added')
    }
    get cartDropdownCloseBtn(){
        return this.cartDropdown.$('.close')
    }
    get cartDropdownCheckoutBtn(){
        return this.cartDropdown.$('button')
    }
    // availability
    get availabilityButton(){
        return $('.availability > button')
    }
    get availabilityDialog(){
        return $('.availability > .modal')
    }
    get availabilityDialogTitle(){
        return this.availabilityDialog.$('.modal-card-head')
    }
    get availabilityDialogCloseButton(){
        return this.availabilityDialog.$('.modal-close')
    }
    // credit section
    get creditSection(){
        return $('#credit-calc')
    }
    get principalField(){
        return $('//div[@class="loan-calc"]/div[@class="field"][label[contains(text(),"Glavnica")]]/div/input')
    }
    get participationField(){
        return $('//div[@class="loan-calc"]/div[@class="field"][label[contains(text(),"Učešće")]]/div/input')
    }
    get creditAmmountField(){
        return $('//div[@class="loan-calc"]/div[@class="field"][label[contains(text(),"Iznos kredita")]]/div/input')
    }
    get selectLoanLengthMonths(){
        return $('.loan-calc select')
    }
    get monthlyFee(){
        return $('.loan-calc > div:last-child > strong')
    }
}

module.exports = new PDP();