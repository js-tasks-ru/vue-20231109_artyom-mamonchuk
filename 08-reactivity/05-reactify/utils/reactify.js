import { computed, unref } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  return (...args) =>
    computed(() => {
      return func(...args.map((arg) => unref(arg)));
    });
}

/*
unref(val)
Возвращает внутреннее значение, если аргумент является ref,
в противном случае — сам аргумент.
Это всего лишь синтаксический сахар для val = isRef(val) ? val.value : val.
*/
