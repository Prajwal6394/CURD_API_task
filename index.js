const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Sample data for users
const users = [
  { id: 1, name: 'Prajwal Pandey', email: 'prajwalpandey@mailinator.com' },
  { id: 2, name: 'Rahul sharma', email: 'rahuk@mailinator.com' },
  { id: 3, name: 'First_name last_name', email: 'prajjo@mailinator.com' },
];

// Home page
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', users });
});

// Add user form
app.get('/add', (req, res) => {
  res.render('add', { title: 'Add User' });
});

// Add user action
app.post('/add', (req, res) => {
  const { name, email } = req.body;
  const id = users.length + 1;
  users.push({ id, name, email });
  res.redirect('/');
});

// Edit user form
app.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === parseInt(id));
  res.render('edit', { title: 'Edit User', user });
});

// Edit user action
app.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const index = users.findIndex(user => user.id === parseInt(id));
  users[index] = { id: parseInt(id), name, email };
  res.redirect('/');
});

// Delete user action
app.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === parseInt(id));
  users.splice(index, 1);
  res.redirect('/');
});

// User details page
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === parseInt(id));
  res.render('user', { title: 'User Details', user });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
