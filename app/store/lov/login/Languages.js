/**
 * Group types
 */
Ext.define('App.store.lov.login.Languages', {
      /**
     * @cfg {String} extend: The parent class that this class extends. 
     * By extending a class, we get all the goodness baked into the base class, but can easily extend/configure our custom extension however we need for our application.
     */
    extend: 'Ext.data.Store',
    alias: 'store.languages',
     /**
     * @cfg {String}  model: Name of the Model associated with this store. The string is used as an argument for Ext.ModelManager.getModel.
     */
    model: 'App.model.lov.LOV',   
    data: [
            {
                TEXT: 'ENGLISH',
                VALUE: 'en'
            },
            {
                TEXT: 'FRAN\u00C7AIS',  // https://www.compart.com/en/unicode
                VALUE: 'fr'
            }
    ]
});

