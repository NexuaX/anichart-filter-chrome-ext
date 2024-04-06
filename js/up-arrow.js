console.log("Filter by type status script started.");

(function() {

    const arrow = document.createElement("div");
    arrow.id = "up-scroll-arrow";
    arrow.innerText = "↑";
    
    document.body.appendChild(arrow);

    arrow.addEventListener("click", () => {
        scroll(0, 0);
    });

})();