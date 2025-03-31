<template>
  <div>
    <div class="generalheader">
      <img v-bind:src="lmuLogo" id="lmu-logo" />
      <div class="header-flag">
        <div class="header-text">
          <br />{{headerTxt}}
        </div>
        <div class="language-button-container">
          <button class="language-button" @click="changeLanguage()">{{ language }}</button>
        </div>
      </div>
    </div>
    <div class="wave">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      lmuLogo: require('../assets/images/lmu-logo-zugeschnitten.png'),
      language: 'EN',
      headerTxt: 'DECISION PROBLEM FOR CONTEXT-SENSITIVE GRAMMARS'
    }
  },
  methods: {
    changeLanguage () {
      this.language = this.language === 'DE' ? 'EN' : 'DE'
      if (this.language === 'DE') {
        this.headerTxt = 'WORTPROBLEMS FÜR KONTEXTSENSITIVE GRAMMATIKEN'
      } else {
        this.headerTxt = 'DECISION PROBLEM FOR CONTEXT-SENSITIVE GRAMMARS'
      }
      this.$emit('change-language', this.language)
    }
  }
}
</script>

<style>
.generalheader {
  height: 80px;
  width: 100%;
  background-color: var(--lmu-gray);
  display: flex;
  flex-direction: row;
  align-content: center;
  position: relative;
}

.header-flag {
  margin-top: 7px;
  margin-bottom: 7px;
  margin-right: 7px;
  height: 66px;
  width: 100%;
  background-color: var(--lmu-gray);
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-right: 100px;
}

.header-text {
  padding-left: 5px;
  font-size: x-large;
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  color: white;
}

#lmu-logo {
  margin: 7px;
}

.wave {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
}

.wave svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 51px;
}

.wave .shape-fill {
    fill: var(--lmu-gray);
}

.language-button-container {
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 1000;
  border: 2px solid white;
  background-color: var(--lmu-gray);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.language-button {
  padding: 12px 20px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  min-width: 60px;
  text-align: center;
  transition: all 0.2s ease;
}

.language-button:hover {
  background-color: var(--lmu-green);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  opacity: 1;
}
</style>
