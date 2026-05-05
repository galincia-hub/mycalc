/**
 * 종합소득세 계산기 — 핵심 공식 모듈
 * 
 * 출처: incometax.calculate.co.kr 역공학 (2025년 귀속 기준)
 * 용도: Claude Code에서 종소세 계산기 제작 시 참조 파일
 * 
 * 구조:
 *   1. TAX_RATES — 종합소득세 세율표
 *   2. DEDUCTION_EARNED — 근로소득공제
 *   3. DEDUCTION_PENSION — 연금소득공제
 *   4. DEDUCTION_CARDS — 신용카드 등 소득공제
 *   5. CREDIT_CHILD — 자녀 세액공제
 *   6. CREDIT_EARNED — 근로소득 세액공제
 *   7. CREDIT_PENSION_ACCOUNT — 연금계좌 세액공제
 *   8. PERSONAL_DEDUCTION — 인적공제
 *   9. FINANCIAL_INCOME — 금융소득 종합과세
 *  10. calculate() — 최종 세액 계산 함수
 */

// ============================================================
// 1. 종합소득세 세율표
// ============================================================
const TAX_RATES = [
  { min: 0,           max: 14_000_000,    rate: 0.06, deduction: 0 },
  { min: 14_000_000,  max: 50_000_000,    rate: 0.15, deduction: 1_260_000 },
  { min: 50_000_000,  max: 88_000_000,    rate: 0.24, deduction: 5_760_000 },
  { min: 88_000_000,  max: 150_000_000,   rate: 0.35, deduction: 15_440_000 },
  { min: 150_000_000, max: 300_000_000,   rate: 0.38, deduction: 19_940_000 },
  { min: 300_000_000, max: 500_000_000,   rate: 0.40, deduction: 25_900_000 },
  { min: 500_000_000, max: 1_000_000_000, rate: 0.42, deduction: 35_900_000 },
  { min: 1_000_000_000, max: Infinity,    rate: 0.45, deduction: 65_900_000 },
];

/** 과세표준 → 세율 반환 */
function getTaxRate(taxBase) {
  const bracket = TAX_RATES.find(b => taxBase <= b.max) || TAX_RATES[TAX_RATES.length - 1];
  return bracket.rate;
}

/** 과세표준 → 누진공제 반환 */
function getProgressiveDeduction(taxBase) {
  const bracket = TAX_RATES.find(b => taxBase <= b.max) || TAX_RATES[TAX_RATES.length - 1];
  return bracket.deduction;
}

/** 과세표준 → 산출세액 */
function getCalculatedTax(taxBase) {
  return taxBase * getTaxRate(taxBase) - getProgressiveDeduction(taxBase);
}


// ============================================================
// 2. 근로소득공제
// ============================================================
const DEDUCTION_EARNED_TABLE = [
  { max: 5_000_000,   base: 0,          rate: 0.70 },
  { max: 15_000_000,  base: 3_500_000,  rate: 0.40 },  // 350만 + 초과분×40%
  { max: 45_000_000,  base: 7_500_000,  rate: 0.15 },  // 750만 + 초과분×15%
  { max: 100_000_000, base: 12_000_000, rate: 0.05 },  // 1200만 + 초과분×5%
  { max: Infinity,    base: 14_750_000, rate: 0.02 },   // 1475만 + 초과분×2%
];
const MAX_DEDUCTION_EARNED = 20_000_000; // 상한 2,000만원

function getDeductionEarned(totalSalary) {
  let deduction = 0;
  let prev = 0;
  for (const tier of DEDUCTION_EARNED_TABLE) {
    if (totalSalary <= tier.max) {
      deduction = tier.base + (totalSalary - prev) * tier.rate;
      break;
    }
    prev = tier.max;
  }
  // 첫 구간은 base=0이므로 totalSalary*0.7 그대로
  if (totalSalary <= 5_000_000) deduction = totalSalary * 0.7;
  deduction = Math.min(deduction, MAX_DEDUCTION_EARNED);
  deduction = Math.min(deduction, totalSalary);
  return deduction;
}


