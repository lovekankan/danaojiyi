
var GameData = {
    currJyTotalNum: 0,  //记忆总数量
    currEveryJyTime: 0,  //单个记忆时间
    currCostTotalTime: 0, //当前一轮游戏花费的总时间

    totalItemNum: 12,    //总个数
    jyDataArr: null,    //记忆的数据
    haveJyDataArr: null,    //已经记忆的数据

    randomMin: 10,
    randomMax: 99
};

var GameRemberType = {
    "填数字": 0,
    "填名称": 1,
    "全都填": 2
};

var GameItemData = [
    "res/gameitem/item_0.jpg",
    "res/gameitem/item_1.jpg",
    "res/gameitem/item_2.jpg",
    "res/gameitem/item_3.jpg",
    "res/gameitem/item_4.jpg",
    "res/gameitem/item_5.jpg",
    "res/gameitem/item_6.jpg",
    "res/gameitem/item_7.jpg",
    "res/gameitem/item_8.jpg",
    "res/gameitem/item_9.jpg",
    "res/gameitem/item_10.jpg",
    "res/gameitem/item_11.jpg",
    "res/gameitem/item_12.jpg",
    "res/gameitem/item_13.jpg",
    "res/gameitem/item_14.jpg",
    "res/gameitem/item_15.jpg",
    "res/gameitem/item_16.jpg",
    "res/gameitem/item_17.jpg",
    "res/gameitem/item_18.jpg",
    "res/gameitem/item_19.jpg",
    "res/gameitem/item_20.jpg",
    "res/gameitem/item_21.jpg",
    "res/gameitem/item_22.jpg",
    "res/gameitem/item_23.jpg",
    "res/gameitem/item_24.jpg",
    "res/gameitem/item_25.jpg",
    "res/gameitem/item_26.jpg",
    "res/gameitem/item_27.jpg",
    "res/gameitem/item_28.jpg",
    "res/gameitem/item_29.jpg",
    "res/gameitem/item_30.jpg"
];

var GameItemName = [
    "遗鸥",
    "灵猫",
    "龙鱼",
    "驼鹿",
    "白头鹤",
    "豚尾猴",
    "土狼",
    "鬣狗",
    "狮虎兽",
    "虎鲸",
    "雪豹",
    "海豹",
    "盘羊",
    "白唇鹿",
    "海狸",
    "海象",
    "海狸",
    "白狮",
    "黑狼",
    "海牛",
    "霸王龙",
    "恐象",
    "垂耳兔",
    "黑蓝虎",
    "海兔",
    "山魈",
    "狒狒",
    "白眉",
    "笑脸蜘蛛",
    "狨猴",
    "蜜袋鼯",
    "小飞鼠",

];