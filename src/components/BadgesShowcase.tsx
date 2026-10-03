import React, { useState } from 'react';
import { UserBadge, UserGamificationProfile, BadgeTier } from '../types/assessment';
import { 
  Award, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Code2, 
  BrainCircuit, 
  Compass, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Crown, 
  Layers,
  ChevronLeft,
  X,
  Share2
} from 'lucide-react';

interface BadgesShowcaseProps {
  gamification: UserGamificationProfile;
}

export const BadgesShowcase: React.FC<BadgesShowcaseProps> = ({
  gamification
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<UserBadge | null>(null);

  const unlockedCount = gamification.badges.filter(b => b.unlocked).length;
  const totalCount = gamification.badges.length;

  const filteredBadges = gamification.badges.filter(b => {
    if (filter === 'unlocked') return b.unlocked;
    if (filter === 'locked') return !b.unlocked;
    return true;
  });

  const getTierBadgeStyle = (tier: BadgeTier, unlocked: boolean) => {
    if (!unlocked) {
      return {
        bg: 'bg-slate-100 border-slate-200 text-slate-400',
        ring: 'ring-slate-200',
        tag: 'bg-slate-200 text-slate-500'
      };
    }
    switch (tier) {
      case 'platinum':
        return {
          bg: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-purple-200 text-purple-700',
          ring: 'ring-purple-300',
          tag: 'bg-purple-100 text-purple-800'
        };
      case 'gold':
        return {
          bg: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-amber-300 text-amber-700',
          ring: 'ring-amber-300',
          tag: 'bg-amber-100 text-amber-900'
        };
      case 'silver':
        return {
          bg: 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300 text-slate-700',
          ring: 'ring-slate-300',
          tag: 'bg-slate-200 text-slate-700'
        };
      case 'bronze':
        return {
          bg: 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 text-orange-800',
          ring: 'ring-orange-300',
          tag: 'bg-orange-100 text-orange-900'
        };
    }
  };

  const renderBadgeIcon = (iconName: string, className: string = 'w-5 h-5') => {
    switch (iconName) {
      case 'Code2': return <Code2 className={className} />;
      case 'BrainCircuit': return <BrainCircuit className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Crown': return <Crown className={className} />;
      default: return <Award className={className} />;
    }
  };

  // Progress to next level
  const baseLevelXp = (gamification.level - 1) * 600;
  const currentLevelProgress = Math.min(100, Math.round(((gamification.totalXp - baseLevelXp) / (gamification.nextLevelXp - baseLevelXp)) * 100));

  return (
    <div className="space-y-6 text-right">
      
      {/* Gamification Level & Streak Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-indigo-900/40 relative overflow-hidden">
        
        {/* Glow background accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-500/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>سیستم ارتقای شایستگی و مدال‌های افتخار شغلی</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 border border-indigo-400 text-white font-black text-xl flex items-center justify-center font-mono shadow-md">
                {gamification.level}
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {gamification.levelTitle}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-mono tabular-nums pt-0.5">
                  <span className="font-bold text-amber-400">{gamification.totalXp.toLocaleString('fa-IR')} امتیاز تجربه (XP)</span>
                  <span className="text-slate-500">·</span>
                  <span>هدف سطح بعد: {gamification.nextLevelXp.toLocaleString('fa-IR')} XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Gamification Metrics (Streak & Badges Count) */}
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 shrink-0">
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-amber-400">
                <Flame className="w-5 h-5 fill-current animate-pulse" />
                <span className="text-2xl font-black font-mono tabular-nums">{gamification.streakDays}</span>
              </div>
              <span className="text-[11px] text-slate-300 block font-medium">روز استمرار آزمون</span>
            </div>

            <span className="h-8 w-px bg-white/10" aria-hidden="true" />

            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-purple-300">
                <Award className="w-5 h-5" />
                <span className="text-2xl font-black font-mono tabular-nums">{unlockedCount} / {totalCount}</span>
              </div>
              <span className="text-[11px] text-slate-300 block font-medium">مدال‌های کسب‌شده</span>
            </div>
          </div>

        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
            <span>پیشرفت تا سطح {gamification.level + 1}</span>
            <span className="font-mono tabular-nums">{currentLevelProgress}%</span>
          </div>

          <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${currentLevelProgress}%` }}
            />
          </div>
        </div>

      </div>

      {/* Badges Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <span>ویترین نشان‌ها و مدال‌های افتخار شغلی</span>
          </h3>
          <p className="text-xs text-slate-500">
            با استمرار در آزمون‌ها، حل بدون خطای چالش‌ها و تصمیم‌گیری درست در سناریوهای محیط کار، نشان‌های مهارتی رزومه خود را آزاد کنید.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              filter === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            همه مدال‌ها ({totalCount})
          </button>
          <button
            onClick={() => setFilter('unlocked')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1 ${
              filter === 'unlocked' ? 'bg-emerald-600 text-white shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>کسب‌شده ({unlockedCount})</span>
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1 ${
              filter === 'locked' ? 'bg-slate-800 text-white shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>در حال پیشرفت ({totalCount - unlockedCount})</span>
          </button>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map((badge) => {
          const style = getTierBadgeStyle(badge.tier, badge.unlocked);

          return (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-md hover:scale-[1.01] ${
                badge.unlocked ? `${style.bg} shadow-xs` : 'bg-white border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                
                {/* Badge Top Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors shadow-xs ${
                      badge.unlocked ? `${style.bg} border-2 ${style.ring}` : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}>
                      {renderBadgeIcon(badge.iconName, 'w-6 h-6')}
                    </div>

                    <div>
                      <h4 className={`text-sm font-bold leading-tight ${badge.unlocked ? 'text-slate-900' : 'text-slate-700'}`}>
                        {badge.titleFa}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        {badge.titleEn}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${style.tag}`}>
                    {badge.tier === 'platinum' ? 'پلاتینیوم' : badge.tier === 'gold' ? 'طلایی' : badge.tier === 'silver' ? 'نقره‌ای' : 'برنز'}
                  </span>
                </div>

                {/* Badge Description */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {badge.descriptionFa}
                </p>

                {/* Criteria Text */}
                <div className="text-[11px] text-slate-500 bg-black/5 p-2 rounded-lg leading-relaxed">
                  <span className="font-semibold text-slate-700">شرط کسب: </span>
                  {badge.criteriaTextFa}
                </div>
              </div>

              {/* Badge Footer / Unlocked Status */}
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                {badge.unlocked ? (
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>آزاد شده در {badge.unlockedAt || 'امروز'}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 w-full">
                    <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${badge.progressPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono tabular-nums text-slate-500">
                      {badge.progressPercent}%
                    </span>
                  </div>
                )}

                <span className="text-[11px] font-bold font-mono text-amber-600 shrink-0 mr-2">
                  +{badge.xpReward} XP
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Badge Details Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-center space-y-5 text-slate-900 relative">
            
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute left-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center shadow-lg border-2 ${
              selectedBadge.unlocked ? 'bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-950 border-amber-300' : 'bg-slate-100 text-slate-400 border-slate-300'
            }`}>
              {renderBadgeIcon(selectedBadge.iconName, 'w-10 h-10')}
            </div>

            <div className="space-y-1">
              <span className="text-xs text-indigo-600 font-bold tracking-wide block">
                مدال شایستگی {selectedBadge.tier === 'platinum' ? 'پلاتینیوم' : selectedBadge.tier === 'gold' ? 'طلایی' : selectedBadge.tier === 'silver' ? 'نقره‌ای' : 'برنز'}
              </span>
              <h3 className="text-xl font-black text-slate-900">
                {selectedBadge.titleFa}
              </h3>
              <span className="text-xs font-mono text-slate-400 block">
                {selectedBadge.titleEn}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed px-2">
              {selectedBadge.descriptionFa}
            </p>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-right space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">شرط احراز:</span>
                <span className="font-bold text-slate-800">{selectedBadge.criteriaTextFa}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">پاداش امتیاز:</span>
                <span className="font-bold text-amber-600 font-mono">+{selectedBadge.xpReward} XP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">وضعیت فعلی:</span>
                <span className={`font-bold ${selectedBadge.unlocked ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {selectedBadge.unlocked ? `کسب شده در ${selectedBadge.unlockedAt}` : `در حال پیشرفت (${selectedBadge.progressPercent}%)`}
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              {selectedBadge.unlocked && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`من نشان شایستگی «${selectedBadge.titleFa}» را در سامانه تست‌لایف کسب کردم!`);
                    alert('لینک افتخار مدال در کلیپ‌بورد کپی شد.');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>اشتراک‌گذاری در رزومه / لینکدین</span>
                </button>
              )}

              <button
                onClick={() => setSelectedBadge(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                بستن پنجره
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
