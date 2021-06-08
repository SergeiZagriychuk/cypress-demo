context('Acceptance suite', () => 
{
    
    it("Model specs", () =>
    {
        cy.visit('')

        cy.get('div.brandmenu-v2').contains("Samsung").click()
        cy.contains("Galaxy A52 5G").click()

        cy.get('.help-display strong').should('have.text', '6.5"')
        cy.get('.help-camera strong').should('have.text', '64MP\n      ')
        cy.get('.help-expansion strong').should('have.text', '6/8GB RAM')
        cy.get('.help-battery strong').should('have.text', '4500mAh')
    })

    it.skip("Compare models", () => 
    {
        cy.visit("")

        cy.get("#footmenu").contains("Compare").click()
        cy.url().should('contain', 'compare.php3')

        var specs = ["Technology", "Announced"]
        var models = ["Samsung Galaxy J3", "Samsung Galaxy J5", "Samsung Galaxy J7 Pro"]
        models.forEach(($m, index) => 
        {
            cy.get("div.candidate-search-" + (index + 1)).find("#sSearch" + (index + 1)).type($m)
            cy.get("div.candidate-search-" + (index + 1)).find("div.autocomplete-search a:not([class])").first().click()            
        })

        specs.forEach( ($s) => {
            cy.contains($s).parent().parent().find("td.nfo").as($s)            
        })

        // cy.get('@' + specs[0]).first().should('have.text', 'AAA')
        cy.get('@' + specs[1]).first().should('have.text', "2016, March 31. Released 2016, May 06")
            .next().should('have.text', "2015, June 19. Released 2015, July 28")
            .next().should('have.text', "2017, June")
    })

    it.skip("Search news", () => 
    {
        cy.visit("")

        cy.get("#footmenu").contains("News").click()
        cy.url().should('contain', 'news.php3')

        var search_key = 'iphone'
        cy.get(".searchFor").type(search_key)
        cy.get("div.search-band input.submit").click()

        cy.get('div.news-item').should(($news) => {
            let texts = $news.map((i, el) => {
              return Cypress.$(el).find("a").text()
            })

            texts = texts.get()
            assert.isTrue(texts.length > 0, "News list is empty!")
            texts.forEach(t => {
                assert.isTrue(t.toLowerCase().includes(search_key.toLowerCase()), "Title of news is not having searched key: " + t)
            });
        })
        
    })

})
