// __tests__/vending-machine.spec.js
// import {vendingMachine} from '../lib/vending-machine.js'
const vendingMachine = require('../lib/vending-machine.js');
const machine = new vendingMachine();
// describe('Vending Machine ', () => {

  describe('Print vending machine inventory', () => {
    it('should return all inventories', () => {
      expect(machine.checkStock()).toEqual(
        [ { candy: 0 }, { chips: 2 }, { chocolate: 1 }, { cookie: 0 } ]);
    });
  });

  describe('When re-stock a sigle item', () => {
    it('should update the qty of the item', () => {
      const updateItem = {name: 'candy', qty: 10}
      expect(machine.restock(updateItem)).toEqual(
        { name: 'candy', qty: 10, price: 1.8 });
    });
  });

  describe('Adding new products', () => {
    it('should return all inventories including newly added items', () => {
      newItems = [
        {name: "m&m's", qty: 10, price: 2.5},
        {name: "KitKat", qty: 10, price: 1.5}
      ]
      expect(machine.addStock(newItems)).toEqual(
        [ { name: 'candy', qty: 10, price: 1.8 },
          { name: 'chips', qty: 2, price: 2.9 },
          { name: 'chocolate', qty: 1, price: 1.6 },
          { name: 'cookie', qty: 0, price: 1.2 },
          [ { name: 'm&m\'s', qty: 10, price: 2.5 },
          { name: 'KitKat', qty: 10, price: 1.5 } 
        ] ]);
    });
  });

  describe('Check if anything is out of stock', () => {
    it('should return the item(s) that are out of stock', () => {
      expect(machine.getSoldOutItems()).toEqual(["cookie"]);
    });
  });

  describe('When insert different number of coins', () => {
    it('should return the total amount', () => {
      //put in the number of coins. 
      //arg order ("nickel", "dime","quarter","loonie","toonie")
      const coins = [1,1,1,1,1]
      expect(machine.getTotalAmount(coins)).toEqual(3.4);
    });
  });

  describe('Re-supply coins for the vending machine', () => {
    it('should return the total number of each coin', () => {
      //put in the number of coins. 
      //arg order ("nickel", "dime","quarter","loonie","toonie")
      const coins = [1,1,1,1,1]
      expect(machine.reSupplyCoin(coins)).toEqual(
        [ { nickel: 3 }, { dime: 1 }, { quarter: 3 }, { loonie: 1 }, { toonie: 3 }]);
      });
    });

  describe('Dispense inventory based on payment', () => {
    it('should dispense the product and changes in min. number of coins', () => {
      //put in the number of coins. 
      //arg order ("nickel", "dime","quarter","loonie","toonie", "product")
      const action = [0,0,0,0,2,'chips']
      expect(machine.buyingProduct(action)).toEqual(
        [ 'chips', [ { loonie: '1' }, { dime: '1' } ] ]);
      });
    });

    describe('refund the money when selected item is out of stock', () => {
      it('should dispense the total back and display out of stock', () => {
        //put in the number of coins. 
        //arg order ("nickel", "dime","quarter","loonie","toonie", "product")
        const action = [0,1,2,2,0,'cookie']
        expect(machine.buyingProduct(action)).toEqual(
          [ { cookie: 'out of stock' },
            [ { dime: 1 }, { quarter: 2 }, { loonie: 2 } ] ]);
        });
      });  

    describe('when insert the corect amount of coins', () => {
      it('should dispense the product with no change given', () => {
        //put in the number of coins. 
        //arg order ("nickel", "dime","quarter","loonie","toonie", "product")
        const action = [2,0,2,1,0,'chocolate']
        expect(machine.buyingProduct(action)).toEqual(
          [ 'chocolate', [] ]);
        });
      });  

      describe('when an item is bought', () => {
        it('the qty of that item should be decreased by 1', () => {
          //put in the number of coins. 
          //arg order ("nickel", "dime","quarter","loonie","toonie", "product")
          const action = [2,0,2,1,0,'chips']
          expect(machine.displayQty(action)).toEqual(
            1);
          });
        });  
      
// });

// restock needed
// button will not functional when product is getting out
// price will be dispaly when pressing the button
// cancel button. refund the money
// sold out display sold out for specific items
// out of stock when display not in service
//  not in serivce will not accept money
// when the machine is jammed, refund money, call for sercive
// calcute coin inserted and display totoal
// not enough fund