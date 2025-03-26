// auth.js - 用户认证相关功能

// 密码管理
const correctPassword = "100gift"; // 实际应用中应使用加密方式存储

/**
 * 检查是否已登录
 */
function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        loginPage.style.display = 'none';
        appContainer.style.display = 'block';
        loadInitialData();
    }
}

/**
 * 处理登录请求
 */
function handleLogin() {
    const password = passwordInput.value;
    
    if (password === correctPassword) {
        if (document.getElementById('rememberMe').checked) {
            localStorage.setItem('isLoggedIn', 'true');
        }
        
        loginPage.style.display = 'none';
        appContainer.style.display = 'block';
        loadInitialData();
    } else {
        loginError.style.display = 'block';
        setTimeout(() => {
            loginError.style.display = 'none';
        }, 3000);
    }
}

/**
 * 处理登出请求
 */
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    loginPage.style.display = 'flex';
    appContainer.style.display = 'none';
    passwordInput.value = '';
    resetGameState();
}

/**
 * 保存游戏状态到本地存储
 */
function saveGameState() {
    localStorage.setItem('userHand', JSON.stringify(userHand));
    localStorage.setItem('discardPile', JSON.stringify(discardPile));
    localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('cardLibrary', JSON.stringify(cardLibrary));
}

/**
 * 从本地存储加载游戏状态
 */
function loadGameState() {
    const savedHand = localStorage.getItem('userHand');
    const savedDiscardPile = localStorage.getItem('discardPile');
    const savedHistory = localStorage.getItem('history');
    const savedLibrary = localStorage.getItem('cardLibrary');
    
    if (savedHand) {
        userHand = JSON.parse(savedHand);
    }
    
    if (savedDiscardPile) {
        discardPile = JSON.parse(savedDiscardPile);
    }
    
    if (savedHistory) {
        history = JSON.parse(savedHistory);
    }
    
    if (savedLibrary) {
        cardLibrary = JSON.parse(savedLibrary);
    } else {
        // 如果没有保存的牌库，使用默认牌库
        cardLibrary = [...cardData];
    }
}

/**
 * 重置游戏状态
 */
function resetGameState() {
    userHand = [];
    discardPile = [];
    selectedCard = null;
    history = [];
    cardLibrary = [...cardData]; // 重置为初始卡牌库
    playCardBtn.disabled = true;
    
    // 清除本地存储
    localStorage.removeItem('userHand');
    localStorage.removeItem('discardPile');
    localStorage.removeItem('history');
    localStorage.removeItem('cardLibrary');
}

/**
 * 加载初始数据
 */
function loadInitialData() {
    loadGameState();
    renderHand();
    renderDiscardPile();
    renderLibrary();
    renderHistory();
    updateStats();
}