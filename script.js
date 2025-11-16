// KONFIGURASI SUPABASE
const SUPABASE_URL = "https://owlvlecoqrugywywlznq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93bHZsZWNvcXJ1Z3l3eXdsem5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyNzM1NzksImV4cCI6MjA3ODg0OTU3OX0.e5c1cJc4kn6VdVtzEMqtoenFgHkIRPShZrndJVG0U74";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- KIRIM PESAN (HALAMAN PENGIRIM) ---
async function sendConfess() {
    const message = document.getElementById("message").value;

    if (!message.trim()) {
        alert("Tulis pesan dulu ya 🥺💛");
        return;
    }

    const { error } = await client
        .from("confess")
        .insert([{ message: message }]);

    if (error) {
        alert("Gagal mengirim pesan!");
        console.log(error);
    } else {
        alert("Pesan terkirim secara anonim! 💛");
        document.getElementById("message").value = "";
    }
}

// --- AMBIL SEMUA PESAN (HALAMAN ADMIN) ---
async function loadConfess() {
    const list = document.getElementById("confess-list");

    const { data, error } = await client
        .from("confess")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        list.innerHTML = "<p>Gagal mengambil data.</p>";
        return;
    }

    list.innerHTML = "";

    data.forEach((row) => {
        const item = document.createElement("div");
        item.classList.add("confess-item");
        item.innerText = row.message;
        list.appendChild(item);
    });
}
