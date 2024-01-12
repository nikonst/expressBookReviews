const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  users.push({username: req.query.username, password: req.query.password})
  return res.status(300).json({message: "New user registered"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  if(books.hasOwnProperty(req.params.isbn)) {
    return res.status(300).json(books[req.params.isbn]);
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  for (const [key, value] of Object.entries(books)) {
    let obj = Object.values(value)
    if(obj[0] === req.params.author) {
      return res.status(300).json(obj);
    }
  }
  return res.status(300).json({message: "No Author found"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  for (const [key, value] of Object.entries(books)) {
    let obj = Object.values(value)
    if(obj[1] === req.params.title) {
      return res.status(300).json(obj);
    }
  }
  return res.status(300).json({message: "No Title found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  for (const [key, value] of Object.entries(books)) {
    if(key === req.params.isbn) {
      return res.status(300).json(value.reviews);
    }
  }
  return res.status(300).json({message: "Invalid isbn"});
});

module.exports.general = public_users;
