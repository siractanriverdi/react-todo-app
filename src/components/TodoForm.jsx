import { useState } from "react";

/**
 * EKLE (Create) işlemi: Yeni görev ekleme formu.
 * @param {{ onAdd: (text: string) => void }} props
 */
function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (text.trim() === "") return; // boş görev eklenemez
    onAdd(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Yeni görev yaz... (örn: React ödevini bitir)"
        aria-label="Yeni görev"
        className="flex-1 rounded-lg border border-rule bg-white px-4 py-3 text-ink placeholder:text-graphite/60 shadow-sm focus:border-ink"
      />
      <button
        type="submit"
        className="rounded-lg bg-ink px-5 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-ink/90 active:scale-95"
      >
        Ekle
      </button>
    </form>
  );
}

export default TodoForm;
