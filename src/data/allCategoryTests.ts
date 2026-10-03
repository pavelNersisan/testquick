import { AssessmentTest, JobCategoryId, TestType, DifficultyLevel } from '../types/assessment';
import { ASSESSMENT_TESTS } from './testLibrary';
import { ADDITIONAL_COMPREHENSIVE_TESTS } from './extendedTests';

interface CategoryTestSpec {
  id: string;
  titleFa: string;
  titleEn: string;
  testType: TestType;
  difficulty: DifficultyLevel;
  durationMinutes: number;
  descriptionFa: string;
  targetRoles: string[];
  skillsCovered: string[];
  sourceStandard: string;
  question: {
    title: string;
    text: string;
    options: { text: string; isCorrect: boolean }[];
    explanation: string;
  };
}

function createTest(
  id: string,
  categoryId: JobCategoryId,
  testType: TestType,
  titleFa: string,
  titleEn: string,
  difficulty: DifficultyLevel,
  durationMinutes: number,
  questionCount: number,
  descriptionFa: string,
  targetRoles: string[],
  skillsCovered: string[],
  sourceStandard: string,
  popularityScore: number,
  questions: any[]
): AssessmentTest {
  return {
    id,
    titleFa,
    titleEn,
    categoryId,
    testType,
    difficulty,
    durationMinutes,
    questionCount,
    descriptionFa,
    targetRoles,
    skillsCovered,
    sourceStandard,
    popularityScore,
    questions
  };
}

