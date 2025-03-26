// 卡牌数据
const cardData = [
    { id: 1, name: "微小的事", category: "养自己", description: "做一些微小但有意义的事情来照顾自己", image: "✨" },
    { id: 2, name: "擦桌子", category: "CBT", description: "通过整理环境来整理思绪", image: "🧹" },
    { id: 3, name: "整理文件", category: "CBT", description: "整理文件帮助清理思绪", image: "📁" },
    { id: 4, name: "用拍手或者起立打断负面想法", category: "CBT", description: "物理行为中断消极思维模式", image: "👏" },
    { id: 5, name: "左手刷牙", category: "CBT", description: "用非惯用手做日常活动，训练新的神经通路", image: "🪥" },
    { id: 6, name: "把我心里想的写下来", category: "CBT", description: "记录想法帮助识别思维模式", image: "📝" },
    { id: 7, name: "把痛苦写下来", category: "CBT", description: "记录痛苦感受来减轻其影响", image: "📔" },
    { id: 8, name: "去运动", category: "CBT", description: "通过运动释放压力，改善情绪", image: "🏃" },
    { id: 9, name: "去外面看看风景/逛逛图书馆 拍拍照", category: "CBT", description: "改变环境，拓展视野", image: "🌳" },
    { id: 10, name: "化妆打扮并拍照", category: "CBT", description: "通过自我打扮提升信心", image: "💄" },
    { id: 11, name: "整理房间", category: "CBT", description: "整理环境帮助整理思绪", image: "🧺" },
    { id: 12, name: "买菜做饭做家务", category: "CBT", description: "通过日常家务建立规律生活", image: "🥕" },
    { id: 13, name: "看书", category: "养自己", description: "通过阅读放松心灵", image: "📚" },
    { id: 14, name: "做饭", category: "CBT", description: "烹饪过程帮助专注当下", image: "🍳" },
    { id: 15, name: "放松活动", category: "养自己", description: "做一些让自己放松的事情", image: "🧘" },
    { id: 16, name: "正念练习", category: "养自己", description: "通过正念练习保持专注", image: "🧠" },
    { id: 17, name: "情绪日记", category: "CBT", description: "记录情绪变化和触发因素", image: "📖" },
    { id: 18, name: "洗澡", category: "养自己", description: "洗去一天的疲惫，放松身心", image: "🛁" },
    { id: 19, name: "蒸汽眼罩", category: "养自己", description: "使用蒸汽眼罩缓解眼部疲劳", image: "😌" },
    { id: 20, name: "冥想", category: "养自己", description: "通过冥想平静心灵", image: "🧘‍♀️" },
    { id: 21, name: "泡脚", category: "养自己", description: "泡脚促进血液循环，放松身心", image: "🦶" },
    { id: 22, name: "敷面膜", category: "养自己", description: "敷面膜护肤的同时放松心情", image: "🧖" },
    { id: 23, name: "彩色霓虹灯", category: "养自己", description: "通过柔和的灯光创造舒适氛围", image: "🌈" },
    { id: 24, name: "香薰-点香", category: "养自己", description: "通过香薰创造愉悦的感官体验", image: "🕯️" },
    { id: 25, name: "关灯", category: "养自己", description: "在黑暗中放松，减少视觉刺激", image: "🌙" },
    { id: 26, name: "Machine learning", category: "奖励", description: "奖励自己学习机器学习", image: "🤖" },
    { id: 27, name: "博弈game入门：取石子", category: "奖励", description: "奖励自己玩智力游戏", image: "🎮" },
    { id: 28, name: "小布丁", category: "奖励", description: "奖励自己吃一个小布丁", image: "🍮" },
    { id: 29, name: "零食", category: "奖励", description: "奖励自己享用喜欢的零食", image: "🍬" },
    { id: 30, name: "甘蔗", category: "奖励", description: "奖励自己吃甘蔗", image: "🍭" }
];
