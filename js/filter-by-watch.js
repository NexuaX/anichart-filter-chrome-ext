console.log("filter by watch status module loaded.");

class FilterByWatch {
    constructor() {
        this.name = "filter-by-watch"
        this.selector = null
        this.counters_div = null
        this.initialized = false
        this.active_filters = new Set()
    }

    initialize() {
        if (this.initialized) {
            console.warn(`${this.name} is already initialized.`)
            return
        }

        this.selector = document.createElement("select")
        this.selector.id = "filter-by-watch-selector"
        this.selector.toggleAttribute("multiple", true)

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

        this.selector.appendChild(option_watching)
        this.selector.appendChild(option_maybe)
        this.selector.appendChild(option_not)
        this.selector.appendChild(option_blank)

        this.selector.addEventListener("change", () => document.dispatchEvent(new CustomEvent('filter-value-changed')))

        Array.from(this.selector.options).forEach(option => {
            option.addEventListener("mousedown", (event) => {
                event.preventDefault();
                const clickedOption = event.target;
                clickedOption.selected = !clickedOption.selected;
                if (clickedOption.selected) {
                    this.active_filters.add(clickedOption.value)
                } else {
                    this.active_filters.delete(clickedOption.value)
                }
                this.selector.dispatchEvent(new Event('change'));
            });
        });

        document.body.appendChild(this.selector)

        this.counters_div = document.createElement("div")
        this.counters_div.id = "status-counters"

        document.body.appendChild(this.counters_div)

        this.initialized = true
        console.log(`${this.name} initialized.`)
    }

    filter_card(card) {
        let filter_out = false

        if (this.active_filters.size == 0) {
            return filter_out
        }

        if (this.active_filters.has("blank")) {
            let temp = card.querySelector(".highlighter.active")
            if (temp != null) {
                filter_out = true
            }
            return filter_out
        }

        let temp = card.querySelector(".highlighter")
        if (temp == null) {
            return filter_out
        }

        filter_out = true
        for (const filter of this.active_filters) {
            if (temp.style.cssText.includes(`color-${filter}`)) {
                filter_out = false
                break
            }
        }

        return filter_out
    }

    update_counters(all_items) {
        let counters = [0, 0, 0, 0]

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
        this.counters_div.innerHTML = counters.toString()
    }
}
