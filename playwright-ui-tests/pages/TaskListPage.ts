import { Page, Locator } from '@playwright/test';

export class TaskListPage {

  readonly page: Page;
  readonly taskInput: Locator;
  readonly addButton: Locator;
  readonly tasks: Locator;

  constructor(page: Page) {
    this.page = page;
    ////this.taskInput = page.locator('[data-testid="task-input"]');
    this.taskInput = page.locator('input.input[placeholder="Enter task title"]');
    ////this.addButton = page.locator('[data-testid="add-task"]');
    this.addButton = page.locator('button.add-button');
    this.tasks = page.locator('li.task-item');
    ////this.tasks = page.locator('[data-testid="task-item"]');
  }

  async goto() {
    await this.page.goto('http://localhost:3000');
  }

  async addTask(taskName: string) {
    await this.taskInput.fill(taskName);
    await this.addButton.click();
  }

  async deleteTask(taskName: string) {
    const task = this.page.locator(`text=${taskName}`);
    ////const deleteButton = task.locator('..').locator('[data-testid="delete-task"]');
    const deleteButton = task.locator('..').locator('button.delete-button');
    await deleteButton.click();
  }

  async editTask(oldName: string, newName: string) {
    const task = this.page.locator(`text=${oldName}`);
    ////const editButton = task.locator('..').locator('[data-testid="edit-task"]');
    const editButton = task.locator('..').locator('.task-text');

    await editButton.click();

    //const editInput = this.page.locator('[data-testid="edit-input"]');
    const editInput = this.page.locator('input.input[placeholder="Enter task title"]');
    await editInput.fill(newName);

    //const saveButton = this.page.locator('[data-testid="save-task"]');
    const saveButton = this.page.locator('button.add-button');
    await saveButton.click();
  }

  getTaskLocator(taskName: string) {
    return this.page.locator(`text=${taskName}`);
  }

  getTaskCount() {
    return this.tasks;
  }
}