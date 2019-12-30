Ext.define('App.view.uat.Wizard', {
    extend: 'Ext.form.Panel',
    xtype: [
        'uatwizard',
        'uatcreate',
        'uatedit'
    ],
    requires: [
    'App.view.uat.WizardController',
    'App.view.uat.WizardModel'
    ],
    controller: {
        type: 'uatwizard'
    },
    viewModel: {
        type: 'uatwizard'
    },
    
   /* bind: {
        title: '{record.phantom? "Add" : "Edit"} UAT' + App.locale.Language.uat.wizard.status[App.app.currentLocale]
    },*/

    cls: 'uat-create',    
    
    initialize: function () {       
        var me = this,
            record = (window.location.toString().toLowerCase().search('edit') != -1) ? true : false,
            title;

        if (record) {
            title = App.locale.Language.uat.wizard.record[App.app.currentLocale];
        } else {
            title = App.locale.Language.uat.wizard.phantom[App.app.currentLocale];
        }
        me.setTitle(title);
                
        me.setItems([{
            label: App.locale.Language.uat.wizard.status[App.app.currentLocale],
            xtype: 'combobox',
            // required: true,
            bind: {
                hidden: '{record.phantom}',
                value: '{record.STATUS}',
                store: '{status}'
            },
            displayField: 'TEXT',
            valueField: 'VALUE'
        }, {
            label: App.locale.Language.uat.wizard.issue[App.app.currentLocale],
            xtype: 'textfield',
            required: true,
            bind: '{record.ISSUE}'
        }, {
            label: App.locale.Language.uat.wizard.steps[App.app.currentLocale],
            xtype: 'textareafield',
            required: true,
            bind: '{record.STEPS}'
        }, {
            label: App.locale.Language.uat.wizard.comments[App.app.currentLocale],
            xtype: 'textareafield',
            required: true,
            bind: '{record.COMMENTS}'
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
            },'->', {
                text: App.locale.Language.buttons.save[App.app.currentLocale],
                handler: 'onTapSubmit',
                iconCls: 'x-fa fa-save'
            }]
        }]);

        me.callParent(arguments);
    },

   
    // [WORKAROUND] Ext.form.Panel override the setRecord and updateRecord methods in a way
    // that we can't use updateRecord to be notified when the record actually changes.
    setRecord: function (record) {      
        this.getViewModel().set('record', record);   
        
    }
});


