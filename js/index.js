const { createApp } = Vue

createApp({
  data() {
    return {
        checkedTasks: [],
        allTasks: [],
        otherTask: [],
        
    }
  },
  computed: {
    // a computed getter
    taskComplete() {
      // `this` points to the component instance
      return this.checkedTasks.length
    },
    NumberOfAllTasks() {
        // `this` points to the component instance
        // 這個有點複雜，先寫固定數字，後面再變成計算的
        return 6
    },
    percentageOfTaskComplete() {
      var percentage = (this.taskComplete / this.NumberOfAllTasks * 100).toFixed(0);
      return percentage + '%'
    },
    rankBackground() {
      var percentage = (this.taskComplete / this.NumberOfAllTasks * 100).toFixed(0);
      if (percentage >= 100) {
        return 'background:#F26DF9;'
      }else if (percentage >= 70) {
        return 'background:#EAC435;'
      }else if (percentage >= 40) {
        return 'background:#92BFB1;'
      }else {
        return 'background:#474954;'
      }
    },
    rankPicture() {
      var percentage = (this.taskComplete / this.NumberOfAllTasks * 100).toFixed(0);
      if (percentage >= 100) {
        return 'background:url(images/master.png);'
      }else if (percentage >= 70) {
        return 'background:url(images/gold.png);'
      }else if (percentage >= 40) {
        return 'background:url(images/silver.png);'
      }else {
        return 'background:url(images/copper.png);'
      }
    }
  },
  methods: {
    play_soundEffects_click01() {
      const audio = document.createElement("audio");
      audio.src = "media/soundEffects_click01.wav";
      audio.play();
    },
  }
}).mount('#app')