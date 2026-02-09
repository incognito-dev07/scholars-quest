// =====================
// UI HELPERS
// =====================

//UI/UX HELPERS
function log(text, isBold = false) {
  const line = document.createElement("p");
  line.innerHTML = isBold ? `<strong>${text}</strong>` : text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function clearOutput() { 
  output.textContent = ""; 
}

function addAction(text, handler) { 
  controls.appendChild(createButton(text, handler)); 
}

function createButton(text, handler) {
  const btn = document.createElement("button");
  btn.innerHTML = text;
  btn.onclick = () => { 
    clearOutput(); 
    controls.innerHTML = ""; 
    handler(); 
  };
  return btn;
}

//SIDEBAR FUNCTIONS
function openSidebar() {
  document.getElementById("sidebar").style.left = "0px";
}
function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.style.left = "-240px";
  }
}
function isInQuiz() {
  return questionTimer.style.display === "block" && questionTimer.style.display !== "none";
}
function openAchievementsFromSidebar() {
  if (isInQuiz()) {
    log("❌ Cannot open achievements during a quiz!", true);
    return;
  }
  closeSidebar();
  setTimeout(showAchievements, 300);
}
function openDailyChallengeFromSidebar() {
  if (isInQuiz()) {
    log("❌ Cannot open daily challenges during a quiz!", true);
    return;
  }
  closeSidebar();
  setTimeout(showDailyChallenge, 300);
}
function openInventoryFromSidebar() {
  if (isInQuiz()) {
    log("❌ Cannot open inventory during a quiz!", true);
    return;
  }
  closeSidebar();
  setTimeout(showInventory, 300);
}
function openSkillsFromSidebar() {
  if (isInQuiz()) {
    log("❌ Cannot open abilities during a quiz!", true);
    return;
  }
  closeSidebar();
  setTimeout(showSkills, 300);
}
function openAudioFromSidebar() {
  if (isInQuiz()) {
    log("❌ Cannot open audio during a quiz!",true);
    return;
  }
  closeSidebar();
  setTimeout(showAudioSettings, 300);
}
function openTutorialFromSidebar() {
  if (isInQuiz()) {
    log("❌ Cannot open tutorial during a quiz!", true);
    return;
  }
  closeSidebar();
  setTimeout(showTutorial, 300);
}
function openCreditsFromSidebar() {
  if (isInQuiz()) {
    log("❌ Cannot open credits during a quiz!", true);
    return;
  }
  closeSidebar();
  setTimeout(showCredits, 300);
}
function openExitFromSidebar() {
  exitContainer.style.display = "block";
}
function confirmExit() {
  exitContainer.style.display = "none";
  questionTimer.style.display = "none";
  document.getElementById("stats").classList.add("hidden");
  sidebarToggle.style.display = "none";
  closeSidebar();
  setTimeout(mainMenu, 300);
}
function cancelExit() {
  exitContainer.style.display = "none";
}

//MENU SYSTEM
function showInventory() {
  clearOutput();
  controls.innerHTML = "";
  log("<i class='fas fa-briefcase'></i> Study Aids Inventory", true);
  
  const equippedFocus = player.equipped.focus ? shopItems[player.equipped.focus]?.icon + " " + player.equipped.focus : "None";
  const equippedAccessory = player.equipped.accessory ? shopItems[player.equipped.accessory]?.icon + " " + player.equipped.accessory : "None";
  
  log(`--- Equipped ---`, true);
  log(`<i class='fas fa-eye'></i> Focus: ${equippedFocus}\n <i class='fas fa-gem'></i> Accessory: ${equippedAccessory}`, true);
  
  if (player.equipped.focus) addAction(`Unequip Focus`, () => {
    player.equipped.focus = null;
    calculateStats();
    saveGame();
    showInventory();
  });
  if (player.equipped.accessory) addAction(`Unequip Accessory`, () => {
    player.equipped.accessory = null;
    calculateStats();
    saveGame();
    showInventory();
  });
  
  const categories = {
    "<i class='fas fa-eye'></i> Focus Items": [],
    "<i class='fas fa-gem'></i> Accessories": [],
    "<i class='fas fa-lightbulb'></i> Hints": [],
    "<i class='fas fa-clock'></i> Time Aids": [],
    "<i class='fas fa-shield-alt'></i> Protection": [],
    "<i class='fas fa-bullseye'></i> Focus Tools": [],
    "<i class='fas fa-forward'></i> Utility": []
  };
  
  for (const item in player.inventory) {
    const qty = player.inventory[item];
    if (qty <= 0) continue;
    const details = shopItems[item] || {};
    
    if (item === player.equipped.focus || item === player.equipped.accessory) {
      continue;
    }
    
    if (details.type === "consumable") {
      if (details.category === "Hints") categories["<i class='fas fa-lightbulb'></i> Hints"].push({item, qty, details});
      else if (details.category === "Time") categories["<i class='fas fa-clock'></i> Time Aids"].push({item, qty, details});
      else if (details.category === "Protection") categories["<i class='fas fa-shield-alt'></i> Protection"].push({item, qty, details});
      else if (details.category === "Focus") categories["<i class='fas fa-bullseye'></i> Focus Tools"].push({item, qty, details});
      else if (details.category === "Utility") categories["<i class='fas fa-forward'></i> Utility"].push({item, qty, details});
      else categories["<i class='fas fa-lightbulb'></i> Hints"].push({item, qty, details});
    } else if (details.type === "focus") {
      categories["<i class='fas fa-eye'></i> Focus Items"].push({item, qty, details});
    } else if (details.type === "accessory") {
      categories["<i class='fas fa-gem'></i> Accessories"].push({item, qty, details});
    }
  }
  
  let hasItems = false;
  Object.entries(categories).forEach(([categoryName, items]) => {
    if (items.length > 0) {
      hasItems = true;
      createCategoryAccordion(categoryName, items);
    }
  });
  
  if (!hasItems) {
    log("Inventory is empty.", true);
  }
  
  addAction("⬅️ Back", () => showLocation());
}

