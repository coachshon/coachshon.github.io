/**
 * Store for User Acceptance Testing
 */
 Ext.define('App.store.uat.UATs', {
     /**
     * @cfg {String} extend: The parent class that this class extends. 
     * By extending a class, we get all the goodness baked into the base class, but can easily extend/configure our custom extension however we need for our application.
     */
     extend: 'App.store.Base',
     alias: 'store.uats',

     /**
     * @cfg {String}  model: Name of the Model associated with this store. The string is used as an argument for Ext.ModelManager.getModel.
     */
     model: 'App.model.uat.UAT',  
     /**
     * @cfg {String} createPath: proxy end point, the webservice which will perform the given create operation.
     */
    createPath: 'Default.aspx/CreateUAT',
     /**
     * @cfg {String} destroyPath: proxy end point, the webservice which will perform the given destroy operation.
     */
    destroyPath: 'Default.aspx/DestroyUAT',
     /**
     * @cfg {String} readPath: proxy end point, the webservice which will perform the given read operation.
     */
    readPath: 'Default.aspx/ReadUAT',
     /**
     * @cfg {String}  updatePath: proxy end point, the webservice which will perform the given update operation.
     */
    updatePath: 'Default.aspx/UpdateUAT',
     /**
     * Creates the store.
     * @param {Object} config (optional) Config object
     */
    constructor : function(config) {
       config = config || {}; 
       this.callParent([config]);
    }    
});