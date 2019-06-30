const r = require("rethinkdb");

r.connect(
  {
    host: "localhost",
    // default port
    port: 28015,
    // db name
    db: "mydb",
  },
  (err, conn) => {
    if (err) throw err;

    // uncomment functions from below to create table and users

    // 1 //
    // we created table by using below command
    // createTable(conn, "users"); // done

    // 2 //
    // add users
    // addUsers(conn);

    // 3 //
    // get users
    getUsers(conn);
  },
);

// create table function
function createTable(conn, tableName) {
  // r.db('mydb').tableCreate(tablename).run(conn,(err,result)=>{
  //   if(err) throw err;
  //   console.log(JSON.stringify(result));
  // });

  // we passed db above already

  r.tableCreate(tableName).run(conn, (err, result) => {
    if (err) throw err;
    console.log(JSON.stringify(result));
  });
}

function addUsers(conn) {
  const users = [
    { name: "John Doe", city: "Miami", age: 34 },
    { name: "Akram", city: "Lahore", age: 40 },
    { name: "Niamat", city: "Karachi", age: 30 },
  ];
  // query
  r.table("users")
    .insert(users)
    .run(conn, (err, result) => {
      if (err) throw err;
      console.log(JSON.stringify(result));
    });

  // check from data explorer
  // command for data explorer // r.db('mydb').table('users')
}

function getUsers(conn) {
  r.table("users").run(conn, (err, cursor) => {
    if (err) throw err;
    cursor.toArray((err, result) => {
      console.log(JSON.stringify(result));
    });
  });
}
