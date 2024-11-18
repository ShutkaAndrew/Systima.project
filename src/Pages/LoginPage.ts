import { Page, Locator } from '@playwright/test';
import { TestData } from '@utils/test.data'; // Імпортуємо тестові дані

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly alertMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = this.page.getByLabel('E-post');
    this.passwordInput = this.page.getByLabel('Passord');
    this.loginButton = this.page.getByRole('button', { name: 'Logg inn' });
    this.alertMessage = this.page.getByRole('alert');
  }

  async navigate() {
    await this.page.goto(TestData.urls.loginPage); // Використання URL із централізованих даних
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async getAlertMessage() {
    return await this.alertMessage.textContent();
  }
}