// ============================================================
// 3. 연금소득공제
// ============================================================
const DEDUCTION_PENSION_TABLE = [
  { max: 3_500_000,   base: 0,          rate: 1.0 },   // 전액
  { max: 7_000_000,   base: 3_500_000,  rate: 0.4 },   // 350만 + 초과분×40%
  { max: 14_000_000,  base: 4_900_000,  rate: 0.2 },   // 490만 + 초과분×20%
  { max: Infinity,    base: 6_300_000,  rate: 0.1 },    // 630만 + 초과분×10%
];
const MAX_DEDUCTION_PENSION = 9_000_000; // 상한 900만원

function getDeductionPension(totalPension) {
  let deduction;
  if (totalPension <= 3_500_000) {
    deduction = totalPension;
  } else if (totalPension <= 7_000_000) {
    deduction = 3_500_000 + (totalPension - 3_500_000) * 0.4;
  } else if (totalPension <= 14_000_000) {
    deduction = 4_900_000 + (totalPension - 7_000_000) * 0.2;
  } else {
    deduction = 6_300_000 + (totalPension - 14_000_000) * 0.1;
  }
  return Math.min(deduction, MAX_DEDUCTION_PENSION);
}


// ============================================================
// 4. 신용카드 등 소득공제
// ============================================================
/**
 * @param {number} salary        총급여액
 * @param {number} traditional   전통시장 사용액
 * @param {number} transport     대중교통 이용액
 * @param {number} cashEtc       현금영수증·직불카드 사용액
 * @param {number} creditCard    신용카드 사용액
 * @param {number} cultureCredit 도서공연 신용카드
 * @param {number} cultureCash   도서공연 현금영수증
 * @param {number} addUsage      추가 사용분 (현재 0)
 * @param {number} childCount    자녀 수 (기본공제 대상)
 * @returns {{ 'culture-total': number, 'usage-cards-etc': number, deduction: number }}
 */
function getDeductionCards(salary, traditional, transport, cashEtc, creditCard, cultureCredit, cultureCash, addUsage = 0, childCount = 0) {
  const threshold = salary * 0.25; // 최저사용금액 = 총급여 25%
  const isOver70M = salary > 70_000_000;
  const baseLimit = isOver70M ? 2_500_000 : 3_000_000;

  // 자녀 수에 따른 추가한도
  let childBonus = 0;
  if (childCount >= 2) childBonus = isOver70M ? 500_000 : 1_000_000;
  else if (childCount === 1) childBonus = isOver70M ? 250_000 : 500_000;

  const totalLimit = baseLimit + childBonus;
  const cultureTotal = cultureCredit + cultureCash;
  const cultureEligible = salary <= 70_000_000 ? cultureTotal : 0;
  const totalUsage = traditional + transport + cashEtc + creditCard + cultureTotal;

  // 공제율별 계산
  const creditCardBase = totalUsage - traditional - transport - cashEtc - cultureEligible;
  let creditCardDeduct = creditCardBase * 0.15;
  let cashDeduct = cashEtc * 0.30;
  let cultureDeduct = cultureEligible * 0.30;
  let traditionalDeduct = traditional * 0.40;
  let transportDeduct = transport * 0.40;

  // 최저사용금액 차감 (신용카드부터 차감)
  let minDeduct = 0;
  if (threshold <= creditCardBase) {
    minDeduct = threshold * 0.15;
  } else {
    minDeduct = creditCardBase * 0.15 + (cashEtc + cultureEligible) * 0.30 + (threshold - creditCardBase - cashEtc - cultureEligible) * 0.40;
    minDeduct = Math.max(minDeduct, 0);
  }

  const rawDeduction = creditCardDeduct + cashDeduct + cultureDeduct + traditionalDeduct + transportDeduct - minDeduct;
  const excess = Math.max(rawDeduction - totalLimit, 0);

  // 추가한도
  const additionalCap = isOver70M ? 2_000_000 : 3_000_000;
  const additionalDeduct = Math.min(traditionalDeduct + transportDeduct + cultureDeduct, additionalCap);
  const additionalUsed = Math.min(excess, additionalDeduct);

  const deduction = excess > 0
    ? totalLimit + additionalUsed
    : rawDeduction;

  return { 'culture-total': cultureTotal, 'usage-cards-etc': totalUsage, deduction };
}