function createCategoryAccordion(categoryName, items) {
  const accordion = document.createElement("div");
  accordion.className = "accordion";
  
  const accordionHeader = document.createElement("button");
  accordionHeader.className = "accordion-header";
  accordionHeader.innerHTML = `
    <span>${categoryName} (${items.length})</span>
    <span class="accordion-icon"><i class='fas fa-chevron-down'></i></span>
  `;
  
  const accordionContent = document.createElement("div");
  accordionContent.className = "accordion-content";
  const itemsContainer = document.createElement("div");
  itemsContainer.className = "accordion-items";
  
  items.forEach(({item, qty, details}) => {
    const itemLine = document.createElement("div");
    itemLine.className = "inventory-item-line";
    const displayQty = `x${qty}`;
    
    itemLine.innerHTML = `
      <span class="item-name">${details.icon || ""} ${item} ${displayQty}</span>
      <div class="item-actions">
        ${(categoryName === "<i class='fas fa-eye'></i> Focus Items" || categoryName === "<i class='fas fa-gem'></i> Accessories") ? `<button class="small-btn equip-btn">Equip</button>` : ''}
        <button class="small-btn detail-btn"><i class='fas fa-search'></i></button>
      </div>
    `;
    
    const detailBtn = itemLine.querySelector('.detail-btn');
    detailBtn.onclick = () => showItemDetails(item);
    
    if (categoryName === "<i class='fas fa-eye'></i> Focus Items" || categoryName === "<i class='fas fa-gem'></i> Accessories") {
      const equipBtn = itemLine.querySelector('.equip-btn');
      const equipType = categoryName === "<i class='fas fa-eye'></i> Focus Items" ? "focus" : "accessory";
      equipBtn.onclick = () => { 
        equipItem(item, equipType); 
        showInventory();
      };
    }
    
    itemsContainer.appendChild(itemLine);
  });
  
  accordionContent.appendChild(itemsContainer);
  accordion.appendChild(accordionHeader);
  accordion.appendChild(accordionContent);
  output.appendChild(accordion);
  
  accordionHeader.addEventListener("click", function() {
    const isOpen = accordionContent.classList.contains("open");
    const icon = this.querySelector(".accordion-icon i");
    if (isOpen) {
      accordionContent.classList.remove("open");
      icon.classList.remove("fa-chevron-up");
      icon.classList.add("fa-chevron-down");
    } else {
      accordionContent.classList.add("open");
      icon.classList.remove("fa-chevron-down");
      icon.classList.add("fa-chevron-up");
    }
  });
}

function equipItem(item, type) {
  const details = shopItems[item];
  if (!details || (type === "focus" && details.type !== "focus") || (type === "accessory" && details.type !== "accessory")) {
    log(`❌ ${item} cannot be equipped as ${type}.`, true);
    return;
  }
  
  if (type === "focus") {
    if (player.equipped.focus) log(`You unequipped ${player.equipped.focus}.`, true);
    player.equipped.focus = item;
    log(`<i class='fas fa-eye'></i> Equipped ${item}!`, true);
  } 
  else if (type === "accessory") {
    if (player.equipped.accessory) log(`You unequipped ${player.equipped.accessory}.`, true);
    player.equipped.accessory = item;
    log(`<i class='fas fa-gem'></i> Equipped ${item}!`, true);
  }
  
  calculateStats();
  saveGame();
  updateStats();
}

function shopMenu(activeTab = "buy", shopLevel = player.shopLevel) {
  clearOutput();
  controls.innerHTML = "";
  
  // Create tab buttons
  const buyBtn = createButton("<i class='fas fa-shopping-cart'></i> Buy", () => shopMenu("buy", shopLevel));
  buyBtn.style.background = activeTab === "buy" ? "linear-gradient(45deg,#444,#666,#444)" : "linear-gradient(45deg,#111,#444,#111)";
  buyBtn.style.color = "#ddd";
  
  const sellBtn = createButton("<i class='fas fa-coins'></i> Sell", () => shopMenu("sell", shopLevel));
  sellBtn.style.background = activeTab === "sell" ? "linear-gradient(45deg,#444,#666,#444)" : "linear-gradient(45deg,#111,#444,#111)";
  sellBtn.style.color = "#ddd";
  
  const upgradeBtn = createButton("<i class='fas fa-arrow-up'></i> Upgrade", () => shopMenu("upgrade", shopLevel));
  upgradeBtn.style.background = activeTab === "upgrade" ? "linear-gradient(45deg,#444,#666,#444)" : "linear-gradient(45deg,#111,#444,#111)";
  upgradeBtn.style.color = "#ddd";
  
  controls.appendChild(buyBtn);
  controls.appendChild(sellBtn);
  controls.appendChild(upgradeBtn);
  
  log(`<i class='fas fa-store'></i> Study Aids Shop`, true);
  
  if (activeTab === "buy") {
    log(`Shop Level: ${player.shopLevel}`);
    
    const shopLevelContainer = document.createElement("div");
    shopLevelContainer.className = "shop-level-selector";
    output.appendChild(shopLevelContainer);
    
    for (let i = 1; i <= Object.keys(shopUnlocks).length; i++) {
      const levelBtn = document.createElement("button");
      levelBtn.textContent = `Lv ${i}`;
      levelBtn.onclick = () => shopMenu("buy", i);
      if (i <= player.shopLevel) {
        levelBtn.classList.add('unlocked-shop-level');
      } 
      else {
        levelBtn.classList.add('locked-shop-level');
        levelBtn.disabled = true;
      }
      if (i === shopLevel) levelBtn.classList.add('current-shop-level');
      shopLevelContainer.appendChild(levelBtn);
    }
    
    showShopItems(shopLevel);
  } 
  else if (activeTab === "sell") {
    showSellItems();
  }
  else if (activeTab === "upgrade") {
    showUpgradeOptions();
  }
  
  // Single Back button
  addAction(`⬅️ Back to ${player.location}`, showLocation);
}

function showShopItems(level) {
  let available = {};
  let unlockedItems = shopUnlocks[level] || [];
  unlockedItems.forEach(item => { 
    if (shopItems[item]) available[item] = shopItems[item]; 
  });
  
  Object.keys(available).forEach(item => {
    const details = available[item];
    const qty = player.inventory[item] || 0;
    const line = document.createElement("div");
    line.innerHTML = `${details.icon || ""} ${item} – ${details.price}g (<i class='fas fa-briefcase'></i> ${qty})`;
    
    const detailBtn = document.createElement("button");
    detailBtn.innerHTML = "<i class='fas fa-search'></i>";
    detailBtn.className = "small-btn";
    detailBtn.title = "View details";
    detailBtn.onclick = () => showItemDetails(item);
    line.appendChild(detailBtn);
    
    const btn = document.createElement("button");
    btn.textContent = `Buy`;
    btn.className = "small-btn";
    btn.onclick = () => buyItem(item, 1, level); 
    line.appendChild(btn);
    
    output.appendChild(line);
  });
  
  if (Object.keys(available).length === 0) { 
    log("❌ No items available at this shop level.", true); 
  }
}

