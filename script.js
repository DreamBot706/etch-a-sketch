//unchangin elements of the website
const grid_container = document.querySelector(".container")
const rainbow_button = document.querySelector("button.orange")
const clear_button = document.querySelector("button.green")
const shading_button = document.querySelector("button.red")

// important variables
let mousedown = 0;
let color = "black"
let size = 16

// initial grid creation
grid_creator()

// grid creation function
function grid_creator() {
    for (let i = 0; i != size; ++i) {
        const row_container = document.createElement("div")
        row_container.classList.add("row-container")
        for (let j = 0; j != size; ++j) {
            const pixel = document.createElement("div")
            pixel.classList.add("pixel")
            pixel.addEventListener("mouseenter", function(e) { hovereffectenter(e.target) })
            pixel.addEventListener("mouseleave", function(e) { hovereffectleave(e.target) })
            pixel.addEventListener("mousedown", function(e) { onclicki(e.target) })
            row_container.appendChild(pixel)
        }
        grid_container.appendChild(row_container)
    }
}

// drawing and hover effect
function hovereffectenter(target_pixel) {
    if (mousedown) {
        target_pixel.style.backgroundColor = color
    }
    else if (target_pixel.style.backgroundColor != color) {
        target_pixel.style.backgroundColor = "#eeeeee"
    }
}

function hovereffectleave(target_pixel) {
    if (mousedown == 0 && target_pixel.style.backgroundColor != color) {
        target_pixel.style.backgroundColor = "white"
    }
    else if (mousedown == 1 && target_pixel.style.backgroundColor == "#eeeeee") {
        target_pixel.style.backgroundColor = "white"
    }
}
function onclicki(target_pixel) {
    target_pixel.style.backgroundColor = color
}

//button function declarations
function clear() {
    const pixels = document.querySelectorAll(".row-container")
    for (let i of pixels) {
        grid_container.removeChild(i)
    }
    grid_creator()
}

// mousedown/up event listeners
document.addEventListener("mousedown", () => mousedown++)
document.addEventListener("mouseup", () => mousedown--)

// button event listeners
clear_button.addEventListener("click", clear)
