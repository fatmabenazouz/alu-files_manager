const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const { File, User } = require('./models'); 
require('./passport-config'); 

const path = require('path');
const i18n = require('i18n'); 

const app = express();
const port = 3000;

i18n.configure({
  locales: ['en', 'fr'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  autoReload: true, 
  updateFiles: false 
});

app.use(i18n.init);

app.use(bodyParser.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send(res.__('welcomeMessage'));
});

app.get('/locales', (req, res) => {
  res.json({ id: 1, name: res.__('message') });
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: res.__('userRegistered'), user });
  } catch (error) {
    res.status(400).json({ error: res.__('fieldsRequired') });
  }
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: res.__('userNotFound') });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: res.__('loginSuccessful'), user });
    });
  })(req, res, next);
});

app.post('/files', async (req, res) => {
  try {
    const file = await File.create(req.body);
    res.status(201).json({ message: res.__('fileCreated'), file });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/files', async (req, res) => {
  try {
    const files = await File.findAll();
    res.status(200).json({ message: res.__('filesFetched'), files });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/files/:id', async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (file) {
      res.status(200).json({ message: res.__('fileFetched'), file });
    } else {
      res.status(404).json({ error: res.__('fileNotFound') });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/files/:id', async (req, res) => {
  try {
    const [updated] = await File.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      res.status(200).json({ message: res.__('fileUpdated') });
    } else {
      res.status(404).json({ error: res.__('fileNotFound') });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/files/:id', async (req, res) => {
  try {
    const deleted = await File.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: res.__('fileDeleted') });
    } else {
      res.status(404).json({ error: res.__('fileNotFound') });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});