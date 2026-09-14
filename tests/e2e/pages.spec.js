import {expect, test} from '@playwright/test'
import {collectErrors, signIn, trackRequests} from './helpers.js'

let errors
let requestsDone

test.beforeEach(async ({page}) => {
    await signIn(page)
    errors = collectErrors(page)
    requestsDone = trackRequests(page)
})

test.afterEach(async () => {
    await requestsDone()
    expect(errors).toEqual([])
})

async function openTabs(page, names) {
    for (const name of names) {
        const tab = page.getByRole('tab', {name, exact: true})
        await tab.click()
        await expect(tab).toHaveAttribute('aria-selected', 'true')
        await requestsDone()
    }
}

test('the top level pages load', async ({page}) => {
    for (const [path, heading] of [
        ['/mgmt/keyline/admin', 'Administration'],
        ['/mgmt/keyline/projects', 'Projects'],
        ['/mgmt/keyline/groups', 'Groups'],
        ['/mgmt/keyline/users', 'Users'],
        ['/mgmt/keyline/profile', 'Profile'],
    ]) {
        await page.goto(path)
        await expect(page.getByRole('heading', {name: heading, exact: true}).first()).toBeVisible()
        await requestsDone()
    }
})

test('the administration tabs and a template load', async ({page}) => {
    await page.goto('/mgmt/keyline/admin')
    await openTabs(page, ['General', 'Email', 'Security', 'Templates', 'Audit'])

    await page.getByRole('tab', {name: 'Templates', exact: true}).click()
    await page.getByRole('heading', {name: 'Email Verification'}).click()
    await expect(page).toHaveURL(/\/admin\/templates\/email_verification$/)
    await expect(page.getByRole('heading', {name: 'Email Verification'})).toBeVisible()
})

test('the profile tabs load', async ({page}) => {
    await page.goto('/mgmt/keyline/profile')
    await openTabs(page, ['General', 'Security'])
})

test('the admin user details load', async ({page}) => {
    await page.goto('/mgmt/keyline/users')
    await page.getByRole('cell', {name: 'admin', exact: true}).click()
    await expect(page.getByRole('heading', {name: 'User details'})).toBeVisible()
    await openTabs(page, ['General', 'Security'])
})

test('the system project pages load', async ({page}) => {
    await page.goto('/mgmt/keyline/projects/system')
    await expect(page.getByRole('heading', {name: 'System Project'})).toBeVisible()

    await page.goto('/mgmt/keyline/projects/system/applications')
    await page.getByRole('cell', {name: 'admin-ui', exact: true}).click()
    await expect(page.getByRole('heading', {name: 'admin-ui', exact: true})).toBeVisible()
    await openTabs(page, ['General', 'Claims Mapping'])

    await page.goto('/mgmt/keyline/projects/system/roles')
    await page.getByRole('cell', {name: 'admin', exact: true}).click()
    await expect(page.getByRole('heading', {name: 'admin', exact: true})).toBeVisible()
    await openTabs(page, ['Information', 'Users'])

    await page.goto('/mgmt/keyline/projects/system/resource-servers')
    await expect(page.getByRole('heading', {name: 'Resource Servers', exact: true}).first()).toBeVisible()
})
