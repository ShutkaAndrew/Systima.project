import { Page, Locator, expect } from '@playwright/test';
import { TestData } from '@utils/test.data';

export class CreatePurchasePage {
  readonly page: Page;
  readonly bokforButton: Locator;
  readonly totalAmountInput: Locator;
  readonly fakturadatoInput: Locator;
  readonly forfallsdatoInput: Locator;
  readonly invoiceNumberInput: Locator;
  readonly kontaktDropdown: Locator;
  readonly kontoDropdown: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bokforButton = page.getByRole('button', { name: 'Bokfør', exact: true });
    this.totalAmountInput = page.getByLabel('Totalt beløp inkl. mva. *');
    this.fakturadatoInput = page.getByLabel('Fakturadato *');
    this.forfallsdatoInput = page.getByLabel('Forfallsdato');
    this.invoiceNumberInput = page.getByLabel('Fakturanr.');
    this.kontaktDropdown = page.getByLabel('Kontakt (valgfri ved kvittering)');
    this.kontoDropdown = page.getByRole('button', { name: 'Konto *' });
    this.successMessage = page.getByText(/Bilag opprettet med bilagsnr/, { exact: false });
  }

  async fillForm(formData: Record<string, string>) {
    if (formData.contact) {
      await this.kontaktDropdown.click();
      await this.page.getByRole('option', { name: formData.contact }).click();
    }
    if (formData.totalAmount) {
      await this.totalAmountInput.fill(formData.totalAmount);
    }
    if (formData.invoiceDate) {
      await this.fakturadatoInput.fill(formData.invoiceDate);
    }
    if (formData.dueDate) {
      await this.forfallsdatoInput.fill(formData.dueDate);
    }
    if (formData.invoiceNumber) {
      await this.invoiceNumberInput.fill(formData.invoiceNumber);
    }
    if (formData.account) {
      await this.kontoDropdown.click();
      await this.page.getByRole('option', { name: formData.account }).click();
    }
  }

  async submitForm() {
    await this.bokforButton.click();
  }

  async verifySuccessMessage(expectedMessage: string) {
    await expect(this.successMessage).toBeVisible({ timeout: 10000 });
    await expect(this.successMessage).toContainText(expectedMessage);
  }

  async verifyDuplicateInvoiceError(expectedErrorMessage: string) {
    const errorLocator = this.page.getByRole('alert');
    await expect(errorLocator).toContainText(expectedErrorMessage);
  }

  async verifyFormIsCleared(fields: Locator[]) {
    for (const field of fields) {
      const value = await field.inputValue();
      expect(value).toBe(''); // Перевіряємо, що значення поля пусте
    }
  }
  
  async verifyFormIsNotCleared(fields: Locator[]) {
    for (const field of fields) {
      const value = await field.inputValue();
      expect(value).not.toBe(''); // Перевіряємо, що значення поля не пусте
    }
  }
}