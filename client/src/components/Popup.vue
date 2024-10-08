<template>
  <div>
    <div v-if="isPopupVisible" class="overlay" @click="closePopup"></div>
    <div v-if="isPopupVisible" class="popup">
      <p class="popup-message">{{ popupMsgTxt }}</p>
      <div class="popup-buttons">
        <button v-show="showBtn1" class="popup-btn btn-one" @click="handleBtn1Click">{{ btn1Txt }}</button>
        <button v-show="showBtn2" class="popup-btn btn-two" @click="handleBtn2Click">{{ btn2Txt }}</button>
        <button v-show="showBtn3" class="popup-btn btn-three" @click="handleBtn3Click">{{ btn3Txt }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isPopupVisible: false,
      popupMsgTxt: '',
      btn1Txt: '',
      btn2Txt: '',
      btn3Txt: '',
      showBtn1: true,
      showBtn2: true,
      showBtn3: false
    }
  },
  methods: {
    openPopup () {
      console.log('open Popup')
      this.isPopupVisible = true
    },
    closePopup () {
      this.isPopupVisible = false
    },
    handleBtn1Click () {
      this.closePopup()
      this.$emit('popup-btn-1')
      // alert('You chose to try again!')
    },
    handleBtn2Click () {
      this.closePopup()
      this.$emit('popup-btn-2')
      // alert('You chose to btn-two!')
    },
    handleBtn3Click () {
      this.closePopup()
      this.$emit('popup-btn-3')
    },
    setPopupMsgTxt (msg) {
      console.log('set Popup Msg')
      this.popupMsgTxt = msg
    },
    setBtn1Txt (txt) {
      console.log('Set Popup Btn 1 Msg')
      this.btn1Txt = txt
    },
    setBtn2Txt (txt) {
      console.log('Set Popup Btn 2 Msg')
      this.btn2Txt = txt
    },
    setBtn3Txt (txt) {
      console.log('Set Popup Btn 3 Msg')
      this.btn3Txt = txt
    },
    clearAll () {
      this.popupMsgTxt = ''
      this.btn1Txt = ''
      this.btn2Txt = ''
      this.btn3Txt = ''
      this.showBtn1 = false
      this.showBtn2 = false
      this.showBtn3 = false
    },
    removeBtn (btn) {
      switch (btn) {
        case 1:
          this.btn1Txt = ''
          this.showBtn1 = false
          break
        case 2:
          this.btn3Txt = ''
          this.showBtn2 = false
          break
        case 3:
          this.btn3Txt = ''
          this.showBtn3 = false
          break
        default: console.log('you try to remove an unknown button')
      }
    },
    addBtn (btn) {
      switch (btn) {
        case 1:
          this.showBtn1 = true
          break
        case 2:
          this.showBtn2 = true
          break
        case 3:
          this.showBtn3 = true
          break
        default: console.log('you try to remove an unknown button')
      }
    },
    createTwoBtnPopup (popupTxt, btnOneTxt, btnTwoTxt) {
      this.clearAll()
      this.setPopupMsgTxt(popupTxt)
      this.addBtn(1)
      this.setBtn1Txt(btnOneTxt)
      this.addBtn(2)
      this.setBtn2Txt(btnTwoTxt)
      this.openPopup()
    },
    createOneBtnPopup (popupTxt, btnTxt) {
      this.clearAll()
      this.setPopupMsgTxt(popupTxt)
      this.addBtn(3)
      this.setBtn3Txt(btnTxt)
      this.openPopup()
    }
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 2px solid #ccc;
  padding: 20px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.popup-message {
  font-size: 16px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.popup-buttons {
  display: flex;
  justify-content: space-around;
}

.popup-btn {
  width: 100px;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  background-color: #333;
  color: white;
  transition: background-color 0.2s ease;
}

.popup-btn.btn-one {
  background-color: var(--lmu-gray); /* Green for try again */
}

.popup-btn.btn-one:hover,
.popup-btn.btn-three:hover {
  background-color: #45a049;
}

/* Skip Button */
.popup-btn.btn-two {
  background-color: var(--lmu-gray); /* Red for btn-two */
}

.popup-btn.btn-two:hover {
  background-color: #e53935;
}
</style>
