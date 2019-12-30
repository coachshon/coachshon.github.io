/*
there will be error in my console after upgrade to ext6.5. Is anyone know how to solve this ?:

in the Deferred.js:

getCachedRejected: function() {
if (!rejected) {
// Prevent Cmd from requiring
rejected = Ext.Promise.reject();//Uncaught (in promise)
}
return rejected;
}

If this is coming from a route rejection, override would be:
*/

Ext.define('App.overrides.route.Route', {
    override: 'Ext.route.Route',

    compatibility: '7.0.0.158',

    execute: function (token, argConfig) {
        var promise = this.callParent([token, argConfig]);

        return promise
            ['catch'](Ext.bind(this.onRouteReject, this));
    },

    onRouteReject: function () {
        Ext.fireEvent('routereject', this);
    }
});