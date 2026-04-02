// Board Games Database

export const boardGames = [
    {   id: "dixit",
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
            rules: "./assets/dixit/rules.pdf",
            logo: "./assets/dixit/logo.png",
            cardsPdf: "assets/dixit/dixit-cards.pdf",
            gallery: ["./assets/dixit/cover.jpg", "./assets/dixit/gal2.png", "./assets/dixit/gal1.png"] 
        },

        themeClass: "theme-dixit",
        
        expansions: [
            {
                id: "dixit-quest",
                title: "Dixit: Quest",
                description: "Відкрийте для себе казкову подорож у світ дитинства та безтурботності. <br> 84 нові карти з приголомшливими ілюстраціями від Марі Кардуа.",
                owned: true,
                cardsPdf: "./assets/dixit/quest.pdf",
                cover: "./assets/dixit/quest.png" 
            },
            {
                id: "dixit-journey",
                title: "Dixit: Journey",
                description: "Пориньте у таємничу та чарівну мандрівку, повну несподіваних відкриттів. <br> 84 нові карти з приголомшливими ілюстраціями від Ксав'є Коллета.",
                owned: false,
                cardsPdf: "./assets/dixit/journey.pdf",
                cover: "./assets/dixit/journey.png" 
            },
            {
                id: "dixit-origins",
                title: "Dixit: Origins",
                description: "Поверніться до витоків фантастичних світів та міфічних створінь. <br> 84 нові карти з приголомшливими ілюстраціями від Клемана Лефевра.",
                owned: false,
                cardsPdf: "./assets/dixit/origins.pdf",
                cover: "./assets/dixit/origins.png" 
            },
            {
                id: "dixit-daydreams",
                title: "Dixit: Daydreams",
                description: "Відчуйте емоції снів наяву. Сюрреалістичний світ, де фантазія межує з реальністю. <br> 84 нові карти з приголомшливими ілюстраціями від Франка Діона.",
                owned: false,
                cardsPdf: "./assets/dixit/daydreams.pdf",
                cover: "./assets/dixit/daydreams.png" 
            },
            {
                id: "dixit-memories",
                title: "Dixit: Memories",
                description: "Знайдіть яскраві спогади з дитинства в екзотичних та живих пейзажах. <br> 84 нові карти з приголомшливими ілюстраціями від Карін Хіндер та Жерома Пелісьє.",
                owned: false,
                cardsPdf: "./assets/dixit/memories.pdf",
                cover: "./assets/dixit/memories.png" 
            },
            {
                id: "dixit-revelations",
                title: "Dixit: Revelations",
                description: "Насолоджуйтесь магічними та витонченими ілюстраціями, натхненними античною міфологією. <br> 84 нові карти з приголомшливими ілюстраціями від Марини Кудре.",
                owned: true,
                cardsPdf: "./assets/dixit/revelations.pdf",
                cover: "./assets/dixit/revelations.png" 
            },
            {
                id: "dixit-harmonies",
                title: "Dixit: Harmonies",
                description: "Відкрийте, як контраст стає джерелом гармонії у цьому дивному та прекрасному світі. <br> 84 нові карти з приголомшливими ілюстраціями від Поля Ешегоєна.",
                owned: true,
                cardsPdf: "./assets/dixit/harmonies.pdf",
                cover: "./assets/dixit/harmonies.png"
            },
            {
                id: "dixit-anniversary",
                title: "Dixit: Anniversary",
                description: "Святкуємо 10-річчя Dixit казками та легендами з усього світу. <br> 84 нові карти з приголомшливими ілюстраціями від усіх ілюстраторів серії.",
                owned: false,
                cardsPdf: "./assets/dixit/anniversary.pdf",
                cover: "./assets/dixit/anniversary.png" 
            },
            {
                id: "dixit-mirrors",
                title: "Dixit: Mirrors",
                description: "Дозвольте собі здивуватися казковим відображенням нашого повсякденного життя. <br> 84 нові карти з приголомшливими ілюстраціями від Себастьяна Теллескі.",
                owned: false,
                cardsPdf: "./assets/dixit/mirrors.pdf",
                cover: "./assets/dixit/mirrors.png" 
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