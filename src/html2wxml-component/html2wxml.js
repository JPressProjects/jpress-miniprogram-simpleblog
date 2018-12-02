var jpress = require('../utils/jpress.js');
var html2wxml = require('html2wxml-main.js');

Component({
    data: {},
    options: {
        addGlobalClass: true
    },
    properties: {
        text: {
            type: String,
            value: null,
            observer: function(newVal, oldVal) {
                if (newVal == '') return;

                if (this.data.type == 'html' || this.data.type == 'markdown' || this.data.type == 'md') {
                    var paras = {
                        type: this.data.type,
                        highlight: this.data.highlight,
                        linenums: this.data.linenums
                    };

                    if (this.data.imghost != null) {
                        paras.imghost = this.data.imghost;
                    }else{
                      paras.imghost = jpress.config.host;
                    }

                    wx.request({
                      url: jpress.getUrl("/commons/html2wxml", paras),
                      data: { html: this.data.text},
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: res => {
                            html2wxml.html2wxml(res.data, this, this.data.padding);
                        }
                    })
                }
            }
        },
        json: {
            type: Object,
            value: {},
            observer: function(newVal, oldVal) {
                html2wxml.html2wxml(this.data.json, this, this.data.padding);
            }
        },
        type: {
            type: String,
            value: 'html'
        },
        highlight: {
            type: Boolean,
            value: true,
        },
        highlightStyle: {
            type: String,
            value: 'darcula'
        },
        linenums: {
            type: Boolean,
            value: true,
        },
        padding: {
            type: Number,
            value: 5
        },
        imghost: {
            type: String,
            value: null
        },
        showLoading: {
            type: Boolean,
            value: true
        }
    },
    methods: {
        wxmlTagATap: function(e) {
            this.triggerEvent('WxmlTagATap', {
                src: e.currentTarget.dataset.src
            });
        }
    },
    attached: function() {}
})