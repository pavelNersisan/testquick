import React, { useState } from 'react';
import { CandidateResult, AssessmentTest, UserGamificationProfile } from '../types/assessment';
import { 
  User, 
  Award, 
  CheckCircle2, 
  Clock, 
  ChevronLeft, 
  Play, 
  FileCheck, 
  Printer, 
  Download, 
  Edit3, 
  Save, 
  ShieldCheck,
  TrendingUp,
  BrainCircuit,
  Trophy,
  Flame,
  Sparkles
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  position: string;
  phone: string;
}

interface UserScorecardViewProps {
  currentUser: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  userResults: CandidateResult[];
  onViewDetailedResult: (result: CandidateResult) => void;
  onStartNewTest: (test?: AssessmentTest) => void;
  availableTests: AssessmentTest[];
  gamificationProfile?: UserGamificationProfile;
  onOpenBadges?: () => void;
}

export const UserScorecardView: React.FC<UserScorecardViewProps> = ({
  currentUser,
  onUpdateUser,
  userResults,
  onViewDetailedResult,
  onStartNewTest,
  availableTests,
  gamificationProfile,
  onOpenBadges
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState(currentUser.name);
  const [editedEmail, setEditedEmail] = useState(currentUser.email);
  const [editedPosition, setEditedPosition] = useState(currentUser.position);
  const [editedPhone, setEditedPhone] = useState(currentUser.phone);

  const [selectedCertificateResult, setSelectedCertificateResult] = useState<CandidateResult | null>(null);

  const handleSaveProfile = () => {
    onUpdateUser({
      name: editedName,
      email: editedEmail,
      position: editedPosition,
      phone: editedPhone
    });
    setIsEditingProfile(false);
  };

  const averageScore = userResults.length > 0
    ? Math.round(userResults.reduce((acc, r) => acc + r.overallScore, 0) / userResults.length)
    : 0;

  const passedTestsCount = userResults.filter(r => r.overallScore >= 70).length;

  return (
    <div className="space-y-8 text-right pb-16">
      
      {/* User Header Profile Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-100">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
              {currentUser.name ? currentUser.name.slice(0, 1) : 'ک'}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>پروفایل کارجوی تایید شده</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {currentUser.position}
              </p>

              <div className="flex items-center gap-3 text-xs text-slate-400 pt-0.5">
                <span>{currentUser.email}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{currentUser.phone}</span>
              </div>
            </div>
          </div>

          {/* Edit Profile Action */}
          <div className="flex items-center gap-2">
            {!isEditingProfile ? (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>ویرایش اطلاعات من</span>
              </button>
            ) : (
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>ذخیره تغییرات</span>
              </button>
            )}

            <button
              onClick={() => onStartNewTest()}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>شرکت در آزمون جدید</span>
            </button>
          </div>

        </div>

        {/* Editable Form Modal or Inline Expansion */}
        {isEditingProfile && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-800">
              ویرایش اطلاعات داوطلب برای درج در کارنامه‌ها و گواهی‌نامه‌های استخدامی
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600">نام و نام خانوادگی:</label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-right"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600">ایمیل کاری:</label>
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-right"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600">عنوان موقعیت شغلی:</label>
                <input
                  type="text"
                  value={editedPosition}
                  onChange={(e) => setEditedPosition(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-right"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600">شماره تماس:</label>
                <input
                  type="text"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-right"
                />
              </div>
            </div>
          </div>
        )}

        {/* User Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
            <span className="text-xs text-slate-500 font-medium">آزمون‌های انجام‌شده</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {userResults.length}
            </div>
            <span className="text-[10px] text-slate-400">سنجش شایستگی ثبت‌شده</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
            <span className="text-xs text-slate-500 font-medium">میانگین امتیاز کل</span>
            <div className="text-2xl font-extrabold text-indigo-600 font-mono tabular-nums">
              {averageScore}%
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">بالاتر از ۷۸٪ میانگین صنعت</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
            <span className="text-xs text-slate-500 font-medium">آزمون‌های با نمره قبولی</span>
            <div className="text-2xl font-extrabold text-emerald-600 font-mono tabular-nums">
              {passedTestsCount}
            </div>
            <span className="text-[10px] text-slate-400">کسب حدنصاب بالای ۷۰٪</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
            <span className="text-xs text-slate-500 font-medium">سطح احراز شایستگی</span>
            <div className="text-base font-bold text-slate-800">
              {averageScore >= 85 ? 'نخبه (Top 10%)' : averageScore >= 70 ? 'شایستگی تأیید شده' : 'نیازمند تمرین'}
            </div>
            <span className="text-[10px] text-slate-400">ماتریس مهارت‌های شغلی</span>
          </div>
        </div>

        {/* Gamification Streak & Badges Highlights Banner */}
        {gamificationProfile && (
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-indigo-500/10 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900 text-sm">وضعیت امتیازات و استمرار کارجو:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>سطح {gamificationProfile.level}: {gamificationProfile.levelTitle}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
                  <span className="font-mono text-amber-700 font-bold">{gamificationProfile.totalXp.toLocaleString('fa-IR')} XP</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-orange-600 font-bold font-mono">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    {gamificationProfile.streakDays} روز استمرار پیوسته
                  </span>
                  <span>·</span>
                  <span>{gamificationProfile.badges.filter(b => b.unlocked).length} مدال افتخار کسب‌شده</span>
                </div>
              </div>
            </div>

            {onOpenBadges && (
              <button
                onClick={onOpenBadges}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-xs hover:scale-[1.02]"
              >
                <Trophy className="w-4 h-4" />
                <span>مشاهده ویترین مدال‌های افتخار</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>

      {/* User's Test History Scorecards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-indigo-600" />
            <span>سوابق و کارنامه‌های آزمون‌های من ({userResults.length} آزمون)</span>
          </h2>
          <span className="text-xs text-slate-500">
            برای مشاهده جزئیات تحلیل مهارت‌ها و دریافت گواهی روی هر آزمون کلیک کنید
          </span>
        </div>

        {userResults.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
            <Award className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">هنوز در آزمونی شرکت نکرده‌اید</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              با شرکت در آزمون‌های تخصصی برنامه‌نویسی، حل مسئله و ارزیابی رفتاری، کارنامه رسمی استخدامی و گواهی مهارت دریافت کنید.
            </p>
            <button
              onClick={() => onStartNewTest(availableTests[0])}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
            >
              شروع اولین آزمون ارزیابی
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userResults.map((res) => (
              <div
                key={res.id}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4 text-right"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-indigo-600 font-medium">{res.testTitle}</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                      res.status === 'recommended' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      res.status === 'review' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {res.statusLabel}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                        {res.overallScore}%
                      </span>
                      <span className="text-xs text-slate-400 mr-1.5">نمره کسب‌شده</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{res.timeSpentMinutes} دقیقه</span>
                    </div>
                  </div>

                  {/* 4 Pillars Mini Progress */}
                  <div className="grid grid-cols-4 gap-1.5 pt-2 text-[10px] text-center text-slate-600">
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="block text-slate-400">فنی</span>
                      <strong className="font-bold font-mono">{res.scoreBreakdown.technicalOrRoleScore}%</strong>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="block text-slate-400">حل مسئله</span>
                      <strong className="font-bold font-mono">{res.scoreBreakdown.problemSolvingScore}%</strong>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="block text-slate-400">SJT</span>
                      <strong className="font-bold font-mono">{res.scoreBreakdown.situationalJudgmentScore}%</strong>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="block text-slate-400">فرهنگ</span>
                      <strong className="font-bold font-mono">{res.scoreBreakdown.personalityFitScore}%</strong>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedCertificateResult(res)}
                    className="text-xs font-semibold text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 hover:underline"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>مشاهده گواهی مهارت</span>
                  </button>

                  <button
                    onClick={() => onViewDetailedResult(res)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <span>مشاهده کارنامه کامل</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Official Skill Certificate Modal */}
      {selectedCertificateResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border-4 border-amber-300 max-w-2xl w-full p-8 text-center space-y-6 relative overflow-hidden text-slate-900">
            
            {/* Background guilloche subtle pattern */}
            <div className="absolute inset-0 bg-radial from-amber-500/5 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between border-b border-amber-200 pb-4">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <Award className="w-5 h-5 text-amber-500" />
                <span>سامانه ملی ارزیابی شایستگی شغلی تست‌لایف</span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                کد گواهی: TL-CERT-{selectedCertificateResult.id.toUpperCase().slice(0, 10)}
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-amber-700 tracking-wider">
                گواهی‌نامه رسمی احراز شایستگی و مهارت شغلی
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {currentUser.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                بدین‌وسیله گواهی می‌شود نامبرده در آزمون ارزیابی شایستگی‌های تخصصی، حل مسئله و رفتار سازمانی عنوان 
                <strong className="text-indigo-700 mx-1">«{selectedCertificateResult.testTitle}»</strong> 
                شرکت نموده و با کسب نمره شایستگی 
                <strong className="text-emerald-700 font-mono mx-1">{selectedCertificateResult.overallScore} از ۱۰۰</strong> 
                موفق به اخذ این تاییدیه مهارتی گردیده است.
              </p>
            </div>

            {/* Score & Stamp Seal */}
            <div className="flex items-center justify-around py-4 bg-amber-50/60 rounded-xl border border-amber-200 max-w-md mx-auto">
              <div>
                <span className="text-[11px] text-slate-500 block">نمره ارزیابی</span>
                <span className="text-2xl font-bold font-mono text-indigo-700">{selectedCertificateResult.overallScore}%</span>
              </div>
              <div className="w-px h-8 bg-amber-200" />
              <div>
                <span className="text-[11px] text-slate-500 block">وضعیت شایستگی</span>
                <span className="text-xs font-bold text-emerald-700">{selectedCertificateResult.statusLabel.split(' ')[0]}</span>
              </div>
              <div className="w-px h-8 bg-amber-200" />
              <div>
                <span className="text-[11px] text-slate-500 block">تاریخ صدور</span>
                <span className="text-xs font-mono text-slate-700">{selectedCertificateResult.submittedAt.split('-')[0]}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>چاپ گواهی (PDF)</span>
              </button>

              <button
                onClick={() => setSelectedCertificateResult(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                بستن
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
