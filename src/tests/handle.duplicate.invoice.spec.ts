import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { CreatePurchasePage } from '@pages/CreatePurchasePage';
import { Sidebar } from '@pages/Sidebar';
import { TestData } from '@utils/test.data';

test.describe('Handle Duplicate Invoice Number', () => {
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

  test('Duplicate Invoice Number Error', async () => {
    // Fill the form with duplicate invoice number data
    await createPurchasePage.fillForm(TestData.purchase.negative.duplicateInvoiceNumber);

    // Submit the form
    await createPurchasePage.submitForm();

    // Verify duplicate invoice error
    await createPurchasePage.verifyDuplicateInvoiceError(
      TestData.purchase.negative.duplicateInvoiceNumber.errorMessage
    );

    // Verify that the form is not cleared
    await createPurchasePage.verifyFormIsNotCleared([
      createPurchasePage.totalAmountInput,
      createPurchasePage.fakturadatoInput,
      createPurchasePage.forfallsdatoInput,
      createPurchasePage.invoiceNumberInput,
    ]);
  });
});