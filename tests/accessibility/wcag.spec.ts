/**
 * Accessibility Tests: WCAG 2.1 AA Compliance
 *
 * Tests for Constitution Principle III: Accessibility & Inclusivity (NON-NEGOTIABLE).
 * Validates WCAG 2.1 Level AA compliance using @axe-core/playwright.
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Home Page Accessibility', () => {
  test('T043: should not have any automatically detectable WCAG 2.1 AA violations', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Run axe accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Assert no violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper document structure', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toHaveCount(1); // Only one h1 per page

    // Check for skip link
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeVisible();

    // Focus on skip link (should be visible when focused)
    await skipLink.focus();
    await expect(skipLink).toBeVisible();
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Run axe with specific contrast rules
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('.hero')
      .include('.food-grid')
      .analyze();

    // Check for color contrast violations
    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });

  test('should have proper alt text for images', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.food-grid');

    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();

    // Verify each image has alt text
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');

      // Alt attribute should exist and not be empty
      expect(alt).toBeTruthy();
      expect(alt!.length).toBeGreaterThan(0);
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.food-grid');

    // Test Tab navigation through interactive elements
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // First nav link

    // Verify focus is visible
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();

    // Test Enter key on food card
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Focus should be on a food card link
    const focusedLink = await page.evaluate(
      () => document.activeElement?.closest('.food-card') !== null
    );
    expect(focusedLink).toBeTruthy();
  });
});

test.describe('Food Detail Page Accessibility', () => {
  test('should not have any WCAG 2.1 AA violations on detail page', async ({ page }) => {
    await page.goto('/banh-mi');
    await page.waitForLoadState('networkidle');

    // Run axe accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Assert no violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper landmark regions', async ({ page }) => {
    await page.goto('/banh-mi');

    // Check for main landmark
    const main = page.locator('main');
    await expect(main).toBeVisible();
    await expect(main).toHaveAttribute('id', 'main-content');

    // Check for navigation
    const nav = page.locator('nav.breadcrumb');
    await expect(nav).toBeVisible();
  });

  test('should have proper ARIA labels for breadcrumb', async ({ page }) => {
    await page.goto('/banh-mi');

    const breadcrumb = page.locator('.breadcrumb');
    await expect(breadcrumb).toHaveAttribute('aria-label', 'Breadcrumb');

    // Verify current page is indicated
    const currentPage = breadcrumb.locator('[aria-current="page"]');
    await expect(currentPage).toBeVisible();
  });

  test('should have accessible metadata', async ({ page }) => {
    await page.goto('/banh-mi');

    // Metadata should use definition list (dl, dt, dd)
    const metadataList = page.locator('.food-metadata');
    await expect(metadataList).toBeVisible();

    const metadataItems = metadataList.locator('.metadata-item');
    const count = await metadataItems.count();

    expect(count).toBeGreaterThan(0);

    // Each item should have dt (term) and dd (definition)
    for (let i = 0; i < count; i++) {
      const item = metadataItems.nth(i);
      const term = item.locator('dt');
      const definition = item.locator('dd');

      await expect(term).toBeVisible();
      await expect(definition).toBeVisible();
    }
  });

  test('should have accessible list of ingredients', async ({ page }) => {
    await page.goto('/banh-mi');

    // Ingredients should be in a proper list
    const ingredientsList = page.locator('.ingredients-list');
    await expect(ingredientsList).toBeVisible();

    const listItems = ingredientsList.locator('li');
    const itemCount = await listItems.count();

    expect(itemCount).toBeGreaterThan(0);
  });
});

test.describe('404 Error Page Accessibility', () => {
  test('should not have any WCAG 2.1 AA violations on 404 page', async ({ page }) => {
    await page.goto('/non-existent-page');
    await page.waitForLoadState('networkidle');

    // Run axe accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Assert no violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper error message structure', async ({ page }) => {
    await page.goto('/non-existent-page');

    // Error message should be in h1
    const errorTitle = page.locator('.error-title');
    await expect(errorTitle).toBeVisible();

    const tagName = await errorTitle.evaluate((el) => el.tagName);
    expect(tagName).toBe('H1');
  });

  test('should have accessible suggestion cards', async ({ page }) => {
    await page.goto('/non-existent-page');

    const suggestions = page.locator('.suggestion-card');
    const suggestionCount = await suggestions.count();

    if (suggestionCount > 0) {
      // Each suggestion should be a link with proper text
      for (let i = 0; i < suggestionCount; i++) {
        const suggestion = suggestions.nth(i);

        // Should have href attribute
        const href = await suggestion.getAttribute('href');
        expect(href).toBeTruthy();

        // Should have visible title
        const title = suggestion.locator('.suggestion-title');
        await expect(title).toBeVisible();
        await expect(title).not.toBeEmpty();

        // Should have image with alt text
        const image = suggestion.locator('.suggestion-image');
        await expect(image).toBeVisible();

        const alt = await image.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    }
  });
});

test.describe('Touch Target Sizes (Mobile Accessibility)', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test('should have minimum 44×44px touch targets on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.food-grid');

    // Check food card links
    const foodCardLinks = page.locator('.food-card .card-link');
    const linkCount = await foodCardLinks.count();

    for (let i = 0; i < linkCount; i++) {
      const link = foodCardLinks.nth(i);
      const boundingBox = await link.boundingBox();

      if (boundingBox) {
        // Constitution Principle IX: 44×44px minimum (iOS)
        expect(boundingBox.width).toBeGreaterThanOrEqual(44);
        expect(boundingBox.height).toBeGreaterThanOrEqual(44);
      }
    }

    // Check CTA button
    const ctaButton = page.locator('.cta-button');
    const buttonBox = await ctaButton.boundingBox();

    if (buttonBox) {
      expect(buttonBox.width).toBeGreaterThanOrEqual(44);
      expect(buttonBox.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('should have accessible navigation on mobile', async ({ page }) => {
    await page.goto('/');

    // Check header navigation
    const headerLinks = page.locator('.header-nav a');
    const navLinkCount = await headerLinks.count();

    for (let i = 0; i < navLinkCount; i++) {
      const link = headerLinks.nth(i);
      const boundingBox = await link.boundingBox();

      if (boundingBox) {
        expect(boundingBox.width).toBeGreaterThanOrEqual(44);
        expect(boundingBox.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});

test.describe('Focus Indicators', () => {
  test('should show visible focus indicators', async ({ page }) => {
    await page.goto('/');

    // Tab to first interactive element
    await page.keyboard.press('Tab');

    // Get focused element
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Check if element has outline (focus indicator)
    const outline = await focusedElement.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.outline || styles.outlineWidth;
    });

    expect(outline).toBeTruthy();
    expect(outline).not.toBe('none');
    expect(outline).not.toBe('0px');
  });
});
