function inRange(val, low, high) {
  return val >= low && val < high
}

// takes a string and outputs an integer, the hashed value.
function hash(string) {
  return string.split('')
               .map(char => char.charCodeAt())
               .reduce((sum, num) => sum + num, 0);
}

// take a userId (string), a rollout % (integer between 0 and 100),
// and a hashOffset (integer between 0-99)
// and outputs a bool, whether the user is in the rollout or not
function userInRollout(userId, rollout, hashOffset, customAssignments) {
  const userAssignment = customAssignments[userId];
  if (userAssignment !== undefined) {
    return userAssignment;
  }

  const hashedUserId = hash(userId) % 100;
  const endPoint = hashOffset + rollout;
  if (endPoint > 100) {
    const lowEndPoint = endPoint - 100;
    return inRange(hashedUserId, 0, lowEndPoint) || inRange(hashedUserId, hashOffset, 100)
  } else {
    return inRange(hashedUserId, hashOffset, endPoint);
  }
}

module.exports = userInRollout;