function buyItem(item, quantity = 1, currentLevel = player.shopLevel) {
  const d = shopItems[item];
  if (!d) return;
  
  if (d.unique && (player.inventory[item] || 0) >= 1) {
    log(`❌ You can only own one unique item: ${item}`, true);
    return;
  }
  
  const totalPrice = (d.price || 0) * quantity;
  
  if (player.gold >= totalPrice) {
    if (!player.stats) initializePlayerStats();
    player.stats.itemsPurchased = (player.stats.itemsPurchased || 0) + quantity;
  }
  
  if (player.gold >= totalPrice) {
    player.gold -= totalPrice;
    addItemToInventory(item, quantity);
    log(`✅ Bought ${item} x${quantity}!`, true);
  } 
  else {
    log("❌ Not enough points.", true);
  }
  
  shopMenu("buy", currentLevel);
}

function showSellItems() {
  log("Sell your study aids:", true);
  
  let hasItemsToSell = false;
  
  for (const item in player.inventory) {
    const qty = player.inventory[item];
    if (qty <= 0) continue;
    
    const details = shopItems[item];
    if (!details) continue;
    
    hasItemsToSell = true;
    
    const sellPrice = Math.floor(details.price * 0.7); // 70% of purchase price
    const line = document.createElement("div");
    line.innerHTML = `${details.icon || ""} ${item} x${qty} – ${sellPrice}g each`;
    
    const detailBtn = document.createElement("button");
    detailBtn.innerHTML = "<i class='fas fa-search'></i>";
    detailBtn.className = "small-btn";
    detailBtn.title = "View details";
    detailBtn.onclick = () => showItemDetails(item);
    line.appendChild(detailBtn);
    
    const sellOneBtn = document.createElement("button");
    sellOneBtn.textContent = "Sell";
    sellOneBtn.className = "small-btn";
    sellOneBtn.onclick = () => sellItem(item, 1);
    line.appendChild(sellOneBtn);
    
    output.appendChild(line);
  }
  
  if (!hasItemsToSell) {
    log("❌ No items to sell.", true);
  }
}

function sellItem(item, quantity = 1) {
  const details = shopItems[item];
  if (!details) return;
  
  const currentQty = player.inventory[item] || 0;
  if (currentQty < quantity) {
    log(`❌ You don't have enough ${item}.`, true);
    return;
  }
  
  const sellPrice = Math.floor(details.price * 0.7 * quantity);
  player.inventory[item] = currentQty - quantity;
  if (player.inventory[item] <= 0) {
    delete player.inventory[item];
  }
  
  player.gold += sellPrice;
  player.stats.totalGoldEarned = (player.stats.totalGoldEarned || 0) + sellPrice;
  
  log(`✅ Sold ${item} x${quantity} for ${sellPrice} points!`, true);
  saveGame();
  
  // Refresh sell menu
  clearOutput();
  controls.innerHTML = "";
  shopMenu("sell");
}

function showUpgradeOptions() {
  const nextLevel = player.shopLevel + 1;
  const maxLevel = Object.keys(shopUnlocks).length;
  
  if (player.shopLevel >= maxLevel) {
    log("🎉 Your shop is already at maximum level!", true);
    log("No further upgrades available.", true);
    return;
  }
  
  const upgradeCost = 500 * player.shopLevel;
  const newItems = shopUnlocks[nextLevel] || [];
  
  log(`Current Shop Level: ${player.shopLevel}`, true);
  log(`Next Level: ${nextLevel}`, true);
  log(`Upgrade Cost: ${upgradeCost} points`, true);
  
  const upgradeBtn = document.createElement("button");
  upgradeBtn.textContent = `Upgrade Now`;
  upgradeBtn.disabled = player.gold < upgradeCost;
  upgradeBtn.onclick = () => upgradeShop(nextLevel, upgradeCost);
  output.appendChild(upgradeBtn);
}

function upgradeShop(nextLevel, cost) {
  if (player.gold < cost) {
    log("❌ Not enough points to upgrade!", true);
    return;
  }
  
  player.gold -= cost;
  player.shopLevel = nextLevel;
  
  log(`✅ Shop upgraded to Level ${nextLevel}!`, true);
  log(`New items are now available for purchase.`, true);
  
  saveGame();
  shopMenu("upgrade");
}

function showSkills() {
  clearOutput();
  controls.innerHTML = "";
  log("<i class='fas fa-star'></i> Scholar Abilities:", true);
  
  Object.entries(skillUnlocks[player.class]).forEach(([lvl, skill]) => {
    const learned = player.skills.find(s => s.name === skill.name);
    const line = document.createElement("div");
    let skillText = `${skill.name} – ${skill.desc}`;
    
    if (learned) {
      line.innerHTML = `✅ ${skillText}`;
    } 
    else {
      if (player.level >= parseInt(lvl)) {
        line.innerHTML = `⭐ ${skillText}`;
        const learnBtn = document.createElement("button");
        learnBtn.textContent = "Learn";
        learnBtn.className = "small-btn";
        learnBtn.onclick = () => {
          player.skills.push(skill);
          log(`✨ You learned ${skill.name}!`, true);
          saveGame();
          showSkills();
        };
        line.appendChild(learnBtn);
      } 
      else {
        line.innerHTML = `🔒 ${skillText} (Lv ${lvl})`;
      }
    }
    output.appendChild(line);
  });
  
  addAction("⬅️ Back", () => showLocation());
}

