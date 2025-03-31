<template>
  <div>
    <section>
    <div class="wave-wrapper">
      <div class="wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
          </svg>
      </div>
    </div>
    <div class="tile-section-wrapper">
      <div class="tile-container">
        <div class="tile">
          <div class="front">{{ TileHaeder1 }}</div>
          <div class="back">
            {{ TileTxt1 }}
            <router-link :to="{ path: '/info', hash: '#info-section-1' }">{{ linkTxt }}</router-link>
          </div>
        </div>
      </div>
      <div class="tile-container">
        <div class="tile">
          <div class="front">{{ TileHaeder2 }}</div>
          <div class="back">
            {{ TileTxt2 }}
            <router-link :to="{ path: '/info', hash: '#info-section-2' }">{{ linkTxt }}</router-link>
          </div>
        </div>
      </div>
      <div class="tile-container">
        <div class="tile">
          <div class="front">{{ TileHaeder3 }}</div>
          <div class="back">
            {{ TileTxt3 }}
            <router-link :to="{ path: '/info', hash: '#info-section-3' }">{{ linkTxt }}</router-link>
          </div>
        </div>
      </div>
      <div class="tile-container">
        <div class="tile">
          <div class="front">{{ TileHaeder4 }}</div>
          <div class="back">
            {{ TileTxt4 }}
            <router-link :to="{ path: '/info', hash: '#info-section-4' }">{{ linkTxt }}</router-link>
          </div>
        </div>
      </div>
      <div class="tile-container">
        <div class="tile">
          <div class="front">{{ TileHaeder5 }}</div>
          <div class="back">
            {{ TileTxt5 }}
            <router-link :to="{ path: '/info', hash: '#info-section-5' }">{{ linkTxt }}</router-link>
          </div>
        </div>
      </div>
      <div class="tile-container">
        <div class="tile">
          <div class="front">{{ TileHaeder6 }}</div>
          <div class="back">
            {{ TileTxt6 }}
            <router-link :to="{ path: '/info', hash: '#info-section-6' }">{{ linkTxt }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div clas="spacer layer1"></div>
  <img id="layer1Img" clas="spacer layer1" v-bind:src="layeredWavesSvg">
  </div>
</template>

<script>
export default {
  name: 'Tiles',
  data () {
    return {
      linkTxt: 'learn more',
      layeredWavesSvg: require('../assets/images/layered-waves-h100.svg'),
      TileHaeder1:
        'What is a formal Grammar?',
      TileTxt1:
        'A formal grammar is a mathematical framework G = (V, Σ, P, S) describing how to generate words of a formal language. It consists of variables V, an Alphabet Σ, production rules P, and a start symbol S.',
      TileHaeder2:
        'What is a formal Language?',
      TileTxt2:
        'A formal language is the set of all words that can be derived from a formal grammar\'s start symbol using its production rules. It is defined by an alphabet and can be either finite or infinite.',
      TileHaeder3:
        'What is a contextsensitive Language?',
      TileTxt3:
        'Context-sensitive grammars only allow productions where left-side symbols never exceed right-side length (|u| ≤ |v|). Their languages are recognized by linear-bounded automata and are decidable.',
      TileHaeder4:
        'What is the Wordproblem?',
      TileTxt4:
        'The word problem asks whether a given word belongs to a specific formal language. A formal language class is called \'decidable\' when its word problem is algorithmically solvable. It is fundamental to formal language theory and its applications in computer science.',
      TileHaeder5:
        'Why is the Wordproblem solvable for contextsensitive Languages?',
      TileTxt5:
        'Because derivation steps are bounded by the non-shrinking condition, and linear-bounded automata can systematically check all possible paths. This enables an algorithm working within limited memory.',
      TileHaeder6:
        'What are practical applications of formal language theory?',
      TileTxt6:
        'It enables critical computing tools like programming language compilers (using CFGs) and regular expressions for text processing. Applications also span bioinformatics (DNA pattern matching) and AI (natural language syntax analysis)'
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
  mounted () {
    this.initTiles()
  },
  methods: {
    initTiles () {
      this.tiles = document.querySelectorAll('.tile-container')

      this.tiles.forEach(tile => {
        tile.addEventListener('click', () => {
          tile.classList.toggle('clicked')
        })
      })
    },
    onLanguageChange () {
      switch (this.language) {
        case 'DE':
          this.linkTxt = 'mehr erfahren'
          this.TileHaeder1 = 'Was ist eine formale Grammatik?'
          this.TileTxt1 = 'Eine formale Grammatik ist ein mathematisches Rahmenwerk G = (V, Σ, P, S), das beschreibt, wie Wörter einer formalen Sprache erzeugt werden. Sie besteht aus Variablen V, einem Alphabet Σ, Produktionsregeln P und einem Startsymbol S.'
          this.TileHaeder2 = 'Was ist eine formale Sprache?'
          this.TileTxt2 = 'Eine formale Sprache ist die Menge aller Wörter, die aus dem Startsymbol einer formalen Grammatik unter Verwendung ihrer Produktionsregeln abgeleitet werden können. Sie wird durch ein Alphabet definiert und kann endlich oder unendlich sein.'
          this.TileHaeder3 = 'Was ist eine kontextsensitive Sprache?'
          this.TileTxt3 = 'Kontextsensitive Grammatiken erlauben nur Produktionen, bei denen die linke Seite nicht länger als die rechte ist (|u| ≤ |v|). Ihre Sprachen werden durch linear beschränkte Automaten erkannt und sind entscheidbar.'
          this.TileHaeder4 = 'Was ist das Wortproblem?'
          this.TileTxt4 = 'Das Wortproblem fragt, ob ein gegebenes Wort zu einer bestimmten formalen Sprache gehört. Eine Klasse formaler Sprachen heißt "entscheidbar", wenn ihr Wortproblem algorithmisch lösbar ist. Es ist grundlegend für die Theorie formaler Sprachen und ihre Anwendungen in der Informatik.'
          this.TileHaeder5 = 'Warum ist das Wortproblem für kontextsensitive Sprachen lösbar?'
          this.TileTxt5 = 'Weil die Ableitungsschritte durch die Nicht-Verkleinerungsbedingung beschränkt sind und linear beschränkte Automaten alle möglichen Pfade systematisch überprüfen können. Dies ermöglicht einen Algorithmus, der mit begrenztem Speicher arbeitet.'
          this.TileHaeder6 = 'Was sind praktische Anwendungen der formalen Sprachtheorie?'
          this.TileTxt6 = 'Sie ermöglicht wichtige Computing-Tools wie Compiler für Programmiersprachen (mit CFGs) und reguläre Ausdrücke für Textverarbeitung. Anwendungen reichen von Bioinformatik (DNA-Mustererkennung) bis zu KI (syntaktische Analyse natürlicher Sprache).'
          break
        case 'EN':
          this.linkTxt = 'learn more'
          this.TileHaeder1 = 'What is a formal Grammar?'
          this.TileTxt1 = 'A formal grammar is a mathematical framework G = (V, Σ, P, S) describing how to generate words of a formal language. It consists of variables V, an Alphabet Σ, production rules P, and a start symbol S.'
          this.TileHaeder2 = 'What is a formal Language?'
          this.TileTxt2 = 'A formal language is the set of all words that can be derived from a formal grammar\'s start symbol using its production rules. It is defined by an alphabet and can be either finite or infinite.'
          this.TileHaeder3 = 'What is a contextsensitive Language?'
          this.TileTxt3 = 'Context-sensitive grammars only allow productions where left-side symbols never exceed right-side length (|u| ≤ |v|). Their languages are recognized by linear-bounded automata and are decidable.'
          this.TileHaeder4 = 'What is the Wordproblem?'
          this.TileTxt4 = 'The word problem asks whether a given word belongs to a specific formal language. A formal language class is called \'decidable\' when its word problem is algorithmically solvable. It is fundamental to formal language theory and its applications in computer science.'
          this.TileHaeder5 = 'Why is the Wordproblem solvable for contextsensitive Languages?'
          this.TileTxt5 = 'Because derivation steps are bounded by the non-shrinking condition, and linear-bounded automata can systematically check all possible paths. This enables an algorithm working within limited memory.'
          this.TileHaeder6 = 'What are practical applications of formal language theory?'
          this.TileTxt6 = 'It enables critical computing tools like programming language compilers (using CFGs) and regular expressions for text processing. Applications also span bioinformatics (DNA pattern matching) and AI (natural language syntax analysis).'
          break
      }
    }
  }
}
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
.tile-section-wrapper {
  width: 100%;
  height: 500px;
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  background-color: var(--lmu-gray);
  padding: 30px;
}
.tile-container {
  perspective: 1000px; /* Creates the 3D effect */
  margin: 7px;
}

/* The tile itself */
.tile {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d; /* Needed for 3D flipping */
  transition: transform 0.6s; /* Controls the flipping speed */
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0,0,0,0.50), 6px 6px 6px rgba(0,0,0,0.50);
  /* box-shadow: 0 10px 20px rgba(255, 255, 255, 0.3), 6px 6px 6px rgba(255, 255, 255, 0.3); */
}

.tile:hover {
  transform: scale(1.02);
}

/* The front and back of the tile */
.front, .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* Hides the back when it's turned */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 3px;
  padding: 5px;
}

.front {
  background-color: var(--lmu-gray);
  color: var(--lmu-light-gray);
  font-weight: bold;
}

.back {
  /* background-color: #297244; */
  background-color: #00883A;
  color: var(--lmu-light-gray);
  transform: rotateY(180deg); /* Initially hidden by rotating 180 degrees */
  font-size:medium;
  font-weight: bold;
}

/* Flipping the tile when clicked */
.tile-container.clicked .tile {
  transform: rotateY(180deg); /* Flips the tile */
}
.wave {
    position:static;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.wave svg {
    position: relative;
    display: block;
    width: calc(140% + 1.3px);
    height: 80px;
}

.wave .shape-fill {
    fill: var(--lmu-gray);
}
.spacer {
  aspect-ratio: 960/100;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.layer1 {
  background-image: url(${layeredWavesSvg});
}
#layer1Img {
  width: 100%;
}

a {
  position: absolute;
  bottom: 8px;
  right: 10px;
}
</style>
