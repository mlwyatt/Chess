Array.prototype.compact = function() {
  return this.filter(function(value){
    return value !== null && value !== undefined;
  });
};

Array.prototype.flatten = function() {
  return [].concat.apply([],this);
};