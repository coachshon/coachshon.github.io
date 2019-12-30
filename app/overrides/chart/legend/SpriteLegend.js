Ext.define('App.overrides.chart.legend.SpriteLegend', {
    override: 'Ext.chart.legend.SpriteLegend',

    isXType: function (xtype) {
        return xtype === 'sprite';
    },

    getItemId: function () {
        return this.getId();
    },

    updateSprite: function (sprite, record) {
        var data = record.data,
            chart = this.getChart(),
            series = chart.get(data.series),
            marker, label, markerConfig;
        if (sprite) {
            try{
                label = sprite.getLabel();
                label.setAttributes({
                    text: data.name
                });
                sprite.setAttributes({
                    enabled: !data.disabled
                });
                sprite.setConfig({
                    series: data.series,
                    record: record
                });
                markerConfig = series.getMarkerStyleByIndex(data.index);
                markerConfig.fillStyle = data.mark;
                markerConfig.hidden = false;
                Ext.apply(markerConfig, this.getMarker());
                marker = sprite.getMarker();
                marker.setAttributes({
                    fillStyle: markerConfig.fillStyle,
                    strokeStyle: markerConfig.strokeStyle
                });
                sprite.layoutUpdater(sprite.attr);
            } catch (e) {
                return false;
            }
        }
    }
});