function showAudioSettings() {
  clearOutput();
  controls.innerHTML = "";
  log("<i class='fas fa-volume-up'></i> Audio Settings", true);
  
  // Music Volume
  const musicVolContainer = document.createElement("div");
  musicVolContainer.innerHTML = `
    <span>Music Volume:</span>
    <input type="range" id="music-volume-slider-audio" min="0" max="100" value="${player.audioSettings.musicVolume * 100}" style="width: 80%">
  `;
  output.appendChild(musicVolContainer);
  
  // SFX Volume
  const sfxVolContainer = document.createElement("div");
  sfxVolContainer.style.marginBottom = "7vmin";
  sfxVolContainer.innerHTML = `
    <span>SFX Volume:</span>
    <input type="range" id="sfx-volume-slider-audio" min="0" max="100" value="${player.audioSettings.soundEffectsVolume * 100}" style="width: 80%">
  `;
  output.appendChild(sfxVolContainer);
  
  const musicToggle = document.createElement("button");
  musicToggle.className = "sidebar-btn";
  musicToggle.innerHTML = player.audioSettings.musicEnabled ? "<i class='fas fa-volume-up'></i> Music: ON" : "<i class='fas fa-volume-mute'></i> Music: OFF";
  musicToggle.style.marginRight = "2vmin";
  musicToggle.onclick = () => {
    player.audioSettings.musicEnabled = !player.audioSettings.musicEnabled;
    musicToggle.innerHTML = player.audioSettings.musicEnabled ? "<i class='fas fa-volume-up'></i> Music: ON" : "<i class='fas fa-volume-mute'></i> Music: OFF";
    if (player.audioSettings.musicEnabled) {
      if (currentMusic === 'background') {
        playBackgroundMusic();
      } 
      else if (currentMusic === 'challenge') {
        playChallengeMusic();
      } 
      else {
        playBackgroundMusic();
      }
    } 
    else {
      stopAllMusic();
    }
  };
  output.appendChild(musicToggle);
  
  const sfxToggle = document.createElement("button");
  sfxToggle.className = "sidebar-btn";
  sfxToggle.innerHTML = player.audioSettings.soundEffectsEnabled ? "<i class='fas fa-music'></i> SFX: ON" : "<i class='fas fa-volume-mute'></i> SFX: OFF";
  sfxToggle.onclick = () => {
    player.audioSettings.soundEffectsEnabled = !player.audioSettings.soundEffectsEnabled;
    sfxToggle.innerHTML = player.audioSettings.soundEffectsEnabled ? "<i class='fas fa-music'></i> SFX: ON" : "<i class='fas fa-volume-mute'></i> SFX: OFF";
  };
  output.appendChild(sfxToggle);
  
  document.getElementById("music-volume-slider-audio").addEventListener("input", (e) => {
    player.audioSettings.musicVolume = e.target.value / 100;
    backgroundMusic.volume = player.audioSettings.musicVolume;
    challengeMusic.volume = player.audioSettings.musicVolume;
  });
  
  document.getElementById("sfx-volume-slider-audio").addEventListener("input", (e) => {
    player.audioSettings.soundEffectsVolume = e.target.value / 100;
  });
  
  addAction("Save & Back", () => {
    showLocation();
    saveGame();
  });
}

function showTutorial() {
  clearOutput();
  controls.innerHTML = "";
  log("<i class='fas fa-book'></i> Scholar's Quest - Complete Guide", true);
  log("=".repeat(30), true);
  
  log("\n🎮 HOW TO PLAY", true);
  log("1. Choose your scholar class (Physicist, Mathematician, Polymath, or Analyst)", true);
  log("2. Start at Home - your central hub for all activities", true);
  log("3. Travel to different study subjects based on your interests", true);
  log("4. Complete study sessions (5 questions each) to earn points", true);
  log("5. Use points to buy study aids and improve your performance", true);
  
  log("\n📚 STUDY SUBJECTS", true);
  log("<i class='fas fa-home'></i> HOME: Central hub with shop, crafting, and statistics", true);
  log("<i class='fas fa-atom'></i> PHYSICS: Laws of nature and physical principles", true);
  log("<i class='fas fa-calculator'></i> MATHEMATICS: Numbers, patterns, and calculations", true);
  log("<i class='fas fa-brain'></i> LOGIC: Reasoning, patterns, and critical thinking", true);
  log("<i class='fas fa-infinity'></i> INFINITE MODE: Endless challenges (Unlocks at Level 5)", true);
  
  log("\n💡 GAME MECHANICS", true);
  log("• Answer questions correctly to build streaks", true);
  log("• Longer streaks give bonus points", true);
  log("• Complete daily challenges for extra rewards", true);
  log("• Level up to unlock Infinite Mode and new abilities", true);
  log("• Use study aids strategically for difficult questions", true);
  
  log("\n🎯 TIPS FOR SUCCESS", true);
  log("• Start with subjects you're comfortable with", true);
  log("• Maintain streaks - they significantly increase points", true);
  log("• Complete daily challenges every day", true);
  log("• Use Basic Hints when you're unsure of an answer", true);
  log("• Equip focus items and accessories for permanent bonuses", true);
  log("• Don't rush - read explanations to learn from mistakes", true);
  
  log("\n🏆 PROGRESSION", true);
  log("• Level up by earning experience from correct answers", true);
  log("• Each level increases your knowledge points multiplier", true);
  log("• Level 5 unlocks Infinite Mode", true);
  log("• Complete achievements for special rewards", true);
  log("• Track your progress in the statistics section", true);
  
  // Check if we're in main menu or in-game
  if (player.name && player.class) {
    addAction("⬅️ Back", showLocation);
  } else {
    addAction("⬅️ Back to Main Menu", mainMenu);
  }
}

function showCredits() {
  clearOutput();
  controls.innerHTML = "";
  log("<i class='fas fa-scroll'></i> Scholar's Quest Credits", true);
  log("=".repeat(30), true);
  log("\n🎮 GAME DEVELOPMENT", true);
  log("• By: Osasan Olusola Olawumi\n• Nickname: Incognito", true);
  log("\n📚 EDUCATIONAL CONTENT DESIGN", true);
  log("• Physics, Mathematics & Logic\n• Curriculum-Aligned Educational Material\n• Progressive Difficulty System", true);
  log("\n💻 TECHNICAL IMPLEMENTATION", true);
  log("• HTML5, CSS3, and JavaScript\n• Responsive Web Design for All Devices\n• Local Storage Save System\n• Real-Time Progress Tracking", true);
  log("\n📊 SPECIAL THANKS", true);
  log("• To all knowledge seekers and lifelong learners\n• Educators who inspire curiosity\n• The global community of scholars", true);
  
  // Check if we're in main menu or in-game
  if (player.name && player.class) {
    addAction("⬅️ Back", showLocation);
  } else {
    addAction("⬅️ Back to Main Menu", mainMenu);
  }
}

