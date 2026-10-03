import React, { useState, useMemo } from 'react';
import { CandidateResult, JobCategoryId } from '../types/assessment';
import { JOB_CATEGORIES } from '../data/categories';
import { 
  Search, 
  ChevronLeft, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock
} from 'lucide-react';

interface CandidatesPipelineProps {
  candidates: CandidateResult[];
  onSelectCandidate: (candidate: CandidateResult) => void;
}

export const CandidatesPipeline: React.FC<CandidatesPipelineProps> = ({
  candidates,
  onSelectCandidate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'recommended' | 'review' | 'not_fit'>('all');
  const [selectedCategory, setSelectedCategory] = useState<JobCategoryId | 'all'>('all');

  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchSearch = 
        c.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.jobPosition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = selectedStatus === 'all' || c.status === selectedStatus;
      const matchCat = selectedCategory === 'all' || c.categoryId === selectedCategory;

      return matchSearch && matchStatus && matchCat;
    });
  }, [candidates, searchQuery, selectedStatus, selectedCategory]);

  const recommendedCount = candidates.filter(c => c.status === 'recommended').length;
  const reviewCount = candidates.filter(c => c.status === 'review').length;
  const averageScore = Math.round(
    candidates.reduce((acc, c) => acc + c.overallScore, 0) / (candidates.length || 1)
  );

  return (
    <div className="space-y-6 text-right">
      
      {/* Page Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            خط لوله ارزیابی کاندیداها و کارنامه‌های استخدامی
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            مشاهده، مقایسه و تحلیل نمرات داوطلبان در آزمون‌های شایستگی تخصصی و رفتاری
          </p>
        </div>

        {/* Quick Metric Pills (Unboxed cards with dividers) */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-xs font-medium">
          <div className="px-2">
            <span className="text-slate-400 block text-[10px]">کل داوطلبان</span>
            <strong className="text-base text-slate-900 font-mono tabular-nums font-bold">{candidates.length}</strong>
          </div>
          <span className="h-6 w-px bg-slate-200" aria-hidden="true" />
          <div className="px-2">
            <span className="text-slate-400 block text-[10px]">پیشنهاد استخدام</span>
            <strong className="text-base text-emerald-600 font-mono tabular-nums font-bold">{recommendedCount}</strong>
          </div>
          <span className="h-6 w-px bg-slate-200" aria-hidden="true" />
          <div className="px-2">
            <span className="text-slate-400 block text-[10px]">میانگین نمره</span>
            <strong className="text-base text-indigo-600 font-mono tabular-nums font-bold">{averageScore}%</strong>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی نام داوطلب، موقعیت شغلی یا ایمیل..."
              className="w-full pl-4 pr-10 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full py-2 px-3 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right"
            >
              <option value="all">همه ۱۷ صنعت مادر</option>
              {JOB_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.titleFa}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Status Segmented Controls */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-100 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
              selectedStatus === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            همه وضعیت‌ها ({candidates.length})
          </button>

          <button
            onClick={() => setSelectedStatus('recommended')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium flex items-center gap-1.5 ${
              selectedStatus === 'recommended'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>استخدام پیشنهادی ({recommendedCount})</span>
          </button>

          <button
            onClick={() => setSelectedStatus('review')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium flex items-center gap-1.5 ${
              selectedStatus === 'review'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>نیازمند بررسی مصاحبه ({reviewCount})</span>
          </button>

          <button
            onClick={() => setSelectedStatus('not_fit')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium flex items-center gap-1.5 ${
              selectedStatus === 'not_fit'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>عدم انطباق ({candidates.filter(c => c.status === 'not_fit').length})</span>
          </button>
        </div>
      </div>

      {/* Candidates List / Grid */}
      {filteredCandidates.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-sm mx-auto space-y-2">
          <p className="text-sm font-semibold text-slate-800">کاندیدایی با این فیلتر یافت نشد</p>
          <p className="text-xs text-slate-500">می‌توانید فیلترها را حذف کرده یا جستجو را پاک کنید.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="divide-y divide-slate-100">
            {filteredCandidates.map((candidate) => {
              const categoryObj = JOB_CATEGORIES.find(c => c.id === candidate.categoryId);

              return (
                <div
                  key={candidate.id}
                  onClick={() => onSelectCandidate(candidate)}
                  className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Candidate Identity */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm shrink-0 border border-indigo-200">
                      {candidate.candidateName.slice(0, 1)}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors">
                          {candidate.candidateName}
                        </span>
                        <span className="text-[11px] text-slate-400">·</span>
                        <span className="text-xs text-slate-500">{candidate.email}</span>
                      </div>

                      <div className="text-xs text-slate-600 font-medium">
                        {candidate.jobPosition}
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-0.5">
                        <span>صنعت: {categoryObj?.titleFa || 'تخصصی'}</span>
                        <span aria-hidden="true">·</span>
                        <span>آزمون: {candidate.testTitle}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{candidate.timeSpentMinutes} دقیقه</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Score & Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                    
                    {/* Score Bar */}
                    <div className="text-left w-28">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="text-base font-bold font-mono tabular-nums text-slate-900">
                          {candidate.overallScore}%
                        </span>
                        <span className="text-[10px] text-slate-400">نمره کل</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full ${
                            candidate.overallScore >= 80 ? 'bg-emerald-500' :
                            candidate.overallScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${candidate.overallScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Status Label */}
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border shrink-0 ${
                      candidate.status === 'recommended' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      candidate.status === 'review' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {candidate.statusLabel.split(' ')[0]}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCandidate(candidate);
                      }}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline shrink-0"
                    >
                      <span>کارنامه</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
