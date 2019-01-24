/**
 * Observer Pattern
 */


// The list of Observers
function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.add = function( obj ) {
    return this.observerList.push( obj );
};

ObserverList.prototype.count = function() {
    return this.observerList.length;
};

ObserverList.prototype.get = function ( index ) {
    if ( index > -1 && index < this.observerList.length ) {
        return this.observerList[index];
    }
};

ObserverList.prototype.indexOf = function( obj, startIndex ) {
    var i = startIndex;

    while ( i < this.observerList.length ) {
        if ( this.observerList[i] === obj ) {
            return i;
        }
        i++;
    }

    return -1;
};

ObserverList.prototype.removeAt = function ( index ) {
    this.observerList.splice( index, 1 );
};

// The Subject
function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.addObserver = function( observer ) {
    this.observers.add( observer );
};

Subject.prototype.getObserverIndex = function( observer ) {
    return this.observers.indexOf( observer, 0 );
}

Subject.prototype.removeObserver = function( observer ) {
    this.observers.removeAt( this.getObserverIndex( observer ) );
};

Subject.prototype.notify = function( context ) {
    var observerCount = this.observers.count();

    for ( var i = 0; i < observerCount; i++ ) {
        this.observers.get( i ).update( context );
    }
};

// The Observer
function Observer( name ) {
    this.name = name;
    this.update = function() {
        // To be customized by each observer..
    };
}

// Extend an object with an extension
function extend( obj, extension ) {
    for ( var key in extension ) {
        obj[key] = extension[key];
    }
}

export { Subject, Observer, extend };
