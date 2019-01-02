/**
 * Module Pattern
*/

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

export default Basket;
