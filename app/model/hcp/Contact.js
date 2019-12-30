/**
 * Model representing a HCP object
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
Ext.define('App.model.hcp.Contact', {
    extend: 'Ext.data.Model',
    idProperty: 'CUST_KEY',  //used in redirectTo function
    fields: [
         { name: 'ACCT_KEY', type: 'int' },
         { name: 'NAME_DISPLAY' },
         { name: 'ADDRESS' },
         { name: 'ADDRESS_FULL' },
         { name: 'BRAND_CODE'},        
         { name: 'CUST_KEY', type: 'int' },
         { name: 'NAME_DISPLAY' },
         { name: 'CITY' },
         { name: 'HIER_LEVEL_CODE' },         
         { name: 'PHONE'},
         { name: 'POSTALCODE'},
         { name: 'PROVINCE'},
         { name: 'SPECIALTY'},
         { name: 'TRX_MAT_MKT_RANK_CODE'},
         { name: 'TRX_MAT_PRD_RANK_CODE' }
    ]
});
