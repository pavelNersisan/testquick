import { AssessmentTest } from '../types/assessment';
import { ASSESSMENT_TESTS } from './testLibrary';

// Helper function to build a structured assessment test
function createTest(
  id: string,
  categoryId: any,
  testType: any,
  titleFa: string,
  titleEn: string,
  difficulty: any,
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

export const ADDITIONAL_COMPREHENSIVE_TESTS: AssessmentTest[] = [
  // --- 1. MANAGEMENT & BUSINESS (10 tests total) ---
  createTest(
    'mgmt-scrum-agile',
    'management_business',
    'role_specific',
    'مدیریت پروژه اجایل و چارچوب اسکرام پیشرفته',
    'Agile Project Management & Professional Scrum Master',
    'پیشرفته',
    25,
    3,
    'ارزیابی درک عمیق از رویدادها، آرتیفکت‌ها و ارزش‌های اسکرام، مربی‌گری تیم‌های چندتخصصی و مهار موانع اسپرینت.',
    ['Scrum Master', 'Agile Coach', 'Technical Project Manager', 'Product Owner'],
    ['Sprint Backlog Management', 'Servant Leadership', 'Velocity & Burn-down', 'Definition of Done'],
    'استاندارد جهانی: Scrum.org PSM-II & PMI-ACP',
    95,
    [
      {
        id: 'q-scrum-1',
        kind: 'mcq',
        title: 'مدیریت تغییر اولویت‌ها در میانه اسپرینت',
        points: 35,
        mcqData: {
          question: 'در روز پنجم یک اسپرینت دوهفته‌ای، مالک محصول (Product Owner) با یک تسک با اولویت بالا مراجعه می‌کند و می‌خواهد فوراً وارد اسپرینت شود. پاسخ صحیح چیست؟',
          options: [
            { id: 'sc-1', text: 'تیم با همفکری مالک محصول بررسی می‌کند؛ در صورت پذیرش، باید تسکی با ارزش برابر از اسپرینت خارج شود تا هدف اسپرینت به خطر نیفتد.', isCorrect: true },
            { id: 'sc-2', text: 'تسک بدون هیچ مصالحه‌ای اضافه می‌شود و اعضا اضافه کاری اجباری می‌کنند.', isCorrect: false },
            { id: 'sc-3', text: 'مالک محصول اخراج می‌شود.', isCorrect: false }
          ],
          explanation: 'ظرفیت اسپرینت ثابت است؛ ورود کار جدید بدون حذف کار هم‌اندازه منجر به فرسودگی و شکست هدف اسپرینت می‌شود.'
        }
      },
      {
        id: 'q-scrum-2',
        kind: 'sjt',
        title: 'قضاوت موقعیتی: تضاد بین تخمین اعضای تیم در پلنینگ',
        points: 35,
        sjtData: {
          scenario: 'در جلسه Planning، توسعه‌دهنده ارشد تسکی را ۳ استوری پوینت تخمین می‌زند اما توسعه‌دهنده تازه‌کار آن را ۱۳ پوینت برآورد می‌کند.',
          context: 'تیم نیازمند هم‌راستایی درک الزامات تسک است.',
          options: [
            {
              id: 'sc-sjt-1',
              text: 'از هر دو نفر بخواهید فرضیات و ابهامات پشت تخمین خود را توضیح دهند تا تیم دید مشترکی نسبت به پیچیدگی پیدا کند و دوباره رای‌گیری شود.',
              score: 5,
              effectiveness: 'بسیار اثربخش',
              feedback: 'گفتگو بر سر تفاوت فرضیات باعث شفاف‌سازی ریسک‌ها و افزایش دقت تخمین جمعی می‌شود.'
            },
            {
              id: 'sc-sjt-2',
              text: 'نظر فرد ارشد را بدون بحث ملاک قطعی قرار دهید.',
              score: 2,
              effectiveness: 'نامناسب و پرریسک',
              feedback: 'نادیده گرفتن دغدغه اعضا باعث نادیده ماندن ابهامات اجرایی می‌شود.'
            }
          ]
        }
      },
      {
        id: 'q-scrum-3',
        kind: 'mcq',
        title: 'معیار اتمام (Definition of Done) در اسکرام',
        points: 30,
        mcqData: {
          question: 'هدف اصلی از داشتن یک Definition of Done (DoD) مشترک چیست؟',
          options: [
            { id: 'sc-3-1', text: 'ایجاد شفافیت و اطمینان از کیفیت بالقوه قابل انتشار (Potentially Releasable) خروجی هر اسپرینت', isCorrect: true },
            { id: 'sc-3-2', text: 'طولانی کردن جلسات بررسی کد', isCorrect: false }
          ]
        }
      }
    ]
  ),
  createTest(
    'mgmt-strategic-okr',
    'management_business',
    'role_specific',
    'تفکر استراتژیک، هدف‌گذاری با OKR و مدل‌های رشد',
    'Strategic Thinking, OKR Framework & Growth Modeling',
    'متوسط',
    20,
    3,
    'ارزیابی نگارش اهداف جاه‌طلبانه، نتایج کلیدی سنجش‌پذیر (Key Results) و اتصال اهداف کلان به تیم‌های عملیاتی.',
    ['Strategy Officer', 'General Manager', 'Chief of Staff', 'Business Director'],
    ['OKR Methodology', 'Strategic Planning', 'KPI vs KR Alignment', 'Competitive Moats'],
    'استاندارد جهانی: Harvard Business Review & Doerr Measure What Matters',
    92,
    [
      {
        id: 'q-okr-1',
        kind: 'mcq',
        title: 'ویژگی یک نتیجه کلیدی استاندارد (Key Result)',
        points: 35,
        mcqData: {
          question: 'کدام‌یک از گزینه‌های زیر بهترین نمونه از یک نتیجه کلیدی (Key Result) معتبر است؟',
          options: [
            { id: 'okr-1', text: 'کاهش نرخ ریزش مشتریان از ۸٪ به ۳.۵٪ تا پایان فصل چهارم سال', isCorrect: true },
            { id: 'okr-2', text: 'تلاش بیشتر برای رضایت مشتریان', isCorrect: false },
            { id: 'okr-3', text: 'برگزاری چند جلسه با مشتریان', isCorrect: false }
          ],
          explanation: 'یک نتیجه کلیدی باید کاملاً کمی، سنجش‌پذیر و دارای نقطه شروع، هدف و زمان‌بندی باشد.'
        }
      },
      {
        id: 'q-okr-2',
        kind: 'mcq',
        title: 'تفاوت OKR تعهدی (Committed) با OKR آرمانی (Aspirational)',
        points: 35,
        mcqData: {
          question: 'در فرهنگ شرکت گوگل، نرخ موفقیت مورد انتظار برای یک OKR آرمانی (Moonshot) چقدر است؟',
          options: [
            { id: 'okr-2-1', text: 'دستیابی به حدود ۶۰ تا ۷۰ درصد هدف به عنوان موفقیت عالی محسوب می‌شود.', isCorrect: true },
            { id: 'okr-2-2', text: 'باید حتماً ۱۰۰ درصد محقق شود.', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-okr-3',
        kind: 'sjt',
        title: 'قضاوت موقعیتی: تضاد منافع در تعیین اهداف فصلی دپارتمان‌ها',
        points: 30,
        sjtData: {
          scenario: 'دپارتمان فروش برای جذب درآمد فوری، درخواست تخفیف‌های سنگین دارد در حالی که دپارتمان مالی هدف خود را حاشیه سود بالای ۲۵٪ تعیین کرده است.',
          context: 'مدیریت ارشد باید تعادل بین رشد درآمد و سودآوری را برقرار کند.',
          options: [
            {
              id: 'okr-sjt-1',
              text: 'تشکیل کارگروه مشترک و تعریف یک تارگت تراز شده که در آن تخفیف فقط برای قراردادهای ۲ ساله بلندمدت با پرداخت نقدی مجاز باشد تا سود نهایی حفظ شود.',
              score: 5,
              effectiveness: 'بسیار اثربخش',
              feedback: 'هم‌راستاسازی اهداف متضاد از طریق ایجاد مدل برنده-برنده سودمندترین راهکار است.'
            }
          ]
        }
      }
    ]
  ),
  createTest(
    'mgmt-crisis-resilience',
    'management_business',
    'situational_judgment',
    'مدیریت بحران سازمانی و تداوم کسب‌وکار (BCM)',
    'Organizational Crisis Management & Business Continuity',
    'پیشرفته',
    20,
    3,
    'سنجش توانایی تصمیم‌گیری تحت فشار شدید، تدوین طرح تداوم کسب‌وکار، مدیریت ذینفعان و ارتباطات موثر در بحران.',
    ['Chief Executive Officer', 'Risk Manager', 'Operations Director', 'Crisis Response Lead'],
    ['ISO 22301 Standards', 'Disaster Recovery Strategy', 'Public Relations in Crisis', 'Stakeholder Alignment'],
    'استاندارد جهانی: ISO 22301 Business Continuity Standard',
    91,
    [
      {
        id: 'q-cr-1',
        kind: 'mcq',
        title: 'تعریف نقطه بازگشت داده‌ها (RPO) در تداوم کسب‌وکار',
        points: 35,
        mcqData: {
          question: 'شاخص RPO (Recovery Point Objective) در مدیریت بحران به چه معناست؟',
          options: [
            { id: 'cr-1', text: 'حداکثر حجم قابل تحمل از دست رفتن داده‌ها بر حسب زمان پیش از وقوع بحران', isCorrect: true },
            { id: 'cr-2', text: 'زمان لازم برای تعمیر کامپیوترها', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-cr-2',
        kind: 'sjt',
        title: 'قضاوت موقعیتی: نشت اطلاعات در شبکه اجتماعی پیش از اطلاع‌رسانی رسمی',
        points: 35,
        sjtData: {
          scenario: 'یک آسیب‌پذیری موقت در سرور رخ داده و اطلاعات اولیه مشتریان درز پیدا کرده است. هنوز ابعاد دقیق حادثه مشخص نیست اما شایعات شدیدی در توییتر پخش شده است.',
          context: 'حفظ اعتبار برند و اعتماد عمومی کاربران اولویت اول است.',
          options: [
            {
              id: 'cr-sjt-1',
              text: 'بیانیه شفاف و مسئولانه‌ای منتشر کنید که وقوع حادثه را تایید کند، اقدامات فنی فوری برای مهار نقص را تشریح نماید و کانال پیگیری رسمی برای کاربران معرفی کند.',
              score: 5,
              effectiveness: 'بسیار اثربخش',
              feedback: 'پاسخگویی سریع، شفاف و بدون پنهان‌کاری، بحران اعتبار را در کوتاه‌ترین زمان مهار می‌کند.'
            },
            {
              id: 'cr-sjt-2',
              text: 'موضوع را کلاً تکذیب کنید و هرکس صحبت کرد بلاک نمایید.',
              score: 1,
              effectiveness: 'نامناسب و پرریسک',
              feedback: 'انکار واقعیت آسیب غیرقابل جبرانی به اعتبار برند وارد می‌کند.'
            }
          ]
        }
      },
      {
        id: 'q-cr-3',
        kind: 'mcq',
        title: 'تحلیل اثرات بر کسب‌وکار (BIA - Business Impact Analysis)',
        points: 30,
        mcqData: {
          question: 'هدف اصلی از اجرای فرآیند BIA چیست؟',
          options: [
            { id: 'cr-3-1', text: 'شناسایی و اولویت‌بندی فرآیندهای حیاتی سازمان و تعیین حداکثر زمان مجاز وقفه (MTPD)', isCorrect: true },
            { id: 'cr-3-2', text: 'کاهش حقوق پرسنل در پایان سال', isCorrect: false }
          ]
        }
      }
    ]
  ),
  createTest(
    'mgmt-operations-value-chain',
    'management_business',
    'problem_solving',
    'تحلیل زنجیره ارزش پورتر و بهینه‌سازی عملیات سازمانی',
    'Porter Value Chain & Operations Streamlining',
    'متوسط',
    20,
    3,
    'ارزیابی شناسایی فعالیت‌های اولیه و پشتیبان، کشف مزیت رقابتی پایدار، کاهش هزینه‌های سربار و ارتقای حاشیه سود.',
    ['Operations Analyst', 'Supply Chain Strategist', 'Management Consultant'],
    ['Primary vs Support Activities', 'Cost Driver Analysis', 'Efficiency Modeling', 'Operational Margins'],
    'استاندارد جهانی: McKinsey & Porter Competitive Advantage Framework',
    89,
    [
      {
        id: 'q-vc-1',
        kind: 'mcq',
        title: 'تفکیک فعالیت‌های پشتیبان (Support Activities) در مدل پورتر',
        points: 35,
        mcqData: {
          question: 'کدام‌یک از موارد زیر جزو فعالیت‌های پشتیبان در زنجیره ارزش پورتر است؟',
          options: [
            { id: 'vc-1', text: 'مدیریت منابع انسانی و توسعه فناوری', isCorrect: true },
            { id: 'vc-2', text: 'لجستیک ورودی و انبارداری', isCorrect: false },
            { id: 'vc-3', text: 'عملیات ساخت و تولید', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-vc-2',
        kind: 'mcq',
        title: 'محاسبه اهرم عملیاتی (Degree of Operating Leverage)',
        points: 35,
        mcqData: {
          question: 'اگر هزینه‌های ثابت یک شرکت بالا باشد، اهرم عملیاتی آن شرکت چگونه خواهد بود؟',
          options: [
            { id: 'vc-2-1', text: 'بالا خواهد بود؛ یعنی با درصد کمی افزایش در فروش، سود عملیاتی با شتاب بیشتری جهش می‌کند.', isCorrect: true },
            { id: 'vc-2-2', text: 'صفر خواهد بود.', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-vc-3',
        kind: 'mcq',
        title: 'استراتژی تمایز در برابر رهبری هزینه',
        points: 30,
        mcqData: {
          question: 'کدام مزیت مستقیماً ناشی از استراتژی تمایز (Differentiation) است؟',
          options: [
            { id: 'vc-3-1', text: 'وفاداری مشتری و توانایی قیمت‌گذاری پریمیوم (Price Premium)', isCorrect: true },
            { id: 'vc-3-2', text: 'تولید انبوه با کمترین هزینه قطعات', isCorrect: false }
          ]
        }
      }
    ]
  ),

  // --- 2. IT & SOFTWARE (10 tests total) ---
  createTest(
    'it-react-frontend-pro',
    'it_software',
    'coding',
    'توسعه وب مدرن با React 19، الگوهای هوک و عملکرد',
    'Advanced React 19, Custom Hooks & Web Performance',
    'پیشرفته',
    30,
    3,
    'ارزیابی الگوهای مدرن کامپوننت، مدیریت وضعیت سرور با تان‌استک کوئری، بهینه‌سازی رندر و جلوگیری از Re-render ناخواسته.',
    ['Senior Frontend Engineer', 'React Lead', 'UI Architecture Specialist'],
    ['React 19 Server Components', 'Memoization & Profiler', 'Custom Hooks', 'Virtual DOM Optimization'],
    'استاندارد جهانی: Meta Front-End Developer & Testlify Advanced React',
    97,
    [
      {
        id: 'q-react-1',
        kind: 'coding',
        title: 'طراحی هوک دبانس برای جستجوی بهینه (Debounce Function)',
        points: 40,
        codingData: {
          language: 'javascript',
          problemStatement: 'تابعی بنویسید به نام debounceSearch(fn, delayMs) که تابعی دیگر و زمان تاخیر را دریافت کرده و نسخه دبانس‌شده آن را برگرداند به طوری که اگر فراخوانی‌های مکرر انجام شود، تنها آخرین فراخوانی پس از انقضای زمان تاخیر اجرا شود.',
          constraints: ['از تایمر setTimeout و clearTimeout استاندارد استفاده نمایید.'],
          starterCode: `function debounceSearch(fn, delayMs) {
  let timerId = null;
  return function(...args) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, delayMs);
  };
}`,
          examples: [{ input: 'fn, 300', output: 'Debounced function created' }],
          testCases: [
            { id: 'tc-r-1', description: 'ایجاد تابع دبانس شده', input: '(() => "ok"), 100', expectedOutput: 'undefined' }
          ]
        }
      },
      {
        id: 'q-react-2',
        kind: 'mcq',
        title: 'تفاوت useCallback با useMemo در ری‌اکت',
        points: 30,
        mcqData: {
          question: 'کدام گزینه تفاوت دقیق useCallback و useMemo را بیان می‌کند؟',
          options: [
            { id: 'r-2-1', text: 'تابع useCallback تعریف خود تابع را بین رندرها حفظ می‌کند اما useMemo حاصل محاسبه بازگشتی تابع را کش می‌کند.', isCorrect: true },
            { id: 'r-2-2', text: 'هیچ تفاوتی ندارند و کامپایلر به یک شکل با آن‌ها رفتار می‌کند.', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-react-3',
        kind: 'mcq',
        title: 'شاخص‌های کلیدی عملکرد وب Core Web Vitals',
        points: 30,
        mcqData: {
          question: 'شاخص INP (Interaction to Next Paint) در گوگل چه جنبه‌ای از وبسایت را می‌سنجد؟',
          options: [
            { id: 'r-3-1', text: 'پاسخ‌دهی تعاملی و تاخیر رابط کاربری در مواجهه با کلیک‌ها و ورودی‌های کاربر در طول عمر صفحه', isCorrect: true },
            { id: 'r-3-2', text: 'زمان بارگذاری فونت‌های خارجی', isCorrect: false }
          ]
        }
      }
    ]
  ),
  createTest(
    'it-sql-database-optimization',
    'it_software',
    'coding',
    'طراحی پایگاه‌داده، کوئری‌های تحلیلی SQL و ایندکس‌گذاری',
    'SQL Database Architecture, Complex Queries & Indexing',
    'متوسط',
    25,
    3,
    'سنجش دانش کوئری‌نویسی پیشرفته، توابع پنجره‌ای (Window Functions)، برنامه‌ریزی ایندکس B-Tree و پیشگیری از قفل‌های دیتابیس.',
    ['Backend Developer', 'Database Administrator DBA', 'Data Architect'],
    ['Window Functions', 'Query Execution Plans', 'B-Tree Indexing', 'ACID Transactions'],
    'استاندارد جهانی: HackerRank SQL Gold & PostgreSQL Certified',
    96,
    [
      {
        id: 'q-sql-1',
        kind: 'coding',
        title: 'محاسبه جمع تجمعی تراکنش‌ها با آرایه (Running Total)',
        points: 40,
        codingData: {
          language: 'javascript',
          problemStatement: 'تابعی بنویسید به نام calculateRunningTotals(transactions) که آرایه‌ای از مبالغ تراکنش‌ها را دریافت کرده و آرایه‌ای از مبالغ تجمعی (شبیه به تابع SUM() OVER (ORDER BY id)) برگرداند.',
          constraints: ['آرایه خالی باید [] برگرداند.'],
          starterCode: `function calculateRunningTotals(transactions) {
  if (!transactions || transactions.length === 0) return [];
  const result = [];
  let running = 0;
  for (const amount of transactions) {
    running += amount;
    result.push(running);
  }
  return result;
}`,
          examples: [{ input: '[100, 200, 50]', output: '[100, 300, 350]' }],
          testCases: [
            { id: 'tc-sql-1', description: 'تست جمع تجمعی ۳ عنصر', input: '[100, 200, 50]', expectedOutput: '[100,300,350]' },
            { id: 'tc-sql-2', description: 'تست آرایه خالی', input: '[]', expectedOutput: '[]' }
          ]
        }
      },
      {
        id: 'q-sql-2',
        kind: 'mcq',
        title: 'تفاوت Index Scan با Sequential Scan در دیتابیس',
        points: 30,
        mcqData: {
          question: 'در چه شرایطی بهینه‌ساز پایگاه‌داده (Query Planner) با وجود داشتن ایندکس، اسکن ترتیبی (Seq Scan) را ترجیح می‌دهد؟',
          options: [
            { id: 'sql-2-1', text: 'زمانی که حجم کل جدول بسیار کوچک است یا کوئری درصد زیادی از ردیف‌های جدول (Selectivity بالا) را بازیابی می‌کند.', isCorrect: true },
            { id: 'sql-2-2', text: 'زمانی که دیتابیس خاموش است.', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-sql-3',
        kind: 'mcq',
        title: 'سطوح انزوای تراکنش‌ها (Transaction Isolation Levels)',
        points: 30,
        mcqData: {
          question: 'کدام سطح انزوا در استاندارد SQL از وقوع پدیده خوانش شبح‌وار (Phantom Read) جلوگیری قطعی به عمل می‌آورد؟',
          options: [
            { id: 'sql-3-1', text: 'سطح انزوای سریالی‌پذیر (Serializable)', isCorrect: true },
            { id: 'sql-3-2', text: 'Read Uncommitted', isCorrect: false }
          ]
        }
      }
    ]
  ),
  createTest(
    'it-cybersecurity-owasp',
    'it_software',
    'role_specific',
    'امنیت سایبری کاربردی و پیشگیری از آسیب‌پذیری‌های OWASP',
    'Cybersecurity Engineering & OWASP Top 10 Mitigation',
    'پیشرفته',
    25,
    3,
    'ارزیابی شناسایی و رفع باگ‌های امنیتی متداول وب: تزریق SQL، جعل هویت XSS، توکن‌های JWT ناامن و احراز هویت دومرحله‌ای.',
    ['Application Security Engineer', 'Penetration Tester', 'DevSecOps Specialist'],
    ['OWASP Top 10', 'XSS & CSRF Defense', 'Secure JWT Handling', 'Cryptography Basics'],
    'استاندارد جهانی: OWASP Standard & CompTIA Security+',
    94,
    [
      {
        id: 'q-sec-1',
        kind: 'mcq',
        title: 'پیشگیری از حملات جعل درخواست میان‌سایتی (CSRF)',
        points: 35,
        mcqData: {
          question: 'موثرترین تنظیمات کوکی در مرورگر برای مقابله خودکار با حملات CSRF چیست؟',
          options: [
            { id: 'sec-1', text: 'تنظیم خصوصیت SameSite=Strict یا SameSite=Lax به همراه فلگ‌های HttpOnly و Secure', isCorrect: true },
            { id: 'sec-2', text: 'غیرفعال کردن رمزگذاری HTTPS', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-sec-2',
        kind: 'mcq',
        title: 'روش امن ذخیره‌سازی گذرواژه کاربران در پایگاه‌داده',
        points: 35,
        mcqData: {
          question: 'کدام الگوریتم هشینگ برای نگهداری گذرواژه‌ها طبق استانداردهای امنیتی مدرن توصیه می‌شود؟',
          options: [
            { id: 'sec-2-1', text: 'توابع هش تطبیقی و کند مانند bcrypt یا Argon2id همراه با Salt تصادفی اختصاصی برای هر کاربر', isCorrect: true },
            { id: 'sec-2-2', text: 'الگوریتم‌های سریع مانند MD5 یا SHA-1 بدون Salt', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-sec-3',
        kind: 'mcq',
        title: 'محافظت در برابر تزریق کد اسکریپت (XSS)',
        points: 30,
        mcqData: {
          question: 'کدام هدر امنیتی HTTP مانع از اجرای اسکریپت‌های مخرب تزریق‌شده از دامنه‌های نامعتبر می‌شود؟',
          options: [
            { id: 'sec-3-1', text: 'Content-Security-Policy (CSP)', isCorrect: true },
            { id: 'sec-3-2', text: 'Accept-Encoding', isCorrect: false }
          ]
        }
      }
    ]
  ),
  createTest(
    'it-devops-cloud-docker',
    'it_software',
    'role_specific',
    'دواپس، کانتینرسازی با Docker و مدیریت کلاستر Kubernetes',
    'DevOps Engineering, Docker Containers & Kubernetes Orchestration',
    'متوسط',
    25,
    3,
    'ارزیابی ساخت ایمیج‌های چندمرحله‌ای داکر، مانیتورینگ پرومتئوس، مدیریت اینگرس و پایپ‌لاین‌های CI/CD با گیت‌هاب اکشنز.',
    ['DevOps Engineer', 'Cloud Infrastructure Architect', 'Site Reliability Engineer SRE'],
    ['Docker Multi-stage Builds', 'Kubernetes Pods & Services', 'CI/CD Automation', 'Prometheus Metrics'],
    'استاندارد جهانی: Linux Foundation CKA & AWS DevOps Professional',
    95,
    [
      {
        id: 'q-devops-1',
        kind: 'mcq',
        title: 'مزیت استفاده از Multi-Stage Build در داکرفایل',
        points: 35,
        mcqData: {
          question: 'چرا در پروژه‌های جاوا، گو یا نود جی‌اس از داکربیلد چندمرحله‌ای استفاده می‌شود؟',
          options: [
            { id: 'd-1', text: 'جدا کردن ابزارهای حجیم کامپایل از ایمیج نهایی ران‌تایم و در نتیجه کاهش چشمگیر حجم ایمیج و ارتقای امنیت', isCorrect: true },
            { id: 'd-2', text: 'افزایش حجم فایل داکر به منظور پر کردن هارد دیسک', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-devops-2',
        kind: 'mcq',
        title: 'نقش Service در کوبرنتیز',
        points: 35,
        mcqData: {
          question: 'در کوبرنتیز، چرا به جای ارتباط مستقیم با IP پادها (Pods) از آبجکت Service استفاده می‌شود؟',
          options: [
            { id: 'd-2-1', text: 'زیرا پادها موقتی و ناپایدار (Ephemeral) هستند و آی‌پی آن‌ها با بازراه‌اندازی تغییر می‌کند، اما سرویس آی‌پی ثابت و توزیع بار پایدار فراهم می‌سازد.', isCorrect: true },
            { id: 'd-2-2', text: 'سرویس سرعت اینترنت را دو برابر می‌کند.', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-devops-3',
        kind: 'mcq',
        title: 'استراتژی انتشار بدون قطعی (Blue-Green Deployment)',
        points: 30,
        mcqData: {
          question: 'در تکنیک انتشار Blue-Green استقرار نرم‌افزار چگونه انجام می‌شود؟',
          options: [
            { id: 'd-3-1', text: 'دو محیط یکسان عملیاتی وجود دارد؛ نسخه جدید در محیط سبز مستقر شده و پس از تست، ترافیک روتر در یک لحظه به محیط سبز سوئیچ می‌شود.', isCorrect: true },
            { id: 'd-3-2', text: 'سرور اصلی خاموش شده و وبسایت تا ۲۴ ساعت قطع می‌شود.', isCorrect: false }
          ]
        }
      }
    ]
  ),

  // --- 3. ENGINEERING & TECHNICAL (Additional Tests) ---
  createTest(
    'eng-mechanical-fea',
    'engineering_technical',
    'role_specific',
    'مهندسی مکانیک، طراحی اجزا و تحلیل تنش المان محدود (FEA)',
    'Mechanical Engineering, Finite Element Analysis (FEA) & Stress Design',
    'پیشرفته',
    25,
    3,
    'ارزیابی تئوری‌های شکست ماده (فون میزس، ترسکا)، تمرکز تنش، خستگی فلزات و شبیه‌سازی استاتیکی و دینامیکی قطعات.',
    ['Mechanical Design Engineer', 'Stress Analyst', 'CAD/CAM Specialist'],
    ['Von Mises Yield Criterion', 'Fatigue Life S-N Curves', 'Stress Concentration Factors', 'FEA Meshing'],
    'استاندارد جهانی: ASME Boiler and Pressure Vessel Code & ANSYS FEA',
    89,
    [
      {
        id: 'q-mech-1',
        kind: 'mcq',
        title: 'معیار تسلیم فون میزس (Von Mises) در مواد داکتیل',
        points: 35,
        mcqData: {
          question: 'معیار شکست فون میزس برای چه موادی کاربرد علمی دقیق دارد؟',
          options: [
            { id: 'm-1', text: 'مواد نرم و شکل‌پذیر (Ductile) مانند فولاد و آلومینیوم تحت تنش‌های چندمحوره', isCorrect: true },
            { id: 'm-2', text: 'فقط مواد شکننده مانند گچ و شیشه', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-mech-2',
        kind: 'mcq',
        title: 'پدیده خستگی و نمودار S-N در بارگذاری‌های متناوب',
        points: 35,
        mcqData: {
          question: 'حد دوام (Endurance Limit) در مهندسی مواد به چه معناست؟',
          options: [
            { id: 'm-2-1', text: 'سطحی از دامنه تنش که در مقادیر پایین‌تر از آن، قطعه فولادی می‌تواند چرخه‌های بارگذاری نامحدود را بدون شکست تحمل کند.', isCorrect: true },
            { id: 'm-2-2', text: 'دمایی که فلز ذوب می‌شود.', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-mech-3',
        kind: 'mcq',
        title: 'انتخاب سایز مش‌بندی در تحلیل المان محدود FEA',
        points: 30,
        mcqData: {
          question: 'برای اطمینان از صحت محاسبات عددی در تحلیل FEA، چه فرآیندی باید انجام شود؟',
          options: [
            { id: 'm-3-1', text: 'بررسی همگرایی مش (Mesh Convergence Analysis) با ریزتر کردن تدریجی اندازه المان‌ها در نواحی تمرکز تنش', isCorrect: true },
            { id: 'm-3-2', text: 'رنگ‌آمیزی قطعه با رنگ‌های براق', isCorrect: false }
          ]
        }
      }
    ]
  ),
  createTest(
    'eng-electrical-plc',
    'engineering_technical',
    'role_specific',
    'مهندسی برق، اتوماسیون صنعتی و برنامه‌نویسی PLC',
    'Electrical Engineering, Industrial Automation & PLC Logic',
    'متوسط',
    25,
    3,
    'ارزیابی منطق لدر (Ladder Logic)، شبکه‌های صنعتی Modbus و Profinet، درایوهای فرکانس متغیر VFD و حفاظت ترانسفورماتور.',
    ['Automation Engineer', 'Electrical Control Specialist', 'PLC Programmer'],
    ['Ladder Diagram (LD)', 'IEC 61131-3 Standards', 'VFD Motor Control', 'Relay Protection Logic'],
    'استاندارد جهانی: IEC 61131-3 & Siemens TIA Portal Standard',
    90,
    [
      {
        id: 'q-plc-1',
        kind: 'mcq',
        title: 'چرخه اسکن برنامه در PLC (Scan Cycle)',
        points: 35,
        mcqData: {
          question: 'مراحل اصلی چرخه اسکن یک PLC به چه ترتیبی اجرا می‌شوند؟',
          options: [
            { id: 'p-1', text: 'خواندن وضعیت ورودی‌ها (Read Inputs) -> اجرای منطق برنامه (Execute Logic) -> بروزرسانی خروجی‌ها (Update Outputs)', isCorrect: true },
            { id: 'p-2', text: 'ارسال ایمیل به مهندس برق -> خاموش شدن دستگاه', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-plc-2',
        kind: 'mcq',
        title: 'کاربرد درایو فرکانس متغیر (VFD) در راه‌اندازی الکتروموتورها',
        points: 35,
        mcqData: {
          question: 'مهم‌ترین مزیت استفاده از VFD در مقایسه با استارت مستقیم (DOL) موتور القایی چیست؟',
          options: [
            { id: 'p-2-1', text: 'کنترل دقیق سرعت و گشتاور، حذف جریان ضربه‌ای راه‌اندازی و صرفه‌جویی چشمگیر در مصرف انرژی', isCorrect: true },
            { id: 'p-2-2', text: 'تبدیل موتور AC به موتور بخار', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-plc-3',
        kind: 'mcq',
        title: 'پروتکل ارتباطی صنعتی Modbus RTU',
        points: 30,
        mcqData: {
          question: 'بستر فیزیکی استاندارد برای انتقال دیتای Modbus RTU معمولاً کدام است؟',
          options: [
            { id: 'p-3-1', text: 'شبکه تفاضلی دو سیمه RS-485 با مقاومت انتهای خط (Termination)', isCorrect: true },
            { id: 'p-3-2', text: 'کابل HDMI تلویزیون', isCorrect: false }
          ]
        }
      }
    ]
  ),

  // --- 4. HEALTH & MEDICINE (Additional Tests) ---
  createTest(
    'med-clinical-pharmacology',
    'health_medicine',
    'role_specific',
    'داروشناسی بالینی، تداخلات دارویی و محاسبات دوز',
    'Clinical Pharmacology, Drug Interactions & Dosage Calculations',
    'پیشرفته',
    20,
    3,
    'ارزیابی نیمه‌عمر دارویی، تداخلات آنزیمی سیتوکروم P450، تعدیل دوز در نارسایی کلیوی و داروهای ضد انعقاد خون.',
    ['Clinical Pharmacist', 'Hospital Physician', 'Critical Care Nurse'],
    ['Pharmacokinetics & Dynamics', 'CYP450 Enzyme Interactions', 'Renal Dose Adjustments', 'Anticoagulant Monitoring'],
    'استاندارد جهانی: ISMP High-Alert Medication Guidelines & FDA Drug Safety',
    91,
    [
      {
        id: 'q-pharm-1',
        kind: 'mcq',
        title: 'تداخل دارویی مهارکننده‌های CYP3A4 با استاتین‌ها',
        points: 35,
        mcqData: {
          question: 'مصرف همزمان داروی آتورواستاتین با مهارکننده‌های قوی آنزیم CYP3A4 (مانند کلاریترومایسین) چه خطری به دنبال دارد؟',
          options: [
            { id: 'ph-1', text: 'افزایش شدید سطح خونی استاتین و خطر بروز رابدومیولیز و آسیب حاد کلیوی', isCorrect: true },
            { id: 'ph-2', text: 'کاهش کامل اثر درمانی استاتین', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-pharm-2',
        kind: 'mcq',
        title: 'محاسبه پاکسازی کراتینین (CrCl) با فرمول Cockcroft-Gault',
        points: 35,
        mcqData: {
          question: 'در بیماران مبتلا به نارسایی کلیوی با GFR کمتر از ۳۰ میلی‌لیتر در دقیقه، دوز کدام آنتی‌بیوتیک باید کاهش یابد؟',
          options: [
            { id: 'ph-2-1', text: 'آمینوگلیکوزیدها (مانند جنتامایسین) و ونکومایسین به دلیل سمیت کلیوی تجمعی', isCorrect: true },
            { id: 'ph-2-2', text: 'قطره قطره اشک مصنوعی', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-pharm-3',
        kind: 'mcq',
        title: 'پادزهر اختصاصی مسمومیت با پاراستامول (استامینوفن)',
        points: 30,
        mcqData: {
          question: 'در مسمومیت حاد با استامینوفن برای پیشگیری از نکروز کبدی، پادزهر خط اول کدام است؟',
          options: [
            { id: 'ph-3-1', text: 'ان-استیل‌سیستئین (N-Acetylcysteine / NAC) برای احیای ذخایر گلوتاتیون کبدی', isCorrect: true },
            { id: 'ph-3-2', text: 'آسپرین خوراکی', isCorrect: false }
          ]
        }
      }
    ]
  ),
  createTest(
    'med-patient-safety-jci',
    'health_medicine',
    'role_specific',
    'اهداف بین‌المللی ایمنی بیمار (IPSG) و اعتباربخشی بیمارستانی',
    'International Patient Safety Goals (IPSG) & Accreditation',
    'متوسط',
    20,
    3,
    'ارزیابی اهداف ۶ گانه ایمنی بیمار JCI: شناسایی صحیح، ارتباط موثر، ایمنی جراحی و کاهش خطر سقوط و عفونت.',
    ['Quality Improvement Lead', 'Hospital Nurse Manager', 'Safety Officer'],
    ['IPSG 6 Core Goals', 'SBAR Communication Model', 'Surgical Safety Checklist', 'Root Cause Incident Analysis'],
    'استاندارد جهانی: Joint Commission International JCI Standards',
    92,
    [
      {
        id: 'q-jci-1',
        kind: 'mcq',
        title: 'تکنیک شناسایی بیمار با دو شناسه معتبر (Patient Identification)',
        points: 35,
        mcqData: {
          question: 'طبق استاندارد بین‌المللی IPSG 1، کدام دو شناسه باید برای احراز هویت بیمار استفاده شوند؟',
          options: [
            { id: 'j-1', text: 'نام و نام خانوادگی کامل بیمار + شماره پرونده پزشکی (شماره اتاق و تخت بیمار هرگز نباید ملاک باشد)', isCorrect: true },
            { id: 'j-2', text: 'شماره تخت و رنگ لباس بیمار', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-jci-2',
        kind: 'mcq',
        title: 'مدل ارتباطی SBAR در گزارش‌دهی شرایط بالینی بیمار',
        points: 35,
        mcqData: {
          question: 'حروف اختصاری ساختار ارتباطی SBAR شامل کدام ۴ کلمه است؟',
          options: [
            { id: 'j-2-1', text: 'وضعیت (Situation) -> زمینه (Background) -> ارزیابی (Assessment) -> پیشنهاد اقدام (Recommendation)', isCorrect: true },
            { id: 'j-2-2', text: 'سرعت، بودجه، آمار، رکورد', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-jci-3',
        kind: 'sjt',
        title: 'قضاوت موقعیتی: دستور تلفنی دارویی در شیفت شب',
        points: 30,
        sjtData: {
          scenario: 'پزشک آنکال به صورت تلفنی دستور تزریق دارویی خطرناک را می‌دهد. پرستار صدای او را واضح نمی‌شنود اما پزشک عجله دارد.',
          context: 'پیشگیری از خطای دارویی مرگبار در دستورات کلامی.',
          options: [
            {
              id: 'j-sjt-1',
              text: 'دستور را بنویسید، با صدای بلند برای پزشک بازخوانی کنید (Read-back) و تایید صریح نام دارو، دوز و مسیر تزریق را بگیرید.',
              score: 5,
              effectiveness: 'بسیار اثربخش',
              feedback: 'پروتکل Write down - Read back - Confirm استاندارد الزامی پیشگیری از خطای نسخه تلفنی است.'
            }
          ]
        }
      }
    ]
  )
];
