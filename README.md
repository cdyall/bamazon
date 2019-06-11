# bamazon

### Overview
This is a Node.js &amp; MySQL command line Node app that recreates an online retailer.


### Node.js
Two JavaScript files replicate the basics of a simple ecommerce engine:

- `bamazonCustomer.js` _([See example here](#customer))_
  - Receives orders from customers via the command line and interfaces with mySQL to deplete stock from the store's inventory.

- `bamazonManager.js` _([See example here](#manager))_
  - Mimics the basics of a warehouse management system, providing managers with a list of options to view stock and adjust inventory.
  - A sample of the menu is below:
    * View Products for Sale 
    * View Low Inventory
    * Add to Inventory
    * Add New Product

### Screenshots
Below are some screenshots that show the functionality of the app.


<a name="customer"></a>
- Below is a demo of the `bamazonCustomer.js` file...
  - Running `node bamazonCustomer.js` will use MySQL to pull up all the products for sale.
    - The customer can then choose a product using its ID and then enter a quantity to buy.
      ![Customer Order]
    - If the inventory has enough items, the order will be processed.
      ![Order Valid]
    - If the inventory is lacking, the order will not be processed.
      ![Order Invalid]


<a name="manager"></a>
- Below is a demo of the `bamazonManager.js` file...
  - Running `node bamazonManager.js` will display a menu and perform the specific requests.
    ![Manager Menu]
    - The manager can choose option `1` to view the current inventory.
      ![Manager 1]
    - The manager can choose option `2` to see low items in inventory (less than 5 in stock).
      ![Manager 2]
    - The manager can choose option `3` to re-stock existing items.
      ![Manager 3]
    - The manager can choose option `4` to add new items for sale.
      ![Manager 4a]
      - Notice how the inventory was adjusted from steps `3` and `4`.
        ![Manager 4b]
