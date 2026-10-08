// ===========================================
// SCENT MATCH — NOTES
// ===========================================

const noteResults =
    document.querySelector("#note-results");

const noteResultsTitle =
    document.querySelector("#note-results-title");

const noteResultsMessage =
    document.querySelector("#note-results-message");

const noteResultsGrid =
    document.querySelector("#note-results-grid");

const clearNoteButton =
    document.querySelector("#clear-note-filter");


// -------------------------------------------
// Нормализация текста
// -------------------------------------------

function normalizeText(text) {

    return text
        .toLowerCase()
        .trim()
        .replaceAll("ё", "е");

}


// -------------------------------------------
// Проверяем, есть ли нота у аромата
// -------------------------------------------

function perfumeHasNote(perfume, selectedNote) {

    const selected =
        normalizeText(selectedNote);


    return perfume.notes.some(note => {

        const perfumeNote =
            normalizeText(note);


        return (
            perfumeNote === selected ||
            perfumeNote.includes(selected) ||
            selected.includes(perfumeNote)
        );

    });

}


// -------------------------------------------
// Создание карточки
// -------------------------------------------

function createNotePerfumeCard(perfume) {

    const card =
        document.createElement("article");

    card.classList.add("note-perfume-card");


    card.innerHTML = `

        <div class="note-perfume-image">

            <img
                src="${perfume.image}"
                alt="${perfume.brand} ${perfume.name}"
            >

        </div>


        <p class="note-perfume-brand">
            ${perfume.brand}
        </p>


        <h3>
            ${perfume.name}
        </h3>


        <p class="note-perfume-notes">
            ${perfume.notes.join(" · ")}
        </p>

    `;


    return card;

}


// -------------------------------------------
// Показываем ароматы по ноте
// -------------------------------------------

function showPerfumesByNote(note) {

    const matches =
        window.perfumes.filter(perfume =>
            perfumeHasNote(perfume, note)
        );


    noteResultsGrid.innerHTML = "";


    noteResultsTitle.textContent =
        `Ароматы с нотой «${note}»`;


    if (matches.length === 0) {

        noteResultsMessage.textContent =
            "В текущей коллекции Scent Match пока нет ароматов с этой нотой.";

    } else {

        noteResultsMessage.textContent =
            `Найдено ароматов: ${matches.length}`;


        matches.forEach(perfume => {

            noteResultsGrid.appendChild(
                createNotePerfumeCard(perfume)
            );

        });

    }


    noteResults.hidden = false;


    noteResults.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// -------------------------------------------
// Превращаем существующие <li>
// в интерактивные ноты
// -------------------------------------------

const noteItems =
    document.querySelectorAll(
        ".note-list li"
    );


noteItems.forEach(item => {

    const note =
        item.textContent.trim();




    item.setAttribute("role", "button");

    item.setAttribute("tabindex", "0");


    item.addEventListener(
        "click",
        function () {

            showPerfumesByNote(note);

        }
    );


    item.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                showPerfumesByNote(note);

            }

        }
    );

});


// -------------------------------------------
// Сброс
// -------------------------------------------

clearNoteButton.addEventListener(
    "click",
    function () {

        noteResults.hidden = true;

        noteResultsGrid.innerHTML = "";

        noteResultsMessage.textContent = "";

    }
);