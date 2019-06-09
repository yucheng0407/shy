/**
 * Created by yucheng on 2019/5/25.
 */
$(function () {
    var Vmenu = new Vue({
        el: '.main',
        data: {
            search: {event: "input", value: ""},
            iconCount: $(".icon_lists .dib").length
        },
        methods: {
            searchCall: function (data) {
                var $q
                if (data) {
                    $(this.$el).find(".icon_lists .dib").hide();
                    $q = $(this.$el).find(".icon_lists .dib:contains(" + data + ")");
                } else {
                    $q = $(this.$el).find(".icon_lists .dib");
                }
                this.iconCount = $q.length;
                $q.show();
            }
        }
    })
})
