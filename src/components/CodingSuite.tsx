import React, { useState } from 'react';
import { executeCandidateCode, CodeExecutionResult } from '../utils/codeRunner';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Code2, 
  Terminal, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface CodingChallenge {
  id: string;
  title: string;
  category: string;
  difficulty: 'مقدماتی' | 'متوسط' | 'پیشرفته';
  description: string;
  starterCode: string;
  testCases: {
    id: string;
    description: string;
    input: string;
    expectedOutput: string;
  }[];
}

const CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: 'ch-1',
    title: 'تجمیع و میانگین‌گیری حقوق دپارتمان‌ها (Data Aggregation)',
    category: 'ساختارهای داده و آرایه‌ها',
    difficulty: 'متوسط',
    description: `تابعی به نام aggregateSalaries(employees) بنویسید که آرایه‌ای از اشیاء کارمندان را دریافت کرده و میانگین حقوق هر دپارتمان را به صورت آبجکت برگرداند (گرد شده تا ۲ رقم اعشار).\nاگر آرایه خالی بود شیء {} برگردانید.`,
    starterCode: `function aggregateSalaries(employees) {
  if (!employees || employees.length === 0) return {};
  
  const stats = {};
  for (const emp of employees) {
    if (!stats[emp.department]) {
      stats[emp.department] = { sum: 0, count: 0 };
    }
    stats[emp.department].sum += emp.salary;
    stats[emp.department].count += 1;
  }
  
  const result = {};
  for (const dept in stats) {
    result[dept] = Number((stats[dept].sum / stats[dept].count).toFixed(2));
  }
  return result;
}`,
    testCases: [
      {
        id: 'tc-1',
        description: 'تست استاندارد دو دپارتمان',
        input: `[{"name":"Ali","department":"IT","salary":3000},{"name":"Sara","department":"IT","salary":5000},{"name":"Reza","department":"HR","salary":2500}]`,
        expectedOutput: `{"IT":4000,"HR":2500}`
      },
      {
        id: 'tc-2',
        description: 'دپارتمان با مقادیر اعشاری',
        input: `[{"name":"A","department":"Dev","salary":100},{"name":"B","department":"Dev","salary":200},{"name":"C","department":"Dev","salary":250}]`,
        expectedOutput: `{"Dev":183.33}`
      },
      {
        id: 'tc-3',
        description: 'ورودی آرایه خالی',
        input: `[]`,
        expectedOutput: `{}`
      }
    ]
  },
  {
    id: 'ch-2',
    title: 'جستجوی دوتایی با جمع هدف (Two Sum Target Problem)',
    category: 'الگوریتم‌های جستجو و Hash Map',
    difficulty: 'متوسط',
    description: `تابعی به نام findTwoSum(numbers, target) بنویسید که اندیس دو عددی را که حاصل‌جمع آن‌ها برابر target است به صورت آرایه [idx1, idx2] برگرداند.\nاگر پاسخی وجود نداشت null بازگردانید.`,
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
    testCases: [
      {
        id: 'tc-2-1',
        description: 'مجموع در ابتدای آرایه',
        input: `[2, 7, 11, 15], 9`,
        expectedOutput: `[0,1]`
      },
      {
        id: 'tc-2-2',
        description: 'تارگت ۶ با اعداد وسط آرایه',
        input: `[3, 2, 4], 6`,
        expectedOutput: `[1,2]`
      },
      {
        id: 'tc-2-3',
        description: 'حالت عدم وجود جفت مناسب',
        input: `[1, 2, 3], 10`,
        expectedOutput: `null`
      }
    ]
  },
  {
    id: 'ch-3',
    title: 'فیلتر و شمارش لاگ‌های سیستمی بحرانی (Log Parser)',
    category: 'پردازش متن و عبارات باقاعده (Regex)',
    difficulty: 'متوسط',
    description: `تابعی به نام countCriticalErrors(logs) بنویسید که آرایه‌ای از رشته‌های لاگ را دریافت کرده و فقط تعداد تکرار لاگ‌های [ERROR] یا [CRITICAL] را به ازای هر پیام خطا به صورت آبجکت گزارش کند.`,
    starterCode: `function countCriticalErrors(logs) {
  const counts = {};
  if (!logs || !Array.isArray(logs)) return counts;

  for (const log of logs) {
    const match = log.match(/^\\[(ERROR|CRITICAL)\\]\\s*[^:]+:\\s*(.*)$/);
    if (match) {
      const msg = match[2].trim();
      counts[msg] = (counts[msg] || 0) + 1;
    }
  }
  return counts;
}`,
    testCases: [
      {
        id: 'tc-3-1',
        description: 'لاگ‌های حاوی خطا و اینفو',
        input: `["[ERROR] Auth: Bad token", "[ERROR] Auth: Bad token", "[INFO] Main: Running", "[CRITICAL] Storage: Disk full"]`,
        expectedOutput: `{"Bad token":2,"Disk full":1}`
      },
      {
        id: 'tc-3-2',
        description: 'فقط لاگ‌های عادی بدون خطا',
        input: `["[INFO] A: OK", "[DEBUG] B: Trace"]`,
        expectedOutput: `{}`
      }
    ]
  }
];

