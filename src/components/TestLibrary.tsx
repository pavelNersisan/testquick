import React, { useState, useMemo } from 'react';
import { AssessmentTest, JobCategoryId, TestType } from '../types/assessment';
import { JOB_CATEGORIES } from '../data/categories';
import { 
  Search, 
  Code, 
  BrainCircuit, 
  Compass, 
  HeartHandshake, 
  GraduationCap, 
  Languages, 
  Cpu, 
  Layers, 
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';

interface TestLibraryProps {
  tests: AssessmentTest[];
  onSelectTest: (test: AssessmentTest) => void;
  onPreviewTest: (test: AssessmentTest) => void;
}

export const TestLibrary: React.FC<TestLibraryProps> = ({
  tests,
  onSelectTest,
  onPreviewTest
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<JobCategoryId | 'all'>('all');
  const [selectedType, setSelectedType] = useState<TestType | 'all'>('all');

  const testTypeFilters: { id: TestType | 'all'; labelFa: string; icon: React.ReactNode }[] = [
    { id: 'all', labelFa: 'همه آزمون‌ها', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'coding', labelFa: 'برنامه‌نویسی و کدنویسی', icon: <Code className="w-3.5 h-3.5 text-emerald-600" /> },
    { id: 'problem_solving', labelFa: 'حل مسئله و استدلال تحلیلی', icon: <BrainCircuit className="w-3.5 h-3.5 text-amber-600" /> },
    { id: 'situational_judgment', labelFa: 'قضاوت موقعیتی (SJT)', icon: <Compass className="w-3.5 h-3.5 text-indigo-600" /> },
    { id: 'personality_culture', labelFa: 'رفتار سازمانی و فرهنگ', icon: <HeartHandshake className="w-3.5 h-3.5 text-pink-600" /> },
    { id: 'role_specific', labelFa: 'مهارت‌های تخصصی نقش', icon: <GraduationCap className="w-3.5 h-3.5 text-blue-600" /> },
    { id: 'engineering_skills', labelFa: 'مهندسی و کنترل کیفیت', icon: <Cpu className="w-3.5 h-3.5 text-orange-600" /> },
    { id: 'language', labelFa: 'زبان و مکاتبات اداری', icon: <Languages className="w-3.5 h-3.5 text-cyan-600" /> },
  ];

  const filteredTests = useMemo(() => {
    return tests.filter(test => {
      const matchesSearch = 
        test.titleFa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.descriptionFa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.skillsCovered.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        test.targetRoles.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || test.categoryId === selectedCategory;
      const matchesType = selectedType === 'all' || test.testType === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [tests, searchQuery, selectedCategory, selectedType]);

  const [visibleCount, setVisibleCount] = useState(12);

  const activeCategoryObj = JOB_CATEGORIES.find(c => c.id === selectedCategory);

  // Calculate count of tests per category dynamically
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tests.forEach(t => {
      counts[t.categoryId] = (counts[t.categoryId] || 0) + 1;
    });
    return counts;
  }, [tests]);

  return (
    <div className="space-y-8">
      
      {/* Hero Intro Header */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-2xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4 text-right">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-300">
            <span>بانک آزمون‌های جامع شغلی با بیش از ۱۷۰ آزمون تخصصی</span>
            <span aria-hidden="true">·</span>
            <span>حداقل ۱۰ آزمون برای هر یک از ۱۷ صنعت مادر بر اساس استانداردهای جهانی</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            سنجش دقیق و علمی شایستگی‌های استخدامی
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
            ارزیابی استاندارد برنامه‌نویسی با اجرای زنده کد، آزمون‌های تفکر تحلیلی و حل مسئله (McKinsey PST)، شبیه‌سازی سناریوهای محیط کار (SHL SJT) و تناسب رفتار سازمانی مطابق مراجع بین‌المللی.
          </p>

          {/* Quick Search */}
          <div className="pt-2 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(12);
                }}
                placeholder="جستجوی عنوان آزمون، مهارت (مثلاً React, Python, IFRS, مذاکره) یا شغل..."
                className="w-full pl-10 pr-11 py-3 text-sm rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md text-right"
              />
              <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-3 text-xs text-slate-400 hover:text-slate-600 px-1 py-0.5"
                >
                  پاک‌کردن
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Subtle decorative geometric overlay */}
        <div className="absolute left-0 bottom-0 top-0 w-1/3 bg-radial from-indigo-500/10 to-transparent pointer-events-none" />
      </div>

      {/* 17 Parent Job Categories Horizontal Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
            <span>دسته‌بندی‌های شغلی مادر (۱۷ صنعت اصلی · حداقل ۱۰ آزمون تخصصی برای هر صنعت)</span>
          </div>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setVisibleCount(12);
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              نمایش همه صنایع
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setVisibleCount(12);
            }}
            className={`px-3.5 py-2 text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white font-medium shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {selectedCategory === 'all' && <Check className="w-3.5 h-3.5 text-indigo-400" />}
            <span>همه دسته‌بندی‌ها ({tests.length})</span>
          </button>

          {JOB_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.id] || 10;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setVisibleCount(12);
                }}
                className={`px-3.5 py-2 text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white font-medium shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {selectedCategory === cat.id && <Check className="w-3.5 h-3.5 text-white" />}
                <span>{cat.titleFa}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  selectedCategory === cat.id ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Test Type Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200/80">
        {testTypeFilters.map((tf) => (
          <button
            key={tf.id}
            onClick={() => {
              setSelectedType(tf.id);
              setVisibleCount(12);
            }}
            className={`px-3.5 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              selectedType === tf.id
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            {tf.icon}
            <span>{tf.labelFa}</span>
          </button>
        ))}
      </div>

      {/* Active Filter Notice if set */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div className="flex items-center gap-2">
          <span>نمایش نتایج:</span>
          {activeCategoryObj && (
            <span className="font-semibold text-slate-800">صنعت {activeCategoryObj.titleFa} ({categoryCounts[activeCategoryObj.id] || 10} آزمون)</span>
          )}
          {selectedType !== 'all' && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-800">نوع آزمون: {testTypeFilters.find(f => f.id === selectedType)?.labelFa}</span>
            </>
          )}
          {searchQuery && (
            <>
              <span aria-hidden="true">·</span>
              <span>جستجوی «{searchQuery}»</span>
            </>
          )}
        </div>
        <span className="tabular-nums font-mono text-slate-700">
          {filteredTests.length} آزمون منطبق
        </span>
      </div>

      {/* Test Grid */}
      {filteredTests.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
          <BrainCircuit className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">آزمونی با این مشخصات یافت نشد</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            می‌توانید فیلتر دسته‌بندی یا کلمات جستجو را تغییر دهید یا از بخش «سازنده ارزیابی سفارشی» آزمون دلخواه خود را طراحی کنید.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedType('all');
              setVisibleCount(12);
            }}
            className="px-4 py-2 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
          >
            پاک کردن تمام فیلترها
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTests.slice(0, visibleCount).map((test) => {
              const categoryObj = JOB_CATEGORIES.find(c => c.id === test.categoryId);

              return (
                <div
                  key={test.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between text-right group"
                >
                  <div className="space-y-3">
                    
                    {/* Category and Type unboxed metadata */}
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="text-indigo-600 font-medium">
                        {categoryObj?.titleFa || 'تخصصی'}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span>{test.durationMinutes} دقیقه</span>
                        <span aria-hidden="true">·</span>
                        <span>{test.questionCount} سوال</span>
                        <span aria-hidden="true">·</span>
                        <span>سطح {test.difficulty}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                      {test.titleFa}
                    </h3>

                    {/* Source standard label */}
                    {test.sourceStandard && (
                      <div className="text-[11px] text-amber-700 font-medium">
                        {test.sourceStandard}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {test.descriptionFa}
                    </p>

                    {/* Skills Covered Unboxed List */}
                    <div className="pt-1">
                      <div className="text-[11px] text-slate-400 font-medium mb-1">مهارت‌های مورد سنجش:</div>
                      <div className="text-xs text-slate-700 leading-snug">
                        {test.skillsCovered.slice(0, 3).join(' · ')}
                        {test.skillsCovered.length > 3 && ` · +${test.skillsCovered.length - 3}`}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onPreviewTest(test)}
                      className="text-xs text-slate-600 hover:text-slate-900 font-medium px-2 py-1.5 hover:bg-slate-50 rounded transition-colors"
                    >
                      مشاهده سرفصل‌ها
                    </button>

                    <button
                      onClick={() => onSelectTest(test)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span>ورود به آزمون</span>
                      <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredTests.length && (
            <div className="text-center pt-4">
              <button
                onClick={() => setVisibleCount(prev => prev + 12)}
                className="px-6 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                نمایش ۱۲ آزمون بیشتر (نمایش {Math.min(visibleCount, filteredTests.length)} از {filteredTests.length} آزمون)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
