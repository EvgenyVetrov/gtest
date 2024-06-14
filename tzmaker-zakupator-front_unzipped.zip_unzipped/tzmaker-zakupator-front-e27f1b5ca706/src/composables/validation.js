import { ref } from 'vue';

/**
 * @deprecated
 */

/**
 *
 * @type {{}}
 */
export const serverErrors2 = {}

/**
 * Тихая валидация одного поля
 *
 * @param fieldName
 * @param value
 * @param rules
 * @returns {*}
 */
export function silentValidateField(fieldName, value, rules) {
  const validationResults = rules.map(rule => rule(value));
  return validationResults.every(result => result === true);
}

/**
 * Тихая валидация всех полей
 *
 * @param fieldsRules
 * @param fields
 * @returns {boolean}
 */
export function silentValidateAllFields(fieldsRules, fields) {
  for (const fieldName in fieldsRules) {
    if (!silentValidateField(fieldName, fields[fieldName], fieldsRules[fieldName])) {
      return false;
    }
  }
  return true;
}

export function emailValidator() {
  return [
    val => val && val.length > 0 || 'Please type something',
    val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email format'
  ];
}

export function passwordValidator() {
  return [val => val && val.length > 6 || 'Password too short'];
}


/*
export default {
  methods: {

    silentValidateField(fieldName) {
      // Получаем значение поля
      const value = this[fieldName];
      // Получаем соответствующие правила валидации
      const rules = this.fieldsRules[fieldName];
      // Применяем правила валидации к значению поля
      const validationResults = rules.map(rule => rule(value));
      return validationResults.every(result => result === true);
    },


    silentValidateAllFields() {
      for (const fieldName in this.fieldsRules) {
        if (!this.silentValidateField(fieldName)) {
          return false; // Если хотя бы одно поле не прошло проверку, возвращаем false
        }
      }
      return true; // Все поля прошли проверку
    },
    emailValidator(){
      return [
        val => val && val.length > 0 || 'Please type something',
        val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email format'
      ];
    },
    passwordValidator(){
      return [val => val && val.length > 6 || 'Password too short']
    }
  }
};*/
