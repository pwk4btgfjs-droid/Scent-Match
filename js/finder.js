const finderForm = document.querySelector("#finder-form");
const resultsSection = document.querySelector("#finder-results");
const resultsGrid = document.querySelector("#finder-results-grid");
const finderMessage = document.querySelector("#finder-message");

const quietMoods = [
    "чистый",
    "мягкий",
    "спокойный",
    "воздушный",
    "лёгкий",
    "нежный",
    "пудровый",
    "кремовый"
];

const strongMoods = [
    "яркий",
    "тёмный",
    "насыщенный",
    "вечерний",
    "дымный",
    "мощный",
    "пряный",
    "энергичный"
];


function normalizeText(value) {
    return String(value)
        .toLowerCase()
        .trim()
        .replaceAll("ё", "е");
}


function containsValue(array, value) {
    const normalizedValue = normalizeText(value);

    return array.some(item =>
        normalizeText(item) === normalizedValue
    );
}


function getCheckedValues(name) {
    return Array.from(
        document.querySelectorAll(
            `input[name="${name}"]:checked`
        )
    ).map(input => input.value);
}


function hasMoodFromGroup(perfume, group) {
    return perfume.moods.some(mood =>
        group.some(item =>
            normalizeText(mood) === normalizeText(item)
        )
    );
}


function getStyleBonus(perfume, projection, sillage) {
    let bonus = 0;

    if (
        projection === "intimate" &&
        hasMoodFromGroup(perfume, quietMoods)
    ) {
        bonus++;
    }

    if (
        projection === "strong" &&
        hasMoodFromGroup(perfume, strongMoods)
    ) {
        bonus++;
    }

    if (
        sillage === "minimal" &&
        hasMoodFromGroup(perfume, quietMoods)
    ) {
        bonus++;
    }

    if (
        sillage === "pronounced" &&
        hasMoodFromGroup(perfume, strongMoods)
    ) {
        bonus++;
    }

    return bonus;
}


function calculateMatch(
    perfume,
    selectedMoods,
    selectedNotes,
    projection,
    sillage
) {
    const matchedNotes = selectedNotes.filter(note =>
        containsValue(perfume.notes, note)
    );

    const matchedMoods = selectedMoods.filter(mood =>
        containsValue(perfume.moods, mood)
    );

    const score =
        matchedNotes.length * 4 +
        matchedMoods.length * 3;

    const maxScore =
        selectedNotes.length * 4 +
        selectedMoods.length * 3;

    const percentage =
        maxScore === 0
            ? 0
            : Math.round((score / maxScore) * 100);

    return {
        perfume,
        score,
        percentage: Math.min(percentage, 100),
        styleBonus: getStyleBonus(
            perfume,
            projection,
            sillage
        ),
        matchedNotes,
        matchedMoods
    };
}


function createMatchReason(matchedNotes, matchedMoods) {
    const parts = [];

    if (matchedNotes.length > 0) {
        parts.push(
            `Ноты: ${matchedNotes.join(", ")}`
        );
    }

    if (matchedMoods.length > 0) {
        parts.push(
            `Настроение: ${matchedMoods.join(", ")}`
        );
    }

    return parts.join(" · ");
}


function createResultCard(result) {
    const {
        perfume,
        percentage,
        matchedNotes,
        matchedMoods
    } = result;

    const card = document.createElement("article");

    card.classList.add("finder-result-card");

    card.innerHTML = `
        <div class="finder-match">
            ${percentage}% MATCH
        </div>

        <div class="finder-result-image">
            <img
                src="${perfume.image}"
                alt="${perfume.brand} ${perfume.name}"
            >
        </div>

        <p class="finder-result-brand">
            ${perfume.brand}
        </p>

        <h3>
            ${perfume.name}
        </h3>

        <p class="finder-result-notes">
            ${perfume.notes.slice(0, 4).join(" · ")}
        </p>

        <p class="finder-result-reason">
            ${createMatchReason(
                matchedNotes,
                matchedMoods
            )}
        </p>
    `;

    return card;
}


finderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedMoods =
        getCheckedValues("mood");

    const selectedNotes =
        getCheckedValues("notes");

    const projection =
        document.querySelector(
            'input[name="projection"]:checked'
        )?.value || "moderate";

    const sillage =
        document.querySelector(
            'input[name="sillage"]:checked'
        )?.value || "moderate";

    let resultNumber =
        Number(
            document.querySelector(
                "#result-number"
            ).value
        );

    if (
        Number.isNaN(resultNumber) ||
        resultNumber < 1
    ) {
        resultNumber = 3;
    }

    resultNumber = Math.min(resultNumber, 5);


    if (
        selectedMoods.length === 0 &&
        selectedNotes.length === 0
    ) {
        finderMessage.textContent =
            "Выбери хотя бы одно настроение или одну ноту.";

        resultsSection.hidden = true;

        return;
    }
    
    const formData = new FormData(finderForm);

    fetch(finderForm.action, {
        method: finderForm.method.toUpperCase(),
        body: formData
    }).catch(function (error) {
        console.log("Ошибка отправки формы:", error);
    });

    const matches = window.perfumes
        .map(perfume =>
            calculateMatch(
                perfume,
                selectedMoods,
                selectedNotes,
                projection,
                sillage
            )
        )
        .filter(result =>
            result.score > 0
        );


    matches.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }

        if (b.styleBonus !== a.styleBonus) {
            return b.styleBonus - a.styleBonus;
        }

        if (
            b.matchedNotes.length !==
            a.matchedNotes.length
        ) {
            return (
                b.matchedNotes.length -
                a.matchedNotes.length
            );
        }

        return (
            b.matchedMoods.length -
            a.matchedMoods.length
        );
    });


    if (matches.length === 0) {
        finderMessage.textContent =
            "По выбранной комбинации совпадений пока нет.";

        resultsSection.hidden = true;

        return;
    }


    finderMessage.textContent = "";
    resultsGrid.innerHTML = "";

    matches
        .slice(0, resultNumber)
        .forEach(result => {
            resultsGrid.appendChild(
                createResultCard(result)
            );
        });


    resultsSection.hidden = false;

    resultsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});