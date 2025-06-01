import axios from "axios";
import type { ScrollTransactionResponse } from "./type";

const SESSION_TOKEN = Bun.env.SESSION_TOKEN ?? ""
if (!SESSION_TOKEN) {
  console.error("SESSION_TOKEN is not set. Please set it in the environment variables.");
  process.exit(1);
}

const CURRENCY_MAPPING: Record<string, string> = {
  "meso": "楓幣",
  "snow": "雪花",
}

const server = Bun.serve({
  port: 3000,
  routes: {
    "/query": async (req) => {
      const corsHeaders = {
        "Access-Control-Allow-Origin": "https://a2983456456.github.io",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Max-Age": "86400", // 1 day
      }
      if (req.method === "OPTIONS") {
        return new Response(null, {
          headers: corsHeaders
        })
      }

      const url = new URL(req.url);
      const itemName = url.searchParams.get("itemName") ?? "";
      const type = url.searchParams.get("type") ?? "";

      const { results } = await query(itemName, type);
      const finalResult = results.map(v => {
        return {
          itemName: v.item_name,
          currency: CURRENCY_MAPPING[v.currency] ?? v.currency,
          amount: v.amount,
          updateOn: v.updated_at
        }
      })
      return Response.json(finalResult, {
        headers: corsHeaders
      });
    },
    "/public/test": () => {
      return new Response(Bun.file("./public/index.html"));
    },
    "/public/plugin": async () => {
      const jsText = await Bun.file("./public/plugin.js").text();
      return new Response(jsText, {
        headers: {
          "Content-Type": "application/javascript",
        }
      });
    },
    "/public/currency-exchange": () => {
      return new Response(Bun.file("./public/currency-exchange.html"), {
        headers: {
          "Content-Type": "text/html",
        }
      });
    }
  },
});


console.log(`Listening on localhost:${server.port}`);

async function query(itemName: string, type: string) {
  return axios.get("https://artale-market.org/api/transactions", {
    params: {
      isActive: true,
      itemName: itemName,
      transactionType: type,
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