// Board Games Database

export const boardGames = [
    {
        id: "dixit",
        title: "Dixit",
        language: "Language Independent",
        players: { min: 3, max: 8 },
        playTimeMinutes: 30,
        
        shortDescription: "Чарівна гра на асоціації з неймовірно красивими та сюрреалістичними ілюстраціями.",
        
        fullDescription: [
            "Dixit — це класична, проста та захоплююча гра на асоціації, де ваша фантазія створює історію. Головний компонент гри — це великі карти з унікальними, багатозначними малюнками.",
            "Кожного раунду один з гравців стає оповідачем. Він обирає одну зі своїх карт, придумує до неї асоціацію (це може бути слово, фраза, цитата з пісні чи навіть звук) і кладе її долілиць. Інші гравці шукають у своїх картах ту, що найбільше підходить під цю асоціацію, і теж викладають її.",
            "Карти перемішуються і відкриваються. Завдання гравців — здогадатися, яка саме карта належала оповідачу. Але є хитрий нюанс: якщо асоціація буде занадто очевидною або занадто складною, оповідач не отримає жодного бала!"
        ],

        assets: {
            cover: "./assets/dixit/cover.jpg",
            rules: "./assets/rules/dixit-rules.pdf",
            logo: "./assets/dixit/logo.png",
            cardsPdf: "assets/dixit/dixit-cards.pdf",
            gallery: ["./assets/dixit/cover.jpg", "./assets/dixit/gal2.png", "./assets/dixit/gal1.png"] 
        },

        themeClass: "theme-dixit",
        
        expansions: [
            {
                id: "dixit-quest",
                title: "Dixit: Quest",
                description: "84 нові карти з приголомшливими ілюстраціями від Марі Кардуа.",
                owned: true,
                cardsPdf: "./assets/rules/dixit-cards.pdf",
                cover: "./assets/dixit/cover.jpg" 
            },
            {
                id: "dixit-harmonies",
                title: "Dixit: Harmonies",
                description: "Чудове доповнення з акцентом на природні та казкові мотиви.",
                owned: false,
                cardsPdf: "./assets/rules/dixit-cards.pdf",
                cover: "./assets/dixit/cover.jpg"
            }
        ]
    },


    {
        id: "redkordsmeny",
        title: "Редькордсмен",
        language: "Language Independent",
        players: { min: 2, max: 6 },
        playTimeMinutes: 15,
        
        shortDescription: "Швидка та весела вітчизняна паті-гейм гра про встановлення шалених рекордів.",
        
        fullDescription: [
            "«Рекордсмени» — це динамічна настільна гра для веселої компанії, де вам доведеться мірятися силами, швидкістю та кмітливістю у найнесподіваніших дисциплінах.",
            "Кожен раунд гравці отримують нові, іноді дуже кумедні завдання і намагаються побити рекорди одне одного. Правила пояснюються буквально за хвилину.",
            "Гра ідеально підходить для вечірок, поїздок в потязі або просто веселого вечора в колі сім'ї та друзів."
        ],

        assets: {
            cover: "./assets/images/rekordsmeny-cover.jpg",
            rules: "./assets/rules/rekordsmeny-rules.pdf",
            gallery: [
                "./assets/images/rekordsmeny-gameplay-1.jpg"
            ]
        },
        themeClass: "theme-rekordsmeny",
        
        expansions: [] 
    },


    {
        id: "rummikub",
        title: "Rummikub",
        language: "Language Independent",
        players: { min: 2, max: 4 },
        playTimeMinutes: 60,
        
        shortDescription: "Світовий хіт серед сімейних ігор, що поєднує логіку маджонгу та правила карткового рамі.",
        
        fullDescription: [
            "Rummikub — це геніальна у своїй простоті гра, яка вимагає уважності, логічного мислення та вміння планувати на кілька кроків вперед. Замість карт використовуються приємні на дотик пластикові фішки.",
            "Мета гри — першим позбутися всіх своїх фішок з підставки. Для цього їх потрібно викладати на стіл у вигляді числових рядів або груп за кольорами.",
            "Головна складність Rummikub полягає в тому, що ви маєте повне право маніпулювати всіма фішками, які вже лежать на столі. Ви можете розбивати чужі ряди та створювати абсолютно нові комбінації!"
        ],

        assets: {
            cover: "./assets/images/rummikub-cover.jpg",
            rules: "./assets/rules/rummikub-rules.pdf",
            gallery: [
                "./assets/images/rummikub-gameplay-1.jpg",
                "./assets/images/rummikub-gameplay-2.jpg"
            ]
        },
        themeClass: "theme-rummikub",
        
        expansions: [] 
    }
];

console.log("База завантажена. Ігор у каталозі:", boardGames.length);