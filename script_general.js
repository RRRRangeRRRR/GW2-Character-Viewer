// ============================================================
    // CACHÉ GLOBAL DE API
    // ============================================================
    const apiCache = {
      professions: {},
      skills: {},
      traits: {},
      legends: {},
      itemStats: {},
      items: {},
      specializations: {}
    };

    const API_BASE = 'https://api.guildwars2.com/v2';

    // ============================================================
    // TRADUCCIONES
    // ============================================================
    const PROFESSION_NAMES_ES = {
      'Warrior': 'Guerrero',
      'Guardian': 'Guardián',
      'Revenant': 'Retornado',
      'Engineer': 'Ingeniero',
      'Ranger': 'Guardabosques',
      'Thief': 'Ladrón',
      'Elementalist': 'Elementalista',
      'Mesmer': 'Ilusionista',
      'Necromancer': 'Nigromante'
    };

    const WEAPON_TYPES = {
      'Axe': 'Hacha',
      'Dagger': 'Daga',
      'Mace': 'Maza',
      'Pistol': 'Pistola',
      'Scepter': 'Cetro',
      'Sword': 'Espada',
      'Focus': 'Foco',
      'Shield': 'Escudo',
      'Torch': 'Antorcha',
      'Warhorn': 'Cuerno de guerra',
      'Greatsword': 'Mandoble',
      'Hammer': 'Martillo',
      'Longbow': 'Arco largo',
      'LongBow': 'Arco largo',
      'Rifle': 'Rifle',
      'Short Bow': 'Arco corto',
      'Shortbow': 'Arco corto',
      'Staff': 'Bastón',
      'Spear': 'Lanza',
      'Harpoon Gun': 'Arpón',
      'Harpoon': 'Lanza',
      'Trident': 'Tridente'
    };

    async function fetchGW2(url) {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return await res.json();
    }

    async function getProfession(profession) {
      if (!profession) return null;
      if (apiCache.professions[profession]) return apiCache.professions[profession];
      try {
        const url = `${API_BASE}/professions/${encodeURIComponent(profession)}?v=latest`;
        const data = await fetchGW2(url);
        apiCache.professions[profession] = data;
        return data;
      } catch (e) {
        console.warn(`Error obteniendo profesión ${profession}:`, e);
        return null;
      }
    }

    async function getSkills(ids) {
      if (!ids || ids.length === 0) return [];
      const unique = [...new Set(ids.filter(id => id > 0))];
      if (unique.length === 0) return [];
      const missing = unique.filter(id => !apiCache.skills[id]);
      if (missing.length > 0) {
        try {
          const url = `${API_BASE}/skills?ids=${missing.join(',')}&v=latest&lang=es`;
          const data = await fetchGW2(url);
          const arr = Array.isArray(data) ? data : [data];
          for (const skill of arr) {
            if (skill && skill.id) {
              apiCache.skills[skill.id] = skill;
            }
          }
        } catch (e) {
          console.warn('Error obteniendo skills:', e);
        }
      }
      return unique.map(id => apiCache.skills[id]).filter(Boolean);
    }

    async function getTraits(ids) {
      if (!ids || ids.length === 0) return [];
      const unique = [...new Set(ids.filter(id => id > 0))];
      if (unique.length === 0) return [];
      const missing = unique.filter(id => !apiCache.traits[id]);
      if (missing.length > 0) {
        try {
          const url = `${API_BASE}/traits?ids=${missing.join(',')}&lang=es`;
          const data = await fetchGW2(url);
          const arr = Array.isArray(data) ? data : [data];
          for (const trait of arr) {
            if (trait && trait.id) {
              apiCache.traits[trait.id] = trait;
            }
          }
        } catch (e) {
          console.warn('Error obteniendo traits:', e);
        }
      }
      return unique.map(id => apiCache.traits[id]).filter(Boolean);
    }

    async function getLegend(legendId) {
      if (!legendId) return null;
      if (apiCache.legends[legendId]) return apiCache.legends[legendId];
      try {
        const url = `${API_BASE}/legends/${legendId}`;
        const data = await fetchGW2(url);
        apiCache.legends[legendId] = data;
        return data;
      } catch (e) {
        console.warn(`Error obteniendo leyenda ${legendId}:`, e);
        return null;
      }
    }

    async function getItemStats(ids) {
      if (!ids || ids.length === 0) return [];
      const unique = [...new Set(ids.filter(id => id > 0))];
      if (unique.length === 0) return [];
      const missing = unique.filter(id => !apiCache.itemStats[id]);
      if (missing.length > 0) {
        try {
          const url = `${API_BASE}/itemstats?ids=${missing.join(',')}&lang=es`;
          const data = await fetchGW2(url);
          const arr = Array.isArray(data) ? data : [data];
          for (const stat of arr) {
            if (stat && stat.id) {
              apiCache.itemStats[stat.id] = stat;
            }
          }
        } catch (e) {
          console.warn('Error obteniendo itemstats:', e);
        }
      }
      return unique.map(id => apiCache.itemStats[id]).filter(Boolean);
    }

    async function getItems(ids) {
      if (!ids || ids.length === 0) return [];
      const unique = [...new Set(ids.filter(id => id > 0))];
      if (unique.length === 0) return [];
      const missing = unique.filter(id => !apiCache.items[id]);
      if (missing.length > 0) {
        try {
          const url = `${API_BASE}/items?ids=${missing.join(',')}&lang=es`;
          const data = await fetchGW2(url);
          const arr = Array.isArray(data) ? data : [data];
          for (const item of arr) {
            if (item && item.id) {
              apiCache.items[item.id] = item;
            }
          }
        } catch (e) {
          console.warn('Error obteniendo items:', e);
        }
      }
      return unique.map(id => apiCache.items[id]).filter(Boolean);
    }

    async function getSpecializations(ids) {
      if (!ids || ids.length === 0) return [];
      const unique = [...new Set(ids.filter(id => id > 0))];
      if (unique.length === 0) return [];
      const missing = unique.filter(id => !apiCache.specializations[id]);
      if (missing.length > 0) {
        try {
          const url = `${API_BASE}/specializations?ids=${missing.join(',')}&lang=es`;
          const data = await fetchGW2(url);
          const arr = Array.isArray(data) ? data : [data];
          for (const spec of arr) {
            if (spec && spec.id) {
              apiCache.specializations[spec.id] = spec;
            }
          }
        } catch (e) {
          console.warn('Error obteniendo specializations:', e);
        }
      }
      return unique.map(id => apiCache.specializations[id]).filter(Boolean);
    }

    async function getProfessionIcon(profession) {
      const data = await getProfession(profession);
      return data ? data.icon : null;
    }

    async function getStatsName(statId) {
      if (!statId) return null;
      if (apiCache.itemStats[statId] && apiCache.itemStats[statId].name) {
        return apiCache.itemStats[statId].name;
      }
      const stats = await getItemStats([statId]);
      return stats.length > 0 ? stats[0].name : null;
    }

    // ============================================================
    // FUNCIONES DE GENERACIÓN DE CÓDIGO (usando caché)
    // ============================================================
    const PROFESSION_IDS = {
      Guardian: 1, Warrior: 2, Engineer: 3, Ranger: 4,
      Thief: 5, Elementalist: 6, Mesmer: 7, Necromancer: 8, Revenant: 9
    };

    const traitOrderCache = {};

    async function getTraitChoice(traitId) {
      if (!traitId) return 0;
      if (apiCache.traits[traitId] && apiCache.traits[traitId].order !== undefined) {
        return (apiCache.traits[traitId].order + 1);
      }
      if (traitOrderCache[traitId] !== undefined) return traitOrderCache[traitId];
      try {
        const traits = await getTraits([traitId]);
        if (traits.length > 0 && traits[0].order !== undefined) {
          const choice = traits[0].order + 1;
          traitOrderCache[traitId] = choice;
          return choice;
        }
        return 0;
      } catch {
        return 0;
      }
    }

    async function resolvePaletteMap(profession, skillIds) {
      const paletteMap = {};
      const uniqueSkillIds = [...new Set(skillIds.filter(id => id > 0))];
      const profData = await getProfession(profession);
      if (profData && profData.skills_by_palette) {
        for (const [paletteId, skillId] of profData.skills_by_palette) {
          paletteMap[skillId] = paletteId;
        }
      }
      const missingIds = uniqueSkillIds.filter(id => !paletteMap[id]);
      if (missingIds.length > 0) {
        const skillsData = await getSkills(missingIds);
        for (const skill of skillsData) {
          if (skill && skill.id && skill.palette_id) {
            paletteMap[skill.id] = skill.palette_id;
          }
        }
      }
      return paletteMap;
    }

    async function getInactiveLegendPalettes(profession, legendId, isAquatic) {
      if (!legendId) return [0, 0, 0];
      try {
        const legendData = await getLegend(legendId);
        if (!legendData) return [0, 0, 0];
        const utilityIds = legendData.utilities || [];
        if (utilityIds.length === 0) return [0, 0, 0];
        const paletteMap = await resolvePaletteMap(profession, utilityIds);
        return utilityIds.map(id => paletteMap[id] || 0);
      } catch (e) {
        return [0, 0, 0];
      }
    }

    function buildToBytes(profession, processedSpecs, terrestrialPalettes, aquaticPalettes, pets, legends, aquaticLegends, inactiveLegendSkills, inactiveAquaticLegendSkills) {
      const profId = PROFESSION_IDS[profession] || 0;
      const buffer = new Uint8Array(44);
      buffer[0] = 0x0D;
      buffer[1] = profId;
      let offset = 2;
      for (let i = 0; i < 3; i++) {
        const spec = processedSpecs[i];
        if (spec && spec.id) {
          buffer[offset] = spec.id & 0xFF;
          const c1 = (spec.choices[0] || 0) & 0x03;
          const c2 = (spec.choices[1] || 0) & 0x03;
          const c3 = (spec.choices[2] || 0) & 0x03;
          buffer[offset + 1] = c1 | (c2 << 2) | (c3 << 4);
        }
        offset += 2;
      }
      for (let i = 0; i < 5; i++) {
        const tVal = terrestrialPalettes[i] || 0;
        buffer[offset] = tVal & 0xFF;
        buffer[offset + 1] = (tVal >> 8) & 0xFF;
        offset += 2;
        const aVal = aquaticPalettes[i] || 0;
        buffer[offset] = aVal & 0xFF;
        buffer[offset + 1] = (aVal >> 8) & 0xFF;
        offset += 2;
      }
      if (profId === 4) {
        buffer[28] = pets[0] || 0;
        buffer[29] = pets[1] || 0;
        buffer[30] = pets[2] || 0;
        buffer[31] = pets[3] || 0;
      } else if (profId === 9) {
        buffer[28] = legends[0] || 0;
        buffer[29] = legends[1] || 0;
        buffer[30] = aquaticLegends[0] || 0;
        buffer[31] = aquaticLegends[1] || 0;
        const allInactiveSkills = [
          ...(inactiveLegendSkills || [0, 0, 0]),
          ...(inactiveAquaticLegendSkills || [0, 0, 0])
        ];
        let skillOffset = 32;
        for (let i = 0; i < 6; i++) {
          const val = allInactiveSkills[i] || 0;
          buffer[skillOffset] = val & 0xFF;
          buffer[skillOffset + 1] = (val >> 8) & 0xFF;
          skillOffset += 2;
        }
      }
      let binaryString = '';
      for (let i = 0; i < buffer.length; i++) {
        binaryString += String.fromCharCode(buffer[i]);
      }
      return `[&${btoa(binaryString)}]`;
    }

    // ============================================================
    // FUNCIONES DE API PARA PERSONAJES Y GREMIOS
    // ============================================================
    async function getCharacters(accessToken) {
      const url = `${API_BASE}/characters?access_token=${accessToken}`;
      return fetchGW2(url);
    }

    async function getCharacter(name, accessToken) {
      const url = `${API_BASE}/characters/${encodeURIComponent(name)}?access_token=${accessToken}`;
      return fetchGW2(url);
    }

    async function getGuild(guildId, accessToken) {
      if (!guildId) return null;
      const url = `${API_BASE}/guild/${guildId}?access_token=${accessToken}`;
      try { return await fetchGW2(url); } catch { return null; }
    }

    // ============================================================
    // ESTADO GLOBAL
    // ============================================================
    let token = null;
    let characterList = [];
    let currentCharacterName = null;
    let currentCharData = null;
    let popupDetails = null;

    let equipmentTabs = [];
    let buildTabs = [];
    let indexEquip = 0;
    let indexBuild = 0;

    // ============================================================
    // COLORES Y CONSTANTES
    // ============================================================
    const PROFESSION_HUES = {
      'Warrior': 0,
      'Guardian': 210,
      'Revenant': 330,
      'Engineer': 30,
      'Ranger': 120,
      'Thief': 60,
      'Elementalist': 270,
      'Mesmer': 300,
      'Necromancer': 160
    };

    function getColorForSpecialization(profession, index) {
      let hue = 0;
      if (profession && PROFESSION_HUES[profession] !== undefined) {
        hue = PROFESSION_HUES[profession];
      } else {
        hue = 200;
      }
      const lightness = 18 + index * 10;
      const bg = `hsl(${hue}, 65%, ${lightness}%)`;
      const border = `hsl(${hue}, 60%, 50%)`;
      const text = `hsl(${hue}, 80%, 85%)`;
      return { bg, border, text };
    }

    function formatPrefixName(rawName) {
      if (!rawName) return rawName;
      const match = rawName.match(/^de\s+/i);
      if (match) {
        const rest = rawName.substring(match[0].length);
        const restCapitalized = rest.charAt(0).toUpperCase() + rest.slice(1);
        return 'de ' + restCapitalized;
      }
      return rawName.charAt(0).toUpperCase() + rawName.slice(1);
    }

    // ============================================================
    // CONSTANTES DE ATRIBUTOS Y VIDA
    // ============================================================
    const BASE_ATTRIBUTES = {
      power: 1000,
      toughness: 1000,
      vitality: 1000,
      precision: 1000,
      ferocity: 0,
      condition: 0,
      expertise: 0,
      concentration: 0,
      healing: 0,
      movement_speed: 0
    };

    const BASE_HEALTH_BY_PROFESSION = {
      'Warrior': 19212,
      'Necromancer': 19212,
      'Guardian': 15082,
      'Revenant': 15082,
      'Engineer': 15082,
      'Ranger': 15082,
      'Mesmer': 15082,
      'Elementalist': 11645,
      'Thief': 11645
    };

    const ATTR_LABELS = {
      power: 'Potencia',
      toughness: 'Dureza',
      vitality: 'Vitalidad',
      precision: 'Precisión',
      ferocity: 'Ferocidad',
      condition: 'Daño de condición',
      expertise: 'Pericia',
      concentration: 'Concentración',
      healing: 'Poder de curación',
      health: 'Salud',
      armor: 'Armadura',
      crit_chance: 'Prob. daño crítico',
      crit_damage: 'Daño crítico',
      healing_power: 'Poder de curación',
      cond_duration: 'Duración de condición',
      boon_duration: 'Duración de bendición',
      agonyresistance: 'Resistencia a la agonía',
      movement_speed: 'Velocidad de movimiento',
      elite_spec: 'Especialidad élite'
    };

    // *** CAMBIO 1: Reordenar ATTR_ORDER para que Armadura esté antes que Salud ***
    let ATTR_ORDER = [
      'power', 'toughness', 'vitality', 'precision', 'ferocity',
      'condition', 'expertise', 'concentration',
      'elite_spec',
      'armor', 'health', 'crit_chance', 'crit_damage',
      'healing_power', 'cond_duration', 'boon_duration',
      'movement_speed'
    ];

    function translateWeaponType(item) {
      if (!item || !item.details || !item.details.type) return 'Arma';
      let type = item.details.type;
      if (WEAPON_TYPES[type]) return WEAPON_TYPES[type];
      const normalized = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
      if (WEAPON_TYPES[normalized]) return WEAPON_TYPES[normalized];
      return normalized;
    }

    const EXCLUDED_SLOTS = [
      'WeaponB1', 'WeaponB2',
      'WeaponAquaticA', 'WeaponAquaticA1', 'WeaponAquaticA2',
      'WeaponAquaticB', 'WeaponAquaticB1', 'WeaponAquaticB2',
      'HelmAquatic'
    ];

    function isExcludedSlot(slot) { return EXCLUDED_SLOTS.includes(slot); }

    function normalizeAttributeKey(key) {
      const lower = key.toLowerCase();
      if (lower === 'critdamage' || lower === 'crit_damage') return 'ferocity';
      if (lower === 'conditiondamage') return 'condition';
      if (lower === 'agonyresistance') return 'agonyresistance';
      if (lower === 'duración de bendición') return 'boon_duration';
      if (lower === 'duración de condición') return 'cond_duration';
      if (lower.includes('velocidad de movimiento')) return 'movement_speed';
      return lower;
    }

    function sumEquipmentBaseAttributes(equipment) {
      const attrMap = {};
      const filtered = equipment.filter(e => !isExcludedSlot(e.slot) && e.stats && e.stats.attributes);
      for (const item of filtered) {
        const attrs = item.stats.attributes;
        for (const [key, value] of Object.entries(attrs)) {
          const normalizedKey = normalizeAttributeKey(key);
          attrMap[normalizedKey] = (attrMap[normalizedKey] || 0) + value;
        }
      }
      return attrMap;
    }

    // ============================================================
    // PROCESAMIENTO DE BONOS (runas, reliquias)
    // ============================================================
    function processBonusTexts(bonusArray, attrs) {
      for (const bonusStr of bonusArray) {
        if (bonusStr.toLowerCase().includes('todas las estadísticas')) {
          const match = bonusStr.match(/\+(\d+)/);
          if (match) {
            const value = parseInt(match[1]);
            const allAttrs = ['power', 'precision', 'toughness', 'vitality', 'concentration', 'condition', 'expertise', 'ferocity', 'healing'];
            for (const attr of allAttrs) {
              attrs[attr] = (attrs[attr] || 0) + value;
            }
          }
          continue;
        }
        if (bonusStr.toLowerCase().includes('velocidad de movimiento')) {
          const match = bonusStr.match(/\+(\d+)/);
          if (match) {
            const value = parseInt(match[1]);
            attrs['movement_speed'] = (attrs['movement_speed'] || 0) + value;
          }
          continue;
        }
        const match = bonusStr.match(/\+(\d+)\s*%?\s*de\s+(.+)/);
        if (match) {
          const value = parseInt(match[1]);
          let attrName = match[2].trim();
          const normalizedKey = normalizeAttributeKey(attrName);
          if (normalizedKey) {
            attrs[normalizedKey] = (attrs[normalizedKey] || 0) + value;
          }
        }
      }
    }

    function sumUpgradeAttributes(equipment, items) {
      const infusionAttrs = {};
      const runeAttrs = {};
      const infusionContributions = [];
      const runeContributions = [];
      const itemMap = {};
      items.forEach(item => { itemMap[item.id] = item; });

      const runeCount = {};
      for (const equip of equipment) {
        if (isExcludedSlot(equip.slot)) continue;
        if (equip.upgrades) {
          for (const upgradeId of equip.upgrades) {
            const upgradeItem = itemMap[upgradeId];
            if (upgradeItem && upgradeItem.details && upgradeItem.details.bonuses && upgradeItem.details.bonuses.length > 0) {
              runeCount[upgradeId] = (runeCount[upgradeId] || 0) + 1;
            }
          }
        }
      }

      for (const [runeId, count] of Object.entries(runeCount)) {
        const runeItem = itemMap[parseInt(runeId)];
        if (!runeItem || !runeItem.details || !runeItem.details.bonuses) continue;
        const bonuses = runeItem.details.bonuses;
        const numBonuses = Math.min(count, 6);
        const runeName = runeItem.name || 'Runa desconocida';
        const attrs = {};

        const relevantBonuses = bonuses.slice(0, numBonuses);
        processBonusTexts(relevantBonuses, attrs);

        if (runeItem.details.infix_upgrade && runeItem.details.infix_upgrade.attributes) {
          for (const attr of runeItem.details.infix_upgrade.attributes) {
            const normalizedKey = normalizeAttributeKey(attr.attribute);
            attrs[normalizedKey] = (attrs[normalizedKey] || 0) + attr.modifier;
          }
        }

        runeContributions.push({
          itemName: runeName,
          count: numBonuses,
          attributes: attrs
        });

        for (const [key, value] of Object.entries(attrs)) {
          runeAttrs[key] = (runeAttrs[key] || 0) + value;
        }
      }

      const relic = equipment.find(e => e.slot && e.slot.toLowerCase() === 'relic');
      if (relic && relic.id) {
        const relicItem = itemMap[relic.id];
        if (relicItem && relicItem.details && relicItem.details.bonuses) {
          const bonuses = relicItem.details.bonuses;
          const attrs = {};
          processBonusTexts(bonuses, attrs);
          if (relicItem.details.infix_upgrade && relicItem.details.infix_upgrade.attributes) {
            for (const attr of relicItem.details.infix_upgrade.attributes) {
              const normalizedKey = normalizeAttributeKey(attr.attribute);
              attrs[normalizedKey] = (attrs[normalizedKey] || 0) + attr.modifier;
            }
          }
          if (Object.keys(attrs).length > 0) {
            runeContributions.push({
              itemName: relicItem.name || 'Reliquia',
              count: 1,
              attributes: attrs
            });
            for (const [key, value] of Object.entries(attrs)) {
              runeAttrs[key] = (runeAttrs[key] || 0) + value;
            }
          }
        }
      }

      for (const equip of equipment) {
        if (isExcludedSlot(equip.slot)) continue;
        if (equip.infusions) {
          for (const infusionId of equip.infusions) {
            const infusionItem = itemMap[infusionId];
            if (!infusionItem || !infusionItem.details) continue;
            const infusionName = infusionItem.name || 'Infusión desconocida';
            if (infusionItem.details.infix_upgrade && infusionItem.details.infix_upgrade.attributes) {
              for (const attr of infusionItem.details.infix_upgrade.attributes) {
                const normalizedKey = normalizeAttributeKey(attr.attribute);
                infusionAttrs[normalizedKey] = (infusionAttrs[normalizedKey] || 0) + attr.modifier;
                infusionContributions.push({
                  itemName: infusionName,
                  attribute: normalizedKey,
                  value: attr.modifier,
                  count: 1
                });
              }
            }
            if (infusionItem.details.attribute_adjustments) {
              for (const adj of infusionItem.details.attribute_adjustments) {
                const normalizedKey = normalizeAttributeKey(adj.attribute);
                infusionAttrs[normalizedKey] = (infusionAttrs[normalizedKey] || 0) + adj.value;
                infusionContributions.push({
                  itemName: infusionName,
                  attribute: normalizedKey,
                  value: adj.value,
                  count: 1
                });
              }
            }
          }
        }
      }

      return {
        infusiones: infusionAttrs,
        runas: runeAttrs,
        infusionContributions,
        runeContributions
      };
    }

    // ============================================================
    // RENDERIZADO DE CONTRIBUCIONES
    // ============================================================
    function groupContributions(contributions) {
      const groups = {};
      for (const contrib of contributions) {
        const key = contrib.itemName + '|' + contrib.attribute;
        if (!groups[key]) {
          groups[key] = {
            itemName: contrib.itemName,
            attribute: contrib.attribute,
            totalValue: 0,
            count: 0
          };
        }
        groups[key].totalValue += contrib.value;
        groups[key].count += contrib.count;
      }
      return Object.values(groups);
    }

    function renderContributions(contributions, attrLabels) {
      const grouped = groupContributions(contributions);
      if (grouped.length === 0) return '';
      let html = `<div class="contribution-list">`;
      for (const g of grouped) {
        const attrLabel = attrLabels[g.attribute] || g.attribute.charAt(0).toUpperCase() + g.attribute.slice(1);
        let displayValue = g.totalValue;
        if (['crit_chance', 'crit_damage', 'cond_duration', 'boon_duration', 'movement_speed'].includes(g.attribute)) {
          displayValue = g.totalValue + '%';
        }
        html += `
          <div class="contribution-item">
            <span class="count">${g.count}</span>
            <span class="item-name">${g.itemName}</span>
            <span class="arrow">→</span>
            <span class="attr-value">${displayValue}</span>
            <span class="attr-label">${attrLabel}</span>
          </div>
        `;
      }
      html += `</div>`;
      return html;
    }

    function renderRuneContributions(contribs, attrLabels) {
      if (!contribs || contribs.length === 0) return '';
      let html = `<div class="contribution-list">`;
      for (const item of contribs) {
        const count = item.count;
        const name = item.itemName;
        const attrs = item.attributes;
        const keys = Object.keys(attrs);
        let attrStr = '';
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const value = attrs[key];
          const label = attrLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);
          let displayValue = value;
          if (['crit_chance', 'crit_damage', 'cond_duration', 'boon_duration', 'movement_speed'].includes(key)) {
            displayValue = value + '%';
          }
          attrStr += `${displayValue} ${label}`;
          if (i < keys.length - 1) attrStr += ', ';
        }
        html += `
          <div class="contribution-item">
            <span class="count">${count}</span>
            <span class="item-name">${name}</span>
            <span class="arrow">→</span>
            <span class="attr-value">${attrStr}</span>
          </div>
        `;
      }
      html += `</div>`;
      return html;
    }

    function getBaseHealth(profession) {
      const prof = profession ? profession.charAt(0).toUpperCase() + profession.slice(1).toLowerCase() : '';
      return BASE_HEALTH_BY_PROFESSION[prof] || 15082;
    }

    function getStatPrefixName(statId) {
      if (!statId) return null;
      const stat = apiCache.itemStats[statId];
      return stat && stat.name ? stat.name : null;
    }

    // ============================================================
    // FUNCIONES POPUP (solo para la vista dinámica)
    // ============================================================
    function formatDuration(seconds) {
      if (!seconds && seconds !== 0) return '0';
      if (Number.isInteger(seconds)) return seconds.toString();
      const frac = seconds % 1;
      const whole = Math.floor(seconds);
      let fracStr = '';
      if (Math.abs(frac - 0.25) < 0.01) fracStr = '¼';
      else if (Math.abs(frac - 0.5) < 0.01) fracStr = '½';
      else if (Math.abs(frac - 0.75) < 0.01) fracStr = '¾';
      else if (Math.abs(frac - 0.333) < 0.01) fracStr = '⅓';
      else if (Math.abs(frac - 0.666) < 0.01) fracStr = '⅔';
      else if (Math.abs(frac - 0.2) < 0.01) fracStr = '⅕';
      else if (Math.abs(frac - 0.4) < 0.01) fracStr = '⅖';
      else if (Math.abs(frac - 0.6) < 0.01) fracStr = '⅗';
      else if (Math.abs(frac - 0.8) < 0.01) fracStr = '⅘';
      else if (Math.abs(frac - 0.125) < 0.01) fracStr = '⅛';
      else if (Math.abs(frac - 0.375) < 0.01) fracStr = '⅜';
      else if (Math.abs(frac - 0.625) < 0.01) fracStr = '⅝';
      else if (Math.abs(frac - 0.875) < 0.01) fracStr = '⅞';
      else fracStr = frac.toFixed(2).replace(/^0\./, '');
      if (whole === 0) return fracStr;
      return whole + ' ' + fracStr;
    }

    function showPopup(contentHtml) {
      const overlay = document.getElementById('popupOverlay');
      const content = document.getElementById('popupContent');
      content.innerHTML = contentHtml;
      overlay.classList.add('active');
    }

    function closePopup() {
      document.getElementById('popupOverlay').classList.remove('active');
    }

    function showTraitPopup(traitId) {
      if (!popupDetails) return;
      const trait = popupDetails.traits.find(t => t.id === traitId);
      if (!trait) return;
      let subtitleParts = [];
      if (trait.slot) subtitleParts.push(trait.slot);
      if (trait.tier) subtitleParts.push(`Tier ${trait.tier}`);
      const subtitle = subtitleParts.join(' · ');
      let factsHtml = '';
      if (trait.facts && trait.facts.length > 0) {
        factsHtml = `<div class="popup-facts">`;
        for (const fact of trait.facts) {
          if (fact.type === 'Text' && fact.text) {
            factsHtml += `<div class="popup-fact" style="font-style: italic; color: var(--muted);">${fact.text}</div>`;
            continue;
          }
          if (fact.type === 'Buff' || fact.type === 'Condition') {
            const iconHtml = fact.icon ? `<img src="${fact.icon}" alt="" onerror="this.style.display='none'">` : '';
            let valueText = '';
            if (fact.status) {
              valueText = fact.status;
              if (fact.duration !== undefined) {
                valueText += ` (${formatDuration(fact.duration)} s)`;
              }
              if (fact.description) {
                valueText += `: ${fact.description}`;
              }
            } else if (fact.description) {
              valueText = fact.description;
            } else if (fact.text) {
              valueText = fact.text;
            }
            if (!valueText) continue;
            factsHtml += `
              <div class="popup-fact">
                ${iconHtml}
                <span class="fact-text">${valueText}</span>
              </div>
            `;
            continue;
          }
          if (fact.type === 'Number' || fact.type === 'Percent') {
            let value = '';
            if (fact.type === 'Percent' && fact.percent !== undefined) {
              value = fact.percent + '%';
            } else if (fact.type === 'Number' && fact.value !== undefined) {
              value = fact.value;
            } else if (fact.value !== undefined) {
              value = fact.value;
            }
            const iconHtml = fact.icon ? `<img src="${fact.icon}" alt="" onerror="this.style.display='none'">` : '';
            factsHtml += `
              <div class="popup-fact">
                ${iconHtml}
                <span class="fact-text">${fact.text || ''}</span>
                ${value ? `<span class="fact-value">${value}</span>` : ''}
              </div>
            `;
          }
        }
        factsHtml += `</div>`;
      }
      let html = `
        <div class="popup-title">
          <img src="${trait.icon || ''}" alt="${trait.name}" onerror="this.style.display='none'">
          ${trait.name}
        </div>
        ${subtitle ? `<div class="popup-subtitle">${subtitle}</div>` : ''}
        <div class="popup-description">${trait.description || 'Sin descripción'}</div>
        ${factsHtml}
      `;
      showPopup(html);
    }

    function showSkillPopup(skillId) {
      let skill = null;
      if (popupDetails) {
        skill = popupDetails.skills.find(s => s.id === skillId);
      }
      if (!skill) {
        skill = apiCache.skills[skillId];
      }
      if (!skill) {
        showPopup(`
          <div class="popup-title">
            <span style="font-size:24px;">⚠️</span>
            Habilidad no disponible
          </div>
          <div class="popup-description">No se pudo cargar la información de esta habilidad (ID: ${skillId}).</div>
        `);
        return;
      }

      let subtitleParts = [];
      if (skill.type) subtitleParts.push(skill.type);
      if (skill.weapon_type) subtitleParts.push(skill.weapon_type);
      if (skill.slot) subtitleParts.push(skill.slot);
      if (skill.attunement) subtitleParts.push(skill.attunement);
      const subtitle = subtitleParts.join(' · ');
      let extraInfo = [];
      if (skill.cooldown) extraInfo.push(`Recarga: ${skill.cooldown}s`);
      if (skill.initiative) extraInfo.push(`Iniciativa: ${skill.initiative}`);
      if (skill.energy) extraInfo.push(`Energía: ${skill.energy}`);
      if (skill.range) extraInfo.push(`Alcance: ${skill.range}`);
      const extraHtml = extraInfo.length ? `<div style="margin-bottom: 10px; color: var(--muted); font-size: 14px;">${extraInfo.join(' · ')}</div>` : '';
      let factsHtml = '';
      if (skill.facts && skill.facts.length > 0) {
        factsHtml = `<div class="popup-facts">`;
        for (const fact of skill.facts) {
          if (fact.type === 'Text' && fact.text) {
            factsHtml += `<div class="popup-fact" style="font-style: italic; color: var(--muted);">${fact.text}</div>`;
            continue;
          }
          if (fact.type === 'Buff' || fact.type === 'Condition') {
            const iconHtml = fact.icon ? `<img src="${fact.icon}" alt="" onerror="this.style.display='none'">` : '';
            let valueText = '';
            if (fact.status) {
              valueText = fact.status;
              if (fact.duration !== undefined) {
                valueText += ` (${formatDuration(fact.duration)} s)`;
              }
              if (fact.description) {
                valueText += `: ${fact.description}`;
              }
            } else if (fact.description) {
              valueText = fact.description;
            } else if (fact.text) {
              valueText = fact.text;
            }
            if (!valueText) continue;
            factsHtml += `
              <div class="popup-fact">
                ${iconHtml}
                <span class="fact-text">${valueText}</span>
              </div>
            `;
            continue;
          }
          if (fact.type === 'Number' || fact.type === 'Percent') {
            let value = '';
            if (fact.type === 'Percent' && fact.percent !== undefined) {
              value = fact.percent + '%';
            } else if (fact.type === 'Number' && fact.value !== undefined) {
              value = fact.value;
            } else if (fact.value !== undefined) {
              value = fact.value;
            }
            const iconHtml = fact.icon ? `<img src="${fact.icon}" alt="" onerror="this.style.display='none'">` : '';
            factsHtml += `
              <div class="popup-fact">
                ${iconHtml}
                <span class="fact-text">${fact.text || ''}</span>
                ${value ? `<span class="fact-value">${value}</span>` : ''}
              </div>
            `;
          }
        }
        factsHtml += `</div>`;
      }
      let html = `
        <div class="popup-title">
          <img src="${skill.icon || ''}" alt="${skill.name}" onerror="this.style.display='none'">
          ${skill.name}
        </div>
        ${subtitle ? `<div class="popup-subtitle">${subtitle}</div>` : ''}
        ${extraHtml}
        <div class="popup-description">${skill.description || 'Sin descripción'}</div>
        ${factsHtml}
      `;
      showPopup(html);
    }

    function showStatPopup(statId, slotAttrs) {
      let attrHtml = '';
      if (slotAttrs && typeof slotAttrs === 'object' && Object.keys(slotAttrs).length > 0) {
        const entries = Object.entries(slotAttrs);
        attrHtml = `<div class="popup-facts">`;
        for (const [key, value] of entries) {
          const normalizedKey = normalizeAttributeKey(key);
          const label = ATTR_LABELS[normalizedKey] || key.charAt(0).toUpperCase() + key.slice(1);
          attrHtml += `
            <div class="popup-fact">
              <span class="fact-text">${label}</span>
              <span class="fact-value">${value}</span>
            </div>
          `;
        }
        attrHtml += `</div>`;
      } else if (statId && popupDetails) {
        const stat = popupDetails.itemStats.find(s => s.id === statId);
        if (stat && stat.attributes) {
          const entries = Object.entries(stat.attributes);
          if (entries.length > 0) {
            attrHtml = `<div class="popup-facts">`;
            for (const [key, value] of entries) {
              const normalizedKey = normalizeAttributeKey(key);
              const label = ATTR_LABELS[normalizedKey] || key.charAt(0).toUpperCase() + key.slice(1);
              attrHtml += `
                <div class="popup-fact">
                  <span class="fact-text">${label}</span>
                  <span class="fact-value">${value}</span>
                </div>
              `;
            }
            attrHtml += `</div>`;
          }
        }
      }
      const name = (statId && popupDetails) ? (popupDetails.itemStats.find(s => s.id === statId)?.name || 'Estadísticas') : 'Estadísticas';
      let html = `
        <div class="popup-title">
          <span style="font-size:24px;">📊</span>
          ${name}
        </div>
        <div class="popup-description">Atributos de esta combinación de estadísticas:</div>
        ${attrHtml || '<div class="popup-fact"><span class="fact-text">Sin atributos disponibles</span></div>'}
      `;
      showPopup(html);
    }

    function showItemPopup(itemId) {
      if (!popupDetails) return;
      const item = popupDetails.items.find(i => i.id === itemId);
      if (!item) return;
      let extraHtml = '';
      if (item.details && item.details.infix_upgrade && item.details.infix_upgrade.buff) {
        const buff = item.details.infix_upgrade.buff;
        if (buff.description) {
          extraHtml += `
            <div class="popup-facts">
              <div class="popup-fact" style="font-style: italic; color: var(--muted);">
                ${buff.description}
              </div>
            </div>
          `;
        }
      }
      if (item.details && item.details.infix_upgrade && item.details.infix_upgrade.attributes) {
        const attrs = item.details.infix_upgrade.attributes;
        if (attrs.length > 0) {
          const attrLabels = popupDetails.attrLabels || ATTR_LABELS;
          let attrHtml = `<div class="popup-facts">`;
          for (const attr of attrs) {
            const label = attrLabels[attr.attribute] || attr.attribute.charAt(0).toUpperCase() + attr.attribute.slice(1);
            attrHtml += `
              <div class="popup-fact">
                <span class="fact-text">${label}</span>
                <span class="fact-value">${attr.modifier}</span>
              </div>
            `;
          }
          attrHtml += `</div>`;
          extraHtml += attrHtml;
        }
      }
      if (item.details && item.details.bonuses && item.details.bonuses.length > 0) {
        const bonuses = item.details.bonuses;
        let bonusHtml = `<div class="popup-facts"><div style="margin-bottom:6px;color:var(--muted);font-size:13px;">Bonificaciones:</div>`;
        for (const bonus of bonuses) {
          bonusHtml += `
            <div class="popup-fact">
              <span class="fact-text">${bonus}</span>
            </div>
          `;
        }
        bonusHtml += `</div>`;
        extraHtml += bonusHtml;
      }
      let html = `
        <div class="popup-title">
          <img src="${item.icon || ''}" alt="${item.name}" onerror="this.style.display='none'">
          ${item.name || 'Ítem desconocido'}
        </div>
        <div class="popup-description">${item.description || 'Sin descripción'}</div>
        ${extraHtml}
      `;
      showPopup(html);
    }

    // ============================================================
    // GENERACIÓN DEL HTML DEL CREADOR (PARTE 2)
    // ============================================================
    function generateCreatorHTML() {
      return `
        <section class="panel creator-panel">
          <div class="section-title">
            <span class="accent gold-accent"></span>
            <span>✏️ Creador Web</span>
            <span style="font-size:14px;color:var(--muted);font-weight:normal;margin-left:auto;">Personaliza la exportación</span>
          </div>

          <div class="form-group">
            <label for="editTitle">Título de cabecera</label>
            <input type="text" id="editTitle" placeholder="Nombre de la build">
          </div>
          <div class="form-group">
            <label for="editSubtitle">Subtítulo</label>
            <input type="text" id="editSubtitle" placeholder="Profesión o descripción breve">
          </div>
          <div class="form-group">
            <label for="editChips">Etiquetas (separadas por comas)</label>
            <input type="text" id="editChips" placeholder="WvW, Hacha + Escudo, ...">
          </div>

          <hr style="border-color:var(--line);margin:20px 0;">

          <div class="form-group">
            <label for="editRelic">Reliquia</label>
            <input type="text" id="editRelic" placeholder="Nombre de la reliquia (ej: Reliquia de la Mecanica)">
            <div style="font-size:12px;color:var(--muted);margin-top:4px;">
              Este nombre reemplazará a "Reliquia Legendaria" y tendrá un enlace a la wiki en español.
            </div>
          </div>

          <!-- NUEVO: Consumibles -->
          <div class="form-group">
            <label>Consumibles</label>
            <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin-bottom:8px;">
              <input type="text" id="foodId" placeholder="ID de comida" style="flex:1; min-width:120px;">
              <button class="btn secondary" id="fetchFoodBtn">Buscar comida</button>
            </div>
            <div id="foodPreview" class="consumible-item" style="display:none;"></div>
            <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin-top:8px;">
              <input type="text" id="utilityId" placeholder="ID de apoyo" style="flex:1; min-width:120px;">
              <button class="btn secondary" id="fetchUtilityBtn">Buscar apoyo</button>
            </div>
            <div id="utilityPreview" class="consumible-item" style="display:none;"></div>
          </div>

          <div class="form-group">
            <label for="editPlaystyle">Estilo de juego</label>
            <textarea id="editPlaystyle" rows="4" placeholder="Describe el estilo de juego de la build..."></textarea>
          </div>

          <div class="form-group">
            <label>Rotación</label>
            <div class="rotation-group">
              <div class="rot-item">
                <label for="rot1Name">Bloque 1</label>
                <input type="text" id="rot1Name" value="Ataque principal">
                <label for="rot1Content" style="margin-top:6px;">Instrucciones (separadas por comas)</label>
                <textarea id="rot1Content" placeholder="Habilidad A, Habilidad B, ..."></textarea>
              </div>
              <div class="rot-item">
                <label for="rot2Name">Bloque 2</label>
                <input type="text" id="rot2Name" value="Mantenimiento de presión">
                <label for="rot2Content" style="margin-top:6px;">Instrucciones (separadas por comas)</label>
                <textarea id="rot2Content" placeholder="Habilidad C, Habilidad D, ..."></textarea>
              </div>
              <div class="rot-item">
                <label for="rot3Name">Bloque 3</label>
                <input type="text" id="rot3Name" value="Reinicio defensivo">
                <label for="rot3Content" style="margin-top:6px;">Instrucciones (separadas por comas)</label>
                <textarea id="rot3Content" placeholder="Habilidad E, Habilidad F, ..."></textarea>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="editNotes">Notas (características separadas por comas)</label>
            <textarea id="editNotes" rows="3" placeholder="Muy buena sinergia, Alta movilidad, ..."></textarea>
            <div style="font-size:12px;color:var(--muted);margin-top:4px;">
              Usa el nombre exacto o ponlo entre corchetes: <strong>[Nombre]</strong>
            </div>
          </div>

          <!-- NUEVO: Referencias -->
          <div class="form-group">
            <label>Referencias</label>
            <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center;">
              <input type="text" id="refText" placeholder="Texto de la referencia" style="flex:2; min-width:150px;">
              <input type="text" id="refUrl" placeholder="Enlace (opcional)" style="flex:2; min-width:150px;">
              <button class="btn secondary" id="addRefBtn">Añadir referencia</button>
            </div>
            <div id="refListContainer" class="ref-list"></div>
          </div>

          <div style="display:flex;justify-content:flex-end;margin-top:12px;">
            <button class="btn-export" id="exportBtn">📤 Exportar HTML</button>
          </div>
        </section>
      `;
    }

    // ============================================================
    // CONSTRUCCIÓN DE LA PÁGINA DE DETALLE (EQUIPO + PERFIL + CÓDIGO)
    // ============================================================
    async function buildDetailPage(charData, guildData, professionIcon, legendSkills, equipmentData, buildData) {
      const equipment = (equipmentData && equipmentData.equipment) ? equipmentData.equipment : (charData.equipment || []);
      
      let modeSpecs = [];
      let modeSkillsObj = {};
      
      if (!buildData) {
        const modes = ['pve', 'pvp', 'wvw'];
        let activeMode = 'pve';
        for (const m of modes) {
          if (charData.specializations?.[m]?.length > 0) {
            activeMode = m;
            break;
          }
        }
        modeSpecs = charData.specializations?.[activeMode] || [];
        modeSkillsObj = charData.skills?.[activeMode] || {};
      }
      else if (Array.isArray(buildData.specializations)) {
        modeSpecs = buildData.specializations;
        modeSkillsObj = buildData.skills || {};
      }
      else if (buildData.specializations && typeof buildData.specializations === 'object') {
        const modes = ['pve', 'pvp', 'wvw'];
        let activeMode = 'pve';
        for (const m of modes) {
          if (buildData.specializations?.[m]?.length > 0) {
            activeMode = m;
            break;
          }
        }
        modeSpecs = buildData.specializations?.[activeMode] || [];
        modeSkillsObj = buildData.skills?.[activeMode] || {};
      }
      else {
        const modes = ['pve', 'pvp', 'wvw'];
        let activeMode = 'pve';
        for (const m of modes) {
          if (charData.specializations?.[m]?.length > 0) {
            activeMode = m;
            break;
          }
        }
        modeSpecs = charData.specializations?.[activeMode] || [];
        modeSkillsObj = charData.skills?.[activeMode] || {};
      }

      let eliteSpecName = 'Especialidad élite';
      if (modeSpecs.length > 0) {
        const lastSpec = modeSpecs[modeSpecs.length - 1];
        if (lastSpec && lastSpec.id) {
          const specObj = apiCache.specializations[lastSpec.id];
          if (specObj && specObj.name) {
            eliteSpecName = specObj.name;
          }
        }
      }
      ATTR_LABELS['elite_spec'] = eliteSpecName;

      const weaponsA = equipment.filter(e => e.slot === 'WeaponA1' || e.slot === 'WeaponA2');
      const weaponsB = equipment.filter(e => e.slot === 'WeaponB1' || e.slot === 'WeaponB2');

      const armorSlots = ['Helm', 'Shoulders', 'Coat', 'Gloves', 'Leggings', 'Boots'];
      const armorMap = {};
      equipment.forEach(e => {
        if (armorSlots.includes(e.slot)) { armorMap[e.slot] = e; }
      });
      const armorOrdered = armorSlots.map(slot => armorMap[slot]).filter(Boolean);

      const accessories = equipment.filter(e => e.slot === 'Accessory1' || e.slot === 'Accessory2' || e.slot === 'Ring1' || e.slot === 'Ring2' || e.slot === 'Amulet');
      const back = equipment.find(e => e.slot === 'Backpack');
      let relic = equipment.find(e => e.slot && e.slot.toLowerCase() === 'relic');
      if (!relic && charData.equipment) {
        relic = charData.equipment.find(e => e.slot && e.slot.toLowerCase() === 'relic');
      }

      const items = Object.values(apiCache.items);
      const findItem = (id) => apiCache.items[id];
      const findTrait = (id) => apiCache.traits[id];
      const findSkill = (id) => apiCache.skills[id];
      const findSpec = (id) => apiCache.specializations[id];

      const healSkill = modeSkillsObj.heal ? findSkill(modeSkillsObj.heal) : null;
      const utilitySkills = (modeSkillsObj.utilities || []).map(id => findSkill(id)).filter(Boolean);
      const eliteSkill = modeSkillsObj.elite ? findSkill(modeSkillsObj.elite) : null;
      const allSkills = [healSkill, ...utilitySkills, eliteSkill].filter(Boolean);
      const specLines = Array.isArray(modeSpecs) ? modeSpecs : [];

      const baseAttrs = { ...BASE_ATTRIBUTES };
      const equipBaseAttrs = sumEquipmentBaseAttributes(equipment);
      const upgradeData = sumUpgradeAttributes(equipment, items);
      const infusionAttrs = upgradeData.infusiones || {};
      const runeAttrs = upgradeData.runas || {};
      const infusionContributions = upgradeData.infusionContributions || [];
      const runeContributions = upgradeData.runeContributions || [];

      const totalAttrs = { ...baseAttrs };
      for (const [key, value] of Object.entries(equipBaseAttrs)) {
        totalAttrs[key] = (totalAttrs[key] || 0) + value;
      }
      for (const [key, value] of Object.entries(infusionAttrs)) {
        totalAttrs[key] = (totalAttrs[key] || 0) + value;
      }
      for (const [key, value] of Object.entries(runeAttrs)) {
        totalAttrs[key] = (totalAttrs[key] || 0) + value;
      }
      totalAttrs['elite_spec'] = 0;
      baseAttrs['elite_spec'] = 0;

      const profession = charData.profession || '';
      const baseHealth = getBaseHealth(profession);
      const vitalityTotal = totalAttrs.vitality || 1000;
      const totalHealth = baseHealth + (vitalityTotal * 10);

      const precision = totalAttrs.precision || 1000;
      const ferocity = totalAttrs.ferocity || 0;
      const expertise = totalAttrs.expertise || 0;
      const concentration = totalAttrs.concentration || 0;
      const toughness = totalAttrs.toughness || 1000;
      const healingPower = totalAttrs.healing || 0;

      const critChance = Math.round(5 + (precision - 1000) / 21);
      const critDamage = Math.round(150 + ferocity / 15);
      const condDuration = Math.round(expertise / 15);
      const boonDuration = Math.round(concentration / 15);
      const armor = toughness + 1000;

      totalAttrs.health = totalHealth;
      totalAttrs.armor = (totalAttrs.armor || 0) + armor;
      totalAttrs.crit_chance = (totalAttrs.crit_chance || 0) + Math.min(critChance, 100);
      totalAttrs.crit_damage = (totalAttrs.crit_damage || 0) + critDamage;
      totalAttrs.healing_power = (totalAttrs.healing_power || 0) + healingPower;
      totalAttrs.cond_duration = (totalAttrs.cond_duration || 0) + condDuration;
      totalAttrs.boon_duration = (totalAttrs.boon_duration || 0) + boonDuration;

      const guildName = guildData ? guildData.name : (charData.guild || null);

      const statIdsSet = new Set();
      for (const equip of equipment) {
        if (isExcludedSlot(equip.slot)) continue;
        if (equip.stats && equip.stats.id) statIdsSet.add(equip.stats.id);
      }
      const statNamesMap = {};
      for (const statId of statIdsSet) {
        const name = await getStatsName(statId);
        statNamesMap[statId] = name || `ID ${statId}`;
      }

      // ============================================================
      // FUNCIONES AUXILIARES PARA RENDERIZAR EQUIPO AGRUPADO
      // ============================================================
      function getPrefixFromItem(equip) {
        if (equip.stats && equip.stats.id) {
          return statNamesMap[equip.stats.id] || null;
        }
        return null;
      }

      function getUpgradesFromItem(equip) {
        const upIds = equip.upgrades || [];
        return upIds.map(id => findItem(id)).filter(Boolean);
      }

      function getInfusionsFromItem(equip) {
        const infIds = equip.infusions || [];
        return infIds.map(id => findItem(id)).filter(Boolean);
      }

      // ============================================================
      // CONSTRUIR HTML DE EQUIPO CON APARTADOS
      // ============================================================
      let equipHtml = '';

      // --- APARTADO: Armadura y Abalorios ---
      equipHtml += `<div class="equip-section-title">Armadura y Abalorios</div>`;

      // Armadura
      if (armorOrdered.length > 0) {
        const prefixCountArmor = {};
        for (const a of armorOrdered) {
          const p = getPrefixFromItem(a);
          if (p) {
            prefixCountArmor[p] = (prefixCountArmor[p] || 0) + 1;
          }
        }
        const sortedPrefixes = Object.entries(prefixCountArmor).sort((a, b) => b[1] - a[1]);
        const prefixStr = sortedPrefixes.map(([name, count]) => {
          const formatted = formatPrefixName(name);
          return `${formatted} (${count})`;
        }).join(', ');
        const prefixDisplay = prefixStr ? ` ${prefixStr}` : '';

        // Recolectar runas con su ID
        const runaMap = {};
        for (const a of armorOrdered) {
          const ups = getUpgradesFromItem(a);
          for (const up of ups) {
            if (up.details && up.details.bonuses && up.details.bonuses.length > 0) {
              const key = up.id;
              if (!runaMap[key]) runaMap[key] = { id: key, name: up.name, count: 0, icon: up.icon };
              runaMap[key].count++;
            }
          }
        }
        const runaEntries = Object.values(runaMap);
        let runaHtml = '';
        if (runaEntries.length > 0) {
          runaHtml = `<div class="equip-group-sub">`;
          for (const r of runaEntries) {
            runaHtml += `
              <span class="runa-item" data-item-id="${r.id}">
                <img src="${r.icon || ''}" alt="${r.name}" onerror="this.style.display='none'">
                ${r.name} ${r.count}/6
              </span>
            `;
          }
          runaHtml += `</div>`;
        }

        const coatItem = armorOrdered.find(a => a.slot === 'Coat');
        const icon = coatItem ? findItem(coatItem.id)?.icon : (armorOrdered[0] ? findItem(armorOrdered[0].id)?.icon : '');

        equipHtml += `
          <div class="equip-group" data-armor-items='${JSON.stringify(armorOrdered)}'>
            <div class="equip-group-header">
              <img src="${icon || ''}" alt="Armadura" onerror="this.style.display='none'">
              <div>
                <div class="equip-group-name">Armadura${prefixDisplay}</div>
                ${runaHtml}
              </div>
            </div>
          </div>
        `;
      }

      // Abalorios
      const trinkets = [...accessories];
      if (back) trinkets.push(back);
      if (trinkets.length > 0) {
        const prefixCountTrinket = {};
        for (const t of trinkets) {
          const p = getPrefixFromItem(t);
          if (p) {
            prefixCountTrinket[p] = (prefixCountTrinket[p] || 0) + 1;
          }
        }
        const sortedPrefixes = Object.entries(prefixCountTrinket).sort((a, b) => b[1] - a[1]);
        const prefixStr = sortedPrefixes.map(([name, count]) => {
          const formatted = formatPrefixName(name);
          return `${formatted} (${count})`;
        }).join(', ');
        const prefixDisplay = prefixStr ? ` ${prefixStr}` : '';

        // Recolectar mejoras con su ID
        const upgradeCount = {};
        for (const t of trinkets) {
          const ups = getUpgradesFromItem(t);
          for (const up of ups) {
            if (up.details && up.details.bonuses && up.details.bonuses.length > 0) {
              const key = up.id;
              if (!upgradeCount[key]) upgradeCount[key] = { id: key, name: up.name, count: 0, icon: up.icon };
              upgradeCount[key].count++;
            }
          }
        }
        const upEntries = Object.values(upgradeCount);
        let upHtml = '';
        if (upEntries.length > 0) {
          upHtml = `<div class="equip-group-sub">`;
          for (const u of upEntries) {
            upHtml += `
              <span class="runa-item" data-item-id="${u.id}">
                <img src="${u.icon || ''}" alt="${u.name}" onerror="this.style.display='none'">
                ${u.name} ${u.count}/6
              </span>
            `;
          }
          upHtml += `</div>`;
        }

        let icon = '';
        const acc1 = trinkets.find(t => t.slot === 'Accessory1');
        if (acc1) icon = findItem(acc1.id)?.icon;
        if (!icon) {
          const ring1 = trinkets.find(t => t.slot === 'Ring1');
          if (ring1) icon = findItem(ring1.id)?.icon;
        }
        if (!icon && trinkets.length > 0) icon = findItem(trinkets[0].id)?.icon;

        equipHtml += `
          <div class="equip-group" data-trinket-items='${JSON.stringify(trinkets)}'>
            <div class="equip-group-header">
              <img src="${icon || ''}" alt="Abalorios" onerror="this.style.display='none'">
              <div>
                <div class="equip-group-name">Abalorios${prefixDisplay}</div>
                ${upHtml}
              </div>
            </div>
          </div>
        `;
      }

      // --- APARTADO: Armas ---
      equipHtml += `<div class="equip-section-title">Armas</div>`;

      function renderWeaponSet(weapons, setLabel) {
        if (weapons.length === 0) return '';
        let html = '';
        for (const w of weapons) {
          const item = findItem(w.id);
          const upgrades = getUpgradesFromItem(w);
          const prefix = getPrefixFromItem(w);
          const prefixDisplay = prefix ? ` ${formatPrefixName(prefix)}` : '';
          const weaponType = translateWeaponType(item);
          const sigils = upgrades.filter(up => up.details && up.details.infix_upgrade);
          let sigilHtml = '';
          if (sigils.length > 0) {
            sigilHtml = `<div class="weapon-upgrades">`;
            for (const sigil of sigils) {
              sigilHtml += `
                <span class="upgrade-badge sello-badge" data-item-id="${sigil.id}">
                  <img src="${sigil.icon || ''}" alt="${sigil.name}" onerror="this.style.display='none'">
                  ${sigil.name}
                </span>
              `;
            }
            sigilHtml += `</div>`;
          }
          html += `
            <div class="weapon-item" data-weapon-item='${JSON.stringify(w)}'>
              <img src="${item?.icon || ''}" alt="${weaponType}" onerror="this.style.display='none'">
              <div class="weapon-info">
                <div class="weapon-name">${weaponType}${prefixDisplay}</div>
                ${sigilHtml}
              </div>
            </div>
          `;
        }
        return html;
      }

      const weaponsAhtml = renderWeaponSet(weaponsA, 'A');
      const weaponsBhtml = renderWeaponSet(weaponsB, 'B');
      if (weaponsAhtml) {
        equipHtml += weaponsAhtml;
        if (weaponsBhtml) {
          equipHtml += `<div class="weapon-set-divider"></div>`;
        }
      }
      if (weaponsBhtml) {
        equipHtml += weaponsBhtml;
      }

      // --- APARTADO: Reliquia ---
      equipHtml += `<div class="equip-section-title">Reliquia</div>`;
      if (relic) {
        let item = findItem(relic.id);
        if (!item || !item.name) {
          item = {
            name: 'Reliquia Legendaria',
            icon: 'https://render.guildwars2.com/file/08DED07BF6DF37E69A08D1C49D9C45D81BD8A5CA/3255567.png',
            id: relic.id || 0
          };
        }
        const upgrades = getUpgradesFromItem(relic);
        const bonusStr = upgrades.map(u => u.name).join(' · ');
        equipHtml += `
          <div class="relic-item" data-relic-item='${JSON.stringify(relic)}'>
            <img src="${item.icon || ''}" alt="${item.name}" onerror="this.style.display='none'">
            <div class="relic-info">
              <div class="relic-name">${item.name}</div>
              ${bonusStr ? `<div class="relic-bonus">${bonusStr}</div>` : ''}
            </div>
          </div>
        `;
      } else {
        equipHtml += `<div class="empty-message">Sin reliquia equipada</div>`;
      }

      // ============================================================
      // ATRIBUTOS HTML (con corte fijo después de Concentración)
      // ============================================================
      function renderAttrGrid(attrs, orderKeys = null) {
        const keys = orderKeys || ATTR_ORDER;
        const concentrationIndex = keys.indexOf('concentration');
        let col1Keys, col2Keys;
        if (concentrationIndex !== -1) {
          col1Keys = keys.slice(0, concentrationIndex + 1);
          col2Keys = keys.slice(concentrationIndex + 1);
        } else {
          const mid = Math.ceil(keys.length / 2);
          col1Keys = keys.slice(0, mid);
          col2Keys = keys.slice(mid);
        }
        col1Keys = col1Keys.filter(k => attrs[k] !== undefined);
        col2Keys = col2Keys.filter(k => attrs[k] !== undefined);

        let grid = '<div class="stats-grid"><div class="col">';
        for (const key of col1Keys) {
          const label = ATTR_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1);
          let value = attrs[key];
          if (['crit_chance', 'crit_damage', 'cond_duration', 'boon_duration', 'movement_speed'].includes(key)) {
            value = value + '%';
          } else if (['health', 'armor'].includes(key)) {
            value = value.toLocaleString();
          }
          grid += `
            <div class="stat-item">
              <div class="value">${value}</div>
              <div class="label">${label}</div>
            </div>
          `;
        }
        grid += '</div><div class="col">';
        for (const key of col2Keys) {
          const label = ATTR_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1);
          let value = attrs[key];
          if (['crit_chance', 'crit_damage', 'cond_duration', 'boon_duration', 'movement_speed'].includes(key)) {
            value = value + '%';
          } else if (['health', 'armor'].includes(key)) {
            value = value.toLocaleString();
          }
          grid += `
            <div class="stat-item">
              <div class="value">${value}</div>
              <div class="label">${label}</div>
            </div>
          `;
        }
        grid += '</div></div>';
        return grid;
      }

      function renderPrefixSummary() {
        const prefixCountLocal = {};
        for (const equip of equipment) {
          if (isExcludedSlot(equip.slot)) continue;
          if (equip.stats && equip.stats.id) {
            const name = statNamesMap[equip.stats.id] || `ID ${equip.stats.id}`;
            prefixCountLocal[name] = (prefixCountLocal[name] || 0) + 1;
          }
        }
        const entries = Object.entries(prefixCountLocal);
        if (entries.length === 0) return '';
        entries.sort((a, b) => b[1] - a[1]);
        const parts = entries.map(([name, count]) => {
          const displayName = formatPrefixName(name);
          return `<span class="prefix-item"><span class="count">${count}</span> <span class="name">${displayName}</span></span>`;
        });
        return `
          <div class="prefix-summary">
            <span class="label">Prefijos:</span>
            ${parts.join('')}
          </div>
        `;
      }

      // *** CAMBIO 2: En la pestaña Base, solo mostrar Potencia, Dureza, Vitalidad, Precisión ***
      let attrsHtml = `
        <div class="tabs">
          <button class="tab-btn active" data-tab="total">Totales</button>
          <button class="tab-btn" data-tab="base">Base (nivel 80)</button>
          <button class="tab-btn" data-tab="equipo">Equipo</button>
          <button class="tab-btn" data-tab="mejoras">Mejoras</button>
        </div>
        <div id="tab-total" class="tab-content active">
          ${renderAttrGrid(totalAttrs)}
        </div>
        <div id="tab-base" class="tab-content">
          ${renderAttrGrid(baseAttrs, ['power', 'toughness', 'vitality', 'precision'])}
        </div>
        <div id="tab-equipo" class="tab-content">
          ${Object.keys(equipBaseAttrs).length > 0 ? renderAttrGrid(equipBaseAttrs, Object.keys(equipBaseAttrs)) : '<div class="empty-message">No hay atributos del equipo base.</div>'}
          ${renderPrefixSummary()}
        </div>
        <div id="tab-mejoras" class="tab-content">
          <div class="sub-section-title">
            <span>💎 Infusiones</span>
            <span class="badge">${Object.keys(infusionAttrs).length} atributos</span>
          </div>
          ${Object.keys(infusionAttrs).length > 0 ? renderAttrGrid(infusionAttrs, Object.keys(infusionAttrs)) : '<div class="empty-message">No hay atributos de infusiones.</div>'}
          ${renderContributions(infusionContributions, ATTR_LABELS)}
          
          <div class="sub-section-title" style="margin-top: 20px;">
            <span>🧙 Runas</span>
            <span class="badge">${Object.keys(runeAttrs).length} atributos</span>
          </div>
          ${Object.keys(runeAttrs).length > 0 ? renderAttrGrid(runeAttrs, Object.keys(runeAttrs)) : '<div class="empty-message">No hay atributos de runas.</div>'}
          ${renderRuneContributions(runeContributions, ATTR_LABELS)}
        </div>
      `;

      // ============================================================
      // CABECERA Y RESTO DE LA PÁGINA
      // ============================================================
      const buildTabName = buildTabs[indexBuild]?.name || buildTabs[indexBuild]?.build?.name || charData.name;
      const specBgIcon = specLines.length > 0 && specLines[specLines.length - 1].id
        ? (findSpec(specLines[specLines.length - 1].id)?.icon || professionIcon)
        : professionIcon;
      const specIconHtml = specBgIcon
        ? `<img class="profession-icon" src="${specBgIcon}" alt="Especialidad" onerror="this.style.display='none'">`
        : '⚔️';
      const profEs = PROFESSION_NAMES_ES[charData.profession] || charData.profession || 'Desconocido';

      const equipForWeapons = equipmentTabs[indexEquip]?.equipment || charData.equipment || [];
      const getWeaponSetDesc = (set) => {
        const ws = equipForWeapons.filter(e => e.slot === `Weapon${set}1` || e.slot === `Weapon${set}2`);
        if (ws.length === 0) return 'Sin armas';
        const types = ws.map(w => {
          const item = findItem(w.id);
          return translateWeaponType(item);
        });
        return types.join(' + ');
      };
      const setADesc = getWeaponSetDesc('A');
      const setBDesc = getWeaponSetDesc('B');

      // *** CAMBIO: En la parte 1 también usamos el ciclo de colores para los chips, por coherencia ***
      const chipColorClasses = ['wvw', 'set1', 'set2', 'set3', 'set4', 'set5'];

      let html = `
        <header class="header">
          <div class="header-bg" style="background-image: url('${specLines.length > 0 && specLines[specLines.length - 1].id ? (findSpec(specLines[specLines.length - 1].id)?.background || '') : ''}');">
            <div class="header-content">
              <h1>${specIconHtml} ${buildTabName}</h1>
              <div class="subtitle">${profEs}</div>
              <div class="chips">
                <span class="chip ${chipColorClasses[0]}">WvW</span>
                <span class="chip ${chipColorClasses[1 % chipColorClasses.length]}">${setADesc}</span>
                <span class="chip ${chipColorClasses[2 % chipColorClasses.length]}">${setBDesc}</span>
              </div>
            </div>
          </div>
        </header>
      `;

      // Sección Build
      html += `
        <section class="panel">
          <div class="section-title">
            <span class="accent gold-accent"></span>
            <span>Build</span>
          </div>
          <div class="tabs-bar-container">
            <div class="tabs-bar-group">
              <span class="tabs-bar-label">⚔️ Equipo</span>
              <div class="tabs-bar" id="equipTabsBar">
      `;
      if (equipmentTabs.length === 0) {
        html += `<span style="color:var(--muted);font-size:13px;">Sin plantillas de equipo</span>`;
      } else {
        for (let i = 0; i < equipmentTabs.length; i++) {
          const tab = equipmentTabs[i];
          const name = tab.name || `Equipo ${i+1}`;
          const active = (i === indexEquip) ? 'active' : '';
          html += `
            <button class="tab-btn-build ${active}" data-tab-index="${i}" data-type="equip">
              ${i+1}
              <span class="tab-tooltip">${name}</span>
            </button>
          `;
        }
      }
      html += `
              </div>
              <span class="active-tab-name">${equipmentTabs[indexEquip]?.name || 'Equipo actual'}</span>
            </div>
            <div class="tabs-bar-group">
              <span class="tabs-bar-label">🧙 Perfil</span>
              <div class="tabs-bar" id="buildTabsBar">
      `;
      if (buildTabs.length === 0) {
        html += `<span style="color:var(--muted);font-size:13px;">Sin plantillas de perfil</span>`;
      } else {
        for (let i = 0; i < buildTabs.length; i++) {
          const tab = buildTabs[i];
          const name = tab.name || tab.build?.name || `Perfil ${i+1}`;
          const active = (i === indexBuild) ? 'active' : '';
          html += `
            <button class="tab-btn-build ${active}" data-tab-index="${i}" data-type="build">
              ${i+1}
              <span class="tab-tooltip">${name}</span>
            </button>
          `;
        }
      }
      html += `
              </div>
              <span class="active-tab-name">${buildTabs[indexBuild]?.name || buildTabs[indexBuild]?.build?.name || 'Perfil actual'}</span>
            </div>
            <div class="tabs-bar-group">
              <span class="tabs-bar-label">📋 Código</span>
              <div style="flex:1; display: flex; align-items: center;">
                <div id="buildCodeResult" class="code-area loading">⏳ Generando código...</div>
              </div>
            </div>
          </div>
        </section>
      `;

      // Rasgos
      if (specLines.length > 0) {
        html += `
          <section class="panel">
            <div class="section-title">
              <span class="accent purple-accent"></span>
              <span>Rasgos</span>
            </div>
            <div class="trait-rows">
        `;
        for (let index = 0; index < specLines.length; index++) {
          const line = specLines[index];
          const spec = findSpec(line.id);
          if (!spec) continue;
          const color = getColorForSpecialization(profession, index);
          const traitIds = line.traits || [];
          while (traitIds.length < 3) traitIds.push(0);
          const traitObjs = traitIds.map(id => findTrait(id));
          const orders = traitIds.map(id => {
            if (!id) return 0;
            const t = findTrait(id);
            if (t && t.order !== undefined) return t.order + 1;
            return 0;
          });
          const orderStr = orders.map(o => o || 0).join('-');
          html += `
            <div class="trait-row">
              <div class="trait-spec" style="background: ${color.bg}; border-color: ${color.border}; color: ${color.text};">
                <img class="icon" src="${spec.icon || ''}" alt="${spec.name}" onerror="this.style.display='none'">
                <span class="spec-name">${spec.name}</span>
                <span class="spec-order">${orderStr}</span>
              </div>
          `;
          for (let i = 0; i < 3; i++) {
            const t = traitObjs[i];
            if (t && t.id) {
              html += `
                <div class="trait-slot" data-trait-id="${t.id}">
                  <img class="icon icon-sm" src="${t.icon || ''}" alt="${t.name || '?'}" onerror="this.style.display='none'">
                  <span class="trait-name">${t.name || '?'}</span>
                </div>
              `;
            } else {
              html += `
                <div class="trait-slot" style="opacity:0.4; cursor:default;">
                  <img class="icon icon-sm" src="https://render.guildwars2.com/file/1C4A0D4E0D0E0D0E0D0E0D0E0D0E0D0E0D0E0D0E/0000000.png" alt="vacío" style="filter:grayscale(1);">
                  <span class="trait-name" style="color:var(--muted);">Vacío</span>
                </div>
              `;
            }
          }
          html += `</div>`;
        }
        html += `
            </div>
          </section>
        `;
      } else {
        html += `
          <section class="panel">
            <div class="section-title">
              <span class="accent purple-accent"></span>
              <span>Rasgos</span>
            </div>
            <div class="empty-message">No hay rasgos seleccionados.</div>
          </section>
        `;
      }

      // Habilidades - para Retornado mostramos solo las leyendas terrestres
      if (profession === 'Revenant' && legendSkills && legendSkills.length > 0) {
        // Tomamos solo las dos primeras (terrestres)
        const terrestrialLegends = legendSkills.slice(0, 2);
        html += `
          <section class="panel">
            <div class="section-title">
              <span class="accent air-accent"></span>
              <span>Habilidades de Leyendas</span>
            </div>
        `;
        for (const legend of terrestrialLegends) {
          const legendName = legend.name || legend.id;
          const skills = legend.skills || [];
          const validSkills = skills.filter(s => s && s.id && s.id > 0);
          if (validSkills.length === 0) continue;
          html += `
            <div class="legend-container">
              <div class="legend-title">
                ${legend.icon ? `<img src="${legend.icon}" alt="${legendName}" onerror="this.style.display='none'">` : ''}
                ${legendName}
              </div>
              <div class="legend-skills">
          `;
          for (const skill of validSkills) {
            html += `
              <div class="skill-slot" data-skill-id="${skill.id}">
                <img class="icon" src="${skill.icon || ''}" alt="${skill.name}" onerror="this.style.display='none'">
                ${skill.name || '?'}
              </div>
            `;
          }
          html += `
              </div>
            </div>
          `;
        }
        html += `
          </section>
        `;
      } else if (allSkills.length > 0) {
        html += `
          <section class="panel">
            <div class="section-title">
              <span class="accent air-accent"></span>
              <span>Habilidades</span>
            </div>
            <div class="skills-grid">
        `;
        for (const skill of allSkills) {
          html += `
            <div class="skill-slot" data-skill-id="${skill.id}">
              <img class="icon" src="${skill.icon || ''}" alt="${skill.name}" onerror="this.style.display='none'">
              ${skill.name || '?'}
            </div>
          `;
        }
        html += `
            </div>
          </section>
        `;
      } else {
        html += `
          <section class="panel">
            <div class="section-title">
              <span class="accent air-accent"></span>
              <span>Habilidades</span>
            </div>
            <div class="empty-message">No hay habilidades en la barra.</div>
          </section>
        `;
      }

      // Sección combinada Equipo + Atributos
      html += `
        <section class="panel">
          <div class="two-col">
            <div>
              <div class="section-title">
                <span class="accent green-accent"></span>
                <span>Equipo</span>
              </div>
              ${equipHtml || '<div class="empty-message">No hay equipo equipado.</div>'}
            </div>
            <div>
              <div class="section-title">
                <span class="accent cyan-accent"></span>
                <span>Atributos</span>
              </div>
              ${attrsHtml}
            </div>
          </div>
        </section>
      `;

      // Botones
      html += `
        <section class="panel">
          <div class="btn-group">
            <button class="btn secondary" id="backToListBtn">← Volver a la lista</button>
            <button class="btn secondary" id="changeTokenBtn">Cambiar token</button>
          </div>
        </section>
      `;

      return html;
    }

    // ============================================================
    // GENERADOR DE CÓDIGO DE BUILD
    // ============================================================
    async function generateBuildCode() {
      const resultDiv = document.getElementById('buildCodeResult');
      if (!resultDiv) return;

      if (!buildTabs || buildTabs.length === 0 || indexBuild >= buildTabs.length) {
        resultDiv.className = 'code-area error';
        resultDiv.textContent = '❌ No hay pestañas de perfil disponibles.';
        return;
      }

      const build = buildTabs[indexBuild].build;
      if (!build) {
        resultDiv.className = 'code-area error';
        resultDiv.textContent = '❌ La pestaña de perfil seleccionada no contiene datos.';
        return;
      }

      resultDiv.className = 'code-area loading';
      resultDiv.textContent = '⏳ Generando código...';

      try {
        const profession = build.profession;
        const profId = PROFESSION_IDS[profession] || 0;

        const tSkills = build.skills || {};
        const tUtils = tSkills.utilities || [];
        const terrestrialIds = [
          tSkills.heal || 0,
          tUtils[0] || 0,
          tUtils[1] || 0,
          tUtils[2] || 0,
          tSkills.elite || 0
        ];

        const aSkills = build.aquatic_skills || {};
        const aUtils = aSkills.utilities || [];
        const aquaticIds = [
          aSkills.heal || 0,
          aUtils[0] || 0,
          aUtils[1] || 0,
          aUtils[2] || 0,
          aSkills.elite || 0
        ];

        const allIds = [...terrestrialIds, ...aquaticIds];
        const paletteMap = await resolvePaletteMap(profession, allIds);

        const terrestrialPalettes = terrestrialIds.map(id => paletteMap[id] || 0);
        const aquaticPalettes = aquaticIds.map(id => paletteMap[id] || 0);

        const pets = [
          build.pets?.terrestrial?.[0] || 0,
          build.pets?.terrestrial?.[1] || 0,
          build.pets?.aquatic?.[0] || 0,
          build.pets?.aquatic?.[1] || 0
        ];

        const rawLegends = build.legends || [];
        const rawAquaticLegends = build.aquatic_legends || [];
        const extractLegendCode = (legendStr) => {
          if (!legendStr) return 0;
          if (typeof legendStr === 'string') {
            const num = parseInt(legendStr.replace(/\D/g, ''));
            return isNaN(num) ? 0 : num;
          }
          return legendStr || 0;
        };
        const legends = [extractLegendCode(rawLegends[0]), extractLegendCode(rawLegends[1])];
        const aquaticLegends = [extractLegendCode(rawAquaticLegends[0]), extractLegendCode(rawAquaticLegends[1])];
        while (legends.length < 2) legends.push(0);
        while (aquaticLegends.length < 2) aquaticLegends.push(0);

        let inactiveLegendSkills = [0, 0, 0];
        let inactiveAquaticLegendSkills = [0, 0, 0];
        if (profId === 9) {
          if (legends[1] > 0) {
            inactiveLegendSkills = await getInactiveLegendPalettes(profession, legends[1], false);
          }
          if (aquaticLegends[1] > 0) {
            inactiveAquaticLegendSkills = await getInactiveLegendPalettes(profession, aquaticLegends[1], true);
          }
        }

        const processedSpecs = await Promise.all(
          (build.specializations || []).map(async (spec) => {
            if (!spec || !spec.id) return { id: 0, choices: [0, 0, 0] };
            const rawTraits = spec.traits || [0, 0, 0];
            const choices = await Promise.all([
              getTraitChoice(rawTraits[0]),
              getTraitChoice(rawTraits[1]),
              getTraitChoice(rawTraits[2])
            ]);
            return { id: spec.id, choices };
          })
        );

        const chatCode = buildToBytes(
          profession,
          processedSpecs,
          terrestrialPalettes,
          aquaticPalettes,
          pets,
          legends,
          aquaticLegends,
          inactiveLegendSkills,
          inactiveAquaticLegendSkills
        );

        resultDiv.className = 'code-area';
        resultDiv.textContent = chatCode;
        resultDiv.title = 'Haz clic para copiar al portapapeles';

        resultDiv.onclick = async function() {
          const text = this.textContent;
          try {
            await navigator.clipboard.writeText(text);
            this.className = 'code-area';
            this.textContent = '¡Copiado!';
            setTimeout(() => {
              this.textContent = text;
              this.className = 'code-area';
            }, 1500);
          } catch (err) {
            console.error('Error al copiar:', err);
            this.className = 'code-area error';
            this.textContent = 'Error al copiar';
            setTimeout(() => {
              this.textContent = text;
              this.className = 'code-area';
            }, 1500);
          }
        };

      } catch (err) {
        resultDiv.className = 'code-area error';
        resultDiv.textContent = `❌ ${err.message}`;
        console.error(err);
        resultDiv.onclick = null;
      }
    }

    // ============================================================
    // RENDERIZADO DE ESTADOS (Login, Lista, etc.)
    // ============================================================
    function renderLogin() {
      const app = document.getElementById('app');
      app.innerHTML = `
        <div class="panel" style="max-width:600px;margin:auto;">
          <div class="section-title">
            <span class="accent cyan-accent"></span>
            <span>🔑 Conectar a Guild Wars 2</span>
          </div>
          <p style="color:var(--muted);margin-bottom:16px;">
            Introduce tu <strong>API Key</strong> para cargar tus personajes.
          </p>
          <div class="token-input-group">
            <input type="password" id="tokenInput" placeholder="Ej: 123456-ABCDEF-..." autofocus>
            <button class="btn" id="connectBtn">Conectar</button>
          </div>
          <div id="loginError" class="error-message" style="display:none;"></div>
          <div style="margin-top:16px;font-size:13px;color:var(--muted);">
            Puedes generar una API Key en el <a href="https://account.guildwars2.com/applications" target="_blank" style="color:var(--cyan);">portal de aplicaciones</a>.
            <br>Necesita el permiso <strong>characters</strong>, <strong>guilds</strong> y <strong>builds</strong>.
          </div>
        </div>
      `;
      document.getElementById('connectBtn').addEventListener('click', handleConnect);
      document.getElementById('tokenInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleConnect();
      });
    }

    function renderCharacterList(list) {
      const app = document.getElementById('app');
      let cards = '';
      if (list.length === 0) {
        cards = `<div class="empty-message">No se encontraron personajes en esta cuenta.</div>`;
      } else {
        cards = `<div class="character-list">`;
        for (const name of list) {
          cards += `
            <div class="character-card" data-name="${name}">
              <div class="name">${name}</div>
              <div class="detail">Haz clic para ver detalles</div>
            </div>
          `;
        }
        cards += `</div>`;
      }
      app.innerHTML = `
        <div class="panel">
          <div class="section-title">
            <span class="accent purple-accent"></span>
            <span>👥 Selecciona un personaje</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:8px;">
            <span style="color:var(--muted);">${list.length} personaje${list.length !== 1 ? 's' : ''} encontrado${list.length !== 1 ? 's' : ''}</span>
            <button class="btn secondary" id="changeTokenFromListBtn">Cambiar token</button>
          </div>
          ${cards}
          <div id="listError" class="error-message" style="display:none;"></div>
        </div>
      `;
      document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('click', function() {
          const name = this.dataset.name;
          loadCharacterDetail(name);
        });
      });
      document.getElementById('changeTokenFromListBtn').addEventListener('click', () => {
        token = null;
        currentCharacterName = null;
        renderLogin();
      });
    }

    function renderLoading(message = 'Cargando datos del personaje...') {
      const app = document.getElementById('app');
      app.innerHTML = `
        <div class="loading">
          <div class="spinner"></div>
          <div>${message}</div>
          <div style="font-size:14px;margin-top:8px;color:var(--muted);">Consultando API de Guild Wars 2</div>
        </div>
      `;
    }

    function renderError(message) {
      const app = document.getElementById('app');
      app.innerHTML = `
        <div class="loading" style="color:#f87171;">
          <div style="font-size:48px;margin-bottom:16px;">⚠️</div>
          <div><strong>Error</strong></div>
          <div style="font-size:14px;margin-top:8px;color:var(--muted);">${message}</div>
          <div style="margin-top:20px;">
            <button class="btn secondary" id="retryBtn">Reintentar</button>
            <button class="btn secondary" id="backToLoginBtn">Volver al inicio</button>
          </div>
        </div>
      `;
      document.getElementById('retryBtn')?.addEventListener('click', () => {
        if (currentCharacterName) {
          loadCharacterDetail(currentCharacterName);
        } else {
          handleConnect();
        }
      });
      document.getElementById('backToLoginBtn')?.addEventListener('click', () => {
        token = null;
        currentCharacterName = null;
        renderLogin();
      });
    }

    // ============================================================
    // MANEJADORES DE ACCIONES
    // ============================================================
    async function handleConnect() {
      const input = document.getElementById('tokenInput');
      const errorDiv = document.getElementById('loginError');
      const tokenValue = input.value.trim();
      if (!tokenValue) {
        errorDiv.textContent = 'Por favor, introduce una API Key.';
        errorDiv.style.display = 'block';
        return;
      }
      errorDiv.style.display = 'none';
      token = tokenValue;
      renderLoading('Conectando y obteniendo lista de personajes...');
      try {
        const names = await getCharacters(token);
        characterList = names;
        renderCharacterList(characterList);
      } catch (err) {
        errorDiv.textContent = `Error al conectar: ${err.message}`;
        errorDiv.style.display = 'block';
        token = null;
        renderLogin();
      }
    }

    // ============================================================
    // CARGA DE PERSONAJE CON PESTAÑAS DE EQUIPO Y PERFIL
    // ============================================================
    async function loadCharacterDetail(name) {
      if (!token) {
        renderLogin();
        return;
      }
      currentCharacterName = name;
      renderLoading(`Cargando datos de ${name}...`);

      try {
        const charData = await getCharacter(name, token);
        currentCharData = charData;

        const [equipTabs, buildTabsData] = await Promise.all([
          fetchGW2(`${API_BASE}/characters/${encodeURIComponent(name)}/equipmenttabs?tabs=all&access_token=${token}`),
          fetchGW2(`${API_BASE}/characters/${encodeURIComponent(name)}/buildtabs?tabs=all&access_token=${token}`)
        ]);

        if (!Array.isArray(equipTabs) || equipTabs.length === 0) {
          equipmentTabs = [{ tab: 0, name: 'Equipo actual', is_active: true, equipment: charData.equipment || [] }];
        } else {
          equipmentTabs = equipTabs;
        }
        if (!Array.isArray(buildTabsData) || buildTabsData.length === 0) {
          buildTabs = [{ tab: 0, name: 'Perfil actual', is_active: true, build: charData }];
        } else {
          buildTabs = buildTabsData;
        }

        const equipActive = equipmentTabs.findIndex(t => t.is_active === true);
        indexEquip = equipActive !== -1 ? equipActive : 0;
        const buildActive = buildTabs.findIndex(t => t.is_active === true);
        indexBuild = buildActive !== -1 ? buildActive : 0;

        let professionIcon = null;
        if (charData.profession) {
          professionIcon = await getProfessionIcon(charData.profession);
        }

        let guildData = null;
        if (charData.guild) {
          guildData = await getGuild(charData.guild, token);
        }

        // Recolectar IDs para caché
        const allItemIds = new Set();
        const allSpecIds = new Set();
        const allTraitIds = new Set();
        const allSkillIds = new Set();
        const allStatIds = new Set();

        function collectIdsFromEquipment(equipArray) {
          if (!equipArray) return;
          for (const e of equipArray) {
            if (e.id) allItemIds.add(e.id);
            if (e.upgrades) e.upgrades.forEach(id => { if (id) allItemIds.add(id); });
            if (e.infusions) e.infusions.forEach(id => { if (id) allItemIds.add(id); });
            if (e.stats && e.stats.id) allStatIds.add(e.stats.id);
          }
        }

        function collectIdsFromBuild(build) {
          if (!build) return;
          if (Array.isArray(build.specializations)) {
            build.specializations.forEach(s => {
              if (s.id) allSpecIds.add(s.id);
              if (s.traits && Array.isArray(s.traits)) {
                s.traits.forEach(tid => allTraitIds.add(tid));
              }
            });
          } else {
            const modes = ['pve', 'pvp', 'wvw'];
            for (const mode of modes) {
              const specs = build.specializations?.[mode] || [];
              if (Array.isArray(specs)) {
                specs.forEach(s => {
                  if (s.id) allSpecIds.add(s.id);
                  if (s.traits && Array.isArray(s.traits)) {
                    s.traits.forEach(tid => allTraitIds.add(tid));
                  }
                });
              }
            }
          }
          const skills = build.skills || {};
          if (skills.heal) allSkillIds.add(skills.heal);
          if (skills.elite) allSkillIds.add(skills.elite);
          if (Array.isArray(skills.utilities)) {
            skills.utilities.forEach(id => allSkillIds.add(id));
          }
          const aSkills = build.aquatic_skills || {};
          if (aSkills.heal) allSkillIds.add(aSkills.heal);
          if (aSkills.elite) allSkillIds.add(aSkills.elite);
          if (Array.isArray(aSkills.utilities)) {
            aSkills.utilities.forEach(id => allSkillIds.add(id));
          }
        }

        for (const tab of equipmentTabs) {
          if (tab.equipment) collectIdsFromEquipment(tab.equipment);
        }
        for (const tab of buildTabs) {
          if (tab.build) collectIdsFromBuild(tab.build);
        }

        const profession = charData.profession || '';
        if (profession === 'Revenant') {
          const activeBuild = buildTabs[indexBuild]?.build;
          if (activeBuild) {
            const legends = activeBuild.legends || [];
            const aquaticLegends = activeBuild.aquatic_legends || [];
            const allLegendIds = [...new Set([...legends, ...aquaticLegends])];
            for (const legendId of allLegendIds) {
              if (!legendId) continue;
              try {
                const legendData = await getLegend(legendId);
                if (legendData) {
                  if (legendData.heal) allSkillIds.add(legendData.heal);
                  if (legendData.utilities) legendData.utilities.forEach(id => allSkillIds.add(id));
                  if (legendData.elite) allSkillIds.add(legendData.elite);
                }
              } catch (e) {
                console.warn(`Error obteniendo leyenda ${legendId}:`, e);
              }
            }
          }
        }

        await Promise.all([
          getItems([...allItemIds]),
          getSpecializations([...allSpecIds]),
          getTraits([...allTraitIds]),
          getSkills([...allSkillIds]),
          getItemStats([...allStatIds])
        ]);

        if (charData.profession) {
          await getProfession(charData.profession);
        }

        popupDetails = {
          items: Object.values(apiCache.items),
          specializations: Object.values(apiCache.specializations),
          traits: Object.values(apiCache.traits),
          skills: Object.values(apiCache.skills),
          itemStats: Object.values(apiCache.itemStats),
          attrLabels: ATTR_LABELS
        };

        // Renderizar la parte 1 y luego añadir el creador
        await renderCharacterDetailWithTab();

      } catch (err) {
        console.error('Error loading character:', err);
        renderError(`No se pudo cargar el personaje: ${err.message}`);
      }
    }

    // ============================================================
    // RENDERIZAR DETALLE CON LAS PESTAÑAS SELECCIONADAS
    // ============================================================
    async function renderCharacterDetailWithTab() {
      const charData = currentCharData;
      if (!charData) return;

      try {
        const equipTab = equipmentTabs[indexEquip] || { equipment: [] };
        const buildTab = buildTabs[indexBuild] || { build: null };
        const equipmentData = equipTab;
        const buildData = buildTab.build;

        let professionIcon = null;
        if (charData.profession) {
          professionIcon = await getProfessionIcon(charData.profession);
        }

        let guildData = null;
        if (charData.guild) {
          guildData = await getGuild(charData.guild, token);
        }

        let legendSkills = null;
        const profession = charData.profession || '';
        if (profession === 'Revenant' && buildData) {
          const legends = buildData.legends || [];
          const aquaticLegends = buildData.aquatic_legends || [];
          const allLegendIds = [...new Set([...legends, ...aquaticLegends])];
          if (allLegendIds.length > 0) {
            legendSkills = [];
            for (const legendId of allLegendIds) {
              try {
                const legendData = await getLegend(legendId);
                if (!legendData) continue;
                let legendName = legendId;
                if (legendData.swap && legendData.swap > 0) {
                  const swapSkill = await getSkills([legendData.swap]);
                  if (swapSkill && swapSkill.length > 0 && swapSkill[0].name) {
                    legendName = swapSkill[0].name;
                  }
                }
                const skillIds = [];
                if (legendData.heal) skillIds.push(legendData.heal);
                if (legendData.utilities) {
                  for (const util of legendData.utilities) {
                    if (util) skillIds.push(util);
                  }
                }
                if (legendData.elite) skillIds.push(legendData.elite);
                let skillsArray = [];
                if (skillIds.length > 0) {
                  skillsArray = await getSkills(skillIds);
                }
                legendSkills.push({
                  id: legendData.id,
                  name: legendName,
                  icon: legendData.icon || null,
                  skills: skillsArray
                });
              } catch (e) {
                console.warn(`Error obteniendo leyenda ${legendId}:`, e);
              }
            }
          }
        }

        // 1. Obtener HTML de la parte 1 (buildDetailPage)
        const htmlParte1 = await buildDetailPage(charData, guildData, professionIcon, legendSkills, equipmentData, buildData);

        // 2. Generar HTML del creador (parte 2)
        const htmlCreator = generateCreatorHTML();

        // 3. Unir ambos: parte 1 + creador
        const app = document.getElementById('app');
        app.innerHTML = htmlParte1 + htmlCreator;

        // 4. Inicializar eventos de la parte 1 (tabs, popups, etc.)
        initPart1Events();

        // 5. Rellenar el formulario del creador con los datos actuales
        fillCreatorForm();

        // 6. Asignar evento al botón exportar (ya existe en el HTML generado)
        document.getElementById('exportBtn')?.addEventListener('click', async function() {
  try {
    this.disabled = true;
    this.textContent = '⏳ Generando HTML...';

    const fullHtml = await generateStaticHTML();

    const previewContent = document.getElementById('previewContent');
    previewContent.textContent = fullHtml;
    document.getElementById('previewPopup').classList.add('active');
  } catch (error) {
    console.error('Error al generar el HTML exportado:', error);
    alert(`No se pudo generar el HTML exportado: ${error.message}`);
  } finally {
    this.disabled = false;
    this.textContent = '📤 Exportar HTML';
  }
});

        // 7. Inicializar eventos de consumibles y referencias
        initCreatorEvents();

        // 8. Generar el código de build
        await generateBuildCode();

      } catch (err) {
        console.error('Error rendering character detail:', err);
        renderError(`Error al mostrar los detalles: ${err.message}`);
      }
    }

    // ============================================================
    // INICIALIZACIÓN DE EVENTOS DE LA PARTE 1
    // ============================================================
    function initPart1Events() {
      // Tabs de atributos
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
          this.classList.add('active');
          const tabId = this.dataset.tab;
          const target = document.getElementById('tab-' + tabId);
          if (target) target.classList.add('active');
        });
      });

      // Popups de equipo (armadura, abalorios, armas, reliquia)
      document.querySelectorAll('.equip-group[data-armor-items]').forEach(el => {
        el.addEventListener('click', function(e) {
          if (e.target.closest('.runa-item')) return;
          e.stopPropagation();
          const items = JSON.parse(this.dataset.armorItems);
          let html = `<div class="popup-title"><span>🔍</span> Armadura</div><div class="popup-facts">`;
          for (const eq of items) {
            const item = apiCache.items[eq.id];
            const prefix = eq.stats?.id ? apiCache.itemStats[eq.stats.id]?.name : null;
            const prefixDisplay = prefix ? ` ${formatPrefixName(prefix)}` : '';
            const upgrades = (eq.upgrades || []).map(id => apiCache.items[id]).filter(Boolean);
            const infusions = (eq.infusions || []).map(id => apiCache.items[id]).filter(Boolean);
            let upgradesHtml = '';
            if (upgrades.length) {
              upgradesHtml = upgrades.map(u => `<img src="${u.icon || ''}" style="width:20px;height:20px;border-radius:2px;object-fit:contain;background:rgba(0,0,0,0.3);"> ${u.name}`).join(', ');
            }
            let infusionsHtml = '';
            if (infusions.length) {
              infusionsHtml = infusions.map(u => `<img src="${u.icon || ''}" style="width:20px;height:20px;border-radius:2px;object-fit:contain;background:rgba(0,0,0,0.3);"> ${u.name}`).join(', ');
            }
            html += `
              <div class="popup-fact" style="flex-direction:column; align-items:flex-start; border-bottom:1px solid var(--line); padding:8px 0;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <img src="${item?.icon || ''}" style="width:28px;height:28px;border-radius:4px;object-fit:contain;background:rgba(0,0,0,0.3);">
                  <span><strong>${item?.name || 'Desconocido'}</strong>${prefixDisplay}</span>
                </div>
                <div style="font-size:13px;color:var(--muted);margin-left:36px;">
                  ${eq.slot || ''}
                  ${upgradesHtml ? '<br>' + upgradesHtml : ''}
                  ${infusionsHtml ? '<br>Infusiones: ' + infusionsHtml : ''}
                </div>
              </div>
            `;
          }
          html += `</div>`;
          showPopup(html);
        });
      });

      document.querySelectorAll('.equip-group[data-trinket-items]').forEach(el => {
        el.addEventListener('click', function(e) {
          if (e.target.closest('.runa-item')) return;
          e.stopPropagation();
          const items = JSON.parse(this.dataset.trinketItems);
          let html = `<div class="popup-title"><span>🔍</span> Abalorios</div><div class="popup-facts">`;
          for (const eq of items) {
            const item = apiCache.items[eq.id];
            const prefix = eq.stats?.id ? apiCache.itemStats[eq.stats.id]?.name : null;
            const prefixDisplay = prefix ? ` ${formatPrefixName(prefix)}` : '';
            const upgrades = (eq.upgrades || []).map(id => apiCache.items[id]).filter(Boolean);
            const infusions = (eq.infusions || []).map(id => apiCache.items[id]).filter(Boolean);
            let upgradesHtml = '';
            if (upgrades.length) {
              upgradesHtml = upgrades.map(u => `<img src="${u.icon || ''}" style="width:20px;height:20px;border-radius:2px;object-fit:contain;background:rgba(0,0,0,0.3);"> ${u.name}`).join(', ');
            }
            let infusionsHtml = '';
            if (infusions.length) {
              infusionsHtml = infusions.map(u => `<img src="${u.icon || ''}" style="width:20px;height:20px;border-radius:2px;object-fit:contain;background:rgba(0,0,0,0.3);"> ${u.name}`).join(', ');
            }
            html += `
              <div class="popup-fact" style="flex-direction:column; align-items:flex-start; border-bottom:1px solid var(--line); padding:8px 0;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <img src="${item?.icon || ''}" style="width:28px;height:28px;border-radius:4px;object-fit:contain;background:rgba(0,0,0,0.3);">
                  <span><strong>${item?.name || 'Desconocido'}</strong>${prefixDisplay}</span>
                </div>
                <div style="font-size:13px;color:var(--muted);margin-left:36px;">
                  ${eq.slot || ''}
                  ${upgradesHtml ? '<br>' + upgradesHtml : ''}
                  ${infusionsHtml ? '<br>Infusiones: ' + infusionsHtml : ''}
                </div>
              </div>
            `;
          }
          html += `</div>`;
          showPopup(html);
        });
      });

      document.querySelectorAll('.weapon-item').forEach(el => {
        el.addEventListener('click', function(e) {
          if (e.target.closest('.upgrade-badge')) return;
          e.stopPropagation();
          const eq = JSON.parse(this.dataset.weaponItem);
          const item = apiCache.items[eq.id];
          const prefix = eq.stats?.id ? apiCache.itemStats[eq.stats.id]?.name : null;
          const prefixDisplay = prefix ? ` ${formatPrefixName(prefix)}` : '';
          const upgrades = (eq.upgrades || []).map(id => apiCache.items[id]).filter(Boolean);
          const infusions = (eq.infusions || []).map(id => apiCache.items[id]).filter(Boolean);
          const weaponType = translateWeaponType(item);
          let upgradesHtml = '';
          if (upgrades.length) {
            upgradesHtml = upgrades.map(u => `<img src="${u.icon || ''}" style="width:20px;height:20px;border-radius:2px;object-fit:contain;background:rgba(0,0,0,0.3);"> ${u.name}`).join(', ');
          }
          let infusionsHtml = '';
          if (infusions.length) {
            infusionsHtml = infusions.map(u => `<img src="${u.icon || ''}" style="width:20px;height:20px;border-radius:2px;object-fit:contain;background:rgba(0,0,0,0.3);"> ${u.name}`).join(', ');
          }
          let html = `<div class="popup-title"><span>🔍</span> ${weaponType}</div><div class="popup-facts">`;
          html += `
            <div class="popup-fact" style="flex-direction:column; align-items:flex-start; border-bottom:1px solid var(--line); padding:8px 0;">
              <div style="display:flex; align-items:center; gap:8px;">
                <img src="${item?.icon || ''}" style="width:28px;height:28px;border-radius:4px;object-fit:contain;background:rgba(0,0,0,0.3);">
                <span><strong>${item?.name || 'Desconocido'}</strong>${prefixDisplay}</span>
              </div>
              <div style="font-size:13px;color:var(--muted);margin-left:36px;">
                ${eq.slot || ''}
                ${upgradesHtml ? '<br>' + upgradesHtml : ''}
                ${infusionsHtml ? '<br>Infusiones: ' + infusionsHtml : ''}
              </div>
            </div>
          `;
          html += `</div>`;
          showPopup(html);
        });
      });

      document.querySelectorAll('.relic-item').forEach(el => {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          const eq = JSON.parse(this.dataset.relicItem);
          const item = apiCache.items[eq.id];
          const upgrades = (eq.upgrades || []).map(id => apiCache.items[id]).filter(Boolean);
          const infusions = (eq.infusions || []).map(id => apiCache.items[id]).filter(Boolean);
          let upgradesHtml = '';
          if (upgrades.length) {
            upgradesHtml = upgrades.map(u => `<img src="${u.icon || ''}" style="width:20px;height:20px;border-radius:2px;object-fit:contain;background:rgba(0,0,0,0.3);"> ${u.name}`).join(', ');
          }
          let infusionsHtml = '';
          if (infusions.length) {
            infusionsHtml = infusions.map(u => `<img src="${u.icon || ''}" style="width:20px;height:20px;border-radius:2px;object-fit:contain;background:rgba(0,0,0,0.3);"> ${u.name}`).join(', ');
          }
          let html = `<div class="popup-title"><span>🔍</span> Reliquia</div><div class="popup-facts">`;
          html += `
            <div class="popup-fact" style="flex-direction:column; align-items:flex-start; border-bottom:1px solid var(--line); padding:8px 0;">
              <div style="display:flex; align-items:center; gap:8px;">
                <img src="${item?.icon || ''}" style="width:28px;height:28px;border-radius:4px;object-fit:contain;background:rgba(0,0,0,0.3);">
                <span><strong>${item?.name || 'Desconocido'}</strong></span>
              </div>
              <div style="font-size:13px;color:var(--muted);margin-left:36px;">
                ${eq.slot || ''}
                ${upgradesHtml ? '<br>' + upgradesHtml : ''}
                ${infusionsHtml ? '<br>Infusiones: ' + infusionsHtml : ''}
              </div>
            </div>
          `;
          html += `</div>`;
          showPopup(html);
        });
      });

      document.querySelectorAll('.runa-item[data-item-id]').forEach(el => {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          const itemId = parseInt(this.dataset.itemId);
          showItemPopup(itemId);
        });
      });

      document.querySelectorAll('.upgrade-badge[data-item-id]').forEach(el => {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          const itemId = parseInt(this.dataset.itemId);
          showItemPopup(itemId);
        });
      });
      document.querySelectorAll('.infusion-badge[data-item-id]').forEach(el => {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          const itemId = parseInt(this.dataset.itemId);
          showItemPopup(itemId);
        });
      });
      document.querySelectorAll('.relic-badge[data-item-id]').forEach(el => {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          const itemId = parseInt(this.dataset.itemId);
          showItemPopup(itemId);
        });
      });

      // Popup overlay y cierre
      const overlay = document.getElementById('popupOverlay');
      if (overlay) {
        overlay.addEventListener('click', function(e) {
          if (e.target === this) closePopup();
        });
      }
      const closeBtn = document.getElementById('popupClose');
      if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
      }

      // Botones de navegación
      document.getElementById('backToListBtn')?.addEventListener('click', () => {
        if (characterList.length > 0) renderCharacterList(characterList);
        else renderLogin();
      });
      document.getElementById('changeTokenBtn')?.addEventListener('click', () => {
        token = null;
        currentCharacterName = null;
        renderLogin();
      });

      // Pestañas de equipo y perfil
      document.querySelectorAll('.tab-btn-build').forEach(btn => {
        btn.addEventListener('click', function() {
          const idx = parseInt(this.dataset.tabIndex);
          const type = this.dataset.type;
          if (type === 'equip' && idx !== indexEquip) {
            indexEquip = idx;
            renderCharacterDetailWithTab();
          } else if (type === 'build' && idx !== indexBuild) {
            indexBuild = idx;
            renderCharacterDetailWithTab();
          }
        });
      });

      // Eventos para traits y skills
      document.querySelectorAll('.trait-slot[data-trait-id]').forEach(el => {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          const traitId = parseInt(this.dataset.traitId);
          showTraitPopup(traitId);
        });
      });
      document.querySelectorAll('.skill-slot[data-skill-id]').forEach(el => {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          const skillId = parseInt(this.dataset.skillId);
          showSkillPopup(skillId);
        });
      });
      document.querySelectorAll('.stat-prefix-badge[data-stat-id]').forEach(el => {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          const statId = parseInt(this.dataset.statId);
          let slotAttrs = null;
          const attrsJson = this.dataset.slotAttrs;
          if (attrsJson) {
            try { slotAttrs = JSON.parse(attrsJson); } catch (e) {}
          }
          showStatPopup(statId, slotAttrs);
        });
      });
    }

    // ============================================================
    // FUNCIONES PARA EL FORMULARIO (PARTE 2)
    // ============================================================
    function fillCreatorForm() {
      const charData = currentCharData;
      if (!charData) return;

      const titleEl = document.getElementById('editTitle');
      const subtitleEl = document.getElementById('editSubtitle');
      const chipsEl = document.getElementById('editChips');
      const playstyleEl = document.getElementById('editPlaystyle');
      const rot1NameEl = document.getElementById('rot1Name');
      const rot1ContentEl = document.getElementById('rot1Content');
      const rot2NameEl = document.getElementById('rot2Name');
      const rot2ContentEl = document.getElementById('rot2Content');
      const rot3NameEl = document.getElementById('rot3Name');
      const rot3ContentEl = document.getElementById('rot3Content');
      const notesEl = document.getElementById('editNotes');
      const relicEl = document.getElementById('editRelic');

      if (!titleEl) return;

      // Título
      const buildName = buildTabs[indexBuild]?.name || buildTabs[indexBuild]?.build?.name || charData.name;
      titleEl.value = buildName;

      // Subtítulo
      const profEs = PROFESSION_NAMES_ES[charData.profession] || charData.profession || '';
      subtitleEl.value = profEs;

      // Etiquetas
      const chips = ['WvW'];
      const equip = equipmentTabs[indexEquip]?.equipment || charData.equipment || [];
      const weaponsA = equip.filter(e => e.slot === 'WeaponA1' || e.slot === 'WeaponA2');
      const weaponsB = equip.filter(e => e.slot === 'WeaponB1' || e.slot === 'WeaponB2');
      const getWeaponTypes = (ws) => ws.map(w => {
        const item = apiCache.items[w.id];
        return translateWeaponType(item);
      }).filter(Boolean).join(' + ');
      if (weaponsA.length) chips.push(getWeaponTypes(weaponsA));
      if (weaponsB.length) chips.push(getWeaponTypes(weaponsB));
      chipsEl.value = chips.join(', ');

      // Limpiar campos de texto
      playstyleEl.value = '';
      rot1NameEl.value = 'Ataque principal';
      rot1ContentEl.value = '';
      rot2NameEl.value = 'Mantenimiento de presión';
      rot2ContentEl.value = '';
      rot3NameEl.value = 'Reinicio defensivo';
      rot3ContentEl.value = '';
      notesEl.value = '';

      // Reliquia: obtener nombre actual si existe
      const relicItem = equip.find(e => e.slot && e.slot.toLowerCase() === 'relic');
      if (relicItem && relicItem.id) {
        const item = apiCache.items[relicItem.id];
        relicEl.value = item ? item.name : '';
      } else {
        relicEl.value = '';
      }

      // Limpiar campos de consumibles y referencias
      document.getElementById('foodId').value = '';
      document.getElementById('utilityId').value = '';
      document.getElementById('foodPreview').style.display = 'none';
      document.getElementById('utilityPreview').style.display = 'none';
      document.getElementById('refText').value = '';
      document.getElementById('refUrl').value = '';
      document.getElementById('refListContainer').innerHTML = '';
    }

    // ============================================================
    // INICIALIZACIÓN DE EVENTOS DEL CREADOR (consumibles y referencias)
    // ============================================================
    function initCreatorEvents() {
      // Botón buscar comida
      document.getElementById('fetchFoodBtn').addEventListener('click', async function() {
        const id = document.getElementById('foodId').value.trim();
        if (!id) return;
        try {
          const url = `${API_BASE}/items?ids=${id}&lang=es`;
          const data = await fetchGW2(url);
          const item = Array.isArray(data) ? data[0] : data;
          if (!item) {
            document.getElementById('foodPreview').style.display = 'none';
            return;
          }
          const preview = document.getElementById('foodPreview');
          preview.style.display = 'flex';
          preview.innerHTML = `
            <img src="${item.icon || ''}" alt="${item.name}" onerror="this.style.display='none'">
            <div class="info">
              <div class="name">${item.name || 'Desconocido'}</div>
              <div class="desc">${item.description || ''}</div>
            </div>
          `;
          // Guardar el ítem en un dataset para luego exportarlo
          preview.dataset.item = JSON.stringify({ id: item.id, name: item.name, icon: item.icon, description: item.description });
        } catch (e) {
          console.error(e);
          document.getElementById('foodPreview').style.display = 'none';
        }
      });

      // Botón buscar apoyo
      document.getElementById('fetchUtilityBtn').addEventListener('click', async function() {
        const id = document.getElementById('utilityId').value.trim();
        if (!id) return;
        try {
          const url = `${API_BASE}/items?ids=${id}&lang=es`;
          const data = await fetchGW2(url);
          const item = Array.isArray(data) ? data[0] : data;
          if (!item) {
            document.getElementById('utilityPreview').style.display = 'none';
            return;
          }
          const preview = document.getElementById('utilityPreview');
          preview.style.display = 'flex';
          preview.innerHTML = `
            <img src="${item.icon || ''}" alt="${item.name}" onerror="this.style.display='none'">
            <div class="info">
              <div class="name">${item.name || 'Desconocido'}</div>
              <div class="desc">${item.description || ''}</div>
            </div>
          `;
          preview.dataset.item = JSON.stringify({ id: item.id, name: item.name, icon: item.icon, description: item.description });
        } catch (e) {
          console.error(e);
          document.getElementById('utilityPreview').style.display = 'none';
        }
      });

      // Añadir referencia
      document.getElementById('addRefBtn').addEventListener('click', function() {
        const textEl = document.getElementById('refText');
        const urlEl = document.getElementById('refUrl');
        const text = textEl.value.trim();
        const url = urlEl.value.trim();
        if (!text) return;

        const container = document.getElementById('refListContainer');
        const item = document.createElement('div');
        item.className = 'ref-item';

        // Favicon
        let faviconHtml = '';
        if (url) {
          const domain = new URL(url).hostname;
          faviconHtml = `<img src="https://www.google.com/s2/favicons?domain=${domain}" alt="favicon" onerror="this.style.display='none'">`;
        }
        item.innerHTML = `
          ${faviconHtml}
          ${url ? `<a href="${url}" target="_blank">${text}</a>` : `<span>${text}</span>`}
          <button class="del-ref" title="Eliminar referencia">✕</button>
        `;
        item.querySelector('.del-ref').addEventListener('click', function() {
          item.remove();
        });
        container.appendChild(item);
        textEl.value = '';
        urlEl.value = '';
      });
    }

    // ============================================================
    // EXPORTACIÓN: GENERAR HTML ESTÁTICO (con atributos compactos y sin pestañas)
    // ============================================================
    async function generateStaticHTML() {
      // 1. Obtener datos del formulario
      const title = document.getElementById('editTitle')?.value.trim() || currentCharData?.name || 'Build';
      const subtitle = document.getElementById('editSubtitle')?.value.trim() || '';
      const chipsRaw = document.getElementById('editChips')?.value.trim() || '';
      const chips = chipsRaw ? chipsRaw.split(',').map(s => s.trim()).filter(Boolean) : ['WvW'];
      const playstyle = document.getElementById('editPlaystyle')?.value.trim() || '';
      const rot1Name = document.getElementById('rot1Name')?.value.trim() || 'Ataque principal';
      const rot1Content = document.getElementById('rot1Content')?.value.trim() || '';
      const rot2Name = document.getElementById('rot2Name')?.value.trim() || 'Mantenimiento de presión';
      const rot2Content = document.getElementById('rot2Content')?.value.trim() || '';
      const rot3Name = document.getElementById('rot3Name')?.value.trim() || 'Reinicio defensivo';
      const rot3Content = document.getElementById('rot3Content')?.value.trim() || '';
      const notesRaw = document.getElementById('editNotes')?.value.trim() || '';
      const notes = notesRaw ? notesRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
      const relicName = document.getElementById('editRelic')?.value.trim() || '';

      // Obtener consumibles
      let foodData = null;
      let utilityData = null;
      const foodPreview = document.getElementById('foodPreview');
      const utilityPreview = document.getElementById('utilityPreview');
      if (foodPreview && foodPreview.dataset.item) {
        try { foodData = JSON.parse(foodPreview.dataset.item); } catch(e) {}
      }
      if (utilityPreview && utilityPreview.dataset.item) {
        try { utilityData = JSON.parse(utilityPreview.dataset.item); } catch(e) {}
      }

      // Obtener referencias
      const refItems = [];
      document.querySelectorAll('.ref-item').forEach(el => {
        const a = el.querySelector('a');
        const text = a ? a.textContent : el.textContent.replace('✕', '').trim();
        const url = a ? a.href : '';
        const favicon = el.querySelector('img') ? el.querySelector('img').src : '';
        refItems.push({ text, url, favicon });
      });

      // 2. Obtener datos del personaje actual y de la build seleccionada
      const charData = currentCharData;
      if (!charData) return 'Error: No hay personaje cargado.';

      const equipTab = equipmentTabs[indexEquip] || { equipment: [] };
      const buildTab = buildTabs[indexBuild] || { build: null };
      const equipment = equipTab.equipment || charData.equipment || [];
      const build = buildTab.build || charData;

      // 3. Extraer información de la build (rasgos, habilidades, etc.)
      let modeSpecs = [];
      let modeSkillsObj = {};
      if (Array.isArray(build.specializations)) {
        modeSpecs = build.specializations;
        modeSkillsObj = build.skills || {};
      } else if (build.specializations && typeof build.specializations === 'object') {
        const modes = ['pve', 'pvp', 'wvw'];
        let activeMode = 'pve';
        for (const m of modes) {
          if (build.specializations?.[m]?.length > 0) {
            activeMode = m;
            break;
          }
        }
        modeSpecs = build.specializations?.[activeMode] || [];
        modeSkillsObj = build.skills?.[activeMode] || {};
      } else {
        const modes = ['pve', 'pvp', 'wvw'];
        let activeMode = 'pve';
        for (const m of modes) {
          if (charData.specializations?.[m]?.length > 0) {
            activeMode = m;
            break;
          }
        }
        modeSpecs = charData.specializations?.[activeMode] || [];
        modeSkillsObj = charData.skills?.[activeMode] || {};
      }

      const findItem = (id) => apiCache.items[id];
      const findTrait = (id) => apiCache.traits[id];
      const findSkill = (id) => apiCache.skills[id];
      const findSpec = (id) => apiCache.specializations[id];

      // Habilidades
      const healSkill = modeSkillsObj.heal ? findSkill(modeSkillsObj.heal) : null;
      const utilitySkills = (modeSkillsObj.utilities || []).map(id => findSkill(id)).filter(Boolean);
      const eliteSkill = modeSkillsObj.elite ? findSkill(modeSkillsObj.elite) : null;
      const allSkills = [healSkill, ...utilitySkills, eliteSkill].filter(Boolean);

      // Rasgos
      const specLines = Array.isArray(modeSpecs) ? modeSpecs : [];

      // --- OBTENER ICONO DE ESPECIALIDAD ÉLITE PARA USAR COMO FALLBACK EN NOTAS ---
      let eliteSpecIcon = '';
      if (specLines.length > 0) {
        const lastSpec = specLines[specLines.length - 1];
        if (lastSpec && lastSpec.id) {
          const specObj = apiCache.specializations[lastSpec.id];
          if (specObj && specObj.icon) {
            eliteSpecIcon = specObj.icon;
          }
        }
      }
      if (!eliteSpecIcon) {
        if (charData.profession && apiCache.professions[charData.profession]) {
          eliteSpecIcon = apiCache.professions[charData.profession].icon || '';
        }
        if (!eliteSpecIcon) {
          eliteSpecIcon = 'https://render.guildwars2.com/file/1C4A0D4E0D0E0D0E0D0E0D0E0D0E0D0E0D0E0D0E/0000000.png';
        }
      }

      // 4. Calcular atributos (reutilizamos lógica de buildDetailPage)
      const baseAttrs = { ...BASE_ATTRIBUTES };
      const equipBaseAttrs = sumEquipmentBaseAttributes(equipment);
      const items = Object.values(apiCache.items);
      const upgradeData = sumUpgradeAttributes(equipment, items);
      const infusionAttrs = upgradeData.infusiones || {};
      const runeAttrs = upgradeData.runas || {};

      const totalAttrs = { ...baseAttrs };
      for (const [key, value] of Object.entries(equipBaseAttrs)) {
        totalAttrs[key] = (totalAttrs[key] || 0) + value;
      }
      for (const [key, value] of Object.entries(infusionAttrs)) {
        totalAttrs[key] = (totalAttrs[key] || 0) + value;
      }
      for (const [key, value] of Object.entries(runeAttrs)) {
        totalAttrs[key] = (totalAttrs[key] || 0) + value;
      }
      totalAttrs['elite_spec'] = 0;

      const profession = charData.profession || '';
      const baseHealth = getBaseHealth(profession);
      const vitalityTotal = totalAttrs.vitality || 1000;
      const totalHealth = baseHealth + (vitalityTotal * 10);
      const precision = totalAttrs.precision || 1000;
      const ferocity = totalAttrs.ferocity || 0;
      const expertise = totalAttrs.expertise || 0;
      const concentration = totalAttrs.concentration || 0;
      const toughness = totalAttrs.toughness || 1000;
      const healingPower = totalAttrs.healing || 0;
      const critChance = Math.round(5 + (precision - 1000) / 21);
      const critDamage = Math.round(150 + ferocity / 15);
      const condDuration = Math.round(expertise / 15);
      const boonDuration = Math.round(concentration / 15);
      const armor = toughness + 1000;

      totalAttrs.health = totalHealth;
      totalAttrs.armor = (totalAttrs.armor || 0) + armor;
      totalAttrs.crit_chance = (totalAttrs.crit_chance || 0) + Math.min(critChance, 100);
      totalAttrs.crit_damage = (totalAttrs.crit_damage || 0) + critDamage;
      totalAttrs.healing_power = (totalAttrs.healing_power || 0) + healingPower;
      totalAttrs.cond_duration = (totalAttrs.cond_duration || 0) + condDuration;
      totalAttrs.boon_duration = (totalAttrs.boon_duration || 0) + boonDuration;

      // 5. Generar HTML de las secciones estáticas

      // Cabecera
      const profEs = PROFESSION_NAMES_ES[profession] || profession || '';
      let specIcon = '';
      if (specLines.length > 0 && specLines[specLines.length - 1].id) {
        const lastSpec = findSpec(specLines[specLines.length - 1].id);
        if (lastSpec && lastSpec.icon) specIcon = lastSpec.icon;
      }
      if (!specIcon) {
        const profIcon = profession ? apiCache.professions[profession]?.icon : null;
        specIcon = profIcon || '';
      }
      const specIconHtml = specIcon ? `<img class="profession-icon" src="${specIcon}" alt="Especialidad" onerror="this.style.display='none'">` : '⚔️';

      // Armas para chips
      const weaponsA = equipment.filter(e => e.slot === 'WeaponA1' || e.slot === 'WeaponA2');
      const weaponsB = equipment.filter(e => e.slot === 'WeaponB1' || e.slot === 'WeaponB2');
      const getWeaponTypes = (ws) => ws.map(w => {
        const item = findItem(w.id);
        return translateWeaponType(item);
      }).filter(Boolean).join(' + ');
      const setADesc = weaponsA.length ? getWeaponTypes(weaponsA) : 'Sin armas';
      const setBDesc = weaponsB.length ? getWeaponTypes(weaponsB) : 'Sin armas';

      // *** CAMBIO PRINCIPAL: Asignar colores cíclicos a los chips usando un array de clases ***
      const chipColorClasses = ['wvw', 'set1', 'set2', 'set3', 'set4', 'set5'];

      let html = `
        <header class="header">
          <div class="header-bg" style="background-image: url('${specLines.length > 0 && specLines[specLines.length - 1].id ? (findSpec(specLines[specLines.length - 1].id)?.background || '') : ''}');">
            <div class="header-content">
              <h1>${specIconHtml} ${title}</h1>
              <div class="subtitle">${subtitle || profEs}</div>
              <div class="chips">
                ${chips.map((c, i) => {
                  const cls = chipColorClasses[i % chipColorClasses.length];
                  return `<span class="chip ${cls}">${c}</span>`;
                }).join('')}
              </div>
            </div>
          </div>
        </header>
      `;

      // Build (solo código)
      let chatCode = '';
      const codeDiv = document.getElementById('buildCodeResult');
      if (codeDiv && codeDiv.textContent && !codeDiv.textContent.includes('Generando')) {
        chatCode = codeDiv.textContent;
      } else {
        chatCode = 'Código no disponible';
      }

      html += `
        <section class="panel">
          <div class="section-title">
            <span class="accent gold-accent"></span>
            <span>Build</span>
          </div>
          <div style="margin-top:8px;">
            <div class="code-area">${chatCode}</div>
          </div>
        </section>
      `;

      // Rasgos - ahora con enlace en todo el bloque
      if (specLines.length > 0) {
        html += `
          <section class="panel">
            <div class="section-title">
              <span class="accent purple-accent"></span>
              <span>Rasgos</span>
            </div>
            <div class="trait-rows">
        `;
        for (let index = 0; index < specLines.length; index++) {
          const line = specLines[index];
          const spec = findSpec(line.id);
          if (!spec) continue;
          const color = getColorForSpecialization(profession, index);
          const traitIds = line.traits || [];
          while (traitIds.length < 3) traitIds.push(0);
          const traitObjs = traitIds.map(id => findTrait(id));
          const orders = traitIds.map(id => {
            if (!id) return 0;
            const t = findTrait(id);
            if (t && t.order !== undefined) return t.order + 1;
            return 0;
          });
          const orderStr = orders.map(o => o || 0).join('-');
          const specWiki = `https://wiki-es.guildwars2.com/wiki/${encodeURIComponent(spec.name)}`;
          html += `
            <div class="trait-row">
              <a href="${specWiki}" target="_blank" style="display:contents; text-decoration:none; color:inherit;">
                <div class="trait-spec" style="background: ${color.bg}; border-color: ${color.border}; color: ${color.text};">
                  <img class="icon" src="${spec.icon || ''}" alt="${spec.name}" onerror="this.style.display='none'">
                  <span class="spec-name">${spec.name}</span>
                  <span class="spec-order">${orderStr}</span>
                </div>
              </a>
          `;
          for (let i = 0; i < 3; i++) {
            const t = traitObjs[i];
            if (t && t.id) {
              const traitWiki = `https://wiki-es.guildwars2.com/wiki/${encodeURIComponent(t.name)}`;
              html += `
                <a href="${traitWiki}" target="_blank" style="display:contents; text-decoration:none; color:inherit;">
                  <div class="trait-slot">
                    <img class="icon icon-sm" src="${t.icon || ''}" alt="${t.name || '?'}" onerror="this.style.display='none'">
                    <span class="trait-name">${t.name || '?'}</span>
                  </div>
                </a>
              `;
            } else {
              html += `
                <div class="trait-slot" style="opacity:0.4;">
                  <img class="icon icon-sm" src="https://render.guildwars2.com/file/1C4A0D4E0D0E0D0E0D0E0D0E0D0E0D0E0D0E0D0E/0000000.png" alt="vacío" style="filter:grayscale(1);">
                  <span class="trait-name" style="color:var(--muted);">Vacío</span>
                </div>
              `;
            }
          }
          html += `</div>`;
        }
        html += `
            </div>
          </section>
        `;
      } else {
        html += `
          <section class="panel">
            <div class="section-title">
              <span class="accent purple-accent"></span>
              <span>Rasgos</span>
            </div>
            <div class="empty-message">No hay rasgos seleccionados.</div>
          </section>
        `;
      }

      // Habilidades - para Retornado mostramos solo las terrestres
      if (profession === 'Revenant') {
        // Obtener leyendas terrestres desde la build
        let legendSkills = null;
        if (build.legends && build.legends.length > 0) {
          legendSkills = [];
          for (const legendId of build.legends) {
            if (!legendId) continue;
            const legendData = apiCache.legends[legendId];
            if (legendData) {
              let legendName = legendId;
              if (legendData.swap && legendData.swap > 0) {
                const swapSkill = apiCache.skills[legendData.swap];
                if (swapSkill && swapSkill.name) legendName = swapSkill.name;
              }
              const skillIds = [];
              if (legendData.heal) skillIds.push(legendData.heal);
              if (legendData.utilities) legendData.utilities.forEach(id => skillIds.push(id));
              if (legendData.elite) skillIds.push(legendData.elite);
              const skillsArray = skillIds.map(id => apiCache.skills[id]).filter(Boolean);
              legendSkills.push({
                id: legendData.id,
                name: legendName,
                icon: legendData.icon || null,
                skills: skillsArray
              });
            }
          }
        }
        if (legendSkills && legendSkills.length > 0) {
          html += `
            <section class="panel">
              <div class="section-title">
                <span class="accent air-accent"></span>
                <span>Habilidades de Leyendas</span>
              </div>
          `;
          for (const legend of legendSkills) {
            const legendName = legend.name || legend.id;
            const skills = legend.skills || [];
            const validSkills = skills.filter(s => s && s.id && s.id > 0);
            if (validSkills.length === 0) continue;
            html += `
              <div class="legend-container">
                <div class="legend-title">
                  ${legend.icon ? `<img src="${legend.icon}" alt="${legendName}" onerror="this.style.display='none'">` : ''}
                  ${legendName}
                </div>
                <div class="legend-skills">
            `;
            for (const skill of validSkills) {
              const skillWiki = `https://wiki-es.guildwars2.com/wiki/${encodeURIComponent(skill.name)}`;
              html += `
                <a href="${skillWiki}" target="_blank" style="display:contents; text-decoration:none; color:inherit;">
                  <div class="skill-slot">
                    <img class="icon" src="${skill.icon || ''}" alt="${skill.name}" onerror="this.style.display='none'">
                    ${skill.name || '?'}
                  </div>
                </a>
              `;
            }
            html += `
                </div>
              </div>
            `;
          }
          html += `
            </section>
          `;
        } else {
          html += `
            <section class="panel">
              <div class="section-title">
                <span class="accent air-accent"></span>
                <span>Habilidades</span>
              </div>
              <div class="empty-message">No hay habilidades de leyendas disponibles.</div>
            </section>
          `;
        }
      } else if (allSkills.length > 0) {
        html += `
          <section class="panel">
            <div class="section-title">
              <span class="accent air-accent"></span>
              <span>Habilidades</span>
            </div>
            <div class="skills-grid">
        `;
        for (const skill of allSkills) {
          const skillWiki = `https://wiki-es.guildwars2.com/wiki/${encodeURIComponent(skill.name)}`;
          html += `
            <a href="${skillWiki}" target="_blank" style="display:contents; text-decoration:none; color:inherit;">
              <div class="skill-slot">
                <img class="icon" src="${skill.icon || ''}" alt="${skill.name}" onerror="this.style.display='none'">
                ${skill.name || '?'}
              </div>
            </a>
          `;
        }
        html += `
            </div>
          </section>
        `;
      } else {
        html += `
          <section class="panel">
            <div class="section-title">
              <span class="accent air-accent"></span>
              <span>Habilidades</span>
            </div>
            <div class="empty-message">No hay habilidades en la barra.</div>
          </section>
        `;
      }

      // Equipo y Atributos (solo totales en compacto)
      // Construir HTML de equipo con agrupación por prefijo y slots
      let equipHtml = '';

      // --- Función para agrupar por prefijo y mostrar slots ---
      function groupByPrefix(items, slotLabels) {
        const groups = {};
        for (const eq of items) {
          const prefix = eq.stats?.id ? (apiCache.itemStats[eq.stats.id]?.name || null) : null;
          const key = prefix || 'Sin prefijo';
          if (!groups[key]) {
            groups[key] = { prefix: key, items: [], count: 0 };
          }
          groups[key].items.push(eq);
          groups[key].count++;
        }
        // Ordenar por count descendente
        return Object.values(groups).sort((a, b) => b.count - a.count);
      }

      // Armadura
      const armorSlots = ['Helm', 'Shoulders', 'Coat', 'Gloves', 'Leggings', 'Boots'];
      const armorMap = {};
      equipment.forEach(e => {
        if (armorSlots.includes(e.slot)) { armorMap[e.slot] = e; }
      });
      const armorOrdered = armorSlots.map(slot => armorMap[slot]).filter(Boolean);
      if (armorOrdered.length > 0) {
        const groups = groupByPrefix(armorOrdered, armorSlots);
        const runaMap = {};
        for (const a of armorOrdered) {
          const ups = (a.upgrades || []).map(id => findItem(id)).filter(Boolean);
          for (const up of ups) {
            if (up.details && up.details.bonuses && up.details.bonuses.length > 0) {
              const key = up.id;
              if (!runaMap[key]) runaMap[key] = { id: key, name: up.name, count: 0, icon: up.icon };
              runaMap[key].count++;
            }
          }
        }

        equipHtml += `<div class="equip-section-title">Armadura</div>`;
        const icon = armorOrdered.find(a => a.slot === 'Coat') ? findItem(armorOrdered.find(a => a.slot === 'Coat').id)?.icon : (armorOrdered[0] ? findItem(armorOrdered[0].id)?.icon : '');
        // Mostrar todos los grupos bajo un mismo icono
        equipHtml += `<div class="equip-group" style="margin-bottom:4px;">`;
        equipHtml += `<div class="equip-group-header"><img src="${icon || ''}" alt="Armadura" onerror="this.style.display='none'"><div>`;
        for (const group of groups) {
          const prefixName = group.prefix !== 'Sin prefijo' ? formatPrefixName(group.prefix) : 'Sin prefijo';
          // Quitar "de " para el enlace
          const prefixForLink = prefixName.replace(/^de\s+/i, '').trim();
          const prefixWiki = `https://wiki-es.guildwars2.com/wiki/${encodeURIComponent(prefixForLink)}`;
          const slotNames = group.items.map(eq => {
            const label = eq.slot || '';
            return label;
          }).filter(Boolean).join(', ');
          equipHtml += `
            <div style="margin-top:6px;">
              <div class="equip-group-name"><a href="${prefixWiki}" target="_blank" style="color:var(--text); text-decoration:none;">Armadura ${prefixName} (${group.count})</a></div>
              <div style="font-size:13px; color:var(--muted); margin-left:12px;">${slotNames}</div>
            </div>
          `;
        }
        equipHtml += `</div></div></div>`;

        // Runas (apartado independiente)
        const runaEntries = Object.values(runaMap);
        if (runaEntries.length > 0) {
          equipHtml += `<div class="equip-section-title">Runas</div>`;
          for (const r of runaEntries) {
            const runaWiki = `https://wiki-es.guildwars2.com/wiki/${encodeURIComponent(r.name)}`;
            equipHtml += `
              <div style="display:flex; align-items:center; gap:8px; background:#2a1f3d; border:1px solid #a78bfa; border-radius:12px; padding:4px 12px 4px 8px; margin-bottom:6px; width:fit-content;">
                <img src="${r.icon || ''}" style="width:20px;height:20px;border-radius:2px;object-fit:contain;background:rgba(0,0,0,0.3);">
                <a href="${runaWiki}" target="_blank" style="color:#c4b5fd; text-decoration:none; font-size:14px;">${r.name} ${r.count}/6</a>
              </div>
            `;
          }
        }
      }

      // Abalorios
      const accessories = equipment.filter(e => e.slot === 'Accessory1' || e.slot === 'Accessory2' || e.slot === 'Ring1' || e.slot === 'Ring2' || e.slot === 'Amulet');
      const back = equipment.find(e => e.slot === 'Backpack');
      const trinkets = [...accessories];
      if (back) trinkets.push(back);
      if (trinkets.length > 0) {
        const groups = groupByPrefix(trinkets, ['Accesorio', 'Anillo', 'Amuleto', 'Espalda']);
        const icon = trinkets.find(t => t.slot === 'Accessory1') ? findItem(trinkets.find(t => t.slot === 'Accessory1').id)?.icon : (trinkets[0] ? findItem(trinkets[0].id)?.icon : '');
        equipHtml += `<div class="equip-section-title">Abalorios</div>`;
        equipHtml += `<div class="equip-group" style="margin-bottom:4px;">`;
        equipHtml += `<div class="equip-group-header"><img src="${icon || ''}" alt="Abalorios" onerror="this.style.display='none'"><div>`;
        for (const group of groups) {
          const prefixName = group.prefix !== 'Sin prefijo' ? formatPrefixName(group.prefix) : 'Sin prefijo';
          const prefixForLink = prefixName.replace(/^de\s+/i, '').trim();
          const prefixWiki = `https://wiki-es.guildwars2.com/wiki/${encodeURIComponent(prefixForLink)}`;
          const slotNames = group.items.map(eq => {
            let label = eq.slot || '';
            return label;
          }).filter(Boolean).join(', ');
          equipHtml += `
            <div style="margin-top:6px;">
              <div class="equip-group-name"><a href="${prefixWiki}" target="_blank" style="color:var(--text); text-decoration:none;">Abalorios ${prefixName} (${group.count})</a></div>
              <div style="font-size:13px; color:var(--muted); margin-left:12px;">${slotNames}</div>
            </div>
          `;
        }
        equipHtml += `</div></div></div>`;
      }

      // Armas
      equipHtml += `<div class="equip-section-title">Armas</div>`;
      function renderWeaponSetStatic(weapons) {
        if (weapons.length === 0) return '';
        let html = '';
        for (const w of weapons) {
          const item = findItem(w.id);
          const upgrades = (w.upgrades || []).map(id => findItem(id)).filter(Boolean);
          const prefix = w.stats?.id ? (apiCache.itemStats[w.stats.id]?.name || null) : null;
          const prefixDisplay = prefix ? ` ${formatPrefixName(prefix)}` : '';
          const prefixForLink = prefix ? prefix.replace(/^de\s+/i, '').trim() : '';
          const prefixWiki = prefixForLink ? `https://wiki-es.guildwars2.com/wiki/${encodeURIComponent(prefixForLink)}` : '';
          const weaponType = translateWeaponType(item);
          const sigils = upgrades.filter(up => up.details && up.details.infix_upgrade);
          let sigilHtml = '';
          if (sigils.length > 0) {
            sigilHtml = `<div class="weapon-upgrades">`;
            for (const sigil of sigils) {
              const sigilWiki = `https://wiki-es.guildwars2.com/wiki/${encodeURIComponent(sigil.name)}`;
              sigilHtml += `
                <a href="${sigilWiki}" target="_blank" style="display:contents; text-decoration:none; color:inherit;">
                  <span class="upgrade-badge sello-badge">
                    <img src="${sigil.icon || ''}" alt="${sigil.name}" onerror="this.style.display='none'">
                    ${sigil.name}
                  </span>
                </a>
              `;
            }
            sigilHtml += `</div>`;
          }
          html += `
            <div class="weapon-item">
              <img src="${item?.icon || ''}" alt="${weaponType}" onerror="this.style.display='none'">
              <div class="weapon-info">
                <div class="weapon-name">
                  ${prefixWiki ? `<a href="${prefixWiki}" target="_blank" style="color:var(--text); text-decoration:none;">${weaponType}${prefixDisplay}</a>` : `${weaponType}${prefixDisplay}`}
                </div>
                ${sigilHtml}
              </div>
            </div>
          `;
        }
        return html;
      }
      const weaponsAhtml = renderWeaponSetStatic(weaponsA);
      const weaponsBhtml = renderWeaponSetStatic(weaponsB);
      if (weaponsAhtml) {
        equipHtml += weaponsAhtml;
        if (weaponsBhtml) {
          equipHtml += `<div class="weapon-set-divider"></div>`;
        }
      }
      if (weaponsBhtml) {
        equipHtml += weaponsBhtml;
      }

      // Reliquia
      equipHtml += `<div class="equip-section-title">Reliquia</div>`;
      let relic = equipment.find(e => e.slot && e.slot.toLowerCase() === 'relic');
      if (!relic && charData.equipment) {
        relic = charData.equipment.find(e => e.slot && e.slot.toLowerCase() === 'relic');
      }
      if (relic) {
        let item = findItem(relic.id);
        if (!item || !item.name) {
          item = {
            name: 'Reliquia Legendaria',
            icon: 'https://render.guildwars2.com/file/08DED07BF6DF37E69A08D1C49D9C45D81BD8A5CA/3255567.png',
            id: relic.id || 0
          };
        }
        const displayName = relicName || item.name;
        const wikiLink = `https://wiki-es.guildwars2.com/wiki/${encodeURIComponent(displayName)}`;
        equipHtml += `
          <div class="relic-item">
            <img src="${item.icon || ''}" alt="${item.name}" onerror="this.style.display='none'">
            <div class="relic-info">
              <div class="relic-name"><a href="${wikiLink}" target="_blank" style="color:var(--cyan);text-decoration:underline;">${displayName}</a></div>
            </div>
          </div>
        `;
      } else {
        equipHtml += `<div class="empty-message">Sin reliquia equipada</div>`;
      }

      // Atributos totales en compacto
      function renderAttrGridStatic(attrs, orderKeys = null) {
        const keys = orderKeys || ATTR_ORDER;
        const concentrationIndex = keys.indexOf('concentration');
        let col1Keys, col2Keys;
        if (concentrationIndex !== -1) {
          col1Keys = keys.slice(0, concentrationIndex + 1);
          col2Keys = keys.slice(concentrationIndex + 1);
        } else {
          const mid = Math.ceil(keys.length / 2);
          col1Keys = keys.slice(0, mid);
          col2Keys = keys.slice(mid);
        }
        col1Keys = col1Keys.filter(k => attrs[k] !== undefined);
        col2Keys = col2Keys.filter(k => attrs[k] !== undefined);

        let grid = '<div class="stats-grid"><div class="col">';
        for (const key of col1Keys) {
          const label = ATTR_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1);
          let value = attrs[key];
          if (['crit_chance', 'crit_damage', 'cond_duration', 'boon_duration', 'movement_speed'].includes(key)) {
            value = value + '%';
          } else if (['health', 'armor'].includes(key)) {
            value = value.toLocaleString();
          }
          grid += `
            <div class="stat-item">
              <div class="value">${value}</div>
              <div class="label">${label}</div>
            </div>
          `;
        }
        grid += '</div><div class="col">';
        for (const key of col2Keys) {
          const label = ATTR_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1);
          let value = attrs[key];
          if (['crit_chance', 'crit_damage', 'cond_duration', 'boon_duration', 'movement_speed'].includes(key)) {
            value = value + '%';
          } else if (['health', 'armor'].includes(key)) {
            value = value.toLocaleString();
          }
          grid += `
            <div class="stat-item">
              <div class="value">${value}</div>
              <div class="label">${label}</div>
            </div>
          `;
        }
        grid += '</div></div>';
        return grid;
      }

      const attrsHtml = `
        <div class="attr-compact">
          ${renderAttrGridStatic(totalAttrs)}
        </div>
      `;

      // Sección combinada Equipo + Atributos + Consumibles
      html += `
        <section class="panel">
          <div class="two-col">
            <div>
              <div class="section-title">
                <span class="accent green-accent"></span>
                <span>Equipo</span>
              </div>
              ${equipHtml || '<div class="empty-message">No hay equipo equipado.</div>'}
            </div>
            <div>
              <div class="section-title">
                <span class="accent cyan-accent"></span>
                <span>Atributos</span>
              </div>
              ${attrsHtml}
              <!-- Nuevo: Consumibles -->
              ${(foodData || utilityData) ? `<div class="equip-section-title" style="margin-top:16px;">Consumibles</div>` : ''}
              ${foodData ? `
                <div style="display:flex; align-items:center; gap:12px; background:#1a1f2b; border:1px solid var(--line); border-radius:8px; padding:8px 12px; margin-top:8px;">
                  <img src="${foodData.icon || ''}" style="width:36px;height:36px;object-fit:contain;background:rgba(0,0,0,0.3);border-radius:4px;" onerror="this.style.display='none'">
                  <div>
                    <div style="font-weight:bold;color:var(--text);"><a href="https://wiki-es.guildwars2.com/wiki/${encodeURIComponent(foodData.name)}" target="_blank" style="color:var(--text); text-decoration:none;">${foodData.name || 'Comida'}</a></div>
                    <div style="font-size:13px;color:var(--muted);">${foodData.description || ''}</div>
                  </div>
                </div>
              ` : ''}
              ${utilityData ? `
                <div style="display:flex; align-items:center; gap:12px; background:#1a1f2b; border:1px solid var(--line); border-radius:8px; padding:8px 12px; margin-top:8px;">
                  <img src="${utilityData.icon || ''}" style="width:36px;height:36px;object-fit:contain;background:rgba(0,0,0,0.3);border-radius:4px;" onerror="this.style.display='none'">
                  <div>
                    <div style="font-weight:bold;color:var(--text);"><a href="https://wiki-es.guildwars2.com/wiki/${encodeURIComponent(utilityData.name)}" target="_blank" style="color:var(--text); text-decoration:none;">${utilityData.name || 'Apoyo'}</a></div>
                    <div style="font-size:13px;color:var(--muted);">${utilityData.description || ''}</div>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </section>
      `;

      // Secciones extra: Estilo, Rotación, Notas
      if (playstyle) {
        html += `
          <section class="panel">
            <div class="section-title">
              <span class="accent fire-accent"></span>
              <span>🎮 Estilo de juego</span>
            </div>
            <div style="font-size:16px;line-height:1.6;color:var(--text);">
              ${playstyle.replace(/\n/g, '<br>')}
            </div>
          </section>
        `;
      }

      const rotItems = [
        { name: rot1Name, content: rot1Content, cls: 'burst' },
        { name: rot2Name, content: rot2Content, cls: 'pressure' },
        { name: rot3Name, content: rot3Content, cls: 'defensive' }
      ].filter(item => item.content);
      if (rotItems.length > 0) {
        html += `
          <section class="panel">
            <div class="section-title">
              <span class="accent air-accent"></span>
              <span>🔄 Rotación</span>
            </div>
            <div class="rot-grid">
        `;
        for (const item of rotItems) {
          const steps = item.content.split(',').map(s => s.trim()).filter(Boolean);
          if (steps.length === 0) continue;
          html += `
            <div class="rot-block ${item.cls}">
              <h3>${item.name}</h3>
              <ul class="rot-list">
          `;
          for (const step of steps) {
            html += `<li>${step}</li>`;
          }
          html += `
              </ul>
            </div>
          `;
        }
        html += `
            </div>
          </section>
        `;
      }

      if (notes.length > 0) {
        let notesHtml = '';
        for (const noteText of notes) {
          let icon = eliteSpecIcon;
          const bracketMatch = noteText.match(/\[([^\]]+)\]/);
          let searchTerm = noteText;
          if (bracketMatch) {
            searchTerm = bracketMatch[1].trim();
          } else {
            searchTerm = noteText.trim();
          }
          const lower = searchTerm.toLowerCase();
          for (const skill of Object.values(apiCache.skills)) {
            if (skill.name && skill.name.toLowerCase() === lower) { icon = skill.icon; break; }
          }
          for (const trait of Object.values(apiCache.traits)) {
            if (trait.name && trait.name.toLowerCase() === lower) { icon = trait.icon; break; }
          }
          for (const item of Object.values(apiCache.items)) {
            if (item.name && item.name.toLowerCase() === lower) { icon = item.icon; break; }
          }
          for (const spec of Object.values(apiCache.specializations)) {
            if (spec.name && spec.name.toLowerCase() === lower) { icon = spec.icon; break; }
          }
          const displayText = noteText.replace(/\[([^\]]+)\]/g, '$1');
          notesHtml += `
            <div class="note">
              <img src="${icon}" style="width:24px;height:24px;object-fit:contain;background:rgba(0,0,0,0.3);border-radius:4px;" onerror="this.style.display='none'">
              <span>${displayText}</span>
            </div>
          `;
        }
        html += `
          <section class="panel">
            <div class="section-title">
              <span class="accent purple-accent"></span>
              <span>📝 Notas</span>
            </div>
            <div class="notes-grid">
              ${notesHtml}
            </div>
          </section>
        `;
      }

      // Nuevo: Referencias (en dos columnas con estilo similar a Notas)
      if (refItems.length > 0) {
        let refHtml = '';
        for (const ref of refItems) {
          const favicon = ref.favicon || (ref.url ? `https://www.google.com/s2/favicons?domain=${new URL(ref.url).hostname}` : '');
          refHtml += `
            <div class="note" style="background:#1e293b; border:1px solid #3a4150; border-radius:20px; padding:8px 14px; display:flex; align-items:center; gap:10px;">
              ${favicon ? `<img src="${favicon}" style="width:24px;height:24px;object-fit:contain;background:rgba(0,0,0,0.3);border-radius:4px;" onerror="this.style.display='none'">` : ''}
              ${ref.url ? `<a href="${ref.url}" target="_blank" style="color:var(--cyan); text-decoration:underline; font-size:15px;">${ref.text}</a>` : `<span style="font-size:15px;">${ref.text}</span>`}
            </div>
          `;
        }
        html += `
          <section class="panel">
            <div class="section-title">
              <span class="accent gold-accent"></span>
              <span>🔗 Referencias</span>
            </div>
            <div class="notes-grid">
              ${refHtml}
            </div>
          </section>
        `;
      }

      // 6. Obtener el CSS filtrado (eliminar estilos de popups, pestañas, etc.)
      // 6. Obtener el CSS cargado desde style.css
