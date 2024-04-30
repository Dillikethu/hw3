function search() {
    const term = document.getElementById("search-input").value.trim().toLowerCase();
    const results = document.getElementById("result-list");
    results.innerHTML = "";

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`)
        .then(response => response.json())
        .then(data => {
            if (data.title === "No Definitions ") {
                results.innerHTML = "<li>No matches discovered</li>";
            } else {
                let count = 1;
                data.forEach(entry => {
                    const word = entry.word.toLowerCase(); 
                    if (word === term) {
                        const partOfSpeech = entry.meanings[0].partOfSpeech;
                        const definition = entry.meanings[0].definitions[0].definition;
                        results.innerHTML += `<li>${count}. ${word} (${partOfSpeech}): ${definition}</li>`;
                        count++;
                    }
                });
                if (count === 1) {
                    results.innerHTML = "<li>No precise match found</li>";
                }
            }
        });


    results.style.marginTop = "10px";
}

document.getElementById("search-input").addEventListener("input", search);
