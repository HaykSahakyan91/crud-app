// import { test, expect } from '@playwright/test';

// const baseUrl = 'http://localhost:3000';

// test.describe('CRUD App UI Tests', () => {
//   test('should load the app and display task list (even if empty)', async ({ page }) => {
//     await page.goto(baseUrl, { timeout: 60000 });
//     const tasks = page.locator('li.task-item');
//     const count = await tasks.count();
//     expect(count).toBeGreaterThanOrEqual(0);
//   });

//   test('should add a new task', async ({ page }) => {
//     await page.goto(baseUrl, { timeout: 60000 });
//     const newTask = `Playwright Add Test ${Date.now()}`;
//     await page.fill('input.input[placeholder="Enter task title"]', newTask);
//     await page.click('button.add-button');
//     const newTaskItem = page.locator('li.task-item').filter({ hasText: newTask });
//     await expect(newTaskItem).toHaveCount(1, { timeout: 15000 });
//   });
// });
import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:3000';

test.describe('CRUD App UI Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl, { timeout: 60000 });
  });

  test('should load the app and display task list (even if empty)', async ({ page }) => {
    const tasks = page.locator('li.task-item');
    const count = await tasks.count();

    expect(count).toBeGreaterThanOrEqual(0);
    console.log(`ℹ️ Task count: ${count}`);
  });

  test('should add a new task', async ({ page }) => {
    const newTask = `Playwright Add Test ${Date.now()}`;

    await page.fill('input.input[placeholder="Enter task title"]', newTask);
    await page.click('button.add-button');

    const newTaskItem = page
      .locator('li.task-item')
      .filter({ hasText: newTask });

    await expect(newTaskItem).toHaveCount(1, { timeout: 15000 });
  });

  test('should update a task status by clicking it', async ({ page }) => {
    const taskText = `Task for status update ${Date.now()}`;

    await page.fill('input.input[placeholder="Enter task title"]', taskText);
    await page.click('button.add-button');

    const task = page.locator('li.task-item').filter({ hasText: taskText });
    await expect(task).toBeVisible({ timeout: 15000 });

    const statusSpan = task.locator('span[class^="status-"]');
    await expect(statusSpan).toBeVisible();

    const statusBefore = await statusSpan.textContent();

    await task.locator('.task-text').click();

    await expect(async () => {
      const statusAfter = await statusSpan.textContent();
      expect(statusAfter).not.toBe(statusBefore);
    }).toPass();
  });

  test('should delete a task', async ({ page }) => {
    const taskText = `Task to be deleted ${Date.now()}`;

    await page.fill('input.input[placeholder="Enter task title"]', taskText);
    await page.click('button.add-button');

    const taskItem = page.locator('li.task-item').filter({ hasText: taskText });
    await expect(taskItem).toHaveCount(1, { timeout: 15000 });

    await taskItem.locator('button.delete-button').click();

    await expect(taskItem).toHaveCount(0, { timeout: 15000 });
  });

});
