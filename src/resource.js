var res = {
    uiPlist:"res/ui/ui.plist",
    ui:"res/ui/ui.png",
    gameBg:"res/bg/bg.jpg",
    startBg:"res/bg/startBg.jpg",
    scrollBar:"res/ui/scrollBar.png",
    scrollBtn:"res/ui/scrollBtn.png",
    rotateImg:"res/rotate.png"
};
var heroIdlePics=["res/hero/idle/1.png","res/hero/idle/2.png","res/hero/idle/3.png","res/hero/idle/4.png","res/hero/idle/5.png","res/hero/idle/6.png",
    "res/hero/idle/7.png","res/hero/idle/8.png","res/hero/idle/9.png","res/hero/idle/10.png","res/hero/idle/11.png"];

var defenceFailurePics=["res/hero/fail/1.png","res/hero/fail/2.png","res/hero/fail/3.png","res/hero/fail/4.png","res/hero/fail/5.png","res/hero/fail/6.png",
    "res/hero/fail/7.png","res/hero/fail/8.png","res/hero/fail/9.png","res/hero/fail/10.png","res/hero/fail/11.png"];

var defencePics=["res/hero/defence/1.png","res/hero/defence/2.png","res/hero/defence/3.png","res/hero/defence/4.png","res/hero/defence/5.png","res/hero/defence/6.png",
    "res/hero/defence/7.png","res/hero/defence/8.png","res/hero/defence/9.png","res/hero/defence/10.png","res/hero/defence/11.png"];

var diePics=["res/hero/die/1.png","res/hero/die/2.png","res/hero/die/3.png","res/hero/die/4.png","res/hero/die/5.png","res/hero/die/6.png",
    "res/hero/die/7.png","res/hero/die/8.png","res/hero/die/9.png","res/hero/die/10.png","res/hero/die/11.png"];

var enemy0=["res/enemy/enemy0/g1.png","res/enemy/enemy0/g2.png","res/enemy/enemy0/g3.png","res/enemy/enemy0/g4.png","res/enemy/enemy0/g5.png","res/enemy/enemy0/g6.png",
    "res/enemy/enemy0/g7.png","res/enemy/enemy0/g8.png","res/enemy/enemy0/g9.png","res/enemy/enemy0/g10.png","res/enemy/enemy0/g11.png","res/enemy/enemy0/g12.png"];

var enemy1=["res/enemy/enemy1/g1.png","res/enemy/enemy1/g2.png","res/enemy/enemy1/g3.png","res/enemy/enemy1/g4.png","res/enemy/enemy1/g5.png","res/enemy/enemy1/g6.png",
    "res/enemy/enemy1/g7.png","res/enemy/enemy1/g8.png","res/enemy/enemy1/g9.png","res/enemy/enemy1/g10.png","res/enemy/enemy1/g11.png","res/enemy/enemy1/g12.png"];

var enemy2=["res/enemy/enemy2/g1.png","res/enemy/enemy2/g2.png","res/enemy/enemy2/g3.png","res/enemy/enemy2/g4.png","res/enemy/enemy2/g5.png","res/enemy/enemy2/g6.png",
    "res/enemy/enemy2/g7.png","res/enemy/enemy2/g8.png","res/enemy/enemy2/g9.png","res/enemy/enemy2/g10.png","res/enemy/enemy2/g11.png","res/enemy/enemy2/g12.png"];

var enemy3=["res/enemy/enemy3/g1.png","res/enemy/enemy3/g2.png","res/enemy/enemy3/g3.png","res/enemy/enemy3/g4.png","res/enemy/enemy3/g5.png","res/enemy/enemy3/g6.png",
    "res/enemy/enemy3/g7.png","res/enemy/enemy3/g8.png","res/enemy/enemy3/g9.png","res/enemy/enemy3/g10.png","res/enemy/enemy3/g11.png","res/enemy/enemy3/g12.png"];

var enemy4=["res/enemy/enemy4/g1.png","res/enemy/enemy4/g2.png","res/enemy/enemy4/g3.png","res/enemy/enemy4/g4.png","res/enemy/enemy4/g5.png","res/enemy/enemy4/g6.png",
    "res/enemy/enemy4/g7.png","res/enemy/enemy4/g8.png","res/enemy/enemy4/g9.png","res/enemy/enemy4/g10.png","res/enemy/enemy4/g11.png","res/enemy/enemy4/g12.png"];

var enemy5=["res/enemy/enemy5/g1.png","res/enemy/enemy5/g2.png","res/enemy/enemy5/g3.png","res/enemy/enemy5/g4.png","res/enemy/enemy5/g5.png","res/enemy/enemy5/g6.png",
    "res/enemy/enemy5/g7.png","res/enemy/enemy5/g8.png","res/enemy/enemy5/g9.png","res/enemy/enemy5/g10.png","res/enemy/enemy5/g11.png","res/enemy/enemy5/g12.png"];

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

for (var i in heroIdlePics){
    g_resources.push(heroIdlePics[i]);
}
for (var i in defenceFailurePics){
    g_resources.push(defenceFailurePics[i]);
}

for (var i in defencePics){
    g_resources.push(defencePics[i]);
}

for (var i in diePics){
    g_resources.push(diePics[i]);
}
for (var i in enemy0){
    g_resources.push(enemy0[i]);
}

for (var i in enemy1){
    g_resources.push(enemy1[i]);
}

for (var i in enemy2){
    g_resources.push(enemy2[i]);
}

for (var i in enemy3){
    g_resources.push(enemy3[i]);
}

for (var i in enemy4){
    g_resources.push(enemy4[i]);
}

for (var i in enemy5){
    g_resources.push(enemy5[i]);
}