// 10 distinct test specifications for EACH of the 17 parent categories
const ALL_CATEGORY_SPECS: Record<JobCategoryId, CategoryTestSpec[]> = {
  management_business: [
    {
      id: 'mb-1',
      titleFa: 'حل مسئله تحلیلی و داده‌محور مکنزی (McKinsey PST)',
      titleEn: 'McKinsey Problem Solving Test & Strategic Case Analysis',
      testType: 'problem_solving',
      difficulty: 'پیشرفته',
      durationMinutes: 25,
      descriptionFa: 'ارزیابی استعداد استدلال استنتاجی، شکستن مسائل پیچیده تجاری و تصمیم‌گیری بر مبنای داده‌های مالی.',
      targetRoles: ['Management Consultant', 'Strategy Director', 'Operations Lead'],
      skillsCovered: ['Data Interpretation', 'Root Cause Logic', 'Hypothesis-driven Analysis'],
      sourceStandard: 'مرجع جهانی: McKinsey & Company PST & BCG Potential Test',
      question: {
        title: 'تحلیل بازگشت سرمایه در کاهش هزینه عملیاتی',
        text: 'شرکتی با سرمایه‌گذاری ۲۰۰ هزار دلاری در اتوماسیون، هزینه جاری سالانه خود را از ۵۰ هزار به ۲۰ هزار دلار کاهش می‌دهد. دوره بازگشت سرمایه (Payback Period) ساده چقدر است؟',
        options: [
          { text: '۶.۶۷ سال (۲۰۰ ÷ ۳۰ هزار صرفه‌جویی سالانه)', isCorrect: true },
          { text: '۴ سال', isCorrect: false },
          { text: '۱۰ سال', isCorrect: false }
        ],
        explanation: 'صرفه‌جویی سالانه ۳۰ هزار دلار است و سرمایه‌گذاری ۲۰۰ هزار دلار در ۶.۶۷ سال بازپرداخت می‌شود.'
      }
    },
    {
      id: 'mb-2',
      titleFa: 'قضاوت موقعیتی تعارضات بین‌المللی سازمانی (SHL SJT)',
      titleEn: 'SHL Executive Situational Judgment & Leadership Dilemmas',
      testType: 'situational_judgment',
      difficulty: 'متوسط',
      durationMinutes: 20,
      descriptionFa: 'سنجش حل تعارضات ذینفعان، مدیریت اولویت‌های متضاد و رهبری تیم در شرایط ابهام استراتژیک.',
      targetRoles: ['Chief of Staff', 'Business Unit Lead', 'Executive Director'],
      skillsCovered: ['Stakeholder Diplomacy', 'Prioritization', 'Crisis Leadership'],
      sourceStandard: 'مرجع جهانی: SHL Executive Assessment & Korn Ferry Leadership',
      question: {
        title: 'مدیریت اختلاف استراتژیک بین دو معاونت ارشد',
        text: 'دو معاونت فنی و فروش بر سر تغییر زمان رونمایی محصول به اختلاف شدید رسیده‌اند و جلسات به بن‌بست رسیده است. اقدام بهینه رهبر چیست؟',
        options: [
          { text: 'برگزاری کارگاه مشترک و ارزیابی ریسک هر دو گزینه بر پایه سنجه‌های مالی مشترک و سناریوی راه‌حل میانی', isCorrect: true },
          { text: 'طرفداری کامل از معاونت قدیمی‌تر سازمان', isCorrect: false }
        ],
        explanation: 'ایجاد چارچوب عینی ارزیابی ریسک و توافق بر سنجه‌های مالی مشترک اختلاف را حل می‌کند.'
      }
    },
    {
      id: 'mb-3',
      titleFa: 'مدیریت پروژه اجایل و اسکرام پیشرفته (Scrum.org PSM-II)',
      titleEn: 'Agile & Professional Scrum Master Leadership',
      testType: 'role_specific',
      difficulty: 'پیشرفته',
      durationMinutes: 20,
      descriptionFa: 'سنجش مدیریت بکلگ، تسهیلگری جلسات رتروسپکتیو و مهار موانع تحویل اسپرینت.',
      targetRoles: ['Scrum Master', 'Agile Delivery Lead', 'Technical PM'],
      skillsCovered: ['Sprint Velocity', 'Burn-down Analysis', 'Servant Leadership'],
      sourceStandard: 'مرجع جهانی: Scrum.org PSM-II & PMI-ACP Standard',
      question: {
        title: 'ممانعت از ورود تسک‌های تعریف‌نشده به اسپرینت',
        text: 'اگر در میانه اسپرینت مدیرعامل مستقیماً به یک برنامه‌نویس تسک فوری ارجاع دهد، رفتار صحیح اسکرام‌مستر چیست؟',
        options: [
          { text: 'توضیح دوستانه فرآیند اسکرام به مدیرعامل و ارجاع درخواست به مالک محصول برای اولویت‌بندی در بکلگ', isCorrect: true },
          { text: 'سکوت کردن و اضافه کردن کار به اسپرینت', isCorrect: false }
        ],
        explanation: 'اسکرام‌مستر محافظ فرآیند و تمرکز تیم در اسپرینت جاری است.'
      }
    },
    {
      id: 'mb-4',
      titleFa: 'استراتژی کسب‌وکار و مدل‌های رشد OKR',
      titleEn: 'Business Strategy, OKRs & Scaled Growth Planning',
      testType: 'role_specific',
      difficulty: 'متوسط',
      durationMinutes: 20,
      descriptionFa: 'ارزیابی اتصال اهداف کلان راهبردی به شاخص‌های کلیدی عملکرد و ارزیابی موانع رشد بازار.',
      targetRoles: ['Head of Growth', 'Corporate Strategist', 'VP Business'],
      skillsCovered: ['OKR Alignment', 'Market Moats', 'Competitive Dynamics'],
      sourceStandard: 'مرجع جهانی: Harvard Business School & Measure What Matters',
      question: {
        title: 'تفکیک خروجی (Output) از نتیجه (Outcome)',
        text: 'کدام گزینه نمونه یک نتیجه تجاری (Outcome) است نه صرفاً خروجی کار؟',
        options: [
          { text: 'کاهش ۲۵ درصدی زمان انتظار مشتری در صف پاسخگویی پشتیبانی', isCorrect: true },
          { text: 'نوشتن ۱۰ صفحه سند راهنما برای اپراتورها', isCorrect: false }
        ],
        explanation: 'نتیجه تجاری بر اثر ملموس روی ارزش مشتری و کسب‌وکار تمرکز دارد نه تعداد تسک انجام‌شده.'
      }
    },
    {
      id: 'mb-5',
      titleFa: 'زبان انگلیسی تخصصی کسب‌وکار (CEFR Business English C1)',
      titleEn: 'Advanced Corporate Communication & Business English',
      testType: 'language',
      difficulty: 'پیشرفته',
      durationMinutes: 15,
      descriptionFa: 'سنجش لحن مذاکره، نگارش پیش‌نویس قراردادهای خارجی و مکاتبات دیپلماتیک شرکتی.',
      targetRoles: ['International Relations', 'Export Manager', 'Account Executive'],
      skillsCovered: ['Formal Correspondence', 'Contract Terms', 'Tone Diplomacy'],
      sourceStandard: 'مرجع جهانی: Cambridge Business English C1 & CEFR Framework',
      question: {
        title: 'عبارات دیپلماتیک در مخالفت با پیشنهاد شریک خارجی',
        text: 'Which phrase is most diplomatic when declining a commercial proposal?',
        options: [
          { text: 'While we appreciate your proposal, after careful consideration, we are unable to proceed under the current terms.', isCorrect: true },
          { text: 'Your proposal is rejected because your price is awful.', isCorrect: false }
        ],
        explanation: 'حفظ لحن محترمانه و قاطع استاندارد طلایی مکاتبات تجاری بین‌المللی است.'
      }
    },
    {
      id: 'mb-6',
      titleFa: 'تحلیل شاخص‌های مالی و داشبورد KPI مدیران',
      titleEn: 'Executive Financial KPIs & Metric Modeling',
      testType: 'problem_solving',
      difficulty: 'متوسط',
      durationMinutes: 20,
      descriptionFa: 'ارزیابی تسلط بر شاخص‌های EBITDA، گردش سرمایه، نرخ بازگشت دارایی و حاشیه سود ناخالص.',
      targetRoles: ['General Manager', 'Finance Operations', 'BI Manager'],
      skillsCovered: ['EBITDA Margins', 'Working Capital', 'Cash Conversion Cycle'],
      sourceStandard: 'مرجع جهانی: Wharton Executive Finance & CFA Institute',
      question: {
        title: 'تحلیل چرخه تبدیل وجه نقد (Cash Conversion Cycle)',
        text: 'کوتاه شدن چرخه تبدیل نقدینگی (CCC) نشان‌دهنده چیست؟',
        options: [
          { text: 'کارایی بالاتر در تبدیل سرمایه و دریافت سریع‌تر مطالبات از مشتریان', isCorrect: true },
          { text: 'ورشکستگی شرکت', isCorrect: false }
        ],
        explanation: 'هر چه CCC کوتاه‌تر باشد، نقدینگی کمتری در انبار و مطالبات بلوکه می‌ماند.'
      }
    },
    {
      id: 'mb-7',
      titleFa: 'مدیریت تغییر و تحول سازمانی (Kotter 8-Step Model)',
      titleEn: 'Organizational Change Leadership & Kotter Framework',
      testType: 'situational_judgment',
      difficulty: 'متوسط',
      durationMinutes: 20,
      descriptionFa: 'سنجش غلبه بر مقاومت پرسنل در برابر تغییر سیستم، ایجاد حس فوریت و پیروزی‌های کوتاه‌مدت.',
      targetRoles: ['Change Manager', 'HRBP', 'VP Transformation'],
      skillsCovered: ['Sense of Urgency', 'Coalition Building', 'Short-term Wins'],
      sourceStandard: 'مرجع جهانی: Kotter Change Leadership Institute',
      question: {
        title: 'ایجاد حس فوریت در پیاده‌سازی سیستم جدید',
        text: 'اولین گام موفق در متدولوژی ۸ مرحله‌ای کاتر برای آغاز تغییر در یک سازمان سنتی چیست؟',
        options: [
          { text: 'ایجاد حس فوریت واقعی با نشان دادن تهدیدهای بازار و فرصت‌های از دست رفته', isCorrect: true },
          { text: 'جریمه کردن فوری کارمندان مخالف تغییر', isCorrect: false }
        ],
        explanation: 'بدون ایجاد حس اضطرار، سازمان تمایلی به خروج از منطقه امن نشان نمی‌دهد.'
      }
    },
    {
      id: 'mb-8',
      titleFa: 'مدیریت بحران و تداوم کسب‌وکار (ISO 22301 BCM)',
      titleEn: 'Business Continuity & Disaster Resilience',
      testType: 'role_specific',
      difficulty: 'پیشرفته',
      durationMinutes: 20,
      descriptionFa: 'ارزیابی تحلیل اثرات بر کسب‌وکار (BIA) و برنامه‌ریزی تداوم خدمات در اختلالات بحرانی.',
      targetRoles: ['Risk Director', 'Operations Manager', 'Compliance Officer'],
      skillsCovered: ['BIA Assessment', 'RTO & RPO Metrics', 'Emergency Response'],
      sourceStandard: 'مرجع جهانی: ISO 22301 Standard for Business Continuity',
      question: {
        title: 'حداکثر زمان مجاز قطعی سرویس (RTO)',
        text: 'مفهوم Recovery Time Objective (RTO) در تداوم کسب‌وکار چیست؟',
        options: [
          { text: 'حداکثر زمان قابل پذیرش برای بازگرداندن سیستم به مدار پس از وقوع حادثه', isCorrect: true },
          { text: 'حقوق ماهانه کارشناس فنی', isCorrect: false }
        ],
        explanation: 'شاخص RTO بیانگر ضرب‌الاجل مجاز برای احیای فرآیندهاست.'
      }
    },
    {
      id: 'mb-9',
      titleFa: 'تفکر طراحی در نوآوری کسب‌وکار (Design Thinking)',
      titleEn: 'Design Thinking for Business Innovation (Stanford d.school)',
      testType: 'problem_solving',
      difficulty: 'متوسط',
      durationMinutes: 20,
      descriptionFa: 'ارزیابی همدلی با مشتری، تعریف عمیق مسئله، ایده‌پردازی و ساخت پروتوتایپ سریع.',
      targetRoles: ['Innovation Lead', 'Product Strategist', 'Customer Experience Director'],
      skillsCovered: ['Customer Empathy', 'Rapid Prototyping', 'User Testing'],
      sourceStandard: 'مرجع جهانی: Stanford d.school & IDEO Design Thinking',
      question: {
        title: 'مرحله همدلی (Empathize) در تفکر طراحی',
        text: 'در مرحله همدلی با مشتری، موثرترین اقدام کدام است؟',
        options: [
          { text: 'مشاهده رفتارهای واقعی کاربران در محیط طبیعی و شنیدن دغدغه‌های ناگفته آنان', isCorrect: true },
          { text: 'فرستادن پرسشنامه ۳۰ صفحه‌ای بدون صحبت حضوری', isCorrect: false }
        ],
        explanation: 'همدلی نیازمند مشاهده عینی و درک احساسات و نیازهای پنهان کاربران است.'
      }
    },
    {
      id: 'mb-10',
      titleFa: 'اخلاق شرکتی، انطباق و حاکمیت سازمانی (OECD Governance)',
      titleEn: 'Corporate Governance, Ethics & Regulatory Compliance',
      testType: 'role_specific',
      difficulty: 'پیشرفته',
      durationMinutes: 20,
      descriptionFa: 'سنجش صیانت از حقوق سهامداران، پیشگیری از تعارض منافع و شفافیت تصمیمات هیئت‌مدیره.',
      targetRoles: ['Board Secretary', 'Legal & Governance Lead', 'Audit Committee Member'],
      skillsCovered: ['Conflict of Interest', 'Fiduciary Duty', 'Whistleblower Protection'],
      sourceStandard: 'مرجع جهانی: OECD Principles of Corporate Governance',
      question: {
        title: 'افشای تعارض منافع در معامله با اشخاص وابسته',
        text: 'اگر یکی از اعضای هیئت‌مدیره در مناقصه تامین قطعات ذینفع باشد، وظیفه قانونی او چیست؟',
        options: [
          { text: 'افشای صریح ذینفعی به هیئت‌مدیره و امتناع کامل از حضور در رای‌گیری آن قرارداد', isCorrect: true },
          { text: 'پنهان کردن موضوع و رای دادن به نفع شرکت خود', isCorrect: false }
        ],
        explanation: 'اصل شفافیت و تعهد امانتداری ایجاب می‌کند عضو ذینفع در رای‌گیری دخالت نکند.'
      }
    }
  ],

  it_software: [
    {
      id: 'it-1',
      titleFa: 'برنامه‌نویسی جاوااسکریپت: الگوریتم‌ها و ساختار داده (HackerRank)',
      titleEn: 'JavaScript Core: Data Structures & Modern ES6+ Algorithms',
      testType: 'coding',
      difficulty: 'متوسط',
      durationMinutes: 25,
      descriptionFa: 'ارزیابی ساختارهای آرایه، اشیاء، نگاشت‌ها، پیچیدگی زمانی O(N) و کدنویسی تمیز جاوااسکریپت.',
      targetRoles: ['Frontend Developer', 'Fullstack Engineer', 'Node.js Developer'],
      skillsCovered: ['ES6+ Syntaxes', 'Time Complexity O(N)', 'Data Aggregation'],
      sourceStandard: 'مرجع جهانی: HackerRank JavaScript Gold Standard',
      question: {
        title: 'مرتبه زمانی جستجو در Map جاوااسکریپت',
        text: 'مرتبه زمانی عملیات get و set در ساختار داده Map در جاوااسکریپت در حالت میانگین چقدر است؟',
        options: [
          { text: 'O(1) زمان ثابت به دلیل استفاده از جدول هش داخلی', isCorrect: true },
          { text: 'O(N) خطی', isCorrect: false }
        ],
        explanation: 'ساختار Map با استفاده از Hash Table جستجوی O(1) را فراهم می‌کند.'
      }
    },
    {
      id: 'it-2',
      titleFa: 'برنامه‌نویسی پایتون بک‌اند و جنگو/فست‌ای‌پی‌آی (Python Backend)',
      titleEn: 'Python Backend Systems: Async, Generators & FastAPI',
      testType: 'programming',
      difficulty: 'متوسط',
      durationMinutes: 25,
      descriptionFa: 'ارزیابی تسلط بر برنامه‌نویسی ناهمگام (AsyncIO)، مدیریت حافظه، دکوراتورها و بهینه‌سازی دیتابیس.',
      targetRoles: ['Python Backend Developer', 'Django Specialist', 'AI Pipeline Engineer'],
      skillsCovered: ['AsyncIO & Coroutines', 'Pythonic Idioms', 'Memory Management'],
      sourceStandard: 'مرجع جهانی: Testlify Python & Python Institute PCAP',
      question: {
        title: 'استفاده از asyncio در عملیات I/O Bound',
        text: 'مزیت کلیدی استفاده از async/await در مقایسه با روش سنتی در پایتون چیست؟',
        options: [
          { text: 'مدیریت هزاران اتصال شبکه بدون نیاز به ایجاد ترد‌های سنگین سیستم‌عامل (Non-blocking I/O)', isCorrect: true },
          { text: 'افزایش سرعت پردازش ریاضیات سنگین CPU', isCorrect: false }
        ],
        explanation: 'برنامه‌نویسی ناهمگام برای کارهای وابسته به ورودی/خروجی شبکه ایده‌آل است.'
      }
    },
    {
      id: 'it-3',
      titleFa: 'توسعه وب مدرن با React 19 و معماری هوک‌ها',
      titleEn: 'Modern React 19 Architecture, Hooks & Next.js Ecosystem',
      testType: 'coding',
      difficulty: 'پیشرفته',
      durationMinutes: 30,
      descriptionFa: 'سنجش بهینه‌سازی رندر، کامپوننت‌های سرور، هوک‌های کاستوم و هماهنگی با تان‌استک کوئری.',
      targetRoles: ['Senior React Developer', 'Frontend Architect', 'Lead Web Developer'],
      skillsCovered: ['React 19 Server Actions', 'Custom Hooks', 'Re-render Prevention'],
      sourceStandard: 'مرجع جهانی: Meta Certified Frontend Engineer & TestGorilla React',
      question: {
        title: 'هوک useTransition در ری‌اکت',
        text: 'هدف اصلی از هوک useTransition در React 18 و 19 چیست؟',
        options: [
          { text: 'علامت‌گذاری آپدیت‌های غیرفوری به عنوان Transition تا رابط کاربری در مواجهه با ورودی‌های مهم کاربر فریز نشود', isCorrect: true },
          { text: 'حرکت دادن انیمیشن‌های صفحه', isCorrect: false }
        ],
        explanation: 'این هوک اولویت رندر را به کارهای فوری کاربر می‌دهد.'
      }
    },
    {
      id: 'it-4',
      titleFa: 'پایگاه‌داده پیشرفته SQL، بهینه‌سازی کوئری و ایندکس‌گذاری',
      titleEn: 'Advanced SQL Query Tuning, Indexing & ACID Transactions',
      testType: 'role_specific',
      difficulty: 'متوسط',
      durationMinutes: 25,
      descriptionFa: 'ارزیابی توابع پنجره‌ای، پلن اجرایی کوئری، قفل‌های دیتابیس و پیشگیری از کندی جداول میلیونی.',
      targetRoles: ['Database Architect', 'Backend Lead', 'Data Engineer'],
      skillsCovered: ['Window Functions', 'Index Selectivity', 'Deadlock Mitigation'],
      sourceStandard: 'مرجع جهانی: PostgreSQL Professional Certification & HackerRank SQL',
      question: {
        title: 'تفاوت تابعی RANK() با DENSE_RANK() در SQL',
        text: 'اگر دو ردیف دارای نمره یکسان باشند، تابع RANK() ردیف بعدی را با چه عددی رتبه‌بندی می‌کند؟',
        options: [
          { text: 'فاصله می‌اندازد؛ مثلاً دو رتبه ۱ و رتبه بعدی ۳ خواهد بود', isCorrect: true },
          { text: 'فاصله نمی‌اندازد و رتبه ۲ را به ردیف بعدی می‌دهد', isCorrect: false }
        ],
        explanation: 'تابع RANK جایگاه‌های تکراری را در شماره‌گذاری‌های بعدی پرش می‌دهد.'
      }
    },
    {
      id: 'it-5',
      titleFa: 'امنیت سایبری کاربردی و اصول دفاعی OWASP Top 10',
      titleEn: 'Application Security Engineering & OWASP Vulnerabilities',
      testType: 'role_specific',
      difficulty: 'پیشرفته',
      durationMinutes: 25,
      descriptionFa: 'سنجش تکنیک‌های پیشگیری از تزریق SQL، مهار حملات CSRF و XSS و مدیریت امن توکن‌های JWT.',
      targetRoles: ['Application Security Engineer', 'Penetration Tester', 'DevSecOps Specialist'],
      skillsCovered: ['OWASP Top 10', 'JWT Hardening', 'Sanitization'],
      sourceStandard: 'مرجع جهانی: OWASP Standard & SANS Application Security',
      question: {
        title: 'روش امن جلوگیری از SQL Injection',
        text: 'مطمئن‌ترین شیوه کدنویسی برای جلوگیری قطعی از حملات SQL Injection چیست؟',
        options: [
          { text: 'استفاده از Prepared Statements و کوئری‌های پارامتریزه شده (Parameterized Queries)', isCorrect: true },
          { text: 'جایگزینی دستی کاراکتر کوتیشن با کدهای جاوااسکریپت', isCorrect: false }
        ],
        explanation: 'کوئری پارامتریزه مانع از تفسیر داده‌های ورودی به عنوان دستور اجرایی می‌شود.'
      }
    },
    {
      id: 'it-6',
      titleFa: 'معماری میکروسرویس و سیستم‌های کلودنیتیو (AWS Architecture)',
      titleEn: 'Microservices Design Patterns & Cloud Native Systems',
      testType: 'role_specific',
      difficulty: 'پیشرفته',
      durationMinutes: 30,
      descriptionFa: 'ارزیابی الگوهای Saga، سرورلس، ایونت‌دریون با Kafka، کلودفرانت و الگوهای Circuit Breaker.',
      targetRoles: ['Solutions Architect', 'Principal Engineer', 'Cloud Architect'],
      skillsCovered: ['Saga Distributed Transactions', 'Event-driven Architecture', 'Circuit Breakers'],
      sourceStandard: 'مرجع جهانی: AWS Certified Solutions Architect Professional',
      question: {
        title: 'الگوی Circuit Breaker در ارتباطات میکروسرویس',
        text: 'الگوی قطع مدار (Circuit Breaker) چه کمکی به پایداری سیستم می‌کند؟',
        options: [
          { text: 'در صورت خرابی یک سرویس وابسته، بلافاصله فراخوانی‌های بعدی را متوقف می‌کند تا کل شبکه دچار شکست آبشاری (Cascading Failure) نشود', isCorrect: true },
          { text: 'سیم‌های برق سرور را قطع می‌کند', isCorrect: false }
        ],
        explanation: 'الگوی Circuit Breaker مانع از مصرف بیهوده منابع در زمان خرابی سرویس‌های دیگر می‌شود.'
      }
    },
    {
      id: 'it-7',
      titleFa: 'دواپس: کانتینرسازی با Docker و مدیریت کلاستر Kubernetes',
      titleEn: 'DevOps: Docker Containerization & Kubernetes (CKA)',
      testType: 'role_specific',
      difficulty: 'متوسط',
      durationMinutes: 25,
      descriptionFa: 'ارزیابی بهینه‌سازی ایمیج‌های داکر، پیکربندی Ingress، مقیاس‌پذیری خودکار HPA و پایپ‌لاین‌های CI/CD.',
      targetRoles: ['DevOps Engineer', 'SRE Specialist', 'Infrastructure Lead'],
      skillsCovered: ['Docker Optimization', 'Kubernetes HPA', 'CI/CD Pipelines'],
      sourceStandard: 'مرجع جهانی: Linux Foundation CKA & CNCF Cloud Native Standards',
      question: {
        title: 'مقیاس‌پذیری خودکار پادها (HPA) در کوبرنتیز',
        text: 'سازوکار Horizontal Pod Autoscaler بر مبنای چه معیاری تعداد پادها را افزایش می‌دهد؟',
        options: [
          { text: 'مصرف پردازنده (CPU)، حافظه یا متریک‌های سفارشی نسبت به آستانه هدف تعیین‌شده', isCorrect: true },
          { text: 'دمای محیط اتاق سرور', isCorrect: false }
        ],
        explanation: 'مکانیزم HPA با رصد لایو متریک‌ها تعداد کپی‌های پاد را تنظیم می‌کند.'
      }
    },
    {
      id: 'it-8',
      titleFa: 'تایپ‌اسکریپت پیشرفته، تایپ‌های عمومی و الگوهای طراحی',
      titleEn: 'Advanced TypeScript: Generics, Mapped Types & Design Patterns',
      testType: 'coding',
      difficulty: 'پیشرفته',
      durationMinutes: 25,
      descriptionFa: 'سنجش ساختارهای Generic پیشرفته، Type Guards، Conditional Types و تایپ‌های ایمن در پروژه‌های بزرگ.',
      targetRoles: ['Senior Software Engineer', 'TypeScript Lead', 'Fullstack Developer'],
      skillsCovered: ['Conditional Types', 'Infer Keyword', 'Strict Null Checks'],
      sourceStandard: 'مرجع جهانی: Microsoft TypeScript Advanced Assessment',
      question: {
        title: 'کاربرد کلیدواژه infer در تایپ‌اسکریپت',
        text: 'کلیدواژه infer در تایپ‌های شرطی (Conditional Types) چه کاربردی دارد؟',
        options: [
          { text: 'استنتاج خودکار و استخراج نوع داده درونی یک تایپ دیگر (مانند خروجی پرامیس یا پارامتر تابع)', isCorrect: true },
          { text: 'کامپایل کد به زبان سی‌پلاس‌پلاس', isCorrect: false }
        ],
        explanation: 'کلیدواژه infer به برنامه‌نویس اجازه می‌دهد تایپ‌های درونی را استخراج نماید.'
      }
    },
    {
      id: 'it-9',
      titleFa: 'آزمون تست نرم‌افزار، TDD و تضمین کیفیت QA (ISTQB)',
      titleEn: 'Software QA Testing, Test-Driven Development & Automation',
      testType: 'role_specific',
      difficulty: 'متوسط',
      durationMinutes: 20,
      descriptionFa: 'ارزیابی هرم تست، نوشتن تست‌های واحد، تست یکپارچگی، ابزارهای Playwright/Cypress و تحلیل پوشش کد.',
      targetRoles: ['QA Engineer', 'Test Automation Lead', 'Software Developer in Test'],
      skillsCovered: ['Test Pyramid', 'End-to-End Testing', 'Mocking & Stubs'],
      sourceStandard: 'مرجع جهانی: ISTQB Certified Tester Advanced Level',
      question: {
        title: 'اصل هرم تست (Test Pyramid) در نرم‌افزار',
        text: 'طبق هرم تست مارتین فاولر، قاعده بهینه تقسیم تست‌ها چیست؟',
        options: [
          { text: 'بیشترین تعداد تست‌های واحد (Unit Tests) سریع، تست‌های کمتر یکپارچگی (Integration) و حداقل تعداد تست‌های سنگین E2E', isCorrect: true },
          { text: 'فقط نوشتن تست‌های دستی بدون تست خودکار', isCorrect: false }
        ],
        explanation: 'تست‌های واحد سریع‌تر و ارزان‌تر بوده و پایه محکم کیفیت نرم‌افزارند.'
      }
    },
    {
      id: 'it-10',
      titleFa: 'مهندسی داده، پایپ‌لاین‌های ETL و جریان‌های بلادرنگ (Kafka)',
      titleEn: 'Data Engineering, Real-Time Streaming & ETL Pipelines',
      testType: 'role_specific',
      difficulty: 'پیشرفته',
      durationMinutes: 25,
      descriptionFa: 'سنجش خطوط پردازش داده با Spark، پارتیشن‌بندی در Kafka، فرمت‌های ذخیره‌سازی Parquet و معماری دریاچه داده.',
      targetRoles: ['Data Engineer', 'Big Data Architect', 'Analytics Engineer'],
      skillsCovered: ['Data Partitioning', 'Stream Processing', 'Data Lakehouse Architecture'],
      sourceStandard: 'مرجع جهانی: Google Cloud Professional Data Engineer & Confluent Kafka',
      question: {
        title: 'مزیت فرمت‌های ستونی مانند Parquet در کلان‌داده',
        text: 'چرا در پایپ‌لاین‌های تحلیلی از فرمت فایل‌های ستونی (Columnar) استفاده می‌شود؟',
        options: [
          { text: 'فشرده‌سازی بسیار بالاتر و خواندن فقط ستون‌های مورد نیاز کوئری بدون خواندن کل فایل ردیف‌ها', isCorrect: true },
          { text: 'سازگاری مستقیم با نرم‌افزار مایکروسافت پینت', isCorrect: false }
        ],
        explanation: 'فرمت‌های ستونی حجم I/O خواندن دیسک را در کوئری‌های تحلیلی به شدت کاهش می‌دهند.'
      }
    }
  ],

  // For the remaining 15 categories, generate authentic global standard tests dynamically
  // Each category receives 10 tailored tests with authentic questions and sources!
  engineering_technical: [],
  health_medicine: [],
  finance_banking: [],
  sales_marketing: [],
  education_research: [],
  art_design_media: [],
  law_legal: [],
  hr_administration: [],
  construction_architecture: [],
  manufacturing_production: [],
  logistics_supply_chain: [],
  tourism_hospitality: [],
  agriculture_environment: [],
  basic_applied_sciences: [],
  public_social_services: []
};

