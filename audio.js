// audio.js - 音频管理系统 (修复版)

// 音频状态
let audioEnabled = true;
let musicEnabled = true;
let soundEnabled = true;
let currentBgMusic = null;

// 使用在线音频资源
const audio = {
    // 背景音乐 - 使用免费音乐资源
    bgm: {
        main: new Audio('https://assets.mixkit.co/music/preview/mixkit-relaxing-in-nature-522.mp3'), // 轻松氛围音乐
        alternate: new Audio('https://assets.mixkit.co/music/preview/mixkit-piano-meditation-112.mp3') // 冥想钢琴曲
    },
    // 操作音效 - 使用免费音效资源
    sfx: {
        click: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3'),
        draw: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-game-ball-tap-2073.mp3'),
        play: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.mp3'),
        shuffle: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-swift-card-shuffle-3175.mp3'),
        success: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3')
    }
};

// 初始化音频
function initAudio() {
    // 设置所有背景音乐为循环播放
    for (const key in audio.bgm) {
        audio.bgm[key].loop = true;
        audio.bgm[key].volume = 0.5; // 背景音乐音量适中
    }
    
    // 设置音效音量
    for (const key in audio.sfx) {
        audio.sfx[key].volume = 0.7;
    }
    
    // 从本地存储加载音频设置
    loadAudioSettings();
    
    // 添加界面控制
    createAudioControls();
}

// 播放背景音乐
function playBackgroundMusic(key = 'main') {
    if (!audioEnabled || !musicEnabled) return;
    
    // 如果有正在播放的音乐，先停止
    if (currentBgMusic) {
        audio.bgm[currentBgMusic].pause();
        audio.bgm[currentBgMusic].currentTime = 0;
    }
    
    // 播放新音乐
    if (audio.bgm[key]) {
        audio.bgm[key].play().catch(e => console.log('背景音乐播放失败:', e));
        currentBgMusic = key;
    }
}

// 检查背景音乐是否播放中
function isMusicPlaying() {
    return audioEnabled && musicEnabled && currentBgMusic && 
           !audio.bgm[currentBgMusic].paused;
}

// 播放音效
function playSfx(key) {
    if (!audioEnabled || !soundEnabled) return;
    
    if (audio.sfx[key]) {
        // 克隆音频对象，允许音效重叠播放
        const sound = audio.sfx[key].cloneNode();
        sound.volume = audio.sfx[key].volume;
        sound.play().catch(e => console.log(`音效 ${key} 播放失败:`, e));
    }
}

// 切换音乐开关
function toggleMusic() {
    musicEnabled = !musicEnabled;
    
    if (musicEnabled && currentBgMusic) {
        audio.bgm[currentBgMusic].play().catch(e => console.log('背景音乐播放失败:', e));
    } else {
        for (const key in audio.bgm) {
            audio.bgm[key].pause();
        }
    }
    
    // 更新UI和保存设置
    updateAudioControlUI();
    saveAudioSettings();
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
    
    if (!audioEnabled) {
        // 停止所有音频
        for (const key in audio.bgm) {
            audio.bgm[key].pause();
        }
    } else if (musicEnabled && currentBgMusic) {
        // 恢复背景音乐
        audio.bgm[currentBgMusic].play().catch(e => console.log('背景音乐播放失败:', e));
    }
    
    updateAudioControlUI();
    saveAudioSettings();
}

// 保存音频设置到本地存储
function saveAudioSettings() {
    localStorage.setItem('audioEnabled', audioEnabled);
    localStorage.setItem('musicEnabled', musicEnabled);
    localStorage.setItem('soundEnabled', soundEnabled);
}

// 从本地存储加载音频设置
function loadAudioSettings() {
    if (localStorage.getItem('audioEnabled') !== null) {
        audioEnabled = localStorage.getItem('audioEnabled') === 'true';
    }
    
    if (localStorage.getItem('musicEnabled') !== null) {
        musicEnabled = localStorage.getItem('musicEnabled') === 'true';
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
        <button id="toggleMusic" class="audio-btn" title="音乐">🎵</button>
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
    
    document.getElementById('toggleMusic').addEventListener('click', () => {
        toggleMusic();
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
    const musicBtn = document.getElementById('toggleMusic');
    const soundBtn = document.getElementById('toggleSound');
    
    if (audioBtn) {
        audioBtn.textContent = audioEnabled ? '🔊' : '🔇';
        audioBtn.classList.toggle('disabled', !audioEnabled);
    }
    
    if (musicBtn) {
        musicBtn.textContent = musicEnabled && audioEnabled ? '🎵' : '🎵❌';
        musicBtn.classList.toggle('disabled', !musicEnabled || !audioEnabled);
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

// 移动端触摸支持
function setupTouchAudio() {
    // 确保在用户首次点击后才播放背景音乐（iOS需要用户交互后才能自动播放）
    document.addEventListener('touchstart', function() {
        if (audioEnabled && musicEnabled && currentBgMusic === null) {
            playBackgroundMusic();
        }
    }, { once: true });
}

// 导出函数供其他文件使用
window.audioManager = {
    init: function() {
        initAudio();
        setupAudioEvents();
        setupTouchAudio();
        
        // 延迟初始化背景音乐，等待用户交互
        document.addEventListener('click', function startAudioOnInteraction() {
            if (audioEnabled && musicEnabled) {
                playBackgroundMusic();
            }
            document.removeEventListener('click', startAudioOnInteraction);
        }, { once: true });
    },
    play: playSfx,
    playMusic: playBackgroundMusic,
    toggleAudio: toggleAudio,
    toggleMusic: toggleMusic,
    toggleSound: toggleSound,
    isMusicPlaying: isMusicPlaying
};
