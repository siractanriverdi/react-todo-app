import { useState } from "react";

/**
 * Tek bir görev satırı.
 * GÜNCELLE (Update): tamamlandı işaretleme + metni düzenleme
 * SİL (Delete): görevi listeden kaldırma
 *
 * @param {{
 *   todo: import("../interfaces/Todo").Todo,
 *   onToggle: (id: string) => void,
 *   onUpdate: (id: string, text: string) => void,
 *   onDelete: (id: string) => void
 * }} props
 */
function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function saveEdit() {
    if (draft.trim() === "") {
      setDraft(todo.text); // boş bırakıldıysa eski metne dön
    } else {
      onUpdate(todo.id, draft);
    }
    setIsEditing(false);
  }

  const date = new Date(todo.createdAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
  });

  return (
    <li className="group relative flex items-center gap-3 rounded-lg border border-rule bg-white py-3 pl-6 pr-3 shadow-sm">
      {/* Defter kenarındaki kırmızı marj çizgisi */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-3 w-px bg-margin/70"
      />

      {/* GÜNCELLE: tamamlandı / tamamlanmadı durumu */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`"${todo.text}" görevini tamamlandı olarak işaretle`}
        className="size-5 shrink-0 accent-leaf"
      />

      {isEditing ? (
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit();
            if (e.key === "Escape") {
              setDraft(todo.text);
              setIsEditing(false);
            }
          }}
          autoFocus
          aria-label="Görev metnini düzenle"
          className="flex-1 rounded border border-ink/40 px-2 py-1"
        />
      ) : (
        <div className="min-w-0 flex-1">
          <p className={todo.completed ? "task-done" : ""}>{todo.text}</p>
          <p className="text-xs text-graphite/70">{date}</p>
        </div>
      )}

      {/* GÜNCELLE: metni düzenleme */}
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="rounded px-2 py-1 text-sm font-medium text-ink/70 hover:bg-paper"
        >
          Düzenle
        </button>
      )}

      {/* SİL */}
      <button
        onClick={() => onDelete(todo.id)}
        aria-label={`"${todo.text}" görevini sil`}
        className="rounded px-2 py-1 text-sm font-medium text-margin hover:bg-margin/10"
      >
        Sil
      </button>
    </li>
  );
}

export default TodoItem;
