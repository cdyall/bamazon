DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price INTEGER(10) NOT NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cheese", "dairy", 2.00, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("corn", "vegetables", 3.75, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("candy corn", "candy", .75, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bicycle", "sporting goods", 300, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("board games", "entertainment", 5.00, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("comics", "entertainment", 1.50, 36);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("milk", "dairy", 3.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("green beans", "vegetables", 1.25, 45);

select * from products;
