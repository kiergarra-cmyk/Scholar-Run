// What the Library Game Hub shows about YOUR game (Hub Contract, rule 1).
// Lab Step 6: replace every CHANGE_ME value with your own.
const pkg = require('../../package.json');

module.exports = {
  slug: 'Scholar-Run',            // your group's game, lower case with hyphens, for example shelf-climb
  name: 'Scholar_Run',            // the name players will see
  team: '3',            // your group's name and section, for example Bookworms (3-1)
  developer: 'kiergarra-cmyk' ,   // YOUR GitHub username: this build is yours
  description: 'Scholar’s Run is a campus-based quiz survival and strategy tournament where players navigate university locations, answer location-specific questions, manage their Energy, and make strategic route choices to survive and achieve the highest possible score.',     // one sentence about how the game is played
  min_players: 1,               // change to the limits your game is designed for
  max_players: 10,
  version: pkg.version,         // read from package.json, do not edit here
};