//ITEM POP-UP
function showItemDetails(itemName) {
  const details = shopItems[itemName];
  if (!details) {
    log(`❌ No information available for ${itemName}`, true);
    return;
  }
  
  const popup = document.getElementById("item-popup");
  const title = document.getElementById("item-popup-title");
  const detailsDiv = document.getElementById("item-popup-details");
  const closeBtn = document.getElementById("item-popup-close");
  
  title.textContent = itemName;
  let html = `
    <div style="font-size: 8vmin; text-align: center; margin: 2vmin 0;">${details.icon || "<i class='fas fa-box'></i>"}</div>
    <div class="item-description">${details.description || "A study aid for scholars."}</div>
  `;
  
  if (details.bonus) {
    for (const stat in details.bonus) {
      html += `
        <div class="item-detail-row">
          <span class="item-detail-label">${stat}: +${details.bonus[stat] * 100}%</span>
        </div>
      `;
    }
  }
  
  if (details.price > 0) {
    html += `
      <div class="item-detail-row">
        <span class="item-detail-label">Cost Price: ${details.price} points</span>
      </div>
    `;
  }
  
  detailsDiv.innerHTML = html;
  closeBtn.onclick = () => {
    popup.classList.add("hidden");
  };
  popup.classList.remove("hidden");
}

// STUDY AID USAGE SYSTEM
let currentStudyAidPopup = null;

function showStudyAidUsage() {
  if (!currentQuestion || !player.explorationData) return;
  
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <div class="popup-content" style="width: 80%; max-width: 400px;">
      <h2><i class='fas fa-lightbulb'></i> Use Study Aid</h2>
      <div id="study-aid-options" style="margin: 2vmin 0;"></div>
      <button onclick="closeStudyAidPopup()" style="margin-top: 2vmin;">Cancel</button>
    </div>
  `;
  
  document.body.appendChild(popup);
  currentStudyAidPopup = popup;
  
  const optionsDiv = popup.querySelector("#study-aid-options");
  
  // Get available consumable study aids
  const consumableAids = [];
  for (const item in player.inventory) {
    const qty = player.inventory[item];
    if (qty > 0) {
      const details = shopItems[item];
      if (details && details.type === "consumable") {
        consumableAids.push({item, qty, details});
      }
    }
  }
  
  if (consumableAids.length === 0) {
    optionsDiv.innerHTML = "<p>No study aids available in your inventory.</p>";
    return;
  }
  
  consumableAids.forEach(({item, qty, details}) => {
    const aidBtn = document.createElement("button");
    aidBtn.innerHTML = `${details.icon || "<i class='fas fa-lightbulb'></i>"} ${item} (${qty})`;
    aidBtn.style.width = "100%";
    aidBtn.style.margin = "1vmin 0";
    aidBtn.onclick = () => useStudyAid(item, details);
    optionsDiv.appendChild(aidBtn);
  });
}

function closeStudyAidPopup() {
  if (currentStudyAidPopup) {
    document.body.removeChild(currentStudyAidPopup);
    currentStudyAidPopup = null;
  }
}

function useStudyAid(item, details) {
  if (!currentQuestion) return;
  
  // Check if player has the item
  if (!player.inventory[item] || player.inventory[item] <= 0) {
    log(`❌ You don't have any ${item} left!`, true);
    closeStudyAidPopup();
    return;
  }
  
  // Use the study aid
  player.inventory[item] -= 1;
  if (player.inventory[item] <= 0) {
    delete player.inventory[item];
  }
  
  log(`✅ Used ${item}!`, true);
  
  // Apply the effect based on the aid type
  let effectApplied = false;
  
  if (item === "Basic Hint") {
    // Reveal one incorrect answer
    const incorrectOptions = [];
    currentQuestion.options.forEach((option, index) => {
      if (index !== currentQuestion.correct) {
        incorrectOptions.push(index);
      }
    });
    
    if (incorrectOptions.length > 0) {
      const randomIncorrect = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
      const answerButtons = document.querySelectorAll('.answer-option');
      if (answerButtons[randomIncorrect]) {
        answerButtons[randomIncorrect].style.opacity = "0.5";
        answerButtons[randomIncorrect].style.textDecoration = "line-through";
        answerButtons[randomIncorrect].disabled = true;
        effectApplied = true;
      }
    }
  }
  else if (item === "Time Extension") {
    // Add 15 seconds to timer
    if (questionTimerInterval) {
      const currentText = questionTimerText.textContent;
      const currentSeconds = parseInt(currentText) || 0;
      const newSeconds = currentSeconds + 15;
      questionTimerText.textContent = `${newSeconds}s`;
      
      const percent = (newSeconds / 30) * 100;
      questionTimerFill.style.width = percent + "%";
      effectApplied = true;
    }
  }
  else if (item === "Streak Shield") {
    // This will protect the streak on next wrong answer
    player.streakProtected = true;
    log("<i class='fas fa-shield-alt'></i> Your streak is protected for one wrong answer!", true);
    effectApplied = true;
  }
  else if (item === "Topic Focus") {
    // Note: This would need to be implemented in the question selection logic
    log("<i class='fas fa-bullseye'></i> Next question will be from your chosen subject!", true);
    effectApplied = true;
  }
  else if (item === "Skip Token") {
    // Skip current question
    log("<i class='fas fa-forward'></i> Skipping current question...", true);
    // This would need to be implemented in the question flow
    effectApplied = true;
  }
  
  if (!effectApplied) {
    log("ℹ️ Study aid effect applied!", true);
  }
  
  saveGame();
  closeStudyAidPopup();
}

//ACHIEVEMENTS - FIXED
function checkAchievements() {
  if (!player.achievements) player.achievements = {};
  let newAchievements = 0;
  
  for (const [id, achievement] of Object.entries(achievements)) {
    if (!player.achievements[id] && achievement.check(player)) {
      player.achievements[id] = true;
      player.stats.achievementsUnlocked = (player.stats.achievementsUnlocked || 0) + 1;
      newAchievements++;
      
      if (achievement.reward.gold) {
        player.gold += achievement.reward.gold;
        player.stats.totalGoldEarned = (player.stats.totalGoldEarned || 0) + achievement.reward.gold;
      }
      if (achievement.reward.exp) gainExp(achievement.reward.exp);
      if (achievement.reward.item) addItemToInventory(achievement.reward.item, 1);
      
      log(`🏆 Achievement Unlocked: ${achievement.icon} ${achievement.name}!`, true);
      log(`✨ Rewards Received!`, true);
    }
  }
  
  if (newAchievements > 0) {
    saveGame();
  }
}

