//unchangin elements of the website
const grid_container = document.querySelector(".container")
const rainbow_button = document.querySelector("button.orange")
const clear_button = document.querySelector("button.green")
const shading_button = document.querySelector("button.red")
const color_button = document.querySelector("button.blue")
const button_container = document.querySelector("aside")
const color_picker = document.querySelector(".color-picker")
const grid_size_slider = document.querySelector(".slider")

//the grid size selector slider value
const grid_size_display = document.createElement("div")
grid_size_display.classList.add("size-selector")
grid_size_display.classList.add("roboto-condensed")
grid_size_display.textContent = String( grid_size_slider.value )
button_container.appendChild(grid_size_display)

// important variables
let mousedown = 0;
let style = "color"
let size = 16
let color = "black"

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

// hover effect enter logic and implementation functions
function hovereffectenter(target_pixel) {
    switch (style) {
        case "color": {
            target_pixel.style.opacity = 1;
            color = color_picker.value
            hoverenterlogic(target_pixel)
            break
        }
        case "rainbow": {
            target_pixel.style.opacity = 1;
            let red = Math.floor(Math.random() * 255)
            let blue = Math.floor(Math.random() * 255)
            let green = Math.floor(Math.random() * 255)
            color = `rgb(${red}, ${blue}, ${green})`
            hoverenterlogic(target_pixel)
            break
        }
        case "shading": {
            color = color_picker.value
            if (mousedown == 1 && target_pixel.style.backgroundColor == "") {
                target_pixel.style.opacity = 0.1;
            }
            else if (mousedown) {
                console.log("check")
                target_pixel.style.opacity = String(Number(target_pixel.style.opacity) + 0.1)
            }
            hoverenterlogic(target_pixel)
            break
        }

    }
}
function hoverenterlogic(target_pixel) {
    if (mousedown) {
        target_pixel.style.backgroundColor = color
    }
    else if (target_pixel.style.backgroundColor == "")
        target_pixel.style.backgroundColor = "#eeeeee"
}

// hover effect leave logic and implementation functions
function hovereffectleave(target_pixel) {
    if (mousedown == 0 && target_pixel.style.backgroundColor == "rgb(238, 238, 238)") {
        target_pixel.style.backgroundColor = ""
    }
}

// for making the first pixel on click colored
function onclicki(target_pixel) {
    target_pixel.style.backgroundColor = color
    if (style == "shading")
        target_pixel.style.opacity = 0.1
}

//button function declarations
function clear() {
    const pixels = document.querySelectorAll(".row-container")
    for (let i of pixels) {
        grid_container.removeChild(i)
    }
    grid_creator()
}

//slider change function     
function slider_change() {
    size = grid_size_slider.value
    grid_size_display.textContent = grid_size_slider.value
    clear()
}

// mousedown/up event listeners
document.addEventListener("mousedown", () => mousedown++)
document.addEventListener("mouseup", () => mousedown--)

// button event listeners
clear_button.addEventListener("click", clear)
rainbow_button.addEventListener("click", () => { style = "rainbow" })
color_button.addEventListener("click", () => { style = "color" })
shading_button.addEventListener("click", () => { style = "shading" })

//slider event listener
grid_size_slider.addEventListener("change", slider_change)
