/**
 * Summary metrics
 */
Ext.define('App.store.glance.Metrics', {

    extend: 'App.store.Base',
    alias: 'store.glance-metrics',
    /**
    * @cfg {String} readPath: proxy end point, the webservice which will perform the given read operation.
    */
    readPath: 'Default.aspx/ReadGlanceMetrics',
    /**
    * Creates the store.
    * @param {Object} config (optional) Config object
    */
    constructor: function (config) {
        config = config || {};
        this.callParent([config]);
    }
});


