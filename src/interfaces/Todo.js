/**
 * Görev (Todo) veri modeli.
 * Projede TypeScript kullanılmadığı için "interface" tanımı
 * JSDoc typedef ile yapılmıştır.
 *
 * @typedef {Object} Todo
 * @property {string}  id        - Benzersiz kimlik (crypto.randomUUID)
 * @property {string}  text      - Görev metni
 * @property {boolean} completed - Görev tamamlandı mı?
 * @property {string}  createdAt - Oluşturulma tarihi (ISO string)
 */

/**
 * Yeni bir görev nesnesi üretir.
 * @param {string} text - Görev metni
 * @returns {Todo}
 */
export function createTodo(text) {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

/** Filtre seçenekleri */
export const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  DONE: "done",
};
