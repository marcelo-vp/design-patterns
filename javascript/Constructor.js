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
