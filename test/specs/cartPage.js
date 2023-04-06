const chai = require("chai")
const cart = require('../pageobjects/cart')
const ge = require('../pageobjects/ge')
const pdp = require('../pageobjects/pdp')

describe('cart test suite', async () => {
    xit('reach empty cart', async () => {
        await browser.url('/shopping-cart')
        await expect(browser).toHaveUrlContaining('shopping-cart')
    })
    it('add product to cart', async ()=> {
        await browser.url('/mobilni-telefoni/xiaomi/xiaomi-13-lite')
        await pdp.memoryOptions[0].click()
        await pdp.colorOptions[0].click()
        await pdp.addToCartBtn.click()
        // await ge.cartLink.click()
        await expect(pdp.cartDropdown).toBeDisplayed()
        await pdp.cartDropdownCheckoutBtn.click()
        await expect(browser).toHaveUrlContaining('shopping-cart')
        // await browser.pause(4000)
    })
    xit('reach pdp from cart item', async () => {
        const productName = await cart.cartItems[0].$('a').getAttribute('href')
        await cart.cartItems[0].click()        
        await expect(browser).toHaveUrlContaining(productName)
    })
    xit('update product quantity in cart', async () => {
        await ge.cartLink.click()
        await expect(browser).toHaveUrlContaining('shopping-cart')
        await cart.cartItemsQuantity[0].selectByAttribute('value', '3')
        chai.expect(await cart.cartItemsQuantity[0].getValue()).to.be.equal('3')
    })
    it('submit empty/invalid promo code', async() => {
        await cart.promoCodeApplyBtn.click()
        await expect(cart.Dialog).toBeDisplayed()
        chai.expect(await cart.DialogContentText.getText()).to.be.eql('Kôd kupona nije važeći!')
        await cart.DialogOk.click()
        await expect(cart.Dialog).not.toBeDisplayed()
    })
    it('reach shipping step', async() => {
        await cart.goToShippingBtn.click()
        await expect(browser).toHaveUrlContaining('step=delivery')
    })
    it('go to previous step from shipping step', async() => {
        await cart.completedSteps[0].click()
        await expect(browser).toHaveUrlContaining('step=preview')
    })
    it('submit empty fields on shipping step - erros are present', async() => {
        await cart.goToShippingBtn.click()
        await expect(browser).toHaveUrlContaining('step=delivery')
        await cart.goToPaymentBtn.click()
        await expect(cart.accErrors).toBeDisplayed()
    })
    it('save date for the next order', async() => {
        await cart.saveForTheNextOrderCheckbox.click()
        await expect(cart.passwordFieldGuestUser).toBeDisplayed()
    })
    it('checkout sign in dialog', async() => {
        await cart.checkoutSignInBtn.click()
        await expect(cart.signInModal).toBeDisplayed()
    })
})