// boot up the demo
var data = [{
    name: "1",
    comp: "pageComp",
    url: "iconFont.html",
    icon: "&#xe71d;",
    subMenus: [{name: "主页1-1", icon: "&#xe71d;", comp: "menucomp", url: "iconFont.html"}, {
        name: "主页1-2",
        comp: "pageComp",
        icon: "&#xe71d;",
        url: "users.html"
    }, {
        name: "主页1-3",
        comp: "pageComp"
    }]
}, {
    name: "后台管理",
    icon: "&#xe758;",
    subMenus: [{name: "用户管理", icon: "&#xe73d;", comp: "menucomp", url: "users.html"}],
    comp: "menucomp"
}, {
    name: "主页3",
    comp: "pageComp"
}];
var Vmenu = new Vue({
    el: '#index',
    data: {
        styleData: {
            isLeftMenuShow: true,
            isAnimate: false,
            leftMenuWidth: $(".leftMenu").width()
        },
        curData: {
            compMenu: data[0],
            curMenu: data[0]
        },
        menus: data
    },
    computed: {
        rightBodyStyle: function () {
            var width = this.$el.getElementsByClassName("top")[0].offsetWidth - this.styleData.leftMenuWidth;
            if (this.styleData.isAnimate) {
                this.styleData.isLeftMenuShow ? $(".rightBody").animate({
                    width: width
                }, 500) : $(".rightBody").animate({
                    width: width + this.styleData.leftMenuWidth
                }, 500);
            }
            else {
                return {
                    width: this.styleData.isLeftMenuShow ? width + "px" : width + this.styleData.leftMenuWidth + "px"
                }
            }
        }
        ,
        leftMenuStyle: function () {
            if (this.styleData.isAnimate) {
                this.styleData.isLeftMenuShow ? $(".leftMenu").animate({
                    marginLeft: 0
                }, 500) : $(".leftMenu").animate({
                    marginLeft: -this.styleData.leftMenuWidth
                }, 500);
            } else {
                return {
                    marginLeft: this.styleData.isLeftMenuShow ? 0 : -this.styleData.leftMenuWidth + "px"
                }
            }
        }
    }
    ,
    methods: {
        goTo: function (menu) {
            function getUrl(data, type) {
                if (data.url) {
                    return data
                } else if (data[type]) {
                    return getUrl((data[type])[0])
                }
                return data;
            }

            this.styleData.isAnimate = false;
            // this.styleData.isLeftMenuShow = true;
            this.curData.compMenu = menu;
            this.curData.curMenu = getUrl(menu, "subMenus");
        }
    }
    ,
    components: {
        /**
         * 下级菜单组件
         */
        menuComp: {
            props: ['compMenu', 'pCurData', 'styleData'],
            template: '#menuComp',
            methods: {
                updateP: function (menu, compMenu) {
                    // this.$emit("update:styleData", {
                    //     isLeftMenuShow: true,
                    //     isAnimate: false
                    // });
                    // this.styleData.isLeftMenuShow = true;
                    this.styleData.isAnimate = false;
                    this.$emit("update:pCurData", {
                        compMenu: compMenu,
                        curMenu: menu
                    })
                }
            }
        },
        /**
         * 首页窗口管理组件
         */
        frameComp: {
            props: ['url', 'title', 'pCurData', 'styleData'],
            data: function () {
                var curframe = {
                    url: this.url,
                    title: this.title,
                    styleData: this.styleData,
                    pCurData: JSON.parse(JSON.stringify(this.pCurData))
                };
                return {frames: [curframe], curframe: curframe, height: $(".body").height() - 70}
            },
            watch: {
                title: function () {
                    var frameComp = this;
                    var _frames = this.frames.filter(function (a) {
                        return a.url == frameComp.url && a.title == frameComp.title
                    });
                    if (_frames.length > 0) {
                        this.curframe = _frames[0];
                    } else {
                        this.curframe = {
                            url: this.url,
                            title: this.title,
                            styleData: this.styleData,
                            pCurData: JSON.parse(JSON.stringify(this.pCurData))
                        };
                        this.frames.push(this.curframe)
                    }
                }
            },
            methods: {
                updateP: function (frame) {
                    this.curframe = frame;
                    // this.$emit("update:styleData", {
                    //     isLeftMenuShow: true,
                    //     isAnimate: false
                    // });
                    this.pCurData.compMenu = frame.pCurData.compMenu;
                    this.pCurData.curMenu = frame.pCurData.curMenu;
                    this.styleData.isAnimate = false;
                    this.styleData.isLeftMenuShow = frame.styleData.isLeftMenuShow;
                },
                close: function (index) {
                    var l = this.frames.length;
                    if (l !== 1) {
                        var a = this.frames.splice(index, 1);
                        if (a[0] == this.curframe) {
                            this.updateP(this.frames[l - 2])
                        }
                    }
                }
            },
            template: "#frameComp"
        }
    }
})
