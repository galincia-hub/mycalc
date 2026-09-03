const { test, expect } = require('@playwright/test');

test.describe('susi-confirm QA', () => {
  test('empty first load looks finished', async ({ page }) => {
    await page.goto('/student/susi-confirm/');
    await expect(page.locator('h1')).toHaveText('수시 6장, 오늘 확정하세요');
    const today = await page.evaluate(() => document.body.getAttribute('data-today'));
    const banner = page.locator('[data-qa="banner"]');
    if (today && today < '2026-09-07') {
      await expect(banner).toContainText('원서접수 D-');
      await expect(banner).toContainText('2026-09-07(월) 시작입니다');
    } else if (today === '2026-09-07') {
      await expect(banner).toContainText('오늘 원서접수 시작입니다');
    }
    // fixture clock note: empty-load uses the environment date (2026-09-03 → D-4)
    await expect(page.locator('[data-qa="pool-empty"]')).toBeVisible();
    await expect(page.locator('#step0')).toBeVisible();
    await expect(page.locator('#step1')).toBeVisible();
    await expect(page.locator('#step2')).toBeVisible();
    await expect(page.locator('#step3')).toBeVisible();
    await expect(page.locator('#step4')).toBeVisible();
    await expect(page.getByText('대학을 추천하지 않습니다')).toBeVisible();
    await expect(page.getByText('확인해 주세요')).toBeVisible();
    await expect(page.locator('[data-qa="pool"] .cand-card')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText('TODO');
    await expect(page.locator('body')).not.toContainText('lorem');
    await page.screenshot({ path: 'test-results/susi-confirm-empty.png', fullPage: true });
  });

  test('검수 예시 채우기 persona + persist + reset', async ({ page }) => {
    await page.goto('/student/susi-confirm/');
    await page.locator('[data-qa="btn-qa-fill"]').click();

    await expect(page.locator('body')).toHaveAttribute('data-frozen-date', '2026-09-07');
    await expect(page.locator('[data-qa="banner"]')).toContainText('오늘 원서접수 시작입니다');

    const pool = page.locator('#poolWarn');
    await expect(pool.locator('[data-warn="deadline-today"]')).toContainText('오늘 마감 카드 2장');
    await expect(pool.locator('[data-warn="min-unknown"]')).toContainText('최저 모름 카드가 1장');
    await expect(pool.locator('[data-warn="min-fail"]')).toContainText('최저 미충족으로 표시한 카드가 1장');
    await expect(pool.locator('[data-warn="exam-clash"]')).toContainText('대학별 고사가 2건 겹칩니다');
    await expect(pool.locator('[data-warn="exam-clash"]')).toContainText('대학H');
    await expect(pool.locator('[data-warn="exam-clash"]')).toContainText('대학I');

    await expect(page.locator('[data-qa="count-6"]')).toHaveAttribute('data-counted', '9');
    await expect(page.locator('[data-qa="card-10"]')).toHaveAttribute('data-excluded', '1');
    await expect(page.locator('[data-qa="card-10"]')).toContainText('6회 제외(본인 확인)');

    const table = page.locator('[data-qa="compare-table"]');
    await expect(table).toBeVisible();
    const text = await table.innerText();
    expect(text).toContain('라벨 구성');
    expect(text).toContain('전형 유형 구성');
    expect(text).toContain('최저 상태');
    expect(text).toContain('가장 빠른 마감');
    expect(text).toContain('고사일 충돌');
    expect(text).toContain('6회 산정');
    expect(text).toContain('상향 1 / 적정 3 / 안정 2');
    expect(text).toContain('상향 4 / 적정 1 / 안정 1');
    expect(text).toContain('교과 6');
    expect(text).toContain('교과 4');
    expect(text).toContain('논술 2');
    expect(text).not.toMatch(/유리|불리|확률|추천/);

    await page.screenshot({ path: 'test-results/susi-confirm-qa-filled.png', fullPage: true });

    await page.reload();
    await expect(page.locator('[data-qa="card-1"]')).toContainText('대학A');
    await expect(page.locator('[data-qa="compare-table"]')).toBeVisible();
    await expect(page.locator('[data-qa="count-6"]')).toHaveAttribute('data-counted', '9');
    await expect(page.locator('body')).toHaveAttribute('data-frozen-date', '2026-09-07');

    await page.locator('[data-qa="btn-reset"]').click();
    await expect(page.locator('[data-qa="pool-empty"]')).toBeVisible();
    await expect(page.locator('[data-qa="pool"] .cand-card')).toHaveCount(0);
    await expect(page.locator('[data-qa="count-6"]')).toHaveAttribute('data-counted', '0');
    await expect(page.locator('body')).not.toHaveAttribute('data-frozen-date');
    await expect(page.locator('[data-qa="banner"]')).toContainText('원서접수 D-4');
  });

  test('확정은 counted 6장만 가능', async ({ page }) => {
    await page.goto('/student/susi-confirm/');
    await page.locator('[data-qa="btn-qa-fill"]').click();

    // 가득 찬 조합 A에는 7번째를 담을 수 없음
    await expect(page.locator('[data-qa="card-5"] [data-add="A"]')).toBeDisabled();
    await expect(page.locator('[data-qa="card-5"] [data-add="A"]')).toHaveText('6장 한도');

    // 조합 A에서 1장 빼 → 5장: 확정 불가
    await page.locator('[data-qa="card-7"] [data-add="A"]').click();
    await expect(page.locator('[data-qa="confirm-a"]')).toBeDisabled();
    await expect(page.locator('[data-qa="confirm-gate"]')).toContainText('확정은 6회를 채운 조합만 가능합니다.');
    await page.locator('[data-qa="confirm-a"]').click({ force: true });
    await expect(page.locator('#confirmModal')).not.toBeVisible();
    await expect(page.getByText('6장이 확정되었습니다. 이제 접수만 남았습니다.')).toHaveCount(0);

    // 다시 6장(counted) → 확정 가능
    await page.locator('[data-qa="card-7"] [data-add="A"]').click();
    await expect(page.locator('[data-qa="confirm-a"]')).toBeEnabled();
    await page.locator('[data-qa="confirm-a"]').click();
    await expect(page.locator('#confirmModal')).toBeVisible();
    const redWrap = page.locator('#confirmRedWrap');
    if (await redWrap.isVisible()) {
      await page.locator('#ackRed').check();
    }
    await page.locator('#btnDoConfirm').click();
    await expect(page.getByText('6장이 확정되었습니다. 이제 접수만 남았습니다.').first()).toBeVisible();
    await expect(page.locator('[data-qa="count-6"]')).toHaveAttribute('data-counted', '6');
  });
});
