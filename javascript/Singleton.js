/**
 * Singleton Pattern
*/

var basicSingleton = (function() {
    
    var instance;

    function init() {
        var privateVariable = 'I am private.';
        var privateRandomNumber = Math.random();

        function privateMethod() {
            console.log( 'I am also private!' );
        }

        return {
            publicMethod: function() {
                console.log( 'I am public, so you can see me!' );
            },
            publicProperty: 'I am a public property',
            getPrivateNumber: function() {
                return privateRandomNumber;
            }
        };
    }

    // Returns a Revealing Module pattern
    // as the Singleton instance
    return {
        getInstance: function() {
            if ( !instance ) {
                instance = init();
            }

            return instance;
        }
    };

})();

var SingletonTester = (function() {

    function Singleton( options ) {

        var options = options || {};

        this.name = 'SingletonTester';
        this.pointX = options.pointX || 6;
        this.pointY = options.pointY || 10;

    }

    var instance;

    var _static = {

        name: 'SingletonTester',

        getInstance: function( options ) {

            if ( instance === undefined ) {
                instance = new Singleton( options );
            }

            return instance;
        }

    }

    // Returns an instance of the 'Singleton' Constructor patern
    return _static;

})();

export { basicSingleton, SingletonTester };

/*
** Usage: **

import { basicSingleton, SingletonTester } from './design-patterns/Singleton';

var singletonOne = basicSingleton.getInstance();
var singletonTwo = basicSingleton.getInstance();
var privateNumberOne = singletonOne.getPrivateNumber();
var privateNumberTwo = singletonTwo.getPrivateNumber();

console.log( privateNumberOne === privateNumberTwo );
// Returns true, because both 'singletonOne' and
// 'singletonTwo' hold the same Singleton instance

var singletonTestOne = SingletonTester.getInstance({
    pointX: 4,
    pointY: 25
});
var singletonTestTwo = SingletonTester.getInstance();

console.log( singletonTestOne.name );   // returns 'SingletonTester'
console.log( singletonTestOne.pointX );     // returns 4
console.log( singletonTestOne.pointX === singletonTestTwo.pointX );  // returns true
console.log( singletonTestOne.pointY );     // returns 25
console.log( singletonTestOne.pointY === singletonTestTwo.pointY );  // returns true

// The comparisons between property values return 'true' because singletonTestTwo
// holds the same Singleton instance of singletonTestOne.
// Therefore the Singleton pattern served its purpose.

*/
