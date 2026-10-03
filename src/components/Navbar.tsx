import React from 'react';
import { 
  Award, 
  Code2, 
  BrainCircuit, 
  Users, 
  PlusCircle, 
  CheckCircle2, 
  UserCheck, 
  Trophy, 
  Flame,
  Sparkles
} from 'lucide-react';
import { UserGamificationProfile } from '../types/assessment';

export type ActiveTab = 'library' | 'coding' | 'runner' | 'user-scorecards' | 'badges' | 'candidates' | 'builder';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onQuickStartTest?: () => void;
  userName?: string;
  userScorecardsCount?: number;
  gamificationProfile?: UserGamificationProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onQuickStartTest,
  userName = 'کاربر داوطلب',
  userScorecardsCount = 1,
  gamificationProfile
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('library')}
            className="flex items-center gap-2.5 text-right focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                تست‌لایف
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                پلتفرم سنجش و ارزیابی شایستگی شغلی
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium">
          <button
            onClick={() => setActiveTab('library')}
            className={`transition-colors pb-1 relative ${
              activeTab === 'library'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            بانک آزمون‌های شغلی
          </button>

          <button
            onClick={() => setActiveTab('coding')}
            className={`transition-colors pb-1 relative flex items-center gap-1.5 ${
              activeTab === 'coding'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4 text-emerald-600" />
            شبیه‌ساز کدنویسی
          </button>

          <button
            onClick={() => setActiveTab('runner')}
            className={`transition-colors pb-1 relative flex items-center gap-1.5 ${
              activeTab === 'runner'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BrainCircuit className="w-4 h-4 text-amber-600" />
            محیط آزمون
          </button>

          <button
            onClick={() => setActiveTab('user-scorecards')}
            className={`transition-colors pb-1 relative flex items-center gap-1.5 ${
              activeTab === 'user-scorecards'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4 text-indigo-600" />
            <span>کارنامه من</span>
            {userScorecardsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold font-mono flex items-center justify-center">
                {userScorecardsCount}
              </span>
            )}
          </button>

          {/* Gamification & Honor Badges Link */}
          <button
            onClick={() => setActiveTab('badges')}
            className={`transition-colors pb-1 relative flex items-center gap-1.5 ${
              activeTab === 'badges'
                ? 'text-amber-600 font-semibold border-b-2 border-amber-500'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>مدال‌های افتخار و امتیازات</span>
            {gamificationProfile && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold font-mono">
                <Flame className="w-3 h-3 text-orange-500 fill-current" />
                <span>{gamificationProfile.streakDays}</span>
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('candidates')}
            className={`transition-colors pb-1 relative flex items-center gap-1.5 ${
              activeTab === 'candidates'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-slate-500" />
            <span>سازمان‌ها (HR)</span>
          </button>

          <button
            onClick={() => setActiveTab('builder')}
            className={`transition-colors pb-1 relative flex items-center gap-1.5 ${
              activeTab === 'builder'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-purple-600" />
            پکیج‌ساز
          </button>
        </nav>

        {/* Zone 3: Gamification Pill & Primary CTA */}
        <div className="flex items-center gap-2.5">
          {gamificationProfile && (
            <button
              onClick={() => setActiveTab('badges')}
              className="hidden sm:flex items-center gap-2 p-1.5 px-3 bg-amber-50/70 hover:bg-amber-100/80 rounded-xl border border-amber-200/80 transition-colors text-right"
              title="مشاهده امتیازات و مدال‌های افتخار من"
            >
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{gamificationProfile.totalXp.toLocaleString('fa-IR')} XP</span>
              </div>
              <span className="w-px h-3.5 bg-amber-200 inline-block" />
              <div className="flex items-center gap-1 text-[11px] font-bold text-orange-600">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>{gamificationProfile.streakDays} روز</span>
              </div>
            </button>
          )}

          <button
            onClick={() => setActiveTab('user-scorecards')}
            className="hidden xl:flex items-center gap-2 text-right p-1.5 pr-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            title="مشاهده پروفایل و کارنامه کارجو"
          >
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-slate-800 block truncate max-w-[90px]">{userName}</span>
              <span className="text-[10px] text-emerald-600">کارنامه فعال</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              {userName.slice(0, 1)}
            </div>
          </button>

          <button
            onClick={() => {
              if (onQuickStartTest) onQuickStartTest();
              else setActiveTab('runner');
            }}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors shadow-xs whitespace-nowrap flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ورود به آزمون</span>
          </button>
        </div>

      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-100 py-2.5 px-2 bg-slate-50 text-[11px] overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('library')}
          className={`px-1.5 py-1 rounded whitespace-nowrap ${activeTab === 'library' ? 'font-bold text-indigo-700' : 'text-slate-600'}`}
        >
          بانک آزمون
        </button>
        <button
          onClick={() => setActiveTab('coding')}
          className={`px-1.5 py-1 rounded whitespace-nowrap ${activeTab === 'coding' ? 'font-bold text-indigo-700' : 'text-slate-600'}`}
        >
          کدنویسی
        </button>
        <button
          onClick={() => setActiveTab('runner')}
          className={`px-1.5 py-1 rounded whitespace-nowrap ${activeTab === 'runner' ? 'font-bold text-indigo-700' : 'text-slate-600'}`}
        >
          آزمون
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`px-1.5 py-1 rounded whitespace-nowrap flex items-center gap-0.5 ${activeTab === 'badges' ? 'font-bold text-amber-700 bg-amber-50' : 'text-slate-600'}`}
        >
          <Trophy className="w-3 h-3 text-amber-500" />
          <span>مدال‌ها</span>
        </button>
        <button
          onClick={() => setActiveTab('user-scorecards')}
          className={`px-1.5 py-1 rounded whitespace-nowrap ${activeTab === 'user-scorecards' ? 'font-bold text-indigo-700' : 'text-slate-600'}`}
        >
          کارنامه من
        </button>
        <button
          onClick={() => setActiveTab('candidates')}
          className={`px-1.5 py-1 rounded whitespace-nowrap ${activeTab === 'candidates' ? 'font-bold text-indigo-700' : 'text-slate-600'}`}
        >
          پنل HR
        </button>
      </div>
    </header>
  );
};

