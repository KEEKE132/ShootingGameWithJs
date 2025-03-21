let isClear = 0;
let xDis = 0;
let yDis = 0;
let VELOCITY = 0.7;
let ROOT_VEL = (VELOCITY / Math.SQRT2);
let pressCheck = [0, 0, 0, 0];
let xFirst = 1;
let yFirst = 0;
let xMove = 1;
let yMove = 0;
let timeScore = 0;
let pow2 = a => a * a;
let PI = Math.PI;
let cos = Math.cos;
let sin = Math.sin;
let tan = Math.tan;
let box = document.getElementById('box');
let layer = document.getElementById('layer');
let sepa1 = document.getElementById('sepa1');
let sepa2 = document.getElementById('sepa2');
let levelBar = document.getElementById('level');
let isStop = 0;
let isChoice = 0;
let sumr_pe = 7.5 + 10 - 2;
let sumr_ea = 5 + 10;
let choiceNum = 21;
let upStack = 0;
let enemyLv = 0;
let isShield = 0;
let status = {
    damage: [1, 1.1, 1.2, 1.3, 1.5],
    delay: [1, 0.95, 0.90, 0.85, 0.80, 0.70],
    plus: [0, 0, 1, 1, 2],
    repeat: [0, 0, 1, 1, 2],
    expUp: [1, 1.2, 1.4, 1.6, 1.8, 2.5],
    radius: [1, 1.08, 1.16, 1.24, 1.32, 1.4]
}
let skillTable = [
    {
        name: '기본공격',
        index: 0,
        lv: 0,
        maxlv: 8,
        damage: [15, 25, 25, 30, 40, 45, 45, 55, 55],
        delay: [550, 500, 410, 370, 370, 350, 290, 250, 250],
        vel: [3, 3, 3, 4, 4, 4, 5, 6, 6],
        plus: 0,
        unique: [10, 10, 10, 10, 10, 10, 10, 5],
        scr: ['피해+<br>공속+',
            '공속++',
            '피해+<br>공속+',
            '피해++',
            '피해+<br>공속+',
            '공속++',
            '공속++<br>피해++',
            '약한 넉백 추가'
        ]
    },
    {
        name: '관통공격',
        index: 1,
        lv: 0,
        maxlv: 8,
        damage: [0, 10, 15, 20, 25, 30, 35, 40, 45],
        radius: [0, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5],
        vel: [0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 3.2],
        plus: 0,
        time: [0, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 5200],
        unique: [5, 10, 10, 10, 10, 10, 10, 10],
        delay: [1000000, 3000, 2800, 2600, 2400, 2200, 2000, 1800, 1500],
        scr: ['적을 관통하고 벽에닿으면 튕기는 공격을 합니다.',
            'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'Master: 지속시간 및 속도 +30%']
    },
    {
        name: '폭발공격',
        index: 2,
        lv: 0,
        maxlv: 8,
        damage: [0, 10, 15, 20, 25, 30, 35, 40, 120],
        damage2: [0, 10, 13, 16, 19, 22, 25, 28, 30],
        radius: [0, 5, 5, 5, 5, 5, 5, 5, 5],
        radius2: [0, 20, 21, 22, 23, 24, 25, 26, 28],
        vel: [0, 2, 2, 2, 2, 2, 2, 2, 2],
        plus: 0,
        unique: [5, 10, 10, 10, 10, 10, 10, 10],
        delay: [1000000, 2000, 1800, 1600, 1400, 1200, 1000, 900, 700],
        scr: ['적중시 폭발하는 공격을 합니다.',
            'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'Master: 직격 피해량 +200%']
    },
    {
        name: '피해',
        index: 3,
        lv: 0,
        maxlv: 4,
        unique: [5, 10, 10, 10],
        scr: ['전체피해 +10%',
            '전체피해 +10%',
            '전체피해 +10%',
            '전체피해 +20% (Master)',
        ]
    },
    {
        name: '쿨타임',
        index: 4,
        lv: 0,
        maxlv: 5,
        unique: [5, 10, 10, 10, 10],
        scr: ['쿨타임감소 +5%',
            '쿨타임감소 +5%',
            '쿨타임감소 +5%',
            '쿨타임감소 +5%',
            '쿨타임감소 +10%(Master)',]
    },
    {
        name: '투사체',
        index: 5,
        lv: 0,
        maxlv: 4,
        unique: [2, 2, 1.5, 1.5],
        scr: ['투사체 +0.5',
            '투사체 +0.5',
            '투사체 +0.5',
            '투사체 +0.5 (Master)',
        ]
    },
    {
        name: '공격횟수',
        index: 6,
        lv: 0,
        maxlv: 4,
        unique: [1.5, 1.5, 1, 1],
        scr: ['공격횟수 +0.5',
            '공격횟수 +0.5',
            '공격횟수 +0.5',
            '공격횟수 +0.5 (Master)',
        ]
    },
    {
        name: '경험치',
        index: 7,
        lv: 0,
        maxlv: 5,
        unique: [5, 10, 10, 10, 10],
        scr: ['경험치배율 +20%',
            '경험치배율 +20%',
            '경험치배율 +20%',
            '경험치배율 +20%',
            '경험치배율 +70% (Master)',
        ]
    },
    {
        name: '회전공격',
        index: 8,
        lv: 0,
        maxlv: 8,
        damage: [0, 4, 7, 11, 16, 21, 26, 30, 30],
        radius: [0, 6, 6, 7, 7, 8, 8, 9, 10],
        vel: [0, PI / 80, PI / 80, PI / 80, PI / 80, PI / 80, PI / 80, PI / 80, PI* 1.5 / 80],
        plus: [0, 2, 2, 2, 2, 2, 2, 2, 3],
        unique: [5, 10, 10, 10, 10, 10, 10, 10],
        scr: ['주변을 회전하며 공격하는 위성을 소환합니다.',
            'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'Master: 위성 개수 +1, 회전속도 +50%']
    },
    {
        name: '지점공격',
        index: 9,
        lv: 0,
        maxlv: 8,
        damage: [0, 2, 3, 4, 6, 8, 10, 12, 0],
        radius: [0, 35, 35, 35, 35, 35, 35, 35, 42],
        plus: 0,
        unique: [5, 10, 10, 10, 10, 10, 10, 10],
        delay: [1000000, 5000, 4800, 4600, 4400, 4200, 4000, 4000, 4000],
        scr: ['일정시간마다 마우스위치에 공격을 합니다.',
            'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'Master: 공격 범위 +20%, 경직추가']
    },
    {
        name: '공격범위',
        index: 10,
        lv: 0,
        maxlv: 5,
        unique: [10, 10, 10, 10, 10],
        scr: ['공격범위+8%',
            '공격범위+8%',
            '공격범위+8%',
            '공격범위+8%',
            '공격범위 + 8 % (Master)',
        ]
    },
    {
        name: '쉴드',
        index: 11,
        lv: 0,
        maxlv: 4,
        unique: [5, 5, 5, 5, 5],
        delay: [100000, 60, 50, 40, 30],
        scr: ['일정시간마다 적의 공격을 막는 보호막을 생성합니다.<br>파괴될때 적을 밀쳐냅니다.',
            'lv2', 'lv3', 'lv4(Master)']
    },
    {
        name: '범위공격',
        index: 12,
        lv: 0,
        maxlv: 8,
        damage: [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5],
        radius: [0, 35, 37, 39, 41, 43, 45, 47, 50],
        unique: [5, 10, 10, 10, 10, 10, 10, 10],
        scr: ['캐릭터 주변의 적을 지속적으로 공격합니다.',
            'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'Master: 공격 대상 둔화효과 추가']
    },
    {
        name: '난사',
        index: 13,
        lv: 0,
        maxlv: 8,
        damage: [0, 10, 15, 20, 25, 30, 45, 50, 50],
        radius: [0, 3, 3, 3, 3, 3, 3, 3, 3],
        delay: [1000000, 6000, 5800, 5600, 5400, 5200, 5000, 4800, 4500],
        vel: [0, 5, 5, 5, 5, 5, 5, 5, 5],
        count: [0, 1, 1, 1, 1, 1, 1, 1, 3],
        plus: [0, 20, 22, 24, 26, 28, 30, 32, 35],
        unique: [5, 10, 10, 10, 10, 10, 10, 10],
        scr: ['주변에 총알을 난사합니다.(관통 1회)',
            'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'Master: 관통+2']
    },
    {
        name: '폭격',
        index: 14,
        lv: 0,
        maxlv: 8,
        damage: [0, 30, 40, 50, 60, 70, 80, 90, 100],
        radius: [0, 33, 33, 33, 33, 33, 33, 33, 33],
        plus: [0, 6, 6, 6, 6, 6, 6, 6, 9],
        unique: [5, 10, 10, 10, 10, 10, 10, 10],
        delay: [1000000, 7500, 7300, 7000, 6800, 6500, 6200, 6000, 5500],
        scr: ['무작위 지점에 범위 공격을 합니다.',
            'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'Master: 공격 개수 +50%']
    },
    {
        name: '기관총',
        index: 15,
        lv: 0,
        maxlv: 8,
        damage: [0, 10, 12, 15, 18, 23, 30, 38, 45],
        delay: [1000000, 300, 300, 300, 300, 300, 300, 300, 200],
        vel: [0, 5, 5, 6, 6, 7, 8, 9, 10],
        plus: 0,
        unique: [5, 10, 10, 10, 10, 10, 10, 10],
        scr: ['가까운 적에게 정확도가 낮은공격을 합니다.',
            'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'Master: 공격속도 +33%']
    },
    {
        name: '충격파',
        index: 16,
        lv: 0,
        maxlv: 8,
        damage: [0, 10, 17, 24, 31, 38, 45, 52, 70],
        radius: [0, 1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.3],
        plus: 0,
        unique: [5, 10, 10, 10, 10, 10, 10, 10],
        delay: [1000000, 5000, 4700, 4400, 4100, 3800, 3500, 3200, 3000],
        scr: ['일정시간마다 주변을 공격하고 살짝 밀칩니다.',
            'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'Master: 피해량 +30%']
    },
    {
        name: '샷건',
        index: 17,
        lv: 0,
        maxlv: 8,
        damage: [0, 5, 8, 11, 15, 19, 24, 29, 35],
        radius: [0, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 6.6],
        delay: [1000000, 3200, 2800, 2400, 2000, 1700, 1400, 1200, 1000],
        vel: [0, 4, 4, 4, 4, 4, 4, 4, 4.8],
        unique: [5, 10, 10, 10, 10, 10, 10, 10],
        scr: ['샷건을 발사하여 적을 크게 밀칩니다.(투사체,공격횟수 영향X)',
            'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'Master: 총알 크기 +20% 사거리+ 20%']
    },
    {
        name: '눈보라',
        index: 18,
        lv: 0,
        maxlv: 8,
        damage: [0, 1, 2, 3, 4, 5, 6, 8, 10],
        delay: [1000, 20000, 19000, 18000, 17000, 16000, 15000, 14000, 13000],
        time: [0, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 5000],
        unique: [5, 10, 10, 10, 10, 10, 10, 10],
        scr: ['모든 적에게 피해를 주고 잠시동안 느리게 합니다.',
            'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'Master: 지속시간 +2초']
    },
    {
        name: '공 소환',
        index: 19,
        lv: 0,
        maxlv: 8,
        damage: [0, 2, 4, 6, 8, 10, 12, 14, 16],
        radius: [0, 12, 12, 12, 12, 12, 12, 12, 18],
        vel: [0, 4, 4, 4, 4, 4, 4, 4, 4],
        unique: [5, 10, 10, 10, 10, 10, 10, 10],
        scr: ['플레이어와 마우스 사이를 튕기는 공을 소환합니다.',
            'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'Master: 공 크기 +50%']
    },
    {
        name: '낙뢰',
        index: 20,
        lv: 0,
        maxlv: 10,
        damage: [0, 10, 13, 16, 19, 22, 25, 28, 30, 60, 60],
        radius: [0, 16, 16, 16, 16, 16, 16, 16, 16, 16, 25],
        plus: 0,
        unique: [5, 10, 10, 10, 10, 10, 10, 10, 2, 2],
        delay: [1000000, 1000, 900, 800, 700, 600, 500, 500, 500, 500, 500],
        scr: ['가까운 무작위 적에게 좁은 범위 공격을 합니다.',
            'lv2', 'lv3', 'lv4', 'lv5', 'v6', 'lv7', 'Master: 낮은확률로 추가 레벨업이 가능합니다.', 'Lv9: 피해량이크게 증가합니다', 'Lv10 범위가 크게 증가합니다.']
    },
]
let enemyTable = [
    {
        lv: 0,
        hp: 10,
        vel: 0.4,
        delay: 400,
        num: 1,
        exp: 0.5,
        color: 'lightpink'
    },
    {
        lv: 1,
        hp: 10,
        vel: 0.4,
        delay: 400,
        num: 2,
        exp: 0.5,
        color: 'lightpink'
    },
    {
        lv: 2,
        hp: 10,
        vel: 0.4,
        delay: 400,
        num: 3,
        exp: 0.5,
        color: 'lightpink'
    },
    {
        lv: 3,
        hp: 15,
        vel: 0.4,
        delay: 1000,
        num: 5,
        exp: 1,
        color: 'red'
    },
    {
        lv: 4,
        hp: 15,
        vel: 0.4,
        delay: 800,
        num: 5,
        exp: 1,
        color: 'red'
    },
    {
        lv: 5,
        hp: 15,
        vel: 0.4,
        delay: 500,
        num: 5,
        exp: 1,
        color: 'red'
    },
    {
        lv: 6,
        hp: 50,
        vel: 0.3,
        delay: 500,
        num: 1,
        exp: 4,
        color: 'orange'
    },
    {
        lv: 7,
        hp: 50,
        vel: 0.3,
        delay: 500,
        num: 2,
        exp: 4,
        color: 'orange'
    },
    {
        lv: 8,
        hp: 50,
        vel: 0.3,
        delay: 500,
        num: 2,
        exp: 4,
        color: 'orange'
    },
    {
        lv: 9,
        hp: 50,
        vel: 0.3,
        delay: 500,
        num: 4,
        exp: 4,
        color: 'orange'
    },
    {
        lv: 10,
        hp: 120,
        vel: 0.25,
        delay: 300,
        num: 1,
        exp: 7,
        color: 'yellow'
    },
    {
        lv: 11,
        hp: 120,
        vel: 0.25,
        delay: 300,
        num: 2,
        exp: 7,
        color: 'yellow'
    },
    {
        lv: 12,
        hp: 120,
        vel: 0.25,
        delay: 300,
        num: 3,
        exp: 7,
        color: 'yellow'
    },

    {
        lv: 12,
        hp: 120,
        vel: 0.25,
        delay: 300,
        num: 4,
        exp: 7,
        color: 'yellow'
    },
    {
        lv: 13,
        hp: 170,
        vel: 0.35,
        delay: 350,
        num: 1,
        exp: 10,
        color: 'green'
    },
    {
        lv: 14,
        hp: 170,
        vel: 0.35,
        delay: 350,
        num: 2,
        exp: 10,
        color: 'green'
    },
    {
        lv: 15,
        hp: 170,
        vel: 0.35,
        delay: 350,
        num: 3,
        exp: 10,
        color: 'green'
    },
    {
        lv: 16,
        hp: 170,
        vel: 0.35,
        delay: 350,
        num: 4,
        exp: 10,
        color: 'green'
    },
    {
        lv: 17,
        hp: 260,
        vel: 0.5,
        delay: 500,
        num: 1,
        exp: 30,
        color: 'lightblue'
    },
    {
        lv: 18,
        hp: 260,
        vel: 0.5,
        delay: 500,
        num: 2,
        exp: 30,
        color: "lightblue"
    },
    {
        lv: 19,
        hp: 260,
        vel: 0.5,
        delay: 500,
        num: 3,
        exp: 30,
        color: 'lightblue'
    },
    {
        lv: 20,
        hp: 260,
        vel: 0.5,
        delay: 500,
        num: 4,
        exp: 30,
        color: 'lightblue'
    },
    {
        lv: 21,
        hp: 400,
        vel: 0.4,
        delay: 400,
        num: 1,
        exp: 60,
        color: 'blue'
    },
    {
        lv: 22,
        hp: 400,
        vel: 0.4,
        delay: 400,
        num: 2,
        exp: 60,
        color: 'blue'
    },
    {
        lv: 23,
        hp: 400,
        vel: 0.4,
        delay: 400,
        num: 3,
        exp: 60,
        color: 'blue'
    },
    {
        lv: 24,
        hp: 400,
        vel: 0.4,
        delay: 400,
        num: 4,
        exp: 60,
        color: 'blue'
    },
    {
        lv: 25,
        hp: 450,
        vel: 0.45,
        delay: 300,
        num: 1,
        exp: 100,
        color: 'mediumpurple'
    },
    {
        lv: 26,
        hp: 450,
        vel: 0.45,
        delay: 300,
        num: 2,
        exp: 100,
        color: 'mediumpurple'
    },
    {
        lv: 27,
        hp: 450,
        vel: 0.45,
        delay: 300,
        num: 3,
        exp: 100,
        color: 'mediumpurple'
    },
    {
        lv: 28,
        hp: 450,
        vel: 0.45,
        delay: 300,
        num: 4,
        exp: 100,
        color: 'mediumpurple'
    },
    {
        lv: 29,
        hp: 550,
        vel: 0.5,
        delay: 300,
        num: 1,
        exp: 150,
        color: 'purple'
    },
    {
        lv: 30,
        hp: 550,
        vel: 0.5,
        delay: 300,
        num: 2,
        exp: 150,
        color: 'purple'
    },
    {
        lv: 31,
        hp: 550,
        vel: 0.5,
        delay: 300,
        num: 3,
        exp: 150,
        color: 'purple'
    },
    {
        lv: 32,
        hp: 550,
        vel: 0.5,
        delay: 300,
        num: 4,
        exp: 150,
        color: 'purple'
    },
    {
        lv: 33,
        hp: 500,
        vel: 0.7,
        delay: 300,
        num: 1,
        exp: 150,
        color: 'palegreen'
    },
    {
        lv: 34,
        hp: 500,
        vel: 0.7,
        delay: 300,
        num: 2,
        exp: 150,
        color: 'palegreen'
    },
    {
        lv: 35,
        hp: 500,
        vel: 0.7,
        delay: 300,
        num: 3,
        exp: 150,
        color: 'palegreen'
    },
    {
        lv: 36,
        hp: 500,
        vel: 0.7,
        delay: 300,
        num: 4,
        exp: 150,
        color: 'palegreen'
    },
    {
        lv: 37,
        hp: 500,
        vel: 0.7,
        delay: 300,
        num: 4,
        exp: 150,
        color: 'palegreen'
    },
    {
        lv: 38,
        hp: 500,
        vel: 0.7,
        delay: 250,
        num: 4,
        exp: 200,
        color: 'palegreen'
    },
]
enemyTable[1001] = enemyTable[1001] = enemyTable[1002] = enemyTable[1003] = enemyTable[1004] = {
    hp: 400,
    vel: 0.25,
    exp: 30,
    time: 30,
    color: 'darkred',
}
enemyTable[1005] = {
    hp: 8000,
    vel: 0.5,
    time: 10000,
    exp: 2500,
    color: 'darkblue',
}
enemyTable[1006] = {
    hp: 120000,
    vel: 0.9,
    time: 10000,
    exp: 3000,
    color: 'darkred',
}
class Player {
    constructor() {
        this.startPressEvent();
        this.startUpEvent();
        this.startShipMove();
        this.ship = document.getElementById('ship');
        this.radius = 7.5;
        this.x = 507;
        this.y = 355;
    }
    startPressEvent() {
        document.addEventListener('keydown', this.pressEvent);
    }
    stopPressEvent() {
        document.removeEventListener('keydown', this.pressEvent);
    }
    pressEvent(e) {
        switch (e.code) {
            case 'KeyW':
                pressCheck[0] = 1;
                break;
            case 'KeyA':
                pressCheck[1] = 1;
                break;
            case 'KeyS':
                pressCheck[2] = 1
                break;
            case 'KeyD':
                pressCheck[3] = 1
                break;
            case 'Escape':
                if (isStop == 0 && isChoice == 0) {
                    gameStop();
                }
                else if (isStop == 1 && isChoice == 0 && isClear == 0) {
                    restart();
                }
                break;
        }
    }
    startUpEvent() {
        document.addEventListener('keyup', this.upEvent);
    }
    stopUpEvent() {
        document.removeEventListener('keyup', this.upEvent);
    }
    upEvent(e) {
        switch (e.code) {
            case 'KeyW':
                pressCheck[0] = 0;
                break;
            case 'KeyA':
                pressCheck[1] = 0;
                break;
            case 'KeyS':
                pressCheck[2] = 0;
                break;
            case 'KeyD':
                pressCheck[3] = 0;
                break;
        }
    }
    startShipMove() {
        this.move = setInterval(function () {
            this.calFirst()
            this.calVel()
            this.x = this.x + xDis;
            this.y = this.y + yDis;
            this.checkCollision()
            this.ship.style.left = this.x + 'px';
            this.ship.style.top = this.y + 'px';
            this.checkEnemy();
        }.bind(this), 5)
    }
    stopMove() {
        clearInterval(this.move);
    }
    calFirst() {
        if (xFirst == 1) {
            if (pressCheck[1] == 0 && pressCheck[3] == 1) {
                xFirst = 3;
                xMove = 3;
            }
            else if (pressCheck[1] == 1 && pressCheck[3] == 1) {
                xFirst = 1;
                xMove = 3;
            }
            else if (pressCheck[1] == 1) {
                xFirst = 1;
                xMove = 1;
            }
        }
        else if (xFirst == 3) {
            if (pressCheck[1] == 1 && pressCheck[3] == 0) {
                xFirst = 1;
                xMove = 1;
            }
            else if (pressCheck[1] == 1 && pressCheck[3] == 1) {
                xFirst = 3;
                xMove = 1;
            }
            else if (pressCheck[3] == 1) {
                xFirst = 3;
                xMove = 3;
            }
        }
        else if (xFirst == -1) {
            if (pressCheck[1] == 1 && pressCheck[3] == 0) {
                xFirst = 1;
                xMove = 1;
            }
            else if (pressCheck[1] == 0 && pressCheck[3] == 1) {
                xFirst = 3;
                xMove = 3;
            }
        }
        if (yFirst == 0) {
            if (pressCheck[0] == 0 && pressCheck[2] == 1) {
                yFirst = 2;
                yMove = 2;
            }
            else if (pressCheck[0] == 1 && pressCheck[2] == 1) {
                yFirst = 0;
                yMove = 2;
            }
            else if (pressCheck[0] == 1) {
                yFirst = 0;
                yMove = 0;
            }
        }
        else if (yFirst == 2) {
            if (pressCheck[0] == 1 && pressCheck[2] == 0) {
                yFirst = 0;
                yMove = 0;
            }
            else if (pressCheck[0] == 1 && pressCheck[2] == 1) {
                yFirst = 2;
                yMove = 0;
            }
            else if (pressCheck[2] == 1) {
                yFirst = 2;
                yMove = 2;
            }
        }
        else if (yFirst == -1) {
            if (pressCheck[0] == 1 && pressCheck[2] == 0) {
                yFirst = 0;
                yMove = 0;
            }
            else if (pressCheck[0] == 0 && pressCheck[2] == 1) {
                yFirst = 2;
                yMove = 2;
            }
        }
        if (pressCheck[0] == 0 && pressCheck[2] == 0) {
            yMove = -1;
            yFirst = -1;
        }
        if (pressCheck[1] == 0 && pressCheck[3] == 0) {
            xMove = -1;
            xFirst = -1;
        }
    }
    calVel() {
        if (xMove == -1 && yMove == 0) {
            xDis = 0;
            yDis = -VELOCITY;
            return;
        }
        if (xMove == 1 && yMove == 0) {
            xDis = -ROOT_VEL;
            yDis = -ROOT_VEL;
            return;
        }
        if (xMove == 3 && yMove == 0) {
            xDis = ROOT_VEL;
            yDis = -ROOT_VEL;
            return;
        }
        if (xMove == 1 && yMove == -1) {
            xDis = -VELOCITY;
            yDis = 0;
            return;
        }
        if (xMove == 1 && yMove == 2) {
            xDis = -ROOT_VEL;
            yDis = ROOT_VEL;
            return;
        }
        if (xMove == -1 && yMove == 2) {
            xDis = 0;
            yDis = VELOCITY;
            return;
        }
        if (xMove == 3 && yMove == 2) {
            xDis = ROOT_VEL;
            yDis = ROOT_VEL;
            return;
        }
        if (xMove == 3 && yMove == -1) {
            xDis = VELOCITY;
            yDis = 0;
            return;
        }
        if (xMove == -1 && yMove == -1) {
            xDis = 0;
            yDis = 0;
            return;
        }
    }
    checkCollision() {
        if (this.x > 1009) {
            this.x = 1009;
        }
        else if (this.x < 0) {
            this.x = 0;
        }
        if (this.y > 705) {
            this.y = 705;
        }
        else if (this.y < 0) {
            this.y = 0;
        }
    }
    checkEnemy() {
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1) { continue; }
            if (sqDistance(this, enemy[i]) < pow2(sumr_pe)) {
                if (isShield == 0) {
                    gameOver();
                    break;
                }
                else if (isShield == 1) {
                    isShield = -1;
                    for (let j = minEnemy; j < eCount; j++) {
                        if (isDead[j] == 1) { continue; }
                        if (sqDistance(this, enemy[j]) < pow2(100)) {
                            enemy[j].knockBack(50);
                        }
                    }
                    this.ship.style.background = 'rgb(150,150,150)';
                    setTimeout(function () {
                        isShield = 0;
                        shieldT = skillTable[11].delay[skillTable[11].lv];
                        this.ship.style.background = 'royalblue';
                    }.bind(this), 1000)
                }
            }
        }
    }
}
class Enemy {
    constructor(index, level, num) {
        this.i = index;
        this.slowTime = 0;
        this.level = level;
        if (enemyTable[level].time == undefined) { this.remainTime = 60; }
        else { this.remainTime = enemyTable[level].time }
        this.subTime();
        this.table = enemyTable[level];
        this.vel = enemyTable[level].vel;
        this.initailize();
        this.spawn();
        this.move();
        this.rePos();
        this.isExist = 1;
        this.radius = 10;
        this.color = enemyTable[level].color;
        this.hp = this.table.hp;
        if (level == 1001) {
            this.x = num;
            this.y = 0;
        }
        if (level == 1002) {
            this.x = 0;
            this.y = num;
        }
        if (level == 1003) {
            this.x = num;
            this.y = 720;
        }
        if (level == 1004) {
            this.x = 1024;
            this.y = num;
        }
    }
    spawn() {
        let TEMP = Math.random() * 4
        if (TEMP <= 1) {
            this.y = 0;
            this.x = Math.random() * 1014
        }
        else if (TEMP <= 2) {
            this.y = Math.random() * 710;
            this.x = 1014;
        }
        else if (TEMP <= 3) {
            this.y = 710;
            this.x = Math.random() * 1014;
        }
        else {
            this.y = Math.random() * 710;
            this.x = 0;
        }
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('class');
        this.class.value = 'enemy';
        this.element.style.background = this.table.color;
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, sepa2);
    }
    subTime() {
        setTimeout(function () {
            if (isStop == 0) {
                this.remainTime -= 1;
                if (this.remainTime <= 0) {
                    remove(this)
                    isDead[this.i] = 1;
                    checkMin();
                }
            }
            if (this.isExist = 1) {
                this.subTime();
            }
        }.bind(this), 1000)
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    move() {
        this.moveIn = setInterval(function () {
            this.rangeX = player.x - this.x;
            this.rangeY = player.y - this.y;
            this.range = Math.sqrt(this.rangeX * this.rangeX + this.rangeY * this.rangeY);
            this.xVel = this.rangeX / this.range * this.vel;
            this.yVel = this.rangeY / this.range * this.vel;
            this.slowTime -= 20;
            if (this.slowTime > 0) {
                this.xVel *= 0.65;
                this.yVel *= 0.65;
            }
            this.x += this.xVel;
            this.y += this.yVel;
            this.rePos();
        }.bind(this), 20)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    checkHp() {
        if (this.hp <= 0) {
            if (this.isExist == 1) { remove(this); }
            exp.nowExp += this.table.exp * status.expUp[skillTable[7].lv];
            exp.fillBar();
            if (this.level == 1006) { gameClear(); }
            return 1;
        }
        else {
            this.element.style.background = 'rgb(200,200,200)';
            setTimeout(function () {
                this.element.style.background = this.color;
            }.bind(this), 80)
        }
    }
    knockBack(power) {
        this.x -= this.rangeX / this.range * power;
        this.y -= this.rangeY / this.range * power;
        if (this.x > 1009) {
            this.x = 1009;
        }
        else if (this.x < 0) {
            this.x = 0;
        }
        if (this.y > 705) {
            this.y = 705;
        }
        else if (this.y < 0) {
            this.y = 0;
        }
        this.rePos();
    }
}
class Arrow {
    constructor(type) {
        let lv = skillTable[0].lv;
        this.initailize();
        this.x = player.x + 2.5;
        this.y = player.y + 2.5;
        this.rangeX = anchor.x - this.x;
        this.rangeY = anchor.y - this.y;
        this.range = Math.sqrt(this.rangeX * this.rangeX + this.rangeY * this.rangeY);
        this.xVel = this.rangeX / this.range;
        this.yVel = this.rangeY / this.range;
        let TEMP = 0;
        if (this.xVel >= 0) {
            TEMP = Math.atan(this.yVel / this.xVel);
        }
        else {
            TEMP = Math.atan(this.yVel / this.xVel) + PI
        }
        this.xVel = Math.cos(TEMP);
        this.yVel = Math.sin(TEMP);
        if (type == 1) {
            this.xVel = Math.cos(TEMP + (PI / 72));
            this.yVel = Math.sin(TEMP + (PI / 72));
            arrow[aCount++] = new Arrow(11);
        }
        else if (type == 11) {
            this.xVel = Math.cos(TEMP - (PI / 72));
            this.yVel = Math.sin(TEMP - (PI / 72));
        }
        else if (type == 2) {
            arrow[aCount++] = new Arrow(21);
            arrow[aCount++] = new Arrow(22);
        }
        else if (type == 21) {
            this.xVel = Math.cos(TEMP - (PI / 36));
            this.yVel = Math.sin(TEMP - (PI / 36));
        }
        else if (type == 22) {
            this.xVel = Math.cos(TEMP + (PI / 36));
            this.yVel = Math.sin(TEMP + (PI / 36));
        }
        this.xVel *= skillTable[0].vel[lv]
        this.yVel *= skillTable[0].vel[lv]
        this.isExist = 1;
        this.move();
        this.rePos();
        this.radius = 5;
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('class');
        this.class.value = 'arrow';
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, layer);
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    move() {
        this.moveIn = setInterval(function () {
            this.x += this.xVel;
            this.y += this.yVel;
            this.checkCollision();
            this.rePos();
            this.checkEnemy();
        }.bind(this), 10)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    checkCollision() {
        if (this.x > 1019) {
            remove(this);
        }
        else if (this.x < 0) {
            remove(this);
        }
        else if (this.y > 715) {
            remove(this);
        }
        else if (this.y < 0) {
            remove(this);
        }
        checkMinArrow();
    }
    checkEnemy() {
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1) { continue; }
            if (sqDistance(this, enemy[i]) < pow2(sumr_ea)) {
                remove(this);
                if (skillTable[0].lv == 8) { enemy[i].knockBack(1) }
                checkMinArrow();
                enemy[i].hp -= skillTable[0].damage[skillTable[0].lv] * status.damage[skillTable[3].lv];
                if (enemy[i].checkHp() == 1) {
                    isDead[i] = 1;
                    checkMin();
                }
                break;
            }
        }
    }
}
class Shotgun {
    constructor(type) {
        let lv = skillTable[17].lv;
        this.hit = new Set();
        this.radius = skillTable[17].radius[lv] * status.radius[skillTable[10].lv];
        this.time = 400;
        this.initailize();
        this.x = player.x + 7.5 - this.radius;
        this.y = player.y + 7.5 - this.radius
        this.rangeX = anchor.x - this.x;
        this.rangeY = anchor.y - this.y;
        this.range = Math.sqrt(this.rangeX * this.rangeX + this.rangeY * this.rangeY);
        this.xVel = this.rangeX / this.range;
        this.yVel = this.rangeY / this.range;
        let TEMP = 0;
        if (this.xVel >= 0) {
            TEMP = Math.atan(this.yVel / this.xVel);
        }
        else {
            TEMP = Math.atan(this.yVel / this.xVel) + PI;
        }
        this.xVel = Math.cos(TEMP);
        this.yVel = Math.sin(TEMP);
        if (type == undefined) {
            arrow[aCount++] = new Shotgun(1);
            arrow[aCount++] = new Shotgun(2);
            arrow[aCount++] = new Shotgun(3);
            arrow[aCount++] = new Shotgun(4);
            arrow[aCount++] = new Shotgun(5);
            arrow[aCount++] = new Shotgun(6);
        }
        else if (type == 1) {
            this.xVel = Math.cos(TEMP + (PI / 18));
            this.yVel = Math.sin(TEMP + (PI / 18));
        }
        else if (type == 2) {
            this.xVel = Math.cos(TEMP - (PI / 18));
            this.yVel = Math.sin(TEMP - (PI / 18))
        }
        else if (type == 3) {
            this.xVel = Math.cos(TEMP + (PI / 9));
            this.yVel = Math.sin(TEMP + (PI / 9));
        }
        else if (type == 4) {
            this.xVel = Math.cos(TEMP - (PI / 9));
            this.yVel = Math.sin(TEMP - (PI / 9));
        }
        else if (type == 5) {
            this.xVel = Math.cos(TEMP + (PI / 6));
            this.yVel = Math.sin(TEMP + (PI / 6));
        }
        else if (type == 6) {
            this.xVel = Math.cos(TEMP - (PI / 6));
            this.yVel = Math.sin(TEMP - (PI / 6));
        }
        this.xVel *= skillTable[17].vel[lv]
        this.yVel *= skillTable[17].vel[lv]
        this.isExist = 1;
        this.move();
        this.rePos
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('class');
        this.class.value = 'shotgun';
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, layer);
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    move() {
        this.moveIn = setInterval(function () {
            this.x += this.xVel;
            this.y += this.yVel;
            this.time -= 10;
            if (this.time <= 0) { remove(this); }
            this.checkCollision();
            this.rePos();
            this.checkEnemy();
        }.bind(this), 10)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    checkCollision() {
        if (this.x > 1019) {
            remove(this);
        }
        else if (this.x < 0) {
            remove(this);
        }
        else if (this.y > 715) {
            remove(this);
        }
        else if (this.y < 0) {
            remove(this);
        }
        checkMinArrow();
    }
    checkEnemy() {
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1 || this.hit.has(i) == true) { continue; }
            if (sqDistance(this, enemy[i]) < pow2(this.radius + 10)) {
                this.hit.add(i);
                enemy[i].knockBack(4);
                checkMinArrow();
                enemy[i].hp -= skillTable[17].damage[skillTable[17].lv] * status.damage[skillTable[3].lv];
                if (enemy[i].checkHp() == 1) {
                    isDead[i] = 1;
                    checkMin();
                }
                break;
            }
        }
    }
}
class Machinegun {
    constructor(type) {
        this.initailize();
        this.x = player.x + 2.5;
        this.y = player.y + 2.5;
        this.radius = 4;
        this.findCloseE(type);
        this.isExist = 1;
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('class');
        this.class.value = 'machinegun';
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, layer);
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
    }
    findCloseE(type) {
        let MinR = 10000000000;
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1) { continue; }
            let TEMP = sqDistance(this, enemy[i]);
            if (TEMP < MinR) {
                MinR = TEMP;
                this.target = i;
            }
        }
        if (this.target != undefined) {
            this.setVel(type);
            this.move();
            this.rePos();
        }
        else { remove(this); }
    }
    setVel(type) {
        this.rangeX = enemy[this.target].x - this.x;
        this.rangeY = enemy[this.target].y - this.y;
        this.range = Math.sqrt(this.rangeX * this.rangeX + this.rangeY * this.rangeY);
        this.xVel = this.rangeX / this.range;
        this.yVel = this.rangeY / this.range;
        let TEMP = 0;
        if (this.xVel >= 0) {
            TEMP = Math.atan(this.yVel / this.xVel);
        }
        else {
            TEMP = Math.atan(this.yVel / this.xVel) + PI;
        }
        let TEMP2 = (Math.random() * PI / 12) - PI / 24;
        this.xVel = Math.cos(TEMP + TEMP2);
        this.yVel = Math.sin(TEMP + TEMP2);
        if (type == 1) {
            setTimeout(function () {
                arrow[aCount++] = new Machinegun(0);
            }, 50)
        }
        else if (type == 2) {
            setTimeout(function () {
                arrow[aCount++] = new Machinegun(0);
            }, 50)
            setTimeout(function () {
                arrow[aCount++] = new Machinegun(0);
            }, 100)
        }
        this.xVel *= skillTable[15].vel[skillTable[15].lv]
        this.yVel *= skillTable[15].vel[skillTable[15].lv]
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    move() {
        this.moveIn = setInterval(function () {
            this.x += this.xVel;
            this.y += this.yVel;
            this.checkCollision();
            this.rePos();
            this.checkEnemy();
        }.bind(this), 10)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    checkCollision() {
        if (this.x > 1019) {
            remove(this);
            checkMinArrow();
        }
        else if (this.x < 0) {
            remove(this);
            checkMinArrow();
        }
        else if (this.y > 715) {
            remove(this);
            checkMinArrow();
        }
        else if (this.y < 0) {
            remove(this);
            checkMinArrow();
        }
    }
    checkEnemy() {
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1) { continue; }
            if (sqDistance(this, enemy[i]) < pow2(4 + 10)) {
                remove(this);
                checkMinArrow();
                enemy[i].hp -= skillTable[15].damage[skillTable[15].lv] * status.damage[skillTable[3].lv];
                if (enemy[i].checkHp() == 1) {
                    isDead[i] = 1;
                }
                break;
            }
        }
    }
}
class Spear {
    constructor(type, angle) {
        let lv = skillTable[1].lv;
        this.radius = skillTable[1].radius[lv] * status.radius[skillTable[10].lv];
        this.time = skillTable[1].time[lv];
        this.initailize();
        this.x = player.x + 7.5 - this.radius;
        this.y = player.y + 7.5 - this.radius;
        this.hit = new Set();
        let TEMP = 0;
        if (angle == null) {
            TEMP = (Math.random() * 2 * PI) - PI;
        }
        else { TEMP = angle; }
        this.xVel = Math.cos(TEMP);
        this.yVel = Math.sin(TEMP);
        if (type == 1) {
            this.xVel = Math.cos(TEMP + (PI / 18));
            this.yVel = Math.sin(TEMP + (PI / 18));
            arrow[aCount++] = new Spear(11, TEMP);
        }
        else if (type == 11) {
            this.xVel = Math.cos(TEMP - (PI / 18));
            this.yVel = Math.sin(TEMP - (PI / 18));
        }
        else if (type == 2) {
            arrow[aCount++] = new Spear(21, TEMP);
            arrow[aCount++] = new Spear(22, TEMP);
        }
        else if (type == 21) {
            this.xVel = Math.cos(TEMP - (PI / 18));
            this.yVel = Math.sin(TEMP - (PI / 18));
        }
        else if (type == 22) {
            this.xVel = Math.cos(TEMP + (PI / 18))
            this.yVel = Math.sin(TEMP + (PI / 18));
        }
        this.xVel *= skillTable[1].vel[lv]
        this.yVel *= skillTable[1].vel[lv]
        this.isExist = 1;
        this.move();
        this.rePos();
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('class');
        this.class.value = 'spear';
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, layer);
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    move() {
        this.moveIn = setInterval(function () {
            this.x += this.xVel;
            this.y += this.yVel;
            this.time -= 10;
            if (this.time <= 0) { remove(this); }
            this.checkCollision();
            this.rePos();
            this.checkEnemy();
        }.bind(this), 10)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    checkCollision() {
        if (this.x > 1019) {
            this.xVel = -this.xVel;
            this.hit.clear();
        }
        else if (this.x < 0) {
            this.xVel = -this.xVel;
            this.hit.clear();
        }
        else if (this.y > 715) {
            this.yVel = -this.yVel;
            this.hit.clear();
        }
        else if (this.y < 0) {
            this.yVel = -this.yVel;
            this.hit.clear();
        }
    }
    checkEnemy() {
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1 || this.hit.has(i) == true) { continue; }
            if (sqDistance(this, enemy[i]) < pow2(this.radius + 10)) {
                this.hit.add(i);
                enemy[i].hp -= skillTable[1].damage[skillTable[1].lv] * status.damage[skillTable[3].lv];
                if (enemy[i].checkHp() == 1) {
                    isDead[i] = 1;
                    checkMin();
                }
            }
        }
    }
}
class Ball {
    constructor(type, angle) {
        let lv = skillTable[19].lv;
        this.target = 1;
        this.hit = new Set();
        this.radius = skillTable[19].radius[lv] * status.radius[skillTable[10].lv];
        this.initailize();
        this.x = player.x + 7.5 - this.radius;
        this.y = player.y + 7.5 - this.radius;
        this.rangeX = anchor.x - this.x + 2.5 - this.radius;
        this.rangeY = anchor.y - this.y + 2.5 - this.radius;
        this.range = Math.sqrt(this.rangeX * this.rangeX + this.rangeY * this.rangeY);
        this.xVel = this.rangeX / this.range;
        this.yVel = this.rangeY / this.range;
        let TEMP = 0;
        if (this.xVel >= 0) {
            TEMP = Math.atan(this.yVel / this.xVel);
        }
        else {
            TEMP = Math.atan(this.yVel / this.xVel) + PI;
        }
        this.xVel = Math.cos(TEMP);
        this.yVel = Math.sin(TEMP);
        this.xVel *= skillTable[19].vel[lv];
        this.yVel *= skillTable[19].vel[lv];
        this.isExist = 1;
        this.rePos();
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('class');
        this.class.value = 'ball';
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, layer);
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
    }
    setVel() {
        if (this.target == 1){
            this.rangeX = anchor.x - this.x - this.radius + 2.5;
            this.rangeY = anchor.y - this.y - this.radius + 2.5;
        }
        else if (this.target == 0) {
            this.rangeX = player.x - this.x - this.radius + 7.5;
            this.rangeY = player.y - this.y - this.radius + 7.5;
        }
        this.range = Math.sqrt(this.rangeX * this.rangeX + this.rangeY * this.rangeY);
        this.xVel = this.rangeX / this.range;
        this.yVel = this.rangeY / this.range;
        let TEMP = 0;
        if (this.xVel >= 0) {
            TEMP = Math.atan(this.yVel / this.xVel);
        }
        else {
            TEMP = Math.atan(this.yVel / this.xVel) + PI;
        }
        this.xVel = Math.cos(TEMP);
        this.yVel = Math.sin(TEMP);
        this.xVel *= skillTable[19].vel[skillTable[19].lv];
        this.yVel *= skillTable[19].vel[skillTable[19].lv];
    }
    resize() {
        this.radius = skillTable[19].radius[skillTable[19].lv] * status.radius[skillTable[10].lv];
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    move() {
        this.moveIn = setInterval(function () {
            this.setVel();
            this.x += this.xVel;
            this.y += this.yVel;
            this.checkCollision();
            this.rePos();
            this.checkEnemy();
            this.checkBounce();
        }.bind(this), 10)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    checkCollision() {
        if (this.x > 1024 - this.radius * 2) {
            this.x = 1024 - this.radius * 2;
            this.target = 0;
        }
        else if (this.x < 0) {
            this.x = 0
            this.target = 0;
        }
        else if (this.y > 720 - this.radius * 2) {
            this.y = 720 - this.radius * 2;
            this.target = 0;
        }
        else if (this.y < 0) {
            this.y = 0;
            this.target = 0;
        }
    }
    checkBounce() {
        if (sqDistance(this, anchor) < pow2(this.radius + 2.5) && this.target == 1) {
            this.target = 0;
        }
        else if (sqDistance(this, player) < pow2(this.radius + 7.5) && this.target == 0) {
            this.target = 1;
        }
    }
    checkEnemy() {
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1 || this.hit.has(i) == true) { continue; }
            if (sqDistance(this, enemy[i]) < pow2(this.radius + 10)) {
                this.hit.add(i);
                setTimeout(function () {
                    this.hit.delete(i);
                }.bind(this), 100)
                enemy[i].hp -= skillTable[19].damage[skillTable[19].lv] * status.damage[skillTable[3].lv];
                if (enemy[i].checkHp() == 1) {
                    isDead[i] = 1;
                    checkMin();
                }
            }
        }
    }
}
class Spin {
    constructor(type, angle) {
        let lv = skillTable[8].lv;
        this.initailize();
        this.x = player.x + 2.5;
        this.y = player.y + 2.5;
        this.hit = new Set();
        this.angle = 0;
        if (angle == null) {
            this.angle = 0;
        }
        else { this.angle = angle; }
        if (type == 1) {
            spin[1] = new Spin(0, PI)
        }
        else if (type == 2) {
            spin[1] = new Spin(0, PI * 2 / 3);
            spin[2] = new Spin(0, PI * 4 / 3);
        }
        if (type == 3) {
            spin[1] = new Spin(0, PI / 2);
            spin[2] = new Spin(0, PI);
            spin[3] = new Spin(0, PI * 3 / 2);
        }
        else if (type == 4) {
            spin[1] = new Spin(0, PI * 2 / 5);
            spin[2] = new Spin(0, PI * 4 / 5);
            spin[3] = new Spin(0, PI * 6 / 5);
            spin[4] = new Spin(0, PI * 8 / 5);
        }
        if (type == 5) {
            spin[1] = new Spin(0, PI * 1 / 3);
            spin[2] = new Spin(0, PI * 2 / 3);
            spin[3] = new Spin(0, PI);
            spin[4] = new Spin(0, PI * 4 / 3);
            spin[5] = new Spin(0, PI * 5 / 3);
        }
        this.isExist = 1;
        this.rePos();
        this.radius = skillTable[8].radius[lv] * status.radius[skillTable[10].lv];
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('class');
        this.class.value = 'spin';
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, layer);
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    move() {
        this.moveIn = setInterval(function () {
            this.angle += skillTable[8].vel[skillTable[8].lv];
            if (this.angle > 2 * PI) { this.angle -= 2 * PI }
            this.x = player.x - this.radius + 7.5 + 50 * cos(this.angle);
            this.y = player.y - this.radius + 7.5 + 50 * sin(this.angle);
            this.rePos();
            this.checkEnemy();
        }.bind(this), 10)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    checkCollision() {
        if (this.x > 1019) {
            remove(this);
        }
        else if (this.x < 0) {
            remove(this);
        }
        else if (this.y > 715) {
            remove(this);
        }
        else if (this.y < 0) {
            remove(this);
        }
        checkMinArrow();
    }
    checkEnemy() {
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1 || this.hit.has(i) == true) { continue; }
            if (sqDistance(this, enemy[i]) < pow2(this.radius + 10)) {
                this.hit.add(i);
                setTimeout(function () {
                    this.hit.delete(i);
                }.bind(this), 500)
                enemy[i].hp -= skillTable[8].damage[skillTable[8].lv] * status.damage[skillTable[3].lv];
                if (enemy[i].checkHp() == 1) {
                    isDead[i] = 1;
                    checkMin();
                }
            }
        }
    }
}
class Bomb {
    constructor(type, angle) {
        let lv = skillTable[2].lv;
        this.radius = skillTable[2].radius[lv] * status.radius[skillTable[10].lv];
        this.initailize();
        this.x = player.x + 7.5 - this.radius;
        this.y = player.y + 7.5 - this.radius;
        this.hit = new Set();
        let TEMP = 0;
        if (angle == null) {
            TEMP = (Math.random() * 2 * PI) - PI;
        }
        else { TEMP = angle; }
        this.xVel = Math.cos(TEMP);
        this.yVel = Math.sin(TEMP);
        if (type == 1) {
            this.xVel = Math.cos(TEMP + (PI / 18));
            this.yVel = Math.sin(TEMP + (PI / 18));
            arrow[aCount++] = new Bomb(11, TEMP);
        }
        else if (type = 11) {
            this.xVel = Math.cos(TEMP - (PI / 18));
            this.yVel = Math.sin(TEMP - (PI / 18));
        }
        else if (type == 2) {
            arrow[aCount++] = new Bomb(21, TEMP);
            arrow[aCount++] = new Bomb(22, TEMP);
        }
        else if (type = 21) {
            this.xVel = Math.cos(TEMP - (PI / 18));
            this.yVel = Math.sin(TEMP - (PI / 18));
        }
        else if (type = 22) {
            this.xVel = Math.cos(TEMP + (PI / 18));
            this.yVel = Math.sin(TEMP + (PI / 18));
        }
        this.xVel *= skillTable[2].vel[lv];
        this.yVel *= skillTable[2].vel[lv];
        this.isExist = 1;
        this.move();
        this.rePos();
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('class');
        this.class.value = 'bomb';
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, layer);
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    move() {
        this.moveIn = setInterval(function () {
            this.x += this.xVel;
            this.y += this.yVel;
            this.checkCollision();
            this.rePos();
            this.checkEnemy();
        }.bind(this), 10)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    checkCollision() {
        if (this.x > 1019) {
            remove(this);
        }
        else if (this.x < 0) {
            remove(this);
        }
        else if (this.y > 715) {
            remove(this);
        }
        else if (this.y < 0) {
            remove(this);
        }
        checkMinArrow();
    }
    checkEnemy() {
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1) { continue; }
            if (sqDistance(this, enemy[i]) < pow2(this.radius + 10)) {
                let x = new BombEffect(enemy[i].x + 10 - skillTable[2].radius2[skillTable[2].lv], enemy[i].y + 10 - skillTable[2].radius2[skillTable[2].lv]);
                remove(this);
                enemy[i].hp -= skillTable[2].damage[skillTable[2].lv] * status.damage[skillTable[3].lv];
                if (enemy[i].checkHp() == 1) {
                    isDead[i] = 1;
                    checkMin();
                }
                break;
            }
        }
    }
}
class BombEffect {
    constructor(x, y) {
        this.hit = new Set()
        this.x = x
        this.y = y;
        this.isExist = 1;
        let lv = skillTable[2].lv;
        this.radius = skillTable[2].radius2[lv] * status.radius[skillTable[10].lv];
        this.initailize();
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
        this.rePos();
        this.checkEnemy();
        setTimeout(function () {
            remove(this)
        }.bind(this), 500)
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('class');
        this.class.value = 'bombE';
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, layer);
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    checkEnemy() {
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1) { continue; }
            if (sqDistance(this, enemy[i]) < pow2(this.radius + 10)) {
                enemy[i].hp -= skillTable[2].damage2[skillTable[2].lv] * status.damage[skillTable[3].lv];
                if (enemy[i].checkHp() == 1) {
                    isDead[i] = 1;
                    checkMin();
                }
            }
        }
    }
}
class SpotE {
    constructor(type) {
        this.timer = 1000;
        this.initailize();
        this.rePos();
        this.move();
        this.type = type;
        this.isExist = 1;
        this.radius = skillTable[9].radius[skillTable[9].lv] * status.radius[skillTable[10].lv];
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
    }
    initailize() {
        this.element = document.createElement('div');
        this.id = document.createAttribute('id');
        this.id.value = 'spotE';
        this.element.setAttributeNode(this.id);
        box.insertBefore(this.element, layer);
    }
    move() {
        this.moveIn = setInterval(function () {
            this.rePos();
            this.timer -= 10;
            if (this.timer <= 0) {
                remove(this);
                arrow[aCount++] = new Spot();
                if (this.type > 0) {
                    arrow[aCount++] = new SpotE(this.type - 1)
                }
            }
        }.bind(this), 10)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    rePos() {
        this.element.style.left = anchor.x - this.radius + 'px';
        this.element.style.top = anchor.y - this.radius + 'px';
    }
}
class Spot {
    constructor() {
        this.radius = skillTable[9].radius[skillTable[9].lv] * status.radius[skillTable[10].lv];
        this.x = anchor.x - this.radius;
        this.y = anchor.y - this.radius;
        this.isExist = 1;
        this.initailize();
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
        this.rePos();
        this.timer = 1200;
        this.move();
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('class');
        this.class.value = 'spot';
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, layer);
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    move() {
        this.moveIn = setInterval(function () {
            this.checkEnemy();
            this.timer -= 100;
            if (this.timer <= 0) {
                remove(this)
            }
        }.bind(this), 100)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    checkEnemy() {
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1) { continue; }
            if (sqDistance(this, enemy[i]) < pow2(this.radius + 10)) {
                if (skillTable[9].lv >= 8) { enemy[i].knockBack(1); }
                enemy[i].hp -= skillTable[9].damage[skillTable[9].lv] * status.damage[skillTable[3].lv];
                if (enemy[i].checkHp() == 1) {
                    isDead[i] = 1;
                    checkMin();
                }
            }
        }
    }
}
class Stun {
    constructor() {
        this.hit = new Set();
        this.x = player.x - this.radius + 7.5;
        this.y = player.y - this.radius + 7.5;
        this.radiusM = 0
        this.radius = this.radiusM * skillTable[16].radius[skillTable[16].lv] * status.radius[skillTable[10].lv];
        this.isExist = 1;
        this.initailize();
        this.rePos();
        this.timer = 400;
        this.move();
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('class');
        this.class.value = 'stun';
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, layer);
    }
    resize() {
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    move() {
        this.moveIn = setInterval(function () {
            this.radiusM += 2
            this.radius = this.radiusM * skillTable[16].radius[skillTable[16].lv] * status.radius[skillTable[10].lv];
            this.x = player.x - this.radius + 7.5;
            this.y = player.y - this.radius + 7.5;
            this.rePos();
            this.resize();
            this.checkEnemy();
            this.timer -= 10
            if (this.timer <= 0) {
                remove(this)
            }
        }.bind(this), 10)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    checkEnemy() {
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1 || this.hit.has(i) == true) { continue; }
            if (sqDistance(this, enemy[i]) < pow2(this.radius + 10)) {
                this.hit.add(i);
                enemy[i].knockBack(3);
                enemy[i].hp -= skillTable[16].damage[skillTable[16].lv] * status.damage[skillTable[3].lv];
                if (enemy[i].checkHp() == 1) {
                    isDead[i] = 1;
                    checkMin();
                }
            }
        }
    }
}
class Blizzard {
    constructor() {
        this.x = 0
        this.y = 0
        this.isExist = 1;
        this.timer = skillTable[18].time[skillTable[18].lv];
        if (this.timer > 0) {
            this.initailize();
            this.move();
        }
        else { this.isExist = 0; }
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('class');
        this.class.value = 'blizzard';
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, layer);
    }
    move() {
        this.moveIn = setInterval(function () {
            this.timer -= 500
            if (this.timer <= 0) {
                remove(this)
            }
            else {
                this.x = 0
                this.y = 0
                this.checkEnemy();
            }
        }.bind(this), 500)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    checkEnemy() {
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1) { continue; }
            enemy[i].slowTime = 500;
            enemy[i].hp -= skillTable[18].damage[skillTable[18].lv] * status.damage[skillTable[3].lv];
            if (enemy[i].checkHp() == 1) {
                isDead[i] = 1;
                checkMin();
            }
        }
    }
}
class Area {
    constructor() {
        let lv = skillTable[12].lv;
        this.hit = new Set();
        this.initailize();
        this.isExist = 1;
        this.rePos();
        this.move();
        this.resize();
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('id');
        this.class.value = 'area';
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, layer);
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    move() {
        this.moveIn = setInterval(function () {
            this.x = player.x - this.radius + 7.5;
            this.y = player.y - this.radius + 7.5;
            this.rePos();
            this.checkEnemy();
        }.bind(this), 10)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    checkEnemy() {
        if (isStop == 0) {
            for (let i = minEnemy; i < eCount; i++) {
                if (isDead[i] == 1 || this.hit.has(i) == true) { continue; }
                if (sqDistance(this, enemy[i]) < pow2(this.radius + 10)) {
                    this.hit.add(i);
                    setTimeout(function () {
                        this.hit.delete(i);
                    }.bind(this), 100)
                    enemy[i].slowTime = 100;
                    enemy[i].hp -= skillTable[12].damage[skillTable[12].lv] * status.damage[skillTable[3].lv];
                    if (enemy[i].checkHp() == 1) {
                        isDead[i] = 1;
                        checkMin();
                    }
                }
            }
        }
    }
    resize() {
        this.radius = skillTable[12].radius[skillTable[12].lv] * status.radius[skillTable[10].lv];
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
    }
}
class Nansa {
    constructor() {
        let lv = skillTable[13].lv;
        this.hit = new Set();
        this.count = skillTable[13].count[lv];
        this.radius = skillTable[13].radius[lv] * status.radius[skillTable[10].lv];
        this.initailize();
        this.x = player.x + 2.5;
        this.y = player.y + 2.5;
        let TEMP = (Math.random() * 2 * PI) - PI;
        this.xVel = Math.cos(TEMP);
        this.yVel = Math.sin(TEMP);
        this.xVel *= skillTable[13].vel[lv];
        this.yVel *= skillTable[13].vel[lv];
        this.isExist = 1;
        this.move();
        this.rePos();
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('class');
        this.class.value = 'nansa';
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, layer);
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    move() {
        this.moveIn = setInterval(function () {
            this.x += this.xVel;
            this.y += this.yVel;
            this.checkCollision();
            this.rePos();
            this.checkEnemy();
        }.bind(this), 10)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    checkCollision() {
        if (this.x > 1019) {
            remove(this);
        }
        else if (this.x < 0) {
            remove(this);
        }
        else if (this.y > 715) {
            remove(this);
        }
        else if (this.y < 0) {
            remove(this);
        }
        checkMinArrow();
    }
    checkEnemy() {
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1 || this.hit.has(i) == true) { continue; }
            if (sqDistance(this, enemy[i]) < pow2(this.radius + 10)) {
                this.hit.add(i);
                if (this.count <= 0) { remove(this); }
                else { this.count -= 1; }
                enemy[i].hp -= skillTable[13].damage[skillTable[13].lv] * status.damage[skillTable[3].lv];
                if (enemy[i].checkHp() == 1) {
                    isDead[i] = 1;
                    checkMin();
                }
            }
        }
    }
}
class BombardE {
    constructor() {
        this.timer = 1000;
        this.isExist = 1;
        this.radius = skillTable[14].radius[skillTable[14].lv] * status.radius[skillTable[10].lv];
        this.initailize();
        this.x = Math.random() * 1024 - this.radius;
        this.y = Math.random() * 720 - this.radius;
        this.rePos();
        this.move();
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
    }
    initailize() {
        this.element = document.createElement('div');
        this.id = document.createAttribute('class');
        this.id.value = 'bombardE';
        this.element.setAttributeNode(this.id);
        box.insertBefore(this.element, layer);
    }
    move() {
        this.moveIn = setInterval(function () {
            this.timer -= 10;
            if (this.timer <= 0) {
                arrow[aCount++] = new Bombard(this.x, this.y);
                remove(this);
            }
        }.bind(this), 10)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
}
class Bombard {
    constructor(x, y) {
        this.isExist = 1;
        this.radius = skillTable[14].radius[skillTable[14].lv] * status.radius[skillTable[10].lv];
        this.x = x;
        this.y = y;
        this.initailize();
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
        this.rePos();
        this.timer = 500;
        this.move();
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('class');
        this.class.value = 'bombard';
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, layer);
        this.checkEnemy();
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    move() {
        this.moveIn = setInterval(function () {
            this.timer -= 100;
            if (this.timer <= 0) {
                remove(this)
            }
        }.bind(this), 100)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    checkEnemy() {
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1) { continue; }
            if (sqDistance(this, enemy[i]) < pow2(this.radius + 10)) {
                enemy[i].hp -= skillTable[14].damage[skillTable[14].lv] * status.damage[skillTable[3].lv];
                if (enemy[i].checkHp() == 1) {
                    isDead[i] = 1;
                    checkMin();
                }
            }
        }
    }
}
class Thunder {
    constructor() {
        this.isExist = 1;
        this.radius = skillTable[20].radius[skillTable[20].lv] * status.radius[skillTable[10].lv];
        this.initailize();
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.borderRadius = this.radius * 2 + 'px';
        this.radius * 2 + 'px'
        this.setTarget();
        this.timer = 500;
        this.move();
    }
    initailize() {
        this.element = document.createElement('div');
        this.class = document.createAttribute('class');
        this.class.value = 'thunder';
        this.element.setAttributeNode(this.class);
        box.insertBefore(this.element, layer);
    }
    setTarget() {
        let TEMP = new Array();
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1) { continue; }
            if (sqDistance(player, enemy[i]) < pow2(100)) {
                TEMP.push(i);
            }
        }
        if (TEMP.length <= 0) {
            for (let i = minEnemy; i < eCount; i++) {
                if (isDead[i] == 1) { continue; }
                if (sqDistance(player, enemy[i]) < pow2(200)) {
                    TEMP.push(i);
                }
            }
        }
        if (TEMP.length <= 0) {
            remove(this);
            return
        }
        let TEMP2 = Math.floor(Math.random() * TEMP.length);
        this.target = TEMP[TEMP2]
        this.x = enemy[this.target].x + 10 - this.radius
        this.y = enemy[this.target].y + 10 - this.radius
        this.rePos();
        this.checkEnemy();
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    move() {
        this.moveIn = setInterval(function () {
            this.timer -= 100;
            if (this.timer <= 0) {
                remove(this)
            }
        }.bind(this), 100)
    }
    stopMove() {
        clearInterval(this.moveIn);
    }
    checkEnemy() {
        for (let i = minEnemy; i < eCount; i++) {
            if (isDead[i] == 1) { continue; }
            if (sqDistance(this, enemy[i]) < pow2(this.radius + 10)) {
                enemy[i].hp -= skillTable[20].damage[skillTable[20].lv] * status.damage[skillTable[3].lv];
                if (enemy[i].checkHp() == 1) {
                    isDead[i] = 1;
                    checkMin();
                }
            }
        }
    }
}
class Anchor {
    constructor() {
        this.initailize();
        this.radius = 2.5;
        this.x = Math.random() * 1000;
        this.y = Math.random() * 700;
        this.rePos();
        this.startPressEvent();
    }
    initailize() {
        this.element = document.createElement('div');
        this.id = document.createAttribute('id');
        this.id.value = 'anchor';
        this.element.setAttributeNode(this.id);
        box.insertBefore(this.element, layer);
    }
    rePos() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    startPressEvent() {
        layer.addEventListener('mousemove', this.move.bind(this));
    }
    move(e) {
        this.x = e.offsetX - 53;
        this.y = e.offsetY - 53;
        this.rePos();
    }
}
class Exp {
    constructor() {
        this.canvas = document.getElementById('expbar');
        this.upGrid = document.getElementById('upGrid');
        this.c1 = document.getElementById('c1');
        this.c2 = document.getElementById('c2');
        this.c3 = document.getElementById('c3');
        this.upGrid.style.display = 'none';
        this.choice = new Array();
        this.canvas.width = 1024;
        this.canvas.height = 20;
        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = 'limegreen';
        this.fullExp = 4;
        this.nowExp = 0;
        this.fillBar();
        this.lv = 1;
        this.choiceInitialize();
    }
    choiceInitialize() {
        let choE1 = () => {
            skillTable[this.choice[0]].lv += 1;
            if (skillTable[this.choice[0]].lv >= skillTable[this.choice[0]].maxlv) { choiceNum -= 1 };
            spinSpawn();
            area.resize();
            if (this.choice[0] == 0) {
                arrowCool = skillTable[0].delay[skillTable[0].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[0] == 1) {
                spearCool = skillTable[1].delay[skillTable[1].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[0] == 2) {
                bombCool = skillTable[2].delay[skillTable[2].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[0] == 9) {
                spotCool = skillTable[9].delay[skillTable[9].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[0] == 13) {
                nansaCool = skillTable[13].delay[skillTable[13].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[0] == 14) {
                bombardCool = skillTable[14].delay[skillTable[14].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[0] == 15) {
                machinegunCool = skillTable[15].delay[skillTable[15].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[0] == 16) {
                stunCool = skillTable[16].delay[skillTable[16].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[0] == 17) {
                shotgunCool = skillTable[17].delay[skillTable[17].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[0] == 20) {
                thunderCool = skillTable[20].delay[skillTable[20].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[0] == 11) {
                isShield = 1;
                player.ship.style.background = 'yellowgreen';
            }
            else if (this.choice[0] == 19) {
                if (skillTable[19].lv == 1) { ball = new Ball(); }
                else {
                    ball.resize();
                    ball.setVel();
                }
            }
            exp.upGrid.style.display = 'none';
            isChoice = 0;
            restart();
            upStack--;
            if (upStack > 0) {
                this.openChoice();
            }
        }
        let choE2 = () => {
            skillTable[this.choice[1]].lv += 1;
            if (skillTable[this.choice[1]].lv >= skillTable[this.choice[1]].maxlv) { choiceNum -= 1 };
            spinSpawn();
            area.resize();
            if (this.choice[1] == 0) {
                arrowCool = skillTable[0].delay[skillTable[0].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[1] == 1) {
                spearCool = skillTable[1].delay[skillTable[1].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[1] == 2) {
                bombCool = skillTable[2].delay[skillTable[2].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[1] == 9) {
                spotCool = skillTable[9].delay[skillTable[9].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[1] == 13) {
                nansaCool = skillTable[13].delay[skillTable[13].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[1] == 14) {
                bombardCool = skillTable[14].delay[skillTable[14].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[1] == 15) {
                machinegunCool = skillTable[15].delay[skillTable[15].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[1] == 16) {
                stunCool = skillTable[16].delay[skillTable[16].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[1] == 17) {
                shotgunCool = skillTable[17].delay[skillTable[17].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[1] == 20) {
                thunderCool = skillTable[20].delay[skillTable[20].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[1] == 11) {
                isShield = 1;
                player.ship.style.background = 'yellowgreen';
            }
            else if (this.choice[1] == 19) {
                if (skillTable[19].lv == 1) { ball = new Ball(); }
                else {
                    ball.resize();
                    ball.setVel();
                }
            }
            exp.upGrid.style.display = 'none';
            isChoice = 0;
            restart();
            upStack--;
            if (upStack > 0) {
                this.openChoice();
            }
        }
        let choE3 = () => {
            skillTable[this.choice[2]].lv += 1;
            if (skillTable[this.choice[2]].lv >= skillTable[this.choice[2]].maxlv) { choiceNum -= 1 };
            spinSpawn();
            area.resize();
            if (this.choice[2] == 0) {
                arrowCool = skillTable[0].delay[skillTable[0].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[2] == 1) {
                spearCool = skillTable[1].delay[skillTable[1].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[2] == 2) {
                bombCool = skillTable[2].delay[skillTable[2].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[2] == 9) {
                spotCool = skillTable[9].delay[skillTable[9].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[2] == 13) {
                nansaCool = skillTable[13].delay[skillTable[13].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[2] == 14) {
                bombardCool = skillTable[14].delay[skillTable[14].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[2] == 15) {
                machinegunCool = skillTable[15].delay[skillTable[15].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[2] == 16) {
                stunCool = skillTable[16].delay[skillTable[16].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[2] == 17) {
                shotgunCool = skillTable[17].delay[skillTable[17].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[2] == 20) {
                thunderCool = skillTable[20].delay[skillTable[20].lv] * status.delay[skillTable[4].lv];
            }
            else if (this.choice[2] == 11) {
                isShield = 1;
                player.ship.style.background = 'yellowgreen';
            }
            else if (this.choice[2] == 19) {
                if (skillTable[19].lv == 1) { ball = new Ball(); }
                else {
                    ball.resize();
                    ball.setVel();
                }
            }
            exp.upGrid.style.display = 'none';
            isChoice = 0;
            restart();
            upStack--;
            if (upStack > 0) {
                this.openChoice();
            }
        }
        this.c1.addEventListener('click', choE1);
        this.c2.addEventListener('click', choE2);
        this.c3.addEventListener('click', choE3);
    }
    fillBar() {
        if (this.nowExp < this.fullExp) {
            let TEMP = (this.nowExp / this.fullExp) * 1024;
            this.context.fillRect(0, 0, TEMP, 20);
        }
        else { this.levelUp(); }
    }
    levelUp() {
        this.nowExp -= this.fullExp;
        this.context.clearRect(0, 0, 1024, 20);
        this.lv += 1;
        levelBar.innerText = 'Lv ' + this.lv;
        this.fullExp = parseInt((this.fullExp + 5) * 1.14);
        this.fillBar();
        upStack++;
        if (isChoice == 0) {
            this.openChoice();
        }
    }
    openChoice() {
        gameStop();
        isChoice = 1;
        this.rerollChoice();
        this.upGrid.style.display = 'grid';
    }
    rerollChoice() {
        this.choice = [-1, -1, -1];
        let TEMP = 0;
        do {
            this.choice[0] = Math.floor(Math.random() * 21);
            TEMP = Math.random() * 10;
        } while (skillTable[this.choice[0]].lv >= skillTable[this.choice[0]].maxlv || TEMP >= skillTable[this.choice[0]].unique[skillTable[this.choice[0]].lv])
        do {
            if (choiceNum < 2) {
                this.c2.style.diplay = 'none';
                break;
            }
            this.c2.style.display = 'block';
            this.choice[1] = Math.floor(Math.random() * 21);
            TEMP = Math.random() * 10;
        } while (skillTable[this.choice[1]].lv >= skillTable[this.choice[1]].maxlv || this.choice[0] == this.choice[1] || TEMP >= skillTable[this.choice[1]].unique[skillTable[this.choice[1]].lv])
        do {
            if (choiceNum < 3) {
                this.c3.style.display = 'none';
                break;
            }
            this.c3.style.display = 'block';
            this.choice[2] = Math.floor(Math.random() * 21);
            TEMP = Math.random() * 10;
        } while (skillTable[this.choice[2]].lv >= skillTable[this.choice[2]].maxlv || this.choice[0] == this.choice[2] || this.choice[1] == this.choice[2] || TEMP >= skillTable[this.choice[2]].unique[skillTable[this.choice[2]].lv])
        this.c1.innerHTML = '<h2>' + skillTable[this.choice[0]].name + '</h2><br>' + skillTable[this.choice[0]].scr[skillTable[this.choice[0]].lv];
        this.c2.innerHTML = '<h2>' + skillTable[this.choice[1]].name + '</h2><br>' + skillTable[this.choice[1]].scr[skillTable[this.choice[1]].lv];
        this.c3.innerHTML = '<h2>' + skillTable[this.choice[2]].name + '</h2><br>' + skillTable[this.choice[2]].scr[skillTable[this.choice[2]].lv];
    }
}
let player = new Player();
let anchor = new Anchor();
let exp = new Exp();
let eCount = 0;
let minEnemy = 0;
let minArrow = 0;
let aCount = 0;
let enemy = new Array();
let isDead = new Array();
let ball = undefined;
let spawn = undefined;
let shoot = undefined;
let machinegunshoot = undefined;
let spearshoot = undefined;
let bombshoot = undefined;
let bombardshoot = undefined;
let spotshoot = undefined;
let nansashoot = undefined;
let stunshoot = undefined;
let shotgunshoot = undefined;
let blizzardshoot = undefined;
let thundershoot = undefined;
let timeI = undefined;
let arrow = new Array();
let spin = new Array();
let shieldT = 1000000;
let area = new Area();
let arrowCool = skillTable[0].delay[skillTable[0].lv] * status.delay[skillTable[4].lv];
let spearCool = skillTable[1].delay[skillTable[1].lv] * status.delay[skillTable[4].lv];
let bombCool = skillTable[2].delay[skillTable[2].lv] * status.delay[skillTable[4].lv];
let spotCool = skillTable[9].delay[skillTable[9].lv] * status.delay[skillTable[4].lv];
let bombardCool = skillTable[14].delay[skillTable[14].lv] * status.delay[skillTable[4].lv];
let machinegunCool = skillTable[15].delay[skillTable[15].lv] * status.delay[skillTable[4].lv];
let stunCool = skillTable[16].delay[skillTable[16].lv] * status.delay[skillTable[4].lv];
let shotgunCool = skillTable[17].delay[skillTable[17].lv] * status.delay[skillTable[4].lv];
let nansaCool = skillTable[13].delay[skillTable[13].lv] * status.delay[skillTable[4].lv];
let blizzardCool = skillTable[18].delay[skillTable[18].lv] * status.delay[skillTable[4].lv];
let thunderCool = skillTable[20].delay[skillTable[20].lv] * status.delay[skillTable[4].lv];
function gameClear() {
    document.getElementById('pause').innerText = 'Clear';
    gameStop();
    isClear = 1;
    for (let i = minEnemy; i < eCount; i++) {
        if (enemy[i].isExist == 0) { continue; }
        remove(enemy[i])
    }
    for (let i = minArrow; i < aCount; i++) {
        if (arrow[i] == undefined) { continue; }
        if (arrow[i].isExist == 0) { continue; }
        remove(arrow[i]);
    }
}
function gameOver() {
    document.getElementById('pause').innerText = 'GameOver';
    gameStop();
    isClear = 1;
}
function checkLv() {
    if (timeScore % 30 == 0 && enemyLv < 39) {
        enemyLv++
    }
    if (timeScore == 240) {
        for (let i = 0; i < 1024; i += 20) {
            enemy[eCount] = new Enemy(eCount, 1001, i);
            isDead[eCount++] = 0;
            enemy[eCount] = new Enemy(eCount, 1003, i);
            isDead[eCount++] = 0;
        }
        for (let i = 0; i < 720; i += 20) {
            enemy[eCount] = new Enemy(eCount, 1002, i);
            isDead[eCount++] = 0;
            enemy[eCount] = new Enemy(eCount, 1004, i);
            isDead[eCount++] = 0;
        }
    }
    else if (timeScore == 600) {
        enemy[eCount] = new Enemy(eCount, 1005);
        isDead[eCount++] = 0;
        enemy[eCount] = new Enemy(eCount, 1005);
        isDead[eCount++] = 0;
        enemy[eCount] = new Enemy(eCount, 1005);
        isDead[eCount++] = 0;
        enemy[eCount] = new Enemy(eCount, 1005);
        isDead[eCount++] = 0;
        enemy[eCount] = new Enemy(eCount, 1005);
        isDead[eCount++] = 0;
    }
    else if (timeScore == 1200) {
        enemy[eCount] = new Enemy(eCount, 1006);
        isDead[eCount++] = 0;
    }
}
function enemySpawn() {
    spawn = setTimeout(function () {
        for (let i = 0; i < enemyTable[enemyLv].num; i++) {
            enemy[eCount] = new Enemy(eCount, enemyLv);
            isDead[eCount++] = 0;
        }
        if (isStop == 0) {
            enemySpawn();
        }
    }, enemyTable[enemyLv].delay)
}
function arrowSpawn() {
    shoot = setTimeout(function () {
        if (arrowCool <= 0) {
            arrow[aCount++] = new Arrow(skillTable[0].plus + status.plus[skillTable[5].lv]);
            if (status.repeat[skillTable[6].lv] >= 1) {
                setTimeout(function () {
                    arrow[aCount++] = new Arrow(skillTable[0].plus + status.plus[skillTable[5].lv]);
                }, 50)
            }
            if (status.repeat[skillTable[6].lv] >= 2){
                setTimeout(function () {
                    arrow[aCount++] = new Arrow(skillTable[0].plus + status.plus[skillTable[5].lv]);
                }, 100)
            }
            arrowCool = skillTable[0].delay[skillTable[0].lv] * status.delay[skillTable[4].lv]
        }
        else { arrowCool -= 10 }
        if (isStop == 0) {
            arrowSpawn();
        }
    }, 10)
}
function machinegunSpawn() {
    machinegunshoot = setTimeout(function () {
        if (machinegunCool <= 0) {
            arrow[aCount++] = new Machinegun(skillTable[15].plus + status.plus[skillTable[5].lv]);
            if (status.repeat[skillTable[6].lv] >= 1) {
                setTimeout(function () {
                    arrow[aCount++] = new Machinegun(skillTable[15].plus + status.plus[skillTable[5].lv]);
                }, skillTable[15].delay[skillTable[15].lv] * status.delay[skillTable[4].lv] / 3)
            }
            if (status.repeat[skillTable[6].lv] >= 2) {
                setTimeout(function () {
                    arrow[aCount++] = new Machinegun(skillTable[15].plus + status.plus[skillTable[5].lv]);
                }, skillTable[15].delay[skillTable[15].lv] * status.delay[skillTable[4].lv] * 2 / 3)
            }
            machinegunCool = skillTable[15].delay[skillTable[15].lv] * status.delay[skillTable[4].lv];
        }
        else { machinegunCool -= 10 }
        if (isStop == 0) {
            machinegunSpawn();
        }
    }, 10)
}
function spearSpawn() {
    spearshoot = setTimeout(function () {
        if (spearCool <= 0) {
            arrow[aCount++] = new Spear(skillTable[1].plus + status.plus[skillTable[5].lv], null);
            if (status.repeat[skillTable[6].lv] >= 1) {
                setTimeout(function () {
                    arrow[aCount++] = new Spear(skillTable[1].plus + status.plus[skillTable[5].lv], null);
                }, 50)
            }
            if (status.repeat[skillTable[6].lv] >= 2){
                setTimeout(function () {
                    arrow[aCount++] = new Spear(skillTable[1].plus + status.plus[skillTable[5].lv], null);
                }, 100)
            }
            spearCool = skillTable[1].delay[skillTable[1].lv] * status.delay[skillTable[4].lv];
        }
        else { spearCool -= 100 }
        if (isStop == 0) {
            spearSpawn();
        }
    }, 100)
}
function bombSpawn() {
    bombshoot = setTimeout(function () {
        if (bombCool <= 0) {
            arrow[aCount++] = new Bomb(skillTable[2].plus + status.plus[skillTable[5].lv], null);
            if (status.repeat[skillTable[6].lv] >= 1) {
                setTimeout(function () {
                    arrow[aCount++] = new Bomb(skillTable[2].plus + status.plus[skillTable[5].lv], null);
                }, 50)
            }
            if (status.repeat[skillTable[6].lv] >= 2) {
                setTimeout(function () {
                    arrow[aCount++] = new Bomb(skillTable[2].plus + status.plus[skillTable[5].lv], null);
                }, 100)
            }
            bombCool = skillTable[2].delay[skillTable[2].lv] * status.delay[skillTable[4].lv]
        }
        else { bombCool -= 100 }
        if (isStop == 0) {
            bombSpawn();
        }
    }, 100)
}
function spotSpawn() {
    spotshoot = setTimeout(function () {
        if (spotCool <= 0) {
            arrow[aCount++] = new SpotE(status.repeat[skillTable[6].lv]);
            spotCool = skillTable[9].delay[skillTable[9].lv] * status.delay[skillTable[4].lv]
        }
        else { spotCool -= 100 }
        if (isStop == 0) {
            spotSpawn();
        }
    }, 100)
}
function shotgunSpawn() {
    shotgunshoot = setTimeout(function () {
        if (shotgunCool <= 0) {
            arrow[aCount++] = new Shotgun();
            shotgunCool = skillTable[17].delay[skillTable[17].lv] * status.delay[skillTable[4].lv]
        }
        else { shotgunCool -= 100 }
        if (isStop == 0) {
            shotgunSpawn();
        }
    }, 100)
}
function blizzardSpawn() {
    blizzardshoot = setTimeout(function () {
        if (blizzardCool <= 0) {
            arrow[aCount++] = new Blizzard();
            blizzardCool = skillTable[18].delay[skillTable[18].lv] * status.delay[skillTable[4].lv]
        }
        else { blizzardCool -= 100 }
        if (isStop == 0) {
            blizzardSpawn();
        }
    }, 100)
}
function stunSpawn() {
    stunshoot = setTimeout(function () {
        if (stunCool <= 0) {
            arrow[aCount++] = new Stun();
            if (status.repeat[skillTable[6].lv] >= 1) {
                setTimeout(function () {
                    arrow[aCount++] = new Stun();
                }, 400)
            }
            if (status.repeat[skillTable[6].lv] >= 2) {
                setTimeout(function () {
                    arrow[aCount++] = new Stun();
                }, 800)
            }
            stunCool = skillTable[16].delay[skillTable[16].lv] * status.delay[skillTable[4].lv];
        }
        else { stunCool -= 100 }
        if (isStop == 0) {
            stunSpawn();
        }
    }, 100)
}
function bombardSpawn() {
    bombardshoot = setTimeout(function () {
        if (bombardCool <= 0) {
            let TEMP = (skillTable[14].plus[skillTable[14].lv] + status.plus[skillTable[5].lv]) * (status.repeat[skillTable[6].lv] + 1);
            let bombardTime = () => {
                setTimeout(function () {
                    if (isStop == 0) {
                        if (TEMP > 0) {
                            arrow[aCount++] = new BombardE();
                            TEMP -= 1;
                            bombardTime();
                        }
                    }
                    else {
                        bombardTime();
                    }
                }, 50)
            }
            bombardTime();
            bombardCool = skillTable[14].delay[skillTable[14].lv] * status.delay[skillTable[4].lv]
        }
        else { bombardCool -= 100 }
        if (isStop == 0) {
            bombardSpawn();
        }
    }, 100)
}
function spinSpawn() {
    for (let i = 0; i < 6; i++) {
        if (spin[i] != undefined) {
            remove(spin[i]);
            spin[i] = undefined;
        }
    }
    if (skillTable[8].lv > 0) {
        spin[0] = new Spin(skillTable[8].plus[skillTable[8].lv] + status.plus[skillTable[5].lv]);
    }
}
function nansaSpawn() {
    nansashoot = setTimeout(function () {
        if (nansaCool <= 0) {
            let TEMP = skillTable[13].plus[skillTable[13].lv] * (status.repeat[skillTable[6].lv] + 1);
            let nansaTime = () => {
                setTimeout(function () {
                    if (isStop == 0) {
                        if (TEMP > 0) {
                            arrow[aCount++] = new Nansa();
                            TEMP -= 1;
                            nansaTime();
                        }
                    }
                    else {
                        nansaTime();
                    }
                }, 20)
            }
            nansaTime();
            nansaCool = skillTable[13].delay[skillTable[13].lv] * status.delay[skillTable[4].lv]
        }
        else { nansaCool -= 100 }
        if (isStop == 0) {
            nansaSpawn();
        }
    }, 100)
}
function thunderSpawn() {
    thundershoot = setTimeout(function () {
        if (thunderCool <= 0) {
            let TEMP = ((status.repeat[skillTable[6].lv] + 1) * (status.plus[skillTable[5].lv] + 1));
            let thunderTime = () => {
                setTimeout(function () {
                    if (isStop == 0) {
                        if (TEMP > 0) {
                            arrow[aCount++] = new Thunder();
                            TEMP -= 1;
                            thunderTime();
                        }
                    }
                    else {
                        thunderTime();
                    }
                }, 20)
            }
            thunderTime();
            thunderCool = skillTable[20].delay[skillTable[20].lv] * status.delay[skillTable[4].lv]
        }
        else { thunderCool -= 100 }
        if (isStop == 0) {
            thunderSpawn();
        }
    }, 100)
}
function stopSpin() {
    for (let i = 0; i < 6; i++) {
        if (spin[i] != undefined) {
            spin[i].stopMove();
        }
    }
}
function startSpin() {
    for (let i = 0; i < 6; i++) {
        if (spin[i] != undefined) {
            spin[i].move();
        }
    }
}
function shield() {
    setInterval(function () {
        if (isStop == 0 && isShield != 1) {
            shieldT -= 1;
            if (shieldT <= 0) {
                isShield = 1;
                player.ship.style.background = 'yellowgreen';
            }
        }
    }, 1000)
}
function remove(TEMP) {
    TEMP.isExist = 0;
    if (TEMP.element.parentNode == box) {
        box.removeChild(TEMP.element);
    }
    clearInterval(TEMP.moveIn);
}
function checkMin() {
    for (let i = minEnemy; i < eCount; i++) {
        if (isDead[i] == 1) {
            minEnemy += 1;
        }
        else {
            break;
        }
    }
}
function checkMinArrow() {
    for (let i = minArrow; i < aCount; i++) {
        if (arrow[i].isExist == 0) {
            minArrow += 1;
        }
        else {
            break;
        }
    }
}
function gameStop() {
    isStop = 1;
    document.getElementById('pause').style.display = 'block';
    clearInterval(spawn);
    clearInterval(shoot);
    clearInterval(spearshoot);
    clearInterval(bombshoot);
    clearInterval(spotshoot);
    clearInterval(stunshoot);
    clearInterval(shotgunshoot);
    clearInterval(blizzardshoot);
    clearInterval(machinegunshoot);
    clearInterval(nansashoot);
    clearInterval(bombardshoot);
    clearInterval(thundershoot);
    stopSpin();
    ball?.stopMove();
    area.stopMove();
    clearInterval(timeI);
    player.stopMove();
    for (let i = minEnemy; i < eCount; i++) {
        if (enemy[i].isExist == 0) { continue; }
        enemy[i].stopMove();
    }
    for (let i = minArrow; i < aCount; i++) {
        if (arrow[i] == undefined) { continue; }
        if (arrow[i].isExist == 0) { continue; }
        arrow[i].stopMove()
    }
}
function restart() {
    isStop = 0;
    player.startShipMove();
    for (let i = minEnemy; i < eCount; i++) {
        if (enemy[i].isExist == 0) { continue; }
        enemy[i].move();
    }
    for (let i = 0; i < aCount; i++) {
        if (arrow[i].isExist == 0) { continue; }
        arrow[i].move()
    }
    document.getElementById('pause').style.display = 'none';
    arrowSpawn();
    enemySpawn();
    spearSpawn();
    bombSpawn();
    stunSpawn();
    spotSpawn();
    nansaSpawn();
    shotgunSpawn();
    blizzardSpawn();
    machinegunSpawn();
    bombardSpawn();
    thunderSpawn();
    startSpin();
    ball?.move();
    area.move();
    timeInterval();
}
function sqDistance(A, B) {
    return pow2(A.x + A.radius - B.x - B.radius) + pow2(A.y + A.radius - B.y - B.radius);
}
function timeInterval() {
    timeI = setInterval(function () {
        timeScore += 1;
        let m = Math.floor(timeScore / 60);
        let s = timeScore % 60;
        let sz = '';
        if (s < 10) { sz = 0; }
        document.getElementById('time').innerText = m + ':' + sz + s;
        checkLv();
    }, 1000)
}
enemySpawn();
arrowSpawn();
spearSpawn();
bombSpawn();
stunSpawn();
spotSpawn();
nansaSpawn();
shotgunSpawn();
blizzardSpawn();
machinegunSpawn();
bombardSpawn();
thunderSpawn();
timeInterval();
shield();
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState == 'hidden' && isStop == 0 && isChoice == 0) {
        gameStop();
        isStop = 1;
    }
})