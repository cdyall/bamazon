var mysql = require("mysql");
// var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
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
    var displayTable = new Table({
      head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
      colWidths: [10, 30, 30, 10, 10]
    });
    for (var i=0; i < res.length; i++){
      displayTable.push(
        [res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      );
    }
    console.log(table.toString());
  });
};

// inquirer
//   .prompt([
//     {
//       type: "list",
//       name: "action",
//       message:
//         "Would you prefer to bid on an item or post an item for bidding?",
//       choices: ["I would like to bid!", "I would rather post soemthing!"]
//     }
//   ])
//   .then(answers => {
//     console.log(word);
//   });
