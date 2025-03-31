<template>
  <div id="info-wrapper">
    <section id="info-section-1" class="info-section info-section-1">
      <div class="content-wrapper">
        <img v-bind:src="ChomskyHierarchyImg" id="ChomskyierarchyImg" class="section-image">
        <div class="text-content">
          <h1 class="h-1 multiline-text">{{ section1Title }}</h1>
          <p class="p-1 multiline-text">{{ section1Content }}</p>
        </div>
      </div>
    </section>
    <div class="wave wave-1">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
      </svg>
    </div>
    <section id="info-section-2" class="info-section info-section-2">
      <h1 class="h-2 multiline-text">{{ section2Title }}</h1>
      <p class="p-2 multiline-text">{{ section2Content }}</p>
    </section>
    <div class="wave wave-2">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
      </svg>
    </div>
    <section id="info-section-3" class="info-section info-section-3">
      <h1 class="h-3 multiline-text">{{ section3Title }}</h1>
      <p class="p-3 multiline-text">{{ section3Content }}</p>
    </section>
    <div class="wave wave-3">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
      </svg>
    </div>
    <section id="info-section-4" class="info-section info-section-4">
      <h1 class="h-4 multiline-text">{{ section4Title}}</h1>
      <p class="p-4 multiline-text">{{ section4Content }}</p>
    </section>
    <div class="wave wave-4">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
      </svg>
    </div>
    <section id="info-section-5" class="info-section info-section-5">
      <h1 class="h-5 multiline-text">{{ section5Title }}</h1>
      <p class="p-5 multiline-text">{{ section5Content }}</p>
    </section>
    <div class="wave wave-5">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
      </svg>
    </div>
    <section id="info-section-6" class="info-section info-section-6">
      <h1 class="h-6 multiline-text">{{ section6Title }}</h1>
      <p class="p-6 multiline-text">{{ section6Content }}</p>
    </section>
    <div class="wave wave-3">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
      </svg>
    </div>
    <section id="info-section-7" class="info-section info-section-7">
      <h1 class="h-7 multiline-text">{{ section7Title }}</h1>
      <p class="p-7 multiline-text"> {{ section7Content }}</p>
    </section>
  </div>
</template>

<script>
import { infoContent } from '@/content/infoContent'
export default {
  name: 'Info',
  data () {
    return {
      ChomskyHierarchyImg: require('../assets/images/Chomsky-Hierarchie-english.drawio.svg'),
      // ChomskyHierarchyImgDE: require('../assets/images/Chomsky-Hierarchie-deutsch.drawio.svg'),
      content: infoContent,
      section1Title: infoContent.section1.title.EN,
      section1Content: infoContent.section1.content.EN,
      section2Title: infoContent.section2.title.EN,
      section2Content: infoContent.section2.content.EN,
      section3Title: infoContent.section3.title.EN,
      section3Content: infoContent.section3.content.EN,
      section4Title: infoContent.section4.title.EN,
      section4Content: infoContent.section4.content.EN,
      section5Title: infoContent.section5.title.EN,
      section5Content: infoContent.section5.content.EN,
      section6Title: infoContent.section6.title.EN,
      section6Content: infoContent.section6.content.EN,
      section7Title: infoContent.section7.title.EN,
      section7Content: infoContent.section7.content.EN
    }
  },
  props: {
    language: String
  },
  watch: {
    language () {
      this.onLanguageChange()
    }
  },
  methods: {
    onLanguageChange () {
      const lang = this.language
      this.section1Title = infoContent.section1.title[lang]
      this.section1Content = infoContent.section1.content[lang]

      this.section2Title = infoContent.section2.title[lang]
      this.section2Content = infoContent.section2.content[lang]

      this.section3Title = infoContent.section3.title[lang]
      this.section3Content = infoContent.section3.content[lang]

      this.section4Title = infoContent.section4.title[lang]
      this.section4Content = infoContent.section4.content[lang]

      this.section5Title = infoContent.section5.title[lang]
      this.section5Content = infoContent.section5.content[lang]

      this.section6Title = infoContent.section6.title[lang]
      this.section6Content = infoContent.section6.content[lang]

      this.section7Title = infoContent.section7.title[lang]
      this.section7Content = infoContent.section7.content[lang]

      this.ChomskyHierarchyImg = lang === 'DE'
        ? require('../assets/images/Chomsky-Hierarchie-deutsch.drawio.svg')
        : require('../assets/images/Chomsky-Hierarchie-english.drawio.svg')
    }
  }
}

</script>

<style scoped>
.info-section-2,
.info-section-3,
.info-section-4,
.info-section-5,
.info-section-6,
.info-section-7 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info-section-2 .multiline-text,
.info-section-3 .multiline-text,
.info-section-4 .multiline-text,
.info-section-5 .multiline-text,
.info-section-6 .multiline-text,
.info-section-7 .multiline-text {
  width: fit-content;
  max-width: 800px;
  text-align: left;
  margin: 0 auto;
}
/* Add margin below headings */
.info-section-2 .h-2,
.info-section-3 .h-3,
.info-section-4 .h-4,
.info-section-5 .h-5,
.info-section-6 .h-6,
.info-section-7 .h-7 {
  margin-bottom: 1.5rem; /* Adjust this value as needed */
}

.info-section-1 .content-wrapper {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}
.info-section-1 .section-image {
  width: 300px;
  height: auto;
  flex-shrink: 0;
}
.info-section-1 .text-content {
  display: flex;
  flex-direction: column;
}
#ChomskyierarchyImg {
  filter: invert(1); /* Turns white → black */
}
.multiline-text {
  white-space: pre-line;
  text-align: left;
}

#info-wrapper {
  width: 100%;
  background-color: var(--lmu-light-gray);
}
.info-section {
  padding: 50px;
}

.info-section-1 {
  background-color: var(--lmu-light-gray);
}

.info-section-1 h1 {
  color: var(--lmu-gray);
  font-size:x-large;
}

.info-section-2 {
  background-color: var(--lmu-green);
}

.info-section-3 {
  background-color: var(--lmu-gray);
}

.info-section-4 {
  background-color: var(--lmu-light-gray);
}

.info-section-5 {
  background-color: var(--lmu-green);
}

.info-section-6 {
  background-color: var(--lmu-gray);
}

.wave {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
}

.wave svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 56px;
}

.wave .shape-fill {
    fill: #00883A;
}

.wave-2 {
  background-color: var(--lmu-gray);
}

.wave-3 svg {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.wave-3 .shape-fill {
    fill: var(--lmu-gray);
}

.wave-4 {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    background-color: var(--lmu-green);
}

.wave-4 svg {
    position: relative;
    display: block;
    width: calc(131% + 1.3px);
    height: 73px;
}

.wave-4 .shape-fill {
    fill: var(--lmu-light-gray);
}

.wave-5 {
  position: relative;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  background-color: var(--lmu-gray);
  margin-top: -1px;
}
.wave-5 svg {
  display: block;
  width: calc(100% + 1.3px);
  height: 45px;
  position: relative;
  transform: rotate(180deg);
  top: -1px;
}

.wave-5 .shape-fill {
    fill: #00883A;
}

.h-2, .p-2, .h-3, .p-3, .h-5, .p-5, .h-6, .p-6 {
  color: var(--lmu-light-gray);
}

.h-1, .p-1, .h-4, .p-4, .h-7, .p-7 {
  color: var(--lmu-gray);
}

h1 {
  font-size: 20px;
}

p {
  font-weight: 500;
}

</style>
