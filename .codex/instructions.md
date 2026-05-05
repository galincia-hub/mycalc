# Project Instructions

## Scope

These rules apply to all work in this calculator project.

## Calculator Page Rules

1. Use `tax/general-income/index.html` as the reference implementation for every new calculator page.
2. Preserve the existing `index.html` design system:
   - Bootstrap
   - Pretendard
   - Navy/blue brand colors
3. Structure each calculator page in this order:
   - Input form
   - Calculation logic in JavaScript
   - Result display
   - SEO metadata
4. Do not use inline CSS. Use `shared/common.css` when it exists.
5. Add comments to every calculation formula that explain the source or basis for the formula.
6. Use Korean UI text.
7. Format Korean won values with `₩` and thousand separators.
8. Build mobile-first responsive layouts.
9. After completing a calculator, update the matching card in the home `index.html` from `coming` to `active`.
10. For a new calculator page, copy the top navigation and sub-navigation from the existing `index.html` in that domain. Do not invent menu items that do not already exist.
11. Before creating a new page, read the domain folder's `index.html` first and only build pages that match the registered card list and structure there.
12. If any part is uncertain, do not invent it. Leave a `TODO` comment instead.
