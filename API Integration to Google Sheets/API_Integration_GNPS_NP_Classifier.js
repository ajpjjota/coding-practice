function classifyCompound(smiles) {
  const encodedSmiles = encodeURIComponent(smiles);

  const url = `https://npclassifier.gnps2.org/classify?smiles=${encodedSmiles}`;

  const options = {
    method: "get",
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const text = response.getContentText();

  // Debug: log raw response if needed
  Logger.log(text);

  const json = JSON.parse(text);

 return [[
    json.class_results ? json.class_results.join(", ") : "N/A",
    json.superclass_results ? json.superclass_results.join(", ") : "N/A",
    json.pathway_results ? json.pathway_results.join(", ") : "N/A"
  ]];
}


// for use in Google Sheets; type in =classifyCompound(<<smiles>>)
// uses GNPS's NP Classifier API