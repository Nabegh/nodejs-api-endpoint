
var url = '/url/http://www.google.com'.slice(5);
var urlValidation = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
// true


console.log(url + urlValidation);