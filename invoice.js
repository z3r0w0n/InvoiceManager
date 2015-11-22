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

          console.log(item.totalPrice)
          if(this.selected[item.id])
            item.quantity++;
          else
            this.selected[item.id]=item;

          // this.invoice.totalPrice = 0;
          for(var s in this.selected){
             this.invoice.totalPrice += this.selected[s].totalPrice;
          }
        };

        this.addInvoice = function(){
          if(this.invoice.totalPrice != 0){
            console.log(sales);
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
      totalPrice: 110.50,
      createdOn: 1397490980837,
      lineItems: [{
        id: 1,
        productName: 'Azurite',
        price: 110.50,
        quantity: 5
      }, {
        id : 2,
        productName: 'Blood Diamond',
        price: 110.50,
        quantity: 5        
      }]
    }, {
      customerName: 'Nicola Tesla',
      invoiceNmbr: 82468,
      totalPrice: 110.50,
      createdOn: 1397490980837,
      lineItems: [{
        productName: 'Azurite',
        price: 110.50,
        quantity: 5        
      }, {
        productName: 'Blood Diamond',
        price: 110.50,
        quantity: 5        
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
      productName: 'Blood Diamond',
      img: 'img/gem-02.gif',
      quantity: 1,
      price: 110.10
    }];

})();
