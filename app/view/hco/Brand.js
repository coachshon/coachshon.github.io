Ext.define('App.view.hco.Brand', {
    extend:'App.view.widgets.Brand',
    xtype: 'hco-brand',

    initialize: function () {
        var me = this;
        
        me.setTitle(App.locale.Language.contacts.brands.title[App.app.currentLocale]);
                
        me.setItems([{
            xtype: 'dataview',
            bind: '{brands}',
            ui: 'details',
            minHeight: 80,
            itemTpl: [
                '<div class="item_title {BRAND_CODE}">{BRAND_CODE}</div>',
                    '<div class="show-container">',
                      '<div class="show-item">',
                         '<div>' + App.locale.Language.accounts.brands.template.sales[App.app.currentLocale] + '{SALES_YTD}</div>',
                         '<div>' + App.locale.Language.accounts.brands.template.growth[App.app.currentLocale] + '{SALES_YTD_GROWTH}</div>',
                      '</div>',
                      '<div class="show-item">',
                         '<div>' + App.locale.Language.accounts.brands.template.calls[App.app.currentLocale] + '{CALLS_YTD}</div>',
                         '<div>' + App.locale.Language.accounts.brands.template.callsplan[App.app.currentLocale] + '{PLANNED_CALLS}</div>',
                         '<div>' + App.locale.Language.accounts.brands.template.seen[App.app.currentLocale] + '{LAST_SEEN_DATE}</div>',
                      '</div>',
                    '</div>'                
            ]
        }]);

        me.callParent(arguments);
    }
});