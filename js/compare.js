// ===========================================
// SCENT MATCH — COMPARE
// ===========================================

const perfumeOneSelect =
    document.querySelector("#perfume-one");

const perfumeTwoSelect =
    document.querySelector("#perfume-two");

const compareMessage =
    document.querySelector("#compare-message");


// -------------------------------------------
// Заполняем select ароматами
// -------------------------------------------

function fillPerfumeSelectors() {

    window.perfumes.forEach(perfume => {

        const optionOne =
            document.createElement("option");

        optionOne.value = perfume.id;

        optionOne.textContent =
            `${perfume.brand} — ${perfume.name}`;


        const optionTwo =
            optionOne.cloneNode(true);


        perfumeOneSelect.appendChild(optionOne);

        perfumeTwoSelect.appendChild(optionTwo);

    });


    // Стартовые разные ароматы

    perfumeOneSelect.selectedIndex = 0;

    perfumeTwoSelect.selectedIndex =
        window.perfumes.length > 1 ? 1 : 0;
}


// -------------------------------------------
// Находим аромат по id
// -------------------------------------------

function getPerfume(id) {

    return window.perfumes.find(
        perfume => perfume.id === id
    );

}


// -------------------------------------------
// Общие элементы двух массивов
// -------------------------------------------

function getCommonItems(arrayOne, arrayTwo) {

    return arrayOne.filter(item =>
        arrayTwo.includes(item)
    );

}


// -------------------------------------------
// Уникальные элементы
// -------------------------------------------

function getUniqueItems(arrayOne, arrayTwo) {

    return arrayOne.filter(item =>
        !arrayTwo.includes(item)
    );

}


// -------------------------------------------
// Красиво выводим массив
// -------------------------------------------

function formatList(items) {

    if (items.length === 0) {
        return "—";
    }

    return items.join(" · ");

}


// -------------------------------------------
// Отрисовываем сравнение
// -------------------------------------------

function renderComparison() {

    const perfumeOne =
        getPerfume(perfumeOneSelect.value);

    const perfumeTwo =
        getPerfume(perfumeTwoSelect.value);


    if (!perfumeOne || !perfumeTwo) {
        return;
    }


    if (perfumeOne.id === perfumeTwo.id) {

        compareMessage.textContent =
            "Выбери два разных аромата для сравнения.";

    } else {

        compareMessage.textContent = "";

    }


    // ---------------------------------------
    // Изображения
    // ---------------------------------------

    const imageOne =
        document.querySelector("#compare-image-one");

    const imageTwo =
        document.querySelector("#compare-image-two");


    imageOne.src = perfumeOne.image;

    imageOne.alt =
        `${perfumeOne.brand} ${perfumeOne.name}`;


    imageTwo.src = perfumeTwo.image;

    imageTwo.alt =
        `${perfumeTwo.brand} ${perfumeTwo.name}`;


    // ---------------------------------------
    // Изображения внутри таблицы
    // ---------------------------------------

    const tableImageOne =
        document.querySelector("#table-image-one");

    const tableImageTwo =
        document.querySelector("#table-image-two");

    const tableImageLinkOne =
        document.querySelector("#table-image-link-one");

    const tableImageLinkTwo =
        document.querySelector("#table-image-link-two");


    tableImageOne.src = perfumeOne.image;

    tableImageOne.alt =
        `${perfumeOne.brand} ${perfumeOne.name}`;


    tableImageTwo.src = perfumeTwo.image;

    tableImageTwo.alt =
        `${perfumeTwo.brand} ${perfumeTwo.name}`;


    tableImageLinkOne.href = perfumeOne.image;

    tableImageLinkTwo.href = perfumeTwo.image;

    // ---------------------------------------
    // Верхняя часть
    // ---------------------------------------

    document.querySelector(
        "#compare-brand-one"
    ).textContent = perfumeOne.brand;


    document.querySelector(
        "#compare-name-one"
    ).textContent = perfumeOne.name;


    document.querySelector(
        "#compare-brand-two"
    ).textContent = perfumeTwo.brand;


    document.querySelector(
        "#compare-name-two"
    ).textContent = perfumeTwo.name;


    // ---------------------------------------
    // Заголовки таблицы
    // ---------------------------------------

    document.querySelector(
        "#table-name-one"
    ).textContent = perfumeOne.name;


    document.querySelector(
        "#table-name-two"
    ).textContent = perfumeTwo.name;


    // ---------------------------------------
    // Бренд
    // ---------------------------------------

    document.querySelector(
        "#compare-table-brand-one"
    ).textContent = perfumeOne.brand;


    document.querySelector(
        "#compare-table-brand-two"
    ).textContent = perfumeTwo.brand;


    // ---------------------------------------
    // Семейства
    // ---------------------------------------

    document.querySelector(
        "#compare-family-one"
    ).textContent =
        formatList(perfumeOne.families);


    document.querySelector(
        "#compare-family-two"
    ).textContent =
        formatList(perfumeTwo.families);


    // ---------------------------------------
    // Ноты
    // ---------------------------------------

    document.querySelector(
        "#compare-notes-one"
    ).textContent =
        formatList(perfumeOne.notes);


    document.querySelector(
        "#compare-notes-two"
    ).textContent =
        formatList(perfumeTwo.notes);


    // ---------------------------------------
    // Характер
    // ---------------------------------------

    document.querySelector(
        "#compare-moods-one"
    ).textContent =
        formatList(perfumeOne.moods);


    document.querySelector(
        "#compare-moods-two"
    ).textContent =
        formatList(perfumeTwo.moods);


    // ---------------------------------------
    // Общие ноты
    // ---------------------------------------

    const commonNotes =
        getCommonItems(
            perfumeOne.notes,
            perfumeTwo.notes
        );


    document.querySelector(
        "#compare-common-notes"
    ).textContent =
        formatList(commonNotes);


    // ---------------------------------------
    // Отличительные ноты
    // ---------------------------------------

    const uniqueOne =
        getUniqueItems(
            perfumeOne.notes,
            perfumeTwo.notes
        );


    const uniqueTwo =
        getUniqueItems(
            perfumeTwo.notes,
            perfumeOne.notes
        );


    document.querySelector(
        "#compare-unique-one"
    ).textContent =
        formatList(uniqueOne);


    document.querySelector(
        "#compare-unique-two"
    ).textContent =
        formatList(uniqueTwo);

}


// -------------------------------------------
// Следим за выбором
// -------------------------------------------

perfumeOneSelect.addEventListener(
    "change",
    renderComparison
);


perfumeTwoSelect.addEventListener(
    "change",
    renderComparison
);


// -------------------------------------------
// Старт страницы
// -------------------------------------------

fillPerfumeSelectors();

renderComparison();