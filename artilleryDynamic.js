
var generateRandomID = (userContext, context, ee, next) => {
  var randomID = Math.floor(Math.random() * (10000001 - 1) + 1);

  userContext.vars.randomID = randomID;
  return next();
}

module.exports = generateRandomID;