/**
 * E2E Tests: Food Browsing Functionality
 *
 * Tests for User Story 1: Browse Street Food Information
 * Validates home page, food card navigation, and detail page display.
 */

import { test, expect } from '@playwright/test';

test.describe('Home Page - Random Food Display', () => {
  test('T040: should display 6 random food items on home page', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');

    // Wait for food grid to be visible
    await page.waitForSelector('.food-grid', { timeout: 5000 });

    // Verify hero section is displayed
    const heroSection = page.locator('.hero');
    await expect(heroSection).toBeVisible();
    await expect(heroSection.locator('.hero-title')).toContainText('Ẩm thực đường phố Việt Nam');

    // Count food cards in grid
    const foodCards = page.locator('.food-card');
    const cardCount = await foodCards.count();

    // Currently we have 5 food items, so we should see exactly 5 cards
    // (The selectSixRandom function will return all 5 when there are fewer than 6)
    expect(cardCount).toBeGreaterThanOrEqual(5);
    expect(cardCount).toBeLessThanOrEqual(6);

    // Verify each food card has required elements
    for (let i = 0; i < cardCount; i++) {
      const card = foodCards.nth(i);

      // Check card has image
      const image = card.locator('.card-image');
      await expect(image).toBeVisible();

      // Check card has title
      const title = card.locator('.card-title');
      await expect(title).toBeVisible();
      await expect(title).not.toBeEmpty();

      // Check card has description
      const description = card.locator('.card-description');
      await expect(description).toBeVisible();
      await expect(description).not.toBeEmpty();

      // Check card has category badge
      const categoryBadge = card.locator('.category-badge');
      await expect(categoryBadge).toBeVisible();
    }

    // Verify "Làm mới danh sách" button exists
    const refreshButton = page.locator('.cta-button');
    await expect(refreshButton).toBeVisible();
    await expect(refreshButton).toContainText('Làm mới danh sách');
  });

  test('should reload page when clicking refresh button', async ({ page }) => {
    await page.goto('/');

    // Wait for initial food grid
    await page.waitForSelector('.food-grid');

    // Get initial food items (for potential comparison in future)
    const _initialCards = await page.locator('.food-card .card-title').allTextContents();

    // Click refresh button
    await page.click('.cta-button');

    // Wait for page to reload
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.food-grid');

    // Get new food items (they may be same due to small dataset)
    const newCards = await page.locator('.food-card .card-title').allTextContents();

    // At minimum, cards should still be displayed
    expect(newCards.length).toBeGreaterThanOrEqual(5);
  });
});

test.describe('Food Card Navigation', () => {
  test('T041: should navigate to detail page when clicking food card', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    await page.waitForSelector('.food-grid');

    // Get the first food card
    const firstCard = page.locator('.food-card').first();
    await expect(firstCard).toBeVisible();

    // Get the food name from the card
    const foodName = await firstCard.locator('.card-title').textContent();
    expect(foodName).toBeTruthy();

    // Click on the card link
    await firstCard.locator('.card-link').click();

    // Wait for navigation
    await page.waitForLoadState('networkidle');

    // Verify we're on a detail page (URL should not be '/')
    const url = page.url();
    expect(url).not.toContain('index.html');
    expect(url).not.toMatch(/\/$/);

    // Verify detail page loads with the food name in title
    const detailTitle = page.locator('.food-title');
    await expect(detailTitle).toBeVisible();
    await expect(detailTitle).toContainText(foodName!);
  });

  test('should navigate back to home page from detail page', async ({ page }) => {
    // Navigate to a specific food detail page
    await page.goto('/banh-mi');

    // Wait for detail page to load
    await page.waitForSelector('.food-detail');

    // Click the "Quay lại trang chủ" button
    const backButton = page.locator('.back-button');
    await expect(backButton).toBeVisible();
    await backButton.click();

    // Wait for navigation
    await page.waitForLoadState('networkidle');

    // Verify we're back on home page
    expect(page.url()).toMatch(/\/(index\.html)?$/);
    await expect(page.locator('.hero-title')).toBeVisible();
    await expect(page.locator('.food-grid')).toBeVisible();
  });
});