function showAchievements() {
  clearOutput();
  controls.innerHTML = "";
  log("<i class='fas fa-trophy'></i> Achievements", true);
  
  const totalAchievements = Object.keys(achievements).length;
  const unlocked = player.stats?.achievementsUnlocked || 0;
  log(`Unlocked: ${unlocked}/${totalAchievements}`, true);
  
  const progressPercent = (unlocked / totalAchievements) * 100;
  const progressBar = document.createElement("div");
  progressBar.style.width = "100%";
  progressBar.style.height = "4vmin";
  progressBar.style.background = "#333";
  progressBar.style.borderRadius = "2vmin";
  progressBar.style.margin = "2vmin 0";
  progressBar.style.overflow = "hidden";
  progressBar.style.position = "relative";
  
  const progressFill = document.createElement("div");
  progressFill.style.height = "100%";
  progressFill.style.width = `${progressPercent}%`;
  progressFill.style.background = "linear-gradient(90deg, #555, #bbb)";
  progressFill.style.transition = "width 0.3s ease";
  
  const progressText = document.createElement("div");
  progressText.style.position = "absolute";
  progressText.style.top = "0";
  progressText.style.left = "0";
  progressText.style.width = "100%";
  progressText.style.height = "100%";
  progressText.style.display = "flex";
  progressText.style.alignItems = "center";
  progressText.style.justifyContent = "center";
  progressText.style.fontSize = "3vmin";
  progressText.style.fontWeight = "bold";
  progressText.style.textShadow = "0.5vmin 0.5vmin 1vmin black";
  progressText.textContent = `${Math.round(progressPercent)}% Complete (${unlocked}/${totalAchievements})`;
  
  progressBar.appendChild(progressFill);
  progressBar.appendChild(progressText);
  output.appendChild(progressBar);
  
  for (const [id, achievement] of Object.entries(achievements)) {
    const unlocked = player.achievements?.[id];
    const status = unlocked ? "✅" : "🔒";
    
    const achievementDiv = document.createElement("div");
    achievementDiv.style.marginBottom = "3vmin";
    achievementDiv.style.padding = "2vmin";
    achievementDiv.style.background = "rgba(0,0,0,0.3)";
    achievementDiv.style.borderRadius = "1vmin";
    achievementDiv.style.border = "0.2vmin solid #444";
    
    const header = document.createElement("div");
    header.innerHTML = `${status} ${achievement.icon} ${achievement.name}`;
    header.style.fontWeight = "bold";
    header.style.fontSize = "3.5vmin";
    header.style.marginBottom = "1vmin";
    achievementDiv.appendChild(header);
    
    const desc = document.createElement("div");
    desc.textContent = achievement.desc;
    desc.style.marginBottom = "1.5vmin";
    desc.style.fontStyle = "italic";
    desc.style.color = "#ddd";
    achievementDiv.appendChild(desc);
    
    const progressInfo = document.createElement("div");
    
    if (unlocked) {
      progressInfo.innerHTML = `<span style="color: gold;">COMPLETED</span>`;
      progressInfo.style.marginBottom = "1vmin";
    } else {
      let current = 0;
      let total = 1;
      let progressText = "";
      
      // First achievement progress bar
      if (id === "first_answer") {
        current = player.correctAnswers || 0;
        total = 1;
      } 
      // Perfect session progress
      else if (id === "perfect_session") {
        const session = player.explorationData;
        if (session && session.answers) {
          const correct = session.answers.filter(a => a.correct).length;
          const totalQuestions = session.answers.length;
          current = correct;
          total = totalQuestions;
          progressText = `Current Session: ${current}/${total}`;
        } else {
          current = 0;
          total = 5;
        }
      }
      else if (id === "physics_master") {
        const physics = player.stats?.subjectMastery?.physics || { correct: 0, total: 0 };
        current = physics.correct || 0;
        total = 10;
        progressText = `Physics Correct: ${current}/${total}`;
      } else if (id === "math_master") {
        const math = player.stats?.subjectMastery?.math || { correct: 0, total: 0 };
        current = math.correct || 0;
        total = 10;
        progressText = `Math Correct: ${current}/${total}`;
      } else if (id === "logic_master") {
        const logic = player.stats?.subjectMastery?.logic || { correct: 0, total: 0 };
        current = logic.correct || 0;
        total = 10;
        progressText = `Logic Correct: ${current}/${total}`;
      } else if (id === "novice") {
        current = player.level;
        total = 5;
        progressText = `Level: ${current}/${total}`;
      } else if (id === "champion") {
        current = player.level;
        total = 10;
        progressText = `Level: ${current}/${total}`;
      } else if (id === "legend") {
        current = player.level;
        total = 20;
        progressText = `Level: ${current}/${total}`;
      } else if (id === "wealthy") {
        current = player.stats?.totalGoldEarned || 0;
        total = 5000;
        progressText = `Points: ${current}/${total}`;
      } else if (id === "daily_player") {
        current = Object.keys(player.dailyChallenges?.completed || {}).length;
        total = 5;
        progressText = `Daily Challenges: ${current}/${total}`;
      } else if (id === "explorer") {
        const visited = player.stats?.locationsVisited || [];
        current = ["Physics", "Mathematics", "Logic", "Infinite Mode"].filter(loc => visited.includes(loc)).length;
        total = 4;
        progressText = `Locations: ${current}/${total}`;
      } else {
        progressText = "Complete to unlock";
      }
      
      const percent = total > 0 ? Math.min(100, (current / total) * 100) : 0;
      progressInfo.innerHTML = `<div style="margin-bottom: 1vmin;">${progressText}</div>`;
      
      if (total > 1) {
        const indivProgressBar = document.createElement("div");
        indivProgressBar.style.width = "100%";
        indivProgressBar.style.height = "2.5vmin";
        indivProgressBar.style.background = "#222";
        indivProgressBar.style.borderRadius = "1vmin";
        indivProgressBar.style.margin = "1vmin 0";
        indivProgressBar.style.overflow = "hidden";
        indivProgressBar.style.position = "relative";
        
        const indivProgressFill = document.createElement("div");
        indivProgressFill.style.height = "100%";
        indivProgressFill.style.width = `${percent}%`;
        indivProgressFill.style.background = "linear-gradient(90deg, #555, #bbb)";
        indivProgressFill.style.transition = "width 0.3s ease";
        
        const indivProgressText = document.createElement("div");
        indivProgressText.style.position = "absolute";
        indivProgressText.style.top = "0";
        indivProgressText.style.left = "0";
        indivProgressText.style.width = "100%";
        indivProgressText.style.height = "100%";
        indivProgressText.style.display = "flex";
        indivProgressText.style.alignItems = "center";
        indivProgressText.style.justifyContent = "center";
        indivProgressText.style.fontSize = "2vmin";
        indivProgressText.style.fontWeight = "bold";
        indivProgressText.style.textShadow = "0.3vmin 0.3vmin 0.5vmin black";
        indivProgressText.textContent = `${Math.round(percent)}%`;
        
        indivProgressBar.appendChild(indivProgressFill);
        indivProgressBar.appendChild(indivProgressText);
        progressInfo.appendChild(indivProgressBar);
      }
    }
    
    achievementDiv.appendChild(progressInfo);
    output.appendChild(achievementDiv);
  }
  
  addAction("⬅️ Back", showLocation);
}

