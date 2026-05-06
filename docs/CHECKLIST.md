# 신규 계산기 제작 체크리스트

> 새 계산기를 만들 때 반드시 아래 10개 항목을 같이 처리할 것.

## 체크리스트

```
□ 1. 계산기 페이지 제작
   - docs/DESIGN_RULES.md 준수
   - UTF-8, <meta charset="UTF-8">
   - 1단 네비 + 2단 네비 + 히어로 + 계산기 본문 + 푸터

□ 2. 서브인덱스 업데이트 (/[domain]/index.html)
   - 해당 카드: 준비중 → 완성 배지 + 링크 활성화
   - 완성 배지 숫자 +1

□ 3. 메인인덱스 업데이트 (/index.html)
   - 해당 도메인 섹션의 카드: 준비중 → 완성
   - 도메인 배지 숫자 업데이트
   - 전체 완성 카운터 업데이트

□ 4. 2단 네비 동기화
   - 같은 도메인 내 모든 완성 페이지의 2단 네비에서
     신규 페이지를 활성 링크(흰색+초록점)로 추가

□ 5. 카운터 삽입
   - </body> 직전에 아래 Supabase 스크립트 삽입
   - 이미 있으면 건너뜀

□ 6. SEO 메타태그 삽입 (<head> 안에)
   - <meta name="robots" content="index, follow">
   - <link rel="canonical" href="https://mycalc.co.kr{경로}">
   - <meta property="og:title" content="{제목}">
   - <meta property="og:description" content="{설명}">
   - <meta property="og:url" content="https://mycalc.co.kr{경로}">
   - <meta property="og:type" content="website">
   - <meta property="og:site_name" content="마이캘크">

□ 7. Schema.org 구조화 데이터
   - WebApplication JSON-LD 삽입

□ 8. sitemap.xml에 URL 추가

□ 9. admin.html 사이트맵 매핑에 이름·설명 추가
   - 준비중 → 완성으로 변경

□ 10. git push (작업 모아서 한번에)
   - 빌드 크레딧 절약을 위해 소규모 수정마다 push하지 말 것
```

---

## Supabase 카운터 정보

- URL: https://wblffwhxaqxtqjccmwig.supabase.co
- Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndibGZmd2h4YXF4dHFqY2Ntd2lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4OTQzMDcsImV4cCI6MjA5MzQ3MDMwN30.9uGXG1zw3bF5ojMcfQnPr8zsirn3WejIjK60XOZfAcg
- 테이블: mycalc_page_views
- 컬럼: id, page_path, page_title, subdomain, referrer, ref_type, user_agent, created_at
- 카운터 원본: /counter.html
- ref_type 분류: google, naver, daum, bing, twitter, facebook, instagram, youtube, perplexity, chatgpt, direct, other
- 봇 필터링: user_agent에 bot/crawler/spider 포함 시 INSERT 안 함

---

## 관리자 대시보드

- URL: https://mycalc.co.kr/admin.html
- 탭: 전체현황 | 인기페이지 | 유입경로 | 실시간 | 사이트맵
- 바로가기: GSC, Netlify, Supabase, 모아가이드

---

## docs/STATUS.md 업데이트 규칙

새 계산기 완성 시 docs/STATUS.md도 같이 업데이트:
- 해당 항목 ⬜ → ✅ 변경
- 도메인 완성 숫자 변경
- 업데이트 날짜 변경
