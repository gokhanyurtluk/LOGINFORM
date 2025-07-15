describe('Login Form Test', () => {
    beforeEach(() => {
        // Her test öncesi ana sayfaya git
        cy.visit('/')
    })

    it('should display login form elements', () => {
        // Email input alanının görünür olduğunu kontrol et
        cy.get('input[type="email"]').should('be.visible')

        // Password input alanının görünür olduğunu kontrol et
        cy.get('input[type="password"]').should('be.visible')

        // Checkbox'ın görünür olduğunu kontrol et
        cy.get('input[type="checkbox"]').should('be.visible')

        // Sign in metinli butonunun görünür olduğunu kontrol et
        cy.get('button[data-testid="sign-in-button"]').should('contain.text', 'Sign In')

    })

    it('form doldurulup dogru bilgiler girildiğinde success sayfasına yönlendiriliyor', () => {
        cy.get('input[type="email"]').type('erdem.guntay@wit.com.tr')
        cy.get('input[type="password"]').type('9fxIH0GXesEwH_I')
        cy.get('input[type="checkbox"]').check()
        cy.get('button[data-testid="sign-in-button"]').click()
        cy.url().should('include', '/success')
    })

    it('email yanlış formatta girildiğinde hata mesajı görünür ve buton disabled olur', () => {
        cy.get('input[type="email"]').type('erdem.guntaywit.com.tr')
        cy.get('button[data-testid="sign-in-button"]').should('be.disabled')
        cy.get('div[data-testid="formfeedbackEmail"]').should('contain.text', 'Please enter a valid email address')
    })

    it('email ve password yanlış formatta girildiğinde 2 hata mesajı görünür ve buton disabled olur', () => {
        cy.get('input[type="email"]').type('erdem.guntaywit.com.tr')
        cy.get('input[type="password"]').type('123')
        cy.get('button[data-testid="sign-in-button"]').should('be.disabled')
        cy.get('div[data-testid="formfeedbackEmail"]').should('contain.text', 'Please enter a valid email address')
        cy.get('div[data-testid="formfeedbackPassword"]').should('contain.text', 'Password must be at least 4 characters long')
    })

    it('email ve password doğru formatta, terms checkbox işaretlenmediğinde buton disabled olur.', () => {
        cy.get('input[type="email"]').type('erdem.guntay@wit.com.tr')
        cy.get('input[type="password"]').type('9fxIH0GXesEwH_I')
        cy.get('button[data-testid="sign-in-button"]').should('be.disabled')
    })
}) 