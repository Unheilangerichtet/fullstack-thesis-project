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

// Derive new sentential forms and store transformations in the catalog
func derive(sententialForm string, production Production, catalog *[][]string) []string {
	var sententialForms []string
	if strings.Contains(sententialForm, production.LeftSide) {
		newElem := strings.Replace(sententialForm, production.LeftSide, production.RightSide, 1)
		sententialForms = append(sententialForms, newElem)
		// Save the transformation: [sententialForm, newElem, production]
		*catalog = append(*catalog, []string{sententialForm, newElem, production.LeftSide + "->" + production.RightSide})
	}
	return sententialForms
}

// Generate next sentential forms
func next(currentSet map[string]struct{}, n int, productions []Production, catalog *[][]string) (map[string]struct{}, map[string]struct{}) {
	nextSet := make(map[string]struct{})
	relations := make(map[string]struct{}) // Set to store relations
	for sententialForm := range currentSet {
		for _, production := range productions {
			derivedSententialForms := derive(sententialForm, production, catalog)
			for _, form := range derivedSententialForms {
				if len(form) <= n {
					// nextSet and relations are maps that act as Sets by just having empty struncs as values.
					// As each key can only exist once, it is like as set
					nextSet[form] = struct{}{}                      //adds the key form to nextSet, with an empty struct as value.
					relations[form+","+sententialForm] = struct{}{} //adds the key 'form+","+sententialForm' to relations, with an empty struct as value.
				}
			}
		}
	}
	return nextSet, relations
}

// Check if the word is in the grammar
func isWordInGrammar(grammar Grammar, word string) (bool, string, [][]string) {
	n := len(word)
	L := map[string]struct{}{grammar.StartSymbol: {}}
	oldL := make(map[string]struct{})
	relations := make(map[string]struct{})

	var catalog [][]string // To store all transformations

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
		nextSet, rels := next(L, n, grammar.Productions, &catalog)
		relations = rels

		for k, v := range L {
			nextSet[k] = v
		}

		L = nextSet
	}

	data := make([]string, 0, len(relations))
	for k := range relations {
		data = append(data, k)
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		return false, "", nil
	}

	_, exists := L[word]
	return exists, string(jsonData), catalog
}

func main() {
	if len(os.Args) < 3 {
		return
	}

	grammarJSON := os.Args[1]
	word := os.Args[2]

	var grammar Grammar
	err := json.Unmarshal([]byte(grammarJSON), &grammar)
	if err != nil {
		fmt.Println("Error parsing JSON data:", err)
		return
	}

	result, data, catalog := isWordInGrammar(grammar, word)

	output := struct {
		Result     bool       `json:"result"`
		JsonOutput string     `json:"relations"`
		Catalog    [][]string `json:"catalog"`
	}{
		Result:     result,
		JsonOutput: data,
		Catalog:    catalog,
	}

	outputJSON, err := json.Marshal(output)
	if err != nil {
		fmt.Println("Error generating output JSON:", err)
		return
	}

	os.Stdout.WriteString(string(outputJSON))
}
