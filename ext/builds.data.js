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
    ],
    "parts": [
     0,
     1
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
    ],
    "parts": [
     0,
     1
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
    "why": "Mirmidón deja Técnica devastadora (+6 de ataque en crítico), la maestra que los equipos de críticos ponen en casi todos. Shido sube Vel +15 y deja Siempre alerta.",
    "why_en": "Myrmidon leaves Devastating Technique (+6 attack on a crit), the mastery crit teams put on almost everyone. Swordmaster gives Spd +15 and leaves Ever Vigilant.",
    "fits": "Equipo de críticos con Dante (+10 golpe y crítico a los de al lado) o Sha Lan (+4 Vel a los de al lado).",
    "fits_en": "Crit team with Dante (+10 hit and crit to adjacent allies) or Sha Lan (+4 Spd to adjacent allies).",
    "routes": [
     "leda"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-calamidad",
    "name": "La Calamidad con arco",
    "name_en": "Bow Calamity",
    "path": [
     "Rastreador",
     "Buscasombras",
     "La Calamidad"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "esquiva"
    ],
    "when": [],
    "why": "Rastreador (Contratiro), Buscasombras y La Calamidad (Destino bendito, Sue +10): ataca con arco y espada tras sus cantos. Rastreador se abre con la misión «Nuevas bebidas para la nobleza».",
    "why_en": "Ranger (Countershot), Shadow Seeker and The Calamity (Divine Will, Lck +10): she shoots and slashes after her songs. Ranger opens with the quest «New Drinks for the Nobility».",
    "fits": "Si otra unidad ya baila (Tialla, Lilian) y Leda queda libre para atacar.",
    "fits_en": "If another unit already dances (Tialla, Lilian) and Leda is free to attack.",
    "parts": [
     2,
     3
    ],
    "debate": {
     "es": "También se le propone La Apsará (Espada A y Arco C), que es para una sola unidad: Leda o Dante.",
     "en": "The Apsara (Sword A and Bow C) is also suggested for her; it goes to one unit only: Leda or Dante."
    }
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
    ],
    "parts": [
     0,
     1
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
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "when": [],
    "why": "Soldado acorazado (Def +25, Contra mayor) y Hoplita (Def +30). Deber protector deja el daño recibido al 90 %. Res 20: un escudo de Res o curas cerca.",
    "why_en": "Armored Knight (Def +25, Great Counter) and Dreadnought (Def +30). His personal skill cuts damage taken to 90 %. Res 20: a Res shield or healers nearby.",
    "fits": "Si faltan acorazados: esta ruta tiene pocos.",
    "fits_en": "If you lack armored units: this route has few.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
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
    "why": "Deber protector reduce el daño recibido al 90 % y Hoplita da Def +30. Su Res 20 es el punto débil. Aquí sobra: Theodora y Tobias ya son tanques.",
    "why_en": "Guardian's Duty cuts damage taken to 90 % and Dreadnought gives Def +30. His Res 20 is the weak spot. Here he is redundant: Theodora and Tobias already tank.",
    "fits": "Solo si falta tanque.",
    "fits_en": "Only if you lack a tank.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-bastion",
    "name": "Muro con Armadura móvil",
    "name_en": "Mobile armor wall",
    "path": [
     "Hoplita",
     "Caballero bastión"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque"
    ],
    "when": [],
    "why": "Hoplita y Caballero bastión (Bloqueo) con Armadura móvil+ (6 de Mov). Cinco fuentes coinciden; lanza antes que hacha. Res 20: Bendición de Aurora o escudo de Res.",
    "why_en": "Dreadnought into Castle Knight (Intercept) with the armor movement skill (Mov 6). Five sources agree; lance before axe. Res 20: Aurora's blessing or a Res shield.",
    "fits": "Casi siempre como muro del equipo.",
    "fits_en": "Almost always as the team's wall.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "cuadriguero",
    "name": "Cuadriguero",
    "name_en": "Charioteer",
    "path": [
     "Cazador",
     "Cuadriguero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Cuadriguero va montado y su crecimiento oculto sube con el nivel.",
    "why_en": "Charioteer is mounted and its hidden growth rises with level.",
    "fits": "Si ya hay quien tanquee.",
    "fits_en": "If someone else already tanks.",
    "parts": [
     0,
     1
    ],
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
    ],
    "parts": [
     0,
     1
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
    "why": "Forajido (Fue +15, PV +15) y Guerrero (Fue +20): la vía más directa a la Fuerza. Pierde Vel y Hab a cambio de golpes más fuertes.",
    "why_en": "Brigand (Str +15, HP +15) into Warrior (Str +20): the most direct route to Str. Trades Spd and Dex for harder hits.",
    "fits": "Si sus subidas de Fuerza salen malas.",
    "fits_en": "If her Str level-ups come out poor.",
    "routes": [
     "leda"
    ],
    "parts": [
     0,
     1
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
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Espadachina que corta magos",
    "name_en": "Mage-cutting swordswoman",
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
    "why": "Signos de madurez le da más stats al subir y en primera línea esquiva y corta magos con espada. Tiene apoyo 3 con Peter. Llega tarde (prestigio 9).",
    "why_en": "Her personal gives extra stats on level-up and on the front line she dodges and cuts down mages with swords. She has support 3 with Peter. She comes late (renown 9).",
    "fits": "Equipo de magos que necesita delantera.",
    "fits_en": "Mage teams that need a front liner.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "why": "Sangre guerrera (nv 20) solo funciona con puños: Púgil y Guerrero (Fue +20).",
    "why_en": "Warrior's Blood (lv 20) only works with fists: Pugilist and Warrior (Str +20).",
    "fits": "Si quieres aprovechar su habilidad de puños.",
    "fits_en": "If you want to use her fist skill.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrera",
    "name": "Guerrera de puños",
    "name_en": "Gauntlet warrior",
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
    "why": "Signos de madurez sube un 20 % todos sus crecimientos y Sangre guerrera suma atributos en función del arma. Púgil (Vel +10, Fue +10) y Guerrero (Fue +20, Técnica entrenada).",
    "why_en": "Her personal skill raises all her growths by 20 % and another adds stats by weapon. Pugilist (Spd +10, Str +10) and Warrior (Str +20, Practiced Art).",
    "fits": "Casi siempre como delantera física. Llega con prestigio 7: reclútala pronto.",
    "fits_en": "Almost always as a physical front-liner. She needs renown 7: recruit her early.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Espadachina crítica",
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
    "when": [],
    "why": "Mirmidón y Shido con la Espada trueno para pegar a 1-2 casillas.",
    "why_en": "Myrmidon and Shido with the Levin Sword to hit at 1-2 range.",
    "fits": "Si te llega una Espada trueno y quieres otra espada de crítico.",
    "fits_en": "If you get a Levin Sword and want another crit sword.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrera",
    "name": "Guerrera de puños",
    "name_en": "Fist Warrior",
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
    "why": "Signos de madurez suma +20 a todos sus crecimientos: en Guerrero queda Fue 70. Sangre guerrera da +3 Fue y +2 Vel con guanteletes. Llega tarde (apoyo 3, prestigio 9, cap. 11), pero aún compensa.",
    "why_en": "Signs of Growth adds +20 to all her growths: as a Warrior she has Str 70. Warrior's Blood gives +3 Str and +2 Spd with gauntlets. She arrives late (support 3, renown 9, ch. 11), but is still worth it.",
    "fits": "Si te falta un pegador físico para el cap. 12.",
    "fits_en": "If you lack a physical hitter for ch. 12.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Espadachina",
    "name_en": "Swordswoman",
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
    "why": "Shido (Vel 65 de crecimiento) con espadas gemelas y esquiva alta.",
    "why_en": "Shido (Spd 65 growth) with twin swords and high avoid.",
    "fits": "Si ya tienes puños (Noctula).",
    "fits_en": "If you already have a fist fighter (Noctula).",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-batallador",
    "name": "Batallador con guanteletes",
    "name_en": "Gauntlet Battlemaster",
    "path": [
     "Guerrero",
     "Batallador"
    ],
    "weapon": "Guanteletes",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [],
    "why": "Forajido, Guerrero (Técnica entrenada) y Batallador (Golpe maestro). Su +20 % de crecimiento la lleva a Fue 57, más que Dietrich. Contra la Protección necesita a Eshmel o la Bendición de Aurora.",
    "why_en": "Brigand, Warrior (Practiced Art) and Battlemaster (War Master's Strike). Her +20 % growths take her to Str 57, more than Dietrich. Against the protection she needs Eshmel or Aurora's blessing.",
    "fits": "Casi siempre como pegadora física.",
    "fits_en": "Almost always as a physical hitter.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-eternidad",
    "name": "La Eternidad",
    "name_en": "The Eternal",
    "path": [
     "Guerrero",
     "Batallador",
     "La Eternidad"
    ],
    "weapon": "Guanteletes",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [
     {
      "lacks": "PID_ベルトラン"
     }
    ],
    "why": "La Eternidad (Poder bendito, Fue +10) la lleva a Fue 80 de crecimiento; una fuente se la da a ella. La Mano Divina es otra opción si queda libre.",
    "why_en": "The Eternal (Divine Might, Str +10) takes her Str growth to 80; one source gives it to her. The Godhand is another option if it is free.",
    "fits": "Sin Bertrand: solo hay una Balanza del juicio.",
    "fits_en": "Without Bertrand: there is only one Scales of Judgment.",
    "parts": [
     2,
     3
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
    ],
    "parts": [
     0,
     1
    ],
    "debate": {
     "es": "Hay quien la prefiere sanadora (Obispo o Trovador) antes que maga.",
     "en": "Some prefer her as a healer (Bishop or Troubadour) rather than a mage."
    }
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
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "why": "Celo competitivo (+10 crítico con magia) y Vampiro emocional (Nosferatu +3/+5): la mejor maga de daño de la ruta para quien juega con magos. Vate da Mag +20.",
    "why_en": "Competitive Zeal (+10 crit with magic) and Emotional Vampire (Nosferatu +3/+5): the route's best damage mage for mage-heavy teams. Ovate gives Mag +20.",
    "fits": "Equipo de varios magos; no tiene apoyo con Cai.",
    "fits_en": "Teams with several mages; she has no support with Cai.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ],
    "debate": {
     "es": "Hay quien la prefiere sanadora (Obispo o Trovador) antes que maga.",
     "en": "Some prefer her as a healer (Bishop or Troubadour) rather than a mage."
    }
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
    "why": "Cura y aguanta con Nosferatu en primera línea.",
    "why_en": "Heals and tanks with Nosferatu on the front line.",
    "fits": "Si nadie más cura.",
    "fits_en": "If nobody else heals.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
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
    "when": [],
    "why": "Sacerdote y Obispo (Mag +15, Res +20) con Nosferatu: Celo competitivo da Crí +10 con magia y Vampiro emocional Ata +3 y Crí +5 con Nosferatu (+5/+10 a nv 35). Cura por el daño que hace y también cura a otros con Sanar.",
    "why_en": "Priest and Bishop (Mag +15, Res +20) with Nosferatu: her personal skills give Crit +10 with magic and Atk +3, Crit +5 with Nosferatu (+5/+10 at lv 35). She heals from the damage she deals and heals others with Physic.",
    "fits": "Si Fabio ya cubre la magia negra y quieres un segundo sanador que también pegue.",
    "fits_en": "If Fabio already covers black magic and you want a second healer who also hits.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "when": [
     {
      "has": "PID_ダンテ"
     }
    ],
    "why": "Chamán (Mag +15, Habilidad contenida) y Vate (Mag +20, Velocidad contenida) con Thoron y Nosferatu. Compite con Fabio y Dante por el puesto de mago.",
    "why_en": "Shaman (Mag +15, Bind Dexterity) and Ovate (Mag +20, Bind Speed) with Thoron and Nosferatu. Competes with Fabio and Dante for the mage slot.",
    "fits": "Equipo de críticos, sobre todo con Dante al lado (Gol y Crí +10).",
    "fits_en": "Crit teams, above all with Dante nearby (Hit and Crit +10).",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ],
    "debate": {
     "es": "Hay quien la prefiere sanadora (Obispo o Trovador) antes que maga.",
     "en": "Some prefer her as a healer (Bishop or Troubadour) rather than a mage."
    }
   },
   {
    "id": "arquera",
    "name": "Arquera para fusionar",
    "name_en": "Archer for fusion",
    "path": [
     "Cazador",
     "Pícaro",
     "Rastreador"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero"
    ],
    "when": [],
    "why": "Pícaro y Rastreador le suben Hab y Vel (35 las dos). Es para fusionarla en la Parte 3 con otra Olympia maga; no conviene en una primera partida.",
    "why_en": "Rogue and Ranger raise her Dex and Spd (35 each). Meant for fusing in Part 3 with a mage Olympia; not advisable on a first playthrough.",
    "fits": "Si el plan es fusionarla en la Parte 3.",
    "fits_en": "If the plan is to fuse her in Part 3.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "obispa",
    "name": "Maga de críticos con Nosferatu",
    "name_en": "Nosferatu crit mage",
    "path": [
     "Augur",
     "Sacerdote",
     "Obispo"
    ],
    "weapon": "Magia blanca",
    "roles": [
     "mago",
     "sanador"
    ],
    "when": [],
    "why": "Celo competitivo (+10 Crí con magia) y Vampiro emocional con Nosferatu. Obispo le da Mag 65 y Física a rango B. Llega tarde (prestigio 9 y tres misiones).",
    "why_en": "Competitive Zeal (+10 crit with magic) and Ardent Nosferatu. Bishop gives Mag 65 and Physic at rank B. She arrives late (renown 9 and three quests).",
    "fits": "Si quieres una maga que también cure.",
    "fits_en": "If you want a mage who also heals.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "vate",
    "name": "Maga de daño",
    "name_en": "Burst mage",
    "path": [
     "Augur",
     "Chamán",
     "Vate"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago"
    ],
    "when": [
     {
      "has": "PID_ソフィア"
     }
    ],
    "why": "Chamán y Vate (Mag 70 de crecimiento) con Thoron; un Anillo de gigante evita que la doblen con tomos pesados.",
    "why_en": "Shaman and Ovate (Mag 70 growth) with Thoron; a Giant's Ring keeps heavy tomes from getting her doubled.",
    "fits": "Si Sofia ya cura.",
    "fits_en": "If Sofia already heals.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ],
    "debate": {
     "es": "Hay quien la prefiere sanadora (Obispo o Trovador) antes que maga.",
     "en": "Some prefer her as a healer (Bishop or Troubadour) rather than a mage."
    }
   },
   {
    "id": "p3-druida",
    "name": "Druida de crítico",
    "name_en": "Crit druid",
    "path": [
     "Vate",
     "Druida"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago"
    ],
    "when": [],
    "why": "Druida (Mag 80 de crecimiento efectivo) con Agonía Γ (30 % de crítico con su personal) y Thoron; un Anillo de gigante compensa el peso. Crescendo si pasó por Arquero.",
    "why_en": "Druid (effective Mag growth 80) with Death Γ (30 % crit with her personal) and Thoron; a Giant's Ring offsets the weight. Crescendo if she went through Archer.",
    "fits": "Si hay sanadores dedicados (Sofia, Orchel, Tialla).",
    "fits_en": "If you have dedicated healers (Sofia, Orchel, Tialla).",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-encarnacion",
    "name": "La Encarnación de crítico",
    "name_en": "Crit Avatar",
    "path": [
     "Vate",
     "Druida",
     "La Encarnación"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago"
    ],
    "when": [
     {
      "lacks": "PID_シロッコ"
     }
    ],
    "why": "La Encarnación (Código bendito, Mag +10) para su daño crítico; una fuente se la da a ella antes que a Sirocco.",
    "why_en": "The Avatar (Divine Law, Mag +10) for her crit damage; one source gives it to her over Sirocco.",
    "fits": "Sin Sirocco: solo hay un Loto del renacer.",
    "fits_en": "Without Sirocco: there is only one Lotus of Reincarnation.",
    "parts": [
     2,
     3
    ],
    "debate": {
     "es": "Hay quien la prefiere sanadora (Obispo o Trovador) antes que maga.",
     "en": "Some prefer her as a healer (Bishop or Troubadour) rather than a mage."
    }
   },
   {
    "id": "p3-valquiria",
    "name": "Valquiria con Nosferatu",
    "name_en": "Nosferatu Valkyrium",
    "path": [
     "Augur",
     "Sacerdote",
     "Obispo",
     "Valquiria"
    ],
    "weapon": "Magia blanca",
    "roles": [
     "sanador",
     "mago"
    ],
    "when": [
     {
      "lacks_role": "sanador"
     }
    ],
    "why": "Valquiria con Nosferatu y Mantra de paz (Res +2 a los aliados): cura y ataca a caballo.",
    "why_en": "Valkyrium with Nosferatu and Song of Calm (Res +2 to allies): heals and attacks on horseback.",
    "fits": "Si nadie más cura.",
    "fits_en": "If nobody else heals.",
    "parts": [
     2,
     3
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
    ],
    "parts": [
     0,
     1
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
    ],
    "parts": [
     0,
     1
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
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "caladrio",
    "name": "Mago esquivador montado",
    "name_en": "Evasive mounted mage",
    "path": [
     "Gladiador",
     "Chamán",
     "Caladrio"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago",
     "montado"
    ],
    "when": [],
    "why": "Caladrio con Magonius negro y Espada de levin: Gracia de la diosa le cura 5 PV tras cada combate y Veleta le sube la esquiva. Es el mago rápido que le falta a la ruta.",
    "why_en": "Caladrius with a black Magonius and a Levin Sword: Goddess's Grace heals him 5 HP after each fight and his other personal raises his avoid. He is the fast mage the route lacks.",
    "fits": "Si faltan magos; llega tarde (prestigio 9).",
    "fits_en": "If you lack mages; he comes late (renown 9).",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "vate",
    "name": "Vate",
    "name_en": "Ovate",
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
    "why": "Chamán y Vate (Mag +20) a pie, con Thoron y Espada de levin.",
    "why_en": "Shaman and Ovate (Mag +20) on foot, with Thoron and a Levin Sword.",
    "fits": "Si no tienes montura de ornius para él.",
    "fits_en": "If you have no ornius mount for him.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "vate",
    "name": "Mago de esquiva",
    "name_en": "Evasive mage",
    "path": [
     "Augur",
     "Chamán",
     "Vate"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago",
     "esquiva"
    ],
    "when": [],
    "why": "Chamán y Vate con Espada trueno y Thoron. Gracia de la diosa le cura 5 PV tras cada combate y Veleta da Esq al azar. Usa tanto Fue como Mag.",
    "why_en": "Shaman and Ovate with a Levin Sword and Thoron. His personal skill heals him 5 HP after each fight and another gives random Avo. He uses both Str and Mag.",
    "fits": "Si lo reclutas: llega tarde (prestigio 9) y rinde más en otras rutas.",
    "fits_en": "If you recruit him: he comes late (renown 9) and shines more on other routes.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Espadachín para fusionar",
    "name_en": "Swordsman for fusion",
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
    "why": "Fue 40 y Mag 40: con la magia ya cubierta, Mirmidón y Shido con Espada trueno.",
    "why_en": "Str 40 and Mag 40: with magic already covered, Myrmidon and Shido with a Levin Sword.",
    "fits": "Si ya tienes dos magos o piensas fusionarlo en la Parte 3.",
    "fits_en": "If you already have two mages or plan to fuse him in Part 3.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "vate",
    "name": "Mago con Espada trueno",
    "name_en": "Levin Sword mage",
    "path": [
     "Augur",
     "Chamán",
     "Vate"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago",
     "esquiva"
    ],
    "when": [],
    "why": "Chamán y Vate (Mag 60, Hab 65 de crecimiento) con Espada trueno, Thoron, Excalibur y Warp. Gracia de la diosa le cura 5 PV tras cada combate y Veleta le da esquiva al azar. Cuesta apoyo 1 y prestigio 5 (6 en la práctica para el mapa de su misión).",
    "why_en": "Shaman and Ovate (Mag 60, Dex 65 growths) with a Levin Sword, Thoron, Excalibur and Warp. Goddess's Favor heals him 5 HP after each fight and Wind's Caprice gives random avoid. He costs support 1 and renown 5 (6 in practice for his quest map).",
    "fits": "Casi siempre: es el recluta más fuerte de la ruta.",
    "fits_en": "Almost always: he is the strongest recruit in this route.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Espadachín esquivador",
    "name_en": "Evasive Shido",
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
    "why": "Si sus primeros niveles suben más Fue que Mag: Shido (Vel 60 de crecimiento) con Espada trueno de reserva. En primera línea esquiva y se cura con su habilidad personal.",
    "why_en": "If his early levels raise Str more than Mag: Shido (Spd 60 growth) with a Levin Sword as backup. On the front line he dodges and heals with his personal skill.",
    "fits": "Si ya tienes magos (Bonaventure, Olympia) y falta un frontal rápido.",
    "fits_en": "If you already have mages (Bonaventure, Olympia) and lack a fast front-liner.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrero",
    "name": "Híbrido de Fue con Espada trueno",
    "name_en": "Str hybrid with Levin Sword",
    "path": [
     "Gladiador",
     "Forajido",
     "Guerrero"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Forajido y Guerrero suben la Fue (crecimiento 60) sin perder Mag: espada pesada de cerca y Espada trueno a distancia. Si ya lo hiciste mago en otra ruta, esta versión sirve para fusionar.",
    "why_en": "Brigand and Warrior raise Str (60 growth) without losing Mag: heavy sword up close and Levin Sword at range. If he was a mage on another route, this version is good for merging.",
    "fits": "Si su Fue sale alta y no necesitas más magos.",
    "fits_en": "If his Str comes out high and you need no more mages.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-encarnacion",
    "name": "La Encarnación",
    "name_en": "The Avatar",
    "path": [
     "Vate",
     "Druida",
     "La Encarnación"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago",
     "esquiva"
    ],
    "when": [],
    "why": "Druida y La Encarnación (Código bendito, Mag +10; usos de las dos magias ×3): Excalibur contra voladores, Thoron, Warp y Fortalecer. Esq 54 con su personal y 32 % de crítico en el mapa final.",
    "why_en": "Druid into The Avatar (Divine Law, Mag +10; both magics ×3 uses): Excalibur against fliers, Thoron, Warp and Fortify. Avoid 54 with his personal and 32 % crit on the final map.",
    "fits": "Casi siempre: dos fuentes le dan La Encarnación y lo ven más fuerte que Dietrich.",
    "fits_en": "Almost always: two sources give him The Avatar and rate him above Dietrich.",
    "parts": [
     2,
     3
    ],
    "debate": {
     "es": "La Encarnación es para una sola unidad: Sirocco, Olympia u Orchel.",
     "en": "The Avatar goes to one unit only: Sirocco, Olympia or Orchel."
    }
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
    ],
    "parts": [
     0,
     1
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
    "why": "Mejor de Rastreador: el equipo de Leda no tiene arquero y Catania tiene Vel de sobra. «Casi no la golpean y critica mucho» (comentario).",
    "why_en": "Better as a Tracker: Leda's team has no archer and Catania has Spd to spare. «They barely hit her and she crits a lot» (comment).",
    "fits": "Si falta arquero.",
    "fits_en": "If you lack an archer.",
    "routes": [
     "leda"
    ],
    "parts": [
     0,
     1
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
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Espadachina de Shido",
    "name_en": "Shido swordswoman",
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
    "why": "Vel 55 y Viento huracanado (Gol +20 si dobla por 3 o más) con espadas ligeras o Espada de levin. Llega con prestigio 10 y poco autonivel.",
    "why_en": "Spd 55 and her personal (Hit +20 when her attack speed lead is 3+) with light swords or a Levin Sword. She arrives at renown 10 with little autolevel.",
    "fits": "Si falta pegadora rápida al final de la Parte 1.",
    "fits_en": "If you lack a fast hitter late in Part 1.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "rastreadora",
    "name": "Velocista rastreadora",
    "name_en": "Speedy ranger",
    "path": [
     "Cazador",
     "Pícaro",
     "Rastreador"
    ],
    "weapon": "Espada",
    "roles": [
     "esquiva",
     "arquero"
    ],
    "when": [
     {
      "lacks_role": "arquero"
     }
    ],
    "why": "Vel 55: Pícaro y Rastreador (Vel +15 cada una) la hacen doblar siempre, y Viento huracanado da Gol +20 si su VA supera en 3 la del enemigo. Rastreador añade el arco que le falta a la ruta.",
    "why_en": "Spd 55: Rogue and Ranger (Spd +15 each) make her double every time, and her personal skill gives Hit +20 when her AS beats the enemy's by 3. Ranger adds the bow the route lacks.",
    "fits": "Si falta arquero o un segundo velocista. Solo pide apoyo 1.",
    "fits_en": "If you lack an archer or a second speedster. Only needs support 1.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "alaceleste",
    "name": "Ala Celeste cazamagos",
    "name_en": "Mage-hunting flier",
    "path": [
     "Jinete de ornius",
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
    "why": "Vuela hasta los magos con Res 35.",
    "why_en": "Flies to the mages with Res 35.",
    "fits": "Si falta volador.",
    "fits_en": "If you lack a flier.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "maga",
    "name": "Maga con Espada trueno",
    "name_en": "Levin sword mage",
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
    "why": "Chamán y Vate con Espada trueno; su lista incluye Sanar y Thoron. Llega tarde para empezar de maga.",
    "why_en": "Shaman and Ovate with a Levin Sword; her list includes Physic and Thoron. She comes late to start as a mage.",
    "fits": "Si quieres otro mago con Sanar.",
    "fits_en": "If you want another mage with Physic.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guardiana",
    "name": "Ala Celeste y luego Guardiana",
    "name_en": "Wing Soldier into Guardian",
    "path": [
     "Soldado",
     "Ala Celeste",
     "Guardián"
    ],
    "weapon": "Lanza",
    "roles": [
     "sanador",
     "tanque"
    ],
    "when": [
     {
      "lacks_role": "sanador"
     }
    ],
    "why": "Ala Celeste con Espada trueno hasta el cap. 9 (sin batallón mientras vuela) y luego Guardián para curar con Física. Su Vel 55 activa Viento huracanado (+20 Gol). Su Fue ronda 18.",
    "why_en": "Wing Soldier with a Levin Sword until ch. 9 (no battalion while flying), then Guardian to heal with Physic. Her Spd 55 triggers Punishing Squall (+20 hit). Her Str is around 18.",
    "fits": "Si quieres una segunda curandera con alcance.",
    "fits_en": "If you want a second ranged healer.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "vate",
    "name": "Maga",
    "name_en": "Mage",
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
    "why": "Más rápida que Sirocco: Excalibur y Trueno con Chamán y Vate.",
    "why_en": "Faster than Sirocco: Excalibur and Thunder as Shaman and Ovate.",
    "fits": "Si falta daño mágico.",
    "fits_en": "If you lack magic damage.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrera",
    "name": "Forajida para la Fue",
    "name_en": "Brigand for Str",
    "path": [
     "Gladiador",
     "Forajido",
     "Guerrero"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Forajido y Guerrero arreglan su Fue baja; a pie lleva batallón.",
    "why_en": "Brigand and Warrior fix her low Str; on foot she takes a battalion.",
    "fits": "Si quieres otra pegadora física.",
    "fits_en": "If you want another physical hitter.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-celeste",
    "name": "Jinete celeste veloz",
    "name_en": "Fast Celestial Trooper",
    "path": [
     "Jinete de baus",
     "Jinete celeste"
    ],
    "weapon": "Espada",
    "roles": [
     "volador",
     "golpe"
    ],
    "when": [
     {
      "lacks_role": "volador"
     }
    ],
    "why": "Su personal da Gol +20 con VA +3 y Ata +3 con VA +5: con Vel 55 encaja con Reflejos relámpago. Espada purificadora y Espada trueno.",
    "why_en": "Her personal gives Hit +20 with AS +3 and Atk +3 with AS +5: with Spd 55 she suits Lightning Reflexes. Cleansing Blade and Levin Sword.",
    "fits": "Si falta un volador que pegue.",
    "fits_en": "If you lack a flier who hits.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-centinela",
    "name": "Centinela con Physic",
    "name_en": "Sentinel with Physic",
    "path": [
     "Guardián",
     "Centinela"
    ],
    "weapon": "Lanza",
    "roles": [
     "sanador"
    ],
    "when": [
     {
      "lacks_role": "sanador"
     }
    ],
    "why": "Guardián y Centinela con Lanza de Da Mina: es la única que aprende Physic y Warp.",
    "why_en": "Guardian into Sentinel with a Da Mina Spear: she is the only one who learns Physic and Warp.",
    "fits": "Si falta curación a distancia.",
    "fits_en": "If you lack ranged healing.",
    "parts": [
     2,
     3
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
    ],
    "parts": [
     0,
     1
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
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Hoplita lanzadora",
    "name_en": "Javelin Dreadnought",
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
    "why": "El tanque físico de la ruta: Brazo lanzador (Gol +10, Ata +2 al lanzar lanzas; +20/+4 a nv 35) y Músculo (peso al 80 %) con jabalinas desde la armadura. Siete fuentes la recomiendan y tiene apoyo 1/2/3 con Cai. Dale Agua pura antes de los magos (Res 25).",
    "why_en": "The route's physical tank: Throwing Arm (Hit +10, Atk +2 with thrown lances; +20/+4 at lv 35) and Muscle (weight ×0.8) with javelins from armor. Seven sources recommend her and she has support 1/2/3 with Cai. Give her Pure Water before facing mages (Res 25).",
    "fits": "Si falta tanque, que en Cai es lo normal.",
    "fits_en": "If you lack a tank, which is normal on Cai's route.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "baus",
    "name": "Jinete de baus lanzadora",
    "name_en": "Javelin Dragoon",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Jinete de baus"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador",
     "golpe"
    ],
    "when": [
     {
      "has": "PID_ジャスミン"
     },
     {
      "has": "PID_ゴライアス"
     }
    ],
    "why": "Con Bau salvaje llega a PV 70, Fue 70 y Def 55 de crecimiento, y Asedio suma Gol +20 contra enemigos en terreno favorable. Hay que subir Vuelo a C con manuales.",
    "why_en": "With a wild Bau she reaches HP 70, Str 70 and Def 55 growth, and Siege adds Hit +20 against enemies on favourable terrain. Raise Flying to C with manuals.",
    "fits": "Si Jasmine o Goliath ya hacen de tanque y la quieres de pegadora voladora.",
    "fits_en": "If Jasmine or Goliath already tank and you want her as a flying hitter.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "bardada",
    "name": "Jinete bardado con Rocinante",
    "name_en": "Bardinger with Rocinante",
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
    "when": [
     {
      "has": "PID_イオ"
     }
    ],
    "why": "Rocinante, el caballo de Io, da +30 % de crecimiento repartido en PV, Hab, Vel, Def y Res: montado en una clase de caballo, tapa su Vel y Res bajas.",
    "why_en": "Rocinante, Io's horse, adds +30 % growth spread over HP, Dex, Spd, Def and Res: on a horse class it patches her low Spd and Res.",
    "fits": "Si Io está en el ejército y le cedes su caballo.",
    "fits_en": "If Io is in the army and lends her his horse.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Muro de lanzas arrojadizas",
    "name_en": "Thrown-lance wall",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Hoplita"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque"
    ],
    "when": [],
    "why": "Soldado acorazado (Def +25, Contra mayor) y Hoplita (Def +30, Fue +15). Brazo lanzador da Gol +10 y Ata +2 al arrojar lanzas (+20/+4 a nv 35) y Músculo baja el peso al 80 %: contraataca a 1-2 casillas. Su Res 25 es el punto débil.",
    "why_en": "Armored Knight (Def +25, Great Counter) and Dreadnought (Def +30, Str +15). Her thrown-lance skill gives Hit +10 and Atk +2 (+20/+4 at lv 35) and her Muscle skill cuts weight to 80 %: she counters at 1-2 range. Res 25 is her weak spot.",
    "fits": "Si es el tanque central del equipo (lo normal).",
    "fits_en": "If she is the team's main tank (the usual case).",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guardiana",
    "name": "Guardiana contra magos",
    "name_en": "Anti-mage guardian",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Guardián"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque",
     "sanador"
    ],
    "when": [
     {
      "lacks_role": "sanador"
     }
    ],
    "why": "Guardián (Res +15, Def +10, Fue +10) tapa su Res baja y le da magia blanca (Sanar, Ángeles) aunque su Mag sea 20. Se abre con la misión «Duelo de Temerario: Il-Lara», que esta ruta sí tiene.",
    "why_en": "Guardian (Res +15, Def +10, Str +10) covers her low Res and gives her white magic (Physic, Seraphim) even with Mag 20. Unlocked by the quest «Daredevil Duel: Il-Lara», available on this route.",
    "fits": "Si el mapa trae muchos magos o falta curación.",
    "fits_en": "If the map brings many mages or you lack healing.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "bardada",
    "name": "Jinete bardado",
    "name_en": "Bardinger",
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
    "why": "Jinete ligero y Jinete bardado (Res +10, Fue +10, maestra Égida contra la magia) le dan movimiento y algo de precisión, que con Hab 35 y Vel 35 le falta.",
    "why_en": "Light Cavalry and Bardinger (Res +10, Str +10, mastery Aegis against magic) give her movement and some accuracy, which she lacks with Dex 35 and Spd 35.",
    "fits": "Si quieres un tanque móvil y hay muchos magos enemigos.",
    "fits_en": "If you want a mobile tank and there are many enemy mages.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "alaceleste",
    "name": "Voladora con jabalinas",
    "name_en": "Javelin flier",
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
    "why": "Ala Celeste (maestra Alas protectoras) le da movimiento a una unidad muy corpulenta. Jinete de baus no se abre en esta ruta: se queda en Ala Celeste en la Parte 1. Si vuela, Mikaela pasa a hacer de tanque.",
    "why_en": "Wing Soldier (mastery Protecting Wings) gives movement to a very sturdy unit. Dragoon does not open on this route: she stays a Wing Soldier in Part 1. If she flies, Mikaela becomes the tank.",
    "fits": "Si falta volador y otra unidad tanquea.",
    "fits_en": "If you lack a flier and someone else tanks.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Hoplita lanzadora",
    "name_en": "Javelin Dreadnought",
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
    "why": "Brazo lanzador (+10 Gol y +2 ataque al lanzar lanzas; +20/+4 a nv 35) y Músculo (peso ×0,8) con PV 55 y Fue 55. Hoplita hasta que se abra Jinete de baus. Llega tarde (prestigio 9).",
    "why_en": "Throwing Arm (+10 hit and +2 attack when throwing lances; +20/+4 at lv 35) and Brawn (weight ×0.8) with HP 55 and Str 55. Dreadnought until Dragoon opens. She arrives late (renown 9).",
    "fits": "Si falta tanque para el cap. 12.",
    "fits_en": "If you lack a tank for ch. 12.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "baus",
    "name": "Jinete de baus lanzadora",
    "name_en": "Javelin Dragoon",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Jinete de baus"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador",
     "tanque",
     "montado"
    ],
    "when": [],
    "why": "Jinete de baus (Res +10 de clase, maestra Asedio) tapa su Res 25 y lanza jabalinas desde el aire. Solo tras el 14.º envío (cap. 11). Va montado: en esta ruta los montados no pueden llevar batallón.",
    "why_en": "Dragoon (class Res +10, mastery Besieger) covers her Res 25 and throws javelins from the air. Only after the 14th delivery (ch. 11). Mounted: in this route mounted units cannot take a battalion.",
    "fits": "Si ya hiciste los 14 envíos y quieres un tanque que vuele.",
    "fits_en": "If you made the 14 deliveries and want a flying tank.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-bastion",
    "name": "Lanzadora acorazada",
    "name_en": "Armored javelin thrower",
    "path": [
     "Hoplita",
     "Caballero bastión"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque"
    ],
    "when": [],
    "why": "Su personal da Gol +20 y Ata +4 al arrojar lanzas (nivel 35): la mejor con Doble lanzamiento y jabalinas desde Caballero bastión (Bloqueo). Res 25: tápala con la Bendición de Aurora.",
    "why_en": "Her personal gives Hit +20 and Atk +4 when throwing lances (level 35): the best user of double throws and javelins from Castle Knight (Intercept). Res 25: cover it with Aurora's blessing.",
    "fits": "Si hay pocos pesados en el equipo.",
    "fits_en": "If the team has few heavy units.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-celeste",
    "name": "Voladora con lanza",
    "name_en": "Flying lancer",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Guardián",
     "Jinete celeste"
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
    "why": "Su Vel y Hab de 35 lastran la armadura. Jinete celeste le da movilidad y Reflejos relámpago (doble ataque antes del contraataque con VA +10); la lanza arrojada sigue valiendo.",
    "why_en": "Her Spd and Dex of 35 hold back the armor. Celestial Trooper gives her mobility and Lightning Reflexes (double attack before the counter with AS +10); thrown lances still work.",
    "fits": "Si falta volador; tres fuentes la prefieren en el aire.",
    "fits_en": "If you lack a flier; three sources prefer her in the air.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-paladinbau",
    "name": "Paladín bau",
    "name_en": "Bau Lord",
    "path": [
     "Jinete de baus",
     "Paladín bau"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador",
     "tanque"
    ],
    "when": [],
    "why": "Paladín bau mantiene su Def alta y le da vuelo con lanza.",
    "why_en": "Bau Lord keeps her high Def and gives her flight with a lance.",
    "fits": "Si ya iba de Jinete de baus en la Parte 1.",
    "fits_en": "If she was already a Bau Rider in Part 1.",
    "parts": [
     2,
     3
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
    ],
    "parts": [
     0,
     1
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
    ],
    "parts": [
     0,
     1
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
    "why": "Movilidad para un equipo que va a pie.",
    "why_en": "Mobility for a team on foot.",
    "fits": "Si nadie más va montado.",
    "fits_en": "If nobody else is mounted.",
    "routes": [
     "leda"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Shido crítico",
    "name_en": "Crit Shido",
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
    "when": [
     {
      "has": "PID_エスメラルダ"
     }
    ],
    "why": "Dobla casi siempre (Vel 50) y Temperamento le da +10 a +20 de golpe, esquiva o crítico al azar. Mirmidón deja Técnica devastadora (+6 en crítico). Siete fuentes lo ponen en S o A alto y cuesta solo apoyo 1 y prestigio 2.",
    "why_en": "He doubles almost always (Spd 50) and Temper gives a random +10 to +20 hit, avoid or crit. Myrmidon leaves Devastating Technique (+6 on a crit). Seven sources rate him S or high A, and he costs only support 1 and renown 2.",
    "fits": "Casi siempre; sobre todo si Esmeralda ya hace de tanque.",
    "fits_en": "Almost always; especially if Esmeralda already tanks.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "muro",
    "name": "Muro acorazado",
    "name_en": "Armored wall",
    "path": [
     "Gladiador",
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
    "why": "Cai no tiene un tanque propio como Leda con Buccar: Soldado acorazado y Hoplita (Def +30) convierten a Guzran en muro que sigue matando con lanza. Su Res 20 sigue siendo el punto débil.",
    "why_en": "Cai has no built-in tank like Leda's Buccar: Armored Knight and Dreadnought (Def +30) turn Guzran into a wall that still kills with lances. His Res 20 stays the weak spot.",
    "fits": "Si no hay nadie con Def alta (sin Esmeralda, Goliath ni Majide).",
    "fits_en": "If nobody has high Def (no Esmeralda, Goliath or Majide).",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Espadachín de crítico",
    "name_en": "Crit swordsman",
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
    "why": "Temperamento da Gol, Esq o Crí +10 en cada combate (+15 a nv 20, +20 a nv 35). Mirmidón y Shido dejan Técnica devastadora y Siempre alerta. Su Res 20 lo hace caer ante magos.",
    "why_en": "His personal skill gives Hit, Avo or Crit +10 each fight (+15 at lv 20, +20 at lv 35). Myrmidon and Shido leave Ravaging Arts and Ever Vigilant. His Res 20 makes him fall to mages.",
    "fits": "Casi siempre como segundo espadachín.",
    "fits_en": "Almost always as the second swordsman.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Acorazado",
    "name_en": "Armored",
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
    "why": "Cumple de tanque de esquiva y daño, no de muro puro.",
    "why_en": "Works as a dodge-and-damage tank, not a pure wall.",
    "fits": "Si falta tanque acorazado.",
    "fits_en": "If you lack an armored tank.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "rastreador",
    "name": "Rastreador",
    "name_en": "Ranger",
    "path": [
     "Cazador",
     "Pícaro",
     "Rastreador"
    ],
    "weapon": "Espada",
    "roles": [
     "esquiva",
     "arquero"
    ],
    "when": [
     {
      "lacks_role": "arquero"
     }
    ],
    "why": "Pícaro y Rastreador le dan arco además de espada. Rastreador se abre con la misión de Oko.",
    "why_en": "Rogue and Ranger add a bow to his sword. Ranger opens with the Oko quest.",
    "fits": "Si falta arquero.",
    "fits_en": "If you lack an archer.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Shido de primera línea",
    "name_en": "Front-line Shido",
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
    "why": "Temperamento le da +10 a +20 de Gol, Esq o Crí en cada combate y Vel 50 para doblar. Aquí cuesta prestigio 8, por eso baja en la lista, pero sigue rindiendo tarde.",
    "why_en": "Hot-Headed gives +10 to +20 hit, avoid or crit each fight, and Spd 50 to double. Here he costs renown 8, which lowers his rank, but he still performs late.",
    "fits": "Si otro pegador (Tobias, Lysander) salió flojo.",
    "fits_en": "If another hitter (Tobias, Lysander) turned out weak.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrero",
    "name": "Forajido y Guerrero",
    "name_en": "Brigand into Warrior",
    "path": [
     "Gladiador",
     "Forajido",
     "Guerrero"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Forajido y Guerrero si su Fue no sube.",
    "why_en": "Brigand and Warrior if his Str lags.",
    "fits": "Si su Fue sale baja.",
    "fits_en": "If his Str comes out low.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-buscasombras",
    "name": "Shido y Buscasombras",
    "name_en": "Shido into Shadow Seeker",
    "path": [
     "Shido",
     "Buscasombras"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [],
    "why": "Shido (Siempre alerta) y Buscasombras con Mandoble; no pierde Vel y llega a Fue ~50 a nivel 70. Barrido evita el contraataque.",
    "why_en": "Shido (Ever Vigilant) into Shadow Seeker with a Greatsword; he keeps his Spd and reaches Str ~50 at level 70. A sweeping art avoids the counter.",
    "fits": "Si falta un atacante físico y otro lleva La Calamidad.",
    "fits_en": "If you lack a physical attacker and someone else holds The Calamity.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-calamidad",
    "name": "La Calamidad",
    "name_en": "The Calamity",
    "path": [
     "Shido",
     "Buscasombras",
     "La Calamidad"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [
     {
      "lacks": "PID_タリムーン"
     }
    ],
    "why": "La Calamidad (Destino bendito, Sue +10, +5 % de crítico) con espada S y arco contra voladores.",
    "why_en": "The Calamity (Divine Will, Lck +10, +5 % crit) with Sword S and a bow for fliers.",
    "fits": "Sin Talimun: solo hay un Cristal tiniebla.",
    "fits_en": "Without Talimun: there is only one Crystal of Darkness.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-bastion",
    "name": "Caballero bastión",
    "name_en": "Castle Knight",
    "path": [
     "Hoplita",
     "Caballero bastión"
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
    "why": "En el equipo de Cai del final va de Caballero bastión (Bloqueo) junto a Centurio. Res 20: no esquiva la magia.",
    "why_en": "In Cai's end-game squad he plays Castle Knight (Intercept) next to Centurio. Res 20: magic hurts him.",
    "fits": "Si falta tanque.",
    "fits_en": "If you lack a tank.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-espadachin",
    "name": "Espadachín",
    "name_en": "Swordmaster",
    "path": [
     "Shido",
     "Espadachín"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [],
    "why": "Espadachín aprovecha su Vel y su Fue con espada y crítico, sin gastar un objeto divino.",
    "why_en": "Swordmaster uses his Spd and Str with swords and crits, without spending a Divine item.",
    "fits": "Si La Calamidad va a otra unidad.",
    "fits_en": "If The Calamity goes to another unit.",
    "parts": [
     2,
     3
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
    ],
    "parts": [
     0,
     1
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
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "cuadriguero",
    "name": "Cuadriguero con Rocinante",
    "name_en": "Charioteer with Rocinante",
    "path": [
     "Soldado",
     "Cuadriguero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Rocinante es suyo (V5 doblado por Cuadriguero: Def +20, PV, Hab y Vel +10) y Nunca sin corcel le da Esq +30 al atacar primero montado.",
    "why_en": "Rocinante is his own (bond 5 doubled by Charioteer: Def +20, HP, Dex and Spd +10) and his personal gives Avo +30 when attacking first while mounted.",
    "fits": "Si te sobra prestigio 10 y quieres otro jinete.",
    "fits_en": "If you have renown 10 to spare and want another rider.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "cuadriguero",
    "name": "Cuadriguero con Rocinán",
    "name_en": "Charioteer with Rocinan",
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
    "why": "Trae su caballo Rocinán: es el único jinete de la ruta con montura propia junto a Alexandra. Cuadriguero (Hab +15, Def +10) pide Arco C y Equitación D: entrena el arco antes. La mayoría de los comentarios lo ven su mejor clase, aunque un vídeo lo desaconseja.",
    "why_en": "He brings his horse Rocinan: with Alexandra, the only rider on the route with his own mount. Charioteer (Dex +15, Def +10) needs Bow C and Riding D: train the bow first. Most comments call it his best class, though one video advises against it.",
    "fits": "Si falta arquero o caballería; es barato (prestigio 3).",
    "fits_en": "If you lack an archer or cavalry; he is cheap (renown 3).",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "bardado",
    "name": "Jinete bardado",
    "name_en": "Bardinger",
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
    "why": "Jinete ligero y Jinete bardado (Égida) con lanza. Nunca sin corcel le da Def y Res +3 y Evit +30 si ataca primero a caballo: atrae enemigos delante de Dietrich.",
    "why_en": "Light Cavalry and Bardinger (Aegis) with a lance. His personal skill gives Def and Res +3 and Ddg +30 when he attacks first mounted: he draws enemies ahead of Dietrich.",
    "fits": "Si quieres un jinete barato y temprano.",
    "fits_en": "If you want a cheap early rider.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "catafracto",
    "name": "Catafracto con Rocinán",
    "name_en": "Cataphract with Rocinan",
    "path": [
     "Soldado",
     "Jinete ligero",
     "Catafracto"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque",
     "montado"
    ],
    "when": [],
    "why": "Llega con su caballo Rocinán (Def +2 y más) y Embestida montada (+10 Gol). Catafracto (8 envíos) lo vuelve un muro montado; también puede pasar por Cuadriguero con arco antes. Va montado: en esta ruta los montados no pueden llevar batallón. Prestigio 10: es el último recluta.",
    "why_en": "He comes with his horse Rocinan (Def +2 and more) and Mounted Push (+10 hit). Cataphract (8 deliveries) makes him a mounted wall; he can also go through Charioteer with bows first. Mounted: in this route mounted units cannot take a battalion. Renown 10: he is the last recruit.",
    "fits": "Si falta un tanque montado.",
    "fits_en": "If you lack a mounted tank.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "bardado",
    "name": "Jinete bardado",
    "name_en": "Bardinger",
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
    "why": "Sin envíos: Jinete bardado con Égida contra la magia. Va montado: en esta ruta los montados no pueden llevar batallón.",
    "why_en": "No deliveries needed: Bardinger with Aegis against magic. Mounted: in this route mounted units cannot take a battalion.",
    "fits": "Si aún no tienes los 8 envíos.",
    "fits_en": "If you lack the 8 deliveries.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-jinetepesado",
    "name": "Jinete pesado con Rocinante",
    "name_en": "Great Knight with Rocinante",
    "path": [
     "Catafracto",
     "Jinete pesado"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque",
     "montado"
    ],
    "when": [],
    "why": "Con Rocinante llega a Def 60 y PV 65; Jinete pesado (petición de Credna) deja Escudo intrépido (mitad de daño al 50 %).",
    "why_en": "With Rocinante he reaches Def 60 and HP 65; Great Knight (Credna's request) leaves Fierce Shield (half damage at 50 %).",
    "fits": "Si quieres un tanque montado. Su caballo vale más que él.",
    "fits_en": "If you want a mounted tank. His horse is worth more than he is.",
    "parts": [
     2,
     3
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
    ],
    "parts": [
     0,
     1
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
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "why": "Púgil y Guerrero; da +10 de golpe y +3 de ataque al aliado adyacente. Unidad marginal en Cai.",
    "why_en": "Pugilist and Warrior; she gives an adjacent ally +10 hit and +3 attack. A marginal unit on Cai's route.",
    "fits": "Solo si te faltan físicos.",
    "fits_en": "Only if you lack physical units.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "alaceleste",
    "name": "Voladora cazamagos",
    "name_en": "Mage-hunting flier",
    "path": [
     "Jinete de ornius",
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
    "why": "Ala Celeste (Res +5, maestra Alas protectoras) vuela hasta los magos y arqueros. Temple curtido le da Gol +10 y Hoja Roja Ata +3 contra el enemigo de al lado. Jinete de baus no se abre en esta ruta.",
    "why_en": "Wing Soldier (Res +5, mastery Protecting Wings) flies to mages and archers. Her personal skills give Hit +10 and Atk +3 against adjacent foes. Dragoon does not open on this route.",
    "fits": "Si Esmeralda es el tanque central: Mikaela flanquea.",
    "fits_en": "If Esmeralda is the main tank: Mikaela flanks.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "jineteArquera",
    "name": "Jinete arquero con espada y arco",
    "name_en": "Sword-and-bow Forest Knight",
    "path": [
     "Gladiador",
     "Pícaro",
     "Jinete arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "montado",
     "arquero",
     "golpe"
    ],
    "when": [
     {
      "lacks_role": "arquero"
     }
    ],
    "why": "Pícaro (Hab +10, Vel +15) arregla su Hab 35 sin perder Fue y entrena el arco que pide Jinete arquero (Arco B y Equitación D). Sigue pegando con espada a corta distancia.",
    "why_en": "Rogue (Dex +10, Spd +15) fixes her Dex 35 without losing Str and trains the bow Forest Knight needs (Bow B and Riding D). She still hits with swords up close.",
    "fits": "Si falta arquero o caballería.",
    "fits_en": "If you lack an archer or cavalry.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Hoplita de hacha",
    "name_en": "Axe dreadnought",
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
    "why": "Soldado acorazado y Hoplita (Def +30) con hacha y contraataque. Es su papel si Esmeralda pasa a volar: las dos tienen que repartirse tanque y volador.",
    "why_en": "Armored Knight and Dreadnought (Def +30) with an axe and counters. Her job if Esmeralda flies: the two must split tank and flier between them.",
    "fits": "Si falta tanque o Esmeralda vuela.",
    "fits_en": "If you lack a tank or Esmeralda flies.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrera",
    "name": "Guerrera de puños",
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
    "why": "Púgil (PV +15, Fue +10, Vel +10) y Guerrero (Fue +20). Sus personales suman Gol y Ata contra el enemigo de al lado.",
    "why_en": "Pugilist (HP +15, Str +10, Spd +10) and Warrior (Str +20). Her personal skills add Hit and Atk against adjacent foes.",
    "fits": "Si ya tienes tanque y volador y quieres otra pegadora.",
    "fits_en": "If you already have a tank and a flier and want another hitter.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrera",
    "name": "Guerrera de espada",
    "name_en": "Sword Warrior",
    "path": [
     "Gladiador",
     "Forajido",
     "Guerrero"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Guerrero (PV 70, Fue 65) con espada: el hacha falla por su Hab 35. Cuesta 3000 G y prestigio 8.",
    "why_en": "Warrior (HP 70, Str 65) with swords: axes miss with her Dex 35. Costs 3000 G and renown 8.",
    "fits": "Si faltan frontales.",
    "fits_en": "If you lack front-liners.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-celeste",
    "name": "Jinete celeste",
    "name_en": "Celestial Trooper",
    "path": [
     "Gladiador",
     "Forajido",
     "Guerrero",
     "Jinete celeste"
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
    "why": "Púgil, Guerrero y Jinete celeste (Reflejos relámpago) con Espada purificadora.",
    "why_en": "Brawler, Warrior and Celestial Trooper (Lightning Reflexes) with a Cleansing Blade.",
    "fits": "Si falta volador.",
    "fits_en": "If you lack a flier.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-batallador",
    "name": "Batallador",
    "name_en": "Battlemaster",
    "path": [
     "Guerrero",
     "Batallador"
    ],
    "weapon": "Hacha",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Golpe maestro; su personal da Gol +10 contra un adyacente.",
    "why_en": "War Master's Strike; her personal gives Hit +10 against an adjacent foe.",
    "fits": "Si quieres más daño.",
    "fits_en": "If you want more damage.",
    "parts": [
     2,
     3
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
    ],
    "parts": [
     0,
     1
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
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "why": "Cubre el papel de Forajido que le falta a Cai (Fue 50). Por los pelos le deja sobrevivir a un golpe letal con probabilidad igual a su Suerte (50).",
    "why_en": "Fills the Brigand role Cai lacks (Str 50). Close Call lets him survive a lethal hit with a chance equal to his Luck (50).",
    "fits": "Si quieres otro físico resistente.",
    "fits_en": "If you want another sturdy physical unit.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Hoplita con suerte",
    "name_en": "Lucky Dreadnought",
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
    "why": "Soldado acorazado y Hoplita para aguantar con Def 40 y Suerte 50.",
    "why_en": "Armored Knight and Dreadnought to hold the line with Def 40 and Luck 50.",
    "fits": "Si falta tanque.",
    "fits_en": "If you lack a tank.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrero",
    "name": "Guerrero de crítico",
    "name_en": "Crit warrior",
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
    "why": "Forajido (PV +15, Fue +15) y Guerrero (Fue +20). Por los pelos le deja sobrevivir a un golpe letal con probabilidad igual a su Suerte y Suerte diabólica le da Sue +1 por muerte.",
    "why_en": "Brigand (HP +15, Str +15) and Warrior (Str +20). His personal skill lets him survive a lethal hit with a chance equal to his Luck, and another gives Lck +1 per kill.",
    "fits": "Casi siempre: es uno de los pegadores físicos más estables.",
    "fits_en": "Almost always: one of the steadiest physical hitters.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "acorazado",
    "name": "Acorazado de suerte",
    "name_en": "Lucky armor",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Hoplita"
    ],
    "weapon": "Hacha",
    "roles": [
     "tanque",
     "golpe"
    ],
    "when": [
     {
      "lacks_role": "tanque"
     }
    ],
    "why": "Soldado acorazado (Contra mayor) y Hoplita (Def +30, Contra precisa). Esta ruta da muchos combates para dominar maestrías en armadura.",
    "why_en": "Armored Knight (Great Counter) and Dreadnought (Def +30, Focused Counter). This route has many fights to master classes in armor.",
    "fits": "Si falta tanque.",
    "fits_en": "If you lack a tank.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Tanque de suerte",
    "name_en": "Luck tank",
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
    "why": "Por los pelos le deja a 1 PV ante un golpe letal con probabilidad igual a su Sue (50 %). Hoplita da Def 70 y su maestra Suerte protectora.",
    "why_en": "Close Call leaves him at 1 HP against a lethal hit with a chance equal to his Lck (50 %). Dreadnought gives Def 70 and its mastery Luck Fend.",
    "fits": "Si falta tanque.",
    "fits_en": "If you lack a tank.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-paladin",
    "name": "Paladín bau indestructible",
    "name_en": "Unbreakable Bau Lord",
    "path": [
     "Catafracto",
     "Paladín bau"
    ],
    "weapon": "Hacha",
    "roles": [
     "tanque"
    ],
    "when": [],
    "why": "Soldado acorazado y Catafracto (Pavés) para subir Coraza hasta su habilidad de mitad de daño, y Paladín bau. Su personal sobrevive a un golpe letal (prob. Sue); con la Bendición de Aurora los golpes quedan en 1-2. Hacha de Da Mina y Martillo.",
    "why_en": "Armored Soldier and Cataphract (Pavise) to raise Armor until its half-damage skill, then Bau Lord. His personal survives a lethal hit (Lck chance); with Aurora's blessing hits drop to 1-2. Da Mina Axe and Hammer.",
    "fits": "Si hay curación y quieres un pegador que coma golpes.",
    "fits_en": "If you have healing and want a hitter who soaks blows.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-batallador",
    "name": "Batallador",
    "name_en": "Battlemaster",
    "path": [
     "Guerrero",
     "Batallador"
    ],
    "weapon": "Hacha",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Forajido, Guerrero y Batallador: coincide con su autonivel.",
    "why_en": "Brigand, Warrior and Battlemaster: matches his autolevel.",
    "fits": "Si quieres más daño.",
    "fits_en": "If you want more damage.",
    "parts": [
     2,
     3
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
    ],
    "parts": [
     0,
     1
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
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "tirador",
    "name": "Arquero venenoso",
    "name_en": "Poison Sniper",
    "path": [
     "Cazador",
     "Arquero",
     "Tirador"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero"
    ],
    "when": [],
    "why": "Despotismo suma +3 ataque y +10 crítico contra enemigos con estado alterado: con Arco venenoso lo activa él mismo. Vel 55 y Fue 40 con poca inversión.",
    "why_en": "Despotism adds +3 attack and +10 crit against enemies with a status ailment: a Poison Bow triggers it himself. Spd 55 and Str 40 with little investment.",
    "fits": "Si llevas venenos o alguien que cause estados.",
    "fits_en": "If you bring poison or someone who inflicts ailments.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "when": [],
    "why": "Arquero (Crescendo) y Tirador (Hab +20, Puntería). Fue 40 y Vel 55 son raras en un arquero. Despotismo da Ata +3 y Crí +10 si el enemigo tiene un estado alterado: dale armas con veneno.",
    "why_en": "Archer (Crescendo) and Sniper (Dex +20, Marksmanship). Str 40 and Spd 55 are rare for an archer. His personal skill gives Atk +3 and Crit +10 against enemies with a status ailment: give him poison weapons.",
    "fits": "Casi siempre: es el único arquero barato de la ruta (apoyo 1, prestigio 4).",
    "fits_en": "Almost always: the route's only cheap archer (support 1, renown 4).",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "jinete",
    "name": "Jinete arquero",
    "name_en": "Forest Knight",
    "path": [
     "Cazador",
     "Arquero",
     "Jinete arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Jinete arquero (maestra Ojo de caza) le da movimiento. Necesita Equitación D.",
    "why_en": "Forest Knight (mastery Hunter's Eye) gives him movement. Needs Riding D.",
    "fits": "Si quieres más movimiento que daño.",
    "fits_en": "If you want movement more than damage.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "rastreador",
    "name": "Rastreador",
    "name_en": "Ranger",
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
    "why": "Pícaro y Rastreador (Hab, Vel y Sue +15; maestra Contratiro). Se abre con la misión «Duelo de Temerario: Oko».",
    "why_en": "Rogue and Ranger (Dex, Spd and Lck +15; mastery Countershot). Unlocked by the quest «Daredevil Duel: Oko».",
    "fits": "Si quieres que aguante la fase enemiga.",
    "fits_en": "If you want him to hold up in the enemy phase.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "tirador",
    "name": "Tirador venenoso",
    "name_en": "Poison Sniper",
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
    "why": "Despotismo suma +3 ataque y +10 Crí contra enemigos con estado alterado: arco venenoso. Prestigio 10 lo hace casi inalcanzable aquí.",
    "why_en": "Tyranny adds +3 attack and +10 crit against enemies with a status ailment: poison bow. Renown 10 makes him nearly unreachable here.",
    "fits": "Solo si falta arquero al final.",
    "fits_en": "Only if you lack an archer at the end.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-buscasombras",
    "name": "Buscasombras con veneno",
    "name_en": "Poison Shadow Seeker",
    "path": [
     "Rastreador",
     "Buscasombras"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "esquiva"
    ],
    "when": [
     {
      "has": "PID_ファビオ"
     }
    ],
    "why": "Rastreador (Contratiro) y Buscasombras (Filo sombrío). Su personal da Ata +3 y Crí +10 contra enemigos con estado alterado: arco con veneno.",
    "why_en": "Ranger (Countershot) into Shadow Seeker (Dropshadow Blade). His personal gives Atk +3 and Crit +10 against enemies with a status ailment: poison bow.",
    "fits": "Si el equipo pone estados (Fabio, venenos). Res 15: cuidado con los magos.",
    "fits_en": "If the team inflicts ailments (Fabio, poison). Res 15: beware of mages.",
    "parts": [
     2,
     3
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
    "why": "Arquera consumada le da +3 Fue con arco. Arquero por Crescendo y luego Tirador. Merece la pena reclutarla aunque llegue tarde.",
    "why_en": "Skilled Archer gives +3 Str with bows. Archer for Crescendo, then Sniper. Worth recruiting even though she comes late.",
    "fits": "Si falta arquero.",
    "fits_en": "If you lack an archer.",
    "routes": [
     "leda"
    ],
    "parts": [
     0,
     1
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
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "tiradora",
    "name": "Tiradora de Fuerza",
    "name_en": "Strength Sniper",
    "path": [
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
    "why": "Fue 50 y Arquera consumada (+3 Fue con arco): la arquera de más Fue. Tirador da Hab +20 para su Hab 40. Llega tarde (cap. 7, 6000 G).",
    "why_en": "Str 50 and Skilled Archer (+3 Str with bows): the archer with the most Str. Sniper gives Dex +20 for her Dex 40. She comes late (ch. 7, 6000 G).",
    "fits": "Si falta arquero.",
    "fits_en": "If you lack an archer.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "when": [],
    "why": "Fue 50, la más alta de las arqueras, y Arquera consumada suma Fue +3 con arco. Arquero y Tirador le dan la Hab y la Vel que le faltan. Perforación suma Ata y Crí en técnicas de arco.",
    "why_en": "Str 50, the highest among archers, and her personal skill adds Str +3 with bows. Archer and Sniper give the Dex and Spd she lacks. Another skill adds Atk and Crit on bow arts.",
    "fits": "Si falta arquero: esta ruta no trae ninguno.",
    "fits_en": "If you lack an archer: this route has none at the start.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "rastreadora",
    "name": "Rastreadora",
    "name_en": "Ranger",
    "path": [
     "Cazador",
     "Arquero",
     "Rastreador"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "esquiva"
    ],
    "when": [],
    "why": "Rastreador (Hab y Vel +15, Contratiro) tras la misión de Oko.",
    "why_en": "Ranger (Dex and Spd +15, Countershot) after the Oko quest.",
    "fits": "Si quieres que aguante la fase enemiga.",
    "fits_en": "If you want her to hold up in the enemy phase.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "why": "Arquera consumada da +3 Fue con arco y Perforación +4 ataque y +10 Crí con técnicas de arco. Crescendo de Arquero tapa su Hab. No pide apoyo: 4000 G y prestigio 9 (cap. 12).",
    "why_en": "Heavy-Bow User gives +3 Str with bows and Pierce +4 attack and +10 crit with bow arts. Archer's Crescendo covers her Dex. She needs no support: 4000 G and renown 9 (ch. 12).",
    "fits": "Si falta arquero de daño y tienes el oro.",
    "fits_en": "If you lack a damage archer and have the gold.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-maestro",
    "name": "Maestra arquera",
    "name_en": "Bow Adept",
    "path": [
     "Tirador",
     "Maestro arquero"
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
    "why": "Tirador (Puntería, Gol +15) y Maestro arquero (Caza aérea, Gol +50 contra voladores). Su personal da Fue +3 con arco y crece Fue 50: hasta 55 de daño con arco. Crescendo desde Arquero.",
    "why_en": "Sniper (Marksmanship, Hit +15) into Bow Adept (Sky Hunter, Hit +50 vs fliers). Her personal gives Str +3 with bows and her Str growth is 50: up to 55 damage with a bow. Crescendo from Archer.",
    "fits": "Si faltan arqueros fuertes.",
    "fits_en": "If you lack strong archers.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-caballeroarco",
    "name": "Caballero arco",
    "name_en": "Bow Knight",
    "path": [
     "Jinete arquero",
     "Caballero arco"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Pícaro y Rastreador suben su Vel y Hab flojas; luego Caballero arco con Caballo negro. La Calamidad también le sirve si queda libre.",
    "why_en": "Thief and Ranger raise her weak Spd and Dex; then Bow Knight on a black horse. The Calamity also suits her if it is free.",
    "fits": "Si quieres movilidad.",
    "fits_en": "If you want mobility.",
    "parts": [
     2,
     3
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
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "obispa",
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
    "why": "Sanación remota le suma +1 de alcance al curar (nv 20) y +2 (nv 35), y cura 10 PV más. Llega tarde (prestigio 9): rinde sobre todo en la Parte 2.",
    "why_en": "Remote Healing adds +1 healing range (lv 20) and +2 (lv 35), and she heals 10 HP more. She comes late (renown 9): she shines mostly in Part 2.",
    "fits": "Si quieres liberar a Tialla o el capítulo 12 te separa del grupo.",
    "fits_en": "If you want to free Tialla or chapter 12 splits the party.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "sanadora",
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
    "why": "Conocimiento sanador suma +10 PV al curar y Sanación remota +1 de alcance (nv 20) y +2 (nv 35). Una de las mejores curanderas, pero llega con prestigio 9.",
    "why_en": "Her personal skill adds +10 HP to heals and another adds +1 healing range (lv 20) and +2 (lv 35). One of the best healers, but she needs renown 9.",
    "fits": "Como segunda curandera en los últimos capítulos.",
    "fits_en": "As a second healer in the last chapters.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "obispa",
    "name": "Obispa de largo alcance",
    "name_en": "Long-range Bishop",
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
    "why": "Obispo duplica los usos de magia blanca y le da Mag 60 y Res 60 de crecimiento. Sanación remota suma +1 de alcance al curar (nv 20) y +2 (nv 35), y Conocimiento sanador +10 PV. Siete fuentes la ven imprescindible. Lleva un batallón de ataque físico o de curación.",
    "why_en": "Bishop doubles her white magic uses and gives Mag 60 and Res 60 growths. Distant Healing adds +1 healing range (lv 20) and +2 (lv 35), and Healing Knowledge +10 HP. Seven sources call her essential. Give her a physical attack or healing battalion.",
    "fits": "Siempre: es la mejor sanadora de la ruta.",
    "fits_en": "Always: she is the best healer in this route.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "vate",
    "name": "Maga que también cura",
    "name_en": "Mage who also heals",
    "path": [
     "Augur",
     "Chamán",
     "Vate"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago",
     "sanador"
    ],
    "when": [
     {
      "has": "PID_ニネ"
     }
    ],
    "why": "Llega tan pronto en esta ruta que puede ir de Chamán y Vate (Mag 65, Res 55 de crecimiento) y defenderse sola sin dejar de curar. Pierde los usos extra de Obispo.",
    "why_en": "She joins so early in this route that she can go Shaman and Ovate (Mag 65, Res 55 growths) and fend for herself while still healing. She loses the Bishop's extra uses.",
    "fits": "Si hay otra sanadora (Ninae de Guardiana) y falta daño mágico.",
    "fits_en": "If another healer is around (Ninae as Guardian) and you lack magic damage.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-docto",
    "name": "Sanadora a distancia",
    "name_en": "Ranged healer",
    "path": [
     "Obispo",
     "Docto"
    ],
    "weapon": "Magia blanca",
    "roles": [
     "sanador"
    ],
    "when": [],
    "why": "Sacerdote, Obispo y Docto: +10 PV por curación (+20 con Bastón de sanación) y hasta +3 de alcance con su personal de nivel 35. La mejor sanadora del juego.",
    "why_en": "Priest, Bishop and Wiseman: +10 HP per heal (+20 with a healing staff) and up to +3 range with her level-35 personal. The best healer in the game.",
    "fits": "Casi siempre.",
    "fits_en": "Almost always.",
    "parts": [
     2,
     3
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
    ],
    "parts": [
     0,
     1
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
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "why": "Mag 55 y Res 45; Don de la luz cura sin gastar usos (probabilidad = Suerte 25).",
    "why_en": "Mag 55 and Res 45; her personal heals without spending uses (chance = Luck 25).",
    "fits": "Si necesitas otra curandera o maga.",
    "fits_en": "If you need another healer or mage.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "maga",
    "name": "Maga",
    "name_en": "Mage",
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
    "why": "Mag 55, la más alta. Chamán (Mag +15) y Vate, con Ángeles contra no muertos. Def 20.",
    "why_en": "Mag 55, the highest. Shaman (Mag +15) and Ovate, with Seraphim against undead. Def 20.",
    "fits": "Si falta un segundo mago.",
    "fits_en": "If you lack a second mage.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "why": "Don de la luz puede curar sin gastar usos y Don de la fe suma +20 PV.",
    "why_en": "Her personal skills can heal without spending uses and add +20 HP.",
    "fits": "Si falta curandera.",
    "fits_en": "If you lack a healer.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "why": "Don de la luz: curar no gasta usos. Sin Física. Aquí no compensa (prestigio 9).",
    "why_en": "Graceful Light: healing costs no uses. No Physic. Not worth it here (renown 9).",
    "fits": "Solo si Sofia no basta.",
    "fits_en": "Only if Sofia is not enough.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-valquiria",
    "name": "Valquiria sanadora",
    "name_en": "Healer Valkyrium",
    "path": [
     "Vate",
     "Valquiria"
    ],
    "weapon": "Magia blanca",
    "roles": [
     "sanador",
     "mago"
    ],
    "when": [
     {
      "lacks_role": "sanador"
     }
    ],
    "why": "La mejor Mag del juego (55 %). Valquiria usa las dos magias a caballo y deja Mantra de paz (Res +2 al alcance). Su personal cura sin gastar usos.",
    "why_en": "The best Mag in the game (55 %). Valkyrium uses both magics on horseback and leaves Song of Calm (Res +2 in range). Her personal heals without using charges.",
    "fits": "Si falta sanación de Mag alta.",
    "fits_en": "If you lack high-Mag healing.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-docto",
    "name": "Docto",
    "name_en": "Wiseman",
    "path": [
     "Obispo",
     "Docto"
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
    "why": "Sacerdote, Obispo y Docto: solo magia blanca.",
    "why_en": "Priest, Bishop and Wiseman: white magic only.",
    "fits": "Si falta sanadora.",
    "fits_en": "If you lack a healer.",
    "parts": [
     2,
     3
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
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "vate",
    "name": "Maga de apoyo",
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
    "why": "Dirección escénica da Esq +10 a los aliados en 2 casillas (probabilidad = Car del aliado ÷ 2) y luego Gol +10 y Crí +10. Muy cara: prestigio 10 y 8000 G.",
    "why_en": "Her personal gives allies within 2 tiles Avo +10 (chance = the ally's Cha ÷ 2), later Hit +10 and Crit +10. Very costly: renown 10 and 8000 G.",
    "fits": "Equipo de magos o de críticos.",
    "fits_en": "Mage or crit teams.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "vate",
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
    "why": "Chamán y Vate (Mag +20). Dirección escénica puede dar Evit +10 a los aliados a 2 casillas, con probabilidad ligada a su Car; a nv 20 añade Gol +10 y a nv 35 Crí +10. Def 20: cuidado con voladores y jinetes. Cuesta 8000 G.",
    "why_en": "Shaman and Ovate (Mag +20). His personal skill can give allies within 2 tiles Ddg +10, with a chance based on their Cha; at lv 20 it adds Hit +10 and at lv 35 Crit +10. Def 20: beware of fliers and riders. Costs 8000 G.",
    "fits": "Si juntas un bloque compacto de aliados con Car alta (Dietrich tiene Car 60). Si no, sobra.",
    "fits_en": "If you keep a tight block of high-Cha allies (Dietrich has Cha 60). Otherwise skip him.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "vate",
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
    "why": "Dirección escénica da +10 Esq a aliados a 2 casillas con probabilidad igual a la mitad de su Car (+10 Gol a nv 20, +10 Crí a nv 35): rinde más junto a Theodora, Ultand o Alexandra (Car 50). Frágil (Def 20): un batallón que inmovilice protege. Cuesta 8000 G.",
    "why_en": "Stage Directions gives allies within 2 tiles +10 avoid with a chance equal to half their Cha (+10 hit at lv 20, +10 crit at lv 35): best next to Theodora, Ultand or Alexandra (Cha 50). Fragile (Def 20): an immobilizing battalion protects her. Costs 8000 G.",
    "fits": "Si hay 8000 G y unidades de Car alto.",
    "fits_en": "If you have 8000 G and high-Cha units.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-druida",
    "name": "Mago de apoyo al crítico",
    "name_en": "Crit support mage",
    "path": [
     "Vate",
     "Druida"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago"
    ],
    "when": [
     {
      "has": "PID_ディートリヒ"
     },
     {
      "has": "PID_オリンピア"
     }
    ],
    "why": "Vate (Velocidad contenida) y Druida (Resistencia contenida, Mag +30) con Trueno y Thoron. Su personal de nivel 35 da Gol y Crí +10 a los de al lado. Def 20: que no reciba golpes.",
    "why_en": "Ovate (Bind Speed) into Druid (Bind Resistance, Mag +30) with Thunder and Thoron. His level-35 personal gives adjacent allies Hit and Crit +10. Def 20: keep him out of reach.",
    "fits": "Equipo de críticos con Dietrich u Olympia.",
    "fits_en": "Crit team with Dietrich or Olympia.",
    "parts": [
     2,
     3
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
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "baus",
    "name": "Jinete de baus con hacha",
    "name_en": "Axe Dragoon",
    "path": [
     "Gladiador",
     "Jin. ornius acorazado",
     "Jinete de baus"
    ],
    "weapon": "Hacha",
    "roles": [
     "volador"
    ],
    "when": [],
    "why": "Hab 60 y +10 de golpe con hacha tapan la imprecisión del hacha; montado arregla su Vel 35.",
    "why_en": "Dex 60 and +10 hit with axes fix the axe's inaccuracy; riding fixes his Spd 35.",
    "fits": "Solo si te faltan físicos.",
    "fits_en": "Only if you lack physical units.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrero",
    "name": "Guerrero de hacha",
    "name_en": "Axe warrior",
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
    "why": "Hab 60 y Hacha afilada (Gol +10 con hacha), pero Fue 30.",
    "why_en": "Dex 60 and Hit +10 with axes, but Str 30.",
    "fits": "Solo si te faltan físicos.",
    "fits_en": "Only if you lack physical units.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrero",
    "name": "Guerrero de hacha",
    "name_en": "Axe Warrior",
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
    "why": "Hacha afilada (+10 Gol) y Golpe bajo (+20 Gol, +3 ataque contra enemigos a la mitad de PV). Hab 60 buena y Fue 30 floja: Forajido la arregla. Cuesta apoyo 1, prestigio 4 y 10 G si regateas.",
    "why_en": "Hatchet Man (+10 hit) and Vulgar Conduct (+20 hit, +3 attack against enemies at half HP). Good Dex 60 and weak Str 30: Brigand fixes it. Costs support 1, renown 4 and 10 G if you haggle.",
    "fits": "Si te falta un pegador barato pronto.",
    "fits_en": "If you need a cheap early hitter.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guardian",
    "name": "Guardián con Fortalecer",
    "name_en": "Guardian with Fortify",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Guardián"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque",
     "sanador"
    ],
    "when": [
     {
      "lacks_role": "sanador"
     }
    ],
    "why": "Fortalecer lo vuelve el único curador al alcance de un recluta 1/4: Guardián barato.",
    "why_en": "Fortify makes him the only healer available from a 1/4 recruit: a cheap Guardian.",
    "fits": "Si falta curación.",
    "fits_en": "If you lack healing.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-batallador",
    "name": "Batallador",
    "name_en": "Battlemaster",
    "path": [
     "Guerrero",
     "Batallador"
    ],
    "weapon": "Hacha",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Técnica entrenada y Golpe maestro; Hab 60 pero Fue 30, así que el hacha no le sienta bien.",
    "why_en": "Practiced Art and War Master's Strike; Dex 60 but Str 30, so the axe does not suit him well.",
    "fits": "Solo de relleno.",
    "fits_en": "Only as filler.",
    "parts": [
     2,
     3
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
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "cuadriguero",
    "name": "Cuadriguero de fase enemiga",
    "name_en": "Enemy-phase Charioteer",
    "path": [
     "Cazador",
     "Cuadriguero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Todo a una carta y A plena potencia funcionan en la Carga y con arcos que el enemigo no puede contestar. Con Caballo de Ferganá doblado.",
    "why_en": "His personals work with Charge and with bows the enemy cannot answer. Use a doubled Ferghana Horse.",
    "fits": "Si ya tienes tanque y buscas daño montado.",
    "fits_en": "If you already have a tank and want mounted damage.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Hoplita de golpe fuerte",
    "name_en": "Heavy-hitting dreadnought",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Hoplita"
    ],
    "weapon": "Hacha",
    "roles": [
     "tanque",
     "golpe"
    ],
    "when": [],
    "why": "A plena potencia puede multiplicar el daño por 1,3 (×1,5 a nv 35). Soldado acorazado y Hoplita con hacha.",
    "why_en": "His personal skill can multiply damage by 1.3 (×1.5 at lv 35). Armored Knight and Dreadnought with an axe.",
    "fits": "Si falta tanque; llega tarde (prestigio 10).",
    "fits_en": "If you lack a tank; he comes late (renown 10).",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrero",
    "name": "Guerrero de hacha",
    "name_en": "Axe warrior",
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
    "why": "Forajido y Guerrero (Fue +20).",
    "why_en": "Brigand and Warrior (Str +20).",
    "fits": "Si ya tienes tanque.",
    "fits_en": "If you already have a tank.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Hoplita",
    "name_en": "Dreadnought",
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
    "why": "Segundo tanque barato (apoyo 2, prestigio 5): PV 65 y Fue 70 de crecimiento; Todo a una carta pega muy fuerte. Muchos no lo usan.",
    "why_en": "Cheap second tank (support 2, renown 5): HP 65 and Str 70 growths; One Chance hits very hard. Many players skip him.",
    "fits": "Si Tobias no hace de tanque.",
    "fits_en": "If Tobias is not tanking.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-batallador",
    "name": "Batallador de todo o nada",
    "name_en": "All-in Battlemaster",
    "path": [
     "Guerrero",
     "Batallador"
    ],
    "weapon": "Hacha",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Golpe maestro (×1,5) se suma a su personal (×1,3, ×1,5 a nivel 35). Hacha mejor que lanza.",
    "why_en": "War Master's Strike (×1.5) stacks with his personal (×1.3, ×1.5 at level 35). Axe over lance.",
    "fits": "Solo si falta daño pesado.",
    "fits_en": "Only if you lack heavy damage.",
    "parts": [
     2,
     3
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
    ],
    "parts": [
     0,
     1
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
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "alaceleste",
    "name": "Ala Celeste esquiva",
    "name_en": "Evasive Wing Soldier",
    "path": [
     "Gladiador",
     "Ala Celeste"
    ],
    "weapon": "Espada",
    "roles": [
     "volador",
     "esquiva"
    ],
    "when": [
     {
      "lacks": "PID_アレキサンドラ"
     }
    ],
    "why": "Inalterable (+10 esquiva con más de la mitad de PV) y En plena forma (+3 ataque a PV completos). Rinde más con una montura rara como el Pegaso oscuro y la Espada de levin.",
    "why_en": "Unshaken (+10 avoid above half HP) and In Top Form (+3 attack at full HP). Better with a rare mount such as the dark Pegasus and a Levin Sword.",
    "fits": "Si no está Alexandra: hacen el mismo papel.",
    "fits_en": "If Alexandra is out: they fill the same role.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Espadachina esquiva",
    "name_en": "Evasive swordswoman",
    "path": [
     "Gladiador",
     "Mirmidón",
     "Shido"
    ],
    "weapon": "Espada",
    "roles": [
     "esquiva",
     "golpe"
    ],
    "when": [],
    "why": "Vel 55. Inalterable da Esq +10 con media vida o más. Su Fue 35 limita el daño.",
    "why_en": "Spd 55. Her personal skill gives Avo +10 at half HP or more. Her Str 35 limits damage.",
    "fits": "Si necesitas esquiva barata.",
    "fits_en": "If you need cheap evasion.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "alaceleste",
    "name": "Ala Celeste esquiva",
    "name_en": "Evasive Wing Soldier",
    "path": [
     "Jinete de ornius",
     "Ala Celeste"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador",
     "esquiva",
     "montado"
    ],
    "when": [
     {
      "lacks_role": "volador"
     }
    ],
    "why": "Inalterable (+10 Esq con más de la mitad de PV) y En plena forma (+3 ataque a PV completos) con Vel 55. Va montado: en esta ruta los montados no pueden llevar batallón. Cuesta prestigio 5: llega pronto.",
    "why_en": "Steadfast (+10 avoid above half HP) and Peak Form (+3 attack at full HP) with Spd 55. Mounted: in this route mounted units cannot take a battalion. She costs renown 5: she comes early.",
    "fits": "Si falta volador al principio.",
    "fits_en": "If you lack an early flier.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrera",
    "name": "Forajida con Espada trueno",
    "name_en": "Brigand with Levin Sword",
    "path": [
     "Gladiador",
     "Forajido",
     "Guerrero"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Su Fue y su Mag son 35 %: Forajido sube la Fue y la Espada trueno usa la Mag. Va a pie y lleva batallón.",
    "why_en": "Her Str and Mag growths are 35 %: Brigand raises Str and the Levin Sword uses Mag. On foot, she takes a battalion.",
    "fits": "Si ya tienes volador.",
    "fits_en": "If you already have a flier.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-celeste",
    "name": "Jinete celeste esquiva",
    "name_en": "Evasive Celestial Trooper",
    "path": [
     "Jinete de baus",
     "Jinete celeste"
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
    "why": "Jinete de baus y Jinete celeste (Reflejos relámpago) con Espada trueno, que mata blindados de un golpe. Sus personales dan Esq +10 con más de la mitad de PV y +10 más a PV completos.",
    "why_en": "Dragoon into Celestial Trooper (Lightning Reflexes) with a Levin Sword, which one-shots armor. Her personals give Avoid +10 above half HP and +10 more at full HP.",
    "fits": "Si falta volador.",
    "fits_en": "If you lack a flier.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-espadachin",
    "name": "Espadachín",
    "name_en": "Swordmaster",
    "path": [
     "Shido",
     "Espadachín"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [],
    "why": "Mirmidón, Shido (Siempre alerta) y Espadachín (Fobos).",
    "why_en": "Myrmidon, Shido (Ever Vigilant) and Swordmaster (Astra).",
    "fits": "Si ya tienes volador.",
    "fits_en": "If you already have a flier.",
    "parts": [
     2,
     3
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
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Hoplita de contraataque",
    "name_en": "Counter Dreadnought",
    "path": [
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
    "why": "Contra experta y Contra furiosa con Contra mayor y Contra precisa: Gol +30 y Ata +6 cuando la atacan primero.",
    "why_en": "Expert Counter and Furious Counter with Greater Counter and Precise Counter: Hit +30 and Atk +6 when attacked first.",
    "fits": "Si no tienes a Majide ni a Goliath (con Esmeralda, sobra).",
    "fits_en": "If you have neither Majide nor Goliath (with Esmeralda, skip her).",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Hoplita de contraataque",
    "name_en": "Counter dreadnought",
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
      "lacks": "PID_ゴライアス"
     },
     {
      "lacks": "PID_バッカニア"
     }
    ],
    "why": "Contra experta (Gol +20) y Contra furiosa (Ata +3) cuando la atacan, con Contra mayor y Contra precisa.",
    "why_en": "Her personal skills give Hit +20 and Atk +3 when attacked, with Great Counter and Focused Counter.",
    "fits": "Si falta acorazado y no tienes a Goliath ni a Buccar.",
    "fits_en": "If you lack an armored unit and have neither Goliath nor Buccar.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Hoplita de contraataque",
    "name_en": "Counter Dreadnought",
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
    "why": "Contra experta (+20 Gol en fase enemiga) y Contra furiosa (+3 ataque) castigan a quien la ataca.",
    "why_en": "Expert Counter (+20 hit on enemy phase) and Raging Counter (+3 attack) punish attackers.",
    "fits": "Si falta tanque y no está Buccar.",
    "fits_en": "If you lack a tank and Buccar is out.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-bastion",
    "name": "Caballero bastión de contraataque",
    "name_en": "Counter Castle Knight",
    "path": [
     "Hoplita",
     "Caballero bastión"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque"
    ],
    "when": [
     {
      "lacks": "PID_バッカニア"
     }
    ],
    "why": "Sus personales dan Gol +20 y Ata +3 si el enemigo ataca primero; con Bloqueo dobla siempre en fase enemiga.",
    "why_en": "Her personals give Hit +20 and Atk +3 when the enemy attacks first; with Intercept she always doubles on the enemy phase.",
    "fits": "Sin Buccar o si falta tanque.",
    "fits_en": "Without Buccar or if you lack a tank.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_カイ": [
   {
    "id": "caladrio",
    "name": "Caladrio mixto con Espada de levin",
    "name_en": "Mixed Caladrius with Levin Sword",
    "path": [
     "Jinete de ornius",
     "Chamán",
     "Caladrio"
    ],
    "weapon": "Magia negra",
    "roles": [
     "montado",
     "mago",
     "golpe"
    ],
    "when": [],
    "why": "Caladrio solo existe en esta ruta y usa lanza, espada y magia negra; Cai tiene Fue 45 y Mag 40, y sus Llamas del inframundo escalan con Mag. Con Magonius negro llega a Mag 60 y Vel 65 de crecimiento. Chamán entrena la Magia negra B que pide Caladrio; luego pega con lanza o Espada de levin.",
    "why_en": "Caladrius exists only on this route and uses lances, swords and black magic; Cai has Str 45 and Mag 40, and his Netherworld Flames scale with Mag. With a black Magonius he reaches Mag 60 and Spd 65 growth. Shaman trains the Black Magic B that Caladrius needs; then he hits with lances or a Levin Sword.",
    "fits": "Casi siempre: es el señor y el mejor limpiador de áreas de la ruta. A nivel 35, Guardián de la llama deja al equipo recibir la mitad de daño dentro del fuego.",
    "fits_en": "Almost always: he is the lord and the route's best area clearer. At level 35 his flame skill halves the damage allies take inside the fire.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "bardado",
    "name": "Jinete bardado defensivo",
    "name_en": "Defensive Bardinger",
    "path": [
     "Jinete de ornius",
     "Jinete ligero",
     "Jinete bardado"
    ],
    "weapon": "Lanza",
    "roles": [
     "montado",
     "tanque"
    ],
    "when": [
     {
      "lacks_role": "tanque"
     }
    ],
    "why": "Es la línea de autonivel del juego: Jinete bardado da Res +10 y su maestra Égida reduce el daño mágico a la mitad el 20 % de las veces. Es la opción más defensiva para mapas con magos.",
    "why_en": "It is the game's own autolevel line: Bardinger gives Res +10 and its mastery Aegis halves magic damage 20 % of the time. The most defensive option for maps with mages.",
    "fits": "Si el equipo no tiene tanque o el capítulo trae muchos magos.",
    "fits_en": "If the team has no tank or the chapter brings many mages.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "baus",
    "name": "Jinete de baus ofensivo",
    "name_en": "Offensive Dragoon",
    "path": [
     "Jinete de ornius",
     "Jin. ornius acorazado",
     "Jinete de baus"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador",
     "golpe"
    ],
    "when": [],
    "why": "El mayor daño físico de Cai: vuela sobre el terreno y Asedio da Gol +20 contra enemigos en terreno favorable. Es débil a flechas y a la magia de viento.",
    "why_en": "Cai's highest physical damage: he flies over terrain and Siege gives Hit +20 against enemies on favourable terrain. Weak to arrows and wind magic.",
    "fits": "Si Peter o Nuzzuo ya limpian a los arqueros enemigos.",
    "fits_en": "If Peter or Nuzzuo already clear the enemy archers.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-cabalgador",
    "name": "El Cabalgador",
    "name_en": "The Cavalier",
    "path": [
     "Jinete bardado",
     "Auricalcado",
     "El Cabalgador"
    ],
    "weapon": "Lanza",
    "roles": [
     "montado"
    ],
    "when": [],
    "why": "Auricalcado deja Lanza feroz; El Cabalgador da Mov 8, montura inmune a la eficacia contra caballería y Destreza bendita (Hab +10). Con Brío+, Coraza ágil+ y montura suma +6 Mov en Supraignición. Lanza Estelar y Espada trueno.",
    "why_en": "Orichaldia leaves Fierce Spear; The Cavalier gives Mov 8, a mount immune to anti-cavalry effectiveness and Divine Dexterity (Dex +10). With movement skills and a mount he gets +6 Mov in overblaze. Star Spear and Levin Sword.",
    "fits": "Casi siempre: su movimiento rompe los portales del mapa final, donde hay que destruir dos en el mismo turno.",
    "fits_en": "Almost always: his movement breaks the final map's portals, where two must fall on the same turn.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ノクチュラ": [
   {
    "id": "pugil",
    "name": "Púgil de esquiva",
    "name_en": "Evasive brawler",
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
    "why": "La recluta más barata (apoyo 1, prestigio 4) y de las más fuertes: Lucidez guerrera suma Esq +3 tras cada combate y la IA le pega igual, así que hace de cebo. Púgil da Def +10 y Vel +10; los guanteletes arrojadizos alcanzan a los magos. Guerrero es su techo en la Parte 1.",
    "why_en": "The cheapest recruit (support 1, renown 4) and one of the strongest: her evasion skill adds Avo +3 after each fight while the AI keeps attacking her, so she works as bait. Pugilist gives Def +10 and Spd +10; thrown gauntlets reach mages. Warrior is her Part 1 ceiling.",
    "fits": "Casi siempre, pero lejos de los magos: Res 20.",
    "fits_en": "Almost always, but away from mages: Res 20.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "pugil",
    "name": "Púgil de esquiva",
    "name_en": "Evasive pugilist",
    "path": [
     "Gladiador",
     "Púgil",
     "Guerrero"
    ],
    "weapon": "Guanteletes",
    "roles": [
     "esquiva",
     "golpe"
    ],
    "when": [],
    "why": "Lucidez guerrera le da Esq +3 tras cada combate y Meditación puede sumar +10. Púgil (Vel +10, maestra Ataque y retirada) y Guerrero (PV +20, Fue +20). Una parada en Pícaro sin subir deja Desde las sombras. Si se recluta con el equipo a nv 20 o más, trae la Garra derecha de Ursa.",
    "why_en": "Her personal skill gives Avo +3 after each fight and can add +10 more. Pugilist (Spd +10, mastery Attack, Get Back) and Warrior (HP +20, Str +20). A stop at Rogue without levelling leaves In Shadow. Recruited with the team at lv 20+, she brings Ursa's Right Claw.",
    "fits": "Casi siempre: es la recluta barata y temprana que más fuentes ponen arriba. No la expongas a magos (Res 20).",
    "fits_en": "Almost always: the cheap early recruit most sources rate highest. Keep her away from mages (Res 20).",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "picara",
    "name": "Esquivadora con espada",
    "name_en": "Evasive swordswoman",
    "path": [
     "Gladiador",
     "Pícaro",
     "Shido"
    ],
    "weapon": "Espada",
    "roles": [
     "esquiva",
     "golpe"
    ],
    "when": [],
    "why": "Pícaro (Vel +15, Desde las sombras) y Shido (Vel +15, Siempre alerta) para esquivar con espada.",
    "why_en": "Rogue (Spd +15, In Shadow) and Shido (Spd +15, Ever Vigilant) to dodge with a sword.",
    "fits": "Si ya tienes otra unidad de puños.",
    "fits_en": "If you already have another gauntlet unit.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrera",
    "name": "Tanque de esquiva con puños",
    "name_en": "Fist dodge tank",
    "path": [
     "Gladiador",
     "Púgil",
     "Guerrero"
    ],
    "weapon": "Guanteletes",
    "roles": [
     "esquiva",
     "tanque",
     "golpe"
    ],
    "when": [],
    "why": "Lucidez guerrera suma +3 Esq tras cada combate, y Púgil añade esquiva con las técnicas de puños. En Guerrero queda PV 70 y Fue 65 de crecimiento. Es el único tanque de esquiva del equipo y cuesta apoyo 1, prestigio 3. Pasar por Pícaro da En la sombra (+10 Esq tras matar).",
    "why_en": "Warrior's Clarity adds +3 avoid after each fight, and Pugilist adds avoid with fist arts. As a Warrior she has HP 70 and Str 65 growths. She is the team's only dodge tank and costs support 1, renown 3. A detour through Rogue gives +10 avoid after a kill.",
    "fits": "Casi siempre; ojo con los magos, su Res es 20.",
    "fits_en": "Almost always; watch out for mages, her Res is 20.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Espadachina",
    "name_en": "Swordswoman",
    "path": [
     "Gladiador",
     "Mirmidón",
     "Shido"
    ],
    "weapon": "Espada",
    "roles": [
     "esquiva",
     "golpe"
    ],
    "when": [],
    "why": "Shido (Vel 60 de crecimiento) y Técnica devastadora de Mirmidón, aunque la espada no es su punto fuerte.",
    "why_en": "Shido (Spd 60 growth) and Myrmidon's Ravaging Arts, though swords are not her strength.",
    "fits": "Si ya tienes otra luchadora de puños (Mu).",
    "fits_en": "If you already have another fist fighter (Mu).",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-batallador",
    "name": "Batallador con puños",
    "name_en": "Fist Battlemaster",
    "path": [
     "Guerrero",
     "Batallador"
    ],
    "weapon": "Guanteletes",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [],
    "why": "Púgil, Guerrero (Técnica entrenada) y Batallador (Golpe maestro) con guanteletes y Martillo contra blindados; su personal suma Esq +3 tras cada combate. Monje soldado y La Mano Divina también le sientan, pero piden guanteletes y magia blanca a la vez.",
    "why_en": "Brawler, Warrior (Practiced Art) and Battlemaster (War Master's Strike) with gauntlets and a Hammer for armor; her personal adds Avoid +3 after each fight. War Monk and The Godhand suit her too, but they need gauntlets and white magic at once.",
    "fits": "Si falta una pegadora con puños.",
    "fits_en": "If you lack a fist fighter.",
    "parts": [
     2,
     3
    ],
    "debate": {
     "es": "También se le propone Monje soldado (Guanteletes B y Magia blanca D), que cambia daño por curas.",
     "en": "War Monk (Gauntlets B and White Magic D) is also suggested; it trades damage for healing."
    }
   }
  ],
  "PID_ヌッツォ": [
   {
    "id": "jinete",
    "name": "Jinete arquero cazavoladores",
    "name_en": "Flier-hunting Forest Knight",
    "path": [
     "Pícaro",
     "Jinete arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Fue 50, Vel 55 y Sabiduría har hali (+3 ataque e Impacto certero con armas eficaces): mata voladores y jinetes. Montado aprovecha los caballos que solo Cai cría pronto. Dos fuentes lo ponen en S. Cristal: Def 20, Res 15.",
    "why_en": "Str 50, Spd 55 and a personal that adds +3 attack and hit with effective weapons: he kills fliers and riders. Mounted, he uses the horses only Cai raises early. Two sources rate him S. Glass: Def 20, Res 15.",
    "fits": "Casi siempre; clave en el capítulo 9 (3 Rucs).",
    "fits_en": "Almost always; key in chapter 9 (3 Rucs).",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "tirador",
    "name": "Tirador de precisión",
    "name_en": "Precision Sniper",
    "path": [
     "Pícaro",
     "Tirador"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero"
    ],
    "when": [],
    "why": "Tirador da Hab +20 y su maestra Puntería suma Gol +15 con arco: compensa su Hab 45 frente a Peter.",
    "why_en": "Sniper gives Dex +20 and its mastery adds Hit +15 with bows: it makes up for his Dex 45 next to Peter.",
    "fits": "Si no consigues un buen caballo o prefieres que no se exponga.",
    "fits_en": "If you lack a good horse or want him less exposed.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "rastreador",
    "name": "Arquero espadachín",
    "name_en": "Bow-and-sword ranger",
    "path": [
     "Cazador",
     "Pícaro",
     "Rastreador"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "golpe"
    ],
    "when": [],
    "why": "Fue 50 y Vel 55. Sabiduría har hali da Ata +3 con daño eficaz: arco contra voladores. Rastreador (Contratiro) tras la misión de Oko.",
    "why_en": "Str 50 and Spd 55. His personal skill gives Atk +3 with effective damage: bows against fliers. Ranger (Countershot) after the Oko quest.",
    "fits": "Si falta arquero o antiaéreo. Llega tarde (prestigio 9).",
    "fits_en": "If you lack an archer or anti-air. He comes late (renown 9).",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Shido",
    "name_en": "Shido",
    "path": [
     "Cazador",
     "Pícaro",
     "Shido"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Pícaro y Shido para pegar con espada.",
    "why_en": "Rogue and Shido to hit with swords.",
    "fits": "Si ya tienes arquero.",
    "fits_en": "If you already have an archer.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "jinete",
    "name": "Jinete arquero cazavoladores",
    "name_en": "Flier-hunting Forest Knight",
    "path": [
     "Cazador",
     "Pícaro",
     "Jinete arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "golpe",
     "montado"
    ],
    "when": [
     {
      "lacks_role": "arquero"
     }
    ],
    "why": "Sabiduría har hali (+3 ataque) e Impacto certero (+10/+20 Gol) cuando su ataque es eficaz: caza voladores. Jinete arquero (PV 60, Fue 55) y Ojo de caza suman daño en el segundo golpe. Va montado: en esta ruta los montados no pueden llevar batallón. Cuesta apoyo 1, prestigio 6 y 3 arcos de hierro.",
    "why_en": "Har Hali Wisdom (+3 attack) and Precision Strike (+10/+20 hit) when his attack is effective: he hunts fliers. Forest Knight (HP 60, Str 55) and Hunter's Eye add damage on the follow-up. Mounted: in this route mounted units cannot take a battalion. He costs support 1, renown 6 and 3 iron bows.",
    "fits": "Si falta arquero o Lilian sale floja.",
    "fits_en": "If you lack an archer or Lilian turns out weak.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "tirador",
    "name": "Tirador con batallón",
    "name_en": "Sniper with battalion",
    "path": [
     "Cazador",
     "Pícaro",
     "Tirador"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero"
    ],
    "when": [],
    "why": "Tirador (Hab 65, Vel 65) va a pie, así que lleva batallón (uno antiaéreo vale para el cap. 7). Su maestra Puntería da +15 Gol.",
    "why_en": "Sniper (Dex 65, Spd 65) is on foot, so he takes a battalion (an anti-air one helps in ch. 7). Its mastery Marksmanship gives +15 hit.",
    "fits": "Si prefieres batallón a movimiento.",
    "fits_en": "If you prefer a battalion over movement.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-buscasombras",
    "name": "Buscasombras",
    "name_en": "Shadow Seeker",
    "path": [
     "Rastreador",
     "Buscasombras"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "esquiva"
    ],
    "when": [
     {
      "has": "PID_タリムーン"
     },
     {
      "has": "PID_グザラン"
     }
    ],
    "why": "Pícaro, Rastreador y Buscasombras: Vel 80 efectiva y Fue 55. Def 20: que no reciba muchos golpes.",
    "why_en": "Thief, Ranger and Shadow Seeker: effective Spd 80 and Str 55. Def 20: keep him from taking many hits.",
    "fits": "Si faltan arqueros que peguen; con Talimun o Guzran, ellos se quedan La Calamidad.",
    "fits_en": "If you lack hard-hitting archers; with Talimun or Guzran, they take The Calamity.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-calamidad",
    "name": "La Calamidad",
    "name_en": "The Calamity",
    "path": [
     "Rastreador",
     "Buscasombras",
     "La Calamidad"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "esquiva"
    ],
    "when": [
     {
      "lacks": "PID_タリムーン"
     },
     {
      "lacks": "PID_グザラン"
     }
    ],
    "why": "La Calamidad (Destino bendito, Sue +10) para un arquero de Fue y Vel altas.",
    "why_en": "The Calamity (Divine Will, Lck +10) for an archer with high Str and Spd.",
    "fits": "Sin Talimun ni Guzran: solo hay un Cristal tiniebla.",
    "fits_en": "Without Talimun or Guzran: there is only one Crystal of Darkness.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ピーテル": [
   {
    "id": "cuadriguero",
    "name": "Cuadriguero con Caballo de Ferganá",
    "name_en": "Charioteer with Ferghana Horse",
    "path": [
     "Cazador",
     "Cuadriguero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Cuadriguero duplica el bono del caballo: con Caballo de Ferganá su Fue 35 pasa a unos 50 de crecimiento y su Hab llega a 85. Puntería certera le da alcance 3 en técnicas de arco. Se queda en Cuadriguero hasta el nv 35-45. Pasa por Arquero (clase puente) para Crescendo.",
    "why_en": "Charioteer doubles the horse bonus: with a Ferghana Horse his Str 35 becomes about 50 growth and his Dex reaches 85. His personal gives range 3 on bow arts. Stays a Charioteer until lv 35-45. Go through Archer (bridge class) for Crescendo.",
    "fits": "Casi siempre; con el fuego de Cai, la Carga del Cuadriguero barre filas enteras.",
    "fits_en": "Almost always; with Cai's fire, the Charioteer's Charge sweeps whole rows.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
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
      "has": "PID_ヌッツォ"
     }
    ],
    "why": "Arquero (Crescendo) y Tirador (Hab +20, Puntería Gol +15) a pie. Pega menos que el Cuadriguero pero no depende del caballo.",
    "why_en": "Archer (Crescendo) and Sniper (Dex +20, Hit +15 mastery) on foot. Hits less than the Charioteer but needs no horse.",
    "fits": "Si Nuzzuo ya es el arquero montado.",
    "fits_en": "If Nuzzuo is already the mounted archer.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "tirador",
    "name": "Francotirador",
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
    "when": [],
    "why": "Puntería certera le da Alc +1 en técnicas de arco y Hab 60 le asegura el acierto. Arquero (Crescendo) y Tirador (Hab +20, Puntería).",
    "why_en": "His personal skill gives Rng +1 on bow arts and Dex 60 keeps him accurate. Archer (Crescendo) and Sniper (Dex +20, Marksmanship).",
    "fits": "Si falta arquero; con las técnicas de arco de Dietrich es el mejor.",
    "fits_en": "If you lack an archer; with Dietrich's bow arts he is the best.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "jinete",
    "name": "Jinete arquero",
    "name_en": "Forest Knight",
    "path": [
     "Cazador",
     "Arquero",
     "Jinete arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Jinete arquero (Ojo de caza) para moverse más; aquí sin bonos de montura.",
    "why_en": "Forest Knight (Hunter's Eye) to move further; no mount bonuses here.",
    "fits": "Si quieres movimiento.",
    "fits_en": "If you want movement.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "tirador",
    "name": "Tirador preciso",
    "name_en": "Precise Sniper",
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
    "why": "Tirador le deja Hab 80 de crecimiento: casi nunca falla. Lleva batallón.",
    "why_en": "Sniper gives him Dex 80 growth: he almost never misses. He takes a battalion.",
    "fits": "Si no usas a Lilian ni a Nuzzuo.",
    "fits_en": "If you use neither Lilian nor Nuzzuo.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-maestro",
    "name": "Antiaéreo",
    "name_en": "Anti-air",
    "path": [
     "Tirador",
     "Maestro arquero"
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
    "why": "Tirador (Puntería), Maestro arquero (Caza aérea, Gol +50 contra voladores) y Crescendo; Hab 60. Arco largo y artes de alcance +1 para no recibir contraataque.",
    "why_en": "Sniper (Marksmanship), Bow Adept (Sky Hunter, Hit +50 vs fliers) and Crescendo; Dex 60. Longbow and +1 range arts to avoid counters.",
    "fits": "Si falta quien derribe voladores (en Difícil hacen falta ~190 de golpe).",
    "fits_en": "If you lack someone to down fliers (Hard needs ~190 hit).",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-caballeroarco",
    "name": "Arquero móvil",
    "name_en": "Mobile archer",
    "path": [
     "Cazador",
     "Arquero",
     "Jinete arquero",
     "Caballero arco"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Cuadriguero y Caballero arco (petición de Kalla, Cruz del cazador): 8 de Mov con montura.",
    "why_en": "Charioteer into Bow Knight (Kalla's request, Hunter's Cross): Mov 8 with a mount.",
    "fits": "Si quieres el arquero móvil.",
    "fits_en": "If you want the mobile archer.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-calamidad",
    "name": "La Calamidad",
    "name_en": "The Calamity",
    "path": [
     "Tirador",
     "Buscasombras",
     "La Calamidad"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero"
    ],
    "when": [],
    "why": "La Calamidad acepta Arco S: el arquero de la Parte 1 llega a una Divina sin cambiar de arma.",
    "why_en": "The Calamity accepts Bow S: the Part 1 archer reaches a Divine class without changing weapon.",
    "fits": "Si nadie más se queda el Cristal tiniebla.",
    "fits_en": "If nobody else takes the Dark Crystal.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_アレキサンドラ": [
   {
    "id": "alaceleste",
    "name": "Ala Celeste con Bucéfalo",
    "name_en": "Wing Soldier with Bucephalus",
    "path": [
     "Jinete de ornius",
     "Ala Celeste"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador"
    ],
    "when": [],
    "why": "Bucéfalo es suyo en cualquier ruta (V5: Vel +15, Res +10) y Cai sube el vínculo rápido. Alas protectoras (Res +3) y Dama argéntea (+5 golpe y esquiva por aliado adyacente) la hacen cazadora de magos. Se queda en Ala Celeste: la avanzada de pegaso es de la Parte 3.",
    "why_en": "Bucephalus is hers on every route (bond 5: Spd +15, Res +10) and Cai raises the bond fast. Protective Wings (Res +3) and her personal (+5 hit and avoid per adjacent ally) make her a mage hunter. She stays a Wing Soldier: the pegasus advanced class is Part 3.",
    "fits": "Si hay magos enemigos y falta volador; tiene apoyo 1/2/3 con Cai.",
    "fits_en": "If there are enemy mages and you lack a flier; she has support 1/2/3 with Cai.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "baus",
    "name": "Jinete de baus",
    "name_en": "Dragoon",
    "path": [
     "Jinete de ornius",
     "Ala Celeste",
     "Jinete de baus"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador"
    ],
    "when": [],
    "why": "Más Fue que en Ala Celeste, pero pierde el bono de Bucéfalo (el pegaso no cuenta en un bau).",
    "why_en": "More Str than as a Wing Soldier, but she loses Bucephalus's bonus (the pegasus does not count on a bau).",
    "fits": "Si su Fue baja no mata y prefieres daño a esquiva.",
    "fits_en": "If her low Str does not kill and you prefer damage to avoid.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "voladora",
    "name": "Voladora antimagos",
    "name_en": "Anti-mage flier",
    "path": [
     "Jinete de ornius",
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
    "why": "Trae su propia montura. Res 40 y Vel 55 para cazar magos; Dama argéntea da Gol y Esq +5 por aliado adyacente.",
    "why_en": "She brings her own mount. Res 40 and Spd 55 to hunt mages; her personal skill gives Hit and Avo +5 per adjacent ally.",
    "fits": "Si faltan voladores; Mikaela y Esmeralda lo cubren mejor.",
    "fits_en": "If you lack fliers; Mikaela and Esmeralda do it better.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "alaceleste",
    "name": "Ala Celeste cazamagos",
    "name_en": "Mage-hunting Wing Soldier",
    "path": [
     "Jinete de ornius",
     "Ala Celeste"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador",
     "montado"
    ],
    "when": [
     {
      "lacks_role": "volador"
     }
    ],
    "why": "Llega de Ala Celeste con su pegaso Bucéfalo, que solo vale en clases de pegaso: no la pases a Jinete de baus. Dama argéntea da +5 Gol y Esq por aliado adyacente. Con Espada trueno caza magos. Va montado: en esta ruta los montados no pueden llevar batallón. Cuesta apoyo 1, prestigio 6.",
    "why_en": "She joins as a Wing Soldier with her pegasus, which only works in pegasus classes: do not promote her to Dragoon. Silver Maiden gives +5 hit and avoid per adjacent ally. With a Levin Sword she hunts mages. Mounted: in this route mounted units cannot take a battalion. She costs support 1, renown 6.",
    "fits": "Si falta volador o hay muchos magos y curanderos enemigos; cuidado con los arqueros.",
    "fits_en": "If you lack a flier or face many enemy mages and healers; beware of archers.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-celeste",
    "name": "Jinete celeste",
    "name_en": "Celestial Trooper",
    "path": [
     "Jinete de baus",
     "Jinete celeste"
    ],
    "weapon": "Espada",
    "roles": [
     "volador",
     "esquiva"
    ],
    "when": [],
    "why": "Jinete celeste (Esq +7 en vuelo, Vel ~75 al final) con Espada trueno y Espada purificadora. Su personal da Gol y Esq +5 por aliado adyacente. Jinete de baus le quita el pegaso Bucéfalo.",
    "why_en": "Celestial Trooper (Avoid +7 in flight, Spd ~75 by the end) with Levin Sword and Cleansing Blade. Her personal gives Hit and Avoid +5 per adjacent ally. Dragoon takes away her pegasus Bucephalus.",
    "fits": "Casi siempre como voladora del equipo.",
    "fits_en": "Almost always as the team's flier.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ティアラ": [
   {
    "id": "obispa",
    "name": "Obispa con Psique",
    "name_en": "Bishop healer",
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
    "why": "En la Parte 1 casi nadie más tiene Física (Psique): Tialla es la curandera fija. Dotes de estratega le da +1 de alcance en técnicas sobre aliados. Es frágil y la IA la persigue: protégela.",
    "why_en": "In Part 1 almost nobody else has Physic: Tialla is the fixed healer. Her personal gives +1 range on arts used on allies. She is frail and the AI chases her: protect her.",
    "fits": "Casi siempre.",
    "fits_en": "Almost always.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "trovadora",
    "name": "Trovadora montada",
    "name_en": "Mounted Troubadour",
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
    "when": [
     {
      "has": "PID_ソフィア"
     }
    ],
    "why": "Trovador (prestigio 10) usa las dos magias a caballo y su maestra da Hab +2 y Vel +2 a los aliados. Con Monoceronte cura tras cada combate.",
    "why_en": "Troubadour (renown 10) uses both magics on horseback and its mastery gives allies Dex +2 and Spd +2. With a Monoceros she heals after each fight.",
    "fits": "Si Sofia ya cura de lejos y Tialla puede moverse más.",
    "fits_en": "If Sofia already heals from range and Tialla can move more.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "sanadora",
    "name": "Sanadora",
    "name_en": "Healer",
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
    "why": "Aprende Sanar a rango C, la más temprana. Bailarín no se abre en esta ruta, así que pierde su papel principal.",
    "why_en": "Learns Physic at rank C, the earliest. Dancer does not open on this route, so she loses her main role.",
    "fits": "Si faltan curanderas.",
    "fits_en": "If you lack healers.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "obispa",
    "name": "Obispa de apoyo",
    "name_en": "Support Bishop",
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
    "why": "Se une ya de Obispo, con Física desde el principio. Dotes de estratega suma +1 de alcance a las técnicas sobre aliados. Sofia cura mejor y Tialla cuesta apoyo 3 y prestigio 10 (cap. 12).",
    "why_en": "She joins already a Bishop, with Physic from the start. Tactician's Wit adds +1 range to arts on allies. Sofia heals better and Tialla costs support 3 and renown 10 (ch. 12).",
    "fits": "Solo si pierdes a Sofia o falta una segunda sanadora al final.",
    "fits_en": "Only if you lose Sofia or lack a second healer at the end.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-docto",
    "name": "Docto",
    "name_en": "Wiseman",
    "path": [
     "Obispo",
     "Docto"
    ],
    "weapon": "Magia blanca",
    "roles": [
     "sanador"
    ],
    "when": [],
    "why": "Docto: la primera en aprender Sanar, y Serafín.",
    "why_en": "Wiseman: the first to learn Heal, plus Seraphim.",
    "fits": "Si falta sanadora.",
    "fits_en": "If you lack a healer.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-valquiria",
    "name": "Valquiria con Excalibur",
    "name_en": "Excalibur Valkyrium",
    "path": [
     "Augur",
     "Sacerdote",
     "Obispo",
     "Valquiria"
    ],
    "weapon": "Magia blanca",
    "roles": [
     "sanador",
     "mago"
    ],
    "when": [],
    "why": "Valquiria (petición de Jurah): Excalibur, Sanar y Ángeles; su personal baja 10 la esquiva enemiga, así que su acierto bajo no pesa.",
    "why_en": "Valkyrium (Jurah's request): Excalibur, Heal and Angels; her personal lowers enemy avoid by 10, so her low hit does not matter.",
    "fits": "Si quieres que cure y ataque.",
    "fits_en": "If you want her to heal and attack.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ウルタンド": [
   {
    "id": "caladrio",
    "name": "Caladrio con Espada de levin",
    "name_en": "Caladrius with Levin Sword",
    "path": [
     "Augur",
     "Chamán",
     "Caladrio"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago",
     "montado"
    ],
    "when": [
     {
      "has": "PID_ティアラ"
     }
    ],
    "why": "Caladrio con Magonius negro le da más Mag y Vel que Vate; pasar antes por Ala Celeste con Pegaso oscuro (Mag +15, Vel +10, clase puente) suma aún más. Ataca con Espada de levin y su aura (curar al vecino, Esq +10/+20) sigue valiendo pegada a un atacante.",
    "why_en": "Caladrius with a black Magonius gives her more Mag and Spd than Ovate; a stop as Wing Soldier with a dark Pegasus (Mag +15, Spd +10, bridge class) adds even more. She attacks with a Levin Sword and her aura (heal a neighbour, Avo +10/+20) still works next to an attacker.",
    "fits": "Si Tialla cubre la curación con Psique.",
    "fits_en": "If Tialla covers healing with Physic.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ],
    "debate": {
     "es": "Hay quien lo lleva a Guardián (lanza y magia blanca) y lo pone bajo en el tier.",
     "en": "Some take him to Guardian (lance and white magic) and rate him low."
    }
   },
   {
    "id": "trovadora",
    "name": "Trovadora de apoyo",
    "name_en": "Support Troubadour",
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
    "when": [
     {
      "lacks_role": "sanador"
     }
    ],
    "why": "Curandera móvil a caballo con los cantos del Trovador; no aprende Psique, así que no sustituye del todo a Tialla.",
    "why_en": "A mobile mounted healer with the Troubadour's songs; she never learns Physic, so she does not fully replace Tialla.",
    "fits": "Si falta Tialla o nadie más cura.",
    "fits_en": "If Tialla is missing or nobody else heals.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ],
    "debate": {
     "es": "Hay quien lo lleva a Guardián (lanza y magia blanca) y lo pone bajo en el tier.",
     "en": "Some take him to Guardian (lance and white magic) and rate him low."
    }
   },
   {
    "id": "guardiana",
    "name": "Guardiana de primeros auxilios",
    "name_en": "First-aid guardian",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Guardián"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque",
     "sanador"
    ],
    "when": [
     {
      "has": "PID_ノクチュラ"
     },
     {
      "has": "PID_マクシム"
     }
    ],
    "why": "Guardián (Res +15, Def +10) con lanza y magia blanca. Primeros auxilios cura a los aliados de al lado tras su combate y Plegaria les da Evit +10 (+20 a nv 35). Se abre con la misión «Duelo de Temerario: Il-Lara».",
    "why_en": "Guardian (Res +15, Def +10) with lance and white magic. Her personal skill heals adjacent allies after their fights and another gives them Ddg +10 (+20 at lv 35). Unlocked by the quest «Daredevil Duel: Il-Lara».",
    "fits": "Pegada a tanques de esquiva como Dietrich, Noctula o Maxim.",
    "fits_en": "Next to dodge tanks like Dietrich, Noctula or Maxim.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "alaceleste",
    "name": "Voladora de apoyo",
    "name_en": "Support flier",
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
    "why": "Ala Celeste para llegar donde haga falta con Primeros auxilios. Jinete de baus no se abre en esta ruta.",
    "why_en": "Wing Soldier to reach wherever her first-aid skill is needed. Dragoon does not open on this route.",
    "fits": "Si falta volador.",
    "fits_en": "If you lack a flier.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "obispa",
    "name": "Sanadora",
    "name_en": "Healer",
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
    "why": "Sacerdote y Obispo; su lista de hechizos es corta (Curar, Ángeles, Aura).",
    "why_en": "Priest and Bishop; her spell list is short (Heal, Seraphim, Aura).",
    "fits": "Si nadie más cura.",
    "fits_en": "If nobody else heals.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guardian",
    "name": "Guardián de primera línea",
    "name_en": "Front-line Guardian",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Guardián"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque",
     "sanador"
    ],
    "when": [],
    "why": "Primeros auxilios cura a los de al lado tras su combate y Plegaria les da +10 Esq (+20 a nv 35). Guardián le deja Res 60 de crecimiento. Sus crecimientos (385) son los más altos de los reclutas.",
    "why_en": "Patch Up heals adjacent allies after his fight and Pray for Safety gives them +10 avoid (+20 at lv 35). Guardian gives Res 60 growth. His growths (385) are the highest among recruits.",
    "fits": "Si hay muchos aliados juntos en primera línea o muchos magos.",
    "fits_en": "If many allies stand together on the front line or there are many mages.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "vate",
    "name": "Mago",
    "name_en": "Mage",
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
    "why": "Chamán y Vate (Mag 60) con Espada trueno y Thoron, mientras no tengas los 10 envíos de Guardián.",
    "why_en": "Shaman and Ovate (Mag 60) with a Levin Sword and Thoron, until you have the 10 deliveries for Guardian.",
    "fits": "Si aún no se abre Guardián.",
    "fits_en": "If Guardian is not open yet.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-centinela",
    "name": "Centinela que cura",
    "name_en": "Healing Sentinel",
    "path": [
     "Augur",
     "Soldado acorazado",
     "Hoplita",
     "Centinela"
    ],
    "weapon": "Lanza",
    "roles": [
     "sanador",
     "tanque"
    ],
    "when": [],
    "why": "Guardián (Hoplita en la ruta de Cai, que no tiene Guardián) y Centinela (Pose resuelta: Def y Res +5 a PV completos; magia blanca ×2). Su personal cura a un aliado adyacente tras su combate y otra da Esq +20 a los aliados.",
    "why_en": "Guardian (Dreadnought on Cai's route, which lacks Guardian) into Sentinel (Resolute Stance: Def and Res +5 at full HP; white magic ×2). Her personal heals an adjacent ally after her fight and another gives allies Avoid +20.",
    "fits": "Si falta un apoyo de primera línea que cure.",
    "fits_en": "If you lack a front-line support who heals.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-tridente",
    "name": "El Tridente",
    "name_en": "The Trident",
    "path": [
     "Augur",
     "Soldado acorazado",
     "Hoplita",
     "Centinela",
     "El Tridente"
    ],
    "weapon": "Lanza",
    "roles": [
     "sanador",
     "tanque"
    ],
    "when": [
     {
      "lacks": "PID_セオドラ"
     }
    ],
    "why": "El Tridente (Muralla bendita, Def +10; magia blanca ×3).",
    "why_en": "The Trident (Divine Wall, Def +10; white magic ×3).",
    "fits": "Sin Theodora: solo hay un Tridente.",
    "fits_en": "Without Theodora: there is only one Trident.",
    "parts": [
     2,
     3
    ],
    "debate": {
     "es": "El Tridente es para una sola unidad: Theodora, Eshmel o Ultand.",
     "en": "The Trident goes to one unit only: Theodora, Eshmel or Ultand."
    }
   },
   {
    "id": "p3-celeste",
    "name": "Voladora con Lanza Estelar",
    "name_en": "Star Spear flier",
    "path": [
     "Augur",
     "Ala Celeste",
     "Jinete de baus",
     "Jinete celeste"
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
    "why": "Pegaso oscuro (Mag +15, Vel +10), Espada trueno y Lanza Estelar (daño mágico sin contraataque) con Reflejos relámpago.",
    "why_en": "Dark pegasus (Mag +15, Spd +10), Levin Sword and Star Spear (magic damage without a counter) with Lightning Reflexes.",
    "fits": "Si falta volador.",
    "fits_en": "If you lack a flier.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ニネ": [
   {
    "id": "alaceleste",
    "name": "Ala Celeste antimagos",
    "name_en": "Anti-mage Wing Soldier",
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
    "why": "Voz de los espíritus da Gol y Esq +10 cuando el enemigo usa magia, y a nv 35 lo comparte en 2 casillas. Res 45: tanque mágico volador.",
    "why_en": "Her personal gives Hit and Avo +10 when the enemy uses magic, shared within 2 tiles at lv 35. Res 45: a flying magic tank.",
    "fits": "Si falta volador y hay muchos magos (caps. 10-11).",
    "fits_en": "If you lack a flier and face many mages (ch. 10-11).",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "bardada",
    "name": "Jinete bardado antimagos",
    "name_en": "Anti-mage Bardinger",
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
    "why": "Jinete ligero cuanto antes y luego Jinete bardado (Res +10, Égida): nace para la caballería y aguanta magos.",
    "why_en": "Light Cavalry as early as possible, then Bardinger (Res +10, Aegis): she is built for cavalry and stands up to mages.",
    "fits": "Si ya tienes volador.",
    "fits_en": "If you already have a flier.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Hoplita",
    "name_en": "Dreadnought",
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
    "why": "Con su Res 45, Hoplita la deja en Def 44 y Res 40 a nv 50: muro contra físicos y magos.",
    "why_en": "With her Res 45, Dreadnought takes her to Def 44 and Res 40 at lv 50: a wall against physical and magic hits.",
    "fits": "Si falta tanque.",
    "fits_en": "If you lack a tank.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guardiana",
    "name": "Guardiana antimagia",
    "name_en": "Anti-mage guardian",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Guardián"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque",
     "sanador"
    ],
    "when": [],
    "why": "Voz de los espíritus da Gol +10 y Esq +10 contra magia (a los de al lado a nv 20). Guardián (Res +15) con Sanar y Aura. Misión de Il-Lara.",
    "why_en": "Her personal skill gives Hit +10 and Avo +10 against magic (to adjacent allies at lv 20). Guardian (Res +15) with Physic and Aura. Il-Lara quest.",
    "fits": "Si faltan Res y curación en el frente; compite con Esmeralda y Ultand por Guardián.",
    "fits_en": "If the front lacks Res and healing; competes with Esmeralda and Ultand for Guardian.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "maga",
    "name": "Maga",
    "name_en": "Mage",
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
    "why": "Chamán y Vate aprovechan su Mag 35 y Res 45.",
    "why_en": "Shaman and Ovate use her Mag 35 and Res 45.",
    "fits": "Si ya hay tanques y quieres otro mago.",
    "fits_en": "If you already have tanks and want another mage.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Velocista Shido",
    "name_en": "Speedy Shido",
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
    "why": "Mirmidón y Shido: primero Vel, luego aguante.",
    "why_en": "Myrmidon and Shido: Spd first, then bulk.",
    "fits": "Si prefieres otra espada.",
    "fits_en": "If you prefer another sword.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guardiana",
    "name": "Guardiana que cura y pelea",
    "name_en": "Fighting healer Guardian",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Guardián"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque",
     "sanador"
    ],
    "when": [
     {
      "lacks_role": "sanador"
     }
    ],
    "why": "Guardián (Res 60 de crecimiento) le da lanza y Física: ataca y cura a distancia. Guía espiritual da +10 Gol y Esq contra magia a los de al lado (radio 2 a nv 35). Se abre con 10 envíos. Llega en el cap. 5-6.",
    "why_en": "Guardian (Res 60 growth) gives her lances and Physic: she attacks and heals at range. Spirits' Guidance gives adjacent allies +10 hit and avoid against magic (radius 2 at lv 35). Opens after 10 deliveries. She joins around ch. 5-6.",
    "fits": "Si falta una segunda sanadora o hay muchos magos (caps. 10-12).",
    "fits_en": "If you lack a second healer or face many mages (ch. 10-12).",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Tanque mixto",
    "name_en": "Mixed tank",
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
    "why": "Hoplita (Def 65) con su Res alta (+10 de su armadura de resistencia): aguanta golpes físicos y magia. Soldado acorazado es la fase débil.",
    "why_en": "Dreadnought (Def 65) with her high Res (+10 from her resistance armor): she takes both physical hits and magic. Armored Knight is the weak stage.",
    "fits": "Si falta tanque y ya hay curandera.",
    "fits_en": "If you lack a tank and already have a healer.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Veloz y crítica",
    "name_en": "Fast crit Shido",
    "path": [
     "Cazador",
     "Pícaro",
     "Shido"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [],
    "why": "Su punto débil es la Vel 35: Pícaro y Shido le dan 50 % de crecimiento de Vel y Shido +7 fijo.",
    "why_en": "Her weak point is Spd 35: Rogue and Shido give 50 % Spd growth and Shido +7 flat.",
    "fits": "Si falta un frontal rápido y ya hay curandera.",
    "fits_en": "If you lack a fast front-liner and already have a healer.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-espadachin",
    "name": "Espadachina antimagos",
    "name_en": "Anti-mage swordmaster",
    "path": [
     "Shido",
     "Espadachín"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [],
    "why": "Mirmidón, Shido y Espadachín: Vel +7 de clase tapa su punto flojo. Espada de Da Mina y Espada purificadora; su personal da Gol y Esq +10 contra magos y lo reparte a los aliados.",
    "why_en": "Myrmidon, Shido and Swordmaster: the class's Spd +7 covers her weak spot. Da Mina Sword and Cleansing Blade; her personal gives Hit and Avoid +10 against mages and shares it with allies.",
    "fits": "Si falta una espadachina que esquive.",
    "fits_en": "If you lack an evasive swordswoman.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-centinela",
    "name": "Centinela sanadora",
    "name_en": "Healer Sentinel",
    "path": [
     "Guardián",
     "Centinela"
    ],
    "weapon": "Lanza",
    "roles": [
     "sanador"
    ],
    "when": [
     {
      "lacks_role": "sanador"
     }
    ],
    "why": "Centinela con Sanar y Nosferatu; su personal reparte la antimagia a los aliados.",
    "why_en": "Sentinel with Heal and Nosferatu; her personal shares her anti-mage bonus with allies.",
    "fits": "Si nadie más cura.",
    "fits_en": "If nobody else heals.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ナジャ": [
   {
    "id": "shido",
    "name": "Shido",
    "name_en": "Shido",
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
    "why": "Primer impacto (50 % de +3 ataque) e Imparable lo hacen más constante que Guzran. Pasa por Forajido en vez de Mirmidón si su Fue sube poco.",
    "why_en": "His personals (50 % for +3 attack, then a follow-up bonus) make him more consistent than Guzran. Go through Brigand instead of Myrmidon if his Str lags.",
    "fits": "Si quieres un segundo espadachín crítico junto a Guzran.",
    "fits_en": "If you want a second crit swordsman next to Guzran.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Shido",
    "name_en": "Shido",
    "path": [
     "Cazador",
     "Pícaro",
     "Shido"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Fue 45 y Hab 50. Primer impacto puede dar Ata +3 si ataca primero. Pícaro y Shido.",
    "why_en": "Str 45 and Dex 50. His personal skill can give Atk +3 when attacking first. Rogue and Shido.",
    "fits": "Si lo reclutas a tiempo (prestigio 10).",
    "fits_en": "If you recruit him in time (renown 10).",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "why": "Forajido y Guerrero si le falta Fue.",
    "why_en": "Brigand and Warrior if he lacks Str.",
    "fits": "Si su Fue sale baja.",
    "fits_en": "If his Str comes out low.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Espadachín de primer golpe",
    "name_en": "Quick Draw Shido",
    "path": [
     "Cazador",
     "Pícaro",
     "Shido"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [],
    "why": "Primer impacto da +3 ataque y Shido Vel 60 de crecimiento y +7 fijo. Pícaro deja +10 Esq tras matar. Dale tu mejor espada. Esta ruta es la más barata para él (apoyo 2, prestigio 6).",
    "why_en": "Quick Draw gives +3 attack and Shido Spd 60 growth plus +7 flat. Rogue leaves +10 avoid after a kill. Give him your best sword. This route is the cheapest for him (support 2, renown 6).",
    "fits": "Si falta un espadachín de daño.",
    "fits_en": "If you lack a damage-dealing swordsman.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrero",
    "name": "Guerrero de Fue",
    "name_en": "Str Warrior",
    "path": [
     "Gladiador",
     "Forajido",
     "Guerrero"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Si su Fue sale floja, Forajido y Guerrero (Fue 65 de crecimiento).",
    "why_en": "If his Str comes out weak, Brigand and Warrior (Str 65 growth).",
    "fits": "Si su Fue sale baja.",
    "fits_en": "If his Str comes out low.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-espadachin",
    "name": "Espadachín",
    "name_en": "Swordmaster",
    "path": [
     "Shido",
     "Espadachín"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Mirmidón, Shido y Espadachín (Fobos) con Espada purificadora y Mandoble; su personal ataca primero y Siempre alerta lo cura. Rinde como Guzran.",
    "why_en": "Myrmidon, Shido and Swordmaster (Astra) with a Cleansing Blade and Greatsword; his personal strikes first and Ever Vigilant heals him. He performs like Guzran.",
    "fits": "Si falta un espadachín.",
    "fits_en": "If you lack a swordsman.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-hoja",
    "name": "La Hoja",
    "name_en": "The Blade",
    "path": [
     "Shido",
     "Espadachín",
     "La Hoja"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [
     {
      "lacks": "PID_ディートリヒ"
     }
    ],
    "why": "La Hoja (Agudeza bendita, Vel +10; Crí +10 con espada).",
    "why_en": "The Blade (Divine Insight, Spd +10; Crit +10 with swords).",
    "fits": "Sin Dietrich: solo hay un Arriaz demoniaco.",
    "fits_en": "Without Dietrich: there is only one Demonic Swordguard.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_セテス": [
   {
    "id": "baus",
    "name": "Jinete de baus flanqueador",
    "name_en": "Flanking Dragoon",
    "path": [
     "Soldado",
     "Jin. ornius acorazado",
     "Jinete de baus"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador",
     "golpe"
    ],
    "when": [],
    "why": "Presto para luchar le da un 50 % de atacar primero; con Bau salvaje (Fue +10, Hab +10) es el mejor flanqueador. En esta ruta su misión pide nv 25 en vez de 35.",
    "why_en": "His personal gives a 50 % chance to strike first; with a wild Bau (Str +10, Dex +10) he is the best flanker. On this route his quest asks for lv 25 instead of 35.",
    "fits": "Si faltan voladores.",
    "fits_en": "If you lack fliers.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "baus",
    "name": "Jinete de baus",
    "name_en": "Dragoon",
    "path": [
     "Jinete de ornius",
     "Jin. ornius acorazado",
     "Jinete de baus"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador",
     "golpe",
     "montado"
    ],
    "when": [],
    "why": "Presto para luchar le deja atacar primero un 50 %. Jinete de baus (PV 60, Def 50) solo tras el 14.º envío. Va montado: en esta ruta los montados no pueden llevar batallón. Su misión trae enemigos de nv 30-35.",
    "why_en": "Ready for Battle lets him strike first 50 % of the time. Dragoon (HP 60, Def 50) only after the 14th delivery. Mounted: in this route mounted units cannot take a battalion. His quest has level 30-35 enemies.",
    "fits": "Si quieres un volador que flanquee.",
    "fits_en": "If you want a flanking flier.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-paladin",
    "name": "Paladín bau",
    "name_en": "Bau Lord",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Guardián",
     "Paladín bau"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador"
    ],
    "when": [],
    "why": "Su autonivel: Jinete de baus (Asedio) y Paladín bau (Emboscada, Ata +4 en terreno inaccesible). Su personal ataca primero en la fase enemiga (50 %). El Cabalgador también le sirve si Cai y Creek no lo llevan.",
    "why_en": "His autolevel: Dragoon (Besieger) and Bau Lord (Ambush, Atk +4 on impassable terrain). His personal strikes first on the enemy phase (50 %). The Cavalier also suits him if Cai and Creek do not hold it.",
    "fits": "Si falta un lancero móvil que ataque primero.",
    "fits_en": "If you lack a mobile lancer who strikes first.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ヨーカイ": [
   {
    "id": "obispo",
    "name": "Sanador de Física resistente",
    "name_en": "Sturdy Physic healer",
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
    "why": "Tiene Psique y aguanta más que Tialla; Monje hereje le cura toda la vida al matar. Muy barato (apoyo 2, prestigio 3).",
    "why_en": "He has Physic and is sturdier than Tialla; his personal can restore all his HP on a kill. Very cheap (support 2, renown 3).",
    "fits": "Si Tialla no da abasto o cae.",
    "fits_en": "If Tialla cannot keep up or falls.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "obispo",
    "name": "Obispo sanador",
    "name_en": "Healing bishop",
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
    "why": "Sacerdote y Obispo (Mag +15, Res +20). Aprende Sanar a rango B: es el único sanador a distancia temprano de la ruta. Monje hereje puede curarle del todo al matar y Salud de hierro le da Def y Res +3 al recibir golpes.",
    "why_en": "Priest and Bishop (Mag +15, Res +20). Learns Physic at rank B: the route's only early ranged healer. His personal skill can fully heal him on a kill and Iron Health gives Def and Res +3 when hit.",
    "fits": "Siempre en la Parte 1: no hay otro sanador hasta Olympia.",
    "fits_en": "Always in Part 1: there is no other healer until Olympia.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "obispo",
    "name": "Obispo de Física",
    "name_en": "Physic Bishop",
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
    "why": "Obispo con Física; Monje hereje le cura por completo al matar.",
    "why_en": "Bishop with Physic; Monkly Havoc fully heals him on a kill.",
    "fits": "Si falta curación de refuerzo.",
    "fits_en": "If you lack backup healing.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   }
  ],
  "PID_ゴライアス": [
   {
    "id": "hoplita",
    "name": "Muro inmovilizador",
    "name_en": "Pinning wall",
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
    "why": "El mejor tanque base (PV 55, Fue 60, Def 50) y Arrinconamiento quita Mov -3 a los adyacentes (-5 a nv 35). No puede ir montado. En Cai cuesta: pide 3 Comidas de gigante.",
    "why_en": "The best base tank (HP 55, Str 60, Def 50) and his personal cuts adjacent enemies' Mov by 3 (5 at lv 35). He cannot ride. On Cai's route he is costly: 3 Giant's Meals.",
    "fits": "Si falta tanque y no está Esmeralda.",
    "fits_en": "If you lack a tank and Esmeralda is out.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "muro",
    "name": "Muro «no pasarás»",
    "name_en": "«You shall not pass» wall",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Hoplita"
    ],
    "weapon": "Hacha",
    "roles": [
     "tanque"
    ],
    "when": [],
    "why": "Arrinconamiento quita Mov −3 a los enemigos de al lado (−5 a nv 35), también a jefes. Hoplita (Def +30, Fue +15). Peso pesado le impide montar o volar. Nunca dobla (Vel 15): escudo y accesorios ligeros, y Crescendo (parada en Arquero) para su Hab 30.",
    "why_en": "His personal skill gives adjacent enemies Mov −3 (−5 at lv 35), bosses included. Dreadnought (Def +30, Str +15). Heavyweight bars him from mounts and fliers. He never doubles (Spd 15): a shield and light accessories, and Crescendo (stop at Archer) for his Dex 30.",
    "fits": "Si falta tanque físico. Con Esmeralda y Buccar ya en el equipo sobra.",
    "fits_en": "If you lack a physical tank. With Esmeralda and Buccar already in, he is redundant.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Hoplita inmovilizador",
    "name_en": "Pinning Dreadnought",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Hoplita"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque"
    ],
    "when": [],
    "why": "Fue 60, PV 55, Def 50; Arrinconamiento quita 3 Mov (5 a nv 35) a los enemigos de al lado. No puede montar. Su Res 20 cae ante la magia.",
    "why_en": "Str 60, HP 55, Def 50; Pin Down takes 3 Mov (5 at lv 35) from adjacent enemies. He cannot ride. His Res 20 falls to magic.",
    "fits": "Si hay una puerta o un jefe que bloquear.",
    "fits_en": "If there is a choke point or boss to pin.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-bastion",
    "name": "Muro inmovilizador",
    "name_en": "Pinning wall",
    "path": [
     "Hoplita",
     "Caballero bastión"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque"
    ],
    "when": [],
    "why": "Hoplita (Contra precisa) y Caballero bastión (Bloqueo, −5 de daño). Cerrar filas (−2 Mov) y su personal de nivel 35 (−5 Mov) quitan 7 de movimiento a un jefe. Lanza mejor que hacha. La Eternidad le daría más daño, pero suele ir a Bertrand.",
    "why_en": "Dreadnought (Focused Counter) into Castle Knight (Intercept, −5 damage). A formation skill (−2 Mov) and his level-35 personal (−5 Mov) take 7 movement off a boss. Lance over axe. The Eternal would add damage, but it usually goes to Bertrand.",
    "fits": "Si falta quien bloquee un pasillo o un jefe lento. Con Vel 15 nunca dobla.",
    "fits_en": "If you need someone to block a corridor or a slow boss. With Spd 15 he never doubles.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_マジーデ": [
   {
    "id": "hoplita",
    "name": "Hoplita de hacha",
    "name_en": "Axe Dreadnought",
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
    "why": "El primer tanque que llega (cap. 3, apoyo 2): PV 65, el crecimiento más alto del juego, y +3 Fue con hacha. El martillo rompe acorazados. Res 10: lejos de magos.",
    "why_en": "The first tank to arrive (ch. 3, support 2): HP 65, the highest growth in the game, and +3 Str with axes. The hammer breaks armor. Res 10: keep him away from mages.",
    "fits": "Si falta tanque y Esmeralda aún no ha llegado.",
    "fits_en": "If you lack a tank and Esmeralda has not arrived yet.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Hoplita",
    "name_en": "Dreadnought",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Hoplita"
    ],
    "weapon": "Hacha",
    "roles": [
     "tanque"
    ],
    "when": [],
    "why": "PV 65. Hacha indómita da Fue +3 con hacha. Res 10.",
    "why_en": "HP 65. His personal skill gives Str +3 with axes. Res 10.",
    "fits": "Solo si faltan tanques: es de las peores inversiones del roster.",
    "fits_en": "Only if you lack tanks: one of the worst investments on the roster.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "why": "Forajido y Guerrero con hacha.",
    "why_en": "Brigand and Warrior with an axe.",
    "fits": "Si ya tienes tanques.",
    "fits_en": "If you already have tanks.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Hoplita de hacha",
    "name_en": "Axe Dreadnought",
    "path": [
     "Gladiador",
     "Forajido",
     "Hoplita"
    ],
    "weapon": "Hacha",
    "roles": [
     "tanque"
    ],
    "when": [],
    "why": "Hacha indómita (+3 Fue con hacha) y PV 65; su Res 10 es muy baja. Prescindible.",
    "why_en": "Hellbent Axe (+3 Str with axes) and HP 65; his Res 10 is very low. Expendable.",
    "fits": "Solo si sobra un puesto.",
    "fits_en": "Only if you have a spare slot.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-batallador",
    "name": "Batallador",
    "name_en": "Battlemaster",
    "path": [
     "Guerrero",
     "Batallador"
    ],
    "weapon": "Hacha",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "PV 65 y Fue 50, pero el peor total de crecimientos (260). Guerrero (Técnica entrenada) y Batallador (Golpe maestro) con Martillo.",
    "why_en": "HP 65 and Str 50, but the worst growth total (260). Warrior (Practiced Art) and Battlemaster (War Master's Strike) with a Hammer.",
    "fits": "Solo de relleno.",
    "fits_en": "Only as filler.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ベンディッツ": [
   {
    "id": "jinetearquero",
    "name": "Jinete arquero",
    "name_en": "Forest Knight",
    "path": [
     "Cuadriguero",
     "Jinete arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Sobre ruedas (Gol +20) y Tanque (golpes demoledores) solo funcionan en Cuadriguero: déjalo en esa clase todo lo que puedas y luego pasa a Jinete arquero.",
    "why_en": "His personals (Hit +20 and crushing blows) only work as a Charioteer: keep him in that class as long as you can, then move to Forest Knight.",
    "fits": "Si quieres un segundo Cuadriguero junto a Peter.",
    "fits_en": "If you want a second Charioteer next to Peter.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "cuadriguero",
    "name": "Cuadriguero fijo",
    "name_en": "Career charioteer",
    "path": [
     "Soldado",
     "Cuadriguero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Sobre ruedas (Gol +20) y Tanque (golpes demoledores) solo funcionan si es Cuadriguero: quédate en la clase.",
    "why_en": "His personal skills (Hit +20, extra crushing blows) only work as a Charioteer: stay in the class.",
    "fits": "Si falta otro arquero.",
    "fits_en": "If you need another archer.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "cuadriguero",
    "name": "Cuadriguero tanque",
    "name_en": "Tank Charioteer",
    "path": [
     "Soldado",
     "Cuadriguero",
     "Jinete arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "tanque",
     "montado"
    ],
    "when": [],
    "why": "Sobre ruedas da +20 Gol en Cuadriguero; aguanta la fase enemiga con miniarco. Va montado: en esta ruta los montados no pueden llevar batallón. Cuesta apoyo 1 pero llega tarde (prestigio 8).",
    "why_en": "Wheeled Warrior gives +20 hit as a Charioteer; he holds the enemy phase with a mini bow. Mounted: in this route mounted units cannot take a battalion. Costs support 1 but arrives late (renown 8).",
    "fits": "Si falta un tanque contra voladores.",
    "fits_en": "If you lack an anti-flier tank.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-caballeroarco",
    "name": "Caballero arco",
    "name_en": "Bow Knight",
    "path": [
     "Jinete arquero",
     "Caballero arco"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Su personal (Gol +20) solo vale en carro, y cualquier Cuadriguero con Fue media rinde más. Si lo llevas, Caballero arco.",
    "why_en": "His personal (Hit +20) only works on a chariot, and any Charioteer with average Str does better. If you bring him, Bow Knight.",
    "fits": "Solo de relleno.",
    "fits_en": "Only as filler.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_リリアン": [
   {
    "id": "tiradora",
    "name": "Arquera de precisión",
    "name_en": "Precision archer",
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
    "why": "Sobre seguro da Gol +10 si no pueden contraatacarle y Ventaja +3/+5 de ataque con 100 % de acierto. Hab 55.",
    "why_en": "Her personals give Hit +10 when she cannot be countered and +3/+5 attack at 100 % hit. Dex 55.",
    "fits": "Si falta un tercer arquero.",
    "fits_en": "If you need a third archer.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "tiradora",
    "name": "Arquera de precisión",
    "name_en": "Precision archer",
    "path": [
     "Cazador",
     "Arquero",
     "Tirador"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero"
    ],
    "when": [],
    "why": "Hab 55 y Sue 50 le dan 100 % de acierto, que activa Ventaja (Ata +3). Unos niveles de Forajido sin subir mucho arreglan su Fue.",
    "why_en": "Dex 55 and Lck 50 give her 100 % hit, which triggers her Atk +3 skill. A few Brigand levels fix her Str.",
    "fits": "Si falta arquero; pega menos que Inyoni.",
    "fits_en": "If you lack an archer; hits less than Inyoni.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "maga",
    "name": "Maga con Sanar",
    "name_en": "Physic mage",
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
    "why": "Chamán y Vate con Thoron y Sanar pronto.",
    "why_en": "Shaman and Ovate with Thoron and early Physic.",
    "fits": "Si quieres otro mago que cure.",
    "fits_en": "If you want another mage who heals.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "why": "Arquero da Crescendo (+3 Gol por baja) y Tirador Hab +20. Sobre seguro (+10 Gol si no pueden contraatacar) y Ventaja (+3/+5 ataque con 100 % de acierto) premian su Hab 55. Su táctica da +10 Gol a aliados cercanos. Lleva batallón.",
    "why_en": "Archer gives Crescendo (+3 hit per kill) and Sniper Dex +20. Safety First (+10 hit if they cannot counter) and Upper Hand (+3/+5 attack at 100 % hit) reward her Dex 55. Her tactic gives nearby allies +10 hit. She takes a battalion.",
    "fits": "Si falta arquero y su Fue sube bien.",
    "fits_en": "If you lack an archer and her Str grows well.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "forajida",
    "name": "Forajida y luego Tiradora",
    "name_en": "Brigand then Sniper",
    "path": [
     "Gladiador",
     "Forajido",
     "Tirador"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero"
    ],
    "when": [],
    "why": "Su Fue es solo 35 %: Forajido (Fue +15) la arregla antes de Tirador. Tirador sigue pidiendo Arco B.",
    "why_en": "Her Str growth is only 35 %: Brigand (Str +15) fixes it before Sniper. Sniper still needs Bow B.",
    "fits": "Si a nivel 10-15 lleva Fue 13 o menos.",
    "fits_en": "If at level 10-15 she has 13 Str or less.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-caballeroarco",
    "name": "Caballero arco con Arco largo",
    "name_en": "Longbow Bow Knight",
    "path": [
     "Cazador",
     "Arquero",
     "Jinete arquero",
     "Caballero arco"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [
     {
      "has": "PID_セオドラ"
     }
    ],
    "why": "Cruz del cazador con Arco largo; su personal da Gol +10 si el rival no puede contraatacar: con Crescendo no falla. Antiaérea.",
    "why_en": "Hunter's Cross with a Longbow; her personal gives Hit +10 when the foe cannot counter: with Crescendo she never misses. Anti-air.",
    "fits": "Si faltan antiaéreos; encaja con Theodora.",
    "fits_en": "If you lack anti-air; fits with Theodora.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ヌディーヌ": [
   {
    "id": "cuadriguero",
    "name": "Cuadriguera de choque",
    "name_en": "Shock Charioteer",
    "path": [
     "Jinete de ornius",
     "Cuadriguero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Abrirse paso le deja atravesar tropas enemigas montada y cargar contra la retaguardia. No usa espada ni lanza, así que Ala Celeste y Jinete bardado no le sirven.",
    "why_en": "Her personal lets her ride through enemy units and charge the back line. She uses neither swords nor lances, so Wing Soldier and Bardinger do not suit her.",
    "fits": "Si quieres caballería que rompa líneas.",
    "fits_en": "If you want cavalry that breaks lines.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "bardada",
    "name": "Jinete bardado",
    "name_en": "Bardinger",
    "path": [
     "Jinete de ornius",
     "Jinete ligero",
     "Jinete bardado"
    ],
    "weapon": "Lanza",
    "roles": [
     "montado"
    ],
    "when": [],
    "why": "Abrirse paso deja atravesar enemigos. Jinete bardado (Égida). Su build fuerte, Caladrio, no se abre en esta ruta.",
    "why_en": "Her personal skill lets her pass through enemies. Bardinger (Aegis). Her strong build, Caladrius, does not open on this route.",
    "fits": "Solo si quieres otro jinete.",
    "fits_en": "Only if you want another rider.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "jinete",
    "name": "Jinete arquera",
    "name_en": "Forest Knight",
    "path": [
     "Cazador",
     "Arquero",
     "Jinete arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Arquero y Jinete arquero con arco.",
    "why_en": "Archer and Forest Knight with a bow.",
    "fits": "Si falta arquero móvil.",
    "fits_en": "If you lack a mobile archer.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "baus",
    "name": "Jinete de baus",
    "name_en": "Dragoon",
    "path": [
     "Jinete de ornius",
     "Ala Celeste",
     "Jinete de baus"
    ],
    "weapon": "Hacha",
    "roles": [
     "volador",
     "montado"
    ],
    "when": [
     {
      "lacks_role": "volador"
     }
    ],
    "why": "Jinete de baus con hacha y martillo contra acorazados; solo tras el 14.º envío (si no, quédate en Ala Celeste). Va montado: en esta ruta los montados no pueden llevar batallón.",
    "why_en": "Dragoon with axes and a hammer against armor; only after the 14th delivery (otherwise stay a Wing Soldier). Mounted: in this route mounted units cannot take a battalion.",
    "fits": "Si falta volador.",
    "fits_en": "If you lack a flier.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-celeste",
    "name": "Jinete celeste",
    "name_en": "Celestial Trooper",
    "path": [
     "Jinete de baus",
     "Jinete celeste"
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
    "why": "Jinete celeste (Reflejos relámpago); su personal atraviesa casillas enemigas. Rinde mucho más reclutada pronto en la ruta de Cai.",
    "why_en": "Celestial Trooper (Lightning Reflexes); her personal passes through enemy tiles. She is far better recruited early on Cai's route.",
    "fits": "Si falta volador.",
    "fits_en": "If you lack a flier.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ハルヴィン": [
   {
    "id": "jinetearquera",
    "name": "Jinete arquero",
    "name_en": "Forest Knight",
    "path": [
     "Cazador",
     "Arquero",
     "Jinete arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [
     {
      "lacks": "PID_ヌッツォ"
     }
    ],
    "why": "Adaptabilidad (+2 golpe tras cada combate, hasta +30) apila con Crescendo de Arquero. Hab 60. Pide 10 Dátiles.",
    "why_en": "Her personal (+2 hit after each fight, up to +30) stacks with Archer's Crescendo. Dex 60. Needs 10 Dates.",
    "fits": "Si quieres una segunda arquera y no está Nuzzuo.",
    "fits_en": "If you want a second archer and Nuzzuo is out.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
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
    "when": [],
    "why": "Hab 60 y Adaptabilidad (Gol +2 tras cada combate, hasta +30). Arquero (Crescendo) y Tirador (Puntería). Tiene apoyo con Dietrich.",
    "why_en": "Dex 60 and her personal skill (Hit +2 after each fight, up to +30). Archer (Crescendo) and Sniper (Marksmanship). She has a support with Dietrich.",
    "fits": "Si falta arquero.",
    "fits_en": "If you lack an archer.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrera",
    "name": "Guerrera de hacha",
    "name_en": "Axe warrior",
    "path": [
     "Cazador",
     "Forajido",
     "Guerrero"
    ],
    "weapon": "Hacha",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Forajido y Guerrero (Fue +20). Su Hab 60 y Adaptabilidad compensan las técnicas de hacha de poco acierto: mata jefes.",
    "why_en": "Brigand and Warrior (Str +20). Her Dex 60 and Hit build-up make up for low-hit axe arts: a boss killer.",
    "fits": "Si faltan golpes pesados.",
    "fits_en": "If you lack heavy hitters.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "cuadriguera",
    "name": "Cuadriguera",
    "name_en": "Charioteer",
    "path": [
     "Cazador",
     "Cuadriguero",
     "Jinete arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Cuadriguero (Hab +15) con arco; cada golpe suma Adaptabilidad.",
    "why_en": "Charioteer (Dex +15) with a bow; every hit stacks her Hit bonus.",
    "fits": "Si quieres arquera móvil.",
    "fits_en": "If you want a mobile archer.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "jinete",
    "name": "Arquera de precisión",
    "name_en": "Precision archer",
    "path": [
     "Cazador",
     "Arquero",
     "Jinete arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [
     {
      "lacks_role": "arquero"
     }
    ],
    "why": "Adaptabilidad (+2 Gol tras cada combate, hasta +30) se acumula con Crescendo; Detener avance quita 2-3 Vel al enemigo. Hab 60. Va montado: en esta ruta los montados no pueden llevar batallón.",
    "why_en": "Adaptability (+2 hit after each fight, up to +30) stacks with Crescendo; Halt Advance takes 2-3 Spd from the enemy. Dex 60. Mounted: in this route mounted units cannot take a battalion.",
    "fits": "Si falta arquero.",
    "fits_en": "If you lack an archer.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrera",
    "name": "Guerrera de hacha",
    "name_en": "Axe Warrior",
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
    "why": "Con Crescendo y Adaptabilidad compensa la falta de Gol de las técnicas de hacha de varios golpes.",
    "why_en": "Crescendo and Adaptability make up for the low hit of multi-hit axe arts.",
    "fits": "Si ya tienes arqueros.",
    "fits_en": "If you already have archers.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-caballeroarco",
    "name": "Caballero arco",
    "name_en": "Bow Knight",
    "path": [
     "Jinete arquero",
     "Caballero arco"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [
     {
      "lacks_role": "arquero"
     }
    ],
    "why": "Hab 60 y su personal sube Gol +2 tras cada combate (máximo +30): el Caballero arco ideal (Cruz del cazador). Pasa por Arquero (clase puente) para Crescendo; Caballo negro o Ferganá en la ruta de Cai.",
    "why_en": "Dex 60 and his personal adds Hit +2 after each fight (up to +30): the ideal Bow Knight (Hunter's Cross). Go through Archer (bridge class) for Crescendo; a black horse or Ferghana on Cai's route.",
    "fits": "Si hay voladores enemigos y falta arquero móvil.",
    "fits_en": "If there are enemy fliers and you lack a mobile archer.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_マクシム": [
   {
    "id": "guerrero",
    "name": "Forajido y Guerrero",
    "name_en": "Brigand into Warrior",
    "path": [
     "Gladiador",
     "Forajido",
     "Guerrero"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Vel 60; su mayor valor es la Espada de levin que trae.",
    "why_en": "Spd 60; his main value is the Levin Sword he brings.",
    "fits": "Solo si te falta un físico rápido al final.",
    "fits_en": "Only if you lack a fast physical unit late.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "picaro",
    "name": "Esquivador con espada",
    "name_en": "Evasive swordsman",
    "path": [
     "Gladiador",
     "Pícaro",
     "Shido"
    ],
    "weapon": "Espada",
    "roles": [
     "esquiva",
     "golpe"
    ],
    "when": [],
    "why": "Vel 60 de crecimiento. Pícaro (Desde las sombras) y Shido (Siempre alerta). Filo instantáneo da Ata +3 al esquivar (+5 a nv 35) y Trocar cambia su sitio con un aliado (Def +3 después).",
    "why_en": "Spd 60 growth. Rogue (In Shadow) and Shido (Ever Vigilant). His personal skill gives Atk +3 after dodging (+5 at lv 35) and Swap trades places with an ally (Def +3 afterwards).",
    "fits": "Casi siempre si haces sus misiones.",
    "fits_en": "Almost always if you do his quests.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "pugil",
    "name": "Púgil de esquiva",
    "name_en": "Evasive pugilist",
    "path": [
     "Gladiador",
     "Púgil",
     "Guerrero"
    ],
    "weapon": "Guanteletes",
    "roles": [
     "esquiva",
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
    "why": "Guanteletes ligeros para esquivar en fase enemiga y pegar con Filo instantáneo.",
    "why_en": "Light gauntlets to dodge in the enemy phase and hit back harder after each dodge.",
    "fits": "Con Dante o Sha Lan al lado para prestarle defensa.",
    "fits_en": "With Dante or Sha Lan nearby to lend him defense.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Espadachín esquivador",
    "name_en": "Evasive Shido",
    "path": [
     "Gladiador",
     "Mirmidón",
     "Shido"
    ],
    "weapon": "Espada",
    "roles": [
     "esquiva",
     "golpe"
    ],
    "when": [],
    "why": "Vel 60 de crecimiento y Shido (+7 fijo): dobla casi siempre; Filo instantáneo suma ataque tras esquivar. Llega tarde y caro.",
    "why_en": "Spd 60 growth and Shido (+7 flat): he nearly always doubles; Flickering Edge adds attack after dodging. He arrives late and costly.",
    "fits": "Solo si te sobran puestos.",
    "fits_en": "Only if you have spare slots.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-espadachin",
    "name": "Espadachín veloz",
    "name_en": "Fast swordmaster",
    "path": [
     "Shido",
     "Espadachín"
    ],
    "weapon": "Espada",
    "roles": [
     "esquiva"
    ],
    "when": [],
    "why": "Vel 60: Mirmidón, Shido y Espadachín (Fobos).",
    "why_en": "Spd 60: Myrmidon, Shido and Swordmaster (Astra).",
    "fits": "Si hay un hueco de espada.",
    "fits_en": "If there is a sword slot open.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ディエゴ": [
   {
    "id": "rastreador",
    "name": "Rastreador de precisión",
    "name_en": "Precision Ranger",
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
    "when": [
     {
      "lacks_role": "arquero"
     }
    ],
    "why": "Se une ya de Rastreador (Hab, Vel y Sue +15; maestra Contratiro contra arqueros), clase que esta ruta no abre para nadie más. Hab 60 y Sin piedad (+5 golpe y crítico en el segundo golpe; +10 a nv 35) premian doblar con arco o espada.",
    "why_en": "He joins as a Ranger (Dex, Spd and Lck +15; mastery Counterfire against archers), a class this route opens for nobody else. Dex 60 and his personal (+5 hit and crit on the second hit; +10 at lv 35) reward doubling with bow or sword.",
    "fits": "Solo si llega a tiempo (caps. 10-11) y falta arquero.",
    "fits_en": "Only if he arrives in time (ch. 10-11) and you lack an archer.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "rastreador",
    "name": "Arquero espadachín",
    "name_en": "Bow-and-sword ranger",
    "path": [
     "Cazador",
     "Pícaro",
     "Rastreador"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero"
    ],
    "when": [],
    "why": "Hab 60. Sin piedad da Gol +5 y Crí +5 en el segundo golpe al doblar. Pícaro y Rastreador.",
    "why_en": "Dex 60. His personal skill gives Hit +5 and Crit +5 on the second hit when doubling. Rogue and Ranger.",
    "fits": "Si no hay mejor arquero; llega tarde.",
    "fits_en": "If there is no better archer; he comes late.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "arco",
    "name": "Arquero de relleno",
    "name_en": "Filler archer",
    "path": [
     "Cazador",
     "Pícaro",
     "Rastreador"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero"
    ],
    "when": [],
    "why": "Se une ya de Rastreador, con Hab 60 y Vel 45. Sin piedad suma +5 Gol y Crí al doblar, y Guardaespaldas da un 5 % de evitar el doble a los de al lado. Llega gratis tras el desvío de Orchel y llena el 9.º puesto del cap. 12.",
    "why_en": "He joins already a Ranger, with Dex 60 and Spd 45. Rejection adds +5 hit and crit when doubling, and Bodyguard gives adjacent allies a 5 % chance to avoid being doubled. He comes free after Orchel's detour and fills the 9th slot in ch. 12.",
    "fits": "Si te sobra un puesto en el cap. 12.",
    "fits_en": "If you have a spare slot in ch. 12.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-buscasombras",
    "name": "Buscasombras",
    "name_en": "Shadow Seeker",
    "path": [
     "Rastreador",
     "Buscasombras"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero"
    ],
    "when": [],
    "why": "Hab 60. Rastreador (Contratiro) y Buscasombras; su personal da Gol y Crí +10 en el segundo golpe.",
    "why_en": "Dex 60. Ranger (Countershot) into Shadow Seeker; his personal gives Hit and Crit +10 on the second hit.",
    "fits": "Solo de relleno.",
    "fits_en": "Only as filler.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ライサンダー": [
   {
    "id": "baus",
    "name": "Jinete de baus",
    "name_en": "Dragoon",
    "path": [
     "Jinete de ornius",
     "Jinete ligero",
     "Jinete de baus"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador"
    ],
    "when": [],
    "why": "Es su línea de autonivel. Ataque veloz da Esq +15 al atacar primero y Aceleración suma Vel por baja.",
    "why_en": "It is his autolevel line. His personals give Avo +15 when attacking first and Spd per kill.",
    "fits": "Solo si te sobra un puesto.",
    "fits_en": "Only if you have a spare slot.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "bardado",
    "name": "Jinete bardado",
    "name_en": "Bardinger",
    "path": [
     "Jinete de ornius",
     "Jinete ligero",
     "Jinete bardado"
    ],
    "weapon": "Lanza",
    "roles": [
     "montado",
     "golpe"
    ],
    "when": [],
    "why": "Ataque veloz da Esq +15 si ataca primero y Aceleración Vel +1 por muerte. Jinete ligero (Refuerzo vital) y Jinete bardado (Égida).",
    "why_en": "His personal skills give Avo +15 when attacking first and Spd +1 per kill. Light Cavalry (Bolster Health) and Bardinger (Aegis).",
    "fits": "Si quieres otro jinete.",
    "fits_en": "If you want another rider.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrero",
    "name": "Guerrero",
    "name_en": "Warrior",
    "path": [
     "Gladiador",
     "Forajido",
     "Guerrero"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Forajido y Guerrero con espadas pesadas.",
    "why_en": "Brigand and Warrior with heavy swords.",
    "fits": "Si su Fue sube bien.",
    "fits_en": "If his Str grows well.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "bardado",
    "name": "Jinete bardado",
    "name_en": "Bardinger",
    "path": [
     "Jinete de ornius",
     "Jinete ligero",
     "Jinete bardado"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque",
     "esquiva",
     "montado"
    ],
    "when": [],
    "why": "Jinete bardado da PV, Fue, Res y Car +10, y su maestra Égida reduce el daño mágico: tapa su Res 25. Ataque veloz (+15 Esq si ataca él) y Aceleración (+2 Vel por baja, hasta +10) lo hacen tanque de esquiva. Va montado: en esta ruta los montados no pueden llevar batallón.",
    "why_en": "Bardinger gives HP, Str, Res and Cha +10, and its mastery Aegis cuts magic damage: it covers his Res 25. Racing Attack (+15 avoid when he attacks) and Accelerate (+2 Spd per kill, up to +10) make him a dodge tank. Mounted: in this route mounted units cannot take a battalion.",
    "fits": "Si falta caballería rápida y no te importa perder el batallón.",
    "fits_en": "If you lack fast cavalry and do not mind losing the battalion.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "baus",
    "name": "Jinete de baus de ataque",
    "name_en": "Attacking Dragoon",
    "path": [
     "Jinete de ornius",
     "Ala Celeste",
     "Jinete de baus"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador",
     "golpe",
     "montado"
    ],
    "when": [
     {
      "has": "PID_ノクチュラ"
     },
     {
      "has": "PID_シロッコ"
     }
    ],
    "why": "Jinete de baus llega con el 14.º envío (cap. 11), así que rinde sobre todo después. Le sobra Vel (crecimiento 50). Va montado: en esta ruta los montados no pueden llevar batallón.",
    "why_en": "Dragoon arrives with the 14th delivery (ch. 11), so it pays off mostly later. He has Spd to spare (50 growth). Mounted: in this route mounted units cannot take a battalion.",
    "fits": "Si Noctula y Sirocco ya hacen de tanques de esquiva y Lysander puede atacar.",
    "fits_en": "If Noctula and Sirocco already dodge-tank and Lysander can attack.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrero",
    "name": "Guerrero de hacha",
    "name_en": "Axe Warrior",
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
    "why": "Forajido (Fue +15) y Guerrero para arreglar una Fue baja; va a pie y lleva batallón. Aceleración lo mantiene doblando si mata.",
    "why_en": "Brigand (Str +15) and Warrior to fix low Str; on foot, so he takes a battalion. Accelerate keeps him doubling if he gets kills.",
    "fits": "Si su Fue sale baja hacia el nivel 15-20.",
    "fits_en": "If his Str comes out low around level 15-20.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-jinetepesado",
    "name": "Tanque de esquiva",
    "name_en": "Evasive tank",
    "path": [
     "Jinete de ornius",
     "Jinete ligero",
     "Catafracto",
     "Jinete pesado"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque",
     "esquiva"
    ],
    "when": [],
    "why": "Jinete ligero, Catafracto (Pavés) y Jinete pesado (Escudo intrépido); el examen pide Lanza A, y la Espada purificadora va de segunda arma. Su personal da Esq +15 si ataca primero.",
    "why_en": "Light Rider, Cataphract (Pavise) and Great Knight (Fierce Shield); the exam needs Lance A, and the Cleansing Blade is his second weapon. His personal gives Avoid +15 when he attacks first.",
    "fits": "Si falta un tanque de esquiva.",
    "fits_en": "If you lack an evasive tank.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-paladin",
    "name": "Paladín bau",
    "name_en": "Bau Lord",
    "path": [
     "Jinete de ornius",
     "Jin. ornius acorazado",
     "Jinete de baus",
     "Paladín bau"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador"
    ],
    "when": [],
    "why": "Paladín bau (pide Lanza A) con la Espada purificadora de segunda arma: dobla, y su personal suma Vel +2 al matar.",
    "why_en": "Bau Lord (needs Lance A) with a Cleansing Blade as second weapon: he doubles, and his personal adds Spd +2 per kill.",
    "fits": "Si prefieres volar.",
    "fits_en": "If you would rather fly.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "punos",
    "name": "Puños",
    "name_en": "Fists",
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
    "why": "Púgil y Guerrero con guanteletes: dos golpes por ataque con su Vel.",
    "why_en": "Pugilist then Warrior with gauntlets: two hits per attack with his Spd.",
    "fits": "Si prefieres daño a pie en lugar de caballería.",
    "fits_en": "If you want foot damage instead of cavalry.",
    "parts": [
     0,
     1
    ],
    "routes": [
     "cai",
     "dietrich",
     "theodora"
    ],
    "debate": {
     "es": "Unos lo ven de los mejores con puños; otros lo dejan en caballería y bajo en el tier.",
     "en": "Some rate him among the best with fists; others keep him on cavalry and low in the tier."
    }
   }
  ],
  "PID_ウーシュラ": [
   {
    "id": "tiradora",
    "name": "Arquera",
    "name_en": "Archer",
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
    "why": "Hab 50 y Vel 50 para Arquero y Tirador. Llega con prestigio 10.",
    "why_en": "Dex 50 and Spd 50 for Archer and Sniper. She arrives at renown 10.",
    "fits": "Solo si falta arquero al final.",
    "fits_en": "Only if you lack an archer late.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "obispa",
    "name": "Obispa con Salamandra",
    "name_en": "Salamander bishop",
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
    "why": "Sacerdote y Obispo; aprende Fortalecer (cura en zona) a rango A. Gestión de recursos da acceso al convoy a los aliados a 2 casillas: armas de recambio para las técnicas de Dietrich.",
    "why_en": "Priest and Bishop; she learns Fortify (area heal) at rank A. Her personal skill gives allies within 2 tiles access to the convoy: spare weapons for Dietrich's arts.",
    "fits": "Si Dietrich gasta muchas técnicas o hace falta curar en zona.",
    "fits_en": "If Dietrich spends many arts or you need area healing.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "tiradora",
    "name": "Tiradora de apoyo",
    "name_en": "Support sniper",
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
    "why": "Arquero (Crescendo) y Tirador (Hab +20).",
    "why_en": "Archer (Crescendo) and Sniper (Dex +20).",
    "fits": "Si no reclutaste a Kiroc, Inyoni ni Peter.",
    "fits_en": "If you did not recruit Kiroc, Inyoni or Peter.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "espada",
    "name": "Rastreadora con espada",
    "name_en": "Sword Ranger",
    "path": [
     "Cazador",
     "Pícaro",
     "Rastreador"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Se une ya de Rastreadora (Vel 50, Hab 50). Con espadas gemelas activa varias veces Astucia (×1,3/×1,5 de daño con probabilidad Sue/2). Gestión de recursos le da el carro a 2 casillas. Llega tarde (prestigio 9, cap. 11); Crescendo le arregla el Gol.",
    "why_en": "She joins already a Ranger (Spd 50, Dex 50). With twin swords she triggers Seize the Chance several times (×1.3/×1.5 damage at Lck/2 chance). Management Skills gives cart access within 2 tiles. She arrives late (renown 9, ch. 11); Crescendo fixes her hit.",
    "fits": "Como pegadora secundaria en el cap. 12, o para cambiar objetos en pleno mapa.",
    "fits_en": "As a secondary hitter in ch. 12, or to swap items mid-map.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "arco",
    "name": "Rastreadora con arco",
    "name_en": "Bow Ranger",
    "path": [
     "Cazador",
     "Pícaro",
     "Rastreador"
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
    "why": "El arco le da ataque a distancia y eficacia contra voladores sin cambiar de clase.",
    "why_en": "Bows give her ranged attacks and effectiveness against fliers without changing class.",
    "fits": "Si falta arquera.",
    "fits_en": "If you lack an archer.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-maestro",
    "name": "Arquera de almacén",
    "name_en": "Storehouse archer",
    "path": [
     "Tirador",
     "Maestro arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero"
    ],
    "when": [],
    "why": "Arquero, Tirador y Maestro arquero con Arco largo. Su personal abre el almacén desde 2 casillas y otra da ×1,5 de daño (prob. Sue/2).",
    "why_en": "Archer, Sniper and Bow Adept with a Longbow. Her personal opens the storehouse from 2 tiles and another deals ×1.5 damage (Lck/2 chance).",
    "fits": "Si faltan arqueros y un almacén en el frente.",
    "fits_en": "If you lack archers and a storehouse at the front.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-buscasombras",
    "name": "Buscasombras",
    "name_en": "Shadow Seeker",
    "path": [
     "Rastreador",
     "Buscasombras"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "esquiva"
    ],
    "when": [],
    "why": "Su autonivel: Pícaro, Rastreador y Buscasombras (Vel 75 efectiva).",
    "why_en": "Her autolevel: Thief, Ranger and Shadow Seeker (effective Spd 75).",
    "fits": "Si prefieres esquiva.",
    "fits_en": "If you prefer evasion.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ルルディヤー": [
   {
    "id": "shido",
    "name": "Espadachina veloz",
    "name_en": "Fast swordswoman",
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
    "why": "Vel 55, Halcón (VA +3) y Percepción (Esq +10/+20 al doblar).",
    "why_en": "Spd 55 and personals that add attack speed +3 and Avo +10/+20 when doubling.",
    "fits": "Solo si Guzran no está.",
    "fits_en": "Only if Guzran is out.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "velocista",
    "name": "Velocista de espada",
    "name_en": "Speedy swordswoman",
    "path": [
     "Cazador",
     "Pícaro",
     "Shido"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [],
    "why": "Vel 55. Halcón da VA +3 si ataca primero. Pícaro primero, luego Shido; Crescendo (parada en Arquero) por su poco acierto.",
    "why_en": "Spd 55. Her personal skill gives AS +3 when attacking first. Rogue first, then Shido; Crescendo (stop at Archer) for her low hit.",
    "fits": "Si necesitas otra velocista; llega tarde.",
    "fits_en": "If you need another speedster; she comes late.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrera",
    "name": "Forajida veloz",
    "name_en": "Fast Brigand",
    "path": [
     "Gladiador",
     "Forajido",
     "Guerrero"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [],
    "why": "Vel 55 con Halcón (+3 Vel al atacar) y Percepción (+10/+20 Esq al doblar); Forajido arregla su Fue (unos 18).",
    "why_en": "Spd 55 with Falcon (+3 Spd when attacking) and Perception (+10/+20 avoid when doubling); Brigand fixes her Str (around 18).",
    "fits": "Si falta un tanque de esquiva.",
    "fits_en": "If you lack a dodge tank.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Shido",
    "name_en": "Shido",
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
    "why": "Mirmidón y Shido para doblar siempre.",
    "why_en": "Myrmidon and Shido to always double.",
    "fits": "Si su Fue sale bien.",
    "fits_en": "If her Str grows well.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-celeste",
    "name": "Jinete celeste antiblindados",
    "name_en": "Anti-armor Celestial Trooper",
    "path": [
     "Shido",
     "Jinete celeste"
    ],
    "weapon": "Espada",
    "roles": [
     "volador",
     "esquiva"
    ],
    "when": [],
    "why": "Pícaro (Desde las sombras), Shido (Siempre alerta) y Jinete celeste (Reflejos relámpago, Mov 7) con Mandoble y Espada purificadora; Halicornio (Vel +15). La Eternidad le arreglaría la Fuerza si queda libre.",
    "why_en": "Thief (In Shadow), Shido (Ever Vigilant) and Celestial Trooper (Lightning Reflexes, Mov 7) with a Greatsword and Cleansing Blade; a Vel +15 mount. The Eternal would fix her Str if it is free.",
    "fits": "Si falta una unidad rápida que mate sin recibir contraataque.",
    "fits_en": "If you lack a fast unit that kills without taking a counter.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-espadachin",
    "name": "Espadachín sin montura",
    "name_en": "Swordmaster on foot",
    "path": [
     "Shido",
     "Espadachín"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [],
    "why": "Camino fácil sin montura: Espadachín (Fobos). No la hagas Batallador: la Fuerza como foco rinde peor.",
    "why_en": "Easy route without a mount: Swordmaster (Astra). Do not make her a Battlemaster: a Str focus does worse.",
    "fits": "Si no quieres montura.",
    "fits_en": "If you do not want a mount.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ペペ": [
   {
    "id": "baus",
    "name": "Jinete de baus",
    "name_en": "Dragoon",
    "path": [
     "Pícaro",
     "Jinete de baus"
    ],
    "weapon": "Lanza",
    "roles": [
     "volador"
    ],
    "when": [],
    "why": "Llega ya de Pícaro, así que no puede pasar a Cuadriguero; Jinete de baus con montura le da la Fue que le falta (Fue 30, Vel 60).",
    "why_en": "He joins as a Rogue, so he cannot become a Charioteer; Dragoon with a mount gives him the Str he lacks (Str 30, Spd 60).",
    "fits": "Casi nunca: es la unidad peor valorada del roster.",
    "fits_en": "Rarely: he is the lowest-rated unit in the roster.",
    "routes": [
     "cai"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "jinete",
    "name": "Jinete arquero",
    "name_en": "Forest Knight",
    "path": [
     "Cazador",
     "Arquero",
     "Jinete arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Vel 60 pero Fue 30. Arquero y Jinete arquero.",
    "why_en": "Spd 60 but Str 30. Archer and Forest Knight.",
    "fits": "Casi nunca: la mayoría lo pone el último.",
    "fits_en": "Rarely: most rate him last.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "arco",
    "name": "Rastreador rematador",
    "name_en": "Finisher Ranger",
    "path": [
     "Cazador",
     "Pícaro",
     "Rastreador"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero"
    ],
    "when": [],
    "why": "Se une ya de Rastreador. Su majestad suma ataque y Crí contra enemigos heridos y Trampa de caza le deja atacar primero un 30 %. Su Fue es 30 %: remata, no abre. Es la unidad peor valorada de la ruta.",
    "why_en": "He joins already a Ranger. King's Majesty adds attack and crit against wounded foes and his hunting trap lets him strike first 30 % of the time. His Str growth is 30 %: he finishes, he does not open. He is the lowest-rated unit in this route.",
    "fits": "Solo si ya lo reclutaste y tienes quien deje heridos a los enemigos.",
    "fits_en": "Only if you already recruited him and someone softens enemies up.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "espada",
    "name": "Rastreador con batallón de Fue",
    "name_en": "Ranger with a Str battalion",
    "path": [
     "Cazador",
     "Pícaro",
     "Rastreador"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Va a pie: con el Mando alto lleva un batallón que suba la Fue, lo que arregla su punto débil. Esto solo existe en esta ruta.",
    "why_en": "He is on foot: with high Authority he takes a battalion that raises Str, fixing his weak spot. This only exists in this route.",
    "fits": "Si le subes el Mando y te sobra un batallón de Fue.",
    "fits_en": "If you raise his Authority and have a spare Str battalion.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-caballeroarco",
    "name": "Caballero arco",
    "name_en": "Bow Knight",
    "path": [
     "Jinete arquero",
     "Caballero arco"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [],
    "why": "Arquero, Jinete arquero y Caballero arco (petición de Kalla, Cruz del cazador); Vel 60.",
    "why_en": "Archer, Forest Knight and Bow Knight (Kalla's request, Hunter's Cross); Spd 60.",
    "fits": "Si falta arquero.",
    "fits_en": "If you lack an archer.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ディートリヒ": [
   {
    "id": "shido",
    "name": "Espadachín crítico",
    "name_en": "Crit swordsman",
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
    "why": "Con Hab 60 y Car 60 de crecimiento ya critica mucho. Mirmidón deja Técnica devastadora y Shido Siempre alerta (cura al matar con crítico). Una parada en Pícaro sin subir de nivel añade Desde las sombras. Se le deja solo en una esquina con curas encima.",
    "why_en": "With Dex 60 and Cha 60 growths he already crits a lot. Myrmidon leaves Ravaging Arts and Shido leaves Ever Vigilant (heals on a critical kill). A stop at Rogue without levelling there adds In Shadow. Leave him alone in a corner with heals on him.",
    "fits": "Siempre: es el plan por defecto.",
    "fits_en": "Always: it is the default plan.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrero",
    "name": "Guerrero acorazado",
    "name_en": "Armored warrior",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Guerrero"
    ],
    "weapon": "Espada",
    "roles": [
     "tanque",
     "golpe"
    ],
    "when": [
     {
      "lacks_role": "tanque"
     }
    ],
    "why": "Soldado acorazado (Def +25, Fue +10, maestra Contra mayor) y Guerrero (PV +20, Fue +20, maestra Técnica entrenada) sin perder la espada. Shido solo para la maestría. Puede perder Vel para la Parte 3.",
    "why_en": "Armored Knight (Def +25, Str +10, mastery Great Counter) and Warrior (HP +20, Str +20, mastery Practiced Art) while keeping the sword. Shido only for its mastery. He may fall behind in Spd for Part 3.",
    "fits": "Si falta tanque o sus subidas de Fue y Def salen bajas.",
    "fits_en": "If you lack a tank or his Str and Def level-ups come out low.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-hoja",
    "name": "La Hoja con Siempre alerta",
    "name_en": "The Blade with Ever Vigilant",
    "path": [
     "Shido",
     "Espadachín",
     "La Hoja"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe",
     "esquiva"
    ],
    "when": [],
    "why": "Shido deja Siempre alerta (cura al matar con crítico), Espadachín deja Fobos (5 golpes) y La Hoja suma Crí +10 con espada y Agudeza bendita (Vel +10). Con Hab 60 y Sue 50 ronda el 40-55 % de crítico. Pasa antes por Mirmidón por Técnica devastadora.",
    "why_en": "Shido leaves Ever Vigilant (heals on a critical kill), Swordmaster leaves Astra (5 hits) and The Blade adds Crit +10 with swords and Divine Insight (Spd +10). With Dex 60 and Lck 50 he sits around 40-55 % crit. Go through Myrmidon first for Ravaging Arts.",
    "fits": "Casi siempre: seis fuentes le dan La Hoja. Lleva Espada purificadora contra la Protección del inframundo.",
    "fits_en": "Almost always: six sources give him The Blade. Carry a Cleansing Blade against the underworld protection.",
    "parts": [
     2,
     3
    ],
    "debate": {
     "es": "A La Hoja se llega desde Espadachín o desde Buscasombras; no hay acuerdo sobre cuál.",
     "en": "The Blade is reached from Swordmaster or from Shadow Seeker; there is no agreement on which."
    }
   },
   {
    "id": "p3-buscasombras",
    "name": "Espada y arco: Buscasombras",
    "name_en": "Sword and bow: Shadow Seeker",
    "path": [
     "Rastreador",
     "Buscasombras"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe",
     "arquero"
    ],
    "when": [],
    "why": "Rastreador (Contratiro) y Buscasombras: Vel +25 y Fue -5 frente a Espadachín, y arco para los voladores.",
    "why_en": "Ranger (Countershot) into Shadow Seeker: Spd +25 and Str -5 compared with Swordmaster, plus a bow for fliers.",
    "fits": "Si quieres espada y arco a la vez; es la opción minoritaria.",
    "fits_en": "If you want sword and bow at once; few players take it.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ファビオ": [
   {
    "id": "vate",
    "name": "Vate de largo alcance",
    "name_en": "Long-range ovate",
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
    "why": "Chamán (Mag +15) y Vate (Mag +20, Hab +15). Ciénaga Β pega a 1-3 casillas y Llamado oscuro quita Evit −5 a los enemigos de al lado (radio 2 a nv 20, 3 a nv 35): más críticos para Dietrich. Una parada en Sacerdote sin subir de nivel deja Devoción.",
    "why_en": "Shaman (Mag +15) and Ovate (Mag +20, Dex +15). Mire B hits at 1-3 range and his Dark Call aura gives adjacent enemies Ddg −5 (radius 2 at lv 20, 3 at lv 35): more crits for Dietrich. A stop at Priest without levelling there leaves Piety.",
    "fits": "Siempre: es el mago fijo de la ruta y no se puede sacar del equipo. Que se quede dentro del radio del frente.",
    "fits_en": "Always: he is the route's fixed mage and cannot leave the team. Keep him within range of the front line.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-druida",
    "name": "Druida de magia oscura",
    "name_en": "Dark magic druid",
    "path": [
     "Vate",
     "Druida"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago"
    ],
    "when": [
     {
      "has": "PID_ディートリヒ"
     }
    ],
    "why": "Druida (Mag +30) con Luna Λ, que ignora la Res, y Miasma. Su personal baja la esquiva enemiga a 2-3 casillas: más críticos para Dietrich.",
    "why_en": "Druid (Mag +30) with Luna Λ, which ignores Res, and Miasma. His personal lowers enemy avoid within 2-3 tiles: more crits for Dietrich.",
    "fits": "Con Dietrich en el equipo, o contra enemigos de Def alta y Res baja.",
    "fits_en": "With Dietrich on the team, or against high-Def, low-Res enemies.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-valquiria",
    "name": "Valquiria que cura",
    "name_en": "Healing Valkyrium",
    "path": [
     "Augur",
     "Chamán",
     "Vate",
     "Valquiria"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago",
     "sanador"
    ],
    "when": [
     {
      "lacks_role": "sanador"
     }
    ],
    "why": "Valquiria conserva la magia blanca, que el Druida pierde.",
    "why_en": "Valkyrium keeps white magic, which Druid loses.",
    "fits": "Si nadie más cura.",
    "fits_en": "If nobody else heals.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ゲイツ": [
   {
    "id": "bardado",
    "name": "Jinete bardado",
    "name_en": "Bardinger",
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
    "why": "Solo se recluta en esta ruta. Refuerzos da Def +3 a los aliados de al lado y Colmillo centella puede dar Ata +4 y Gol +50. Jinete bardado (Égida) le da movimiento y defensa mágica.",
    "why_en": "Only recruitable on this route. His personal skill gives adjacent allies Def +3 and another can give Atk +4 and Hit +50. Bardinger (Aegis) gives movement and magic defense.",
    "fits": "Si lo reclutas (prestigio 10, paralela de 5 turnos) y quieres un frente móvil.",
    "fits_en": "If you recruit him (renown 10, 5-turn paralogue) and want a mobile front-liner.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "cuadriguero",
    "name": "Cuadriguero",
    "name_en": "Charioteer",
    "path": [
     "Soldado",
     "Cuadriguero",
     "Jinete arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "montado"
    ],
    "when": [
     {
      "lacks_role": "arquero"
     }
    ],
    "why": "Cuadriguero pide Arco C y Equitación D.",
    "why_en": "Charioteer needs Bow C and Riding D.",
    "fits": "Si falta arquero.",
    "fits_en": "If you lack an archer.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Espadachín",
    "name_en": "Swordsman",
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
    "why": "Mirmidón y Shido para pegar con espada.",
    "why_en": "Myrmidon and Shido to hit with swords.",
    "fits": "Si ya tienes tanques.",
    "fits_en": "If you already have tanks.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-auricalcado",
    "name": "Auricalcado",
    "name_en": "Orichaldia",
    "path": [
     "Soldado",
     "Jinete ligero",
     "Jinete bardado",
     "Auricalcado"
    ],
    "weapon": "Lanza",
    "roles": [
     "montado"
    ],
    "when": [],
    "why": "Jinete bardado (Égida) y Auricalcado (Lanza feroz). Su personal da Def +3 a los de al lado.",
    "why_en": "Bardinger (Aegis) into Orichaldia (Fierce Spear). His personal gives adjacent allies Def +3.",
    "fits": "Solo de relleno: llega tarde y con stats bajos.",
    "fits_en": "Only as filler: he arrives late with low stats.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_サラン": [
   {
    "id": "obispa",
    "name": "Sanadora de zona",
    "name_en": "Area healer",
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
    "why": "Trae una Salamandra y aprende Fortalecer. Alerta da Vel +2 a los aliados de al lado (+4 a nv 35).",
    "why_en": "She brings a Salamander and learns Fortify. Her personal skill gives adjacent allies Spd +2 (+4 at lv 35).",
    "fits": "Si la reclutas (prestigio 10): vale sobre todo por la Salamandra.",
    "fits_en": "If you recruit her (renown 10): worth it mostly for the Salamander.",
    "routes": [
     "dietrich"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-valquiria",
    "name": "Valquiria de apoyo",
    "name_en": "Support Valkyrium",
    "path": [
     "Augur",
     "Sacerdote",
     "Obispo",
     "Valquiria"
    ],
    "weapon": "Magia blanca",
    "roles": [
     "mago",
     "sanador"
    ],
    "when": [],
    "why": "Valquiria (petición de Jurah): ataca con viento y cura; su personal da Vel +4 a los de al lado desde la segunda fila. Frágil.",
    "why_en": "Valkyrium (Jurah's request): attacks with wind and heals; her personal gives adjacent allies Spd +4 from the second row. Fragile.",
    "fits": "Si hay pegadores a los que dar Vel.",
    "fits_en": "If you have hitters to give Spd to.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_セオドラ": [
   {
    "id": "guardiana",
    "name": "Guardiana tanque y sanadora",
    "name_en": "Tank and healer Guardian",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Guardián"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque",
     "sanador"
    ],
    "when": [],
    "why": "Guardián usa lanza y magia blanca: cura con Física a rango B siendo la más resistente del equipo (crecimientos en Guardián: PV 80, Def 50, Res 45). Se abre con 10 envíos de suministros, hacia el cap. 9. Si no dobla, pasa antes por Arquero (Crescendo) o Mirmidón. Lleva batallón de magos (ataque en X) para cubrir las diagonales de sus rocas.",
    "why_en": "Guardian uses lances and white magic: she heals with Physic at rank B while being the sturdiest unit (Guardian growths: HP 80, Def 50, Res 45). It opens after 10 supply deliveries, around ch. 9. If she does not double, go through Archer (Crescendo) or Myrmidon first. Give her a mage battalion (X-shaped attack) to cover the diagonals of her boulders.",
    "fits": "Casi siempre, y sobre todo si Sofia es la única sanadora.",
    "fits_en": "Almost always, especially if Sofia is the only healer.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrera",
    "name": "Cañón de rocas con guanteletes",
    "name_en": "Boulder cannon with gauntlets",
    "path": [
     "Gladiador",
     "Púgil",
     "Guerrero"
    ],
    "weapon": "Guanteletes",
    "roles": [
     "golpe",
     "tanque"
    ],
    "when": [
     {
      "has": "PID_ニネ"
     }
    ],
    "why": "Púgil y Guerrero suben su Fue (crecimiento 70 en Guerrero, PV 90) para que Cañón telúrico mate de un golpe a 5-7 casillas. Pierde Vel al pasar de Púgil (Vel +10) a Guerrero.",
    "why_en": "Pugilist and Warrior raise her Str (70 growth as Warrior, HP 90) so Earthen Hurl one-shots from 5-7 tiles. She loses Spd going from Pugilist (Spd +10) to Warrior.",
    "fits": "Si otra unidad cura además de Sofia (Ninae de Guardiana) y quieres que Theodora haga daño.",
    "fits_en": "If someone besides Sofia heals (Ninae as Guardian) and you want Theodora to deal damage.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Espadachina veloz",
    "name_en": "Fast Shido",
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
    "why": "Shido sube su Vel a crecimiento 55 y deja Siempre alerta. Conserva la lanza, y la espada le sirve en la Parte 3 con la Espada purificadora.",
    "why_en": "Shido raises her Spd growth to 55 and leaves Ever Vigilant. She keeps lances, and swords carry into Part 3 with the Cleansing Blade.",
    "fits": "Si su Vel sale baja (unos 40) y los enemigos la doblan.",
    "fits_en": "If her Spd comes out low (around 40) and enemies double her.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-tridente",
    "name": "El Tridente",
    "name_en": "The Trident",
    "path": [
     "Guardián",
     "Centinela",
     "El Tridente"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque",
     "sanador"
    ],
    "when": [],
    "why": "Soldado acorazado, Guardián, Centinela (Pose resuelta) y El Tridente (Muralla bendita, Def +10; magia blanca ×3). Pasa por Arquero (clase puente) para Crescendo. Sanar, Ángeles y Alabarda contra blindados.",
    "why_en": "Armored Soldier, Guardian, Sentinel (Resolute Stance) and The Trident (Divine Wall, Def +10; white magic ×3). Go through Archer (bridge class) for Crescendo. Heal, Angels and a halberd against armor.",
    "fits": "Casi siempre: dos fuentes ven El Tridente como la mejor Divina y es su clase hecha a medida.",
    "fits_en": "Almost always: two sources rate The Trident as the best Divine class and it is made for her.",
    "parts": [
     2,
     3
    ],
    "debate": {
     "es": "El Tridente es para una sola unidad: Theodora, Eshmel o Ultand.",
     "en": "The Trident goes to one unit only: Theodora, Eshmel or Ultand."
    }
   }
  ],
  "PID_トビヤス": [
   {
    "id": "catafracto",
    "name": "Catafracto de lanza",
    "name_en": "Lance Cataphract",
    "path": [
     "Soldado",
     "Jinete ligero",
     "Catafracto"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque",
     "golpe",
     "montado"
    ],
    "when": [],
    "why": "Catafracto es la clase que solo esta ruta abre (8 envíos de suministros, hacia el cap. 8): le deja PV 70, Fue 75 y Def 55 de crecimiento, y su maestra Pavés corta el daño físico. Va montado: en esta ruta los montados no pueden llevar batallón. Su Hab 30 falla golpes: Escudo de Hexlock para la Res.",
    "why_en": "Cataphract is the class only this route opens (8 supply deliveries, around ch. 8): it gives HP 70, Str 75 and Def 55 growths, and its mastery Pavise cuts physical damage. Mounted: in this route mounted units cannot take a battalion. His Dex 30 misses: a Hexlock shield for Res.",
    "fits": "Si has hecho 8 envíos y quieres un tanque móvil que pegue fuerte.",
    "fits_en": "If you made 8 deliveries and want a mobile tank that hits hard.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "guerrero",
    "name": "Guerrero de técnicas",
    "name_en": "Arts Warrior",
    "path": [
     "Gladiador",
     "Forajido",
     "Guerrero"
    ],
    "weapon": "Hacha",
    "roles": [
     "golpe"
    ],
    "when": [
     {
      "has": "PID_ボナパルテ"
     }
    ],
    "why": "Forajido y Guerrero (Fue 80 de crecimiento) para Técnica potente (+3 ataque) y Órdago (×1,3 al 30 %). Su Hab 30 y Vel 25 fallan golpes: Bonaventure al lado le da Hab +3 y un 30 % de Gol +10/+20, así no hace falta parchearlo. Lleva batallón de curación para curarse delante.",
    "why_en": "Brigand and Warrior (Str 80 growth) for Power Arts (+3 attack) and All-Out Attack (×1.3 at 30 %). His Dex 30 and Spd 25 miss: Bonaventure next to him gives Dex +3 and a 30 % chance of Hit +10/+20, so no patching needed. Give him a healing battalion to self-heal up front.",
    "fits": "Con Bonaventure adyacente: es la versión del equipo de seis fijos.",
    "fits_en": "With Bonaventure adjacent: the version used in the core six team.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "hoplita",
    "name": "Hoplita con batallón",
    "name_en": "Dreadnought with battalion",
    "path": [
     "Soldado",
     "Soldado acorazado",
     "Hoplita"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque"
    ],
    "when": [],
    "why": "Hoplita (Fue 75 y Def 75 de crecimiento) no necesita envíos y, al ir a pie, sí lleva batallón. Con la Lanza de Mahamaru acierta más que con hacha.",
    "why_en": "Dreadnought (Str 75 and Def 75 growths) needs no deliveries and, on foot, can take a battalion. With Mahamaru's lance he hits more often than with axes.",
    "fits": "Si quieres batallón en él o aún no tienes los 8 envíos.",
    "fits_en": "If you want him to carry a battalion or lack the 8 deliveries.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "arquero",
    "name": "Jinete arquero de técnicas",
    "name_en": "Arts Forest Knight",
    "path": [
     "Cazador",
     "Arquero",
     "Jinete arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero",
     "golpe",
     "montado"
    ],
    "when": [
     {
      "lacks": "PID_ボナパルテ"
     }
    ],
    "why": "Arquero le da Crescendo (+3 Gol por baja, hasta +30) para su Hab 30; con su Fue 60 y Técnica potente las técnicas de arco de varios golpes pegan mucho. Va montado: en esta ruta los montados no pueden llevar batallón.",
    "why_en": "Archer gives him Crescendo (+3 Hit per kill, up to +30) for his Dex 30; with Str 60 and Power Arts, multi-hit bow arts hit hard. Mounted: in this route mounted units cannot take a battalion.",
    "fits": "Si Bonaventure no va a su lado y la hacha falla demasiado.",
    "fits_en": "If Bonaventure is not beside him and axes miss too often.",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-batallador",
    "name": "Batallador con Martillo",
    "name_en": "Hammer Battlemaster",
    "path": [
     "Guerrero",
     "Batallador"
    ],
    "weapon": "Hacha",
    "roles": [
     "golpe"
    ],
    "when": [
     {
      "has": "PID_ボナパルテ"
     },
     {
      "has": "PID_ベルトラン"
     },
     {
      "has": "PID_ムウ"
     }
    ],
    "why": "Fue 60, la más alta del juego. Forajido, Guerrero (Técnica entrenada) y Batallador (Golpe maestro) con Martillo contra blindados. Su Hab 30 falla: Crescendo y el personal de Bonaventure (+20 Gol al 30 %) lo compensan.",
    "why_en": "Str 60, the highest in the game. Brigand, Warrior (Practiced Art) and Battlemaster (War Master's Strike) with a Hammer against armor. His Dex 30 misses: Crescendo and Bonaventure's personal (+20 Hit at 30 %) make up for it.",
    "fits": "Casi siempre como pegador; con Bertrand o Mu, ellos se quedan La Eternidad.",
    "fits_en": "Almost always as a hitter; with Bertrand or Mu, they take The Eternal.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-eternidad",
    "name": "La Eternidad",
    "name_en": "The Eternal",
    "path": [
     "Guerrero",
     "Batallador",
     "La Eternidad"
    ],
    "weapon": "Hacha",
    "roles": [
     "golpe"
    ],
    "when": [
     {
      "has": "PID_ボナパルテ"
     },
     {
      "lacks": "PID_ベルトラン"
     },
     {
      "lacks": "PID_ムウ"
     }
    ],
    "why": "La Eternidad (Poder bendito, Fue +10): 90 de crecimiento efectivo de Fue.",
    "why_en": "The Eternal (Divine Might, Str +10): effective Str growth of 90.",
    "fits": "Sin Bertrand ni Mu: solo hay una Balanza del juicio.",
    "fits_en": "Without Bertrand or Mu: there is only one Scales of Judgment.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ボナパルテ": [
   {
    "id": "vate",
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
    "why": "Chamán y Vate (Mag +20, Hab +15, Def −10) con magia de viento y hielo. Sabio consejo da Hab +3 a los de al lado y Datos adicionales, un 30 % de Gol +10 (nv 20) o +20 (nv 35). Usa la Antorcha antes de acabar cada mapa: rellena una parte fija de la barra de EXP.",
    "why_en": "Shaman and Ovate (Mag +20, Dex +15, Def −10) with wind and ice spells. Sage Advice gives adjacent allies Dex +3 and Additional Intel a 30 % chance of Hit +10 (lv 20) or +20 (lv 35). Use the Torch before each map ends: it fills a fixed part of the EXP bar.",
    "fits": "Casi siempre, junto a quien falla golpes (Tobias, Lilian).",
    "fits_en": "Almost always, next to whoever misses (Tobias, Lilian).",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "shido",
    "name": "Espadachín con Espada trueno",
    "name_en": "Levin Sword Shido",
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
    "why": "Tiene buena aptitud de espada: con Espada trueno hace más daño que con hechizos. Su aura de precisión sigue funcionando.",
    "why_en": "He has a good sword aptitude: with a Levin Sword he deals more damage than with spells. His accuracy aura still works.",
    "fits": "Si ya hay varios magos (Sirocco, Dante, Olympia).",
    "fits_en": "If you already have several mages (Sirocco, Dante, Olympia).",
    "routes": [
     "theodora"
    ],
    "parts": [
     0,
     1
    ]
   },
   {
    "id": "p3-druida",
    "name": "Druida de crítico",
    "name_en": "Crit druid",
    "path": [
     "Vate",
     "Druida"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago"
    ],
    "when": [],
    "why": "Druida con Bastón mágico y Agonía Γ; su personal da Gol +10 (+20 a nivel 35) al 30 %. De los más rápidos con Espada trueno.",
    "why_en": "Druid with a magic staff and Death Γ; his personal gives Hit +10 (+20 at level 35) at 30 %. One of the fastest with a Levin Sword.",
    "fits": "Si falta un mago de crítico.",
    "fits_en": "If you lack a crit mage.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ベルトラン": [
   {
    "id": "p3-eternidad",
    "name": "La Eternidad con Zalmoxis",
    "name_en": "Eternal with Zalmoxis",
    "path": [
     "Guerrero",
     "Batallador",
     "La Eternidad"
    ],
    "weapon": "Hacha",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Entra como Guerrero (Técnica entrenada). Batallador deja Golpe maestro (×1,5) y La Eternidad Poder bendito (Fue +10). El arte Ruptura+ de su Zalmoxis anula la Protección del inframundo: es de los pocos que hacen rendir un hacha en la Parte 3.",
    "why_en": "He joins as a Warrior (Practiced Art). Battlemaster leaves War Master's Strike (×1.5) and The Eternal Divine Might (Str +10). His Zalmoxis art cancels the underworld protection: one of the few who make an axe work in Part 3.",
    "fits": "Casi siempre: dos fuentes le dan La Eternidad, su clase hecha a medida.",
    "fits_en": "Almost always: two sources give him The Eternal, the class made for him.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-batallador",
    "name": "Batallador con espada",
    "name_en": "Sword Battlemaster",
    "path": [
     "Guerrero",
     "Batallador"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Sus artes de espada son sorprendentemente buenas: Batallador con Espada purificadora o Espada trueno.",
    "why_en": "His sword arts are surprisingly good: Battlemaster with a Cleansing Blade or Levin Sword.",
    "fits": "Si no tienes Zalmoxis.",
    "fits_en": "If you do not have Zalmoxis.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_キリーク": [
   {
    "id": "p3-auricalcado",
    "name": "Jinete rápido con espada",
    "name_en": "Fast sword rider",
    "path": [
     "Jinete bardado",
     "Auricalcado"
    ],
    "weapon": "Espada",
    "roles": [
     "montado",
     "golpe"
    ],
    "when": [],
    "why": "Entra como Jinete bardado a nivel 40 con Fue 50, Vel 60 y Hab 50 de crecimiento. Auricalcado (Lanza feroz) con Espada purificadora y Espada trueno; las artes de velocidad aseguran el doble.",
    "why_en": "He joins as a Bardinger at level 40 with Str 50, Spd 60 and Dex 50 growths. Orichaldia (Fierce Spear) with Cleansing Blade and Levin Sword; speed arts secure the double.",
    "fits": "Si faltan atacantes físicos rápidos y Cai lleva El Cabalgador.",
    "fits_en": "If you lack fast physical attackers and Cai holds The Cavalier.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-cabalgador",
    "name": "El Cabalgador con espada",
    "name_en": "Sword Cavalier",
    "path": [
     "Jinete bardado",
     "Auricalcado",
     "El Cabalgador"
    ],
    "weapon": "Espada",
    "roles": [
     "montado",
     "golpe"
    ],
    "when": [
     {
      "lacks": "PID_カイ"
     }
    ],
    "why": "El Cabalgador le da montura inmune a la eficacia contra caballería y Destreza bendita (Hab +10); una fuente se lo da a él antes que a Cai.",
    "why_en": "The Cavalier gives him a mount immune to anti-cavalry effectiveness and Divine Dexterity (Dex +10); one source picks him over Cai.",
    "fits": "Sin Cai en el equipo: solo hay una Montura de divinio.",
    "fits_en": "Without Cai on the team: there is only one Divinium Saddle.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_コウカ": [
   {
    "id": "p3-druida",
    "name": "Druida de daño",
    "name_en": "Damage druid",
    "path": [
     "Vate",
     "Druida"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago"
    ],
    "when": [],
    "why": "Entra como Vate. Druida (Mag +30 de crecimiento, magia negra ×2) con Salamandra y Thoron; su personal da Gol +10 con magia y Rueda de cristal atraviesa la Protección. Llega pronto a Rescate y Warp.",
    "why_en": "She joins as an Ovate. Druid (Mag +30 growth, black magic ×2) with Salamander and Thoron; her personal gives Hit +10 with magic and her crystal wheel pierces the protection. She learns Rescue and Warp early.",
    "fits": "Si falta un mago de daño con utilidad.",
    "fits_en": "If you lack a damage mage with utility.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-valquiria",
    "name": "Valquiria con las dos magias",
    "name_en": "Valkyrium with both magics",
    "path": [
     "Vate",
     "Valquiria"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago",
     "sanador"
    ],
    "when": [
     {
      "lacks_role": "sanador"
     }
    ],
    "why": "Valquiria (petición de Jurah) conserva las dos magias y deja Mantra de paz; el Druida pierde la blanca.",
    "why_en": "Valkyrium (Jurah's request) keeps both magics and leaves Song of Calm; Druid loses white magic.",
    "fits": "Si nadie más cura.",
    "fits_en": "If nobody else heals.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_アナトリア": [
   {
    "id": "p3-druida",
    "name": "Druida de área",
    "name_en": "Area druid",
    "path": [
     "Vate",
     "Druida"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago"
    ],
    "when": [],
    "why": "Crecimientos totales 385. Druida con Salamandra y Espada del juicio; Rueda de cristal atraviesa la Protección y sus artes de llama son de área y limpian miasma.",
    "why_en": "385 total growths. Druid with Salamander and Sword of Judgment; her crystal wheel pierces the protection and her flame arts hit an area and clear miasma.",
    "fits": "Casi siempre como maga de daño en área.",
    "fits_en": "Almost always as an area damage mage.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_セントリオン": [
   {
    "id": "p3-bastion",
    "name": "Caballero bastión",
    "name_en": "Castle Knight",
    "path": [
     "Hoplita",
     "Caballero bastión"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque"
    ],
    "when": [],
    "why": "Entra como Hoplita; Caballero bastión y sin más cambios, porque al cambiar de clase pierde Def. Su personal reduce a la mitad el primer combate de la fase enemiga.",
    "why_en": "He joins as a Dreadnought; Castle Knight and no further changes, since reclassing costs him Def. His personal halves damage in his first enemy-phase fight.",
    "fits": "Si falta tanque; débil a magos.",
    "fits_en": "If you lack a tank; weak to mages.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_アスワン": [
   {
    "id": "p3-maestro",
    "name": "Maestra arquera",
    "name_en": "Bow Adept",
    "path": [
     "Tirador",
     "Maestro arquero"
    ],
    "weapon": "Arco",
    "roles": [
     "arquero"
    ],
    "when": [],
    "why": "Entra como Tirador; su personal da Gol +20 con arco. Llega tarde (sección 4).",
    "why_en": "She joins as a Sniper; her personal gives Hit +20 with bows. She arrives late (section 4).",
    "fits": "Relleno para los 25 huecos del mapa final.",
    "fits_en": "Filler for the 25 slots of the final map.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_グラディウス": [
   {
    "id": "p3-espadachin",
    "name": "Espadachín",
    "name_en": "Swordmaster",
    "path": [
     "Shido",
     "Espadachín"
    ],
    "weapon": "Espada",
    "roles": [
     "golpe"
    ],
    "when": [],
    "why": "Entra como Shido con Vel 65 y Fue 55 de crecimiento: dobla. Espadachín (Fobos) con Espada purificadora y Siempre alerta. Llega en la sección 4 y ninguna guía lo trata.",
    "why_en": "He joins as a Shido with Spd 65 and Str 55 growths: he doubles. Swordmaster (Astra) with a Cleansing Blade and Ever Vigilant. He arrives in section 4 and no guide covers him.",
    "fits": "Relleno de espada.",
    "fits_en": "Sword filler.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_オルヘル": [
   {
    "id": "p3-docto",
    "name": "Docto que aguanta",
    "name_en": "Sturdy Wiseman",
    "path": [
     "Obispo",
     "Docto"
    ],
    "weapon": "Magia blanca",
    "roles": [
     "sanador"
    ],
    "when": [
     {
      "has": "PID_シロッコ"
     },
     {
      "has": "PID_オリンピア"
     }
    ],
    "why": "Res 85 y Def 50 efectivas en Docto: sanadora que aguanta. Haz estelar (alcance 3), Aura y Ángeles; se cura al curar a otros. No puede montar ni volar.",
    "why_en": "Effective Res 85 and Def 50 as a Wiseman: a healer who holds the line. Starlight (range 3), Aura and Angels; she heals herself when healing others. She cannot ride or fly.",
    "fits": "Casi siempre como sanadora; con Sirocco u Olympia, ellos se quedan La Encarnación.",
    "fits_en": "Almost always as a healer; with Sirocco or Olympia, they take The Avatar.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-encarnacion",
    "name": "La Encarnación blanca",
    "name_en": "White Avatar",
    "path": [
     "Obispo",
     "Docto",
     "La Encarnación"
    ],
    "weapon": "Magia blanca",
    "roles": [
     "sanador"
    ],
    "when": [
     {
      "lacks": "PID_シロッコ"
     },
     {
      "lacks": "PID_オリンピア"
     }
    ],
    "why": "Su autonivel la lleva a La Encarnación a nivel 55: Mag +10 y usos de magia ×3, con Res 90.",
    "why_en": "Her autolevel takes her to The Avatar at level 55: Mag +10 and magic uses ×3, with Res 90.",
    "fits": "Sin Sirocco ni Olympia: solo hay un Loto del renacer.",
    "fits_en": "Without Sirocco or Olympia: there is only one Lotus of Reincarnation.",
    "parts": [
     2,
     3
    ],
    "debate": {
     "es": "La Encarnación es para una sola unidad: Sirocco, Olympia u Orchel.",
     "en": "The Avatar goes to one unit only: Sirocco, Olympia or Orchel."
    }
   }
  ],
  "PID_タリムーン": [
   {
    "id": "p3-calamidad",
    "name": "Truhan y La Calamidad",
    "name_en": "Trickster into Calamity",
    "path": [
     "Vate",
     "Truhan",
     "La Calamidad"
    ],
    "weapon": "Espada",
    "roles": [],
    "when": [],
    "why": "Su autonivel lo lleva a Truhan (su clase personal, Juego sucio) y La Calamidad (Destino bendito, Sue +10): 520 de crecimiento efectivo, el mayor. Sus maldiciones bajan a la mitad el acierto o cambian Def y Res a alcance 10.",
    "why_en": "His autolevel takes him to Trickster (his personal class, Foul Play) and The Calamity (Divine Will, Lck +10): 520 effective growth, the highest. His curses halve hit or swap Def and Res at range 10.",
    "fits": "Casi siempre: es su clase hecha a medida y lidera el quinto equipo.",
    "fits_en": "Almost always: the class is made for him and he leads the fifth squad.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-druida",
    "name": "Druida de daño",
    "name_en": "Damage druid",
    "path": [
     "Vate",
     "Druida"
    ],
    "weapon": "Magia negra",
    "roles": [
     "mago"
    ],
    "when": [],
    "why": "Druida para daño mágico con Mag 45 de crecimiento.",
    "why_en": "Druid for magic damage with a Mag growth of 45.",
    "fits": "Si prefieres otro mago de daño.",
    "fits_en": "If you would rather have another damage mage.",
    "parts": [
     2,
     3
    ]
   }
  ],
  "PID_ネイサン": [
   {
    "id": "p3-bastion",
    "name": "Pesado con acierto",
    "name_en": "Accurate heavy",
    "path": [
     "Hoplita",
     "Caballero bastión"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque"
    ],
    "when": [],
    "why": "Fue 60 y Hab 60: el único pesado que acierta. Caballero bastión (Bloqueo) con el arte Tempestad (+20 Gol, +12 de poder).",
    "why_en": "Str 60 and Dex 60: the only heavy unit who hits reliably. Castle Knight (Intercept) with a +20 Hit, +12 might lance art.",
    "fits": "Si falta un tanque físico con acierto. Vel 25: los magos lo doblan.",
    "fits_en": "If you lack an accurate physical tank. Spd 25: mages double him.",
    "parts": [
     2,
     3
    ]
   },
   {
    "id": "p3-jinetepesado",
    "name": "Jinete pesado",
    "name_en": "Great Knight",
    "path": [
     "Catafracto",
     "Jinete pesado"
    ],
    "weapon": "Lanza",
    "roles": [
     "tanque",
     "montado"
    ],
    "when": [],
    "why": "Su autonivel: Catafracto y Jinete pesado (Escudo intrépido, mitad de daño al 50 %).",
    "why_en": "His autolevel: Cataphract and Great Knight (Fierce Shield, half damage at 50 %).",
    "fits": "Si quieres un tanque montado.",
    "fits_en": "If you want a mounted tank.",
    "parts": [
     2,
     3
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
  },
  "cai": {
   "PID_カイ": "S",
   "PID_グザラン": "S/A+",
   "PID_ノクチュラ": "A+",
   "PID_エスメラルダ": "A+",
   "PID_ヌッツォ": "A",
   "PID_ピーテル": "A-",
   "PID_アレキサンドラ": "A-",
   "PID_ティアラ": "B+/A-",
   "PID_ソフィア": "B+/A-",
   "PID_ウルタンド": "B+",
   "PID_シロッコ": "B+",
   "PID_オリンピア": "B+",
   "PID_ムウ": "B+",
   "PID_ニネ": "B+",
   "PID_ナジャ": "B+",
   "PID_セテス": "B+",
   "PID_ヨーカイ": "B",
   "PID_ロレッタ": "B",
   "PID_ヌディーヌ": "B",
   "PID_ゴライアス": "B-",
   "PID_ダンテ": "B-",
   "PID_マジーデ": "B-",
   "PID_イニオニ": "B-",
   "PID_シモン": "B-",
   "PID_ジャスミン": "B-/C+",
   "PID_ベンディッツ": "C+",
   "PID_キロイカ": "C+",
   "PID_リリアン": "C+",
   "PID_カターニャ": "C+",
   "PID_イオ": "C+",
   "PID_ダイトウ": "C+",
   "PID_フィアナ": "C",
   "PID_ミカエラ": "C",
   "PID_ハルヴィン": "C",
   "PID_マクシム": "C",
   "PID_ディエゴ": "C-",
   "PID_ライサンダー": "C-",
   "PID_ウーシュラ": "C-",
   "PID_ルルディヤー": "C-",
   "PID_ザーコネ": "C-",
   "PID_ペペ": "D"
  },
  "dietrich": {
   "PID_エスメラルダ": "S",
   "PID_ファビオ": "A+/S-",
   "PID_ノクチュラ": "A+",
   "PID_キロイカ": "A",
   "PID_オリンピア": "A",
   "PID_ヨーカイ": "A-",
   "PID_シモン": "A-",
   "PID_ウルタンド": "A-",
   "PID_グザラン": "A-",
   "PID_バッカニア": "B+/A-",
   "PID_ダンテ": "B+/A-",
   "PID_ミカエラ": "B+",
   "PID_ムウ": "B+",
   "PID_イオ": "B+",
   "PID_ゴライアス": "B+",
   "PID_マクシム": "B+",
   "PID_ウーシュラ": "B+",
   "PID_ピーテル": "B+",
   "PID_ゲイツ": "B+",
   "PID_イニオニ": "B+",
   "PID_シロッコ": "B+",
   "PID_カターニャ": "B",
   "PID_ハルヴィン": "B",
   "PID_ヌッツォ": "B",
   "PID_ニネ": "B",
   "PID_ソフィア": "B",
   "PID_ジャスミン": "B-",
   "PID_ナジャ": "B-",
   "PID_サラン": "B-",
   "PID_ダイトウ": "C+",
   "PID_リリアン": "C+",
   "PID_ロレッタ": "C+",
   "PID_ライサンダー": "C+",
   "PID_ディエゴ": "C+",
   "PID_ティアラ": "C+",
   "PID_アレキサンドラ": "C+",
   "PID_ベンディッツ": "C",
   "PID_ヌディーヌ": "C",
   "PID_フィアナ": "C",
   "PID_ルルディヤー": "C",
   "PID_マジーデ": "C-",
   "PID_ザーコネ": "C-",
   "PID_ペペ": "D+"
  },
  "theodora": {
   "PID_セオドラ": "S",
   "PID_ソフィア": "S",
   "PID_シロッコ": "S",
   "PID_トビヤス": "A",
   "PID_ノクチュラ": "A-/S-",
   "PID_ボナパルテ": "A-",
   "PID_ニネ": "A-",
   "PID_ウルタンド": "A-",
   "PID_ヌッツォ": "A-/B+",
   "PID_カターニャ": "B+/A-",
   "PID_ナジャ": "B+/A-",
   "PID_ライサンダー": "B+",
   "PID_イニオニ": "B+",
   "PID_アレキサンドラ": "B+",
   "PID_ロレッタ": "B+",
   "PID_ムウ": "B+",
   "PID_グザラン": "B+",
   "PID_エスメラルダ": "B+",
   "PID_ダンテ": "B",
   "PID_オリンピア": "B",
   "PID_セテス": "B",
   "PID_ハルヴィン": "B",
   "PID_ルルディヤー": "B",
   "PID_シモン": "B",
   "PID_ウーシュラ": "B",
   "PID_ダイトウ": "B",
   "PID_ザーコネ": "B-",
   "PID_バッカニア": "B-",
   "PID_ベンディッツ": "B-",
   "PID_ピーテル": "B-",
   "PID_ジャスミン": "B-",
   "PID_ヌディーヌ": "B-/C+",
   "PID_リリアン": "C+/B-",
   "PID_ディエゴ": "C+",
   "PID_マクシム": "C",
   "PID_ゴライアス": "C",
   "PID_マジーデ": "C",
   "PID_ミカエラ": "C",
   "PID_ヨーカイ": "C",
   "PID_イオ": "D+",
   "PID_ティアラ": "D+",
   "PID_キロイカ": "D",
   "PID_フィアナ": "D",
   "PID_ペペ": "D/F"
  },
  "final": {
   "PID_ディートリヒ": "S+",
   "PID_イシュマール": "S",
   "PID_レダ": "S",
   "PID_オルヘル": "S",
   "PID_シロッコ": "S",
   "PID_ソフィア": "S/A+",
   "PID_セオドラ": "A+/S-",
   "PID_カイ": "A+",
   "PID_オリンピア": "A+/S-",
   "PID_ムウ": "A+",
   "PID_エスメラルダ": "A+",
   "PID_アナトリア": "A+",
   "PID_グザラン": "A",
   "PID_トロイア": "A",
   "PID_ファビオ": "A",
   "PID_トビヤス": "A-",
   "PID_タリムーン": "A-",
   "PID_コウカ": "A-/B+",
   "PID_カターニャ": "A-",
   "PID_ベルトラン": "B+",
   "PID_キリーク": "B+/A-",
   "PID_ピーテル": "B+/A-",
   "PID_バッカニア": "B+/A-",
   "PID_ニネ": "B+/A-",
   "PID_ゴライアス": "B+",
   "PID_リリアン": "B+",
   "PID_ノクチュラ": "B+",
   "PID_ボナパルテ": "B+",
   "PID_ヌッツォ": "B+",
   "PID_ダンテ": "B+",
   "PID_ロレッタ": "B",
   "PID_イニオニ": "B",
   "PID_アレキサンドラ": "B",
   "PID_ナジャ": "B",
   "PID_キロイカ": "B",
   "PID_ティアラ": "B",
   "PID_ミカエラ": "B",
   "PID_ヨーカイ": "B",
   "PID_ネイサン": "B",
   "PID_セントリオン": "B",
   "PID_ウルタンド": "B-",
   "PID_ハルヴィン": "B-",
   "PID_ウーシュラ": "B-",
   "PID_ゲイツ": "B-",
   "PID_ジャスミン": "B-",
   "PID_サラン": "B-",
   "PID_ライサンダー": "C+/B-",
   "PID_ルルディヤー": "C+",
   "PID_シモン": "C+/B-",
   "PID_ディエゴ": "C+",
   "PID_マクシム": "C+",
   "PID_フィアナ": "C+",
   "PID_セテス": "C+/B-",
   "PID_イオ": "C+",
   "PID_ダイトウ": "C",
   "PID_ベンディッツ": "C",
   "PID_アスワン": "C",
   "PID_ヌディーヌ": "C-",
   "PID_ザーコネ": "C-",
   "PID_マジーデ": "C-/D",
   "PID_ペペ": "D+",
   "PID_タホウニア": "C-/D",
   "PID_クラプカ": "D"
  }
 }
};
