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

var inventoryList = function() {
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
    productUpdates();
  });
};

function productUpdates() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "what would you like to do with the current products?",
        choices: ["Restock", "Input new product", "Delete a product"]
      }
    ])
    .then(function(answers) {
      switch (answers.action) {
        case "Restock":
          restockItems();
          break;
        case "Input new product":
          newProduct();
          break;
        case "Delete a product":
          trashProduct();
          break;
      }
    });
}

function restockItems() {
  inquirer
    .prompt([
      {
        name: "ID",
        type: "input",
        message:
          "pPlease input the number of the product you would like to restock."
      },
      {
        name: "Amt",
        type: "input",
        message: "How many would you like to add?"
      }
    ])
    .then(function(answers) {
      var amount = answers.Amt;
      var prodID = answers.ID;
      itemRestock(prodID, amount);
    });
}

function itemRestock(id, quant) {
  connection.query("SELECT * FROM Products WHERE item_id = " + id, function(
    err,
    res
  ) {
    if (err) {
      console.log(err);
    }
    connection.query(
      "UPDATE Products SET stock_quantity = stock_quantity + " +
        stock_quantity +
        "WHERE item_id =" +
        item_id
    );

    inventoryList();
  });
}

function newProduct() {
  inquirer
    .prompt([
      {
        name: "ID",
        type: "input",
        message: "ID Number"
      },
      {
        name: "Name",
        type: "input",
        message: "What product would you like to add?"
      },
      {
        name: "Category",
        type: "input",
        message: "What type of category would the product fit in?"
      },
      {
        name: "Price",
        type: "input",
        message: "How much would it cost?"
      },
      {
        name: "Quantity",
        type: "input",
        message: "How many would you like in inventory?"
      }
    ])
    .then(function(answers) {
      var id = answers.Id;
      var name = answers.Name;
      var category = answers.Category;
      var price = answers.Price;
      var quantity = answers.Quantity;
      createProduct(id, name, category, price, quantity);
    });
}

function createProduct(name, category, price, quantity) {
  connection.query(
    'INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) VALUES("' +
      id +
      '","' +
      name +
      '","' +
      category +
      '",' +
      price +
      "," +
      quantity +
      ")"
  );
  inventoryList();
}

function trashProduct() {
  inquirer
    .prompt([
      {
        name: "ID",
        type: "input",
        message: "Which product do you wan to trash?"
      }
    ])
    .then(function(answer) {
      var id = answers.ID;
      vanquishproduct(id);
    });
}

function vanquishproduct(id) {
  connection.query("DELETE FROM Products WHERE item_id = " + id);
  inventoryList();
}

inventoryList();
