<template>
  <div>
    <div v-if="isPopupVisible" class="overlay" @click="closePopup"></div>
    <div v-if="isPopupVisible" class="popup">
      <p class="popup-message">{{ popupMsgTxt }}</p>
      <div class="popup-buttons">
        <button class="popup-btn try-again" @click="tryAgain">Try Again</button>
        <button class="popup-btn skip" @click="skip">Skip</button>
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
      btn2Txt: ''
    }
  },
  methods: {
    openPopup () {
      this.isPopupVisible = true
    },
    closePopup () {
      this.isPopupVisible = false
    },
    tryAgain () {
      alert('You chose to try again!')
    },
    skip () {
      alert('You chose to skip!')
    },
    setPopupMsgTxt (msg) {
      this.popupMsgTxt = msg
    },
    setBtn1Txt (txt) {
      this.btn1Txt = txt
    },
    setBtn2Txt (txt) {
      this.btn2Txt = txt
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

.popup-btn.try-again {
  background-color: var(--lmu-green); /* Green for try again */
}

.popup-btn.try-again:hover {
  background-color: #45a049;
}

/* Skip Button */
.popup-btn.skip {
  background-color: var(--lmu-gray); /* Red for skip */
}

.popup-btn.skip:hover {
  background-color: #e53935;
}
</style>