// ============================================================
// 5. 자녀 세액공제
// ============================================================
function getCreditChildBasic(count) {
  if (count === 1) return 250_000;
  if (count === 2) return 550_000;
  if (count >= 3) return 950_000 + (count - 2) * 400_000;
  return 0;
}

function getCreditChildBirthAdoption(order) {
  // order: 1=첫째, 2=둘째, 3=셋째이상
  if (order === 1) return 300_000;
  if (order === 2) return 500_000;
  if (order === 3) return 700_000;
  return 0;
}


// ============================================================
// 6. 근로소득 세액공제
// ============================================================
/**
 * @param {number} comprehensiveIncome  종합소득금액
 * @param {number} earnedIncome         근로소득금액
 * @param {number} financialIncome      금융소득금액
 * @param {number} totalSalary          총급여액
 * @param {number} totalDeduction       소득공제 합계
 */
function getCreditEarned(comprehensiveIncome, earnedIncome, financialIncome, totalSalary, totalDeduction) {
  const FINANCIAL_STANDARD = 20_000_000;

  // 근로소득만의 종합소득 (금융소득 2천만 초과분만 포함)
  const adjIncome = comprehensiveIncome - financialIncome + Math.max(financialIncome - FINANCIAL_STANDARD, 0);
  const taxBase = adjIncome - totalDeduction;
  const calcTax = taxBase * getTaxRate(taxBase) - getProgressiveDeduction(taxBase);

  let credit = 0;
  if (adjIncome === 0) {
    credit = 0;
  } else {
    const portion = calcTax * (earnedIncome / adjIncome);
    if (portion <= 1_300_000) {
      credit = portion * 0.55;
    } else {
      credit = 715_000 + (portion - 1_300_000) * 0.30;
    }
  }
  credit = Math.max(credit, 0);

  // 한도 (총급여 기준)
  let limit;
  if (totalSalary <= 33_000_000) limit = 740_000;
  else if (totalSalary <= 70_000_000) limit = Math.max(740_000 - (totalSalary - 33_000_000) * (8 / 1000), 660_000);
  else if (totalSalary <= 120_000_000) limit = Math.max(660_000 - (totalSalary - 70_000_000) * 0.5, 500_000);
  else limit = Math.max(500_000 - (totalSalary - 120_000_000) * 0.5, 200_000);

  credit = Math.min(credit, limit);
  return credit;
}


// ============================================================
// 7. 연금계좌 세액공제
// ============================================================
/**
 * @param {number} comprehensiveIncome 종합소득금액
 * @param {number} retirementPension   퇴직연금 납입액
 * @param {number} pensionSaving       연금저축 납입액
 * @param {number} isaRetirement       ISA 퇴직연금 전환액
 * @param {number} isaPension          ISA 연금저축 전환액
 */
function getCreditPension(comprehensiveIncome, retirementPension, pensionSaving, isaRetirement = 0, isaPension = 0) {
  const rate = comprehensiveIncome > 45_000_000 ? 0.12 : 0.15;

  // 일반 연금계좌
  const rpCapped = Math.min(retirementPension, 9_000_000);
  const psCapped = Math.min(pensionSaving, 6_000_000);
  const pensionSubject = Math.min(rpCapped + psCapped, 9_000_000);
  const pensionCredit = pensionSubject * rate;

  // ISA 전환
  const isaRpCapped = Math.min(isaRetirement, 9_000_000);
  const isaPsCapped = Math.min(isaPension, 6_000_000);
  const isaBase = Math.min(Math.min(isaRpCapped + isaPsCapped, 9_000_000), Math.max(9_000_000 - pensionSubject, 0));
  const isaBonus = Math.min((isaRetirement + isaPension) * 0.1, 3_000_000);
  const isaSubject = isaBase + isaBonus;
  const isaCredit = isaSubject * rate;

  return {
    pensionSubject,
    pensionCredit,
    isaSubject,
    isaCredit,
    totalCredit: pensionCredit + isaCredit,
  };
}


