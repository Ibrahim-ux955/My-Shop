import { supabase } from "@/lib/supabase";

export default async function TestSupabase() {
  const { data, error } = await supabase.from("products").select("*").limit(1);

  if (error) return <p>Error: {error.message}</p>;
  if (!data || data.length === 0) return <p>No products found</p>;

  return (
    <div>
      <h1>Supabase Test</h1>
      <pre>{JSON.stringify(data[0], null, 2)}</pre>
    </div>
  );
}
