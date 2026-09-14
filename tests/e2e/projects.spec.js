import {expect, test} from '@playwright/test'
import {collectErrors, signIn} from './helpers.js'

test('an admin creates a project and a public application in it', async ({page}) => {
    const suffix = Date.now().toString(36)
    const projectSlug = `e2e-project-${suffix}`
    const appName = `e2e-app-${suffix}`
    const redirectUri = 'https://e2e.example.com/callback'

    await signIn(page)
    const errors = collectErrors(page)

    await page.getByRole('link', {name: 'Projects', exact: true}).click()
    await expect(page).toHaveURL(/\/mgmt\/keyline\/projects$/)

    await page.getByRole('button', {name: 'Add', exact: true}).click()
    const projectDialog = page.getByRole('dialog')
    await projectDialog.getByLabel(/^Name/).fill('E2E Project')
    await projectDialog.getByLabel('Slug').fill(projectSlug)
    await projectDialog.getByRole('button', {name: 'Create project'}).click()
    await expect(projectDialog).toBeHidden()

    await page.getByRole('cell', {name: projectSlug, exact: true}).click()
    await expect(page).toHaveURL(new RegExp(`/projects/${projectSlug}$`))
    await expect(page.getByRole('heading', {name: 'E2E Project'})).toBeVisible()

    await page.getByRole('heading', {name: 'Applications', exact: true}).click()
    await expect(page).toHaveURL(new RegExp(`/projects/${projectSlug}/applications$`))

    await page.getByRole('button', {name: 'Add', exact: true}).click()
    const appDialog = page.getByRole('dialog')
    await appDialog.getByLabel(/^Name/).fill(appName)
    await appDialog.getByLabel('Display Name').fill('E2E App')
    await appDialog.getByLabel('Redirect URI').fill(redirectUri)
    await appDialog.getByLabel('Redirect URI').press('Enter')
    await expect(appDialog.getByText(redirectUri)).toBeVisible()
    await appDialog.getByRole('button', {name: 'Create application'}).click()
    await expect(appDialog).toBeHidden()

    await page.getByRole('cell', {name: appName, exact: true}).click()
    await expect(page.getByRole('heading', {name: appName})).toBeVisible()
    await expect(page.getByText('Public', {exact: true})).toBeVisible()
    await expect(page.getByText(redirectUri)).toBeVisible()

    expect(errors).toEqual([])
})
