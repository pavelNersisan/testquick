export type JobCategoryId =
  | 'management_business'
  | 'it_software'
  | 'engineering_technical'
  | 'health_medicine'
  | 'finance_banking'
  | 'sales_marketing'
  | 'education_research'
  | 'art_design_media'
  | 'law_legal'
  | 'hr_administration'
  | 'construction_architecture'
  | 'manufacturing_production'
  | 'logistics_supply_chain'
  | 'tourism_hospitality'
  | 'agriculture_environment'
  | 'basic_applied_sciences'
  | 'public_social_services';

export interface JobCategory {
  id: JobCategoryId;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  iconName: string;
  testsCount: number;
}

export type TestType =
  | 'coding'
  | 'programming'
  | 'problem_solving'
  | 'situational_judgment'
  | 'personality_culture'
  | 'role_specific'
  | 'language'
  | 'engineering_skills';

export type DifficultyLevel = 'مقدماتی' | 'متوسط' | 'پیشرفته';

export interface TestCase {
  id: string;
  description: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface CodingQuestionData {
  language: 'javascript' | 'python' | 'sql';
  starterCode: string;
  problemStatement: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  testCases: TestCase[];
}

export interface SJTOption {
  id: string;
  text: string;
  score: number; // 1 to 5 points
  effectiveness: 'بسیار اثربخش' | 'اثربخش' | 'خنثی / کم‌اثر' | 'نامناسب و پرریسک';
  feedback: string;
}

export interface SJTQuestionData {
  scenario: string;
  context: string;
  options: SJTOption[];
}

export interface StandardQuestionData {
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect?: boolean;
  }[];
  explanation?: string;
}

export interface PersonalityQuestionData {
  statement: string;
  dimension: 'conscientiousness' | 'teamwork' | 'leadership' | 'adaptability' | 'stress_tolerance';
  reversedScore?: boolean;
}

export type QuestionKind = 'coding' | 'sjt' | 'mcq' | 'personality';

export interface Question {
  id: string;
  kind: QuestionKind;
  title: string;
  points: number;
  codingData?: CodingQuestionData;
  sjtData?: SJTQuestionData;
  mcqData?: StandardQuestionData;
  personalityData?: PersonalityQuestionData;
}

export interface AssessmentTest {
  id: string;
  titleFa: string;
  titleEn: string;
  categoryId: JobCategoryId;
  testType: TestType;
  difficulty: DifficultyLevel;
  durationMinutes: number;
  questionCount: number;
  descriptionFa: string;
  targetRoles: string[];
  skillsCovered: string[];
  popularityScore: number;
  sourceStandard?: string;
  questions: Question[];
}

export interface CandidateAnswer {
  questionId: string;
  kind: QuestionKind;
  codeAnswer?: string;
  codeExecutionPassed?: boolean;
  selectedOptionId?: string;
  selectedSjtOptionId?: string;
  personalityRating?: number; // 1 to 5
}

export interface CandidateResult {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  jobPosition: string;
  categoryId: JobCategoryId;
  testId: string;
  testTitle: string;
  testType: TestType;
  submittedAt: string;
  timeSpentMinutes: number;
  overallScore: number; // 0 to 100
  status: 'recommended' | 'review' | 'not_fit';
  statusLabel: string;
  scoreBreakdown: {
    technicalOrRoleScore: number;
    problemSolvingScore: number;
    situationalJudgmentScore: number;
    personalityFitScore: number;
  };
  radarSkills: {
    skill: string;
    score: number;
    benchmark: number;
  }[];
  keyStrengths: string[];
  improvementAreas: string[];
  behavioralSummary: string;
  suggestedInterviewQuestions: string[];
  codingResult?: {
    codeSubmitted: string;
    language: string;
    testCasesPassed: number;
    totalTestCases: number;
    executionTimeMs: number;
    codeQualityNote: string;
  };
}

export interface CustomAssessmentPackage {
  id: string;
  title: string;
  categoryId: JobCategoryId;
  targetRole: string;
  selectedTestIds: string[];
  passingScore: number;
  timeLimitTotalMinutes: number;
  createdAt: string;
  inviteCode: string;
}

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum';
export type BadgeCategoryTag = 'streak' | 'technical' | 'behavioral' | 'achievement';

export interface UserBadge {
  id: string;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  iconName: string;
  tier: BadgeTier;
  unlocked: boolean;
  unlockedAt?: string;
  progressPercent: number; // 0 to 100
  criteriaTextFa: string;
  xpReward: number;
  categoryTag?: BadgeCategoryTag;
}

export interface UserGamificationProfile {
  totalXp: number;
  level: number;
  levelTitle: string;
  nextLevelXp: number;
  streakDays: number;
  lastTestDate?: string;
  badges: UserBadge[];
  weeklyActivity?: boolean[];
}

