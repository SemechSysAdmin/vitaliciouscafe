import smoothie from "@/assets/product-smoothie.jpg";
import juice from "@/assets/product-juice.jpg";
import parfait from "@/assets/product-parfait.jpg";
import protein from "@/assets/product-protein.jpg";
import ginger from "@/assets/product-ginger.jpg";
import tigernut from "@/assets/product-tigernut.jpg";
import fruitbowl from "@/assets/product-fruitbowl.jpg";
import coffee from "@/assets/product-coffee.jpg";
import detox from "@/assets/product-detox.jpg";
import snacks from "@/assets/product-snacks.jpg";
import tea from "@/assets/product-tea.jpg";
import berryProtein from "@/assets/product-berry-protein.jpg";
import carrotZinger from "@/assets/product-carrot-zinger.jpg";
import tropicalSunrise from "@/assets/product-tropical-sunrise.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  priceKobo: number;
  image: string;
  tags: string[];
};

export const CATEGORIES = [
  "All",
  "Smoothies",
  "Fresh Juices",
  "Detox Drinks",
  "Protein Shakes",
  "Parfaits",
  "Ginger Shots",
  "Tigernut Milk",
  "Fruit Bowls",
  "Snacks",
  "Coffee & Tea",
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "green-glow",
    name: "Green Glow Smoothie",
    category: "Smoothies",
    description: "Spinach, kiwi, banana & coconut water blended for radiant energy.",
    price: "₦3,500",
    priceKobo: 350000,
    image: smoothie,
    tags: ["Vegan", "Detox", "Energy"],
  },
  {
    id: "tropical-sunrise",
    name: "Tropical Sunrise",
    category: "Smoothies",
    description: "Mango, pineapple, passionfruit & turmeric pure island vibes.",
    price: "₦3,800",
    priceKobo: 380000,
    image: tropicalSunrise,
    tags: ["Immunity", "Vitamin C"],
  },
  {
    id: "carrot-zinger",
    name: "Carrot Zinger Juice",
    category: "Fresh Juices",
    description: "Cold-pressed carrot, orange & ginger packed with beta-carotene.",
    price: "₦3,200",
    priceKobo: 320000,
    image: carrotZinger,
    tags: ["Cold-Pressed", "Vitamin A"],
  },
  {
    id: "citrus-burst",
    name: "Citrus Burst",
    category: "Fresh Juices",
    description: "Orange, grapefruit & lemon a bright daily immunity boost.",
    price: "₦3,000",
    priceKobo: 300000,
    image: juice,
    tags: ["Immunity"],
  },
  {
    id: "deep-green-detox",
    name: "Deep Green Detox",
    category: "Detox Drinks",
    description: "Kale, cucumber, celery, apple & lemon. Cleansing in every sip.",
    price: "₦4,000",
    priceKobo: 400000,
    image: detox,
    tags: ["Detox", "Vegan"],
  },
  {
    id: "berry-protein",
    name: "Berry Protein Shake",
    category: "Protein Shakes",
    description: "Whey, mixed berries & almond milk recover stronger.",
    price: "₦4,500",
    priceKobo: 450000,
    image: berryProtein,
    tags: ["High Protein", "Post-Workout"],
  },
  {
    id: "cocoa-power",
    name: "Cocoa Power Shake",
    category: "Protein Shakes",
    description: "Raw cocoa, banana, oats & plant protein. Pure muscle fuel.",
    price: "₦4,500",
    priceKobo: 450000,
    image: protein,
    tags: ["Plant Protein"],
  },
  {
    id: "berry-parfait",
    name: "Berry Bliss Parfait",
    category: "Parfaits",
    description: "Greek yogurt layered with granola, strawberries & blueberries.",
    price: "₦3,800",
    priceKobo: 380000,
    image: parfait,
    tags: ["Probiotic", "Breakfast"],
  },
  {
    id: "ginger-shot",
    name: "Wellness Ginger Shot",
    category: "Ginger Shots",
    description: "Pure ginger, lemon, turmeric & a touch of raw honey.",
    price: "₦1,500",
    priceKobo: 150000,
    image: ginger,
    tags: ["Immunity", "Anti-Inflammatory"],
  },
  {
    id: "tigernut-milk",
    name: "Creamy Tigernut Milk",
    category: "Tigernut Milk",
    description: "House-made tigernut milk with dates & coconut. Naturally sweet.",
    price: "₦3,500",
    priceKobo: 350000,
    image: tigernut,
    tags: ["Dairy-Free", "Local"],
  },
  {
    id: "rainbow-bowl",
    name: "Rainbow Fruit Bowl",
    category: "Fruit Bowls",
    description: "Mango, dragon fruit, kiwi, berries & granola crunch.",
    price: "₦4,200",
    priceKobo: 420000,
    image: fruitbowl,
    tags: ["Vegan", "Antioxidants"],
  },
  {
    id: "energy-snacks",
    name: "Energy Bites Box",
    category: "Snacks",
    description: "Oats, dates, nuts & cocoa rolled into bite-sized power.",
    price: "₦2,500",
    priceKobo: 250000,
    image: snacks,
    tags: ["High Fiber"],
  },
  {
    id: "premium-latte",
    name: "Vitality Latte",
    category: "Coffee & Tea",
    description: "Single-origin espresso with steamed oat milk & cinnamon.",
    price: "₦2,800",
    priceKobo: 280000,
    image: coffee,
    tags: ["Barista Crafted"],
  },
  {
    id: "arabia-tea",
    name: "Spiced Arabia Tea",
    category: "Coffee & Tea",
    description: "Cardamom, cinnamon & dates steeped to warming perfection.",
    price: "₦2,200",
    priceKobo: 220000,
    image: tea,
    tags: ["Caffeine-Free"],
  },
];
