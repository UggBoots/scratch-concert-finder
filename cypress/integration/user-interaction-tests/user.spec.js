import Chance from 'chance'

describe('End to end testing for in the loop application', () => {
	
	const chance = new Chance()
	const name = chance.name();
	const email = chance.email();
	const password = 'abce1234';
	

	before(() => {
		cy.visit('http://localhost:8080/')		
	  });
	
	it('Find an infinity logo and click it', () => {
		cy.get('.MenuButton').should('have.length', 1);
		cy.get('.MenuButton').click();
	});

	it('Find a register button and click it', () => {
		cy.get('[id^=register]').should('have.length', 1);
		cy.get('[id^=register]').click();
	});

	it('Register a new user with a name, email, and password', () => {
		cy.get('.regName').should('have.length', 1);
		cy.get('.regName').click();
		cy.get('.regName').type(name);
		cy.get('.regEmail').should('have.length', 1);
		cy.get('.regEmail').click();
		cy.get('.regEmail').type(email);
		cy.get('.regPW').should('have.length', 1);
		cy.get('.regPW').click();
		cy.get('.regPW').type(password);
		cy.get('[id^=regC]').should('have.length', 1);
		cy.get('[id^=regC]').click();
		cy.get('html').clickOutside();
		cy.get('html').clickOutside();
	});

	it('Login with the user that just registered', () => {
		cy.get('.MenuButton').click();
		cy.get('[id^=login]').should('have.length', 1);
		cy.get('[id^=login]').click();
		cy.get('.logEmail').click();
		cy.get('.logEmail').type(email);
		cy.get('.logPW').should('have.length', 1);
		cy.get('.logPW').click();
		cy.get('.logPW').type(password);
		cy.get('[id^=logC]').should('have.length', 1);
		cy.get('[id^=logC]').click();
		cy.get('html').clickOutside();
		cy.get('html').clickOutside();
	});

	it('Enter the city of New York and search for a concert',  () => {
		cy.wait(1000);
		cy.get('.mapboxgl-ctrl-geocoder--input').click();
		cy.get('.mapboxgl-ctrl-geocoder--input').type('New York City');
		cy.get('.mapboxgl-ctrl-geocoder--input').type('{enter}');
		cy.wait(3000);
		cy.get('html').clickOutsideFar();
	});

	it('Click a concert and favorite it',  () => {
		cy.wait(1000);
		cy.get('.overlays').first().click();
		cy.get('html').clickOutsideFar();
	});

})