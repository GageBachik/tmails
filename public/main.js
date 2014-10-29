$(function(){
  $.post('/pubmed', {link: 'http://www.ncbi.nlm.nih.gov/pubmed/17023870'}, function(res){
  	console.log("res:", res);
  })
});