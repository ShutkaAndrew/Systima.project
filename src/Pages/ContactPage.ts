import { Page, Locator, expect } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly newContactButton: Locator;
  readonly navnInput: Locator;
  readonly opprettKontaktButton: Locator;
  readonly successMessage: Locator;
  readonly validationError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newContactButton = this.page.getByRole('button', { name: 'Ny kontakt' });
    this.navnInput = this.page.getByLabel('Navn *');
    this.opprettKontaktButton = this.page.getByRole('button', { name: 'Opprett kontakt' });
    this.successMessage = this.page.getByRole('main').getByRole('status');
    this.validationError = this.page.getByText('Navn *Vennligst skriv inn navn');
  }

  async navigateToContacts() {
    await this.page.getByRole('link', { name: 'Kontakter' }).click();
  }

  async fillContactForm(contactName: string) {
    await this.navnInput.fill(contactName);
  }

  async submitContactForm() {
    await this.opprettKontaktButton.click();
  }

  async verifySuccessMessage(expectedMessage: string) {
    await expect(this.successMessage).toBeVisible();
    await expect(this.page.getByRole('main')).toContainText(expectedMessage);
  }

  async verifyValidationError(expectedMessage: string) {
    await expect(this.validationError).toBeVisible();
    await expect(this.page.locator('form')).toContainText(expectedMessage);
  }
}