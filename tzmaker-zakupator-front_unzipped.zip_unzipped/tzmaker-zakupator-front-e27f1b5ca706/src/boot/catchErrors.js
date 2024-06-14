import { boot } from 'quasar/wrappers'
import { ref } from 'vue';
import { Notify } from 'quasar'

const errorDialog = ref(null);

export function useCatchErrors(catchedError = null, text = '') {
  console.warn('catchedError: ', catchedError, text);
  const errorObject = getErrorObject(catchedError);
  console.log('errorObject', errorObject);
  let message = startedMessage(text, errorObject);
  if (errorObject && !errorObject.shortMessageMode) {
    message = `${message}: <br> ${errorObject.message}`;
  }

  let actions = { icon: 'close', color: 'white' }
  if (errorObject?.statusCode === 401) {
    actions = { label: 'войти', icon: 'login', color: 'white' }
  }

  Notify.create({
    type: 'negative',
    message: message,
    position: 'top',
    timeout: 6000,
    textColor: 'white',
    html: true,
    actions: [actions]
  })
}

/**
 * Метод для отбивки ошибок запросов к бэку.
 *
 * Пример использования:
 * .catch(e => {
 *   this.$catchErrors(e, 'Произошла ошибка во время изменения срока');
 * })
 *
 * Ленивый вариант:
 * .catch(() => this.$catchErrors)
 *
 * @param text текст ошибки, который надо вывести. Задается свой в каждом catch. Точку в конце текста лучше не ставить
 * @param catchedError обект ошибки, которые принимает catch. Из него будет браться текст серверной ошибки,
 *                      либо произвольный объект, имеющий формат (поля/свойства) ошибки: message, code
 */


function startedMessage(text, errorObject)
{
  const err_codes = {
    422: 'Ошибка при проверке данных',
    400: 'Неудалось получить данные',
    401: 'Ошибка авторизации в системе',
    404: 'Ресурса/адреса не существует',
    500: 'Возникла серверная ошибка',
  }
  let message = text || 'Произошла ошибка';

  if (errorObject && errorObject.errorCode === 'validation_error') {
    return errorObject.message;
  }

  if (errorObject && errorObject.statusCode && !text) {
    message = err_codes[errorObject.statusCode] || message;
    return `(#${errorObject.statusCode}) ${message}`;
  }

  if (errorObject && errorObject.statusCode && text) {
    return `(#${errorObject.statusCode}) ${text}`;
  }

  return message;
}

/** Получение стандартного объекта с ошибкой, что бы там не было на входе */
function getErrorObject(catchedError)
{
  if (!catchedError) {
    console.log('no catchedError');
    return null;
  }

  let errorObject = {};
  errorObject.statusCode = catchedError?.response?.status;

  if (catchedError.response && catchedError.response.data && catchedError.response.data.message) {
    if (errorObject.statusCode === 401) {
      errorObject.message = 'Попробуйте войти в систему'
    } else {
      errorObject.message = catchedError.response.data.message;
    }
    return errorObject;
  }

  if (catchedError.body && catchedError.body.message && catchedError.status) {
    errorObject.message = catchedError.body.message;
    return errorObject;
  }

  if (catchedError.code === 'ERR_NETWORK') {
    errorObject.statusCode = 'ERR_NETWORK';
    errorObject.message = catchedError.message;
    return errorObject;
  }

  if (catchedError.response?.status === 422 && catchedError.response?.data?.status === 'validation_error') {
    errorObject.statusCode = 422;
    errorObject.errorCode = 'validation_error'; // конкретный код/алиас ошибки на который можно завязаться
    errorObject.message = 'Ошибка заполнения формы';
    errorObject.shortMessageMode = true;
    return errorObject;
  }

  return null;
}

export default boot(({ app }) => {
  app.config.globalProperties.$catchErrors = useCatchErrors;
});