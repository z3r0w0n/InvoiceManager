(function() {
    var app = angular.module('invoiceMan', []);

    app.controller('InvoiceController', function(){
        this.invoices = sales;
    });

    app.controller('ProductController', function(){
        this.products = items;
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
          item.totalPrice = item.price * item.quantity;
          // console.log(item.totalPrice)
          if(this.selected[item.id])
            item.quantity++;
          else
            this.selected[item.id]=item;

          // this.invoice.totalPrice = 0;
          for(var s in this.selected){
             this.invoice.totalPrice += this.selected[s].totalPrice;
          }
        };

        // Remove Items from Selected List
        this.removeSelected = function(itemId){
          delete this.selected[itemId];
        };

        this.addInvoice = function(){
          if(Object.keys(this.selected).length > 0){
            this.invoice.lineItems = this.selected;
            // console.log(sales);
            sales.push(this.invoice);
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
      createdOn: 1397490980837,
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
      createdOn: 1397490980837,
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
