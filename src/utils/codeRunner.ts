import { TestCase } from '../types/assessment';

export interface CodeExecutionResult {
  passed: boolean;
  totalCases: number;
  passedCases: number;
  executionTimeMs: number;
  logs: string[];
  errorMessage?: string;
  testCaseResults: {
    testCaseId: string;
    description: string;
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
  }[];
}

/**
 * Safely executes JavaScript code in a sandboxed browser environment
 * and checks results against expected outputs.
 */
export function executeCandidateCode(
  userCode: string,
  testCases: TestCase[]
): CodeExecutionResult {
  const startTime = performance.now();
  const logs: string[] = [];
  const testCaseResults: CodeExecutionResult['testCaseResults'] = [];
  let passedCases = 0;

  // Intercept console.log
  const customConsole = {
    log: (...args: any[]) => {
      logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
    },
    error: (...args: any[]) => {
      logs.push('[ERR] ' + args.map(a => String(a)).join(' '));
    },
    warn: (...args: any[]) => {
      logs.push('[WARN] ' + args.map(a => String(a)).join(' '));
    }
  };

  try {
    // Wrap code in a function constructor to avoid polluting global scope
    // Extract declared function name from user code, e.g. function aggregateSalaries, or const foo =
    const sandboxFunction = new Function(
      'console',
      `
      ${userCode}

      // Detect main function
      let targetFn = null;
      if (typeof aggregateSalaries === 'function') targetFn = aggregateSalaries;
      else if (typeof findTwoSum === 'function') targetFn = findTwoSum;
      else if (typeof countCriticalErrors === 'function') targetFn = countCriticalErrors;
      else {
        // Fallback: search for first defined function in local scope
        const match = \`${userCode.replace(/`/g, '\\`')}\`.match(/function\\s+([a-zA-Z0-9_$]+)/);
        if (match && eval('typeof ' + match[1]) === 'function') {
          targetFn = eval(match[1]);
        }
      }

      return function runSingle(inputString) {
        if (!targetFn) {
          throw new Error('تابع اصلی آزمون یافت نشد. لطفاً نام تابع را تغییر ندهید.');
        }

        let parsedInput;
        try {
          // Check if input has multiple args separated by comma or is a single JSON
          // Example: [2, 7, 11, 15], 9
          const evalInput = eval('[' + inputString + ']');
          return targetFn(...evalInput);
        } catch (e) {
          try {
            parsedInput = JSON.parse(inputString);
            return targetFn(parsedInput);
          } catch (e2) {
            return targetFn(inputString);
          }
        }
      };
      `
    );

    const runner = sandboxFunction(customConsole);

    for (const tc of testCases) {
      try {
        const actualResult = runner(tc.input);
        const actualSerialized = JSON.stringify(actualResult);
        
        let expectedNormalized = tc.expectedOutput.replace(/\s+/g, '');
        let actualNormalized = (actualSerialized ?? 'undefined').replace(/\s+/g, '');

        // If checking object equality, parse and normalize keys
        let isMatch = false;
        try {
          const expObj = JSON.parse(tc.expectedOutput);
          const actObj = typeof actualResult === 'object' ? actualResult : JSON.parse(actualSerialized);
          isMatch = JSON.stringify(expObj) === JSON.stringify(actObj);
        } catch {
          isMatch = actualNormalized === expectedNormalized;
        }

        if (isMatch) {
          passedCases++;
        }

        testCaseResults.push({
          testCaseId: tc.id,
          description: tc.description,
          input: tc.input,
          expected: tc.expectedOutput,
          actual: actualSerialized,
          passed: isMatch
        });
      } catch (tcErr: any) {
        testCaseResults.push({
          testCaseId: tc.id,
          description: tc.description,
          input: tc.input,
          expected: tc.expectedOutput,
          actual: `Error: ${tcErr.message}`,
          passed: false
        });
      }
    }

    const endTime = performance.now();
    return {
      passed: passedCases === testCases.length,
      totalCases: testCases.length,
      passedCases,
      executionTimeMs: Math.round(endTime - startTime),
      logs,
      testCaseResults
    };
  } catch (err: any) {
    const endTime = performance.now();
    return {
      passed: false,
      totalCases: testCases.length,
      passedCases: 0,
      executionTimeMs: Math.round(endTime - startTime),
      logs,
      errorMessage: err.message || 'خطا در کامپایل یا اجرای کد',
      testCaseResults: testCases.map(tc => ({
        testCaseId: tc.id,
        description: tc.description,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: 'اجرا نشد (خطای پیش‌فرض در کد)',
        passed: false
      }))
    };
  }
}
