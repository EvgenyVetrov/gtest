import { boot } from 'quasar/wrappers'
import { ref } from 'vue';
import { Notify } from 'quasar'

export function useCatchSuccess(catchedResponce = null, text = '') {
  console.log('catchedResponce success', catchedResponce);
  let message = text;
  if (catchedResponce?.data?.message) {
    message = catchedResponce.data.message;
  }

  Notify.create({
    type: 'positive',
    message: message,
    position: 'top',
    timeout: 4000,
    textColor: 'white',
    html: true,
  })
}

/**
 * Метод для отображения успешного результата ответа.
 *
 * Пример использования:
 * .catch(e => {
 *   this.$catchSuccess(e, 'Сохранено успешно');
 * })
 *
 * Ленивый вариант:
 * .catch(() => this.$catchSuccess)
 *
 * @param text текст успеха, который надо вывести. Задается свой в каждом catch. Точку в конце текста лучше не ставить
 * @param catchedResponce данные которыми ответил сервер
 */


export default boot(({ app }) => {
  app.config.globalProperties.$catchSuccess = useCatchSuccess;
});