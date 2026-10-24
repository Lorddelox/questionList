export const staticData = [
    {
        id: crypto.randomUUID(),
        title: "Уровень сложности",
        source: [
            { id: "1,2,3", title: "1-3" },
            { id: "4,5,6", title: "4-6" },
            { id: "7,8", title: "7-8" },
            { id: "9,10", title: "9-10" },
        ],
        filterKey: "complexity",
        isMultiple: false,
        type: "data"
    },
    {
        id: crypto.randomUUID(),
        title: "Рейтинг",
        source: [
            { id: "1", title: "1" },
            { id: "2", title: "2" },
            { id: "3", title: "3" },
            { id: "4", title: "4" },
            { id: "5", title: "5" },
        ],
        filterKey: "rate",
        isMultiple: false,
        type: "data"
    },
]