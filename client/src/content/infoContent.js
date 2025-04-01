export const infoContent = {
  section1: {
    title: {
      DE: 'Was ist eine formale Grammatik?',
      EN: 'What is a formal Grammar?'
    },
    content: {
      DE:
        `Formale Grammatiken sind mathematische Konstrukte, die syntaktische Regeln (auch Produktionen genannt) festlegen, mit deren Hilfe man formale Sprachen generieren kann. \n\
        In mathematischen Termen ist eine Grammatik als 4-Tupel G = (V, Σ, P, S) wie folgt definiert: \n\
        \u2003 • V ist eine endliche Menge an Variablen (Nichtterminalsymbole) \n\
        \u2003 • Σ ist ein Alphabet, also eine nicht-leere Menge von Zeichen (Terminalsymbole), wobei V ∩ Σ = ∅ gelten muss \n\
        \u2003 • P ist eine endliche Menge an Produktionen (Regeln) der Form u → v mit u ∈ (V ∪ Σ)⁺ und v ∈ (V ∪ Σ)* \n\
        \u2003 • S ∈ V ist das Startsymbol \n\
        Noam Chomsky entwickelte in den 1950er Jahren die Chomsky-Hierarchie, welche formale Grammatiken in vier verschiedene Typen klassifiziert`,
      EN:
        `Formal grammars are mathematical constructs that define syntactic rules (also called productions) which can be used to generate formal languages. \n\
        In mathematical terms, a grammar is defined as a 4-tuple G = (V, Σ, P, S) as follows: \n\
        \u2003 • V is a finite set of variables (non-terminal symbols) \n\
        \u2003 • Σ is an alphabet, i.e., a non-empty set of characters (terminal symbols), where V ∩ Σ = ∅ must hold \n\
        \u2003 • P is a finite set of productions (rules) of the form u → v with u ∈ (V ∪ Σ)⁺ and v ∈ (V ∪ Σ)* \n\
        \u2003 • S ∈ V is the start symbol \n\
        Noam Chomsky developed the Chomsky hierarchy in the 1950s, which classifies formal grammars into four different types`
    }
  },
  section2: {
    title: {
      DE: 'Was ist eine formale Sprache?',
      EN: 'What is a formal Language?'
    },
    content: {
      DE:
        `Eine 𝘧𝘰𝘳𝘮𝘢𝘭𝘦 𝘚𝘱𝘳𝘢𝘤𝘩𝘦 𝐋₁ ist eine Menge von Wörtern, die aus einem festgelegten 𝘈𝘭𝘱𝘩𝘢𝘣𝘦𝘵 hervorgehen.
        Welche Wörter zu 𝐋₁ gehören, hängt von der 𝘧𝘰𝘳𝘮𝘢𝘭𝘦𝘯 𝘎𝘳𝘢𝘮𝘮𝘢𝘵𝘪𝘬 𝐆₁ ab, die diese Sprache erzeugt.
        Alle Wörter, die durch Anwenden von 𝘱𝘳𝘰𝘥𝘶𝘬𝘵𝘪𝘰𝘯𝘦𝘯 vom 𝘚𝘵𝘢𝘳𝘵𝘴𝘺𝘮𝘣𝘰𝘭 𝐒 ∈ 𝐆₁ aus ableitbar sind,
        gehören zu 𝐋₁. Formal gilt:
        \u2003 𝐋(𝐆₁) = 𝐋₁
        wobei 𝐋(⋅) die von 𝐆₁ 𝘦𝘳𝘻𝘦𝘶𝘨𝘵𝘦 𝘚𝘱𝘳𝘢𝘤𝘩𝘦 bezeichnet.`,
      EN:
        `A 𝘧𝘰𝘳𝘮𝘢𝘭 𝘭𝘢𝘯𝘨𝘶𝘢𝘨𝘦 𝐋₁ is a set of words derived from a defined 𝘢𝘭𝘱𝘩𝘢𝘣𝘦𝘵.
        Membership in 𝐋₁ depends on the 𝘧𝘰𝘳𝘮𝘢𝘭 𝘨𝘳𝘢𝘮𝘮𝘢𝘳 𝐆₁ that generates it.
        All words derivable from 𝐆₁'s 𝘴𝘵𝘢𝘳𝘵 𝘴𝘺𝘮𝘣𝘰𝘭 𝐒 via 𝘱𝘳𝘰𝘥𝘶𝘤𝘵𝘪𝘰𝘯𝘴 belong to 𝐋₁.
        Formally:
        \u2003 𝐋(𝐆₁) = 𝐋₁
        where 𝐋(⋅) denotes the 𝘭𝘢𝘯𝘨𝘶𝘢𝘨𝘦 𝘨𝘦𝘯𝘦𝘳𝘢𝘵𝘦𝘥 by 𝐆₁.`
    }
  },
  section3: {
    title: {
      DE: 'Was ist eine kontextsensitive Grammatik bzw. Sprache?',
      EN: 'What is a context-sensitive Grammar / Language?'
    },
    content: {
      DE:
        `Eine 𝘬𝘰𝘯𝘵𝘦𝘹𝘵𝘴𝘦𝘯𝘴𝘪𝘵𝘪𝘷𝘦 𝘎𝘳𝘢𝘮𝘮𝘢𝘵𝘪𝘬 (𝐂𝐒𝐆) ist durch Produktionen 𝑃 definiert, die folgendes erfüllen:
          \u2003 ∀ (𝑢 → 𝑣) ∈ 𝑃 : |𝑢| ≤ |𝑣|
          \u2003 d.h., die linke Seite (𝑢) ist niemals länger als die rechte Seite (𝑣).
        𝗕𝗲𝗶𝘀𝗽𝗶𝗲𝗹𝗽𝗿𝗼𝗱𝘂𝗸𝘁𝗶𝗼𝗻𝗲𝗻:
          \u2003 1. 𝚊𝙰𝚋 → 𝚊𝚊𝚊𝚋  (|𝚊𝙰𝚋| = 3 ≤ |𝚊𝚊𝚊𝚋| = 5)
          \u2003 2. 𝙰𝙱 → 𝙰𝚉𝚈  (|𝙰𝙱| = 2 ≤ |𝙰𝚉𝚈| = 3)`,
      EN:
        `A 𝘤𝘰𝘯𝘵𝘦𝘹𝘵-𝘴𝘦𝘯𝘴𝘪𝘵𝘪𝘷𝘦 𝘨𝘳𝘢𝘮𝘮𝘢𝘳 (𝐂𝐒𝐆) is defined by productions 𝑃 obeying:
          \u2003 ∀(𝑢 → 𝑣) ∈ 𝑃 : |𝑢| ≤ |𝑣|
          \u2003 i.e., the left-hand side (𝑢) is never longer than the right-hand side (𝑣).
        𝗘𝘅𝗮𝗺𝗽𝗹𝗲 𝗽𝗿𝗼𝗱𝘂𝗰𝘁𝗶𝗼𝗻𝘀:\u000A\u2003 1. 𝚊𝙰𝚋 → 𝚊𝚊𝚊𝚋  (|𝚊𝙰𝚋| = 3 ≤ |𝚊𝚊𝚊𝚋| = 5)
          \u2003 2. 𝙰𝙱 → 𝙰𝚉𝚈  (|𝙰𝙱| = 2 ≤ |𝙰𝚉𝚈| = 3)`
    }
  },
  section4: {
    title: {
      DE: 'Was ist das Wortproblem?',
      EN: 'What is the word problem?'
    },
    content: {
      DE:
        `Das 𝘞𝘰𝘳𝘵𝘱𝘳𝘰𝘣𝘭𝘦𝘮 (auch 𝘞𝘰𝘳𝘵𝘱𝘳𝘰𝘣𝘭𝘦𝘮 genannt) fragt, ob ein gegebenes Wort 𝐰 zu einer formalen Sprache 𝐋 gehört.
          \u2003 Formal: 𝐰 ∈ 𝐋?
        Für eine Grammatik 𝐆 mit 𝐋(𝐆) = 𝐋 bedeutet dies, zu entscheiden, ob 𝐰 durch Anwendung der 𝘗𝘳𝘰𝘥𝘶𝘬𝘵𝘪𝘰𝘯𝘴𝘳𝘦𝘨𝘦𝘭𝘯 von 𝐆 aus dem Startsymbol 𝐒 abgeleitet werden kann. \
        Das Problem ist 𝘦𝘯𝘵𝘴𝘤𝘩𝘦𝘪𝘥𝘣𝘢𝘳 für reguläre, kontextfreie und kontextsensitive Sprachen, wird aber 𝘶𝘯𝘦𝘯𝘵𝘴𝘤𝘩𝘦𝘪𝘥𝘣𝘢𝘳 für allgemeinere Sprachklassen.`,
      EN:
        `The 𝘸𝘰𝘳𝘥 𝘱𝘳𝘰𝘣𝘭𝘦𝘮 asks whether a given word 𝐰 belongs to a formal language 𝐋.
          \u2003 Formally: 𝐰 ∈ 𝐋?
        For a grammar 𝐆 with 𝐋(𝐆) = 𝐋, this means deciding if 𝐰 can be derived from 𝐆's start symbol 𝐒 using its 𝘱𝘳𝘰𝘥𝘶𝘤𝘵𝘪𝘰𝘯 𝘳𝘶𝘭𝘦𝘴. \
        The problem is 𝘥𝘦𝘤𝘪𝘥𝘢𝘣𝘭𝘦 for regular, context-free and context-sensitive languages but becomes 𝘶𝘯𝘥𝘦𝘤𝘪𝘥𝘢𝘣𝘭𝘦 for more general language classes.`
    }
  },
  section5: {
    title: {
      DE: 'Warum ist das Wortproblem für kontextsensitive Sprachen entscheidbar?',
      EN: 'Why is the word problem solvable for context-sensitive languages?'
    },
    content: {
      DE:
      `Die Regel ∀(u → v) ∈ P: |u| ≤ |v| bedeutet, dass die rechte Seite v einer Produktion nie kürzer als die linke Seite u sein darf.  

      Dadurch kann man einfach überprüfen, ob alle Wörter bis zu einer bestimmten Länge n in der Sprache L gefunden wurden.  
      Beim Aufzählen der Wörter mit |w| ≤ n (n ∈ ℕ⁺) werden Ableitungen so lange durchgeführt, bis keine neuen Wörter oder Satzformen mit |w| ≤ n mehr entstehen.  

      Da sowohl das Alphabet Σ als auch die Menge der Variablen V endlich sind, gibt es nur endlich viele mögliche Kombinationen von Symbolen aus (Σ ∪ V) mit Länge ≤ n.  
      Das bedeutet, dass auch die Anzahl der möglichen Satzformen begrenzt ist und sie alle in endlicher Zeit bestimmt werden können.  
      Man kann also in endlicher Zeit bestimmen, ob ein Wort w in einer Sprache L enthalten ist oder nicht. Somit ist das Wortproblem für kontextsensitive Sprachen entscheidbar.`,

      EN:
      `The rule ∀(u → v) ∈ P: |u| ≤ |v| means that the right-hand side v of a production can never be shorter than the left-hand side u.  

      This makes it easy to check whether all words up to a certain length n in the language L have been found.  
      When listing words with |w| ≤ n (n ∈ ℕ⁺), derivations continue until no new words or sentential forms with |w| ≤ n appear.  

      Since both the alphabet Σ and the set of variables V are finite, there are only a limited number of possible symbol combinations from (Σ ∪ V) with length ≤ n.  
      This means that the number of possible sentential forms is also limited, and they can all be determined in a finite amount of time.  
      Consequently, one can decide in finite time whether a word w is part of a language L or not. Thus, the word problem for context-sensitive languages is decidable.`
    }
  },
  section6: {
    title: {
      DE: 'Eine Auswahl praktischer Anwendungen der Theorie formaler Sprachen',
      EN: 'A Selection of Practical Applications of Formal Language Theory'
    },
    content: {
      DE:
        `𝗣𝗿𝗼𝗴𝗿𝗮𝗺𝗺𝗶𝗲𝗿𝘀𝗽𝗿𝗮𝗰𝗵𝗲𝗻:\n` +
        ` • 𝐂𝐨𝐦𝐩𝐢𝐥𝐞𝐫-𝐏𝐚𝐫𝐬𝐢𝐧𝐠 (LL/LR-Grammatiken):\n` +
        `\u2003  Moderne Compiler nutzen kontextfreie Grammatiken zur Strukturanalyse von Quellcode\n` +
        `\u2003  und zur Erzeugung eines Abstrakten Syntaxbaums (AST).\n` +
        `\u2003  (Siehe: 𝘞𝘢𝘨𝘦𝘯𝘬𝘯𝘦𝘤𝘩𝘵, 𝘊., 𝘏𝘪𝘦𝘭𝘴𝘤𝘩𝘦, 𝘔.: "𝘍𝘰𝘳𝘮𝘢𝘭𝘦 𝘚𝘱𝘳𝘢𝘤𝘩𝘦𝘯, 𝘢𝘣𝘴𝘵𝘳𝘢𝘬𝘵𝘦 𝘈𝘶𝘵𝘰𝘮𝘢𝘵𝘦𝘯 𝘶𝘯𝘥 𝘊𝘰𝘮𝘱𝘪𝘭𝘦𝘳")\n` +
        `• 𝐒𝐲𝐧𝐭𝐚𝐱𝐡𝐞𝐫𝐯𝐨𝐫𝐡𝐞𝐛𝐮𝐧𝐠:\n` +
        `\u2003  Editoren analysieren Code in Echtzeit mit regulären Ausdrücken für farbliche Markierungen.\n` +
        `\u2003  (Siehe: 𝘍𝘳𝘪𝘦𝘥𝘭, 𝘑. 𝘌. 𝘍.: "𝘔𝘢𝘴𝘵𝘦𝘳𝘪𝘯𝘨 𝘙𝘦𝘨𝘶𝘭𝘢𝘳 𝘌𝘹𝘱𝘳𝘦𝘴𝘴𝘪𝘰𝘯𝘴")\n\n` +

        `𝗧𝗲𝘅𝘁𝘃𝗲𝗿𝗮𝗿𝗯𝗲𝗶𝘁𝘂𝗻𝗴:\n` +
        `• 𝐑𝐞𝐠𝐮𝐥ä𝐫𝐞 𝐀𝐮𝐬𝐝𝐫ü𝐜𝐤𝐞 (Typ 3 Grammatiken):\n` +
        `\u2003  Ermöglichen komplexe Suchen/Ersetzen in Texten durch Mustererkennung.\n` +
        `\u2003  (Siehe: 𝘍𝘳𝘪𝘦𝘥𝘭, 𝘑. 𝘌. 𝘍.: "𝘔𝘢𝘴𝘵𝘦𝘳𝘪𝘯𝘨 𝘙𝘦𝘨𝘶𝘭𝘢𝘳 𝘌𝘹𝘱𝘳𝘦𝘴𝘴𝘪𝘰𝘯𝘴")\n` +
        `• 𝐗𝐌𝐋/𝐉𝐒𝐎𝐍-𝐕𝐚𝐥𝐢𝐝𝐢𝐞𝐫𝐮𝐧𝐠:\n` +
        `\u2003  Dokumentenstrukturen werden durch formale Grammatiken auf ihre Korrektheit überprüft.\n` +
        `\u2003  (Siehe: 𝘒𝘢𝘺, 𝘔.: "𝘟𝘚𝘓𝘛 2.0 𝘢𝘯𝘥 𝘟𝘗𝘢𝘵𝘩 2.0")\n\n` +

        `𝗕𝗶𝗼𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗸:\n` +
        `• 𝐃𝐍𝐀-𝐒𝐞𝐪𝐮𝐞𝐧𝐳𝐚𝐧𝐚𝐥𝐲𝐬𝐞:\n` +
        `\u2003  Spezielle Parser erkennen Nukleotidmuster in Genomdatenbanken.\n` +
        `\u2003 (Siehe: 𝘋𝘶𝘳𝘣𝘪𝘯, 𝘙. 𝘦𝘵 𝘢𝘭.: "𝘉𝘪𝘰𝘭𝘰𝘨𝘪𝘤𝘢𝘭 𝘚𝘦𝘲𝘶𝘦𝘯𝘤𝘦 𝘈𝘯𝘢𝘭𝘺𝘴𝘪𝘴")\n` +
        `• 𝐏𝐫𝐨𝐭𝐞𝐢𝐧𝐟𝐚𝐥𝐭𝐮𝐧𝐠:\n` +
        `\u2003  Kontextsensitive Grammatiken modellieren Molekülstrukturen in 3D-Simulationen.\n` +
        `\u2003 (Siehe: 𝘓𝘦𝘴𝘬, 𝘈. 𝘔.: "𝘐𝘯𝘵𝘳𝘰𝘥𝘶𝘤𝘵𝘪𝘰𝘯 𝘵𝘰 𝘗𝘳𝘰𝘵𝘦𝘪𝘯 𝘚𝘤𝘪𝘦𝘯𝘤𝘦")`,
      EN:
        `𝗣𝗿𝗼𝗴𝗿𝗮𝗺𝗺𝗶𝗻𝗴 𝗟𝗮𝗻𝗴𝘂𝗮𝗴𝗲𝘀:\n` +
        ` • 𝐂𝐨𝐦𝐩𝐢𝐥𝐞𝐫 𝐏𝐚𝐫𝐬𝐢𝐧𝐠 (LL/LR Grammars):\n` +
        `\u2003  Modern compilers use context-free grammars to analyze source code structure\n` +
        `\u2003  and to generate an Abstract Syntax Tree (AST).\n` +
        `\u2003  (See: 𝘞𝘢𝘨𝘦𝘯𝘬𝘯𝘦𝘤𝘩𝘵, 𝘊., 𝘏𝘪𝘦𝘭𝘴𝘤𝘩𝘦, 𝘔.: "𝘍𝘰𝘳𝘮𝘢𝘭𝘦 𝘚𝘱𝘳𝘢𝘤𝘩𝘦𝘯, 𝘢𝘣𝘴𝘵𝘳𝘢𝘬𝘵𝘦 𝘈𝘶𝘵𝘰𝘮𝘢𝘵𝘦𝘯 𝘶𝘯𝘥 𝘊𝘰𝘮𝘱𝘪𝘭𝘦𝘳")\n` +
        `• 𝐒𝐲𝐧𝐭𝐚𝐱 𝐇𝐢𝐠𝐡𝐥𝐢𝐠𝐡𝐭𝐢𝐧𝐠:\n` +
        `\u2003  Editors analyze code in real time using regular expressions for color-based highlighting.\n` +
        `\u2003  (See: 𝘍𝘳𝘪𝘦𝘥𝘭, 𝘑. 𝘌. 𝘍.: "𝘔𝘢𝘴𝘵𝘦𝘳𝘪𝘯𝘨 𝘙𝘦𝘨𝘶𝘭𝘢𝘳 𝘌𝘹𝘱𝘳𝘦𝘴𝘴𝘪𝘰𝘯𝘴")\n\n` +

        `𝗧𝗲𝘅𝘁 𝗣𝗿𝗼𝗰𝗲𝘀𝘀𝗶𝗻𝗴:\n` +
        `• 𝐑𝐞𝐠𝐮𝐥𝐚𝐫 𝐄𝐱𝐩𝐫𝐞𝐬𝐬𝐢𝐨𝐧𝐬 (Typ 3 Grammars):\n` +
        `\u2003  Enable complex search/replace operations in text using pattern matching.\n` +
        `\u2003  (See: 𝘍𝘳𝘪𝘦𝘥𝘭, 𝘑. 𝘌. 𝘍.: "𝘔𝘢𝘴𝘵𝘦𝘳𝘪𝘯𝘨 𝘙𝘦𝘨𝘶𝘭𝘢𝘳 𝘌𝘹𝘱𝘳𝘦𝘴𝘴𝘪𝘰𝘯𝘴")\n` +
        `• 𝐗𝐌𝐋/𝐉𝐒𝐎𝐍 𝐕𝐚𝐥𝐢𝐝𝐚𝐭𝐢𝐨𝐧:\n` +
        `\u2003  Document structures are verified for correctness using formal grammars.\n` +
        `\u2003  (See: 𝘒𝘢𝘺, 𝘔.: "𝘟𝘚𝘓𝘛 2.0 𝘢𝘯𝘥 𝘟𝘗𝘢𝘵𝘩 2.0")\n\n` +

        `𝗕𝗶𝗼𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗰𝘀:\n` +
        `• 𝐃𝐍𝐀 𝐒𝐞𝐪𝐮𝐞𝐧𝐜𝐞 𝐀𝐧𝐚𝐥𝐲𝐬𝐢𝐬:\n` +
        `\u2003  Specialized parsers identify nucleotide patterns in genome databases.\n` +
        `\u2003  (See: 𝘋𝘶𝘳𝘣𝘪𝘯, 𝘙. 𝘦𝘵 𝘢𝘭.: "𝘉𝘪𝘰𝘭𝘰𝘨𝘪𝘤𝘢𝘭 𝘚𝘦𝘲𝘶𝘦𝘯𝘤𝘦 𝘈𝘯𝘢𝘭𝘺𝘴𝘪𝘴")\n` +
        `• 𝐏𝐫𝐨𝐭𝐞𝐢𝐧 𝐅𝐨𝐥𝐝𝐢𝐧𝐠:\n` +
        `\u2003  Context-sensitive grammars model molecular structures in 3D simulations.\n` +
        `\u2003  (See: 𝘓𝘦𝘴𝘬, 𝘈. 𝘔.: "𝘐𝘯𝘵𝘳𝘰𝘥𝘶𝘤𝘵𝘪𝘰𝘯 𝘵𝘰 𝘗𝘳𝘰𝘵𝘦𝘪𝘯 𝘚𝘤𝘪𝘦𝘯𝘤𝘦")`
    }
  },
  section7: {
    title: {
      DE: 'So funktioniert\'s',
      EN: 'How It Works'
    },
    content: {
      DE:
        `𝐖𝐢𝐞 𝐦𝐚𝐧 𝐝𝐞𝐧 𝐀𝐥𝐠𝐨𝐫𝐢𝐭𝐡𝐦𝐮𝐬 𝐳𝐮𝐫 𝐋ö𝐬𝐮𝐧𝐠 𝐝𝐞𝐬 𝐖𝐨𝐫𝐭𝐩𝐫𝐨𝐛𝐥𝐞𝐦𝐬
        𝐟ü𝐫 𝐤𝐨𝐧𝐭𝐞𝐱𝐭𝐬𝐞𝐧𝐬𝐢𝐭𝐢𝐯𝐞 𝐒𝐩𝐫𝐚𝐜𝐡𝐞𝐧 𝐧𝐮𝐭𝐳𝐭

        ▸ Gib Grammatik & Wort in die Felder ein
        ▸ Klicke [𝐙𝐞𝐢𝐠𝐞 𝐋ö𝐬𝐮𝐧𝐠]:
        \u2003 ✓ Generiert Ableitungsbaum (falls korrekt)
        \u2003 ✓ Zeigt Fehler-Popup bei falscher Eingabe
        ▸ Navigieren im Baum:
        \u2003 • 𝐄𝐛𝐞𝐧𝐞-𝐁𝐮𝐭𝐭𝐨𝐧𝐬: Klappt ganze Ebenen auf
        \u2003 • 𝐊𝐧𝐨𝐭𝐞𝐧-𝐊𝐥𝐢𝐜𝐤: Einzelne Äste expandieren
        \u2003 • 𝐙𝐨𝐨𝐦/𝐏𝐚𝐧𝐧𝐢𝐧𝐠: Bewege/vergrößere den Baum

        𝐒𝐩𝐢𝐞𝐥𝐦𝐨𝐝𝐮𝐬 "𝐆𝐫𝐚𝐦𝐦𝐚𝐭𝐢𝐤 𝐄𝐫𝐤𝐮𝐧𝐝𝐮𝐧𝐠"
        
        ▸ Starte mit dem Symbol Ｓ
        ▸ Finde alle möglichen Ableitungen pro Schritt
        ▸ Erreiche das Zielwort in minimalen Schritten
        
        ⚙️ Schwierigkeitsgrade:
        • Einfach: Aus vorgegebenen Optionen wählen
        • Schwer: Eigene Ableitungen eingeben (Komma-getrennt)
          
        𝐒𝐩𝐢𝐞𝐥𝐦𝐨𝐝𝐮𝐬 "𝐅𝐢𝐧𝐝𝐞 𝐎𝐩𝐭𝐢𝐦𝐚𝐥𝐞𝐧 𝐏𝐟𝐚𝐝"
        
        ▸ Finde den schnellsten Weg zum Zielwort
        ▸ Wähle nur Ableitungen auf dem optimalen Pfad
        ▸ Jeder Umweg kostet Extra-Schritte!
  
        ⚙️ Schwierigkeitsgrade:
        • Einfach: Multiple-Choice-Optionen
        • Schwer: Pfad selbstständig eintippen`,
      EN:
        `𝐇𝐨𝐰 𝐭𝐨 𝐔𝐬𝐞 𝐭𝐡𝐞 𝐖𝐨𝐫𝐝 𝐏𝐫𝐨𝐛𝐥𝐞𝐦 𝐒𝐨𝐥𝐯𝐞𝐫
        𝐟𝐨𝐫 𝐂𝐨𝐧𝐭𝐞𝐱𝐭-𝐒𝐞𝐧𝐬𝐢𝐭𝐢𝐯𝐞 𝐋𝐚𝐧𝐠𝐮𝐚𝐠𝐞𝐬

        ▸ Enter grammar & word in input fields
        ▸ Click [𝐒𝐡𝐨𝐰 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧]:
        \u2003 ✓ Generates derivation tree (if correct)
        \u2003 ✓ Shows error popup for invalid input
        ▸ Navigate the tree:
        \u2003 • 𝐋𝐞𝐯𝐞𝐥-𝐁𝐮𝐭𝐭𝐨𝐧𝐬: Expand/collapse full levels
        \u2003 • 𝐍𝐨𝐝𝐞-𝐂𝐥𝐢𝐜𝐤: Toggle individual branches
        \u2003 • 𝐙𝐨𝐨𝐦/𝐏𝐚𝐧𝐧𝐢𝐧𝐠: Move/scale the tree
        
        𝐆𝐚𝐦𝐞𝐦𝐨𝐝𝐞 "𝐆𝐫𝐚𝐦𝐦𝐚𝐫 𝐄𝐱𝐩𝐥𝐨𝐫𝐚𝐭𝐢𝐨𝐧"
        
        ▸ Start from symbol Ｓ
        ▸ Discover all possible derivations per step
        ▸ Reach the target word with minimal steps
        
        ⚙️ Difficulty:
        • Easy: Select from given options
        • Hard: Type derivations (comma-separated)
          
        𝐆𝐚𝐦𝐞𝐦𝐨𝐝𝐞 "𝐅𝐢𝐧𝐝 𝐎𝐩𝐭𝐢𝐦𝐚𝐥 𝐏𝐚𝐭𝐡"
        
        ▸ Find the fastest path to the target word
        ▸ Only choose derivations on the optimal path
        ▸ Detours cost extra steps!
        
        ⚙️ Difficulty:
        • Easy: Multiple-choice options
        • Hard: Type the path manually`
    }
  }
}
