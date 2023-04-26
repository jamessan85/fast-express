const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bookings.sqlite');


db.serialize(() => {
  db.run(
      `CREATE TABLE IF NOT EXISTS person (
     id INTEGER PRIMARY KEY,
     firstName text,
     lastName text,
     email text,
     password text,
     jsonToken text
  );`)
  
  
  db.run(`CREATE TABLE IF NOT EXISTS orders (
          id integer PRIMARY_KEY,
          order_id integer,
          person_id integer,
          FOREIGN KEY (person_id) REFERENCES person(id_bob)
        );`)
  
  db.run(`INSERT INTO orders(order_id, person_id) VALUES (1,2)`, [], (err) => err ? console.log(err): console.log("OK")) 

})






