import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { ContactPage } from '@pages/ContactPage';
import { TestData } from '@utils/test.data'; 

test.describe('Contact Creation - Validation Tests', () => {
  let loginPage: LoginPage;
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    // Initialize login page and navigate to the login screen
    loginPage = new LoginPage(page);
    await loginPage.navigate();

    // Perform login using valid credentials
    await loginPage.login(
      TestData.credentials.valid.username,
      TestData.credentials.valid.password
    );

    // Navigate to the "Contacts" section
    contactPage = new ContactPage(page);
    await contactPage.navigateToContacts();
  });

  test('Validation error when creating a contact without required fields', async ({ page }) => {
    // Click the "New Contact" button
    await contactPage.newContactButton.click();

    // Leave all required fields empty and submit the form
    await contactPage.submitContactForm();

    // Verify that the validation error is displayed
    await contactPage.verifyValidationError(TestData.contact.validationError);
  });
});