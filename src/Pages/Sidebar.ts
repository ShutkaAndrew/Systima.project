import { Page } from '@playwright/test';

export class Sidebar {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectSubMenu(mainMenu: string, subMenu: string) {
    await this.page.getByRole('button', { name: mainMenu }).click();
    await this.page.getByRole('link', { name: subMenu }).click();
  }
}