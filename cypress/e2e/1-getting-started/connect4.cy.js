/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/connect4/dhtml/with-modules/src/DoubleDispatch/views/index.html')
  })

  it('can show 3 option to play', () => {
    cy.get('#dialog__players form button').should('have.length', 3)
  })

  it('can play human and random players', () => {
    cy.get('#dialog__players form button[value="1"').click()
    //cy.get('.dialog__finished').should('be.visible');
  })

  it('can play in demo mode', () => {
    cy.get('#dialog-yes-no').should('not.be.visible');
    cy.get('#dialog__players form button').should('have.length', 3)
    cy.get('#dialog__players form button[value="0"').click()
    cy.wait(5000)
    cy.get('#dialog-yes-no').should('be.visible');
  })

  it('can play in play vs play mode', () => {
    cy.get('#dialog-yes-no').should('not.be.visible');
    cy.get('#dialog__players form button').should('have.length', 3)
    cy.get('#dialog__players form button[value="2"').click()
    cy.get('#cell-50').click()
    cy.get('#cell-51').click()
    cy.get('#cell-50').click()
    cy.get('#cell-51').click()
    cy.get('#cell-50').click()
    cy.get('#cell-51').click()
    cy.get('#cell-50').click()
    cy.get('#dialog-yes-no').should('be.visible');
    cy.get('#dialog-yes-no form button[value="no"').click()
    cy.get('#cell-50').not('.board__header--turn-yellow').and('not.have.class', '.board__header--turn-red');
  })

  it('drop all token in the board and it is a tie', () => {
    cy.get('#dialog-yes-no').should('not.be.visible');
    cy.get('#dialog__players form button').should('have.length', 3)
    cy.get('#dialog__players form button[value="2"').click()
    cy.get('#cell-50').click();
    cy.get('#cell-51').click();
    cy.get('#cell-52').click();
    cy.get('#cell-53').click();
    cy.get('#cell-54').click();
    cy.get('#cell-55').click();
    cy.get('#cell-56').click();

    cy.get('#cell-55').click();
    cy.get('#cell-56').click();
    cy.get('#cell-54').click();
    cy.get('#cell-53').click();
    cy.get('#cell-52').click();
    cy.get('#cell-51').click();
    
    cy.get('#cell-52').click();

    cy.get('#cell-51').click();
    cy.get('#cell-50').click();
    cy.get('#cell-53').click();
    cy.get('#cell-54').click();
    cy.get('#cell-55').click();
    cy.get('#cell-56').click();
    
    //cy.get('#cell-52').click();

    cy.get('#cell-50').click();
    cy.get('#cell-55').click();
    cy.get('#cell-54').click();
    cy.get('#cell-53').click();
    cy.get('#cell-51').click();
    cy.get('#cell-50').click();
    
    cy.get('#cell-56').click();

    cy.get('#cell-51').click();
    cy.get('#cell-50').click();
    cy.get('#cell-52').click();
    cy.get('#cell-52').click();
    cy.get('#cell-55').click();
    cy.get('#cell-54').click();
    cy.get('#cell-56').click();

    cy.get('#cell-55').click();
    cy.get('#cell-56').click();
    cy.get('#cell-54').click();
    cy.get('#cell-51').click();
    cy.get('#cell-52').click();
    cy.get('#cell-51').click();
    cy.get('#cell-53').click();
    cy.get('#cell-50').click();
    
    
    cy.get('#cell-53').click();

    cy.get('#dialog-yes-no').should('be.visible');
    cy.get('#dialog-yes-no form button[value="no"').click()
    cy.get('#cell-50').not('.board__header--turn-yellow').and('not.have.class', '.board__header--turn-red');

  })
})
