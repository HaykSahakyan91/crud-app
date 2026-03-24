import { test as base } from '@playwright/test';
import { TaskListPage } from '../pages/TaskListPage';

type TaskFixture = {
  taskPage: TaskListPage;
  taskName: string;
};

export const test = base.extend<TaskFixture>({

  taskPage: async ({ page }, use) => {
    const taskPage = new TaskListPage(page);
    await taskPage.goto();
    await use(taskPage);
  },

  taskName: async ({}, use) => {
    const name = `Task ${Date.now()}`;
    await use(name);
  }

});

export { expect } from '@playwright/test';