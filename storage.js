// =====================
// ALL GAME DATA - SCHOLAR'S QUEST
// =====================

//PLAYER OBJECT
let player = {
  name: "", 
  class: "", 
  totalQuestions: 0,
  correctAnswers: 0,
  currentStreak: 0,
  bestStreak: 0,
  gold: 150,
  inventory: {"Basic Hint": 3, "Skip Token": 1}, 
  equipped: { focus: null, accessory: null },
  location: "Home", 
  level: 1, 
  exp: 0, 
  expToNextLevel: 400, 
  skills: [], 
  minigameCooldowns: {}, 
  skillCooldowns: {}, 
  permanentEffects: {},
  goldBonus: 0, 
  shopLevel: 1, 
  explorationData: null,
  permanentBonuses: {
    goldBonus: 0,
    expGain: 0,
    accuracy: 0.05,
    speed: 0.05
  },
  dailyChallenges: {
    lastCheck: null,
    completed: {},
    current: null,
    currentDate: null,
    progress: 0
  },
  stats: {
    totalQuestions: 0,
    locationsVisited: ["Home"],
    explorationsCompleted: 0,
    itemsPurchased: 0,
    totalGoldEarned: 150,
    achievementsUnlocked: 0,
    highestDungeonFloor: 0,
    totalDungeonFloors: 0,
    dungeonAttempts: 0,
    subjectMastery: {
      physics: { correct: 0, total: 0 },
      math: { correct: 0, total: 0 },
      logic: { correct: 0, total: 0 }
    }
  },
  audioSettings: {
    musicVolume: 0.5,
    soundEffectsVolume: 0.7,
    musicEnabled: true,
    soundEffectsEnabled: true
  }
};
  
//LOCATIONS - RENAMED TO ACADEMIC SUBJECTS
const locations = [
  "Home",
  "Mathematics",
  "Physics",
  "Logic",
  "Infinite Mode"
];

// SCHOLAR CLASSES
const CLASSES = {
  Physicist: {
    description: "Master of natural laws and physical principles",
    bonus: { physics: 0.15 },
    skills: ["Theory Hint", "Double Points", "Skip Question"],
    icon: "<i class='fas fa-atom'></i>"
  },
  Mathematician: {
    description: "Expert in numbers, patterns, and abstract reasoning",
    bonus: { math: 0.15 },
    skills: ["Eliminate Two", "Reveal Answer", "Streak Boost"],
    icon: "<i class='fas fa-calculator'></i>"
  },
  Polymath: {
    description: "Versatile scholar with balanced knowledge across all subjects",
    bonus: { all: 0.05 },
    skills: ["Small Hint", "All Bonus", "Reduce Difficulty"],
    icon: "<i class='fas fa-graduation-cap'></i>"
  },
  Analyst: {
    description: "Specialist in logic, patterns, and critical thinking",
    bonus: { logic: 0.15 },
    skills: ["Remove Wrong", "See Pattern", "See Explanation"],
    icon: "<i class='fas fa-search'></i>"
  }
};

// QUESTION DATABASE - Now loaded from external files
const questions = {
  "Physics": [], // Loaded from physics.js
  "Mathematics": [], // Loaded from maths.js
  "Logic": [], // Loaded from logic.js
  "Infinite Mode": [] // Generated dynamically
};

//DAILY CHALLENGES - Updated with reduced rewards
const dailyChallenges = {
  "challenge_1": { 
    title: "Physics Apprentice",
    objective: "ANSWER", 
    target: "physics", 
    amount: 5,
    reward: { gold: 150, exp: 90, item: "Basic Hint" }
  },
  "challenge_2": { 
    title: "Math Whiz",
    objective: "ANSWER", 
    target: "math", 
    amount: 5,
    reward: { gold: 150, exp: 90, item: "Topic Focus" }
  },
  "challenge_3": { 
    title: "Logic Prodigy",
    objective: "ANSWER", 
    target: "logic", 
    amount: 5,
    reward: { gold: 150, exp: 90, item: "Streak Shield" }
  },
  "challenge_4": { 
    title: "Perfect Session",
    objective: "STREAK", 
    target: "streak", 
    amount: 3,
    reward: { gold: 180, exp: 120, item: "Skip Token" }
  },
  "challenge_5": { 
    title: "Mixed Mastery",
    objective: "ANSWER", 
    target: "any", 
    amount: 10,
    reward: { gold: 200, exp: 150, item: "Topic Focus" }
  }
};

