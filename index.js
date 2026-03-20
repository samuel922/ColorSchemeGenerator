

fetch("https://www.thecolorapi.com/scheme?hex=0047AB&format=json&mode=monochrome&count=5", {
    method: "GET"
})
    .then(res => res.json())
    .then(data => {
        console.log(typeof data)
    })