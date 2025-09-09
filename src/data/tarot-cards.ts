export interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  reversedMeaning: string;
  imagePath: string;
}

export const tarotDeck: TarotCard[] = [
  // 大阿卡纳
  { id: 0, name: '愚者', meaning: '新的开始，无限的可能性，天真，自发性，自由精神。', reversedMeaning: '鲁莽，冒险，缺乏计划，愚蠢的决定。', imagePath: '/images/tarot/major-arcana/00-the-fool.png' },
  { id: 1, name: '魔术师', meaning: '显化，足智多谋，力量，有灵感的行动。', reversedMeaning: '操纵，欺骗，缺乏能力，滥用权力。', imagePath: '/images/tarot/major-arcana/01-the-magician.png' },
  { id: 2, name: '女祭司', meaning: '直觉，神圣的知识，潜意识，神秘。', reversedMeaning: '缺乏直觉，被压抑的情感，隐藏的议程。', imagePath: '/images/tarot/major-arcana/02-the-high-priestess.png' },
  { id: 3, name: '皇后', meaning: '女性气质，美丽，自然，养育，富足。', reversedMeaning: '依赖他人，缺乏自信，空虚，不育。', imagePath: '/images/tarot/major-arcana/03-the-empress.png' },
  { id: 4, name: '皇帝', meaning: '权威，建立，结构，一个父亲的形象。', reversedMeaning: '专制，缺乏纪律，不负责任。', imagePath: '/images/tarot/major-arcana/04-the-emperor.png' },
  { id: 5, name: '教皇', meaning: '精神智慧，宗教信仰，传统，制度。', reversedMeaning: '叛逆，创新，个人信念，拒绝传统。', imagePath: '/images/tarot/major-arcana/05-the-hierophant.png' },
  { id: 6, name: '恋人', meaning: '爱，和谐，关系，价值观的对齐，选择。', reversedMeaning: '分离，不和谐，冲突，错误的选择。', imagePath: '/images/tarot/major-arcana/06-the-lovers.png' },
  { id: 7, name: '战车', meaning: '控制，意志力，胜利，断言，决心。', reversedMeaning: '失控，缺乏方向，挫败，冲动。', imagePath: '/images/tarot/major-arcana/07-the-chariot.png' },
  { id: 8, name: '力量', meaning: '力量，勇气，说服，影响，同情。', reversedMeaning: '虚弱，自我怀疑，滥用权力，缺乏勇气。', imagePath: '/images/tarot/major-arcana/08-strength.png' },
  { id: 9, name: '隐士', meaning: '灵魂探索，内省，孤独，内在引导。', reversedMeaning: '孤立，拒绝建议，迷失方向，逃避。', imagePath: '/images/tarot/major-arcana/09-the-hermit.png' },
  { id: 10, name: '命运之轮', meaning: '好运，业力，生命周期，命运，一个转折点。', reversedMeaning: '坏运气，失控，抗拒变化，厄运。', imagePath: '/images/tarot/major-arcana/10-wheel-of-fortune.png' },
  { id: 11, name: '正义', meaning: '正义，公平，真理，因果，法律。', reversedMeaning: '不公正，偏见，缺乏责任感，腐败。', imagePath: '/images/tarot/major-arcana/11-justice.png' },
  { id: 12, name: '倒吊人', meaning: '暂停，限制，放手，牺牲。', reversedMeaning: '拖延，抗拒，无谓的牺牲，停滞。', imagePath: '/images/tarot/major-arcana/12-the-hanged-man.png' },
  { id: 13, name: '死神', meaning: '结束，改变，转变，过渡。', reversedMeaning: '抗拒变化，停滞，恐惧死亡，依恋过去。', imagePath: '/images/tarot/major-arcana/13-death.png' },
  { id: 14, name: '节制', meaning: '平衡，适度，耐心，目的。', reversedMeaning: '不平衡，过度，缺乏耐心，极端。', imagePath: '/images/tarot/major-arcana/14-temperance.png' },
  { id: 15, name: '恶魔', meaning: '束缚，成瘾，消极，唯物主义。', reversedMeaning: '释放，克服依赖，摆脱束缚，觉醒。', imagePath: '/images/tarot/major-arcana/15-the-devil.png' },
  { id: 16, name: '高塔', meaning: '灾难，突变，顿悟，混乱。', reversedMeaning: '避免灾难，抗拒变化，内在动荡，延迟危机。', imagePath: '/images/tarot/major-arcana/16-the-tower.png' },
  { id: 17, name: '星星', meaning: '希望，信念，目的，更新，灵性。', reversedMeaning: '缺乏信心，绝望，失去希望，断开连接。', imagePath: '/images/tarot/major-arcana/17-the-star.png' },
  { id: 18, name: '月亮', meaning: '幻觉，恐惧，焦虑，潜意识，直觉。', reversedMeaning: '克服恐惧，直觉释放，真相显现，内在安宁。', imagePath: '/images/tarot/major-arcana/18-the-moon.png' },
  { id: 19, name: '太阳', meaning: '积极，温暖，成功，活力。', reversedMeaning: '消极，缺乏活力，延迟成功，内在阴霾。', imagePath: '/images/tarot/major-arcana/19-the-sun.png' },
  { id: 20, name: '审判', meaning: '审判，重生，内心的呼唤，宽恕。', reversedMeaning: '自我怀疑，拒绝觉醒，逃避责任，缺乏宽恕。', imagePath: '/images/tarot/major-arcana/20-judgement.png' },
  { id: 21, name: '世界', meaning: '完成，整合，成就，旅行。', reversedMeaning: '未完成，缺乏成就感，寻求外在认可，延迟。', imagePath: '/images/tarot/major-arcana/21-the-world.png' },

  // 小阿卡纳 - 权杖 (Wands)
  { id: 22, name: '权杖ACE', meaning: '灵感，新的机会，成长，潜力。', reversedMeaning: '缺乏方向，错失机会，创意枯竭。', imagePath: '/images/tarot/minor-arcana/wands/wands-01-ace.png' },
  { id: 23, name: '权杖二', meaning: '未来规划，决策，离开舒适区。', reversedMeaning: '缺乏规划，恐惧变化，错误决定。', imagePath: '/images/tarot/minor-arcana/wands/wands-02-two.png' },
  { id: 24, name: '权杖三', meaning: '扩张，远见，海外机会。', reversedMeaning: '缺乏远见，计划受阻，障碍。', imagePath: '/images/tarot/minor-arcana/wands/wands-03-three.png' },
  { id: 25, name: '权杖四', meaning: '庆祝，和谐，婚姻，家庭。', reversedMeaning: '不稳定，家庭问题，缺乏和谐。', imagePath: '/images/tarot/minor-arcana/wands/wands-04-four.png' },
  { id: 26, name: '权杖五', meaning: '冲突，分歧，竞争。', reversedMeaning: '避免冲突，内在和谐，妥协。', imagePath: '/images/tarot/minor-arcana/wands/wands-05-five.png' },
  { id: 27, name: '权杖六', meaning: '胜利，公众认可，成功。', reversedMeaning: '私人成功，自我怀疑，延迟认可。', imagePath: '/images/tarot/minor-arcana/wands/wands-06-six.png' },
  { id: 28, name: '权杖七', meaning: '挑战，竞争，毅力。', reversedMeaning: '放弃，疲惫，缺乏勇气。', imagePath: '/images/tarot/minor-arcana/wands/wands-07-seven.png' },
  { id: 29, name: '权杖八', meaning: '快速行动，消息，旅行。', reversedMeaning: '延迟，沟通问题，急躁。', imagePath: '/images/tarot/minor-arcana/wands/wands-08-eight.png' },
  { id: 30, name: '权杖九', meaning: '韧性，勇气，最后的抵抗。', reversedMeaning: '偏执，防御过度，拒绝帮助。', imagePath: '/images/tarot/minor-arcana/wands/wands-09-nine.png' },
  { id: 31, name: '权杖十', meaning: '负担，责任，辛勤工作。', reversedMeaning: '无法承担，委派，寻求帮助。', imagePath: '/images/tarot/minor-arcana/wands/wands-10-ten.png' },
  { id: 32, name: '权杖侍从', meaning: '热情，探索，新的想法。', reversedMeaning: '缺乏热情，创意受阻，不成熟。', imagePath: '/images/tarot/minor-arcana/wands/wands-11-page.png' },
  { id: 33, name: '权杖骑士', meaning: '能量，激情，冲动，冒险。', reversedMeaning: '鲁莽，缺乏耐心，冲动行事。', imagePath: '/images/tarot/minor-arcana/wands/wands-12-knight.png' },
  { id: 34, name: '权杖王后', meaning: '自信，温暖，活力，决心。', reversedMeaning: '缺乏自信，嫉妒，控制欲。', imagePath: '/images/tarot/minor-arcana/wands/wands-13-queen.png' },
  { id: 35, name: '权杖国王', meaning: '领导力，远见，企业家精神。', reversedMeaning: '专制，缺乏远见，滥用权力。', imagePath: '/images/tarot/minor-arcana/wands/wands-14-king.png' },

  // 小阿卡纳 - 圣杯 (Cups)
  { id: 36, name: '圣杯ACE', meaning: '爱，新的关系，同情，创造力。', reversedMeaning: '情感封闭，失恋，创意枯竭。', imagePath: '/images/tarot/minor-arcana/cups/cups-01-ace.png' },
  { id: 37, name: '圣杯二', meaning: '统一的爱，伙伴关系，相互吸引。', reversedMeaning: '不平衡关系，分离，缺乏和谐。', imagePath: '/images/tarot/minor-arcana/cups/cups-02-two.png' },
  { id: 38, name: '圣杯三', meaning: '庆祝，友谊，创造力，社区。', reversedMeaning: '孤独，缺乏支持，创造力受阻。', imagePath: '/images/tarot/minor-arcana/cups/cups-03-three.png' },
  { id: 39, name: '圣杯四', meaning: '沉思，冷漠，重新评估。', reversedMeaning: '动机恢复，新机会，走出停滞。', imagePath: '/images/tarot/minor-arcana/cups/cups-04-four.png' },
  { id: 40, name: '圣杯五', meaning: '失落，后悔，失望。', reversedMeaning: '接受损失，向前看，宽恕。', imagePath: '/images/tarot/minor-arcana/cups/cups-05-five.png' },
  { id: 41, name: '圣杯六', meaning: '重逢，怀旧，童年的回忆。', reversedMeaning: '活在当下，释放过去，成长。', imagePath: '/images/tarot/minor-arcana/cups/cups-06-six.png' },
  { id: 42, name: '圣杯七', meaning: '机会，选择，幻想。', reversedMeaning: '现实检验，集中注意力，做决定。', imagePath: '/images/tarot/minor-arcana/cups/cups-07-seven.png' },
  { id: 43, name: '圣杯八', meaning: '失望，遗弃，退缩。', reversedMeaning: '返回，重新投入，寻求快乐。', imagePath: '/images/tarot/minor-arcana/cups/cups-08-eight.png' },
  { id: 44, name: '圣杯九', meaning: '愿望成真，满足，满意。', reversedMeaning: '内在不满，虚假快乐，缺乏感激。', imagePath: '/images/tarot/minor-arcana/cups/cups-09-nine.png' },
  { id: 45, name: '圣杯十', meaning: '神圣的爱，和谐的关系，家庭。', reversedMeaning: '家庭冲突，价值观不同，破碎关系。', imagePath: '/images/tarot/minor-arcana/cups/cups-10-ten.png' },
  { id: 46, name: '圣杯侍从', meaning: '创造性的机会，好奇心，可能性。', reversedMeaning: '创造力受阻，缺乏动力，幼稚。', imagePath: '/images/tarot/minor-arcana/cups/cups-11-page.png' },
  { id: 47, name: '圣杯骑士', meaning: '浪漫，魅力，想象力。', reversedMeaning: '情绪化，不切实际，欺骗。', imagePath: '/images/tarot/minor-arcana/cups/cups-12-knight.png' },
  { id: 48, name: '圣杯王后', meaning: '富有同情心，关怀，直觉。', reversedMeaning: '情绪依赖，过度敏感，缺乏界限。', imagePath: '/images/tarot/minor-arcana/cups/cups-13-queen.png' },
  { id: 49, name: '圣杯国王', meaning: '情绪平衡，控制，慷慨。', reversedMeaning: '情绪失控，操纵，冷漠。', imagePath: '/images/tarot/minor-arcana/cups/cups-14-king.png' },

  // 小阿卡纳 - 宝剑 (Swords)
  { id: 50, name: '宝剑ACE', meaning: '突破，新的想法，精神清晰。', reversedMeaning: '混乱，缺乏专注，思维阻塞。', imagePath: '/images/tarot/minor-arcana/swords/swords-01-ace.png' },
  { id: 51, name: '宝剑二', meaning: '艰难的决定，僵局，逃避。', reversedMeaning: '决定，清晰，选择方向。', imagePath: '/images/tarot/minor-arcana/swords/swords-02-two.png' },
  { id: 52, name: '宝剑三', meaning: '伤心，悲伤，拒绝。', reversedMeaning: '愈合，宽恕，乐观。', imagePath: '/images/tarot/minor-arcana/swords/swords-03-three.png' },
  { id: 53, name: '宝剑四', meaning: '休息，恢复，沉思。', reversedMeaning: '焦躁，重新投入，行动。', imagePath: '/images/tarot/minor-arcana/swords/swords-04-four.png' },
  { id: 54, name: '宝剑五', meaning: '冲突，不和，以牺牲他人为代价的胜利。', reversedMeaning: '和解，宽恕，移动。', imagePath: '/images/tarot/minor-arcana/swords/swords-05-five.png' },
  { id: 55, name: '宝剑六', meaning: '过渡，改变，摆脱困境。', reversedMeaning: '无法前进，抗拒改变，困住。', imagePath: '/images/tarot/minor-arcana/swords/swords-06-six.png' },
  { id: 56, name: '宝剑七', meaning: '背叛，欺骗，偷偷摸摸。', reversedMeaning: '诚实，承认，摆脱欺骗。', imagePath: '/images/tarot/minor-arcana/swords/swords-07-seven.png' },
  { id: 57, name: '宝剑八', meaning: '自我限制，监禁，受害者心态。', reversedMeaning: '自由，启蒙，摆脱束缚。', imagePath: '/images/tarot/minor-arcana/swords/swords-08-eight.png' },
  { id: 58, name: '宝剑九', meaning: '焦虑，噩梦，恐惧。', reversedMeaning: '希望，愈合，面对恐惧。', imagePath: '/images/tarot/minor-arcana/swords/swords-09-nine.png' },
  { id: 59, name: '宝剑十', meaning: '痛苦的结局，背叛，失落。', reversedMeaning: '复苏，新开始，从痛苦中学习。', imagePath: '/images/tarot/minor-arcana/swords/swords-10-ten.png' },
  { id: 60, name: '宝剑侍从', meaning: '新的想法，好奇心，追求真理。', reversedMeaning: '缺乏专注，八卦，恶意。', imagePath: '/images/tarot/minor-arcana/swords/swords-11-page.png' },
  { id: 61, name: '宝剑骑士', meaning: '雄心勃勃，行动导向，果断。', reversedMeaning: '鲁莽，缺乏方向，冲动。', imagePath: '/images/tarot/minor-arcana/swords/swords-12-knight.png' },
  { id: 62, name: '宝剑王后', meaning: '独立的，敏锐的智慧，清晰的界限。', reversedMeaning: '情绪冷漠，残酷，复仇。', imagePath: '/images/tarot/minor-arcana/swords/swords-13-queen.png' },
  { id: 63, name: '宝剑国王', meaning: '智力，权威，真理。', reversedMeaning: '滥用权力，操纵，冷酷。', imagePath: '/images/tarot/minor-arcana/swords/swords-14-king.png' },

  // 小阿卡纳 - 星币 (Pentacles)
  { id: 64, name: '星币ACE', meaning: '显化，繁荣，新的财务机会。', reversedMeaning: '错失机会，缺乏规划，物质损失。', imagePath: '/images/tarot/minor-arcana/pentacles/pentacles-01-ace.png' },
  { id: 65, name: '星币二', meaning: '平衡，优先次序，适应性。', reversedMeaning: '失衡，过度负担，缺乏组织。', imagePath: '/images/tarot/minor-arcana/pentacles/pentacles-02-two.png' },
  { id: 66, name: '星币三', meaning: '团队合作，协作，学习。', reversedMeaning: '缺乏合作，低质量工作，不认真。', imagePath: '/images/tarot/minor-arcana/pentacles/pentacles-03-three.png' },
  { id: 67, name: '星币四', meaning: '节约，安全，保守。', reversedMeaning: '过度保守，贪婪，物质主义。', imagePath: '/images/tarot/minor-arcana/pentacles/pentacles-04-four.png' },
  { id: 68, name: '星币五', meaning: '财务损失，贫困，孤立。', reversedMeaning: '财务恢复，精神富足，寻求帮助。', imagePath: '/images/tarot/minor-arcana/pentacles/pentacles-05-five.png' },
  { id: 69, name: '星币六', meaning: '慷慨，慈善，分享财富。', reversedMeaning: '自私，贪婪，不公平交易。', imagePath: '/images/tarot/minor-arcana/pentacles/pentacles-06-six.png' },
  { id: 70, name: '星币七', meaning: '耐心，投资，长远眼光。', reversedMeaning: '缺乏耐心，想要快速结果，失望。', imagePath: '/images/tarot/minor-arcana/pentacles/pentacles-07-seven.png' },
  { id: 71, name: '星币八', meaning: '学徒，技能发展，精通。', reversedMeaning: '缺乏专注，完美主义，技能平庸。', imagePath: '/images/tarot/minor-arcana/pentacles/pentacles-08-eight.png' },
  { id: 72, name: '星币九', meaning: '富足，奢侈，自给自足。', reversedMeaning: '过度纵容，金钱问题，缺乏感激。', imagePath: '/images/tarot/minor-arcana/pentacles/pentacles-09-nine.png' },
  { id: 73, name: '星币十', meaning: '财富，遗产，家庭。', reversedMeaning: '财务损失，家庭冲突，价值观差异。', imagePath: '/images/tarot/minor-arcana/pentacles/pentacles-10-ten.png' },
  { id: 74, name: '星币侍从', meaning: '新的机会，梦想，渴望。', reversedMeaning: '缺乏计划，不切实际，拖延。', imagePath: '/images/tarot/minor-arcana/pentacles/pentacles-11-page.png' },
  { id: 75, name: '星币骑士', meaning: '勤奋，可靠，负责。', reversedMeaning: '懒惰，不可靠，缺乏动力。', imagePath: '/images/tarot/minor-arcana/pentacles/pentacles-12-knight.png' },
  { id: 76, name: '星币王后', meaning: '养育，务实，财务安全。', reversedMeaning: '财务不安全，忽视自我照顾，物质主义。', imagePath: '/images/tarot/minor-arcana/pentacles/pentacles-13-queen.png' },
  { id: 77, name: '星币国王', meaning: '富裕，商业头脑，领导力。', reversedMeaning: '财务不负责，腐败，滥用资源。', imagePath: '/images/tarot/minor-arcana/pentacles/pentacles-14-king.png' },
];