//ACHIEVEMENTS - Updated with reduced rewards
const achievements = {
  "first_answer": {
    name: "First Correct Answer",
    desc: "Answer your first question correctly",
    reward: { gold: 60, exp: 30 },
    icon: "<i class='fas fa-bullseye'></i>",
    check: (player) => player.correctAnswers >= 1
  },
  "perfect_session": {
    name: "Perfect Session",
    desc: "Complete a study session with 100% accuracy",
    reward: { gold: 300, exp: 180, item: "Basic Hint" },
    icon: "<i class='fas fa-star'></i>",
    check: (player) => {
      const session = player.explorationData;
      if (!session || !session.answers) return false;
      const total = session.answers.length;
      const correct = session.answers.filter(a => a.correct).length;
      return total >= 5 && correct === total;
    }
  },
  "physics_master": {
    name: "Physics Master",
    desc: "Answer 10 physics questions correctly",
    reward: { gold: 360, exp: 240 },
    icon: "<i class='fas fa-atom'></i>",
    check: (player) => player.stats?.subjectMastery?.physics?.correct >= 10
  },
  "math_master": {
    name: "Mathematics Master",
    desc: "Answer 10 math questions correctly",
    reward: { gold: 360, exp: 240 },
    icon: "<i class='fas fa-calculator'></i>",
    check: (player) => player.stats?.subjectMastery?.math?.correct >= 10
  },
  "logic_master": {
    name: "Logic Master",
    desc: "Answer 10 logic questions correctly",
    reward: { gold: 360, exp: 240 },
    icon: "<i class='fas fa-brain'></i>",
    check: (player) => player.stats?.subjectMastery?.logic?.correct >= 10
  },
  "explorer": {
    name: "Knowledge Explorer",
    desc: "Visit all study locations",
    reward: { gold: 720, exp: 480 },
    icon: "<i class='fas fa-map'></i>",
    check: (player) => {
      const visited = player.stats?.locationsVisited || [];
      return ["Physics", "Mathematics", "Logic", "Infinite Mode"].every(loc => visited.includes(loc));
    }
  },
  "novice": {
    name: "Novice Scholar",
    desc: "Reach level 5",
    reward: { gold: 180, exp: 120 },
    icon: "<i class='fas fa-book'></i>",
    check: (player) => player.level >= 5
  },
  "champion": {
    name: "Champion Scholar",
    desc: "Reach level 10",
    reward: { gold: 600, exp: 450 },
    icon: "<i class='fas fa-star'></i>",
    check: (player) => player.level >= 10
  },
  "legend": {
    name: "Living Legend",
    desc: "Reach level 20",
    reward: { gold: 1200, exp: 900, item: "Master's Focus" },
    icon: "<i class='fas fa-crown'></i>",
    check: (player) => player.level >= 20
  },
  "wealthy": {
    name: "Wealthy Scholar",
    desc: "Accumulate 5000 knowledge points",
    reward: { gold: 600, exp: 300 },
    icon: "<i class='fas fa-coins'></i>",
    check: (player) => player.stats?.totalGoldEarned >= 5000
  },
  "daily_player": {
    name: "Daily Learner",
    desc: "Complete 5 daily challenges",
    reward: { gold: 600, exp: 420 },
    icon: "<i class='fas fa-calendar-day'></i>",
    check: (player) => Object.keys(player.dailyChallenges?.completed || {}).length >= 5
  }
};

// LEVEL-UP CONFIGURATION
const levelUpStatGrowth = {
  accuracy: (level, classBase) => Math.floor(classBase * 0.1 + level * 2),
  speed: (level, classBase) => Math.floor(classBase * 0.08 + level * 1.5)
};

