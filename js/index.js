const { createApp } = Vue

createApp({
  data() {
    return {
        checkedTasks: [],
        otherTask: '',
    }
  },
  computed: {
    // a computed getter
    taskComplete() {
      // `this` points to the component instance
      return this.checkedTasks.length
    },
    allTasks() {
        // `this` points to the component instance
        // 這個有點複雜，先寫固定數字，後面再變成計算的
        return 4
    },
  }
}).mount('#app')