import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { CreatePurchasePage } from '@pages/CreatePurchasePage';
import { Sidebar } from '@pages/Sidebar';
import { TestData } from '@utils/test.data';

test.describe('Create Purchase - Success', () => {
  let loginPage: LoginPage;
  let createPurchasePage: CreatePurchasePage;
  let sidebar: Sidebar;

  test.beforeEach(async ({ page }) => {
    // Authorization
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(TestData.credentials.valid.username, TestData.credentials.valid.password);

    // Verify redirection
    await expect(page).toHaveURL(TestData.urls.dashboard);

    // Navigate to the "Bokføring" menu
    sidebar = new Sidebar(page);
    await sidebar.selectSubMenu('Bokføring', 'Bokfør andre filer');

    // Initialize Create Purchase page
    createPurchasePage = new CreatePurchasePage(page);
  });

  test('Create Purchase Successfully', async () => {
    // Fill the form with valid data
    await createPurchasePage.fillForm(TestData.purchase.positive);

    // Submit the form
    await createPurchasePage.submitForm();

    // Verify success message
    await createPurchasePage.verifySuccessMessage(TestData.purchase.positive.successMessage);

    // Verify that the form is cleared
    await createPurchasePage.verifyFormIsCleared([
      createPurchasePage.totalAmountInput,
      createPurchasePage.fakturadatoInput,
      createPurchasePage.forfallsdatoInput,
    ]);
  });
});