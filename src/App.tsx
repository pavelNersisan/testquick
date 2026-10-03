import React, { useState, useEffect } from 'react';
import { 
  AssessmentTest, 
  CandidateResult, 
  CustomAssessmentPackage,
  UserGamificationProfile,
  UserBadge
} from './types/assessment';
import { getComprehensiveAllTests } from './data/allCategoryTests';
import { MOCK_CANDIDATES } from './data/mockCandidates';
import { INITIAL_BADGES, evaluateUserGamification, calculateLevelFromXp } from './data/gamification';
import { Navbar, ActiveTab } from './components/Navbar';
import { TestLibrary } from './components/TestLibrary';
import { TestDetailModal } from './components/TestDetailModal';
import { TestRunner } from './components/TestRunner';
import { CandidateReport } from './components/CandidateReport';
import { CandidatesPipeline } from './components/CandidatesPipeline';
import { AssessmentBuilder } from './components/AssessmentBuilder';
import { CodingSuite } from './components/CodingSuite';
import { UserScorecardView } from './components/UserScorecardView';
import { GamificationView } from './components/GamificationView';
import { Trophy, Sparkles, X, Flame } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  position: string;
  phone: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('library');
  const [tests, setTests] = useState<AssessmentTest[]>(() => getComprehensiveAllTests());
  const [candidates, setCandidates] = useState<CandidateResult[]>(() => {
    const saved = localStorage.getItem('testlife_candidates');
    return saved ? JSON.parse(saved) : MOCK_CANDIDATES;
  });

  // Current logged in user profile
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('testlife_current_user');
    return saved ? JSON.parse(saved) : {
      name: 'علیرضا رضوی',
      email: 'a.razavi@gmail.com',
      position: 'مهندس ارشد نرم‌افزار و هوش مصنوعی',
      phone: '۰۹۱۲۳۴۵۶۷۸۹'
    };
  });

  // Gamification & Continuous Participation Profile
  const [gamificationProfile, setGamificationProfile] = useState<UserGamificationProfile>(() => {
    const saved = localStorage.getItem('testlife_gamification');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      totalXp: 2350,
      level: 4,
      levelTitle: 'راهبر ارشد مهارتی (Lead Performer)',
      nextLevelXp: 2500,
      streakDays: 5,
      lastTestDate: '۱۴۰۳/۰۷/۱۰',
      badges: INITIAL_BADGES,
      weeklyActivity: [true, true, true, true, true, false, false]
    };
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('testlife_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('testlife_candidates', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem('testlife_gamification', JSON.stringify(gamificationProfile));
  }, [gamificationProfile]);
  
  // Modal / Active runner states
  const [previewTest, setPreviewTest] = useState<AssessmentTest | null>(null);
  const [runningTest, setRunningTest] = useState<AssessmentTest | null>(null);
  const [viewingCandidateResult, setViewingCandidateResult] = useState<CandidateResult | null>(null);
  
  // Achievement celebration modal state
  const [unlockedBadgeAlert, setUnlockedBadgeAlert] = useState<UserBadge | null>(null);

  // Success notification banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Launch test in runner
  const handleStartTest = (test: AssessmentTest) => {
    setRunningTest(test);
    setActiveTab('runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick start first available test or prompt
  const handleQuickStart = () => {
    const firstTest = tests[0];
    if (firstTest) {
      handleStartTest(firstTest);
    }
  };

  // Finish test callback with automated gamification update
  const handleFinishTest = (result: CandidateResult) => {
    setCandidates(prev => [result, ...prev]);
    setViewingCandidateResult(result);
    setRunningTest(null);
    setActiveTab('user-scorecards');

    // Evaluate gamification and rewards
    const evalResult = evaluateUserGamification(gamificationProfile, result);
    setGamificationProfile(evalResult.updatedProfile);

    showToast(`آفرین! کارنامه آزمون «${result.testTitle}» صادر گردید (+${evalResult.xpGained} XP کسب شد!).`);

    // If a new badge was unlocked, show celebration dialog
    if (evalResult.newlyUnlockedBadges.length > 0) {
      setTimeout(() => {
        setUnlockedBadgeAlert(evalResult.newlyUnlockedBadges[0]);
      }, 700);
    }
  };

  // Daily check-in handler
  const handleDailyCheckIn = () => {
    setGamificationProfile(prev => {
      const newXp = prev.totalXp + 50;
      const levelInfo = calculateLevelFromXp(newXp);
      const newWeekly = [...(prev.weeklyActivity || [true, true, true, true, true, false, false])];
      newWeekly[new Date().getDay()] = true;
      return {
        ...prev,
        totalXp: newXp,
        level: levelInfo.level,
        levelTitle: levelInfo.levelTitle,
        nextLevelXp: levelInfo.nextLevelXp,
        streakDays: prev.streakDays + 1,
        weeklyActivity: newWeekly
      };
    });
    showToast('🔥 حضور روزانه ثبت شد! +۵۰ XP دریافت کردید و زنجیره استمرار شما به ۱ روز بیشتر افزایش یافت.');
  };

  // Add custom test generated by AI
  const handleAddCustomTest = (newTest: AssessmentTest) => {
    setTests(prev => [newTest, ...prev]);
    showToast(`آزمون جدید «${newTest.titleFa}» به بانک آزمون‌ها افزوده شد.`);
  };

  // Launch custom package
  const handleLaunchCustomPackage = (pkg: CustomAssessmentPackage) => {
    showToast(`پکیج ارزیابی «${pkg.title}» با کد دعوت ${pkg.inviteCode} با موفقیت فعال گردید.`);
    setActiveTab('library');
  };

  // Select candidate for detailed inspection
  const handleSelectCandidate = (cand: CandidateResult) => {
    setViewingCandidateResult(cand);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter scorecards belonging to current active user
  const userResults = candidates.filter(
    c => c.candidateName === currentUser.name || c.email === currentUser.email
  );

  // If user has no scorecards yet, associate the first mock one for rich demo display
  const effectiveUserResults = userResults.length > 0 ? userResults : [
    {
      ...candidates[0],
      candidateName: currentUser.name,
      email: currentUser.email,
      jobPosition: currentUser.position
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans" dir="rtl">
      
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-5 left-5 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      {activeTab !== 'runner' && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setViewingCandidateResult(null);
          }}
          onQuickStartTest={handleQuickStart}
          userName={currentUser.name}
          userScorecardsCount={effectiveUserResults.length}
          gamificationProfile={gamificationProfile}
        />
      )}

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'runner' ? (
          <TestRunner
            test={runningTest || tests[0]}
            candidateName={currentUser.name}
            candidateEmail={currentUser.email}
            candidatePosition={runningTest?.targetRoles[0] || currentUser.position}
            onFinishTest={handleFinishTest}
            onExit={() => {
              setRunningTest(null);
              setActiveTab('library');
            }}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* TAB 1: TEST LIBRARY */}
            {activeTab === 'library' && (
              <TestLibrary
                tests={tests}
                onSelectTest={handleStartTest}
                onPreviewTest={(test) => setPreviewTest(test)}
              />
            )}

            {/* TAB 2: CODING SUITE */}
            {activeTab === 'coding' && (
              <CodingSuite />
            )}

            {/* TAB 3: USER PERSONAL SCORECARD & CERTIFICATES */}
            {activeTab === 'user-scorecards' && (
              viewingCandidateResult ? (
                <CandidateReport
                  result={viewingCandidateResult}
                  onBack={() => setViewingCandidateResult(null)}
                />
              ) : (
                <UserScorecardView
                  currentUser={currentUser}
                  onUpdateUser={(updated) => {
                    setCurrentUser(updated);
                    showToast('مشخصات کاربری شما با موفقیت بروزرسانی شد.');
                  }}
                  userResults={effectiveUserResults}
                  onViewDetailedResult={(res) => setViewingCandidateResult(res)}
                  onStartNewTest={(t) => {
                    if (t) handleStartTest(t);
                    else setActiveTab('library');
                  }}
                  availableTests={tests}
                  gamificationProfile={gamificationProfile}
                  onOpenBadges={() => setActiveTab('badges')}
                />
              )
            )}

            {/* TAB 4: GAMIFICATION & HONOR BADGES (سیستم مدال‌های افتخار و رتبه‌بندی) */}
            {activeTab === 'badges' && (
              <GamificationView
                profile={gamificationProfile}
                userName={currentUser.name}
                userPosition={currentUser.position}
                onStartTest={handleStartTest}
                availableTests={tests}
                onDailyCheckIn={handleDailyCheckIn}
              />
            )}

            {/* TAB 5: CANDIDATES PIPELINE & SCORECARDS (HR VIEW) */}
            {activeTab === 'candidates' && (
              viewingCandidateResult ? (
                <CandidateReport
                  result={viewingCandidateResult}
                  onBack={() => setViewingCandidateResult(null)}
                />
              ) : (
                <CandidatesPipeline
                  candidates={candidates}
                  onSelectCandidate={handleSelectCandidate}
                />
              )
            )}

            {/* TAB 6: CUSTOM ASSESSMENT BUILDER */}
            {activeTab === 'builder' && (
              <AssessmentBuilder
                tests={tests}
                onAddCustomTest={handleAddCustomTest}
                onLaunchCustomPackage={handleLaunchCustomPackage}
              />
            )}

          </div>
        )}
      </main>

      {/* Test Preview Modal */}
      {previewTest && (
        <TestDetailModal
          test={previewTest}
          onClose={() => setPreviewTest(null)}
          onStartTest={(test) => {
            setPreviewTest(null);
            handleStartTest(test);
          }}
        />
      )}

      {/* Achievement Unlocked Celebration Modal */}
      {unlockedBadgeAlert && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 text-center shadow-2xl border border-amber-300 relative text-right animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setUnlockedBadgeAlert(null)}
              className="absolute left-4 top-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-200">
              <Trophy className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-1 text-center">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs inline-flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>مدال افتخار جدید آزاد شد!</span>
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 pt-1">
                {unlockedBadgeAlert.titleFa}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {unlockedBadgeAlert.titleEn}
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed text-center px-2">
              {unlockedBadgeAlert.descriptionFa}
            </p>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-900">پاداش تجربه استمرار:</span>
              <span className="font-mono font-bold text-amber-700">+{unlockedBadgeAlert.xpReward} XP</span>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  setUnlockedBadgeAlert(null);
                  setActiveTab('badges');
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <Trophy className="w-4 h-4" />
                <span>مشاهده در ویترین مدال‌ها</span>
              </button>

              <button
                onClick={() => setUnlockedBadgeAlert(null)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                متوجه شدم
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Minimal Footer */}
      {activeTab !== 'runner' && (
        <footer className="bg-white border-t border-slate-200 mt-auto py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">تست‌لایف (TestLife)</span>
              <span>—</span>
              <span>سامانه ارزیابی مبتنی بر شایستگی، حل مسئله، رفتار سازمانی و مدال‌های افتخار</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span>پشتیبانی از تمام ۱۷ صنعت مادر (حداقل ۱۰ آزمون برای هر صنعت)</span>
              <span aria-hidden="true">·</span>
              <span>نشان‌های افتخار و استمرار یادگیری</span>
              <span aria-hidden="true">·</span>
              <span>گواهی دیجیتال مهارت</span>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}

