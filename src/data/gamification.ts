import { UserBadge, UserGamificationProfile, CandidateResult } from '../types/assessment';

export const INITIAL_BADGES: UserBadge[] = [
  // 1. STREAKS & CONTINUOUS PARTICIPATION (مدال‌های استمرار و پشتکار مداوم)
  {
    id: 'badge-streak-3',
    titleFa: 'مشعل استمرار ۳ روزه',
    titleEn: '3-Day Consistency Flame',
    descriptionFa: 'شرکت مستمر در آزمون‌های ارزیابی و تقویت مهارت در ۳ روز متوالی بدون وقفه.',
    iconName: 'Flame',
    tier: 'bronze',
    unlocked: true,
    unlockedAt: '۱۴۰۳/۰۷/۰۸',
    progressPercent: 100,
    criteriaTextFa: 'ثبت استمرار حداقل ۳ روز متوالی در انجام آزمون‌ها',
    xpReward: 150,
    categoryTag: 'streak'
  },
  {
    id: 'badge-streak-7',
    titleFa: 'آتش پیوسته هفتگی',
    titleEn: '7-Day Weekly Dynamo',
    descriptionFa: 'حفظ استمرار یادگیری و شرکت در آزمون‌ها در تمام ۷ روز هفته. نشان تعهد بی‌نظیر.',
    iconName: 'Zap',
    tier: 'gold',
    unlocked: true,
    unlockedAt: '۱۴۰۳/۰۷/۱۰',
    progressPercent: 100,
    criteriaTextFa: 'تکمیل آزمون یا تمرین در ۷ روز متوالی',
    xpReward: 350,
    categoryTag: 'streak'
  },
  {
    id: 'badge-streak-14',
    titleFa: 'اراده پولادین دو هفته‌ای',
    titleEn: '14-Day Iron Will',
    descriptionFa: 'تداوم یادگیری مداوم و حضور در آزمون‌ها برای ۲ هفته پیوسته. ایجاد عادت موفقیت شغلی.',
    iconName: 'Shield',
    tier: 'platinum',
    unlocked: false,
    progressPercent: 71,
    criteriaTextFa: 'استمرار ۱۴ روزه در سنجش شایستگی (۱۰ از ۱۴ روز)',
    xpReward: 600,
    categoryTag: 'streak'
  },
  {
    id: 'badge-weekly-dedication',
    titleFa: 'داوطلب خستگی‌ناپذیر',
    titleEn: 'Weekly Dedication Master',
    descriptionFa: 'تکمیل حداقل ۵ آزمون تخصصی در طول یک هفته کاری با کسب حداقل نمره قبولی.',
    iconName: 'TrendingUp',
    tier: 'silver',
    unlocked: true,
    unlockedAt: '۱۴۰۳/۰۷/۰۹',
    progressPercent: 100,
    criteriaTextFa: 'انجام ۵ آزمون موفق در یک بازه هفتگی',
    xpReward: 220,
    categoryTag: 'streak'
  },

  // 2. TECHNICAL & PROBLEM SOLVING (مهارت‌های تخصصی و حل مسئله)
  {
    id: 'badge-golden-coder',
    titleFa: 'استاد کدنویسی طلایی',
    titleEn: 'Golden Code Master',
    descriptionFa: 'پاس کردن تمام تست‌کیس‌های یک چالش الگوریتمی با صحت ۱۰۰٪، عملکرد بهینه و بدون باگ.',
    iconName: 'Code2',
    tier: 'gold',
    unlocked: true,
    unlockedAt: '۱۴۰۳/۰۷/۱۰',
    progressPercent: 100,
    criteriaTextFa: 'حل چالش برنامه‌نویسی با موفقیت کامل در تست‌کیس‌ها',
    xpReward: 250,
    categoryTag: 'technical'
  },
  {
    id: 'badge-strategic-thinker',
    titleFa: 'استراتژیست حل مسئله مکنزی',
    titleEn: 'Strategic Problem Solver',
    descriptionFa: 'کسب نمره بالای ۹۰٪ در آزمون‌های تحلیلی مکنزی PST و تصمیم‌گیری استراتژیک.',
    iconName: 'BrainCircuit',
    tier: 'gold',
    unlocked: true,
    unlockedAt: '۱۴۰۳/۰۷/۰۹',
    progressPercent: 100,
    criteriaTextFa: 'کسب نمره حداقل ۹۰٪ در آزمون‌های حل مسئله و استدلال تحلیلی',
    xpReward: 200,
    categoryTag: 'technical'
  },
  {
    id: 'badge-speed-demon',
    titleFa: 'رکورددار سرعت و دقت',
    titleEn: 'Speed & Precision Demon',
    descriptionFa: 'اتمام موفق آزمون در کمتر از ۵۰٪ زمان مجاز استاندارد با کسب نمره بالای ۸۵٪.',
    iconName: 'Zap',
    tier: 'bronze',
    unlocked: false,
    progressPercent: 85,
    criteriaTextFa: 'تحویل آزمون در نصف زمان قانونی با نمره قبولی عالی',
    xpReward: 120,
    categoryTag: 'technical'
  },

  // 3. BEHAVIORAL & SITUATIONAL (قضاوت موقعیتی و رفتار سازمانی)
  {
    id: 'badge-workplace-diplomat',
    titleFa: 'دیپلمات سازمان و حل تعارض (SJT)',
    titleEn: 'Workplace Diplomat',
    descriptionFa: 'اتخاذ موثرترین راهکار در تمام سناریوهای قضاوت موقعیتی کاری بر اساس متدولوژی SHL.',
    iconName: 'Compass',
    tier: 'silver',
    unlocked: true,
    unlockedAt: '۱۴۰۳/۰۷/۰۸',
    progressPercent: 100,
    criteriaTextFa: 'کسب نمره بالای ۸۵٪ در ماژول قضاوت موقعیتی (SJT)',
    xpReward: 180,
    categoryTag: 'behavioral'
  },
  {
    id: 'badge-high-conscientiousness',
    titleFa: 'تعهد مثال‌زدنی به اخلاق حرفه‌ای',
    titleEn: 'High Conscientiousness',
    descriptionFa: 'کسب نمره بالای ۹۵٪ در سنجش وجدان کاری، توجه به جزئیات، شفافیت و مسئولیت‌پذیری.',
    iconName: 'ShieldCheck',
    tier: 'silver',
    unlocked: true,
    unlockedAt: '۱۴۰۳/۰۷/۰۷',
    progressPercent: 100,
    criteriaTextFa: 'امتیاز کامل در سوالات رفتار سازمانی و وجدان شغلی',
    xpReward: 180,
    categoryTag: 'behavioral'
  },

  // 4. ACHIEVEMENTS & MILESTONES (دستاوردهای بزرگ و نخبگی)
  {
    id: 'badge-polymath',
    titleFa: 'متخصص چندوجهی (پلی‌مث)',
    titleEn: 'Multidisciplinary Polymath',
    descriptionFa: 'کسب کارنامه موفق در آزمون‌های حداقل ۴ صنعت مختلف از ۱۷ صنعت مادر پلتفرم.',
    iconName: 'Layers',
    tier: 'gold',
    unlocked: false,
    progressPercent: 75,
    criteriaTextFa: 'گذراندن آزمون در ۴ صنعت مختلف (۳ از ۴ تکمیل شده)',
    xpReward: 300,
    categoryTag: 'achievement'
  },
  {
    id: 'badge-global-standards',
    titleFa: 'استاد استانداردهای بین‌المللی',
    titleEn: 'Global Standard Master',
    descriptionFa: 'قبولی در حداقل ۳ آزمون دارای مرجع جهانی رسمی (McKinsey, Scrum, IFRS, ISO, SHL).',
    iconName: 'Globe',
    tier: 'platinum',
    unlocked: true,
    unlockedAt: '۱۴۰۳/۰۷/۱۰',
    progressPercent: 100,
    criteriaTextFa: 'کسب قبولی در ۳ آزمون دارای استاندارد بین‌المللی',
    xpReward: 400,
    categoryTag: 'achievement'
  },
  {
    id: 'badge-elite-talent',
    titleFa: 'نخبگان تاپ ۵ درصد صنعت',
    titleEn: 'Top 5% Industry Talent',
    descriptionFa: 'کسب نمره کل بالای ۹۰٪ و قرارگیری در بالاترین صدک شایستگی شغلی کشوری.',
    iconName: 'Crown',
    tier: 'platinum',
    unlocked: true,
    unlockedAt: '۱۴۰۳/۰۷/۱۰',
    progressPercent: 100,
    criteriaTextFa: 'کسب نمره کل ۹۰ یا بیشتر در یک ارزیابی جامع',
    xpReward: 500,
    categoryTag: 'achievement'
  },
  {
    id: 'badge-perfect-100',
    titleFa: 'دقت بی‌نقص (نمره ۱۰۰٪)',
    titleEn: 'Perfect 100 Centurion',
    descriptionFa: 'پاسخ صحیح به تمام سوالات و سناریوهای یک آزمون ارزیابی بدون حتی یک خطا.',
    iconName: 'Award',
    tier: 'gold',
    unlocked: false,
    progressPercent: 95,
    criteriaTextFa: 'کسب نمره ۱۰۰٪ در هر یک از آزمون‌های کتابخانه',
    xpReward: 350,
    categoryTag: 'achievement'
  },
  {
    id: 'badge-centurion-xp',
    titleFa: 'باشگاه ۲۰۰۰ امتیازی‌ها',
    titleEn: '2000+ XP Champions Club',
    descriptionFa: 'جمع‌آوری بیش از ۲۰۰۰ امتیاز تجربه، یادگیری و ارزیابی در سامانه تست‌لایف.',
    iconName: 'Trophy',
    tier: 'platinum',
    unlocked: true,
    unlockedAt: '۱۴۰۳/۰۷/۱۰',
    progressPercent: 100,
    criteriaTextFa: 'کسب حداقل ۲۰۰۰ امتیاز تجربه (XP)',
    xpReward: 400,
    categoryTag: 'achievement'
  }
];

