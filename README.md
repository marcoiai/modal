# Modal Utils
Repository to include my new library to handle bootstrap modals.

When you need more than 2 modals ate the same screen, it's HTML injection becomes painful to manage. Modal Utils create them "on the fly" an manages unique ids and dynamic buttons.

Example usage:
    $.ModalUtils('warning', {
        modalLabel:'Atention!', 
        modalBody: 'Alert something! Do you wish to continue?',
        modal: false 
    });
    
