import { getRandomInteger } from "/utils.mjs";

// https://en.wikipedia.org/wiki/King_Wen_sequence
const HEXAGRAMS = [
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷁",
        chinese: "坤",
        english: "kūn",
        meaning: "The Receptive, Earth"
    },
    {
        figure: "䷂",
        chinese: "屯",
        english: "chún",
        meaning: "Difficulty At The Beginning"
    },
    {
        figure: "䷃",
        chinese: "蒙",
        english: "méng",
        meaning: "Youthful Folly"
    },
    {
        figure: "䷄",
        chinese: "需",
        english: "xū",
        meaning: "Waiting"
    },
    {
        figure: "䷅",
        chinese: "訟",
        english: "sòng",
        meaning: "Conflict"
    },
    {
        figure: "䷆",
        chinese: "師",
        english: "shī",
        meaning: "The Army"
    },
    {
        figure: "䷇",
        chinese: "比",
        english: "bǐ",
        meaning: "Holding Together"
    },
    {
        figure: "䷈",
        chinese: "小畜",
        english: "xiǎo chù",
        meaning: "The Taming Power of the Small"
    },
    {
        figure: "䷉",
        chinese: "履",
        english: "lǚ",
        meaning: "Treading (Conduct)"
    },
    {
        figure: "䷊",
        chinese: "泰",
        english: "tài",
        meaning: "Peace"
    },
    {
        figure: "䷋",
        chinese: "否",
        english: "pǐ",
        meaning: "Standstill (Stagnation)"
    },
    {
        figure: "䷌",
        chinese: "同人",
        english: "tóng rén",
        meaning: "Fellowship with Men"
    },
    {
        figure: "䷍",
        chinese: "大有",
        english: "dà yǒu",
        meaning: "Possession in Great Measure"
    },
    {
        figure: "䷎",
        chinese: "謙",
        english: "qiān",
        meaning: "Modesty"
    },
    {
        figure: "䷏",
        chinese: "豫",
        english: "yù",
        meaning: "Enthusiasm"
    },
    {
        figure: "䷐",
        chinese: "隨",
        english: "suí",
        meaning: "Following"
    },
    {
        figure: "䷑",
        chinese: "蠱",
        english: "gŭ",
        meaning: "Work On What Has Been Spoiled (Decay)"
    },
    {
        figure: "䷒",
        chinese: "臨",
        english: "lín",
        meaning: "Approach"
    },
    {
        figure: "䷓",
        chinese: "觀",
        english: "guān",
        meaning: "Contemplation (View)"
    },
    {
        figure: "䷔",
        chinese: "噬嗑",
        english: "shì kè",
        meaning: "Biting Through"
    },
    {
        figure: "䷕",
        chinese: "賁",
        english: "bì",
        meaning: "Grace"
    },
    {
        figure: "䷖",
        chinese: "剝",
        english: "bō",
        meaning: "Splitting Apart"
    },
    {
        figure: "䷗",
        chinese: "復",
        english: "fù",
        meaning: "Return (The Turning Point)"
    },
    {
        figure: "䷘",
        chinese: "無妄",
        english: "wú wàng",
        meaning: "Innocence (The Unexpected)"
    },
    {
        figure: "䷙",
        chinese: "大畜",
        english: "dà chù",
        meaning: "The Taming Power of the Great"
    },
    {
        figure: "䷚",
        chinese: "頤",
        english: "yí",
        meaning: "The Corners of the Mouth (Providing Nourishment)	"
    },
    {
        figure: "䷛",
        chinese: "大過",
        english: "dà guò",
        meaning: "Preponderance Of The Great"
    },
    {
        figure: "䷜",
        chinese: "坎",
        english: "kǎn",
        meaning: "The Abysmal (Water)"
    },
    {
        figure: "䷝",
        chinese: "離",
        english: "lí",
        meaning: "The Clinging, Fire"
    },
    {
        figure: "䷞",
        chinese: "咸",
        english: "xián",
        meaning: "Influence (Wooing)"
    },
    {
        figure: "䷟",
        chinese: "恆",
        english: "héng",
        meaning: "Duration"
    },
    {
        figure: "䷠",
        chinese: "遯",
        english: "dùn",
        meaning: "Retreat"
    },
    {
        figure: "䷡",
        chinese: "大壯",
        english: "dà zhuàng",
        meaning: "The Power of the Great"
    },
    {
        figure: "䷢",
        chinese: "晉",
        english: "jìn",
        meaning: "Progress"
    },
    {
        figure: "䷣",
        chinese: "明夷",
        english: "míng yí",
        meaning: "Brilliance Injured"
    },
    {
        figure: "䷤",
        chinese: "家人",
        english: "jiā rén",
        meaning: "The Family (The Clan)"
    },
    {
        figure: "䷥",
        chinese: "睽",
        english: "kuí",
        meaning: "Opposition"
    },
    {
        figure: "䷦",
        chinese: "蹇",
        english: "jiǎn",
        meaning: "Obstruction"
    },
    {
        figure: "䷧",
        chinese: "解",
        english: "xiè",
        meaning: "Deliverance"
    },
    {
        figure: "䷨",
        chinese: "損",
        english: "sǔn",
        meaning: "Decrease"
    },
    {
        figure: "䷩",
        chinese: "益",
        english: "yì",
        meaning: "Increase"
    },
    {
        figure: "䷪",
        chinese: "夬",
        english: "guài",
        meaning: "Break-Through (Resoluteness)"
    },
    {
        figure: "䷫",
        chinese: "姤",
        english: "gòu",
        meaning: "Coming To Meet"
    },
    {
        figure: "䷬",
        chinese: "萃",
        english: "cuì",
        meaning: "Gathering Together (Massing)"
    },
    {
        figure: "䷭",
        chinese: "升",
        english: "shēng",
        meaning: "Pushing Upward"
    },
    {
        figure: "䷮",
        chinese: "困",
        english: "kùn",
        meaning: "Oppression (Exhaustion)"
    },
    {
        figure: "䷯",
        chinese: "井",
        english: "jǐng",
        meaning: "The Well"
    },
    {
        figure: "䷰",
        chinese: "革",
        english: "gé",
        meaning: "Revolution (Molting)"
    },
    {
        figure: "䷱",
        chinese: "鼎",
        english: "dǐng",
        meaning: "The Cauldron"
    },
    {
        figure: "䷲",
        chinese: "震",
        english: "zhèn",
        meaning: "The Arousing (Shock, Thunder)"
    },
    {
        figure: "䷳",
        chinese: "艮",
        english: "gèn",
        meaning: "Keeping Still, Mountain"
    },
    {
        figure: "䷴",
        chinese: "漸",
        english: "jiàn",
        meaning: "Development (Gradual Progress)"
    },
    {
        figure: "䷵",
        chinese: "歸妹",
        english: "guī mèi",
        meaning: "The Marrying Maiden"
    },
    {
        figure: "䷶",
        chinese: "豐",
        english: "fēng",
        meaning: "Abundance"
    },
    {
        figure: "䷷",
        chinese: "旅",
        english: "lǚ",
        meaning: "The Wanderer"
    },
    {
        figure: "䷸",
        chinese: "巽",
        english: "xùn",
        meaning: "The Gentle (The Penetrating, Wind)"
    },
    {
        figure: "䷹",
        chinese: "兌",
        english: "duì",
        meaning: "The Joyous, Lake"
    },
    {
        figure: "䷺",
        chinese: "渙",
        english: "huàn",
        meaning: "Dispersion (Dissolution)"
    },
    {
        figure: "䷻",
        chinese: "節",
        english: "jié",
        meaning: "Limitation"
    },
    {
        figure: "䷼",
        chinese: "中孚",
        english: "zhōng fú",
        meaning: "Inner Truth"
    },
    {
        figure: "䷽",
        chinese: "小過",
        english: "xiǎo guò",
        meaning: "Preponderance of the Small"
    },
    {
        figure: "䷾",
        chinese: "既濟",
        english: "jì jì",
        meaning: "After Completion"
    },
    {
        figure: "䷿",
        chinese: "未濟",
        english: "wèi jì",
        meaning: "Before Completion"
    }
];

export default () => {
    const number = getRandomInteger(0, HEXAGRAMS.length - 1);
    return { number: number + 1, hexagram: HEXAGRAMS[number]};
}