// ============================================================
// 8. 인적공제
// ============================================================
const PERSONAL_DEDUCTION = {
  basic: 1_500_000,       // 기본공제 1인당
  seniorAge: 1_000_000,   // 경로우대 (70세 이상)
  disabled: 2_000_000,    // 장애인
  woman: 500_000,         // 부녀자
  singleParent: 1_000_000, // 한부모 (부녀자와 중복 시 한부모만 적용)
};


// ============================================================
// 9. 금융소득 종합과세
// ============================================================
const FINANCIAL_INCOME_STANDARD = 20_000_000; // 2,000만원 기준
// 금융소득 2,000만 이하: 14% 원천징수로 종결
// 금융소득 2,000만 초과: 종합과세 vs 분리과세(14%) 비교하여 큰 쪽 적용
// 배당 Gross-up 가산율: 11% (배당가산 대상 금액 × 0.11)
const DIVIDEND_GROSS_UP_RATE = 0.10;


// ============================================================
// 10. 기타 상수
// ============================================================
const STANDARD_TAX_CREDIT = {
  withEarnedIncome: 130_000,  // 근로소득 있는 거주자
  sincereBusiness: 120_000,   // 성실사업자
  noEarnedIncome: 70_000,     // 근로소득 없는 거주자
};
const ELECTRONIC_FILING_CREDIT = 20_000; // 전자신고 세액공제
const MARRIAGE_CREDIT = 500_000;          // 혼인 세액공제 (2024~2026)
const DEDUCTION_COMPREHENSIVE_LIMIT = 25_000_000; // 소득공제 종합한도
const PERSONAL_SERVICE_94_THRESHOLD = 40_000_000;  // 인적용역(94코드) 단순경비율 기본/초과 기준


// ============================================================
// 11. 최종 계산 함수
// ============================================================
/**
 * 종합소득세 전체 계산
 * 
 * @param {object} income — 소득금액 합계
 *   { business, earned, pension, financial, etc }
 * @param {number} totalDeduction — 소득공제 합계
 * @param {number} totalCredit — 세액공제 합계
 * @param {number} additionalPrePaid — 가산세 - 기납부세액
 * @returns {object}
 */
function calculate(income, totalDeduction, totalCredit, additionalPrePaid = 0) {
  // 종합소득금액
  const comprehensiveIncome = Object.values(income).reduce((a, b) => a + b, 0);

  // 과세표준
  const taxBase = Math.max(comprehensiveIncome - totalDeduction, 0);

  // 세율·누진공제
  const taxRate = getTaxRate(taxBase);
  const progressiveDeduction = getProgressiveDeduction(taxBase);

  // 산출세액 (금융소득 비교과세는 별도 처리 필요)
  const calculatedTax = taxBase * taxRate - progressiveDeduction;

  // 결정세액
  const determinedTax = Math.max(calculatedTax - totalCredit, 0);

  // 최종 납부세액
  const comprehensiveIncomeTax = determinedTax - additionalPrePaid;

  return {
    comprehensiveIncome,
    totalDeduction,
    taxBase,
    taxRate,
    progressiveDeduction,
    calculatedTax,
    totalCredit,
    determinedTax,
    additionalPrePaid,
    comprehensiveIncomeTax,
  };
}


// ============================================================
// Export
// ============================================================
export {
  // 세율
  TAX_RATES,
  getTaxRate,
  getProgressiveDeduction,
  getCalculatedTax,
  // 소득공제
  getDeductionEarned,
  getDeductionPension,
  getDeductionCards,
  // 세액공제
  getCreditChildBasic,
  getCreditChildBirthAdoption,
  getCreditEarned,
  getCreditPension,
  // 상수
  PERSONAL_DEDUCTION,
  FINANCIAL_INCOME_STANDARD,
  DIVIDEND_GROSS_UP_RATE,
  STANDARD_TAX_CREDIT,
  ELECTRONIC_FILING_CREDIT,
  MARRIAGE_CREDIT,
  DEDUCTION_COMPREHENSIVE_LIMIT,
  PERSONAL_SERVICE_94_THRESHOLD,
  // 최종 계산
  calculate,
};
