const express = require('express');
const axios = require('axios')
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  users.push({ username: req.body.username, password: req.body.password })
  return res.status(300).json({ message: "New user registered" });
});

// Get the book list available in the shop using async callback function
async function getBooks() {
  return books
}

public_users.get('/async/', function (req, res) {
  getBooks().then(result => {
    return res.status(300).json(result);
  })
});
// Get the book list available in the shop using async callback function

// *******************************************
// Get book details based on ISBN using Promise
const myPromise = new Promise(function (resolve, reject) {
  let data = books
  if (data) {
    resolve(data)
  }
  else {
    reject("Error");
  }
});

public_users.get('/promise/isbn/:isbn', function (req, res) {
  myPromise.then(result => {
    if (result.hasOwnProperty(req.params.isbn)) {
      return res.status(300).json(result[req.params.isbn]);
    }
  })
});
// Get book details based on ISBN using Promise
// *******************************************

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  if (books.hasOwnProperty(req.params.isbn)) {
    return res.status(300).json(books[req.params.isbn]);
  }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  for (const [key, value] of Object.entries(books)) {
    let obj = Object.values(value)
    if (obj[0] === req.params.author) {
      return res.status(300).json(obj);
    }
  }
  return res.status(300).json({ message: "No Author found" });
});

// AXIOS *************************************
// Get book details based on author using Axios
public_users.get('/axios/author/:author', function (req, res) {
  axios({
    method: 'get',
    url: 'http://localhost:5000/author/' + req.params.author,
    validateStatus: () => true,
  }).then(apiRes => {
    return res.status(300).json(apiRes.data);
  }).catch(err => {
    return res.status(300).json(err);
  })
});
// Get book details based on title using Axios
public_users.get('/axios/title/:title', function (req, res) {
  axios({
    method: 'get',
    url: 'http://localhost:5000/title/' + req.params.title,
    validateStatus: () => true,
  }).then(apiRes => {
    console.log(apiRes.data)
    if(apiRes.data) {
      return res.status(300).json(apiRes.data);
    } else {
      return res.status(300).json({ message: "No Title found" });
    }
  }).catch(err => {
    return res.status(300).json(err);
  })
});
// AXIOS *************************************

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  for (const [key, value] of Object.entries(books)) {
    let obj = Object.values(value)
    if (obj[1] === req.params.title) {
      return res.status(300).json(obj);
    }
  }
  return res.status(300).json({ message: "No Title found" });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  for (const [key, value] of Object.entries(books)) {
    if (key === req.params.isbn) {
      return res.status(300).json(value.reviews);
    }
  }
  return res.status(300).json({ message: "Invalid isbn" });
});

module.exports.general = public_users;
