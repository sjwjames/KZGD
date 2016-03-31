var res = {
    uiPlist:"res/ui/ui.plist",
    ui:"res/ui/ui.png",
    enemy0:"res/enemy/enemy0.png",
    enemy1:"res/enemy/enemy1.png",
    enemy2:"res/enemy/enemy2.png",
    gameBg:"res/bg/bg.jpg",
    startBg:"res/bg/startBg.jpg"
};
var heroIdle=["res/hero/idle/1.png","res/hero/idle/2.png","res/hero/idle/3.png","res/hero/idle/4.png","res/hero/idle/5.png","res/hero/idle/6.png",
    "res/hero/idle/7.png","res/hero/idle/8.png","res/hero/idle/9.png","res/hero/idle/10.png","res/hero/idle/11.png"];

var defenceFailure=["res/hero/fail/1.png","res/hero/fail/2.png","res/hero/fail/3.png","res/hero/fail/4.png","res/hero/fail/5.png","res/hero/fail/6.png",
    "res/hero/fail/7.png","res/hero/fail/8.png","res/hero/fail/9.png","res/hero/fail/10.png","res/hero/fail/11.png"];

var defence=["res/hero/defence/1.png","res/hero/defence/2.png","res/hero/defence/3.png","res/hero/defence/4.png","res/hero/defence/5.png","res/hero/defence/6.png",
    "res/hero/defence/7.png","res/hero/defence/8.png","res/hero/defence/9.png","res/hero/defence/10.png","res/hero/defence/11.png"];

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

for (var i in heroIdle){
    g_resources.push(heroIdle[i]);
    g_resources.push(defenceFailure[i]);
    g_resources.push(defence[i]);
}
