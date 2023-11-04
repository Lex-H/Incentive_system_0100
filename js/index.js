const { createApp } = Vue
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

createApp({
  data() {
    return {
        checkedTasks: [],
        allTasks: [],
        otherTask: [],
        inputDisplayOfPlusItem: false,
        newTaskInputId: '0',
        newTaskContent: '',
        backGroundMusicList: [
          'media/TruE_HOYO_Mix.mp3',
          'media/Star_Rail.mp3',
          'media/uneventful_night_epic_version.mp3',
          'media/frieren_pv _ost_beyond_journeys_end.mp3',
          'media/jojos_bizarre_adventure.mp3',
          'media/harry_potter_theme_song.mp3',
          'media/electromagnetic_gun_suona.mp4',
        ],
        backGroundMusic: '',
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
    checkboxClicked(i) {
      this.playSoundEffectsClick01();
      console.log('列印i.doneOrNot', i.doneOrNot)
      // 經測試這裡會先處理完本方法checkboxClicked，才會改變checkbox的布林值(doneOrNot)，導致畫面上打勾但是這裡的doneOrNot是false，所以這邊的布林值要反著看
      if (!i.doneOrNot) {
        console.log('打勾了，更改doneTime')
        i.doneTime = Date();
      }else {
        i.doneTime = '';
      }
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
      this.allTasks.splice(0, 1);
    },
    clickPlusNewItem() {
      this.newTaskInputId = nanoid()
      this.changeInputDisplayOfPlusItem();
      this.allTasks.push(
        {
          taskId: this.newTaskInputId,
          taskContent: '新任務，點擊修改',
          contentShort: '',
          doneOrNot: false,
          doneTime: '',
          startTime: Date(),
          endTime: Date(),
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
    playBackGroundMusic() {
      document.getElementById('backGroundMusicPlayer').play();
    },
    // 輸入taskId找到taks物件，此物件好像是雙向綁定
    findTaskFromTaskId(idSearched) {
      var objectReturn
      // 使用foeEach代替for會有bug，無法用break中斷循環，能使用throw new Error('這不是Bug，用來停止forEach')來中斷，但這會造成立刻中斷整個函數
      for (let i = 0; i < this.allTasks.length; i++) {
        if (this.allTasks[i].taskId == idSearched) {
          objectReturn = this.allTasks[i];
        }
      }
      return objectReturn
    },
    clearAllLocalStorage() {
      var clearOrNot = confirm("確認刪除所有存檔？此操作無法復原！");
      if (clearOrNot) {
        this.allTasks = [];
      }
    },
  },
  watch: {
    // 每当 newTaskContent 改变时，这个函数就会执行
    newTaskContent(newValue, oldValue) {
      for (let i = 0; i < this.allTasks.length; i++) {
        if (this.allTasks[i].taskId == this.newTaskInputId) {
          this.allTasks[i].taskContent = this.newTaskContent;
        }
      }
    },
    allTasks: {
      handler(newValue, oldValue) {
        // 注意：在嵌套的变更中，只要没有替换对象本身，那么这里的 `newValue` 和 `oldValue` 相同
        // 特別注意，陣列及物件多層次要用深度監視

        // // 儲存資料到本地
        // 轉換物件為字串
        var saveAllTasks = JSON.stringify(this.allTasks);
        // 儲存本地
        localStorage.setItem('allTasks', saveAllTasks);

        // // 確認文字內容長度然後把縮短後的文字內容放入contentShort
        // Bug：這裡可能有效能問題，每當allTasks有任何變動都要執行一次for，應該要找出更有效能的方法
        // Bug 中文跟英文在.length算起來一個字都算一，但是顯示在螢幕上佔用的格子不一樣，應該英文算0.5這樣才會符合我的需求
        for (var i=0; i<this.allTasks.length; i++) {
          if (this.allTasks[i].taskContent.length > 15){
            this.allTasks[i].contentShort = this.allTasks[i].taskContent.substring(0, 15)
            console.log('縮短了', this.allTasks[i].contentShort)
          }else {
            this.allTasks[i].contentShort = this.allTasks[i].taskContent
            console.log('沒縮短', this.allTasks[i].contentShort)
          }
        }
      },
      deep: true,
    },
  },
  // 掛載完成Vue，所有東西準備就緒，html、vue都有了
  mounted() {
    // 播放背景樂
    var randonNumber = Math.floor(Math.random()*this.backGroundMusicList.length);
    this.backGroundMusic = this.backGroundMusicList[randonNumber];
    console.log('播放背景樂：', this.backGroundMusic)

    // 讀取本地存檔
    var loadingLocalStorage = localStorage.getItem('allTasks');
    if (loadingLocalStorage == null) {
      this.allTasks = [
        {
          taskId: 'uLv0sQd9zI2lEcGYKGhzv',
          taskContent: '找一件想做的事情完成',
          contentShort: '找一件想做的事情完成',
          doneOrNot: false, 
          doneTime: '',
          startTime: Date(),
          endTime: Date(),
          contentDisplay: '',
          inputDisplay: 'display: none;',
        },
        {
          taskId: 'QBs1Q87gonGzsurVjPEC-',
          taskContent: '點擊"+"或"新增任務"增加新',
          contentShort: '點擊"+"或"新增任務"增加新',
          doneOrNot: false,
          doneTime: '',
          startTime: Date(),
          endTime: Date(),                   
          inputDisplay: 'display: none;',
        },
        {
          taskId: '5979Wb2mZaR-fwBAzJPxu',
          taskContent: '內容；點擊"口"完成任務',
          contentShort: '內容；點擊"口"完成任務',
          doneOrNot: false,
          doneTime: '',
          startTime: Date(),
          endTime: Date(),                   
          inputDisplay: 'display: none;',
        },
      ]
    }else {
      // 將字串轉為物件後存入allTasks
      this.allTasks = JSON.parse(loadingLocalStorage);
    }
    
  },
  // 每次Vue更新模板時，有事件時
  updated() {
    // 改變焦點
    this.allTasks.forEach((i) => 
      {
        if (i.inputDisplay == '') {
          document.getElementById(i.taskId).lastChild.focus();
        }
      }
    );
    document.getElementById('inputFocus').focus();
  },
}).mount('#app')