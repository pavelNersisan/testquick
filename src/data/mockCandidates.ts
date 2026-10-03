import { CandidateResult } from '../types/assessment';

export const MOCK_CANDIDATES: CandidateResult[] = [
  {
    id: 'cand-1',
    candidateName: 'سارا میرزایی',
    email: 'sara.mirzaei@gmail.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    jobPosition: 'مهندس ارشد نرم‌افزار فرانت‌اند (Senior Frontend)',
    categoryId: 'it_software',
    testId: 'test-js-algorithms',
    testTitle: 'برنامه‌نویسی جاوااسکریپت: تبدیل داده‌ها و الگوریتم',
    testType: 'coding',
    submittedAt: '۱۴۰۳/۰۷/۱۰ - ساعت ۱۴:۳۰',
    timeSpentMinutes: 21,
    overallScore: 94,
    status: 'recommended',
    statusLabel: 'استخدام پیشنهادی (Top 5%)',
    scoreBreakdown: {
      technicalOrRoleScore: 98,
      problemSolvingScore: 92,
      situationalJudgmentScore: 89,
      personalityFitScore: 95
    },
    radarSkills: [
      { skill: 'مهارت الگوریتمی و کدنویسی', score: 98, benchmark: 75 },
      { skill: 'حل مسئله و تفکر تحلیلی', score: 92, benchmark: 70 },
      { skill: 'دقت و وجدان کاری', score: 95, benchmark: 80 },
      { skill: 'قضاوت موقعیتی تیمی', score: 89, benchmark: 72 },
      { skill: 'تاب‌آوری در فشار کاری', score: 91, benchmark: 68 }
    ],
    keyStrengths: [
      'تسلط فوق‌العاده بر توابع مرتبه‌بالا و ساختارهای داده جاوااسکریپت بدون تحمیل سربار حافظه',
      'مدیریت حرفه‌ای حالت‌های استثنایی (Edge Cases) و آرایه‌های خالی',
      'سرعت پاسخ‌دهی بالا و پایبندی به اصول کدهای خوانا و خودسند (Clean Code)'
    ],
    improvementAreas: [
      'امکان ارتقای مستندسازی کامنت‌های JSDoc برای توابع پیچیده در صورت لزوم'
    ],
    behavioralSummary: 'داوطلب نشان‌دهنده تعهد مثال‌زدنی به کیفیت کد، تاب‌آوری بالا در حل مسائل در مهلت‌های کوتاه و روحیه کار تیمی هم‌افزا است. انتخاب بسیار مناسب برای لیدینگ تسک‌های معماری فرانت‌اند.',
    suggestedInterviewQuestions: [
      'در مورد تجربه‌تان از Refactor کردن یک کدبیس قدیمی با حجم بدهی فنی بالا توضیح دهید.',
      'چگونه اولویت‌های فوری کسب‌وکار را با نیاز به نوشتن تست‌های جامع تراز می‌کنید؟'
    ],
    codingResult: {
      codeSubmitted: `function aggregateSalaries(employees) {
  if (!employees || employees.length === 0) return {};
  const totals = {};
  for (const emp of employees) {
    if (!totals[emp.department]) totals[emp.department] = { sum: 0, count: 0 };
    totals[emp.department].sum += emp.salary;
    totals[emp.department].count += 1;
  }
  const result = {};
  for (const [dept, data] of Object.entries(totals)) {
    result[dept] = Number((data.sum / data.count).toFixed(2));
  }
  return result;
}`,
      language: 'JavaScript ES6',
      testCasesPassed: 4,
      totalTestCases: 4,
      executionTimeMs: 14,
      codeQualityNote: 'مرتبه زمانی بهینه O(N) با مصرف خطی حافظه O(D)'
    }
  },
  {
    id: 'cand-2',
    candidateName: 'پویا احمدی',
    email: 'pouya.ahmadi@techmail.ir',
    phone: '۰۹۳۵۲۱۴۹۹۸۸',
    jobPosition: 'مدیر محصول و تحلیل‌گر ارشد کسب‌وکار',
    categoryId: 'management_business',
    testId: 'test-problem-solving',
    testTitle: 'حل مسئله و تفکر تحلیلی (Problem Solving)',
    testType: 'problem_solving',
    submittedAt: '۱۴۰۳/۰۷/۰۹ - ساعت ۱۱:۱۵',
    timeSpentMinutes: 18,
    overallScore: 88,
    status: 'recommended',
    statusLabel: 'استخدام پیشنهادی',
    scoreBreakdown: {
      technicalOrRoleScore: 85,
      problemSolvingScore: 95,
      situationalJudgmentScore: 88,
      personalityFitScore: 82
    },
    radarSkills: [
      { skill: 'شناسایی گلوگاه‌های سیستمی', score: 96, benchmark: 70 },
      { skill: 'محاسبات مالی و نرخ بازگشت', score: 94, benchmark: 65 },
      { skill: 'استدلال منطقی استنتاجی', score: 92, benchmark: 72 },
      { skill: 'مدیریت تضاد منافع', score: 85, benchmark: 75 },
      { skill: 'تفکر استراتژیک', score: 90, benchmark: 70 }
    ],
    keyStrengths: [
      'تشخیص سریع گلوگاه تولید (Theory of Constraints) در کمترین زمان ممکن',
      'تسلط کامل بر مدل‌سازی مالی، نرخ ریزش (Churn) و درآمد ماهانه (MRR)',
      'دیدگاه واقع‌گرایانه در تخصیص منابع محدود'
    ],
    improvementAreas: [
      'توصیه می‌شود در جلسات مصاحبه، میزان انعطاف‌پذیری نسبت به تصمیمات سریع بدون دیتای کامل سنجیده شود.'
    ],
    behavioralSummary: 'تحلیل‌گر داده‌محور و دقیق با توانایی عالی در ساخت مدل‌های استنتاجی. قادر است اهداف راهبردی را به معیارهای عملیاتی روزمره ترجمه کند.',
    suggestedInterviewQuestions: [
      'زمانی را توصیف کنید که دیتای آماری جهت‌گیری متفاوتی با نظر شهودی مدیرعامل داشت؛ چگونه مدیریت کردید؟',
      'چگونه اولویت‌های بین فیچرهای درآمدزا و کاهش بدهی فنی را ارزیابی می‌کنید؟'
    ]
  },
  {
    id: 'cand-3',
    candidateName: 'نیلوفر رضایی',
    email: 'n.rezaei@hr-agency.com',
    phone: '۰۹۱۲۹۹۸۸۷۷۶',
    jobPosition: 'کارشناس ارشد جذب و استخدام (Talent Acquisition)',
    categoryId: 'hr_administration',
    testId: 'test-sjt-workplace',
    testTitle: 'آزمون قضاوت موقعیتی در محیط کار (SJT)',
    testType: 'situational_judgment',
    submittedAt: '۱۴۰۳/۰۷/۰۸ - ساعت ۱۶:۴۰',
    timeSpentMinutes: 19,
    overallScore: 92,
    status: 'recommended',
    statusLabel: 'استخدام پیشنهادی',
    scoreBreakdown: {
      technicalOrRoleScore: 90,
      problemSolvingScore: 88,
      situationalJudgmentScore: 96,
      personalityFitScore: 94
    },
    radarSkills: [
      { skill: 'حل تعارض و دیپلماسی سازمانی', score: 98, benchmark: 75 },
      { skill: 'مدیریت بحران‌های بین‌فردی', score: 94, benchmark: 70 },
      { skill: 'همدلی و شنیدن فعال', score: 96, benchmark: 80 },
      { skill: 'وفاداری به اصول حرفه‌ای', score: 92, benchmark: 75 },
      { skill: 'ارتباطات بین‌فرهنگی', score: 90, benchmark: 68 }
    ],
    keyStrengths: [
      'انتخاب رویکردهای غیرتقابلی و راه‌حل‌محور در تنش‌های سازمانی',
      'مهارت عالی در حفظ تعادل بین منافع مشتری و سلامت روانی تیم',
      'پرهیز از تصمیم‌گیری‌های شتاب‌زده احساسی'
    ],
    improvementAreas: [
      'تقویت جسارت در بیان مخالفت‌های سازنده به مقامات ارشد سازمان'
    ],
    behavioralSummary: 'دارای هوش هیجانی (EQ) بسیار بالا، تسلط بر اصول روانشناسی سازمانی و توانایی تثبیت‌کننده در محیط‌های پرالتهاب استارتاپی.',
    suggestedInterviewQuestions: [
      'اگر یک مدیر دپارتمان اصرار بر استخدام فردی داشته باشد که در تست‌های رفتاری مردود شده، چگونه گفتگو را پیش می‌برید؟'
    ]
  },
  {
    id: 'cand-4',
    candidateName: 'امیرحسین کاظمی',
    email: 'a.kazemi@financecorp.ir',
    phone: '۰۹۳۰۵۵۶۶۷۷۸',
    jobPosition: 'تحلیل‌گر مالی و بودجه‌ریزی شرکتی',
    categoryId: 'finance_banking',
    testId: 'test-finance-accounting',
    testTitle: 'تحلیل صورت‌های مالی، استانداردها و بودجه‌ریزی',
    testType: 'role_specific',
    submittedAt: '۱۴۰۳/۰۷/۰۷ - ساعت ۰۹:۵۰',
    timeSpentMinutes: 24,
    overallScore: 78,
    status: 'review',
    statusLabel: 'نیازمند بررسی تکمیلی (Interview Review)',
    scoreBreakdown: {
      technicalOrRoleScore: 82,
      problemSolvingScore: 75,
      situationalJudgmentScore: 74,
      personalityFitScore: 80
    },
    radarSkills: [
      { skill: 'تحلیل جریان وجوه نقد', score: 88, benchmark: 75 },
      { skill: 'محاسبه نسبت‌های مالی نقدینگی', score: 85, benchmark: 75 },
      { skill: 'مدل‌سازی مالی پیشرفته', score: 70, benchmark: 70 },
      { skill: 'انعطاف‌پذیری کاری', score: 76, benchmark: 72 },
      { skill: 'دقت در ممیزی اسناد', score: 80, benchmark: 78 }
    ],
    keyStrengths: [
      'دانش مناسب در تفسیر ترازنامه و جریان نقد عملیاتی',
      'تسلط بر مفاهیم استاندارد ارزش زمانی پول و نسبت‌های نقدینگی'
    ],
    improvementAreas: [
      'کمی کندی در تست‌های استدلال ریاضی تحت فشار زمان',
      'نیاز به تقویت در ابزارهای خودکارسازی اکسل و اسکریپت‌نویسی مالی'
    ],
    behavioralSummary: 'کاندیدایی منظم و قابل اتکا با پایه‌های تئوری محکم. در مصاحبه فنی پیشنهاد می‌شود تسلط بر اکسل پیشرفته ارزیابی گردد.',
    suggestedInterviewQuestions: [
      'در صورت مغایرت صورت مالی حسابرسی شده با جریان نقد واقعی چه گام‌هایی برمی‌دارید؟'
    ]
  }
];
