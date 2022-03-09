// takes a string and outputs an integer, the hashed value.
function hash(string) {
  return string.split('')
               .map(char => char.charCodeAt())
               .reduce((sum, num) => sum + num, 0);
}

// take a userId (string) and a rollout % (integer between 0 and 100)
// and outputs a bool, whether the user is in the rollout or not
function userInRollout(userId, rollout) {
  if (typeof rollout !== 'number' || rollout < 0 || rollout > 100) {
    return undefined;
  }
  const hashedUserId = hash(userId);
  return hashedUserId % 100 < rollout;
}

module.exports = userInRollout;