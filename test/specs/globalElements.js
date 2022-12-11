const chai = require("chai")
const ge = require('../pageObject/ge')


describe('global elements test suite', async () => {
    //search
    it('submit search via enter', async ()=> {
        await browser.url('/')
        await ge.performSearchByEnter()
        expect(await ge.breadcrumbsLocation).toHaveText('Pretraga')
    })
    it('submit search via predictive', async ()=> {
        await browser.url('/')
        await ge.performSearchByPredictive()
        const results = await ge.predictiveResults.$$('a')
        const resultText = await results.map( async result => await result.$('p').getText())
        const searchItemText = await resultText[1]
        await results[1].click()
        chai.expect(await ge.breadcrumbsLocation.getText()).to.equal(searchItemText)
    })
    //search end

    //main navigation    
    it('main nav items - first dropdown', async ()=> {
        await browser.url('/')
        await ge.navItems[0].moveTo()
        expect(await ge.navItems[0].nextElement()).toBeDisplayed() 
    })
    it('main nav items - 2nd dropdown - category', async ()=> {
        await browser.url('/')
        await ge.navItems[1].moveTo()
        const dropdown = await ge.navItems[1].nextElement()
        expect(await dropdown).toBeDisplayed() 

        const dropdowndCategoryLinks = await dropdown.$$('.mm-column > a')
        const catLinkNames = dropdowndCategoryLinks.map(async category => await category.$('p').getText())
        const categoryName = await catLinkNames[0]
        await dropdowndCategoryLinks[0].click()

        chai.expect(await ge.breadcrumbsLocation.getText()).to.eql(categoryName)
    })

    it('main nav items - 2nd dropdown - product', async ()=> {
        await browser.url('/')
        await ge.navItems[1].moveTo()
        const dropdown = await ge.navItems[1].nextElement()
        expect(await dropdown).toBeDisplayed() 

        const dropdownProductLinks = await dropdown.$$('.c-product-cards .product-name')
        const prodLinkNames = dropdownProductLinks.map(async product => await product.$('a').getText())
        const productName = await prodLinkNames[0]
        await dropdownProductLinks[0].$('a').click()

        chai.expect(await ge.breadcrumbsLocation.getText()).to.eql(productName)
        // await expect(browser).toHaveTitleContaining(productName)
    })    
    //main navigation end

    //footer newsletter
    it('newsletter redirect', async ()=> {
        await browser.url('/')
        await ge.newsletterField.setValue('test@yopmail.com')
        await ge.newsletterSubmitBtn.click()
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
        expect(await $('h1.masthead')).toHaveTextContaining('Mi Srbija Web Site List')
    })
    //footer newsletter end    
    
})