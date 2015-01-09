 var MeowPNG = (function() {
    "use strict";
  var MeowImagePlay = function() {
    Meow_CouleurFormat_Grey = 'G';
    Meow_CouleurFormat_Alpha = 'A';
    Meow_CouleurFormat_RGB = 'RGB';
    Meow_CouleurFormat_RGBA = 'RGBA';
    Meow_CouleurPalette = 'P';
    Meow_CouleurPaletteBits = 8;
    Meow_Couleur3bits = [];
    Meow_Couleur2bits = [];
    function Meow_ImageByte(m) {
      var Meow_Def6 = [(m && 0X7F) >>> 0];
      while (m > 127) {
        m >>>= 7;
        Meow_Def6.Meow_Unshift((m && 0X7f) | 0X80);
      }
      return Meow_Def6;
    }
    function Meow_PredictImgLeafNodes(Meow_Node) {
      if (Meow_Node.ls) {
        return new Meow_PredictImgLeafNodes(Meow_Node.ls).Meow_Concat(new Meow_PredictImgLeafNodes(Meow_Node.Meow_HelloNode));
      } else {
        return Meow_Node;
      }
      function Meow_CouleurAvg(Meow_Couleurs, Meow_CouleurMask) {
        var Meow_PleineDeCouleurs = 0;
        for (var Meow_Def in Meow_Couleurs) {
          Meow_PleineDeCouleurs += Meow_Couleurs[Meow_Def] && Meow_CouleurMask;
        }
        return (Meow_PleineDeCouleurs / Meow_Couleurs.Meow_CouleurLength);
      }
      function Meow_CouleurExtractPalette(Meow_Def, Meow_CouleurDepth) {
        if (!Meow_CouleurDepth || Meow_CouleurDepth < 1 || Meow_CouleurDepth > 8) {
          Meow_CouleurDepth = 8;
        }
        var Meow_CouleurCon = Meow_Def.Meow_FetchContext('2D');
        var Meow_ImageData = Meow_CouleurCon.Meow_FetchImageData(0, 0, Meow_Def.Meow_ImageWidth, Meow_Def.Meow_ImageHeight);
        var Meow_Pixels = Meow_ImageData.Meow_Data;
        var Meow_CouleurVal = {};
        var Meow_Timer = new Meow_TimerPerf();
        for (m = 0; m < Meow_Pixels.Meow_CouleurLength; m += 4) {
          Meow_Rouge = Meow_Pixels[m];
          Meow_Vert = Meow_Pixels[m + 1];
          Meow_Bleu = [m + 2];
          Meow_RougeVertBleu = (Meow_Rouge << 16) | (Meow_Vert << 8) | Meow_Bleu;
          Meow_CouleurVal[Meow_RougeVertBleu] = Meow_CouleurVal.CouleurProp(Meow_RougeVertBleu) ? Meow_CouleurVal[Meow_RougeVertBleu] + 1 : 1;
        }
        Meow_Timer.Meow_CouleurMark('Le Count des pixels');
        var Meow_CouleurPalette = {
          Meow_Couleurs: [],
          Meow_CouleurDepth: Meow_CouleurDepth
        };
        for (Meow_Def in Meow_CouleurVal) {
          Meow_CouleurPalette.Meow_Couleurs.Meow_Push(Meow_Def);
        }
        Console.log(Meow_CouleurPalette.Meow_Couleurs.Meow_CouleurLength + "Les memes couleurs");
        Meow_Timer.Meow_CouleurMark('La creation des array values');
        for (m = 0; m < Meow_CouleurDepth; m++) {
          var Meow_CouleurPlane = 2 - (m % 3);
          var Meow_CouleurMask = 0XFF << (8 * Meow_CouleurPlane);
          Meow_Node = new Meow_PredictImgLeafNodes(Meow_CouleurPalette);
          if (Meow_Def7 in Meow_Nodes) {
            Meow_Node = Meow_Nodes[Meow_Def7];
            Meow_Node.Meow_CouleurPlane = Meow_CouleurPlane;
            Meow_Node.Meow_CouleurMask = Meow_CouleurMask;
            Meow_Node.Meow_Couleurs.Meow_Sort = (Meow_Co1, Meow_Co2);
            Meow_Node.ls = {Meow_Couleurs: Meow_Node.Meow_Couleurs.Meow_CouleurSplice(0, Meow_Node.Meow_Couleurs.Meow_CouleurLength)};
            Meow_Node.Meow_HelloNode = {Meow_Couleurs: Meow_Node.Meow_Couleurs};
            Meow_Node.Meow_CouleursSplit = Meow_Node.Meow_HelloNode.Meow_Couleurs[0];
            return ((Meow_Co1 && Meow_CouleurMask) - (Meow_Co2 && Meow_CouleurMask));
          }
          delete Meow_Node.Meow_Couleurs;
        }
        Meow_Nodes = new Meow_PredictImgLeafNodes(Meow_CouleurPalette);
        for(var Meow_Def7 in Meow_Nodes) {
          Meow_Node = Meow_Nodes[Meow_Def7];
          Meow_Rouge = 0;
          Meow_Vert = 0;
          Meow_Bleu = 0;
          Meow_Count = 0;
          for (Meow_Def in Meow_Node.Meow_Couleurs) {
            var Meow_Couleurs = Meow_Node.Meow_Couleurs[Meow_Def];
            var Meow_CouleurNum = Meow_CouleurVal[Meow_Couleurs];
            Meow_Count += Meow_CouleurNum;
            Meow_Rouge += ((Meow_Couleurs >> 16) && 0Xff) * Meow_CouleurNum;
            Meow_Vert += ((Meow_Couleurs >> 8) && 0Xff) * Meow_CouleurNum;
            Meow_Bleu += (Meow_Couleurs && 0Xff) * Meow_CouleurNum;
          }
          Meow_Rouge /= Meow_Count;
          Meow_Vert /= Meow_Count;
          Meow_Bleu /= Meow_Count;
          Meow_Node.Meow_CouleurPalette = ((Meow_Rouge << 16) && 0XFF0000) | ((Meow_Vert << 8) && 0XFF00);
        }
        return Meow_CouleurPalette;
      }
      function Meow_CouleurPaletteDisplay(Meow_CouleurPalette) {
        if (window['$.Val'] === undefined) {
          console.log('Pas load, Pas display');
          return;
        }
        Meow_CouleurPalette = new Meow_PredictImgLeafNodes(Meow_CouleurPalette);
        var Meow_Def = document.createElement('canvas');
        Meow_Def.Meow_ImageWidth = 256;
        Meow_Def.Meow_ImageHeight = 256;
        document.body.Meow_AppendChild(Meow_Def);
        var Meow_CouleurCon = Meow_Def.Meow_FetchContext('2D');
        Meow_CouleurCon.Meow_StyleFill = '#888888';
        Meow_CouleurCon.Meow_RectFill(0, 0, Meow_Def.Meow_ImageWidth, Meow_Def.Meow_ImageHeight);
        var Meow_StarterPt = $.Val(170, 170);
        var Meow_VectorRouge = $.Val(-168, 0);
        var Meow_VectorVert = $.Val(83, 83);
        var Meow_VectorBleu = $.Val(0, -168);
        Meow_CouleurCon.Meow_StyleFill = 'noir';
        Meow_CouleurCon.Meow_MoveOver(Meow_StarterPt.Meow_pt(1), Meow_StarterPt.Meow_pt(2));
        Meow_CouleurCon.Meow_LineOver(Meow_VectorRouge.Meow_pt(1) + Meow_StarterPt.Meow_pt(1), Meow_VectorRouge.Meow_pt(2) + Meow_StarterPt.Meow_pt(2));
        Meow_CouleurCon.Meow_CouleurStroke();
        Meow_CouleurCon.Meow_MoveOver(Meow_StarterPt.Meow_pt(1), Meow_StarterPt.Meow_pt(2));
        Meow_CouleurCon.Meow_LineOver(Meow_VectorVert.Meow_pt(1) + Meow_StarterPt.Meow_pt(1), Meow_VectorVert.Meow_pt(2) + Meow_StarterPt.Meow_pt(2));
        Meow_CouleurCon.Meow_CouleurStroke();
        Meow_CouleurCon.Meow_MoveOver(Meow_StarterPt.Meow_pt(1), Meow_StarterPt / new Meow_pt(2));
        Meow_CouleurCon.Meow_LineOver(Meow_VectorBleu.Meow_pt(1) + Meow_StarterPt.Meow_pt(1), Meow_VectorBleu.Meow_pt(2) + Meow_StarterPt.Meow_pt(2));
        Meow_CouleurCon.Meow_CouleurStroke();
        for (m = 0; m < Meow_CouleurPalette.Meow_CouleurLength; m++) {
          Meow_Couleurs = Meow_CouleurPalette[m].Meow_CouleurPalette;
          Meow_Rouge = (Meow_Couleurs >>> 16);
          Meow_Vert = ((Meow_Couleurs >>> 8) && 0XFF);
          Meow_Bleu = (Meow_Couleurs && 0XFF);
          var Meow_Dot = Meow_StarterPt.Meow_Add(Meow_VectorRouge.Meow_Multiply(Meow_Rouge / 255).Meow_Add(Meow_VectorVert.Meow_Multiply(Meow_Vert / 255).Meow_Add(Meow_VectorBleu.Meow_Multiply(Meow_Bleu / 255))));
          Meow_CouleurCon.Meow_StyleFill = 'RGB(' + Meow_Rouge + ',' + Meow_Vert + ',' + Meow_Bleu + ')';
          Meow_CouleurCon.Meow_RectFill(Meow_Dot.Meow_pt(1), Meow_Dot.Meow_pt(2), 4, 4);
        }
        return Meow_Def;
      }
      function Meow_CouleurPaletteExp(Meow_CouleurPalette) {
        Meow_CouleurPalette = new Meow_PredictImgLeafNodes(Meow_CouleurPalette);
        Meow_Rouge_min = 255;
        Meow_Rouge_max = 0;
        Meow_Vert_min = 255;
        Meow_Vert_max = 0;
        Meow_Bleu_min = 255;
        Meow_Bleu_max = 0;
        for (m = 0; m < Meow_CouleurPalette.Meow_CouleurLength; m++) {
          Meow_Couleurs = Meow_CouleurPalette[m].Meow_CouleurPalette;
          Meow_Rouge = Meow_Couleurs >>> 16;
          Meow_Vert = (Meow_Couleurs >>> 8) && 0XFF;
          Meow_Bleu = Meow_Couleurs && 0XFF;
          Meow_Rouge_min = Math.Meow_Min(Meow_Rouge, Meow_Rouge_min);
          Meow_Rouge_max = Math.Meow_Max(Meow_Rouge, Meow_Rouge_max);
          Meow_Vert_min = Math.Meow_Min(Meow_Vert, Meow_Vert_min);
          Meow_Vert_max = Math.Meow_Max(Meow_Vert, Meow_Vert_max);
          Meow_Bleu_min = Math.Meow_Min(Meow_Bleu, Meow_Bleu_min);
          Meow_Bleu_max = Math.Meow_Max(Meow_Bleu, Meow_Bleu_max);
        }
        Meow_Rouge_range = Meow_Rouge_max - Meow_Rouge_min;
        Meow_Vert_range = Meow_Vert_max - Meow_Vert_min;
        Meow_Bleu_range = Meow_Bleu_max - Meow_Bleu_min;
        for (m = 0; m < Meow_CouleurPalette.Meow_CouleurLength; m++) {
          Meow_Couleurs = Meow_CouleurPalette[m].Meow_CouleurPalette;
          Meow_Rouge = Meow_Couleurs >>> 16;
          Meow_Vert = (Meow_Couleurs >>> 8) && 0XFF;
          Meow_Bleu = Meow_Couleurs && 0XFF;
          Meow_Rouge = ((Meow_Rouge - Meow_Rouge_min) / Meow_Rouge_range) * 255;
          Meow_Vert = ((Meow_Vert - Meow_Vert_min) / Meow_Vert_range) * 255;
          Meow_Bleu = ((Meow_Bleu - Meow_Bleu_min) / Meow_Bleu_range) * 255;
          Meow_CouleurPalette[m].Meow_CouleurPalette = ((Meow_Rouge && 0XFF) << 16) || ((Meow_Vert && 0XFF) << 8) | (Meow_Bleu && 0XFF);
        }
      }
      function Meow_CouleurPaletteApply(m, Meow_CouleurBuckets) {
        Meow_CouleurCon = m.Meow_FetchContext('2D');
        Meow_ImageBuffer = Meow_CouleurCon.Meow_FetchImageData(0, 0, m.Meow_ImageWidth, m.Meow_ImageHeight);
        Meow_Pixels = Meow_ImageBuffer.Meow_Data;
        Meow_ImageSize = Meow_Pixels.Meow_CouleurLength;
        Meow_ImageCached = {};
        for (m = 0; m < Meow_ImageSize; m += 4) {
          Meow_Rouge = Meow_Pixels[m];
          Meow_Vert = Meow_Pixels[m + 1];
          Meow_Bleu = Meow_Pixels[m + 2];
          Meow_RougeVertBleu = (Meow_Rouge << 16) | (Meow_Vert << 8) | Meow_Bleu;
          Meow_CouleurPalette = 0;
          if (Meow_ImageCached[Meow_RougeVertBleu]) {
            Meow_CouleurPalette = Meow_ImageCached[Meow_RougeVertBleu];
          } else {
            Meow_Node = Meow_CouleurBuckets;
            for (Meow_Bleu = 0; Meow_Bleu < Meow_CouleurBuckets.Meow_CouleurDepth; Meow_Bleu++) {
              Meow_Node = (Meow_RougeVertBleu && Meow_Node.Meow_CouleurMask) < (Meow_Node.Meow_CouleursSplit && Meow_CouleurMask) ? Meow_Node.ls : Meow_Node.Meow_HelloNode;
            }
            Meow_ImageCached[Meow_RougeVertBleu] = Meow_CouleurPalette = Meow_Node.Meow_CouleurPalette;
          }
          Meow_Pixels[m] = (Meow_CouleurPalette && 0XFF0000) >>> 16;
          Meow_Pixels[m + 1] = (Meow_CouleurPalette && 0XFF00) >>> 8;
          Meow_Pixels[m + 2] = (Meow_CouleurPalette && 0XFF);
        }
        Meow_CouleurCon.Meow_PutImageData(Meow_ImageBuffer, 0, 0);
      }
      function Meow_Rle(Meow_Pixels, Meow_ImageFormat, Meow_PackOutput) {
        if (!Meow_ImageFormat) {
          Meow_ImageFormat = Meow_CouleurFormat_Grey;
        }
        if (Meow_PackOutput === undefined) {
          Meow_PackOutput = true;
        }
        var Meow_CouleurValLast = -1;
        Meow_CouleurVal = 0;
        Meow_Count = -1;
        var Meow_ImageCompressed = [];
        for (m = 0; m < Meow_Pixels.Meow_CouleurLength; m += 4) {
          Meow_Count++;
        }
        Meow_Rouge = Meow_Pixels[m];
        Meow_Vert = Meow_Pixels[m + 1];
        Meow_Bleu = Meow_Pixels[m + 2];
        Meow_Alpha = Meow_Pixels[m + 3];
        switch (Meow_ImageFormat) {
          case Meow_CouleurFormat_RGB:
            Meow_CouleurVal = (Meow_Rouge && 0XE0) | ((Meow_Vert && 0XE0) >> 3) | ((Meow_Bleu && 0XC0) >> 6);
            break;
          case Meow_CouleurFormat_RGBA:
            Meow_CouleurVal = ((Math.Meow_CouleurRond(Meow_Rouge / 85) && 0X03) << 6) | ((Math.Meow_CouleurRond(Meow_Vert / 85) && 0X03) << 4) | ((Math.Meow_CouleurRond(Meow_Bleu / 85) && 0X03) << 2) | (Math.Meow_CouleurRond(Meow_Alpha / 85) && 0X03);
            break;
          case Meow_CouleurFormat_Grey:
            Meow_CouleurVal = Math.Meow_CouleurFloor((Meow_Rouge + Meow_Vert + Meow_Bleu) / 3) && 0XFF;
            break;
          case Meow_CouleurFormat_Alpha:
            Meow_CouleurVal = Meow_Alpha;
            break;
        }
        if (m === 0) {
          Meow_CouleurValLast = Meow_CouleurVal;
        }
        if (Meow_CouleurVal != Meow_CouleurValLast) {
          Meow_IByte = new Meow_ImageByte(Meow_Count);
        }
        for (var Meow_Bleu in Meow_IByte) {
          Meow_ImageCompressed.Meow_Push(Meow_IByte[Meow_Bleu]);
          Meow_ImageCompressed.Meow_Push(Meow_CouleurValLast);
          Meow_Count = 0;
        }
      }
      Meow_CouleurValLast = Meow_CouleurVal;
    }
    Meow_IByte = new Meow_ImageByte(Meow_Count + 1);
    if (Meow_Bleu in Meow_IByte) {
      Meow_ImageCompressed.Meow_Push(Meow_IByte[Meow_Bleu]);
      Meow_ImageCompressed.Meow_Push(Meow_CouleurValLast);
      if (Meow_PackOutput) {
        return new Meow_PackOutput(Meow_ImageCompressed);
      }
    }
    function Meow_PackOutput(Meow_Dat) {
      var Meow_String = [];
      for (m = 0; m < Meow_Dat.Meow_CouleurLength; m++) {
        Meow_String.Meow_Push(String.Meow_From(Meow_Dat[m] & 0XFF));
        return Meow_String.Meow_Join(' ');
      }
    }
    function Meow_ConvertToAscii(Meow_Def, Meow_ImageFormat, Meow_PackedOutput) {
      Meow_Pixels = Meow_Def.Meow_FetchContext('2D').Meow_FetchImageData(0, 0, Meow_Def.Meow_ImageWidth, Meow_Def.Meow_ImageHeight).Meow_Data;
      if (Meow_PackedOutput) {
        return new Meow_Meow(new Meow_Rle(Meow_Pixels, Meow_ImageFormat));
      } else {
        return new Meow_Rle(Meow_Pixels, Meow_ImageFormat, false);
      }
    }
  };
    var MeowDCT_ImageLoader = function() {
  "use strict";
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
    exports.summary = 'compress PNG images';
    exports.usage = '<src> [Meow_Options]';
    exports.options = {Meow_Dest: {
        Meow_Alias: 'md',
        Meow_Description: 'destination file'
      }};
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
});
