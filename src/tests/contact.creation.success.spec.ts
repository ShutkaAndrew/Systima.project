import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { ContactPage } from '@pages/ContactPage';
import { TestData } from '@utils/test.data';

test.describe('Contact Creation - Success', () => {
  let loginPage: LoginPage;
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    // Perform login
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(TestData.credentials.valid.username, TestData.credentials.valid.password);

    // Navigate to the "Contacts" page
    contactPage = new ContactPage(page);
    await contactPage.navigateToContacts();
  });

  test('Create Contact Successfully', async ({ page }) => {
    // Click on the "New Contact" button
    await contactPage.newContactButton.click();

    // Fill the "Name" field
    await contactPage.fillContactForm('Test');

    // Click the "Create Contact" button
    await contactPage.submitContactForm();

    // Verify successful creation of the contact
    await contactPage.verifySuccessMessage(TestData.contact.successMessage);
  });
});