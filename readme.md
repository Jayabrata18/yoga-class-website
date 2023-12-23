# Hi, this is Jayabrata . The above repo is a assignment of Flexmoney.

To start the project first you should clone the repository.

1. go to client folder by `cd client` and `npm i` to install all dependencies.
2. if you want to run in local computer change 'mongodb uri' and axios responce to `http://localhost:5000/api/users/...`
3. now run `npm start` to start the project. It will run in `port 3000`
4. Now for backend in other terminal first go to backend folder by `cd backend` and `npm i` to install all dependencies
5. now change cors to `http://localhost:3000`
6. now run `npm start` to start the project. It will run in `port 5000`

User Database schema for the project is

email: String,
password: String,
confirmPassword: String,
name: String,
age: String,
sex: String,
updatedAt: Date,
slot: Number,
month: String,