// Specialized 10 tests blueprints for the other 15 categories
const OTHER_CATEGORIES_DATA: Record<string, {
  titleFa: string;
  titleEn: string;
  testType: TestType;
  difficulty: DifficultyLevel;
  sourceStandard: string;
  qTitle: string;
  qText: string;
  correct: string;
  wrong: string;
}[]> = {
  engineering_technical: [
    { titleFa: 'مهندسی صنایع و شش سیگما (ASQ Black Belt)', titleEn: 'Industrial Six Sigma & DMAIC Framework', testType: 'engineering_skills', difficulty: 'پیشرفته', sourceStandard: 'ASQ Six Sigma Black Belt', qTitle: 'سطح نقص در کیفیت ۶ سیگما', qText: 'یک فرآیند ۶ سیگما استاندارد حداکثر چند قطعه معیوب در هر میلیون فرصت (DPMO) تولید می‌کند؟', correct: 'حداکثر ۳.۴ نقص در میلیون فرصت', wrong: '۱۰۰۰ نقص در میلیون' },
    { titleFa: 'ایمنی، بهداشت و محیط‌زیست صنعتی (NEBOSH IGC)', titleEn: 'NEBOSH Industrial HSE & Safety Engineering', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'NEBOSH International General Certificate', qTitle: 'سلسله مراتب کنترل خطرات محیط کار', qText: 'موثرترین گام در سلسله مراتب کنترل خطرات ایمنی کدام است؟', correct: 'حذف کامل خطر از منبع (Elimination)', wrong: 'تنها پوشیدن کلاه ایمنی' },
    { titleFa: 'مهندسی مکانیک، طراحی اجزا و تحلیل تنش FEA', titleEn: 'Mechanical Design & Finite Element Analysis', testType: 'engineering_skills', difficulty: 'پیشرفته', sourceStandard: 'ASME Boiler and Pressure Vessel Code', qTitle: 'معیار تسلیم فون‌میزس در قطعات فلزی', qText: 'معیار شکست Von Mises برای چه موادی کاربرد دارد؟', correct: 'مواد شکل‌پذیر و فلزات نرم تحت تنش‌های چندمحوره', wrong: 'فقط شیشه و سرامیک شکننده' },
    { titleFa: 'اتوماسیون صنعتی، مانیتورینگ SCADA و شبکه Profinet', titleEn: 'SCADA Systems, Industrial Networks & DCS', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'ISA-95 Enterprise-Control Integration', qTitle: 'امنیت در شبکه‌های اسکادای صنعتی', qText: 'جداسازی شبکه IT از OT چه مزیتی دارد؟', correct: 'جلوگیری از نفوذ باج‌افزارها و بدافزارهای اداری به خطوط تولید حیاتی', wrong: 'کاهش سرعت ماشین‌آلات' },
    { titleFa: 'نگهداری و تعمیرات پیش‌بینانه و آنالیز ارتعاشات', titleEn: 'Predictive Maintenance & Vibration Analysis', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'ISO 17359 Condition Monitoring', qTitle: 'تشخیص عیب بیرینگ با فرکانس ارتعاش', qText: 'فرکانس‌های بالای ضربه‌ای در آنالیز ارتعاشات نشانه چیست؟', correct: 'خرابی و ترک‌های اولیه در رینگ یا ساچمه‌های بیرینگ', wrong: 'افزایش کیفیت روغن' },
    { titleFa: 'بهینه‌سازی مصرف انرژی و ممیزی حرارتی صنایع', titleEn: 'Industrial Energy Auditing & ISO 50001', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'ISO 50001 Energy Management Standard', qTitle: 'تله‌های بخار در بویلرهای صنعتی', qText: 'عملکرد صحیح تله بخار (Steam Trap) چه تاثیری دارد؟', correct: 'تخلیه آب مقطر بدون اجازه نشت بخار داغ پرانرژی', wrong: 'توقف کار بویلر' },
    { titleFa: 'مهندسی متالورژی، آزمون‌های غیرمخرب NDT و بازرسی جوش', titleEn: 'Metallurgy, Welding Inspection & NDT Standards', testType: 'engineering_skills', difficulty: 'پیشرفته', sourceStandard: 'ASNT Non-Destructive Testing Standards', qTitle: 'آزمون امواج فراصوت (UT) در ضخامت‌سنجی', qText: 'مزیت آزمون التراسونیک نسبت به رادیوگرافی چیست؟', correct: 'عدم وجود خطرات تشعشع و شناسایی عیوب صفحه‌ای در عمق جوش', wrong: 'نیازی به دستگاه ندارد' },
    { titleFa: 'مکاترونیک، رباتیک صنعتی و سیستم‌های کنترل موقعیت', titleEn: 'Industrial Robotics & Mechatronics Control', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'RIA Industrial Robot Safety Standard', qTitle: 'کالیبراسیون مختصات مرکز ابزار ربات (TCP)', qText: 'تعریف نقطه ابزار TCP در ربات‌های صنعتی چه کاربردی دارد؟', correct: 'تعیین موقعیت دقیق نوک ابزار متصل به بازو برای حرکت در مسیرهای سه‌بعدی', wrong: 'تنظیم صدای بوق ربات' },
    { titleFa: 'مهندسی شیمی: طراحی فرآیندها و برج‌های تقطیر', titleEn: 'Chemical Process Engineering & Distillation Design', testType: 'engineering_skills', difficulty: 'پیشرفته', sourceStandard: 'AIChE Process Safety Guidelines', qTitle: 'نسبت بازگشت (Reflux Ratio) در برج تقطیر', qText: 'افزایش نسبت بازگشت در برج تقطیر چه پیامدی دارد؟', correct: 'ارتقای خلوص محصول بالاسری همراه با افزایش بار حرارتی ریبویلر', wrong: 'تخلیه تمام مخازن' },
    { titleFa: 'سیستم‌های هیدرولیک و پنوماتیک صنعتی پیشرفته', titleEn: 'Advanced Industrial Hydraulics & Pneumatics', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'ISO 4413 Hydraulic Fluid Power Safety', qTitle: 'شیر فشارشکن (Relief Valve) هیدرولیک', qText: 'وظیفه شیر اطمینان فشار در مدار هیدرولیک چیست؟', correct: 'تخلیه روغن اضافی به باک در صورت فراتر رفتن فشار از حد ایمن مجاز', wrong: 'خنک کردن هوای کارگاه' }
  ],

  health_medicine: [
    { titleFa: 'تریاژ اورژانس و پروتکل‌های بالینی ESI', titleEn: 'Emergency Severity Index & Clinical Triage', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'AHRQ Emergency Severity Index Protocol', qTitle: 'تریاژ بیمار با تروما و شوک هموراژیک', qText: 'بیمار تصادفی با فشار خون ۷۰ روی ۴۰ و نبض تند در کدام سطح تریاژ قرار دارد؟', correct: 'سطح ۱ ESI (نیاز به احیای فوری برای نجات جان)', wrong: 'سطح ۴ غیرفوری' },
    { titleFa: 'داروشناسی بالینی و مدیریت داروهای پرخطر', titleEn: 'High-Alert Medications & Dosage Calculation', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'ISMP Safe Medication Practices', qTitle: 'تزریق وریدی پتاسیم کلراید تغلیظ‌شده', qText: 'قانون ایمنی تزریق پتاسیم غلیظ چیست؟', correct: 'هرگز نباید به صورت بولوس یا مستقیم تزریق شود؛ حتماً باید رقیق‌شده و با پمپ اینفیوژن تزریق گردد', wrong: 'تزریق سریع عضلانی' },
    { titleFa: 'کنترل عفونت‌های بیمارستانی و بهداشت درمان', titleEn: 'Infection Prevention & Hospital Hygiene (WHO)', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'WHO Infection Prevention and Control Standard', qTitle: 'جداسازی بیماران مبتلا به سل ریوی', qText: 'نوع اتاق ایزوله برای بیمار مسلول چیست؟', correct: 'اتاق با فشار منفی هوا (Airborne Isolation Room) و استفاده از ماسک N95', wrong: 'اتاق بدون هیچ تهویه‌ای' },
    { titleFa: 'احیای قلبی ریوی پیشرفته بزرگسالان (ACLS)', titleEn: 'Advanced Cardiovascular Life Support (ACLS)', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'American Heart Association ACLS 2025', qTitle: 'ریتم‌های شوک‌پذیر در ایست قلبی', qText: 'کدام ریتم‌ها نیازمند دفیبریلاسیون فوری الکتریکی هستند؟', correct: 'فیبریلاسیون بطنی (VF) و تاکی‌کاردی بطنی بدون نبض (pVT)', wrong: 'آسیستول کامل (خط صاف)' },
    { titleFa: 'اهداف بین‌المللی ایمنی بیمار (JCI IPSG)', titleEn: 'International Patient Safety Goals Standards', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Joint Commission International Standards', qTitle: 'پیشگیری از جراحی در محل اشتباه', qText: 'فرآیند Time-Out پیش از برش جراحی شامل چیست؟', correct: 'توقف کل تیم برای تایید شفاهی هویت بیمار، نوع عمل و علامت‌گذاری محل صحیح جراحی', wrong: 'خاموش کردن لامپ اتاق عمل' },
    { titleFa: 'پرونده الکترونیک سلامت و استانداردهای محرمانگی', titleEn: 'Electronic Health Records & Patient Privacy', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'HIPAA Health Data Privacy & Security', qTitle: 'به اشتراک‌گذاری داده‌های بیمار در شبکه', qText: 'دسترسی به پرونده بیمار باید بر چه اساسی تنظیم شود؟', correct: 'اصل نیاز به دانستن (Need-to-Know) متناسب با نقش مستقیم مراقبت بالینی', wrong: 'دسترسی عمومی تمام پرسنل بیمارستان' },
    { titleFa: 'مراقبت‌های ویژه بالینی بخش ICU و تهویه مکانیکی', titleEn: 'Intensive Care Nursing & Mechanical Ventilation', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'SCCM Critical Care Medicine Guidelines', qTitle: 'پیشگیری از پنومونی ناشی از ونتیلاتور (VAP)', qText: 'اقدام اثربخش در پروتکل VAP Bundle کدام است؟', correct: 'بالا بردن سر تخت بین ۳۰ تا ۴۵ درجه و رعایت بهداشت دهان با دهان‌شویه کلرهگزیدین', wrong: 'خواباندن کاملاً افقی بیمار' },
    { titleFa: 'تفسیر نوار قلب (ECG) و آریتمی‌های اورژانس', titleEn: 'Clinical Electrocardiogram Interpretation', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'Clinical Cardiology Society ECG Protocol', qTitle: 'نشانه سکته حاد قلبی در لیدهای قدامی', qText: 'افزایش قطعه ST (ST Elevation) در لیدهای V1 تا V4 نشانه چیست؟', correct: 'انفارکتوس حاد میوکارد قدامی (Anterior STEMI)', wrong: 'عفونت ساده گلو' },
    { titleFa: 'تریاژ و احیای پیشرفته کودکان (PALS)', titleEn: 'Pediatric Advanced Life Support Standards', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'AHA Pediatric Advanced Life Support', qTitle: 'بررسی نبض در نوزادان در شرایط اورژانس', qText: 'محل بررسی نبض در نوزاد بدون هوشیاری کجاست؟', correct: 'شریان براکیال (Brachial) در قسمت داخلی بازو', wrong: 'شریان کاروتید گردن' },
    { titleFa: 'مدیریت بحران‌های بیوتروریسم و تریاژ پرتویی بیمارستانی', titleEn: 'Hospital Disaster Response & Radiation Triage', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'HICS Hospital Incident Command System', qTitle: 'رفع آلودگی اولیه مصدومان حوادث شیمیایی', qText: 'اولین اقدام خارج از فضای اورژانس برای مصدوم شیمیایی چیست؟', correct: 'خارج کردن لباس‌ها و شستشوی کامل با آب فراوان در ایستگاه تریاژ آلودگی‌زدایی', wrong: 'انتقال مستقیم به بخش بستری' }
  ],

  finance_banking: [
    { titleFa: 'تحلیل صورت‌های مالی پیشرفته و نسبت‌های مالی (CFA)', titleEn: 'CFA Financial Reporting & Statement Analysis', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'CFA Institute Curriculum Level I & II', qTitle: 'کیفیت سود و اقلام تعهدی اختیاری', qText: 'افزایش مداوم اقلام تعهدی نسبت به جریان نقد عملیاتی نشانه چیست؟', correct: 'پایین بودن کیفیت سود و احتمال دستکاری در شناسایی درآمدهای آتی', wrong: 'افزایش سلامت مالی' },
    { titleFa: 'استانداردهای بین‌المللی حسابداری IFRS و گزارشگری', titleEn: 'International Financial Reporting Standards (IFRS)', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'IFRS Foundation & ACCA DipIFR', qTitle: 'استاندارد IFRS 16 در خصوص قراردادهای اجاره', qText: 'طبق IFRS 16، مستاجر قراردادهای اجاره عملیاتی بلندمدت را چگونه شناسایی می‌کند؟', correct: 'به عنوان دارایی حق استفاده (ROU Asset) و بدهی اجاره متناظر در ترازنامه', wrong: 'فقط به عنوان هزینه در صورت سود و زیان' },
    { titleFa: 'مدیریت ریسک‌های مالی، بازار و اعتباری (FRM)', titleEn: 'Financial Risk Management (FRM Standard)', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'GARP Financial Risk Manager Standard', qTitle: 'محاسبه ارزش در معرض ریسک (VaR)', qText: 'معیار VaR در سطح اطمینان ۹۵٪ روزانه به چه معناست؟', correct: 'در ۹۵٪ روزها حداکثر زیان از مبلغ محاسبه‌شده تجاوز نخواهد کرد', wrong: 'سود حتمی شرکت' },
    { titleFa: 'بودجه‌ریزی سرمایه‌ای، NPV و مدل‌سازی جریان نقد', titleEn: 'Capital Budgeting, DCF Valuation & IRR', testType: 'problem_solving', difficulty: 'متوسط', sourceStandard: 'CMA Corporate Finance Standard', qTitle: 'تفاوت جریان نقد آزاد سهامداران با شرکت', qText: 'جریان نقد آزاد حقوق صاحبان سهام (FCFE) چگونه محاسبه می‌شود؟', correct: 'FCFF منهای خالص پرداخت اصل بدهی‌ها و بهره پس از کسر مالیات', wrong: 'فروش روزانه ضربدر سود' },
    { titleFa: 'مبارزه با پولشویی و انطباق بانکی (ACAMS AML)', titleEn: 'Anti-Money Laundering & Banking Compliance', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'ACAMS Anti-Money Laundering Certification', qTitle: 'مراحل سه‌گانه پولشویی', qText: 'مراحل استاندارد پولشویی به چه ترتیبی است؟', correct: 'جای‌گذاری (Placement) -> لایه‌بندی (Layering) -> یکپارچه‌سازی (Integration)', wrong: 'واریز -> برداشت -> خرید' },
    { titleFa: 'تحلیل بنیادی و ارزش‌گذاری سهام (Equity Valuation)', titleEn: 'Equity Valuation: Discounted Cash Flow & Multiples', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'NYU Stern Damodaran Valuation Model', qTitle: 'ضریب قیمت به سود (P/E) پیش‌نگر', qText: 'P/E بالا برای یک شرکت رشدی معمولاً بیانگر چیست؟', correct: 'انتظارات بالای بازار برای رشد سودآوری آتی شرکت', wrong: 'ورشکستگی حتمی' },
    { titleFa: 'حسابرسی داخلی و کنترل‌های داخلی COSO', titleEn: 'Internal Auditing & COSO Enterprise Risk', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'IIA International Internal Audit Standards', qTitle: 'تفکیک وظایف متعارض (Segregation of Duties)', qText: 'کدام دو وظیفه نباید هرگز بر عهده یک فرد واحد باشد؟', correct: 'نگهداری فیزیکی دارایی و ثبت اسناد حسابداری آن دارایی', wrong: 'سلام دادن و نشستن پشت میز' },
    { titleFa: 'مدل‌سازی مالی پیشرفته و اکسل برای بانکداری سرمایه‌گذاری', titleEn: 'Advanced Financial Modeling for Investment Banking', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'Wall Street Prep Financial Modeling', qTitle: 'محاسبه میانگین موزون هزینه سرمایه (WACC)', qText: 'چرا هزینه بدهی در فرمول WACC در (۱ منهای نرخ مالیات) ضرب می‌شود؟', correct: 'زیرا هزینه‌های بهره وام از درآمد مشمول مالیات کسر شده و سپر مالیاتی ایجاد می‌کند', wrong: 'برای افزایش سود دولت' },
    { titleFa: 'اعتبارسنجی تسهیلات شرکتی و تحلیل مدل 5Cs اعتباری', titleEn: 'Corporate Lending, Credit Analysis & 5Cs Model', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Risk Management Association Credit Standards', qTitle: 'شاخص پوشش خدمت بدهی (DSCR)', qText: 'شاخص DSCR بزرگتر از ۱.۲۵ نشان‌دهنده چیست؟', correct: 'درآمد عملیاتی شرکت برای پرداخت اقساط و بهره بدهی‌ها در سررسید کافی است', wrong: 'شرکت بدهی ندارد' },
    { titleFa: 'مالیات بر ارزش افزوده و استانداردهای حسابداری مالیاتی', titleEn: 'Corporate Taxation & VAT Accounting Standards', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'National Tax Compliance & OECD VAT/GST', qTitle: 'اعتبار مالیاتی در مالیات بر ارزش افزوده', qText: 'مالیات پرداختی بابت خرید مواد اولیه (مالیات خرید) چگونه محاسبه می‌شود؟', correct: 'از مالیات دریافتی از مشتریان نهایی کسر شده و مابه‌التفاوت به سازمان مالیاتی واریز می‌گردد', wrong: 'به عنوان هزینه جاری سوخت می‌شود' }
  ],

  sales_marketing: [
    { titleFa: 'استراتژی مذاکره فروش سازمانی B2B و متدولوژی SPIN', titleEn: 'B2B Sales Negotiation & SPIN Discovery Method', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Huthwaite International SPIN Selling', qTitle: 'پرسش‌های بازده و ارزش در فروش B2B', qText: 'هدف از سوالات Need-Payoff در روش SPIN چیست؟', correct: 'هدایت مشتری به این که خودش ارزش و منافع حل مشکل را بیان کند', wrong: 'تحقیر رقیب' },
    { titleFa: 'دیجیتال مارکتینگ، بهینه‌سازی سئو و بازاریابی محتوایی', titleEn: 'Digital Marketing, SEO & Inbound Content Funnel', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'HubSpot Inbound & Google Search Central', qTitle: 'معماری محتوایی تاپیک کلاستر (Topic Cluster)', qText: 'هدف از ساخت صفحات Pillar Page همراه با زیرمجموعه‌های کلاستر چیست؟', correct: 'ایجاد مرجعیت موضوعی عمیق برای موتورهای جستجو و تقویت رتبه صفحات کلیدی', wrong: 'نوشتن متن‌های طولانی بدون لینک' },
    { titleFa: 'مدیریت ارتباط با مشتری CRM و بهینه‌سازی قیف فروش', titleEn: 'CRM Pipeline Management & Lead Velocity', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Salesforce Certified Administrator', qTitle: 'شاخص نرخ سرعت لید (Lead Velocity Rate)', qText: 'معیار LVR چه متغیری را ارزیابی می‌کند؟', correct: 'نرخ رشد ماهانه تعداد لیدهای واجد شرایط در مرحله ورودی قیف فروش', wrong: 'تعداد کلیک روی بنر' },
    { titleFa: 'استراتژی‌های قیمت‌گذاری مبتنی بر ارزش (Value Pricing)', titleEn: 'Value-Based Pricing & Monetization Strategy', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'Simon-Kucher Pricing Strategies', qTitle: 'قیمت‌گذاری مبتنی بر ارزش در برابر هزینه به‌علاوه سود', qText: 'مزیت قیمت‌گذاری مبتنی بر ارزش نسبت به Cost-Plus چیست؟', correct: 'بهره‌برداری کامل از تمایل به پرداخت مشتری (Willingness to Pay) بدون وابستگی به هزینه تولید', wrong: 'ارزان‌فروشی برای حذف رقبا' },
    { titleFa: 'کپی‌رایتینگ ترغیب‌کننده و نگارش لندینگ‌پیج‌های پرتبدیل', titleEn: 'Persuasive Copywriting & High-Converting Pages', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'AWAI Direct Response Copywriting', qTitle: 'فرمول کپی‌رایتینگ PAS (Problem, Agitate, Solve)', qText: 'در ساختار PAS مرحله Agitate چه نقشی دارد؟', correct: 'تشریح پیامدهای مالی و احساسی عدم حل مشکل تا نیاز به اقدام فوری حس شود', wrong: 'توضیح رزومه مدیرعامل' },
    { titleFa: 'تحلیل رفتار مصرف‌کننده و بخش‌بندی بازار (Segmentation)', titleEn: 'Consumer Behavior & Market Segmentation', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Kotler & Keller Marketing Management', qTitle: 'بخش‌بندی رفتاری (Behavioral Segmentation)', qText: 'کدام فاکتور در بخش‌بندی رفتاری بازار ملاک قرار می‌گیرد؟', correct: 'نرخ مصرف، الگوهای خرید مجدد و منافع مورد انتظار مشتری', wrong: 'فقط کدپستی محل سکونت' },
    { titleFa: 'مدیریت کمپین‌های تبلیغاتی عملکردی (Performance Marketing)', titleEn: 'Performance Marketing & ROAS Optimization', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'Google Ads & Meta Performance Marketing', qTitle: 'محاسبه نرخ بازگشت هزینه تبلیغات (ROAS)', qText: 'اگر با هزینه تبلیغاتی ۱۰ میلیون تومانی، ۶۰ میلیون تومان فروش مستقیم ایجاد شود، ROAS چقدر است؟', correct: '۶ یا ۶۰۰ درصد بازگشت سرمایه تبلیغات', wrong: '۰.۶ درصد' },
    { titleFa: 'مدیریت ارزش ویژه برند و جایگاه‌یابی رقابتی', titleEn: 'Brand Equity, Positioning & Brand Architecture', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Aaker Brand Equity Model & Interbrand', qTitle: 'نقاط برابری در برابر نقاط تمایز برند (POP vs POD)', qText: 'نقاط برابری (Points of Parity) در جایگاه‌یابی برند چه مفهومی دارند؟', correct: 'ویژگی‌هایی که برای معتبر شناخته شدن برند در آن دسته محصول الزامی هستند', wrong: 'لوگوی مشابه داشتن' },
    { titleFa: 'مدیریت حساب‌های کلیدی مشتریان بزرگ (Key Account)', titleEn: 'Key Account Management (KAM Standard)', testType: 'situational_judgment', difficulty: 'پیشرفته', sourceStandard: 'Strategic Account Management Association (SAMA)', qTitle: 'حفظ مشتری سازمانی پس از تعویض مدیر خرید', qText: 'هنگام ورود مدیر جدید خرید در یک مشتری کلیدی، اولین گام KAM چیست؟', correct: 'برگزاری جلسه حضوری برای درک اهداف فردی و سازمانی مدیر جدید و ارائه گزارش ارزش افزوده دوره قبل', wrong: 'قطع تماس تا انتهای قرارداد' },
    { titleFa: 'هک رشد، ویروسی‌شدن و بهینه‌سازی نرخ تبدیل (CRO)', titleEn: 'Growth Hacking, Viral Loops & CRO Testing', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'Reforge Growth Series Standards', qTitle: 'ضریب ویروسی بودن محصول (K-Factor)', qText: 'اگر هر کاربر جدید به طور میانگین ۱.۵ کاربر دیگر را دعوت کند (K>1)، رشد چگونه خواهد بود؟', correct: 'رشد تصاعدی و ارگانیک ویروسی (Exponential Viral Growth)', wrong: 'رشد خطی کند' }
  ],

  education_research: [
    { titleFa: 'طراحی آموزشی سیستماتیک و مدل ADDIE', titleEn: 'ADDIE Instructional Design Framework', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Association for Educational Communications AECT', qTitle: 'مرحله تحلیل (Analysis) در مدل ADDIE', qText: 'خروجی فاز تحلیل در طراحی دوره آموزشی چیست؟', correct: 'شناسایی نیازهای واقعی فراگیران، پیش‌دانسته‌ها و شکاف‌های دانشی', wrong: 'چاپ کتاب درسی' },
    { titleFa: 'روش‌های ارزیابی یادگیری و تاکسونومی شناختی بلوم', titleEn: 'Bloom’s Cognitive Taxonomy & Assessment Design', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Bloom’s Revised Taxonomy Framework', qTitle: 'سوالات سطح آفرینش (Create) در بلوم', qText: 'کدام فعالیت مربوط به بالاترین سطح بلوم (Create) است؟', correct: 'طراحی یک پروتکل جدید آزمایشگاهی برای رفع یک نقص صنعتی', wrong: 'حفظ کردن تعاریف کتاب' },
    { titleFa: 'روش تحقیق پیشرفته، تحلیل داده‌ها و آمار با SPSS/R', titleEn: 'Quantitative Research Methods & SPSS Analysis', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'APA Research Methodology Guidelines', qTitle: 'تحلیل واریانس یک‌طرفه (One-Way ANOVA)', qText: 'آزمون ANOVA برای چه زمانی استفاده می‌شود؟', correct: 'مقایسه همزمان میانگین ۳ گروه مستقل یا بیشتر', wrong: 'فقط برای دو نفر' },
    { titleFa: 'مدیریت کلاس درس، یادگیری مشارکتی و حل تعارض', titleEn: 'Classroom Management & Active Collaborative Learning', testType: 'situational_judgment', difficulty: 'متوسط', sourceStandard: 'Marzano Classroom Management Standards', qTitle: 'حل تعارض در کارهای تیمی دانشجویان', qText: 'اگر در پروژه گروهی یکی از دانشجویان مشارکت نکند، اقدام استاد چیست؟', correct: 'تعیین نقش‌های شفاف با چک‌لیست ارزیابی همتایان (Peer Review) همراه با منتورینگ تیمی', wrong: 'صفر دادن به کل گروه' },
    { titleFa: 'طراحی دوره‌های یادگیری الکترونیکی و ابزارهای EdTech', titleEn: 'E-Learning Authoring, SCORM & LMS Architecture', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'ADL SCORM & xAPI Learning Standards', qTitle: 'استاندارد پکیج آموزشی SCORM', qText: 'مزیت استاندارد SCORM در سیستم‌های مدیریت یادگیری LMS چیست؟', correct: 'قابلیت ردیابی پیشرفت، نمرات و سازگاری محتوا با انواع LMS', wrong: 'کاهش کیفیت ویدیو' },
    { titleFa: 'طراحی فراگیر آموزش (Universal Design for Learning - UDL)', titleEn: 'Universal Design for Learning (UDL Guidelines)', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'CAST Universal Design for Learning', qTitle: 'اصل ارائه‌های چندگانه (Multiple Means of Representation)', qText: 'اصل اول UDL چگونه پیاده می‌شود؟', correct: 'ارائه مفاهیم در قالب متن، صوت، دیاگرام و ویدیو برای سبک‌های یادگیری متفاوت', wrong: 'تنها روخوانی از روی کتاب' },
    { titleFa: 'متدولوژی پژوهش کیفی و نظریه داده‌بنیاد (Grounded Theory)', titleEn: 'Qualitative Research & Grounded Theory Coding', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'Creswell Qualitative Inquiry Standards', qTitle: 'کدگذاری نظری در گراندد تئوری', qText: 'اشباع نظری (Theoretical Saturation) در مصاحبه‌های کیفی چه معنایی دارد؟', correct: 'نقطه‌ای که مصاحبه‌های جدید هیچ داده یا بعد مفهومی جدیدی اضافه نمی‌کنند', wrong: 'خسته شدن پژوهشگر' },
    { titleFa: 'نگارش مقالات علمی، اخلاق نشر و داوری همتا (Peer Review)', titleEn: 'Academic Writing, COPE Ethics & Journal Publishing', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'Committee on Publication Ethics (COPE)', qTitle: 'سرقت علمی و بازنویسی بدون ارجاع (Plagiarism)', qText: 'تعریف دقیق پلاجریسم چیست؟', correct: 'استفاده از ایده‌ها یا عبارات دیگران بدون استناددهی شفاف به منبع اصلی', wrong: 'چاپ مقاله در ژورنال معتبر' },
    { titleFa: 'مشاوره شغلی، هدایت تحصیلی و مدل کدهای هالند (RIASEC)', titleEn: 'Career Guidance, Holland RIASEC & Student Counseling', testType: 'personality_culture', difficulty: 'مقدماتی', sourceStandard: 'National Career Development Association NCDA', qTitle: 'تیپ واقع‌گرا (Realistic) در مدل هالند', qText: 'فرد با تیپ غالب Realistic به چه فعالیت‌هایی گرایش دارد؟', correct: 'کار با ابزارها، ماشین‌آلات، مهندسی کاربردی و فعالیت‌های ملموس عملی', wrong: 'فقط شعر گفتن' },
    { titleFa: 'ارزیابی صلاحیت اساتید و مربی‌گری معلمان (Mentoring)', titleEn: 'Faculty Evaluation & Teacher Mentorship Standards', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Danielson Framework for Teaching', qTitle: 'بازخورد سازنده پس از مشاهده تدریس', qText: 'رویکرد منتور در جلسه بازخورد به معلم چگونه باید باشد؟', correct: 'تحلیل شواهد عینی تعامل دانش‌آموزان و پرسشگری تاملی به جای قضاوت دستوری', wrong: 'سرزنش معلم جلوی مدیر' }
  ],

  art_design_media: [
    { titleFa: 'طراحی رابط و تجربه کاربری UI/UX (Nielsen Norman)', titleEn: 'UI/UX Design, Heuristic Evaluation & Usability', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Nielsen Norman Group Usability Standards', qTitle: 'اصل پیشگیری از خطا در اصول نیلسن', qText: 'طبق اصل Error Prevention نیلسن، طراحی بهینه فرم‌ها چگونه است؟', correct: 'حذف شرایط مستعد خطا یا درخواست تایید برای اقدامات غیرقابل بازگشت', wrong: 'نمایش پیام خطای قرمز طولانی' },
    { titleFa: 'استانداردهای دسترسی‌پذیری وب (W3C WCAG 2.2)', titleEn: 'Web Accessibility Guidelines (W3C WCAG 2.2)', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'W3C Web Accessibility Initiative', qTitle: 'ناوبری با کیبورد و Focus Indicator', qText: 'چرا حفظ کادر فوکوس (Focus Ring) در المان‌های وب ضروری است؟', correct: 'تا کاربران نابینا یا دارای محدودیت حرکتی محل فعلی انتخاب را به وضوح تشخیص دهند', wrong: 'برای زیباتر کردن صفحه' },
    { titleFa: 'سیستم‌های طراحی مدرن و توکن‌های طراحی در فیگما', titleEn: 'Design Systems Architecture & Design Tokens', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'Figma Design System Best Practices', qTitle: 'کاربرد توکن‌های طراحی (Design Tokens)', qText: 'مزیت استفاده از توکن‌های طراحی در سیستم چیست؟', correct: 'همگام‌سازی ارزش‌های طراحی (رنگ، سایز، فونت) بین فیگما و کدهای فرانت‌اند بدون خطای دستی', wrong: 'حذف نیاز به طراح' },
    { titleFa: 'تایپوگرافی دیزاین، شبکه‌بندی گرید و سلسله‌مراتب بصری', titleEn: 'Digital Typography, Modular Grids & Layout', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Swiss Style & International Typographic Style', qTitle: 'طول سطر خوانا (Line Measure) در وب', qText: 'طول سطر بهینه برای خوانایی راحت چشم در متون فارسی و انگلیسی چند کاراکتر است؟', correct: 'بین ۵۰ تا ۷۵ کاراکتر در هر سطر', wrong: '۵۰۰ کاراکتر در یک خط طولانی' },
    { titleFa: 'روانشناسی گشتالت در طراحی بصری و ادراک مخاطب', titleEn: 'Gestalt Principles in Visual Product Design', testType: 'problem_solving', difficulty: 'متوسط', sourceStandard: 'Interaction Design Foundation Gestalt Principles', qTitle: 'اصل مجاورت (Proximity) در چیدمان المان‌ها', qText: 'اصل مجاورت چه رابطه‌ای بین المان‌ها ایجاد می‌کند؟', correct: 'المان‌هایی که در فاصله نزدیک‌تری به یکدیگر قرار دارند به عنوان یک گروه واحد درک می‌شوند', wrong: 'همه المان‌ها باید پراکنده باشند' },
    { titleFa: 'موشن گرافیک و اصول دوازده‌گانه انیمیشن دیزنی', titleEn: 'Motion Design & The 12 Principles of Animation', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Disney Animation & Adobe After Effects Pro', qTitle: 'اصل شتاب‌گیری و کاهش سرعت (Ease In & Ease Out)', qText: 'چرا حرکات رابط کاربری با منحنی‌های Cubic Bezier انیمیت می‌شوند؟', correct: 'شبیه‌سازی فیزیک طبیعی جهان واقعی و حذف حس مکانیکی و خشک حرکت', wrong: 'برای مصرف بیشتر باتری' },
    { titleFa: 'داستان‌سرایی برند و هویت بصری یکپارچه', titleEn: 'Brand Storytelling & Comprehensive Visual Identity', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Brand Identity Design Handbook', qTitle: 'کتابچه راهنمای برند (Brand Guidelines)', qText: 'هدف از تدوین دفترچه راهنمای هویت بصری چیست؟', correct: 'تضمین سازگاری کاربرد لوگو، پالت رنگ، لحن و فونت در تمام رسانه‌ها و بسترهای فیزیکی و دیجیتال', wrong: 'پنهان کردن اسرار شرکت' },
    { titleFa: 'طراحی پروتوتایپ تعاملی و تست کاربردپذیری با کاربران', titleEn: 'Interactive Prototyping & User Testing Protocol', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Usability.gov User Research Guidelines', qTitle: 'تکنیک تفکر با صدای بلند (Think Aloud)', qText: 'چرا در تست کاربردپذیری از کاربر می‌خواهیم افکار خود را بیان کند؟', correct: 'کشف ابهامات ذهنی، سردرگمی‌ها و مدل ذهنی کاربر هنگام انجام وظایف در اپلیکیشن', wrong: 'برای سرگرم کردن طراح' },
    { titleFa: 'عکاسی تبلیغاتی و مدیریت رنگ (Color Management)', titleEn: 'Commercial Product Photography & Color Spaces', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'ICC International Color Consortium Standards', qTitle: 'فضای رنگی sRGB در برابر Adobe RGB', qText: 'چرا خروجی وبسایت‌ها باید حتماً در فضای sRGB ذخیره شود؟', correct: 'سازگاری یکپارچه با اکثر نمایشگرهای مصرف‌کنندگان و عدم تغییر غیرواقعی رنگ‌ها در مرورگر', wrong: 'sRGB رنگ‌ها را سیاه سفید می‌کند' },
    { titleFa: 'تولید پادکست، صداگذاری رسانه‌ای و ویرایش صدا', titleEn: 'Podcast Production, Sound Design & Audio Mastering', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'EBU R128 Loudness Standards', qTitle: 'سطح بلندی صدا (Loudness LUFS) در پادکست', qText: 'استاندارد بلندی صدا برای پلتفرم‌های پخش پادکست معمولاً چقدر است؟', correct: 'حدود منفی ۱۶ تا منفی ۱۴ LUFS یکپارچه', wrong: 'مثبت ۱۰ دسی‌بل' }
  ],

  law_legal: [
    { titleFa: 'حقوق قراردادهای تجاری و اصول تنظیم شروط الزام‌آور', titleEn: 'Commercial Contract Drafting & Governing Clauses', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'ICC Model Commercial Contracts & Civil Code', qTitle: 'بند عدم اسقاط حق (Non-Waiver Clause)', qText: 'درج شرط Non-Waiver در قرارداد تجاری چه فایده‌ای دارد؟', correct: 'تاخیر در پیگیری یک تخلف توسط یک طرف، به عنوان چشم‌پوشی از سایر حقوق قانونی وی تلقی نمی‌شود', wrong: 'لغو قرارداد در همان لحظه' },
    { titleFa: 'مالکیت فکری، حق اختراع و اسرار تجاری (WIPO)', titleEn: 'Intellectual Property, Patents & Trade Secrets', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'WIPO Intellectual Property Handbook', qTitle: 'سه شرط ثبت اختراع (Patentability)', qText: 'سه شرط اساسی برای ثبت اختراع طبق قوانین وایپو کدامند؟', correct: 'جدید بودن (Novelty)، گام ابتکاری (Inventive Step) و کاربرد صنعتی (Industrial Applicability)', wrong: 'گران بودن، بزرگ بودن و تبلیغات تلویزیونی' },
    { titleFa: 'قانون کار، ایمنی محیط کار و روابط کارگر و کارفرما', titleEn: 'Labor Law, Workplace Safety & Employee Relations', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'ILO Core Conventions & Labor Law', qTitle: 'ابطال قرارداد موقت و تبدیل به دائم', qText: 'در کارهایی که طبیعت آن‌ها جنبه مستمر دارد و مدتی در قرارداد ذکر نشده باشد، قرارداد چه حکمی دارد؟', correct: 'قرارداد دائمی تلقی می‌شود', wrong: 'قرارداد خودبه‌خود باطل است' },
    { titleFa: 'انطباق مقرراتی، مبارزه با فساد و سیستم سوت‌زنی', titleEn: 'Corporate Compliance, Anti-Corruption & Whistleblowing', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'ISO 37001 Anti-Bribery Management Systems', qTitle: 'حفاظت از گزارش‌دهنده تخلف (Whistleblower)', qText: 'سیاست موثر حمایت از افشاگران تخلفات سازمانی شامل چیست؟', correct: 'کانال گزارش‌دهی کاملاً امن و محرمانه بدون ترس از اقدامات تلافی‌جویانه یا اخراج', wrong: 'انتشار نام افشاگر در تابلوی اعلانات' },
    { titleFa: 'داوری بین‌المللی تجاری و حل و فصل اختلافات (UNCITRAL)', titleEn: 'International Commercial Arbitration & UNCITRAL Rules', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'UNCITRAL Model Law on Commercial Arbitration', qTitle: 'استقلال شرط داوری (Doctrine of Separability)', qText: 'اصل استقلال شرط داوری از متن اصلی قرارداد به چه معناست؟', correct: 'حتی در صورت ادعای بطلان کل قرارداد، شرط داوری به قوت خود باقی است و داور صلاحیت رسیدگی دارد', wrong: 'داور باید از دادگاه اجازه بگیرد' },
    { titleFa: 'حقوق حریم خصوصی، امنیت داده‌ها و مقررات GDPR', titleEn: 'Data Privacy Regulations, GDPR & Cyber Law', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'EU General Data Protection Regulation GDPR', qTitle: 'حق فراموشی (Right to be Forgotten) در GDPR', qText: 'حق پاک‌سازی داده‌ها چه الزامی بر دوش شرکت‌ها می‌گذارد؟', correct: 'امکان حذف کامل و بدون تاخیر داده‌های شخصی کاربر در صورت درخواست وی و نبود الزام قانونی نگهداری', wrong: 'فروش داده‌ها به دیگران' },
    { titleFa: 'حقوق شرکت‌های تجاری، ادغام و تملک M&A', titleEn: 'Corporate Law, Due Diligence & M&A Transactions', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'Corporate Governance & Due Diligence Standards', qTitle: 'ارزیابی موشکافانه حقوقی (Legal Due Diligence)', qText: 'هدف از اجرای Due Diligence پیش از خرید سهام یک شرکت چیست؟', correct: 'شناسایی دعاوی حقوقی معلق، بدهی‌های پنهان، تعهدات مالیاتی و اعتبارسنجی مالکیت دارایی‌ها', wrong: 'تغییر نام مدیران شرکت' },
    { titleFa: 'حقوق تجارت بین‌الملل، اسناد اعتباری و اینکوترمز ۲۰۲۰', titleEn: 'International Trade Law, Letters of Credit & Incoterms', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'ICC Uniform Customs and Practice (UCP 600)', qTitle: 'اصل استقلال اعتبارات اسنادی (LC)', qText: 'قاعده بنیادین اعتبارات اسنادی در پرداخت بانکی چیست؟', correct: 'بانک‌ها صرفاً با اسناد حمل مطابقت داده و به روابط واقعی کالایی میان خریدار و فروشنده ورود نمی‌کنند', wrong: 'بانک باید محموله کشتی را بازرسی فیزیکی کند' },
    { titleFa: 'حقوق مناقصات، قراردادهای پیمانکاری فیدیک (FIDIC)', titleEn: 'FIDIC Engineering Contracts & Tender Law', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'FIDIC Conditions of Contract (Red/Yellow Book)', qTitle: 'نقش مهندس مشاور (The Engineer) در فیدیک', qText: 'وظیفه مهندس مشاور در حل ادعاهای پیمانکار چیست؟', correct: 'ارزیابی مستقل، بی‌طرفانه و مستند بر مبنای قرارداد بدون جانبداری ناعادلانه از کارفرما', wrong: 'رد کردن تمام ادعاهای پیمانکار بدون بررسی' },
    { titleFa: 'نگارش لوایح حقوقی، اصول دادخواست و دادرسی منصفانه', titleEn: 'Legal Brief Drafting, Civil Procedure & Due Process', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Civil Procedure Guidelines & Court Advocacy', qTitle: 'بار اثبات دعوا (Burden of Proof)', qText: 'در دعاوی مدنی بار اثبات ادعا بر عهده چه کسی است؟', correct: 'بر عهده خواهان یا مدعی که ادعایی خلاف اصل مطرح کرده است (البینة علی المدعی)', wrong: 'بر عهده قاضی دادگاه' }
  ],

  hr_administration: [
    { titleFa: 'مصاحبه‌های شایسته‌محور و چارچوب STAR (SHRM)', titleEn: 'Competency-Based Behavioral Interviewing (STAR)', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'SHRM Competency Model & Behavioral Assessment', qTitle: 'ارزیابی جزء اقدام (Action) در تکنیک STAR', qText: 'تمرکز مصاحبه‌کننده در بخش Action باید روی چه باشد؟', correct: 'اقدامات مشخص و واقعی خود داوطلب در ماجرا نه صرفاً اقدامات تیمی دیگران', wrong: 'تحصیلات دبیرستان کاندیدا' },
    { titleFa: 'ارزیابی ویژگی‌های شخصیتی پنج‌گانه شغلی (Big Five)', titleEn: 'Big Five Workplace Personality Inventory (NEO)', testType: 'personality_culture', difficulty: 'مقدماتی', sourceStandard: 'Big Five NEO-PI-R & Costa & McCrae Model', qTitle: 'ویژگی وظیفه‌شناسی (Conscientiousness)', qText: 'نمره بالای وظیفه‌شناسی در محیط کار چه رفتاری را پیش‌بینی می‌کند؟', correct: 'دقت در جزئیات، قابلیت اتکا، انضباط فردی و پایبندی به کیفیت در تحویل کار', wrong: 'علاقه به خوابیدن در محیط کار' },
    { titleFa: 'مدیریت عملکرد، ارزیابی ۳۶۰ درجه و توسعه فردی', titleEn: 'Performance Management, 360 Feedback & IDP', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'CIPD Performance Management Guidelines', qTitle: 'مزیت بازخورد ۳۶۰ درجه در توسعه مدیران', qText: 'چرا بازخورد ۳۶۰ درجه تصویر دقیق‌تری از رفتار مدیر ارائه می‌دهد؟', correct: 'دریافت همزمان دیدگاه زیردستان، هم‌سطح‌ها، مدیر مستقیم و خودارزیابی فرد', wrong: 'برای نمره دادن به اخلاق پرسنل' },
    { titleFa: 'جبران خدمت، ارزش‌گذاری مشاغل و استراتژی پاداش', titleEn: 'Total Rewards Strategy, Job Grading & Compensation', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'WorldatWork Total Rewards Architecture', qTitle: 'عدالت درونی در برابر عدالت بیرونی حقوق', qText: 'تراز کردن حقوق با نرخ بازار صنعت نشان‌دهنده کدام عدالت است؟', correct: 'عدالت بیرونی (External Equity)', wrong: 'عدالت خانوادگی' },
    { titleFa: 'فرآیند جذب، جامعه‌پذیری پرسنل و تعامل کاری', titleEn: 'Talent Acquisition, Onboarding & Employee Engagement', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Gallup Employee Engagement Framework', qTitle: 'هدف اصلی دوره جامعه‌پذیری (Onboarding) ۹۰ روزه', qText: 'شاخص موفقیت یک برنامه Onboarding اصولی چیست؟', correct: 'رسیدن سریع‌تر نیروی تازه به بهره‌وری مطلوب و کاهش ریزش در ۶ ماهه اول', wrong: 'امضای صدها برگه تعهدنامه' },
    { titleFa: 'قانون کار، بیمه تامین اجتماعی و محاسبات حقوق و دستمزد', titleEn: 'Labor Relations, Social Security & Payroll Compliance', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'National Labor Law & Social Security Codes', qTitle: 'محاسبه اضافه کاری در قانون کار', qText: 'نرخ دستمزد هر ساعت اضافه کاری چقدر بیشتر از ساعت کار عادی است؟', correct: '۴۰ درصد اضافه بر مزد هر ساعت کار عادی', wrong: 'دو برابر حقوق پایه' },
    { titleFa: 'مدیریت استعدادها و ماتریس ۹ خانه‌ای جانشین‌پروری', titleEn: 'Talent Management & 9-Box Succession Grid', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'McKinsey 9-Box Talent Matrix Standards', qTitle: 'تعریف ستاره‌ها (Stars) در ماتریس ۹ خانه', qText: 'فردی که در خانه بالا-راست ماتریس ۹ خانه قرار دارد چه ویژگی دارد؟', correct: 'عملکرد جاری بسیار بالا و پتانسیل رشد رهبری فوق‌العاده برای آینده', wrong: 'فرد با سابقه کار کم' },
    { titleFa: 'حل تعارضات بین‌فردی در سازمان (مدل توماس-کیلمن)', titleEn: 'Thomas-Kilmann Conflict Mode Instrument (TKI)', testType: 'situational_judgment', difficulty: 'متوسط', sourceStandard: 'Thomas-Kilmann Conflict Resolution Instrument', qTitle: 'سبک همکاری (Collaborating) در تعارض', qText: 'رویکرد همکاری چه زمانی بهترین سبک حل تعارض است؟', correct: 'زمانی که دغدغه‌های هر دو طرف بسیار حیاتی است و مصالحه سطحی جوابگو نیست', wrong: 'فقط تسلیم شدن' },
    { titleFa: 'فرهنگ سازمانی، تنوع و ایجاد محیط شمول‌پذیر (DEI)', titleEn: 'Organizational Culture, Diversity, Equity & Inclusion', testType: 'personality_culture', difficulty: 'مقدماتی', sourceStandard: 'Cameron & Quinn OCAI Culture Framework', qTitle: 'فرهنگ قبیله‌ای (Clan Culture) در مدل OCAI', qText: 'مشخصه کلیدی فرهنگ کِلَن در سازمان چیست؟', correct: 'محیط صمیمی، ارزش کار تیمی، مشارکت بالا و نگاه مربی‌گرایانه مدیران', wrong: 'قوانین خشک بوروکراتیک' },
    { titleFa: 'مکاتبات اداری پیشرفته، بایگانی اسناد و گزارش‌نویسی', titleEn: 'Executive Office Administration & Document Archiving', testType: 'role_specific', difficulty: 'مقدماتی', sourceStandard: 'International Association of Administrative Pros', qTitle: 'اصول شماره‌گذاری و ارجاع مکاتبات رسمی', qText: 'در هامش‌نویسی یا ارجاع نامه اداری چه نکاتی الزامی است؟', correct: 'تعیین صریح اقدام‌کننده، مهلت اقدام و دستور مشخص بدون ابهام کلامی', wrong: 'امضای بدون تاریخ' }
  ],

  construction_architecture: [
    { titleFa: 'مهندسی عمران، برنامه‌ریزی پروژه و مسیر بحرانی (CPM)', titleEn: 'Civil Engineering, Project Scheduling & Critical Path', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'PMI PMBOK Construction Extension', qTitle: 'تفاوت زمان زودهنگام و دیرهنگام در CPM', qText: 'تفاضل زمان شروع زودهنگام (ES) از شروع دیرهنگام (LS) چه پارامتری است؟', correct: 'شناوری کل فعالیت (Total Float)', wrong: 'مدت زمان بتن‌ریزی' },
    { titleFa: 'مدلسازی اطلاعات ساختمان (BIM) و هماهنگی تداخلات', titleEn: 'BIM Management, Clash Detection & Revit Workflow', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'ISO 19650 BIM Standards for Built Assets', qTitle: 'تشخیص تداخل سخت (Hard Clash) در نرم‌افزار ناویس‌ورکس', qText: 'تداخل سخت در مدل‌سازی بیم به چه معناست؟', correct: 'تداخل فیزیکی دو المان مختلف مانند عبور لوله تاسیساتی از تیر بتنی', wrong: 'اختلاف رنگ دو دیوار' },
    { titleFa: 'مقررات ملی ساختمان: مباحث سازه، زلزله و طراحی بتن', titleEn: 'Building Structural Codes & Seismic Design (ACI 318)', testType: 'engineering_skills', difficulty: 'پیشرفته', sourceStandard: 'ACI 318 Building Code & Standard 2800', qTitle: 'ضوابط شکل‌پذیری سازه در برابر زلزله', qText: 'هدف از خاموت‌گذاری ویژه در ناحیه بحرانی ستون‌ها چیست؟', correct: 'محبوس‌سازی هسته بتن و پیشگیری از کمانش میلگردهای طولی در لرزش شدید', wrong: 'کاهش وزن ساختمان' },
    { titleFa: 'ایمنی گودبرداری‌های عمیق، نیلینگ و سازه‌های نگهبان', titleEn: 'Deep Excavation Safety, Soil Nailing & Retaining Walls', testType: 'engineering_skills', difficulty: 'پیشرفته', sourceStandard: 'OSHA Subpart P Excavations & FHWA Geotechnical', qTitle: 'پایش و ابزار دقیق در گودبرداری (Monitoring)', qText: 'اندازه‌گیری انحراف افقی دیواره گود با چه ابزاری صورت می‌گیرد؟', correct: 'ابزار دقیق شیب‌سنج (Inclinometer) داخل لوله‌های شیاردار گمانه', wrong: 'متر خیاطی' },
    { titleFa: 'متره، برآورد و آنالیز بهای پروژه‌های ساختمانی', titleEn: 'Quantity Surveying, Cost Estimation & Takeoff', testType: 'problem_solving', difficulty: 'متوسط', sourceStandard: 'RICS Quantity Surveying & Cost Management', qTitle: 'ضریب بالاسری (Overhead Factor) در قراردادها', qText: 'هزینه‌های بالاسری پروژه عمرانی شامل چه مواردی است؟', correct: 'هزینه‌های دفتر مرکزی، بیمه، ضمانت‌نامه‌ها و سود پیمانکار', wrong: 'قیمت سیمان پای کار' },
    { titleFa: 'معماری پایدار و استاندارد ساختمان‌های سبز (LEED)', titleEn: 'Sustainable Architecture & LEED Green Building', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'USGBC LEED v4.1 Green Associate Standards', qTitle: 'طراحی ایوان و سایه‌بان‌های فصلی', qText: 'مزیت سایه‌بان‌های افقی در نمای جنوبی ساختمان چیست؟', correct: 'مسدود کردن نور شدید تابستان و اجازه ورود آفتاب مایل زمستان', wrong: 'زیباتر شدن گچ‌بری' },
    { titleFa: 'فناوری بتن، طرح اختلاط و آزمایش‌های دوام بتن', titleEn: 'Concrete Technology, Mix Design & Durability Testing', testType: 'engineering_skills', difficulty: 'پیشرفته', sourceStandard: 'ASTM Concrete Standards & RILEM Durability', qTitle: 'نسبت آب به سیمان (W/C) و مقاومت فشاری', qText: 'کاهش کنترل‌شده نسبت آب به سیمان همراه با روان‌کننده چه نتیجه‌ای دارد؟', correct: 'افزایش چشمگیر مقاومت فشاری و کاهش نفوذپذیری و تخلخل بتن', wrong: 'روان شدن بتن بدون چسبندگی' },
    { titleFa: 'نقشه‌برداری مهندسی، کار با توتال استیشن و ترازیابی', titleEn: 'Land Surveying, Total Station Operations & Geomatics', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'FIG International Federation of Surveyors', qTitle: 'خطای بستن زاویه‌ای در پیمایش نقشه', qText: 'برای توزیع خطای بستن زاویه‌ای در یک پلی‌گون بسته چه اقدامی انجام می‌شود؟', correct: 'تقسیم متناسب خطا میان تمام زوایا در صورتی که کمتر از حد خطای مجاز باشد', wrong: 'پاک کردن کل برداشت میدانی' },
    { titleFa: 'تاسیسات مکانیکی ساختمان، تهویه مطبوع HVAC و هیدرولیک', titleEn: 'Building Mechanical Systems & HVAC Design (ASHRAE)', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'ASHRAE Fundamentals & HVAC Standards', qTitle: 'محاسبه بار برودتی ساختمان', qText: 'بار محسوس (Sensible Heat) در برابر بار نهان (Latent Heat) چیست؟', correct: 'بار محسوس مربوط به تغییر دما و بار نهان مربوط به رطوبت هواست', wrong: 'هر دو یکسان هستند' },
    { titleFa: 'شرایط عمومی پیمان و مدیریت دعاوی پیمانکاری (Claims)', titleEn: 'Standard Engineering Contracts & Claims Management', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'FIDIC Conditions of Contract & Dispute Resolution', qTitle: 'تاخیرات مجاز در برابر غیرمجاز پروژه', qText: 'کدام تاخیر به عنوان تاخیر مجاز برای پیمانکار شناخته می‌شود؟', correct: 'تاخیر ناشی از تاخیر کارفرما در تحویل زمین یا عدم ابلاغ نقشه‌ها', wrong: 'خرابی ماشین‌آلات شخصی پیمانکار' }
  ],

  manufacturing_production: [
    { titleFa: 'تولید ناب، سیستم تویوتا (TPS) و حذف اتلاف‌های هفت‌گانه', titleEn: 'Lean Manufacturing, Toyota Production System (TPS)', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Lean Enterprise Institute (LEI) Standards', qTitle: 'اتلاف تولید مازاد بر تقاضا (Overproduction)', qText: 'چرا تولید مازاد بدترین اتلاف از هفت مودا (Muda) در تولید ناب است؟', correct: 'زیرا هزینه‌های انبارداری را تحمیل کرده و تمام عیوب کیفی دیگر را پنهان می‌کند', wrong: 'چون کارخانه خلوت می‌شود' },
    { titleFa: 'محاسبه اثربخشی کلی تجهیزات OEE و نگهداری TPM', titleEn: 'Overall Equipment Effectiveness (OEE) & TPM', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'Japan Institute of Plant Maintenance (JIPM)', qTitle: 'توقفات جزئی و کاهش سرعت ماشین', qText: 'توقفات کوتاه کمتر از ۵ دقیقه در کدام فاکتور OEE اثر منفی می‌گذارد؟', correct: 'فاکتور عملکرد یا کارایی سرعت (Performance)', wrong: 'فاکتور کیفیت' },
    { titleFa: 'متدولوژی شش سیگما و اجرای فازهای DMAIC', titleEn: 'Six Sigma Methodology & DMAIC Phase Gates', testType: 'engineering_skills', difficulty: 'پیشرفته', sourceStandard: 'ASQ Six Sigma Standards & Motorola Academy', qTitle: 'مرحله اندازه‌گیری (Measure) در چرخه DMAIC', qText: 'هدف از آزمون MSA (Gage R&R) در فاز Measure چیست؟', correct: 'اطمینان از دقت و تکرارپذیری سیستم اندازه‌گیری پیش از قضاوت درباره داده‌ها', wrong: 'خرید دستگاه‌های جدید' },
    { titleFa: 'ساماندهی 5S محیط کار و کایزن‌های بهبود مستمر', titleEn: '5S Workplace Organization & Kaizen Continuous Improvement', testType: 'role_specific', difficulty: 'مقدماتی', sourceStandard: '5S Kaizen Manufacturing Framework', qTitle: 'مرحله تفکیک و ساماندهی (Seiri - Sort)', qText: 'در مرحله Seiri با اقلامی که بیش از ۶ ماه مصرف نشده‌اند چه برخوردی می‌شود؟', correct: 'برچسب قرمز (Red Tagging) خورده و به انبار راکد یا فروش ضایعات منتقل می‌شوند', wrong: 'نگهداری ابدی روی میز کار' },
    { titleFa: 'برنامه‌ریزی احتیاجات مواد MRP و زمان‌بندی تولید', titleEn: 'Material Requirements Planning (MRP) & Production Scheduling', testType: 'problem_solving', difficulty: 'متوسط', sourceStandard: 'APICS CPIM Master Planning of Resources', qTitle: 'ساختار شکست محصول (BOM - Bill of Materials)', qText: 'سند درختواره مواد و قطعات (BOM) چه چیزی را مشخص می‌کند؟', correct: 'فهرست دقیق تمامی قطعات، مواد اولیه و مقادیر لازم برای ساخت یک واحد محصول نهایی', wrong: 'لیست پرسنل شیفت شب' },
    { titleFa: 'ارگونومی صنعتی، ایمنی خط مونتاژ و سلامت شغلی', titleEn: 'Industrial Ergonomics & Assembly Line Safety', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'ISO 11228 Ergonomics Manual Handling', qTitle: 'معادله شاخص حمل بار دستی NIOSH', qText: 'حد مجاز توصیه شده حمل دستی بار (RWL) به چه پارامترهایی بستگی دارد؟', correct: 'فاصله افقی، ارتفاع اولیه، زاویه چرخش تنه و فرکانس بلند کردن بار', wrong: 'فقط به سن کارگر' },
    { titleFa: 'خطاناپذیری پوکایوکه (Poka-Yoke) و کیفیت در منبع', titleEn: 'Poka-Yoke Error Proofing & Quality at the Source', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'Shigeo Shingo Zero Quality Control Standards', qTitle: 'پوکایوکه کنترلی در برابر هشداردهنده', qText: 'پوکایوکه کنترلی چه مزیتی بر هشداردهنده دارد؟', correct: 'به صورت فیزیکی از وقوع اشتباه جلوگیری کرده و در صورت بروز خطا دستگاه را متوقف می‌کند', wrong: 'فقط لامپ قرمز روشن می‌کند' },
    { titleFa: 'نقشه‌برداری جریان ارزش VSM و کوتاه‌سازی زمان تحویل', titleEn: 'Value Stream Mapping (VSM) & Lead Time Reduction', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'Rother & Shook Learning to See Standards', qTitle: 'نسبت زمان ارزش‌افزا به زمان کل تحویل (PCE)', qText: 'زمان ارزش‌افزا در اکثر کارخانجات سنتی چند درصد از لیدتایم کل است؟', correct: 'معمولاً کمتر از ۵ درصد (بقیه زمان اتلاف و انتظار در صف و انبار است)', wrong: '۹۰ درصد' },
    { titleFa: 'تکنیک تعویض سریع قالب در کمتر از ۱۰ دقیقه (SMED)', titleEn: 'Single-Minute Exchange of Die (SMED Setup Reduction)', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'Shingo SMED Quick Setup System', qTitle: 'تفکیک تنظیمات داخلی و خارجی در SMED', qText: 'تنظیمات خارجی (External Setup) به چه فعالیت‌هایی گفته می‌شود؟', correct: 'کارهایی که در حین کار کردن دستگاه می‌توان بدون توقف خط آماده کرد', wrong: 'کارهایی که در کشور دیگر انجام می‌شود' },
    { titleFa: 'تولید سلولی، تعادل خط و کار استاندارد اپراتور', titleEn: 'Cellular Manufacturing & Line Balancing Efficiency', testType: 'problem_solving', difficulty: 'متوسط', sourceStandard: 'Standard Work & Cellular Layout Design', qTitle: 'زمان تاکت (Takt Time) در خط تولید', qText: 'زمان تاکت بر اساس چه فرمولی محاسبه می‌شود؟', correct: 'زمان در دسترس خالص تولید تقسیم بر میزان تقاضای واقعی مشتری', wrong: 'سرعت موتور نوار نقاله' }
  ],

  logistics_supply_chain: [
    { titleFa: 'مدیریت زنجیره تأمین و مهار اثر شلاق چرمی (CSCMP)', titleEn: 'Supply Chain Management & Bullwhip Effect Mitigation', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'CSCMP Certified Supply Chain Professional', qTitle: 'به اشتراک‌گذاری داده در زنجیره تامین', qText: 'بهترین راهکار جلوگیری از نوسانات کاذب تقاضا چیست؟', correct: 'مشاهده لایو دیتای نقطه فروش (POS) توسط تمام تامین‌کنندگان', wrong: 'سفارش‌های سالانه بسیار حجیم' },
    { titleFa: 'سیستم‌های مدیریت انبار WMS و چیدمان اسلاتینگ', titleEn: 'Warehouse Management Systems & Inventory Slotting', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Warehousing Education and Research Council (WERC)', qTitle: 'تحلیل ABC در چیدمان اقلام انبار', qText: 'اقلام رده A در انبار باید در کجا چیده شوند؟', correct: 'نزدیک‌ترین و دسترس‌پذیرترین مکان به بارانداز ارسال برای کاهش زمان جابجایی', wrong: 'در بالاترین طبقه انبار' },
    { titleFa: 'مدل‌های اقتصادی سفارش‌دهی EOQ و موجودی اطمینان', titleEn: 'Economic Order Quantity (EOQ) & Safety Stock', testType: 'problem_solving', difficulty: 'متوسط', sourceStandard: 'APICS CPIM Inventory Optimization', qTitle: 'عوامل تعیین‌کننده موجودی اطمینان (Safety Stock)', qText: 'محاسبه موجودی اطمینان بر مبنای چه عواملی انجام می‌شود؟', correct: 'انحراف معیار تقاضا، تغییرات زمان تدارک (Lead Time) و سطح خدمت مورد نظر', wrong: 'فقط اندازه انبار' },
    { titleFa: 'مقررات بازرگانی بین‌المللی و قواعد اینکوترمز ۲۰۲۰', titleEn: 'Incoterms 2020 Rules & Global Trade Logistics', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'ICC Incoterms 2020 International Standard', qTitle: 'تفاوت FOB با CIF در حمل دریایی', qText: 'در ترم CIF چه هزینه‌هایی علاوه بر FOB بر عهده فروشنده است؟', correct: 'پرداخت کرایه حمل دریایی تا بندر مقصد و بیمه پایه حمل دریایی', wrong: 'پرداخت مالیات در کشور خریدار' },
    { titleFa: 'لجستیک حمل‌ونقل چندوجهی و بهینه‌سازی مسیر ناوگان', titleEn: 'Multimodal Transport & Fleet Routing Optimization', testType: 'problem_solving', difficulty: 'متوسط', sourceStandard: 'Fleet Management & Logistics Engineering', qTitle: 'مسئله مسیریابی وسایل نقلیه (VRP)', qText: 'هدف از الگوریتم بهینه‌سازی مسیر ناوگان توزیع چیست؟', correct: 'به حداقل رساندن کل مسافت پیموده شده و تعداد خودروها با رعایت پنجره‌های زمانی تحویل', wrong: 'رانندگی با حداکثر سرعت غیرمجاز' },
    { titleFa: 'پیش‌بینی تقاضا و برنامه‌ریزی یکپارچه S&OP', titleEn: 'Demand Forecasting & Sales and Operations Planning', testType: 'problem_solving', difficulty: 'متوسط', sourceStandard: 'Oliver Wight S&OP Standards', qTitle: 'روش هموارسازی نمایی (Exponential Smoothing)', qText: 'ضریب آلفا (Alpha) بزرگتر در پیش‌بینی نمایی چه اثری دارد؟', correct: 'وزن بیشتری به داده‌های اخیر فروش داده و سریع‌تر به تغییرات روند واکنش نشان می‌دهد', wrong: 'پیش‌بینی را کاملاً ثابت نگه می‌دارد' },
    { titleFa: 'لجستیک معکوس و زنجیره تأمین پایدار (Circular Economy)', titleEn: 'Reverse Logistics & Closed-Loop Supply Chain', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Reverse Logistics Association (RLA) Standards', qTitle: 'بازیافت و فرآیند بازتولید (Remanufacturing)', qText: 'لجستیک معکوس شامل چه فعالیت‌هایی است؟', correct: 'مدیریت مرجوعی‌ها، تعمیر گارانتی، بازیافت قطعات و دفع ایمن پسماندها', wrong: 'فقط فروش کالا' },
    { titleFa: 'بسته‌بندی صنعتی، پالت‌سازی و مهار کالا در کانتینر', titleEn: 'Industrial Packaging, Palletization & Cargo Securing', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'ISTA Packaging & IMO Cargo Securing Standards', qTitle: 'استاندارد تست سقوط و ارتعاش کارتن (ISTA)', qText: 'هدف از آزمون‌های پکیجینگ ISTA چیست؟', correct: 'اطمینان از سالم ماندن محموله در برابر لرزش‌های حمل دریایی و ضربات جاده‌ای', wrong: 'تست رنگ کارتن' },
    { titleFa: 'مدیریت ریسک و تاب‌آوری در اختلالات زنجیره تأمین', titleEn: 'Supply Chain Risk Management & Disruption Resilience', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'MIT Center for Transportation and Logistics', qTitle: 'راهکار چندمنبعی (Multi-Sourcing) در تامین قطعات', qText: 'چرا شرکت‌ها برای قطعات حیاتی به یک تامین‌کننده انحصاری تکیه نمی‌کنند؟', correct: 'کاهش ریسک وابستگی و تداوم تولید در صورت وقوع حوادث یا ورشکستگی یک منبع', wrong: 'برای شلوغ کردن دپارتمان خرید' },
    { titleFa: 'فرآیندهای گمرکی، اسناد ترخیص و سامانه جامع تجارت', titleEn: 'Customs Procedures, Clearance Documents & WCO', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'World Customs Organization (WCO) Standards', qTitle: 'کد تعرفه هماهنگ کالا (HS Code)', qText: 'کد بین‌المللی HS Code چه کاربردی دارد؟', correct: 'طبقه‌بندی استاندارد جهانی کالاها برای تعیین حقوق گمرکی و آمارهای تجاری', wrong: 'بارکد فروشگاه سوپرمارکت' }
  ],

  tourism_hospitality: [
    { titleFa: 'هتلداری حرفه‌ای و مدیریت درآمد اتاق‌ها (RevPAR)', titleEn: 'Hospitality Management & RevPAR Optimization', testType: 'problem_solving', difficulty: 'متوسط', sourceStandard: 'AHLEI Hospitality Management Standards', qTitle: 'شاخص میانگین نرخ روزانه اتاق (ADR)', qText: 'فرمول شاخص ADR در هتل چیست؟', correct: 'کل درآمد فروش اتاق‌ها تقسیم بر تعداد اتاق‌های اشغال شده', wrong: 'تعداد کل اتاق‌ها ضربدر قیمت' },
    { titleFa: 'سیستم‌های مدیریت املاک هتل (PMS) و پذیرش اپرا', titleEn: 'Hotel PMS & Front Office Software (Opera)', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Oracle Hospitality Opera Standards', qTitle: 'بستن حساب‌های شبانه هتل (Night Audit)', qText: 'فرآیند نایت‌اودیتور هتل در پایان شب شامل چیست؟', correct: 'تطبیق کارکردهای مالی روز، ثبت شارژ اتاق‌ها و بستن تراکنش‌های مالی روز قبل', wrong: 'خاموش کردن کامپیوترها' },
    { titleFa: 'استانداردهای خدمات مهمانان ویژه (VIP & Butler Service)', titleEn: 'VIP Guest Services & Luxury Hospitality Standards', testType: 'situational_judgment', difficulty: 'متوسط', sourceStandard: 'Forbes Travel Guide Luxury Standards', qTitle: 'سفارشی‌سازی خدمات برای مهمان VIP', qText: 'بهترین رویکرد باتلر در پذیرش مسافر VIP چیست؟', correct: 'بررسی پیشینه سلیقه‌ای مهمان (بالش، دما، نوع نوشیدنی) پیش از رسیدن و آماده‌سازی اختصاصی', wrong: 'سوال پرسیدن مکرر در لابی' },
    { titleFa: 'اصول تشریفات دیپلماتیک و آداب ضیافت‌های بین‌المللی', titleEn: 'Diplomatic Protocol, Etiquette & State Banquets', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'International Protocol & Etiquette Standards', qTitle: 'ترتیب نشستن بر اساس حق تقدم در میز مذاکره', qText: 'در پروتکل تشریفات دیپلماتیک جایگاه مهمان عالی‌رتبه نسبت به میزبان کجاست؟', correct: 'سمت راست میزبان اصلی (The Right Hand of the Host)', wrong: 'انتهای میز در گوشه اتاق' },
    { titleFa: 'بهداشت مواد غذایی و ایمنی آشپزخانه هتل (HACCP)', titleEn: 'Food Safety Management & HACCP in Catering', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Codex Alimentarius HACCP Standards', qTitle: 'محدوده دمای خطر فساد مواد غذایی (Danger Zone)', qText: 'محدوده دمایی خطر برای رشد باکتری‌های فسادزا چیست؟', correct: 'بین ۴ درجه تا ۶۰ درجه سانتی‌گراد', wrong: 'منفی ۱۸ درجه' },
    { titleFa: 'مدیریت رویدادها، همایش‌ها و سمینارهای تجاری (MICE)', testType: 'role_specific', titleEn: 'MICE Event Management & Convention Planning', difficulty: 'متوسط', sourceStandard: 'Meeting Professionals International (MPI)', qTitle: 'چیدمان سالن همایش در سبک کلاسی در برابر تئاتری', qText: 'مزیت چیدمان به سبک کلاسی برای سمینارهای تخصصی چیست؟', correct: 'فراهم بودن میز برای یادداشت‌برداری و کار با لپ‌تاپ شرکت‌کنندگان', wrong: 'جا شدن افراد بیشتر' },
    { titleFa: 'اکوتوریسم، بوم‌گردی پایدار و حفاظت از جوامع محلی', titleEn: 'Ecotourism & Sustainable Community-Based Travel', testType: 'role_specific', difficulty: 'مقدماتی', sourceStandard: 'UN Tourism (UNWTO) Sustainable Guidelines', qTitle: 'کاهش ردپای زیست‌محیطی گردشگران', qText: 'اصل بنیادین بوم‌گردی مسئولانه چیست؟', correct: 'حمایت از اقتصاد محلی و به جا نگذاشتن ردپای تخریب در طبیعت (Leave No Trace)', wrong: 'شکار حیوانات نادر' },
    { titleFa: 'باریستایی تخصصی و ارزیابی حسی قهوه (SCA Standard)', titleEn: 'Specialty Coffee Brewing & Sensory Cupping (SCA)', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Specialty Coffee Association (SCA) Protocols', qTitle: 'نسبت عصاره‌گیری قهوه اسپرسو (Brew Ratio)', qText: 'نسبت استاندارد اسپرسوی کلاسیک چیست؟', correct: 'حدود ۱ به ۲ (مثلاً ۱۸ گرم ساب قهوه برای ۳۶ گرم نوشیدنی)', wrong: '۱ به ۱۰' },
    { titleFa: 'عملیات خانه‌داری هتل، ممیزی نظافت و چیدمان اتاق', titleEn: 'Housekeeping Operations & Cleanliness Inspection', testType: 'role_specific', difficulty: 'مقدماتی', sourceStandard: 'Executive Housekeeper International Guidelines', qTitle: 'چک‌لیست بررسی اتاق پس از نظافت', qText: 'سوپروایزر خانه‌داری قبل از Release کردن اتاق چه مواردی را چک می‌کند؟', correct: 'ضدعفونی سرویس بهداشتی، سلامت وسایل برقی، ملحفه‌های بی‌نقص و تکمیل بودن مینی‌بار', wrong: 'فقط روشن بودن تلویزیون' },
    { titleFa: 'مدیریت رزرواسیون پرواز و سیستم‌های جهانی توزیع (GDS)', titleEn: 'Flight Ticketing & Global Distribution Systems (Amadeus)', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'IATA Ticketing & Amadeus GDS Training', qTitle: 'رکورد نام مسافر (PNR) در خطوط هوایی', qText: 'کد PNR در سیستم‌های هواپیمایی چه کاربردی دارد؟', correct: 'کد رزرو ۶ حرفی حاوی مشخصات پرواز، نام مسافر و اطلاعات بلیت الکترونیک', wrong: 'شماره گذرنامه' }
  ],

  agriculture_environment: [
    { titleFa: 'کشاورزی هوشمند، سنجش از دور و شاخص NDVI گیاهی', titleEn: 'Precision Agriculture, Remote Sensing & NDVI Index', testType: 'engineering_skills', difficulty: 'پیشرفته', sourceStandard: 'Precision Agriculture & Sentinel Satellite Remote Sensing', qTitle: 'تفسیر شاخص تفاضلی پوشش گیاهی (NDVI)', qText: 'مقادیر بالای شاخص NDVI (مثلاً ۰.۷ تا ۰.۸) نشان‌دهنده چیست؟', correct: 'پوشش گیاهی بسیار متراکم، شاداب و با فتوسنتز فعال', wrong: 'زمین کاملاً خشک و بایر' },
    { titleFa: 'راندمان مصرف آب و طراحی سیستم‌های آبیاری قطره‌ای', titleEn: 'Irrigation Engineering & Drip System Design (FAO)', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'FAO Irrigation & Drainage Papers', qTitle: 'یکنواختی توزیع آب در نوار آبیاری (Emission Uniformity)', qText: 'شاخص یکنواختی قطره‌چکان‌ها بالاتر از ۹۰٪ چه تاثیری دارد؟', correct: 'رشد همگن تمام بوته‌ها در مزرعه و جلوگیری از هدررفت کود و آب', wrong: 'خشک شدن مزرعه' },
    { titleFa: 'حاصلخیزی خاک، آزمون خاک و کوددهی هوشمند NPK', titleEn: 'Soil Fertility, Chemistry & Smart NPK Fertilization', testType: 'problem_solving', difficulty: 'متوسط', sourceStandard: 'Soil Science Society of America (SSSA)', qTitle: 'اسیدیته خاک (pH) و جذب عناصر غذایی', qText: 'در خاک‌های قلیایی آهکی با pH بالای ۸، جذب کدام عناصر با اختلال روبرو می‌شود؟', correct: 'ریزمغذی‌ها به خصوص آهن، روی و منگنز و تثبیت فسفر', wrong: 'ازت خالص' },
    { titleFa: 'ارزیابی اثرات زیست‌محیطی (EIA) با ماتریس لئوپولد', titleEn: 'Environmental Impact Assessment (Leopold Matrix)', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'EPA Environmental Impact Assessment Guidelines', qTitle: 'سنجش شدت و اهمیت در ماتریس لئوپولد', qText: 'ماتریس لئوپولد اثرات احداث کارخانه را چگونه ارزیابی می‌کند؟', correct: 'تلاقی فعالیت‌های پروژه با فاکتورهای محیطی در قالب دو عدد برای بزرگی و اهمیت اثر', wrong: 'فقط قیمت زمین' },
    { titleFa: 'مدیریت تلفیقی آفات و بیماری‌های گیاهی (IPM)', titleEn: 'Integrated Pest Management (IPM Protocols)', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'FAO Integrated Pest Management Guidelines', qTitle: 'آستانه اقتصادی خسارت آفت (Economic Threshold)', qText: 'مفهوم آستانه اقتصادی در سم‌پاشی چیست؟', correct: 'تراکم جمعیتی آفت که در آن هزینه سم‌پاشی کمتر از خسارت احتمالی به محصول می‌شود', wrong: 'دیدن اولین حشره در مزرعه' },
    { titleFa: 'کشت گلخانه‌ای مدرن و تغذیه هیدروپونیک NFT', titleEn: 'Advanced Greenhouse Management & NFT Hydroponics', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'Commercial Greenhouse Hydroponics Standards', qTitle: 'کنترل هدایت الکتریکی (EC) محلول غذایی', qText: 'اندازه‌گیری EC در کشت هیدروپونیک بیانگر چیست؟', correct: 'غلظت کل املاح و نمک‌های غذایی حل‌شده در آب مصرفی گیاه', wrong: 'فشار آب لوله‌ها' },
    { titleFa: 'پایش منابع آب، پساب و تصفیه فاضلاب‌های صنعتی', titleEn: 'Water Quality Monitoring & Industrial Effluent Treatment', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'Standard Methods for Water and Wastewater (APHA)', qTitle: 'تفاوت شاخص BOD با COD در پساب', qText: 'چرا مقدار COD همواره بزرگتر یا مساوی BOD است؟', correct: 'چون COD کل مواد قابل اکسید شدن شیمیایی را می‌سنجد اما BOD فقط مواد تجزیه‌پذیر زیستی را', wrong: 'BOD همیشه بزرگتر است' },
    { titleFa: 'ترسیب کربن خاک و کشاورزی احیاکننده (Regenerative)', titleEn: 'Soil Carbon Sequestration & Regenerative Farming', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Rodale Institute Regenerative Agriculture', qTitle: 'کشت بدون خاک‌ورزی (No-Till Farming)', qText: 'مزیت حذف شخم عمیق در کشاورزی حفاظتی چیست؟', correct: 'حفظ ساختار خاک، جلوگیری از فرسایش بادی، حفظ رطوبت و افزایش ماده آلی', wrong: 'رشد بیشتر علف هرز' },
    { titleFa: 'مکانیزاسیون کشاورزی و نگهداری کمباین و تراکتور', titleEn: 'Agricultural Machinery & Harvester Optimization', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'ASABE Standards for Agricultural Equipment', qTitle: 'تنظیم فاصله کوبنده و ضدکوبنده در کمباین', qText: 'تنظیم نامناسب فاصله کوبنده گندم چه عارضه‌ای ایجاد می‌کند؟', correct: 'شکستگی و تلفات دانه‌ها یا ریزش خوشه‌های کوبیده‌نشده در کاه', wrong: 'مصرف سوخت کم' },
    { titleFa: 'حفاظت از تنوع زیستی و احیای پوشش گیاهی مراتع', titleEn: 'Biodiversity Conservation & Rangeland Restoration', testType: 'role_specific', difficulty: 'مقدماتی', sourceStandard: 'IUCN Red List & Conservation Guidelines', qTitle: 'ظرفیت چرای مرتع (Carrying Capacity)', qText: 'ورود دام فراتر از ظرفیت مجاز مرتع چه پیامدی دارد؟', correct: 'از بین رفتن گونه‌های خوش‌خوراک، کوبیدگی خاک و وقوع سیلاب‌های ویرانگر', wrong: 'چاق شدن سریع دام‌ها' }
  ],

  basic_applied_sciences: [
    { titleFa: 'آمار کاربردی، تحلیل خطا و اعتبارسنجی داده‌ها (ISO 17025)', titleEn: 'Applied Statistics & Measurement Uncertainty (ISO 17025)', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'ISO/IEC 17025 Testing and Calibration Labs', qTitle: 'محاسبه عدم قطعیت اندازه‌گیری گسترده (Expanded Uncertainty)', qText: 'ضریب پوشش k=2 در عدم قطعیت استاندارد چه سطح اطمینانی ایجاد می‌کند؟', correct: 'سطح اطمینان تقریبی ۹۵ درصد در توزیع نرمال', wrong: '۵۰ درصد' },
    { titleFa: 'طیف‌سنجی، کروماتوگرافی HPLC و آنالیز شیمی دستگاهی', titleEn: 'Instrumental Chemical Analysis: HPLC, GC-MS & UV-Vis', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'USP Pharmacopeia & AOAC International', qTitle: 'فاز متحرک و فاز ساکن در کروماتوگرافی معکوس', qText: 'در کروماتوگرافی مایع فاز معکوس (RP-HPLC) ویژگی فاز ساکن چیست؟', correct: 'فاز ساکن غیرقطبی (مانند C18) و فاز متحرک قطبی‌تر (آب و متانول/استونیتریل)', wrong: 'فاز ساکن گاز است' },
    { titleFa: 'طراحی آزمایش‌های فاکتوریل و مدل‌سازی سطح پاسخ (RSM)', titleEn: 'Design of Experiments (DOE) & Response Surface Methodology', testType: 'problem_solving', difficulty: 'پیشرفته', sourceStandard: 'Montgomery Design and Analysis of Experiments', qTitle: 'اثر متقابل دو عامل (Interaction Effect)', qText: 'وجود اثر متقابل میان دو متغیر در طراحی آزمایش به چه معناست؟', correct: 'اثر یک متغیر بر پاسخ آزمایش به سطح متغیر دیگر وابسته است', wrong: 'متغیرها هیچ اثری ندارند' },
    { titleFa: 'زیست‌شناسی مولکولی، تکنیک‌های Real-Time PCR و ژنتیک', titleEn: 'Molecular Biology Protocols, RT-qPCR & Gel Electrophoresis', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'MIQE Guidelines for Quantitative Real-Time PCR', qTitle: 'چرخه آستانه (Ct / Cq) در واکنش PCR', qText: 'مقدار کمتر عدد Ct در آزمایش Real-Time PCR نشان‌دهنده چیست؟', correct: 'تعداد نسخه‌های اولیه بیشتر از ژن هدف در نمونه اولیه', wrong: 'آزمایش ناموفق' },
    { titleFa: 'فیزیک ماده چگال، نیمه‌هادی‌ها و پیوند P-N', titleEn: 'Solid State Physics & Semiconductor Devices', testType: 'engineering_skills', difficulty: 'پیشرفته', sourceStandard: 'IEEE Electron Devices Society Standards', qTitle: 'شکاف انرژی (Band Gap) در نیمه‌هادی‌ها', qText: 'تفاوت شکاف انرژی مستقیم و غیرمستقیم در کاربردهای نوری چیست؟', correct: 'نیمه‌هادی‌های با گپ مستقیم (مانند GaAs) بازده تابش نوری بسیار بالاتری دارند', wrong: 'گپ مستقیم هدایت برق ندارد' },
    { titleFa: 'ایمنی مواد شیمیایی و استانداردهای برگه اطلاعات (MSDS)', titleEn: 'Chemical Laboratory Safety & GHS Labeling Standards', testType: 'role_specific', difficulty: 'مقدماتی', sourceStandard: 'OSHA HazCom Standard & UN GHS System', qTitle: 'پیکتوگرام مواد اکسیدکننده (Oxidizing)', qText: 'علامت دایره با شعله آتش روی ظرف ماده شیمیایی بیانگر چیست؟', correct: 'ماده اکسیدکننده قوی که می‌تواند موجب اشتعال سایر مواد شود', wrong: 'ماده رادیواکتیو' },
    { titleFa: 'محاسبات عددی، جبر خطی و شبیه‌سازی با پایتون/متلب', titleEn: 'Scientific Numerical Computing & Linear Algebra', testType: 'coding', difficulty: 'پیشرفته', sourceStandard: 'SciPy & NumPy Scientific Computing Standards', qTitle: 'تجزیه مقادیر منفرد ماتریس (SVD)', qText: 'کاربرد اصلی الگوریتم SVD در علوم داده و پردازش سیگنال چیست؟', correct: 'کاهش بعد ماتریس، حذف نویز و فشرده‌سازی اطلاعات تصویر و دیتا', wrong: 'جمع ساده ماتریس‌ها' },
    { titleFa: 'بیوانفورماتیک، توالی‌یابی نسل جدید (NGS) و هم‌ترازی ژنوم', titleEn: 'Bioinformatics Tools, BLAST & Next-Gen Sequencing', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'NCBI Bioinformatics & EMBL-EBI Protocols', qTitle: 'الگوریتم BLAST در پایگاه داده NCBI', qText: 'هدف از اجرای جستجوی BLAST روی یک توالی چیست؟', correct: 'یافتن مناطق مشابه محلی و توالی‌های ژنتیکی هم‌ساخت (Homolog) در بانک ژن', wrong: 'تکثیر فیزیکی ژن' },
    { titleFa: 'کالیبراسیون و مترولوژی ابزار دقیق در آزمایشگاه‌های مرجع', titleEn: 'Metrology, Calibration Traceability & Measurement Standards', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'NIST Metrology & BIPM International System', qTitle: 'زنجیره قابلیت ردیابی کالیبراسیون (Traceability)', qText: 'ردیابی مترولوژیکی چه چیزی را اثبات می‌کند؟', correct: 'ارتباط بی‌وقفه اندازه‌گیری با استانداردهای مرجع ملی یا بین‌المللی SI همراه با عدم قطعیت معین', wrong: 'داشتن بارکد روی خط‌کش' },
    { titleFa: 'اخلاق پژوهش در علوم پایه و تکرارپذیری یافته‌های تجربی', titleEn: 'Research Integrity & Reproducibility in Sciences', testType: 'situational_judgment', difficulty: 'متوسط', sourceStandard: 'National Academy of Sciences Research Integrity', qTitle: 'حذف داده‌های دورافتاده (Outliers)', qText: 'شرط مجاز برای حذف یک داده پرت از نتایج آزمایش چیست؟', correct: 'شناسایی و ثبت نقص قطعی در دستگاه اندازه‌گیری یا خطای عملیاتی، با ذکر شفاف دلیل در مقاله', wrong: 'حذف داده صرفاً برای زیباتر شدن نمودار' }
  ],

  public_social_services: [
    { titleFa: 'مداخله در بحران، تریاژ روانی و کمک‌های اولیه روانشناختی', titleEn: 'Crisis Intervention & Psychological First Aid (PFA)', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'WHO & Red Cross Psychological First Aid Guidelines', qTitle: 'شنیدن همدلانه در لحظات حاد بحران', qText: 'اولین واکنش امدادگر در مواجهه با بازمانده شوکه‌شده حادثه چیست؟', correct: 'ایجاد احساس امنیت فیزیکی، حضور آرام و گوش دادن بدون قضاوت به نیازهای فوری', wrong: 'نصیحت کردن و گفتن غصه نخور' },
    { titleFa: 'اخلاق حرفه‌ای مددکاری و اصول منشور اخلاقی (NASW)', titleEn: 'Social Work Code of Ethics & Client Rights (NASW)', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'National Association of Social Workers (NASW)', qTitle: 'حق تعیین سرنوشت مراجع (Self-Determination)', qText: 'اصل حق خودمختاری مراجع در مددکاری به چه معناست؟', correct: 'احترام به حق انتخاب آگاهانه مراجع در اتخاذ تصمیمات زندگی خود در چارچوب قانون', wrong: 'تصمیم‌گیری اجباری به جای مراجع' },
    { titleFa: 'اصول حراست فیزیکی، کنترل تردد و حفاظت از اماکن (ASIS)', titleEn: 'Physical Security Systems & Access Control (CPP)', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'ASIS International Physical Security Standards', qTitle: 'لایه دفاع در عمق (Defense in Depth)', qText: 'استراتژی دفاع در عمق در حفاظت فیزیکی چیست؟', correct: 'ایجاد لایه‌های حفاظتی پی‌درپی (حصار پیرامونی، کنترل تردد، گیت ورودی، دوربین)', wrong: 'تنها قفل کردن درب اصلی' },
    { titleFa: 'مدیریت سوانح، اسکان اضطراری و امدادرسانی در بلایا', titleEn: 'Disaster Management & Emergency Shelter Protocols', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'Sphere Project Humanitarian Charter Standards', qTitle: 'سرانه آب آشامیدنی اضطراری طبق استاندارد اسفیر', qText: 'حداقل آب روزانه برای بقای هر فرد در اردوگاه اضطراری چقدر است؟', correct: 'حداقل ۱۵ لیتر برای هر نفر در روز (شرب و بهداشت پایه)', wrong: 'یک لیتر در هفته' },
    { titleFa: 'مددکاری کودک و خانواده و پیشگیری از آسیب‌های اجتماعی', titleEn: 'Child Protection & Family Social Casework', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'UN Convention on the Rights of the Child (UNCRC)', qTitle: 'اصل منافع عالیه کودک (Best Interests of Child)', qText: 'در تصمیم‌گیری‌های قضایی و مددکاری، اصل منافع عالی کودک چه اولویتی دارد؟', correct: 'اولویت نخست در تمام تصمیمات، حفظ سلامت جسمی، روانی و آینده کودک است', wrong: 'نفع مالی خویشاوندان' },
    { titleFa: 'ایمنی آتش‌نشانی، رفتارشناسی حریق و اطفای دستی (NFPA)', titleEn: 'Fire Behavior, Portable Extinguishers & Life Safety', testType: 'engineering_skills', difficulty: 'متوسط', sourceStandard: 'NFPA 10 Portable Fire Extinguishers Standards', qTitle: 'تکنیک خاموش‌کننده PASS در آتش‌سوزی', qText: 'مراحل استفاده از کپسول آتش‌نشانی (PASS) به چه ترتیبی است؟', correct: 'کشیدن ضامن (Pull) -> نشانه به سمت ریشه حریق (Aim) -> فشردن اهرم (Squeeze) -> حرکت جاروبی (Sweep)', wrong: 'پرتاب کپسول به داخل آتش' },
    { titleFa: 'ارتباط بدون خشونت (NVC) و آرام‌سازی کلامی پرخاشگری', titleEn: 'Nonviolent Communication (NVC) & De-escalation', testType: 'situational_judgment', difficulty: 'متوسط', sourceStandard: 'Rosenberg Nonviolent Communication Framework', qTitle: 'چهار گام ارتباط بدون خشونت', qText: 'مراحل ساختار NVC برای رفع خصومت شامل کدامند؟', correct: 'مشاهده بدون قضاوت -> بیان احساس -> شناسایی نیاز -> تقاضای مشخص', wrong: 'فریاد زدن و محکوم کردن' },
    { titleFa: 'مدیریت خطوط تلفنی بحران و اورژانس اجتماعی', titleEn: 'Crisis Hotline Case Management & Suicide Triage', testType: 'situational_judgment', difficulty: 'پیشرفته', sourceStandard: 'National Suicide Prevention Lifeline Protocols', qTitle: 'ارزیابی بی‌درنگ خطر آسیب به خود در تماس تلفنی', qText: 'در تماس بحرانی برای ارزیابی سطح خطر خودکشی، چه پرسشی ضروری است؟', correct: 'پرسش صریح و آرام درباره داشتن قصد، برنامه و دسترسی به ابزار آسیب', wrong: 'قطع تماس تلفنی' },
    { titleFa: 'توسعه جامعه‌محور و توانمندسازی اقشار آسیب‌پذیر', titleEn: 'Community Development & Vulnerable Group Empowerment', testType: 'role_specific', difficulty: 'متوسط', sourceStandard: 'UN Development Programme (UNDP) Guidelines', qTitle: 'رویکرد توانمندسازی در برابر رویکرد صدقه‌ای', qText: 'تفاوت رویکرد توانمندسازی با کمک‌های خیریه‌ای سنتی چیست؟', correct: 'آموزش مهارت و ایجاد استقلال معیشتی پایدار به جای وابستگی دائمی به کمک مالی', wrong: 'پرداخت وام‌های بدون بازگشت' },
    { titleFa: 'پدافند غیرعامل و تداوم خدمات زیرساخت‌های حیاتی', titleEn: 'Civil Defense & Critical Infrastructure Protection', testType: 'role_specific', difficulty: 'پیشرفته', sourceStandard: 'National Civil Defense & Critical Infrastructure Standards', qTitle: 'اصل پراکندگی و دوگانه‌سازی در زیرساخت‌های شهری', qText: 'هدف از دوگانه‌سازی منابع انرژی در بیمارستان‌ها چیست؟', correct: 'تداوم بی‌وقفه برق اتاق‌های عمل با ژنراتورهای اضطراری در زمان قطعی کامل شبکه سراسری', wrong: 'کاهش قبض برق' }
  ]
};

// Build final complete catalog of 170+ tests (at least 10 tests for all 17 categories)
export function getComprehensiveAllTests(): AssessmentTest[] {
  const result: AssessmentTest[] = [];

  // 1. Add base testLibrary tests
  const existingIds = new Set<string>();
  for (const t of ASSESSMENT_TESTS) {
    result.push(t);
    existingIds.add(t.id);
  }

  // 2. Add extended tests
  for (const t of ADDITIONAL_COMPREHENSIVE_TESTS) {
    if (!existingIds.has(t.id)) {
      result.push(t);
      existingIds.add(t.id);
    }
  }

  // 3. Add specs for each category to guarantee at least 10 tests per category
  for (const [catId, specs] of Object.entries(ALL_CATEGORY_SPECS)) {
    for (const s of specs) {
      if (!existingIds.has(s.id)) {
        result.push(createTest(
          s.id,
          catId as JobCategoryId,
          s.testType,
          s.titleFa,
          s.titleEn,
          s.difficulty,
          s.durationMinutes,
          3,
          s.descriptionFa,
          s.targetRoles,
          s.skillsCovered,
          s.sourceStandard,
          Math.floor(Math.random() * 10) + 88,
          [
            {
              id: `q-${s.id}-1`,
              kind: 'mcq',
              title: s.question.title,
              points: 40,
              mcqData: {
                question: s.question.text,
                options: s.question.options.map((opt, oIdx) => ({
                  id: `opt-${s.id}-${oIdx}`,
                  text: opt.text,
                  isCorrect: opt.isCorrect
                })),
                explanation: s.question.explanation
              }
            },
            {
              id: `q-${s.id}-2`,
              kind: 'sjt',
              title: `قضاوت موقعیتی: سناریوی تخصصی ${s.titleFa.split(' ')[0]}`,
              points: 35,
              sjtData: {
                scenario: `در محیط کاری مرتبط با ${s.titleFa}، مشکلی غیرمنتظره میان اعضای پروژه و مشتری ایجاد شده و ضرب‌الاجل کاری نزدیک است.`,
                context: 'تصمیم‌گیری منطقی و مبتنی بر شواهد بدون ایجاد تاخیر.',
                options: [
                  {
                    id: `sjt-${s.id}-1`,
                    text: 'بررسی دقیق دلایل ریشه‌ای و ارائه برنامه اقدام فوری با اولویت‌بندی شفاف اقدامات حیاتی',
                    score: 5,
                    effectiveness: 'بسیار اثربخش',
                    feedback: 'بهترین عملکرد حفظ آرامش و اتخاذ تصمیم مبتنی بر داده‌های واقعی است.'
                  },
                  {
                    id: `sjt-${s.id}-2`,
                    text: 'نادیده گرفتن مشکل و سپردن آن به روزهای بعد',
                    score: 1,
                    effectiveness: 'نامناسب و پرریسک',
                    feedback: 'انباشت خطرات خسارات جبران‌ناپذیر به بار می‌آورد.'
                  }
                ]
              }
            },
            {
              id: `q-${s.id}-3`,
              kind: 'personality',
              title: 'تعهد به کیفیت و وجدان کاری در این حوزه',
              points: 25,
              personalityData: {
                statement: `در انجام تسک‌های تخصصی ${s.titleFa} به انطباق با بالاترین استانداردهای کیفی روز دنیا متعهد هستم.`,
                dimension: 'conscientiousness'
              }
            }
          ]
        ));
        existingIds.add(s.id);
      }
    }
  }

  // 4. Add the 10 blueprints for the other categories
  for (const [catId, list] of Object.entries(OTHER_CATEGORIES_DATA)) {
    list.forEach((item, idx) => {
      const testId = `${catId}-std-${idx + 1}`;
      if (!existingIds.has(testId)) {
        result.push(createTest(
          testId,
          catId as JobCategoryId,
          item.testType,
          item.titleFa,
          item.titleEn,
          item.difficulty,
          20,
          3,
          `ارزیابی جامع و معتبر بر پایه استانداردهای جهانی ${item.sourceStandard}. شامل آزمون تستی تخصصی، قضاوت موقعیتی کاری و وجدان شغلی.`,
          ['کارشناس ارشد و متخصص حوزه', 'مدیر پروژه', 'تحلیل‌گر ارزیابی شایستگی'],
          ['دانش کاربردی استاندارد', 'حل مسئله فنی', 'تصمیم‌گیری موقعیتی'],
          `استاندارد جهانی: ${item.sourceStandard}`,
          92 - idx,
          [
            {
              id: `q-${testId}-1`,
              kind: 'mcq',
              title: item.qTitle,
              points: 40,
              mcqData: {
                question: item.qText,
                options: [
                  { id: `opt-${testId}-1`, text: item.correct, isCorrect: true },
                  { id: `opt-${testId}-2`, text: item.wrong, isCorrect: false }
                ],
                explanation: `طبق استاندارد ${item.sourceStandard}، پاسخ صحیح منطبق بر اصول علمی و تجربی این حوزه است.`
              }
            },
            {
              id: `q-${testId}-2`,
              kind: 'sjt',
              title: `سناریوی قضاوت موقعیتی در ${item.titleFa.split(' ')[0]}`,
              points: 35,
              sjtData: {
                scenario: `در یک پروژه حیاتی در این حوزه، یکی از تجهیزات یا الزامات با تاخیر یا نقص مواجه شده است و زمان‌بندی قرارداد در خطر است.`,
                context: 'حفظ استانداردهای ایمنی و قرارداد.',
                options: [
                  {
                    id: `sjt-${testId}-1`,
                    text: 'تشکیل جلسه اضطراری فنی، مهار ریسک‌ها و فعال‌سازی پروتکل پشتیبان طبق استانداردهای بین‌المللی',
                    score: 5,
                    effectiveness: 'بسیار اثربخش',
                    feedback: 'بهترین عملکرد در شرایط بحرانی، پایبندی به پروتکل‌های مهار ریسک است.'
                  },
                  {
                    id: `sjt-${testId}-2`,
                    text: 'چشم‌پوشی از استانداردها و انجام کار غیراصولی برای جبران زمان',
                    score: 1,
                    effectiveness: 'نامناسب و پرریسک',
                    feedback: 'نادیده گرفتن استانداردهای تخصصی خطرات مالی و جانی جدی به همراه دارد.'
                  }
                ]
              }
            },
            {
              id: `q-${testId}-3`,
              kind: 'personality',
              title: 'تاب‌آوری و انگیزه پیشرفت در شرایط چالش‌برانگیز',
              points: 25,
              personalityData: {
                statement: 'در مواجهه با موانع پیچیده فنی، تا دستیابی به راهکار اصولی و استاندارد پیگیر و پرانرژی باقی می‌مانم.',
                dimension: 'adaptability'
              }
            }
          ]
        ));
        existingIds.add(testId);
      }
    });
  }

  return result;
}
