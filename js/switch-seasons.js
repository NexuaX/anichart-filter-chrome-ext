console.log("Switch seasons script started.");

(function() {

    const selector = document.createElement("select")
    selector.id = "seasons-selector"

    const next_year = new Date().getFullYear() + 1
    const minimum_year = 2006

    const seasons = ["Winter", "Spring", "Summer", "Fall"]
    const elements = []
    seasons.reverse()

    for (let y = next_year; y >= minimum_year; y--) {
        const grp = document.createElement("optgroup")
        grp.label = y
        for (let season of seasons) {
            const option = document.createElement("option")
            const temp = season + "-" + y
            option.value = temp
            option.text = temp
            elements.push(option)
            grp.appendChild(option)
        }
        selector.appendChild(grp)
    }

    document.body.appendChild(selector)

    function change_season() {
        console.log(selector.value);
        location.pathname = "/" + selector.value
    }

    selector.addEventListener("change", change_season)

    window.addEventListener("popstate", () => {
        change_select()
    })

    function change_select() {
        for (const elem of elements) {
            if (elem.value == location.pathname.substring(1))
                elem.setAttribute("selected", "")
            else
                elem.removeAttribute("selected")
        }
    }

    let old_path = location.pathname, new_path = "";
    setInterval(() => {
        new_path = location.pathname
        if (old_path != new_path) {
            change_select()
            old_path = new_path
        }
    }, 500)

    change_select()

})();
