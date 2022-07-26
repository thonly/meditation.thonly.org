import { getRandomInteger } from "/utils.mjs";

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
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    },
    {
        figure: "䷀",
        chinese: "乾",
        english: "qián",
        meaning: "The Creative, Heaven"
    }
];

export default () => {
    const number = getRandomInteger(0, HEXAGRAMS.length - 1);
    return { number: number + 1, hexagram: HEXAGRAMS[number]};
}