test.describe('Food Detail Page', () => {
  test('T042: should display complete food information on detail page', async ({ page }) => {
    // Navigate to bánh mì detail page
    await page.goto('/banh-mi');
    await page.waitForLoadState('networkidle');

    // Verify breadcrumb navigation
    const breadcrumb = page.locator('.breadcrumb');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toContainText('Trang chủ');
    await expect(breadcrumb).toContainText('Bánh mì');

    // Verify hero section with food image
    const heroImage = page.locator('.hero-image');
    await expect(heroImage).toBeVisible();

    // Verify category badge
    const categoryBadge = page.locator('.category-badge');
    await expect(categoryBadge).toBeVisible();

    // Verify food title
    const foodTitle = page.locator('.food-title');
    await expect(foodTitle).toBeVisible();
    await expect(foodTitle).toContainText('Bánh mì');

    // Verify food description
    const foodDescription = page.locator('.food-description');
    await expect(foodDescription).toBeVisible();
    await expect(foodDescription).not.toBeEmpty();

    // Verify metadata is displayed
    const metadata = page.locator('.food-metadata');
    await expect(metadata).toBeVisible();

    // Check for metadata items (category, consumption method, eating time, province)
    const metadataItems = page.locator('.metadata-item');
    const metadataCount = await metadataItems.count();
    expect(metadataCount).toBeGreaterThanOrEqual(4);

    // Verify ingredients section
    const ingredientsCard = page.locator('.info-card').filter({ hasText: 'Nguyên liệu chính' });
    await expect(ingredientsCard).toBeVisible();

    const ingredientsList = ingredientsCard.locator('.ingredients-list li');
    const ingredientsCount = await ingredientsList.count();
    expect(ingredientsCount).toBeGreaterThan(0);

    // Verify cooking method section
    const cookingMethodCard = page
      .locator('.info-card')
      .filter({ hasText: 'Phương pháp chế biến' });
    await expect(cookingMethodCard).toBeVisible();

    const cookingMethod = cookingMethodCard.locator('.cooking-method');
    await expect(cookingMethod).toBeVisible();
    await expect(cookingMethod).not.toBeEmpty();

    // Verify cultural history section (if available)
    const culturalHistoryCard = page.locator('.info-card').filter({ hasText: 'Lịch sử văn hóa' });
    if ((await culturalHistoryCard.count()) > 0) {
      await expect(culturalHistoryCard).toBeVisible();

      const culturalHistory = culturalHistoryCard.locator('.cultural-history');
      await expect(culturalHistory).toBeVisible();
      await expect(culturalHistory).not.toBeEmpty();
    }

    // Verify back button
    const backButton = page.locator('.back-button');
    await expect(backButton).toBeVisible();
    await expect(backButton).toContainText('Quay lại trang chủ');
  });

  test('should display different content for different foods', async ({ page }) => {
    // Navigate to phở detail page
    await page.goto('/pho');
    await page.waitForLoadState('networkidle');

    const phoTitle = await page.locator('.food-title').textContent();
    const phoDescription = await page.locator('.food-description').textContent();

    // Navigate to bún chả detail page
    await page.goto('/bun-cha');
    await page.waitForLoadState('networkidle');

    const bunChaTitle = await page.locator('.food-title').textContent();
    const bunChaDescription = await page.locator('.food-description').textContent();

    // Verify titles are different
    expect(phoTitle).not.toBe(bunChaTitle);
    expect(phoDescription).not.toBe(bunChaDescription);
  });
});

test.describe('404 Error Page', () => {
  test('should display 404 page for non-existent routes', async ({ page }) => {
    // Navigate to non-existent page
    await page.goto('/non-existent-food');

    // Verify 404 page elements
    const errorTitle = page.locator('.error-title');
    await expect(errorTitle).toBeVisible();
    await expect(errorTitle).toContainText('404');

    const errorDescription = page.locator('.error-description');
    await expect(errorDescription).toBeVisible();

    // Verify "Quay lại trang chủ" button
    const homeButton = page.locator('.primary-button');
    await expect(homeButton).toBeVisible();
    await expect(homeButton).toContainText('Quay lại trang chủ');

    // Verify food suggestions are displayed
    const suggestionsGrid = page.locator('.suggestions-grid');
    if ((await suggestionsGrid.count()) > 0) {
      await expect(suggestionsGrid).toBeVisible();

      const suggestionCards = suggestionsGrid.locator('.suggestion-card');
      const suggestionsCount = await suggestionCards.count();
      expect(suggestionsCount).toBeGreaterThan(0);
      expect(suggestionsCount).toBeLessThanOrEqual(3);
    }
  });

  test('should navigate back to home page from 404', async ({ page }) => {
    await page.goto('/non-existent-food');

    // Click "Quay lại trang chủ" button
    await page.click('.primary-button');

    // Wait for navigation
    await page.waitForLoadState('networkidle');

    // Verify we're on home page
    expect(page.url()).toMatch(/\/(index\.html)?$/);
    await expect(page.locator('.hero-title')).toBeVisible();
  });
});
