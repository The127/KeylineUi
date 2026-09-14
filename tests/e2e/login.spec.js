import {expect, test} from '@playwright/test'

test('an admin signs in through Keyline and reaches the dashboard', async ({page}) => {
    await page.goto('/mgmt/keyline')

    await page.getByLabel('Username').fill('admin')
    await page.getByLabel('Password').fill('e2e-admin-password')
    await page.getByRole('button', {name: 'Sign In', exact: true}).click()

    await expect(page).toHaveURL(/\/mgmt\/keyline$/)
    await expect(page.getByRole('heading', {name: 'Dashboard'})).toBeVisible()

    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => {
        if (message.type() === 'error') {
            errors.push(message.text())
        }
    })

    await page.reload()

    await expect(page.getByRole('heading', {name: 'Dashboard'})).toBeVisible()
    expect(errors).toEqual([])
})
