/**
 * Store for session user's information/roles used for UX hide/show
 * A store is a collection of Model instances, usually loaded from a server that maintain a
 * set of added, updated and removed Model instances to be synchronized with the server via the Proxy. See the {@link
 * Ext.data.Store Store docs} for more information on Stores.
 * Proxy api urls set via App.store.Base CRUD properties: createPath; destroyPath; readPath; updatePath
 */
 Ext.define('App.store.permission.User', {
     /**
     * @cfg {String} extend: The parent class that this class extends. 
     * By extending a class, we get all the goodness baked into the base class, but can easily extend/configure our custom extension however we need for our application.
     */
     extend: 'App.store.Base',
     alias: 'store.permission-user',
     fields: [
        { name: 'LOGIN_ID' }
     ],
     /**
     * @cfg {String} readPath: proxy end point, the webservice which will perform the given read operation.
     */
    readPath: 'Default.aspx/ReadPermissionUser',
     /**
     * Creates the store.
     * @param {Object} config (optional) Config object
     */
    constructor : function(config) {
       config = config || {}; 
       this.callParent([config]);
    }    
});