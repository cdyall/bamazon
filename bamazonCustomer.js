var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var word = "osdjvn;b";

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
  });
  
  var productTable = function() {
      var inquiry = "SELECT * FROM products";
     connection.query(inquiry, function(err, res) {
      if (err) throw err;
      var table =  new Table ({
        head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
        colWidths: [10,30,30,10,10]
      });

      

    });
  }
  
  inquirer
 .prompt([
   {
       type: "list",
       name: "action",
       message: "Would you prefer to bid on an item or post an item for bidding?",
       choices: ["I would like to bid!", "I would rather post soemthing!"]
     }
 ])
 .then(answers => {
   console.log(word)
 });