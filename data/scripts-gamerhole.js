'use strict';

const CHOOSABLE_TARGETS = new Set(['normal', 'any', 'adjacentAlly', 'adjacentAllyOrSelf', 'adjacentFoe']);

exports.BattleScripts = {
randomBSDFactorySets: require('./bsd-factory-sets.json'),
randomBSDFactorySet: function (template, slot, teamData, tier) {
  let speciesId = toId(template.species);
  // let flags = this.randomBSDFactorySets[tier][speciesId].flags;
  let setList = this.randomBSDFactorySets[tier][speciesId].sets;
  let effectivePool, priorityPool;
  // artificially replicate Item Clause
  let itemsMax = {
    adrenalineorb:1, aguavberry:1, airballoon:1, alakazite:1, aloraichiumz:1, assaultvest:1, beedrillite:1, blacksludge:1,
	blastoisinite:1, blazikenite:1, buginiumz:1, charcoal:1, charizarditex:1, charizarditey:1, chestoberry:1, choiceband:1,
	choicescarf:1, choicespecs:1, chopleberry:1, cobaberry:1, darkiniumz:1, dragoniumz:1, eeviumz:1, ejectbutton:1, electricmemory:1, electricseed:1, electriumz:1,
	eviolite:1, expertbelt:1, fairiumz:1, fightingmemory:1, fightiniumz:1, figyberry:1, firiumz:1, fistplate:1, flameorb:1,
	flyiniumz:1, focussash:1, gengarite:1, ghostiumz:1, glalitite:1, grassiumz:1, groundiumz:1, groundmemory:1, gyaradosite:1,
	heatrock:1, heracronite:1, iapapaberry:1, inciniumz:1, iciumz:1, kangaskhanite:1, keeberry:1, kingsrock:1, leftovers:1, lifeorb:1, lightball:1,
	lightclay:1, lucarionite:1, lumberry:1, marangaberry:1, magoberry:1, mawilite:1, meadowplate:1, medichamite:1, mentalherb:1, metagrossite:1, miracleseed:1, mysticwater:1, normaliumz:1,
	occaberry:1, payapaberry:1, pidgeotite:1, pinsirite:1, pixieplate:1, poisoniumz:1, primariumz:1, psychiumz:1, redcard:1, rockiumz:1, rockyhelmet:1,
	safetygoggles:1, salacberry:1, salamencite:1, scizorite:1, scopelens:1, sharpedonite:1, shucaberry:1, sitrusberry:1, slowbronite:1,
	smoothrock:1, steeliumz:1, steelixite:1, steelmemory:1, tapuniumz:1, thickclub:1, toxicorb:1, venusaurite:1, wacanberry:1, wateriumz:1,
	weaknesspolicy:1, wikiberry:1,
  };

  let movesMax = {'trickroom':2, 'fakeout':2, 'tailwind':1, 'protect':5, };
  let requiredMoves = {'protect': 'protection', 'detect': 'protection', 'spikyshield': 'protection', 'kingsshield': 'protection', 'banefulbunker': 'protection'};
  let weatherAbilitiesRequire = {
    'sandrush': 'sandstorm', 'sandveil': 'sandstorm',
  };
  let weatherAbilitiesSet = {'drizzle':1, 'drought':1, 'snowwarning':1, 'sandstream':1};

  // Build a pool of eligible sets, given the team partners
  // Also keep track of sets with moves the team requires
  effectivePool = [];
  priorityPool = [];
  for (let i = 0, l = setList.length; i < l; i++) {
    let curSet = setList[i];
    let itemData = this.getItem(curSet.item);
    if (teamData.megaCount > 1 && itemData.megaStone) continue; // reject 3+ mega stones
    if (teamData.zCount > 1 && itemData.zMove) continue; // reject 3+ Z stones
    if ((teamData.speciesid === 'latios' && this.speciesid === 'latias') || 
    	(teamData.speciesid === 'latias' && this.speciesid === 'latios')) continue; //reject both latios and latias
    if (itemsMax[itemData.id] && teamData.has[itemData.id] >= itemsMax[itemData.id])

continue;

    let abilityData = this.getAbility(curSet.ability);
    let megaTemplate = this.getTemplate(megaSpecies);
    if(this.canMegaEvo) { let megaAbility = this.getMegaAbility(); }
    if (weatherAbilitiesRequire[abilityData.id] && teamData.weather !== weatherAbilitiesRequire[abilityData.id]) continue;
    if (teamData.weather && (weatherAbilitiesSet[abilityData.id] || weatherAbilitiesSet[megaAbility.id])) continue; // reject 2+ weather setters

    let reject = false;
    let hasRequiredMove = false;
    let curSetVariants = [];
    for (let j = 0, m = curSet.moves.length; j < m; j++) {
      let variantIndex = this.random(curSet.moves[j].length);
      let moveId = toId(curSet.moves[j][variantIndex]);
      if (movesMax[moveId] && teamData.has[moveId] >= movesMax[moveId]) {
        reject = true;
        break;
      }
      if (requiredMoves[moveId] && !teamData.has[requiredMoves[moveId]]) {
        hasRequiredMove = true;
      }
      curSetVariants.push(variantIndex);
    }
    if (reject) continue;
    effectivePool.push({set: curSet, moveVariants: curSetVariants});
    if (hasRequiredMove) priorityPool.push({set: curSet, moveVariants: curSetVariants});
  }
  if (priorityPool.length) effectivePool = priorityPool;

  if (!effectivePool.length) {
    if (!teamData.forceResult) return false;
    for (let i = 0; i < setList.length; i++) {
      effectivePool.push({set: setList[i]});
    }
  }

  let setData = effectivePool[this.random(effectivePool.length)];
  let moves = [];
  for (let i = 0; i < setData.set.moves.length; i++) {
    let moveSlot = setData.set.moves[i];
    moves.push(setData.moveVariants ? moveSlot[setData.moveVariants[i]] : moveSlot

[this.random(moveSlot.length)]);
  }

  return {
    name: setData.set.name || template.baseSpecies,
    species: setData.set.species,
    gender: setData.set.gender || template.gender || (this.random(2) ? 'M' : 'F'),
    item: setData.set.item || '',
    ability: setData.set.ability || template.abilities['0'],
    shiny: typeof setData.set.shiny === 'undefined' ? !this.random(1024) : setData.set.shiny,
    level: 50,
    happiness: typeof setData.set.happiness === 'undefined' ? 255 : setData.set.happiness,
    evs: setData.set.evs || {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84},
    ivs: setData.set.ivs || {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
    nature: setData.set.nature || 'Serious',
    moves: moves,
  };
},
randomBSDFactoryTeam: function (side, depth) {
  if (!depth) depth = 0;
  let forceResult = (depth >= 4);

  // Make chosen tier always BSD
  const chosenTier = 'BSD';

  let pokemon = [];

  let pokemonPool = Object.keys(this.randomBSDFactorySets[chosenTier]);

  let teamData = {typeCount: {}, typeComboCount: {}, baseFormes: {}, megaCount: 0, zCount: 0,

has: {}, forceResult: forceResult, weaknesses: {}, resistances: {}};
  let requiredMoveFamilies = {'protection': 1};
  let requiredMoves = {'protect': 'protection', 'detect': 'protection', 'spikyshield': 'protection', 'kingsshield': 'protection', 'banefulbunker': 'protection'};
  let weatherAbilitiesSet = {'drizzle': 'raindance', 'drought': 'sunnyday', 'snowwarning':

'hail', 'sandstream': 'sandstorm'};
  let resistanceAbilities = {
    'dryskin': ['Water'], 'waterabsorb': ['Water'], 'stormdrain': ['Water'],
    'flashfire': ['Fire'], 'heatproof': ['Fire'],
    'lightningrod': ['Electric'], 'motordrive': ['Electric'], 'voltabsorb': ['Electric'],
    'sapsipper': ['Grass'],
    'thickfat': ['Ice', 'Fire'],
    'levitate': ['Ground'],
  };

  while (pokemonPool.length && pokemon.length < 6) {
    let template = this.getTemplate(this.sampleNoReplace(pokemonPool));
    if (!template.exists) continue;

    let speciesFlags = this.randomBSDFactorySets[chosenTier][template.speciesid].flags;

    // Limit to one of each species (Species Clause)
    if (teamData.baseFormes[template.baseSpecies]) continue;

    // Limit the number of Megas + Z-moves to 3
    if (teamData.megaCount + teamData.zCount >= 3 && speciesFlags.megaOnly) continue;

    // Limit 2 of any type
    let types = template.types;
    let skip = false;
    for (let t = 0; t < types.length; t++) {
      if (teamData.typeCount[types[t]] > 1 && this.random(5)) {
        skip = true;
        break;
      }
    }
    if (skip) continue;

    let set = this.randomBSDFactorySet(template, pokemon.length, teamData, chosenTier);
    if (!set) continue;

    // Limit 1 of any type combination
    let typeCombo = types.slice().sort().join();
    if (set.ability === 'Drought' || set.ability === 'Drizzle') {
      // Drought and Drizzle don't count towards the type combo limit
      typeCombo = set.ability;
    }
    if (typeCombo in teamData.typeComboCount) continue;

    // Okay, the set passes, add it to our team
    pokemon.push(set);

    // Now that our Pokemon has passed all checks, we can update team data:
    for (let t = 0; t < types.length; t++) {
      if (types[t] in teamData.typeCount) {
        teamData.typeCount[types[t]]++;
      } else {
        teamData.typeCount[types[t]] = 1;
      }
    }
    teamData.typeComboCount[typeCombo] = 1;

    teamData.baseFormes[template.baseSpecies] = 1;

    // Limit Mega and Z-move
    let itemData = this.getItem(set.item);
    if (itemData.megaStone) teamData.megaCount++;
    if (itemData.id in teamData.has) {
      teamData.has[itemData.id]++;
    } else {
      teamData.has[itemData.id] = 1;
    }
    if (itemData.zMove) teamData.zCount++;
    if (itemData.id in teamData.has) {
      teamData.has[itemData.id]++;
    } else {
      teamData.has[itemData.id] = 1;
    }
		// Require at least one Z-move
		if(teamData.zCount < 1 && !(itemData.zMove)) continue;

    let abilityData = this.getAbility(set.ability);
    if (abilityData.id in weatherAbilitiesSet) {
      teamData.weather = weatherAbilitiesSet[abilityData.id];
    }

    for (let m = 0; m < set.moves.length; m++) {
      let moveId = toId(set.moves[m]);
      if (moveId in teamData.has) {
        teamData.has[moveId]++;
      } else {
        teamData.has[moveId] = 1;
      }
      if (moveId in requiredMoves) {
        teamData.has[requiredMoves[moveId]] = 1;
      }
    }

    for (let typeName in this.data.TypeChart) {
      // Cover any major weakness (3+) with at least one resistance
      if (teamData.resistances[typeName] >= 1) continue;
      if (resistanceAbilities[abilityData.id] && resistanceAbilities

[abilityData.id].includes(typeName) || !this.getImmunity(typeName, types)) {
        // Heuristic: assume that Pokémon with these abilities don't have (too) negative typing.
        teamData.resistances[typeName] = (teamData.resistances[typeName] || 0) + 1;
        if (teamData.resistances[typeName] >= 1) teamData.weaknesses[typeName] = 0;
        continue;
      }
      let typeMod = this.getEffectiveness(typeName, types);
      if (typeMod < 0) {
        teamData.resistances[typeName] = (teamData.resistances[typeName] || 0) + 1;
        if (teamData.resistances[typeName] >= 1) teamData.weaknesses[typeName] = 0;
      } else if (typeMod > 0) {
        teamData.weaknesses[typeName] = (teamData.weaknesses[typeName] || 0) + 1;
      }
    }
  }
  if (pokemon.length < 6) return this.randomBSDFactoryTeam(side, ++depth);

  // Quality control
  if (!teamData.forceResult) {
    for (let requiredFamily in requiredMoveFamilies) {
      if (!teamData.has[requiredFamily]) return this.randomBSDFactoryTeam(side, ++depth);
    }
    for (let type in teamData.weaknesses) {
      if (teamData.weaknesses[type] >= 3) return this.randomBSDFactoryTeam(side, ++depth);
    }
  }

  return pokemon;
},
};