/**
 * Base {@link Ext.data.Store} from which all other application stores will extend.
 *
 * A store is a collection of Model instances, usually loaded from a server that maintain a
 * set of added, updated and removed Model instances to be synchronized with the server via the Proxy. See the {@link
 * Ext.data.Store Store docs} for more information on Stores.
 *
 * Why Base? As you develop your application, you'll probably come across a lot of areas where you repeat the same code over and over within components. 
 * If we create a base class from which all other like components inherit, we can add any common methods that are applicable to all components extended from Base.js. 
 * Even if not used right away, starting with a Base component will possibly save refactoring time in the future.
 * This Base class defines the store proxy and ajax request failure event and message display.
 */
Ext.define('App.store.Base', {
    extend: 'Ext.data.Store',
    alias: 'store.base',
    requires: [
        'App.data.proxy.AjaxASP'
    ],    
    autoLoad: false,
    autoSync: false,
     /**
     * @cfg {String} createPath: proxy end point, the webservice which will perform the given create operation.
     */
    createPath: null,
     /**
     * @cfg {String} destroyPath: proxy end point, the webservice which will perform the given destroy operation.
     */
    destroyPath: null,
     /**
     * @cfg {String} readPath: proxy end point, the webservice which will perform the given read operation.
     */
    readPath: null,
     /**
     * @cfg {String}  updatePath: proxy end point, the webservice which will perform the given update operation.
     */
    updatePath: null,
     /**
     * @cfg {Object} extraParams: A single item, or an array of proxy parameters that will be included on every request.
     */   
    extraParamsObj: {},
     /**
     * Creates the store.
     * @param {Object} config (optional) Config object
     */
    constructor: function (cfg) {
        var me = this;

        cfg = cfg || {};
        me.callParent([Ext.apply({
             //remoteFilter: false,  //If true, we'll do all our filtering via SQL/or other server-side mechanism-a must if our result set is "paged"
             //remoteSort: If true, we'll do all our sorting via SQL/or other server-side mechanism-a must if our result set is "paged"
             //remoteGroup: true,
            proxy: {
                type: 'ajaxASP',
                api: {
                   create: me.createPath,
                   destroy: me.destroyPath,
                   read: me.readPath,
                   update: me.updatePath
                },            
                extraParams: me.extraParamsObj,
                reader: {   // reader config is key to have .sync update the grid with request response data
                    type: 'json',
                    rootProperty: 'd',
                    idProperty: 'id'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true,
                    rootProperty: 'data',
                    allowSingle: false   // **********enforce an array post**********
                },
                listeners: {
                    exception: function (proxy, response, operation) {
                     //  debugger;
               
                     if (response.status == 0) {
                         ///debugger;
                        
                     }else{
                     if (!response.aborted) {
                             // get the error message
                             var obj = { Message: operation.getError().statusText };  // operation.error.statusText,
                             var json = JSON.parse(response.responseText);
                             var msg;
                             if (json.hasOwnProperty('d')) {  // asp.net will return json format as {"d":""} - for security purposes 
                                 msg = json.d;
                             } else if (json.hasOwnProperty('Message')) {  // asp.net Oracle error json format
                                 msg = json.Message;
                             }
                             if (typeof msg === 'string') {
                                 obj.Message = obj.Message + ": " + msg;
                             }
                             if (Array.isArray(msg)) {
                                 obj.Message = msg.slice(-1)[0].ERROR_MSG;  // get the error message

                             }
                           // debugger;
                             
                            
                         }
                     }
                    }  // eo exception
                }  // eo listeners proxy                
            }
        }, cfg)]);
    }

});

