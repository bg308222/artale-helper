import axios from "axios";
import type { ScrollTransactionResponse } from "./type";

const SESSION_TOKEN = Bun.env.SESSION_TOKEN ?? "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiM3hkMlFUd3BlQWg5Wk53SUdrM091RzhFZTNPUDlyZ3pwOHBac3ZBZnExVG5aRlpuNDNvTEJJRjB5Wk8xMTU1eWZxVExxNzFYMU5Qbnd3dmRPekNiUXcifQ..bthaWgZd9Apy_l9_Sttrog.v4CZKPurw2R_5Dd6-3P43mMAHF2Tr7yPyUzyrKnR-whsFBzs3srV-oCHptl_AdGRUFUp3DiMhUKle-g9FXh4WKKoHsMYzpPZnCRqXpNbm2l-9GcJoZNCdWpk3ZJsd3MkC0cd6RyIi-b9HI54T2qUELppFXFUh3LsJkgBvAHYiVrYqtvMtzIe_SmdYd3GMm_8cnZ65RkGBk03hjqcxEOlJ6SMvLkb6MEVDzAorZrpF3sazQfwcXkwPYTv1JV-uMNOz--PSnPKTeOjmHhsrslzHqVO_PkDlK5k2-_4sYD8pICbPNBA9PzahnmutnhUlNWjOsuCS6Q7aCSX5i_9dlbk4AtZtKs_vy-oVs0s56QXJO9Y94uo6r3zJGNbIU7s9qI9JDCRuckRWCH6OAZBeNpZ2MYwJvGFxeVVzeYjqbCpvT-zUN2_hu9F64UFZAJoXVxFMDMXN5_AqCgLKa_s5Ft5lA.FtHTlIlFcOG8_JDcmNlQn8vUuGVf8hBLcdtObk63aoI"
const CURRENCY_MAPPING: Record<string, string> = {
  "meso": "楓幣",
  "snow": "雪花",
}

const server = Bun.serve({
  port: 3000,
  routes: {
    "/query": async (req, res) => {
      const url = new URL(req.url);
      const itemName = url.searchParams.get("itemName") ?? "";

      const { results } = await query(itemName);
      const finalResult = results.map(v => {
        return {
          itemName: v.item_name,
          currency: CURRENCY_MAPPING[v.currency] ?? v.currency,
          amount: v.amount,
          updateOn: v.updated_at
        }
      })
      return Response.json(finalResult);
    },
    "/test": () => {
      return new Response(Bun.file("./public/index.html"));
    }
  },
});


console.log(`Listening on localhost:${server.port}`);

async function query(itemName: string) {
  return axios.get("https://artale-market.org/api/transactions", {
    params: {
      isActive: true,
      itemName: itemName,
      transactionType: "sell",
      page: 1,
      limit: 10,
      sortKey: "updated_at",
      sortDirection: "desc"
    },
    headers: {
      cookie: `next-auth.session-token=${SESSION_TOKEN}`
    }
  }).then(v => v.data as ScrollTransactionResponse)
}