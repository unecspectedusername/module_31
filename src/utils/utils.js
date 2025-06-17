export const generateTestUser = function (User) {
  localStorage.clear();
  const testUser = new User("test", "123");
  const secondUser = new User('test2', '123')
  const thirdUser = new User('test3', '123', 'admin');
  User.save(testUser);
  User.save(secondUser);
  User.save(thirdUser);
};

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
