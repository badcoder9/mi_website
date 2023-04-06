const chai = require("chai")
const pdp = require('../pageobjects/pdp')

describe('PDP test suite', async () => {
    it('check if add to cart error is present', async() =>{
        await browser.url('/mobilni-telefoni/xiaomi/xiaomi-12x')
        await pdp.addToCartBtn.click()
        await expect(pdp.productOptionsError).toBeDisplayed()
    })
    it('check if is memory option is selected', async() =>{
        await pdp.memoryOptions[0].click()
        await expect(pdp.memoryOptions[0]).toHaveElementClass('is-active')
    })
    it('check if is color option is selected', async() =>{
        await pdp.colorOptions[0].click()
        await expect(pdp.colorOptions[0]).toHaveElementClass('is-active')
    })
    it('change product quantity via input', async() =>{
        const initQty = await pdp.quantityField.getValue()
        await pdp.quantityField.setValue(2)
        const curQty = await pdp.quantityField.getValue()
        chai.expect(await initQty).not.to.eql(curQty)
    })
    it('change product quantity via + button', async() =>{
        const initQty = await pdp.quantityField.getValue()
        await pdp.quantityContainer.moveTo()
        await pdp.incQuantityBtn.click()
        const curQty = await pdp.quantityField.getValue()        
        chai.expect(await initQty).not.to.eql(curQty)
        // await browser.pause(5000)
    })
    it('change product quantity via - button', async() =>{
        const initQty = await pdp.quantityField.getValue()
        await pdp.quantityContainer.moveTo()
        await pdp.decQuantityBtn.click()
        const curQty = await pdp.quantityField.getValue()        
        chai.expect(await initQty).not.to.eql(curQty)
    })
    it('add product to cart', async () => {
        await pdp.addToCartBtn.click()
        await expect(pdp.cartDropdown).toBeDisplayed()
        chai.expect(await pdp.cartDropdownMsg.getText()).to.eql('Proizvod je dodat u vašu korpu')
    })
    it('check if total quantity matches', async() =>{
        const cartDDQty = await pdp.cartDropdownQty.getText()
        const cartQty = await pdp.cartIconQty.getText()
        chai.expect(await cartDDQty).to.eql(cartQty)
    })
    it('check if cart dropdown closed', async () => {
        await expect(pdp.cartDropdownCloseBtn).toBeDisplayed()
        await pdp.cartDropdownCloseBtn.click()
        await expect(pdp.cartDropdown).not.toBeDisplayed()
    })
    it('check if store availability dialog is available', async () => {
        await pdp.availabilityButton.click()
        await expect(pdp.availabilityDialog).toBeDisplayed()
        chai.expect(await pdp.availabilityDialogTitle.getText()).to.eql('Dostupnost')
    })
    it('close store availability dialog', async () => {
        await pdp.availabilityDialogCloseButton.click()
        await expect(pdp.availabilityDialog).not.toBeDisplayed()
    })
    it('update loan lenth in months', async() => {
        // await pdp.goToCreditSectionLink.click()
        const initFee = await pdp.monthlyFee.getText()
        await pdp.creditSection.scrollIntoView()
        await pdp.selectLoanLengthMonths.selectByAttribute('value', '6')
        const updatedFee = await pdp.monthlyFee.getText()
        chai.expect(await updatedFee).not.to.eql(initFee)
    })
    it('check if updated loan lenth in months has the correct value', async() => {
        const loanAmount = parseInt(await pdp.creditAmmountField.getValue())
        const initFee = await pdp.monthlyFee.getText()
        await pdp.creditSection.scrollIntoView()
        await pdp.selectLoanLengthMonths.selectByAttribute('value', '12')
        let updatedFee = await pdp.monthlyFee.getText()
        chai.expect(await updatedFee).not.to.eql(initFee)
        const calculatedFee = (loanAmount / 12) +250
        const calculatedFee2decimals = await calculatedFee.toFixed(2)
        const calculatedFee2decimalsString = calculatedFee2decimals.toString()
        const cleanUpdateFee = updatedFee.replace('.', '').replace(',', '.')        
        chai.expect(await calculatedFee2decimalsString).to.eql(cleanUpdateFee)
        // await browser.pause(5000)
    })
    it('update participation value - check if updated loan amount is correct', async() => {
        await pdp.creditSection.scrollIntoView()

        const productCostString = await pdp.principalField.getValue()
        const participationAmountInput = await pdp.participationField
        await participationAmountInput.clearValue()
        await participationAmountInput.setValue('10000')
        const participationAmountString = await participationAmountInput.getValue()
        chai.expect(await participationAmountString).to.be.eql('10000')
        const loanAmountString = await pdp.creditAmmountField.getValue()
        // console.log('Ucesce:'+ participationAmountString)
        const productCostNumber = parseInt( productCostString)
        const participationAmountNumber = parseInt( participationAmountString)
        const loanAmountNumber = parseInt( loanAmountString)
        // console.log('calculated: ' + productCostNumber + '-' + participationAmountNumber + "=" + loanAmountNumber)
        const calcLoan = productCostNumber - participationAmountNumber
        chai.expect(await calcLoan).to.be.eql(loanAmountNumber)
        // console.log('Iznos kredita:'+calcLoan+'; Preuzet iznos:'+loanAmountNumber)
    })
    it('update participation value - check if updated monthly fee is correctly updated', async() => {
        await pdp.creditSection.scrollIntoView()

        const initFee = await pdp.monthlyFee.getText()

        const productCostString = await pdp.principalField.getValue()
        const participationAmountInput = await pdp.participationField
        await participationAmountInput.clearValue()
        await participationAmountInput.setValue('10000')
        const participationAmountString = await participationAmountInput.getValue()
        chai.expect(await participationAmountString).to.be.eql('10000')
        const loanAmountString = await pdp.creditAmmountField.getValue()
        // console.log('Ucesce:'+ participationAmountString)
        const productCostNumber = parseInt( productCostString)
        const participationAmountNumber = parseInt( participationAmountString)
        const loanAmountNumber = parseInt( loanAmountString)
        // console.log('calculated: ' + productCostNumber + '-' + participationAmountNumber + "=" + loanAmountNumber)
        const calcLoan = productCostNumber - participationAmountNumber
        chai.expect(await calcLoan).to.be.eql(loanAmountNumber)
        // console.log('Iznos kredita:'+calcLoan+'; Preuzet iznos:'+loanAmountNumber)
        const updatedFee = await pdp.monthlyFee.getText()
        const cleanUpdateFee = updatedFee.replace('.', '').replace(',', '.')   
        chai.expect(await updatedFee).not.to.eql(initFee)
        const calcUpdatedFee = (calcLoan / 12) + 250
        const calcUpdatedFeeString = calcUpdatedFee.toString()
        chai.expect(await calcUpdatedFeeString).to.be.eql(cleanUpdateFee)
        
        // console.log('IZRACUNATO:' + calcUpdatedFee+ '; preuzet iznos:'+cleanUpdateFee)
        // await browser.pause(5000)
    })
})