export const CodingSuite: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<CodingChallenge>(CODING_CHALLENGES[0]);
  const [code, setCode] = useState<string>(CODING_CHALLENGES[0].starterCode);
  const [executionResult, setExecutionResult] = useState<CodeExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState<'tests' | 'console'>('tests');

  const handleSelectChallenge = (ch: CodingChallenge) => {
    setSelectedChallenge(ch);
    setCode(ch.starterCode);
    setExecutionResult(null);
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const res = executeCandidateCode(code, selectedChallenge.testCases);
      setExecutionResult(res);
      setIsExecuting(false);
    }, 150);
  };

  return (
    <div className="space-y-6 text-right pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-emerald-600" />
            <span>شبیه‌ساز و کنسول زنده ارزیابی برنامه‌نویسی</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            اجرای بلادرنگ کدهای جاوااسکریپت و الگوریتم‌های استاندارد استخدامی همراه با تست‌کیس‌های خودکار
          </p>
        </div>

        <div className="flex items-center gap-2">
          {CODING_CHALLENGES.map((ch) => (
            <button
              key={ch.id}
              onClick={() => handleSelectChallenge(ch)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedChallenge.id === ch.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {ch.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Challenge Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left (or RTL Right) Problem Description Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="text-indigo-600 font-semibold">{selectedChallenge.category}</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-medium">سطح {selectedChallenge.difficulty}</span>
            </div>

            <h2 className="text-base font-bold text-slate-900 leading-snug">
              {selectedChallenge.title}
            </h2>
          </div>

          <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line border-t border-slate-100 pt-3">
            {selectedChallenge.description}
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-900 block">
              تست‌کیس‌های اعتبارسنجی خودکار ({selectedChallenge.testCases.length} تست):
            </span>
            <div className="space-y-2">
              {selectedChallenge.testCases.map((tc, idx) => (
                <div key={tc.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 font-mono text-[11px] space-y-0.5" dir="ltr">
                  <div className="text-slate-400 font-sans text-[10px]" dir="rtl">تست {idx + 1}: {tc.description}</div>
                  <div className="text-cyan-700 truncate"><span className="text-slate-400">Input:</span> {tc.input}</div>
                  <div className="text-emerald-700 truncate"><span className="text-slate-400">Expected:</span> {tc.expectedOutput}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right (or RTL Left) Live Code Terminal */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-md flex flex-col">
          
          {/* Top Bar of Editor */}
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <div className="flex gap-1.5 ml-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span>Solution.js (ES6 Sandbox)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCode(selectedChallenge.starterCode)}
                className="px-2.5 py-1 text-xs text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors flex items-center gap-1"
                title="بازنشانی کد اولیه"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ریست</span>
              </button>

              <button
                onClick={handleRunCode}
                disabled={isExecuting}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isExecuting ? 'در حال اجرا...' : 'اجرا و تست کد'}</span>
              </button>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            dir="ltr"
            rows={14}
            spellCheck={false}
            className="w-full bg-slate-950 text-emerald-300 p-4 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-none selection:bg-indigo-600 selection:text-white"
          />

          {/* Results Console */}
          <div className="border-t border-slate-800 bg-slate-900/90 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-medium">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveTab('tests')}
                  className={`transition-colors pb-1 ${
                    activeTab === 'tests'
                      ? 'text-white border-b-2 border-indigo-500 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  پاسخ تست‌کیس‌ها
                  {executionResult && (
                    <span className="mr-1.5 font-mono text-[11px] text-slate-400">
                      ({executionResult.passedCases}/{executionResult.totalCases})
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('console')}
                  className={`transition-colors pb-1 flex items-center gap-1.5 ${
                    activeTab === 'console'
                      ? 'text-white border-b-2 border-indigo-500 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  خروجی کنسول
                </button>
              </div>

              {executionResult && (
                <div className="text-slate-400 font-mono text-xs tabular-nums">
                  زمان اجرا: {executionResult.executionTimeMs}ms
                </div>
              )}
            </div>

            {activeTab === 'tests' ? (
              <div>
                {!executionResult ? (
                  <div className="text-xs text-slate-500 py-4 text-center">
                    دکمه «اجرا و تست کد» را کلیک کنید تا اعتبارسنجی الگوریتم انجام شود.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {executionResult.passed ? (
                      <div className="p-2.5 bg-emerald-950/60 border border-emerald-700/80 rounded-lg text-emerald-300 text-xs font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>عالی! تمام {executionResult.totalCases} تست‌کیس با موفقیت پاس شدند. الگوریتم آماده تحویل است.</span>
                      </div>
                    ) : (
                      <div className="p-2.5 bg-rose-950/60 border border-rose-700/80 rounded-lg text-rose-300 text-xs font-semibold flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>{executionResult.passedCases} از {executionResult.totalCases} تست پاس شد. خطاها را در زیر بررسی کنید.</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {executionResult.testCaseResults.map((tc, idx) => (
                        <div
                          key={tc.testCaseId || idx}
                          className={`p-2.5 rounded-lg border text-xs font-mono flex flex-col justify-between ${
                            tc.passed
                              ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                              : 'bg-rose-950/20 border-rose-800/40 text-rose-300'
                          }`}
                          dir="ltr"
                        >
                          <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/5">
                            <span className="font-semibold text-slate-300">
                              Test {idx + 1}: {tc.description}
                            </span>
                            {tc.passed ? (
                              <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                                <CheckCircle2 className="w-3.5 h-3.5" /> PASSED
                              </span>
                            ) : (
                              <span className="text-rose-400 font-bold flex items-center gap-1 text-[11px]">
                                <XCircle className="w-3.5 h-3.5" /> FAILED
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">Input: {tc.input}</div>
                          <div className="text-[11px] text-slate-300">Expected: {tc.expected}</div>
                          <div className="text-[11px]">Actual: {tc.actual}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="font-mono text-xs text-slate-300 bg-slate-950 p-3 rounded-lg min-h-[70px] max-h-48 overflow-y-auto" dir="ltr">
                {executionResult?.logs && executionResult.logs.length > 0 ? (
                  executionResult.logs.map((log, i) => (
                    <div key={i} className="py-0.5">{log}</div>
                  ))
                ) : (
                  <span className="text-slate-600">// کنسول لاگی ثبت نکرده است.</span>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
