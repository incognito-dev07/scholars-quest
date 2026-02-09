// =====================
// INITIALIZATION
// =====================

// DOM ELEMENTS
const output = document.getElementById("output");
const controls = document.getElementById("controls");
const stats = document.getElementById("stats");
const statsText = document.getElementById("stats-text");
const levelBarFill = document.getElementById("levelbar-fill");
const levelBarText = document.getElementById("levelbar-text");
const accuracyBarFill = document.getElementById("accuracy-bar-fill");
const accuracyBarText = document.getElementById("accuracy-bar-text");
const streakBarFill = document.getElementById("streak-bar-fill");
const streakBarText = document.getElementById("streak-bar-text");
const questionTimer = document.getElementById("question-timer");
const questionTimerFill = document.getElementById("question-timer-fill");
const questionTimerText = document.getElementById("question-timer-text");
const miniMap = document.getElementById("mini-map");
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");
const backgroundMusic = document.getElementById("background-music");
const challengeMusic = document.getElementById("challenge-music");
const loadscreen = document.getElementById("loadscreen");
const loader = document.getElementById("loadingContainer");
const loading = document.getElementById("loading");
const loadingMsg1 = document.getElementById("loadingMsg1");
const loadingMsg2 = document.getElementById("loadingMsg2");
const exitContainer = document.getElementById("exitPopup");

//GLOBAL VARIABLES
let currentSaveSlot = 1;
let currentQuestion = null;
let questionStartTime = null;
let questionTimerInterval = null;
let currentMusic = null;
let backgroundMusicPosition = 0;
let challengeMusicPosition = 0;
let gameInitialized = false;
let clickToStartReady = false;
let waitingForNext = false;

//AUDIO FUNCTIONS
function playChallengeMusic() {
  if (!player.audioSettings.musicEnabled) return;
  if (currentMusic === 'challenge') return; 
  if (currentMusic === 'background') {
    backgroundMusicPosition = backgroundMusic.currentTime;
    backgroundMusic.pause();
  }
  challengeMusic.currentTime = challengeMusicPosition;
  challengeMusic.volume = player.audioSettings.musicVolume;
  challengeMusic.play().catch(e => console.log("Challenge music play failed:", e));
  currentMusic = 'challenge';
}

function playBackgroundMusic() {
  if (!player.audioSettings.musicEnabled || !gameInitialized) return;
  if (currentMusic === 'background') return;
  if (currentMusic === 'challenge') {
    challengeMusicPosition = challengeMusic.currentTime;
    challengeMusic.pause();
  }
  backgroundMusic.currentTime = backgroundMusicPosition;
  backgroundMusic.volume = player.audioSettings.musicVolume;
  backgroundMusic.play().catch(e => console.log("Background music play failed:", e));
  currentMusic = 'background';
}

function stopAllMusic() {
  if (currentMusic === 'background') {
    backgroundMusicPosition = backgroundMusic.currentTime;
    backgroundMusic.pause();
  } 
  else if (currentMusic === 'challenge') {
    challengeMusicPosition = challengeMusic.currentTime;
    challengeMusic.pause();
  }
  currentMusic = null;
}

// =====================
// CORE GAME SYSTEM
// =====================

//SAVE AND LOAD GAME
function saveGame(slot = currentSaveSlot) {
  localStorage.setItem(`scholars_quest_v1_save_slot_${slot}`, JSON.stringify(player));
}

function loadGame(slot = 1) {
  const d = localStorage.getItem(`scholars_quest_v1_save_slot_${slot}`);
  if (!d) return false;
  try {
    player = JSON.parse(d);
    if (!player.stats) initializePlayerStats();
    if (!player.skillCooldowns) player.skillCooldowns = {};
    if (!player.minigameCooldowns) player.minigameCooldowns = {};
    if (!player.explorationData) player.explorationData = null;
    
    // Ensure subjectMastery exists
    if (!player.stats.subjectMastery) {
      player.stats.subjectMastery = {
        physics: { correct: 0, total: 0 },
        math: { correct: 0, total: 0 },
        logic: { correct: 0, total: 0 }
      };
    }
    
    calculateStats();
    updateStatBars();
    document.getElementById("stats").classList.remove("hidden");
    sidebarToggle.style.display = "block";
    
    currentSaveSlot = slot;
    return true;
  } catch (e) {
    console.error("Error loading game:", e);
    return false;
  }
}

