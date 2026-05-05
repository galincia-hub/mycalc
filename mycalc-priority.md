## mycalc.co.kr 전체 제작 우선순위

---

### 도메인 우선순위

```
①  tax.mycalc.co.kr        15개  ← 공식 확보 완료, 5월 시즌
②  work.mycalc.co.kr       12개  ← 로직 단순, 검색량 최대
③  tools.mycalc.co.kr      16개  ← 글로벌 확장, 쉬운 것 다수 (멀티가능 ②와)
④  realestate.mycalc.co.kr 14개  ← CPC 최고
⑤  money.mycalc.co.kr      14개  ← CPC 높음 (멀티가능 ④와)
⑥  student.mycalc.co.kr    14개  ← 9월 수능 데드라인
⑦  parent.mycalc.co.kr     14개  ← student 시너지
⑧  life.mycalc.co.kr       13개  ← 10월 블프 관부가세
⑨  cruise.co.kr             3개  ← 본업 통합
```

---

### ① tax.mycalc.co.kr

```
순서  경로               모듈ID    상태         공유처              비고
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1   /general-income    TAX-01   ✅준비완료    —                  6개 서브페이지 포함
 2   /freelancer        TAX-05   미제작       →work              5월 시즌 긴급
 3   /vat               TAX-06   미제작       —                  2~3시간
 4   /day-laborer       TAX-07   미제작       →work              로직 단순
 5   /earned-income     TAX-02   미제작       →work              공식 이미 보유
 6   /retirement-income TAX-03   미제작       →work              
 7   /capital-gains     TAX-04   미제작       →realestate,money  복잡, 2일
 8   /yearend           TAX-08   미제작       →work              10월 데드라인
 9   /property          TAX-09   미제작       →realestate        S급, 로직 최복잡
10   /inheritance       TAX-10   미제작       →money             
11   /crypto            TAX-11   미제작       →money             제도 확정 후
12   /prize             TAX-12   미제작       —                  최후순위
──   공유수신 ──
     4대보험            ←WRK-04  연결완료     /work/insurance/
     관부가세            ←LIF-02  준비중       life에서 생성 후 연결
     중고차세금          ←LIF-10  준비중       life에서 생성 후 연결
```

### ② work.mycalc.co.kr

```
순서  경로               모듈ID    상태       공유처            비고
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1   /hourly-wage       WRK-01   완성       —                검색량 최대, 로직 최단순
 2   /severance         WRK-02   완성       —                월 20만+ 검색
 3   /unemployment      WRK-03   미제작     —                
 4   /insurance         WRK-04   완성       →tax             
 5   /weekly-holiday    WRK-05   미제작     —                
 6   /minimum-wage      WRK-06   완성       —                
──   공유수신 ──
     근로소득세          ←TAX-02  tax에서 생성됨
     퇴직소득세          ←TAX-03  tax에서 생성됨
     프리랜서3.3%       ←TAX-05  tax에서 생성됨
     일용직             ←TAX-07  tax에서 생성됨
     연말정산           ←TAX-08  tax 10월 생성 후 연결
     은퇴자금           ←MON-01  money에서 생성 후 연결
     국민연금           ←MON-08  money에서 생성 후 연결
```

### ③ tools.mycalc.co.kr (멀티가능 ②와)

```
순서  경로             모듈ID    상태       비고
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1   /qr-code        TOL-13   미제작     2~3시간
 2   /color-picker   TOL-10   미제작     1~2일
 3   /image-resize   TOL-12   미제작     1~2일
 4   /pdf-merge      TOL-06   미제작     3일, 검색량 최대
 5   /pdf-split      TOL-07   미제작     
 6   /pdf-compress   TOL-08   미제작     
 7   /hwp-to-pdf     TOL-02   미제작     S급, 1주, 블루오션
 8   /signature      TOL-05   미제작     
 9   /remove-bg      TOL-01   미제작     S급, TF.js, 1~2주
10   /id-photo       TOL-03   미제작     배경제거 기술 공유
11   /video-to-gif   TOL-04   미제작     ffmpeg.wasm
12   /audio-extract  TOL-11   미제작     
13   /mockup         TOL-09   미제작     
14   /excel-to-image TOL-14   미제작     
15   /tts            TOL-15   미제작     
16   /watermark      TOL-16   미제작     
──   공유 없음 (독립 도메인)
```

### ④ realestate.mycalc.co.kr

```
순서  경로             모듈ID    상태       공유처            비고
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1   /fee            REL-01   미제작     —                검색량 최대, 로직 단순
 2   /jeonwolse      REL-06   미제작     —                로직 단순
 3   /pyeong         REL-09   미제작     —                2~3시간
 4   /loan-limit     REL-04   미제작     →money           
 5   /rental-income  REL-05   미제작     →money,tax       
 6   /auction        REL-03   미제작     →money           
 7   /villa-roi      REL-07   미제작     →money           
 8   /maintenance    REL-08   미제작     —                
 9   /school-district REL-02  미제작     →parent          S급, 데이터 수집 필요
10   /eviction       REL-10   미제작     —                
──   공유수신 ──
     양도소득세        ←TAX-04  tax에서 생성됨
     부동산세금통합     ←TAX-09  tax에서 생성됨
     복리이자          ←MON-04  연결완료     /money/compound/
     대출상환          ←MON-05  money에서 생성 후 연결
```

