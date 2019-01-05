/**
 * Module Pattern
*/

var Counter = (function() {

    var counter = 0;

    return {
        increment: function() {
            return counter++;
        },
        reset: function() {
            console.log( 'Counter value prior to reset: ' + counter );
            counter = 0;
            return counter;
        }
    };

})();

var Basket = (function() {

    var basket = [];

    return {
        addItem: function( item ) {
            basket.push(item);
        },
        getItemCount: function() {
            return basket.length;
        },
        getTotal: function() {
            var count = this.getItemCount(),
                total = 0;
            
            while (count--) {
                total += basket[count].price;
            }
            return total;
        }
    };

})();

export { Counter, Basket };
