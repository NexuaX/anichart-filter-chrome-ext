console.log("disable card hover script started.");

(function() {

    const div = document.createElement("div")
    div.id = "disable-card-hover-container"

    const input = document.createElement("input")
    input.id = "disable-card-hover"
    input.type = "checkbox"

    div.appendChild(input)
    const label = document.createElement("label")
    label.htmlFor = "disable-card-hover"
    label.innerText = "disable card hover"
    div.appendChild(label)

    function disable_hover() {
        card_list = document.querySelector("div.card-list")
        if (input.checked) {
            card_list.setAttribute("data-disable-card-hover", "")
        } else {
            card_list.removeAttribute("data-disable-card-hover")
        }
    }

    input.addEventListener("change", disable_hover)
    document.body.appendChild(div)
})()