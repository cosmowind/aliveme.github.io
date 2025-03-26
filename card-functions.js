// card-functions.js - 卡牌相关功能

// 不再重复声明全局变量discardPile，仅使用app.js中的声明

/**
 * 创建卡牌元素
 * @param {Object} card - 卡牌对象
 * @returns {HTMLElement} - 卡牌DOM元素
 */
function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.className = `card category-${card.category}`;
    
    const cardImage = document.createElement('div');
    cardImage.className = 'card-image';
    cardImage.textContent = card.image;
    
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';
    
    const cardTitle = document.createElement('div');
    cardTitle.className = 'card-title';
    cardTitle.textContent = card.name;
    
    const cardDescription = document.createElement('div');
    cardDescription.className = 'card-description';
    cardDescription.textContent = card.description;
    
    const cardCategory = document.createElement('div');
    cardCategory.className = `card-category category-tag-${card.category}`;
    cardCategory.textContent = card.category;
    
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardDescription);
    
    cardElement.appendChild(cardImage);
    cardElement.appendChild(cardContent);
    cardElement.appendChild(cardCategory);
    
    return cardElement;
}

/**
 * 渲染手牌
 */
function renderHand() {
    handContainer.innerHTML = '';
    
    if (userHand.length === 0) {
        handContainer.innerHTML = '<p>你的手牌为空，请抽取卡牌</p>';
        return;
    }
    
    // 根据当前筛选条件过滤手牌
    let filteredHand = userHand;
    if (currentFilter !== 'all') {
        filteredHand = userHand.filter(card => card.category === currentFilter);
    }
    
    if (filteredHand.length === 0) {
        handContainer.innerHTML = `<p>没有匹配的${currentFilter}卡牌</p>`;
        return;
    }
    
    filteredHand.forEach(card => {
        const cardElement = createCardElement(card);
        cardElement.dataset.instanceId = card.instanceId;
        
        // 添加选择事件
        cardElement.addEventListener('click', () => {
            // 移除其他卡牌的选中状态
            document.querySelectorAll('.card.selected').forEach(el => {
                el.classList.remove('selected');
            });
            
            // 切换当前卡牌的选中状态
            cardElement.classList.add('selected');
            selectedCard = card;
            playCardBtn.disabled = false;
        });
        
        // 新抽取的卡牌添加动画
        if (card.instanceId === userHand[userHand.length - 1].instanceId) {
            cardElement.classList.add('card-draw-animation');
        }
        
        handContainer.appendChild(cardElement);
    });
}

/**
 * 渲染弃牌区
 */
function renderDiscardPile() {
    discardContainer.innerHTML = '';
    
    if (discardPile.length === 0) {
        // 显示空提示
        const emptyHint = document.createElement('div');
        emptyHint.className = 'card empty-hint';
        
        const cardImage = document.createElement('div');
        cardImage.className = 'card-image';
        cardImage.textContent = '🗑️';
        
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        
        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = '弃牌区';
        
        const cardDescription = document.createElement('div');
        cardDescription.className = 'card-description';
        cardDescription.textContent = '点击出牌按钮将手牌打出到弃牌区';
        
        cardContent.appendChild(cardTitle);
        cardContent.appendChild(cardDescription);
        
        emptyHint.appendChild(cardImage);
        emptyHint.appendChild(cardContent);
        
        discardContainer.appendChild(emptyHint);
        return;
    }
    
    // 只显示最近的几张弃牌，避免屏幕过于拥挤
    const recentDiscards = discardPile.slice(-5).reverse(); // 最近的卡牌在前面
    
    // 根据当前筛选条件过滤弃牌
    let filteredDiscards = recentDiscards;
    if (currentFilter !== 'all') {
        filteredDiscards = recentDiscards.filter(card => card.category === currentFilter);
    }
    
    if (filteredDiscards.length === 0) {
        discardContainer.innerHTML = `<p>没有匹配的${currentFilter}弃牌</p>`;
        return;
    }
    
    filteredDiscards.forEach(card => {
        const cardElement = createCardElement(card);
        discardContainer.appendChild(cardElement);
    });
    
    // 如果筛选后的卡牌少于全部的弃牌数，添加一个提示
    if (filteredDiscards.length < discardPile.length) {
        const moreIndicator = document.createElement('div');
        moreIndicator.className = 'card more-cards-hint';
        moreIndicator.style.justifyContent = 'center';
        moreIndicator.style.alignItems = 'center';
        moreIndicator.style.fontSize = '14px';
        moreIndicator.style.textAlign = 'center';
        moreIndicator.innerHTML = `<p>还有${discardPile.length - filteredDiscards.length}张卡牌</p>`;
        discardContainer.appendChild(moreIndicator);
    }
}

