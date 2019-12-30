/**
* @Ext.ux.data.proxy.AjaxASP
* @extends Ext.data.AjaxProxy
* This class configured for ASP.NET server-side data deliver.  
* Post data params is replaced with a jsonData by overriding the buildRequest method.
**/

Ext.define('App.data.proxy.AjaxASP', {
     /**
     * @cfg {String} extend: The parent class that this class extends. 
     * By extending a class, we get all the goodness baked into the base class, but can easily extend/configure our custom extension however we need for our application.
     */
    extend: 'Ext.data.proxy.Ajax',
     /**
     * @cfg {String} alias: short alias for this class name. Alias allows us to define a custom xtype for this component, which we can use as a shortcut
     * for adding this component as a child of another component.
     */
    alias: 'proxy.ajaxASP',
    $configStrict: false,
      /**
     * Creates the Proxy
     * @param {Object} config (optional) Config object.
     */
    constructor: function (config) {
        App.data.proxy.AjaxASP.superclass.constructor.apply(this, arguments);         
     /**
     * @property {Object} actionMethods
     * Mapping of action name to HTTP request method. In the basic AjaxProxy these are set to 'GET' for 'read' actions
     * and 'POST' for 'create', 'update' and 'destroy' actions. 
     */
        this.actionMethods.read = 'POST';
     /**
     * @cfg {Number} timeout
     * The number of milliseconds to wait for a response. Defaults to 3 600 000 milliseconds (3600 seconds, 60 minutes).
     */        
        this.timeout = 36000000;
    },
    /**
     * Creates and returns an Ext.data.Request object based on the options passed by the {@link Ext.data.Store Store}
     * to which this Proxy is attached.  For ASP.NET communications, the data params is replaced with an empty jsonData.
     * @param {Ext.data.Operation} operation The {@link Ext.data.Operation Operation} object to execute
     * @return {Ext.data.Request} The request object
     */
    buildRequest: function(operation) {   
        var request = this.callParent(arguments);     

          switch (operation.action){
              case 'read':
                  if (operation.jsonData) {
                      request._jsonData = operation.jsonData;   // send empty jsonData to .NET webservice
                  } else {
                      request._jsonData = {};   // send empty jsonData to .NET webservice
                  }              
             break;   
        }
        //***ADD THE LOGIN ID TO EACH QUERY
          request._params.NTID = App.app.loggedInUser.NTID;
        //***
        return request; 
    }
});
