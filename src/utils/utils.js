export const generateTestUser = function (User) {
  localStorage.removeItem('users');
  localStorage.removeItem('data');
  const testUser = new User("user", "123456");
  const testAdmin = new User('admin', '123456', 'admin');
  User.save(testUser);
  User.save(testAdmin);
};
