console.log("filter by score script started.");

(function() {

    let all_items

    const selector = document.createElement("select")
    selector.id = "filter-by-score-selector"
    selector.toggleAttribute("multiple", true)

    const option_very_good = document.createElement("option")
    option_very_good.value = "great"
    option_very_good.innerText = "great"

    const option_good = document.createElement("option")
    option_good.value = "good"
    option_good.innerText = "good"

    const option_average = document.createElement("option")
    option_average.value = "average"
    option_average.innerText = "average"

    const option_bad = document.createElement("option")
    option_bad.value = "bad"
    option_bad.innerText = "bad"

    const option_no_score = document.createElement("option")
    option_no_score.value = "no-score"
    option_no_score.innerText = "no score"

    let counters = [0, 0, 0, 0]
    const counters_div = document.createElement("div")
    counters_div.id = "score-counters"

    selector.appendChild(option_very_good)
    selector.appendChild(option_good)
    selector.appendChild(option_average)
    selector.appendChild(option_bad)
    selector.appendChild(option_no_score)

    function filter_cards() {
        all_items = document.querySelectorAll("div.media-card")
        if (all_items == null) return
        filter_values = Array.from(selector.childNodes).filter(item => item.selected).map(item => item.value)
        console.log(filter_values)
        if (filter_values.length == 0) {
            all_items.forEach((elem) => {
                elem.style.display = ""
            })
        } else {
            all_items.forEach((elem) => {
                let temp = elem.querySelector(".icon-stat .stat")
                let score = 0
                if (temp != null && temp.textContent.trim().includes("%")) {
                    score = parseInt(temp.textContent.trim().slice(0, -1))
                }
                elem.style.display = "none"
                if (filter_values.includes("great") && score >= 80 && score <= 100) {
                    elem.style.display = ""
                }
                if (filter_values.includes("good") && score >= 70 && score < 80) {
                    elem.style.display = ""
                } 
                if (filter_values.includes("average") && score >= 60 && score < 70) {
                    elem.style.display = ""
                }
                if (filter_values.includes("bad") && score < 60 && score > 0) {
                    elem.style.display = ""
                }
                if (filter_values.includes("no-score") && (temp == null || !temp.textContent.trim().includes("%"))) {
                    elem.style.display = ""
                }
            })
        }
        document.querySelectorAll(".card-list").forEach((list) => {
            if (Array.from(list.childNodes).every(elem => elem.style.display == "none")) {
                list.style.gridTemplateRows = "unset"
            } else {
                list.style.gridTemplateRows = ""
            }
        })
        counters = [0, 0, 0, 0, 0]
        all_items.forEach((elem) => {
            let temp = elem.querySelector(".icon-stat .stat")
            let score = 0
            if (temp != null && temp.textContent.trim().includes("%")) {
                score = parseInt(temp.textContent.trim().slice(0, -1))
            }
            if (score >= 80) {
                counters[0] += 1
            } else if (score >= 70) {
                counters[1] += 1
            } else if (score >= 60) {
                counters[2] += 1
            } else if (score > 0) {
                counters[3] += 1
            } else {
                counters[4] += 1
            }
        })
        counters_div.innerText = counters.toString()
        window.scrollBy(0, 1)
        window.scrollBy(0, -1)
    }

    selector.addEventListener("change", filter_cards)
    Array.from(selector.options).forEach(option => {
        option.addEventListener("mousedown", (event) => {
            event.preventDefault();
            const clickedOption = event.target;
            clickedOption.selected = !clickedOption.selected;
            const changeEvent = new Event('change');
            selector.dispatchEvent(changeEvent);
        });
    });

    document.body.appendChild(selector)
    document.body.appendChild(counters_div)

    let parent
    const config = { childList: true }

    const callback = (mutationList, observer) => {
        setTimeout(filter_cards, 250)
    }

    const observer = new MutationObserver(callback);

    let interval_id1 = setInterval(() => {
        parent = document.querySelector("div.chart-view div:has(> section)")
        if (parent != null) {
            clearInterval(interval_id1)
            observer.observe(parent, config)
        }
    })
})()