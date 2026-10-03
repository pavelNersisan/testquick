import React, { useState } from 'react';
import { AssessmentTest, JobCategoryId, CustomAssessmentPackage } from '../types/assessment';
import { JOB_CATEGORIES } from '../data/categories';
import { 
  Sparkles, 
  Plus, 
  Check, 
  Copy, 
  Share2, 
  Code2, 
  BrainCircuit, 
  Compass, 
  HeartHandshake, 
  GraduationCap
} from 'lucide-react';

interface AssessmentBuilderProps {
  tests: AssessmentTest[];
  onAddCustomTest: (newTest: AssessmentTest) => void;
  onLaunchCustomPackage: (pkg: CustomAssessmentPackage) => void;
}

export const AssessmentBuilder: React.FC<AssessmentBuilderProps> = ({
  tests,
  onAddCustomTest,
  onLaunchCustomPackage
}) => {
  const [targetRole, setTargetRole] = useState('مهندس ارشد نرم‌افزار Full-Stack');
  const [selectedCategory, setSelectedCategory] = useState<JobCategoryId>('it_software');
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([
    'test-js-algorithms',
    'test-problem-solving',
    'test-sjt-workplace',
    'test-personality-culture'
  ]);
  const [passingScore, setPassingScore] = useState(75);
  const [copiedLink, setCopiedLink] = useState(false);

  // AI Question Generator form
  const [jobDescriptionInput, setJobDescriptionInput] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiGeneratedSuccess, setAiGeneratedSuccess] = useState(false);

  const toggleTestSelection = (testId: string) => {
    setSelectedTestIds(prev => 
      prev.includes(testId) ? prev.filter(id => id !== testId) : [...prev, testId]
    );
  };

  const selectedTests = tests.filter(t => selectedTestIds.includes(t.id));
  const totalDurationMinutes = selectedTests.reduce((acc, t) => acc + t.durationMinutes, 0);
  const totalQuestionCount = selectedTests.reduce((acc, t) => acc + t.questionCount, 0);

  const inviteLink = `https://testlife.app/eval/${selectedCategory}?token=TL-${Math.abs(selectedTestIds.join('').length * 4821).toString(36).toUpperCase()}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Generate Smart AI Questions based on prompt or role
  const handleGenerateAIQuestion = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      const generatedTest: AssessmentTest = {
        id: `custom-ai-${Date.now()}`,
        titleFa: `آزمون هوشمند اختصاصی: ${targetRole}`,
        titleEn: `AI Generated Assessment for ${targetRole}`,
        categoryId: selectedCategory,
        testType: 'role_specific',
        difficulty: 'متوسط',
        durationMinutes: 20,
        questionCount: 3,
        descriptionFa: `طراحی شده با موتور ارزیابی شغلی بر اساس شرح موقعیت: ${jobDescriptionInput || targetRole}. شامل سنجش دانش فنی و قضاوت موقعیتی.`,
        targetRoles: [targetRole],
        skillsCovered: ['تخصص شغلی کاربردی', 'حل مسئله در شرایط ابهام', 'ارتباطات تیمی موثر'],
        popularityScore: 99,
        questions: [
          {
            id: `ai-q-1-${Date.now()}`,
            kind: 'mcq',
            title: `تحلیل سناریوی بهینه‌سازی در موقعیت ${targetRole}`,
            points: 35,
            mcqData: {
              question: `در نقش ${targetRole}، اگر با بحران مقیاس‌پذیری و افزایش ۴۰۰ درصدی حجم درخواست‌های کاربران مواجه شوید، اولین گام سیستمی استاندارد چیست؟`,
              options: [
                { id: 'ai-opt-1', text: 'پیاده‌سازی لایه کشینگ توزیع‌شده (Distributed Caching) و بهینه‌سازی کوئری‌های پرهزینه دیتابیس', isCorrect: true },
                { id: 'ai-opt-2', text: 'خاموش کردن فیچرهای جدید و صبر کردن تا ترافیک کاهش یابد', isCorrect: false },
                { id: 'ai-opt-3', text: 'سرزنش تیم مارکتینگ به خاطر کمپین پرمخاطب', isCorrect: false }
              ],
              explanation: 'رویکرد مهندسی و حرفه‌ای بر کاهش بار پردازشی پایگاه‌داده و مدیریت منابع از طریق کش هوشمند تمرکز دارد.'
            }
          },
          {
            id: `ai-q-2-${Date.now()}`,
            kind: 'sjt',
            title: 'قضاوت موقعیتی: مدیریت تعارض زمان تحویل با مدیر محصول',
            points: 35,
            sjtData: {
              scenario: `مدیر محصول اصرار دارد فیچری پرریسک ظرف ۳ روز آینده منتشر شود، در حالی که شما می‌دانید بدون تست کامل، احتمال قطعی سرویس برای کاربران بالاست.`,
              context: 'سازمان متعهد به جذب رضایت مشتریان است.',
              options: [
                {
                  id: 'ai-sjt-opt-1',
                  text: 'تشکیل جلسه توجیهی با ارائه دیتای عینی از خطرات احتمالی و پیشنهاد انتشار فازبندی‌شده (Canary Release) برای ۵٪ کاربران.',
                  score: 5,
                  effectiveness: 'بسیار اثربخش',
                  feedback: 'این راهکار نیاز کسب‌وکار به سرعت را بدون به خطر انداختن کل سامانه برآورده می‌کند.'
                },
                {
                  id: 'ai-sjt-opt-2',
                  text: 'تسلیم شدن و انتشار بدون تست.',
                  score: 1,
                  effectiveness: 'نامناسب و پرریسک',
                  feedback: 'نادیده گرفتن ریسک‌های سیستمی اعتماد مشتریان را از بین می‌برد.'
                }
              ]
            }
          },
          {
            id: `ai-q-3-${Date.now()}`,
            kind: 'personality',
            title: 'سازگاری و تاب‌آوری در محیط کار پویا',
            points: 30,
            personalityData: {
              statement: 'در مواجهه با فناوری‌ها یا فرآیندهای کاری جدید، با اشتیاق داوطلب یادگیری و انتقال تجربه به همکاران می‌شوم.',
              dimension: 'adaptability'
            }
          }
        ]
      };

      onAddCustomTest(generatedTest);
      setSelectedTestIds(prev => [generatedTest.id, ...prev]);
      setIsGeneratingAI(false);
      setAiGeneratedSuccess(true);
      setTimeout(() => setAiGeneratedSuccess(false), 4000);
    }, 1200);
  };

  const handleCreatePackage = () => {
    const pkg: CustomAssessmentPackage = {
      id: `pkg-${Date.now()}`,
      title: `پکیج جامع ارزیابی: ${targetRole}`,
      categoryId: selectedCategory,
      targetRole,
      selectedTestIds,
      passingScore,
      timeLimitTotalMinutes: totalDurationMinutes,
      createdAt: new Date().toLocaleDateString('fa-IR'),
      inviteCode: `TL-${Math.abs(selectedTestIds.join('').length * 4821).toString(36).toUpperCase()}`
    };

    onLaunchCustomPackage(pkg);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-right pb-16">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          سازنده پکیج ارزیابی استخدامی (Custom Assessment Battery)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          طراحی باتری آزمون‌های ترکیبی: تلفیق مهارت‌های برنامه‌نویسی، حل مسئله، قضاوت موقعیتی (SJT) و تطابق فرهنگی متناسب با نقش شغلی
        </p>
      </div>

      {/* Step 1: Position & Category Config */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">۱</span>
          <span>تعیین موقعیت شغلی و صنعت مادر</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              عنوان موقعیت شغلی مورد نظر
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="مثلاً مدیر بازاریابی، توسعه‌دهنده پایتون، مدیر مالی..."
              className="w-full py-2.5 px-3 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              دسته‌بندی شغلی مادر (۱۷ صنعت)
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full py-2.5 px-3 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right"
            >
              {JOB_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.titleFa}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Special Feature: AI Question & Assessment Generator */}
      <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white border border-indigo-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                تولید سوالات تخصصی با هوش مصنوعی (AI Assessment Generator)
              </h3>
              <p className="text-[11px] text-slate-500">
                شرح وظایف یا نیازمندی‌های این موقعیت شغلی را وارد کنید تا سوالات استاندارد تخصصی، حل مسئله و قضاوت موقعیتی تولید شود.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <textarea
            value={jobDescriptionInput}
            onChange={(e) => setJobDescriptionInput(e.target.value)}
            rows={3}
            placeholder="مثال: تسلط بر معماری میکروسرویس، بهینه‌سازی دیتابیس‌های پرترافیک، روحیه بالای کار تیمی و مدیریت تعارض با ذینفعان..."
            className="w-full p-3 text-xs rounded-lg border border-indigo-200/80 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right text-slate-800 placeholder:text-slate-400"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              تولید خودکار سناریوی SJT + سوال تخصصی + سوال شخصیت‌شناسی
            </span>

            <button
              onClick={handleGenerateAIQuestion}
              disabled={isGeneratingAI}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGeneratingAI ? 'در حال طراحی هوشمند سوالات...' : 'تولید و افزودن ماژول به پکیج'}</span>
            </button>
          </div>

          {aiGeneratedSuccess && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>آزمون اختصاصی با موفقیت تولید و به بانک آزمون‌های این پکیج اضافه شد!</span>
            </div>
          )}
        </div>
      </div>

      {/* Step 2: Select Tests from Library */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">۲</span>
            <span>انتخاب ماژول‌های آزمون برای این موقعیت شغلی</span>
          </h2>

          <div className="text-xs text-slate-500 font-medium">
            <span>{selectedTestIds.length} ماژول انتخاب شده</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="tabular-nums font-mono">{totalDurationMinutes} دقیقه</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="tabular-nums font-mono">{totalQuestionCount} سوال</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tests.map((test) => {
            const isSelected = selectedTestIds.includes(test.id);

            return (
              <div
                key={test.id}
                onClick={() => toggleTestSelection(test.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 text-right ${
                  isSelected
                    ? 'bg-indigo-50/50 border-indigo-400 shadow-xs'
                    : 'bg-slate-50/50 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'bg-white border-slate-300'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{test.titleFa}</span>
                    <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                      {test.durationMinutes} دقیقه
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {test.descriptionFa}
                  </p>

                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5 pt-1">
                    {test.testType === 'coding' && <Code2 className="w-3 h-3 text-emerald-600" />}
                    {test.testType === 'problem_solving' && <BrainCircuit className="w-3 h-3 text-amber-600" />}
                    {test.testType === 'situational_judgment' && <Compass className="w-3 h-3 text-indigo-600" />}
                    {test.testType === 'personality_culture' && <HeartHandshake className="w-3 h-3 text-pink-600" />}
                    {test.testType === 'role_specific' && <GraduationCap className="w-3 h-3 text-blue-600" />}
                    <span>{test.skillsCovered.slice(0, 2).join(' · ')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 3: Threshold & Link Generation */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">۳</span>
          <span>تنظیم حدنصاب قبولی و لینک دعوت داوطلبان</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-700">
              <span>حدنصاب نمره قبولی (Passing Score):</span>
              <span className="font-bold text-indigo-600 font-mono tabular-nums">{passingScore}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="90"
              step="5"
              value={passingScore}
              onChange={(e) => setPassingScore(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>۵۰٪ (استاندارد پایه)</span>
              <span>۷۵٪ (پیشنهاد هوشمند)</span>
              <span>۹۰٪ (نخبگان ارشد)</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700 block">
              لینک اختصاصی دعوت کاندیداها:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={inviteLink}
                className="w-full py-2 px-3 text-xs rounded-lg border border-slate-200 bg-slate-50 font-mono text-slate-600"
                dir="ltr"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'کپی شد' : 'کپی'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={handleCreatePackage}
            className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors shadow-xs flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>نهایی‌سازی و فعال‌سازی این ارزیابی</span>
          </button>
        </div>
      </div>

    </div>
  );
};
