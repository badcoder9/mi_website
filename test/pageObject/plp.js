class PLP {

    get plpTitle(){
        return $('//header[@class="category-header "]/div/div/h1')
    }
    get getPlpTitle(){
        return this.plpTitle.getText()
    }
    // category
    get categoryLinks(){
        return $$('.category-filters .subcategories p a')
    }

    async chooseCategory(category) {
        for(let i=0; i< await this.categoryLinks.length; i++){
            if( category.includes(await this.categoryLinks[i].getText()) ){
                await this.categoryLinks[i].click()
            }            
        }
    }
    // price range
    get rangeSliderMinInput(){
        return $('.range-input > input[placeholder*="min"]')
    }
    get rangeSliderMaxInput(){
        return $('.range-input > input[placeholder*="maks"]')
    }
    get rangeSliderApplyRangeBtn(){
        return $('.range-filter-container button')
    }
    get rangeSliderMinSlide(){
        return $('.range-filter-container .b-slider-track .b-slider-thumb-wrapper:nth-child(2) .b-slider-thumb')
    }
    get rangeSliderMaxSlide(){
        return $('.range-filter-container .b-slider-track .b-slider-thumb-wrapper:last-child .b-slider-thumb')
    }
    async updatePriceRangeInput() {
        await this.rangeSliderMinInput.setValue(3000)
        await this.rangeSliderMaxInput.setValue(10000)
        await this.rangeSliderApplyRangeBtn.click()
    }
    async updatePriceRangeSlider() {
        await this.rangeSliderMinSlide.dragAndDrop({x: 15, y: 0})
        await this.rangeSliderMaxSlide.dragAndDrop({x: -5, y: 0})
        await this.rangeSliderApplyRangeBtn.click()
    }



}

module.exports = new PLP();