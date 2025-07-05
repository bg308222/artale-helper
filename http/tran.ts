const token = "next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiM3hkMlFUd3BlQWg5Wk53SUdrM091RzhFZTNPUDlyZ3pwOHBac3ZBZnExVG5aRlpuNDNvTEJJRjB5Wk8xMTU1eWZxVExxNzFYMU5Qbnd3dmRPekNiUXcifQ..6rEqYkjcenc9yj-nREmiAg.QGl4Av5jNhNpzsVDHLDi5unXfWklV_U2f8arZs0Uk6yKDI-SbAjC8N55v6vTWgLIiNptmKgwmuNdjjE43ATUw25vsnPLtJSUimnQmbG8puvXLZoENqtP-5dv5f6E7O9BJmdAmXcz5yy5HSB7Jf8nEDmQTappWnaW9SRtgiRaZc5YoDlnFUouTou72kiFkCFHV8gUmxiJlRmjQjP74KzCNvfGpjBuznoY9M84GBMgNMAC5JUH06vaKoB3OjU13QrMtRFZwtiMZdIHnY2xxEf_7hwD7IzZeWaNpFHWMaV-PpLyVyaBDPUoahznAC0A5xsA2RNEO4T5oHdP1zPW2pc3USzlCfM8LzZ35Vt59d6HfOEdoPgIMN9yFbW7mrkXTbSxXlxR2ZIq-CLqyXGEj6f5qxTyL1fnJKe8OHtVg26dXYZuKy0DmdMJDq6t7cvBgEfFtEQHymbF0US8B9MYLUfDTQ.HbcvqP_I7YPY-46beyuSyH0VCVSlA6rNnwpH5LIpays"

const urlSearchParams = new URLSearchParams();
urlSearchParams.append("isActive", "true");
urlSearchParams.append("itemName", "鞋子敏捷性卷10%");
urlSearchParams.append("currency", "meso");
urlSearchParams.append("transactionType", "buy");
urlSearchParams.append("page", "1");
urlSearchParams.append("limit", "10");
urlSearchParams.append("sortKey", "updated_at");
urlSearchParams.append("sortDirection", "desc");

fetch("https://artale-market.org/api/transactions?" + urlSearchParams.toString(), {
    headers: {
        cookie: token
    }
})
.then(async (v) => {
    const data = await v.json();
    console.log("ok")
    console.log(data);
}, (e) => {
    console.log("fail")
})