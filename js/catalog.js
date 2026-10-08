const collections = [
    {
        id: "tea-club",
        title: "TEA CLUB",
        description:
            "Чайные, спокойные и немного медитативные ароматы.",
        perfumeIds: [
            "the-noir-29",
            "dear-polly",
            "wulong-cha"
        ]
    },

    {
        id: "clean-skin",
        title: "CLEAN SKIN",
        description:
            "Мягкие композиции с ощущением чистоты и кожи.",
        perfumeIds: [
            "another-13",
            "musk-therapy",
            "valaya"
        ]
    },

    {
        id: "dark-side",
        title: "DARK SIDE",
        description:
            "Уд, кожа, специи и более тёмное настроение.",
        perfumeIds: [
            "oud-for-greatness",
            "african-leather",
            "interlude"
        ]
    },

    {
        id: "fresh-escape",
        title: "FRESH ESCAPE",
        description:
            "Свежие, зелёные и воздушные композиции.",
        perfumeIds: [
            "bal-dafrique",
            "philosykos",
            "megamare"
        ]
    }
];


const collectionsContainer =
    document.querySelector("#collections");


function createPerfumeCard(perfume) {
    const card = document.createElement("article");

    card.classList.add("perfume-card");

    card.innerHTML = `
        <div class="perfume-image-wrapper">
            <img
                class="perfume-image"
                src="${perfume.image}"
                alt="${perfume.brand} ${perfume.name}"
            >
        </div>

        <div class="perfume-info">
            <p class="perfume-brand">
                ${perfume.brand}
            </p>

            <h3>
                ${perfume.name}
            </h3>

            <p class="perfume-notes">
                ${perfume.notes.slice(0, 3).join(" · ")}
            </p>
        </div>
    `;

    return card;
}


function renderCollections() {
    collections.forEach(collection => {

        const perfumes = collection.perfumeIds
            .map(id =>
                window.perfumes.find(
                    perfume => perfume.id === id
                )
            )
            .filter(Boolean);


        const section =
            document.createElement("section");

        section.classList.add("perfume-collection");
        section.id = collection.id;


        const header =
            document.createElement("div");

        header.classList.add("collection-header");

        header.innerHTML = `
            <div>
                <h2>
                    ${collection.title}
                </h2>

                <p class="collection-description">
                    ${collection.description}
                </p>
            </div>
        `;


        const grid =
            document.createElement("div");

        grid.classList.add("perfume-grid");


        perfumes.forEach(perfume => {
            grid.appendChild(
                createPerfumeCard(perfume)
            );
        });


        section.appendChild(header);
        section.appendChild(grid);

        collectionsContainer.appendChild(section);
    });
}


renderCollections();