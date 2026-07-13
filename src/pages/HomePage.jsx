import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import FilterBar from "../components/FilterBar";
import { createTodo, FILTERS } from "../interfaces/Todo";

const STORAGE_KEY = "gorev-defteri:todos";

/** LocalStorage'dan kayıtlı görevleri okur. */
function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Ana sayfa: tüm CRUD işlemlerinin yönetildiği yer.
 * Görevler LocalStorage'da saklanır; sayfa yenilense de kaybolmaz.
 */
function HomePage() {
  const [todos, setTodos] = useState(loadTodos);
  const [filter, setFilter] = useState(FILTERS.ALL);

  // Görevler her değiştiğinde LocalStorage'a yaz
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // ---- CRUD işlemleri ----

  /** EKLE (Create) */
  function addTodo(text) {
    setTodos((prev) => [createTodo(text), ...prev]);
  }

  /** GÜNCELLE (Update) - tamamlandı durumunu değiştir */
  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  /** GÜNCELLE (Update) - görev metnini değiştir */
  function updateTodo(id, text) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: text.trim() } : t))
    );
  }

  /** SİL (Delete) */
  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  // ---- LİSTELE (Read): filtreye göre görünen görevler ----
  const visibleTodos = todos.filter((t) => {
    if (filter === FILTERS.ACTIVE) return !t.completed;
    if (filter === FILTERS.DONE) return t.completed;
    return true;
  });

  const counts = {
    [FILTERS.ALL]: todos.length,
    [FILTERS.ACTIVE]: todos.filter((t) => !t.completed).length,
    [FILTERS.DONE]: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="mx-auto min-h-screen max-w-xl px-4 py-10">
      {/* Başlık: defter kapağı hissi */}
      <header className="mb-8 text-center">
        <h1 className="font-hand text-6xl font-bold text-ink">Görev Defteri</h1>
        <p className="mt-1 text-graphite">
          {counts[FILTERS.ACTIVE] === 0
            ? "Defter temiz — bugünlük her şey tamam."
            : `Bugün seni bekleyen ${counts[FILTERS.ACTIVE]} görev var.`}
        </p>
      </header>

      <main className="space-y-4">
        <TodoForm onAdd={addTodo} />
        <FilterBar filter={filter} onChange={setFilter} counts={counts} />
        <TodoList
          todos={visibleTodos}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </main>

      <footer className="mt-10 text-center text-xs text-graphite/70">
        React + Tailwind CSS ile geliştirildi · Veriler LocalStorage'da saklanır
      </footer>
    </div>
  );
}

export default HomePage;
