'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [

	//Gamer Hole Formats
	///////////////////////////////////////////////////////////////////

	{
		section: "Gamer Hole Fun",
		column: 2,
	},
	{
		name: "[Gen 7] VGC 2017 LC",
	  desc: ["VGC 2017 Little Cup"],

	  mod: 'gen7',
	  gameType: 'doubles',
	  forcedLevel: 5,
	  teamLength: {
	   validate: [4, 6],
	   battle: 4,
	  },
	  ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod', 'Alola Pokedex', 'Little Cup'],
	  banlist: ['Illegal', 'Unreleased', 'Sneasel', 'Misdreavus', 'Murkrow', 'Scyther', 'Eevee', 'Type: Null', 'Cosmog', 'Dragon Rage', 'Sonic Boom', 'Conversion', 'Slush Rush', 'Water Bubble'],
	  requirePlus: true,
	},
	{
		name: "[Gen 7] BIG BOY BATTLE",

		mod: 'gen7',
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Team Preview', 'Standard GBU', 'Big Clause'],
		banlist: ['Mega'],
	},
	{
		name: "[Gen 7] BSD Factory",
		desc: [
			"Randomised 4v4 Doubles featuring Pok&eacute;mon and movesets popular in Battle Spot Doubles.",
		],
		mod: 'gen7',
		gameType: 'doubles',
		team: 'randomBSDFactory',
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
	},
	{
		name: "[Gen 7] Challenge Cup 2v2",

		mod: 'gen7',
		gameType: 'doubles',
		team: 'randomCC',
		teamLength: {
			battle: 2,
		},
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
	},
	{
		name: "[Gen 7] Clover Doubles",

		mod: 'gen7',
		gameType: 'doubles',
		ForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePlus: true,
	},
	{
	  name: "[Gen 7] Alolan VGC 2016",
	  desc: ["Imagine if you took VGC 2016 and put it into gen 7. That's this. Solgaleo, Lunala, Z-Moves galore."],
	  mod: 'gen7',
	  gameType: 'doubles',
	  maxForcedLevel: 50,
	  teamLength: {
	    validate: [4, 6],
	    battle: 4,
	  },
	  ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
	  banlist: [
	    'Illegal', 'Unreleased', 'Mew', 'Celebi', 'Jirachi', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Phione', 'Manaphy', 'Darkrai',
	    'Shaymin', 'Shaymin-Sky', 'Arceus', 'Victini', 'Keldeo', 'Meloetta', 'Genesect', 'Diancie', 'Hoopa', 'Hoopa-Unbound', 'Volcanion', 'Magearna', 'Marshadow',
	  ],
	  requirePentagon: true,
	  onValidateTeam: function (team) {
	    const legends = {'Mewtwo':1, 'Lugia':1, 'Ho-Oh':1, 'Kyogre':1, 'Groudon':1, 'Rayquaza':1, 'Dialga':1, 'Palkia':1, 'Giratina':1, 'Reshiram':1, 'Zekrom':1, 'Kyurem':1, 'Xerneas':1,
		'Yveltal':1, 'Zygarde':1, 'Cosmog':1, 'Cosmoem':1, 'Solgaleo':1, 'Lunala':1, "Necrozma":1};
	    let n = 0;
	    for (let i = 0; i < team.length; i++) {
	      let template = this.getTemplate(team[i].species).baseSpecies;
	      if (template in legends) n++;
	      if (n > 2) return ["You can only use up to two legendary Pok\u00E9mon."];
	    }
	  },
	},
	/*{ //OLD MYTHICAL VGC
	  name: "[Gen 7] Mythical VGC",
	  desc: ["Have you ever thought, \"Wow, this Mythical Pok&eacute;mon fits my team perfectly, but it's illegal in VGC!\" Well no more!",
	  "This format combines VGC 2016 with Gen 7 Pok&eacute;mon and mechanics while allowing one mythical Pok&eacute;mon per team instead of one of your restricted Pok&eacute;mon",
	  ],
	  mod: 'gen7',
	  gameType: 'doubles',
	  maxForcedLevel: 50,
	  teamLength: {
	    validate: [4, 6],
	    battle: 4,
	  },
	  ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
	  banlist: [
	    'Illegal', 'Unreleased',
	  ],
	  requirePentagon: true,
	  onValidateTeam: function (team) {
	    const legends = {'Mewtwo':1, 'Lugia':1, 'Ho-Oh':1, 'Kyogre':1, 'Groudon':1, 'Rayquaza':1, 'Dialga':1, 'Palkia':1, 'Giratina':1, 'Reshiram':1, 'Zekrom':1, 'Kyurem':1, 'Xerneas':1,
	    'Yveltal':1, 'Zygarde':1, 'Cosmog':1, 'Cosmoem':1, 'Solgaleo':1, 'Lunala':1, 'Necrozma':1};
	    const mythicals = {'Mew':1, 'Celebi':1, 'Jirachi':1, 'Deoxys':1, 'Deoxys-Attack':1, 'Deoxys-Defense':1, 'Deoxys-Speed':1, 'Phione':1, 'Manaphy':1, 'Darkrai':1,
	    'Shaymin':1, 'Shaymin-Sky':1, 'Arceus':1, 'Victini':1, 'Keldeo':1, 'Meloetta':1, 'Genesect':1, 'Diancie':1, 'Hoopa':1, 'Hoopa-Unbound':1, 'Volcanion':1, 'Magearna':1, 'Marshadow':1};
	    let n = 0;
	    let m = 0;
	    for (let i = 0; i < team.length; i++) {
	      let template = this.getTemplate(team[i].species).baseSpecies;
	      if (template in legends) n++;
	      if (template in mythicals) {n++; m++;}
	      if (n > 2) return ["You can only use up to two legendary and mythical Pok\u00E9mon total."];
	      if (m > 1) return ["You can only use one mythical Pok\u00E9mon."];
	    }
	  },
	},*/

	{
	  name: "[Gen 7] Mythical VGC",
	  desc: ["Have you ever thought, \"Wow, this Mythical Pok&eacute;mon fits my team perfectly, but it's illegal in VGC!\" Well no more!",
		"This format combines a Gen 7 National Dex format and allows one Mythical Pok%eacute;mon on each team! ARCEUS IS BANNED."
	],
	  mod: 'gen7',
	  gameType: 'doubles',
	  maxForcedLevel: 50,
	  teamLength: {
	    validate: [4, 6],
	    battle: 4,
	  },
	  ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
	  banlist: [
	    'Illegal', 'Unreleased', 'Mewtwo', 'Lugia', 'Ho-Oh', 'Kyogre', 'Groudon', 'Rayquaza', 'Dialga', 'Palkia', 'Giratina', 'Arceus',
	    'Reshiram', 'Zekrom', 'Kyurem', 'Xerneas', 'Yveltal', 'Zygarde', 'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma',
	  ],
	  requirePentagon: true,
	  onValidateTeam: function (team) {
	  const mythicals = {'Mew':1, 'Celebi':1, 'Jirachi':1, 'Deoxys':1, 'Deoxys-Attack':1, 'Deoxys-Defense':1, 'Deoxys-Speed':1, 'Phione':1, 'Manaphy':1, 'Darkrai':1,
	  'Shaymin':1, 'Shaymin-Sky':1, 'Victini':1, 'Keldeo':1, 'Meloetta':1, 'Genesect':1, 'Diancie':1, 'Hoopa':1, 'Hoopa-Unbound':1, 'Volcanion':1, 'Magearna':1, 'Marshadow':1};
	    let n = 0;
	    for (let i = 0; i < team.length; i++) {
	      let template = this.getTemplate(team[i].species).baseSpecies;
	      if (template in mythicals) n++;
	      if (n > 1) return ["You can only use one mythical Pok\u00E9mon."];
	    }
	  },
	},
	{
		name: "[Gen 7] Monocolor",
		desc: "<a href=\"https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_color\">Pokemon Organized by Color</a>",
		mod: 'gen7',
		ruleset: ['Pokemon', 'Same Color Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: [
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Groudon', 'Ho-Oh', 'Hoopa-Unbound', 'Kartana', 'Kyogre',
			'Kyurem-White', 'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Tapu Lele', 'Xerneas', 'Yveltal', 'Zekrom', 'Zygarde',
			'Battle Bond', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Medichamite', 'Metagrossite', 'Salamencite', 'Smooth Rock', 'Terrain Extender', 'Baton Pass',
		],
	},
		{
		name: "[Gen 7] Monocolor Doubles",
		desc: "<a href=\"https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_color\">Pokemon Organized by Color</a>",
		mod: 'gen7',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Same Color Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Standard GBU', 'Team Preview'],
	},
	{
		name: "[Gen 7] Monocolor Random Battle",

		mod: 'gen7',
		team: 'random',
		ruleset: ['Pokemon', 'Same Color Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
];