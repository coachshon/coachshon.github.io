Ext.define('App.view.hcp.Brand', {
    extend:'App.view.widgets.Brand',
    xtype: 'hcp-brand',

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
                        '<div>' + App.locale.Language.contacts.brands.template.calls[App.app.currentLocale] + '{CALLS_YTD}</div>',
                        '<div>' + App.locale.Language.contacts.brands.template.callsplan[App.app.currentLocale] + '{PLANNED_CALLS}</div>',
                        '<div>' + App.locale.Language.contacts.brands.template.segmentcode[App.app.currentLocale] + '{SEGMENT_CODE}</div>',
                        '<div>' + App.locale.Language.contacts.brands.template.enrollment[App.app.currentLocale] + '{PSP_ENROL_YTD}</div>',
                    '</div>',
                     '<div class="show-item">',
                        '<div>' + App.locale.Language.contacts.brands.template.decileproduct[App.app.currentLocale] + '{TRX_MAT_PRD_RANK_CODE}</div>',
                        '<div>' + App.locale.Language.contacts.brands.template.decilemarket[App.app.currentLocale] + '{TRX_MAT_MKT_RANK_CODE}</div>',
                        '<div>' + App.locale.Language.contacts.brands.template.seen[App.app.currentLocale] + '{LAST_SEEN_DATE}</div>',
                     '</div>',
                   '</div>'                
            ]
        }]);

        me.callParent(arguments);
    }

});