//SKILL UNLOCK (Abilities) - RENAMED TO SHORTER NAMES
const skillUnlocks = {
  Physicist: {
    1: { name: "Theory Hint", desc: "Reveals one incorrect answer.", type: "hint", cooldown: 2 },
    3: { name: "Double Points", desc: "Doubles points for next correct answer.", type: "buff", cooldown: 3 },
    5: { name: "Skip Question", desc: "Skip current question without penalty.", type: "utility", cooldown: 4}
  },
  Mathematician: {
    1: { name: "Eliminate Two", desc: "Eliminate two wrong answers.", type: "hint", cooldown: 2 },
    3: { name: "Reveal Answer", desc: "Reveal correct answer with 70% chance.", type: "hint", cooldown: 3 },
    5: { name: "Streak Boost", desc: "Answer streak gives double points for 3 questions.", type: "buff", cooldown: 4}
  },
  Polymath: {
    1: { name: "Small Hint", desc: "Get a small hint about the answer.", type: "hint", cooldown: 2 },
    3: { name: "All Bonus", desc: "Gain 25% bonus on all subjects for 2 questions.", type: "buff", cooldown: 3 },
    5: { name: "Reduce Difficulty", desc: "Question difficulty reduced by one level.", type: "utility", cooldown: 4}
  },
  Analyst: {
    1: { name: "Remove Wrong", desc: "Eliminate obviously wrong answers.", type: "hint", cooldown: 2 },
    3: { name: "See Pattern", desc: "See patterns in answer options.", type: "hint", cooldown: 3 },
    5: { name: "See Explanation", desc: "Get detailed explanation before answering.", type: "utility", cooldown: 4}
  }
};

// SHOP ITEMS (Study Aids) - STREAMLINED
const shopItems = {
  "Basic Hint": { 
    price: 100, 
    type: "consumable", 
    category: "Hints", 
    icon: "<i class='fas fa-lightbulb'></i>",
    description: "Reveals one incorrect answer choice."
  },
  "Streak Shield": { 
    price: 200, 
    type: "consumable", 
    category: "Protection", 
    icon: "<i class='fas fa-shield-alt'></i>",
    description: "Protects your current streak if you answer incorrectly."
  },
  "Topic Focus": { 
    price: 120, 
    type: "consumable", 
    category: "Focus", 
    icon: "<i class='fas fa-bullseye'></i>",
    description: "Guarantees next question will be from chosen subject."
  },
  "Skip Token": { 
    price: 250, 
    type: "consumable", 
    category: "Utility", 
    icon: "<i class='fas fa-forward'></i>",
    description: "Skip current question without penalty."
  },
  "Scholar's Robe": { 
    price: 500, 
    type: "focus", 
    category: "Focus", 
    icon: "<i class='fas fa-tshirt'></i>",
    bonus: { accuracy: 0.1 },
    description: "Traditional robe that improves concentration and accuracy."
  },
  "Logic Lens": { 
    price: 400, 
    type: "accessory", 
    category: "Accessories", 
    icon: "<i class='fas fa-glasses'></i>",
    bonus: { speed: 0.1 },
    description: "Helps analyze problems more quickly."
  }
};

//SHOP UNLOCK LEVELS
const shopUnlocks = {
  1: ["Basic Hint", "Topic Focus"],
  2: ["Streak Shield", "Skip Token"],
  3: ["Logic Lens", "Scholar's Robe"]
};

//INFINITE MODE SYSTEM
const infiniteMode = {
  name: "Infinite Mode",
  description: "An endless challenge with questions from all subjects.",
  minLevel: 3,
  cooldown: 600000,
  rewards: {
    baseGold: 120, // Reduced by 40%
    baseExp: 90, // Reduced by 40%
    scaling: 1.2,
    rareDrops: [
      "Basic Hint", "Topic Focus", "Streak Shield"
    ]
  }
};

