package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

type Production struct {
	LeftSide  string `json:"leftSide"`
	RightSide string `json:"rightSide"`
}

type Grammar struct {
	StartSymbol string       `json:"startSymbol"`
	Productions []Production `json:"productions"`
}

// Check if two sets are equal
func isEql(oldSet, newSet map[string]struct{}) bool {
	if len(oldSet) != len(newSet) {
		return false
	}
	for k := range oldSet {
		if _, ok := newSet[k]; !ok {
			return false
		}
	}
	return true
}

// Derive new sentential forms
func derive(sententialForm string, production Production) []string {
	var sententialForms []string
	if strings.Contains(sententialForm, production.LeftSide) {
		newElem := strings.Replace(sententialForm, production.LeftSide, production.RightSide, 1)
		// fmt.Printf("Deriving: %s -> %s results in %s\n", sententialForm, production.LeftSide, newElem) // Debugging output
		sententialForms = append(sententialForms, newElem)
	}
	return sententialForms
}

// Generate next sentential forms
func next(currentSet map[string]struct{}, n int, productions []Production) (map[string]struct{}, map[string]struct{}) {
	nextSet := make(map[string]struct{})
	relations := make(map[string]struct{}) // Set to store relations
	for sententialForm := range currentSet {
		for _, production := range productions {
			derivedSententialForms := derive(sententialForm, production)
			for _, form := range derivedSententialForms {
				if len(form) <= n {
					nextSet[form] = struct{}{}
					relations[form+","+sententialForm] = struct{}{}
					// fmt.Printf("Next set element added: %s\n", form) // Debugging output
				}
			}
		}
	}
	return nextSet, relations
}

// Check if the word is in the grammar
func isWordInGrammar(grammar Grammar, word string) (bool, string) {
	// startTime := time.Now()
	n := len(word)
	L := map[string]struct{}{grammar.StartSymbol: {}}
	oldL := make(map[string]struct{})

	//fmt.Println("Initial sentential form:", L) // Debugging output
	relations := make(map[string]struct{})
	for {
		if _, exists := L[word]; exists {
			break
		}
		if isEql(oldL, L) {
			break
		}
		oldL = make(map[string]struct{}, len(L))
		for k := range L {
			oldL[k] = struct{}{}
		}
		// Create a new map to store the next set of sentential forms
		nextSet, rels := next(L, n, grammar.Productions)
		relations = rels
		// fmt.Println("relations: ", relations)

		// Add the existing elements of L to the nextSet
		for k, v := range L {
			nextSet[k] = v
		}

		// Assign nextSet back to L
		L = nextSet
	}
	// ---- CONSOLE PRINTS -------------------------------------------------------------
	// fmt.Print("RELATIONS: ")
	// for key := range relations {
	// 	fmt.Print(key, "; ")
	// }
	// fmt.Println()
	// fmt.Print("SENTENTIAL FORMS: ")
	// for key := range L {
	// 	fmt.Print(key, "; ")
	// }
	// fmt.Println()
	// ---------------------------------------------------------------------------------
	// data := make([]string, 0, len(L))
	// for k := range L {
	// 	data = append(data, k)
	// }
	data := make([]string, 0, len(relations))
	for k := range relations {
		data = append(data, k)
	}

	// duration := time.Since(startTime)
	// fmt.Println("Duration:", duration.Milliseconds(), "ms") // Debugging output

	jsonData, err := json.Marshal(data)
	if err != nil {
		// fmt.Println("Error creating JSON string:", err)
		return false, ""
	}

	_, exists := L[word]
	return exists, string(jsonData)
}

func main() {
	if len(os.Args) < 3 {
		// fmt.Println("Usage: program <grammar_json> <word>")
		return
	}

	grammarJSON := os.Args[1]
	word := os.Args[2]

	//fmt.Println("Grammar JSON:", grammarJSON) // Debugging output
	// fmt.Println("WORD:", word) // Debugging output

	var grammar Grammar
	err := json.Unmarshal([]byte(grammarJSON), &grammar)
	if err != nil {
		fmt.Println("Error parsing JSON data:", err)
		return
	}

	// fmt.Println("GRAMMAR:", grammar) // Debugging output

	result, data := isWordInGrammar(grammar, word)
	// result is the boolean value stored in "exists" at the end of isWordInGrammar function
	// fmt.Println("DATA: ", data)

	output := struct {
		Result     bool   `json:"result"`
		JsonOutput string `json:"relations"`
	}{
		Result:     result,
		JsonOutput: data,
	}

	outputJSON, err := json.Marshal(output)
	if err != nil {
		fmt.Println("Error generating output JSON:", err)
		return
	}

	// fmt.Println("OUTPUT: ", string(outputJSON))
	os.Stdout.WriteString(string(outputJSON))
}
