import { AssessmentTest } from '../types/assessment';

export const ASSESSMENT_TESTS: AssessmentTest[] = [
  // 1. CODING / PROGRAMMING: JavaScript Algorithms & Data Transformation
  {
    id: 'test-js-algorithms',
    titleFa: 'برنامه‌نویسی جاوااسکریپت: تبدیل داده‌ها و الگوریتم',
    titleEn: 'JavaScript: Data Transformation & Algorithms',
    categoryId: 'it_software',
    testType: 'coding',
    difficulty: 'متوسط',
    durationMinutes: 25,
    questionCount: 3,
    descriptionFa: 'سنجش مهارت عملی در نوشتن کدهای تمیز جاوااسکریپت، کار با ساختارهای داده، آرایه‌ها، اشیاء و الگوریتم‌های پرکاربرد توسعه نرم‌افزار.',
    targetRoles: ['Frontend Developer', 'Fullstack Engineer', 'Node.js Developer', 'React Specialist'],
    skillsCovered: ['JavaScript ES6+', 'Array Operations', 'Data Aggregation', 'Edge Case Handling', 'Time Complexity'],
    popularityScore: 98,
    questions: [
      {
        id: 'q-js-1',
        kind: 'coding',
        title: 'تجمیع و میانگین‌گیری حقوق دپارتمان‌ها (Data Aggregation)',
        points: 40,
        codingData: {
          language: 'javascript',
          problemStatement: `تابعی به نام \`aggregateSalaries(employees)\` بنویسید که آرایه‌ای از اشیاء کارمندان را دریافت کرده و خروجی را به صورت یک شیء برگرداند که در آن کلیدها نام دپارتمان و مقادیر آن میانگین حقوق (گرد شده به ۲ رقم اعشار) آن دپارتمان باشد.\n\nاگر دپارتمانی کارمندی با حقوق معتبر نداشت، میانگین آن را 0 در نظر بگیرید.`,
          constraints: [
            'آرایه ممکن است خالی باشد (خروجی شیء خالی {} خواهد بود).',
            'حقوق‌ها اعداد مثبت صحیح یا اعشاری هستند.',
            'از متدهای مدرن جاوااسکریپت (مانند reduce، map و غیره) یا حلقه‌های استاندارد استفاده نمایید.'
          ],
          starterCode: `function aggregateSalaries(employees) {
  // کدهای خود را اینجا بنویسید
  const deptTotals = {};
  
  if (!employees || employees.length === 0) {
    return {};
  }

  for (const emp of employees) {
    if (!deptTotals[emp.department]) {
      deptTotals[emp.department] = { sum: 0, count: 0 };
    }
    deptTotals[emp.department].sum += emp.salary;
    deptTotals[emp.department].count += 1;
  }

  const result = {};
  for (const dept in deptTotals) {
    result[dept] = Number((deptTotals[dept].sum / deptTotals[dept].count).toFixed(2));
  }

  return result;
}`,
          examples: [
            {
              input: `[
  { name: "Ali", department: "IT", salary: 3000 },
  { name: "Sara", department: "IT", salary: 5000 },
  { name: "Reza", department: "HR", salary: 2500 }
]`,
              output: `{"IT": 4000, "HR": 2500}`,
              explanation: 'میانگین دپارتمان IT برابر (3000 + 5000) / 2 = 4000 و HR برابر 2500 است.'
            }
          ],
          testCases: [
            {
              id: 'tc-1',
              description: 'آرایه استاندارد چند دپارتمان',
              input: `[{"name":"Ali","department":"IT","salary":3000},{"name":"Sara","department":"IT","salary":5000},{"name":"Reza","department":"HR","salary":2500}]`,
              expectedOutput: `{"IT":4000,"HR":2500}`
            },
            {
              id: 'tc-2',
              description: 'دپارتمان با یک کارمند',
              input: `[{"name":"Mina","department":"Finance","salary":4200}]`,
              expectedOutput: `{"Finance":4200}`
            },
            {
              id: 'tc-3',
              description: 'ورودی با اعشار دقیق',
              input: `[{"name":"A","department":"Dev","salary":100},{"name":"B","department":"Dev","salary":200},{"name":"C","department":"Dev","salary":250}]`,
              expectedOutput: `{"Dev":183.33}`
            },
            {
              id: 'tc-4',
              description: 'آرایه خالی',
              input: `[]`,
              expectedOutput: `{}`
            }
          ]
        }
      },
      {
        id: 'q-js-2',
        kind: 'coding',
        title: 'یافتن جفت با مجموع هدف (Two Sum Target Search)',
        points: 35,
        codingData: {
          language: 'javascript',
          problemStatement: `تابعی بنویسید به نام \`findTwoSum(numbers, target)\` که آرایه‌ای از اعداد و یک عدد هدف (target) را دریافت کند و اندیس‌های دو عددی را که جمع آن‌ها برابر target می‌شود به صورت آرایه [index1, index2] برگرداند.\n\nاگر پاسخی وجود نداشت، \`null\` برگردانید.`,
          constraints: [
            'هر عضو تنها یک‌بار می‌تواند استفاده شود.',
            'مرتبه زمانی الگوریتم ترجیحاً O(n) باشد.'
          ],
          starterCode: `function findTwoSum(numbers, target) {
  const map = new Map();
  for (let i = 0; i < numbers.length; i++) {
    const diff = target - numbers[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(numbers[i], i);
  }
  return null;
}`,
          examples: [
            {
              input: `[2, 7, 11, 15], 9`,
              output: `[0, 1]`
            }
          ],
          testCases: [
            {
              id: 'tc-2-1',
              description: 'تست پایه مجموع اولیه',
              input: `[2, 7, 11, 15], 9`,
              expectedOutput: `[0,1]`
            },
            {
              id: 'tc-2-2',
              description: 'عناصر با فواصل دورتر',
              input: `[3, 2, 4], 6`,
              expectedOutput: `[1,2]`
            },
            {
              id: 'tc-2-3',
              description: 'عدم وجود پاسخ',
              input: `[1, 2, 3], 10`,
              expectedOutput: `null`
            }
          ]
        }
      },
      {
        id: 'q-js-3',
        kind: 'mcq',
        title: 'رفتار Event Loop و Microtasks در جاوااسکریپت',
        points: 25,
        mcqData: {
          question: `خروجی قطعه کد زیر در موتورهای مدرن جاوااسکریپت به چه ترتیبی در کنسول چاپ خواهد شد؟

console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');`,
          options: [
            { id: 'opt-1', text: '1, 2, 3, 4', isCorrect: false },
            { id: 'opt-2', text: '1, 4, 3, 2', isCorrect: true },
            { id: 'opt-3', text: '1, 4, 2, 3', isCorrect: false },
            { id: 'opt-4', text: '3, 1, 4, 2', isCorrect: false }
          ],
          explanation: 'ابتدا کدهای سنکرون (1 و 4) اجرا می‌شوند. سپس صف Microtaskها (Promise callback) پردازش شده و 3 چاپ می‌شود، و در پایان Macrotask (setTimeout) اجرا گردیده و 2 چاپ خواهد شد.'
        }
      }
    ]
  },

  // 2. CODING / PROGRAMMING: Python Data Analysis & Logic
  {
    id: 'test-python-backend',
    titleFa: 'برنامه‌نویسی پایتون: ساختارهای داده و بهینه‌سازی',
    titleEn: 'Python: Data Structures & Backend Logic',
    categoryId: 'it_software',
    testType: 'programming',
    difficulty: 'متوسط',
    durationMinutes: 30,
    questionCount: 3,
    descriptionFa: 'ارزیابی توانایی حل چالش‌های پردازش داده، توابع کمکی پایتونیک، دیکشنری‌ها و کارایی الگوریتم در بک‌اند.',
    targetRoles: ['Backend Python Developer', 'Data Engineer', 'Django/FastAPI Engineer', 'AI Engineer'],
    skillsCovered: ['Python 3.x', 'List Comprehensions', 'Hashing', 'Data Sanitization', 'OOP'],
    popularityScore: 94,
    questions: [
      {
        id: 'q-py-1',
        kind: 'coding',
        title: 'پاکسازی و گروه‌بندی لاگ‌های خطا (Log Sanitizer)',
        points: 40,
        codingData: {
          language: 'javascript', // Runs in browser JS executor with simulated python wrapper
          problemStatement: `تابعی بنویسید که لیستی از رکوردهای لاگ به صورت رشته دریافت کرده و تعداد تکرار هر خطای با سطح "ERROR" یا "CRITICAL" را به تفکیک پیام خطا به صورت شیء شمارش کند.\nفرمت هر رکورد: "[LEVEL] ServiceName: Message"`,
          constraints: [
            'سطوح لاگ بی‌اثر (INFO, DEBUG, WARN) باید نادیده گرفته شوند.',
            'پیام‌های خطا باید trim شوند.'
          ],
          starterCode: `function countCriticalErrors(logs) {
  const result = {};
  if (!logs || !Array.isArray(logs)) return result;

  for (const log of logs) {
    const match = log.match(/^\\[(ERROR|CRITICAL)\\]\\s*[^:]+:\\s*(.*)$/);
    if (match) {
      const msg = match[2].trim();
      result[msg] = (result[msg] || 0) + 1;
    }
  }
  return result;
}`,
          examples: [
            {
              input: `[
  "[INFO] Auth: User logged in",
  "[ERROR] DB: Connection timeout",
  "[CRITICAL] Payment: Gateway 502",
  "[ERROR] DB: Connection timeout"
]`,
              output: `{"Connection timeout": 2, "Gateway 502": 1}`
            }
          ],
          testCases: [
            {
              id: 'tc-py-1',
              description: 'شمارش خطاهای ترکیبی',
              input: `["[ERROR] Auth: Bad token", "[ERROR] Auth: Bad token", "[INFO] Main: Running", "[CRITICAL] Storage: Disk full"]`,
              expectedOutput: `{"Bad token":2,"Disk full":1}`
            },
            {
              id: 'tc-py-2',
              description: 'فقط لاگ‌های بی‌اثر INFO',
              input: `["[INFO] A: OK", "[DEBUG] B: Trace"]`,
              expectedOutput: `{}`
            }
          ]
        }
      },
      {
        id: 'q-py-2',
        kind: 'mcq',
        title: 'مدیریت حافظه و عملکرد ژنراتورها در پایتون',
        points: 30,
        mcqData: {
          question: 'کدام گزینه مزیت اصلی استفاده از Generator (با کلیدواژه yield) نسبت به ساخت یک List کامل در پایتون است؟',
          options: [
            { id: 'opt-1', text: 'سرعت دسترسی تصادفی (Random Access O(1)) بیشتر به المان‌ها', isCorrect: false },
            { id: 'opt-2', text: 'ارزیابی تنبل (Lazy Evaluation) و مصرف حداقل حافظه RAM در مواجهه با مجموعه داده‌های بزرگ', isCorrect: true },
            { id: 'opt-3', text: 'پشتیبانی اتوماتیک از Multi-threading بدون نیاز به قفل GIL', isCorrect: false },
            { id: 'opt-4', text: 'امکان ذخیره‌سازی خودکار داده‌ها در دیتابیس Redis', isCorrect: false }
          ],
          explanation: 'ژنراتورها داده‌ها را به محض درخواست (on-the-fly) تولید می‌کنند، بنابراین نیاز به بارگذاری یک‌باره کل داده‌ها در رم وجود ندارد.'
        }
      },
      {
        id: 'q-py-3',
        kind: 'mcq',
        title: 'طراحی Rest API و Idempotency',
        points: 30,
        mcqData: {
          question: 'کدام‌یک از متدهای HTTP زیر از لحاظ استاندارد REST ذاتا خنثی‌اثر (Idempotent) در نظر گرفته می‌شوند؟',
          options: [
            { id: 'opt-1', text: 'فقط POST', isCorrect: false },
            { id: 'opt-2', text: 'متدهای GET، PUT و DELETE', isCorrect: true },
            { id: 'opt-3', text: 'فقط POST و PATCH', isCorrect: false },
            { id: 'opt-4', text: 'هیچ‌کدام از متدها Idempotent نیستند', isCorrect: false }
          ],
          explanation: 'در استانداردهای HTTP، متدهای GET، PUT و DELETE در صورت فراخوانی مکرر باید وضعیت یکسانی در سرور ایجاد کنند.'
        }
      }
    ]
  },

  // 3. PROBLEM SOLVING: تفکر تحلیلی و حل مسئله
  {
    id: 'test-problem-solving',
    titleFa: 'حل مسئله و تفکر تحلیلی (Problem Solving & Analytical Thinking)',
    titleEn: 'Problem Solving & Cognitive Analytical Aptitude',
    categoryId: 'management_business',
    testType: 'problem_solving',
    difficulty: 'متوسط',
    durationMinutes: 20,
    questionCount: 4,
    descriptionFa: 'ارزیابی استعداد استدلال استنتاجی، استدلال عددی، شکستن مسائل پیچیده به مولفه‌های قابل مدیریت و تصمیم‌گیری مبتنی بر داده.',
    targetRoles: ['Product Manager', 'Data Analyst', 'Software Architect', 'Operations Specialist', 'Business Consultant'],
    skillsCovered: ['Deductive Reasoning', 'Data Analysis', 'Root Cause Analysis', 'Logical Deduction', 'Decision Modeling'],
    popularityScore: 97,
    questions: [
      {
        id: 'q-ps-1',
        kind: 'mcq',
        title: 'تحلیل گلوگاه ظرفیت و بهره‌وری خط تولید (Bottleneck Analysis)',
        points: 25,
        mcqData: {
          question: `یک خط فرآیندی شامل ۴ ایستگاه متوالی A، B، C و D است. نرخ پردازش هر ایستگاه بر حسب قطعه در ساعت به این ترتیب است:
- ایستگاه A: ۱۲۰ قطعه/ساعت
- ایستگاه B: ۸۰ قطعه/ساعت
- ایستگاه C: ۱۱۰ قطعه/ساعت
- ایستگاه D: ۹۰ قطعه/ساعت

مدیریت قصد دارد ظرفیت ایستگاه B را با خرید تجهیزات جدید ۳۰٪ افزایش دهد. ظرفیت حداکثر کل سیستم پس از این سرمایه‌گذاری چقدر خواهد بود؟`,
          options: [
            { id: 'opt-1', text: '۸۰ قطعه در ساعت', isCorrect: false },
            { id: 'opt-2', text: '۹۰ قطعه در ساعت (ایستگاه D گلوگاه جدید می‌شود)', isCorrect: true },
            { id: 'opt-3', text: '۱۰۴ قطعه در ساعت', isCorrect: false },
            { id: 'opt-4', text: '۱۱۰ قطعه در ساعت', isCorrect: false }
          ],
          explanation: 'ظرفیت جدید ایستگاه B برابر است با 80 * 1.3 = 104 قطعه در ساعت. بنابراین گلوگاه سیستم به ایستگاه بعدی با کمترین خروجی یعنی ایستگاه D با ظرفیت 90 قطعه در ساعت منتقل می‌شود و حداکثر خروجی کل خط 90 قطعه خواهد بود.'
        }
      },
      {
        id: 'q-ps-2',
        kind: 'mcq',
        title: 'توالی منطقی و کشف الگوی ماتریسی (Pattern Recognition)',
        points: 25,
        mcqData: {
          question: `به سری اعداد زیر دقت کنید:
۳, ۸, ۲۴, ۴۸, ۱۲۰, ?
عدد بعدی در این توالی چیست؟`,
          options: [
            { id: 'opt-1', text: '۱۴۴', isCorrect: false },
            { id: 'opt-2', text: '۱۶۸ (بر اساس الگوی n^2 - 1 برای اعداد اول متوالی)', isCorrect: true },
            { id: 'opt-3', text: '۲۰۰', isCorrect: false },
            { id: 'opt-4', text: '۱۸۰', isCorrect: false }
          ],
          explanation: 'این دنباله حاصل تفاضل مجذور اعداد اول منهای یک است: (2^2 - 1 = 3)، (3^2 - 1 = 8)، (5^2 - 1 = 24)، (7^2 - 1 = 48)، (11^2 - 1 = 120). عدد اول بعدی 13 است، بنابراین: 13^2 - 1 = 169 - 1 = 168.'
        }
      },
      {
        id: 'q-ps-3',
        kind: 'mcq',
        title: 'تحلیل داده‌های فروش و نرخ بازگشت مشتری (Cohorts & Churn)',
        points: 25,
        mcqData: {
          question: `شرکتی دارای ۱۰۰۰ مشترک فعال در ابتدای ماه است.
- هزینه اشتراک ماهانه هر کاربر: ۵۰ دلار
- نرخ ریزش ماهانه (Monthly Churn): ۵٪
- مشتریان جدید جذب شده در طول ماه: ۸۰ نفر با هزینه جذب (CAC) هر نفر ۳۰ دلار

درآمد تکرارشونده ماهانه (MRR) در انتهای ماه چند دلار خواهد بود؟`,
          options: [
            { id: 'opt-1', text: '۵۱,۵۰۰ دلار (۱۰۳۰ مشترک × ۵۰)', isCorrect: true },
            { id: 'opt-2', text: '۴۸,۰۰۰ دلار', isCorrect: false },
            { id: 'opt-3', text: '۵۴,۰۰۰ دلار', isCorrect: false },
            { id: 'opt-4', text: '۴۹,۱۰۰ دلار', isCorrect: false }
          ],
          explanation: 'تعداد مشتریان باقیمانده از قبل: 1000 - (5% * 1000) = 950 مشترک. تعداد با مشتریان جدید: 950 + 80 = 1030 مشترک. درآمد ماهانه: 1030 * 50 دلار = 51,500 دلار.'
        }
      },
      {
        id: 'q-ps-4',
        kind: 'mcq',
        title: 'استدلال استنتاجی شرطی (Deductive Logic)',
        points: 25,
        mcqData: {
          question: `فرض کنید دو گزاره زیر صحیح هستند:
۱. تمام توسعه‌دهندگانی که تست واحد (Unit Test) می‌نویسند، باگ‌های کمتری در محصول زنده دارند.
۲. رضا مهندس نرم‌افزار است، اما تست واحد نمی‌نویسد.

بر اساس اصول استدلال منطقی، کدام نتیجه‌گیری قطعی و غیرقابل رد است؟`,
          options: [
            { id: 'opt-1', text: 'محصولات رضا قطعاً پر از باگ‌های بحرانی است.', isCorrect: false },
            { id: 'opt-2', text: 'رضا جزو دسته اول (توسعه‌دهندگان تست‌نویس با باگ کمتر) نیست.', isCorrect: true },
            { id: 'opt-3', text: 'رضا باید فوراً توبیخ یا اخراج شود.', isCorrect: false },
            { id: 'opt-4', text: 'تست‌های واحد تاثیری در کیفیت کار رضا ندارند.', isCorrect: false }
          ],
          explanation: 'گزاره ۱ شرط کافی است اما نگفته تنها راه داشتن باگ کمتر تست واحد است؛ بنابراین تنها نتیجه منطقی صریح این است که رضا جزو دسته مورد اشاره در گزاره اول قرار نمی‌گیرد.'
        }
      }
    ]
  },

  // 4. SITUATIONAL JUDGMENT TEST (SJT): قضاوت موقعیتی کاری
  {
    id: 'test-sjt-workplace',
    titleFa: 'آزمون قضاوت موقعیتی در محیط کار (Situational Judgment Test)',
    titleEn: 'Workplace Situational Judgment & Professional Ethics',
    categoryId: 'management_business',
    testType: 'situational_judgment',
    difficulty: 'متوسط',
    durationMinutes: 20,
    questionCount: 3,
    descriptionFa: 'شبیه‌سازی چالش‌ها و دوراهی‌های واقعی محیط سازمانی: حل تعارض، اولویت‌بندی در شرایط فشار، مدیریت انتظارات ذینفعان و رفتار حرفه‌ای.',
    targetRoles: ['Team Lead', 'Engineering Manager', 'Scrum Master', 'Operations Manager', 'All Knowledge Workers'],
    skillsCovered: ['Conflict Resolution', 'Prioritization Under Pressure', 'Stakeholder Management', 'Professional Integrity'],
    popularityScore: 96,
    questions: [
      {
        id: 'q-sjt-1',
        kind: 'sjt',
        title: 'سناریوی ۱: تعارض بین ضرب‌الاجل انتشار و بدهی فنی پنهان',
        points: 35,
        sjtData: {
          scenario: `شما لید فنی یک فیچر بسیار کلیدی هستید که قرار است طبق تعهد به هیئت مدیره و مشتریان، فردا در رویداد زنده رونمایی شود. در تست نهایی نیمه‌شب، متوجه می‌شوید که یک نقص همزمانی (Race Condition) در تراکنش‌ها وجود دارد که در شرایط ترافیک سنگین (۱٪ مواقع) ممکن است منجر به گزارش تکراری شود. رفع اساسی این مشکل حداقل ۳ روز زمان نیاز دارد، اما تیم مارکتینگ تمام هزینه‌های تبلیغاتی رونمایی را پرداخت کرده است.`,
          context: 'سازمان تحت فشار شدید تبلیغاتی و وعده عمومی به بازار قرار دارد و شما باید به عنوان فرد کلیدی تصمیم بگیرید.',
          options: [
            {
              id: 'sjt-opt-1',
              text: 'موضوع را بدون سر و صدا نادیده گرفته و فیچر را منتشر کنید؛ اگر مشتری متوجه باگ شد در آپدیت بعدی بی سر و صدا رفع کنید.',
              score: 1,
              effectiveness: 'نامناسب و پرریسک',
              feedback: 'پنهان‌کاری نقایص بحرانی می‌تواند خسارت‌های جبران‌ناپذیر اعتباری و مالی به بار آورد.'
            },
            {
              id: 'sjt-opt-2',
              text: 'جلسه فوری صبح زود با مدیر محصول و مارکتینگ تشکیل داده، ریسک دقیق را شرح دهید و پیشنهاد دهید فیچر با محدودسازی ظرفیت (Feature Flag / Throttling) رونمایی شود و اصلاحیه کامل ظرف ۲ روز اعمال گردد.',
              score: 5,
              effectiveness: 'بسیار اثربخش',
              feedback: 'این رویکرد شفافیت کامل، ارائه راهکار کاهش ریسک عملیاتی و حفظ تعهدات مارکتینگ را همزمان محقق می‌سازد.'
            },
            {
              id: 'sjt-opt-3',
              text: 'مستقیماً به مدیرعامل ایمیل بزنید و اعلام کنید تیم محصول غیرحرفه‌ای عمل کرده و لانچ باید کلاً ۲ هفته به تعویق بیفتد.',
              score: 2,
              effectiveness: 'نامناسب و پرریسک',
              feedback: 'مقصر دانستن دیگران و واکنش هیجانی بدون ارائه راهکار میانی به همکاری تیمی آسیب می‌زند.'
            },
            {
              id: 'sjt-opt-4',
              text: 'تلاش کنید کل شب را بدون خوابیدن روی یک پچ موقت غیراستاندارد کار کنید تا شاید باگ مخفی شود.',
              score: 3,
              effectiveness: 'خنثی / کم‌اثر',
              feedback: 'پچ‌های عجولانه شبانه در وضعیت فرسودگی ذهنی معمولاً باگ‌های جانبی وخیم‌تری ایجاد می‌کنند.'
            }
          ]
        }
      },
      {
        id: 'q-sjt-2',
        kind: 'sjt',
        title: 'سناریوی ۲: همکار کم‌کار در اسپرینت مشترک',
        points: 35,
        sjtData: {
          scenario: `یکی از اعضای تیم شما که وظیفه تحویل بخشی از تسک‌های وابسته به کار شما را داشته، دو اسپرینت پیاپی به ددلاین‌ها نرسیده و در جلسات اسکرام بهانه‌تراشی می‌کند. این موضوع باعث شده خروجی کل تیم پایین بیاید و شما مجبور شده‌اید چندین شب اضافه کاری کنید تا کار او را جبران نمایید.`,
          context: 'رابطه شما با این همکار در گذشته خوب بوده اما اکنون عملکرد ضعیف او مستقیماً روی ارزیابی شما تاثیر منفی می‌گذارد.',
          options: [
            {
              id: 'sjt-opt-2-1',
              text: 'در جلسه عمومی استندآپ روز بعد جلوی همه اعضا از او انتقاد تند کنید تا احساس مسئولیت کند.',
              score: 1,
              effectiveness: 'نامناسب و پرریسک',
              feedback: 'شرمنده کردن افراد در جمع باعث موضع دفاعی، تخریب اعتماد تیمی و قطع ارتباط موثر می‌شود.'
            },
            {
              id: 'sjt-opt-2-2',
              text: 'یک گفتگوی دونفره خصوصی و همدلانه با او ترتیب دهید؛ مشاهدات عینی خود را از تاخیر تسک‌ها بیان کنید و بپرسید با چه چالش‌هایی روبروست و چگونه می‌توان کارها را شفاف تقسیم کرد.',
              score: 5,
              effectiveness: 'بسیار اثربخش',
              feedback: 'بازخورد سازنده بر پایه فکت‌های عینی همراه با گوش دادن فعال، استاندارد طلایی حل تعارض بین‌فردی است.'
            },
            {
              id: 'sjt-opt-2-3',
              text: 'به سکوت خود ادامه دهید و تمام وظایف او را خودتان انجام دهید تا پروژه آسیب نبیند.',
              score: 2,
              effectiveness: 'خنثی / کم‌اثر',
              feedback: 'این رفتار منجر به فرسودگی شغلی شما، تداوم مسئولیت‌گریزی همکار و عدم حل ریشه‌ای مسئله می‌شود.'
            },
            {
              id: 'sjt-opt-2-4',
              text: 'بدون صحبت با او، مستقیماً به مدیر منابع انسانی شکایت مکتوب ارسال کنید.',
              score: 2,
              effectiveness: 'نامناسب و پرریسک',
              feedback: 'ارجاع مستقیم به مدیریت پیش از تلاش برای گفتگوی مستقیم نشان‌دهنده ضعف در مهارت‌های ارتباطی فردی است.'
            }
          ]
        }
      },
      {
        id: 'q-sjt-3',
        kind: 'sjt',
        title: 'سناریوی ۳: مشتری کلیدی با درخواست غیرمنطقی خارج از قرارداد',
        points: 30,
        sjtData: {
          scenario: `بزرگترین مشتری سازمانی شرکت تماس گرفته و با لحنی معترض خواستار افزودن فیچری کاملاً اختصاصی تا انتهای هفته شده است که جزو قرارداد اولیه نبوده و تیم را از نقشه راه اصلی منحرف می‌کند. او تهدید می‌کند در صورت عدم انجام، قرارداد سالانه خود را لغو خواهد کرد.`,
          context: 'شما مدیر ارتباط با مشتری / مدیر فنی پروژه هستید.',
          options: [
            {
              id: 'sjt-opt-3-1',
              text: 'بلافاصله تسلیم شوید و تمام برنامه‌های تیم‌های دیگر را متوقف کنید تا نظر مشتری جلب شود.',
              score: 2,
              effectiveness: 'نامناسب و پرریسک',
              feedback: 'تسلیم شدن بی‌قید و شرط، نقشه راه کل شرکت را متزلزل کرده و انتظارات غیرواقعی مکرر ایجاد می‌کند.'
            },
            {
              id: 'sjt-opt-3-2',
              text: 'با خونسردی و همدلی نیاز اصلی و دغدغه تجاری پشت این درخواست را واکاوی کنید؛ سپس یک جلسه کاری برای بررسی فازبندی شده راهکار یا الحاقیه قرارداد با برآورد شفاف زمان و هزینه پیشنهاد دهید.',
              score: 5,
              effectiveness: 'بسیار اثربخش',
              feedback: 'کنترل تنش، درک نیاز واقعی کسب‌وکار مشتری، و چارچوب‌بندی در قالب فرآیند حرفه‌ای رضایت پایدار ایجاد می‌کند.'
            },
            {
              id: 'sjt-opt-3-3',
              text: 'به مشتری بگویید این درخواست نقض صریح قرارداد است و گوشی را قطع کنید.',
              score: 1,
              effectiveness: 'نامناسب و پرریسک',
              feedback: 'برخورد تهاجمی و غیرحرفه‌ای منجر به از دست رفتن حساب‌های تجاری بزرگ و تخریب برند می‌شود.'
            }
          ]
        }
      }
    ]
  },

  // 5. PERSONALITY & CULTURE FIT: رفتار سازمانی و تطابق فرهنگی
  {
    id: 'test-personality-culture',
    titleFa: 'ارزیابی رفتار سازمانی، تاب‌آوری و فرهنگ کاری',
    titleEn: 'Workplace Personality & Culture Alignment',
    categoryId: 'hr_administration',
    testType: 'personality_culture',
    difficulty: 'مقدماتی',
    durationMinutes: 15,
    questionCount: 5,
    descriptionFa: 'ارزیابی ویژگی‌های شخصیتی شغلی پنج‌گانه (Big Five)، تعهد و وجدان کاری، سازگاری تیمی، پیش‌قدمی و انگیزه در محیط کار پویا.',
    targetRoles: ['All Roles', 'Cultural Fit Screen', 'New Hires', 'Leadership Track'],
    skillsCovered: ['Conscientiousness', 'Team Collaboration', 'Emotional Resilience', 'Adaptability', 'Initiative'],
    popularityScore: 99,
    questions: [
      {
        id: 'q-pers-1',
        kind: 'personality',
        title: 'تعهد به کیفیت و توجه به جزئیات',
        points: 20,
        personalityData: {
          statement: 'حتی در شرایطی که هیچ نظارتی وجود ندارد و ضرب‌الاجل نزدیک است، پیش از تحویل کار همه جزئیات را با چک‌لیست دقیق بازبینی می‌کنم.',
          dimension: 'conscientiousness'
        }
      },
      {
        id: 'q-pers-2',
        kind: 'personality',
        title: 'همکاری و اولویت موفقیت تیمی',
        points: 20,
        personalityData: {
          statement: 'برای دستیابی به هدف مشترک تیم، با کمال میل حاضرم بخشی از وظایفم را فراتر از شرح شغلی رسمی بپذیرم.',
          dimension: 'teamwork'
        }
      },
      {
        id: 'q-pers-3',
        kind: 'personality',
        title: 'پایداری هیجانی و تاب‌آوری در برابر ابهام',
        points: 20,
        personalityData: {
          statement: 'هنگامی که اولویت‌های پروژه به صورت ناگهانی توسط مدیریت تغییر می‌کند، بدون سرخوردگی و با انرژی مثبت مسیر را بازتعریف می‌کنم.',
          dimension: 'adaptability'
        }
      },
      {
        id: 'q-pers-4',
        kind: 'personality',
        title: 'پیش‌قدمی و رهبری غیررسمی',
        points: 20,
        personalityData: {
          statement: 'اگر در فرآیندهای شرکت نقصی مشاهده کنم، منتظر دستور مدیر نمی‌مانم و شخصاً راهکار بهبود تدوین کرده و ارائه می‌دهم.',
          dimension: 'leadership'
        }
      },
      {
        id: 'q-pers-5',
        kind: 'personality',
        title: 'مدیریت استرس در شرایط بحران',
        points: 20,
        personalityData: {
          statement: 'در مواجهه با بازخوردهای تند یا مواعد کاری فشرده، خونسردی و توانایی تصمیم‌گیری منطقی خود را کاملاً حفظ می‌کنم.',
          dimension: 'stress_tolerance'
        }
      }
    ]
  },

  // 6. ROLE-SPECIFIC: مالی و حسابداری (Finance, Accounting & Banking)
  {
    id: 'test-finance-accounting',
    titleFa: 'تحلیل صورت‌های مالی، استانداردها و بودجه‌ریزی',
    titleEn: 'Financial Statement Analysis & Managerial Accounting',
    categoryId: 'finance_banking',
    testType: 'role_specific',
    difficulty: 'پیشرفته',
    durationMinutes: 25,
    questionCount: 3,
    descriptionFa: 'سنجش دانش تخصصی صورت سود و زیان، ترازنامه، جریان وجوه نقد، تحلیل نسبت‌های مالی و ارزیابی ریسک‌های پولی.',
    targetRoles: ['Financial Analyst', 'Senior Accountant', 'Finance Manager', 'Auditor'],
    skillsCovered: ['Balance Sheet Auditing', 'Cash Flow Analysis', 'EBITDA Calculation', 'Working Capital Management'],
    popularityScore: 91,
    questions: [
      {
        id: 'q-fin-1',
        kind: 'mcq',
        title: 'تحلیل جریان وجوه نقد عملیاتی در مقابل سود خالص',
        points: 35,
        mcqData: {
          question: `اگر شرکتی در صورت سود و زیان خود سودی معادل ۱۰ میلیارد تومان گزارش کند، اما در صورت جریان وجوه نقد، جریان نقد حاصل از عملیات منفی ۳ میلیارد تومان باشد، محتمل‌ترین دلیل چیست؟`,
          options: [
            { id: 'f-1', text: 'افزایش چشمگیر در حساب‌های دریافتنی (فروش‌های نسیه وصول‌نشده) یا انباشت موجودی کالا', isCorrect: true },
            { id: 'f-2', text: 'کاهش نرخ استهلاک دارایی‌های ثابت مشهود', isCorrect: false },
            { id: 'f-3', text: 'پرداخت سود سهامداران در بخش تامین مالی', isCorrect: false },
            { id: 'f-4', text: 'انتشار اوراق قرضه جدید توسط شرکت', isCorrect: false }
          ],
          explanation: 'وقتی سود تعهدی بالاست اما جریان نقد عملیاتی منفی است، معمولاً منابع شرکت در حساب‌های دریافتنی وصول نشده یا کالای فروش‌نرفته در انبار بلوکه شده است.'
        }
      },
      {
        id: 'q-fin-2',
        kind: 'mcq',
        title: 'محاسبه نسبت جاری (Current Ratio) و سرمایه در گردش',
        points: 35,
        mcqData: {
          question: `دارایی‌های جاری شرکتی شامل: موجودی نقد (۵۰ م)، مطالبات تجاری (۱۵۰ م) و موجودی کالا (۱۰۰ م) است. بدهی‌های جاری نیز شامل بدهی‌های تجاری (۱۲۰ م) و مالیات پرداختی (۳۰ م) است. نسبت سریع (Quick Ratio / Acid-Test) این شرکت چقدر است؟`,
          options: [
            { id: 'f-2-1', text: '۲.۰', isCorrect: false },
            { id: 'f-2-2', text: '۱.۳۳ ((۵۰ + ۱۵۰) / ۱۵۰)', isCorrect: true },
            { id: 'f-2-3', text: '۱.۰', isCorrect: false },
            { id: 'f-2-4', text: '۱.۶۷', isCorrect: false }
          ],
          explanation: 'نسبت سریع برابر است با (دارایی‌های جاری منهای موجودی کالا) تقسیم بر بدهی‌های جاری: (300 - 100) / 150 = 200 / 150 = 1.33.'
        }
      },
      {
        id: 'q-fin-3',
        kind: 'mcq',
        title: 'ارزیابی تصمیمات سرمایه‌گذاری با NPV',
        points: 30,
        mcqData: {
          question: 'کدام‌یک از شرایط زیر توجیه‌پذیری اقتصادی اجرای یک پروژه سرمایه‌ای را اثبات می‌کند؟',
          options: [
            { id: 'f-3-1', text: 'خالص ارزش فعلی (NPV) بزرگتر از صفر و نرخ بازده داخلی (IRR) بزرگتر از نرخ تنزیل', isCorrect: true },
            { id: 'f-3-2', text: 'دوره بازگشت سرمایه کمتر از ۱۰ سال بدون در نظر گرفتن ارزش زمانی پول', isCorrect: false },
            { id: 'f-3-3', text: 'فقط بالا بودن سود ناخالص پیش‌بینی شده', isCorrect: false },
            { id: 'f-3-4', text: 'شاخص سودآوری (PI) کمتر از ۱.۰', isCorrect: false }
          ]
        }
      }
    ]
  },

  // 7. ROLE-SPECIFIC: فروش، بازاریابی و تبلیغات (Sales & Marketing)
  {
    id: 'test-sales-negotiation',
    titleFa: 'استراتژی مذاکره فروش سازمانی B2B و مدیریت لید',
    titleEn: 'B2B Sales Negotiation & Pipeline Management',
    categoryId: 'sales_marketing',
    testType: 'role_specific',
    difficulty: 'متوسط',
    durationMinutes: 20,
    questionCount: 3,
    descriptionFa: 'ارزیابی تسلط بر متدولوژی‌های فروش مشاوره‌ای (SPIN Selling)، مدیریت اعتراضات قیمت، ارزش‌گذاری مبتنی بر بازگشت سرمایه و بستن قراردادهای بزرگ.',
    targetRoles: ['Enterprise Account Executive', 'Sales Lead', 'Business Development Rep', 'Commercial Manager'],
    skillsCovered: ['SPIN Selling', 'Price Objection Handling', 'B2B Discovery', 'Value Proposition'],
    popularityScore: 92,
    questions: [
      {
        id: 'q-sales-1',
        kind: 'mcq',
        title: 'پاسخ به اعتراض قیمت مشتری سازمانی',
        points: 35,
        mcqData: {
          question: `در مرحله نهایی مذاکره با مدیر ارشد مالی (CFO)، مشتری می‌گوید: «نرم‌افزار شما بسیار کامل است اما قیمت پیشنهادی شما ۳۵٪ بالاتر از رقیب شماست؛ یا تخفیف فوری بدهید یا با رقیب قرارداد می‌بندیم». اثربخش‌ترین واکنش چیست؟`,
          options: [
            { id: 's-1', text: 'فوراً اعلام کنید ۴۰٪ تخفیف می‌دهید تا قرارداد از دست نرود.', isCorrect: false },
            { id: 's-2', text: 'تمرکز را از «قیمت اولیه خرید» به «هزینه کل مالکیت (TCO) و بازگشت سرمایه (ROI)» تغییر داده و با مدل مالی نشان دهید فیچرهای خاص شما چگونه هزینه‌های خطای انسانی را در سال اول جبران می‌کند.', isCorrect: true },
            { id: 's-3', text: 'به مشتری بگویید رقیب کلاهبردار است و محصول آن‌ها کار نمی‌کند.', isCorrect: false },
            { id: 's-4', text: 'مذاکره را بلافاصله قطع کنید چون ارزش شما را درک نکرده‌اند.', isCorrect: false }
          ],
          explanation: 'در فروش B2B، دفاع از قیمت با شواهد ملموس ROI و اجتناب از تنزیل شتاب‌زده ارزش برند و محصول را حفظ می‌نماید.'
        }
      },
      {
        id: 'q-sales-2',
        kind: 'mcq',
        title: 'مرحله کشف نیاز در روش SPIN Selling',
        points: 35,
        mcqData: {
          question: 'کدام‌یک از پرسش‌های زیر نمونه سوال «پیامد» (Implication Question) در تکنیک SPIN است؟',
          options: [
            { id: 's-2-1', text: 'در حال حاضر از چه نرم‌افزاری برای انبارداری استفاده می‌کنید؟', isCorrect: false },
            { id: 's-2-2', text: 'این تاخیرهای هفتگی در ارسال سفارش‌ها، چه هزینه‌ای روی نرخ ماندگاری مشتریان وفادار شما گذاشته است؟', isCorrect: true },
            { id: 's-2-3', text: 'آیا مایلید دموی محصول ما را در هفته آینده ببینید؟', isCorrect: false },
            { id: 's-2-4', text: 'بودجه سالانه بخش آی‌تی شما چقدر است؟', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-sales-3',
        kind: 'mcq',
        title: 'بهینه‌سازی نرخ تبدیل قیف فروش (CAC vs LTV)',
        points: 30,
        mcqData: {
          question: 'اگر هزینه جذب مشتری (CAC) یک کسب‌وکار SaaS برابر با ۱۰۰۰ دلار و ارزش طول عمر مشتری (LTV) معادل ۶۰۰ دلار باشد، چه وضعیتی حاکم است؟',
          options: [
            { id: 's-3-1', text: 'مدل تجاری پایدار نیست و شرکت با هر مشتری جدید متحمل زیان خالص می‌شود.', isCorrect: true },
            { id: 's-3-2', text: 'شاخص‌ها عالی هستند زیرا نسبت LTV/CAC زیر ۱ قرار دارد.', isCorrect: false },
            { id: 's-3-3', text: 'سودآوری شرکت تضمین شده است.', isCorrect: false }
          ]
        }
      }
    ]
  },

  // 8. ROLE-SPECIFIC: منابع انسانی و امور اداری (HR & Office Administration)
  {
    id: 'test-hr-recruitment',
    titleFa: 'استخدام مبتنی بر شایستگی و روابط کار',
    titleEn: 'Competency-Based Recruitment & Labor Relations',
    categoryId: 'hr_administration',
    testType: 'role_specific',
    difficulty: 'متوسط',
    durationMinutes: 20,
    questionCount: 3,
    descriptionFa: 'ارزیابی طراحی مصاحبه‌های ساختاریافته رفتارمحور (STAR)، مدل‌های شایستگی، حل تعارضات اداری و رعایت قوانین کار.',
    targetRoles: ['HR Specialist', 'Talent Acquisition Manager', 'People Operations Lead', 'Office Administrator'],
    skillsCovered: ['STAR Method Interviews', 'Labor Law Principles', 'Performance Reviews', 'Employee Retention'],
    popularityScore: 90,
    questions: [
      {
        id: 'q-hr-1',
        kind: 'mcq',
        title: 'طراحی سوال در مصاحبه رفتارمحور (STAR Method)',
        points: 35,
        mcqData: {
          question: 'کدام پرسش بهترین نمونه از یک سوال مصاحبه استاندارد رفتاری برای ارزیابی تاب‌آوری داوطلب است؟',
          options: [
            { id: 'hr-1', text: '«لطفاً موقعیتی را شرح دهید که در آن پروژه‌ای با شکست قطعی روبرو شد؛ دقیقاً چه واکنشی نشان دادید و نتیجه نهایی چه شد؟»', isCorrect: true },
            { id: 'hr-2', text: '«آیا شما فردی با تاب‌آوری بالا هستید؟»', isCorrect: false },
            { id: 'hr-3', text: '«اگر رئیس‌تان عصبانی شود، معمولاً چه حسی پیدا می‌کنید؟»', isCorrect: false },
            { id: 'hr-4', text: '«تعریف شما از مدیریت بحران چیست؟»', isCorrect: false }
          ],
          explanation: 'روش STAR بر رفتارهای گذشته کاندیدا در موقعیت‌های واقعی تمرکز دارد، زیرا رفتار گذشته بهترین پیش‌بینی‌کننده عملکرد آینده است.'
        }
      },
      {
        id: 'q-hr-2',
        kind: 'mcq',
        title: 'کاهش خطای سوگیری شناختی در استخدام (Halo Effect)',
        points: 35,
        mcqData: {
          question: 'کدام رویکرد موثرترین ابزار برای خنثی‌سازی خطای هاله‌ای (Halo Effect) ارزیاب‌ها در فرآیند گزینش است؟',
          options: [
            { id: 'hr-2-1', text: 'استفاده از مصاحبه ساختاریافته همراه با سنجه‌های ارزیابی عینی یکسان و مصاحبه‌کنندگان چندگانه مستقل', isCorrect: true },
            { id: 'hr-2-2', text: 'واگذاری کل مصاحبه به حس شهودی مدیر مستقیم', isCorrect: false },
            { id: 'hr-2-3', text: 'طولانی‌تر کردن زمان مصاحبه به بالای ۳ ساعت', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-hr-3',
        kind: 'mcq',
        title: 'تعریف فرمول نرخ خروج پرسنل (Turnover Rate)',
        points: 30,
        mcqData: {
          question: 'نرخ جابجایی کارکنان (Turnover Rate) سالانه از چه فرمولی محاسبه می‌شود؟',
          options: [
            { id: 'hr-3-1', text: '(تعداد افراد جدا شده از سازمان طی دوره ÷ میانگین تعداد کل کارکنان در همان دوره) × ۱۰۰', isCorrect: true },
            { id: 'hr-3-2', text: 'تعداد استخدام‌های جدید منهای افراد اخراج شده', isCorrect: false },
            { id: 'hr-3-3', text: 'نسبت کل حقوق پرداختی به ساعت کارکرد پرسنل', isCorrect: false }
          ]
        }
      }
    ]
  },

  // 9. LANGUAGE & COMMUNICATION: زبان انگلیسی بازرگانی و مکاتبات اداری
  {
    id: 'test-business-english',
    titleFa: 'مکاتبات تجاری و زبان انگلیسی حرفه‌ای (Business English)',
    titleEn: 'Business English & Professional Communication',
    categoryId: 'management_business',
    testType: 'language',
    difficulty: 'متوسط',
    durationMinutes: 15,
    questionCount: 3,
    descriptionFa: 'سنجش مهارت نگارش ایمیل‌های رسمی، اصطلاحات بازرگانی بین‌المللی، پاسخ به مشتریان خارجی و درک متون قراردادهای تجاری.',
    targetRoles: ['International Business Specialist', 'Export Manager', 'Customer Success', 'Consultant'],
    skillsCovered: ['Formal Correspondence', 'Negotiation Vocabulary', 'Tone Calibration', 'Contract Comprehension'],
    popularityScore: 93,
    questions: [
      {
        id: 'q-eng-1',
        kind: 'mcq',
        title: 'لحن حرفه‌ای در تاخیر تحویل سفارش خارجی',
        points: 35,
        mcqData: {
          question: `کدام جمله مناسب‌ترین و دیپلماتیک‌ترین عبارت برای ارسال ایمیل به شریک خارجی در مورد تاخیر تحویل کالا است؟`,
          options: [
            { id: 'e-1', text: 'We regret to inform you that due to unexpected supply chain disruptions, your shipment will experience a slight delay of 3 business days.', isCorrect: true },
            { id: 'e-2', text: 'Hey, sorry but we forgot to send your items on time.', isCorrect: false },
            { id: 'e-3', text: 'The delay is not our fault, you should have ordered earlier.', isCorrect: false },
            { id: 'e-4', text: 'No delivery this week.', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-eng-2',
        kind: 'mcq',
        title: 'اصطلاحات بازرگانی (Idiomatic Business Expressions)',
        points: 35,
        mcqData: {
          question: 'معنی عبارت تجاری "Let\'s table this topic for our next meeting" چیست؟',
          options: [
            { id: 'e-2-1', text: 'این موضوع را تا جلسه بعد به تعویق بیندازیم / فعلاً مسکوت بگذاریم.', isCorrect: true },
            { id: 'e-2-2', text: 'همین الان پشت میز بنشینیم و قرارداد را امضا کنیم.', isCorrect: false },
            { id: 'e-2-3', text: 'این موضوع را کلاً لغو کنیم و دیگر هرگز بررسی نکنیم.', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-eng-3',
        kind: 'mcq',
        title: 'درک مفهوم شرط حقوقی Force Majeure',
        points: 30,
        mcqData: {
          question: 'بند «Force Majeure» در قراردادهای بین‌المللی به چه مواردی اشاره دارد؟',
          options: [
            { id: 'e-3-1', text: 'رویدادهای پیش‌بینی‌ناپذیر خارج از کنترل طرفین (نظیر بلایای طبیعی، جنگ و شرایط اضطراری قهری)', isCorrect: true },
            { id: 'e-3-2', text: 'جریمه دیرکرد روزانه در پرداخت وجه', isCorrect: false },
            { id: 'e-3-3', text: 'پاداش تسریع در تحویل کالا', isCorrect: false }
          ]
        }
      }
    ]
  },

  // 10. ENGINEERING & TECHNICAL: استانداردهای فنی، کنترل کیفیت و HSE
  {
    id: 'test-engineering-quality',
    titleFa: 'مهندسی صنایع، کنترل کیفیت آماری و ایمنی HSE',
    titleEn: 'Industrial Quality Control (SPC) & HSE Engineering',
    categoryId: 'engineering_technical',
    testType: 'engineering_skills',
    difficulty: 'پیشرفته',
    durationMinutes: 25,
    questionCount: 3,
    descriptionFa: 'آزمون تخصصی شش سیگما، نمودارهای کنترل آماری شوهارت، شاخص‌های قابلیت فرآیند (Cp & Cpk) و استانداردهای ایمنی صنعتی.',
    targetRoles: ['Industrial Engineer', 'QA/QC Engineer', 'HSE Specialist', 'Production Supervisor'],
    skillsCovered: ['Statistical Process Control', 'Cp/Cpk Indices', 'Six Sigma DMAIC', 'Root Cause 5-Whys'],
    popularityScore: 89,
    questions: [
      {
        id: 'q-eng-tech-1',
        kind: 'mcq',
        title: 'تفسیر شاخص قابلیت فرآیند (Process Capability Cpk)',
        points: 35,
        mcqData: {
          question: `اگر برای یک فرآیند صنعتی شاخص Cp برابر با ۱.۶ باشد اما شاخص Cpk معادل ۰.۸۵ باشد، این فرآیند در چه وضعیتی قرار دارد؟`,
          options: [
            { id: 'et-1', text: 'پراکندگی فرآیند به خودی خود اندک است، اما میانگین فرآیند نسبت به حدود مشخصات فنی دچار انحراف از مرکز (Off-Center) شده است.', isCorrect: true },
            { id: 'et-2', text: 'فرآیند کاملاً در کنترل آماری و بدون نقص ضایعاتی است.', isCorrect: false },
            { id: 'et-3', text: 'فرآیند نیازمند بازطراحی کامل ماشین‌آلات به دلیل لرزش شدید است.', isCorrect: false }
          ],
          explanation: 'وقتی Cp بالا و Cpk پایین است، پتانسیل فرآیند عالی است اما میانگین از مرکز مشخصه فاصله گرفته است و تنظیم مجدد کالیبراسیون لازم است.'
        }
      },
      {
        id: 'q-eng-tech-2',
        kind: 'mcq',
        title: 'متدولوژی ریشه‌یابی خطای ۵ چرا (5-Whys)',
        points: 35,
        mcqData: {
          question: 'هدف اصلی روش ۵ چرا در متدولوژی تولید ناب چیست؟',
          options: [
            { id: 'et-2-1', text: 'رسیدن به علت ریشه‌ای سیستمی خرابی به جای بسنده کردن به علائم ظاهری یا سرزنش اپراتور', isCorrect: true },
            { id: 'et-2-2', text: 'پیدا کردن ۵ فرد مقصر در ایجاد خرابی قطعه', isCorrect: false },
            { id: 'et-2-3', text: 'محاسبه استهلاک ماشین در ۵ سال اول', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-eng-tech-3',
        kind: 'mcq',
        title: 'اصل هرم ایمنی هاینریش در HSE',
        points: 30,
        mcqData: {
          question: 'طبق هرم ایمنی، برای جلوگیری از یک حادثه فوتی یا قطع عضو شدید، تمرکز سیستماتیک باید روی چه چیزی باشد؟',
          options: [
            { id: 'et-3-1', text: 'شناسایی و حذف صدها رفتار ناایمن و شبه‌حادثه (Near Misses) در رده‌های پایین هرم', isCorrect: true },
            { id: 'et-3-2', text: 'تنها خرید تجهیزات گران‌قیمت آتش‌نشانی', isCorrect: false },
            { id: 'et-3-3', text: 'پنهان کردن آمار حوادث جزئی از بازرسان', isCorrect: false }
          ]
        }
      }
    ]
  },

  // 11. LOGISTICS & SUPPLY CHAIN: حمل و نقل و زنجیره تامین
  {
    id: 'test-supply-chain',
    titleFa: 'مدیریت زنجیره تأمین، لجستیک و انبارداری نوین',
    titleEn: 'Supply Chain Management & Warehouse Operations',
    categoryId: 'logistics_supply_chain',
    testType: 'role_specific',
    difficulty: 'متوسط',
    durationMinutes: 20,
    questionCount: 3,
    descriptionFa: 'ارزیابی مدل‌های اقتصادی سفارش‌دهی (EOQ)، اثر شلاق چرمی (Bullwhip Effect)، سیستم‌های مدیریت انبارداری WMS و لجستیک معکوس.',
    targetRoles: ['Supply Chain Manager', 'Logistics Coordinator', 'Procurement Specialist', 'Warehouse Lead'],
    skillsCovered: ['Bullwhip Effect Mitigation', 'EOQ Calculation', 'Safety Stock Sizing', 'Incoterms 2020'],
    popularityScore: 88,
    questions: [
      {
        id: 'q-log-1',
        kind: 'mcq',
        title: 'مهار اثر شلاق چرمی (Bullwhip Effect) در زنجیره تامین',
        points: 35,
        mcqData: {
          question: 'کدام اقدام کارآمدترین راهکار برای به حداقل رساندن نوسانات کاذب تقاضا (اثر شلاق چرمی) در کل زنجیره است؟',
          options: [
            { id: 'log-1', text: 'به اشتراک‌گذاری داده‌های نقطه فروش نهایی (POS) به صورت بلادرنگ میان تمام لایه‌های تامین‌کنندگان و خرده‌فروشان', isCorrect: true },
            { id: 'log-2', text: 'افزایش حجم دسته‌های سفارش به مقادیر بسیار بزرگ سالانه', isCorrect: false },
            { id: 'log-3', text: 'قطع ارتباط با تامین‌کنندگان مواد اولیه', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-log-2',
        kind: 'mcq',
        title: 'فرمول مقدار اقتصادی سفارش (EOQ)',
        points: 35,
        mcqData: {
          question: 'در مدل استاندارد اقتصادی سفارش (EOQ)، نقطه بهینه زمانی به دست می‌آید که چه رابطه‌ای برقرار باشد؟',
          options: [
            { id: 'log-2-1', text: 'هزینه نگهداری موجودی سالانه با هزینه سالانه سفارش‌دهی برابر شود.', isCorrect: true },
            { id: 'log-2-2', text: 'انبار کاملاً خالی شود.', isCorrect: false },
            { id: 'log-2-3', text: 'نرخ تورم صفر در نظر گرفته شود.', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-log-3',
        kind: 'mcq',
        title: 'قاعده اینکوترمز DDP در حمل و نقل بین‌المللی',
        points: 30,
        mcqData: {
          question: 'در ترم تجاری DDP (Delivered Duty Paid)، مسئولیت ترخیص کالا و پرداخت حقوق ورودی و گمرک بر عهده چه کسی است؟',
          options: [
            { id: 'log-3-1', text: 'فروشنده متعهد به پرداخت تمامی هزینه‌ها تا تحویل کالا در مقصد نهایی خریدار است.', isCorrect: true },
            { id: 'log-3-2', text: 'خریدار در بندر مبدأ تمام مسئولیت را به عهده می‌گیرد.', isCorrect: false },
            { id: 'log-3-3', text: 'هیچ‌کدام از طرفین مسئولیتی ندارند.', isCorrect: false }
          ]
        }
      }
    ]
  },

  // 12. HEALTH & MEDICINE: بهداشت، درمان و پروتکل‌های بالینی
  {
    id: 'test-healthcare-triage',
    titleFa: 'تریاژ بالینی، مراقبت‌های ویژه و ایمنی بیمار',
    titleEn: 'Clinical Triage Protocols & Patient Safety Standards',
    categoryId: 'health_medicine',
    testType: 'role_specific',
    difficulty: 'پیشرفته',
    durationMinutes: 20,
    questionCount: 3,
    descriptionFa: 'ارزیابی تصمیم‌گیری سریع در فوریت‌های پزشکی، پروتکل‌های تریاژ اورژانس (ESI)، مدیریت داروهای با هشدار بالا و ایمنی بالینی.',
    targetRoles: ['Emergency Nurse', 'Clinical Specialist', 'Hospital Supervisor', 'Paramedic'],
    skillsCovered: ['ESI Triage Scoring', 'High-Alert Drug Safety', 'Infection Control', 'Critical Decision-Making'],
    popularityScore: 87,
    questions: [
      {
        id: 'q-med-1',
        kind: 'mcq',
        title: 'سطح‌بندی تریاژ اورژانس ESI (Emergency Severity Index)',
        points: 35,
        mcqData: {
          question: 'بیمار ۵۲ ساله‌ای با درد قفسه سینه فشارنده همراه با تعریق سرد و تنگی نفس به اورژانس مراجعه می‌کند. این بیمار در کدام سطح ESI قرار می‌گیرد؟',
          options: [
            { id: 'med-1', text: 'سطح ۲ ESI (شرایط پرخطر و نیازمند اقدام فوری برای نجات از ایسکمی قلبی)', isCorrect: true },
            { id: 'med-2', text: 'سطح ۵ ESI (غیرفوری و با امکان انتظار طولانی)', isCorrect: false },
            { id: 'med-3', text: 'سطح ۴ ESI', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-med-2',
        kind: 'mcq',
        title: 'قانون ۵ گانه ایمنی تجویز دارو (Five Rights)',
        points: 35,
        mcqData: {
          question: 'پروتکل پنج اصل صحیح (Five Rights) در تجویز بالینی دارو شامل کدام موارد است؟',
          options: [
            { id: 'med-2-1', text: 'بیمار صحیح، داروی صحیح، دوز صحیح، مسیر مصرف صحیح و زمان صحیح', isCorrect: true },
            { id: 'med-2-2', text: 'پزشک صحیح، امضای صحیح، قیمت صحیح، داروخانه صحیح و تاریخ روز', isCorrect: false },
            { id: 'med-2-3', text: 'فقط تزریق آهسته و استریل بودن سرنگ', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-med-3',
        kind: 'mcq',
        title: 'پروتکل بهداشت دست و کنترل عفونت‌های بیمارستانی',
        points: 30,
        mcqData: {
          question: 'طبق دستورالعمل سازمان جهانی بهداشت (WHO)، موثرترین روش پیشگیری از عفونت‌های بیمارستانی چیست؟',
          options: [
            { id: 'med-3-1', text: 'رعایت ۵ موقعیت بهداشت دست (Hand Hygiene) توسط کادر درمان با محلول‌های الکلی یا آب و صابون', isCorrect: true },
            { id: 'med-3-2', text: 'تجویز آنتی‌بیوتیک وسیع‌الطیف پیشگیرانه به تمام مراجعین', isCorrect: false },
            { id: 'med-3-3', text: 'تعویض هفتگی ملحفه‌ها', isCorrect: false }
          ]
        }
      }
    ]
  },

  // 13. EDUCATION & RESEARCH: آموزش، تدریس و پژوهش
  {
    id: 'test-education-research',
    titleFa: 'روش‌های تدریس تعاملی، طراحی آموزشی و متدولوژی تحقیق',
    titleEn: 'Instructional Design (ADDIE) & Academic Research Methodology',
    categoryId: 'education_research',
    testType: 'role_specific',
    difficulty: 'متوسط',
    durationMinutes: 20,
    questionCount: 3,
    descriptionFa: 'ارزیابی مدل‌های طراحی آموزش (ADDIE)، روش‌های یادگیری فعال، تحلیل آماری پژوهشی و مدیریت تعاملی کلاس درس.',
    targetRoles: ['Instructional Designer', 'University Lecturer', 'Academic Researcher', 'Curriculum Developer'],
    skillsCovered: ['ADDIE Framework', 'Bloom Taxonomy', 'Quantitative Research Methods', 'Active Learning'],
    popularityScore: 86,
    questions: [
      {
        id: 'q-edu-1',
        kind: 'mcq',
        title: 'کاربرد سطوح یادگیری بلوم (Bloom\'s Taxonomy) در طراحی ارزیابی',
        points: 35,
        mcqData: {
          question: 'اگر هدفی آموزشی در سطح «ارزیابی و تحلیل نقادانه (Analyze & Evaluate)» باشد، کدام نوع فعالیت مناسب‌ترین شیوه سنجش است؟',
          options: [
            { id: 'ed-1', text: 'نقد مقایسه‌ای دو نظریه رقیب در حل یک مطالعه موردی واقعی با ارائه معیارهای قضاوت', isCorrect: true },
            { id: 'ed-2', text: 'سوال چندگزینه‌ای ساده برای بازخوانی تاریخ رویدادها', isCorrect: false },
            { id: 'ed-3', text: 'حفظ کردن فرمول‌های ریاضی بدون کاربرد', isCorrect: false }
          ],
          explanation: 'سطوح بالای تاکسونومی بلوم بر قضاوت، نقد و سنجش شواهد استوار است و آزمون‌های تحلیلی را می‌طلبد.'
        }
      },
      {
        id: 'q-edu-2',
        kind: 'mcq',
        title: 'انتخاب آزمون آماری مناسب برای مقایسه میانگین نمرات دو گروه مستقل',
        points: 35,
        mcqData: {
          question: 'در یک پژوهش تجربی برای مقایسه اثربخشی دو شیوه تدریس بر روی دو گروه مستقل دانش‌پژوه با توزیع نرمال، کدام آزمون آماری مناسب است؟',
          options: [
            { id: 'ed-2-1', text: 'آزمون تی مستقل (Independent Samples t-test)', isCorrect: true },
            { id: 'ed-2-2', text: 'ضریب همبستگی اسپیرمن', isCorrect: false },
            { id: 'ed-2-3', text: 'تحلیل سری‌های زمانی', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-edu-3',
        kind: 'sjt',
        title: 'قضاوت موقعیتی: مدیریت دانش‌آموز بی‌انگیزه و برهم‌زننده نظم کلاس',
        points: 30,
        sjtData: {
          scenario: 'در یک کارگاه آموزشی تخصصی، یکی از فراگیران مکرراً با شوخی‌های بی‌مورد یا کار با موبایل تمرکز سایرین را به هم می‌زند و به یادآوری‌های ضمنی توجهی ندارد.',
          context: 'کلاس نیازمند حفظ محیط حرفه‌ای و مشارکتی است.',
          options: [
            {
              id: 'ed-sjt-1',
              text: 'در زمان استراحت بین کلاس گفتگوی صمیمانه و خصوصی ترتیب داده، علت بی‌علاقگی را جویا شوید و در پارت دوم مسئولیتی جذاب در فعالیت گروهی به او واگذار نمایید.',
              score: 5,
              effectiveness: 'بسیار اثربخش',
              feedback: 'گفتگوی خصوصی بدون شرمنده‌سازی در جمع و درگیر کردن فعال فرد در فرآیند، بهترین شیوه تغییر رفتار است.'
            },
            {
              id: 'ed-sjt-2',
              text: 'فرد را جلوی همه تحقیر کرده و فوراً از کلاس اخراج کنید.',
              score: 1,
              effectiveness: 'نامناسب و پرریسک',
              feedback: 'پرخاشگری و طرد علنی باعث ایجاد تنش در کل کلاس و تخریب رابطه مربی-فراگیر می‌شود.'
            }
          ]
        }
      }
    ]
  },

  // 14. ART, DESIGN & MEDIA: هنر، طراحی و رسانه
  {
    id: 'test-ui-ux-design',
    titleFa: 'طراحی رابط و تجربه کاربری (UI/UX) و اصول تفکر طراحی',
    titleEn: 'UI/UX Design Systems, Usability & Design Thinking',
    categoryId: 'art_design_media',
    testType: 'role_specific',
    difficulty: 'متوسط',
    durationMinutes: 20,
    questionCount: 3,
    descriptionFa: 'ارزیابی اصول کاربردپذیری، استانداردهای دسترسی‌پذیری وب WCAG، قانون فیتز، معماری اطلاعات و سیستم‌های طراحی در فیگما.',
    targetRoles: ['Product Designer', 'UI/UX Specialist', 'Visual Designer', 'Design Lead'],
    skillsCovered: ['WCAG Accessibility', 'Fitts\'s Law', 'Information Architecture', 'Design Systems'],
    popularityScore: 95,
    questions: [
      {
        id: 'q-art-1',
        kind: 'mcq',
        title: 'استاندارد نسبت کنتراست دسترسی‌پذیری رنگ (WCAG AA)',
        points: 35,
        mcqData: {
          question: 'طبق راهنمای دسترسی‌پذیری محتوای وب (WCAG 2.1 سطح AA)، حداقل نسبت کنتراست مجاز برای متون معمولی نسبت به پس‌زمینه چقدر است؟',
          options: [
            { id: 'art-1', text: 'حداقل ۴.۵ به ۱ (4.5:1)', isCorrect: true },
            { id: 'art-2', text: '۲.۰ به ۱', isCorrect: false },
            { id: 'art-3', text: '۱۰ به ۱', isCorrect: false }
          ],
          explanation: 'در استاندارد WCAG AA حداقل کنتراست متن معمولی 4.5:1 و برای متن‌های بزرگ (۱۸ پوینت یا بولد ۱۴) حداقل 3:1 است.'
        }
      },
      {
        id: 'q-art-2',
        kind: 'mcq',
        title: 'کاربرد قانون فیتز (Fitts\'s Law) در طراحی المان‌های تعاملی',
        points: 35,
        mcqData: {
          question: 'قانون فیتز در طراحی تجربه کاربری چه توصیه‌ای برای دکمه‌های اقدام اصلی (Primary CTA) در صفحات موبایل دارد؟',
          options: [
            { id: 'art-2-1', text: 'دکمه‌های اقدام کلیدی باید ابعاد مناسب و در دسترس‌ترین ناحیه طبیعی انگشت شست (Thumb Zone) قرار گیرند تا زمان دستیابی به حداقل برسد.', isCorrect: true },
            { id: 'art-2-2', text: 'دکمه‌ها باید تا حد ممکن ریز و در گوشه بالای صفحه پنهان شوند.', isCorrect: false },
            { id: 'art-2-3', text: 'رنگ دکمه مهم‌تر از فاصله و اندازه فیزیکی آن است.', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-art-3',
        kind: 'sjt',
        title: 'قضاوت موقعیتی: تضاد میان زیبایی بصری و نرخ تبدیل فروشگاهی',
        points: 30,
        sjtData: {
          scenario: 'مدیر طراحی به شدت اصرار دارد متون صفحه معرفی محصول با رنگ خاکستری بسیار روشن و بدون دکمه CTA واضح طراحی شوند تا حس مینیمال لوکس حفظ شود، اما تست‌های اولیه افت ۶۰ درصدی کلیک کاربران را نشان می‌دهد.',
          context: 'کسب‌وکار وابسته به فروش آنلاین این محصول است.',
          options: [
            {
              id: 'art-sjt-1',
              text: 'داده‌های واقعی تست A/B و افت کاربردپذیری را مستندسازی کرده و یک راهکار مصالحه پیشنهاد دهید که تم مینیمال با تایپوگرافی باکنتراست و دکمه‌ای مدرن با خوانایی بالا ترکیب شود.',
              score: 5,
              effectiveness: 'بسیار اثربخش',
              feedback: 'ترکیب شواهد داده‌محور با راهکار طراحی خلاقانه باعث نجات تجربه کاربری و فروش می‌شود.'
            },
            {
              id: 'art-sjt-2',
              text: 'بدون هیچ استدلالی تسلیم سلیقه فردی مدیر شوید.',
              score: 1,
              effectiveness: 'نامناسب و پرریسک',
              feedback: 'عدم دفاع از کاربردپذیری به ضرر تجربه کاربر و سودآوری سازمان تمام می‌شود.'
            }
          ]
        }
      }
    ]
  },

  // 15. LAW & LEGAL SERVICES: حقوق و خدمات قانونی
  {
    id: 'test-law-legal',
    titleFa: 'حقوق قراردادهای تجاری، قانون کار و انطباق مقرراتی',
    titleEn: 'Commercial Contract Law, Labor Regulations & Compliance',
    categoryId: 'law_legal',
    testType: 'role_specific',
    difficulty: 'پیشرفته',
    durationMinutes: 20,
    questionCount: 3,
    descriptionFa: 'ارزیابی صلاحیت در تنظیم بندهای الزام‌آور قراردادهای تجاری، محرمانگی (NDA)، شروط عدم رقابت، حل و فصل دعاوی و قانون کار.',
    targetRoles: ['Legal Counsel', 'Contract Specialist', 'Corporate Compliance Officer', 'Labor Law Advisor'],
    skillsCovered: ['Contract Drafting', 'NDA & Non-Compete Clauses', 'Dispute Resolution', 'Labor Law'],
    popularityScore: 89,
    questions: [
      {
        id: 'q-law-1',
        kind: 'mcq',
        title: 'اعتبار شروط عدم رقابت (Non-Compete) در قراردادهای استخدامی',
        points: 35,
        mcqData: {
          question: 'برای اینکه شرط عدم رقابت پس از قطع همکاری در یک قرارداد تجاری از نظر حقوقی معتبر و قابل اجرا باشد، چه پیش‌شرطی الزامی است؟',
          options: [
            { id: 'law-1', text: 'باید از نظر محدوده زمانی، موقعیت جغرافیایی و موضوع کاری معقول و دارای منافع مشروع حمایتی برای کارفرما باشد و حق آزادی شغل را سلب مطلق نکند.', isCorrect: true },
            { id: 'law-2', text: 'باید فرد را تا پایان عمر از هر نوع کارگری در هر کجای جهان منع کند.', isCorrect: false },
            { id: 'law-3', text: 'نیازی به هیچ تعریفی ندارد و به صورت خودکار الزام‌آور است.', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-law-2',
        kind: 'mcq',
        title: 'تفاوت شرط داوری (Arbitration) با دادگاه‌های عمومی در حل اختلاف',
        points: 35,
        mcqData: {
          question: 'مزیت کلیدی درج شرط داوری در قراردادهای تجاری و فناوری چیست؟',
          options: [
            { id: 'law-2-1', text: 'سرعت بیشتر رسیدگی، تخصصی بودن داوران در حوزه فنی مربوطه و محرمانه بودن جلسات رسیدگی', isCorrect: true },
            { id: 'law-2-2', text: 'امکان نقض قوانین بدون پاسخگویی', isCorrect: false },
            { id: 'law-2-3', text: 'رایگان بودن کامل تمام مراحل رسیدگی', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-law-3',
        kind: 'mcq',
        title: 'شرط خسارت مقطوع (Liquidated Damages) در قرارداد',
        points: 30,
        mcqData: {
          question: 'بند وجه التزام یا خسارت مقطوع در قرارداد چه هدفی را دنبال می‌کند؟',
          options: [
            { id: 'law-3-1', text: 'تعیین توافقی مبلغ غرامت تاخیر یا تخلف از تعهدات بدون نیاز به اثبات میزان دقیق خسارت وارده در دادگاه', isCorrect: true },
            { id: 'law-3-2', text: 'انتقال مالکیت سهام شرکت متخلف', isCorrect: false },
            { id: 'law-3-3', text: 'ابطال خودکار قرارداد', isCorrect: false }
          ]
        }
      }
    ]
  },

  // 16. CONSTRUCTION & ARCHITECTURE: ساخت، عمران و معماری
  {
    id: 'test-civil-construction',
    titleFa: 'مهندسی عمران، مدیریت کارگاه و مقررات ملی ساختمان',
    titleEn: 'Civil Engineering, Site Safety & Building Information Modeling (BIM)',
    categoryId: 'construction_architecture',
    testType: 'role_specific',
    difficulty: 'پیشرفته',
    durationMinutes: 25,
    questionCount: 3,
    descriptionFa: 'ارزیابی کنترل پروژه ساخت با روش مسیر بحرانی (CPM)، مباحث مقررات ملی، پایدارسازی گود و استانداردهای ایمنی کارگاه ساختمانی.',
    targetRoles: ['Civil Project Manager', 'Site Engineer', 'Architectural Coordinator', 'Structural Auditor'],
    skillsCovered: ['CPM Scheduling', 'Building Codes', 'Excavation Safety', 'Quality Assurance on Site'],
    popularityScore: 88,
    questions: [
      {
        id: 'q-civ-1',
        kind: 'mcq',
        title: 'شناور بودن فعالیت‌ها در جدول زمان‌بندی مسیر بحرانی (CPM)',
        points: 35,
        mcqData: {
          question: 'در مدیریت پروژه عمرانی، اگر فعالیتی دارای شناوری کل (Total Float) برابر صفر باشد، چه نتیجه‌ای حاصل می‌شود؟',
          options: [
            { id: 'civ-1', text: 'این فعالیت روی مسیر بحرانی (Critical Path) قرار دارد و هرگونه تاخیر در آن مستقیماً تاریخ پایان کل پروژه را به تعویق می‌اندازد.', isCorrect: true },
            { id: 'civ-2', text: 'این فعالیت غیرضروری است و می‌تواند حذف شود.', isCorrect: false },
            { id: 'civ-3', text: 'هزینه اجرای این فعالیت صفر است.', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-civ-2',
        kind: 'mcq',
        title: 'ایمنی پایدارسازی گودهای عمیق شهری',
        points: 35,
        mcqData: {
          question: 'کدام روش سازه نگهبان برای گودبرداری‌های عمیق در مجاورت ساختمان‌های حساس بیشترین کنترل تغییر مکان خاک را فراهم می‌کند؟',
          options: [
            { id: 'civ-2-1', text: 'دیوار دیافراگمی (Diaphragm Wall) یا روش نیلینگ و انکراژ همراه با پایش ابزار دقیق (Instrumentation)', isCorrect: true },
            { id: 'civ-2-2', text: 'گودبرداری قائم بدون مهاربندی', isCorrect: false },
            { id: 'civ-2-3', text: 'فقط کشیدن نایلون روی دیواره خاکی', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-civ-3',
        kind: 'mcq',
        title: 'آزمایش اسلامپ و کنترل کیفیت بتن‌ریزی سازه',
        points: 30,
        mcqData: {
          question: 'هدف اصلی از آزمایش اسلامپ بتن تازه پای کار چیست؟',
          options: [
            { id: 'civ-3-1', text: 'سنجش کارایی و روانی بتن (Workability) و اطمینان از عدم افزودن آب غیرمجاز در کارگاه', isCorrect: true },
            { id: 'civ-3-2', text: 'محاسبه مقاومت ۲۸ روزه به صورت آنی', isCorrect: false },
            { id: 'civ-3-3', text: 'تعیین رنگ سیمان', isCorrect: false }
          ]
        }
      }
    ]
  },

  // 17. MANUFACTURING & OPERATIONS: تولید، صنایع و بهره‌برداری
  {
    id: 'test-manufacturing-lean',
    titleFa: 'مدیریت تولید ناب، شاخص OEE و نگهداری TPM',
    titleEn: 'Lean Manufacturing, OEE Metric & Total Productive Maintenance',
    categoryId: 'manufacturing_production',
    testType: 'role_specific',
    difficulty: 'متوسط',
    durationMinutes: 20,
    questionCount: 3,
    descriptionFa: 'ارزیابی اثربخشی کلی تجهیزات (OEE)، استقرار 5S، حذف هفت اتلاف تولید (Muda) و متوقف‌سازی خط در صورت بروز عیب (Jidoka).',
    targetRoles: ['Plant Manager', 'Production Supervisor', 'Continuous Improvement Lead', 'Maintenance Engineer'],
    skillsCovered: ['OEE Calculation', 'Lean Tools (5S, Kaizen)', 'TPM Maintenance', 'Jidoka Autonomation'],
    popularityScore: 90,
    questions: [
      {
        id: 'q-mfg-1',
        kind: 'mcq',
        title: 'فرمول شاخص اثربخشی کلی تجهیزات (OEE)',
        points: 35,
        mcqData: {
          question: 'شاخص OEE از حاصل‌ضرب کدام سه فاکتور به دست می‌آید؟',
          options: [
            { id: 'mfg-1', text: 'دسترس‌پذیری (Availability) × عملکرد (Performance) × کیفیت (Quality)', isCorrect: true },
            { id: 'mfg-2', text: 'ساعت کارکرد × تعداد پرسنل × سود نهایی', isCorrect: false },
            { id: 'mfg-3', text: 'توان موتور × ولتاژ برق × تناژ بارگیری', isCorrect: false }
          ],
          explanation: 'OEE = Availability * Performance * Quality و استاندارد طلایی جهانی در صنایع بالای ۸۵٪ است.'
        }
      },
      {
        id: 'q-mfg-2',
        kind: 'mcq',
        title: 'مفهوم اتلاف حرکت و جابجایی بیهوده (Motion Waste)',
        points: 35,
        mcqData: {
          question: 'کدام اقدام نمونه بارز حذف اتلاف حرکت (Motion) در ایستگاه کاری تولیدی است؟',
          options: [
            { id: 'mfg-2-1', text: 'ساماندهی ابزارها بر اساس فرکانس مصرف در دسترس نزدیک اپراتور به همراه چیدمان ارگونومیک (5S)', isCorrect: true },
            { id: 'mfg-2-2', text: 'انبار کردن قطعات در فاصله ۱۰۰ متری خط مونتاژ', isCorrect: false },
            { id: 'mfg-2-3', text: 'افزایش سرعت نوار نقاله فراتر از توان اپراتور', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-mfg-3',
        kind: 'sjt',
        title: 'قضاوت موقعیتی: اصل توقف خط تولید در صورت بروز عیب تکراری (Andon)',
        points: 30,
        sjtData: {
          scenario: 'اپراتور دستگاه قالب‌گیری متوجه شده که در ۵ قطعه متوالی پلیسه خطرناک ایجاد شده است. توقف خط برای بازتنظیم ۲۰ دقیقه زمان می‌برد و سرپرست نگران نرسیدن به سهمیه شیفت است.',
          context: 'سازمان به رویکرد کیفیت در منبع متعهد است.',
          options: [
            {
              id: 'mfg-sjt-1',
              text: 'طناب آندون را بکشید و خط را بلافاصله متوقف کنید تا عیب در قالب ریشه‌یابی و رفع شود، مانع از تولید صدها قطعه معیوب غیرقابل مصرف شوید.',
              score: 5,
              effectiveness: 'بسیار اثربخش',
              feedback: 'پرهیز از ارسال عیب به مرحله بعد (Jidoka) ارزان‌ترین و پایدارترین قانون تولید ناب است.'
            },
            {
              id: 'mfg-sjt-2',
              text: 'بدون توقف خط به کار ادامه دهید و قطعات معیوب را در انتهای شیفت دور بریزید.',
              score: 1,
              effectiveness: 'نامناسب و پرریسک',
              feedback: 'تولید ضایعات و دور زدن کیفیت باعث خسارات مالی سنگین به سازمان می‌شود.'
            }
          ]
        }
      }
    ]
  },

  // 18. TOURISM & HOSPITALITY: گردشگری، هتلداری و تشریفات
  {
    id: 'test-hospitality-management',
    titleFa: 'هتلداری حرفه‌ای، مدیریت درآمد و تشریفات گردشگری',
    titleEn: 'Hotel Operations, Guest Experience & Hospitality Revenue Management',
    categoryId: 'tourism_hospitality',
    testType: 'role_specific',
    difficulty: 'متوسط',
    durationMinutes: 20,
    questionCount: 3,
    descriptionFa: 'ارزیابی مدیریت خدمات مهمانان، شاخص RevPAR، حل تعارض با مهمانان VIP و استانداردهای رزرواسیون هتل.',
    targetRoles: ['Hotel Front Office Manager', 'Guest Relations Lead', 'Hospitality Operations Lead', 'Travel Consultant'],
    skillsCovered: ['RevPAR & ADR Metrics', 'VIP Guest Protocol', 'Service Recovery', 'Property Management Systems'],
    popularityScore: 85,
    questions: [
      {
        id: 'q-tour-1',
        kind: 'mcq',
        title: 'تعریف شاخص درآمد به ازای هر اتاق موجود (RevPAR)',
        points: 35,
        mcqData: {
          question: 'شاخص کلیدی RevPAR در صنعت هتلداری چگونه محاسبه می‌شود؟',
          options: [
            { id: 'tour-1', text: 'ضریب اشغال هتل (Occupancy Rate) × میانگین نرخ روزانه اتاق (ADR)', isCorrect: true },
            { id: 'tour-2', text: 'کل درآمد رستوران منهای هزینه نگهداری', isCorrect: false },
            { id: 'tour-3', text: 'تعداد شب‌های رزرو شده ضربدر تعداد پرسنل', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-tour-2',
        kind: 'sjt',
        title: 'قضاوت موقعیتی: مهمان مهم که اتاقش به دلیل خطای سیستم آماده نیست',
        points: 35,
        sjtData: {
          scenario: 'یک مهمان VIP که سفر کاری فشرده‌ای داشته ساعت ۱۱ شب به هتل می‌رسد، اما به دلیل باگ سیستم، اتاق او تخلیه نشده و تمیز نیست. او بسیار عصبانی و خسته است.',
          context: 'هتل ۵ ستاره و متعهد به استانداردهای بالای پذیرایی است.',
          options: [
            {
              id: 'tour-sjt-1',
              text: 'با عذرخواهی صادقانه، مهمان را به لانژ اختصاصی VIP هدایت کرده و پذیرایی رایگان ارائه دهید؛ سپس اتاق او را به صورت رایگان به سوئیت ارتقا داده (Upgrade) و خدمات لاندری فردا را میهمان هتل کنید.',
              score: 5,
              effectiveness: 'بسیار اثربخش',
              feedback: 'بازیابی خدمت (Service Recovery) همراه با ارتقای اتاق و تکریم، مشتری شاکی را به مشتری وفادار تبدیل می‌کند.'
            },
            {
              id: 'tour-sjt-2',
              text: 'به او بگویید تقصیر سیستم نرم‌افزاری بوده و باید در لابی منتظر بماند.',
              score: 1,
              effectiveness: 'نامناسب و پرریسک',
              feedback: 'بهانه‌تراشی و سلب مسئولیت به شهرت هتل لطمه جبران‌ناپذیر می‌زند.'
            }
          ]
        }
      },
      {
        id: 'q-tour-3',
        kind: 'mcq',
        title: 'اصل بیش‌فروشی (Overbooking) کنترل‌شده در هتل',
        points: 30,
        mcqData: {
          question: 'چرا هتل‌ها به صورت کنترل‌شده سیاست بیش‌فروشی (Overbooking) اعمال می‌کنند؟',
          options: [
            { id: 'tour-3-1', text: 'جبران درصد انصراف‌های بدون اطلاع قبلی (No-Show) و دستیابی به حداکثر ضریب اشغال', isCorrect: true },
            { id: 'tour-3-2', text: 'برای سردرگم کردن مسافران', isCorrect: false },
            { id: 'tour-3-3', text: 'کاهش نرخ مالیات هتل', isCorrect: false }
          ]
        }
      }
    ]
  },

  // 19. AGRICULTURE & ENVIRONMENT: کشاورزی، شیلات و محیط‌زیست
  {
    id: 'test-agri-environment',
    titleFa: 'کشاورزی هوشمند، مدیریت آب و ارزیابی زیست‌محیطی (EIA)',
    titleEn: 'Precision Agriculture, Water Conservation & Environmental Impact Assessment',
    categoryId: 'agriculture_environment',
    testType: 'role_specific',
    difficulty: 'متوسط',
    durationMinutes: 20,
    questionCount: 3,
    descriptionFa: 'ارزیابی مدیریت مصرف بهینه آب در کشاورزی، سنجش شوری و حاصلخیزی خاک، کشت گلخانه‌ای و استانداردهای ارزیابی محیط‌زیست.',
    targetRoles: ['Agronomist', 'Environmental Consultant', 'Irrigation Engineer', 'Greenhouse Manager'],
    skillsCovered: ['Irrigation Efficiency', 'Soil NPK Nutrition', 'EIA Methodology', 'Sustainable Crop Management'],
    popularityScore: 84,
    questions: [
      {
        id: 'q-agr-1',
        kind: 'mcq',
        title: 'راندمان مصرف آب در سامانه‌های آبیاری تحت فشار قطره‌ای',
        points: 35,
        mcqData: {
          question: 'در مقایسه با آبیاری سنتی غرقابی، سامانه آبیاری قطره‌ای نوین به چه میزان راندمان مصرف آب را ارتقا می‌دهد؟',
          options: [
            { id: 'agr-1', text: 'افزایش راندمان به بالای ۸۵ تا ۹۰ درصد با به حداقل رساندن تبخیر سطحی و نفوذ عمقی', isCorrect: true },
            { id: 'agr-2', text: 'کاهش راندمان به دلیل گرفتگی قطره‌چکان‌ها', isCorrect: false },
            { id: 'agr-3', text: 'تفاوتی در راندمان کل ندارد', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-agr-2',
        kind: 'mcq',
        title: 'علائم کمبود نیتروژن (N) در برگ گیاهان زراعی',
        points: 35,
        mcqData: {
          question: 'نشانه بارز کمبود عنصر نیتروژن در گیاه معمولاً از کدام قسمت آغاز می‌شود؟',
          options: [
            { id: 'agr-2-1', text: 'کلروز و زردی عمومی ابتدا در برگ‌های مسن‌تر پایینی به دلیل متحرک بودن نیتروژن در گیاه', isCorrect: true },
            { id: 'agr-2-2', text: 'سوختگی نوک برگ‌های جوان بالایی', isCorrect: false },
            { id: 'agr-2-3', text: 'سیاه شدن ریشه', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-agr-3',
        kind: 'mcq',
        title: 'هدف از گزارش ارزیابی اثرات زیست‌محیطی (EIA) پیش از اجرای طرح',
        points: 30,
        mcqData: {
          question: 'گزارش ارزیابی اثرات زیست‌محیطی (EIA) چه نقشی در پروژه‌های صنعتی و توسعه‌ای دارد؟',
          options: [
            { id: 'agr-3-1', text: 'پیش‌بینی و کاهش پیامدهای منفی بر آب، هوا، خاک و تنوع زیستی پیش از فاز احداث', isCorrect: true },
            { id: 'agr-3-2', text: 'فقط پرداخت جریمه مالی به سازمان محیط‌زیست', isCorrect: false },
            { id: 'agr-3-3', text: 'تسریع احداث بدون در نظر گرفتن ضوابط', isCorrect: false }
          ]
        }
      }
    ]
  },

  // 20. BASIC & APPLIED SCIENCES: علوم پایه و تحقیقات کاربردی
  {
    id: 'test-applied-sciences',
    titleFa: 'آمار کاربردی، روش‌های آزمایشگاهی و تحلیل خطا در علوم پایه',
    titleEn: 'Applied Statistics, Laboratory Error Analysis & Analytical Methods',
    categoryId: 'basic_applied_sciences',
    testType: 'role_specific',
    difficulty: 'پیشرفته',
    durationMinutes: 25,
    questionCount: 3,
    descriptionFa: 'ارزیابی متدولوژی طراحی آزمایش‌ها، تجزیه و تحلیل رگرسیون، کالیبراسیون تجهیزات آزمایشگاهی و اعتبارسنجی فرضیات علمی.',
    targetRoles: ['Data Scientist', 'Laboratory Analyst', 'Research Scientist', 'Quality Control Chemist'],
    skillsCovered: ['Hypothesis Testing', 'Spectroscopy Calibration', 'Error Propagation', 'Regression Modeling'],
    popularityScore: 87,
    questions: [
      {
        id: 'q-sci-1',
        kind: 'mcq',
        title: 'تفاوت خطای سیستماتیک (Systematic Error) با خطای تصادفی در اندازه‌گیری',
        points: 35,
        mcqData: {
          question: 'کدام گزاره تفاوت خطای سیستماتیک با خطای تصادفی را به درستی بیان می‌کند؟',
          options: [
            { id: 'sci-1', text: 'خطای سیستماتیک دارای جهت ثابت و قابل کالیبراسیون است، اما خطای تصادفی غیرقابل پیش‌بینی است و با تکرار اندازه‌گیری و میانگین‌گیری کاهش می‌یابد.', isCorrect: true },
            { id: 'sci-2', text: 'خطای سیستماتیک همیشه صفر است.', isCorrect: false },
            { id: 'sci-3', text: 'خطای تصادفی تنها به دلیل اشتباه انسانی رخ می‌دهد.', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-sci-2',
        kind: 'mcq',
        title: 'مفهوم مقدار پی (p-value) در آزمون فرضیه آماری',
        points: 35,
        mcqData: {
          question: 'در صورتی که در یک آزمون فرض علمی مقدار p-value کمتر از ۰.۰۵ به دست آید، تصمیم‌گیری علمی چیست؟',
          options: [
            { id: 'sci-2-1', text: 'فرض صفر (Null Hypothesis) رد می‌شود و تفاوت مشاهده‌شده از لحاظ آماری معنادار تلقی می‌گردد.', isCorrect: true },
            { id: 'sci-2-2', text: 'آزمایش باید باطل اعلام شود.', isCorrect: false },
            { id: 'sci-2-3', text: 'هیچ اثری از متغیر مشاهده نشده است.', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-sci-3',
        kind: 'mcq',
        title: 'قانون بیر-لامبرت (Beer-Lambert Law) در اسپکتروفتومتری',
        points: 30,
        mcqData: {
          question: 'بر اساس قانون بیر-لامبرت، جذب نوری یک محلول با چه پارامترهایی رابطه مستقیم دارد؟',
          options: [
            { id: 'sci-3-1', text: 'غلظت ماده جاذب و طول مسیر عبور نور (طول کووت)', isCorrect: true },
            { id: 'sci-3-2', text: 'فقط دمای محیط', isCorrect: false },
            { id: 'sci-3-3', text: 'فقط حجم کلی محلول', isCorrect: false }
          ]
        }
      }
    ]
  },

  // 21. PUBLIC & SOCIAL SERVICES: خدمات عمومی، حفاظتی و اجتماعی
  {
    id: 'test-social-public-services',
    titleFa: 'مدیریت بحران‌های اجتماعی، اصول مددکاری و ایمنی عمومی',
    titleEn: 'Social Crisis Intervention, Casework Ethics & Public Safety Protocols',
    categoryId: 'public_social_services',
    testType: 'role_specific',
    difficulty: 'متوسط',
    durationMinutes: 20,
    questionCount: 3,
    descriptionFa: 'ارزیابی مهارت‌های مداخله در بحران‌های اجتماعی، تریاژ روانی، محرمانگی اسناد، حل تعارضات عمومی و اصول حفاظتی.',
    targetRoles: ['Social Worker', 'Crisis Counselor', 'Public Safety Officer', 'Emergency Relief Coordinator'],
    skillsCovered: ['Crisis De-escalation', 'Client Confidentiality', 'Emergency Protocols', 'Empathic Interviewing'],
    popularityScore: 86,
    questions: [
      {
        id: 'q-soc-1',
        kind: 'sjt',
        title: 'قضاوت موقعیتی: مداخله در تنش شدید خیابانی یا نزاع عمومی',
        points: 35,
        sjtData: {
          scenario: 'در یک مرکز خدمات عمومی، مراجعی بسیار آشفته و پرخاشگر شده، با صدای بلند فریاد می‌زند و تهدید به شکستن وسایل اداری می‌کند.',
          context: 'سایر مراجعین و پرسنل احساس ناامنی کرده‌اند.',
          options: [
            {
              id: 'soc-sjt-1',
              text: 'با حفظ فاصله ایمن و تن صدای آرام و یکنواخت (De-escalation)، احساسات و استیصال او را به رسمیت بشناسید، او را به اتاقی آرام‌تر برای شنیدن دغدغه‌اش دعوت کنید و به پرسنل حراست آماده‌باش نامحسوس دهید.',
              score: 5,
              effectiveness: 'بسیار اثربخش',
              feedback: 'آرام‌سازی کلامی با لحن محترمانه تنش را بدون درگیری فیزیکی فرو می‌نشاند.'
            },
            {
              id: 'soc-sjt-2',
              text: 'شما هم بر سر او فریاد بزنید و تهدید به بازداشت کنید.',
              score: 1,
              effectiveness: 'نامناسب و پرریسک',
              feedback: 'پاسخ تهاجمی باعث تشدید خشونت و خطرات جانی می‌شود.'
            }
          ]
        }
      },
      {
        id: 'q-soc-2',
        kind: 'mcq',
        title: 'استثنای اصل محرمانگی در مددکاری اجتماعی',
        points: 35,
        mcqData: {
          question: 'در چه شرایطی مددکار اجتماعی مجاز و مکلف به شکستن اصل محرمانگی اطلاعات مراجع است؟',
          options: [
            { id: 'soc-2-1', text: 'وقتی خطر جدی و قریب‌الوقوع آسیب به جان خود مراجع یا فرد دیگری (نظیر کودک‌آزاری یا تهدید جانی) وجود داشته باشد.', isCorrect: true },
            { id: 'soc-2-2', text: 'وقتی همکاران کنجکاو باشند.', isCorrect: false },
            { id: 'soc-2-3', text: 'تحت هیچ شرایطی محرمانگی نباید شکسته شود.', isCorrect: false }
          ]
        }
      },
      {
        id: 'q-soc-3',
        kind: 'mcq',
        title: 'اصل تقدم ایمنی امدادگر در حوادث عمومی',
        points: 30,
        mcqData: {
          question: 'در زمان ورود به صحنه یک حادثه اجتماعی یا آوار، اولویت نخست نیروهای خدمات امدادی چیست؟',
          options: [
            { id: 'soc-3-1', text: 'تأمین ایمنی صحنه و خود امدادگر پیش از ورود، تا امدادگر خود به مصدوم جدید تبدیل نشود.', isCorrect: true },
            { id: 'soc-3-2', text: 'ورود عجولانه بدون بررسی خطرات ریزش یا گازگرفتگی', isCorrect: false },
            { id: 'soc-3-3', text: 'گرفتن مصاحبه با خبرنگاران', isCorrect: false }
          ]
        }
      }
    ]
  }
];

