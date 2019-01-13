/**
 * Constructor Pattern
 * 
 * @param {string} model 
 * @param {number} year 
 * @param {number} kilometers 
*/

function Car( model, year, kilometers ) {
    this.model = model;
    this.year = year;
    this.kilometers = kilometers;
}

Car.prototype.toString = function() {
    return this.model + ' has done ' + this.kilometers + ' kilometers';
};
Car.prototype.showYear = function() {
    return 'This car was built in ' + this.year;
};

export default Car;

/*
** Usage: **

import Car from './design-patterns/Constructor';
var Gol = new Car('gol', 2019, 6000);

Gol.toString();     // Returns: 'gol has done 6000 kilometers'
Gol.showYear();     // Returns: 'This car was built in 2019'

*/
