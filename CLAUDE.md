# mycalc.co.kr — Claude Code / Codex 작업 가이드

> 생활 밀착형 계산기 포털. 8개 도메인, 39개 완성, 50+ 준비중.
> 배포: GitHub(galincia-hub/mycalc) → Netlify → mycalc.co.kr

## 기술스택
정적 HTML + Bootstrap 5 + Pretendard + 클라이언트 JS. 서버 없음. UTF-8 필수.

## 디자인 핵심 (상세 → docs/DESIGN_RULES.md)
- 1단 네비: 로고 좌측, 메뉴 우측, 배경 #0f172a, sticky
- 2단 네비: 도메인 고유 어두운 톤, 완성=흰색+초록점, 준비중=회색
- 히어로: 200px, gradient+도트패턴, 배지 pills
- 카드: 흰색, 12px radius, 3열, 완성=초록배지, 준비중=주황배지
- tools/index.html이 전체 레퍼런스. 새 페이지는 이 스타일 따를 것

## 신규 계산기 제작 시 필수 (상세 → docs/CHECKLIST.md)
1. 계산기 페이지 제작 (디자인 규칙 준수)
2. 서브인덱스 카드 업데이트 (준비중→완성, 배지 숫자)
3. 메인인덱스 카드 업데이트 (준비중→완성, 배지 숫자)
4. 2단 네비 동기화 (같은 도메인 내 완성 페이지들)
5. 카운터 삽입 (</body> 직전, counter.html 참조)
6. SEO 메타태그 (canonical, og:title, og:description)
7. Schema.org JSON-LD
8. sitemap.xml URL 추가
9. admin.html 사이트맵 매핑 추가
10. git push는 작업 모아서 한번에 (빌드 크레딧 절약)

## 절대 하지 말 것
- 서브인덱스에 raw bullet list 넣기 (과거 깨짐 발생)
- 메인인덱스 업데이트 안 하고 서브만 수정
- 인코딩 UTF-8 아닌 파일 생성
- 기존 계산기 JS 로직 임의 수정

## 참조 파일
- docs/DESIGN_RULES.md — 색상, 네비, 카드, 히어로 상세 규격
- docs/STATUS.md — 도메인별 완성/준비중 현황
- docs/CHECKLIST.md — 신규 제작 체크리스트 + Supabase 정보
- docs/mycalc-blog-keyword-map.md — 블로그 키워드 매핑
