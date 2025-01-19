console.log("Filter by watch status script started.");

(function() {
    
    let all_items

    const selector = document.createElement("select")
    selector.id = "filter-by-watch-selector"
    selector.toggleAttribute("multiple", true)

    // const option_all = document.createElement("option")
    // option_all.value = "all"
    // option_all.innerText = "all"

    const option_watching = document.createElement("option")
    option_watching.value = "green"
    option_watching.innerText = "watch"

    const option_maybe = document.createElement("option")
    option_maybe.value = "yellow"
    option_maybe.innerText = "maybe"

    const option_not = document.createElement("option")
    option_not.value = "red"
    option_not.innerText = "not"

    const option_blank = document.createElement("option")
    option_blank.value = "blank"
    option_blank.innerText = "blank"

    let counters = [0, 0, 0, 0]
    const counters_div = document.createElement("div")
    counters_div.id = "status-counters"

    // selector.appendChild(option_all)
    selector.appendChild(option_watching)
    selector.appendChild(option_maybe)
    selector.appendChild(option_not)
    selector.appendChild(option_blank)

    function filter_cards() {
        all_items = document.querySelectorAll("div.media-card")
        if (all_items == null) return
        filter_values = Array.from(selector.childNodes).filter(item => item.selected)
        console.log(filter_values)
        if (filter_values.some(item => item.value == "all") || filter_values.length == 0) {
            all_items.forEach((elem) => {
                elem.style.display = ""
            })
        } else if (filter_values.some(item => item.value == "blank")) {
            all_items.forEach((elem) => {
                let temp = elem.querySelector(".highlighter.active")
                if (temp != null) {
                    elem.style.display = "none"
                } else {
                    elem.style.display = ""
                }
            })
        } else {
            all_items.forEach((elem) => {
                let temp = elem.querySelector(".highlighter")
                if (temp != null && !filter_values.some(item => temp.style.cssText.includes("color-" + item.value))) {
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
        counters = [0, 0, 0, 0]
        all_items.forEach((elem) => {
            let temp = elem.querySelector(".highlighter")
            if (temp != null) {
                if (temp.style.cssText.includes("color-green")) {
                    counters[0] += 1
                } else if (temp.style.cssText.includes("color-yellow")) {
                    counters[1] += 1
                } else if (temp.style.cssText.includes("color-red")) {
                    counters[2] += 1
                }
            }
        })
        counters[3] = all_items.length - document.querySelectorAll("div.media-card .highlighter.active").length
        counters_div.innerHTML = counters.toString()
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
        parent = document.querySelector("div.chart-view div")
        if (parent != null) {
            clearInterval(interval_id1)
            observer.observe(parent, config)
        }
    })

})();
