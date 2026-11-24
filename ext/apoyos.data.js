window.WIKI_EXT=window.WIKI_EXT||{};WIKI_EXT["apoyos"]={
 "levels": {
  "points": [
   0,
   400,
   1400,
   2400,
   3200
  ],
  "conv_need": {
   "C": 2,
   "B": 3,
   "A": 4,
   "S": 5
  },
  "note": "No hay tabla de umbrales en GameData: los puntos salen de las partidas guardadas. Los apoyos nunca bajan."
 },
 "aff": {
  "mult": {
   "1": 100,
   "2": 130,
   "3": 150,
   "4": 200
  }
 },
 "assist": {
  "rows": [
   {
    "n": "1.ª",
    "rate": [
     40,
     40,
     50,
     70
    ]
   },
   {
    "n": "2.ª",
    "rate": [
     30,
     35,
     40,
     60
    ]
   },
   {
    "n": "3.ª",
    "rate": [
     20,
     30,
     30,
     50
    ]
   },
   {
    "n": "4.ª",
    "rate": [
     10,
     25,
     20,
     40
    ]
   },
   {
    "n": "5.ª",
    "rate": [
     10,
     15,
     10,
     30
    ]
   },
   {
    "n": "6.ª",
    "rate": [
     10,
     10,
     10,
     20
    ]
   },
   {
    "n": "7.ª",
    "rate": [
     10,
     10,
     10,
     10
    ]
   },
   {
    "n": "8.ª y siguientes",
    "rate": [
     10,
     10,
     10,
     10
    ]
   }
  ],
  "note": "Probabilidad de que un aliado con apoyo intervenga, por orden de intervención en el mismo combate y nivel de apoyo 2–5."
 },
 "chain_cost": {
  "攻撃": [
   14,
   12,
   10,
   9,
   8
  ],
  "回復": [
   18,
   16,
   14,
   12,
   10
  ],
  "攻防": [
   -1,
   -1,
   36,
   24,
   18
  ]
 },
 "eshmel_reinforce": [
  0,
  20,
  40,
  60,
  80
 ],
 "class_groups": {
  "援護": {
   "es": "Apoyo (cazadores/arqueros)",
   "lv": {
    "2": {
     "命中": 3
    },
    "3": {
     "命中": 3,
     "必避": 3
    },
    "4": {
     "命中": 5,
     "必避": 5
    },
    "5": {
     "命中": 10,
     "必避": 5
    }
   },
   "classes": [
    "Arquero",
    "Buscasombras",
    "Cazador",
    "La Calamidad",
    "Maestro arquero",
    "Pícaro",
    "Rastreador",
    "Tirador",
    "Truhan"
   ]
  },
  "攻勢": {
   "es": "Ofensiva (luchadores)",
   "lv": {
    "2": {
     "物攻": 1
    },
    "3": {
     "物攻": 1,
     "命中": 3
    },
    "4": {
     "物攻": 2,
     "命中": 3
    },
    "5": {
     "物攻": 3,
     "命中": 5
    }
   },
   "classes": [
    "Batallador",
    "Forajido",
    "Gladiador",
    "Guerrero",
    "Herrero",
    "La Eternidad",
    "La Mano Divina",
    "Monje soldado",
    "Púgil"
   ]
  },
  "連携": {
   "es": "Coordinación (espadachines)",
   "lv": {
    "2": {
     "必殺": 3
    },
    "3": {
     "回避": 3,
     "必殺": 3
    },
    "4": {
     "回避": 5,
     "必殺": 5
    },
    "5": {
     "回避": 5,
     "必殺": 10
    }
   },
   "classes": [
    "Bailarín",
    "Espadachín",
    "La Apsará",
    "La Hoja",
    "Mirmidón",
    "Shido"
   ]
  },
  "防衛": {
   "es": "Defensa (soldados/acorazados)",
   "lv": {
    "2": {
     "物防": 1
    },
    "3": {
     "物防": 1,
     "命中": 3
    },
    "4": {
     "物防": 2,
     "命中": 3
    },
    "5": {
     "物防": 3,
     "命中": 5
    }
   },
   "classes": [
    "Caballero bastión",
    "Centinela",
    "El Tridente",
    "Guardián",
    "Hoplita",
    "Soldado",
    "Soldado acorazado"
   ]
  },
  "魔道": {
   "es": "Magia (magos/sacerdotes)",
   "lv": {
    "2": {
     "魔攻": 1
    },
    "3": {
     "魔攻": 1,
     "魔防": 1
    },
    "4": {
     "魔攻": 2,
     "魔防": 2
    },
    "5": {
     "魔攻": 3,
     "魔防": 3
    }
   },
   "classes": [
    "Augur",
    "Chamán",
    "Docto",
    "Druida",
    "Iluminado",
    "La Encarnación",
    "Obispo",
    "Sacerdote",
    "Trovador",
    "Valquiria",
    "Vate"
   ]
  },
  "騎兵": {
   "es": "Caballería",
   "lv": {
    "2": {
     "物攻": 1
    },
    "3": {
     "物攻": 1,
     "魔攻": 1
    },
    "4": {
     "物攻": 2,
     "魔攻": 2
    },
    "5": {
     "物攻": 3,
     "魔攻": 3
    }
   },
   "classes": [
    "Auricalcado",
    "Caballero arco",
    "Catafracto",
    "Cuadriguero",
    "El Cabalgador",
    "Jinete arquero",
    "Jinete bardado",
    "Jinete de elefantes",
    "Jinete ligero",
    "Jinete pesado",
    "Prodigio",
    "Seir"
   ]
  },
  "飛兵": {
   "es": "Voladores",
   "lv": {
    "2": {
     "回避": 3
    },
    "3": {
     "命中": 3,
     "回避": 3
    },
    "4": {
     "命中": 5,
     "回避": 5
    },
    "5": {
     "命中": 5,
     "回避": 10
    }
   },
   "classes": [
    "Ala Celeste",
    "Badb Catha",
    "Caladrio",
    "Jin. ornius acorazado",
    "Jinete celeste",
    "Jinete de baus",
    "Jinete de ornius",
    "Paladín bau"
   ]
  }
 },
 "pairs": [
  {
   "id": "Anh-Dan",
   "a": "PID_アナトリア",
   "b": "PID_ダンテ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Anatolia abre su adivinación en Dagsion"
     ],
     "flags_jp": [
      "進行_開始_アナトリアがダグシオンで占いを開始"
     ],
     "lines": 28
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Anh-Fab",
   "a": "PID_アナトリア",
   "b": "PID_ファビオ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 20
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 1,
   "first_part": 3,
   "p1_lock": []
  },
  {
   "id": "Anh-Sci",
   "a": "PID_アナトリア",
   "b": "PID_シロッコ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Anh-Tob",
   "a": "PID_アナトリア",
   "b": "PID_トビヤス",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 32
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Anh-Yan",
   "a": "PID_アナトリア",
   "b": "PID_ヨーカイ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "魔防": 1
   }
  },
  {
   "id": "Bel-Tal",
   "a": "PID_ベルトラン",
   "b": "PID_タリムーン",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    }
   },
   "ranks": [
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Bon-Hal",
   "a": "PID_ボナパルテ",
   "b": "PID_ハルヴィン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "id": "Bon-Lil",
   "a": "PID_ボナパルテ",
   "b": "PID_リリアン",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "visto el apoyo B Theodora–Lilian"
     ],
     "flags_jp": [
      "進行_特殊_支援会話_セオドラ_リリアン_B"
     ],
     "lines": 27
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "aún no: visto el apoyo B Theodora–Lilian"
     ],
     "flags_jp": [
      "!進行_特殊_支援会話_セオドラ_リリアン_B"
     ],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "A",
    "B",
    "C"
   ],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Bon-Lys",
   "a": "PID_ボナパルテ",
   "b": "PID_ライサンダー",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Bon-Ned",
   "a": "PID_ボナパルテ",
   "b": "PID_ヌディーヌ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Theodora no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_セオドラ"
     ],
     "lines": 29
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 2,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Bon-Tob",
   "a": "PID_ボナパルテ",
   "b": "PID_トビヤス",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 3,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Bon-Tro",
   "a": "PID_ボナパルテ",
   "b": "PID_トロイア",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Buc-Dai",
   "a": "PID_バッカニア",
   "b": "PID_ダイトウ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 33
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Buc-Jas",
   "a": "PID_バッカニア",
   "b": "PID_ジャスミン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Buccar está en el ejército",
      "Jasmine está en el ejército"
     ],
     "flags_jp": [
      "加入_バッカニア",
      "加入_ジャスミン"
     ],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Buc-Moo",
   "a": "PID_バッカニア",
   "b": "PID_ムウ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Buc-Oly",
   "a": "PID_バッカニア",
   "b": "PID_オリンピア",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "id": "Buc-Sci",
   "a": "PID_バッカニア",
   "b": "PID_シロッコ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": "Leda",
     "flags": [
      "Leda no ha muerto",
      "ruta de Leda"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_レダ",
      "ローカル_同期_ルート判定_レダ篇"
     ],
     "lines": 25
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      4,
      8
     ],
     "route": "Leda",
     "flags": [
      "Buccar está en el ejército",
      "Sirocco está en el ejército",
      "ruta de Leda"
     ],
     "flags_jp": [
      "加入_バッカニア",
      "加入_シロッコ",
      "ローカル_同期_ルート判定_レダ篇"
     ],
     "lines": 30
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      4,
      8
     ],
     "route": "Leda",
     "flags": [
      "Buccar está en el ejército",
      "Sirocco está en el ejército",
      "ruta de Leda"
     ],
     "flags_jp": [
      "加入_バッカニア",
      "加入_シロッコ",
      "ローカル_同期_ルート判定_レダ篇"
     ],
     "lines": 20
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 1,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ]
  },
  {
   "id": "Dai-Ini",
   "a": "PID_ダイトウ",
   "b": "PID_イニオニ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Dadao está en el ejército",
      "Inyoni está en el ejército"
     ],
     "flags_jp": [
      "加入_ダイトウ",
      "加入_イニオニ"
     ],
     "lines": 21
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Dan-Ned",
   "a": "PID_ダンテ",
   "b": "PID_ヌディーヌ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "id": "Dan-Sci",
   "a": "PID_ダンテ",
   "b": "PID_シロッコ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 32
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Dan-Set",
   "a": "PID_ダンテ",
   "b": "PID_セテス",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催"
     ],
     "lines": 23
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Die-Hal",
   "a": "PID_ディエゴ",
   "b": "PID_ハルヴィン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 1,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ]
  },
  {
   "id": "Die-Iio",
   "a": "PID_ディエゴ",
   "b": "PID_イオ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Orchel no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_オルヘル"
     ],
     "alt": [
      {
       "part": [
        3,
        3
       ],
       "ch": [
        0,
        0
       ],
       "route": null,
       "flags": [
        "Orchel no ha muerto"
       ],
       "flags_jp": [
        "!ローカル_同期_死別退場_オルヘル"
       ]
      }
     ],
     "lines": 22
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Orchel no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_オルヘル"
     ],
     "alt": [
      {
       "part": [
        3,
        3
       ],
       "ch": [
        0,
        0
       ],
       "route": null,
       "flags": [
        "Orchel no ha muerto"
       ],
       "flags_jp": [
        "!ローカル_同期_死別退場_オルヘル"
       ]
      }
     ],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 1,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ]
  },
  {
   "id": "Die-Lil",
   "a": "PID_ディエゴ",
   "b": "PID_リリアン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Orchel no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_オルヘル"
     ],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Die-Nin",
   "a": "PID_ディエゴ",
   "b": "PID_ニネ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Orchel no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_オルヘル"
     ],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Orchel no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_オルヘル"
     ],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 1,
   "first_part": 1,
   "p1_lock": []
  },
  {
   "id": "Die-Nuz",
   "a": "PID_ディエゴ",
   "b": "PID_ヌッツォ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Diego está en el ejército",
      "Nuzzuo está en el ejército"
     ],
     "flags_jp": [
      "加入_ディエゴ",
      "加入_ヌッツォ"
     ],
     "lines": 34
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Die-Sar",
   "a": "PID_ディエゴ",
   "b": "PID_サラン",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 1,
   "first_part": 1,
   "p1_lock": [
    "C"
   ]
  },
  {
   "id": "Die-Set",
   "a": "PID_ディエゴ",
   "b": "PID_セテス",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 1,
   "first_part": 1,
   "p1_lock": [
    "C"
   ]
  },
  {
   "id": "Buc-Dit",
   "a": "PID_ディートリヒ",
   "b": "PID_バッカニア",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Leda no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_レダ"
     ],
     "lines": 22
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Leda no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_レダ"
     ],
     "alt": [
      {
       "part": [
        3,
        3
       ],
       "ch": [
        0,
        0
       ],
       "route": null,
       "flags": [
        "Leda no ha muerto"
       ],
       "flags_jp": [
        "!ローカル_同期_死別退場_レダ"
       ]
      }
     ],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 1,
   "first_part": 1,
   "p1_lock": [
    "C"
   ]
  },
  {
   "id": "Cat-Dit",
   "a": "PID_ディートリヒ",
   "b": "PID_カターニャ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Dietrich está en el ejército",
      "Catania está en el ejército"
     ],
     "flags_jp": [
      "加入_ディートリヒ",
      "加入_カターニャ"
     ],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "se sabe que el Rey del Mar Ketus ha sido abatido",
      "Dietrich está en el ejército",
      "Catania está en el ejército"
     ],
     "flags_jp": [
      "同期_日付_海王ケートゥスが討伐されたことが知れ渡った",
      "加入_ディートリヒ",
      "加入_カターニャ"
     ],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 1,
   "first_part": 1,
   "p1_lock": []
  },
  {
   "id": "Dit-Esm",
   "a": "PID_ディートリヒ",
   "b": "PID_エスメラルダ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 32
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 3,
   "first_part": 1,
   "p1_lock": [
    "A",
    "B",
    "C"
   ],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Dit-Fab",
   "a": "PID_ディートリヒ",
   "b": "PID_ファビオ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Dietrich)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_ディートリヒ"
     ],
     "lines": 30
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "ruta de Dietrich: se descubre quién es Fabio",
      "Dietrich está en el ejército",
      "Fabio está en el ejército",
      "condición del Verdadero General de las Llamas (Dietrich)"
     ],
     "flags_jp": [
      "進行_終了_ディートリヒ篇_ファビオの正体を知った",
      "加入_ディートリヒ",
      "加入_ファビオ",
      "ローカル_支援会話判定_真焔将_×限_ディートリヒ"
     ],
     "lines": 30
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Dietrich)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_ディートリヒ"
     ],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 3,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Dit-Hal",
   "a": "PID_ディートリヒ",
   "b": "PID_ハルヴィン",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Dietrich está en el ejército",
      "Halvin está en el ejército",
      "condición del Verdadero General de las Llamas (Dietrich)"
     ],
     "flags_jp": [
      "加入_ディートリヒ",
      "加入_ハルヴィン",
      "ローカル_支援会話判定_真焔将_×限_ディートリヒ"
     ],
     "lines": 22
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 20
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "se sabe del duelo entre Dietrich y Mars"
     ],
     "flags_jp": [
      "同期_日付_ディートリヒとマーズの一騎討ちが知れ渡った"
     ],
     "lines": 29
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 1,
   "first_part": 1,
   "p1_lock": [
    "C"
   ]
  },
  {
   "id": "Dit-Led",
   "a": "PID_ディートリヒ",
   "b": "PID_レダ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Dietrich)",
      "condición del Verdadero General de las Llamas (Leda)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_ディートリヒ",
      "ローカル_支援会話判定_真焔将_×限_レダ"
     ],
     "lines": 30
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Dietrich)",
      "condición del Verdadero General de las Llamas (Leda)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_ディートリヒ",
      "ローカル_支援会話判定_真焔将_×限_レダ"
     ],
     "lines": 20
    }
   },
   "ranks": [
    "B",
    "A"
   ],
   "max": "A",
   "aff": 1,
   "first_part": 3,
   "p1_lock": []
  },
  {
   "id": "Dit-Mic",
   "a": "PID_ディートリヒ",
   "b": "PID_ミカエラ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Dietrich está en el ejército",
      "Mikaela está en el ejército",
      "condición del Verdadero General de las Llamas (Dietrich)"
     ],
     "flags_jp": [
      "加入_ディートリヒ",
      "加入_ミカエラ",
      "ローカル_支援会話判定_真焔将_×限_ディートリヒ"
     ],
     "lines": 30
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 1,
   "first_part": 1,
   "p1_lock": []
  },
  {
   "id": "Dit-Seo",
   "a": "PID_ディートリヒ",
   "b": "PID_セオドラ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    }
   },
   "ranks": [
    "B",
    "A"
   ],
   "max": "A",
   "aff": 1,
   "first_part": 3,
   "p1_lock": []
  },
  {
   "id": "Dit-Set",
   "a": "PID_ディートリヒ",
   "b": "PID_セテス",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 1,
   "first_part": 3,
   "p1_lock": []
  },
  {
   "id": "Dit-Tal",
   "a": "PID_ディートリヒ",
   "b": "PID_タリムーン",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    }
   },
   "ranks": [
    "B",
    "A"
   ],
   "max": "A",
   "aff": 1,
   "first_part": 3,
   "p1_lock": []
  },
  {
   "id": "Dai-Esm",
   "a": "PID_エスメラルダ",
   "b": "PID_ダイトウ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      3,
      0
     ],
     "route": "Dietrich",
     "flags": [
      "ruta de Dietrich: terminada la estela de Santa Catalina",
      "ruta de Dietrich"
     ],
     "flags_jp": [
      "進行_終了_ディートリヒ篇_石標セント・カタリナ終了",
      "ローカル_同期_ルート判定_ディートリヒ篇"
     ],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Die-Esm",
   "a": "PID_エスメラルダ",
   "b": "PID_ディエゴ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Orchel se quita la máscara",
      "Esmeralda está en el ejército",
      "Diego está en el ejército"
     ],
     "flags_jp": [
      "進行_変化_オルヘルの仮面が外れる",
      "加入_エスメラルダ",
      "加入_ディエゴ"
     ],
     "alt": [
      {
       "part": [
        3,
        3
       ],
       "ch": [
        0,
        0
       ],
       "route": null,
       "flags": [
        "Orchel se quita la máscara",
        "Orchel no ha muerto"
       ],
       "flags_jp": [
        "進行_変化_オルヘルの仮面が外れる",
        "!ローカル_同期_死別退場_オルヘル"
       ]
      }
     ],
     "lines": 24
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "A"
   ],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Esm-Kir",
   "a": "PID_エスメラルダ",
   "b": "PID_キロイカ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Esmeralda está en el ejército",
      "Kiroc está en el ejército"
     ],
     "flags_jp": [
      "加入_エスメラルダ",
      "加入_キロイカ"
     ],
     "lines": 32
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Esm-Lou",
   "a": "PID_エスメラルダ",
   "b": "PID_ルルディヤー",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Esm-Lys",
   "a": "PID_エスメラルダ",
   "b": "PID_ライサンダー",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 32
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "A",
    "B",
    "C"
   ],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Esm-Mic",
   "a": "PID_エスメラルダ",
   "b": "PID_ミカエラ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": "Dietrich",
     "flags": [
      "Esmeralda está en el ejército",
      "Mikaela está en el ejército",
      "Mu no ha muerto",
      "ruta de Dietrich"
     ],
     "flags_jp": [
      "加入_エスメラルダ",
      "加入_ミカエラ",
      "!ローカル_同期_死別退場_ムウ",
      "ローカル_同期_ルート判定_ディートリヒ篇"
     ],
     "lines": 25
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": "Dietrich",
     "flags": [
      "Esmeralda está en el ejército",
      "Mikaela está en el ejército",
      "Mu no ha muerto",
      "ruta de Dietrich"
     ],
     "flags_jp": [
      "加入_エスメラルダ",
      "加入_ミカエラ",
      "!ローカル_同期_死別退場_ムウ",
      "ローカル_同期_ルート判定_ディートリヒ篇"
     ],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": "Dietrich",
     "flags": [
      "Esmeralda está en el ejército",
      "Mikaela está en el ejército",
      "ruta de Dietrich"
     ],
     "flags_jp": [
      "加入_エスメラルダ",
      "加入_ミカエラ",
      "ローカル_同期_ルート判定_ディートリヒ篇"
     ],
     "lines": 30
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Esm-Fab",
   "a": "PID_ファビオ",
   "b": "PID_エスメラルダ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      7,
      0
     ],
     "route": "Dietrich",
     "flags": [
      "Fabio está en el ejército",
      "Esmeralda está en el ejército",
      "ruta de Dietrich"
     ],
     "flags_jp": [
      "加入_ファビオ",
      "加入_エスメラルダ",
      "ローカル_同期_ルート判定_ディートリヒ篇"
     ],
     "lines": 29
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 36
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": "Dietrich",
     "flags": [
      "ruta de Dietrich: terminada la estela de Santa Catalina",
      "Fabio está en el ejército",
      "Esmeralda está en el ejército",
      "ruta de Dietrich"
     ],
     "flags_jp": [
      "進行_終了_ディートリヒ篇_石標セント・カタリナ終了",
      "加入_ファビオ",
      "加入_エスメラルダ",
      "ローカル_同期_ルート判定_ディートリヒ篇"
     ],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 1,
   "first_part": 1,
   "p1_lock": []
  },
  {
   "id": "Fab-Hal",
   "a": "PID_ファビオ",
   "b": "PID_ハルヴィン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "terminado el combate final Dietrich contra Anatolia"
     ],
     "flags_jp": [
      "進行_終了_ディートリヒとアナトリアの本戦終了"
     ],
     "lines": 26
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": "Dietrich",
     "flags": [
      "aún no: terminado el combate final Dietrich contra Anatolia",
      "ruta de Dietrich"
     ],
     "flags_jp": [
      "!進行_終了_ディートリヒとアナトリアの本戦終了",
      "ローカル_同期_ルート判定_ディートリヒ篇"
     ],
     "lines": 32
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 1,
   "first_part": 1,
   "p1_lock": []
  },
  {
   "id": "Fab-Mic",
   "a": "PID_ファビオ",
   "b": "PID_ミカエラ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": "Dietrich",
     "flags": [
      "tras el combate contra Alexandra",
      "Fabio está en el ejército",
      "Mikaela está en el ejército",
      "ruta de Dietrich"
     ],
     "flags_jp": [
      "同期_日付_アレキサンドラ戦終了",
      "加入_ファビオ",
      "加入_ミカエラ",
      "ローカル_同期_ルート判定_ディートリヒ篇"
     ],
     "lines": 24
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": "Dietrich",
     "flags": [
      "Fabio está en el ejército",
      "Mikaela está en el ejército",
      "ruta de Dietrich"
     ],
     "flags_jp": [
      "加入_ファビオ",
      "加入_ミカエラ",
      "ローカル_同期_ルート判定_ディートリヒ篇"
     ],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 1,
   "first_part": 1,
   "p1_lock": []
  },
  {
   "id": "Fab-Naz",
   "a": "PID_ファビオ",
   "b": "PID_ナジャ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 1,
   "first_part": 2,
   "p1_lock": []
  },
  {
   "id": "Fab-Tob",
   "a": "PID_ファビオ",
   "b": "PID_トビヤス",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 33
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 1,
   "first_part": 3,
   "p1_lock": []
  },
  {
   "id": "Fia-Lys",
   "a": "PID_フィアナ",
   "b": "PID_ライサンダー",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "aún no: Fianna recupera la memoria"
     ],
     "flags_jp": [
      "!進行_変化_フィアナの記憶が戻った"
     ],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "aún no: Fianna recupera la memoria"
     ],
     "flags_jp": [
      "!進行_変化_フィアナの記憶が戻った"
     ],
     "lines": 27
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "魔防": 1
   }
  },
  {
   "id": "Fia-Oly",
   "a": "PID_フィアナ",
   "b": "PID_オリンピア",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Ale-Gat",
   "a": "PID_ゲイツ",
   "b": "PID_アレキサンドラ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Dan-Gat",
   "a": "PID_ゲイツ",
   "b": "PID_ダンテ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion",
      "aún no: se descubre que Gaitz es general de Brezarant",
      "Gaitz está en el ejército",
      "Dante está en el ejército"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催",
      "!進行_会話_ゲイツがブレザラントの将軍だと判明",
      "加入_ゲイツ",
      "加入_ダンテ"
     ],
     "lines": 23
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Gat-Lil",
   "a": "PID_ゲイツ",
   "b": "PID_リリアン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      2,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      2,
      2
     ],
     "ch": [
      2,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 2,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Gat-Lou",
   "a": "PID_ゲイツ",
   "b": "PID_ルルディヤー",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion",
      "aún no: se descubre que Gaitz es general de Brezarant",
      "Gaitz está en el ejército",
      "Ludia está en el ejército"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催",
      "!進行_会話_ゲイツがブレザラントの将軍だと判明",
      "加入_ゲイツ",
      "加入_ルルディヤー"
     ],
     "lines": 28
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Gat-Urs",
   "a": "PID_ゲイツ",
   "b": "PID_ウーシュラ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Gat-Zac",
   "a": "PID_ゲイツ",
   "b": "PID_ザーコネ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 2,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Dan-Gol",
   "a": "PID_ゴライアス",
   "b": "PID_ダンテ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Goliath está en el ejército",
      "Dante está en el ejército"
     ],
     "flags_jp": [
      "加入_ゴライアス",
      "加入_ダンテ"
     ],
     "lines": 29
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Goliath está en el ejército",
      "Dante está en el ejército"
     ],
     "flags_jp": [
      "加入_ゴライアス",
      "加入_ダンテ"
     ],
     "lines": 22
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion",
      "Goliath está en el ejército",
      "Dante está en el ejército"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催",
      "加入_ゴライアス",
      "加入_ダンテ"
     ],
     "lines": 23
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Gat-Gol",
   "a": "PID_ゴライアス",
   "b": "PID_ゲイツ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion",
      "aún no: se descubre que Gaitz es general de Brezarant",
      "Goliath está en el ejército",
      "Gaitz está en el ejército"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催",
      "!進行_会話_ゲイツがブレザラントの将軍だと判明",
      "加入_ゴライアス",
      "加入_ゲイツ"
     ],
     "lines": 20
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Gol-Lor",
   "a": "PID_ゴライアス",
   "b": "PID_ロレッタ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 32
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Gol-Noc",
   "a": "PID_ゴライアス",
   "b": "PID_ノクチュラ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Goliath está en el ejército",
      "Noctula está en el ejército"
     ],
     "flags_jp": [
      "加入_ゴライアス",
      "加入_ノクチュラ"
     ],
     "lines": 22
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Gol-Oly",
   "a": "PID_ゴライアス",
   "b": "PID_オリンピア",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 32
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Hal-Zac",
   "a": "PID_ハルヴィン",
   "b": "PID_ザーコネ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Cen-Hur",
   "a": "PID_ウルタンド",
   "b": "PID_セントリオン",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催"
     ],
     "lines": 27
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 3,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Gol-Hur",
   "a": "PID_ウルタンド",
   "b": "PID_ゴライアス",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 34
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催"
     ],
     "lines": 28
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Hur-Lor",
   "a": "PID_ウルタンド",
   "b": "PID_ロレッタ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催"
     ],
     "lines": 27
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Hur-Naz",
   "a": "PID_ウルタンド",
   "b": "PID_ナジャ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      2,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催"
     ],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Hur-Pep",
   "a": "PID_ウルタンド",
   "b": "PID_ペペ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Ultand está en el ejército",
      "Peppe está en el ejército"
     ],
     "flags_jp": [
      "加入_ウルタンド",
      "加入_ペペ"
     ],
     "lines": 33
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion",
      "Desvío de Bertrand completado"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催",
      "ベルトラン外伝_クリア"
     ],
     "lines": 34
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 3,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Hur-Tob",
   "a": "PID_ウルタンド",
   "b": "PID_トビヤス",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 34
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催"
     ],
     "lines": 31
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Ale-Ism",
   "a": "PID_イシュマール",
   "b": "PID_アレキサンドラ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 34
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "id": "Bon-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ボナパルテ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Buc-Ism",
   "a": "PID_イシュマール",
   "b": "PID_バッカニア",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Cat-Ism",
   "a": "PID_イシュマール",
   "b": "PID_カターニャ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Dai-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ダイトウ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Dan-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ダンテ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Die-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ディエゴ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "derrotado el general infernal Drake (Envidia)"
     ],
     "flags_jp": [
      "進行_終了_冥将ドレイク_嫉妬_撃破"
     ],
     "lines": 35
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Dit-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ディートリヒ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Dietrich)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_ディートリヒ"
     ],
     "lines": 23
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Dietrich)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_ディートリヒ"
     ],
     "lines": 28
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Esm-Ism",
   "a": "PID_イシュマール",
   "b": "PID_エスメラルダ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Fab-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ファビオ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Fia-Ism",
   "a": "PID_イシュマール",
   "b": "PID_フィアナ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Gat-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ゲイツ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 36
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Gol-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ゴライアス",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Parte 3: primera fase de reconstrucción de Dagsion"
     ],
     "flags_jp": [
      "進行_段階_第三部_ダグシオンの復興段階_01"
     ],
     "lines": 34
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Guj-Ism",
   "a": "PID_イシュマール",
   "b": "PID_グザラン",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Hal-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ハルヴィン",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Hur-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ウルタンド",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "id": "Iio-Ism",
   "a": "PID_イシュマール",
   "b": "PID_イオ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Ini-Ism",
   "a": "PID_イシュマール",
   "b": "PID_イニオニ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Ism-Jas",
   "a": "PID_イシュマール",
   "b": "PID_ジャスミン",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Ism-Kai",
   "a": "PID_イシュマール",
   "b": "PID_カイ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Cai)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_カイ"
     ],
     "lines": 27
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Cai)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_カイ"
     ],
     "lines": 27
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "魔攻": 1
   },
   "bonus_sheet": {
    "sheet": [
     "Mys 5"
    ]
   }
  },
  {
   "id": "Ism-Kou",
   "a": "PID_イシュマール",
   "b": "PID_コウカ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Ism-Led",
   "a": "PID_イシュマール",
   "b": "PID_レダ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Leda)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_レダ"
     ],
     "lines": 23
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Leda)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_レダ"
     ],
     "lines": 32
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Ism-Lil",
   "a": "PID_イシュマール",
   "b": "PID_リリアン",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Ism-Lor",
   "a": "PID_イシュマール",
   "b": "PID_ロレッタ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Ism-Lou",
   "a": "PID_イシュマール",
   "b": "PID_ルルディヤー",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   },
   "bonus_sheet": {
    "sheet": [
     "Crit 5"
    ]
   }
  },
  {
   "id": "Ism-Lys",
   "a": "PID_イシュマール",
   "b": "PID_ライサンダー",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Ism-Maj",
   "a": "PID_イシュマール",
   "b": "PID_マジーデ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Ism-Max",
   "a": "PID_イシュマール",
   "b": "PID_マクシム",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Ism-Mic",
   "a": "PID_イシュマール",
   "b": "PID_ミカエラ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Ism-Moo",
   "a": "PID_イシュマール",
   "b": "PID_ムウ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Ism-Naz",
   "a": "PID_イシュマール",
   "b": "PID_ナジャ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Ism-Ned",
   "a": "PID_イシュマール",
   "b": "PID_ヌディーヌ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Ism-Nin",
   "a": "PID_イシュマール",
   "b": "PID_ニネ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "魔防": 1
   }
  },
  {
   "id": "Ism-Noc",
   "a": "PID_イシュマール",
   "b": "PID_ノクチュラ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Ism-Oly",
   "a": "PID_イシュマール",
   "b": "PID_オリンピア",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Ism-Pep",
   "a": "PID_イシュマール",
   "b": "PID_ペペ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Ism-Pet",
   "a": "PID_イシュマール",
   "b": "PID_ピーテル",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Ism-Sar",
   "a": "PID_イシュマール",
   "b": "PID_サラン",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 33
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Ism-Sci",
   "a": "PID_イシュマール",
   "b": "PID_シロッコ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "id": "Ism-Seo",
   "a": "PID_イシュマール",
   "b": "PID_セオドラ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Theodora)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_セオドラ"
     ],
     "lines": 23
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Theodora)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_セオドラ"
     ],
     "lines": 30
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Ism-Sim",
   "a": "PID_イシュマール",
   "b": "PID_シモン",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Ism-Sop",
   "a": "PID_イシュマール",
   "b": "PID_ソフィア",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Ism-Tia",
   "a": "PID_イシュマール",
   "b": "PID_ティアラ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Ism-Tob",
   "a": "PID_イシュマール",
   "b": "PID_トビヤス",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   },
   "bonus_sheet": {
    "sheet": [
     "Ddg 1"
    ]
   }
  },
  {
   "id": "Ism-Urs",
   "a": "PID_イシュマール",
   "b": "PID_ウーシュラ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   },
   "bonus_sheet": {
    "sheet": [
     "Phys 1"
    ]
   }
  },
  {
   "id": "Ism-Ven",
   "a": "PID_イシュマール",
   "b": "PID_ベンディッツ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Ism-Yan",
   "a": "PID_イシュマール",
   "b": "PID_ヨーカイ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Ism-Zac",
   "a": "PID_イシュマール",
   "b": "PID_ザーコネ",
   "convs": {
    "S": {
     "r": "S",
     "pts": 0,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    },
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "A",
    "S"
   ],
   "max": "S",
   "aff": 4,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Ale-Kai",
   "a": "PID_カイ",
   "b": "PID_アレキサンドラ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Cai está en el ejército",
      "Alexandra está en el ejército"
     ],
     "flags_jp": [
      "加入_カイ",
      "加入_アレキサンドラ"
     ],
     "lines": 23
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Cai está en el ejército",
      "Alexandra está en el ejército"
     ],
     "flags_jp": [
      "加入_カイ",
      "加入_アレキサンドラ"
     ],
     "lines": 27
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Cai está en el ejército",
      "Alexandra está en el ejército"
     ],
     "flags_jp": [
      "加入_カイ",
      "加入_アレキサンドラ"
     ],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "A",
    "B",
    "C"
   ],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Anh-Kai",
   "a": "PID_カイ",
   "b": "PID_アナトリア",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    }
   },
   "ranks": [
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Bel-Kai",
   "a": "PID_カイ",
   "b": "PID_ベルトラン",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Cai)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_カイ"
     ],
     "lines": 29
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Cai)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_カイ"
     ],
     "lines": 28
    }
   },
   "ranks": [
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Cen-Kai",
   "a": "PID_カイ",
   "b": "PID_セントリオン",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Aurora vuelve a Dagsion",
      "condición del Verdadero General de las Llamas (Cai)"
     ],
     "flags_jp": [
      "進行_到着_条件会話_アウロラがダグシオンに戻ってきた",
      "ローカル_支援会話判定_真焔将_×限_カイ"
     ],
     "lines": 30
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 3,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Dit-Kai",
   "a": "PID_カイ",
   "b": "PID_ディートリヒ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Cai)",
      "condición del Verdadero General de las Llamas (Dietrich)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_カイ",
      "ローカル_支援会話判定_真焔将_×限_ディートリヒ"
     ],
     "lines": 28
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 33
    }
   },
   "ranks": [
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Esm-Kai",
   "a": "PID_カイ",
   "b": "PID_エスメラルダ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "tras el combate contra Benditz"
     ],
     "flags_jp": [
      "同期_日付_ベンディッツ戦終了"
     ],
     "lines": 23
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "tras el combate contra Benditz",
      "Dietrich no ha muerto"
     ],
     "flags_jp": [
      "同期_日付_ベンディッツ戦終了",
      "!ローカル_同期_死別退場_ディートリヒ"
     ],
     "lines": 27
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "tras el combate contra Benditz",
      "Dietrich no ha muerto"
     ],
     "flags_jp": [
      "同期_日付_ベンディッツ戦終了",
      "!ローカル_同期_死別退場_ディートリヒ"
     ],
     "lines": 28
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Gol-Kai",
   "a": "PID_カイ",
   "b": "PID_ゴライアス",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "terminada la prueba de acceso extra del Gran Torneo"
     ],
     "flags_jp": [
      "同期_日付_大剣闘祭の追加募集の実力テストが終了"
     ],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "terminada la prueba de acceso extra del Gran Torneo"
     ],
     "flags_jp": [
      "同期_日付_大剣闘祭の追加募集の実力テストが終了"
     ],
     "lines": 30
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Hur-Kai",
   "a": "PID_カイ",
   "b": "PID_ウルタンド",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      10,
      0
     ],
     "route": "Cai",
     "flags": [
      "Cai está en el ejército",
      "Ultand está en el ejército",
      "condición del Verdadero General de las Llamas (Cai)",
      "ruta de Cai"
     ],
     "flags_jp": [
      "加入_カイ",
      "加入_ウルタンド",
      "ローカル_支援会話判定_真焔将_×限_カイ",
      "ローカル_同期_ルート判定_カイ篇"
     ],
     "lines": 32
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催"
     ],
     "lines": 32
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "A",
    "B",
    "C"
   ],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Kai-Led",
   "a": "PID_カイ",
   "b": "PID_レダ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Cai)",
      "condición del Verdadero General de las Llamas (Leda)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_カイ",
      "ローカル_支援会話判定_真焔将_×限_レダ"
     ],
     "lines": 25
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    }
   },
   "ranks": [
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Kai-Moo",
   "a": "PID_カイ",
   "b": "PID_ムウ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Centurio no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_セントリオン"
     ],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "aún no: empieza el combate del Gran Torneo en que Cai cae eliminado"
     ],
     "flags_jp": [
      "!ローカル_第一部_大剣闘祭_カイ敗退試合開始"
     ],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Kai-Nin",
   "a": "PID_カイ",
   "b": "PID_ニネ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Aurora vuelve a Dagsion",
      "condición del Verdadero General de las Llamas (Cai)"
     ],
     "flags_jp": [
      "進行_到着_条件会話_アウロラがダグシオンに戻ってきた",
      "ローカル_支援会話判定_真焔将_×限_カイ"
     ],
     "lines": 26
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Aurora vuelve a Dagsion",
      "condición del Verdadero General de las Llamas (Cai)"
     ],
     "flags_jp": [
      "進行_到着_条件会話_アウロラがダグシオンに戻ってきた",
      "ローカル_支援会話判定_真焔将_×限_カイ"
     ],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "id": "Kai-Pet",
   "a": "PID_カイ",
   "b": "PID_ピーテル",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      3,
      0
     ],
     "route": "Cai",
     "flags": [
      "Cai está en el ejército",
      "Peter está en el ejército",
      "ruta de Cai"
     ],
     "flags_jp": [
      "加入_カイ",
      "加入_ピーテル",
      "ローカル_同期_ルート判定_カイ篇"
     ],
     "lines": 38
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": "Cai",
     "flags": [
      "Cai está en el ejército",
      "Peter está en el ejército",
      "ruta de Cai"
     ],
     "flags_jp": [
      "加入_カイ",
      "加入_ピーテル",
      "ローカル_同期_ルート判定_カイ篇"
     ],
     "lines": 26
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": "Cai",
     "flags": [
      "Cai está en el ejército",
      "Peter está en el ejército",
      "ruta de Cai"
     ],
     "flags_jp": [
      "加入_カイ",
      "加入_ピーテル",
      "ローカル_同期_ルート判定_カイ篇"
     ],
     "lines": 36
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 3,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Kai-Seo",
   "a": "PID_カイ",
   "b": "PID_セオドラ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Cai)",
      "condición del Verdadero General de las Llamas (Theodora)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_カイ",
      "ローカル_支援会話判定_真焔将_×限_セオドラ"
     ],
     "lines": 34
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Kai-Tia",
   "a": "PID_カイ",
   "b": "PID_ティアラ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      12,
      0
     ],
     "route": "Cai",
     "flags": [
      "Cai está en el ejército",
      "Tialla está en el ejército",
      "ruta de Cai"
     ],
     "flags_jp": [
      "加入_カイ",
      "加入_ティアラ",
      "ローカル_同期_ルート判定_カイ篇"
     ],
     "lines": 35
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      3,
      0
     ],
     "route": "Cai",
     "flags": [
      "Cai está en el ejército",
      "Tialla está en el ejército",
      "ruta de Cai"
     ],
     "flags_jp": [
      "加入_カイ",
      "加入_ティアラ",
      "ローカル_同期_ルート判定_カイ篇"
     ],
     "lines": 40
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": "Cai",
     "flags": [
      "Cai está en el ejército",
      "Tialla está en el ejército",
      "ruta de Cai"
     ],
     "flags_jp": [
      "加入_カイ",
      "加入_ティアラ",
      "ローカル_同期_ルート判定_カイ篇"
     ],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 3,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Asw-Led",
   "a": "PID_レダ",
   "b": "PID_アスワン",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Leda)",
      "Bertrand no ha muerto"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_レダ",
      "!ローカル_同期_死別退場_ベルトラン"
     ],
     "lines": 26
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 1,
   "first_part": 3,
   "p1_lock": []
  },
  {
   "id": "Buc-Led",
   "a": "PID_レダ",
   "b": "PID_バッカニア",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Leda)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_レダ"
     ],
     "lines": 25
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      2,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      4,
      8
     ],
     "route": "Leda",
     "flags": [
      "Leda está en el ejército",
      "Buccar está en el ejército",
      "ruta de Leda"
     ],
     "flags_jp": [
      "加入_レダ",
      "加入_バッカニア",
      "ローカル_同期_ルート判定_レダ篇"
     ],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Dan-Led",
   "a": "PID_レダ",
   "b": "PID_ダンテ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Bertrand no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_ベルトラン"
     ],
     "lines": 33
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Bertrand no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_ベルトラン"
     ],
     "lines": 28
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 2,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Esm-Led",
   "a": "PID_レダ",
   "b": "PID_エスメラルダ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "tras el combate contra Alexandra",
      "aún no: empezó el cap. 4 de la Parte 2",
      "Dietrich no ha muerto"
     ],
     "flags_jp": [
      "同期_日付_アレキサンドラ戦終了",
      "!ローカル_同期_第二部_4章が始まった",
      "!ローカル_同期_死別退場_ディートリヒ"
     ],
     "lines": 23
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "tras el combate contra Alexandra"
     ],
     "flags_jp": [
      "同期_日付_アレキサンドラ戦終了"
     ],
     "lines": 30
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Guj-Led",
   "a": "PID_レダ",
   "b": "PID_グザラン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": "Leda",
     "flags": [
      "Leda está en el ejército",
      "Guzran está en el ejército",
      "condición del Verdadero General de las Llamas (Leda)",
      "ruta de Leda"
     ],
     "flags_jp": [
      "加入_レダ",
      "加入_グザラン",
      "ローカル_支援会話判定_真焔将_×限_レダ",
      "ローカル_同期_ルート判定_レダ篇"
     ],
     "lines": 31
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 20
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Led-Max",
   "a": "PID_レダ",
   "b": "PID_マクシム",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Leda)",
      "Bertrand no ha muerto"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_レダ",
      "!ローカル_同期_死別退場_ベルトラン"
     ],
     "lines": 26
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      4,
      10
     ],
     "route": "Leda",
     "flags": [
      "Leda está en el ejército",
      "Maxim está en el ejército",
      "ruta de Leda"
     ],
     "flags_jp": [
      "加入_レダ",
      "加入_マクシム",
      "ローカル_同期_ルート判定_レダ篇"
     ],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Led-Moo",
   "a": "PID_レダ",
   "b": "PID_ムウ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      10,
      0
     ],
     "route": "Leda",
     "flags": [
      "Leda está en el ejército",
      "Mu está en el ejército",
      "ruta de Leda"
     ],
     "flags_jp": [
      "加入_レダ",
      "加入_ムウ",
      "ローカル_同期_ルート判定_レダ篇"
     ],
     "lines": 24
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      9,
      0
     ],
     "route": "Leda",
     "flags": [
      "Leda está en el ejército",
      "Mu está en el ejército",
      "ruta de Leda"
     ],
     "flags_jp": [
      "加入_レダ",
      "加入_ムウ",
      "ローカル_同期_ルート判定_レダ篇"
     ],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Led-Oly",
   "a": "PID_レダ",
   "b": "PID_オリンピア",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Leda)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_レダ"
     ],
     "lines": 24
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 20
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 1,
   "first_part": 1,
   "p1_lock": [
    "C"
   ]
  },
  {
   "id": "Led-Orh",
   "a": "PID_レダ",
   "b": "PID_オルヘル",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    }
   },
   "ranks": [
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Led-Sci",
   "a": "PID_レダ",
   "b": "PID_シロッコ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Leda)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_レダ"
     ],
     "lines": 25
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      4,
      10
     ],
     "route": "Leda",
     "flags": [
      "Leda está en el ejército",
      "Sirocco está en el ejército",
      "ruta de Leda"
     ],
     "flags_jp": [
      "加入_レダ",
      "加入_シロッコ",
      "ローカル_同期_ルート判定_レダ篇"
     ],
     "lines": 26
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      4,
      10
     ],
     "route": "Leda",
     "flags": [
      "Leda está en el ejército",
      "Sirocco está en el ejército",
      "ruta de Leda"
     ],
     "flags_jp": [
      "加入_レダ",
      "加入_シロッコ",
      "ローカル_同期_ルート判定_レダ篇"
     ],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Led-Tal",
   "a": "PID_レダ",
   "b": "PID_タリムーン",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 32
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Leda)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_レダ"
     ],
     "lines": 35
    }
   },
   "ranks": [
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Lil-Lys",
   "a": "PID_リリアン",
   "b": "PID_ライサンダー",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "visto el apoyo B Theodora–Lilian",
      "visto el apoyo B Theodora–Lysander"
     ],
     "flags_jp": [
      "進行_特殊_支援会話_セオドラ_リリアン_B",
      "進行_特殊_支援会話_セオドラ_ライサンダー_B"
     ],
     "lines": 31
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "aún no: visto el apoyo B Theodora–Lilian",
      "aún no: visto el apoyo B Theodora–Lysander"
     ],
     "flags_jp": [
      "!進行_特殊_支援会話_セオドラ_リリアン_B",
      "!進行_特殊_支援会話_セオドラ_ライサンダー_B"
     ],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "aún no: visto el apoyo B Theodora–Lilian",
      "aún no: visto el apoyo B Theodora–Lysander"
     ],
     "flags_jp": [
      "!進行_特殊_支援会話_セオドラ_リリアン_B",
      "!進行_特殊_支援会話_セオドラ_ライサンダー_B"
     ],
     "lines": 31
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Lil-Moo",
   "a": "PID_リリアン",
   "b": "PID_ムウ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Lil-Ned",
   "a": "PID_リリアン",
   "b": "PID_ヌディーヌ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 3,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Lor-Sar",
   "a": "PID_ロレッタ",
   "b": "PID_サラン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "id": "Lor-Set",
   "a": "PID_ロレッタ",
   "b": "PID_セテス",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 40
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "A",
    "B",
    "C"
   ],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Lor-Tob",
   "a": "PID_ロレッタ",
   "b": "PID_トビヤス",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Lor-Yan",
   "a": "PID_ロレッタ",
   "b": "PID_ヨーカイ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "魔防": 1
   }
  },
  {
   "id": "Buc-Lou",
   "a": "PID_ルルディヤー",
   "b": "PID_バッカニア",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 33
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Fia-Lou",
   "a": "PID_ルルディヤー",
   "b": "PID_フィアナ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "aún no: Fianna recupera la memoria",
      "Ludia está en el ejército",
      "Fianna está en el ejército"
     ],
     "flags_jp": [
      "!進行_変化_フィアナの記憶が戻った",
      "加入_ルルディヤー",
      "加入_フィアナ"
     ],
     "lines": 24
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "aún no: Fianna recupera la memoria",
      "aún no: empezó el cap. 4 de la Parte 2",
      "Ludia está en el ejército",
      "Fianna está en el ejército",
      "Talimun no ha muerto",
      "Ursula no ha muerto"
     ],
     "flags_jp": [
      "!進行_変化_フィアナの記憶が戻った",
      "!ローカル_同期_第二部_4章が始まった",
      "加入_ルルディヤー",
      "加入_フィアナ",
      "!ローカル_同期_死別退場_タリムーン",
      "!ローカル_同期_死別退場_ウーシュラ"
     ],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Lou-Set",
   "a": "PID_ルルディヤー",
   "b": "PID_セテス",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Ludia está en el ejército",
      "Seteth está en el ejército"
     ],
     "flags_jp": [
      "加入_ルルディヤー",
      "加入_セテス"
     ],
     "lines": 32
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Lou-Ven",
   "a": "PID_ルルディヤー",
   "b": "PID_ベンディッツ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 33
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Cat-Lys",
   "a": "PID_ライサンダー",
   "b": "PID_カターニャ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      2,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 32
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      2,
      0
     ],
     "route": null,
     "flags": [
      "Bertrand no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_ベルトラン"
     ],
     "lines": 29
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 2,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Buc-Max",
   "a": "PID_マクシム",
   "b": "PID_バッカニア",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Leda no ha muerto",
      "Bertrand no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_レダ",
      "!ローカル_同期_死別退場_ベルトラン"
     ],
     "lines": 20
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Leda no ha muerto",
      "Bertrand no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_レダ",
      "!ローカル_同期_死別退場_ベルトラン"
     ],
     "lines": 23
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Dan-Max",
   "a": "PID_マクシム",
   "b": "PID_ダンテ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Gol-Max",
   "a": "PID_マクシム",
   "b": "PID_ゴライアス",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Maxim se convierte en Jester"
     ],
     "flags_jp": [
      "進行_変化_マクシムがジェスターになる"
     ],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Hal-Max",
   "a": "PID_マクシム",
   "b": "PID_ハルヴィン",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Max-Mic",
   "a": "PID_マクシム",
   "b": "PID_ミカエラ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 20
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Max-Noc",
   "a": "PID_マクシム",
   "b": "PID_ノクチュラ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Bertrand no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_ベルトラン"
     ],
     "lines": 22
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Maxim está en el ejército",
      "Noctula está en el ejército"
     ],
     "flags_jp": [
      "加入_マクシム",
      "加入_ノクチュラ"
     ],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Guj-Mic",
   "a": "PID_ミカエラ",
   "b": "PID_グザラン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Mikaela está en el ejército",
      "Guzran está en el ejército"
     ],
     "flags_jp": [
      "加入_ミカエラ",
      "加入_グザラン"
     ],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": "Dietrich",
     "flags": [
      "Dietrich no ha muerto",
      "ruta de Dietrich"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_ディートリヒ",
      "ローカル_同期_ルート判定_ディートリヒ篇"
     ],
     "alt": [
      {
       "part": [
        1,
        1
       ],
       "ch": [
        0,
        0
       ],
       "route": null,
       "flags": [
        "Dietrich no ha muerto"
       ],
       "flags_jp": [
        "!ローカル_同期_死別退場_ディートリヒ"
       ]
      }
     ],
     "lines": 25
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Lor-Mic",
   "a": "PID_ミカエラ",
   "b": "PID_ロレッタ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Mic-Moo",
   "a": "PID_ミカエラ",
   "b": "PID_ムウ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 38
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": "Dietrich",
     "flags": [
      "Mikaela y Mu han hablado",
      "ruta de Dietrich"
     ],
     "flags_jp": [
      "進行_会話_条件会話_ミカエラとムウが会話した",
      "ローカル_同期_ルート判定_ディートリヒ篇"
     ],
     "alt": [
      {
       "part": [
        1,
        2
       ],
       "ch": [
        0,
        0
       ],
       "route": "Leda",
       "flags": [
        "Mikaela y Mu han hablado",
        "ruta de Leda"
       ],
       "flags_jp": [
        "進行_会話_条件会話_ミカエラとムウが会話した",
        "ローカル_同期_ルート判定_レダ篇"
       ]
      }
     ],
     "lines": 27
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 3,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Mic-Sim",
   "a": "PID_ミカエラ",
   "b": "PID_シモン",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Mic-Sop",
   "a": "PID_ミカエラ",
   "b": "PID_ソフィア",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Guj-Moo",
   "a": "PID_ムウ",
   "b": "PID_グザラン",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Mikaela no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_ミカエラ"
     ],
     "lines": 25
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Moo-Oly",
   "a": "PID_ムウ",
   "b": "PID_オリンピア",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "derrotado el general infernal Dagda (Pereza)"
     ],
     "flags_jp": [
      "進行_終了_冥将ダグザ_怠惰_撃破"
     ],
     "lines": 26
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "id": "Moo-Pep",
   "a": "PID_ムウ",
   "b": "PID_ペペ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Mu está en el ejército",
      "Peppe está en el ejército",
      "Desvío de Bertrand completado"
     ],
     "flags_jp": [
      "加入_ムウ",
      "加入_ペペ",
      "ベルトラン外伝_クリア"
     ],
     "lines": 23
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Desvío de Bertrand completado"
     ],
     "flags_jp": [
      "ベルトラン外伝_クリア"
     ],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Hri-Nat",
   "a": "PID_ネイサン",
   "b": "PID_キリーク",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 3,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Dai-Naz",
   "a": "PID_ナジャ",
   "b": "PID_ダイトウ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 20
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "llegada a Dagsion"
     ],
     "flags_jp": [
      "進行_到着_ダグシオン到着"
     ],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "llegada a Dagsion"
     ],
     "flags_jp": [
      "進行_到着_ダグシオン到着"
     ],
     "lines": 32
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Hal-Naz",
   "a": "PID_ナジャ",
   "b": "PID_ハルヴィン",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Maj-Naz",
   "a": "PID_ナジャ",
   "b": "PID_マジーデ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Naz-Sar",
   "a": "PID_ナジャ",
   "b": "PID_サラン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Anatolia no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_アナトリア"
     ],
     "alt": [
      {
       "part": [
        3,
        3
       ],
       "ch": [
        0,
        0
       ],
       "route": null,
       "flags": [
        "Anatolia no ha muerto"
       ],
       "flags_jp": [
        "!ローカル_同期_死別退場_アナトリア"
       ]
      }
     ],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "A": {
     "r": "A",
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "pts": null,
     "only_text": true,
     "lines": 29
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B"
   ],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Lys-Nin",
   "a": "PID_ニネ",
   "b": "PID_ライサンダー",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Nin-Pep",
   "a": "PID_ニネ",
   "b": "PID_ペペ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Ninae está en el ejército",
      "Peppe está en el ejército"
     ],
     "flags_jp": [
      "加入_ニネ",
      "加入_ペペ"
     ],
     "lines": 24
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Desvío de Bertrand completado"
     ],
     "flags_jp": [
      "ベルトラン外伝_クリア"
     ],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 1,
   "first_part": 1,
   "p1_lock": []
  },
  {
   "id": "Nin-Sci",
   "a": "PID_ニネ",
   "b": "PID_シロッコ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Ale-Oly",
   "a": "PID_オリンピア",
   "b": "PID_アレキサンドラ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Olympia está en el ejército",
      "Alexandra está en el ejército"
     ],
     "flags_jp": [
      "加入_オリンピア",
      "加入_アレキサンドラ"
     ],
     "lines": 32
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": "Dietrich",
     "flags": [
      "tras el combate contra Alexandra",
      "ruta de Dietrich"
     ],
     "flags_jp": [
      "同期_日付_アレキサンドラ戦終了",
      "ローカル_同期_ルート判定_ディートリヒ篇"
     ],
     "alt": [
      {
       "part": [
        1,
        2
       ],
       "ch": [
        0,
        0
       ],
       "route": "Theodora",
       "flags": [
        "tras el combate contra Alexandra",
        "ruta de Theodora"
       ],
       "flags_jp": [
        "同期_日付_アレキサンドラ戦終了",
        "ローカル_同期_ルート判定_セオドラ篇"
       ]
      },
      {
       "part": [
        1,
        2
       ],
       "ch": [
        0,
        0
       ],
       "route": "Leda",
       "flags": [
        "tras el combate contra Alexandra",
        "ruta de Leda"
       ],
       "flags_jp": [
        "同期_日付_アレキサンドラ戦終了",
        "ローカル_同期_ルート判定_レダ篇"
       ]
      }
     ],
     "lines": 31
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Hri-Oly",
   "a": "PID_オリンピア",
   "b": "PID_キリーク",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 2,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Jas-Oly",
   "a": "PID_オリンピア",
   "b": "PID_ジャスミン",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Olympia está en el ejército",
      "Jasmine está en el ejército",
      "Leda no ha muerto"
     ],
     "flags_jp": [
      "加入_オリンピア",
      "加入_ジャスミン",
      "!ローカル_同期_死別退場_レダ"
     ],
     "lines": 24
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Bon-Orh",
   "a": "PID_オルヘル",
   "b": "PID_ボナパルテ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催"
     ],
     "lines": 27
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催"
     ],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "id": "Fia-Orh",
   "a": "PID_オルヘル",
   "b": "PID_フィアナ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Orchel se quita la máscara"
     ],
     "flags_jp": [
      "進行_変化_オルヘルの仮面が外れる"
     ],
     "lines": 27
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Hur-Orh",
   "a": "PID_オルヘル",
   "b": "PID_ウルタンド",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催"
     ],
     "lines": 26
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Maj-Orh",
   "a": "PID_オルヘル",
   "b": "PID_マジーデ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Nin-Orh",
   "a": "PID_オルヘル",
   "b": "PID_ニネ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 3,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Dai-Pet",
   "a": "PID_ピーテル",
   "b": "PID_ダイトウ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Hur-Pet",
   "a": "PID_ピーテル",
   "b": "PID_ウルタンド",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "visto el apoyo B Tialla–Peter"
     ],
     "flags_jp": [
      "進行_特殊_支援会話_ティアラ_ピーテル_B"
     ],
     "lines": 31
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催"
     ],
     "lines": 25
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "A",
    "B",
    "C"
   ],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Max-Pet",
   "a": "PID_ピーテル",
   "b": "PID_マクシム",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Maxim se convierte en Jester",
      "Peter está en el ejército",
      "Maxim está en el ejército"
     ],
     "flags_jp": [
      "進行_変化_マクシムがジェスターになる",
      "加入_ピーテル",
      "加入_マクシム"
     ],
     "lines": 32
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Moo-Pet",
   "a": "PID_ピーテル",
   "b": "PID_ムウ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "llegada a Dagsion"
     ],
     "flags_jp": [
      "進行_到着_ダグシオン到着"
     ],
     "lines": 27
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "llegada a Dagsion"
     ],
     "flags_jp": [
      "進行_到着_ダグシオン到着"
     ],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Nin-Pet",
   "a": "PID_ピーテル",
   "b": "PID_ニネ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Pet-Sop",
   "a": "PID_ピーテル",
   "b": "PID_ソフィア",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Peter está en el ejército",
      "Sofia está en el ejército"
     ],
     "flags_jp": [
      "加入_ピーテル",
      "加入_ソフィア"
     ],
     "lines": 22
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Pet-Urs",
   "a": "PID_ピーテル",
   "b": "PID_ウーシュラ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Hal-Sar",
   "a": "PID_サラン",
   "b": "PID_ハルヴィン",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 30
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "id": "Kou-Sar",
   "a": "PID_サラン",
   "b": "PID_コウカ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 33
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Sar-Yan",
   "a": "PID_サラン",
   "b": "PID_ヨーカイ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 33
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "cumpleaños de Sha Lan"
     ],
     "flags_jp": [
      "進行_誕生日_サラン"
     ],
     "lines": 20
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 2,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Ale-Sci",
   "a": "PID_シロッコ",
   "b": "PID_アレキサンドラ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 20
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Moo-Sci",
   "a": "PID_シロッコ",
   "b": "PID_ムウ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 20
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Oly-Sci",
   "a": "PID_シロッコ",
   "b": "PID_オリンピア",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "A",
    "B",
    "C"
   ],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Sar-Sci",
   "a": "PID_シロッコ",
   "b": "PID_サラン",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      2,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催"
     ],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Ale-Seo",
   "a": "PID_セオドラ",
   "b": "PID_アレキサンドラ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "tras el combate contra Alexandra"
     ],
     "flags_jp": [
      "同期_日付_アレキサンドラ戦終了"
     ],
     "lines": 24
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Bel-Seo",
   "a": "PID_セオドラ",
   "b": "PID_ベルトラン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    }
   },
   "ranks": [
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Bon-Seo",
   "a": "PID_セオドラ",
   "b": "PID_ボナパルテ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Theodora)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_セオドラ"
     ],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Theodora)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_セオドラ"
     ],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 3,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Die-Seo",
   "a": "PID_セオドラ",
   "b": "PID_ディエゴ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Theodora)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_セオドラ"
     ],
     "lines": 23
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 2,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Led-Seo",
   "a": "PID_セオドラ",
   "b": "PID_レダ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 37
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    }
   },
   "ranks": [
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Lil-Seo",
   "a": "PID_セオドラ",
   "b": "PID_リリアン",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 39
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Lys-Seo",
   "a": "PID_セオドラ",
   "b": "PID_ライサンダー",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Theodora está en el ejército",
      "Lysander está en el ejército"
     ],
     "flags_jp": [
      "加入_セオドラ",
      "加入_ライサンダー"
     ],
     "lines": 27
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Theodora está en el ejército",
      "Lysander está en el ejército"
     ],
     "flags_jp": [
      "加入_セオドラ",
      "加入_ライサンダー"
     ],
     "lines": 22
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Theodora está en el ejército",
      "Lysander está en el ejército"
     ],
     "flags_jp": [
      "加入_セオドラ",
      "加入_ライサンダー"
     ],
     "lines": 23
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Naz-Seo",
   "a": "PID_セオドラ",
   "b": "PID_ナジャ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Theodora vuelve a Dagsion",
      "Theodora está en el ejército",
      "Nezha está en el ejército"
     ],
     "flags_jp": [
      "同期_日付_セオドラがダグシオンに帰還した",
      "加入_セオドラ",
      "加入_ナジャ"
     ],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Seo-Sim",
   "a": "PID_セオドラ",
   "b": "PID_シモン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Seo-Tal",
   "a": "PID_セオドラ",
   "b": "PID_タリムーン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "derrotado el general infernal Dagda (Pereza)"
     ],
     "flags_jp": [
      "進行_終了_冥将ダグザ_怠惰_撃破"
     ],
     "lines": 26
    }
   },
   "ranks": [
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Seo-Tia",
   "a": "PID_セオドラ",
   "b": "PID_ティアラ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Cai no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_カイ"
     ],
     "lines": 37
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Cai no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_カイ"
     ],
     "lines": 20
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 1,
   "first_part": 3,
   "p1_lock": []
  },
  {
   "id": "Seo-Tob",
   "a": "PID_セオドラ",
   "b": "PID_トビヤス",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Theodora)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_セオドラ"
     ],
     "lines": 29
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Theodora)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_セオドラ"
     ],
     "lines": 22
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "condición del Verdadero General de las Llamas (Theodora)"
     ],
     "flags_jp": [
      "ローカル_支援会話判定_真焔将_×限_セオドラ"
     ],
     "lines": 33
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 3,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Seo-Tro",
   "a": "PID_セオドラ",
   "b": "PID_トロイア",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 3,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Dai-Set",
   "a": "PID_セテス",
   "b": "PID_ダイトウ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 25
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Fia-Sim",
   "a": "PID_シモン",
   "b": "PID_フィアナ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "aún no: empezó el cap. 4 de la Parte 2",
      "Simon está en el ejército",
      "Fianna está en el ejército",
      "Talimun no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_第二部_4章が始まった",
      "加入_シモン",
      "加入_フィアナ",
      "!ローカル_同期_死別退場_タリムーン"
     ],
     "lines": 24
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "aún no: Fianna recupera la memoria",
      "Simon está en el ejército",
      "Fianna está en el ejército"
     ],
     "flags_jp": [
      "!進行_変化_フィアナの記憶が戻った",
      "加入_シモン",
      "加入_フィアナ"
     ],
     "lines": 26
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "aún no: Fianna recupera la memoria",
      "Simon está en el ejército",
      "Fianna está en el ejército"
     ],
     "flags_jp": [
      "!進行_変化_フィアナの記憶が戻った",
      "加入_シモン",
      "加入_フィアナ"
     ],
     "lines": 21
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "id": "Lil-Sim",
   "a": "PID_シモン",
   "b": "PID_リリアン",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      2,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "alt": [
      {
       "part": [
        3,
        3
       ],
       "ch": [
        0,
        0
       ],
       "route": null,
       "flags": [],
       "flags_jp": []
      }
     ],
     "lines": 22
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 20
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Lou-Sim",
   "a": "PID_シモン",
   "b": "PID_ルルディヤー",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 33
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Nin-Sim",
   "a": "PID_シモン",
   "b": "PID_ニネ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Sim-Zac",
   "a": "PID_シモン",
   "b": "PID_ザーコネ",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Dan-Tal",
   "a": "PID_タリムーン",
   "b": "PID_ダンテ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 22
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Fia-Tal",
   "a": "PID_タリムーン",
   "b": "PID_フィアナ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "aún no: Fianna recupera la memoria"
     ],
     "flags_jp": [
      "!進行_変化_フィアナの記憶が戻った"
     ],
     "lines": 32
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "aún no: Fianna recupera la memoria"
     ],
     "flags_jp": [
      "!進行_変化_フィアナの記憶が戻った"
     ],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Lil-Tal",
   "a": "PID_タリムーン",
   "b": "PID_リリアン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Sim-Tal",
   "a": "PID_タリムーン",
   "b": "PID_シモン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 3,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "物攻": 1
   }
  },
  {
   "id": "Tal-Tia",
   "a": "PID_タリムーン",
   "b": "PID_ティアラ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "id": "Bon-Tia",
   "a": "PID_ティアラ",
   "b": "PID_ボナパルテ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 38
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 31
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "visto el apoyo B Theodora–Bonaventure"
     ],
     "flags_jp": [
      "進行_特殊_支援会話_セオドラ_ボナパルテ_B"
     ],
     "lines": 27
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "魔防": 1
   }
  },
  {
   "id": "Hri-Tia",
   "a": "PID_ティアラ",
   "b": "PID_キリーク",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 3,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Hur-Tia",
   "a": "PID_ティアラ",
   "b": "PID_ウルタンド",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 38
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "aún no: Peter y Tialla están peleados"
     ],
     "flags_jp": [
      "!ローカル_同期_会話_ピーテルとティアラがケンカしている"
     ],
     "lines": 31
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "empezó el Gran Torneo de Dagsion"
     ],
     "flags_jp": [
      "進行_開始_ダグシオン大剣闘祭_開催"
     ],
     "lines": 23
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "魔防": 1
   }
  },
  {
   "id": "Iio-Tia",
   "a": "PID_ティアラ",
   "b": "PID_イオ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 28
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "回避": 5
   }
  },
  {
   "id": "Lou-Tia",
   "a": "PID_ティアラ",
   "b": "PID_ルルディヤー",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Pet-Tia",
   "a": "PID_ティアラ",
   "b": "PID_ピーテル",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "visto el apoyo B Peter–Ultand",
      "Tialla está en el ejército",
      "Peter está en el ejército"
     ],
     "flags_jp": [
      "進行_特殊_支援会話_ピーテル_ウルタンド_B",
      "加入_ティアラ",
      "加入_ピーテル"
     ],
     "lines": 37
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Tialla está en el ejército",
      "Peter está en el ejército"
     ],
     "flags_jp": [
      "加入_ティアラ",
      "加入_ピーテル"
     ],
     "lines": 35
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Tialla está en el ejército",
      "Peter está en el ejército"
     ],
     "flags_jp": [
      "加入_ティアラ",
      "加入_ピーテル"
     ],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 3,
   "first_part": 1,
   "p1_lock": [
    "A"
   ],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Set-Tia",
   "a": "PID_ティアラ",
   "b": "PID_セテス",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 33
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Lil-Tob",
   "a": "PID_トビヤス",
   "b": "PID_リリアン",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 24
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必殺": 5
   }
  },
  {
   "id": "Lys-Tob",
   "a": "PID_トビヤス",
   "b": "PID_ライサンダー",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 21
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Oly-Tob",
   "a": "PID_トビヤス",
   "b": "PID_オリンピア",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   },
   "bonus_sheet": {
    "sheet": [
     "Mys 1"
    ]
   }
  },
  {
   "id": "Sop-Tob",
   "a": "PID_トビヤス",
   "b": "PID_ソフィア",
   "convs": {
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Tobias está en el ejército",
      "Sofia está en el ejército"
     ],
     "flags_jp": [
      "加入_トビヤス",
      "加入_ソフィア"
     ],
     "lines": 31
    }
   },
   "ranks": [
    "C"
   ],
   "max": "C",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Bon-Urs",
   "a": "PID_ウーシュラ",
   "b": "PID_ボナパルテ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 20
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "命中": 5
   }
  },
  {
   "id": "Fia-Urs",
   "a": "PID_ウーシュラ",
   "b": "PID_フィアナ",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Talimun no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_タリムーン"
     ],
     "lines": 31
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Talimun no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_タリムーン"
     ],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "攻速": 1
   }
  },
  {
   "id": "Jas-Urs",
   "a": "PID_ウーシュラ",
   "b": "PID_ジャスミン",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 27
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      2
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [],
   "bonus": {
    "物防": 1
   }
  },
  {
   "id": "Sci-Urs",
   "a": "PID_ウーシュラ",
   "b": "PID_シロッコ",
   "convs": {
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 29
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 23
    }
   },
   "ranks": [
    "C",
    "B"
   ],
   "max": "B",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "B",
    "C"
   ],
   "bonus": {
    "必避": 5
   }
  },
  {
   "id": "Sim-Urs",
   "a": "PID_ウーシュラ",
   "b": "PID_シモン",
   "convs": {
    "A": {
     "r": "A",
     "pts": 50,
     "part": [
      3,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Talimun no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_タリムーン"
     ],
     "lines": 24
    },
    "B": {
     "r": "B",
     "pts": 50,
     "part": [
      1,
      3
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [
      "Talimun no ha muerto"
     ],
     "flags_jp": [
      "!ローカル_同期_死別退場_タリムーン"
     ],
     "lines": 24
    },
    "C": {
     "r": "C",
     "pts": 50,
     "part": [
      1,
      1
     ],
     "ch": [
      0,
      0
     ],
     "route": null,
     "flags": [],
     "flags_jp": [],
     "lines": 26
    }
   },
   "ranks": [
    "C",
    "B",
    "A"
   ],
   "max": "A",
   "aff": 2,
   "first_part": 1,
   "p1_lock": [
    "C"
   ],
   "bonus": {
    "命中": 5
   }
  }
 ],
 "by_char": {
  "PID_アナトリア": [
   "Anh-Dan",
   "Anh-Fab",
   "Anh-Kai",
   "Anh-Sci",
   "Anh-Tob",
   "Anh-Yan"
  ],
  "PID_シロッコ": [
   "Ale-Sci",
   "Anh-Sci",
   "Buc-Sci",
   "Dan-Sci",
   "Ism-Sci",
   "Led-Sci",
   "Moo-Sci",
   "Nin-Sci",
   "Oly-Sci",
   "Sar-Sci",
   "Sci-Urs"
  ],
  "PID_ダンテ": [
   "Anh-Dan",
   "Dan-Gat",
   "Dan-Gol",
   "Dan-Ism",
   "Dan-Led",
   "Dan-Max",
   "Dan-Ned",
   "Dan-Sci",
   "Dan-Set",
   "Dan-Tal"
  ],
  "PID_トビヤス": [
   "Anh-Tob",
   "Bon-Tob",
   "Fab-Tob",
   "Hur-Tob",
   "Ism-Tob",
   "Lil-Tob",
   "Lor-Tob",
   "Lys-Tob",
   "Oly-Tob",
   "Seo-Tob",
   "Sop-Tob"
  ],
  "PID_ファビオ": [
   "Anh-Fab",
   "Dit-Fab",
   "Esm-Fab",
   "Fab-Hal",
   "Fab-Ism",
   "Fab-Mic",
   "Fab-Naz",
   "Fab-Tob"
  ],
  "PID_ヨーカイ": [
   "Anh-Yan",
   "Ism-Yan",
   "Lor-Yan",
   "Sar-Yan"
  ],
  "PID_イシュマール": [
   "Ale-Ism",
   "Bon-Ism",
   "Buc-Ism",
   "Cat-Ism",
   "Dai-Ism",
   "Dan-Ism",
   "Die-Ism",
   "Dit-Ism",
   "Esm-Ism",
   "Fab-Ism",
   "Fia-Ism",
   "Gat-Ism",
   "Gol-Ism",
   "Guj-Ism",
   "Hal-Ism",
   "Hur-Ism",
   "Iio-Ism",
   "Ini-Ism",
   "Ism-Jas",
   "Ism-Kai",
   "Ism-Kou",
   "Ism-Led",
   "Ism-Lil",
   "Ism-Lor",
   "Ism-Lou",
   "Ism-Lys",
   "Ism-Maj",
   "Ism-Max",
   "Ism-Mic",
   "Ism-Moo",
   "Ism-Naz",
   "Ism-Ned",
   "Ism-Nin",
   "Ism-Noc",
   "Ism-Oly",
   "Ism-Pep",
   "Ism-Pet",
   "Ism-Sar",
   "Ism-Sci",
   "Ism-Seo",
   "Ism-Sim",
   "Ism-Sop",
   "Ism-Tia",
   "Ism-Tob",
   "Ism-Urs",
   "Ism-Ven",
   "Ism-Yan",
   "Ism-Zac"
  ],
  "PID_アレキサンドラ": [
   "Ale-Gat",
   "Ale-Ism",
   "Ale-Kai",
   "Ale-Oly",
   "Ale-Sci",
   "Ale-Seo"
  ],
  "PID_イオ": [
   "Die-Iio",
   "Iio-Ism",
   "Iio-Tia"
  ],
  "PID_イニオニ": [
   "Dai-Ini",
   "Ini-Ism"
  ],
  "PID_ウーシュラ": [
   "Bon-Urs",
   "Fia-Urs",
   "Gat-Urs",
   "Ism-Urs",
   "Jas-Urs",
   "Pet-Urs",
   "Sci-Urs",
   "Sim-Urs"
  ],
  "PID_ウルタンド": [
   "Cen-Hur",
   "Gol-Hur",
   "Hur-Ism",
   "Hur-Kai",
   "Hur-Lor",
   "Hur-Naz",
   "Hur-Orh",
   "Hur-Pep",
   "Hur-Pet",
   "Hur-Tia",
   "Hur-Tob"
  ],
  "PID_エスメラルダ": [
   "Dai-Esm",
   "Die-Esm",
   "Dit-Esm",
   "Esm-Fab",
   "Esm-Ism",
   "Esm-Kai",
   "Esm-Kir",
   "Esm-Led",
   "Esm-Lou",
   "Esm-Lys",
   "Esm-Mic"
  ],
  "PID_オリンピア": [
   "Ale-Oly",
   "Buc-Oly",
   "Fia-Oly",
   "Gol-Oly",
   "Hri-Oly",
   "Ism-Oly",
   "Jas-Oly",
   "Led-Oly",
   "Moo-Oly",
   "Oly-Sci",
   "Oly-Tob"
  ],
  "PID_カイ": [
   "Ale-Kai",
   "Anh-Kai",
   "Bel-Kai",
   "Cen-Kai",
   "Dit-Kai",
   "Esm-Kai",
   "Gol-Kai",
   "Hur-Kai",
   "Ism-Kai",
   "Kai-Led",
   "Kai-Moo",
   "Kai-Nin",
   "Kai-Pet",
   "Kai-Seo",
   "Kai-Tia"
  ],
  "PID_カターニャ": [
   "Cat-Dit",
   "Cat-Ism",
   "Cat-Lys"
  ],
  "PID_グザラン": [
   "Guj-Ism",
   "Guj-Led",
   "Guj-Mic",
   "Guj-Moo"
  ],
  "PID_ゲイツ": [
   "Ale-Gat",
   "Dan-Gat",
   "Gat-Gol",
   "Gat-Ism",
   "Gat-Lil",
   "Gat-Lou",
   "Gat-Urs",
   "Gat-Zac"
  ],
  "PID_コウカ": [
   "Ism-Kou",
   "Kou-Sar"
  ],
  "PID_ゴライアス": [
   "Dan-Gol",
   "Gat-Gol",
   "Gol-Hur",
   "Gol-Ism",
   "Gol-Kai",
   "Gol-Lor",
   "Gol-Max",
   "Gol-Noc",
   "Gol-Oly"
  ],
  "PID_ザーコネ": [
   "Gat-Zac",
   "Hal-Zac",
   "Ism-Zac",
   "Sim-Zac"
  ],
  "PID_サラン": [
   "Die-Sar",
   "Hal-Sar",
   "Ism-Sar",
   "Kou-Sar",
   "Lor-Sar",
   "Naz-Sar",
   "Sar-Sci",
   "Sar-Yan"
  ],
  "PID_シモン": [
   "Fia-Sim",
   "Ism-Sim",
   "Lil-Sim",
   "Lou-Sim",
   "Mic-Sim",
   "Nin-Sim",
   "Seo-Sim",
   "Sim-Tal",
   "Sim-Urs",
   "Sim-Zac"
  ],
  "PID_ジャスミン": [
   "Buc-Jas",
   "Ism-Jas",
   "Jas-Oly",
   "Jas-Urs"
  ],
  "PID_セオドラ": [
   "Ale-Seo",
   "Bel-Seo",
   "Bon-Seo",
   "Die-Seo",
   "Dit-Seo",
   "Ism-Seo",
   "Kai-Seo",
   "Led-Seo",
   "Lil-Seo",
   "Lys-Seo",
   "Naz-Seo",
   "Seo-Sim",
   "Seo-Tal",
   "Seo-Tia",
   "Seo-Tob",
   "Seo-Tro"
  ],
  "PID_ソフィア": [
   "Ism-Sop",
   "Mic-Sop",
   "Pet-Sop",
   "Sop-Tob"
  ],
  "PID_ダイトウ": [
   "Buc-Dai",
   "Dai-Esm",
   "Dai-Ini",
   "Dai-Ism",
   "Dai-Naz",
   "Dai-Pet",
   "Dai-Set"
  ],
  "PID_ティアラ": [
   "Bon-Tia",
   "Hri-Tia",
   "Hur-Tia",
   "Iio-Tia",
   "Ism-Tia",
   "Kai-Tia",
   "Lou-Tia",
   "Pet-Tia",
   "Seo-Tia",
   "Set-Tia",
   "Tal-Tia"
  ],
  "PID_ディートリヒ": [
   "Buc-Dit",
   "Cat-Dit",
   "Dit-Esm",
   "Dit-Fab",
   "Dit-Hal",
   "Dit-Ism",
   "Dit-Kai",
   "Dit-Led",
   "Dit-Mic",
   "Dit-Seo",
   "Dit-Set",
   "Dit-Tal"
  ],
  "PID_ディエゴ": [
   "Die-Esm",
   "Die-Hal",
   "Die-Iio",
   "Die-Ism",
   "Die-Lil",
   "Die-Nin",
   "Die-Nuz",
   "Die-Sar",
   "Die-Seo",
   "Die-Set"
  ],
  "PID_ナジャ": [
   "Dai-Naz",
   "Fab-Naz",
   "Hal-Naz",
   "Hur-Naz",
   "Ism-Naz",
   "Maj-Naz",
   "Naz-Sar",
   "Naz-Seo"
  ],
  "PID_ニネ": [
   "Die-Nin",
   "Ism-Nin",
   "Kai-Nin",
   "Lys-Nin",
   "Nin-Orh",
   "Nin-Pep",
   "Nin-Pet",
   "Nin-Sci",
   "Nin-Sim"
  ],
  "PID_ヌディーヌ": [
   "Bon-Ned",
   "Dan-Ned",
   "Ism-Ned",
   "Lil-Ned"
  ],
  "PID_ノクチュラ": [
   "Gol-Noc",
   "Ism-Noc",
   "Max-Noc"
  ],
  "PID_バッカニア": [
   "Buc-Dai",
   "Buc-Dit",
   "Buc-Ism",
   "Buc-Jas",
   "Buc-Led",
   "Buc-Lou",
   "Buc-Max",
   "Buc-Moo",
   "Buc-Oly",
   "Buc-Sci"
  ],
  "PID_ハルヴィン": [
   "Bon-Hal",
   "Die-Hal",
   "Dit-Hal",
   "Fab-Hal",
   "Hal-Ism",
   "Hal-Max",
   "Hal-Naz",
   "Hal-Sar",
   "Hal-Zac"
  ],
  "PID_ピーテル": [
   "Dai-Pet",
   "Hur-Pet",
   "Ism-Pet",
   "Kai-Pet",
   "Max-Pet",
   "Moo-Pet",
   "Nin-Pet",
   "Pet-Sop",
   "Pet-Tia",
   "Pet-Urs"
  ],
  "PID_フィアナ": [
   "Fia-Ism",
   "Fia-Lou",
   "Fia-Lys",
   "Fia-Oly",
   "Fia-Orh",
   "Fia-Sim",
   "Fia-Tal",
   "Fia-Urs"
  ],
  "PID_ペペ": [
   "Hur-Pep",
   "Ism-Pep",
   "Moo-Pep",
   "Nin-Pep"
  ],
  "PID_ベンディッツ": [
   "Ism-Ven",
   "Lou-Ven"
  ],
  "PID_ボナパルテ": [
   "Bon-Hal",
   "Bon-Ism",
   "Bon-Lil",
   "Bon-Lys",
   "Bon-Ned",
   "Bon-Orh",
   "Bon-Seo",
   "Bon-Tia",
   "Bon-Tob",
   "Bon-Tro",
   "Bon-Urs"
  ],
  "PID_マクシム": [
   "Buc-Max",
   "Dan-Max",
   "Gol-Max",
   "Hal-Max",
   "Ism-Max",
   "Led-Max",
   "Max-Mic",
   "Max-Noc",
   "Max-Pet"
  ],
  "PID_マジーデ": [
   "Ism-Maj",
   "Maj-Naz",
   "Maj-Orh"
  ],
  "PID_ミカエラ": [
   "Dit-Mic",
   "Esm-Mic",
   "Fab-Mic",
   "Guj-Mic",
   "Ism-Mic",
   "Lor-Mic",
   "Max-Mic",
   "Mic-Moo",
   "Mic-Sim",
   "Mic-Sop"
  ],
  "PID_ムウ": [
   "Buc-Moo",
   "Guj-Moo",
   "Ism-Moo",
   "Kai-Moo",
   "Led-Moo",
   "Lil-Moo",
   "Mic-Moo",
   "Moo-Oly",
   "Moo-Pep",
   "Moo-Pet",
   "Moo-Sci"
  ],
  "PID_ライサンダー": [
   "Bon-Lys",
   "Cat-Lys",
   "Esm-Lys",
   "Fia-Lys",
   "Ism-Lys",
   "Lil-Lys",
   "Lys-Nin",
   "Lys-Seo",
   "Lys-Tob"
  ],
  "PID_リリアン": [
   "Bon-Lil",
   "Die-Lil",
   "Gat-Lil",
   "Ism-Lil",
   "Lil-Lys",
   "Lil-Moo",
   "Lil-Ned",
   "Lil-Seo",
   "Lil-Sim",
   "Lil-Tal",
   "Lil-Tob"
  ],
  "PID_ルルディヤー": [
   "Buc-Lou",
   "Esm-Lou",
   "Fia-Lou",
   "Gat-Lou",
   "Ism-Lou",
   "Lou-Set",
   "Lou-Sim",
   "Lou-Tia",
   "Lou-Ven"
  ],
  "PID_レダ": [
   "Asw-Led",
   "Buc-Led",
   "Dan-Led",
   "Dit-Led",
   "Esm-Led",
   "Guj-Led",
   "Ism-Led",
   "Kai-Led",
   "Led-Max",
   "Led-Moo",
   "Led-Oly",
   "Led-Orh",
   "Led-Sci",
   "Led-Seo",
   "Led-Tal"
  ],
  "PID_ロレッタ": [
   "Gol-Lor",
   "Hur-Lor",
   "Ism-Lor",
   "Lor-Mic",
   "Lor-Sar",
   "Lor-Set",
   "Lor-Tob",
   "Lor-Yan"
  ],
  "PID_セントリオン": [
   "Cen-Hur",
   "Cen-Kai"
  ],
  "PID_キロイカ": [
   "Esm-Kir"
  ],
  "PID_キリーク": [
   "Hri-Nat",
   "Hri-Oly",
   "Hri-Tia"
  ],
  "PID_オルヘル": [
   "Bon-Orh",
   "Fia-Orh",
   "Hur-Orh",
   "Led-Orh",
   "Maj-Orh",
   "Nin-Orh"
  ],
  "PID_ベルトラン": [
   "Bel-Kai",
   "Bel-Seo",
   "Bel-Tal"
  ],
  "PID_タリムーン": [
   "Bel-Tal",
   "Dan-Tal",
   "Dit-Tal",
   "Fia-Tal",
   "Led-Tal",
   "Lil-Tal",
   "Seo-Tal",
   "Sim-Tal",
   "Tal-Tia"
  ],
  "PID_トロイア": [
   "Bon-Tro",
   "Seo-Tro"
  ],
  "PID_セテス": [
   "Dai-Set",
   "Dan-Set",
   "Die-Set",
   "Dit-Set",
   "Lor-Set",
   "Lou-Set",
   "Set-Tia"
  ],
  "PID_ヌッツォ": [
   "Die-Nuz"
  ],
  "PID_ネイサン": [
   "Hri-Nat"
  ],
  "PID_アスワン": [
   "Asw-Led"
  ]
 },
 "special_no_conv": [
  {
   "pair": "Ale-Iio",
   "bonus": {
    "物攻": 1
   }
  },
  {
   "pair": "Ale-Sop",
   "bonus": {
    "魔防": 1
   }
  },
  {
   "pair": "Anh-Bel",
   "bonus": {
    "回避": 5
   }
  },
  {
   "pair": "Anh-Dai",
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "pair": "Anh-Hal",
   "bonus": {
    "命中": 5
   }
  },
  {
   "pair": "Anh-Ism",
   "bonus": {
    "回避": 5
   }
  },
  {
   "pair": "Anh-Led",
   "bonus": {
    "必殺": 5
   }
  },
  {
   "pair": "Anh-Naz",
   "bonus": {
    "物攻": 1
   }
  },
  {
   "pair": "Anh-Orh",
   "bonus": {
    "物防": 1
   }
  },
  {
   "pair": "Anh-Sar",
   "bonus": {
    "魔防": 1
   }
  },
  {
   "pair": "Anh-Seo",
   "bonus": {
    "攻速": 1
   }
  },
  {
   "pair": "Anh-Tal",
   "bonus": {
    "必殺": 5
   }
  },
  {
   "pair": "Asw-Bel",
   "bonus": {
    "攻速": 1
   }
  },
  {
   "pair": "Asw-Ism",
   "bonus": {
    "攻速": 1
   }
  },
  {
   "pair": "Asw-Tah",
   "bonus": {
    "物攻": 1
   }
  },
  {
   "pair": "Aur-Kai",
   "bonus": {
    "物防": 1
   }
  },
  {
   "pair": "Bel-Dan",
   "bonus": {
    "回避": 5
   }
  },
  {
   "pair": "Bel-Dit",
   "bonus": {
    "攻速": 1
   }
  },
  {
   "pair": "Bel-Fia",
   "bonus": {
    "攻速": 1
   }
  },
  {
   "pair": "Bel-Gat",
   "bonus": {
    "命中": 5
   }
  },
  {
   "pair": "Bel-Gol",
   "bonus": {
    "物防": 1
   }
  },
  {
   "pair": "Bel-Hri",
   "bonus": {
    "回避": 5
   }
  },
  {
   "pair": "Bel-Iio",
   "bonus": {
    "攻速": 1
   }
  },
  {
   "pair": "Bel-Ism",
   "bonus": {
    "攻速": 1
   }
  },
  {
   "pair": "Bel-Max",
   "bonus": {
    "回避": 5
   }
  },
  {
   "pair": "Bel-Nat",
   "bonus": {
    "回避": 5
   }
  },
  {
   "pair": "Bel-Naz",
   "bonus": {
    "攻速": 1
   }
  },
  {
   "pair": "Bel-Orh",
   "bonus": {
    "物防": 1
   }
  },
  {
   "pair": "Bon-Kra",
   "bonus": {
    "回避": 5
   }
  },
  {
   "pair": "Cat-Iio",
   "bonus": {
    "回避": 5
   }
  },
  {
   "pair": "Cat-Ini",
   "bonus": {
    "必避": 5
   }
  },
  {
   "pair": "Cat-Sop",
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "pair": "Cat-Zac",
   "bonus": {
    "回避": 5
   }
  },
  {
   "pair": "Cen-Ism",
   "bonus": {
    "物防": 1
   }
  },
  {
   "pair": "Dai-Hal",
   "bonus": {
    "回避": 5
   }
  },
  {
   "pair": "Dai-Sar",
   "bonus": {
    "命中": 5
   }
  },
  {
   "pair": "Dai-Tro",
   "bonus": {
    "攻速": 1
   }
  },
  {
   "pair": "Die-Orh",
   "bonus": {
    "命中": 5
   }
  },
  {
   "pair": "Fia-Nat",
   "bonus": {
    "回避": 5
   }
  },
  {
   "pair": "Gat-Max",
   "bonus": {
    "命中": 5
   }
  },
  {
   "pair": "Guj-Jas",
   "bonus": {
    "必避": 5
   }
  },
  {
   "pair": "Guj-Maj",
   "bonus": {
    "物防": 1
   }
  },
  {
   "pair": "Guj-Pep",
   "bonus": {
    "物攻": 1
   }
  },
  {
   "pair": "Hri-Ism",
   "bonus": {
    "命中": 5
   }
  },
  {
   "pair": "Iio-Ned",
   "bonus": {
    "物攻": 1
   }
  },
  {
   "pair": "Iio-Sop",
   "bonus": {
    "命中": 5
   }
  },
  {
   "pair": "Ini-Tal",
   "bonus": {
    "必殺": 5
   }
  },
  {
   "pair": "Ini-Yan",
   "bonus": {
    "必避": 5
   }
  },
  {
   "pair": "Ini-Zac",
   "bonus": {
    "必避": 5
   }
  },
  {
   "pair": "Ism-Kir",
   "bonus": {
    "必殺": 5
   }
  },
  {
   "pair": "Ism-Kra",
   "bonus": {
    "攻速": 1
   }
  },
  {
   "pair": "Ism-Nat",
   "bonus": {
    "攻速": 1
   }
  },
  {
   "pair": "Ism-Nuz",
   "bonus": {
    "必殺": 5
   }
  },
  {
   "pair": "Ism-Orh",
   "bonus": {
    "魔防": 1
   }
  },
  {
   "pair": "Ism-Set",
   "bonus": {
    "物攻": 1
   }
  },
  {
   "pair": "Ism-Tah",
   "bonus": {
    "命中": 5
   }
  },
  {
   "pair": "Ism-Tal",
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "pair": "Ism-Tro",
   "bonus": {
    "必殺": 5
   }
  },
  {
   "pair": "Jas-Ned",
   "bonus": {
    "物攻": 1
   }
  },
  {
   "pair": "Jas-Ven",
   "bonus": {
    "物防": 1
   }
  },
  {
   "pair": "Kai-Orh",
   "bonus": {
    "魔防": 1
   }
  },
  {
   "pair": "Kai-Tal",
   "bonus": {
    "魔攻": 1
   }
  },
  {
   "pair": "Kra-Ned",
   "bonus": {
    "攻速": 1
   }
  },
  {
   "pair": "Kra-Seo",
   "bonus": {
    "命中": 5
   }
  },
  {
   "pair": "Kra-Tob",
   "bonus": {
    "必殺": 5
   }
  },
  {
   "pair": "Lor-Nin",
   "bonus": {
    "必避": 5
   }
  },
  {
   "pair": "Lor-Orh",
   "bonus": {
    "物防": 1
   }
  },
  {
   "pair": "Lou-Tal",
   "bonus": {
    "回避": 5
   }
  },
  {
   "pair": "Lou-Urs",
   "bonus": {
    "回避": 5
   }
  },
  {
   "pair": "Lys-Sar",
   "bonus": {
    "物攻": 1
   }
  },
  {
   "pair": "Maj-Noc",
   "bonus": {
    "物防": 1
   }
  },
  {
   "pair": "Maj-Ven",
   "bonus": {
    "必殺": 5
   }
  },
  {
   "pair": "Mic-Tal",
   "bonus": {
    "物攻": 1
   }
  },
  {
   "pair": "Naz-Nin",
   "bonus": {
    "攻速": 1
   }
  },
  {
   "pair": "Ned-Ven",
   "bonus": {
    "攻速": 1
   }
  },
  {
   "pair": "Nin-Set",
   "bonus": {
    "物防": 1
   }
  },
  {
   "pair": "Noc-Pep",
   "bonus": {
    "回避": 5
   }
  },
  {
   "pair": "Noc-Ven",
   "bonus": {
    "物攻": 1
   }
  },
  {
   "pair": "Noc-Zac",
   "bonus": {
    "攻速": 1
   }
  },
  {
   "pair": "Orh-Seo",
   "bonus": {
    "魔防": 1
   }
  },
  {
   "pair": "Orh-Set",
   "bonus": {
    "物防": 1
   }
  },
  {
   "pair": "Orh-Tal",
   "bonus": {
    "物防": 1
   }
  },
  {
   "pair": "Pep-Zac",
   "bonus": {
    "必避": 5
   }
  },
  {
   "pair": "Sop-Yan",
   "bonus": {
    "必殺": 5
   }
  },
  {
   "pair": "Tal-Urs",
   "bonus": {
    "攻速": 1
   }
  }
 ],
 "sheet_cmp": {
  "match": 293,
  "diff": [
   {
    "pair": "Anh-Hal",
    "sheet": [
     "Hit 5",
     "Rsl 1"
    ]
   },
   {
    "pair": "Oly-Tob",
    "sheet": [
     "Mys 1"
    ]
   },
   {
    "pair": "Ism-Kai",
    "sheet": [
     "Mys 5"
    ]
   },
   {
    "pair": "Ism-Lou",
    "sheet": [
     "Crit 5"
    ]
   },
   {
    "pair": "Ism-Tob",
    "sheet": [
     "Ddg 1"
    ]
   },
   {
    "pair": "Ism-Urs",
    "sheet": [
     "Phys 1"
    ]
   }
  ],
  "sheet_only": [],
  "game_only": [
   "Anh-Bel",
   "Anh-Orh",
   "Aur-Kai",
   "Bel-Naz",
   "Bel-Orh",
   "Bon-Kra",
   "Cat-Sop",
   "Cat-Zac",
   "Guj-Jas",
   "Guj-Maj",
   "Guj-Pep",
   "Iio-Ned",
   "Iio-Sop",
   "Ini-Tal",
   "Ini-Yan",
   "Jas-Ned",
   "Kra-Ned",
   "Kra-Seo",
   "Kra-Tob",
   "Lys-Sar",
   "Maj-Noc",
   "Mic-Tal",
   "Noc-Zac",
   "Orh-Tal",
   "Pep-Zac",
   "Sop-Yan"
  ]
 },
 "sheet_cls_cmp": {
  "match": 86,
  "diff": [],
  "unknown": [
   "Armor Knight",
   "Celestial Knight",
   "Dreadnaught"
  ]
 },
 "endings": [
  {
   "id": "Pair_Anh_Dai_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Anh-Dai",
   "a": "PID_アナトリア",
   "b": "PID_ダイトウ",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Anh_Hal_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Anh-Hal",
   "a": "PID_アナトリア",
   "b": "PID_ハルヴィン",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Anh_Naz_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Anh-Naz",
   "a": "PID_アナトリア",
   "b": "PID_ナジャ",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Anh_Sar_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Anh-Sar",
   "a": "PID_アナトリア",
   "b": "PID_サラン",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Bel_Asw_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Asw-Bel",
   "a": "PID_ベルトラン",
   "b": "PID_アスワン",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Bel_Dan_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Bel-Dan",
   "a": "PID_ベルトラン",
   "b": "PID_ダンテ",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Bel_Gat_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Bel-Gat",
   "a": "PID_ベルトラン",
   "b": "PID_ゲイツ",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Bel_Gol_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Bel-Gol",
   "a": "PID_ベルトラン",
   "b": "PID_ゴライアス",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Bel_Max_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Bel-Max",
   "a": "PID_ベルトラン",
   "b": "PID_マクシム",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Bon_Lil_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Bon-Lil",
   "a": "PID_ボナパルテ",
   "b": "PID_リリアン",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Bonaventure and Lilian"
   ]
  },
  {
   "id": "Pair_Buc_Oly_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Buc-Oly",
   "a": "PID_バッカニア",
   "b": "PID_オリンピア",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Buccar and Olympia"
   ]
  },
  {
   "id": "Pair_Dai_Hal_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Dai-Hal",
   "a": "PID_ダイトウ",
   "b": "PID_ハルヴィン",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Die_Lor_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Die-Lor",
   "a": "PID_ディエゴ",
   "b": "PID_ロレッタ",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Die_Nin_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Die-Nin",
   "a": "PID_ディエゴ",
   "b": "PID_ニネ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Diego and Ninae"
   ]
  },
  {
   "id": "Pair_Dit_Bel_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Bel-Dit",
   "a": "PID_ディートリヒ",
   "b": "PID_ベルトラン",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Dit_Esm_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Dit-Esm",
   "a": "PID_ディートリヒ",
   "b": "PID_エスメラルダ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Dietrich and Esmeralda"
   ]
  },
  {
   "id": "Pair_Dit_Fab_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Dit-Fab",
   "a": "PID_ディートリヒ",
   "b": "PID_ファビオ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Dietrich and Fabio"
   ]
  },
  {
   "id": "Pair_Dit_Hal_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Dit-Hal",
   "a": "PID_ディートリヒ",
   "b": "PID_ハルヴィン",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Dietrich and Halvin"
   ]
  },
  {
   "id": "Pair_Dit_Led_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Dit-Led",
   "a": "PID_ディートリヒ",
   "b": "PID_レダ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Dietrich and Leda"
   ]
  },
  {
   "id": "Pair_Dit_Mic_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Dit-Mic",
   "a": "PID_ディートリヒ",
   "b": "PID_ミカエラ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Dietrich and Mikaela"
   ]
  },
  {
   "id": "Pair_Esm_Die_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Die-Esm",
   "a": "PID_エスメラルダ",
   "b": "PID_ディエゴ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Diego and Esmeralda"
   ]
  },
  {
   "id": "Pair_Esm_Lys_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Esm-Lys",
   "a": "PID_エスメラルダ",
   "b": "PID_ライサンダー",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Esmeralda and Lysander"
   ]
  },
  {
   "id": "Pair_Fab_Esm_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Esm-Fab",
   "a": "PID_ファビオ",
   "b": "PID_エスメラルダ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Esmeralda and Fabio"
   ]
  },
  {
   "id": "Pair_Fab_Mic_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Fab-Mic",
   "a": "PID_ファビオ",
   "b": "PID_ミカエラ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Fabio and Mikaela"
   ]
  },
  {
   "id": "Pair_Fia_Lys_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Fia-Lys",
   "a": "PID_フィアナ",
   "b": "PID_ライサンダー",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Gat_Ale_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ale-Gat",
   "a": "PID_ゲイツ",
   "b": "PID_アレキサンドラ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Alexandra and Gaitz"
   ]
  },
  {
   "id": "Pair_Gat_Dan_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Dan-Gat",
   "a": "PID_ゲイツ",
   "b": "PID_ダンテ",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Gat_Urs_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Gat-Urs",
   "a": "PID_ゲイツ",
   "b": "PID_ウーシュラ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Gaitz and Ursula"
   ]
  },
  {
   "id": "Pair_Gol_Dan_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Dan-Gol",
   "a": "PID_ゴライアス",
   "b": "PID_ダンテ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Dante and Goliath"
   ]
  },
  {
   "id": "Pair_Gol_Lor_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Gol-Lor",
   "a": "PID_ゴライアス",
   "b": "PID_ロレッタ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Goliath and Loretta"
   ]
  },
  {
   "id": "Pair_Gol_Oly_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Gol-Oly",
   "a": "PID_ゴライアス",
   "b": "PID_オリンピア",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Goliath and Olympia"
   ]
  },
  {
   "id": "Pair_Hur_Gol_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Gol-Hur",
   "a": "PID_ウルタンド",
   "b": "PID_ゴライアス",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Goliath and Ultand"
   ]
  },
  {
   "id": "Pair_Ism_Ale_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ale-Ism",
   "a": "PID_イシュマール",
   "b": "PID_アレキサンドラ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Alexandra and Eshmel"
   ]
  },
  {
   "id": "Pair_Ism_Anh_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Anh-Ism",
   "a": "PID_イシュマール",
   "b": "PID_アナトリア",
   "in_game": false,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": false
  },
  {
   "id": "Pair_Ism_Bel_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Bel-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ベルトラン",
   "in_game": false,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": false
  },
  {
   "id": "Pair_Ism_Bon_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Bon-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ボナパルテ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Bonaventure and Eshmel"
   ]
  },
  {
   "id": "Pair_Ism_Buc_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Buc-Ism",
   "a": "PID_イシュマール",
   "b": "PID_バッカニア",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Buccar and Eshmel"
   ]
  },
  {
   "id": "Pair_Ism_Cat_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Cat-Ism",
   "a": "PID_イシュマール",
   "b": "PID_カターニャ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Catania and Eshmel"
   ]
  },
  {
   "id": "Pair_Ism_Cle_001",
   "kind": "pareja",
   "empty": true,
   "pair": "Cle-Ism",
   "a": "PID_イシュマール",
   "b": "PID_クレオブロス",
   "in_game": false,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": false
  },
  {
   "id": "Pair_Ism_Dai_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Dai-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ダイトウ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Dadao and Eshmel"
   ]
  },
  {
   "id": "Pair_Ism_Dan_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Dan-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ダンテ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Dante and Eshmel"
   ]
  },
  {
   "id": "Pair_Ism_Die_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Die-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ディエゴ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Diego and Eshmel"
   ]
  },
  {
   "id": "Pair_Ism_Dit_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Dit-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ディートリヒ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Dietrich and Eshmel"
   ]
  },
  {
   "id": "Pair_Ism_Esm_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Esm-Ism",
   "a": "PID_イシュマール",
   "b": "PID_エスメラルダ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Esmeralda"
   ]
  },
  {
   "id": "Pair_Ism_Fab_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Fab-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ファビオ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Fabio"
   ]
  },
  {
   "id": "Pair_Ism_Fia_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Fia-Ism",
   "a": "PID_イシュマール",
   "b": "PID_フィアナ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Fianna"
   ]
  },
  {
   "id": "Pair_Ism_Gat_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Gat-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ゲイツ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Gaitz"
   ]
  },
  {
   "id": "Pair_Ism_Gol_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Gol-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ゴライアス",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Goliath"
   ]
  },
  {
   "id": "Pair_Ism_Guj_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Guj-Ism",
   "a": "PID_イシュマール",
   "b": "PID_グザラン",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Guzran"
   ]
  },
  {
   "id": "Pair_Ism_Hal_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Hal-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ハルヴィン",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Halvin"
   ]
  },
  {
   "id": "Pair_Ism_Hur_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Hur-Ism",
   "a": "PID_イシュマール",
   "b": "PID_ウルタンド",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Ultand"
   ]
  },
  {
   "id": "Pair_Ism_Iio_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Iio-Ism",
   "a": "PID_イシュマール",
   "b": "PID_イオ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Io"
   ]
  },
  {
   "id": "Pair_Ism_Ini_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ini-Ism",
   "a": "PID_イシュマール",
   "b": "PID_イニオニ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Inyoni"
   ]
  },
  {
   "id": "Pair_Ism_Jas_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Jas",
   "a": "PID_イシュマール",
   "b": "PID_ジャスミン",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Jasmine"
   ]
  },
  {
   "id": "Pair_Ism_Kai_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Kai",
   "a": "PID_イシュマール",
   "b": "PID_カイ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Cai and Eshmel"
   ]
  },
  {
   "id": "Pair_Ism_Kou_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Kou",
   "a": "PID_イシュマール",
   "b": "PID_コウカ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Hong Hua"
   ]
  },
  {
   "id": "Pair_Ism_Led_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Led",
   "a": "PID_イシュマール",
   "b": "PID_レダ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Leda"
   ]
  },
  {
   "id": "Pair_Ism_Lil_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Lil",
   "a": "PID_イシュマール",
   "b": "PID_リリアン",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Lilian"
   ]
  },
  {
   "id": "Pair_Ism_Lor_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Lor",
   "a": "PID_イシュマール",
   "b": "PID_ロレッタ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Loretta"
   ]
  },
  {
   "id": "Pair_Ism_Lou_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Lou",
   "a": "PID_イシュマール",
   "b": "PID_ルルディヤー",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Ludia"
   ]
  },
  {
   "id": "Pair_Ism_Lys_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Lys",
   "a": "PID_イシュマール",
   "b": "PID_ライサンダー",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Lysander"
   ]
  },
  {
   "id": "Pair_Ism_Maj_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Maj",
   "a": "PID_イシュマール",
   "b": "PID_マジーデ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Majide"
   ]
  },
  {
   "id": "Pair_Ism_Max_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Max",
   "a": "PID_イシュマール",
   "b": "PID_マクシム",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Jester"
   ]
  },
  {
   "id": "Pair_Ism_Mic_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Mic",
   "a": "PID_イシュマール",
   "b": "PID_ミカエラ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Mikaela"
   ]
  },
  {
   "id": "Pair_Ism_Moo_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Moo",
   "a": "PID_イシュマール",
   "b": "PID_ムウ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Mu"
   ]
  },
  {
   "id": "Pair_Ism_Mys_001",
   "kind": "pareja",
   "empty": true,
   "pair": "Ism-Mys",
   "a": "PID_イシュマール",
   "b": "PID_ミュソン",
   "in_game": false,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": false
  },
  {
   "id": "Pair_Ism_Naz_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Naz",
   "a": "PID_イシュマール",
   "b": "PID_ナジャ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Nezha"
   ]
  },
  {
   "id": "Pair_Ism_Ned_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Ned",
   "a": "PID_イシュマール",
   "b": "PID_ヌディーヌ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Nydine"
   ]
  },
  {
   "id": "Pair_Ism_Nin_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Nin",
   "a": "PID_イシュマール",
   "b": "PID_ニネ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Ninae"
   ]
  },
  {
   "id": "Pair_Ism_Noc_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Noc",
   "a": "PID_イシュマール",
   "b": "PID_ノクチュラ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Noctula"
   ]
  },
  {
   "id": "Pair_Ism_Oly_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Oly",
   "a": "PID_イシュマール",
   "b": "PID_オリンピア",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Olympia"
   ]
  },
  {
   "id": "Pair_Ism_Orh_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Orh",
   "a": "PID_イシュマール",
   "b": "PID_オルヘル",
   "in_game": false,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": false
  },
  {
   "id": "Pair_Ism_Pep_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Pep",
   "a": "PID_イシュマール",
   "b": "PID_ペペ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Peppe"
   ]
  },
  {
   "id": "Pair_Ism_Pet_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Pet",
   "a": "PID_イシュマール",
   "b": "PID_ピーテル",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Peter"
   ]
  },
  {
   "id": "Pair_Ism_Sar_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Sar",
   "a": "PID_イシュマール",
   "b": "PID_サラン",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Sha Lan"
   ]
  },
  {
   "id": "Pair_Ism_Sci_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Sci",
   "a": "PID_イシュマール",
   "b": "PID_シロッコ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Sirocco"
   ]
  },
  {
   "id": "Pair_Ism_Seo_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Seo",
   "a": "PID_イシュマール",
   "b": "PID_セオドラ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Theodora"
   ]
  },
  {
   "id": "Pair_Ism_Set_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Set",
   "a": "PID_イシュマール",
   "b": "PID_セテス",
   "in_game": false,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": false
  },
  {
   "id": "Pair_Ism_Sim_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Sim",
   "a": "PID_イシュマール",
   "b": "PID_シモン",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Simon"
   ]
  },
  {
   "id": "Pair_Ism_Sop_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Sop",
   "a": "PID_イシュマール",
   "b": "PID_ソフィア",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Sofia"
   ]
  },
  {
   "id": "Pair_Ism_Tal_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Tal",
   "a": "PID_イシュマール",
   "b": "PID_タリムーン",
   "in_game": false,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": false
  },
  {
   "id": "Pair_Ism_Tia_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Tia",
   "a": "PID_イシュマール",
   "b": "PID_ティアラ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Tialla"
   ]
  },
  {
   "id": "Pair_Ism_Tob_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Tob",
   "a": "PID_イシュマール",
   "b": "PID_トビヤス",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Tobias"
   ]
  },
  {
   "id": "Pair_Ism_Urs_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Urs",
   "a": "PID_イシュマール",
   "b": "PID_ウーシュラ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Ursula"
   ]
  },
  {
   "id": "Pair_Ism_Ven_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Ven",
   "a": "PID_イシュマール",
   "b": "PID_ベンディッツ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Benditz and Eshmel"
   ]
  },
  {
   "id": "Pair_Ism_Yan_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Yan",
   "a": "PID_イシュマール",
   "b": "PID_ヨーカイ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Yang Jie"
   ]
  },
  {
   "id": "Pair_Ism_Zac_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ism-Zac",
   "a": "PID_イシュマール",
   "b": "PID_ザーコネ",
   "in_game": true,
   "cond": "Apoyo S con Eshmel (nivel 5) y Parte 3 completada",
   "has_conv": true,
   "fwuk": [
    "Eshmel and Zarcone"
   ]
  },
  {
   "id": "Pair_Kai_Ale_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Ale-Kai",
   "a": "PID_カイ",
   "b": "PID_アレキサンドラ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Alexandra and Cai"
   ]
  },
  {
   "id": "Pair_Kai_Esm_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Esm-Kai",
   "a": "PID_カイ",
   "b": "PID_エスメラルダ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Cai and Esmeralda"
   ]
  },
  {
   "id": "Pair_Kai_Hur_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Hur-Kai",
   "a": "PID_カイ",
   "b": "PID_ウルタンド",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Cai and Ultand"
   ]
  },
  {
   "id": "Pair_Kai_Led_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Kai-Led",
   "a": "PID_カイ",
   "b": "PID_レダ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Cai and Leda"
   ]
  },
  {
   "id": "Pair_Kai_Seo_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Kai-Seo",
   "a": "PID_カイ",
   "b": "PID_セオドラ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Cai and Theodora"
   ]
  },
  {
   "id": "Pair_Kai_Tia_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Kai-Tia",
   "a": "PID_カイ",
   "b": "PID_ティアラ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Cai and Tialla"
   ]
  },
  {
   "id": "Pair_Led_Bel_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Bel-Led",
   "a": "PID_レダ",
   "b": "PID_ベルトラン",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Led_Buc_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Buc-Led",
   "a": "PID_レダ",
   "b": "PID_バッカニア",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Buccar and Leda"
   ]
  },
  {
   "id": "Pair_Led_Moo_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Led-Moo",
   "a": "PID_レダ",
   "b": "PID_ムウ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Leda and Mu"
   ]
  },
  {
   "id": "Pair_Led_Oly_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Led-Oly",
   "a": "PID_レダ",
   "b": "PID_オリンピア",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Leda and Olympia"
   ]
  },
  {
   "id": "Pair_Led_Sci_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Led-Sci",
   "a": "PID_レダ",
   "b": "PID_シロッコ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Leda and Sirocco"
   ]
  },
  {
   "id": "Pair_Lil_Lys_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Lil-Lys",
   "a": "PID_リリアン",
   "b": "PID_ライサンダー",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Lilian and Lysander"
   ]
  },
  {
   "id": "Pair_Lor_Set_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Lor-Set",
   "a": "PID_ロレッタ",
   "b": "PID_セテス",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Loretta and Seteth"
   ]
  },
  {
   "id": "Pair_Lou_Buc_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Buc-Lou",
   "a": "PID_ルルディヤー",
   "b": "PID_バッカニア",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Buccar and Ludia"
   ]
  },
  {
   "id": "Pair_Lou_Fia_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Fia-Lou",
   "a": "PID_ルルディヤー",
   "b": "PID_フィアナ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Max_Dan_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Dan-Max",
   "a": "PID_マクシム",
   "b": "PID_ダンテ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Dante and Jester"
   ]
  },
  {
   "id": "Pair_Max_Hal_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Hal-Max",
   "a": "PID_マクシム",
   "b": "PID_ハルヴィン",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Halvin and Jester"
   ]
  },
  {
   "id": "Pair_Mic_Sim_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Mic-Sim",
   "a": "PID_ミカエラ",
   "b": "PID_シモン",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Mikaela and Simon"
   ]
  },
  {
   "id": "Pair_Naz_Hal_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Hal-Naz",
   "a": "PID_ナジャ",
   "b": "PID_ハルヴィン",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Naz_Sar_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Naz-Sar",
   "a": "PID_ナジャ",
   "b": "PID_サラン",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true
  },
  {
   "id": "Pair_Orh_Die_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Die-Orh",
   "a": "PID_オルヘル",
   "b": "PID_ディエゴ",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Orh_Nin_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Nin-Orh",
   "a": "PID_オルヘル",
   "b": "PID_ニネ",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Orh_Set_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Orh-Set",
   "a": "PID_オルヘル",
   "b": "PID_セテス",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Pet_Hur_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Hur-Pet",
   "a": "PID_ピーテル",
   "b": "PID_ウルタンド",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Peter and Ultand"
   ]
  },
  {
   "id": "Pair_Pet_Moo_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Moo-Pet",
   "a": "PID_ピーテル",
   "b": "PID_ムウ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Mu and Peter"
   ]
  },
  {
   "id": "Pair_Sar_Dai_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Dai-Sar",
   "a": "PID_サラン",
   "b": "PID_ダイトウ",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Sar_Hal_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Hal-Sar",
   "a": "PID_サラン",
   "b": "PID_ハルヴィン",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true
  },
  {
   "id": "Pair_Sci_Moo_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Moo-Sci",
   "a": "PID_シロッコ",
   "b": "PID_ムウ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Mu and Sirocco"
   ]
  },
  {
   "id": "Pair_Sci_Oly_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Oly-Sci",
   "a": "PID_シロッコ",
   "b": "PID_オリンピア",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Olympia and Sirocco"
   ]
  },
  {
   "id": "Pair_Sci_Sar_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Sar-Sci",
   "a": "PID_シロッコ",
   "b": "PID_サラン",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Sha Lan and Sirocco"
   ]
  },
  {
   "id": "Pair_Seo_Anh_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Anh-Seo",
   "a": "PID_セオドラ",
   "b": "PID_アナトリア",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Seo_Bel_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Bel-Seo",
   "a": "PID_セオドラ",
   "b": "PID_ベルトラン",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Seo_Bon_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Bon-Seo",
   "a": "PID_セオドラ",
   "b": "PID_ボナパルテ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Seo_Lys_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Lys-Seo",
   "a": "PID_セオドラ",
   "b": "PID_ライサンダー",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Lysander and Theodora"
   ]
  },
  {
   "id": "Pair_Seo_Tal_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Seo-Tal",
   "a": "PID_セオドラ",
   "b": "PID_タリムーン",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Seo_Tob_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Seo-Tob",
   "a": "PID_セオドラ",
   "b": "PID_トビヤス",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Theodora and Tobias"
   ]
  },
  {
   "id": "Pair_Set_Nin_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Nin-Set",
   "a": "PID_セテス",
   "b": "PID_ニネ",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Sim_Fia_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Fia-Sim",
   "a": "PID_シモン",
   "b": "PID_フィアナ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Fianna and Simon"
   ]
  },
  {
   "id": "Pair_Sim_Lil_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Lil-Sim",
   "a": "PID_シモン",
   "b": "PID_リリアン",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Lilian and Simon"
   ]
  },
  {
   "id": "Pair_Sim_Lou_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Lou-Sim",
   "a": "PID_シモン",
   "b": "PID_ルルディヤー",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Ludia and Simon"
   ]
  },
  {
   "id": "Pair_Tal_Fia_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Fia-Tal",
   "a": "PID_タリムーン",
   "b": "PID_フィアナ",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Tal_Lou_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Lou-Tal",
   "a": "PID_タリムーン",
   "b": "PID_ルルディヤー",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Tal_Mic_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Mic-Tal",
   "a": "PID_タリムーン",
   "b": "PID_ミカエラ",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Tal_Sim_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Sim-Tal",
   "a": "PID_タリムーン",
   "b": "PID_シモン",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Tal_Urs_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Tal-Urs",
   "a": "PID_タリムーン",
   "b": "PID_ウーシュラ",
   "in_game": false,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": false
  },
  {
   "id": "Pair_Tia_Bon_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Bon-Tia",
   "a": "PID_ティアラ",
   "b": "PID_ボナパルテ",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Bonaventure and Tialla"
   ]
  },
  {
   "id": "Pair_Tia_Pet_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Pet-Tia",
   "a": "PID_ティアラ",
   "b": "PID_ピーテル",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Peter and Tialla"
   ]
  },
  {
   "id": "Pair_Tob_Lil_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Lil-Tob",
   "a": "PID_トビヤス",
   "b": "PID_リリアン",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Lilian and Tobias"
   ]
  },
  {
   "id": "Pair_Tob_Oly_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Oly-Tob",
   "a": "PID_トビヤス",
   "b": "PID_オリンピア",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Olympia and Tobias"
   ]
  },
  {
   "id": "Pair_Urs_Sim_001",
   "kind": "pareja",
   "empty": false,
   "pair": "Sim-Urs",
   "a": "PID_ウーシュラ",
   "b": "PID_シモン",
   "in_game": true,
   "cond": "Ver la conversación A de la pareja (sin ver otra A que la sustituya)",
   "has_conv": true,
   "fwuk": [
    "Simon and Ursula"
   ]
  },
  {
   "id": "Solo_1Lost_Ale_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_アレキサンドラ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Buc_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_バッカニア",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "Buccar - Demon Bear of Baphos (If defeated in Classic Mode during Part 1."
   ]
  },
  {
   "id": "Solo_1Lost_Cat_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_カターニャ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "Catania (If defeated before the timeskip in Classic Mode"
   ]
  },
  {
   "id": "Solo_1Lost_Dai_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ダイトウ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "Dadao - Self-Proclaimed Protector (If defeated in Classic Mode during Part 1."
   ]
  },
  {
   "id": "Solo_1Lost_Dan_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ダンテ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "Dante - Literary Genius (If defeated in Classic Mode during Part 1."
   ]
  },
  {
   "id": "Solo_1Lost_Die_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ディエゴ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Esm_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_エスメラルダ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Fab_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ファビオ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Fia_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_フィアナ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Gat_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ゲイツ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Gol_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ゴライアス",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "Goliath - The Butcher (If defeated in Classic Mode during Part 1."
   ]
  },
  {
   "id": "Solo_1Lost_Guj_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_グザラン",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Hal_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ハルヴィン",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Hur_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ウルタンド",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "'''Ultand (If defeated before the timeskip in Classic Mode)'''"
   ]
  },
  {
   "id": "Solo_1Lost_Iio_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_イオ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "'''Io (If defeated before the timeskip in Classic Mode)'''"
   ]
  },
  {
   "id": "Solo_1Lost_Ini_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_イニオニ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Jas_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ジャスミン",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Kir_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_キロイカ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Lil_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_リリアン",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "Lilian (if defeated in Part I Classic Mode"
   ]
  },
  {
   "id": "Solo_1Lost_Lor_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ロレッタ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Lou_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ルルディヤー",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Lys_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ライサンダー",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "Lysander - Soldier of Saramis (if defeated in Part I, Classic Mode"
   ]
  },
  {
   "id": "Solo_1Lost_Maj_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_マジーデ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Max_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_マクシム",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Mic_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ミカエラ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Moo_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ムウ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "Mu (if defeated in Part I Classic Mode"
   ]
  },
  {
   "id": "Solo_1Lost_Naz_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ナジャ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Ned_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ヌディーヌ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Nin_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ニネ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Noc_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ノクチュラ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Nuz_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ヌッツォ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Oly_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_オリンピア",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Pep_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ペペ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Pet_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ピーテル",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "Peter - Child of Ribeira (if defeated in Part I, Classic Mode"
   ]
  },
  {
   "id": "Solo_1Lost_Sar_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_サラン",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Sci_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_シロッコ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "Sirocco - Capricious Wind (if defeated during Part I, Classic Mode"
   ]
  },
  {
   "id": "Solo_1Lost_Set_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_セテス",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Sim_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_シモン",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Sop_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ソフィア",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "'''Sofia (If defeated before the timeskip in Classic Mode)'''"
   ]
  },
  {
   "id": "Solo_1Lost_Tia_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ティアラ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "Tialla - Great Tactician's Grandchild (if defeated during Part I, Classic Mode"
   ]
  },
  {
   "id": "Solo_1Lost_Urs_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ウーシュラ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Ven_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ベンディッツ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_1Lost_Yan_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ヨーカイ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "'''Yang Jie (If defeated before the timeskip in Classic Mode)'''"
   ]
  },
  {
   "id": "Solo_1Lost_Zac_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ザーコネ",
   "variant": "1Lost",
   "cond": "Si cae en combate en la Parte 1 (modo Clásico)",
   "in_game": true,
   "fwuk": [
    "Zarcone (If defeated before the timeskip in Classic Mode"
   ]
  },
  {
   "id": "Solo_2Dead_Set_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_セテス",
   "variant": "2Dead",
   "cond": "Si cae en combate en la Parte 2 (modo Clásico) — versión «sobrevive»",
   "in_game": true
  },
  {
   "id": "Solo_2Lost_Bon_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ボナパルテ",
   "variant": "2Lost",
   "cond": "Si cae en combate en la Parte 2 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_2Lost_Tob_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_トビヤス",
   "variant": "2Lost",
   "cond": "Si cae en combate en la Parte 2 (modo Clásico)",
   "in_game": true
  },
  {
   "id": "Solo_3Dead_Ann_001",
   "kind": "solo",
   "empty": true,
   "pid": "PID_アンナ",
   "variant": "3Dead",
   "cond": "Si cae en combate en la Parte 3 (modo Clásico) — versión «sobrevive»",
   "in_game": false
  },
  {
   "id": "Solo_3Dead_Cle_001",
   "kind": "solo",
   "empty": true,
   "pid": "PID_クレオブロス",
   "variant": "3Dead",
   "cond": "Si cae en combate en la Parte 3 (modo Clásico) — versión «sobrevive»",
   "in_game": false
  },
  {
   "id": "Solo_3Dead_Mys_001",
   "kind": "solo",
   "empty": true,
   "pid": "PID_ミュソン",
   "variant": "3Dead",
   "cond": "Si cae en combate en la Parte 3 (modo Clásico) — versión «sobrevive»",
   "in_game": false
  },
  {
   "id": "Solo_3Dead_Set_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_セテス",
   "variant": "3Dead",
   "cond": "Si cae en combate en la Parte 3 (modo Clásico) — versión «sobrevive»",
   "in_game": true
  },
  {
   "id": "Solo_Living_Ale_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_アレキサンドラ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Alexandra - Splendid Maiden"
   ]
  },
  {
   "id": "Solo_Living_Anh_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_アナトリア",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); sin la marca «participación limitada» de Anatolia (限定参戦)",
   "flag": "限定参戦_アナトリア",
   "in_game": true
  },
  {
   "id": "Solo_Living_Anh_002",
   "kind": "solo",
   "empty": false,
   "pid": "PID_アナトリア",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); con la marca «participación limitada» de Anatolia (限定参戦)",
   "flag": "限定参戦_アナトリア",
   "in_game": true,
   "fwuk": [
    "Anatolia - Raven-Haired Princess"
   ]
  },
  {
   "id": "Solo_Living_Ann_001",
   "kind": "solo",
   "empty": true,
   "pid": "PID_アンナ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": false
  },
  {
   "id": "Solo_Living_Asw_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_アスワン",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); si Bertrand sigue con vida",
   "flag": "ローカル_同期_死別退場_ベルトラン",
   "in_game": true,
   "fwuk": [
    "Aswan - Queen of Arago"
   ]
  },
  {
   "id": "Solo_Living_Asw_002",
   "kind": "solo",
   "empty": false,
   "pid": "PID_アスワン",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); si Bertrand murió (modo Clásico)",
   "flag": "ローカル_同期_死別退場_ベルトラン",
   "in_game": true
  },
  {
   "id": "Solo_Living_Aur_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_アウロラ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": false
  },
  {
   "id": "Solo_Living_Bel_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ベルトラン",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); sin la marca «participación limitada» de Bertrand (限定参戦)",
   "flag": "限定参戦_ベルトラン",
   "in_game": true
  },
  {
   "id": "Solo_Living_Bel_002",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ベルトラン",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); con la marca «participación limitada» de Bertrand (限定参戦)",
   "flag": "限定参戦_ベルトラン",
   "in_game": true,
   "fwuk": [
    "Bertrand - King of Brezarant"
   ]
  },
  {
   "id": "Solo_Living_Bon_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ボナパルテ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); si Theodora sigue con vida",
   "flag": "ローカル_同期_死別退場_セオドラ",
   "in_game": true,
   "fwuk": [
    "Bonaventure - Font of Wisdom"
   ]
  },
  {
   "id": "Solo_Living_Bon_002",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ボナパルテ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); si Theodora murió (modo Clásico)",
   "flag": "ローカル_同期_死別退場_セオドラ",
   "in_game": true,
   "fwuk": [
    "Bonaventure - Font of Wisdom (if Theodora is defeated in Classic Mode"
   ]
  },
  {
   "id": "Solo_Living_Buc_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_バッカニア",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); si Leda sigue con vida",
   "flag": "ローカル_同期_死別退場_レダ",
   "in_game": true,
   "fwuk": [
    "Buccar - Eminent Demon Bear"
   ]
  },
  {
   "id": "Solo_Living_Buc_002",
   "kind": "solo",
   "empty": false,
   "pid": "PID_バッカニア",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); si Leda murió (modo Clásico)",
   "flag": "ローカル_同期_死別退場_レダ",
   "in_game": true,
   "fwuk": [
    "Buccar - Eminent Demon Bear (If Leda is killed in Classic Mode"
   ]
  },
  {
   "id": "Solo_Living_Car_001",
   "kind": "solo",
   "empty": false,
   "pid": null,
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": false
  },
  {
   "id": "Solo_Living_Cat_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_カターニャ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Catania - Promised Knight"
   ]
  },
  {
   "id": "Solo_Living_Cen_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_セントリオン",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Centurio - Corundum"
   ]
  },
  {
   "id": "Solo_Living_Cla_001",
   "kind": "solo",
   "empty": false,
   "pid": null,
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": false
  },
  {
   "id": "Solo_Living_Cla_002",
   "kind": "solo",
   "empty": false,
   "pid": null,
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": false
  },
  {
   "id": "Solo_Living_Cle_001",
   "kind": "solo",
   "empty": true,
   "pid": "PID_クレオブロス",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": false
  },
  {
   "id": "Solo_Living_Dai_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ダイトウ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Dadao - Bold and Brash"
   ]
  },
  {
   "id": "Solo_Living_Dan_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ダンテ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Dante - Literary Genius"
   ]
  },
  {
   "id": "Solo_Living_Die_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ディエゴ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Diego - Forest Warrior"
   ]
  },
  {
   "id": "Solo_Living_Dit_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ディートリヒ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); sin la marca «participación limitada» de Dietrich (限定参戦)",
   "flag": "限定参戦_ディートリヒ",
   "in_game": true,
   "fwuk": [
    "Dietrich - Ravishing Shadow",
    "Game8’s version"
   ]
  },
  {
   "id": "Solo_Living_Dit_002",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ディートリヒ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); con la marca «participación limitada» de Dietrich (限定参戦)",
   "flag": "限定参戦_ディートリヒ",
   "in_game": true,
   "fwuk": [
    "Dietrich - Foreign Swordsman (if his path has not been completed"
   ]
  },
  {
   "id": "Solo_Living_Esm_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_エスメラルダ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Esmeralda - Inheritor of the Spear"
   ]
  },
  {
   "id": "Solo_Living_Fab_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ファビオ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Fabio - Servant of Agartha"
   ]
  },
  {
   "id": "Solo_Living_Fia_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_フィアナ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); si Fianna no recuperó la memoria",
   "flag": "進行_変化_フィアナの記憶が戻った",
   "in_game": true,
   "fwuk": [
    "Fianna - Girl with No Memories"
   ]
  },
  {
   "id": "Solo_Living_Fia_002",
   "kind": "solo",
   "empty": false,
   "pid": "PID_フィアナ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); si Fianna recuperó la memoria",
   "flag": "進行_変化_フィアナの記憶が戻った",
   "in_game": true
  },
  {
   "id": "Solo_Living_Gat_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ゲイツ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); si Bertrand sigue con vida",
   "flag": "ローカル_同期_死別退場_ベルトラン",
   "in_game": true,
   "fwuk": [
    "Gaitz - General of Brezarant"
   ]
  },
  {
   "id": "Solo_Living_Gat_002",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ゲイツ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); si Bertrand murió (modo Clásico)",
   "flag": "ローカル_同期_死別退場_ベルトラン",
   "in_game": true
  },
  {
   "id": "Solo_Living_Gol_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ゴライアス",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Goliath - The Titanic Butcher"
   ]
  },
  {
   "id": "Solo_Living_Gra_001",
   "kind": "solo",
   "empty": true,
   "pid": "PID_グラディウス",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": false
  },
  {
   "id": "Solo_Living_Guj_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_グザラン",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Guzran - Eternal Legend"
   ]
  },
  {
   "id": "Solo_Living_Hal_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ハルヴィン",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Halvin - Ever-Changing Acrobat"
   ]
  },
  {
   "id": "Solo_Living_Hri_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_キリーク",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Creek - Pantere"
   ]
  },
  {
   "id": "Solo_Living_Hur_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ウルタンド",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Ultand - Aurora's Attendant"
   ]
  },
  {
   "id": "Solo_Living_Iio_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_イオ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Io - Knight of Ideals"
   ]
  },
  {
   "id": "Solo_Living_Ini_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_イニオニ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Inyoni - Bragança's Sniper"
   ]
  },
  {
   "id": "Solo_Living_Ism_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_イシュマール",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Dietrich: ending text Reveal E Eshmel"
   ]
  },
  {
   "id": "Solo_Living_Jas_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ジャスミン",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Jasmine - Pluck Mercenary"
   ]
  },
  {
   "id": "Solo_Living_Jun_001",
   "kind": "solo",
   "empty": false,
   "pid": null,
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": false
  },
  {
   "id": "Solo_Living_Jun_002",
   "kind": "solo",
   "empty": false,
   "pid": null,
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": false
  },
  {
   "id": "Solo_Living_Kai_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_カイ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); sin la marca «participación limitada» de Cai (限定参戦)",
   "flag": "限定参戦_カイ",
   "in_game": true,
   "fwuk": [
    "Cai - Hell's-Eye",
    "Game8’s version"
   ]
  },
  {
   "id": "Solo_Living_Kai_002",
   "kind": "solo",
   "empty": false,
   "pid": "PID_カイ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); con la marca «participación limitada» de Cai (限定参戦)",
   "flag": "限定参戦_カイ",
   "in_game": true,
   "fwuk": [
    "Cai - Son of Castor (if his path has not been completed"
   ]
  },
  {
   "id": "Solo_Living_Kir_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_キロイカ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Kiroc - Anchored Pirate"
   ]
  },
  {
   "id": "Solo_Living_Kou_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_コウカ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Hong Hua - Promised One's Retainer"
   ]
  },
  {
   "id": "Solo_Living_Kra_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_クラプカ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Klapka - Mosa General"
   ]
  },
  {
   "id": "Solo_Living_Led_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_レダ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); sin la marca «participación limitada» de Leda (限定参戦)",
   "flag": "限定参戦_レダ",
   "in_game": true,
   "fwuk": [
    "Leda - Siren of the Six-String",
    "Game8’s version"
   ]
  },
  {
   "id": "Solo_Living_Led_002",
   "kind": "solo",
   "empty": false,
   "pid": "PID_レダ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); con la marca «participación limitada» de Leda (限定参戦)",
   "flag": "限定参戦_レダ",
   "in_game": true,
   "fwuk": [
    "Leda - Rose of Caelus (if her path has not been completed"
   ]
  },
  {
   "id": "Solo_Living_Lil_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_リリアン",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Lilian - Crackshot of Saramis"
   ]
  },
  {
   "id": "Solo_Living_Lor_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ロレッタ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Loretta - Priest-Warrior"
   ]
  },
  {
   "id": "Solo_Living_Lou_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ルルディヤー",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Ludia - Warrior-Merchant"
   ]
  },
  {
   "id": "Solo_Living_Lys_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ライサンダー",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Lysander - Young Knight of Saramis"
   ]
  },
  {
   "id": "Solo_Living_Maj_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_マジーデ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Majide - Aspiring Ruler"
   ]
  },
  {
   "id": "Solo_Living_Mar_001",
   "kind": "solo",
   "empty": false,
   "pid": null,
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": false
  },
  {
   "id": "Solo_Living_Max_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_マクシム",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Maxim - Knight of Brezarant"
   ]
  },
  {
   "id": "Solo_Living_Mic_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ミカエラ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Mikaela - Heroine Redblade"
   ]
  },
  {
   "id": "Solo_Living_Moo_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ムウ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Mu - Daughter of the Redblade"
   ]
  },
  {
   "id": "Solo_Living_Mys_001",
   "kind": "solo",
   "empty": true,
   "pid": "PID_ミュソン",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": false
  },
  {
   "id": "Solo_Living_Nat_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ネイサン",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Nathan - Catoblepas"
   ]
  },
  {
   "id": "Solo_Living_Naz_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ナジャ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Nezha - Martial-Arts Master"
   ]
  },
  {
   "id": "Solo_Living_Ned_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ヌディーヌ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Nydine - Honorable Warrior"
   ]
  },
  {
   "id": "Solo_Living_Nin_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ニネ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Ninae - In Black Lace"
   ]
  },
  {
   "id": "Solo_Living_Noc_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ノクチュラ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Noctula - Asherah Chief's Daughter"
   ]
  },
  {
   "id": "Solo_Living_Nuz_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ヌッツォ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Nuzzuo - Shape among the Trees"
   ]
  },
  {
   "id": "Solo_Living_Oly_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_オリンピア",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Olympia - Cherished Blue Rose"
   ]
  },
  {
   "id": "Solo_Living_Orh_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_オルヘル",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); sin la marca «participación limitada» de Orchel (限定参戦)",
   "flag": "限定参戦_オルヘル",
   "in_game": true
  },
  {
   "id": "Solo_Living_Orh_002",
   "kind": "solo",
   "empty": false,
   "pid": "PID_オルヘル",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); con la marca «participación limitada» de Orchel (限定参戦)",
   "flag": "限定参戦_オルヘル",
   "in_game": true,
   "fwuk": [
    "Orchel - Lead Priest of Credna's Temple"
   ]
  },
  {
   "id": "Solo_Living_Pep_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ペペ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Peppe - Unifier of Brigid"
   ]
  },
  {
   "id": "Solo_Living_Pet_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ピーテル",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Peter - Estie's Son"
   ]
  },
  {
   "id": "Solo_Living_Sar_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_サラン",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Sha Lan - The Graceful One"
   ]
  },
  {
   "id": "Solo_Living_Sci_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_シロッコ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Sirocco - Vulkan of Kalla's Temple"
   ]
  },
  {
   "id": "Solo_Living_Seo_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_セオドラ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); sin la marca «participación limitada» de Theodora (限定参戦)",
   "flag": "限定参戦_セオドラ",
   "in_game": true,
   "fwuk": [
    "Theodora - Breaker of Armies"
   ]
  },
  {
   "id": "Solo_Living_Seo_002",
   "kind": "solo",
   "empty": false,
   "pid": "PID_セオドラ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); con la marca «participación limitada» de Theodora (限定参戦)",
   "flag": "限定参戦_セオドラ",
   "in_game": true,
   "fwuk": [
    "Theodora - Queen of Saramis (if her path has not been completed"
   ]
  },
  {
   "id": "Solo_Living_Set_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_セテス",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Peter: ending text Reveal S Seteth"
   ]
  },
  {
   "id": "Solo_Living_Sim_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_シモン",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Simon - Sky Drum"
   ]
  },
  {
   "id": "Solo_Living_Smi_001",
   "kind": "solo",
   "empty": false,
   "pid": null,
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": false
  },
  {
   "id": "Solo_Living_Sop_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ソフィア",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Sofia - Grumbling Tummy"
   ]
  },
  {
   "id": "Solo_Living_Tah_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_タホウニア",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Sofia: ending text Reveal T Tahonia"
   ]
  },
  {
   "id": "Solo_Living_Tah_002",
   "kind": "solo",
   "empty": true,
   "pid": "PID_タホウニア",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": false
  },
  {
   "id": "Solo_Living_Tal_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_タリムーン",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); sin la marca «participación limitada» de Talimun (限定参戦)",
   "flag": "限定参戦_タリムーン",
   "in_game": true
  },
  {
   "id": "Solo_Living_Tal_002",
   "kind": "solo",
   "empty": false,
   "pid": "PID_タリムーン",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja); con la marca «participación limitada» de Talimun (限定参戦)",
   "flag": "限定参戦_タリムーン",
   "in_game": true,
   "fwuk": [
    "Talimun - Heir to the Swashbuckler King"
   ]
  },
  {
   "id": "Solo_Living_Tia_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ティアラ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Tialla - Great August's Successor"
   ]
  },
  {
   "id": "Solo_Living_Tob_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_トビヤス",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Tobias - Apex of Bravery"
   ]
  },
  {
   "id": "Solo_Living_Tro_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_トロイア",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Troy - First Mediator"
   ]
  },
  {
   "id": "Solo_Living_Urs_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ウーシュラ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Ursula - Talimun's Right Hand"
   ]
  },
  {
   "id": "Solo_Living_Ven_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ベンディッツ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Benditz - Old Man with Big Dreams"
   ]
  },
  {
   "id": "Solo_Living_Yan_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ヨーカイ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Yang Jie - Recognized Heretic"
   ]
  },
  {
   "id": "Solo_Living_Zac_001",
   "kind": "solo",
   "empty": false,
   "pid": "PID_ザーコネ",
   "variant": "Living",
   "cond": "Final en solitario (sin final en pareja)",
   "in_game": true,
   "fwuk": [
    "Zarcone - Diabolical Bandit"
   ]
  },
  {
   "id": "Solo_XDead_Cmn_001",
   "kind": "solo",
   "empty": false,
   "pid": null,
   "variant": "XDead",
   "cond": "Texto común para cualquier unidad que cae en combate en modo Clásico (con fecha y lugar)",
   "in_game": true
  },
  {
   "id": "Solo_XDead_Cmn_002",
   "kind": "solo",
   "empty": true,
   "pid": null,
   "variant": "XDead",
   "cond": "Texto común para cualquier unidad que cae en combate en modo Clásico (con fecha y lugar)",
   "in_game": false
  }
 ],
 "endings_cmp": {
  "fwuk_counts": {
   "paired": 97,
   "solo": 88,
   "stated": "97 en pareja / 88 en solitario"
  },
  "game_counts": {
   "pair_bin": 102,
   "pair_msbt": 137,
   "pair_msbt_not_in_bin": 35,
   "solo_living": 89,
   "solo_living_chars": 69,
   "solo_death": 49,
   "empty": 11
  },
  "in_game_not_fwuk": [
   "Bon-Seo",
   "Fia-Lou",
   "Fia-Lys",
   "Hal-Sar",
   "Naz-Sar"
  ],
  "fwuk_not_in_game_list": [],
  "fwuk_names_unmatched": []
 },
 "ending_order": [
  "PID_クラプカ",
  "PID_タホウニア",
  "PID_アスワン",
  "PID_セントリオン",
  "PID_キリーク",
  "PID_ネイサン",
  "PID_キロイカ",
  "PID_ヌッツォ",
  "PID_イニオニ",
  "PID_アレキサンドラ",
  "PID_ジャスミン",
  "PID_ベンディッツ",
  "PID_ザーコネ",
  "PID_マジーデ",
  "PID_ヌディーヌ",
  "PID_ノクチュラ",
  "PID_イオ",
  "PID_ペペ",
  "PID_カターニャ",
  "PID_ソフィア",
  "PID_ヨーカイ",
  "PID_グザラン",
  "PID_ハルヴィン",
  "PID_ダイトウ",
  "PID_ナジャ",
  "PID_サラン",
  "PID_ニネ",
  "PID_セテス",
  "PID_ロレッタ",
  "PID_ディエゴ",
  "PID_フィアナ",
  "PID_ルルディヤー",
  "PID_シモン",
  "PID_ウーシュラ",
  "PID_ダンテ",
  "PID_ゴライアス",
  "PID_マクシム",
  "PID_ゲイツ",
  "PID_オリンピア",
  "PID_ムウ",
  "PID_シロッコ",
  "PID_バッカニア",
  "PID_ライサンダー",
  "PID_リリアン",
  "PID_トビヤス",
  "PID_ボナパルテ",
  "PID_ミカエラ",
  "PID_エスメラルダ",
  "PID_ファビオ",
  "PID_ウルタンド",
  "PID_ピーテル",
  "PID_ティアラ",
  "PID_トロイア",
  "PID_コウカ",
  "PID_アナトリア",
  "PID_オルヘル",
  "PID_タリムーン",
  "PID_ベルトラン",
  "PID_レダ",
  "PID_セオドラ",
  "PID_ディートリヒ",
  "PID_カイ",
  "PID_イシュマール"
 ],
 "rules": [
  {
   "t": "Los niveles de apoyo van de 1 a 5 y se comparten entre rutas; nunca bajan.",
   "o": ""
  },
  {
   "t": "Conversación C con nivel 2, B con 3, A con 4; la S (solo con Eshmel) con nivel 5."
  },
  {
   "t": "Cada conversación tiene una ventana de partes (y a veces de capítulos y ruta). Si su última parte es la 1, se pierde al terminar la Parte 1 («bloqueada en Parte 1»).",
   "o": "datos (Reliance//)"
  },
  {
   "t": "Si te saltas la C dentro de su ventana, la B y la A de esa pareja ya no salen; solo se arregla rejugando el capítulo desde la Sala de los obeliscos.",
   "o": "web:IGN vía"
  },
  {
   "t": "Ver una conversación suma puntos de apoyo a la pareja (支援加算値 = 50; 0 en las de Eshmel).",
   "o": "datos (Reliance; efecto exacto sin medir)"
  },
  {
   "t": "Los bonos de pareja se activan desde el nivel 2 con la pareja adyacente y no crecen; los de clase crecen del nivel 2 al 5.",
   "o": "datos ( sin niveles; Job por nivel) + web:Faerghast y otros, hoja «Fire Emblem: Fortune's Weave Support Bonuses» (Google Sheets 1rqy2jDs_48jSQnO936srgHRvwwDQG0Br93Q7f7iPeb0)"
  }
 ]
};
