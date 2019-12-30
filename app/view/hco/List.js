
Ext.define('App.view.hco.List', {
    extend: 'App.view.widgets.List',
    xtype: 'hco.List',
    bind: '{hcos}',
    itemTpl: [
       '<div class="item-details">',
           '<div class="item-title">{NAME_DISPLAY}</div>',
           '<div class="item-caption">{EXTENDED_CATEGORY}</div>',
           '<div class="item-caption">{ADDRESS}</div>',
           '<div class="item-caption">{CITY}, {PROVINCE}</div>',
            '<tpl if="OUTPUT_VALUE">',
                   '<div class="item-caption-filter">{OUTPUT_LABEL} {OUTPUT_VALUE}</div>',
             '</tpl>',
       '</div>'
       /*,
       '<div class="item-stats">{AFFL_CUST_COUNT:plural("affiliate")}</div>'*/
    ]
});