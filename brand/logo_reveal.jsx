// Artizana logo reveal — EffectCraft (After Effects-style) script.
// Do not run directly: brand/build_reveal.py prepends `var DATA = {...}` (geometry from
// build_logo.py and the outlined wordmark), then runs EffectCraft and renders the MP4.
//
// Story: the tesselles are laid one by one from the central star outward (how a maâlem
// grows a panel from its ras al-shabaka), the door frame draws around them, the name rises.

var W = 1080, H = 1080, DUR = 5.5, FPS = 30;
var VB = DATA.viewBox;                 // [x, y, w, h] of the mark
var K = 640 / VB[3];                   // mark is 640 px tall in the comp
var OX = W / 2 - (VB[2] * K) / 2, OY = 80;

function hex(c) { var n = parseInt(c.slice(1), 16); return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; }
function P(p) { return [OX + (p[0] - VB[0]) * K, OY + (p[1] - VB[1]) * K]; }
function mapAll(pts) { var o = []; for (var i = 0; i < pts.length; i++) o.push(P(pts[i])); return o; }
function ease(prop) { try { var e = new KeyframeEase(0, 80); for (var i = 1; i <= prop.numKeys; i++) prop.setTemporalEaseAtKey(i, [e], [e]); } catch (err) {} }
function key2(prop, t0, v0, t1, v1) { prop.setValueAtTime(t0, v0); prop.setValueAtTime(t1, v1); ease(prop); }

var INK = hex("#17120F"), GOLD = hex("#D6A243");
var comp = app.project.items.addComp("Artizana reveal", W, H, 1, DUR, FPS);
comp.layers.addSolid(INK, "Fond", W, H, 1, DUR);

function newLayer(name) {
  var L = comp.layers.addShape(); L.name = name;
  L.property("ADBE Transform Group").property("ADBE Position").setValue([0, 0]); // vertices are in comp space
  return L;
}
function addGroup(L, verts, fill, stroke, width) {
  var g = L.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
  var c = g.property("ADBE Vectors Group");
  var s = new Shape(); s.vertices = verts; s.closed = true;
  c.addProperty("ADBE Vector Shape - Group").property("ADBE Vector Shape").setValue(s);
  if (fill) c.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(hex(fill));
  if (stroke) {
    var st = c.addProperty("ADBE Vector Graphic - Stroke");
    st.property("ADBE Vector Stroke Color").setValue(hex(stroke));
    st.property("ADBE Vector Stroke Width").setValue(width);
  }
  return g;
}

// 1. the door frame (gold line, dark band, grout field) fades in behind the pieces
var frame = newLayer("Cadre");
// the first group in a shape layer draws on top, so innermost first
addGroup(frame, mapAll(DATA.archField), "#2A211B");
addGroup(frame, mapAll(DATA.archBand), "#17120F");
addGroup(frame, mapAll(DATA.archOuter), "#D6A243");
key2(frame.property("ADBE Transform Group").property("ADBE Opacity"), 1.2, 0, 1.9, 100);

// 2. the tesselles, laid from the centre outward
var tiles = newLayer("Tesselles");
for (var i = 0; i < DATA.pieces.length; i++) {
  var p = DATA.pieces[i];
  var g = addGroup(tiles, mapAll(p.pts), p.fill);
  var c = P(p.c);
  var tr = g.property("ADBE Vector Transform Group");
  tr.property("ADBE Vector Anchor").setValue(c);
  tr.property("ADBE Vector Position").setValue(c);
  var t0 = 0.15 + p.dist * 0.0075;
  key2(tr.property("ADBE Vector Scale"), t0, [0, 0], t0 + 0.45, [100, 100]);
}

// 3. the gold line draws itself around the door
var line = newLayer("Trait");
var lg = addGroup(line, mapAll(DATA.archOuter), null, "#D6A243", 4);
var trim = lg.property("ADBE Vectors Group").addProperty("ADBE Vector Filter - Trim");
key2(trim.property("ADBE Vector Trim End"), 0.4, 0, 1.9, 100);

// 4. the threshold
var s = DATA.sill;
var sill = newLayer("Seuil");
addGroup(sill, mapAll([[s.x, s.y], [s.x + s.width, s.y], [s.x + s.width, s.y + s.height], [s.x, s.y + s.height]]), "#D6A243");
var sc = P([s.x + s.width / 2, s.y]);
sill.property("ADBE Transform Group").property("ADBE Anchor Point").setValue(sc);
sill.property("ADBE Transform Group").property("ADBE Position").setValue(sc);
key2(sill.property("ADBE Transform Group").property("ADBE Scale"), 1.7, [0, 100], 2.2, [100, 100]);

// 5. the wordmark (outlined glyphs pasted as shapes)
app.run("edit.pasteSvg", { svg: DATA.wordmarkSvg, name: "Wordmark", comp: comp.name });
var word = comp.layer("Wordmark");
if (word) {
  var b = word.sourceRectAtTime(0, false);
  var tg = word.property("ADBE Transform Group");
  tg.property("ADBE Anchor Point").setValue([b.left + b.width / 2, b.top + b.height / 2]);
  var k = Math.min(1, 700 / b.width) * 100;
  tg.property("ADBE Scale").setValue([k, k]);
  key2(tg.property("ADBE Position"), 2.4, [540, 1000], 3.3, [540, 960]);
  key2(tg.property("ADBE Opacity"), 2.4, 0, 3.1, 100);
}
writeLn("tesselles: " + DATA.pieces.length + ", layers: " + comp.numLayers + ", wordmark: " + (word ? "ok" : "missing"));