const css = await getLoadedStylesheetCss();       
async function getLoadedStylesheetCss() {
  let css = '';

  // Primero intenta leer las reglas CSS mediante CSSOM.
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      if (sheet.cssRules && sheet.cssRules.length > 0) {
        css += Array.from(sheet.cssRules)
          .map(rule => rule.cssText)
          .join('\n') + '\n';
      }
    } catch (error) {
      console.warn(
        'No se pudo leer mediante CSSOM la hoja:',
        sheet.href,
        error
      );
    }
  }

  // Si CSSOM no devuelve reglas, carga las hojas externas mediante fetch().
  if (!css.trim()) {
    const stylesheetLinks = Array.from(
      document.querySelectorAll('link[rel="stylesheet"][href]')
    );

    for (const link of stylesheetLinks) {
      try {
        const response = await fetch(link.href, {
          credentials: 'same-origin'
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        css += await response.text();
        css += '\n';
      } catch (error) {
        console.warn(
          'No se pudo cargar la hoja externa:',
          link.href,
          error
        );
      }
    }
  }

  // Compatibilidad con posibles estilos inline antiguos.
  if (!css.trim()) {
    css = Array.from(document.querySelectorAll('style'))
      .map(style => style.textContent || '')
      .join('\n');
  }

  if (!css.trim()) {
    console.error('No se encontró ningún CSS para exportar.');
  }

  return css;
}
  const unwantedSelectors = [
    '.popup',
    '.tabs-bar',
    '.tab-btn',
    '.preview-popup',
    '.popup-overlay',
    '.popup-box',
    '.popup-close',
    '.popup-title',
    '.popup-subtitle',
    '.popup-description',
    '.popup-facts',
    '.popup-fact',
    '.active-tab-name',
    '.tabs-bar-container',
    '.tabs-bar-group',
    '.tabs-bar-label',
    '.tab-btn-build',
    '.token-input-group',
    '.btn',
    '.btn-group',
    '.character-list',
    '.character-card',
    '.loading',
    '.error-message',
    '.spinner',
    '@keyframes spin',
    '.creator-panel',
    '.ref-item .del-ref',
    '#refListContainer',
    '.consumible-item'
  ];

  const rules = css
    .split('}')
    .filter(rule => rule.trim().length > 0)
    .map(rule => rule + '}');

  const filteredRules = rules.filter(rule => {
    const lowerRule = rule.toLowerCase();

    return !unwantedSelectors.some(selector =>
      lowerRule.includes(selector.toLowerCase())
    );
  });

  const cleanCss = filteredRules.join('');
      // 7. Construir el HTML final
      const fullHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} - GW2 Build</title>
  <style>${cleanCss}</style>
