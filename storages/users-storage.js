// This class lets us simulate interacting with a database.
class UsersStorage {
  constructor() {
    this.storage = {
      0: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        age: 30,
        bio: "I am a software engineer",
      },
      1: {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        age: 25,
        bio: "I am a software engineer",
      },
    };
    this.id = 1;
  }

  addUser({ firstName, lastName, email, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  deleteUser(id) {
    delete this.storage[id];
  }
}
// Rather than exporting the class, we can export an instance of the class by instantiating it.
// This ensures only one instance of this class can exist, also known as the "singleton" pattern.
module.exports = new UsersStorage();
