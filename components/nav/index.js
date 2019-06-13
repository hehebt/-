// components/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    first:Boolean,
    latest:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    srcPervious: "images/triangle@left.png",
    srcPerviousDis: "images/triangle.dis@left.png",
    srcNext: "images/triangle@right.png",
    srcNextDis: "images/triangle.dis@right.png",
    todo: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    todo() {
      this.triggerEvent("todoEvent", {
        "todo": this.data.todo
      }, {})
    },
    onNext(e) {
      if(!this.properties.latest){
        this.setData({
          todo: "previous"
        })
        this.todo()
      }
    },
    onPervious(e) {
      if(!this.properties.first){
        this.setData({
          todo: "next"
        })
        this.todo()
      }
    }
  }
})