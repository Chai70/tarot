export interface Rune {
  id: number;
  name: string;
  symbol: string;
  meaning: string;
  reversedMeaning: string;
  description: string;
  keywords: string[];
}

export const runeData: Rune[] = [
  {
    id: 1,
    name: 'Fehu',
    symbol: 'ᚠ',
    meaning: '财富，牲畜，物质成功，新的开始',
    reversedMeaning: '损失，贫困，物质困难，依赖',
    description: '代表物质财富和资源。象征着辛勤工作的回报和新机遇的到来。',
    keywords: ['财富', '成功', '资源', '新开始']
  },
  {
    id: 2,
    name: 'Uruz',
    symbol: 'ᚢ',
    meaning: '力量，勇气，野性，原始能量',
    reversedMeaning: '虚弱，缺乏自制，错失机会',
    description: '原始的生命力和内在力量。代表突破障碍和实现目标的能力。',
    keywords: ['力量', '勇气', '能量', '突破']
  },
  {
    id: 3,
    name: 'Thurisaz',
    symbol: 'ᚦ',
    meaning: '保护，防御，雷神之锤，破坏性力量',
    reversedMeaning: '冲突，攻击性，不受控的破坏',
    description: '强大的保护力量，但也可能带来破坏。需要智慧地运用力量。',
    keywords: ['保护', '防御', '力量', '谨慎']
  },
  {
    id: 4,
    name: 'Ansuz',
    symbol: 'ᚨ',
    meaning: '智慧，沟通，神性启示，知识',
    reversedMeaning: '误解，缺乏启发，沟通障碍',
    description: '神的智慧和启发。代表知识的获得和有效的沟通。',
    keywords: ['智慧', '沟通', '启示', '知识']
  },
  {
    id: 5,
    name: 'Raidho',
    symbol: 'ᚱ',
    meaning: '旅行，节奏，正确道路，进步',
    reversedMeaning: '停滞，错误方向，延迟',
    description: '生命的旅程和正确的道路。象征着进步和节奏感。',
    keywords: ['旅行', '道路', '进步', '节奏']
  },
  {
    id: 6,
    name: 'Kenaz',
    symbol: 'ᚲ',
    meaning: '火炬，知识，创造力，启蒙',
    reversedMeaning: '无知，创造力受阻，疾病',
    description: '内在的火焰和创造力。代表学习和技能的掌握。',
    keywords: ['创造', '学习', '火焰', '启蒙']
  },
  {
    id: 7,
    name: 'Gebo',
    symbol: 'ᚷ',
    meaning: '礼物，交换，平衡，伙伴关系',
    reversedMeaning: '失衡，贪婪，孤独',
    description: '给予和接受的平衡。象征着健康的人际关系和互惠。',
    keywords: ['礼物', '平衡', '伙伴', '互惠']
  },
  {
    id: 8,
    name: 'Wunjo',
    symbol: 'ᚹ',
    meaning: '快乐，和谐，完美，成就感',
    reversedMeaning: '悲伤，冲突，延迟的成功',
    description: '真正的快乐和内心的平静。代表目标的实现和和谐的状态。',
    keywords: ['快乐', '和谐', '成就', '平静']
  },
  {
    id: 9,
    name: 'Hagalaz',
    symbol: 'ᚺ',
    meaning: '冰雹，破坏，自然力量，突然改变',
    reversedMeaning: '延迟的破坏，内在动荡',
    description: '突然而剧烈的变化。虽然可能带来破坏，但也为重新开始清理道路。',
    keywords: ['改变', '破坏', '清理', '重新开始']
  },
  {
    id: 10,
    name: 'Nauthiz',
    symbol: 'ᚾ',
    meaning: '需要，约束，抵抗，内在力量',
    reversedMeaning: '贫困，痛苦，不耐烦',
    description: '通过困难学习和成长。代表必要的约束和内在韧性的发展。',
    keywords: ['需要', '约束', '学习', '韧性']
  },
  {
    id: 11,
    name: 'Isa',
    symbol: 'ᛁ',
    meaning: '冰，静止，集中，内省',
    reversedMeaning: '解冻，恢复活动，盲目',
    description: '暂停和内省的时期。象征着通过静止获得清晰的思维。',
    keywords: ['静止', '内省', '清晰', '耐心']
  },
  {
    id: 12,
    name: 'Jera',
    symbol: 'ᛃ',
    meaning: '收获，年度循环，努力的回报，正义',
    reversedMeaning: '延迟的收获，冲突，重复错误',
    description: '努力工作后的收获。代表自然的循环和正义的回报。',
    keywords: ['收获', '回报', '循环', '正义']
  },
  {
    id: 13,
    name: 'Eihwaz',
    symbol: 'ᛇ',
    meaning: '紫杉树，死亡与重生，转化，保护',
    reversedMeaning: '混乱，破坏，缺乏远见',
    description: '强大的保护和转化力量。象征着通过困难实现成长。',
    keywords: ['转化', '保护', '成长', '韧性']
  },
  {
    id: 14,
    name: 'Perthro',
    symbol: 'ᛈ',
    meaning: '命运，秘密，女性奥秘，未知',
    reversedMeaning: '坏运气，秘密泄露，不愉快的惊喜',
    description: '神秘和未知的力量。代表命运的不可预测性和隐藏的知识。',
    keywords: ['命运', '神秘', '未知', '直觉']
  },
  {
    id: 15,
    name: 'Algiz',
    symbol: 'ᛉ',
    meaning: '保护，守护，高等自我，神性连接',
    reversedMeaning: '脆弱，开放攻击，隐藏敌人',
    description: '强大的保护符文。象征着与高等力量的连接和神性保护。',
    keywords: ['保护', '守护', '连接', '直觉']
  },
  {
    id: 16,
    name: 'Sowilo',
    symbol: 'ᛋ',
    meaning: '太阳，成功，完整，生命力',
    reversedMeaning: '错误的目标，缺乏远见，虚假成功',
    description: '太阳的力量和生命能量。代表成功、治愈和积极的成果。',
    keywords: ['成功', '治愈', '生命力', '成就']
  },
  {
    id: 17,
    name: 'Tiwaz',
    symbol: 'ᛏ',
    meaning: '战士，正义，勇气，领导力',
    reversedMeaning: '不公正，懦弱，缺乏分析',
    description: '战士的勇气和正义感。象征着为信念而战和公正的胜利。',
    keywords: ['勇气', '正义', '领导', '胜利']
  },
  {
    id: 18,
    name: 'Berkano',
    symbol: 'ᛒ',
    meaning: '桦树，新生，成长，女性能量',
    reversedMeaning: '不育，停滞，缺乏成长',
    description: '新的开始和成长。象征着生育力和创造新生活的能力。',
    keywords: ['新生', '成长', '创造', '养育']
  },
  {
    id: 19,
    name: 'Ehwaz',
    symbol: 'ᛖ',
    meaning: '马，伙伴关系，忠诚，进步',
    reversedMeaning: '不信任，背叛，缺乏合作',
    description: '忠诚的伙伴关系和团队合作。象征着通过协作实现进步。',
    keywords: ['伙伴', '忠诚', '合作', '进步']
  },
  {
    id: 20,
    name: 'Mannaz',
    symbol: 'ᛗ',
    meaning: '人类，自我，社区，智慧',
    reversedMeaning: '敌人，自私，缺乏合作',
    description: '人类的本质和社会性。代表自我认知和与他人的和谐关系。',
    keywords: ['自我', '社区', '智慧', '人性']
  },
  {
    id: 21,
    name: 'Laguz',
    symbol: 'ᛚ',
    meaning: '水，情感，直觉，流动',
    reversedMeaning: '混乱，缺乏直觉，误导',
    description: '情感和直觉的力量。象征着适应性和情感智慧的流动。',
    keywords: ['情感', '直觉', '流动', '适应']
  },
  {
    id: 22,
    name: 'Ingwaz',
    symbol: 'ᛜ',
    meaning: '种子，潜力，内在成长，新阶段',
    reversedMeaning: '停滞，缺乏能量，不孕',
    description: '内在的种子和潜力。代表新阶段的开始和内在力量的觉醒。',
    keywords: ['种子', '潜力', '成长', '新阶段']
  },
  {
    id: 23,
    name: 'Dagaz',
    symbol: 'ᛞ',
    meaning: '黎明，突破，觉醒，转化',
    reversedMeaning: '结束，完成，黄昏',
    description: '新的黎明和意识的突破。象征着重大的转变和觉醒时刻。',
    keywords: ['黎明', '突破', '觉醒', '转化']
  },
  {
    id: 24,
    name: 'Othala',
    symbol: 'ᛟ',
    meaning: '遗产，传统，家族，根基',
    reversedMeaning: '束缚，过时传统，缺乏自由',
    description: '家族遗产和根基。代表传统智慧和稳固的基础。',
    keywords: ['遗产', '传统', '根基', '智慧']
  }
];

export const runeSpreadTypes = {
  'single-rune': '单符文指引',
  'three-rune': '过去现在未来',
  'celtic-cross': '北欧十字展开',
  'daily-guidance': '每日指引'
};
