import React from 'react';
import { AssessmentTest } from '../types/assessment';
import { X, Clock, HelpCircle, CheckCircle, BarChart, ArrowLeft } from 'lucide-react';

interface TestDetailModalProps {
  test: AssessmentTest | null;
  onClose: () => void;
  onStartTest: (test: AssessmentTest) => void;
}

export const TestDetailModal: React.FC<TestDetailModalProps> = ({
  test,
  onClose,
  onStartTest
}) => {
  if (!test) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-right"
        role="dialog"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-right">
            <span className="text-xs text-indigo-600 font-medium block">
              شناسه آزمون: {test.id}
            </span>
            <h2 className="text-lg font-bold text-slate-900 leading-snug">
              {test.titleFa}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>مدت زمان:</span>
              <strong className="font-semibold text-slate-800">{test.durationMinutes} دقیقه</strong>
            </div>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span>تعداد سوالات:</span>
              <strong className="font-semibold text-slate-800">{test.questionCount} سوال تخصصی</strong>
            </div>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <BarChart className="w-4 h-4 text-slate-500" />
              <span>سطح دشواری:</span>
              <strong className="font-semibold text-slate-800">{test.difficulty}</strong>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2">توضیحات و اهداف سنجش</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {test.descriptionFa}
            </p>
          </div>

          {/* Target Roles */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2">عناوین شغلی هدف</h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {test.targetRoles.map((role, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Covered */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2">شایستگی‌ها و مهارت‌های مورد ارزیابی</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {test.skillsCovered.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Question Preview */}
          {test.questions.length > 0 && (
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <span className="text-xs font-semibold text-slate-700 block mb-2">
                نمونه پرسش ارزیابی:
              </span>
              <p className="text-xs text-slate-800 font-medium leading-relaxed">
                {test.questions[0].title}
              </p>
              {test.questions[0].codingData && (
                <pre className="mt-2 p-2.5 bg-slate-900 text-emerald-400 text-[11px] rounded font-mono text-left overflow-x-auto" dir="ltr">
                  {test.questions[0].codingData.starterCode.slice(0, 150)}...
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            انصراف
          </button>
          
          <button
            onClick={() => {
              onStartTest(test);
              onClose();
            }}
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs flex items-center gap-2"
          >
            <span>شروع آزمون این ماژول</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
