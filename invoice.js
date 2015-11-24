(function() {
    var app = angular.module('invoiceMan', []);

    app.controller('InvoiceController', function(){
        this.invoices = sales;
    });

    app.controller("TabController", function() {
        this.tab = 1;

        this.isSet = function(checkTab) {
          return this.tab === checkTab;
        };

        this.setTab = function(setTab) {
          this.tab = setTab;
        };
    });

    app.controller("CreateInvController", function(){

        this.invoice = {};
        this.products = items;
        this.errors = [];
        this.invoice.totalPrice = 0;

        this.selected = {};
        this.select = function(item){
          
          // reset errors, if previously set
          this.errors = [];
          
          // Calculating totalPrice of the added item
          item.totalPrice = item.price * item.quantity;
          
          // If the selected item already exists in the list
          if(this.selected[item.id])
            item.quantity++;
          else
            this.selected[item.id]=item;
        };

        // Remove Items from Selected List
        this.removeSelected = function(itemId){
          delete this.selected[itemId];
        };

        // Add Invoice to sales list
        this.addInvoice = function(){
          // Validating to check if AT LEAST ONE item is selected
          if(Object.keys(this.selected).length > 0){
            this.invoice.lineItems = this.selected;

            // Calculating Total Price of all the items
            for(var s in this.selected){
              this.invoice.totalPrice += this.selected[s].price*this.selected[s].quantity;
            }

            // Saving the current Invoice
            sales.push(this.invoice);

            // Reset all objects
            this.invoice = {};
            this.selected = {};
            this.errors=[];
          }
          else{
            this.errors.push("Please select/add atleast ONE item");
          }
        };
    });

    var sales = [{
      customerName: 'Elon Musk',
      invoiceNmbr: 89876,
      totalPrice: 409.50,
      createdOn: 1427490980837,
      lineItems: [{
        id: 1,
        productName: 'Azurite',
        price: 110.50,
        quantity: 2
      }, {
        id : 3,
        productName: 'Zircon',
        price: 188.50,
        quantity: 1        
      }]
    }, {
      customerName: 'Nicola Tesla',
      invoiceNmbr: 82468,
      totalPrice: 764,
      createdOn: 1437590990837,
      lineItems: [{
        productName: 'Azurite',
        price: 110.50,
        quantity: 5        
      }, {
        productName: 'BloodStone',
        price: 70.50,
        quantity: 3        
      }]
    }];

    var items = [{
      id: 1,
      productName: 'Azurite',
      img: 'img/gem-01.gif',
      quantity: 1,
      price: 70.23
    }, {
      id: 2,
      productName: 'BloodStone',
      img: 'img/gem-02.gif',
      quantity: 1,
      price: 110.10
    }, {
      id: 3,
      productName: 'Zircon',
      img: 'img/gem-03.gif',
      quantity: 1,
      price: 188.50
    }];

})();
