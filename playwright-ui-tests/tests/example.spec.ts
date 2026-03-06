// playwright-ui-tests/tests/example.spec.ts
import { test, expect } from '@playwright/test';
import { TaskListPage } from '../pages/TaskListPage';

test.describe('CRUD App UI Tests with POM', () => {

  test('should load the app and display task list (even if empty)', async ({ page }) => {
    const taskPage = new TaskListPage(page);
    await taskPage.goto();
    const count = await taskPage.taskListItems.count();
    expect(count).toBeGreaterThanOrEqual(0);
    console.log(`:information_source: Task count: ${count}`);
  });

  test('should add a new task', async ({ page }) => {
    const taskPage = new TaskListPage(page);
    await taskPage.goto();
    const newTask = `POM Task ${Date.now()}`;
    await taskPage.addTask(newTask);

    const taskItem = await taskPage.getTask(newTask);
    await expect(taskItem).toHaveCount(1, { timeout: 15000 });
  });

  test('should update a task status by clicking it', async ({ page }) => {
    const taskPage = new TaskListPage(page);
    await taskPage.goto();
    const taskText = `Status Task ${Date.now()}`;
    await taskPage.addTask(taskText);

    const taskItem = await taskPage.getTask(taskText);
    await expect(taskItem).toBeVisible({ timeout: 15000 });

    const statusBefore = await taskItem.locator('span[class^="status-"]').textContent();
    await taskPage.toggleTaskStatus(taskText);

    await expect(async () => {
      const statusAfter = await taskItem.locator('span[class^="status-"]').textContent();
      expect(statusAfter).not.toBe(statusBefore);
    }).toPass();
  });

  test('should delete a task', async ({ page }) => {
    const taskPage = new TaskListPage(page);
    await taskPage.goto();
    const taskText = `Task to delete ${Date.now()}`;
    await taskPage.addTask(taskText);

    const taskItem = await taskPage.getTask(taskText);
    await expect(taskItem).toHaveCount(1, { timeout: 15000 });

    await taskPage.deleteTask(taskText);
    await expect(taskItem).toHaveCount(0, { timeout: 15000 });
  });

});