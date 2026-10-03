import React, { useState, useEffect, useMemo } from 'react';
import { AssessmentTest, Question, CandidateAnswer, CandidateResult } from '../types/assessment';
import { executeCandidateCode, CodeExecutionResult } from '../utils/codeRunner';
import { 
  Play, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Flag, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Send,
  Terminal,
  HelpCircle,
  FileCode,
  RotateCcw
} from 'lucide-react';

interface TestRunnerProps {
  test: AssessmentTest;
  candidateName?: string;
  candidateEmail?: string;
  candidatePosition?: string;
  onFinishTest: (result: CandidateResult) => void;
  onExit: () => void;
}

export const TestRunner: React.FC<TestRunnerProps> = ({
  test,
  candidateName = 'کاربر داوطلب',
  candidateEmail = 'candidate@job.ir',
  candidatePosition = 'متقاضی موقعیت شغلی',
  onFinishTest,
  onExit
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, CandidateAnswer>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(test.durationMinutes * 60);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Coding execution state for current question
  const [codeExecution, setCodeExecution] = useState<CodeExecutionResult | null>(null);
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'testcases' | 'console'>('testcases');

  const currentQuestion: Question = test.questions[currentQuestionIndex] || test.questions[0];

  // Initialize starter code if not present
  useEffect(() => {
    if (currentQuestion && currentQuestion.kind === 'coding' && currentQuestion.codingData) {
      if (!answers[currentQuestion.id]?.codeAnswer) {
        setAnswers(prev => ({
          ...prev,
          [currentQuestion.id]: {
            questionId: currentQuestion.id,
            kind: 'coding',
            codeAnswer: currentQuestion.codingData?.starterCode || '',
            codeExecutionPassed: false
          }
        }));
      }
    }
  }, [currentQuestionIndex, currentQuestion]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const isLowTime = secondsRemaining <= 300; // 5 min warning

  // Update answers
  const handleSelectOption = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        kind: currentQuestion.kind,
        selectedOptionId: optionId
      }
    }));
  };

  const handleSelectSjtOption = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        kind: 'sjt',
        selectedSjtOptionId: optionId
      }
    }));
  };

  const handlePersonalityRating = (rating: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        kind: 'personality',
        personalityRating: rating
      }
    }));
  };

  const handleCodeChange = (code: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...(prev[currentQuestion.id] || { questionId: currentQuestion.id, kind: 'coding' }),
        codeAnswer: code
      }
    }));
  };

  // Run Code logic
  const handleRunCode = () => {
    if (!currentQuestion.codingData) return;
    setIsRunningCode(true);

    const userCode = answers[currentQuestion.id]?.codeAnswer || currentQuestion.codingData.starterCode;
    const result = executeCandidateCode(userCode, currentQuestion.codingData.testCases);

    setCodeExecution(result);
    setIsRunningCode(false);

    // Save passing state
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...(prev[currentQuestion.id] || { questionId: currentQuestion.id, kind: 'coding' }),
        codeExecutionPassed: result.passed
      }
    }));
  };

  // Toggle flag
  const toggleFlag = (qId: string) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Completion calculation
  const answeredCount = useMemo(() => {
    return Object.values(answers).filter(a => {
      if (a.kind === 'coding') return Boolean(a.codeAnswer && a.codeAnswer.trim().length > 15);
      if (a.kind === 'mcq') return Boolean(a.selectedOptionId);
      if (a.kind === 'sjt') return Boolean(a.selectedSjtOptionId);
      if (a.kind === 'personality') return Boolean(a.personalityRating);
      return false;
    }).length;
  }, [answers]);

  // Submit test and compute comprehensive result
  const handleSubmitAssessment = () => {
    let earnedPoints = 0;
    let totalPoints = 0;
    let technicalPoints = 0;
    let technicalTotal = 0;
    let psPoints = 0;
    let psTotal = 0;
    let sjtPoints = 0;
    let sjtTotal = 0;
    let personalityPoints = 0;
    let personalityTotal = 0;

    let totalCodingCases = 0;
    let passedCodingCases = 0;
    let lastCodeSnippet = '';
    let lastCodeTime = 12;

    test.questions.forEach(q => {
      totalPoints += q.points;
      const ans = answers[q.id];

      if (q.kind === 'coding') {
        technicalTotal += q.points;
        const code = ans?.codeAnswer || q.codingData?.starterCode || '';
        lastCodeSnippet = code;
        const result = executeCandidateCode(code, q.codingData?.testCases || []);
        totalCodingCases += result.totalCases;
        passedCodingCases += result.passedCases;
        lastCodeTime = result.executionTimeMs;

        const ratio = result.totalCases > 0 ? result.passedCases / result.totalCases : 0;
        const earned = Math.round(ratio * q.points);
        earnedPoints += earned;
        technicalPoints += earned;
      } else if (q.kind === 'mcq') {
        if (test.testType === 'problem_solving') {
          psTotal += q.points;
        } else {
          technicalTotal += q.points;
        }

        const selectedOpt = q.mcqData?.options.find(o => o.id === ans?.selectedOptionId);
        if (selectedOpt && selectedOpt.isCorrect) {
          earnedPoints += q.points;
          if (test.testType === 'problem_solving') {
            psPoints += q.points;
          } else {
            technicalPoints += q.points;
          }
        }
      } else if (q.kind === 'sjt') {
        sjtTotal += q.points;
        const selectedOpt = q.sjtData?.options.find(o => o.id === ans?.selectedSjtOptionId);
        const optScore = selectedOpt ? selectedOpt.score : 2; // 1-5 scale
        const earned = Math.round((optScore / 5) * q.points);
        earnedPoints += earned;
        sjtPoints += earned;
      } else if (q.kind === 'personality') {
        personalityTotal += q.points;
        const rating = ans?.personalityRating || 3;
        const earned = Math.round((rating / 5) * q.points);
        earnedPoints += earned;
        personalityPoints += earned;
      }
    });

    const overallScore = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 85;

    const technicalScore = technicalTotal > 0 ? Math.round((technicalPoints / technicalTotal) * 100) : 88;
    const problemSolvingScore = psTotal > 0 ? Math.round((psPoints / psTotal) * 100) : 84;
    const situationalJudgmentScore = sjtTotal > 0 ? Math.round((sjtPoints / sjtTotal) * 100) : 90;
    const personalityFitScore = personalityTotal > 0 ? Math.round((personalityPoints / personalityTotal) * 100) : 92;

    const status = overallScore >= 80 ? 'recommended' : overallScore >= 60 ? 'review' : 'not_fit';
    const statusLabel = 
      status === 'recommended' ? 'استخدام پیشنهادی (شایستگی بالا)' :
      status === 'review' ? 'نیازمند مصاحبه تکمیلی' : 'عدم انطباق در این آزمون';

    const candidateResult: CandidateResult = {
      id: `cand-${Date.now()}`,
      candidateName,
      email: candidateEmail,
      phone: '۰۹۱۲۰۰۰۰۰۰۰',
      jobPosition: candidatePosition,
      categoryId: test.categoryId,
      testId: test.id,
      testTitle: test.titleFa,
      testType: test.testType,
      submittedAt: new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      timeSpentMinutes: Math.max(1, Math.round((test.durationMinutes * 60 - secondsRemaining) / 60)),
      overallScore,
      status,
      statusLabel,
      scoreBreakdown: {
        technicalOrRoleScore: technicalScore,
        problemSolvingScore: problemSolvingScore,
        situationalJudgmentScore: situationalJudgmentScore,
        personalityFitScore: personalityFitScore
      },
      radarSkills: [
        { skill: 'مهارت فنی و تخصصی', score: technicalScore, benchmark: 75 },
        { skill: 'حل مسئله و منطق', score: problemSolvingScore, benchmark: 70 },
        { skill: 'قضاوت موقعیتی (SJT)', score: situationalJudgmentScore, benchmark: 72 },
        { skill: 'سازگاری و فرهنگ سازمانی', score: personalityFitScore, benchmark: 78 },
        { skill: 'مدیریت زمان آزمون', score: Math.min(100, Math.round((secondsRemaining / (test.durationMinutes * 60)) * 100) + 40), benchmark: 65 }
      ],
      keyStrengths: [
        overallScore >= 75 ? 'درک دقیق الزامات و پاسخ‌دهی منطقی به مسائل تخصصی' : 'تسلط بر مفاهیم پایه',
        situationalJudgmentScore >= 80 ? 'رویکرد غیرتقابلی و راهکارمحور در سناریوهای حل تعارض سازمانی' : 'پایبندی به فرآیندهای کاری',
        technicalScore >= 80 ? 'دقت در پیاده‌سازی جزییات و استانداردهای نقشی' : 'پتانسیل یادگیری سریع'
      ],
      improvementAreas: [
        problemSolvingScore < 75 ? 'تقویت سرعت تحلیل داده‌های عددی و سناریوهای چندوجهی تحت فشار زمان' : 'مدل‌سازی بهینه‌تر سناریوهای مقیاس‌پذیری',
        'توصیه می‌شود در مصاحبه حضوری نمونه تجارب واقعی در پروژه‌های پیشین مورد پرسش قرار گیرد'
      ],
      behavioralSummary: `داوطلب در این آزمون نمره کل ${overallScore} از ۱۰۰ را کسب نمود. با توجه به ماتریس شایستگی، سطح تسلط ایشان بر مهارت‌های مورد سنجش در گروه ${statusLabel} قرار می‌گیرد.`,
      suggestedInterviewQuestions: [
        'در مواجهه با یک باگ یا بن‌بست تحلیلی ناشناخته، معمولاً فرآیند تحقیق و ریشه‌یابی خود را چگونه آغاز می‌کنید؟',
        'اگر مدیر یا مشتری در میانه فاز توسعه تغییر اساسی در نیازمندی‌ها ایجاد کند، اولویت‌بندی تسک‌ها را چگونه بازتعریف می‌نمایید؟'
      ],
      codingResult: totalCodingCases > 0 ? {
        codeSubmitted: lastCodeSnippet,
        language: 'JavaScript ES6',
        testCasesPassed: passedCodingCases,
        totalTestCases: totalCodingCases,
        executionTimeMs: lastCodeTime,
        codeQualityNote: passedCodingCases === totalCodingCases ? 'تمام تست‌کیس‌ها با موفقیت پاس شدند' : `${passedCodingCases} از ${totalCodingCases} تست پاس شد`
      } : undefined
    };

    onFinishTest(candidateResult);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Top Test Navigation Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        
        {/* Left: Candidate Info & Exit */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (window.confirm('آیا مایلید از آزمون خارج شوید؟ پاسخ‌های شما تا این لحظه محاسبه خواهد شد.')) {
                onExit();
              }
            }}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 p-1.5 rounded hover:bg-slate-800"
          >
            <ArrowRight className="w-4 h-4" />
            <span className="hidden sm:inline">انصراف و خروج</span>
          </button>

          <div className="hidden md:block border-r border-slate-800 pr-4 text-xs text-slate-400">
            <span className="font-medium text-slate-200">{candidateName}</span>
            <span className="mx-2 text-slate-600">·</span>
            <span>{candidatePosition}</span>
          </div>
        </div>

        {/* Center: Test Title & Progress */}
        <div className="text-center">
          <h2 className="text-sm font-bold text-white max-w-md truncate">
            {test.titleFa}
          </h2>
          <div className="text-xs text-slate-400 flex items-center justify-center gap-2 mt-0.5">
            <span>سوال {currentQuestionIndex + 1} از {test.questions.length}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium">
              {answeredCount} پاسخ داده شده
            </span>
          </div>
        </div>

        {/* Right: Timer & Submit Button */}
        <div className="flex items-center gap-3">
          <div 
            className={`px-3 py-1.5 rounded-lg flex items-center gap-2 font-mono text-sm tabular-nums font-semibold ${
              isLowTime 
                ? 'bg-rose-950/80 text-rose-300 border border-rose-800 animate-pulse' 
                : 'bg-slate-800/80 text-amber-300 border border-slate-700'
            }`}
            title="زمان باقیمانده"
          >
            <Clock className="w-4 h-4" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>ارسال و ثبت نهایی</span>
          </button>
        </div>

      </header>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Main Question View (RTL Right side) */}
        <div className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Question Header Card */}
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded font-medium">
                  {currentQuestion.kind === 'coding' ? 'چالش کدنویسی عملی' :
                   currentQuestion.kind === 'sjt' ? 'قضاوت موقعیتی (SJT)' :
                   currentQuestion.kind === 'personality' ? 'ارزیابی رفتار سازمانی' : 'تست چهارگزینه‌ای تخصصی'}
                </span>
                <span className="text-slate-400 tabular-nums">
                  ارزش: {currentQuestion.points} امتیاز
                </span>
              </div>

              <button
                onClick={() => toggleFlag(currentQuestion.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
                  flaggedQuestions[currentQuestion.id]
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flaggedQuestions[currentQuestion.id] ? 'نشان‌دار شده برای بازبینی' : 'نشان‌گذاری سوال'}</span>
              </button>
            </div>

            <h3 className="text-lg font-bold text-white leading-relaxed">
              {currentQuestion.title}
            </h3>
          </div>

          {/* KIND 1: CODING QUESTION INTERFACE */}
          {currentQuestion.kind === 'coding' && currentQuestion.codingData && (
            <div className="flex-1 flex flex-col gap-5">
              
              {/* Problem Description & Specifications */}
              <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4 text-sm leading-relaxed text-slate-200">
                <div className="whitespace-pre-line text-slate-100">
                  {currentQuestion.codingData.problemStatement}
                </div>

                {/* Constraints */}
                {currentQuestion.codingData.constraints.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
                    <span className="text-xs font-semibold text-slate-400 block">محدودیت‌ها و نکات:</span>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                      {currentQuestion.codingData.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Examples */}
                {currentQuestion.codingData.examples.map((ex, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 text-xs font-mono space-y-1" dir="ltr">
                    <div className="text-slate-400">// Example {idx + 1}</div>
                    <div className="text-cyan-300"><span className="text-slate-500">Input: </span>{ex.input}</div>
                    <div className="text-emerald-300"><span className="text-slate-500">Output: </span>{ex.output}</div>
                    {ex.explanation && (
                      <div className="text-slate-400 text-[11px] font-sans pt-1" dir="rtl">
                        توضیح: {ex.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Code Editor Header & Controls */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-inner">
                <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-medium text-slate-300">
                      محیط ویرایشگر کد (JavaScript ES6)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (currentQuestion.codingData?.starterCode) {
                          handleCodeChange(currentQuestion.codingData.starterCode);
                        }
                      }}
                      className="px-2.5 py-1 text-xs text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors flex items-center gap-1"
                      title="بازنشانی به کد اولیه"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>ریست کد</span>
                    </button>

                    <button
                      onClick={handleRunCode}
                      disabled={isRunningCode}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isRunningCode ? 'در حال اجرا...' : 'اجرای کد و تست‌کیس‌ها'}</span>
                    </button>
                  </div>
                </div>

                {/* Textarea Code Editor */}
                <textarea
                  value={answers[currentQuestion.id]?.codeAnswer ?? currentQuestion.codingData.starterCode}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  dir="ltr"
                  rows={14}
                  spellCheck={false}
                  className="w-full bg-slate-950 text-emerald-300 p-4 font-mono text-sm leading-relaxed focus:outline-none resize-y selection:bg-indigo-600 selection:text-white"
                />

                {/* Test Results & Console Output Panel */}
                <div className="border-t border-slate-800 bg-slate-900/90 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-4 text-xs font-medium">
                      <button
                        onClick={() => setActiveConsoleTab('testcases')}
                        className={`transition-colors pb-1 ${
                          activeConsoleTab === 'testcases'
                            ? 'text-white border-b-2 border-indigo-500 font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        نتیجه تست‌کیس‌ها
                        {codeExecution && (
                          <span className="mr-1.5 font-mono text-[11px] text-slate-400">
                            ({codeExecution.passedCases}/{codeExecution.totalCases})
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => setActiveConsoleTab('console')}
                        className={`transition-colors pb-1 flex items-center gap-1.5 ${
                          activeConsoleTab === 'console'
                            ? 'text-white border-b-2 border-indigo-500 font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        خروجی لاگ کنسول
                      </button>
                    </div>

                    {codeExecution && (
                      <div className="text-xs text-slate-400 font-mono tabular-nums">
                        زمان اجرا: {codeExecution.executionTimeMs}ms
                      </div>
                    )}
                  </div>

                  {activeConsoleTab === 'testcases' ? (
                    <div>
                      {!codeExecution ? (
                        <div className="text-xs text-slate-500 py-3 text-center">
                          برای اعتبارسنجی الگوریتم خود، روی دکمه «اجرای کد و تست‌کیس‌ها» کلیک کنید.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {codeExecution.errorMessage && (
                            <div className="p-3 bg-rose-950/50 border border-rose-800/80 rounded-lg text-rose-300 text-xs font-mono">
                              خطای اجرا: {codeExecution.errorMessage}
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {codeExecution.testCaseResults.map((tc, idx) => (
                              <div
                                key={tc.testCaseId || idx}
                                className={`p-2.5 rounded-lg border text-xs font-mono flex flex-col justify-between ${
                                  tc.passed
                                    ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300'
                                    : 'bg-rose-950/30 border-rose-800/50 text-rose-300'
                                }`}
                                dir="ltr"
                              >
                                <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/5">
                                  <span className="font-semibold text-slate-300">
                                    Test {idx + 1}: {tc.description}
                                  </span>
                                  {tc.passed ? (
                                    <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                                      <CheckCircle2 className="w-3 h-3" /> PASSED
                                    </span>
                                  ) : (
                                    <span className="text-rose-400 font-bold flex items-center gap-1 text-[11px]">
                                      <XCircle className="w-3 h-3" /> FAILED
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-400 truncate">
                                  Input: {tc.input}
                                </div>
                                <div className="text-[11px] text-slate-300 truncate">
                                  Expected: {tc.expected}
                                </div>
                                <div className="text-[11px] truncate">
                                  Actual: {tc.actual}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="font-mono text-xs text-slate-300 bg-slate-950 p-3 rounded-lg min-h-[70px] max-h-48 overflow-y-auto" dir="ltr">
                      {codeExecution?.logs && codeExecution.logs.length > 0 ? (
                        codeExecution.logs.map((log, i) => (
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
          )}

          {/* KIND 2: MULTIPLE CHOICE QUESTION INTERFACE */}
          {currentQuestion.kind === 'mcq' && currentQuestion.mcqData && (
            <div className="space-y-6">
              <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {currentQuestion.mcqData.question}
              </div>

              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-400 block">
                  یکی از گزینه‌های زیر را به عنوان پاسخ صحیح انتخاب کنید:
                </span>

                {currentQuestion.mcqData.options.map((option) => {
                  const isSelected = answers[currentQuestion.id]?.selectedOptionId === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full p-4 rounded-xl border text-right transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                          : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'border-indigo-400 bg-indigo-600 text-white'
                          : 'border-slate-500 bg-slate-900'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm leading-relaxed">{option.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* KIND 3: SITUATIONAL JUDGMENT (SJT) INTERFACE */}
          {currentQuestion.kind === 'sjt' && currentQuestion.sjtData && (
            <div className="space-y-6">
              
              {/* Workplace Dilemma Card */}
              <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  <span>سناریوی شبیه‌سازی شده محیط کار:</span>
                </div>
                <p className="text-sm text-slate-100 leading-relaxed font-normal">
                  {currentQuestion.sjtData.scenario}
                </p>

                {currentQuestion.sjtData.context && (
                  <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg text-xs text-slate-400">
                    <strong className="text-slate-300 block mb-1">زمینه موقعیت:</strong>
                    {currentQuestion.sjtData.context}
                  </div>
                )}
              </div>

              {/* Action Choices */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-400 block">
                  به نظر شما موثرترین و حرفه‌ای‌ترین اقدام در این موقعیت کدام است؟
                </span>

                {currentQuestion.sjtData.options.map((option) => {
                  const isSelected = answers[currentQuestion.id]?.selectedSjtOptionId === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectSjtOption(option.id)}
                      className={`w-full p-4 rounded-xl border text-right transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-amber-950/40 border-amber-500 text-white shadow-sm'
                          : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'border-amber-400 bg-amber-600 text-white'
                          : 'border-slate-500 bg-slate-900'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm leading-relaxed">{option.text}</span>
                    </button>
                  );
                })}
              </div>

            </div>
          )}

          {/* KIND 4: PERSONALITY & CULTURE FIT (LIKERT) */}
          {currentQuestion.kind === 'personality' && currentQuestion.personalityData && (
            <div className="space-y-8">
              <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-8 text-center space-y-4 max-w-2xl mx-auto">
                <span className="text-xs text-indigo-400 font-medium">
                  ابعاد رفتار و انطباق فرهنگی شغلی
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                  «{currentQuestion.personalityData.statement}»
                </h4>
              </div>

              {/* Likert 1 to 5 scale */}
              <div className="max-w-xl mx-auto space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 px-2 font-medium">
                  <span className="text-rose-400">کاملاً مخالفم</span>
                  <span>خنثی</span>
                  <span className="text-emerald-400">کاملاً موافقم</span>
                </div>

                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {[1, 2, 3, 4, 5].map((val) => {
                    const isSelected = answers[currentQuestion.id]?.personalityRating === val;
                    const labels = ['۱ (کاملاً مخالف)', '۲ (مخالف)', '۳ (خنثی)', '۴ (موافق)', '۵ (کاملاً موافق)'];

                    return (
                      <button
                        key={val}
                        onClick={() => handlePersonalityRating(val)}
                        className={`py-3.5 px-2 rounded-xl border text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-md scale-105'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <span className="text-base font-bold font-mono">{val}</span>
                        <span className="text-[10px] hidden sm:block opacity-80">{labels[val - 1].split(' ')[1]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* Bottom Question Step Navigation */}
          <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
                currentQuestionIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-slate-500'
                  : 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700'
              }`}
            >
              <ArrowRight className="w-4 h-4" />
              <span>سوال قبلی</span>
            </button>

            <div className="text-xs text-slate-400 font-mono tabular-nums">
              {currentQuestionIndex + 1} / {test.questions.length}
            </div>

            {currentQuestionIndex < test.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>سوال بعدی</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowSubmitModal(true)}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>پایان و ارسال پاسخ‌ها</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Sidebar Question Palette (LTL Left / RTL Right) */}
        <div className="w-full lg:w-72 bg-slate-950 border-t lg:border-t-0 lg:border-r border-slate-800 p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
              <span>پالت و وضعیت سوالات</span>
              <span className="font-mono text-slate-500">{test.questions.length} سوال</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2">
              {test.questions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isFlagged = flaggedQuestions[q.id];
                const ans = answers[q.id];
                const isAnswered = 
                  (q.kind === 'coding' && ans?.codeAnswer && ans.codeAnswer.trim().length > 15) ||
                  (q.kind === 'mcq' && ans?.selectedOptionId) ||
                  (q.kind === 'sjt' && ans?.selectedSjtOptionId) ||
                  (q.kind === 'personality' && ans?.personalityRating);

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-10 rounded-lg text-xs font-mono font-semibold transition-all relative flex items-center justify-center ${
                      isCurrent
                        ? 'ring-2 ring-indigo-400 bg-indigo-600 text-white'
                        : isAnswered
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/60'
                        : 'bg-slate-800/80 text-slate-400 border border-slate-750 hover:bg-slate-700'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="absolute top-1 left-1 w-2 h-2 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-1.5 pt-4 border-t border-slate-850 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-950 border border-emerald-700 inline-block" />
                <span>پاسخ داده شده ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-indigo-600 inline-block" />
                <span>سوال در حال مشاهده</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-400 inline-block" />
                <span>نشان‌دار برای بازبینی ({Object.values(flaggedQuestions).filter(Boolean).length})</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-850">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ثبت و اتمام آزمون</span>
            </button>
          </div>
        </div>

      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full text-right space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              تأیید پایان آزمون
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              شما به <strong className="text-white">{answeredCount}</strong> سوال از مجموع <strong className="text-white">{test.questions.length}</strong> سوال پاسخ داده‌اید.
              {answeredCount < test.questions.length && (
                <span className="block mt-2 text-amber-300">
                  ⚠️ توجه: {test.questions.length - answeredCount} سوال بی‌پاسخ باقی مانده است.
                </span>
              )}
            </p>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
              >
                ادامه آزمون
              </button>

              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  handleSubmitAssessment();
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-sm"
              >
                ثبت نهایی و دریافت کارنامه
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
