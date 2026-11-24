window.WIKI_EXT=window.WIKI_EXT||{};WIKI_EXT["builds"]={
 "units": {
  "PID_レダ": [
   {
    "id": "bailarina",
    "name": "Bailarina de apoyo",
    "name_en": "Support dancer",
    "path": [
     "Cazador",
     "Pícaro",
     "Bailarín"
    ],
    "weapon": "Arco",
    "roles": [
     "bailarin",
     "arquero",
     "esquiva"
    ],
    "when": [],
    "why": "Bailarín le da Vel +25 y Car +20, y en la Parte 1 nadie más baila: cada turno da otra acción a quien más daño hace. Pide la misión «La sucesora del gran bailarín» y Espada B o Arco B. Pasa por Arquero (clase puente) para Crescendo. Ojo: bailar y cantar gastan la misma acción.",
    "why_en": "Dancer gives her Spd +25 and Cha +20, and nobody else dances in Part 1: every turn your strongest hitter acts again. Needs the quest «The Great Dancer's Successor» and Sword B or Bow B. Go through Archer (bridge class) for Crescendo. Note: dancing and singing use the same action.",
    "fits": "Casi siempre: con dos o tres unidades que pegan fuerte (Mu, Sirocco, Olympia) rinde más que un ataque propio.",
    "fits_en": "Almost always: with two or three hard hitters (Mu, Sirocco, Olympia) an extra turn is worth more than her own attack.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "rastreadora",
    "name": "Rastreadora con arco",
    "name_en": "Tracker archer",
    "path": [
     "Cazador",
     "Pícaro",
     "Rastreador"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "esquiva"
    ],
    "when": [],
    "why": "Rastreador sube Hab, Vel y Sue +15 y su maestra Contratiro contraataca a los arqueros. Se abre con la misión de bebidas «Nuevas bebidas para la nobleza». Leda canta cada turno y ataca de lejos sin elegir entre baile y canto.",
    "why_en": "Tracker gives Dex, Spd and Lck +15 and its mastery Counterfire hits back at archers. Opens with the drinks quest «New Drinks for the Nobility». Leda sings every turn and shoots from range without choosing between dance and song.",
    "fits": "Si prefieres cantar cada turno (Canto de fervor, Canto de frescor) a bailar, o si el equipo ya acaba los mapas sin turnos extra.",
    "fits_en": "If you would rather sing every turn (Song of Passion, Song of Icewater) than dance, or the team already clears maps without extra turns.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "critica",
    "name": "Crítica con espada",
    "name_en": "Crit swordswoman",
    "path": [
     "Cazador",
     "Mirmidón",
     "Shido"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [
     {
      "has": "PID_ダンテ"
     },
     {
      "has": "PID_サラン"
     }
    ],
    "why": "Mirmidón deja Técnica devastadora (+6 de ataque en crítico), la maestra que Matt & Yunie ponen en todo su equipo de críticos. Shido sube Vel +15 y deja Siempre alerta.",
    "why_en": "Myrmidon leaves Devastating Technique (+6 attack on a crit), the mastery Matt & Yunie put on their whole crit team. Swordmaster gives Spd +15 and leaves Ever Vigilant.",
    "fits": "Equipo de críticos con Dante (+10 golpe y crítico a los de al lado) o Sha Lan (+4 Vel a los de al lado).",
    "fits_en": "Crit team with Dante (+10 hit and crit to adjacent allies) or Sha Lan (+4 Spd to adjacent allies).",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_バッカニア": [
   {
    "id": "muro",
    "name": "Muro de lanza",
    "name_en": "Lance wall",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Hoplita"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque"
    ],
    "when": [
     {
      "lacks_role": "tanque"
     }
    ],
    "why": "Soldado acorazado (Def +25, maestra Contra mayor) y Hoplita (Def +30, Fue +15). Cinco fuentes coinciden. Su punto débil es Res 20: el Canto de frescor de Leda (+7 Res) lo tapa.",
    "why_en": "Armored Soldier (Def +25, mastery Greater Counter) and Hoplite (Def +30, Str +15). Five sources agree. His weak spot is Res 20: Leda's Song of Icewater (+7 Res) covers it.",
    "fits": "Si falta el tanque físico del equipo o hay muchos enemigos con lanza y hacha.",
    "fits_en": "If the team lacks a physical tank or the map has many lance and axe enemies.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "bardado",
    "name": "Jinete bardado contra magia",
    "name_en": "Barded rider vs magic",
    "path": [
     "Soldado",
     "Jinete ligero",
     "Jinete bardado"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque",
     "montado"
    ],
    "when": [],
    "why": "Jinete bardado sube Res +10 y su maestra Égida reduce el daño mágico. Pierde Def frente a Hoplita pero gana movimiento.",
    "why_en": "Barded Rider gives Res +10 and its mastery Aegis cuts magic damage. Less Def than Hoplite, more movement.",
    "fits": "Si el capítulo trae muchos magos enemigos o ya tienes otro tanque de Def.",
    "fits_en": "If the chapter brings many enemy mages or you already have another Def tank.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_ムウ": [
   {
    "id": "pugil",
    "name": "Púgil y Guerrera con guanteletes",
    "name_en": "Brawler into Warrior",
    "path": [
     "Gladiador",
     "Púgil",
     "Guerrero"
    ],
    "weapon": "Guanteletes",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [],
    "why": "Púgil (Vel +10, Fue +10) y Guerrero (Fue +20). Sangre guerrera le da +3 Fue y +2 Vel con guanteletes. Si su Vel y Hab ya son altas, puede quedarse en Púgil.",
    "why_en": "Brawler (Spd +10, Str +10) and Warrior (Str +20). Warrior's Blood gives +3 Str and +2 Spd with gauntlets. If her Spd and Dex are already high she can stay a Brawler.",
    "fits": "Casi siempre: es la mejor pegadora física del roster de Leda.",
    "fits_en": "Almost always: she is the best physical hitter in Leda's roster.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "forajida",
    "name": "Forajida hacia la Fuerza máxima",
    "name_en": "Brigand for max Str",
    "path": [
     "Gladiador",
     "Forajido",
     "Guerrero"
    ],
    "weapon": "Guanteletes",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Forajido (Fue +15, PV +15) y Guerrero (Fue +20): la vía de KawaiiFive0h. Pierde Vel y Hab a cambio de golpes más fuertes.",
    "why_en": "Brigand (Str +15, HP +15) into Warrior (Str +20): KawaiiFive0h's route. Trades Spd and Dex for harder hits.",
    "fits": "Si sus subidas de Fuerza salen malas.",
    "fits_en": "If her Str level-ups come out poor.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "maga",
    "name": "Maga de reserva",
    "name_en": "Backup mage",
    "path": [
     "Gladiador",
     "Chamán",
     "Vate"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago"
    ],
    "when": [
     {
      "lacks_role": "mago"
     }
    ],
    "why": "Sus crecimientos dan para magia, aunque es la opción minoritaria (comentarios).",
    "why_en": "Her growths allow magic, though few players do it (comments).",
    "fits": "Solo si sobran físicos y nadie más hace de mago.",
    "fits_en": "Only if you have spare physical units and nobody else casts.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_オリンピア": [
   {
    "id": "vate",
    "name": "Maga de crítico",
    "name_en": "Crit mage",
    "path": [
     "Augur",
     "Chamán",
     "Vate"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago"
    ],
    "when": [],
    "why": "Chamán (Mag +15, Vel +10) y Vate (Mag +20, Hab +15). Celo competitivo y Vampiro emocional la llevan a un 46 % de crítico base con Nosferatu. Recoge Habilidad contenida y Velocidad contenida. Un Anillo de gigante evita que la doblen.",
    "why_en": "Shaman (Mag +15, Spd +10) and Sage (Mag +20, Dex +15). Competitive Zeal and Emotional Vampire take her to 46 % base crit with Nosferatu. Pick up Restrained Skill and Restrained Speed. A Giant's Ring stops enemies doubling her.",
    "fits": "Si otra unidad cura (Sofia, Fianna o Sirocco de Trovador).",
    "fits_en": "If another unit heals (Sofia, Fianna or Sirocco as Troubadour).",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "obispa",
    "name": "Obispa con Nosferatu",
    "name_en": "Nosferatu bishop",
    "path": [
     "Augur",
     "Sacerdote",
     "Obispo"
    ],
    "weapon": "Magia blanca",
    "roles": [
     "sanador"
    ],
    "when": [
     {
      "lacks_role": "sanador"
     }
    ],
    "why": "Sacerdote y Obispo duplican sus usos de magia blanca y abren Physic y Silencio. Sigue haciendo daño con Nosferatu, pero dobla menos.",
    "why_en": "Priest and Bishop double her white magic uses and open Physic and Silence. Still deals damage with Nosferatu, but doubles less.",
    "fits": "Si nadie más cura en el equipo.",
    "fits_en": "If nobody else on the team heals.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_シロッコ": [
   {
    "id": "vate",
    "name": "Mago con Espada trueno",
    "name_en": "Levin sword mage",
    "path": [
     "Gladiador",
     "Chamán",
     "Vate"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago"
    ],
    "when": [],
    "why": "Chamán y Vate con Espada trueno (daño con Mag, alcance 1-2) y Thoron. Gracia de la diosa le cura 5 PV tras cada combate.",
    "why_en": "Shaman and Sage with a Levin Sword (Mag damage, range 1-2) and Thoron. Goddess's Grace heals him 5 HP after each fight.",
    "fits": "Casi siempre: es el mago más sólido de Leda.",
    "fits_en": "Almost always: he is Leda's most solid mage.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "trovador",
    "name": "Trovador a caballo",
    "name_en": "Mounted troubadour",
    "path": [
     "Gladiador",
     "Chamán",
     "Trovador"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago"
    ],
    "when": [
     {
      "lacks_role": "sanador"
     }
    ],
    "why": "Trovador (Mag +15, Res +15) usa las dos magias a caballo: ataca y también cura. Es una de las tres clases que Leda abre sola.",
    "why_en": "Troubadour (Mag +15, Res +15) uses both magics on horseback: it attacks and also heals. One of the three classes Leda opens on her own.",
    "fits": "Si falta curación y no quieres que Olympia deje de atacar.",
    "fits_en": "If you lack healing and want Olympia to keep attacking.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "shido",
    "name": "Espadachín físico",
    "name_en": "Physical swordsman",
    "path": [
     "Gladiador",
     "Mirmidón",
     "Shido"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Si en los primeros niveles sube más Fue que Mag, Shido (Vel +15) con la Espada trueno de reserva.",
    "why_en": "If his early levels raise Str more than Mag, Swordmaster (Spd +15) with the Levin Sword as backup.",
    "fits": "Si sus primeros niveles salen de Fuerza, o ya tienes dos magos.",
    "fits_en": "If his first levels go to Str, or you already have two mages.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_カターニャ": [
   {
    "id": "alaceleste",
    "name": "Ala Celeste antimagos",
    "name_en": "Anti-mage pegasus",
    "path": [
     "Soldado",
     "Ala Celeste"
    ],
    "weapon": "Espada",
    "roles": [
     "volador"
    ],
    "when": [
     {
      "lacks_role": "volador"
     }
    ],
    "why": "Ala Celeste con Espada trueno: vuela hasta los magos y les pega con Mag. Su Fue ronda 18, así que su valor es cazar magos.",
    "why_en": "Sky Knight with a Levin Sword: flies to the mages and hits them with Mag. Her Str is around 18, so her job is hunting mages.",
    "fits": "Si no tienes otro volador.",
    "fits_en": "If you have no other flier.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "rastreadora",
    "name": "Rastreadora esquiva",
    "name_en": "Evasive tracker",
    "path": [
     "Soldado",
     "Pícaro",
     "Rastreador"
    ],
    "weapon": "Espada",
    "roles": [
     "esquiva"
    ],
    "when": [
     {
      "lacks_role": "arquero"
     }
    ],
    "why": "MrEOD la prefiere de Rastreador: el equipo de Leda no tiene arquero y Catania tiene Vel de sobra. «Casi no la golpean y critica mucho» (comentario).",
    "why_en": "MrEOD prefers her as a Tracker: Leda's team has no archer and Catania has Spd to spare. «They barely hit her and she crits a lot» (comment).",
    "fits": "Si falta arquero.",
    "fits_en": "If you lack an archer.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "forajida",
    "name": "Forajida para la Fuerza",
    "name_en": "Brigand for Str",
    "path": [
     "Soldado",
     "Forajido",
     "Guerrero"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Forajido (Fue +15) y Guerrero (Fue +20) para arreglar su Fuerza baja.",
    "why_en": "Brigand (Str +15) and Warrior (Str +20) to fix her low Str.",
    "fits": "Si quieres otra pegadora física.",
    "fits_en": "If you want another physical hitter.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_エスメラルダ": [
   {
    "id": "hoplita",
    "name": "Hoplita lanzadora",
    "name_en": "Javelin hoplite",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Hoplita"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque"
    ],
    "when": [
     {
      "lacks_role": "tanque"
     }
    ],
    "why": "Brazo lanzador (+20 Hab y +4 ataque al lanzar lanzas) y Músculo (peso ×0,8) encajan con jabalinas desde la armadura.",
    "why_en": "Throwing Arm (+20 Dex and +4 attack when throwing lances) and Muscle (weight ×0.8) suit javelins from armor.",
    "fits": "Si falta tanque o Buccar no está.",
    "fits_en": "If you lack a tank or Buccar is out.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "alaceleste",
    "name": "Ala Celeste con jabalinas",
    "name_en": "Javelin pegasus",
    "path": [
     "Soldado",
     "Ala Celeste"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador"
    ],
    "when": [
     {
      "lacks_role": "volador"
     }
    ],
    "why": "Ala Celeste (maestra Alas protectoras) lanza jabalinas desde el aire.",
    "why_en": "Sky Knight (mastery Protective Wings) throws javelins from the air.",
    "fits": "Si falta volador.",
    "fits_en": "If you lack a flier.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_グザラン": [
   {
    "id": "shido",
    "name": "Shido de primera línea",
    "name_en": "Front-line swordmaster",
    "path": [
     "Gladiador",
     "Mirmidón",
     "Shido"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [],
    "why": "El mejor recluta por coste (apoyo 1, prestigio 3). Temperamento le da +10 a +20 de golpe, esquiva y crítico. Pasa por Forajido en vez de Mirmidón si su Fue no sube.",
    "why_en": "The best recruit for the cost (support 1, renown 3). Temper gives +10 to +20 hit, avoid and crit. Go through Brigand instead of Myrmidon if his Str lags.",
    "fits": "Casi siempre.",
    "fits_en": "Almost always.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "rastreador",
    "name": "Rastreador con arco",
    "name_en": "Tracker with bow",
    "path": [
     "Gladiador",
     "Pícaro",
     "Rastreador"
    ],
    "weapon": "Espada",
    "roles": [
     "esquiva"
    ],
    "when": [
     {
      "lacks_role": "arquero"
     }
    ],
    "why": "Pícaro y Rastreador le dan arco además de espada.",
    "why_en": "Thief and Tracker add a bow to his sword.",
    "fits": "Si falta arquero.",
    "fits_en": "If you lack an archer.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "jinete",
    "name": "Jinete ligero",
    "name_en": "Light rider",
    "path": [
     "Gladiador",
     "Jinete ligero",
     "Jinete bardado"
    ],
    "weapon": "Espada",
    "roles": [
     "montado"
    ],
    "when": [],
    "why": "La opción de Jay Dunna: movilidad para un equipo que va a pie.",
    "why_en": "Jay Dunna's pick: mobility for a team on foot.",
    "fits": "Si nadie más va montado.",
    "fits_en": "If nobody else is mounted.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_イオ": [
   {
    "id": "cuadriguero",
    "name": "Cuadriguero con Rocinante",
    "name_en": "Charioteer with Rocinante",
    "path": [
     "Soldado",
     "Cuadriguero",
     "Jinete arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "montado",
     "arquero"
    ],
    "when": [
     {
      "lacks_role": "arquero"
     }
    ],
    "why": "Entra con su caballo Rocinante. Cuadriguero pide Arco C y Equitación D: entrena el arco en la Plaza de armas. Muro móvil con Def alta.",
    "why_en": "He joins with his horse Rocinante. Charioteer needs Bow C and Riding D: train the bow at the drill ground. A mobile wall with high Def.",
    "fits": "Si falta arquero o caballería y ya tienes Prestigio 4.",
    "fits_en": "If you lack an archer or cavalry and have Renown 4.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "bardado",
    "name": "Jinete bardado",
    "name_en": "Barded rider",
    "path": [
     "Soldado",
     "Jinete ligero",
     "Jinete bardado"
    ],
    "weapon": "Lanza",
    "roles": [
     "montado",
     "tanque"
    ],
    "when": [],
    "why": "Sin desbloqueos de otras rutas: Jinete bardado con Égida.",
    "why_en": "No other-route unlocks needed: Barded Rider with Aegis.",
    "fits": "Si quieres un tanque montado.",
    "fits_en": "If you want a mounted tank.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_ミカエラ": [
   {
    "id": "guerrera",
    "name": "Guerrera con guanteletes",
    "name_en": "Gauntlet warrior",
    "path": [
     "Gladiador",
     "Púgil",
     "Guerrero"
    ],
    "weapon": "Guanteletes",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Evita arco y montura por sus puntos flojos; con guanteletes aprovecha Armadura aplastante y Puño poderoso.",
    "why_en": "Avoids bows and mounts because of her weak spots; with gauntlets she uses Crushing Armor and Mighty Fist.",
    "fits": "Si quieres otra pegadora física.",
    "fits_en": "If you want another physical hitter.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "hoplita",
    "name": "Hoplita",
    "name_en": "Hoplite",
    "path": [
     "Gladiador",
     "Soldado acorazado",
     "Hoplita"
    ],
    "weapon": "Hacha",
    "roles": [
     "tanque"
    ],
    "when": [
     {
      "lacks_role": "tanque"
     }
    ],
    "why": "Soldado acorazado y Hoplita con hacha.",
    "why_en": "Armored Soldier and Hoplite with an axe.",
    "fits": "Si falta tanque.",
    "fits_en": "If you lack a tank.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_シモン": [
   {
    "id": "guerrero",
    "name": "Guerrero",
    "name_en": "Warrior",
    "path": [
     "Gladiador",
     "Forajido",
     "Guerrero"
    ],
    "weapon": "Hacha",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Guerrero con hacha o espada; Por los pelos le deja sobrevivir a un golpe letal con probabilidad igual a su Suerte.",
    "why_en": "Warrior with axe or sword; Close Call lets him survive a lethal hit with a chance equal to his Luck.",
    "fits": "Si quieres otro físico resistente.",
    "fits_en": "If you want another sturdy physical unit.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "acorazado",
    "name": "Acorazado",
    "name_en": "Armored",
    "path": [
     "Gladiador",
     "Soldado acorazado",
     "Hoplita"
    ],
    "weapon": "Hacha",
    "roles": [
     "tanque"
    ],
    "when": [
     {
      "lacks_role": "tanque"
     }
    ],
    "why": "«Se parece a Buccar»: vale como segundo muro.",
    "why_en": "«He is like Buccar»: works as a second wall.",
    "fits": "Si Buccar no está.",
    "fits_en": "If Buccar is out.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_キロイカ": [
   {
    "id": "tirador",
    "name": "Tirador",
    "name_en": "Sniper",
    "path": [
     "Cazador",
     "Arquero",
     "Tirador"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero"
    ],
    "when": [
     {
      "lacks_role": "arquero"
     }
    ],
    "why": "Arquero (Crescendo) y Tirador (Hab +20). Despotismo suma +3 ataque y +10 crítico contra enemigos con estado alterado.",
    "why_en": "Archer (Crescendo) and Sniper (Dex +20). Despotism adds +3 attack and +10 crit against enemies with a status ailment.",
    "fits": "Si falta arquero.",
    "fits_en": "If you lack an archer.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "rastreador",
    "name": "Rastreador",
    "name_en": "Tracker",
    "path": [
     "Cazador",
     "Pícaro",
     "Rastreador"
    ],
    "weapon": "Arco",
    "roles": [
     "esquiva"
    ],
    "when": [],
    "why": "Pícaro y Rastreador (Vel +15) para esquivar más.",
    "why_en": "Thief and Tracker (Spd +15) to dodge more.",
    "fits": "Si ya tienes un arquero fijo.",
    "fits_en": "If you already have a dedicated archer.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_イニオニ": [
   {
    "id": "tiradora",
    "name": "Tiradora",
    "name_en": "Sniper",
    "path": [
     "Cazador",
     "Arquero",
     "Tirador"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero"
    ],
    "when": [
     {
      "lacks_role": "arquero"
     }
    ],
    "why": "Arquera consumada le da +3 Fue con arco. Arquero por Crescendo y luego Tirador. «Recrútala aunque llegue tarde» (KawaiiFive0h).",
    "why_en": "Skilled Archer gives +3 Str with bows. Archer for Crescendo, then Sniper. «Recruit her even if she comes late» (KawaiiFive0h).",
    "fits": "Si falta arquero.",
    "fits_en": "If you lack an archer.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "rastreadora",
    "name": "Rastreadora",
    "name_en": "Tracker",
    "path": [
     "Cazador",
     "Pícaro",
     "Rastreador"
    ],
    "weapon": "Arco",
    "roles": [
     "esquiva"
    ],
    "when": [],
    "why": "Rastreador por Contratiro.",
    "why_en": "Tracker for Counterfire.",
    "fits": "Si ya hay otro arquero.",
    "fits_en": "If there is already another archer.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_ソフィア": [
   {
    "id": "sacerdotisa",
    "name": "Curandera a distancia",
    "name_en": "Ranged healer",
    "path": [
     "Augur",
     "Sacerdote",
     "Obispo"
    ],
    "weapon": "Magia blanca",
    "roles": [
     "sanador"
    ],
    "when": [],
    "why": "Sanación remota le suma +1 de alcance al curar (nv 20) y +2 (nv 35). Tres fuentes la ven entre las mejores curanderas.",
    "why_en": "Remote Healing adds +1 healing range (lv 20) and +2 (lv 35). Three sources rate her among the best healers.",
    "fits": "Casi siempre: libera a Olympia para atacar.",
    "fits_en": "Almost always: frees Olympia to attack.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_フィアナ": [
   {
    "id": "obispa",
    "name": "Obispa",
    "name_en": "Bishop",
    "path": [
     "Augur",
     "Sacerdote",
     "Obispo"
    ],
    "weapon": "Magia blanca",
    "roles": [
     "sanador"
    ],
    "when": [
     {
      "lacks_role": "sanador"
     }
    ],
    "why": "Rescate y Serafín pronto. Para muchos no es buena unidad: tráela solo como curandera.",
    "why_en": "Rescue and Seraphim early. Many rate her low: bring her only as a healer.",
    "fits": "Si falta curandera y Sofia aún no ha llegado.",
    "fits_en": "If you lack a healer and Sofia has not arrived yet.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "trovadora",
    "name": "Trovadora contra no muertos",
    "name_en": "Troubadour vs undead",
    "path": [
     "Augur",
     "Sacerdote",
     "Trovador"
    ],
    "weapon": "Magia blanca",
    "roles": [
     "sanador",
     "montado"
    ],
    "when": [],
    "why": "Trovador a caballo con Serafín contra no muertos.",
    "why_en": "Mounted Troubadour with Seraphim against the undead.",
    "fits": "En capítulos con no muertos.",
    "fits_en": "In chapters with undead.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_ダンテ": [
   {
    "id": "chaman",
    "name": "Mago de apoyo",
    "name_en": "Support mage",
    "path": [
     "Augur",
     "Chamán",
     "Vate"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago"
    ],
    "when": [],
    "why": "Dirección escénica da +10 de golpe y crítico a los de al lado; con Car alto rinde más. Llega tarde y caro (8000 G, prestigio 10).",
    "why_en": "Stage Direction gives adjacent allies +10 hit and crit; it is stronger with high Cha. He comes late and costs a lot (8000 G, renown 10).",
    "fits": "Equipo de críticos.",
    "fits_en": "Crit teams.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_ザーコネ": [
   {
    "id": "guerrero",
    "name": "Forajido y Guerrero",
    "name_en": "Brigand into Warrior",
    "path": [
     "Gladiador",
     "Forajido",
     "Guerrero"
    ],
    "weapon": "Hacha",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "La única vía que proponen: hacha y Fuerza. Varios lo descartan porque le doblan con facilidad.",
    "why_en": "The only route proposed: axe and Str. Several skip him because enemies double him easily.",
    "fits": "Solo si te faltan físicos.",
    "fits_en": "Only if you lack physical units.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_ダイトウ": [
   {
    "id": "hoplita",
    "name": "Hoplita",
    "name_en": "Hoplite",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Hoplita"
    ],
    "weapon": "Hacha",
    "roles": [
     "tanque"
    ],
    "when": [
     {
      "lacks_role": "tanque"
     }
    ],
    "why": "Hoplita (Def +30). Todo a una carta pega muy fuerte, pero casi nadie lo lleva.",
    "why_en": "Hoplite (Def +30). All In hits very hard, but almost nobody brings him.",
    "fits": "Si falta tanque.",
    "fits_en": "If you lack a tank.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_ロレッタ": [
   {
    "id": "alaceleste",
    "name": "Ala Celeste esquiva",
    "name_en": "Evasive pegasus",
    "path": [
     "Soldado",
     "Ala Celeste"
    ],
    "weapon": "Espada",
    "roles": [
     "volador",
     "esquiva"
    ],
    "when": [
     {
      "lacks_role": "volador"
     }
    ],
    "why": "Inalterable (+10 esquiva con más de la mitad de PV) y En plena forma (+3 ataque, +10 esquiva a PV completos) la hacen difícil de golpear.",
    "why_en": "Unshaken (+10 avoid above half HP) and In Top Form (+3 attack, +10 avoid at full HP) make her hard to hit.",
    "fits": "Si falta volador.",
    "fits_en": "If you lack a flier.",
    "routes": [
     "leda"
    ]
   },
   {
    "id": "shido",
    "name": "Shido",
    "name_en": "Swordmaster",
    "path": [
     "Soldado",
     "Mirmidón",
     "Shido"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [],
    "why": "Mirmidón y Shido para pegar con espada.",
    "why_en": "Myrmidon and Swordmaster to hit with swords.",
    "fits": "Si ya tienes volador.",
    "fits_en": "If you already have a flier.",
    "routes": [
     "leda"
    ]
   }
  ],
  "PID_ジャスミン": [
   {
    "id": "hoplita",
    "name": "Hoplita de contraataque",
    "name_en": "Counter hoplite",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Hoplita"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque"
    ],
    "when": [
     {
      "lacks_role": "tanque"
     }
    ],
    "why": "Contra experta y Contra furiosa con Contra precisa de Hoplita: castiga a quien la ataca.",
    "why_en": "Expert Counter and Furious Counter with Hoplite's Precise Counter: punishes attackers.",
    "fits": "Si falta tanque (si está Buccar, sobra).",
    "fits_en": "If you lack a tank (with Buccar, skip her).",
    "routes": [
     "leda"
    ]
   }
  ]
 },
 "tiers": {
  "leda": {
   "PID_シロッコ": "S",
   "PID_オリンピア": "S",
   "PID_ムウ": "S",
   "PID_グザラン": "S/A+",
   "PID_カターニャ": "A",
   "PID_エスメラルダ": "A",
   "PID_ファビオ": "A",
   "PID_ソフィア": "A",
   "PID_バッカニア": "B+/A-",
   "PID_サラン": "A-/B+",
   "PID_イニオニ": "B+/A-",
   "PID_キロイカ": "B+",
   "PID_シモン": "B+",
   "PID_ダンテ": "B",
   "PID_ダイトウ": "B",
   "PID_ナジャ": "B",
   "PID_ヌッツォ": "B",
   "PID_ノクチュラ": "B",
   "PID_ハルヴィン": "B",
   "PID_ルルディヤー": "B",
   "PID_ロレッタ": "B",
   "PID_ミカエラ": "B",
   "PID_ティアラ": "B-",
   "PID_ピーテル": "B-",
   "PID_ニネ": "B-",
   "PID_ヨーカイ": "C+",
   "PID_イオ": "C+",
   "PID_リリアン": "C+",
   "PID_セテス": "C+",
   "PID_ディエゴ": "C+",
   "PID_ベンディッツ": "C+",
   "PID_フィアナ": "C",
   "PID_ザーコネ": "C",
   "PID_アレキサンドラ": "C",
   "PID_ヌディーヌ": "C",
   "PID_ウルタンド": "C",
   "PID_ライサンダー": "C",
   "PID_マクシム": "C",
   "PID_ゴライアス": "C",
   "PID_マジーデ": "C-"
  }
 }
};
