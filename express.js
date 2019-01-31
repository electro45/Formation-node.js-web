const express = require('express');
const http = require('http');
const morgan = require('morgan');

const app = express();

let contacts = [
  {
    id: 1,
    pseudo: 'Neo',
  }, {
    id: 2,
    pseudo: 'Napalm',
  },
  {
    id: 3,
    pseudo: 'Ketchupy',
  },
]

// implementer 5 routes -> rep json
// get  /api/contacts get tableau contacts

// get  /api/contacts/:contactId le contact ou 404

// post /api/contacts stock body dans le tableau et génère un id aléatoire ou max +1
// return json du contact status 201

// put /api/contacts/:contactId remplace l'ancien par le nouveau si existe sinon 404
// return json l'ancien contact

// delete //api/contacts/:contactId supprime l'ancien contact ou 404
// return contact supprimé

app.use(morgan('dev'));
// middleware log (morgan)
// app.use((req, res, next) => {
//   console.log(`[ ${(new Date()).toISOString()} ] - ${req.method} ${req.url} / User connect !`);
//   next();
// });

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'api de contacts');
});
app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});
app.get('/api/contacts/:contactId', (req, res) => {
  const resultat = contacts.find((contact) => {
    return contact.id === parseInt(req.params.contactId)
  });
  if (resultat) {
    res.json(resultat);
  } else {
    res.status(404);
    res.send('Not found')
  }
});
app.post('/api/contacts', (req, res) => {
  const newId = contacts.length + 1;
  const newContact = { id: newId, pseudo: 'nouveau contact'};
  contacts = [...contacts, newContact];
  res.json(newContact);
});
app.put('/api/contacts/:contactId', (req, res) => {
  const id = parseInt(req.params.contactId);
  const newContact = { pseudo: 'modif contact' };
  let oldContact = {};
  let bFind = false;
  contacts.forEach((contact, key) => {
    if (id === contact.id) {
      oldContact = {...contact};
      contact.pseudo = newContact.pseudo;
      bFind = true
    }

  });
  if (bFind) {
    res.json(oldContact);
  } else {
    res.status(404);
    res.send('Not found')
  }
});
app.delete('/api/contacts/:contactId', (req, res) => {
  const id = parseInt(req.params.contactId);
  let contactDelete = {};
  contacts.forEach((contact, key) => {
    if (id === contact.id) {
      contactDelete = contact;
      delete contacts[key];
    }
  });
  res.json(contactDelete);
});


// app.get('/api/contact/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   req.url.toString().endsWith('/')
//   let oContact = {
//     id: id,
//   };
//   switch (id) {
//     case 1:
//       oContact.name = 'neo';
//       break;
//     case 2:
//       oContact.name = 'napalm';
//       break;
//     case 3:
//       oContact.name = 'ketchupy';
//       break;
//     default:
//       oContact.id = null;
//       oContact.error = 'not found';
//   }
//   res.json(oContact);
// });

const server = http.createServer(app);
server.on('error', (err) => {
  console.log(err.message);
});
server.listen(8080, () => {
  console.log('Server started http://127.0.0.1:8080/');
})

