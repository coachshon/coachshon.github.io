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
Ext.define('App.model.uat.UAT', {
    extend: 'Ext.data.Model',
    idProperty: 'RECORD_ID',
    fields: [
            { name: 'RECORD_ID' },
            { name: 'ISSUE' },        
            { name: 'COMMENTS' },
            { name: 'CREATION_USER' },
            { name: 'STATUS' },
            { name: 'STEPS' }
    ]
});
