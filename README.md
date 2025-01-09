# Modal Utils
Repository to include my new library to handle bootstrap modals.

# THIS REPOSITORY IS RETIRED AS IT'S VERY OLD AND THERE ARE MANY BETTER WAY TO DO IT, THANK'S FOR ALL YOUR INTEREST, IT'S BEEN A NICE RIDE.

When you need more than 2 modals ate the same screen, it's HTML injection becomes painful to manage. Modal Utils create them "on the fly" an manages unique ids and dynamic buttons.

Example usage:
```javascript
    $.ModalUtils('warning', {
        modalLabel:'Atention!', 
        modalBody: 'Alert something! Do you wish to continue?',
        modal: false 
    });`
```    
