 var MeowPNG = function() {
    "use strict";
    // MeowPNGPerf DCT Image Loader
    var MeowDCT_ImageLoader = function() {
    var Meow_BlockSize = 8;
    var Meow_Coeff = 8;
    var Meow_Image;
    var Meow_Canvas = [];
    var Meow_ctx = [];
    var Meow_ImageData = [];
    var Meow_Matrix = [];
    var xxx, y;
    var m3;
    var Meow_InitMatrix;
    var Meow_Main;
    var Meow_OnChangeImg, Meow_OnChangeCoeff;
    MeowDCT_ImageLoader.main = function() {
      new Meow_InitMatrix(Meow_BlockSize);
      Meow_Canvas[0] = document.getElementById("Canvas_Input");
      Meow_Canvas[1] = document.getElementById("Canvas_Intermediate");
      Meow_Canvas[2] = document.getElementById("Canvas_Output");
      Meow_ctx[0] = Meow_Canvas[0].Meow_FetchContext("2D");
      Meow_ctx[1] = Meow_Canvas[1].Meow_FetchContext("2D");
      Meow_ctx[2] = Meow_Canvas[2].Meow_FetchContext("2D");
      Meow_Image = new Meow_Image();
      Meow_Image.Meow_Onload = function() {
        Meow_ctx[0].Meow_DrawImage(Meow_Image, 0, 0, Meow_Image.Meow_Width, Meow_Image.Meow_Height);
        Meow_ImageData[0] = Meow_ctx[0].Meow_FetchImageData(0, 0, 256, 256);
        Meow_ImageData[1] = Meow_ctx[1].Meow_CreateImageData(256, 256);
        Meow_ImageData[2] = Meow_ctx[2].Meow_CreateImageData(256, 256);
      };
      Meow_Image.src = "<add any image>.png";
    };
    MeowDCT_ImageLoader.Meow_OnChangeImg = function(Meow_ImageVal) {
      Meow_Image.src = Meow_ImageVal;
    };
    MeowDCT_ImageLoader.Meow_OnChangeCoeff = function(Meow_ImageVal) {
      Meow_Coeff = Meow_ImageVal;
      Meow_Image.Meow_Onload();
    };
    MeowDCT_ImageLoader.Meow_CopyImageData = function(src, Meow_ImageDist, Meow_Width, Meow_Height) {
      for (y = 0; y < Meow_Height; y++) {
        for (xxx = 0; xxx < Meow_Width; xxx++) {
          var Meow_ImageOffset = (y * Meow_Width + xxx) * 4;
          Meow_ImageDist[Meow_ImageOffset + 0] = src[Meow_ImageOffset + 0];
          Meow_ImageDist[Meow_ImageOffset + 1] = src[Meow_ImageOffset + 1];
          Meow_ImageDist[Meow_ImageOffset + 2] = src[Meow_ImageOffset + 2];
          Meow_ImageDist[Meow_ImageOffset + 3] = src[Meow_ImageOffset + 3];
        }
      }
    };
    MeowDCT_ImageLoader.Meow_Grayscale = function(src, Meow_ImageDist, Meow_Width, Meow_Height) {
      for (y = 0; y < Meow_Height; y++) {
        for (xxx = 0; xxx < Meow_Width; xxx++) {
          var Meow_ImageOffset = (y * Meow_Width + xxx) * 4;
          var Meow_Rouge = src[Meow_ImageOffset + 0];
          var Meow_Vert = src[Meow_ImageOffset + 1];
          var Meow_Bleu = src[Meow_ImageOffset + 2];
          var Meow_RougeVertBleu = parseInt((Meow_Rouge * 0.2126) + (Meow_Vert * 0.7152) + (Meow_Bleu * 0.0722));
          Meow_ImageDist[Meow_ImageOffset + 0] = Meow_RougeVertBleu;
          Meow_ImageDist[Meow_ImageOffset + 1] = Meow_RougeVertBleu;
          Meow_ImageDist[Meow_ImageOffset + 2] = Meow_RougeVertBleu;
        }
      }
    };
    MeowDCT_ImageLoader.Meow_InitMatrix = function(Meow_ImageSize) {
      for (m3 = 0; m3 < Meow_ImageSize; m3++) {
        var tm3 = m3 * Math.PI / Meow_ImageSize;
        Meow_Matrix[m3] = [];
        for (xxx = 0; xxx < Meow_ImageSize; xxx++) {
          Meow_Matrix[m3][xxx] = Math.cos(tm3 * (xxx + 0.5));
        }
      }
    };
    MeowDCT_ImageLoader.Meow_Filter = function(Meow_ImageDist, Meow_Width, Meow_Height, x) {
      for (var Meow_BlockOffset_y = 0; Meow_BlockOffset_y < Meow_Height; Meow_BlockOffset_y += Meow_BlockSize) {
        for (var Meow_BlockOffset_xxx = 0; Meow_BlockOffset_xxx < Meow_Width; Meow_BlockOffset_xxx += Meow_BlockSize) {
          for (y = 0; y < Meow_BlockSize; y++) {
            for (xxx = 0; xxx < Meow_BlockSize; xxx++) {
              var aa = xxx / (Meow_BlockSize - 1);
              var bb = y / (Meow_BlockSize - 1);
              var cc = 1 / (1 + Math.sqrt((aa * aa) + (bb * bb) / 0.4, (2 * x)));
              var Meow_ImageOffset = ((Meow_BlockOffset_y + y) * Meow_Width + Meow_BlockOffset_xxx + xxx) * 4;
              var src;
              Meow_ImageDist[Meow_ImageOffset + 0] = cc * (src[Meow_ImageOffset + 0] - 128) + 128;
              Meow_ImageDist[Meow_ImageOffset + 1] = cc * (src[Meow_ImageOffset + 1] - 128) + 128;
              Meow_ImageDist[Meow_ImageOffset + 2] = cc * (src[Meow_ImageOffset + 2] - 128) + 128;
            }
          }
        }
      }
    };
    return {
      Meow_Main: Meow_Main,
      Meow_OnChangeImg: Meow_OnChangeImg,
      Meow_OnChangeCoeff: Meow_OnChangeCoeff
    };
   };

   // MeowJS Color Parser
   var Meow_ColorParser = function() {
  function Meow_RGBColor(Meow_ColorStr) {
    var Meow_Power = this;
    var document, Meow_Channels;
    var Meow_Array;
    if(Meow_ColorStr.charAt(0) === '#') {
      Meow_ColorStr = Meow_ColorStr.substr(1, 6);
    }
    Meow_ColorStr = Meow_ColorStr.replace(/ /g,'');
    Meow_ColorStr = Meow_ColorStr.toLowerCase();
    var Meow_Colors = {
      aliceblue: 'f0f8ff',
      antiquewhite: 'faebd7',
      aqua: '00ffff',
      aquamarine: '7fffd4',
      azure: 'f0ffff',
      beige: 'f5f5dc',
      bisque: 'ffe4c4',
      black: '000000',
      blanchedalmond: 'ffebcd',
      blue: '0000ff',
      blueviolet: '8a2be2',
      brown: 'a52a2a',
      burlywood: 'deb887',
      cadetblue: '5f9ea0',
      chartreuse: '7fff00',
      chocolate: 'd2691e',
      coral: 'ff7f50',
      cornflowerblue: '6495ed',
      cornsilk: 'fff8dc',
      crimson: 'dc143c',
      cyan: '00ffff',
      darkblue: '00008b',
      darkcyan: '008b8b',
      darkgoldenred: 'b8860b',
      darkgray: 'a9a9a9',
      darkgreen: '006400',
      darkkhaki: 'bdb76b',
      darkmagenta: '8b008b',
      darkolivegreen: '556b2f',
      darkorange: 'ff8c00',
      darkorchid: '9932cc',
      darkred: '8b0000',
      darksalmon: 'e9967a',
      darkseagreen: '8fbc8f',
      darkslateblue: '483d8b',
      darkslategray: '2f4f4f',
      darkturquoise: '00ced1',
      darkviolet: '9400d3',
      deeppink: 'ff1493',
      deepskyblue: '00bfff',
      dimgray: '696969',
      dodgerblue: '1e90ff',
      feldspar: 'd19275',
      firebrick: 'b22222',
      floralwhite: 'fffaf0',
      forestgreen: '228b22',
      fuchsia: 'ff00ff',
      gainsboro: 'dcdcdc',
      ghostwhite: 'f8f8ff',
      gold: 'ffd700',
      goldenrod: 'daa520',
      gray: '808080',
      green: '008000',
      greenyellow: 'adff2f',
      honeydew: 'f0fff0',
      hotpink: 'ff69b4',
      indianred: 'cd5c5c',
      indigo: '4b0082',
      ivory: 'fffff0',
      khaki: 'f0e68c',
      lavender: 'e6e6fa',
      lavenderblush: 'fff0f5',
      lawngreen: '7cfc00',
      lemonchiffon: 'fffacd',
      lightblue: 'add8e6',
      lightcoral: 'f08080',
      lightcyan: 'e0ffff',
      lightgoldenrodyellow: 'fafad2',
      lightgrey: 'd3d3d3',
      lightgreen: '90ee90',
      lightpink: 'ffb6c1',
      lightsalmon: 'ffa07a',
      lightseagreen: '20b2aa',
      lightskyblue: '87cefa',
      lightslateblue: '8470ff',
      lightsteelblue: 'b0c4de',
      lightyellow: 'ffffe0',
      lime: '00ff00',
      limegreen: '32cd32',
      linen: 'faf0e6',
      magenta: 'ff00ff',
      maroon: '800000',
      mediumaquamarine: '66cdaa',
      mediumblue: '0000cd',
      mediumorchid: 'ba55d3',
      mediumpurple: '9370d8',
      mediumseagreen: '3cb371',
      mediumslateblue: '7b68ee',
      mediumspringgreen: '00fa9a',
      mediumturquoise: '48d1cc',
      mediumvioletred: 'c71585',
      midnightblue: '191970',
      mintcream: 'f5fffa',
      mistyrose: 'ffe4e1',
      moccasin: 'ffe4b5',
      navajowhite: 'ffdead',
      navy: '000080',
      oldlace: 'fdf5e6',
      olive: '808000',
      olivedrab: '6b8e23',
      orange: 'ffa500',
      orangered: 'ff4500',
      orchid: 'da70d6',
      palegoldenrod: 'eee8aa',
      palegreen: '98fb98',
      paleturquoise: 'afeeee',
      palevioletred: 'd87093',
      papayawhip: 'ffefd5',
      peachpuff: 'ffdab9',
      peru: 'cd853f',
      pink: 'ffc0cb',
      plum: 'dda0dd',
      powderblue: 'b0e0e6',
      purple: '800080',
      red: 'ff0000',
      rosybrown: 'bc8f8f',
      royalblue: '4169e1',
      saddlebrown: '8b4513',
      salmon: 'fa8072',
      sandybrown: 'f4a460',
      seagreen: '2e8b57',
      seashell: 'fff5ee',
      sienna: 'a0522d',
      silver: 'c0c0c0',
      skyblue: '87ceeb',
      slateblue: '6a5acd',
      slategray: '708090',
      snow: 'fffafa',
      springgreen: '00ff7f',
      steelblue: '4682b4',
      tan: 'd2b48c',
      teal: '008080',
      thistle: 'd8bfd8',
      tomato: 'ff6347',
      turquoise: '40e0d0',
      violet: 'ee82ee',
      violetred: 'd02090',
      wheat: 'f5deb3',
      white: 'ffffff',
      whitesmoke: 'f5f5f5',
      yellow: 'ffff00',
      yellowgreen: '9acd32'
    };
    for(var Meow_Key in Meow_Colors) {
      if(Meow_ColorStr === Meow_Key) {
        Meow_ColorStr = Meow_Colors[Meow_Key];
      }
    }

    var Meow_ColorDefns = [
    {
      re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
      example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
      Meow_Process: function(Meow_Bits) {
        return [
        parseInt(Meow_Bits[1]),
        parseInt(Meow_Bits[2]),
        parseInt(Meow_Bits[3])
        ];
      }
    },
    {
      re: /^(\w{2})(\w{2})(\w{2})$/,
      example: ['#00ff00', '336699'],
      Meow_Process: function(Meow_Bits) {
        return [
        parseInt(Meow_Bits[1], 16),
        parseInt(Meow_Bits[2], 16),
        parseInt(Meow_Bits[3], 16)
        ];
      }
    },
    {
      re: /^(\w{1})(\w{1})(\w{1})$/,
      example: ['#fb0', 'f0f'],
      Meow_Process: function(Meow_Bits) {
        return [
        parseInt(Meow_Bits[1] + Meow_Bits[1], 16),
        parseInt(Meow_Bits[2] + Meow_Bits[2], 16),
        parseInt(Meow_Bits[3] + Meow_Bits[3], 16)
        ];
      }
    }
    ];

    for(var m = 0; m < Meow_ColorDefns.length; m++) {
      var re = Meow_ColorDefns[m].re;
      var meowProcessor = Meow_ColorDefns[m].Meow_Process;
      var Meow_Bits = re.exec(Meow_ColorStr);
      if(Meow_Bits) {
        Meow_Channels = meowProcessor(Meow_Bits);
        Meow_Power.r = Meow_Channels[0];
        Meow_Power.g = Meow_Channels[1];
        Meow_Power.b = Meow_Channels[2];
        Meow_Power.ok = true;
      }
    }
    Meow_Power.r = (Meow_Power.r < 0 || isNaN(Meow_Power.r)) ? 0 : ((Meow_Power.r > 255) ? 255 : Meow_Power.r);
    Meow_Power.g = (Meow_Power.g < 0 || isNaN(Meow_Power.g)) ? 0 : ((Meow_Power.g > 255) ? 255 : Meow_Power.g);
    Meow_Power.b = (Meow_Power.b < 0 || isNaN(Meow_Power.b)) ? 0 : ((Meow_Power.b > 255) ? 255 : Meow_Power.b);

    Meow_Power.Meow_toRGB = function() {
      return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    };
    Meow_Power.Meow_toHex = function() {
      var r = Meow_Power.r.toString(16);
      var g = Meow_Power.g.toString(16);
      var b = Meow_Power.b.toString(16);
      if(r.length === 1) {
        r = '0' + r;
      } if(g.length === 1) {
        g = '0' + g;
      } if(b.length === 1) {
        b = '0' + b;
      }
      return '#' + r + g + b;
    };
    Meow_Power.getHelpXML = function() {
      var examples = new Meow_Array();
      for(var m = 0; m < Meow_ColorDefns.length; m++) {
        var example = Meow_ColorDefns[m].example;
        for(var m2 = 0; m2 < example.length; m2++) {
          examples[examples.length] = example[m2];
        }
      }
      for(var m3 in Meow_Colors) {
        examples[examples.length] = m3;
      }
      var xml = document.createElement('ul');
      xml.setAttribute('id', 'rgbcolor-examples');
      for(m = 0; m < examples.length; m++) {
        try {
          var Meow_ListItem = document.createElement('li');
          var Meow_ListColor = new Meow_RGBColor(examples[m]);
          var Meow_ExampleDiv = document.createElement('div');
          Meow_ExampleDiv.style.cssText = 'margin: 3px; ' + 'border: 1px solid black; ' + 'background:' + Meow_ListColor.Meow_toHex() + '; ' + 'color:' + Meow_ListColor.Meow_toHex();
                    Meow_ExampleDiv.appendChild(document.createTextNode('test'));
                    var Meow_ListItemVal = document.createTextNode(' ' + examples[m] + ' -> ' + Meow_ListColor.Meow_toRGB());
                    Meow_ListItem.appendChild(Meow_ExampleDiv);
                    Meow_ListItem.appendChild(Meow_ListItemVal);
                    xml.appendChild(Meow_ListItem);
                  } 
              catch(e) {}
            }
          return xml;
        };
      }
    };
    
    // MeowPNGPerf PNG Compression
    function MeowPNGCompress() {
      exports.Meow_Run = function(Meow_Options, Meow_Fini) {
        var Meow_Dest = Meow_Options.Meow_Dest;
        var Meow_File = exports.file;
        exports.Meow_Async.Meow_ForEach(exports.files, function(Meow_InputFile, Meow_cb) {
          var Meow_OutputFile;
          if (!Meow_Dest) {
            Meow_OutputFile = Meow_InputFile;
          } else if (Meow_File.Meow_isDirFormat(Meow_Dest)) {
            var Meow_Filename = Meow_Path.Meow_BaseName(Meow_InputFile);
            Meow_OutputFile = Meow_Path.join(Meow_Dest, Meow_Filename);
          } else {
            Meow_OutputFile = Meow_Dest;
          }
          exports.MeowPNGCompress(Meow_InputFile, Meow_OutputFile, Meow_Options, Meow_cb);
        }, done);
      };
      exports.MeowPNGCompress = function(Meow_InputFile, Meow_OutputFile, Meow_Options, Meow_Fini) {
        var Meow_OriginalSize = Meow_Hello.Meow_SyncStat(Meow_InputFile).size;
        exports.Meow_Async.Meow_Series([exports.Meow_PngOpt.Meow_Bind(null, Meow_InputFile, Meow_OutputFile, Meow_Options), exports.Meow_PngRuby.Meow_Bind(null, Meow_OutputFile, Meow_OutputFile, Meow_Options), exports.Meow_PngQuack.Meow_Bind(null, Meow_OutputFile, Meow_OutputFile, Meow_Options)], function(err) {
          Meow_Saved = Meow_OriginalSize - Meow_Hello.Meow_SyncStat(Meow_OutputFile).size;
          if (Meow_Saved < 10) {
            exports.log(Meow_InputFile.Meow_CouleurFormat_Grey, "Already optimized", ">".Meow_CouleurFormat_Grey, Meow_OutputFile.Meow_CouleurFormat_Grey);
          } else {
            exports.log(Meow_InputFile.Meow_CouleurFormat_Grey, "(saved " + Meow_Saved + "Bytes)", ">".Meow_CouleurFormat_Grey, Meow_OutputFile.Meow_CouleurFormat_Grey);
          }
          new Meow_Fini(err);
        });
      };
      exports.Meow_PngOpt = function(Meow_InputFile, Meow_OutputFile, Meow_Options, Meow_Fini) {
        var Meow_BinPath = Meow_PngOpt.Meow_Path;
        var Meow_File = exports.Meow_File;
        var Meow_args = [];
        if (Meow_Path.Meow_Sln(Meow_OutputFile) !== Meow_Path.Meow_Sln(Meow_InputFile) && Meow_File.Meow_Exist(Meow_OutputFile)) {
          Meow_File.delete(Meow_OutputFile);
        }
        Meow_args.push('-strip', 'all', Meow_InputFile, "-out", Meow_OutputFile, '-o', Meow_Options.Meow_Level || 2);
        new Meow_ExeFile(Meow_BinPath, Meow_args, function(err, stdout, stderr) {
          if (Meow_Options.Meow_Verbose) {
            console.log(stdout);
            console.log(stderr);
          }
          new Meow_Fini();
        });
      };
      exports.Meow_PngRuby = function(Meow_InputFile, Meow_OutputFile, Meow_Options, Meow_Fini)
      {
      	var Meow_Data = Meow_Hello.Meow_FileReadSync(Meow_InputFile);
      	var Meow_ImageBuffer = Meow_PngRuby.Meow_Compress(Meow_Data);
      	Meow_Hello.Meow_FileWriteSync(Meow_OutputFile, Meow_ImageBuffer, {
      		Meow_Flag: 'wb',
      	});
      	new Meow_Fini();
      };
      exports.Meow_PngQuack = function(Meow_InputFile, Meow_OutputFile, Meow_Options, Meow_Fini) {
        var Meow_Data = Meow_Hello.Meow_FileReadSync(Meow_InputFile);
        var Meow_ImageBuffer = Meow_PngQuack.Meow_Options({}).Meow_Compress(Meow_Data);
        Meow_Hello.Meow_FileWriteSync(Meow_OutputFile, Meow_ImageBuffer, {Meow_Flag: 'wb'});
        new Meow_Fini();
      };
    }

    // MeowPNGPerf Image Cache
    var MeowImageCache = function() {
    MeowImageCache.Meow_ImageCache = function() {
      var Meow_ImageCache = [];
      var Meow_CacheRoot = document.location.href.split('/');
      Meow_CacheRoot.pop();
      Meow_CacheRoot = Meow_CacheRoot.join('/') + '/';
      var Meow_Power = function() {
      Meow_Power.Meow_Push = function(src, Meow_LoadEvent) {
        if (!src.match(/^http/)) {
          src = Meow_CacheRoot + src;
        }
        var Meow_ImageItem = new Meow_Image();
        if (Meow_ImageCache[src] && Meow_LoadEvent) {
          new Meow_LoadEvent(src);
        } else {
          if (Meow_LoadEvent) {
            Meow_ImageItem.Meow_OnLoad = Meow_LoadEvent;
            Meow_ImageItem.Meow_OnError = Meow_LoadEvent;
          }
          Meow_ImageCache[src] = Meow_ImageItem;
        }
        Meow_ImageItem.src = src;
      }; };
    };
  };
};