//DAILY CHALLENGES - FULLY IMPLEMENTED
function showDailyChallenge() {
  clearOutput();
  controls.innerHTML = "";
  
  if (!player.dailyChallenges) {
    player.dailyChallenges = {
      lastCheck: null,
      completed: {},
      current: null,
      currentDate: null,
      progress: 0
    };
  }
  
  const today = new Date().toISOString().split('T')[0];
  
  // Check if we need to reset for new day
  if (player.dailyChallenges.currentDate !== today) {
    player.dailyChallenges.current = getTodaysChallenge();
    player.dailyChallenges.currentDate = today;
    player.dailyChallenges.progress = 0;
    player.dailyChallenges.lastCheck = Date.now();
    saveGame();
  }
  
  const challenge = player.dailyChallenges.current;
  if (!challenge) {
    log("❌ No daily challenge available today.", true);
    addAction("⬅️ Back", showLocation);
    return;
  }
  
  const completedToday = player.dailyChallenges.completed && player.dailyChallenges.completed[today];
  
  if (completedToday) {
    log("✅ Today's Daily Challenge Already Completed!", true);
    log(`You completed: ${challenge.title}`, true);
    log("Come back tomorrow for a new challenge!", true);
  } 
  else {
    log("<i class='fas fa-calendar-day'></i> Today's Daily Challenge", true);
    log(`--- ${challenge.title} ---`, true);
    
    if (challenge.objective === "ANSWER") {
      log(`Answer ${challenge.amount} ${challenge.target} questions`, true);
    } 
    else if (challenge.objective === "STREAK") {
      log(`Achieve a ${challenge.amount}-question streak`, true);
    }
    else if (challenge.objective === "EARN") {
      log(`Earn ${challenge.amount} points`, true);
    }
    
    log(`Progress: ${player.dailyChallenges.progress || 0}/${challenge.amount}`, true);
    log("\nRewards:", true);
    log(`💰 ${challenge.reward.gold} Points, ✨ ${challenge.reward.exp} EXP, 🎁 ${challenge.reward.item || ""}`, true);
    
    // Show progress bar
    const progressPercent = Math.min(100, (player.dailyChallenges.progress / challenge.amount) * 100);
    const progressBar = document.createElement("div");
    progressBar.style.width = "100%";
    progressBar.style.height = "4vmin";
    progressBar.style.background = "#333";
    progressBar.style.borderRadius = "2vmin";
    progressBar.style.margin = "2vmin 0";
    progressBar.style.overflow = "hidden";
    progressBar.style.position = "relative";
    
    const progressFill = document.createElement("div");
    progressFill.style.height = "100%";
    progressFill.style.width = `${progressPercent}%`;
    progressFill.style.background = "linear-gradient(90deg, #555, #0a0)";
    progressFill.style.transition = "width 0.3s ease";
    
    const progressText = document.createElement("div");
    progressText.style.position = "absolute";
    progressText.style.top = "0";
    progressText.style.left = "0";
    progressText.style.width = "100%";
    progressText.style.height = "100%";
    progressText.style.display = "flex";
    progressText.style.alignItems = "center";
    progressText.style.justifyContent = "center";
    progressText.style.fontSize = "3vmin";
    progressText.style.fontWeight = "bold";
    progressText.style.textShadow = "0.5vmin 0.5vmin 1vmin black";
    progressText.textContent = `${Math.round(progressPercent)}% (${player.dailyChallenges.progress}/${challenge.amount})`;
    
    progressBar.appendChild(progressFill);
    progressBar.appendChild(progressText);
    output.appendChild(progressBar);
    
    // Add button to manually check progress (for testing)
    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = "<i class='fas fa-sync-alt'></i> Update";
    checkBtn.style.margin = "2vmin 0";
    checkBtn.onclick = () => {
      saveGame();
    };
    output.appendChild(checkBtn);
  }
  
  // Show completed challenges count
  const completedCount = Object.keys(player.dailyChallenges.completed || {}).length;
  log(`\nTotal Daily Challenges Completed: ${completedCount}`, true);
  
  addAction("⬅️ Back", showLocation);
}

function getTodaysChallenge() {
  const today = new Date().toISOString().split('T')[0];
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = new Date() - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const challengeIndex = (dayOfYear % 5) + 1;
  return dailyChallenges[`challenge_${challengeIndex}`];
}

