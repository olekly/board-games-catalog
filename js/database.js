// Board Games Database

/*
// Шаблон для нової гри:
{
        // -----------------------------------------
        // 1. ОСНОВНА ІНФОРМАЦІЯ
        // -----------------------------------------
        id: 'game-id',
        title: 'Назва гри',
        themeClass: 'theme-gameid', // Клас для CSS-стилів сторінки
        price: 0, 
        
        // -----------------------------------------
        // 2. ГЕЙМПЛЕЙ ТА ФІЛЬТРИ
        // -----------------------------------------
        players: { min: 2, max: 4 }, // Мінімальна та максимальна кількість гравців
        language: 'Українська', // Мова гри або 'Language Independent'
        playTimeMinutes: 60, // Очікуваний час партії в хвилинах
        hardnes: 2.5, // Складність від 1.0 до 5.0 (наприклад, за шкалою BGG)
        tags: ['strategy', 'family', 'cardgame', 'party'], // Теги для категоризації та фільтрів
        
        // -----------------------------------------
        // 3. ФІЗИЧНІ ПАРАМЕТРИ
        // -----------------------------------------
        dimensions: { w: 0, h: 0, d: 0 }, // Розмір коробки в міліметрах (ширина, висота, глибина)
        weightGrams: 0, // Вага коробки в грамах
        hasBling: false, // Наявність преміум-компонентів, органайзерів, металевих монет
        components: {
            cards: [
                { size: "63.5x88", count: 100, sleeved: false } // Формат та кількість карт, інформація про протектори
            ],              
            other: 'Ігрове поле, жетони, міпли, кубики, правила' // Інші компоненти списком або рядком
        },

        // -----------------------------------------
        // 4. ТЕКСТИ
        // -----------------------------------------
        shortDescription: 'Короткий опис або слоган гри (відображатиметься в каталозі).', 
        fullDescription: [          
            'Перший абзац розширеного опису. Вступна інформація про сеттинг.',
            'Другий абзац розширеного опису. Основні механіки та мета гри.',
            'Третій абзац з додатковими деталями або цікавими фактами про ігровий процес.'
        ],

        // -----------------------------------------
        // 5. МЕДІА
        // -----------------------------------------
        assets: {
            logo: './assets/gameid/logo.png', // Логотип гри (опціонально)
            cover: './assets/gameid/box-front.jpg', // Фото обкладинки коробки
            rules: './assets/gameid/rules.pdf', // PDF-файл з правилами
            cardsPdf: '', // Опціональний PDF-файл з прикладами карток // Додаткові файли, якщо є                           
            gallery: [ // Фотографії ігрового процесу або компонентів                                
                './assets/gameid/gameplay-1.jpg',
                './assets/gameid/gameplay-2.jpg'
            ]
        },

        // -----------------------------------------
        // 6. СТАТИСТИКА ТА ПАСХАЛКИ
        // -----------------------------------------
        lastPlayedDate: '2024-01-01', // Дата останньої зіграної партії
        houseRules: [ // Домашні правила             
            'Опис правила, за яким ви зазвичай граєте або змінили під себе.'
        ],
        hallOfFame: [ // Рекорди та досягнення              
            { name: 'Ім\'я Гравця', score: 100, date: '2024-01-01' }
        ],

        // -----------------------------------------
        // 7. ДОПОВНЕННЯ (опціонально)
        // -----------------------------------------
        expansions: [
            {
                id: "exp-id",
                title: "Назва доповнення",
                description: "Короткий опис нововведень доповнення.",
                price: 0,
                owned: false, // В наявності?
                planned: false, // Планується до покупки / у вішлісті?
                cover: "./assets/gameid/exp-cover.png" 
            }
        ]
    }
*/

