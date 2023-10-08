const { createApp } = Vue
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

createApp({
  data() {
    return {
        checkedTasks: [],
        allTasks: [
          {
            taskNumber: 'uLv0sQd9zI2lEcGYKGhzv',
            taskContent: '早睡早起',
            doneOrNot: 'false',
            doneTime: 'Fri Oct 06 2023 04:49:57 GMT+0800 (台北標準時間)',
            startTime: '2023/10/5/00/00',
            endTime: '2023/10/5/23/59',
            contentDisplay: '',
            inputDisplay: 'display: none;',
          },
          {
            taskNumber: 'QBs1Q87gonGzsurVjPEC-',
            taskContent: '不要熬夜',
            doneOrNot: 'true',
            doneTime: 'Fri Oct 06 2023 04:49:57 GMT+0800 (台北標準時間)',
            startTime: '2023/10/5/00/00',
            endTime: '2023/10/5/23/59',
            contentDisplay: '',
            inputDisplay: 'display: none;',
          },
        ],
        otherTask: [],
        inputDisplayOfPlusItem: false,
        newTaskInputId: '0',
        newTaskContent: '',
        backGroundMusicList: [
          'media/TruE_HOYO_Mix.mp3',
          'media/Star_Rail.mp3'
        ],
        backGroundMusic: '',
        test: [0,1,2,3],
    }
  },
  computed: {
    // a computed getter
    taskComplete() {
      // `this` points to the component instance
      var count = 0;
      this.allTasks.forEach((i) =>
        {
          if (i.doneOrNot) {
            count = count + 1;
            console.log(6666666)
          }
        }
      );
      return count
    },
    NumberOfAllTasks() {
        // `this` points to the component instance
        // 這個有點複雜，先寫固定數字，後面再變成計算的
        return this.allTasks.length
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
    },
    // convertContentDisplay(i) {
    //   if (i.inputDisplay) {
    //     return 'display: none;'
    //   }else {
    //     return ''
    //   }
    // },
    convertInputDisplay(i) {
      if (i.inputDisplay) {
        return ''
      }else {
        return 'display: none;'
      }
    },
    convertContentDisplayOfPlusItem() {
      if (this.inputDisplayOfPlusItem) {
        return 'display: none;'
      }else {
        return ''
      }
    },
    convertInputDisplayOfPlusItem() {
      if (this.inputDisplayOfPlusItem) {
        return ''
      }else {
        return 'display: none;'
      }
    },
  },
  methods: {
    playSoundEffectsClick01() {
      const audio = document.createElement("audio");
      audio.src = "media/soundEffects_click01.wav";
      audio.play();
    },
    checkboxClicked(event) {
      this.playSoundEffectsClick01();
      // var checkboxBoolin = event.target.checked;
      // console.log(checkboxBoolin)
      // Bug：點擊兩次才會打勾，傻眼
      // 猜測checkbox上的v-model是原因，下次改改看
      // this.allTasks[0].splice(2, 1, checkboxBoolin);
    },
    changeInputDisplayOfPlusItem() {
      this.inputDisplayOfPlusItem = !this.inputDisplayOfPlusItem;
    },
    clickListContent(i) {
      if (i.contentDisplay == '') {
        i.contentDisplay = 'display: none;'
        i.inputDisplay = ''
      }else {
        i.contentDisplay = ''
        i.inputDisplay = 'display: none;'
      }
    },
    LeaveInput(i) {
      if (i.inputDisplay == '') {
        i.inputDisplay = 'display: none;'
        i.contentDisplay = ''
      }else {
        i.inputDisplay = ''
        i.contentDisplay = 'display: none;'
      }
    },
    LeaveInputOfPlusItem() {
      this.changeInputDisplayOfPlusItem();
    },
    ClickX(event) {
      // console.log(event.target.parentNode.id);
      // 不能刪除掉所有的allTasks，html很多地方要用他，會報錯
      if (this.allTasks.length == 1) {
        alert('任務清單不能為零項，會有Bug，待修復')
        return
      }else {
        this.allTasks.splice(0, 1);
      }
    },
    clickPlusNewItem() {
      this.newTaskInputId = nanoid()
      this.changeInputDisplayOfPlusItem();
      this.allTasks.push(
        {
          taskNumber: this.newTaskInputId,
          taskContent: '新任務，點擊修改',
          doneOrNot: 'false',
          doneTime: Date(),
          startTime: '2023/10/5/00/00',
          endTime: '2023/10/5/23/59',
          contentDisplay: '',
          inputDisplay: 'display: none;',
        },
      ),
      this.newTaskContent = '';
    },
    // findNewTask(i) {

    //   if (i == this.newTaskInputId) {
    //     return i.taskContent
    //   }
    // },
    testPlus() {
      this.test.splice(0, 1)
    },
  },
  watch: {
    // 每当 newTaskContent 改变时，这个函数就会执行
    newTaskContent(newValue, oldValue) {
      // console.log(newValue)
      for (let i = 0; i < this.allTasks.length; i++) {
        if (this.allTasks[i].taskNumber == this.newTaskInputId) {
          this.allTasks[i].taskContent = this.newTaskContent;
        }
      }

      

    },
    allTasks: {
      handler(newValue, oldValue) {
        // 注意：在嵌套的变更中，
        // 只要没有替换对象本身，
        // 那么这里的 `newValue` 和 `oldValue` 相同
        // 特別注意，陣列及物件多層次要用深度監視
        console.log('使用watch，監視allTasks')
        // 準備用來儲存本地
      },
      deep: true,
    },
  },
  mounted() {
    var randonNumber = Math.floor(Math.random()*this.backGroundMusicList.length);
    this.backGroundMusic = this.backGroundMusicList[randonNumber];
    console.log(this.backGroundMusic)
  },
  updated() {
    this.allTasks.forEach((i) => 
      {
        if (i.inputDisplay == '') {
          // console.log(document.getElementById(i.taskNumber).lastChild)
          document.getElementById(i.taskNumber).lastChild.focus();
        }
      }
    );

    document.getElementById('inputFocus').focus();
  },
}).mount('#app')