// Initialize Infinite Mode questions
function initializeInfiniteModeQuestions() {
  questions["Infinite Mode"] = [];
  
  // Combine questions from all subjects
  const allQuestions = [
    ...questions["Physics"],
    ...questions["Mathematics"],
    ...questions["Logic"]
  ];
  
  if (allQuestions.length === 0) {
    console.error("No questions available for Infinite Mode!");
    return;
  }
  
  // Create 50 Infinite Mode questions with progressive difficulty
  for(let floor = 1; floor <= 50; floor++) {
    let difficulty = 1;
    if (floor <= 5) difficulty = 1; // Easy
    else if (floor <= 10) difficulty = 2; // Medium
    else difficulty = 3; // Hard
    
    // Filter questions by difficulty
    const filteredQuestions = allQuestions.filter(q => q.difficulty === difficulty);
    
    if (filteredQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
      const question = {...filteredQuestions[randomIndex]};
      question.id = 1000 + floor; // Unique ID for Infinite Mode
      
      questions["Infinite Mode"].push(question);
    } else {
      // Fallback to any question if no difficulty match
      const randomIndex = Math.floor(Math.random() * allQuestions.length);
      const question = {...allQuestions[randomIndex]};
      question.id = 1000 + floor;
      questions["Infinite Mode"].push(question);
    }
  }
}

// Load questions from database files (called after files load)
function loadAllQuestions() {
  try {
    // Load questions from database files
    if (typeof physicsQuestions !== 'undefined') {
      questions["Physics"] = physicsQuestions;
    } else {
      console.error("Physics questions not loaded!");
      questions["Physics"] = [];
    }
    
    if (typeof mathsQuestions !== 'undefined') {
      questions["Mathematics"] = mathsQuestions;
    } else {
      console.error("Maths questions not loaded!");
      questions["Mathematics"] = [];
    }
    
    if (typeof logicQuestions !== 'undefined') {
      questions["Logic"] = logicQuestions;
    } else {
      console.error("Logic questions not loaded!");
      questions["Logic"] = [];
    }
    
    // Initialize Infinite Mode questions
    initializeInfiniteModeQuestions();
    
    console.log("Questions loaded successfully:");
    console.log(`- Physics: ${questions["Physics"].length} questions`);
    console.log(`- Mathematics: ${questions["Mathematics"].length} questions`);
    console.log(`- Logic: ${questions["Logic"].length} questions`);
    console.log(`- Infinite Mode: ${questions["Infinite Mode"].length} questions`);
    
  } catch (error) {
    console.error("Error loading questions:", error);
    // Set up minimal fallback questions to prevent game crash
    setupFallbackQuestions();
  }
}

// Minimal fallback if database files fail
function setupFallbackQuestions() {
  questions["Physics"] = [
    {
      id: 1,
      question: "What force keeps planets in orbit around the sun?",
      options: ["Gravity", "Electromagnetism", "Nuclear", "Friction"],
      correct: 0,
      subject: "physics",
      difficulty: 1,
      explanation: "Gravity is the force that attracts two bodies toward each other."
    }
  ];
  
  questions["Mathematics"] = [
    {
      id: 101,
      question: "Solve for x: 2x + 5 = 15",
      options: ["5", "10", "7.5", "3"],
      correct: 0,
      subject: "math",
      difficulty: 1,
      explanation: "Subtract 5 from both sides: 2x = 10. Then divide by 2: x = 5."
    }
  ];
  
  questions["Logic"] = [
    {
      id: 201,
      question: "If all birds have feathers and a penguin is a bird, what can we conclude?",
      options: ["Penguins have feathers", "Penguins can fly", "Birds cannot swim", "Penguins are not birds"],
      correct: 0,
      subject: "logic",
      difficulty: 1,
      explanation: "Based on the premises, we can conclude that penguins have feathers."
    }
  ];
  
  initializeInfiniteModeQuestions();
}

// Call loadAllQuestions after a short delay to ensure files are loaded
setTimeout(loadAllQuestions, 100);