/**
 * 渲染牌库
 */
function renderLibrary() {
    libraryContainer.innerHTML = '';
    
    // 根据当前筛选条件过滤牌库
    let filteredLibrary = cardLibrary;
    if (currentFilter !== 'all') {
        filteredLibrary = cardLibrary.filter(card => card.category === currentFilter);
    }
    
    if (filteredLibrary.length === 0) {
        libraryContainer.innerHTML = `<p>没有匹配的${currentFilter}卡牌</p>`;
        return;
    }
    
    filteredLibrary.forEach(card => {
        const cardElement = createCardElement(card);
        
        // 添加删除按钮
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '删除';
        deleteBtn.style.position = 'absolute';
        deleteBtn.style.bottom = '5px';
        deleteBtn.style.right = '5px';
        deleteBtn.style.padding = '3px 8px';
        deleteBtn.style.fontSize = '10px';
        deleteBtn.style.backgroundColor = '#e74c3c';
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '3px';
        deleteBtn.style.cursor = 'pointer';
        
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`确定要删除卡牌"${card.name}"吗？`)) {
                cardLibrary = cardLibrary.filter(c => c.id !== card.id);
                renderLibrary();
                saveGameState();
            }
        });
        
        cardElement.appendChild(deleteBtn);
        libraryContainer.appendChild(cardElement);
    });
}

/**
 * 抽卡功能
 */
function drawCard() {
    // 获取手牌中的所有卡牌ID
    const handCardIds = userHand.map(card => card.id);
    
    // 过滤出不在手牌中的卡牌
    const availableCards = cardLibrary.filter(card => 
        !handCardIds.includes(card.id)
    );
    
    // 检查是否还有卡牌可抽
    if (availableCards.length === 0) {
        alert('没有可抽取的新卡牌！');
        return;
    }
    
    // 随机抽取一张卡牌
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const drawnCard = { ...availableCards[randomIndex] };
    
    // 生成唯一ID
    drawnCard.instanceId = Date.now();
    
    // 添加到手牌
    userHand.push(drawnCard);
    
    // 添加历史记录
    addHistory('draw', drawnCard);
    
    // 渲染新卡牌
    renderHand();
    
    // 更新统计
    updateStats();
    
    // 保存游戏状态
    saveGameState();
}
/**
 * 出牌功能
 */
function playCard() {
    if (!selectedCard) return;
    
    // 从手牌中移除
    userHand = userHand.filter(card => card.instanceId !== selectedCard.instanceId);
    
    // 添加到弃牌堆
    discardPile.push(selectedCard);
    
    // 添加历史记录
    addHistory('play', selectedCard);
    
    // 播放出牌动画
    const cardElement = document.querySelector(`[data-instance-id="${selectedCard.instanceId}"]`);
    cardElement.classList.add('card-play-animation');
    
    // 动画结束后重新渲染
    setTimeout(() => {
        selectedCard = null;
        renderHand();
        renderDiscardPile();
        playCardBtn.disabled = true;
        
        // 更新统计
        updateStats();
        
        // 保存游戏状态
        saveGameState();
    }, 500);
}

/**
 * 添加新卡牌
 * @param {Event} e - 表单提交事件
 */
function addNewCard(e) {
    e.preventDefault();
    
    const newCard = {
        id: cardLibrary.length > 0 ? Math.max(...cardLibrary.map(c => c.id)) + 1 : 1,
        name: document.getElementById('cardName').value,
        description: document.getElementById('cardDescription').value,
        image: document.getElementById('cardImage').value,
        category: document.getElementById('cardCategory').value
    };
    
    cardLibrary.push(newCard);
    
    // 重置表单
    addCardForm.reset();
    document.getElementById('cardImage').value = '🃏';
    
    // 更新牌库显示
    renderLibrary();
    
    // 保存游戏状态
    saveGameState();
    
    alert('卡牌添加成功！');
}