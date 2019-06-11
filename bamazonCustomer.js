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
  var inquiry = "Select * FROM  products";
  connection.query(inquiry, function(err, res) {
    if (err) throw err;
    var displayTable = new Table({
      head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
      colWidths: [9, 15, 20, 10, 10]
    });
    for (var i = 0; i < res.length; i++) {
     displayTable.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    console.log(displayTable.toString());
    whichItem();
  });
}

function whichItem() {
  inquirer
    .prompt([
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
      }
    ])

    .then(function(answers) {
      var amountRequested = answers.Amount;
      var specificID = answers.ID;
      receipt(specificID, amountRequested);
    });
};


function receipt (ID, numRequested){
	var query = connection.query('Select * FROM products WHERE item_id = ' + ID, function(err,res){
		if(err){console.log(err)};
		if(numRequested <= res[0].stock_quantity){
			var cost = res[0].price * numRequested;
			console.log("Hey we got what you need!!");
      console.log("You owe me $"+cost + "for" + numRequested + res[0].product_name +".");
      
      var stock_quantity = res[0].stock_quantity - numRequested;
      var query = "UPDATE products SET stock_quantity =" + stock_quantity + " WHERE item_id = " + ID;
      console.log(query);

    query = 	connection.query(query);
    
		} else{
			console.log("Sorry, We can't fill your request.");
		};
		productTable();
	});
};

productTable(); 