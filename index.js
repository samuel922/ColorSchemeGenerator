// ─── 1. CONSTANTS & CONFIG ─────────────────────────────────────────────────
const API_BASE = "https://www.thecolorapi.com/scheme";
const DEFAULT_HEX = "0047AB";
const DEFAULT_MODE = "monochrome";
const DEFAULT_COUNT = 5;

// ─── 2. STATE ──────────────────────────────────────────────────────────────
let colorObj = {};

// ─── 3. DOM REFERENCES ─────────────────────────────────────────────────────
const selectColorEl      = document.getElementById("select-color");
const getColorSchemeBtn  = document.getElementById("get-color-scheme");
const headColorBox       = document.getElementById("head-color-box");
const colorGridContainer = document.getElementById("color-grid-container");
const notifier = document.getElementById('notifier')
const notifierTxt = document.getElementById('notifier-txt')


// ─── 4. EVENT LISTENERS ────────────────────────────────────────────────────
getColorSchemeBtn.addEventListener("click", fetchColorScheme);

colorGridContainer.addEventListener("click", (e) => {
    const item = e.target.closest(".color-item");
    if (!item) return;

    const input = item.querySelector(".text-cont input");
    const text = input.value;

    navigator.clipboard.writeText(text)
        .then(() => {
            notifierTxt.textContent = `Copied ${text}!`;
            notifier.classList.add("show");

            setTimeout(() => {
                notifier.classList.remove("show");
            }, 2000);
        })
        .catch(err => console.error("Could not copy text!", err));
});

// ─── 5. INIT ───────────────────────────────────────────────────────────────
fetchColorScheme();

// ─── 6. FUNCTIONS ──────────────────────────────────────────────────────────
function fetchColorScheme(e) {
    const mode = selectColorEl.value || DEFAULT_MODE;
    const url  = `${API_BASE}?hex=${DEFAULT_HEX}&format=json&mode=${mode}&count=${DEFAULT_COUNT}`;

    fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            renderColorSchemes(data)
        })
        .catch(err => console.error("Failed to fetch color scheme:", err));

    
}

function renderColorSchemes(data) {
    const colorColEl = data.colors.map((color, index) => `
        <div class="color-item" id="color-item-${index + 1}" data-color="color-item-${index + 1}">
            <div class="color" style="background-color: ${color.hex.value};"></div>
            <div class="text-cont">
                <input value='${color.hex.value}' />
            </div>
        </div>
    `).join("");

    headColorBox.style.backgroundColor = data.colors[0].hex.value;
    colorGridContainer.innerHTML = colorColEl;

    

}