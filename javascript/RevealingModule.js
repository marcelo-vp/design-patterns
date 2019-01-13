/**
 * Revealing Module Pattern
*/

var Greetings = (function() {

    var privateVar = 'Some name',
        publicVar = 'Hey there!';

    function privateGetName() {
        return 'The name is: ' + privateVar;
    }
    function publicGetName() {
        return privateGetName();
    }
    function publicSetName(name) {
        privateVar = name;
    }

    return {
        setName: publicSetName,
        greeting: publicVar,
        getName: publicGetName
    };

})();

var Counter = (function() {

    var privateCounter = 0;

    function privateIncrement() {
        privateCounter++;
    }
    function publicIncrement() {
        privateIncrement();
    }
    function publicGetCount() {
        return privateCounter;
    }
    function publicStart() {
        publicIncrement();
    }

    return {
        start: publicStart,
        increment: publicIncrement,
        getCount: publicGetCount
    };

})()

export { Greetings, Counter };

/*
** Usage: **

import { Greetings } from './design-patterns/RevealingModule';

Greetings.greeting          // Returns 'Hey there!'
Greetings.setName('Joe');
Greetings.getName();        // Returns 'The name is: Joe'
Greetings.publicGetName();  // Throws a type error, because there is
                            // no such function on the returning object
Greetings.publicVar         // Returns undefined

*/