export const boardGames = [
    {   id: "dixit",
        title: "Dixit",
        themeClass: "theme-dixit",
        price: 28.99,

        players: { min: 3, max: 8 },
        language: "Language Independent",
        playTimeMinutes: 30,
        hardnes: 1.19,
        tags: ['party', 'association', 'art', 'family', 'creative'],

        dimensions: { w: 0, h: 0, d: 0 },   //fix that
        weightGrams: 0,                     //fix that
        hasBling: false,            
        components: {
            cards: [
                { size: "80x120", count: 84, sleeved: false } 
            ],              
            other: '8 дерев\'яних кроликів, 8 жетонів голосування, поле' 
        },
        
        shortDescription: "Гра на асоціації з красивими та сюрреалістичними ілюстраціями.",
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
            gallery: ["./assets/dixit/cover.jpg",
                      "./assets/dixit/gal2.png", 
                      "./assets/dixit/gal3.jpg", 
                      "./assets/dixit/gal4.jpg", 
                      "./assets/dixit/gal1.png"] 
        },

        lastPlayedDate: '2024-04-01',               
        houseRules: [               
            'Можна зіграти два кола, щоб кожен встиг побути оповідачем.'
        ],
        hallOfFame: [],

        expansions: [
            {
                id: "dixit-odyssey",
                title: "Dixit: Odyssey",
                description: "Дозволяє грати компанією до 12 людей. <br> 84 нові карти з приголомшливими ілюстраціями від Жан-Люї Руб'є.",
                price: "",
                owned: false,
                planned: true,
                cardsPdf: "./assets/dixit/odyssey.pdf",
                cover: "./assets/dixit/odyssey.png" 
            },
            {
                id: "dixit-quest",
                title: "Dixit: Quest",
                description: "Відкрийте для себе казкову подорож у світ дитинства та безтурботності. <br> 84 нові карти з приголомшливими ілюстраціями від Марі Кардуа.",
                price: 19.99,
                owned: true,
                planned: true,
                cardsPdf: "./assets/dixit/quest.pdf",
                cover: "./assets/dixit/quest.png" 
            },
            {
                id: "dixit-journey",
                title: "Dixit: Journey",
                description: "Пориньте у таємничу та чарівну мандрівку, повну несподіваних відкриттів. <br> 84 нові карти з приголомшливими ілюстраціями від Ксав'є Коллета.",
                price: "",
                owned: false,
                planned: true,
                cardsPdf: "./assets/dixit/journey.pdf",
                cover: "./assets/dixit/journey.png" 
            },
            {
                id: "dixit-origins",
                title: "Dixit: Origins",
                description: "Поверніться до витоків фантастичних світів та міфічних створінь. <br> 84 нові карти з приголомшливими ілюстраціями від Клемана Лефевра.",
                price: "",
                owned: false,
                planned: true,
                cardsPdf: "./assets/dixit/origins.pdf",
                cover: "./assets/dixit/origins.png" 
            },
            {
                id: "dixit-daydreams",
                title: "Dixit: Daydreams",
                description: "Відчуйте емоції снів наяву. Сюрреалістичний світ, де фантазія межує з реальністю. <br> 84 нові карти з приголомшливими ілюстраціями від Франка Діона.",
                price: "",
                owned: false,
                planned: true,
                cardsPdf: "./assets/dixit/daydreams.pdf",
                cover: "./assets/dixit/daydreams.png" 
            },
            {
                id: "dixit-memories",
                title: "Dixit: Memories",
                description: "Знайдіть яскраві спогади з дитинства в екзотичних та живих пейзажах. <br> 84 нові карти з приголомшливими ілюстраціями від Карін Хіндер та Жерома Пелісьє.",
                price: "",
                owned: false,
                planned: true,
                cardsPdf: "./assets/dixit/memories.pdf",
                cover: "./assets/dixit/memories.png" 
            },
            {
                id: "dixit-revelations",
                title: "Dixit: Revelations",
                description: "Насолоджуйтесь магічними та витонченими ілюстраціями, натхненними античною міфологією. <br> 84 нові карти з приголомшливими ілюстраціями від Марини Кудре.",
                price: 19.99,
                owned: true,
                planned: true,
                cardsPdf: "./assets/dixit/revelations.pdf",
                cover: "./assets/dixit/revelations.png" 
            },
            {
                id: "dixit-harmonies",
                title: "Dixit: Harmonies",
                description: "Відкрийте, як контраст стає джерелом гармонії у цьому дивному та прекрасному світі. <br> 84 нові карти з приголомшливими ілюстраціями від Поля Ешегоєна.",
                price: 19.99,
                owned: true,
                planned: true,
                cardsPdf: "./assets/dixit/harmonies.pdf",
                cover: "./assets/dixit/harmonies.png"
            },
            {
                id: "dixit-anniversary",
                title: "Dixit: Anniversary",
                description: "Святкуємо 10-річчя Dixit казками та легендами з усього світу. <br> 84 нові карти з приголомшливими ілюстраціями від усіх ілюстраторів серії.",
                price: "",
                owned: false,
                planned: true,
                cardsPdf: "./assets/dixit/anniversary.pdf",
                cover: "./assets/dixit/anniversary.png" 
            },
            {
                id: "dixit-mirrors",
                title: "Dixit: Mirrors",
                description: "Дозвольте собі здивуватися казковим відображенням нашого повсякденного життя. <br> 84 нові карти з приголомшливими ілюстраціями від Себастьяна Теллескі.",
                price: "",
                owned: false,
                planned: true,
                cardsPdf: "./assets/dixit/mirrors.pdf",
                cover: "./assets/dixit/mirrors.png" 
            }
        ]
    },


    {   id: "rummikub",
        title: "Rummikub",
        language: "Language Independent",
        players: { min: 2, max: 4 },
        playTimeMinutes: 45,
        hardnes: 2.5,
        price: "",
        
        shortDescription: "Світовий хіт серед сімейних ігор, що поєднує логіку маджонгу та правила карткового рамі.",
        
        fullDescription: [
            "Rummikub — це геніальна у своїй простоті гра, яка вимагає уважності, логічного мислення та вміння планувати на кілька кроків вперед. Замість карт використовуються приємні на дотик пластикові фішки.",
            "Мета гри — першим позбутися всіх своїх фішок з підставки. Для цього їх потрібно викладати на стіл у вигляді числових рядів або груп за кольорами.",
            "Головна складність Rummikub полягає в тому, що ви маєте повне право маніпулювати всіма фішками, які вже лежать на столі. Ви можете розбивати чужі ряди та створювати абсолютно нові комбінації!"
        ],

        assets: {
            cover: "./assets/rummikub/rum-front.png",
            rules: "./assets/rummikub/rules.pdf",
            logo: "./assets/rummikub/logo.png",
            gallery: [
                "./assets/rummikub/rum-front.png",
                "./assets/rummikub/gal3.jpg",
                "./assets/rummikub/gal2.jpg",
                "./assets/rummikub/gal4.jpg",
                "./assets/rummikub/gal5.jpg",
                "./assets/rummikub/gal6.jpg",
                "./assets/rummikub/gal7.jpg"
            ]
        },
        themeClass: "theme-rummikub",
        
        expansions: [] 
    }
];

console.log("База завантажена. Ігор у каталозі:", boardGames.length);