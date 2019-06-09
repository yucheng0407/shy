/**
 * Created by yucheng on 2019/5/25.
 */
/**
 * 搜索栏组件
 * search: {回调事件 event: "input",输入值 value: ""}
 * search-call:回调函数
 */
Vue.component("baseSearch", {
    props: ['search'],
    template: '<div style="border-radius: 10px;border: 1px solid #9a9393;float:left;"><i class="iconfont">&#xe77c</i><input  @[search.event]="searchCall"  :value="search.value" style="border: 0;background: none;"/></div>',
    methods: {
        searchCall: function (e) {
            this.search.value = e.target.value;
            this.$emit('search-call', this.search.value);
        }
    }
});
/**
 * 翻页组件
 * page:{当前页 index:Number,页数 pageNum:Number}
 */
Vue.component("basePage", {
    props: ['page'],
    template: '<div :other="otherUpdate" class="basePage" ><a :class="{disabled:page.index==1}" @click="page.index>1?page.index--:page.index">&lt;</a>{{isStartOther?"...":""}}' +
    '<a v-for="i in otherNum" :class="{current:(i+otherIndex-1)==page.index}" @click="page.index=(i+otherIndex-1)">{{(i+otherIndex-1)}}</a>{{isEndOther?"...":""}}<a :class="{disabled:page.index==page.pageNum}" @click="page.index<page.pageNum?page.index++:page.index">&gt;</a><span class="skip">到第<input v-model="skip" type="text" value="1">页<button type="button" @click="page.index=skip">确定</button></span><span style="vertical-align: unset;">共 {{page.pageLength}} 条</span></div>',
    data: function () {
        return {
            skip: 1,
            isStartOther: false,
            isEndOther: false,
            otherIndex: 1,//分页页码下标
            otherNum: null
        }
    },
    computed: {
        otherUpdate: function () {
            if (!this.page.pageNum) this.page.pageNum = 1;
            this.otherNum = this.page.pageNum > 5 ? 5 : this.page.pageNum;
            //删除index变更
            if (this.page.index > this.page.pageNum) {
                this.page.index = this.page.pageNum;
                this.skip=this.page.pageNum;
            } else if (this.page.index < 1) {
                this.page.index = 1;
                this.skip=1;
            }
            if (!((this.otherIndex < this.page.index))) {//比页码数小
                if (this.page.index > 1) {
                    this.otherIndex = this.page.index - 1;//非第一页
                } else {
                    this.otherIndex = 1;
                }
            } else if (!(this.page.index < (this.otherIndex + this.otherNum) - 1)) {//比页码数大
                if (this.page.index < this.page.pageNum) {
                    this.otherIndex = this.page.index - this.otherNum + 2;//非最后一页
                }
                else {
                    this.otherIndex = this.page.pageNum - this.otherNum + 1;
                }
            } else if ((this.otherIndex + this.otherNum) - 1 > this.page.pageNum) {//在页码数里但页数发生变化
                this.otherIndex = this.page.pageNum - this.otherNum + 1;
            }
            this.isStartOther = this.otherIndex > 1;
            this.isEndOther = (this.otherIndex + this.otherNum) - 1 < this.page.pageNum;
        }
    }
});

