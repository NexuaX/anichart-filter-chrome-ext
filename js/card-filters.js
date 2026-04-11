console.log("filters.js loaded");

(async function() {
    const filters = [new FilterByScore(), new FilterByWatch()]

    for (const filter of filters) {
        filter.initialize()
    }

    console.log("filters initialized.")


    function filter_cards() {
        const all_items = document.querySelectorAll("div.media-card")

        if (all_items == null) return

        all_items.forEach((elem) => {
            let filter_out = false
            for (const filter of filters) {
                if (filter.filter_card(elem)) {
                    filter_out = true
                    break
                }
            }
            if (filter_out) {
                elem.style.display = "none"
            } else {
                elem.style.display = ""
            }
        })

        const all_lists = document.querySelectorAll(".card-list")
        all_lists.forEach((list) => {
            if (Array.from(list.childNodes).every(item => item.style.display == "none")) {
                list.style.gridTemplateRows = "unset"
            } else {
                list.style.gridTemplateRows = ""
            }
        })

        filters.forEach((filter) => {
            if (filter.update_counters != null) {
                filter.update_counters(all_items)
            }
        })

        // do a little scroll to trigger lazy loading of images and further cards
        window.scrollBy(0, 1)
        window.scrollBy(0, -1)
    }

    document.addEventListener("filter-value-changed", filter_cards)

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
