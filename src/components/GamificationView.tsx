import React, { useState } from 'react';
import { 
  UserGamificationProfile, 
  UserBadge, 
  BadgeTier, 
  BadgeCategoryTag,
  AssessmentTest 
} from '../types/assessment';
import { 
  Flame, 
  Trophy, 
  Award, 
  Crown, 
  Zap, 
  ShieldCheck, 
  BrainCircuit, 
  Code2, 
  Compass, 
  Globe, 
  Layers, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  Share2, 
  Download, 
  Play, 
  Shield, 
  X,
  Printer,
  ChevronLeft,
  Star
} from 'lucide-react';

interface GamificationViewProps {
  profile: UserGamificationProfile;
  userName: string;
  userPosition: string;
  onStartTest: (test: AssessmentTest) => void;
  availableTests: AssessmentTest[];
  onDailyCheckIn: () => void;
}

export const GamificationView: React.FC<GamificationViewProps> = ({
  profile,
  userName,
  userPosition,
  onStartTest,
  availableTests,
  onDailyCheckIn
}) => {
  const [selectedTier, setSelectedTier] = useState<BadgeTier | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<BadgeCategoryTag | 'all'>('all');
  const [filterUnlockedOnly, setFilterUnlockedOnly] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [inspectingBadge, setInspectingBadge] = useState<UserBadge | null>(null);
  const [checkedInToday, setCheckedInToday] = useState(false);

  // Icon mapping
  const renderBadgeIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Flame': return <Flame className={className} />;
      case 'Code2': return <Code2 className={className} />;
      case 'BrainCircuit': return <BrainCircuit className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'Crown': return <Crown className={className} />;
      case 'Trophy': return <Trophy className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      default: return <Award className={className} />;
    }
  };

  const getTierStyles = (tier: BadgeTier) => {
    switch (tier) {
      case 'platinum':
        return {
          border: 'border-cyan-200 hover:border-cyan-400',
          badgeBg: 'bg-gradient-to-br from-cyan-500 to-indigo-600 text-white shadow-cyan-200',
          tierLabel: 'پلاتینیوم',
          tierColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
          cardGlow: 'from-cyan-50/50 to-indigo-50/40'
        };
      case 'gold':
        return {
          border: 'border-amber-200 hover:border-amber-400',
          badgeBg: 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-amber-200',
          tierLabel: 'طلایی',
          tierColor: 'bg-amber-50 text-amber-700 border-amber-200',
          cardGlow: 'from-amber-50/50 to-orange-50/40'
        };
      case 'silver':
        return {
          border: 'border-slate-300 hover:border-slate-400',
          badgeBg: 'bg-gradient-to-br from-slate-400 to-slate-600 text-white shadow-slate-200',
          tierLabel: 'نقره‌ای',
          tierColor: 'bg-slate-100 text-slate-700 border-slate-200',
          cardGlow: 'from-slate-50/50 to-slate-100/40'
        };
      case 'bronze':
        return {
          border: 'border-amber-700/20 hover:border-amber-700/40',
          badgeBg: 'bg-gradient-to-br from-amber-700 to-orange-900 text-white shadow-orange-200',
          tierLabel: 'برنزی',
          tierColor: 'bg-orange-50 text-orange-800 border-orange-200',
          cardGlow: 'from-orange-50/40 to-amber-50/30'
        };
    }
  };

  // Filtered badges
  const filteredBadges = profile.badges.filter(b => {
    const matchesTier = selectedTier === 'all' || b.tier === selectedTier;
    const matchesTag = selectedTag === 'all' || b.categoryTag === selectedTag;
    const matchesUnlocked = 
      filterUnlockedOnly === 'all' ? true :
      filterUnlockedOnly === 'unlocked' ? b.unlocked :
      !b.unlocked;

    return matchesTier && matchesTag && matchesUnlocked;
  });

  const unlockedCount = profile.badges.filter(b => b.unlocked).length;
  const currentLevelProgress = Math.min(
    100, 
    Math.round(((profile.totalXp) / profile.nextLevelXp) * 100)
  );

  const daysOfWeek = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
  const weeklyData = profile.weeklyActivity || [true, true, true, true, true, false, false];

  const handleCheckInClick = () => {
    if (!checkedInToday) {
      setCheckedInToday(true);
      onDailyCheckIn();
    }
  };

  // Pick a recommended test
  const recommendedTest = availableTests[2] || availableTests[0];

  return (
    <div className="space-y-8 text-right pb-16">
      
      {/* 1. HERO GAMIFICATION PROFILE BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-indigo-900/50">
        
        {/* Subtle background flare */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-indigo-800/40">
            
            {/* User Level & Avatar Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 p-0.5 shadow-lg">
                  <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center text-amber-400 font-extrabold text-2xl">
                    <Crown className="w-9 h-9" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -left-1 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs shadow-md">
                  سطح {profile.level}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {userName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{profile.levelTitle}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400">
                  {userPosition} · پلتفرم ارزیابی و استمرار مهارت شغلی
                </p>

                {/* Consecutive Streak Pill */}
                <div className="flex items-center gap-2 pt-1 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/40 text-amber-300 font-semibold shadow-xs">
                    <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
                    <span>استمرار متوالی: {profile.streakDays} روز پیوسته</span>
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    (ضریب امتیاز: +۲۵٪ فعال)
                  </span>
                </div>
              </div>
            </div>

            {/* Daily Check-In & Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleCheckInClick}
                disabled={checkedInToday}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                  checkedInToday 
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 hover:scale-[1.02]'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>
                  {checkedInToday ? 'حضور امروز ثبت و استریک تمدید شد' : 'ثبت استمرار و حضور روزانه (+۵۰ XP)'}
                </span>
              </button>

              <button
                onClick={() => onStartTest(recommendedTest)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>شروع چالش تقویت استمرار</span>
              </button>
            </div>

          </div>

          {/* XP Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200">پیشرفت تا ارتقا به سطح {profile.level + 1}:</span>
                <span className="text-amber-400 font-mono font-bold">{profile.totalXp.toLocaleString('fa-IR')} XP</span>
                <span className="text-slate-500">از {profile.nextLevelXp.toLocaleString('fa-IR')} XP</span>
              </div>
              <span className="text-indigo-300 font-mono font-bold">{currentLevelProgress}%</span>
            </div>

            <div className="w-full h-3 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-indigo-900/60">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 transition-all duration-700 shadow-sm"
                style={{ width: `${currentLevelProgress}%` }}
              />
            </div>
          </div>

          {/* 4 Quick Stat Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>مجموع امتیاز تجربه (XP)</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono">
                {profile.totalXp.toLocaleString('fa-IR')}
              </div>
              <span className="text-[10px] text-slate-400 block">+۲۵۰ XP در آخرین آزمون</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>مدال‌های افتخار کسب‌شده</span>
                <Award className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                {unlockedCount} <span className="text-xs font-normal text-slate-400">از {profile.badges.length}</span>
              </div>
              <span className="text-[10px] text-indigo-300 block">{Math.round((unlockedCount / profile.badges.length) * 100)}% تکمیل کل مدال‌ها</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>زنجیره پیوسته روزانه</span>
                <Flame className="w-3.5 h-3.5 text-orange-400" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-orange-400 font-mono">
                {profile.streakDays} روز
              </div>
              <span className="text-[10px] text-slate-400 block">بدون قطعی و انقطاع</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>رتبه در باشگاه استعدادها</span>
                <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">
                رتبه ۴
              </div>
              <span className="text-[10px] text-slate-400 block">در میان ۳۴۰ داوطلب ارشد</span>
            </div>

          </div>

        </div>
      </div>

      {/* 2. CONTINUITY & STREAK WEEKLY MATRIX */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span>تقویم استمرار و فعالیت هفتگی (Habit & Learning Streak)</span>
            </h2>
            <p className="text-xs text-slate-500 pt-0.5">
              شرکت مستمر در آزمون‌های ارزیابی، تسلط بر سناریوهای شغلی و حل مسئله را تثبیت می‌کند.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
              <span>روز با آزمون / تمرین</span>
            </span>
            <span className="flex items-center gap-1 mr-3">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200 inline-block" />
              <span>آماده ثبت</span>
            </span>
          </div>
        </div>

        {/* 7 Day Grid */}
        <div className="grid grid-cols-7 gap-2 pt-2">
          {daysOfWeek.map((dayName, idx) => {
            const isActive = weeklyData[idx];
            return (
              <div 
                key={dayName}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  isActive 
                    ? 'bg-orange-50/80 border-orange-200 text-orange-950 font-semibold' 
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <span className="text-[11px] block">{dayName}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-orange-500 text-white shadow-xs' : 'bg-slate-200 text-slate-400'
                }`}>
                  {isActive ? <Flame className="w-4 h-4 fill-current" /> : <CheckCircle2 className="w-4 h-4" />}
                </div>
                <span className="text-[10px] font-mono">
                  {isActive ? '+۱۲۰ XP' : 'آزاد'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Streak Tip Banner */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex items-center gap-3 text-xs text-amber-900">
          <Star className="w-5 h-5 text-amber-600 shrink-0 fill-current" />
          <div className="leading-relaxed">
            <strong>نکته کلیدی ارتقای شایستگی:</strong> داوطلبانی که حداقل ۳ روز در هفته به حل چالش‌های ارزیابی شغلی می‌پردازند، در مصاحبه‌های استخدامی شرکت‌های برتر تا ۶۸٪ نمره بالاتری در حل مسئله و قضاوت موقعیتی کسب می‌کنند.
          </div>
        </div>
      </div>

      {/* 3. HONOR BADGES SECTION */}
      <div className="space-y-5">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>ویترین مدال‌های افتخار شغلی (Honor Badges & Achievements)</span>
            </h2>
            <p className="text-xs text-slate-500 pt-0.5">
              با شرکت در آزمون‌های تخصصی، کدنویسی، حل مسئله و استمرار، مدال‌های رتبه‌بندی را آزاد کنید.
            </p>
          </div>

          {/* Status Toggle */}
          <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs font-semibold">
            <button
              onClick={() => setFilterUnlockedOnly('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterUnlockedOnly === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              همه مدال‌ها ({profile.badges.length})
            </button>
            <button
              onClick={() => setFilterUnlockedOnly('unlocked')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterUnlockedOnly === 'unlocked' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              کسب‌شده ({unlockedCount})
            </button>
            <button
              onClick={() => setFilterUnlockedOnly('locked')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterUnlockedOnly === 'locked' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              در دست اقدام ({profile.badges.length - unlockedCount})
            </button>
          </div>
        </div>

        {/* Filter Pills (Category Tags & Tiers) */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          
          <span className="text-slate-400 font-medium ml-1">دسته‌بندی مدال:</span>
          
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              selectedTag === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            همه
          </button>

          <button
            onClick={() => setSelectedTag('streak')}
            className={`px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1 ${
              selectedTag === 'streak' 
                ? 'bg-orange-600 text-white' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>استمرار و پشتکار</span>
          </button>

          <button
            onClick={() => setSelectedTag('technical')}
            className={`px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1 ${
              selectedTag === 'technical' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-500" />
            <span>فنی و حل مسئله</span>
          </button>

          <button
            onClick={() => setSelectedTag('behavioral')}
            className={`px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1 ${
              selectedTag === 'behavioral' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-emerald-500" />
            <span>اخلاق و قضاوت موقعیتی</span>
          </button>

          <button
            onClick={() => setSelectedTag('achievement')}
            className={`px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1 ${
              selectedTag === 'achievement' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-purple-500" />
            <span>نخبگی و رکوردهای کلیدی</span>
          </button>

        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {filteredBadges.map((badge) => {
            const styles = getTierStyles(badge.tier);

            return (
              <div
                key={badge.id}
                onClick={() => setInspectingBadge(badge)}
                className={`group bg-white rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md relative overflow-hidden ${
                  badge.unlocked ? styles.border : 'border-slate-200 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Background subtle glow */}
                {badge.unlocked && (
                  <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${styles.cardGlow} blur-xl pointer-events-none`} />
                )}

                <div className="space-y-3 relative z-10">
                  
                  {/* Top row: Tier and Status */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${styles.tierColor}`}>
                      مدال {styles.tierLabel}
                    </span>

                    {badge.unlocked ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>آزاد شده</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                        <Lock className="w-3.5 h-3.5" />
                        <span>قفل شده ({badge.progressPercent}%)</span>
                      </span>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 pt-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105 ${
                      badge.unlocked ? styles.badgeBg : 'bg-slate-200 text-slate-400'
                    }`}>
                      {renderBadgeIcon(badge.iconName)}
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {badge.titleFa}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {badge.titleEn}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {badge.descriptionFa}
                  </p>

                  {/* Criteria Box */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">شرط احراز:</span>
                    <div>{badge.criteriaTextFa}</div>
                  </div>

                </div>

                {/* Bottom Row: Progress & Reward */}
                <div className="space-y-2 pt-2 border-t border-slate-100 relative z-10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">
                      {badge.unlocked ? `تاریخ کسب: ${badge.unlockedAt || 'امروز'}` : `پیشرفت: ${badge.progressPercent}%`}
                    </span>
                    <span className="font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                      +{badge.xpReward} XP
                    </span>
                  </div>

                  {!badge.unlocked && (
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${badge.progressPercent}%` }}
                      />
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* 4. LEADERBOARD PREVIEW (جدول برترین داوطلبان مستمر) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              <span>جدول رتبه‌بندی نخبگان و پویندگان مستمر شایستگی (Leaderboard)</span>
            </h2>
            <p className="text-xs text-slate-500 pt-0.5">
              رتبه‌بندی هفتگی بر اساس مجموع امتیاز XP، استمرار متوالی و تعداد مدال‌های احراز شده
            </p>
          </div>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
            به‌روزرسانی زنده
          </span>
        </div>

        <div className="divide-y divide-slate-100 overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100">
                <th className="py-3 px-3 font-semibold">رتبه</th>
                <th className="py-3 px-3 font-semibold">نام داوطلب</th>
                <th className="py-3 px-3 font-semibold">سطح و عنوان</th>
                <th className="py-3 px-3 font-semibold">استمرار متوالی</th>
                <th className="py-3 px-3 font-semibold">مدال‌ها</th>
                <th className="py-3 px-3 font-semibold">امتیاز کل (XP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700">
              
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-3 font-extrabold text-amber-500 flex items-center gap-1">
                  <Crown className="w-4 h-4 fill-current" />
                  <span>۱</span>
                </td>
                <td className="py-3 px-3 font-bold text-slate-900">مهدی کریمی</td>
                <td className="py-3 px-3">سطح ۶ · معمار طلایی مهارت‌ها</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    ۱۴ روز
                  </span>
                </td>
                <td className="py-3 px-3 font-mono font-bold">۱۲ مدال</td>
                <td className="py-3 px-3 font-mono font-extrabold text-indigo-600">۵,۸۴۰ XP</td>
              </tr>

              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-500">۲</td>
                <td className="py-3 px-3 font-bold text-slate-900">سارا رادفر</td>
                <td className="py-3 px-3">سطح ۵ · تحلیل‌گر ارشد شایستگی‌ها</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    ۹ روز
                  </span>
                </td>
                <td className="py-3 px-3 font-mono font-bold">۱۰ مدال</td>
                <td className="py-3 px-3 font-mono font-extrabold text-indigo-600">۴,۲۰۰ XP</td>
              </tr>

              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-3 font-bold text-amber-700">۳</td>
                <td className="py-3 px-3 font-bold text-slate-900">نوید فراهانی</td>
                <td className="py-3 px-3">سطح ۵ · تحلیل‌گر ارشد شایستگی‌ها</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    ۸ روز
                  </span>
                </td>
                <td className="py-3 px-3 font-mono font-bold">۹ مدال</td>
                <td className="py-3 px-3 font-mono font-extrabold text-indigo-600">۳,۷۵۰ XP</td>
              </tr>

              {/* Current User Row - Highlighted */}
              <tr className="bg-indigo-50/70 border-y-2 border-indigo-200 font-semibold">
                <td className="py-3 px-3 font-extrabold text-indigo-700 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>۴</span>
                </td>
                <td className="py-3 px-3 font-extrabold text-indigo-950 flex items-center gap-1.5">
                  <span>{userName} (شما)</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                </td>
                <td className="py-3 px-3 text-indigo-900 font-medium">سطح {profile.level} · {profile.levelTitle}</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 font-mono font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    {profile.streakDays} روز
                  </span>
                </td>
                <td className="py-3 px-3 font-mono font-bold text-indigo-900">{unlockedCount} مدال</td>
                <td className="py-3 px-3 font-mono font-black text-indigo-700 text-sm">{profile.totalXp.toLocaleString('fa-IR')} XP</td>
              </tr>

              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-400">۵</td>
                <td className="py-3 px-3 font-bold text-slate-900">فاطمه یزدانی</td>
                <td className="py-3 px-3">سطح ۴ · راهبر ارشد مهارتی</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    ۵ روز
                  </span>
                </td>
                <td className="py-3 px-3 font-mono font-bold">۷ مدال</td>
                <td className="py-3 px-3 font-mono font-extrabold text-indigo-600">۲,۱۹۰ XP</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* 5. MODAL: BADGE CERTIFICATE & SHOWCASE */}
      {inspectingBadge && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative text-right">
            
            <button
              onClick={() => setInspectingBadge(null)}
              className="absolute left-5 top-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Header Stamp */}
            <div className="text-center space-y-3 pt-2">
              <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center shadow-lg ${
                inspectingBadge.unlocked 
                  ? getTierStyles(inspectingBadge.tier).badgeBg 
                  : 'bg-slate-200 text-slate-400'
              }`}>
                {renderBadgeIcon(inspectingBadge.iconName, "w-10 h-10")}
              </div>

              <div className="space-y-1">
                <span className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${getTierStyles(inspectingBadge.tier).tierColor}`}>
                  نشان افتخار رسمی {getTierStyles(inspectingBadge.tier).tierLabel}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 pt-1">
                  {inspectingBadge.titleFa}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {inspectingBadge.titleEn}
                </p>
              </div>
            </div>

            {/* Description & Criteria */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div>
                <strong className="text-slate-700 block mb-1">شرح مدال:</strong>
                <p className="text-slate-600 leading-relaxed">{inspectingBadge.descriptionFa}</p>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <strong className="text-slate-700 block mb-1">شرط احراز و استمرار:</strong>
                <p className="text-slate-600">{inspectingBadge.criteriaTextFa}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs font-medium">
                <span className="text-slate-500">پاداش تجربه:</span>
                <span className="font-mono font-bold text-amber-600">+{inspectingBadge.xpReward} XP</span>
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              {inspectingBadge.unlocked ? (
                <>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>چاپ گواهی مدال</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      alert('لینک نشان افتخار در کلیپ‌بورد کپی شد!');
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>اشتراک در لینکدین</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setInspectingBadge(null);
                    onStartTest(recommendedTest);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>شروع آزمون مرتبط برای کسب این نشان</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
