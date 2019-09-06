export default {
    methods: {
        characterClasses(char) {
            return {
              dead: char.status.dead === true,
              ninja: char.status.playerSwapped === true,
              'love-bind': char.status.linked === true,
              silenced: char.status.silenced === true,
              healed: char.status.healed === true,
              shield: char.status.shield === true && !char.status.hacked, // Active if not hacked
              invisible: char.status.invisible === true && !char.status.hacked, // Active if not hacked
              hacked: char.status.hacked === true,
              skeleton: char.status.revived === true,
            };
        }
    }
}