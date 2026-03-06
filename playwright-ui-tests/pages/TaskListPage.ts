// playwright-ui-tests/pages/TaskListPage.ts
import { Page, Locator } from '@playwright/test';

export class TaskListPage {
  readonly page: Page;
  readonly taskInput: Locator;
  readonly addButton: Locator;
  readonly taskListItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.taskInput = page.locator('input.input[placeholder="Enter task title"]');
    this.addButton = page.locator('button.add-button');
    this.taskListItems = page.locator('li.task-item');
  }

  async goto() {
    await this.page.goto('http://localhost:3000', { timeout: 60000 });
  }

  async addTask(title: string) {
    await this.taskInput.fill(title);
    await this.addButton.click();
  }

  async getTask(title: string) {
    return this.taskListItems.filter({ hasText: title });
  }

  async deleteTask(title: string) {
    const task = await this.getTask(title);
    await task.locator('button.delete-button').click();
  }

  async toggleTaskStatus(title: string) {
    const task = await this.getTask(title);
    await task.locator('.task-text').click();
  }
}