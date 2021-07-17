import Chance from 'chance'

describe('End to end testing for in the loop application', () => {
	
	const chance = new Chance()
	const name = chance.name();
	const email = chance.email();
	const password = 'abce1234';
	

	before(() => {
		cy.visit('http://localhost:8080/');		
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

	it('Change date range',  () => {
		cy.wait(1000);
		cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click();
		cy.get(':nth-child(4) > :nth-child(1) > .MuiButtonBase-root > .MuiIconButton-label > .MuiTypography-root').click();
		cy.get('html').clickOutsideFar();
		cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click();
		cy.get(':nth-child(4) > :nth-child(3) > .MuiButtonBase-root > .MuiIconButton-label > .MuiTypography-root').click();
		cy.get('html').clickOutsideFar();
	});

	it('Changes the distance radius using the slider from 25 to 15', () => {
		cy.get('.MuiSlider-thumb').should('have.attr','aria-valuenow', 25)
		cy.get('[data-index="2"]').click();
		cy.get('.MuiSlider-thumb').should('have.attr', 'aria-valuenow', 15)
	})
	
	it('Enter the city of New York and search for a concert',  () => {
		cy.wait(1000);
		cy.get('.mapboxgl-ctrl-geocoder--input').click();
		cy.get('.mapboxgl-ctrl-geocoder--input').type('New York City');
		cy.get('.mapboxgl-ctrl-geocoder--input').type('{enter}');
		cy.wait(3000);
	});

	it('Select concert menu, find a concert, and favorite it',  () => {
		cy.wait(1000);
		cy.get(':nth-child(1) > :nth-child(6) > .MuiButtonBase-root').click();
		cy.get('.MuiToolbar-root > .MuiButtonBase-root').click();
	});

	it('Click favorites menu and view favorites',  () => {
		cy.wait(1000);
		cy.get('.MenuButton').should('have.length', 1);
		cy.get('.MenuButton').click();
		cy.get(':nth-child(3) > .MuiListItemText-root > .MuiTypography-root').click();
		cy.wait(3000);
		cy.get('body').clickOutside();
	});

it('Logout and log back in with registered user', () => {
		cy.get('.MenuButton').click();
		cy.get('[id^=logout]').should('have.length', 1);
		cy.get('[id^=logout]').click();
		cy.get('html').clickOutside();
		cy.wait(3000);
	});

	it('Login with the user that was registered', () => {
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
	});

	it('Last check to see if favorites are still there',  () => {
		cy.wait(1000);
		cy.get('.MenuButton').should('have.length', 1);
		cy.get('.MenuButton').click();
		cy.get(':nth-child(3) > .MuiListItemText-root > .MuiTypography-root').click();
		cy.wait(3000);
		cy.get('body').clickOutside();
		cy.wait(1000);
		cy.get('.mapboxgl-ctrl-geocoder--input').click();
		cy.get('.mapboxgl-ctrl-geocoder--input').type('Thank you for watching the Cypress demo!');
	});

})