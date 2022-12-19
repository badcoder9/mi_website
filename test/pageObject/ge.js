class GE {
    // search
    get searchField(){
        return $('.autocomplete input[name="q"]')
    }
    get predictiveResults(){
        return $('.autocomplete .dropdown-menu')
    }
    get breadcrumbsLocation(){
        return $('.breadcrumb .is-active')
    }

    async performSearchByEnter(){
        await this.searchField.setValue('redmi')
        await browser.keys('Enter')
    }
    async performSearchByPredictive(){
        await this.searchField.setValue('xiaomi')
        await this.predictiveResults.waitForDisplayed()
        
    }

    // menu navigation
    get navItems (){
        return $$('#mainnav .navbar-item > a')
    }
    get navdropdown (){
        return $$('#mainnav .navbar-item.has-dropdown > .navbar-dropdown')
    }


    // footer newsletter
    get newsletterField(){
        return $('#mce-EMAIL')
    }
    get newsletterSubmitBtn(){
        return $('#mc-embedded-subscribe')
    }

    // hp carousel
    get carouselPrevBtn(){
        return $('.hp-slides .carousel-arrow .has-icons-left')
    }
    get carouselNextBtn(){
        return $('.hp-slides .carousel-arrow .has-icons-right')
    }
    get carouselSlide(){
        return $('.hp-slides .carousel-items .carousel-item[style=""] a')
    }
    get carouselSlideLinks(){
        return $$('.hp-slides .carousel-items .carousel-item a')
    }
    get carouselDotsBtns(){
        return $$('.carousel-indicator .indicator-item')
    }

    async changeSlide(){
        await this.carouselNextBtn.click()
        await this.carouselSlide.click()        
    }
    
}

module.exports = new GE();