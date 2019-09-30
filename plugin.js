/*
* Original plugin here https://amystechnotes.com/2015/05/06/tinymce-add-character-count/
* Added some changes and adaptive for MODx plugin TinyMCE RTE
*/

tinymce.PluginManager.add('charCounter', function (editor) {
    var _self = this;

    function update() {
        editor.theme.panel.find('#charCounter').text(['Символов: {0}', _self.getCount()]);
    }

    editor.on('init', function () {
        var statusbar = editor.theme.panel && editor.theme.panel.find('#statusbar')[0];

        if (statusbar) {
            window.setTimeout(function () {
                statusbar.insert({
                    type: 'label',
                    name: 'charCounter',
                    text: ['Символов: {0}', _self.getCount()],
                    style: 'margin-right: 10px;',
                    classes: 'wordcount',
                    disabled: editor.settings.readonly
                }, 0);

                editor.on('setcontent beforeaddundo keyup', update);
            }, 0);
        }
    });

    _self.getCount = function () {
        var tx = editor.getContent({ format: 'raw' });
        var decoded = decodeHtml(tx);
        var decodedStripped = decoded.replace(/(<([^>]+)>)/ig, '');
        var decodedSpaces = decodedStripped.replace(/\s/g, ''); // Remove space chars
        var tc = decodedSpaces.length;
        return tc;
    };

    function decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }
});