/**
 * Model representing an tool user object
 * A Model represents some object that your application manages. Models are registered via the
 * {@link Ext.ModelManager model manager}, and are used by {@link Ext.data.Store stores}, which are in turn used by many
 * of the data-bound components in Ext.
 *
 * Models are defined as a set of fields and any arbitrary methods and properties relevant to the model. 
 * Models have built-in support for validations, which are executed against the validator functions in {@link
 * Ext.data.validations} ({@link Ext.data.validations see all validation functions}). 
 * The validations can be run by simply calling the {@link #validate} function, which returns a {@link Ext.data.Errors}
 * object:
 * Models can also be updated and destroyed easily:
 * It is very common to want to load a set of Model instances to be displayed and manipulated in the UI. We do this by
 * creating a {@link Ext.data.Store Store}:
 * See the {@link
 * Ext.data.Model Model docs} for more information on Models.
 */
Ext.define('App.model.permission.Permission', {
    extend: 'Ext.data.Model',
    idProperty: 'FI_GUI_KEY',
    sorters: [{
        property: 'LOGIN_ID',
        direction: 'ASC'
    }],
    fields: [
            { name: 'EMAIL' },
            { name: 'FI_GUI_KEY' },
            { name: 'GROUP_ID' },
            {
                name: 'GROUP_NAME',
                convert: function (val, record) {
                    //  return record.get('GROUP_ID');
                    var myStore = Ext.getStore('lov.permission.Groups'),
                            val = record.get('GROUP_ID');                    
                    if(val){
                        var index = myStore.findExact('VALUE', val.toString());
                        if (index != -1) {
                            rs = myStore.getAt(index).data;
                            return rs.TEXT;
                        } else {
                            return val;
                        }
                    }                          
                },
                depends: 'GROUP_ID'
            },/*
            {
                name: 'GROUP_ID_DESC', convert: function (v, model) {
                    var myStore = Ext.getStore('lov.permission.Groups'),
                            val = model.get('GROUP_ID'),
                            index = myStore.findExact('VALUE', val.toString());
                    if (index != -1) {
                        rs = myStore.getAt(index).data;
                        return rs.TEXT;
                    } else {
                        return val;
                    }
                }
            },*/
            { name: 'LOGIN_ID' }
    ]
});
