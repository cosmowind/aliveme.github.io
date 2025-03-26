// app-init.js - 应用初始化和登录保护
document.addEventListener('DOMContentLoaded', function() {
    // 1. 验证登录状态
    if (localStorage.getItem('isLoggedIn') !== 'true' && 
        sessionStorage.getItem('isLoggedIn') !== 'true') {
        // 未登录，跳转到登录页面
        window.location.href = 'index.html';
        return;
    }

    // 2. 登出按钮功能
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // 清除登录状态
            localStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('isLoggedIn');
            
            // 跳转到登录页面
            window.location.href = 'index.html';
        });
    }

    // 3. 导航切换功能
    const navBar = document.querySelector('.nav');
    if (navBar) {
        navBar.addEventListener('click', function(event) {
            const target = event.target;
            
            // 确保点击的是导航按钮且不是登出按钮
            if (!target.classList.contains('nav-btn') || target.id === 'logoutBtn') return;
            
            // 移除所有活动状态
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            
            // 添加当前活动状态
            target.classList.add('active');
            const targetId = target.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            // 如果切换到统计页面，更新统计
            if (targetId === 'statsSection' && typeof updateStats === 'function') {
                updateStats();
            }
        });
    }

    // 4. 抽卡和出牌按钮事件
    const drawCardBtn = document.getElementById('drawCardBtn');
    const playCardBtn = document.getElementById('playCardBtn');

    if (drawCardBtn && typeof drawCard === 'function') {
        drawCardBtn.addEventListener('click', drawCard);
    }

    if (playCardBtn && typeof playCard === 'function') {
        playCardBtn.addEventListener('click', playCard);
    }

    // 5. 筛选按钮事件
    document.querySelectorAll('.filter-controls').forEach(container => {
        if (container.querySelector('[data-category]')) {
            container.addEventListener('click', handleCardFilter);
        } else if (container.querySelector('[data-type]')) {
            container.addEventListener('click', handleHistoryFilter);
        }
    });

    // 6. 添加卡牌表单
    const addCardForm = document.getElementById('addCardForm');
    if (addCardForm && typeof addNewCard === 'function') {
        addCardForm.addEventListener('submit', addNewCard);
    }

    // 7. 修改密码
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // 验证输入
            if (!currentPassword) {
                alert('请输入当前密码');
                return;
            }
            
            if (!newPassword) {
                alert('请输入新密码');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('两次输入的密码不一致');
                return;
            }
            
            // 使用auth.js中的changePassword函数
            if (typeof changePassword === 'function') {
                if (changePassword(currentPassword, newPassword)) {
                    alert('密码修改成功');
                    // 清空输入框
                    document.getElementById('currentPassword').value = '';
                    document.getElementById('newPassword').value = '';
                    document.getElementById('confirmPassword').value = '';
                    
                    // 播放成功音效
                    if (window.audioManager && typeof window.audioManager.play === 'function') {
                        window.audioManager.play('success');
                    }
                } else {
                    alert('当前密码不正确');
                }
            }
        });
    }

    // 8. 初始化音频系统
    if (window.audioManager && typeof window.audioManager.init === 'function') {
        window.audioManager.init();
    }

    // 9. 加载游戏数据
    if (typeof loadInitialData === 'function') {
        loadInitialData();
    }

    console.log('应用初始化完成');
});