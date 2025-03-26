// simple-audio.js - 简易音频系统，使用Web Audio API生成声音

// 音频状态
let audioEnabled = true;
let musicEnabled = true;
let soundEnabled = true;

// 创建音频上下文
let audioContext = null;

// 初始化音频系统
function initAudio() {
    try {
        // 只有在用户交互后才创建音频上下文
        document.addEventListener('click', function initAudioOnInteraction() {
            try {
                // 创建音频上下文
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                audioContext = new AudioContext();
                console.log("音频系统初始化成功");
            } catch (e) {
                console.log("音频上下文创建失败:", e);
                audioEnabled = false;
            }
            document.removeEventListener('click', initAudioOnInteraction);
        }, { once: true });
        
        // 从本地存储加载音频设置
        loadAudioSettings();
        
        // 添加界面控制
        createAudioControls();
    } catch (e) {
        console.log("音频系统初始化失败:", e);
        audioEnabled = false;
    }
}

// 播放点击音效
function playClickSound() {
    if (!audioContext || !audioEnabled || !soundEnabled) return;
    
    try {
        // 创建振荡器
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // 设置音调和类型
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4音
        
        // 设置音量和淡出
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        
        // 连接节点
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // 播放并停止
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log("播放点击音效失败:", e);
    }
}

// 播放抽卡音效
function playDrawSound() {
    if (!audioContext || !audioEnabled || !soundEnabled) return;
    
    try {
        // 创建振荡器
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // 设置音调和类型
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5音
        oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.2); // G5音
        
        // 设置音量和淡出
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        
        // 连接节点
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // 播放并停止
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        console.log("播放抽卡音效失败:", e);
    }
}

// 播放出牌音效
function playCardSound() {
    if (!audioContext || !audioEnabled || !soundEnabled) return;
    
    try {
        // 创建振荡器
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // 设置音调和类型
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5音
        oscillator.frequency.exponentialRampToValueAtTime(523.25, audioContext.currentTime + 0.2); // C5音
        
        // 设置音量和淡出
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        
        // 连接节点
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // 播放并停止
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        console.log("播放出牌音效失败:", e);
    }
}

// 播放成功音效
function playSuccessSound() {
    if (!audioContext || !audioEnabled || !soundEnabled) return;
    
    try {
        // 创建振荡器
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // 设置音调和类型
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5音
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5音
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5音
        
        // 设置音量和淡出
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        
        // 连接节点
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // 播放并停止
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log("播放成功音效失败:", e);
    }
}

// 播放音效
function playSfx(type) {
    if (!audioEnabled || !soundEnabled) return;
    
    switch(type) {
        case 'click':
            playClickSound();
            break;
        case 'draw':
            playDrawSound();
            break;
        case 'play':
            playCardSound();
            break;
        case 'success':
            playSuccessSound();
            break;
    }
}

// 切换音效开关
function toggleSound() {
    soundEnabled = !soundEnabled;
    updateAudioControlUI();
    saveAudioSettings();
}

// 切换全部音频
function toggleAudio() {
    audioEnabled = !audioEnabled;
    updateAudioControlUI();
    saveAudioSettings();
}

// 保存音频设置到本地存储
function saveAudioSettings() {
    localStorage.setItem('audioEnabled', audioEnabled);
    localStorage.setItem('soundEnabled', soundEnabled);
}

// 从本地存储加载音频设置
function loadAudioSettings() {
    if (localStorage.getItem('audioEnabled') !== null) {
        audioEnabled = localStorage.getItem('audioEnabled') === 'true';
    }
    
    if (localStorage.getItem('soundEnabled') !== null) {
        soundEnabled = localStorage.getItem('soundEnabled') === 'true';
    }
}

// 创建音频控制界面
function createAudioControls() {
    // 创建音频控制容器
    const audioControl = document.createElement('div');
    audioControl.className = 'audio-control';
    audioControl.innerHTML = `
        <button id="toggleAudio" class="audio-btn" title="总开关">🔊</button>
        <button id="toggleSound" class="audio-btn" title="音效">🎮</button>
    `;
    
    // 添加到导航栏
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.appendChild(audioControl);
    }
    
    // 添加事件监听
    document.getElementById('toggleAudio').addEventListener('click', () => {
        toggleAudio();
        playSfx('click');
    });
    
    document.getElementById('toggleSound').addEventListener('click', () => {
        toggleSound();
        if (soundEnabled) playSfx('click');
    });
    
    // 初始更新UI状态
    updateAudioControlUI();
}

// 更新音频控制按钮UI状态
function updateAudioControlUI() {
    const audioBtn = document.getElementById('toggleAudio');
    const soundBtn = document.getElementById('toggleSound');
    
    if (audioBtn) {
        audioBtn.textContent = audioEnabled ? '🔊' : '🔇';
        audioBtn.classList.toggle('disabled', !audioEnabled);
    }
    
    if (soundBtn) {
        soundBtn.textContent = soundEnabled && audioEnabled ? '🎮' : '🎮❌';
        soundBtn.classList.toggle('disabled', !soundEnabled || !audioEnabled);
    }
}

// 为游戏事件添加音效
function setupAudioEvents() {
    // 抽卡音效
    document.getElementById('drawCardBtn').addEventListener('click', () => {
        playSfx('draw');
    });
    
    // 出牌音效
    document.getElementById('playCardBtn').addEventListener('click', () => {
        playSfx('play');
    });
    
    // 导航按钮音效
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            playSfx('click');
        });
    });
    
    // 筛选按钮音效
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            playSfx('click');
        });
    });
    
    // 其他按钮音效
    document.querySelectorAll('.btn').forEach(btn => {
        if (btn.id !== 'drawCardBtn' && btn.id !== 'playCardBtn') {
            btn.addEventListener('click', () => {
                playSfx('click');
            });
        }
    });
}

// 导出函数供其他文件使用
window.audioManager = {
    init: function() {
        initAudio();
        setupAudioEvents();
    },
    play: playSfx,
    toggleAudio: toggleAudio,
    toggleSound: toggleSound
};
