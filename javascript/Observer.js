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


/*
** Usage: **

import { Subject, Observer, extend } from './design-patterns/Observer';

// References to DOM elements
var controlCheckbox = document.getElementById( 'mainCheckbox' ),
    observerName = document.getElementById( 'newObserverName' ),
    addBtn = document.getElementById( 'addNewObserver' ),
    container = document.getElementById( 'observersContainer' );

container.style.marginTop = '20px';

// Concrete Subject

// Extend the controlling checkbox with the Subject class
extend( controlCheckbox, new Subject() );

// Clicking the checkbox will trigger notifications to its observers
controlCheckbox.onclick = function() {
    controlCheckbox.notify( controlCheckbox.checked );
};

addBtn.onclick = addNewObserver;

// Concrete Observer
function addNewObserver() {

    // Create a wrapper of the observer's content
    var wrapper = document.createElement( 'div' );
    wrapper.style.display = 'inline-block';
    wrapper.style.textAlign = 'center';
    wrapper.style.margin = '0 5px';

    // Create an element to hold the observer index
    var index = document.createElement( 'div' );

    // Create an element to hold the observer name
    var name = document.createElement( 'div' );
    name.style.display = 'block';
    name.style.margin = '5px auto';
    name.innerText = observerName.value;
    
    // Create a checkbox to be updated by the subject,
    // which is the Concrete Observer itself
    var observer = document.createElement( 'input' );
    observer.type = 'checkbox';
    observer.style.display = 'block';
    observer.style.margin = '5px auto';

    // Extend the observer with the Observer class
    extend( observer, new Observer( observerName.value ) );

    // Override with custom update behaviour
    observer.update = function( value ) {
        this.checked = value;
    }

    // Add the new observer to our list of observers
    // and assign its index
    controlCheckbox.addObserver( observer );
    index.innerHTML = controlCheckbox.getObserverIndex( observer );
    
    // Add callback function to remove the observer
    function removeObserver( observer ) {
        return function () {
            controlCheckbox.removeObserver( observer );
            container.removeChild( wrapper );
            var count = controlCheckbox.observers.count();
            for (var i = 0; i < count; i++) {
                container.childNodes[i].childNodes[0].innerText = i;
            }
        }
    }
    
    // Add button to remove the observer
    var removeBtn = document.createElement( 'button' );
    removeBtn.style.display = 'block';
    removeBtn.style.margin = '5px auto 0';
    removeBtn.innerText = 'Remove';
    removeBtn.onclick = removeObserver( observer );

    // Append the content to the observer's wrapper
    wrapper.appendChild( index );
    wrapper.appendChild( name );
    wrapper.appendChild( observer );
    wrapper.appendChild( removeBtn );

    // Append the observer to the container
    container.appendChild( wrapper );

    // Clean up the observer name input
    observerName.value = '';

}

*/
