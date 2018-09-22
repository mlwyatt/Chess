Array.prototype.compact = function() {
  return this.filter((value) => {return value !== null && value !== undefined});
};

Array.prototype.flatten = function() {
  return [].concat.apply([],this);
};

Array.prototype.select = Array.prototype.filter;

Array.prototype.reject = function(callback) {
  return this.filter((v,i,ar)=>!callback(v,i,ar));
};

Array.prototype.includes = function(toFind) {
  return this.indexOf(toFind) > -1;
};

Array.prototype.excludes = function(toFind) {
  return !this.includes(toFind);
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};