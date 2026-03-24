import { test, expect } from '../fixtures/taskFixture';

test.describe('Task CRUD Tests', () => {

  test('should create a task', async ({ taskPage, taskName }) => {

    await test.step('Create new task', async () => {
      await taskPage.addTask(taskName);
    });

    await test.step('Verify task is visible', async () => {
      await expect(
        taskPage.getTaskLocator(taskName),
        'Task should appear in the task list after creation'
      ).toBeVisible();
    });

  });


  test('should edit a task', async ({ taskPage, taskName }) => {

    const updatedTask = `${taskName} Updated`;

    await test.step('Create task before editing', async () => {
      await taskPage.addTask(taskName);
    });

    await test.step('Edit the task', async () => {
      await taskPage.editTask(taskName, updatedTask);
    });

    await test.step('Verify updated task appears', async () => {
      await expect(
        taskPage.getTaskLocator(updatedTask),
        'Updated task name should be visible'
      ).toBeVisible();
    });

  });


  test('should delete a task', async ({ taskPage, taskName }) => {

    await test.step('Create task before deletion', async () => {
      await taskPage.addTask(taskName);
    });

    await test.step('Delete the task', async () => {
      await taskPage.deleteTask(taskName);
    });

    await test.step('Verify task is removed', async () => {
      await expect(
        taskPage.getTaskLocator(taskName),
        'Task should not exist after deletion'
      ).toHaveCount(0);
    });

  });


//   test('should display task count', async ({ taskPage, taskName }) => {

//   await test.step('Create task', async () => {
//     await taskPage.addTask(taskName);
//   });

//   await test.step('Verify task count is greater than zero', async () => {
//     const tasks = taskPage.getTaskCount();
//     await expect(tasks, 'Task list should contain at least one task').not.toHaveCount(0);
//   });

// });
test('should display task count', async ({ taskPage, taskName }) => {

    await test.step('Create task', async () => {
      await taskPage.addTask(taskName);
    });

    await test.step('Verify task count is greater than zero', async () => {
      await expect(
        taskPage.getTaskCount(),
        'Task list should contain at least one task'
      ).not.toHaveCount(0);
    });

  });

});