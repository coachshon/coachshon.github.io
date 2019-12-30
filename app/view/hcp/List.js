
Ext.define('App.view.hcp.List', {
    extend: 'App.view.widgets.List',
    xtype: 'hcp.List',
    bind: '{hcps}',
    itemTpl: [
        '<div class="item-details">',
            '<div class="item-title">{NAME_DISPLAY}</div> ',
            '<div class="item-caption">{SPECIALTY}</div>',
            '<div class="item-caption">{ACCT_NAME_DISPLAY}</div>',
            '<div class="item-caption">{ADDRESS}</div>',
            '<div class="item-caption">{CITY}, {PROVINCE}</div>',
            '<tpl if="OUTPUT_VALUE">',
                   '<div class="item-caption-filter">{OUTPUT_LABEL} {OUTPUT_VALUE}</div>',
             '</tpl>',
        '</div>'
    ]
});
