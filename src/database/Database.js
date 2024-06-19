import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'UserDatabase.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  }
);

export const createTables = () => {
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
      )`,
      [],
      () => {
        console.log('Table "users" created successfully');
      },
      error => {
        console.log('Error creating table "users" ' + error.message);
      }
    );

    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS invoices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_name TEXT,
        quantity INTEGER,
        invoice_number TEXT,
        value REAL,
        payment_method TEXT
      )`,
      [],
      () => {
        console.log('Table "invoices" created successfully');
      },
      error => {
        console.log('Error creating table "invoices" ' + error.message);
      }
    );
  });
};

export const registerUser = (username, password) => {
  db.transaction(txn => {
    txn.executeSql(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [username, password],
      (sqlTxn, res) => {
        console.log('User registered successfully');
      },
      error => {
        console.log('Error registering user ' + error.message);
      }
    );
  });
};

export const loginUser = (username, password, successCallback, errorCallback) => {
  db.transaction(txn => {
    txn.executeSql(
      `SELECT * FROM users WHERE username = ? AND password = ?`,
      [username, password],
      (sqlTxn, res) => {
        if (res.rows.length > 0) {
          successCallback();
        } else {
          errorCallback();
        }
      },
      error => {
        console.log('Error logging in ' + error.message);
      }
    );
  });
};

export const addInvoice = (product_name, quantity, invoice_number, value, payment_method) => {
  db.transaction(txn => {
    txn.executeSql(
      `INSERT INTO invoices (product_name, quantity, invoice_number, value, payment_method) VALUES (?, ?, ?, ?, ?)`,
      [product_name, quantity, invoice_number, value, payment_method],
      (sqlTxn, res) => {
        console.log('Invoice added successfully');
      },
      error => {
        console.log('Error adding invoice ' + error.message);
      }
    );
  });
};

export const getInvoices = (callback) => {
  db.transaction(txn => {
    txn.executeSql(
      `SELECT * FROM invoices`,
      [],
      (sqlTxn, res) => {
        let len = res.rows.length;
        if (len > 0) {
          let results = [];
          for (let i = 0; i < len; i++) {
            let item = res.rows.item(i);
            results.push(item);
          }
          callback(results);
        }
      },
      error => {
        console.log('Error getting invoices ' + error.message);
      }
    );
  });
};

export const updateInvoice = (id, product_name, quantity, invoice_number, value, payment_method) => {
  db.transaction(txn => {
    txn.executeSql(
      `UPDATE invoices SET product_name = ?, quantity = ?, invoice_number = ?, value = ?, payment_method = ? WHERE id = ?`,
      [product_name, quantity, invoice_number, value, payment_method, id],
      (sqlTxn, res) => {
        console.log('Invoice updated successfully');
      },
      error => {
        console.log('Error updating invoice ' + error.message);
      }
    );
  });
};

export const deleteInvoice = (id) => {
  db.transaction(txn => {
    txn.executeSql(
      `DELETE FROM invoices WHERE id = ?`,
      [id],
      (sqlTxn, res) => {
        console.log('Invoice deleted successfully');
      },
      error => {
        console.log('Error deleting invoice ' + error.message);
      }
    );
  });
};