export function calculateLevelFromXp(xp: number): {
  level: number;
  levelTitle: string;
  nextLevelXp: number;
  currentLevelBaseXp: number;
} {
  if (xp < 400) {
    return {
      level: 1,
      levelTitle: 'کارآموز نوپا (Novice Talent)',
      nextLevelXp: 400,
      currentLevelBaseXp: 0
    };
  } else if (xp < 900) {
    return {
      level: 2,
      levelTitle: 'پوینده مهارت (Diligent Explorer)',
      nextLevelXp: 900,
      currentLevelBaseXp: 400
    };
  } else if (xp < 1600) {
    return {
      level: 3,
      levelTitle: 'متخصص شایسته (Skilled Specialist)',
      nextLevelXp: 1600,
      currentLevelBaseXp: 900
    };
  } else if (xp < 2500) {
    return {
      level: 4,
      levelTitle: 'راهبر ارشد مهارتی (Lead Performer)',
      nextLevelXp: 2500,
      currentLevelBaseXp: 1600
    };
  } else if (xp < 3800) {
    return {
      level: 5,
      levelTitle: 'تحلیل‌گر ارشد شایستگی‌ها (Senior Competency Analyst)',
      nextLevelXp: 3800,
      currentLevelBaseXp: 2500
    };
  } else if (xp < 5500) {
    return {
      level: 6,
      levelTitle: 'معمار طلایی مهارت‌ها (Master Talent Architect)',
      nextLevelXp: 5500,
      currentLevelBaseXp: 3800
    };
  } else if (xp < 7500) {
    return {
      level: 7,
      levelTitle: 'پیشتاز نخبگان سازمانی (Elite Vanguard)',
      nextLevelXp: 7500,
      currentLevelBaseXp: 5500
    };
  } else {
    return {
      level: 8,
      levelTitle: 'افسانه شایستگی‌های حرفه‌ای (Legendary Grandmaster)',
      nextLevelXp: 10000,
      currentLevelBaseXp: 7500
    };
  }
}

