Ext.define('App.store.hcp.Brands', {
    /**
      * @cfg {String} extend: The parent class that this class extends. 
      * By extending a class, we get all the goodness baked into the base class, but can easily extend/configure our custom extension however we need for our application.
      */
    extend: 'App.store.Base',
    alias: 'store.hcp-brands',
    /**
    * @cfg {String}  model: Name of the Model associated with this store. The string is used as an argument for Ext.ModelManager.getModel.
    */
    // model: '',

    /**
    * @cfg {String} readPath: proxy end point, the webservice which will perform the given read operation.
    */
    readPath: 'Default.aspx/ReadContactBrand',
    /**
    * Creates the store.
    * @param {Object} config (optional) Config object
    */
    constructor: function (config) {
        config = config || {};
        this.callParent([config]);
    }
});