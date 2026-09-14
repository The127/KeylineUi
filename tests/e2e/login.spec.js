import {expect, test} from '@playwright/test'
import {collectErrors, signIn} from './helpers.js'

test('an admin signs in through Keyline and reaches the dashboard', async ({page}) => {
    await signIn(page)
    await expect(page).toHaveURL(/\/mgmt\/keyline$/)

    const errors = collectErrors(page)
    await page.reload()

    await expect(page.getByRole('heading', {name: 'Dashboard'})).toBeVisible()
    expect(errors).toEqual([])
})
