import {appState} from "../app";

export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function (obj, key) {
  const storageData = appState.storageManager.getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const generateTestUser = function (User) {
  localStorage.clear();
  const testUser = new User("test", "123");
  const secondUser = new User('test2', '123')
  User.save(testUser);
  User.save(secondUser);
};

export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function changeContent(newContent) {
  const content = document.querySelector('#content');
  content.innerHTML = newContent;
}

export function createDOMProxy(instance) {
  return new Proxy(instance, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      // Прокидываем родителя при вставке
      if (prop === 'parent') {
        target._parent = value;
        return true;
      }
      return Reflect.set(target, prop, value, receiver);
    }
  });
}
