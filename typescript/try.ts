interface RequestUser {
  name: string;
  age: number;
  nationality?: string;
}

let number: Number = 1;

const user: RequestUser = {
  name: 'John',
  age: 20,
};

console.log(user);
