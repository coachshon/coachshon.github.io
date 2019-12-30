/**
 * Summary metrics
 */
Ext.define('App.store.glance.Sales', {

    extend: 'App.store.Base',
    alias: 'store.glance-sales',
    /**
    * @cfg {String} readPath: proxy end point, the webservice which will perform the given read operation.
    */
    readPath: 'Default.aspx/ReadGlanceSales',
    /**
    * Creates the store.
    * @param {Object} config (optional) Config object
    */
    constructor: function (config) {
        config = config || {};
        this.callParent([config]);
    }
});


