describe('Login formu testleri')
beforeEach(() => {
   cy.visit('/'); 
})

it('Form elemanları ekranda görünür', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('input[type="checkbox"]').should('be.visible');
    cy.get('[data-testid="sign-in button"]').should('be.visible');
})

it('Form doğru doldurulduğunda success sayfasına gidiyor', () => {
    cy.get('input[type="email"]').type('erdem.guntay@wit.com.tr');
    cy.get('input[type="password"]').type('9fxIH0GXesEwH_I');
    cy.get('input[type="checkbox"]').check();
    cy.get('[data-testid="sign-in button"]').click();
    cy.url().should('include','/success');
})

it('email yanlış formatta girildi buton disabled oldu', () => {
    cy.get('input[type="email"]').type('erdm.gunay@wit.com.tr');
    cy.get('[data-testid="sign-in button"]').should('be.disabled');
    cy.get('div[data-testid="formfeedbackEmail"]').should('be.visible');
    cy.get('div[data-testid="formfeedbackEmail"]').should('contain.text','Please enter a valid email address');
})

it('email ve password hatalı girildiğinde buton disabled olur', () => {
    cy.get('input[type="email"]').type('erdm.gunay@wit.com.tr');
    cy.get('div[data-testid="formfeedbackEmail"]').should('be.visible');
    cy.get('div[data-testid="formfeedbackEmail"]').should('contain.text','Please enter a valid email address');
    cy.get('input[type="password"]').type('12');
    cy.get('div[data-testid="formfeedbackPassword"]').should('be.visible');
    cy.get('div[data-testid="formfeedbackPassword"]').should('contain.text','Password must be at least 4 characters long');
    cy.get('[data-testid="sign-in button"]').should('be.disabled')
})

it('email ve password doğru , terms checkbox seçilmediğinde buton disabled olur', () => {
    cy.get('input[type="email"]').type('erdem.guntay@wit.com.tr');
    cy.get('input[type="password"]').type('1234');
    cy.get('[data-testid="sign-in button"]').should('be.disabled')
})