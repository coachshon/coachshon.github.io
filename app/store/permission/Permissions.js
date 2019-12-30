/**
 * Store for managing user permission data from database: PSIKCMOWNER\FE_DL_PERMISSION
 * A store is a collection of Model instances, usually loaded from a server that maintain a
 * set of added, updated and removed Model instances to be synchronized with the server via the Proxy. See the {@link
 * Ext.data.Store Store docs} for more information on Stores.
 * Proxy api urls set via App.store.Base CRUD properties: createPath; destroyPath; readPath; updatePath
 */
 Ext.define('App.store.permission.Permissions', {
     /**
     * @cfg {String} extend: The parent class that this class extends. 
     * By extending a class, we get all the goodness baked into the base class, but can easily extend/configure our custom extension however we need for our application.
     */
     extend: 'App.store.Base',
     alias: 'store.permissions',

     /**
     * @cfg {String}  model: Name of the Model associated with this store. The string is used as an argument for Ext.ModelManager.getModel.
     */
     model: 'App.model.permission.Permission',  
     /**
     * @cfg {String} createPath: proxy end point, the webservice which will perform the given create operation.
     */
    createPath: 'Default.aspx/CreatePermission',
     /**
     * @cfg {String} destroyPath: proxy end point, the webservice which will perform the given destroy operation.
     */
    destroyPath: 'Default.aspx/DestroyPermission',
     /**
     * @cfg {String} readPath: proxy end point, the webservice which will perform the given read operation.
     */
    readPath: 'Default.aspx/ReadPermission',
     /**
     * @cfg {String}  updatePath: proxy end point, the webservice which will perform the given update operation.
     */
    updatePath: 'Default.aspx/UpdatePermission',
     /**
     * Creates the store.
     * @param {Object} config (optional) Config object
     */
    constructor : function(config) {
       config = config || {}; 
       this.callParent([config]);
    }    
});