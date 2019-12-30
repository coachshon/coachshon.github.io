Ext.define('App.model.filter.Filter', {
    extend: 'Ext.data.Model',

    idProperty: 'value',

    fields: [
        { name: 'value', type: 'string' },
        { name: 'label', type: 'string' },
        { name: 'count', type: 'int' }
    ]
});