function showSlotMenu(slot, hasSave) {
  clearOutput();
  controls.innerHTML = "";
  log(`Slot ${slot} selected.`);
  if (hasSave) {
    addAction("Load Game", () => {
      if (loadGame(slot)) {
        sidebarToggle.style.display = "block";
        showLocation();
      }
    });
    addAction("Delete Game", () => {
      clearOutput();
      controls.innerHTML = "";
      log(`⚠️ Are you sure you want to delete the game in Slot ${slot}?`, true);
      addAction("Yes, Delete It", () => clearSave(slot));
      addAction("No, Go Back", () => showLoadMenu());
    });
  } 
  else {
    log("This slot is empty.");
  }
  addAction("⬅️ Back", showLoadMenu);
}

function clearSave(slot = 1) {
  localStorage.removeItem(`scholars_quest_v1_save_slot_${slot}`);
  if (currentSaveSlot === slot) {
    player = {
      name: "", class: "", totalQuestions: 0, correctAnswers: 0, currentStreak: 0, bestStreak: 0, gold: 150,
      inventory: {"Basic Hint": 3, "Time Extension": 1}, 
      equipped: { focus: null, accessory: null }, 
      location: "Home", level: 1, exp: 0, expToNextLevel: 400, skills: [], 
      minigameCooldowns: {}, skillCooldowns: {}, permanentEffects: {}, goldBonus: 0, shopLevel: 1, 
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
    document.getElementById("stats").classList.add("hidden");
    sidebarToggle.style.display = "none";
  }
  log(`❌ Save slot ${slot} deleted.`, true);
  showLoadMenu();
}

//PLAYER MANAGEMENT - FIXED
function initializePlayerStats() {
  if (!player.stats) {
    player.stats = {
      totalQuestions: 0,
      locationsVisited: player.location ? [player.location] : ["Home"],
      explorationsCompleted: 0,
      itemsPurchased: 0,
      totalGoldEarned: player.gold || 0,
      achievementsUnlocked: 0,
      highestDungeonFloor: 0,
      totalDungeonFloors: 0,
      dungeonAttempts: 0,
      subjectMastery: {
        physics: { correct: 0, total: 0 },
        math: { correct: 0, total: 0 },
        logic: { correct: 0, total: 0 }
      }
    };
  }
  
  // Ensure subjectMastery exists
  if (!player.stats.subjectMastery) {
    player.stats.subjectMastery = {
      physics: { correct: 0, total: 0 },
      math: { correct: 0, total: 0 },
      logic: { correct: 0, total: 0 }
    };
  }
  
  if (!player.stats.locationsVisited || !Array.isArray(player.stats.locationsVisited)) {
    player.stats.locationsVisited = [player.location || "Home"];
  } 
  else if (player.location && !player.stats.locationsVisited.includes(player.location)) {
    player.stats.locationsVisited.push(player.location);
  }
}

function calculateStats() {
  if (!player.class) return;
  
  // Calculate accuracy
  if (player.totalQuestions > 0) {
    player.accuracy = (player.correctAnswers / player.totalQuestions) * 100;
  } else {
    player.accuracy = 0;
  }
  
  // Apply permanent bonuses
  if (player.permanentBonuses && player.permanentBonuses.accuracy) {
    player.accuracy *= (1 + player.permanentBonuses.accuracy);
  }
  
  player.currentStreak = Math.max(player.currentStreak, 0);
  player.bestStreak = Math.max(player.bestStreak, player.currentStreak);
  
  // Calculate gold bonus from prestige
  player.goldBonus = player.permanentBonuses?.goldBonus || 0;
}

function addGold(amount, source = "") {
  if (amount <= 0) return amount;
  const goldBonus = amount * (player.permanentBonuses?.goldBonus || 0);
  const totalGold = amount + Math.floor(goldBonus);
  player.gold += totalGold;
  player.stats.totalGoldEarned = (player.stats.totalGoldEarned || 0) + totalGold;
  
  // Update daily challenge for gold earning
  if (source.includes("study") || source.includes("session") || source.includes("challenge")) {
    checkDailyChallengeProgress("EARN", "gold", totalGold);
  }
  
  return totalGold;
}

function updateStats() {
  if (!player.stats) initializePlayerStats();
  
  const playerName = player.name || "Scholar";
  const playerClass = player.class || "Learner";
  const accuracy = player.accuracy ? Math.round(player.accuracy) : 0;
  
  statsText.innerHTML = `<i class='fas fa-graduation-cap'></i> ${playerName}, The ${playerClass}<br/><br/> Level ${player.level} | <i class='fas fa-coins'></i> Points: ${player.gold}`;
  updateStatBars();
  
  if (player.name) {
    document.getElementById("stats").classList.remove("hidden");
  }
}

function updateStatBars() {
  // Accuracy bar
  const accuracyPercent = Math.min(100, Math.max(0, player.accuracy || 0));
  accuracyBarFill.style.width = accuracyPercent + "%";
  accuracyBarText.innerHTML = `<i class='fas fa-chart-line'></i> Accuracy: ${Math.round(accuracyPercent)}%`;
  
  // Streak bar (capped at 10 for display)
  const streakPercent = Math.min(100, (player.currentStreak / 10) * 100);
  streakBarFill.style.width = streakPercent + "%";
  streakBarText.innerHTML = `<i class='fas fa-fire'></i> Streak: ${player.currentStreak} (Best: ${player.bestStreak})`;
  
  // Level bar
  const expPercent = player.expToNextLevel > 0 ? (player.exp / player.expToNextLevel) * 100 : 0;
  levelBarFill.style.width = expPercent + "%";
  levelBarText.innerHTML = `<i class='fas fa-graduation-cap'></i> Level ${player.level}: ${player.exp} / ${player.expToNextLevel} XP`;
}

function gainExp(amount) {
  const scaledAmount = amount;
  player.exp += scaledAmount;
  
  while (player.exp >= player.expToNextLevel && player.expToNextLevel > 0) {
    player.exp -= player.expToNextLevel;
    player.level++;
    const baseMultiplier = 1.4 + (player.level * 0.03);
    player.expToNextLevel = Math.floor(player.expToNextLevel * baseMultiplier);
    
    log(`⬆️ LEVEL UP! You are now level ${player.level}!`, true);
    
    // Unlock new skills at certain levels
    const newSkill = skillUnlocks[player.class][player.level];
    if (newSkill && !player.skills.find(s => s.name === newSkill.name)) {
      log(`✨ New Ability Available: ${newSkill.name} – ${newSkill.desc}`, true);
    }
    
    // Unlock Infinite Mode at level 5
    if (player.level >= 5 && !player.stats.locationsVisited.includes("Infinite Mode")) {
      log(`📍 New location unlocked: Infinite Mode!`, true);
      player.stats.locationsVisited.push("Infinite Mode");
    }
    
    updateStatBars();
  }
  
  updateStatBars();
  updateStats();
}

function addItemToInventory(item, qty = 1, options = {}) {
  if (!item) {
    console.warn("Attempted to add undefined item to inventory");
    return;
  }
  
  const def = shopItems[item];
  if (def && def.unique && player.inventory[item] >= 1) {
    return; 
  }
  
  player.inventory[item] = (player.inventory[item] || 0) + qty;
  if (!options.silent) log(`<i class='fas fa-gift'></i> Received ${item} x${qty}`, true);
  
  saveGame();
  updateStats();
}

//LOCATION AND TRAVEL SYSTEM - UPDATED WITH NEW NAMES
function showLocation() {
  clearOutput();
  controls.innerHTML = "";
  updateMiniMap();
  log(`📍 You are in ${player.location}`, true);
  updateStats();
  
  // Hide sidebar toggle in main menu
  if (player.location === "Home") {
    sidebarToggle.style.display = "block";
  }
  
  if (player.location === "Home") {
    log("\n🏠 Welcome to your Home Library!", true);
    log("This is your central hub for all scholarly activities.", true);
    
    addAction("<i class='fas fa-store'></i> Study Aids Shop", () => shopMenu());
    addAction("<i class='fas fa-book'></i> Travel to Study", showTravelMenu);
    addAction("<i class='fas fa-tools'></i> Crafting Station", showCrafting);
    addAction("<i class='fas fa-chart-bar'></i> View Statistics", showStatistics);
  } 
  else {
    const explorationCooldown = player.minigameCooldowns.exploration;
    const now = Date.now();
    const canExplore = !explorationCooldown || now >= explorationCooldown;
    
    const exploreBtn = document.createElement("button");
    exploreBtn.innerHTML = canExplore ? `<i class='fas fa-book'></i> Study Session (5 Questions)` : `<i class='fas fa-clock'></i> Study (${Math.ceil((explorationCooldown - now) / 1000)}s)`;
    exploreBtn.disabled = !canExplore;
    exploreBtn.onclick = () => startExploration();
    
    controls.appendChild(exploreBtn);
    
    if (player.location !== "Infinite Mode") {
      addAction("<i class='fas fa-store'></i> Study Aids Shop", () => shopMenu());
      addAction("<i class='fas fa-home'></i> Return Home", () => travelTo("Home"));
    }
    
    if (player.location === "Infinite Mode") {
      showInfiniteMode();
    }
  }
}

function showCrafting() {
  clearOutput();
  controls.innerHTML = "";
  log("<i class='fas fa-tools'></i> Crafting Station", true);
  log("Combine study aids to create powerful items!", true);
  log("\nAvailable Recipes:", true);
  log("• 2x Basic Hint + 50g = Advanced Hint", true);
  log("• 3x Time Extension + 100g = Chrono Pendant", true);
  log("• 1x Streak Shield + 2x Topic Focus = Scholar's Medallion", true);
  
  addAction("⬅️ Back", showLocation);
}

function showStatistics() {
  clearOutput();
  controls.innerHTML = "";
  log("<i class='fas fa-chart-bar'></i> Detailed Statistics", true);
  
  const stats = player.stats || {};
  const mastery = stats.subjectMastery || {};
  
  log(`\n📚 Overall Progress:`, true);
  log(`• Best Streak: ${player.bestStreak || 0}\n• Total Questions: ${stats.totalQuestions || 0}\n• Correct Answers: ${player.correctAnswers || 0}\n• Accuracy: ${player.accuracy ? Math.round(player.accuracy) : 0}%`, true);
  
  log(`\n🏆 Exploration:`, true);
  log(`• Locations Visited: ${stats.locationsVisited?.length || 1}\n• Study Sessions: ${stats.explorationsCompleted || 0}\n• Total Points Earned: ${stats.totalGoldEarned || 0}`, true);
  
  log(`\n🎯 Subject Mastery:`, true);
  log(`• Physics: ${mastery.physics?.correct || 0}/${mastery.physics?.total || 0} (${mastery.physics?.total ? Math.round((mastery.physics.correct/mastery.physics.total)*100) : 0}%)\n• Mathematics: ${mastery.math?.correct || 0}/${mastery.math?.total || 0} (${mastery.math?.total ? Math.round((mastery.math.correct/mastery.math.total)*100) : 0}%)\n• Logic: ${mastery.logic?.correct || 0}/${mastery.logic?.total || 0} (${mastery.logic?.total ? Math.round((mastery.logic.correct/mastery.logic.total)*100) : 0}%)`, true);
  
  addAction("⬅️ Back", showLocation);
}

function travelTo(newLocation) {
  if (!player.stats) initializePlayerStats();
  if (!player.stats.locationsVisited) {
    player.stats.locationsVisited = ["Home"];
  }
  
  // Check level requirements - Only Infinite Mode is locked
  if (newLocation === "Infinite Mode" && player.level < infiniteMode.minLevel) {
    log(`❌ You must be at least level ${infiniteMode.minLevel} to enter Infinite Mode!`, true);
    return;
  }
  
  if (!player.stats.locationsVisited.includes(newLocation)) {
    player.stats.locationsVisited.push(newLocation);
  }
  
  player.location = newLocation;
  saveGame();
  showLocation();
}

function showTravelMenu() {
  const popup = document.getElementById("travel-popup");
  const optionsDiv = document.getElementById("travel-options");
  const closeBtn = document.getElementById("travel-close");
  optionsDiv.innerHTML = "";
  
  locations.filter(loc => loc !== "").forEach(loc => {
    if (loc === "Infinite Mode") {
      const isUnlocked = player.level >= infiniteMode.minLevel;
      const btn = document.createElement("button");
      btn.innerHTML = isUnlocked ? `${loc}` : `<i class='fas fa-lock'></i> ${loc} (Level ${infiniteMode.minLevel})`;
      btn.disabled = !isUnlocked;
      btn.onclick = () => {
        if (isUnlocked) {
          travelTo(loc);
          popup.classList.add("hidden");
        }
      };
      optionsDiv.appendChild(btn);
    } 
    else if (loc === "Home") {
      const btn = document.createElement("button");
      btn.textContent = loc;
      btn.onclick = () => {
        travelTo(loc);
        popup.classList.add("hidden");
      };
      optionsDiv.appendChild(btn);
    }
    else {
      // Physics, Mathematics, Logic are always accessible
      const btn = document.createElement("button");
      btn.textContent = loc;
      btn.onclick = () => {
        travelTo(loc);
        popup.classList.add("hidden");
      };
      optionsDiv.appendChild(btn);
    }
  });
  
  closeBtn.addEventListener("click",()=>{
    popup.classList.add("hidden");
    showLocation();
  })
  popup.classList.remove("hidden");
}

function updateMiniMap() {
  miniMap.innerHTML = "";
  locations.forEach(loc => {
    const node = document.createElement("div");
    node.classList.add("map-node");
    if (loc === player.location) node.classList.add("map-current");
    
    if (loc === "Infinite Mode" && player.level < infiniteMode.minLevel) {
      node.innerHTML = `${loc} <i class='fas fa-lock'></i>`;
    } else {
      node.textContent = loc;
    }
    
    miniMap.appendChild(node);
  });
}

//EXPLORATION SYSTEM
function startExploration() {
  clearOutput();
  controls.innerHTML = "";
  log(`📚 You begin a study session in ${player.location}!`, true);
  player.explorationData = { 
    wave: 1, 
    questions: [], 
    answers: [], 
    points: 0, 
    exp: 0,
    startTime: Date.now()
  };
  
  // Get 5 questions from the current location
  const availableQuestions = questions[player.location] || [];
  if (availableQuestions.length === 0) {
    log("❌ No questions available in this location.", true);
    showLocation();
    return;
  }
  
  // Randomly select 5 questions (or all if less than 5)
  for (let i = 0; i < Math.min(5, availableQuestions.length); i++) {
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    player.explorationData.questions.push({...availableQuestions[randomIndex]});
  }
  
  proceedToNextQuestion();
}

function proceedToNextQuestion() {
  const session = player.explorationData;
  
  if (session.wave > 5 || session.wave > session.questions.length) {
    endStudySession();
    return;
  }
  
  waitingForNext = false;
  playChallengeMusic();
  currentQuestion = session.questions[session.wave - 1];
  questionStartTime = Date.now();
  
  clearOutput();
  log(`--- Question ${session.wave} of 5 ---`, true);
  
  // Display question
  const questionContainer = document.createElement("div");
  questionContainer.className = "question-container";
  
  const subjectLabel = document.createElement("div");
  subjectLabel.className = `question-subject subject-${currentQuestion.subject}`;
  subjectLabel.textContent = currentQuestion.subject.toUpperCase();
  questionContainer.appendChild(subjectLabel);
  
  // Add Study Aid button
  const studyAidBtn = document.createElement("button");
  studyAidBtn.innerHTML = "<i class='fas fa-lightbulb'></i>";
  studyAidBtn.className = "study-aid-btn";
  studyAidBtn.onclick = () => showStudyAidUsage();
  questionContainer.appendChild(studyAidBtn);
  
  const questionText = document.createElement("div");
  questionText.className = "question-text";
  questionText.textContent = currentQuestion.question;
  questionContainer.appendChild(questionText);
  
  output.appendChild(questionContainer);
  
  // Display answer options
  controls.innerHTML = "";
  
  currentQuestion.options.forEach((option, index) => {
    const answerBtn = document.createElement("button");
    answerBtn.className = "answer-option";
    answerBtn.textContent = option;
    answerBtn.onclick = () => submitAnswer(index);
    controls.appendChild(answerBtn);
  });
  
  // Start timer (30 seconds)
  questionTimer.style.display = "block";
  questionTimerFill.style.width = "100%";
  let timeLeft = 30;
  questionTimerText.textContent = `${timeLeft}s`;
  
  if (questionTimerInterval) clearInterval(questionTimerInterval);
  
  questionTimerInterval = setInterval(() => {
    timeLeft--;
    const percent = (timeLeft / 30) * 100;
    questionTimerFill.style.width = percent + "%";
    questionTimerText.textContent = `${timeLeft}s`;
    
    if (timeLeft <= 0) {
      clearInterval(questionTimerInterval);
      timeOutQuestion();
    }
  }, 1000);
}

function submitAnswer(selectedIndex) {
  if (waitingForNext) return; // Prevent multiple clicks
  
  clearInterval(questionTimerInterval);
  questionTimer.style.display = "none";
  waitingForNext = true;
  
  const session = player.explorationData;
  const isCorrect = selectedIndex === currentQuestion.correct;
  const answerTime = Date.now() - questionStartTime;
  const timeBonus = Math.max(0, 30 - (answerTime / 1000));
  
  // Calculate points with 50% reduction
  let basePoints = Math.floor(currentQuestion.difficulty * 12.5); // Reduced from 25
  let timePoints = Math.floor(timeBonus * 1); // Reduced from 2
  let streakBonus = Math.floor(player.currentStreak * 3); // Reduced from 5
  let totalPoints = basePoints + timePoints + streakBonus;
  
  if (isCorrect) {
    totalPoints = Math.floor(totalPoints * 1.5); // Keep 1.5x multiplier
    
    player.correctAnswers++;
    player.currentStreak++;
    
    // Update subject mastery
    if (!player.stats.subjectMastery[currentQuestion.subject]) {
      player.stats.subjectMastery[currentQuestion.subject] = { correct: 0, total: 0 };
    }
    player.stats.subjectMastery[currentQuestion.subject].correct++;
    player.stats.subjectMastery[currentQuestion.subject].total++;
    
    // Update daily challenge progress
    checkDailyChallengeProgress("ANSWER", currentQuestion.subject, 1);
    if (player.currentStreak >= 3) {
      checkDailyChallengeProgress("STREAK", "streak", 1);
    }
    
    log(`✅ Correct: ${currentQuestion.options[currentQuestion.correct]}`, true);
  } else {
    // Check for streak protection
    if (player.streakProtected) {
      log(`🛡️ Streak protected! Your streak remains at ${player.currentStreak}.`, true);
      player.streakProtected = false;
    } else {
      player.currentStreak = 0;
    }
    
    // Add shake animation to incorrect answer
    const answerButtons = document.querySelectorAll('.answer-option');
    if (answerButtons[selectedIndex]) {
      answerButtons[selectedIndex].classList.add('incorrect-shake');
    }
    
    // Update subject mastery
    if (!player.stats.subjectMastery[currentQuestion.subject]) {
      player.stats.subjectMastery[currentQuestion.subject] = { correct: 0, total: 0 };
    }
    player.stats.subjectMastery[currentQuestion.subject].total++;
    
    log(`❌ Incorrect.`, true);
  }
  
  player.totalQuestions++;
  player.stats.totalQuestions++;
  
  // Highlight correct answer
  const answerButtons = document.querySelectorAll('.answer-option');
  answerButtons.forEach((btn, index) => {
    if (index === currentQuestion.correct) {
      btn.classList.add('answer-correct');
    } else if (index === selectedIndex && !isCorrect) {
      btn.classList.add('answer-incorrect');
    }
    btn.disabled = true;
  });
  
  // Show explanation
  const explanationBox = document.createElement("div");
  explanationBox.style.fontSize = "3vmin";
  explanationBox.className = "explanation-box";
  explanationBox.textContent = currentQuestion.explanation;
  output.appendChild(explanationBox);
  
  // Update session data
  session.answers.push({ 
    questionId: currentQuestion.id, 
    correct: isCorrect, 
    points: totalPoints,
    time: answerTime 
  });
  session.points += totalPoints;
  session.exp += Math.floor(totalPoints / 20); // Reduced from 10
  
  // Update achievements
  checkAchievements();
  
  // Clear the answer options
  setTimeout(() => {
    controls.innerHTML = "";
    
    // Check if this is the last question
    const isLastQuestion = session.wave >= 5;
    
    if (!isLastQuestion) {
      // Show Next button for questions 1-4
      const nextBtn = document.createElement("button");
      nextBtn.innerHTML = "<i class='fas fa-forward'></i> Next Question";
      nextBtn.style.fontSize = "4vmin";
      nextBtn.style.padding = "2vmin 3vmin";
      nextBtn.style.marginTop = "3vmin";
      nextBtn.onclick = () => {
        session.wave++;
        if (session.wave <= 5 && session.wave <= session.questions.length) {
          proceedToNextQuestion();
        } else {
          endStudySession();
        }
      };
      controls.appendChild(nextBtn);
    } else {
      // For the last question (question 5), wait a bit then auto-proceed to session results
      log("\n📊 Session complete! Showing results...", true);
      setTimeout(() => {
        session.wave++;
        endStudySession();
      }, 3000);
    }
  }, 1000);
}

function timeOutQuestion() {
  if (waitingForNext) return;
  
  questionTimer.style.display = "none";
  waitingForNext = true;
  
  const session = player.explorationData;
  player.totalQuestions++;
  player.stats.totalQuestions++;
  player.currentStreak = 0;
  
  // Update subject mastery
  if (!player.stats.subjectMastery[currentQuestion.subject]) {
    player.stats.subjectMastery[currentQuestion.subject] = { correct: 0, total: 0 };
  }
  player.stats.subjectMastery[currentQuestion.subject].total++;
  
  log(`⏰ Time's up!`, true);
  
  // Highlight correct answer
  const answerButtons = document.querySelectorAll('.answer-option');
  answerButtons.forEach((btn, index) => {
    if (index === currentQuestion.correct) {
      btn.classList.add('answer-correct');
    }
    btn.disabled = true;
  });
  
  // Show explanation
  const explanationBox = document.createElement("div");
  explanationBox.style.fontSize = "3vmin";
  explanationBox.className = "explanation-box";
  explanationBox.textContent = currentQuestion.explanation;
  output.appendChild(explanationBox);
  
  // Update session data
  session.answers.push({ 
    questionId: currentQuestion.id, 
    correct: false, 
    points: 0,
    time: 30000,
    timeout: true 
  });
  
  // Clear the answer options
  setTimeout(() => {
    controls.innerHTML = "";
    
    // Check if this is the last question
    const isLastQuestion = session.wave >= 5;
    
    if (!isLastQuestion) {
      // Show Next button for questions 1-4
      const nextBtn = document.createElement("button");
      nextBtn.innerHTML = "<i class='fas fa-forward'></i> Next Question";
      nextBtn.style.fontSize = "4vmin";
      nextBtn.style.padding = "2vmin 3vmin";
      nextBtn.style.marginTop = "3vmin";
      nextBtn.onclick = () => {
        session.wave++;
        if (session.wave <= 5 && session.wave <= session.questions.length) {
          proceedToNextQuestion();
        } else {
          endStudySession();
        }
      };
      controls.appendChild(nextBtn);
    } else {
      // For the last question (question 5), wait a bit then auto-proceed to session results
      log("\n📊 Session complete! Showing results...", true);
      setTimeout(() => {
        session.wave++;
        endStudySession();
      }, 3000);
    }
  }, 1000);
}

function endStudySession() {
  clearOutput();
  const session = player.explorationData;
  
  log(`--- Study Session Complete! ---`, true);
  log(`📚 Study session in ${player.location} finished.`, true);
  
  if (!player.stats) initializePlayerStats();
  player.stats.explorationsCompleted = (player.stats.explorationsCompleted || 0) + 1;
  
  // Calculate session stats
  const correctAnswers = session.answers.filter(a => a.correct).length;
  const totalQuestions = session.questions.length;
  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  
  log(`\n📊 Session Results:`, true);
  log(`✅ Correct Answers: ${correctAnswers}/${totalQuestions} (${Math.round(accuracy)}%)`, true);
  log(`💰 Total Points: ${session.points}`, true);
  log(`✨ Total EXP: ${session.exp}`, true);
  
  // Award points and experience (reduced)
  addGold(session.points, "Study session");
  gainExp(session.exp);
  
  // Special bonus for perfect session (reduced)
  if (correctAnswers === totalQuestions) {
    const perfectBonus = Math.floor(session.points * 0.25); // Reduced from 0.5
    addGold(perfectBonus, "Perfect session bonus");
    log(`🎉 Perfect Session Bonus: +${perfectBonus} points!`, true);
  }
  
  // Set cooldown
  if (!player.minigameCooldowns) player.minigameCooldowns = {};
  player.minigameCooldowns.exploration = Date.now() + 60000;
  
  player.explorationData = null;
  playBackgroundMusic();
  saveGame();
  
  // Return to appropriate location
  if (player.location === "Infinite Mode") {
    addAction("Continue Challenge", showInfiniteMode);
  } else {
    addAction("Continue Learning", showLocation);
  }
}

//INFINITE MODE
function showInfiniteMode() {
  clearOutput();
  controls.innerHTML = "";
  
  if (player.level < infiniteMode.minLevel) {
    log(`❌ You must be at least level ${infiniteMode.minLevel} to enter Infinite Mode!`, true);
    addAction("⬅️ Back", showTravelMenu);
    return;
  }
  
  log(`🌀 Infinite Mode`, true);
  log("Test your knowledge with endless questions from all subjects!", true);
  log(`\n📊 Requirements: Level ${infiniteMode.minLevel}+`, true);
  
  const highestFloor = player.stats?.highestDungeonFloor || 0;
  if (highestFloor > 0) {
    log(`\n🏆 Your record: Floor ${highestFloor}`, true);
  }
  
  addAction("Enter Challenge", startInfiniteMode);
  addAction("⬅️ Back", showTravelMenu);
}

function startInfiniteMode() {
  clearOutput();
  controls.innerHTML = "";
  player.infiniteModeSession = {
    currentFloor: 1,
    accumulatedGold: 0,
    accumulatedExp: 0,
    accumulatedItems: {},
    bossesDefeated: 0,
    startTime: Date.now()
  };
  
  log(`🌀 You enter Infinite Mode...`, true);
  log(`Floor 1 begins!`, true);
  playChallengeMusic();
  proceedToNextInfiniteFloor();
}

function proceedToNextInfiniteFloor() {
  const session = player.infiniteModeSession;
  const floor = session.currentFloor;
  
  // Get questions from Infinite Mode pool
  const availableQuestions = questions["Infinite Mode"] || [];
  if (availableQuestions.length === 0) {
    log("❌ No questions available for Infinite Mode!", true);
    showInfiniteMode();
    return;
  }
  
  // Select question based on floor difficulty
  let questionPool = availableQuestions;
  if (floor <= 5) {
    // Easy: difficulty 1
    questionPool = availableQuestions.filter(q => q.difficulty === 1);
  } else if (floor <= 10) {
    // Medium: difficulty 2
    questionPool = availableQuestions.filter(q => q.difficulty === 2);
  } else {
    // Hard: difficulty 3
    questionPool = availableQuestions.filter(q => q.difficulty === 3);
  }
  
  // Fallback to any question if pool is empty
  if (questionPool.length === 0) {
    questionPool = availableQuestions;
  }
  
  const questionIndex = Math.floor(Math.random() * questionPool.length);
  currentQuestion = {...questionPool[questionIndex]};
  
  questionStartTime = Date.now();
  
  clearOutput();
  log(`--- Floor ${floor} ---`, true);
  log(`Difficulty: ${floor <= 5 ? "Easy" : floor <= 10 ? "Medium" : "Hard"}`, true);
  
  // Display question
  const questionContainer = document.createElement("div");
  questionContainer.className = "question-container";
  
  const subjectLabel = document.createElement("div");
  subjectLabel.className = `question-subject subject-${currentQuestion.subject}`;
  subjectLabel.textContent = currentQuestion.subject.toUpperCase();
  questionContainer.appendChild(subjectLabel);
  
  const questionText = document.createElement("div");
  questionText.className = "question-text";
  questionText.textContent = currentQuestion.question;
  questionContainer.appendChild(questionText);
  
  output.appendChild(questionContainer);
  
  // Display answer options
  controls.innerHTML = "";
  
  // Add Study Aid button for Infinite Mode too
  const studyAidBtn = document.createElement("button");
  studyAidBtn.innerHTML = "<i class='fas fa-lightbulb'></i> Use Study Aid";
  studyAidBtn.style.background = "linear-gradient(45deg,#664,#886,#664)";
  studyAidBtn.style.marginBottom = "2vmin";
  studyAidBtn.onclick = () => showStudyAidUsage();
  controls.appendChild(studyAidBtn);
  
  currentQuestion.options.forEach((option, index) => {
    const answerBtn = document.createElement("button");
    answerBtn.className = "answer-option";
    answerBtn.textContent = option;
    answerBtn.onclick = () => submitInfiniteAnswer(index);
    controls.appendChild(answerBtn);
  });
}

function submitInfiniteAnswer(selectedIndex) {
  const session = player.infiniteModeSession;
  const isCorrect = selectedIndex === currentQuestion.correct;
  
  if (isCorrect) {
    session.currentFloor++;
    session.bossesDefeated++;
    
    // Calculate rewards with 40% reduction
    const baseGold = Math.floor(infiniteMode.rewards.baseGold * Math.pow(infiniteMode.rewards.scaling, session.bossesDefeated - 1));
    const baseExp = Math.floor(infiniteMode.rewards.baseExp * Math.pow(infiniteMode.rewards.scaling, session.bossesDefeated - 1));
    
    session.accumulatedGold += baseGold;
    session.accumulatedExp += baseExp;
    
    log(`✅ Correct! Floor ${session.currentFloor - 1} cleared!`, true);
    log(`💰 +${baseGold} points`, true);
    log(`✨ +${baseExp} EXP`, true);
    
    // Update highest floor
    if (!player.stats.highestDungeonFloor || session.currentFloor - 1 > player.stats.highestDungeonFloor) {
      player.stats.highestDungeonFloor = session.currentFloor - 1;
    }
    
    // Clear and show Next button
    setTimeout(() => {
      controls.innerHTML = "";
      
      const nextBtn = document.createElement("button");
      nextBtn.innerHTML = "<i class='fas fa-forward'></i> Next Floor";
      nextBtn.style.fontSize = "4vmin";
      nextBtn.style.padding = "2.5vmin 4vmin";
      nextBtn.style.marginTop = "3vmin";
      nextBtn.onclick = () => {
        proceedToNextInfiniteFloor();
      };
      controls.appendChild(nextBtn);
    }, 2000);
  } else {
    log(`❌ Incorrect! Challenge ended.`, true);
    endInfiniteModeSession(false);
  }
}

function endInfiniteModeSession(voluntaryExit = false) {
  const session = player.infiniteModeSession;
  clearOutput();
  
  if (voluntaryExit) {
    log(`🏃 You wisely decide to leave Infinite Mode.`, true);
  } 
  else {
    log(`💀 You have been defeated in Infinite Mode!`, true);
  }
  
  log(`\n🎉 CHALLENGE RESULTS:`, true);
  log(`• Floors Cleared: ${session.bossesDefeated}`, true);
  log(`• Total Points Earned: ${session.accumulatedGold}`, true);
  log(`• Total EXP Earned: ${session.accumulatedExp}`, true);
  
  if (session.accumulatedGold > 0) {
    addGold(session.accumulatedGold, "Infinite Mode");
  }
  if (session.accumulatedExp > 0) {
    gainExp(session.accumulatedExp);
  }
  
  player.minigameCooldowns.infiniteMode = Date.now();
  delete player.infiniteModeSession;
  playBackgroundMusic();
  
  if (!player.stats.totalDungeonFloors) player.stats.totalDungeonFloors = 0;
  player.stats.totalDungeonFloors += session.bossesDefeated;
  
  if (!player.stats.dungeonAttempts) player.stats.dungeonAttempts = 0;
  player.stats.dungeonAttempts++;
  
  addAction("Return to Adventure", showLocation);
}