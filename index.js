let colorObj = {}

document.getElementById("get-color-scheme").addEventListener('click', fetchColorScheme)



function fetchColorScheme() {

    const selectColorVal = document.getElementById("select-color").value


    fetch(`https://www.thecolorapi.com/scheme?hex=0047AB&format=json&mode=${selectColorVal}&count=5`, {
    method: "GET"
    })
        .then(res => res.json())
        .then(data => {
            renderColorSchemes(data)
            
        })

}



function renderColorSchemes(data) {

    const colorColEl = data.colors.map((color) => {
        return `
            <div class="color-item">
                <div class="color" style="background-color: ${color.hex.value};"></div>
                <div class="text-cont">
                    <p>${color.hex.value}</p>
                </div>
            </div>
        
        `
    }).join("")

    // console.log(mainColor)
    document.getElementById('head-color-box').style.backgroundColor = `${data.colors[1].hex.value}`
    document.getElementById("color-grid-container").innerHTML = colorColEl

}