</head>
<body>
  <main class="poster" id="app">
    ${html}
  </main>
</body>
</html>
      `;

      return fullHtml;
    }

    // ============================================================
    // MANEJADORES DE PREVISUALIZACIÓN Y EXPORTACIÓN
    // ============================================================
    document.getElementById('previewClose')?.addEventListener('click', function() {
      document.getElementById('previewPopup').classList.remove('active');
    });
    document.getElementById('previewCancel')?.addEventListener('click', function() {
      document.getElementById('previewPopup').classList.remove('active');
    });
    document.getElementById('previewConfirm')?.addEventListener('click', function() {
      const fullHtml = document.getElementById('previewContent').textContent;
      const blob = new Blob([fullHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const title = document.getElementById('editTitle')?.value.trim() || 'build';
      a.download = `${title.replace(/\s+/g, '_')}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      document.getElementById('previewPopup').classList.remove('active');
    });

    // ============================================================
    // INICIO
    // ============================================================
    document.addEventListener('DOMContentLoaded', () => {
      const savedToken = sessionStorage.getItem('gw2_token');
      if (savedToken) {
        token = savedToken;
        renderLoading('Conectando con token guardado...');
        getCharacters(token)
          .then(names => {
            characterList = names;
            renderCharacterList(characterList);
          })
          .catch(() => {
            sessionStorage.removeItem('gw2_token');
            token = null;
            renderLogin();
          });
      } else {
        renderLogin();
      }

      const origHandleConnect = handleConnect;
      handleConnect = async function() {
        await origHandleConnect();
        if (token) {
          sessionStorage.setItem('gw2_token', token);
        }
      };
    });
