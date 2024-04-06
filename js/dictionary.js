function findDefinition() {
    const searchTerm = document.getElementById("search-input").value.trim().toLowerCase();
    const resultContainer = document.getElementById("result-list");
    resultContainer.innerHTML = "";

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            if (data.title === "No Definitions ") {
                resultContainer.innerHTML = "<li>No entries located</li>";
            } else {
                const matchingEntries = data.filter(entry => entry.word.toLowerCase() === searchTerm);
                if (matchingEntries.length > 0) {
                    matchingEntries.forEach(entry => {
                        const definition = entry.meanings[0].definitions[0].definition;
                        resultContainer.innerHTML += `<li>${entry.word}: ${definition}</li>`;
                    });
                } else {
                    resultContainer.innerHTML = "<li>No exact match found</li>";
                }
            }
        });
}

document.getElementById("search-input").addEventListener("input", findDefinition);
