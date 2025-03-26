// app.js - 主应用逻辑

// 全局变量
let cardLibrary = [...cardData]; // 从cards.js加载卡牌库
let userHand = [];
let discardPile = []; // 新增：弃牌堆
let selectedCard = null;
let history = [];
let currentFilter = 'all';
let historyFilter = 'all';

// DOM元素
const loginPage = document.getElementById('loginPage');
const appContainer = document.getElementById('appContainer');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const drawCardBtn = document.getElementById('drawCardBtn');
const playCardBtn = document.getElementById('playCardBtn');
const handContainer = document.getElementById('handContainer');
const discardContainer = document.getElementById('discardContainer');
const historyContainer = document.getElementById('historyContainer');
const addCardForm = document.getElementById('addCardForm');
const libraryContainer = document.getElementById('libraryContainer');
const filterBtns = document.querySelectorAll('.filter-btn[data-category]');
const historyFilterBtns = document.querySelectorAll('.filter-btn[data-type]');

// 统计元素
const totalDraws = document.getElementById('totalDraws');
const totalPlays = document.getElementById('totalPlays');
const currentHands = document.getElementById('currentHands');
const selfCareCount = document.getElementById('selfCareCount');
const cbtCount = document.getElementById('cbtCount');
const rewardCount = document.getElementById('rewardCount');

// 事件监听器设置
function setupEventListeners() {
    // 登录/退出事件
    loginBtn.addEventListener('click', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
    
    // 导航事件
    document.querySelector('.nav').addEventListener('click', handleNavigation);
    
    // 卡牌操作事件
    drawCardBtn.addEventListener('click', drawCard);
    playCardBtn.addEventListener('click', playCard);
    
    // 筛选事件委托
    document.querySelectorAll('.filter-controls').forEach(container => {
        if (container.querySelector('[data-category]')) {
            container.addEventListener('click', handleCardFilter);
        } else if (container.querySelector('[data-type]')) {
            container.addEventListener('click', handleHistoryFilter);
        }
    });
    
    // 添加卡牌表单提交
    addCardForm.addEventListener('submit', addNewCard);
    
    // 添加移动端触摸事件优化
    addTouchSupport();
}

/**
 * 添加触摸支持，改善移动端体验
 */
function addTouchSupport() {
    // 防止双击缩放
    document.addEventListener('dblclick', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // 改善按钮触摸体验
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });
    
    // 阻止文本选择，避免长按选中文本
    document.querySelectorAll('.card, .btn, .nav-btn, .filter-btn').forEach(element => {
        element.addEventListener('touchstart', function(e) {
            e.preventDefault();
        }, { passive: false });
    });
}

// 初始化应用
function initApp() {
    // 设置事件监听器
    setupEventListeners();
    
    // 检查登录状态
    checkLogin();
    
    // 添加移动端优化
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
}

// 启动应用
document.addEventListener('DOMContentLoaded', initApp);