Ext.define('App.store.glance.Brands', {
    extend: 'App.store.Base',
    alias: 'store.glance-brands',
    /**
    * @cfg {String} readPath: proxy end point, the webservice which will perform the given read operation.
    */
    readPath: 'Default.aspx/ReadGlanceBrand',
    /**
    * Creates the store.
    * @param {Object} config (optional) Config object
    */
    constructor: function (config) {
        config = config || {};
        this.callParent([config]);
    }
});
  

