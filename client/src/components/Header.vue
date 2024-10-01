<template>
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
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  align-content: center;
}

.header-flag {
  margin-top: 7px;
  margin-bottom: 7px;
  margin-right: 7px;
  height: 66px;
  width: 100%;
  background-color: #4f4f4f;
  display: flex;
  justify-content: space-between;
  align-content: center;
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

.language-button {
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  color: white;
  border: none;
  cursor: pointer;
  background-color: #4f4f4f;
  margin-right: 5px;
}

.language-button:hover {
  background-color: #2e814c;
  opacity: 0.7;
}

.language-button-container {
  margin: 8px;
  border-left: 2px solid white;
  border-right: 2px solid white;
}
</style>
