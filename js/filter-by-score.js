console.log("filter by score module loaded.");

class FilterByScore {
    constructor() {
        this.name = "filter-by-score"
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
        this.selector.id = "filter-by-score-selector"
        this.selector.toggleAttribute("multiple", true)

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

        this.selector.appendChild(option_very_good)
        this.selector.appendChild(option_good)
        this.selector.appendChild(option_average)
        this.selector.appendChild(option_bad)
        this.selector.appendChild(option_no_score)

        this.selector.addEventListener("change", () => document.dispatchEvent(new CustomEvent('filter-value-changed')))

        Array.from(this.selector.options).forEach(option => {
            option.addEventListener("mousedown", (event) => {
                event.preventDefault()
                const clickedOption = event.target
                clickedOption.selected = !clickedOption.selected
                if (clickedOption.selected) {
                    this.active_filters.add(clickedOption.value)
                } else {
                    this.active_filters.delete(clickedOption.value)
                }
                this.selector.dispatchEvent(new Event('change'))
            });
        });

        document.body.appendChild(this.selector)

        this.counters_div = document.createElement("div")
        this.counters_div.id = "score-counters"

        document.body.appendChild(this.counters_div)

        this.initialized = true
        console.log(`${this.name} initialized.`)
    }

    filter_card(card) {
        let filter_out = false

        if (this.active_filters.size == 0) {
            return filter_out
        }

        const temp = card.querySelector(".icon-stat .stat")
        let score = 0
        if (temp != null && temp.textContent.trim().includes("%")) {
            score = parseInt(temp.textContent.trim().slice(0, -1))
        }
        
        filter_out = true
        if (this.active_filters.has("great") && score >= 80 && score <= 100) {
            filter_out = false
        } else if (this.active_filters.has("good") && score >= 70 && score < 80) {
            filter_out = false
        } else if (this.active_filters.has("average") && score >= 60 && score < 70) {
            filter_out = false
        } else if (this.active_filters.has("bad") && score < 60 && score > 0) {
            filter_out = false
        } else if (this.active_filters.has("no-score") && score == 0) {
            filter_out = false
        }
    
        return filter_out  
    }

    update_counters(all_items) {
        let counters = [0, 0, 0, 0, 0]

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

        this.counters_div.innerText = counters.toString()
    }
}
