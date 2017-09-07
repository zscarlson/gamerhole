// Note: These are the rules that formats use
// The list of formats is stored in config/formats.js

'use strict';

exports.BattleFormats = {

	bigclause: {
		effectType: 'ValidatorRule',
		name: 'Big Clause',
		onStart: function () {
				this.add('rule', 'BIG BOY BATTLE Rules: Pok\u00E9mon must weigh 100 kg or more.');
		},
		onValidateTeam: function (team, format) {
				for (let i = 0; i < team.length; i++) {
						let template = this.getTemplate(team[i].species);
						if (template.weightkg < 100) {
								return ["Pokemon must all weigh 100 kg or more."];
						}
				}
		},
	},
};
