// ui-functions.js - 用户界面相关功能

/**
 * 渲染历史记录
 */
function renderHistory() {
    historyContainer.innerHTML = '';
    
    if (history.length === 0) {
        historyContainer.innerHTML = '<p>暂无历史记录</p>';
        return;
    }
    
    // 按时间倒序排列
    const sortedHistory = [...history].reverse();
    
    // 根据筛选条件过滤历史记录
    let filteredHistory = sortedHistory;
    if (historyFilter !== 'all') {
        filteredHistory = sortedHistory.filter(record => record.type === historyFilter);
    }
    
    if (filteredHistory.length === 0) {
        historyContainer.innerHTML = `<p>没有匹配的${historyFilter === 'draw' ? '抽卡' : '出牌'}记录</p>`;
        return;
    }
    
    filteredHistory.forEach(record => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const icon = document.createElement('div');
        icon.className = `history-icon ${record.type}`;
        icon.textContent = record.type === 'draw' ? '⬇️' : '⬆️';
        
        const content = document.createElement('div');
        content.className = 'history-content';
        
        const action = document.createElement('div');
        
        // 根据卡牌类别应用不同样式
        const categorySpan = document.createElement('span');
        categorySpan.textContent = `[${record.card.category}]`;
        categorySpan.style.padding = '2px 5px';
        categorySpan.style.borderRadius = '3px';
        categorySpan.style.fontSize = '10px';
        categorySpan.style.marginRight = '5px';
        
        if (record.card.category === '养自己') {
            categorySpan.style.backgroundColor = 'rgba(241, 196, 15, 0.2)';
        } else if (record.card.category === 'CBT') {
            categorySpan.style.backgroundColor = 'rgba(52, 152, 219, 0.2)';
        } else if (record.card.category === '奖励') {
            categorySpan.style.backgroundColor = 'rgba(46, 204, 113, 0.2)';
        }
        
        action.appendChild(categorySpan);
        
        const actionText = document.createTextNode(
            record.type === 'draw' 
                ? `抽取了卡牌: ${record.card.name}` 
                : `打出了卡牌: ${record.card.name}`
        );
        action.appendChild(actionText);
        
        const time = document.createElement('div');
        time.className = 'history-time';
        time.textContent = record.time;
        
        content.appendChild(action);
        content.appendChild(time);
        
        historyItem.appendChild(icon);
        historyItem.appendChild(content);
        
        historyContainer.appendChild(historyItem);
    });
}

/**
 * 添加历史记录
 * @param {string} type - 记录类型 ('draw'/'play')
 * @param {Object} card - 卡牌对象
 */
function addHistory(type, card) {
    const now = new Date();
    const timeString = now.toLocaleString();
    
    history.push({
        type,
        card,
        time: timeString
    });
    
    // 更新历史记录显示
    renderHistory();
}

/**
 * 更新统计信息
 */
function updateStats() {
    // 抽卡和出牌总数
    const drawRecords = history.filter(record => record.type === 'draw');
    const playRecords = history.filter(record => record.type === 'play');
    
    totalDraws.textContent = drawRecords.length;
    totalPlays.textContent = playRecords.length;
    currentHands.textContent = userHand.length;
    
    // 各类别数量统计
    const selfCareCards = userHand.filter(card => card.category === '养自己');
    const cbtCards = userHand.filter(card => card.category === 'CBT');
    const rewardCards = userHand.filter(card => card.category === '奖励');
    
    selfCareCount.textContent = selfCareCards.length;
    cbtCount.textContent = cbtCards.length;
    rewardCount.textContent = rewardCards.length;
}

/**
 * 导航切换处理
 * @param {Event} event - 点击事件
 */
function handleNavigation(event) {
    const btn = event.target;
    if (!btn.classList.contains('nav-btn') || btn.id === 'logoutBtn') return;
    
    // 移除所有活动状态
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    
    // 添加当前活动状态
    btn.classList.add('active');
    const targetId = btn.getAttribute('data-target');
    document.getElementById(targetId).classList.add('active');
    
    // 如果切换到统计页面，更新统计数据
    if (targetId === 'statsSection') {
        updateStats();
    }
}

/**
 * 卡牌筛选处理
 * @param {Event} event - 点击事件
 */
function handleCardFilter(event) {
    const btn = event.target;
    if (!btn.classList.contains('filter-btn') || !btn.dataset.category) return;
    
    // 移除所有活动状态
    document.querySelectorAll('.filter-btn[data-category]').forEach(b => {
        b.classList.remove('active');
    });
    
    // 添加当前活动状态
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-category');
    
    // 重新渲染卡牌
    renderHand();
    renderLibrary();
}

/**
 * 历史记录筛选处理
 * @param {Event} event - 点击事件
 */
function handleHistoryFilter(event) {
    const btn = event.target;
    if (!btn.classList.contains('filter-btn') || !btn.dataset.type) return;
    
    // 移除所有活动状态
    document.querySelectorAll('.filter-btn[data-type]').forEach(b => {
        b.classList.remove('active');
    });
    
    // 添加当前活动状态
    btn.classList.add('active');
    historyFilter = btn.getAttribute('data-type');
    
    // 重新渲染历史记录
    renderHistory();
}