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

        dimensions: { w: 275, h: 275, d: 55 },   
        weightGrams: 1430,                     //dixit + 3 erweiterungen
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
                cover: "./assets/dixit/odyssey.png",
                components: {
                    cards: [
                        { size: "80x120", count: 84, sleeved: false } 
                    ],                  
                    other: '12 дерев\'яних кроликів, 24 жетонів голосування, 12 токенів гравця, поле' 
                },
            },
            {
                id: "dixit-quest",
                title: "Dixit: Quest",
                description: "Відкрийте для себе казкову подорож у світ дитинства та безтурботності. <br> 84 нові карти з приголомшливими ілюстраціями від Марі Кардуа.",
                price: 19.99,
                owned: true,
                planned: true,
                cardsPdf: "./assets/dixit/quest.pdf",
                cover: "./assets/dixit/quest.png",
                components: {
                    cards: [
                        { size: "80x120", count: 84, sleeved: false } 
                    ]
                }
            },
            {
                id: "dixit-journey",
                title: "Dixit: Journey",
                description: "Пориньте у таємничу та чарівну мандрівку, повну несподіваних відкриттів. <br> 84 нові карти з приголомшливими ілюстраціями від Ксав'є Коллета.",
                price: "",
                owned: false,
                planned: true,
                cardsPdf: "./assets/dixit/journey.pdf",
                cover: "./assets/dixit/journey.png",
                components: {
                    cards: [
                        { size: "80x120", count: 84, sleeved: false } 
                    ]
                }
            },
            {
                id: "dixit-origins",
                title: "Dixit: Origins",
                description: "Поверніться до витоків фантастичних світів та міфічних створінь. <br> 84 нові карти з приголомшливими ілюстраціями від Клемана Лефевра.",
                price: "",
                owned: false,
                planned: true,
                cardsPdf: "./assets/dixit/origins.pdf",
                cover: "./assets/dixit/origins.png",
                components: {
                    cards: [
                        { size: "80x120", count: 84, sleeved: false } 
                    ]
                } 
            },
            {
                id: "dixit-daydreams",
                title: "Dixit: Daydreams",
                description: "Відчуйте емоції снів наяву. Сюрреалістичний світ, де фантазія межує з реальністю. <br> 84 нові карти з приголомшливими ілюстраціями від Франка Діона.",
                price: "",
                owned: false,
                planned: true,
                cardsPdf: "./assets/dixit/daydreams.pdf",
                cover: "./assets/dixit/daydreams.png",
                components: {
                    cards: [
                        { size: "80x120", count: 84, sleeved: false } 
                    ]
                } 
            },
            {
                id: "dixit-memories",
                title: "Dixit: Memories",
                description: "Знайдіть яскраві спогади з дитинства в екзотичних та живих пейзажах. <br> 84 нові карти з приголомшливими ілюстраціями від Карін Хіндер та Жерома Пелісьє.",
                price: "",
                owned: false,
                planned: true,
                cardsPdf: "./assets/dixit/memories.pdf",
                cover: "./assets/dixit/memories.png",
                components: {
                    cards: [
                        { size: "80x120", count: 84, sleeved: false } 
                    ]
                } 
            },
            {
                id: "dixit-revelations",
                title: "Dixit: Revelations",
                description: "Насолоджуйтесь магічними та витонченими ілюстраціями, натхненними античною міфологією. <br> 84 нові карти з приголомшливими ілюстраціями від Марини Кудре.",
                price: 19.99,
                owned: true,
                planned: true,
                cardsPdf: "./assets/dixit/revelations.pdf",
                cover: "./assets/dixit/revelations.png",
                components: {
                    cards: [
                        { size: "80x120", count: 84, sleeved: false } 
                    ]
                } 
            },
            {
                id: "dixit-harmonies",
                title: "Dixit: Harmonies",
                description: "Відкрийте, як контраст стає джерелом гармонії у цьому дивному та прекрасному світі. <br> 84 нові карти з приголомшливими ілюстраціями від Поля Ешегоєна.",
                price: 19.99,
                owned: true,
                planned: true,
                cardsPdf: "./assets/dixit/harmonies.pdf",
                cover: "./assets/dixit/harmonies.png",
                components: {
                    cards: [
                        { size: "80x120", count: 84, sleeved: false } 
                    ]
                }
            },
            {
                id: "dixit-anniversary",
                title: "Dixit: Anniversary",
                description: "Святкуємо 10-річчя Dixit казками та легендами з усього світу. <br> 84 нові карти з приголомшливими ілюстраціями від усіх ілюстраторів серії.",
                price: "",
                owned: false,
                planned: true,
                cardsPdf: "./assets/dixit/anniversary.pdf",
                cover: "./assets/dixit/anniversary.png",
                components: {
                    cards: [
                        { size: "80x120", count: 84, sleeved: false } 
                    ]
                } 
            },
            {
                id: "dixit-mirrors",
                title: "Dixit: Mirrors",
                description: "Дозвольте собі здивуватися казковим відображенням нашого повсякденного життя. <br> 84 нові карти з приголомшливими ілюстраціями від Себастьяна Теллескі.",
                price: "",
                owned: false,
                planned: true,
                cardsPdf: "./assets/dixit/mirrors.pdf",
                cover: "./assets/dixit/mirrors.png",
                components: {
                    cards: [
                        { size: "80x120", count: 84, sleeved: false } 
                    ]
                } 
            }
        ]
    },

    {   id: "rummikub",
        title: "Rummikub",
        themeClass: "theme-rummikub",
        price: 19.99,
        
        players: { min: 2, max: 4 },
        language: "Language Independent",
        playTimeMinutes: 45,
        hardnes: 2.5,
        tags: ['abstract', 'family', 'classic', 'numbers'],

        dimensions: { w: 130, h: 215, d: 40 }, 
        weightGrams: 350, 
        hasBling: false, 
        components: {
            cards: [], 
            other: '106 пластикових плиток (по два набори від 1 до 13 у 4 кольорах + 2 джокери), 4 пластикові підставки для плиток, правила гри.' 
        },

        shortDescription: "Геніально проста і неймовірно захоплива гра з числами, що стала світовою класикою.",
        
        fullDescription: [
            "Rummikub — це геніальна у своїй простоті гра, яка вимагає уважності, логічного мислення та вміння планувати на кілька кроків вперед. Замість карт використовуються приємні на дотик пластикові фішки.",
            'Мета гри — першим позбутися всіх плиток зі своєї підставки. Для цього гравці повинні викладати на стіл комбінації: "групи" (три або чотири плитки одного числа, але різного кольору) або "ряди" (три або більше послідовних чисел одного кольору). Щоб зробити свій перший хід ("відкритися"), потрібно викласти комбінації, сума чисел яких становить не менше 30.',
            "Головна складність Rummikub полягає в тому, що ви маєте повне право маніпулювати всіма фішками, які вже лежать на столі. Ви можете розбивати чужі ряди та створювати абсолютно нові комбінації!"
        ],

        assets: {
            cover: "./assets/rummikub/rum-front.jpg",
            rules: "./assets/rummikub/rules.pdf",
            logo: "./assets/rummikub/logo.png",
            gallery: [
                "./assets/rummikub/rum-front.jpg",
                "./assets/rummikub/gal3.jpg",
                "./assets/rummikub/gal2.jpg",
                "./assets/rummikub/gal4.jpg",
                "./assets/rummikub/gal5.jpg",
                "./assets/rummikub/gal6.jpg",
                "./assets/rummikub/gal7.jpg"
            ]
        },
        
        lastPlayedDate: '21.03.2026', 
        houseRules: [             
            'Якщо гравець довго думає над ходом, можна погрожувати перевернути пісочний годинник.',
        ],
        hallOfFame: [              
            { name: '', score: '', date: '' }
        ],
        
        expansions: [] 
    },

    {   id: 'veggie-crash',
        title: 'Veggie Crash',
        themeClass: 'theme-veggie-crash', 
        price: 12.99, 
        
        players: { min: 2, max: 6 }, 
        language: 'Language Independent', 
        playTimeMinutes: 15, 
        hardnes: 1.05, 
        tags: ['cardgame', 'economy', 'party', 'push-your-luck', 'family'], 
        
        dimensions: { w: 130, h: 130, d: 45 }, 
        weightGrams: 254, 
        hasBling: false, 
        components: {
            cards: [
                { size: "56.5x87.5", count: 100, sleeved: false } 
            ],              
            other: 'Блокнот для підрахунку очок' 
        },

        shortDescription: 'Швидка та азартна карткова гра про біржові спекуляції на ринку овочів.', 
        fullDescription: [          
            'Ласкаво просимо на овочевий ринок, де кожен день — це нова можливість заробити на різниці цін! У цій динамічній картковій грі гравці виступають у ролі спритних торговців, які намагаються передбачити коливання попиту та вигідно продати свій товар.',
            'Кожного раунду на стіл викладаються картки з різними комбінаціями овочів (на одну більше, ніж гравців). Ви по черзі забираєте собі по одній картці в закриту. Та картка, що залишиться нічиєю, визначить, які овочі подорожчають на ринку!',
            'Але будьте обережні: якщо ціна на певний овоч злетить занадто високо, станеться "біржовий крах", і його вартість впаде до нуля. Перемагає той, хто після 6 раундів зможе найвигідніше продати свій врожай.'
        ],

        assets: {    //full  that
            logo: './assets/veggie-crash/logo.png', 
            cover: './assets/veggie-crash/box-front.jpg', 
            rules: './assets/veggie-crash/rules.pdf', 
            cardsPdf: '', 
            gallery: [ 
                './assets/veggie-crash/gameplay-1.jpg',
                './assets/veggie-crash/gameplay-2.jpg'
            ]
        },

        lastPlayedDate: '25.08.2024', 
        houseRules: [],
        hallOfFame: [              
            { name: '', score: '', date: '' }
        ]
    }

];

console.log("База завантажена. Ігор у каталозі:", boardGames.length);