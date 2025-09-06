describe('Dashboard Flow', () => {
  it('should create and view dashboard', () => {
    cy.visit('/')
    cy.contains('Get Started').click()
    cy.url().should('include', '/auth')
    
    // Mock login
    cy.get('[data-testid="email"]').type('demo@example.com')
    cy.get('[data-testid="password"]').type('password')
    cy.get('[data-testid="login-btn"]').click()
    
    // Navigate to dashboard creation
    cy.contains('Create Dashboard').click()
    cy.url().should('include', '/dashboard/create')
    
    // Add dashboard name
    cy.get('input[placeholder*="Dashboard name"]').type('Test Dashboard')
    
    // Save dashboard
    cy.contains('Save').click()
    cy.url().should('include', '/dashboard')
  })
})