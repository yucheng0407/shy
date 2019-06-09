/*
 * Created by yucheng on 2017/8/13.
 */
var YC =
    {
        handleUrl: function (url) {
            return contentType + url;
        }
    }
var _loadjs = {};
var contentType = '/test';
// document.write('<script type="text/javascript" src="' + YC.handleUrl("/medias/js/baseJs/load/require.js") + '"/>')
// document.write('<script type="text/javascript" src="' + YC.handleUrl("/medias/js/baseJs/load/load.js") + '"/>')
var option = {//初始
    modules: null,//自定义js
    success: function () {//返回函数
    },
    async: false//同步或异步导入JS(默认同步)
};
var cssConfig = {
    mainCss: {
        "iconfont": "/medias/css/iconFont/iconfont.css",
        "plat": "/medias/css/plat.css",
        "Global": "/medias/css/Global.css"
    },
    css: {
        "component": "/medias/css/component.css",
        "main": "/medias/css/main/main.css"
    }
};
var jsConfig = {
    mainJs: {
        "vue": "/medias/js/baseJs/vue/vue.js",
        "componentVue": "/medias/js/baseJs/vue/componentVue.js",
        "jquery": "/medias/js/baseJs/jquery-3.0.0.min.js",
        "formUtils": "/medias/js/baseJs/formUtils.js"
    },
    js: {},
    shim: {
        "componentVue": {
            deps: ["vue", "jquery"]
        },
        "vue": {
            deps: ["jquery"]
        }
    }
};
_loadMainJs();
/**
 *导入外部JS
 * @param _option
 */
var loadJs = function (_option) {
    console.log("初始化js");
    _loadModulesJs(_option.modules);
};
function _loadMainJs() {
    for (var js in jsConfig.mainJs) {
        findDep(js,"mainJs")
    }

}
function _loadModulesJs(modules) {
    if (modules) {
        for (var i in modules) {
            var js = modules[i]
            if (!modules[i].indexOf("/")) {
                _writeJs(js)
            } else {
                findDep(js,"js")
            }
        }
    }
}
function findDep(js,type) {
    var depJs = jsConfig.shim[js];
    if (!depJs) {
        isLoad(js,type);
        return;
    }//不存在依赖
    for (var dep in depJs.deps) {
        findDep(depJs.deps[dep],type)
    }
    isLoad(js,type);
}

function _writeJs(_js) {
    document.write('<script type="text/javascript" src="' + YC.handleUrl(_js) + '"></script>');
}

function isLoad(depJs,type) {
    if (!_loadjs[depJs]) {
        _writeJs(jsConfig[type][depJs]);
        _loadjs[depJs] = true;
    }
}

/**
 *
 * @param _option
 */
var loadCss = function (_option) {
    console.log("初始化css");
    function _writeCss(_css1) {
        document.write('<link rel="stylesheet" href="' + _css1 + '"/>');
    }

    for (var css in  cssConfig.mainCss) {//内部css
        var mainCss = YC.handleUrl(cssConfig.mainCss[css]);
        _writeCss(mainCss)
    }
    if (_option && _option.modules) {//外部css
        for (var i in _option.modules) {
            var _css;
            if (!_option.modules[i].indexOf("/")) {
                _css = YC.handleUrl(_option.modules[i]);
            } else {
                _css = YC.handleUrl(cssConfig.css[_option.modules[i]]);
            }
            _writeCss(_css);
        }
    }
};
