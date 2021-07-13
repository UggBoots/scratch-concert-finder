describe('My first test', () => {
	before(() => {
		// Cypress starts out with a blank slate for each test
		// so we must tell it to visit our website with the `cy.visit()` command.
		// Since we want to visit the same URL at the start of all our tests,
		// we include it in our beforeEach function so that it runs before each test
		cy.visit('http://localhost:8080/')
	  })
	
	it('Find an infinity logo and click it', () => {
		cy.get('.MenuButton').should('have.length', 1);
		cy.get('.MenuButton').click();
	})
	it('Find a register button and click it', () => {
		cy.get('[id^=register]').should('have.length', 1);
		cy.get('[id^=register]').click();
	})
	it('Register a new user with a name, email, and password', () => {
		cy.get('.regName').should('have.length', 1);
		cy.get('.regName').click();
		cy.get('.regName').type('Eric');
		cy.get('.regEmail').should('have.length', 1);
		cy.get('.regEmail').click();
		cy.get('.regEmail').type('Eric123@gmail.com');
		cy.get('.regPW').should('have.length', 1);
		cy.get('.regPW').click();
		cy.get('.regPW').type('apple');
		cy.get('[id^=regC]').should('have.length', 1);
		cy.get('[id^=regC]').click();
		cy.get('html').clickOutside();
		cy.get('html').clickOutside();
	})

	it('Login with the user that just registered', () => {
		cy.get('.MenuButton').click();
		cy.get('[id^=login]').should('have.length', 1);
		cy.get('[id^=login]').click();
		cy.get('.logEmail').click();
		cy.get('.logEmail').type('Eric123@gmail.com');
		cy.get('.logPW').should('have.length', 1);
		cy.get('.logPW').click();
		cy.get('.logPW').type('apple');
		cy.get('[id^=logC]').should('have.length', 1);
		cy.get('[id^=logC]').click();
		cy.get('html').clickOutside();
		cy.get('html').clickOutside();
	})

})