### ⑤ money.mycalc.co.kr (멀티가능 ④와)

```
순서  경로             모듈ID    상태       공유처            비고
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1   /compound       MON-04   완성       →realestate      
 2   /loan           MON-05   미제작     →realestate      
 3   /average-down   MON-03   미제작     —                
 4   /dividend       MON-02   미제작     →tax             
 5   /retirement-fund MON-01  미제작     →work            S급
 6   /pension        MON-08   미제작     →work,tax        
 7   /ipo            MON-06   미제작     —                
 8   /inflation      MON-07   미제작     →life            
──   공유수신 ──
     양도소득세        ←TAX-04  tax에서 생성됨
     상속증여          ←TAX-10  tax에서 생성됨
     가상자산          ←TAX-11  tax에서 생성됨
     경매수익률        ←REL-03  realestate에서 생성됨
     LTV/DTI/DSR     ←REL-04  realestate에서 생성됨
     학자금대출        ←STU-03  student에서 생성 후 연결
```

### ⑥ student.mycalc.co.kr

```
순서  경로             모듈ID    상태       공유처            비고
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1   /gpa            STU-07   미제작     —                로직 단순
 2   /naesin         STU-02   미제작     →parent          
 3   /suneung        STU-01   미제작     →parent          S급, 9월 데드라인
 4   /attendance     STU-08   미제작     —                
 5   /military       STU-10   미제작     —                
 6   /tuition        STU-03   미제작     →money           
 7   /scholarship    STU-04   미제작     →parent          
 8   /toeic          STU-05   미제작     —                
 9   /transfer       STU-06   미제작     —                
10   /cert           STU-09   미제작     →work            
11   /living-cost    STU-11   미제작     →life            
12   /speed-test     STU-12   미제작     —                
──   공유수신 ──
     대입전형          ←PAR-01  parent에서 생성 후 연결
     교육급여          ←PAR-03  parent에서 생성 후 연결
```

### ⑦ parent.mycalc.co.kr

```
순서  경로              모듈ID    상태       공유처          비고
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1   /birth           PAR-05   미제작     →work          
 2   /growth          PAR-04   미제작     —              
 3   /daycare         PAR-02   미제작     —              
 4   /education-support PAR-03 미제작     →student       
 5   /admission       PAR-01   미제작     →student       
 6   /vaccine         PAR-06   미제작     —              
 7   /academy         PAR-07   미제작     —              
 8   /child-insurance PAR-08   미제작     →money         
 9   /afterschool     PAR-09   미제작     —              
10   /allowance       PAR-10   미제작     —              
──   공유수신 ──
     수능등급컷        ←STU-01  student에서 생성됨
     내신등급          ←STU-02  student에서 생성됨
     학군             ←REL-02  realestate에서 생성됨
     육아휴직급여      ←WRK 연계
```

### ⑧ life.mycalc.co.kr

```
순서  경로             모듈ID    상태       공유처          비고
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1   /customs        LIF-02   미제작     →tax           10월 블프 맞추면 좋음
 2   /alcohol        LIF-01   미제작     —              
 3   /calorie        LIF-04   미제작     —              
 4   /electric       LIF-03   미제작     —              
 5   /traffic-fine   LIF-05   미제작     —              
 6   /car            LIF-10   미제작     →tax           
 7   /youtube        LIF-07   미제작     —              
 8   /quit-smoking   LIF-06   미제작     —              
 9   /letter-count   LIF-12   미제작     —              
10   /delivery       LIF-11   미제작     —              
11   /sleep          LIF-08   미제작     —              
12   /pet-age        LIF-09   미제작     —              
──   공유수신 ──
     인플레이션        ←MON-07  money에서 생성됨
```

### ⑨ cruise.co.kr

```
순서  경로         모듈ID    상태       공유처          비고
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1   /tip        CRU-01   미제작     —              
 2   /jetlag     CRU-02   미제작     →life          
 3   /passport   CRU-03   미제작     →tools         여권사진 모듈 재사용
```

---

### 멀티작업 가능 조합 정리

```
조합                              이유
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
tax + tools                      기술스택 완전 다름 (세금계산 vs 파일처리)
work + tools                     기술스택 완전 다름
realestate + money               공유모듈 있지만 자체 모듈은 독립
student + tools 나머지            기술스택 완전 다름
parent + life                    공유 거의 없음, 독립적
cruise는 아무거나 병행 가능        3개뿐
```
