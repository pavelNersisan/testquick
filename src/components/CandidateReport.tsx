import React, { useState } from 'react';
import { CandidateResult } from '../types/assessment';
import { 
  Printer, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Code2, 
  BrainCircuit, 
  Compass, 
  HeartHandshake, 
  HelpCircle,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';

interface CandidateReportProps {
  result: CandidateResult;
  onBack: () => void;
}

export const CandidateReport: React.FC<CandidateReportProps> = ({
  result,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'interview'>('overview');

  const getStatusColor = (status: CandidateResult['status']) => {
    switch (status) {
      case 'recommended':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'not_fit':
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  const getStatusIcon = (status: CandidateResult['status']) => {
    switch (status) {
      case 'recommended':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'review':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'not_fit':
        return <XCircle className="w-4 h-4 text-rose-600" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-right pb-16 print:p-0 print:m-0">
      
      {/* Top action bar */}
      <div className="flex items-center justify-between print:hidden">
        <button
          onClick={onBack}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به سوابق و کارنامه‌ها</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>چاپ و ذخیره گزارش (PDF)</span>
          </button>
        </div>
      </div>

      {/* Main Candidate Card Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                {result.candidateName}
              </h1>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${getStatusColor(result.status)}`}>
                {getStatusIcon(result.status)}
                <span>{result.statusLabel}</span>
              </div>
            </div>

            <p className="text-sm font-medium text-slate-600">
              {result.jobPosition}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-1">
              <span>ایمیل: {result.email}</span>
              <span aria-hidden="true">·</span>
              <span>تاریخ آزمون: {result.submittedAt}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>زمان صرف شده: {result.timeSpentMinutes} دقیقه</span>
              </span>
            </div>
          </div>

          {/* Overall Score Highlight */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 shrink-0">
            <div className="text-left">
              <span className="text-[11px] text-slate-400 block font-medium">نمره کل شایستگی</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-indigo-600 font-mono tabular-nums">
                  {result.overallScore}
                </span>
                <span className="text-xs text-slate-400 font-mono">/ ۱۰۰</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 4 Pillars Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-right">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Code2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>مهارت فنی / نقشی</span>
            </div>
            <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">
              {result.scoreBreakdown.technicalOrRoleScore}%
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <BrainCircuit className="w-3.5 h-3.5 text-amber-600" />
              <span>حل مسئله و تحلیل</span>
            </div>
            <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">
              {result.scoreBreakdown.problemSolvingScore}%
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              <span>قضاوت موقعیتی (SJT)</span>
            </div>
            <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">
              {result.scoreBreakdown.situationalJudgmentScore}%
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <HeartHandshake className="w-3.5 h-3.5 text-pink-600" />
              <span>انطباق رفتار سازمانی</span>
            </div>
            <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">
              {result.scoreBreakdown.personalityFitScore}%
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 border-b border-slate-200 text-xs font-semibold print:hidden">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 transition-colors relative ${
              activeTab === 'overview'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            تحلیل شایستگی‌ها و رفتارشناسی
          </button>

          {result.codingResult && (
            <button
              onClick={() => setActiveTab('code')}
              className={`pb-2.5 transition-colors relative flex items-center gap-1.5 ${
                activeTab === 'code'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>بررسی کد ارسالی ({result.codingResult.testCasesPassed}/{result.codingResult.totalTestCases})</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('interview')}
            className={`pb-2.5 transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'interview'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>راهنمای سوالات مصاحبه حضوری</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & COMPETENCY BREAKDOWN */}
        {(activeTab === 'overview' || typeof window === 'undefined') && (
          <div className="space-y-8">
            
            {/* Competency Bars vs Benchmark */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  ماتریس شایستگی‌های ارزیابی شده در مقایسه با میانگین صنعت
                </h3>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-indigo-600 inline-block" />
                    <span>نمره داوطلب</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-slate-300 inline-block" />
                    <span>میانگین متقاضیان (Benchmark)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-1">
                {result.radarSkills.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-800">{item.skill}</span>
                      <div className="flex items-center gap-2 font-mono tabular-nums text-[11px]">
                        <span className="font-bold text-indigo-700">{item.score}%</span>
                        <span className="text-slate-400">/ میانگین: {item.benchmark}%</span>
                      </div>
                    </div>
                    
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all"
                        style={{ width: `${item.score}%` }}
                      />
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10"
                        style={{ left: `${100 - item.benchmark}%` }}
                        title={`میانگین: ${item.benchmark}%`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths and Growth Areas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              
              {/* Strengths */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>نقاط قوت برجسته کاندیدا</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                  {result.keyStrengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Development */}
              <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>حوزه‌های نیازمند توجه و توسعه</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                  {result.improvementAreas.map((area, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Behavioral Summary Note */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>تحلیل روانشناختی و جمع‌بندی سبک کاری</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {result.behavioralSummary}
              </p>
            </div>

          </div>
        )}

        {/* TAB 2: CODE SUBMISSION REVIEW */}
        {activeTab === 'code' && result.codingResult && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="flex items-center gap-4">
                <span>زبان: <strong className="font-semibold text-slate-900">{result.codingResult.language}</strong></span>
                <span aria-hidden="true">·</span>
                <span>تست‌های پاس شده: <strong className="font-semibold text-emerald-600">{result.codingResult.testCasesPassed} از {result.codingResult.totalTestCases}</strong></span>
              </div>
              <span className="font-mono tabular-nums text-slate-500">
                زمان اجرا: {result.codingResult.executionTimeMs}ms
              </span>
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden shadow-xs">
              <div className="bg-slate-900 px-4 py-2 text-xs font-mono text-slate-400 flex items-center justify-between" dir="ltr">
                <span>// Solution.js submitted by candidate</span>
                <span className="text-emerald-400">{result.codingResult.codeQualityNote}</span>
              </div>
              <pre className="p-4 bg-slate-950 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed" dir="ltr">
                {result.codingResult.codeSubmitted}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: INTERVIEW GUIDE */}
        {activeTab === 'interview' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">
                پرسش‌های هدفمند پیشنهادی برای مصاحبه حضوری / ویدئویی
              </h3>
              <p className="text-xs text-slate-500">
                این سوالات بر مبنای پاسخ‌های کاندیدا در آزمون حل مسئله و قضاوت موقعیتی برای اعتبارسنجی بیشتر تدوین شده‌اند:
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {result.suggestedInterviewQuestions.map((question, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
                    <span>پرسش تخصصی شماره {idx + 1}:</span>
                  </div>
                  <p className="text-xs text-slate-800 font-medium leading-relaxed">
                    «{question}»
                  </p>
                  <div className="text-[11px] text-slate-500">
                    هدف ارزیاب: سنجش نحوه واکنش واقعی کاندیدا در تجارب گذشته و انطباق آن با شایستگی‌های مورد انتظار شغل.
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
