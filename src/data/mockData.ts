import { addDays, formatISO } from "./time";

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  supplier: string;
  price: number;
  cost: number;
  stock: number;
  status: "healthy" | "low" | "out";
  location: string;
  barcode: string;
  qr: string;
  image: string;
  expiry: string;
};

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  rating: number;
};

export type Activity = {
  id: string;
  action: string;
  time: string;
  user: string;
};

const categories = [
  "Electronics",
  "Apparel",
  "Food & Beverage",
  "Industrial",
  "Home Goods",
  "Health"
];

const suppliers: Supplier[] = [
  {
    id: "sup-01",
    name: "Nimbus Supply Co.",
    contact: "Ivy Bennett",
    email: "ivy@nimbus.com",
    phone: "+1 (415) 555-0142",
    rating: 4.8
  },
  {
    id: "sup-02",
    name: "Harborline Logistics",
    contact: "Ravi Patel",
    email: "ravi@harborline.com",
    phone: "+1 (212) 555-0199",
    rating: 4.5
  },
  {
    id: "sup-03",
    name: "Evergreen Industrial",
    contact: "Maria Diaz",
    email: "maria@evergreen.io",
    phone: "+1 (646) 555-0123",
    rating: 4.6
  },
  {
    id: "sup-04",
    name: "Pulse Retail Labs",
    contact: "Leon Brooks",
    email: "leon@pulselabs.com",
    phone: "+1 (312) 555-0170",
    rating: 4.4
  },
  {
    id: "sup-05",
    name: "Aurora Fresh Foods",
    contact: "Naomi Park",
    email: "naomi@aurorafresh.com",
    phone: "+1 (206) 555-0137",
    rating: 4.7
  },
  {
    id: "sup-06",
    name: "Vector Components",
    contact: "Ethan Hall",
    email: "ethan@vectorco.com",
    phone: "+1 (404) 555-0182",
    rating: 4.3
  },
  {
    id: "sup-07",
    name: "Crescent Wholesale",
    contact: "Aya Tan",
    email: "aya@crescentwholesale.com",
    phone: "+1 (213) 555-0111",
    rating: 4.2
  },
  {
    id: "sup-08",
    name: "Summit Gearworks",
    contact: "Noah Reed",
    email: "noah@summitgear.com",
    phone: "+1 (312) 555-0196",
    rating: 4.6
  },
  {
    id: "sup-09",
    name: "Bluefield Medical",
    contact: "Sophie Nguyen",
    email: "sophie@bluefieldmed.com",
    phone: "+1 (415) 555-0178",
    rating: 4.7
  },
  {
    id: "sup-10",
    name: "Orbit E-Comm",
    contact: "Victor Chen",
    email: "victor@orbitrx.com",
    phone: "+1 (646) 555-0175",
    rating: 4.5
  }
];

const locations = ["West Coast DC", "Central Hub", "East Coast DC"];

export const products: Product[] = Array.from({ length: 60 }).map((_, index) => {
  const category = categories[index % categories.length];
  const supplier = suppliers[index % suppliers.length];
  const stock = Math.floor(Math.random() * 180);
  const status = stock === 0 ? "out" : stock < 25 ? "low" : "healthy";
  const price = 25 + index * 1.5 + (index % 5) * 6;
  const cost = price * 0.62;

  return {
    id: `prod-${index + 1}`,
    name: `${category} Item ${index + 1}`,
    sku: `INV-${String(index + 101).padStart(4, "0")}`,
    category,
    supplier: supplier.name,
    price: Number(price.toFixed(2)),
    cost: Number(cost.toFixed(2)),
    stock,
    status,
    location: locations[index % locations.length],
    barcode: `890${index}550${index + 9}`,
    qr: `QR-${index + 1001}`,
    image: `https://images.unsplash.com/flagged/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=200&q=60&sig=${index}`,
    expiry: formatISO(addDays(new Date(), 30 + (index % 90)))
  };
});

export const activities: Activity[] = Array.from({ length: 12 }).map(
  (_, index) => ({
    id: `act-${index}`,
    action: [
      "Adjusted stock for INV-0105",
      "Created PO-1042",
      "Low stock alert triggered",
      "Cycle count completed",
      "Supplier invoice uploaded",
      "Transfer between warehouses"
    ][index % 6],
    time: formatISO(addDays(new Date(), -index)),
    user: ["Ava Carter", "Ravi Patel", "Sophia Lin", "Ethan Cole"][
      index % 4
    ]
  })
);

export const kpis = {
  totalStockValue: 482_450,
  lowStockAlerts: products.filter((product) => product.status === "low").length,
  pendingOrders: 18,
  topMovingItems: 24
};

export const stockSeries = Array.from({ length: 12 }).map((_, index) => ({
  name: `W${index + 1}`,
  stock: 4200 + Math.floor(Math.random() * 1200),
  reorder: 3000 + Math.floor(Math.random() * 600)
}));

export const categorySeries = categories.map((category, index) => ({
  name: category,
  value: 12 + index * 7
}));

export const turnoverSeries = categories.map((category) => ({
  name: category,
  turnover: 1.4 + Math.random() * 2.4
}));

export const notifications = [
  {
    id: "note-1",
    title: "Low stock on Electronics Item 6",
    description: "12 units left across West Coast DC",
    status: "unread"
  },
  {
    id: "note-2",
    title: "PO-1042 awaiting approval",
    description: "$42,300 pending for Harborline Logistics",
    status: "unread"
  },
  {
    id: "note-3",
    title: "Expiry in 30 days",
    description: "Food & Beverage Item 19 (Batch A21)",
    status: "read"
  },
  {
    id: "note-4",
    title: "Overstock warning",
    description: "Apparel Item 22 above max threshold",
    status: "read"
  }
];

export const purchaseOrders = Array.from({ length: 8 }).map((_, index) => ({
  id: `PO-10${index + 31}`,
  supplier: suppliers[index % suppliers.length].name,
  status: ["Draft", "Sent", "Partial", "Received", "Closed"][index % 5],
  total: 9800 + index * 1420,
  eta: formatISO(addDays(new Date(), 3 + index))
}));

export const stockHistory = Array.from({ length: 8 }).map((_, index) => ({
  id: `hist-${index}`,
  action: ["Received", "Adjusted", "Sold", "Transferred"][index % 4],
  note: "Cycle count update",
  date: formatISO(addDays(new Date(), -index * 2)),
  qty: 24 - index * 2
}));

export const reportCards = [
  {
    id: "report-1",
    title: "Inventory Valuation",
    method: "Weighted Avg",
    value: "$482,450",
    trend: "+4.6%"
  },
  {
    id: "report-2",
    title: "ABC Analysis",
    method: "Pareto 80/20",
    value: "A: 18% SKUs",
    trend: "B: 34% | C: 48%"
  },
  {
    id: "report-3",
    title: "Dead Stock",
    method: "90+ days",
    value: "$24,380",
    trend: "12 SKUs"
  }
];

export const roles = [
  {
    id: "role-1",
    title: "Admin",
    access: "Full access",
    members: 3
  },
  {
    id: "role-2",
    title: "Manager",
    access: "Edit products, view reports",
    members: 6
  },
  {
    id: "role-3",
    title: "Staff",
    access: "View-only, limited locations",
    members: 24
  }
];

export { suppliers, locations };
