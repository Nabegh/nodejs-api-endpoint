
var url = '/endpoint?url=http://www.google.com'.slice(14);
var urlValidation = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
// true


console.log(url + urlValidation);