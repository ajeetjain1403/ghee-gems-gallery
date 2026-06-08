import { Link } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Loader2, Minus, Save } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminProducts = () => {
  const qc = useQueryClient();
  const [editingStock, setEditingStock] = useState<Record<number, number | null>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const stockMutation = useMutation({
    mutationFn: async ({ id, stock }: { id: number; stock: number }) => {
      const { error } = await supabase.from("products").update({ stock }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Stock updated" });
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => {
      toast({ title: "Update failed", description: err.message, variant: "destructive" });
    },
  });

  const handleStockChange = (id: number, delta: number) => {
    const p = data?.find((x) => x.id === id);
    if (!p) return;
    const current = Number((p as any).stock ?? 0);
    const next = Math.max(0, current + delta);
    stockMutation.mutate({ id, stock: next });
  };

  const handleStockInput = (id: number, raw: string) => {
    const val = raw === "" ? null : parseInt(raw, 10);
    setEditingStock((prev) => ({ ...prev, [id]: val }));
  };

  const handleStockSave = (id: number) => {
    const val = editingStock[id];
    if (val === null || val === undefined) return;
    stockMutation.mutate({ id, stock: Math.max(0, val) });
    setEditingStock((prev) => { const n = { ...prev }; delete n[id]; return n; });
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Product deleted" });
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["products"] });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-muted-foreground">Manage your storefront catalog</p>
        </div>
        <Button asChild>
          <Link to="/admin/products/new"><Plus className="w-4 h-4 mr-1.5" />Add product</Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center text-sm text-muted-foreground py-12">No products yet.</TableCell></TableRow>
              )}
              {data?.map((p) => {
                const img = (p.image_urls?.[0] as string | undefined) ?? p.image_url;
                const stock = Number((p as any).stock ?? 0);
                const isEditing = editingStock[p.id as number] !== undefined && editingStock[p.id as number] !== null;
                return (
                  <TableRow key={p.id}>
                    <TableCell>
                      {img ? (
                        <img src={img} alt={p.name} className="w-12 h-12 object-cover rounded border" />
                      ) : (
                        <div className="w-12 h-12 rounded border bg-muted" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.brand}</div>
                    </TableCell>
                    <TableCell className="text-sm">{p.type}</TableCell>
                    <TableCell className="text-sm">{p.size}</TableCell>
                    <TableCell className="text-sm">₹{Number(p.price).toLocaleString("en-IN")}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          disabled={stockMutation.isPending}
                          onClick={() => handleStockChange(p.id as number, -1)}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </Button>
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              min={0}
                              className="h-7 w-16 text-center px-1 py-0 text-sm"
                              value={editingStock[p.id as number] ?? ""}
                              onChange={(e) => handleStockInput(p.id as number, e.target.value)}
                              onKeyDown={(e) => { if (e.key === "Enter") handleStockSave(p.id as number); }}
                              autoFocus
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleStockSave(p.id as number)}
                            >
                              <Save className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        ) : (
                          <button
                            className="h-7 w-12 rounded border bg-muted/50 text-center text-sm font-medium hover:bg-muted transition-colors"
                            onClick={() => setEditingStock((prev) => ({ ...prev, [p.id as number]: stock }))}
                            title="Click to edit stock"
                          >
                            {stock}
                          </button>
                        )}
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          disabled={stockMutation.isPending}
                          onClick={() => handleStockChange(p.id as number, 1)}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {p.is_active ? <Badge variant="secondary">Active</Badge> : <Badge variant="outline">Hidden</Badge>}
                      {p.is_best_seller && <Badge className="ml-1">Best</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/products/${p.id}`}><Pencil className="w-4 h-4" /></Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete "{p.name}"?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(p.id as number)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
