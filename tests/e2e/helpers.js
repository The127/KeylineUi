import {expect} from '@playwright/test'

export async function signIn(page) {
    await page.goto('/mgmt/keyline')

    await page.getByLabel('Username').fill('admin')
    await page.getByLabel('Password').fill('e2e-admin-password')
    await page.getByRole('button', {name: 'Sign In', exact: true}).click()

    await expect(page.getByRole('heading', {name: 'Dashboard'})).toBeVisible()
}

export function collectErrors(page) {
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => {
        if (message.type() === 'error') {
            errors.push(message.text())
        }
    })

    return errors
}

export function trackRequests(page) {
    let pending = 0
    page.on('request', () => pending++)
    page.on('requestfinished', () => pending--)
    page.on('requestfailed', () => pending--)

    return () => expect.poll(() => pending).toBe(0)
}
