import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { TestData } from '@utils/test.data'; 

test.describe('Login Functionality Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    // Initialize the login page
    loginPage = new LoginPage(page);
    await loginPage.navigate(); // Navigate to the login page
  });

  test('Successful login with valid credentials', async ({ page }) => {
    // Login with valid username and password
    await loginPage.login(TestData.credentials.valid.username, TestData.credentials.valid.password);
    
    // Verify successful redirection after login
    await expect(page).toHaveURL(TestData.urls.dashboard);
  });

  test('Failed login with incorrect password', async ({ page }) => {
    // Attempt login with invalid password
    await loginPage.login(TestData.credentials.invalid.username, TestData.credentials.invalid.password);
    
    // Verify error message is displayed
    await expect(loginPage.alertMessage).toBeVisible();
    await expect(loginPage.alertMessage).toContainText(TestData.messages.invalidLoginError);
  });
});