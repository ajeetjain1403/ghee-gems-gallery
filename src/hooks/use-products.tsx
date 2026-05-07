import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import pCotton from "@/assets/product-cottonseed.jpg";
import pGroundnut from "@/assets/product-groundnut.jpg";
import pCorn from "@/assets/product-corn.jpg";
import pSunflower from "@/assets/product-sunflower.jpg";
import pGhee from "@/assets/product-ghee.jpg";

// Maps known seed asset paths to imported asset URLs.
// For new products, use a full http(s) image URL in the database.
const ASSET_MAP: Record<string, string> = {
  "/src/assets/product-cottonseed.jpg": pCotton,
  "/src/assets/product-groundnut.jpg": pGroundnut,
  "/src/assets/product-corn.jpg": pCorn,
  "/src/assets/product-sunflower.jpg": pSunflower,
  "/src/assets/product-ghee.jpg": pGhee,
};

export type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  type: string;
  size: string;
  price: string; // formatted "₹2,280"
  priceNumber: number;
  img: string;
  images: string[];
  benefit: string;
  badges: string[];
  isBestSeller: boolean;
};

const formatINR = (n: number) =>
  `₹${Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

const resolveImg = (url: string | null) => {
  if (!url) return pCotton;
  if (ASSET_MAP[url]) return ASSET_MAP[url];
  return url; // assume external URL
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((p) => {
        const urls = (p.image_urls ?? []) as string[];
        const primary = urls[0] ?? p.image_url ?? null;
        return {
          id: p.id as number,
          name: p.name,
          brand: p.brand,
          category: p.category,
          type: p.type,
          size: p.size,
          priceNumber: Number(p.price),
          price: formatINR(Number(p.price)),
          img: resolveImg(primary),
          benefit: p.benefit ?? "Pure & wholesome goodness",
          badges: (p.badges ?? []) as string[],
          isBestSeller: !!p.is_best_seller,
        };
      });
    },
  });
};
