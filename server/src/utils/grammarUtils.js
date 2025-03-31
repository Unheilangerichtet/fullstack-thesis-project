exports.formatGrammar = (productions, startSymbol) => {
  const productionRules = productions.split(',');
  const mappedProductions = productionRules.map((rule) => {
    const [leftSide, rightSide] = rule.split('->');
    return { leftSide, rightSide };
  });
  const grammar = {
    startSymbol: startSymbol,
    productions: mappedProductions,
  };
  return JSON.stringify(grammar);
};
