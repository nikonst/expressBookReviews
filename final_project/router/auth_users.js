const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  {username: "nikos", password: "123"},
  {username: "aspa", password: "123"},
];

const isValid = (username)=>{ //returns boolean
  const found = users.some(el => el.username === username);
  if (!found) return false
  return true
}

const authenticatedUser = (username,password)=>{ //returns boolean
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  console.log(users)
  console.log(req.body)
  if(authenticatedUser(req.body.username, req.body.password)) {
    return res.status(300).json({message: "User Logged"});
  } else {
    return res.status(300).json({message: "Invalid credentials"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.authenticatedUser = authenticatedUser;
