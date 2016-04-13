var res = {
    uiPlist:"res/ui/ui.plist",
    ui:"res/ui/ui.png",
    enemy0:"res/enemy/enemy0.png",
    enemy1:"res/enemy/enemy1.png",
    enemy2:"res/enemy/enemy2.png",
    gameBg:"res/bg/bg.jpg",
    startBg:"res/bg/startBg.jpg",
    scrollBar:"res/ui/scrollBar.png",
    scrollBtn:"res/ui/scrollBtn.png"
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
