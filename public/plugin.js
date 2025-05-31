const DEBOUNCE = 50;
const apiUrl = "http://localhost:3000/query";
const items = document.querySelectorAll('.item');

let timer;
let tooltip;

function createTooltip() {
    tooltip = document.createElement("div");
    tooltip.className = "tooltip";

    // 動態設定樣式
    Object.assign(tooltip.style, {
        position: "fixed",
        left: "10px",
        bottom: "30px",
        backgroundColor: "#fff",
        color: "black",
        border: "1px solid #ccc",
        padding: "6px 10px",
        fontSize: "14px",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
        borderRadius: "4px",
        pointerEvents: "none",
        zIndex: "999",
        whiteSpace: "nowrap",
        display: "none"
    });

    document.body.appendChild(tooltip);
}

function showTooltip(content, x, y) {
    if (!tooltip) createTooltip();
    tooltip.innerHTML = content;
    // tooltip.style.left = `${x + 10}px`;
    // tooltip.style.top = `${y + 10}px`;
    tooltip.style.display = "block";
}

function hideTooltip() {
    if (tooltip) {
        tooltip.style.display = "none";
    }
}

items.forEach(item => {
    item.addEventListener("mouseover", (e) => {
        e.stopPropagation();
        if (!["img", "span"].includes(e.target.tagName.toLowerCase())) {
            return;
        }

        const icon = item.querySelector(".item-icon");
        const itemName = icon.alt;
        console.log(`Hovering over: ${itemName}`);
        const rect = icon.getBoundingClientRect();

        if (timer) clearTimeout(timer);

        timer = setTimeout(async () => {
            console.log(`Fetching data for: ${itemName}`);
            try {
                const response = await fetch(`${apiUrl}?itemName=${encodeURIComponent(itemName)}`);
                const data = await response.json();

                if (Array.isArray(data) && data.length > 0) {
                    console.log("Showing tooltip with data:", data);
                    const tooltipText = data.map(entry =>
                        `${entry.currency} ${new Intl.NumberFormat().format(entry.amount)}（更新時間: ${entry.updateOn}）`
                    ).join("<br>");
                    showTooltip(`<strong>${itemName}</strong><br>${tooltipText}`, rect.right, rect.top);
                } else {
                    showTooltip(`<strong>${itemName}</strong><br>無資料`, rect.right, rect.top);
                }

            } catch (err) {
                showTooltip(`<strong>${itemName}</strong><br>資料取得失敗`, rect.right, rect.top);
                console.error("Fetch failed:", err);
            }
        }, DEBOUNCE);
    });

    item.addEventListener("mouseout", () => {
        if (timer) clearTimeout(timer);
        hideTooltip();
    });
});