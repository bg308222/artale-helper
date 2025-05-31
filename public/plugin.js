const DEBOUNCE = 200;
const apiUrl = "http://localhost:3000/query";

// when pressing esc, hide the tooltip
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        hideTooltip();
    }
});

let timer;
document.getElementById("drop-container").addEventListener("mousemove", (e) => {
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(async () => {
        const target = e.target.closest(".item");
        if (!target) {
            return;
        }

        const icon = target.querySelector(".item-icon");
        const itemName = icon.alt;

        console.log(`Fetching data for: ${itemName}`);
        try {
            // 目前有人願意買的價格, 排序由高到低
            const buyResponse = await fetch(`${apiUrl}?itemName=${encodeURIComponent(itemName)}&type=buy`);
            const buyData = (await buyResponse.json()).toSorted((a, b) => b.amount - a.amount);

            // 目前有人願意賣的價格, 排序由低到高
            const sellResponse = await fetch(`${apiUrl}?itemName=${encodeURIComponent(itemName)}&type=sell`);
            const sellData = (await sellResponse.json()).toSorted((a, b) => a.amount - b.amount);

            // 組裝買價和賣價的顯示內容
            let tooltipText = `<strong>${itemName}</strong><br>`;

            // 顯示買價資料
            if (Array.isArray(buyData) && buyData.length > 0) {
                tooltipText += `<strong>有人願意出此價格買：</strong><br>`;
                tooltipText += buyData.map(entry =>
                    `${entry.currency} ${new Intl.NumberFormat().format(entry.amount)}`
                ).join("<br>");
            } else {
                tooltipText += `<strong>有人願意出此價格買：</strong><br>無資料<br>`;
            }

            // 顯示賣價資料
            if (Array.isArray(sellData) && sellData.length > 0) {
                tooltipText += `<br><strong>有人願意出此價格賣：</strong><br>`;
                tooltipText += sellData.map(entry =>
                    `${entry.currency} ${new Intl.NumberFormat().format(entry.amount)}`
                ).join("<br>");
            } else {
                tooltipText += `<br><strong>有人願意出此價格賣：</strong><br>無資料`;
            }

            showTooltip(tooltipText);

        } catch (err) {
            showTooltip(`<strong>${itemName}</strong><br>資料取得失敗`);
            console.error("Fetch failed:", err);
        }

    }, DEBOUNCE)
});

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

function showTooltip(content) {
    if (!tooltip) createTooltip();
    tooltip.innerHTML = content;
    tooltip.style.display = "block";
}

function hideTooltip() {
    if (tooltip) {
        tooltip.style.display = "none";
    }
}