/**
 * Updates badges and XP based on a completed candidate test result
 */
export function evaluateUserGamification(
  currentProfile: UserGamificationProfile,
  newResult: CandidateResult
): {
  updatedProfile: UserGamificationProfile;
  newlyUnlockedBadges: UserBadge[];
  xpGained: number;
} {
  let xpGained = 100; // Base XP for completing any test

  // Score multiplier
  if (newResult.overallScore >= 90) {
    xpGained += 200; // Elite score bonus
  } else if (newResult.overallScore >= 75) {
    xpGained += 120; // Great score bonus
  } else if (newResult.overallScore >= 60) {
    xpGained += 60;
  }

  // Coding execution excellence
  if (newResult.codingResult && newResult.codingResult.testCasesPassed === newResult.codingResult.totalTestCases && (newResult.codingResult.totalTestCases || 0) > 0) {
    xpGained += 100; // Clean code bonus
  }

  // Situational Judgment
  if (newResult.scoreBreakdown.situationalJudgmentScore >= 85) {
    xpGained += 60; // SJT leadership bonus
  }

  // Speed bonus
  if (newResult.timeSpentMinutes <= 12 && newResult.overallScore >= 75) {
    xpGained += 50;
  }

  // Continuous participation streak bonus (each streak day adds +20 XP)
  const streakBonus = Math.min(currentProfile.streakDays * 20, 200);
  xpGained += streakBonus;

  const newTotalXp = currentProfile.totalXp + xpGained;
  const levelInfo = calculateLevelFromXp(newTotalXp);

  const newlyUnlocked: UserBadge[] = [];
  const updatedBadges = currentProfile.badges.map(badge => {
    if (badge.unlocked) return badge;

    let shouldUnlock = false;

    if (badge.id === 'badge-golden-coder' && newResult.codingResult?.testCasesPassed === newResult.codingResult?.totalTestCases && (newResult.codingResult?.totalTestCases || 0) > 0) {
      shouldUnlock = true;
    }
    if (badge.id === 'badge-strategic-thinker' && newResult.scoreBreakdown.problemSolvingScore >= 90) {
      shouldUnlock = true;
    }
    if (badge.id === 'badge-workplace-diplomat' && newResult.scoreBreakdown.situationalJudgmentScore >= 85) {
      shouldUnlock = true;
    }
    if (badge.id === 'badge-elite-talent' && newResult.overallScore >= 90) {
      shouldUnlock = true;
    }
    if (badge.id === 'badge-perfect-100' && newResult.overallScore === 100) {
      shouldUnlock = true;
    }
    if (badge.id === 'badge-speed-demon' && newResult.timeSpentMinutes <= 12 && newResult.overallScore >= 85) {
      shouldUnlock = true;
    }
    if (badge.id === 'badge-centurion-xp' && newTotalXp >= 2000) {
      shouldUnlock = true;
    }
    if (badge.id === 'badge-streak-3' && currentProfile.streakDays >= 3) {
      shouldUnlock = true;
    }
    if (badge.id === 'badge-streak-7' && currentProfile.streakDays >= 7) {
      shouldUnlock = true;
    }

    if (shouldUnlock) {
      const unlockedBadge: UserBadge = {
        ...badge,
        unlocked: true,
        unlockedAt: new Date().toLocaleDateString('fa-IR'),
        progressPercent: 100
      };
      newlyUnlocked.push(unlockedBadge);
      return unlockedBadge;
    }

    return badge;
  });

  // Calculate new weekly activity (mark today as active)
  const currentWeekly = currentProfile.weeklyActivity || [true, true, true, true, true, false, false];
  const updatedWeekly = [...currentWeekly];
  updatedWeekly[new Date().getDay()] = true;

  return {
    updatedProfile: {
      ...currentProfile,
      totalXp: newTotalXp,
      level: levelInfo.level,
      levelTitle: levelInfo.levelTitle,
      nextLevelXp: levelInfo.nextLevelXp,
      streakDays: currentProfile.streakDays + 1,
      badges: updatedBadges,
      lastTestDate: new Date().toLocaleDateString('fa-IR'),
      weeklyActivity: updatedWeekly
    },
    newlyUnlockedBadges: newlyUnlocked,
    xpGained
  };
}
