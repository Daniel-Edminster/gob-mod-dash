export function mapCommentsToSignups(comments, roles) {
   console.log(roles);
  const signupPool = new Set();

  // iterate through signup comments, and create a set 
  // containing user objects with properties for each role signed up for
  comments.forEach((signup) => {
      if (signup.author.name.length > 0 && signup.author.name != "[deleted]") {
          let user = {};
          user.roles = [];
          roles.forEach((role) => {
              if (signup.body.toLowerCase().includes(role)) {
                  user.username = signup.author.name;
                  user.roles.push(role);
              }
          });
          if(Object.keys(user.roles).length > 0) signupPool.add(user);
      }
  });

  // shuffle the array

  let signupPoolArray = shuffle(Array.from(signupPool));

  // sort the array according to number of roles signed up for, lowest to highest

  // let sorted_signupPoolArray = signupPoolArray.sort(function(a, b) {
  //     return Object.keys(a).length - Object.keys(b).length;
  // })

  return signupPoolArray;

  // assignTeams(sorted_signupPoolArray, roles, roleLengths);
}

// Fisher - Yates shuffle Algorithm
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}