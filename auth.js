// auth.js - 用户认证相关功能

// 密码管理
const correctPassword = "100gift"; // 实际应用中应使用加密方式存储

/**
 * 检查是否已登录 - 现在该功能由登录页面和应用页面各自处理
 * 为了兼容性保留此函数，但功能已简化
 */
function checkLogin() {
    // 现在在 index.html 和 app.html 中单独处理登录状态检查
    // 此函数仅为兼容性保留
    console.log("Auth check handled by page scripts");
}

/**
 * 处理登录请求 - 该功能现在由登录页面直接处理
 * 为了兼容性保留此函数
 */
function handleLogin() {
    // 现在由 index.html 中的脚本直接处理
    console.log("Login handled by index.html");
}

/**
 * 处理登出请求 - 该功能现在由应用页面直接处理
 * 为了兼容性保留此函数
 */
function handleLogout() {
    // 现在由 app.html 中的脚本直接处理
    console.log("Logout handled by app.html");
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
 * 修改密码
 * @param {string} currentPwd - 当前密码
 * @param {string} newPwd - 新密码
 * @returns {boolean} - 是否修改成功
 */
function changePassword(currentPwd, newPwd) {
    // 验证当前密码
    if (currentPwd !== correctPassword) {
        return false;
    }
    
    // 在实际应用中，这里应该调用服务器API修改密码
    // 在纯前端应用中，我们可以存储到localStorage作为演示
    localStorage.setItem('gamePassword', newPwd);
    
    // 这里我们需要更新全局变量以使当前会话正常工作
    correctPassword = newPwd;
    
    return true;
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