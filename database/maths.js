// Mathematics Questions Database
const mathsQuestions = [
  {
    id: 1,
    question: "What is the value of Euler's number to five decimal places?",
    options: ["2.71828", "3.14159", "1.61803", "0.57721"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "Euler's number e ≈ 2.718281828459045... Rounded to five decimal places: 2.71828"
  },
  {
    id: 2,
    question: "What is the derivative of tan(x)?",
    options: ["sec²(x)", "sec(x)", "tan²(x)", "cos(x)"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "d/dx[tan(x)] = sec²(x)"
  },
  {
    id: 3,
    question: "What is the integral of eˣ?",
    options: ["eˣ", "xeˣ", "ln(x)", "eˣ/x"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "∫eˣ dx = eˣ + C"
  },
  {
    id: 4,
    question: "What is the limit of sin(x)/x as x approaches 0?",
    options: ["1", "0", "∞", "undefined"],
    correct: 0,
    subject: "math",
    difficulty: 4,
    explanation: "lim(x→0) sin(x)/x = 1 (fundamental trigonometric limit)"
  },
  {
    id: 5,
    question: "What is the value of i⁴? (where i = √-1)",
    options: ["1", "i", "-1", "-i"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "i² = -1, so i⁴ = (i²)² = (-1)² = 1"
  },
  {
    id: 6,
    question: "What is the derivative of arcsin(x)?",
    options: ["1/√(1-x²)", "1/(1+x²)", "√(1-x²)", "-1/√(1-x²)"],
    correct: 0,
    subject: "math",
    difficulty: 4,
    explanation: "d/dx[arcsin(x)] = 1/√(1-x²)"
  },
  {
    id: 7,
    question: "What is the value of the golden ratio φ?",
    options: ["1.61803", "2.71828", "3.14159", "0.57721"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "φ = (1+√5)/2 ≈ 1.6180339887..."
  },
  {
    id: 8,
    question: "What is the sum of interior angles in a pentagon?",
    options: ["540°", "360°", "720°", "180°"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "Sum = (n-2)×180° = (5-2)×180° = 540°"
  },
  {
    id: 9,
    question: "What is log₁₀(1000)?",
    options: ["3", "2", "4", "1"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "10³ = 1000, so log₁₀(1000) = 3"
  },
  {
    id: 10,
    question: "What is the derivative of ln(x²)?",
    options: ["2/x", "1/x", "2x", "x/2"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "d/dx[ln(x²)] = 2x/x² = 2/x"
  },
  {
    id: 11,
    question: "What is the value of 0! (zero factorial)?",
    options: ["1", "0", "∞", "undefined"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "By definition, 0! = 1"
  },
  {
    id: 12,
    question: "What is the integral of 1/(1+x²)?",
    options: ["arctan(x)", "arcsin(x)", "ln(1+x²)", "x/(1+x²)"],
    correct: 0,
    subject: "math",
    difficulty: 4,
    explanation: "∫dx/(1+x²) = arctan(x) + C"
  },
  {
    id: 13,
    question: "What is the value of ₅P₃ (permutations)?",
    options: ["60", "20", "120", "10"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "₅P₃ = 5!/(5-3)! = 5×4×3 = 60"
  },
  {
    id: 14,
    question: "What is the derivative of cosh(x)?",
    options: ["sinh(x)", "cosh(x)", "-sinh(x)", "tanh(x)"],
    correct: 0,
    subject: "math",
    difficulty: 4,
    explanation: "d/dx[cosh(x)] = sinh(x)"
  },
  {
    id: 15,
    question: "What is the value of √(-25)?",
    options: ["5i", "-5i", "25i", "-25"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "√(-25) = √(25)×√(-1) = 5i"
  },
  {
    id: 16,
    question: "What is the volume of a sphere with radius r?",
    options: ["(4/3)πr³", "πr³", "4πr²", "(3/4)πr³"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "Volume of sphere = (4/3)πr³"
  },
  {
    id: 17,
    question: "What is the value of ₂₀C₃ (combinations)?",
    options: ["1140", "6840", "60", "8000"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "₂₀C₃ = 20!/(3!×17!) = (20×19×18)/(3×2×1) = 1140"
  },
  {
    id: 18,
    question: "What is the derivative of xˣ?",
    options: ["xˣ(1+lnx)", "xˣlnx", "xˣ⁻¹", "xˣ/x"],
    correct: 0,
    subject: "math",
    difficulty: 5,
    explanation: "d/dx[xˣ] = xˣ(1 + ln x) using logarithmic differentiation"
  },
  {
    id: 19,
    question: "What is the value of sin(π/3)?",
    options: ["√3/2", "1/2", "√2/2", "1"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "sin(π/3) = sin(60°) = √3/2"
  },
  {
    id: 20,
    question: "What is the integral of sec²(x)?",
    options: ["tan(x)", "sec(x)", "ln|secx|", "cot(x)"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "∫sec²(x) dx = tan(x) + C"
  },
  {
    id: 21,
    question: "What is the value of lim(n→∞) (1+1/n)ⁿ?",
    options: ["e", "1", "∞", "π"],
    correct: 0,
    subject: "math",
    difficulty: 4,
    explanation: "lim(n→∞) (1+1/n)ⁿ = e (definition of Euler's number)"
  },
  {
    id: 22,
    question: "What is the derivative of f(g(x))?",
    options: ["f'(g(x))g'(x)", "f'(x)g'(x)", "f(g'(x))", "f'(g'(x))"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "Chain rule: d/dx[f(g(x))] = f'(g(x))·g'(x)"
  },
  {
    id: 23,
    question: "What is the sum of the infinite series 1 + 1/2 + 1/4 + 1/8 + ...?",
    options: ["2", "1", "∞", "1.5"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "Geometric series: a/(1-r) = 1/(1-1/2) = 2"
  },
  {
    id: 24,
    question: "What is the value of cos(π)?",
    options: ["-1", "0", "1", "undefined"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "cos(π) = cos(180°) = -1"
  },
  {
    id: 25,
    question: "What is the derivative of √x?",
    options: ["1/(2√x)", "√x", "1/√x", "x/√x"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "d/dx[√x] = d/dx[x^(1/2)] = (1/2)x^(-1/2) = 1/(2√x)"
  },
  {
    id: 26,
    question: "What is the value of ∫₀¹ x dx?",
    options: ["1/2", "1", "0", "2"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "∫₀¹ x dx = [x²/2]₀¹ = 1/2 - 0 = 1/2"
  },
  {
    id: 27,
    question: "What is the value of 8^(2/3)?",
    options: ["4", "2", "16", "64"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "8^(2/3) = (∛8)² = 2² = 4"
  },
  {
    id: 28,
    question: "What is the derivative of arctan(x)?",
    options: ["1/(1+x²)", "1/√(1-x²)", "1/(1-x²)", "√(1+x²)"],
    correct: 0,
    subject: "math",
    difficulty: 4,
    explanation: "d/dx[arctan(x)] = 1/(1+x²)"
  },
  {
    id: 29,
    question: "What is the sum of angles in a hexagon?",
    options: ["720°", "540°", "360°", "900°"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "Sum = (n-2)×180° = (6-2)×180° = 720°"
  },
  {
    id: 30,
    question: "What is the value of log₂(32)?",
    options: ["5", "6", "4", "3"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "2⁵ = 32, so log₂(32) = 5"
  },
  {
    id: 31,
    question: "What is the integral of sin(x)?",
    options: ["-cos(x)", "cos(x)", "sin(x)", "-sin(x)"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "∫sin(x) dx = -cos(x) + C"
  },
  {
    id: 32,
    question: "What is the value of ₆C₂?",
    options: ["15", "30", "12", "20"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "₆C₂ = 6!/(2!4!) = (6×5)/(2×1) = 15"
  },
  {
    id: 33,
    question: "What is the derivative of sec(x)?",
    options: ["sec(x)tan(x)", "tan(x)", "sec²(x)", "csc(x)cot(x)"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "d/dx[sec(x)] = sec(x)tan(x)"
  },
  {
    id: 34,
    question: "What is the value of √2 × √8?",
    options: ["4", "√16", "10", "2√2"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "√2 × √8 = √16 = 4"
  },
  {
    id: 35,
    question: "What is the integral of 1/x?",
    options: ["ln|x|", "x", "1/x²", "eˣ"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "∫(1/x) dx = ln|x| + C"
  },
  {
    id: 36,
    question: "What is the value of sin(π/2)?",
    options: ["1", "0", "√2/2", "√3/2"],
    correct: 0,
    subject: "math",
    difficulty: 1,
    explanation: "sin(π/2) = sin(90°) = 1"
  },
  {
    id: 37,
    question: "What is the derivative of aˣ?",
    options: ["aˣln(a)", "xaˣ⁻¹", "aˣ", "ln(a)"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "d/dx[aˣ] = aˣ ln(a)"
  },
  {
    id: 38,
    question: "What is the value of 10! (factorial)?",
    options: ["3628800", "362880", "39916800", "479001600"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "10! = 10×9×8×7×6×5×4×3×2×1 = 3,628,800"
  },
  {
    id: 39,
    question: "What is the integral of cos(x)?",
    options: ["sin(x)", "-sin(x)", "cos(x)", "-cos(x)"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "∫cos(x) dx = sin(x) + C"
  },
  {
    id: 40,
    question: "What is the value of 5³ ÷ 5²?",
    options: ["5", "25", "125", "1"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "5³ ÷ 5² = 5^(3-2) = 5¹ = 5"
  },
  {
    id: 41,
    question: "What is the derivative of cot(x)?",
    options: ["-csc²(x)", "csc²(x)", "-sec²(x)", "sec²(x)"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "d/dx[cot(x)] = -csc²(x)"
  },
  {
    id: 42,
    question: "What is the value of ∑(k=1 to 10) k?",
    options: ["55", "45", "50", "60"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "Sum = n(n+1)/2 = 10×11/2 = 55"
  },
  {
    id: 43,
    question: "What is the integral of e^(2x)?",
    options: ["(1/2)e^(2x)", "2e^(2x)", "e^(2x)", "e^(x²)"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "∫e^(2x) dx = (1/2)e^(2x) + C"
  },
  {
    id: 44,
    question: "What is the value of √(9+16)?",
    options: ["5", "7", "√25", "√13"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "√(9+16) = √25 = 5"
  },
  {
    id: 45,
    question: "What is the derivative of ln(cos(x))?",
    options: ["-tan(x)", "tan(x)", "-cot(x)", "sec(x)"],
    correct: 0,
    subject: "math",
    difficulty: 4,
    explanation: "d/dx[ln(cosx)] = (1/cosx)×(-sinx) = -tanx"
  },
  {
    id: 46,
    question: "What is the value of 2⁷?",
    options: ["128", "64", "256", "512"],
    correct: 0,
    subject: "math",
    difficulty: 1,
    explanation: "2⁷ = 2×2×2×2×2×2×2 = 128"
  },
  {
    id: 47,
    question: "What is the integral of x²?",
    options: ["x³/3", "x²/2", "2x", "x³"],
    correct: 0,
    subject: "math",
    difficulty: 2,
    explanation: "∫x² dx = x³/3 + C"
  },
  {
    id: 48,
    question: "What is the value of ₇P₄?",
    options: ["840", "210", "5040", "35"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "₇P₄ = 7!/(7-4)! = 7×6×5×4 = 840"
  },
  {
    id: 49,
    question: "What is the derivative of x·sin(x)?",
    options: ["sin(x)+x·cos(x)", "cos(x)", "x·cos(x)", "sin(x)-x·cos(x)"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "Product rule: d/dx[x·sinx] = 1·sinx + x·cosx"
  },
  {
    id: 50,
    question: "What is the value of ∫₀^π sin(x) dx?",
    options: ["2", "0", "1", "π"],
    correct: 0,
    subject: "math",
    difficulty: 3,
    explanation: "∫₀^π sin(x) dx = [-cos(x)]₀^π = (-cosπ) - (-cos0) = (1) - (-1) = 2"
  }
];
