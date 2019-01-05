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
