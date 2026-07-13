import TodoItem from "./TodoItem";

/**
 * LİSTELE (Read) işlemi: Görevleri liste halinde gösterir.
 * @param {{
 *   todos: import("../interfaces/Todo").Todo[],
 *   onToggle: Function,
 *   onUpdate: Function,
 *   onDelete: Function
 * }} props
 */
function TodoList({ todos, onToggle, onUpdate, onDelete }) {
  if (todos.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-rule bg-white/60 px-4 py-8 text-center text-graphite">
        Bu sayfada görev yok. Yukarıdaki kutudan ilk görevini ekle.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
