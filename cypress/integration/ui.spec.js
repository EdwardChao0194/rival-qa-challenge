const ACTION_TIMEOUT = 200;

describe("Todo App UI Test Suite",()=>{ 
    it("should navigate to the todo application",()=>{
        cy.visit("http://localhost:3000/").wait(ACTION_TIMEOUT)
    })

    it("should enter an item into the input box",()=>{
        cy.get('input').type("Dog").wait(ACTION_TIMEOUT)
    })

    it("should verify that users are able to add items to the list",()=>{
        cy.get("#root > div > div:nth-child(1) > form > button").click().wait(ACTION_TIMEOUT)
        cy.contains('Dog').wait(ACTION_TIMEOUT)
    })

    it("should verify that the new item is visible only in the 'All' and 'Active' lists",()=>{
        cy.contains('Dog').wait(ACTION_TIMEOUT)
        cy.get("div:nth-of-type(2) > button:nth-of-type(2)").click().wait(ACTION_TIMEOUT)
        cy.contains('Dog').wait(ACTION_TIMEOUT)
        cy.get("div:nth-of-type(2) > button:nth-of-type(3)").click().wait(ACTION_TIMEOUT)
        cy.contains('Dog').should('not.exist').wait(ACTION_TIMEOUT)
    })

    it("should verify that the new item is removed the 'Active' and only visible with the 'All' and Completed' lists and the item has the line-through attribute",()=>{
        cy.get("div:nth-of-type(2) > button:nth-of-type(1)").click().wait(ACTION_TIMEOUT)
        cy.get("#root > div > ul > li").click()
        cy.contains('Dog').should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')
        cy.get("div:nth-of-type(2) > button:nth-of-type(2)").click().wait(ACTION_TIMEOUT)
        cy.contains('Dog').should('not.exist')
        cy.get("div:nth-of-type(2) > button:nth-of-type(3)").click().wait(ACTION_TIMEOUT)
        cy.contains('Dog').should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')
    })
})