function checkDailyChallengeProgress(actionType, target, amount = 1) {
  if (!player.dailyChallenges) {
    player.dailyChallenges = {
      lastCheck: null,
      completed: {},
      current: null,
      currentDate: null,
      progress: 0
    };
  }
  
  const today = new Date().toISOString().split('T')[0];
  
  // Reset if new day
  if (player.dailyChallenges.currentDate !== today) {
    player.dailyChallenges.current = getTodaysChallenge();
    player.dailyChallenges.currentDate = today;
    player.dailyChallenges.progress = 0;
    player.dailyChallenges.lastCheck = Date.now();
  }
  
  // Check if already completed today
  if (player.dailyChallenges.completed && player.dailyChallenges.completed[today]) {
    return;
  }
  
  const challenge = player.dailyChallenges.current;
  if (!challenge) return;
  
  let matches = false;
  
  // Check if action matches challenge
  if (challenge.objective === actionType) {
    if (challenge.target === "any") {
      matches = true;
    } else if (challenge.target === target) {
      matches = true;
    } else if (challenge.target === "streak" && target === "streak") {
      matches = true;
    } else if (challenge.target === "gold" && target === "gold") {
      matches = true;
    }
  }
  
  if (matches) {
    const oldProgress = player.dailyChallenges.progress || 0;
    player.dailyChallenges.progress = Math.min(challenge.amount, oldProgress + amount);
    
    // Check if challenge is now complete
    if (player.dailyChallenges.progress >= challenge.amount && oldProgress < challenge.amount) {
      completeDailyChallenge();
    } 
    
    saveGame();
  }
}

function completeDailyChallenge() {
  const challenge = player.dailyChallenges.current;
  const today = new Date().toISOString().split('T')[0];
  
  if (!player.dailyChallenges.completed) {
    player.dailyChallenges.completed = {};
  }
  
  player.dailyChallenges.completed[today] = true;
  
  if (challenge.reward.gold) {
    const goldEarned = addGold(challenge.reward.gold, "Daily challenge");
    log(`💰 +${goldEarned} points from daily challenge!`, true);
  }
  
  if (challenge.reward.exp) {
    gainExp(challenge.reward.exp);
    log(`✨ +${challenge.reward.exp} EXP from daily challenge!`, true);
  }
  
  if (challenge.reward.item) {
    addItemToInventory(challenge.reward.item, 1);
    log(`🎁 Received ${challenge.reward.item} from daily challenge!`, true);
  }
  
  log(`🎉 Daily Challenge Complete: ${challenge.title}!`, true);
  
  // Update achievements
  checkAchievements();
  
  updateStats();
  saveGame();
}

// =====================
// GAME FLOW
// =====================

//MAIN MENU
function mainMenu() {
  clearOutput();
  controls.innerHTML = "";
  miniMap.innerHTML = "";
  
  // Hide sidebar toggle in main menu
  sidebarToggle.style.display = "none";
  
  log("🏰 Welcome to Scholar's Quest!", true);
  log("\n📚 Embark on an intellectual journey through the realms of physics equations, mathematical theorems, and logical reasoning!", true);
  
  addAction("Start New Game", startNewGame);
  addAction("Saved Games", showLoadMenu);
  addAction("<i class='fas fa-book'></i> Show Tutorial", showTutorial);
  addAction("<i class='fas fa-scroll'></i> Credits", showCredits);
}

//GAME START/LOAD
function startNewGame() {
  let emptySlot = null;
  for(let i = 1; i <= 3; i++) {
    if (!localStorage.getItem(`scholars_quest_v1_save_slot_${i}`)) {
      emptySlot = i;
      break;
    }
  }
  
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
  
  if (emptySlot === null) {
    log("❌ No empty save slots available.", true);
    showLoadMenu();
    return;
  }
  
  chooseClass(emptySlot);
}

function showLoadMenu() {
  clearOutput();
  controls.innerHTML = "";
  log("📂 Select a saved journey:");
  
  for (let i = 1; i <= 3; i++) {
    const d = localStorage.getItem(`scholars_quest_v1_save_slot_${i}`);
    const saveState = d ? JSON.parse(d) : null;
    const saveInfo = saveState ? `Slot ${i}: ${saveState.name} - ${saveState.class} (Lv ${saveState.level})` : `Slot ${i}: Empty`;
    addAction(saveInfo, () => showSlotMenu(i, !!d));
  }
  
  addAction("⬅️ Back", mainMenu);
}

function chooseClass(slot) {
  clearOutput();
  controls.innerHTML = "";
  log("Choose your scholar class:");
  
  for (let cls in CLASSES) {
    const classData = CLASSES[cls];
    const button = createButton(`${classData.icon} ${cls}`, () => {
      showPrompt((userName) => {
        player.class = cls;
        player.name = userName || "Scholar";
        
        // Initialize class-specific skills
        player.skills = [skillUnlocks[cls][1]];
        
        calculateStats();
        updateStatBars();
        document.getElementById("stats").classList.remove("hidden");
        
        updateStats();
        currentSaveSlot = slot;
        saveGame(slot);
        sidebarToggle.style.display = "block";
        
        showLocation();
      });
    });
    
    controls.appendChild(button);
  }
}

function showPrompt(callback){
  output.style.opacity = 0;
  const promptContainer = document.createElement("div");
  promptContainer.className = "promptContainerDiv"
  promptContainer.innerHTML = `
  <p style="font-size: 4.5vmin">What is your name, scholar?</p>
  <input type="text" id="promptInput" placeholder="Scholar">
  <button class="okClick">Start</button>
  `;
  document.body.appendChild(promptContainer);
  
  const input = document.getElementById("promptInput");
  input.focus();
  
  document.querySelector(".okClick").onclick = () => {
    const userName = input.value.trim();
    document.body.removeChild(promptContainer);
    callback(userName);
    output.style.opacity = 1;
  };
}

//LOADING SCREEN
loadingMsg1.style.animation = "show-and-hide 4s linear forwards";
setTimeout(() => {
  loadingMsg2.style.animation = "show-only 5s linear forwards";
}, 4000);

setTimeout(() => {
  loading.style.display = "none";
  loader.style.border = "none";
  loader.innerHTML = "<h4>Click anywhere to continue!</h4>";
  loader.style.animation = "blink 1.5s ease-out infinite";
  loader.style.cursor = "pointer";
  
  clickToStartReady = true;
  
  loadscreen.addEventListener("click", () => {
    if (clickToStartReady) {
      gameInitialized = true;
      playBackgroundMusic();
      loadscreen.style.display = "none";
      initializePlayerStats();
      mainMenu();
    }
  });
  
  // Auto-proceed after 30 seconds if no click
  setTimeout(() => {
    if (loadscreen.style.display !== "none" && clickToStartReady) {
      gameInitialized = true;
      playBackgroundMusic();
      loadscreen.style.display = "none";
      initializePlayerStats();
      mainMenu();
    }
  }, 30000);
}, 5000);

// Initialize the game when page loads
window.addEventListener('load', () => {
  // Loading screen will handle the click-to-start
});