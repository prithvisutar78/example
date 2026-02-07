import {
  activities,
  categorySeries,
  kpis,
  notifications,
  products,
  purchaseOrders,
  reportCards,
  roles,
  stockHistory,
  stockSeries,
  suppliers,
  turnoverSeries
} from "@/data/mockData";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/dashboard", () => {
    return HttpResponse.json({
      kpis,
      stockSeries,
      categorySeries,
      turnoverSeries,
      activities,
      notifications
    });
  }),
  http.get("/api/products", () => {
    return HttpResponse.json({ products });
  }),
  http.get("/api/products/:id", ({ params }) => {
    const product = products.find((item) => item.id === params.id);
    return HttpResponse.json({ product, stockHistory, suppliers });
  }),
  http.get("/api/orders", () => {
    return HttpResponse.json({ purchaseOrders });
  }),
  http.get("/api/reports", () => {
    return HttpResponse.json({ reportCards });
  }),
  http.get("/api/roles", () => {
    return HttpResponse.json({ roles });
  })
];
