console.log("Filter by type status script started.");

(function() {

    let all_items

    const selector = document.createElement("select")
    selector.id = "filter-by-type-selector"
    
    const option_all = document.createElement("option")
    option_all.value = "all"
    option_all.innerText = "all"
    
    const option_tv = document.createElement("option")
    option_tv.value = "tv\n\t\t\t\tshare"
    option_tv.innerText = "tv"
    
    const option_tvshort = document.createElement("option")
    option_tvshort.value = "tv short"
    option_tvshort.innerText = "short"
    
    const option_leftovers = document.createElement("option")
    option_leftovers.value = "leftovers"
    option_leftovers.innerText = "left"
    
    const option_movie = document.createElement("option")
    option_movie.value = "movie"
    option_movie.innerText = "movie"
    
    const option_special = document.createElement("option")
    option_special.value = "special"
    option_special.innerText = "special"
    
    selector.appendChild(option_all)
    selector.appendChild(option_tv)
    selector.appendChild(option_tvshort)
    selector.appendChild(option_leftovers)
    selector.appendChild(option_movie)
    selector.appendChild(option_special)
    
    function filter_types() {
        all_items = document.querySelectorAll(".chart-view div .section.loaded")
        if (all_items == null) return
        filter_value = selector.value;
        console.log(filter_value)
        let temp
        if (filter_value == "all") {
            all_items.forEach(elem => {
                elem.style.display = ""
            })
        } else {
            all_items.forEach(elem => {
                let temp = elem.querySelector(".section-heading")
                console.log(temp.textContent.toLowerCase());
                if (temp.textContent.toLowerCase().indexOf(filter_value) == -1) {
                    elem.style.display = "none"
                } else {
                    elem.style.display = ""
                }
            })
        }
        window.scrollBy(0, 1)
        window.scrollBy(0, -1)
    }
    
    selector.addEventListener("change", filter_types)
    
    document.body.appendChild(selector)
    
    let parent
    const config = { childList: true }
    
    const callback = (mutationList, observer) => {
        setTimeout(filter_types, 250)
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
