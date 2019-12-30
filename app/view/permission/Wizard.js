Ext.define('App.view.permission.Wizard', {
    extend: 'Ext.form.Panel',
    xtype: [
        'permissionwizard',
        'permissioncreate',
        'permissionedit'
    ],
    requires: [
    'App.view.permission.WizardController',
    'App.view.permission.WizardModel'
    ],
    controller: {
        type: 'permissionwizard'
    },
    viewModel: {
        type: 'permissionwizard'
    },
    
   /* bind: {
        title: '{record.phantom? "Add" : "Edit"} Permission'
    },*/

    cls: 'permission-create',
    
    initialize: function () {
        var me = this,
            record = (window.location.toString().toLowerCase().search('edit') != -1) ? true: false,
            title;
       
        if (record) {
            title = App.locale.Language.permissions.wizard.record[App.app.currentLocale];
        }else{
            title = App.locale.Language.permissions.wizard.phantom[App.app.currentLocale];
        }
        me.setTitle(title);

        me.setItems([{
            label: App.locale.Language.permissions.wizard.ntid[App.app.currentLocale],
            xtype: 'textfield',
            // required: true,
            bind: '{record.LOGIN_ID}'
        }, {
            label: App.locale.Language.permissions.wizard.email[App.app.currentLocale],
            xtype: 'textfield',
            bind: '{record.EMAIL}'
        }, {
            label: App.locale.Language.permissions.wizard.group[App.app.currentLocale],
            xtype: 'combobox',
            // required: true,
            bind: {
                value: '{record.GROUP_ID}',
                store: '{groups}'
            },
            displayField: 'TEXT',
            valueField: 'VALUE'
        }, {
            xtype: 'toolbar',
            ui: 'tools',
            docked: 'bottom',
            layout: {
                pack: 'end'
            },
            defaults: {
                ui: 'flat dark large'
            },
            items: [{
                text: App.locale.Language.buttons.destroy[App.app.currentLocale],
                handler: 'onTapDelete',
                iconCls: 'x-fa fa-times-circle',
                bind: {
                    hidden: '{record.phantom}'
                }
            }, '->', {
                text: App.locale.Language.buttons.save[App.app.currentLocale],
                handler: 'onTapSubmit',
                iconCls: 'x-fa fa-save'
            }]
        }]);
        me.callParent();
    },

   
    // [WORKAROUND] Ext.form.Panel override the setRecord and updateRecord methods in a way
    // that we can't use updateRecord to be notified when the record actually changes.
    setRecord: function (record) {      
        this.getViewModel().set('record', record);   
        
    }
});

