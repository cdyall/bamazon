var mysql = require("mysql");
var inquirer = require("inquirer");
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
    console.log(displayTable.toString());
    whichItem();
  });
};

function whichItem() {

  inquirer.prompt([

    {
      name: "ID",
      type: "input",
      message: "Choose the ID of the Item you want.",
      filter: Number
    },
    {
      name: "Amount",
      type: "input",
      message: "How many of this item do you want ?",
      filter: Number
    },

  ])
  .then(function(answers){

    var amountRequested = answers.Amount;
    var specificID = answers.ID;
    receipt(specificID, amountRequested);

  });

};