console.log("Filter by watch status script started.");

(function() {
    
    let all_items

    const selector = document.createElement("select")
    selector.id = "filter-by-watch-selector"

    const option_all = document.createElement("option")
    option_all.value = "all"
    option_all.innerText = "all"

    const option_watching = document.createElement("option")
    option_watching.value = "green"
    option_watching.innerText = "watching"

    const option_maybe = document.createElement("option")
    option_maybe.value = "yellow"
    option_maybe.innerText = "maybe"

    const option_not = document.createElement("option")
    option_not.value = "red"
    option_not.innerText = "not"

    const option_blank = document.createElement("option")
    option_blank.value = "blank"
    option_blank.innerText = "blank"

    selector.appendChild(option_all)
    selector.appendChild(option_watching)
    selector.appendChild(option_maybe)
    selector.appendChild(option_not)
    selector.appendChild(option_blank)

    function filter_cards() {
        all_items = document.querySelectorAll("div.media-card")
        if (all_items == null) return
        filter_value = selector.value;
        console.log(filter_value)
        let temp
        if (filter_value == "all") {
            all_items.forEach((elem) => {
                elem.style.display = ""
            })
        } else if (filter_value == "blank") {
            all_items.forEach((elem) => {
                temp = elem.querySelector(".highlighter.active")
                if (temp != null) {
                    elem.style.display = "none"
                } else {
                    elem.style.display = ""
                }
            })
        } else {
            all_items.forEach((elem) => {
                temp = elem.querySelector(".highlighter")
                if (temp != null && !temp.style.cssText.includes("color-" + filter_value)) {
                    elem.style.display = "none"
                } else {
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
        window.scrollBy(0, 1)
        window.scrollBy(0, -1)
    }

    selector.addEventListener("change", filter_cards)

    document.body.appendChild(selector)

    let parent
    const config = { childList: true }

    const callback = (mutationList, observer) => {
        setTimeout(filter_cards, 250)
    }

    const observer = new MutationObserver(callback);

    let interval_id1 = setInterval(() => {
        parent = document.querySelector("div.chart-view div")
        if (parent != null) {
            clearInterval(interval_id1)
            observer.observe(parent, config)
        }
    })

})();
