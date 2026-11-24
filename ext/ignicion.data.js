window.WIKI_EXT=window.WIKI_EXT||{};WIKI_EXT["ignicion"]={
 "tipos": {
  "Hell": {
   "es": "Inframundo",
   "ayuda": "Usar tesoros malditos en combate rellena el medidor de ignición. Entrar en ráfaga limita los PV máx."
  },
  "Machine": {
   "es": "Autómata",
   "ayuda": "Usar tesoros malditos en combate no tiene ningún efecto en el medidor de ignición."
  },
  "Heaven": {
   "es": "Pozo celestial",
   "ayuda": "Atacar rellena el medidor de ignición, aunque usar tesoros malditos en combate lo reduce."
  }
 },
 "senores": [
  {
   "pid": "PID_カイ",
   "es": "Cai",
   "tipo": "Hell",
   "tipo_es": "Inframundo",
   "habilidades": [
    "SID_ブレイズ可能_カイ"
   ],
   "tecnicas": [
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_冥炎弾",
       "es": "Bala del inframundo",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": "SID_冥炎弾（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_冥炎弾（バースト）",
       "es": "Bala del inframundo",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 10,
     "cadena": [
      {
       "sid": "SID_冥炎波",
       "es": "Obús del inframundo",
       "hp_consumo": 30,
       "contaminacion": 3,
       "usos": null,
       "rafaga": "SID_冥炎波（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_冥炎波（バースト）",
       "es": "Obús del inframundo",
       "hp_consumo": 30,
       "contaminacion": 3,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 25,
     "cadena": [
      {
       "sid": "SID_冥炎星",
       "es": "Cañón del inframundo",
       "hp_consumo": 30,
       "contaminacion": 4,
       "usos": 1,
       "rafaga": null,
       "umbral": null
      }
     ]
    }
   ]
  },
  {
   "pid": "PID_ディートリヒ",
   "es": "Dietrich",
   "tipo": "Hell",
   "tipo_es": "Inframundo",
   "habilidades": [
    "SID_ブレイズ可能_ディートリヒ"
   ],
   "tecnicas": [
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_影刃",
       "es": "Paso sombrío",
       "hp_consumo": 15,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_影刃（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_影刃（バースト）",
       "es": "Paso sombrío",
       "hp_consumo": 15,
       "contaminacion": 6,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 20,
     "cadena": [
      {
       "sid": "SID_影縛",
       "es": "Opresión sombría",
       "hp_consumo": 20,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_影縛（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_影縛（バースト）",
       "es": "Opresión sombría",
       "hp_consumo": 20,
       "contaminacion": 6,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 35,
     "cadena": [
      {
       "sid": "SID_影滅",
       "es": "Final sombrío",
       "hp_consumo": 50,
       "contaminacion": 6,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    }
   ]
  },
  {
   "pid": "PID_セオドラ",
   "es": "Theodora",
   "tipo": "Hell",
   "tipo_es": "Inframundo",
   "habilidades": [
    "SID_ブレイズ可能_セオドラ"
   ],
   "tecnicas": [
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_轟土",
       "es": "Proyectil telúrico",
       "hp_consumo": 10,
       "contaminacion": 2,
       "usos": null,
       "rafaga": "SID_轟土（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_轟土（バースト）",
       "es": "Proyectil telúrico",
       "hp_consumo": 10,
       "contaminacion": 2,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 20,
     "cadena": [
      {
       "sid": "SID_大轟土",
       "es": "Cañón telúrico",
       "hp_consumo": 20,
       "contaminacion": 3,
       "usos": null,
       "rafaga": "SID_大轟土（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_大轟土（バースト）",
       "es": "Cañón telúrico",
       "hp_consumo": 20,
       "contaminacion": 3,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 35,
     "cadena": [
      {
       "sid": "SID_彗星煌弾",
       "es": "Cometa rutilante",
       "hp_consumo": 30,
       "contaminacion": 4,
       "usos": 1,
       "rafaga": null,
       "umbral": null
      }
     ]
    }
   ]
  },
  {
   "pid": "PID_レダ",
   "es": "Leda",
   "tipo": "Hell",
   "tipo_es": "Inframundo",
   "habilidades": [
    "SID_ブレイズ可能_レダ"
   ],
   "tecnicas": [
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_熱狂の歌",
       "es": "Canto de fervor",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": "SID_熱狂の歌（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_熱狂の歌（バースト）",
       "es": "Canto de fervor",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_冷狂の歌",
       "es": "Canto de frescor",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": "SID_冷狂の歌（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_冷狂の歌（バースト）",
       "es": "Canto de frescor",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 10,
     "cadena": [
      {
       "sid": "SID_滅冥の歌",
       "es": "Canto de pureza",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": "SID_滅冥の歌（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_滅冥の歌（バースト）",
       "es": "Canto de pureza",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_怨嗟の歌",
       "es": "Canto de llamada",
       "hp_consumo": 30,
       "contaminacion": 4,
       "usos": 1,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_熱狂の歌＋",
       "es": "Canto de fervor+",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": "SID_熱狂の歌＋（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_熱狂の歌＋（バースト）",
       "es": "Canto de fervor+",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_熱狂の歌＋＋",
       "es": "Canto de fervor++",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": "SID_熱狂の歌＋＋（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_熱狂の歌＋＋（バースト）",
       "es": "Canto de fervor++",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_冷狂の歌＋",
       "es": "Canto de frescor+",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": "SID_冷狂の歌＋（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_冷狂の歌＋（バースト）",
       "es": "Canto de frescor+",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_冷狂の歌＋＋",
       "es": "Canto de frescor++",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": "SID_冷狂の歌＋＋（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_冷狂の歌＋＋（バースト）",
       "es": "Canto de frescor++",
       "hp_consumo": 20,
       "contaminacion": 2,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_狂騒の歌",
       "es": "Canto de locura",
       "hp_consumo": 30,
       "contaminacion": 3,
       "usos": 1,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_女神の舞",
       "es": "Canto de ángeles",
       "hp_consumo": 20,
       "contaminacion": 4,
       "usos": 1,
       "rafaga": null,
       "umbral": null
      }
     ]
    }
   ]
  },
  {
   "pid": "PID_ベルトラン",
   "es": "Bertrand",
   "tipo": "Hell",
   "tipo_es": "Inframundo",
   "habilidades": [
    "SID_ブレイズ可能_ベルトラン"
   ],
   "tecnicas": [
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_覇ノ覚醒",
       "es": "Despertar del rey",
       "hp_consumo": 10,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_覇ノ覚醒（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_覇ノ覚醒（バースト）",
       "es": "Despertar del rey",
       "hp_consumo": 10,
       "contaminacion": 1,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_閃ノ覚醒",
       "es": "Despertar luminoso",
       "hp_consumo": 10,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_閃ノ覚醒（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_閃ノ覚醒（バースト）",
       "es": "Despertar luminoso",
       "hp_consumo": 10,
       "contaminacion": 1,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_理ノ覚醒",
       "es": "Despertar de la razón",
       "hp_consumo": 10,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_理ノ覚醒（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_理ノ覚醒（バースト）",
       "es": "Despertar de la razón",
       "hp_consumo": 10,
       "contaminacion": 1,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 20,
     "cadena": [
      {
       "sid": "SID_嵐ノ覚醒",
       "es": "Despertar fulminante",
       "hp_consumo": 10,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_嵐ノ覚醒（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_嵐ノ覚醒（バースト）",
       "es": "Despertar fulminante",
       "hp_consumo": 10,
       "contaminacion": 1,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    }
   ]
  },
  {
   "pid": "PID_タリムーン",
   "es": "Talimun",
   "tipo": "Hell",
   "tipo_es": "Inframundo",
   "habilidades": [
    "SID_ブレイズ可能_タリムーン"
   ],
   "tecnicas": [
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_虚脱の冥呪",
       "es": "Mal entumecedor",
       "hp_consumo": 25,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_虚脱の冥呪（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_虚脱の冥呪（バースト）",
       "es": "Mal entumecedor",
       "hp_consumo": 40,
       "contaminacion": 6,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_鈍化の冥呪",
       "es": "Mal ralentizador",
       "hp_consumo": 40,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_鈍化の冥呪（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_鈍化の冥呪（バースト）",
       "es": "Mal ralentizador",
       "hp_consumo": 60,
       "contaminacion": 6,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 5,
     "cadena": [
      {
       "sid": "SID_凶運の冥呪",
       "es": "Mal aciago",
       "hp_consumo": 20,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_凶運の冥呪（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_凶運の冥呪（バースト）",
       "es": "Mal aciago",
       "hp_consumo": 30,
       "contaminacion": 6,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 35,
     "cadena": [
      {
       "sid": "SID_攻転の冥呪",
       "es": "Mal ofensivo",
       "hp_consumo": 30,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_攻転の冥呪（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_攻転の冥呪（バースト）",
       "es": "Mal ofensivo",
       "hp_consumo": 50,
       "contaminacion": 6,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 35,
     "cadena": [
      {
       "sid": "SID_防転の冥呪",
       "es": "Mal defensivo",
       "hp_consumo": 30,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_防転の冥呪（バースト）",
       "umbral": null
      },
      {
       "sid": "SID_防転の冥呪（バースト）",
       "es": "Mal defensivo",
       "hp_consumo": 50,
       "contaminacion": 6,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    }
   ]
  },
  {
   "pid": "PID_オルヘル",
   "es": "Orchel",
   "tipo": "Machine",
   "tipo_es": "Autómata",
   "habilidades": [
    "SID_行動汚染無効",
    "SID_ブレイズ切替",
    "SID_バースト無効",
    "SID_ブレイズ可能_オルヘル"
   ],
   "tecnicas": []
  },
  {
   "pid": "PID_アナトリア",
   "es": "Anatolia",
   "tipo": "Heaven",
   "tipo_es": "Pozo celestial",
   "habilidades": [
    "SID_天門値",
    "SID_バースト加算無効",
    "SID_天門",
    "SID_行動汚染反転",
    "SID_ブレイズ可能_アナトリア"
   ],
   "tecnicas": [
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_龍波０",
       "es": "Ondalada I",
       "hp_consumo": 5,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_煌龍波0",
       "umbral": 6
      },
      {
       "sid": "SID_煌龍波0",
       "es": "Ondalada brillante",
       "hp_consumo": 20,
       "contaminacion": 6,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_龍波１",
       "es": "Ondalada I",
       "hp_consumo": 5,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_龍波２",
       "umbral": 3
      },
      {
       "sid": "SID_龍波２",
       "es": "Ondalada II",
       "hp_consumo": 10,
       "contaminacion": 2,
       "usos": null,
       "rafaga": "SID_龍波３",
       "umbral": 6
      },
      {
       "sid": "SID_龍波３",
       "es": "Ondalada III",
       "hp_consumo": 15,
       "contaminacion": 6,
       "usos": null,
       "rafaga": "SID_煌龍波",
       "umbral": 9
      },
      {
       "sid": "SID_煌龍波",
       "es": "Ondalada brillante",
       "hp_consumo": 20,
       "contaminacion": 6,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_龍波１（七星回旋）",
       "es": "Ondalada I",
       "hp_consumo": 5,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_龍波２（七星回旋）",
       "umbral": 3
      },
      {
       "sid": "SID_龍波２（七星回旋）",
       "es": "Ondalada II",
       "hp_consumo": 10,
       "contaminacion": 2,
       "usos": null,
       "rafaga": "SID_龍波３（七星回旋）",
       "umbral": 6
      },
      {
       "sid": "SID_龍波３（七星回旋）",
       "es": "Ondalada III",
       "hp_consumo": 15,
       "contaminacion": 6,
       "usos": null,
       "rafaga": "SID_煌龍波（七星回旋）",
       "umbral": 9
      },
      {
       "sid": "SID_煌龍波（七星回旋）",
       "es": "Ondalada brillante",
       "hp_consumo": 20,
       "contaminacion": 6,
       "usos": null,
       "rafaga": "SID_波動廻龍勁（七星回旋）",
       "umbral": 11
      },
      {
       "sid": "SID_波動廻龍勁（七星回旋）",
       "es": "Ondalada giratoria",
       "hp_consumo": 30,
       "contaminacion": 6,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 0,
     "cadena": [
      {
       "sid": "SID_龍波１（七星遁甲）",
       "es": "Ondalada I",
       "hp_consumo": 5,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_龍波２（七星遁甲）",
       "umbral": 1
      },
      {
       "sid": "SID_龍波２（七星遁甲）",
       "es": "Ondalada II",
       "hp_consumo": 10,
       "contaminacion": 2,
       "usos": null,
       "rafaga": "SID_龍波３（七星遁甲）",
       "umbral": 3
      },
      {
       "sid": "SID_龍波３（七星遁甲）",
       "es": "Ondalada III",
       "hp_consumo": 15,
       "contaminacion": 3,
       "usos": null,
       "rafaga": "SID_煌龍波（七星遁甲）",
       "umbral": 6
      },
      {
       "sid": "SID_煌龍波（七星遁甲）",
       "es": "Ondalada brillante",
       "hp_consumo": 20,
       "contaminacion": 6,
       "usos": null,
       "rafaga": "SID_波動廻龍勁（七星遁甲）",
       "umbral": 9
      },
      {
       "sid": "SID_波動廻龍勁（七星遁甲）",
       "es": "Ondalada giratoria",
       "hp_consumo": 30,
       "contaminacion": 6,
       "usos": null,
       "rafaga": "SID_七星天龍勁（七星遁甲）",
       "umbral": 11
      },
      {
       "sid": "SID_七星天龍勁（七星遁甲）",
       "es": "Ondalada 7 estrellas",
       "hp_consumo": 50,
       "contaminacion": 6,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    }
   ]
  },
  {
   "pid": "PID_イシュマール",
   "es": "Eshmel",
   "tipo": "Heaven",
   "tipo_es": "Pozo celestial",
   "habilidades": [
    "SID_天門値",
    "SID_バースト加算無効",
    "SID_天門",
    "SID_行動汚染反転",
    "SID_ブレイズ可能_イシュマール"
   ],
   "tecnicas": [
    {
     "nivel": 1,
     "cadena": [
      {
       "sid": "SID_白鴉烈光槍０",
       "es": "Rayo divino",
       "hp_consumo": 20,
       "contaminacion": 1,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    },
    {
     "nivel": 1,
     "cadena": [
      {
       "sid": "SID_白鴉烈光槍１",
       "es": "Rayo divino",
       "hp_consumo": 20,
       "contaminacion": 1,
       "usos": null,
       "rafaga": "SID_白鴉烈光槍２",
       "umbral": 3
      },
      {
       "sid": "SID_白鴉烈光槍２",
       "es": "Rayo divino+",
       "hp_consumo": 30,
       "contaminacion": 2,
       "usos": null,
       "rafaga": "SID_白鴉烈光槍３",
       "umbral": 6
      },
      {
       "sid": "SID_白鴉烈光槍３",
       "es": "Séptimo cielo",
       "hp_consumo": 40,
       "contaminacion": 6,
       "usos": null,
       "rafaga": "SID_白鴉烈光槍４",
       "umbral": 9
      },
      {
       "sid": "SID_白鴉烈光槍４",
       "es": "Séptimo cielo+",
       "hp_consumo": 50,
       "contaminacion": 6,
       "usos": null,
       "rafaga": "SID_白鴉烈光槍５",
       "umbral": 11
      },
      {
       "sid": "SID_白鴉烈光槍５",
       "es": "Ruina celestial",
       "hp_consumo": 60,
       "contaminacion": 6,
       "usos": null,
       "rafaga": null,
       "umbral": null
      }
     ]
    }
   ]
  }
 ],
 "rafaga": {
  "reduccion_por_rafaga": 30,
  "max_rafagas": 3,
  "pv_max_tras_rafaga": [
   70,
   40,
   10
  ]
 },
 "malditos": [
  {
   "iid": "IID_邪剣エンジュラ",
   "es": "Ángela",
   "en": "Angela",
   "contaminacion": 2
  },
  {
   "iid": "IID_闇剣エンジュラ",
   "es": "Ángela Oscura",
   "en": "Dark Angela",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪剣ヴェロキネ",
   "es": "Veroquine",
   "en": "Veroquine",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪剣フラガラッハ",
   "es": "Fragarach",
   "en": "Fragarach",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪剣フラガラッハ_SC13_07",
   "es": "Fragarach",
   "en": "Fragarach",
   "contaminacion": 1
  },
  {
   "iid": "IID_闇剣フラガラッハ",
   "es": "Fragarach Oscura",
   "en": "Dark Fragarach",
   "contaminacion": 1
  },
  {
   "iid": "IID_羅刹女の徹扇",
   "es": "Abanico de Lakshashi",
   "en": "Lakshashi's Iron Fan",
   "contaminacion": 1
  },
  {
   "iid": "IID_羅刹女の闇徹扇",
   "es": "Abanico Oscuro",
   "en": "Dark Iron Fan",
   "contaminacion": 1
  },
  {
   "iid": "IID_常夜のカタラ",
   "es": "Katara Noche Eterna",
   "en": "Long-Night Katara",
   "contaminacion": 1
  },
  {
   "iid": "IID_常夜のカタラ_SC16_01",
   "es": "Katara Noche Eterna",
   "en": "Long-Night Katara",
   "contaminacion": 1
  },
  {
   "iid": "IID_マーズの闇剣",
   "es": "Espada Sombría",
   "en": "Shadowing Sword",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪剣エンジュラ＋１",
   "es": "Ángela+1",
   "en": "Angela+1",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪剣エンジュラ＋２",
   "es": "Ángela+2",
   "en": "Angela+2",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪剣エンジュラ＋３",
   "es": "Ángela+3",
   "en": "Angela+3",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪剣ヴェロキネ＋１",
   "es": "Veroquine+1",
   "en": "Veroquine+1",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪剣ヴェロキネ＋２",
   "es": "Veroquine+2",
   "en": "Veroquine+2",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪剣ヴェロキネ＋３",
   "es": "Veroquine+3",
   "en": "Veroquine+3",
   "contaminacion": 2
  },
  {
   "iid": "IID_羅刹女の徹扇＋１",
   "es": "Abanico de Lakshashi+1",
   "en": "Lakshashi's Iron Fan+1",
   "contaminacion": 1
  },
  {
   "iid": "IID_羅刹女の徹扇＋２",
   "es": "Abanico de Lakshashi+2",
   "en": "Lakshashi's Iron Fan+2",
   "contaminacion": 1
  },
  {
   "iid": "IID_羅刹女の徹扇＋３",
   "es": "Abanico de Lakshashi+3",
   "en": "Lakshashi's Iron Fan+3",
   "contaminacion": 1
  },
  {
   "iid": "IID_常夜のカタラ＋１",
   "es": "Katara Noche Eterna+1",
   "en": "Long-Night Katara+1",
   "contaminacion": 1
  },
  {
   "iid": "IID_常夜のカタラ＋２",
   "es": "Katara Noche Eterna+2",
   "en": "Long-Night Katara+2",
   "contaminacion": 1
  },
  {
   "iid": "IID_常夜のカタラ＋３",
   "es": "Katara Noche Eterna+3",
   "en": "Long-Night Katara+3",
   "contaminacion": 1
  },
  {
   "iid": "IID_マハマドゥの闇槍",
   "es": "Lanza Mahadu Osc.",
   "en": "Mahadu's Darkspear",
   "contaminacion": 1
  },
  {
   "iid": "IID_マハマドゥの闇槍_戦技なし",
   "es": "Lanza Mahadu Osc.",
   "en": "Mahadu's Darkspear",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪槍ムーエン",
   "es": "Muen",
   "en": "Muen",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪槍ハノーア",
   "es": "Onoa",
   "en": "Onoa",
   "contaminacion": 1
  },
  {
   "iid": "IID_妖槍ヴェンデッタ",
   "es": "Vendetta",
   "en": "Vendetta",
   "contaminacion": 2
  },
  {
   "iid": "IID_闇槍ヴェンデッタ",
   "es": "Vendetta Oscura",
   "en": "Dark Vendetta",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪槍ムーエン＋１",
   "es": "Muen+1",
   "en": "Muen+1",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪槍ムーエン＋２",
   "es": "Muen+2",
   "en": "Muen+2",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪槍ムーエン＋３",
   "es": "Muen+3",
   "en": "Muen+3",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪槍ハノーア＋１",
   "es": "Onoa+1",
   "en": "Onoa+1",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪槍ハノーア＋２",
   "es": "Onoa+2",
   "en": "Onoa+2",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪槍ハノーア＋３",
   "es": "Onoa+3",
   "en": "Onoa+3",
   "contaminacion": 1
  },
  {
   "iid": "IID_妖槍ヴェンデッタ＋１",
   "es": "Vendetta+1",
   "en": "Vendetta+1",
   "contaminacion": 2
  },
  {
   "iid": "IID_妖槍ヴェンデッタ＋２",
   "es": "Vendetta+2",
   "en": "Vendetta+2",
   "contaminacion": 2
  },
  {
   "iid": "IID_妖槍ヴェンデッタ＋３",
   "es": "Vendetta+3",
   "en": "Vendetta+3",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪斧ヴェレルハイト",
   "es": "Velheit",
   "en": "Velheit",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪斧ガンドギャ",
   "es": "Gundogya",
   "en": "Gundogya",
   "contaminacion": 1
  },
  {
   "iid": "IID_赤き斧",
   "es": "Hacha Sangrienta",
   "en": "Bloodaxe",
   "contaminacion": 1
  },
  {
   "iid": "IID_赤き斧_SC13_06",
   "es": "Hacha Sangrienta",
   "en": "Bloodaxe",
   "contaminacion": 1
  },
  {
   "iid": "IID_赤き斧解",
   "es": "Hacha Visceral",
   "en": "Odious Bloodaxe",
   "contaminacion": 1
  },
  {
   "iid": "IID_赤き闇斧",
   "es": "Hacha Sang. Oscura",
   "en": "Dark Bloodaxe",
   "contaminacion": 1
  },
  {
   "iid": "IID_ダグザの闇棍棒",
   "es": "Maza de Dagda Oscura",
   "en": "Dagda's Dark Club",
   "contaminacion": 1
  },
  {
   "iid": "IID_スイランの魔輪虎",
   "es": "Garra de Suiran",
   "en": "Suiran's Whirling Claw",
   "contaminacion": 1
  },
  {
   "iid": "IID_スイランの闇輪虎",
   "es": "Garra de Suiran Oscura",
   "en": "Dark Whirling Claw",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪斧ヴェレルハイト＋１",
   "es": "Velheit+1",
   "en": "Velheit+1",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪斧ヴェレルハイト＋２",
   "es": "Velheit+2",
   "en": "Velheit+2",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪斧ヴェレルハイト＋３",
   "es": "Velheit+3",
   "en": "Velheit+3",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪斧ガンドギャ＋１",
   "es": "Gundogya+1",
   "en": "Gundogya+1",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪斧ガンドギャ＋２",
   "es": "Gundogya+2",
   "en": "Gundogya+2",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪斧ガンドギャ＋３",
   "es": "Gundogya+3",
   "en": "Gundogya+3",
   "contaminacion": 1
  },
  {
   "iid": "IID_スイランの魔輪虎＋１",
   "es": "Garra de Suiran+1",
   "en": "Suiran's Whirling Claw+1",
   "contaminacion": 1
  },
  {
   "iid": "IID_スイランの魔輪虎＋２",
   "es": "Garra de Suiran+2",
   "en": "Suiran's Whirling Claw+2",
   "contaminacion": 1
  },
  {
   "iid": "IID_スイランの魔輪虎＋３",
   "es": "Garra de Suiran+3",
   "en": "Suiran's Whirling Claw+3",
   "contaminacion": 1
  },
  {
   "iid": "IID_アガゼの弓",
   "es": "Arco de Azaga",
   "en": "Azaga's Bow",
   "contaminacion": 2
  },
  {
   "iid": "IID_ヘダグの弓",
   "es": "Arco de Hedagg",
   "en": "Hedagg's Bow",
   "contaminacion": 1
  },
  {
   "iid": "IID_ヘダグの闇弓",
   "es": "Arco de Hedagg Oscuro",
   "en": "Hedagg's Dark Bow",
   "contaminacion": 1
  },
  {
   "iid": "IID_ウゴウの弓",
   "es": "Arco de Ugo",
   "en": "Ugo's Bow",
   "contaminacion": 2
  },
  {
   "iid": "IID_ウゴウの弓（SC11_09強）",
   "es": "Arco de Ugo",
   "en": "Ugo's Bow",
   "contaminacion": 1
  },
  {
   "iid": "IID_アガゼの弓＋１",
   "es": "Arco de Azaga+1",
   "en": "Azaga's Bow+1",
   "contaminacion": 2
  },
  {
   "iid": "IID_アガゼの弓＋２",
   "es": "Arco de Azaga+2",
   "en": "Azaga's Bow+2",
   "contaminacion": 2
  },
  {
   "iid": "IID_アガゼの弓＋３",
   "es": "Arco de Azaga+3",
   "en": "Azaga's Bow+3",
   "contaminacion": 2
  },
  {
   "iid": "IID_ヘダグの弓＋１",
   "es": "Arco de Hedagg+1",
   "en": "Hedagg's Bow+1",
   "contaminacion": 1
  },
  {
   "iid": "IID_ヘダグの弓＋２",
   "es": "Arco de Hedagg+2",
   "en": "Hedagg's Bow+2",
   "contaminacion": 1
  },
  {
   "iid": "IID_ヘダグの弓＋３",
   "es": "Arco de Hedagg+3",
   "en": "Hedagg's Bow+3",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪甲ドンデボック",
   "es": "Dondebok",
   "en": "Dondebok",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪甲ドンデボック_SC17_05",
   "es": "Dondebok",
   "en": "Dondebok",
   "contaminacion": 1
  },
  {
   "iid": "IID_闇甲ドンデボック",
   "es": "Dondebok oscuros",
   "en": "Dark Dondebok",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪甲ガゼリア",
   "es": "Zagreia",
   "en": "Zagreia",
   "contaminacion": 2
  },
  {
   "iid": "IID_闇甲ガゼリア",
   "es": "Zagreia Oscuros",
   "en": "Dark Zagreia",
   "contaminacion": 1
  },
  {
   "iid": "IID_大熊の闇鉤爪",
   "es": "Garras de Ursa Oscuras",
   "en": "Dark Claws of Ursa",
   "contaminacion": 1
  },
  {
   "iid": "IID_大熊の右鉤爪",
   "es": "Garra derecha de Ursa",
   "en": "Ursa's Right Claw",
   "contaminacion": 1
  },
  {
   "iid": "IID_邪甲ドンデボック＋１",
   "es": "Dondebok+1",
   "en": "Dondebok+1",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪甲ドンデボック＋２",
   "es": "Dondebok+2",
   "en": "Dondebok+2",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪甲ドンデボック＋３",
   "es": "Dondebok+3",
   "en": "Dondebok+3",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪甲ガゼリア＋１",
   "es": "Zagreia+1",
   "en": "Zagreia+1",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪甲ガゼリア＋２",
   "es": "Zagreia+2",
   "en": "Zagreia+2",
   "contaminacion": 2
  },
  {
   "iid": "IID_邪甲ガゼリア＋３",
   "es": "Zagreia+3",
   "en": "Zagreia+3",
   "contaminacion": 2
  },
  {
   "iid": "IID_苦悶の盾",
   "es": "Escudo de Tormento",
   "en": "Anguishing Shield",
   "contaminacion": 1
  },
  {
   "iid": "IID_口寄せの枝",
   "es": "Vara Invocadora",
   "en": "Beckoning Branch",
   "contaminacion": 1
  },
  {
   "iid": "IID_妖糸グレイプニル",
   "es": "Gleipnir",
   "en": "Gleipnir",
   "contaminacion": 1
  },
  {
   "iid": "IID_闇糸グレイプニル",
   "es": "Gleipnir Oscuro",
   "en": "Dark Gleipnir",
   "contaminacion": 1
  },
  {
   "iid": "IID_天弦・月白",
   "es": "Selenita",
   "en": "Moonstone",
   "contaminacion": 1
  },
  {
   "iid": "IID_闇弦・月白",
   "es": "Selenita Oscura",
   "en": "Dark Moonstone",
   "contaminacion": 1
  },
  {
   "iid": "IID_闇弦・黒曜[コーエン]",
   "es": "Obsidiana Oscura",
   "en": "Dark Obsidian",
   "contaminacion": 1
  },
  {
   "iid": "IID_至福なる舌",
   "es": "Lengua Venturosa",
   "en": "Lashing Rapture",
   "contaminacion": 1
  },
  {
   "iid": "IID_魔毒の骨鎖",
   "es": "Raquis Tóxico",
   "en": "Poisonbone Chain",
   "contaminacion": 1
  },
  {
   "iid": "IID_ガランの闇腕輪",
   "es": "Pulsera de Garan",
   "en": "Garan's Bangle",
   "contaminacion": 1
  },
  {
   "iid": "IID_怨杖アーロン",
   "es": "Vara de Aaron",
   "en": "Aaron's Rod",
   "contaminacion": 1
  },
  {
   "iid": "IID_ブラギの絵筆",
   "es": "Pincel de Bragi",
   "en": "Bragi's Brush",
   "contaminacion": 1
  },
  {
   "iid": "IID_ブラギの闇絵筆",
   "es": "Pincel Bragi Oscuro",
   "en": "Bragi's Dark Brush",
   "contaminacion": 1
  },
  {
   "iid": "IID_波乱の宝珠",
   "es": "Máscara demencial",
   "en": "Turmoil Mask",
   "contaminacion": 1
  },
  {
   "iid": "IID_鬼面の髑髏",
   "es": "Máscara Demoniaca",
   "en": "Ogreskull Mask",
   "contaminacion": 1
  },
  {
   "iid": "IID_鬼面の闇髑髏",
   "es": "Máscara D. Oscura",
   "en": "Dark Ogreskull Mask",
   "contaminacion": 1
  }
 ]
};
