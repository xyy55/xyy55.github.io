//用二维数组来储存游戏
var gameTable = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
//目前得分
var score = 0;
//历史最高分
var bscore = 0;
//用来动态创建游戏格
function createDiv(x,y,num,type) {
    var box = document.createElement("div");
    box.className = "box value-"+num+" "+type;
    box.id = ""+x+y;
    var para = document.createElement("p");
    var text = document.createTextNode(num);
    para.appendChild(text);
    box.appendChild(para);
    box.style.top = x*100+"px";
    box.style.left = y*100+"px";
    document.getElementById("container").appendChild(box);
}
//合并特效
function merge(new_x,new_y,dlt_x1,dlt_y1,dlt_x2,dlt_y2,value){
    $("#"+dlt_x1+dlt_y1).remove();
    $("#"+dlt_x2+dlt_y2).remove();
    createDiv(new_x,new_y,value,"merge");
}
//平移特效
function move(old_x,old_y,toLeft,toUp){
    $("#"+old_x+old_y).animate({left:toLeft*100+"px",top:toUp*100+"px"},150);
    $("#"+old_x+old_y).attr("id",""+toUp+toLeft);
}
function key_up() {
    var f = [0,0];//用来记录目前的数字和位置
    var n = 0;
    var i = 0;
    var j = 0;
    var tempList = [0,0,0,0];//用来记录某一行或某一列的数值
    for(j=0;j<=3;j++){
        tempList = [0,0,0,0];
        for(i = 0;i<=3;i++){
            if(gameTable[i][j]==0){
                continue;
            }
            if(f[0] == 0){
                f[0] = gameTable[i][j];
                f[1] = i;
                continue;
            }
            if(f[0] == gameTable[i][j]){
                f[0] = f[0] * 2;
                score += f[0];
                tempList[n] = f[0];
                merge(n,j,f[1],j,i,j,f[0]);
                f[0] = 0;
                f[1] = 0;
                n = n + 1;
            }else{
                tempList[n] = f[0];
                f[0] = gameTable[i][j];
                move(f[1],j,j,n);
                f[0] = gameTable[i][j];
                f[1] = i;
                n = n + 1;
            }
        }
        if(f[0]!=0){
            tempList[n] = f[0];
            move(f[1],j,j,n);
            f[0] = 0;
            f[1] = 0;
        }
        n = 0;
        for(i = 0;i<=3;i++){
            gameTable[i][j] = tempList[i];
        }
    }
    updata();
}
function key_down() {
    var f = [0,0];//用来记录目前的数字和位置
    var n = 3;
    var i = 0;
    var j = 0;
    var tempList = [0,0,0,0];//用来记录某一行或某一列的数值
    for(j=3;j>=0;j--){
        tempList = [0,0,0,0];
        for(i = 3;i>=0;i--){
            if(gameTable[i][j]==0){
                continue;
            }
            if(f[0] == 0){
                f[0] = gameTable[i][j];
                f[1] = i;
                continue;
            }
            if(f[0] == gameTable[i][j]){
                f[0] = f[0] * 2;
                score += f[0];
                tempList[n] = f[0];
                merge(n,j,f[1],j,i,j,f[0]);
                f[0] = 0;
                f[1] = 0;
                n--;
            }else{
                tempList[n] = f[0];
                f[0] = gameTable[i][j];
                move(f[1],j,j,n);
                f[0] = gameTable[i][j];
                f[1] = i;
                n--;
            }
        }
        if(f[0]!=0){
            tempList[n] = f[0];
            move(f[1],j,j,n);
            f[0] = 0;
            f[1] = 0;
        }
        n = 3;
        for(i = 0;i<=3;i++){
            gameTable[i][j] = tempList[i];
        }
    }
    updata();
}
function key_left() {
    var f = [0,0];//用来记录目前的数字和位置
    var n = 0;
    var i = 0;
    var j = 0;
    var tempList = [0,0,0,0];//用来记录某一行或某一列的数值
    for(i=0;i<=3;i++){
        tempList = [0,0,0,0];
        for(j = 0;j<=3;j++){
            if(gameTable[i][j]==0){
                continue;
            }
            if(f[0] == 0){
                f[0] = gameTable[i][j];
                f[1] = j;
                continue;
            }
            if(f[0] == gameTable[i][j]){
                f[0] = f[0] * 2;
                score += f[0];
                tempList[n] = f[0];
                merge(i,n,i,f[1],i,j,f[0]);
                f[0] = 0;
                f[1] = 0;
                n = n + 1;
            }else{
                tempList[n] = f[0];
                move(i,f[1],n,i);
                f[0] = gameTable[i][j];
                f[1] = j;
                n = n + 1;
            }
        }
        if(f[0]!=0){
            tempList[n] = f[0];
            move(i,f[1],n,i);
            f[0] = 0;
            f[1] = 0;
        }
        n = 0;
        for(j = 0;j<=3;j++){
            gameTable[i][j] = tempList[j];
        }
    }
    updata();
}
function key_right() {
    var f = [0,0];//用来记录目前的数字和位置
    var n = 3;
    var i = 0;
    var j = 0;
    var tempList = [0,0,0,0];//用来记录某一行或某一列的数值
    for(i=0;i<=3;i++){
        tempList = [0,0,0,0];
        for(j = 3;j>=0;j--){
            if(gameTable[i][j]==0){
                continue;
            }
            if(f[0] == 0){
                f[0] = gameTable[i][j];
                f[1] = j;
                continue;
            }
            if(f[0] == gameTable[i][j]){
                f[0] = f[0] * 2;
                score += f[0];
                tempList[n] = f[0];
                merge(i,n,i,f[1],i,j,f[0]);
                f[0] = 0;
                f[1] = 0;
                n--;
            }else{
                tempList[n] = f[0];
                move(i,f[1],n,i);
                f[0] = gameTable[i][j];
                f[1] = j;
                n--;
            }
        }
        if(f[0]!=0){
            tempList[n] = f[0];
            move(i,f[1],n,i);
            f[0] = 0;
            f[1] = 0;
        }
        n = 3;
        for(j = 0;j<=3;j++){
            gameTable[i][j] = tempList[j];
        }
    }
    updata();
}
//对整个游戏界面进行更新操作
function updata() {
    var e = true;
    var f = true;
    for(i = 0;i<=3;i++){
        if($.inArray(0,gameTable[i])!=-1){
            while(true){
                var x = Math.floor(Math.random()*4);
                var y = Math.floor(Math.random()*4);
                if(gameTable[x][y]==0){
                    var num = Math.random() < 0.9 ? 2:4;
                    createDiv(x,y,num,"new");
                    gameTable[x][y] = num;
                    e = false;
                    break;
                }
            }
            break;
        }
    }
    if(e){
        isEnd();
    }else{
        for(i = 0;i<=3;i++){
            if($.inArray(0,gameTable[i])!=-1){
                f = false;
                break;
            }
        }
        if(f){
            isEnd();
        }
    }
}
//判断游戏是否结束
function isEnd() {
    var end = true;
    var i = 0;
    var j = 0;
    for(i = 0;i<=3;i++){
        for(j = 0;j<=2;j++){
            if(gameTable[i][j]==gameTable[i][j+1]){
                end = false;
            }
        }
    }
    for(j = 0;j<=3;j++){
        for(i = 0;i<=2;i++){
            if(gameTable[i][j]==gameTable[i+1][j]){
                end = false;
            }
        }
    }
    if(end){
        localStorage.setItem("bscore",$(".best").text());
        $(".end").slideDown("slow");
    }
}
//游戏开始
function start() {
    var x1 = Math.floor(Math.random()*4);
    var y1 = Math.floor(Math.random()*4);
    var x2 = Math.floor(Math.random()*4);
    var y2 = Math.floor(Math.random()*4);
    var num1 = Math.random() < 0.9 ? 2:4;
    var num2 = Math.random() < 0.9 ? 2:4;
    var s;
    while(x1 == x2&&y1 == y2){
        x2 = Math.floor(Math.random()*4);
        y2 = Math.floor(Math.random()*4);
    }
    gameTable[x1][y1] = num1;
    gameTable[x2][y2] = num2;
    $(".box").remove();
    createDiv(x1,y1,num1,"new");
    createDiv(x2,y2,num2,"new");
    s = localStorage.getItem("bscore");
    if(s){
        bscore = s;
    }
    $(".best").text(bscore);
}
//浏览器加载完全时开始游戏
window.onload = start();
//监听键盘事件
document.onkeydown = function(e){
    e.preventDefault();
    if(e.keyCode == 38){
        key_up();
    }else if(e.keyCode == 40){
        key_down();
    }else if(e.keyCode == 37){
        key_left();
    }else if(e.keyCode == 39){
        key_right();
    }
    $(".score").text(score);
    if(score>bscore){
        $(".best").text(score);
        bscore = score;
    }
};
//“再试一次”按钮的点击事件
$(".btn-tamaya").click(
    function (){
    $(".end").slideUp("slow");
    gameTable = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    score = 0;
    $(".score").text(score);
    start();
});
//“重玩”按钮的点击事件
$("#tryAgain").click(
    function () {
        gameTable = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        score = 0;
        $(".score").text(score);
        start();
    }
);
//“读取存档”按钮的点击事件
$("#readGame").click(
    function () {
        var table = JSON.parse(localStorage.getItem("game"));
        var i = 0;
        var j = 0;
        if(!table){
            alert("没有存档");
        } else {
            gameTable = table;
            $(".box").remove();
            for(i = 0;i<=3;i++){
                for(j = 0;j<=3;j++){
                    if(gameTable[i][j]==0){
                        continue
                    }
                    createDiv(i,j,gameTable[i][j],"new");
                }
            }
            score = parseInt(localStorage.getItem("score"));
            $(".score").text(score);
        }
    }
);
//屏幕右上角的音乐图标，点击暂停游戏播放
$("img").click(
    function () {
        var player = $("audio")[0];
        var iron = $("img");
        if (player.paused) {
            player.play();
            iron.css("animation-play-state","running");
        } else {
            player.pause();
            iron.css("animation-play-state","paused");
        }
    }
);
//“保存游戏”按钮点击事件
$("#saveGame").click(
    function () {
        //使用localStorage储存游戏记录
        localStorage.setItem("game",JSON.stringify(gameTable));
        localStorage.setItem("score",score);
    }
);
//用ajax进行跨域访问获取天气数据显示
$.ajax({
    url: "http://query.yahooapis.com/v1/public/yql",
    type: "GET",
    dataType: 'JSONP',
    jsonp: "callback",
    jsonpCallback:"message",
    data: {
        q: "select * from json where url=\"http://aider.meizu.com/app/weather/listWeather?cityIds=101010100\"",
        format: "json"
    },
    success: function(data){
        var d = data.query.results.json;
        var words = "北京今天";
        var weather = d.value.weatherDetailsInfo.weather3HoursDetailsInfos[0];
        var pm25 = d.value.pm25;
        if(d.code=="200"){
            words += weather.weather+"，未来三小时中，气温为"+weather.highestTemperature+"摄氏度";
            words += "，pm2.5指数："+pm25.pm25+"，"+d.value.indexes[5].content;
            words += d.value.indexes[3].content;
            $(".weather marquee").text(words);
        }else {
            alert(d.message);
        }
    }
});
//鼠标覆盖时边框动画
$(".end").hover(function(){
    n1 = $(this).width();
    h1 = $(this).height();
    var becurr = "background:#ff0000;position:absolute;"
    // top边框
    var divTop ="<div style='"+becurr+"top:-2px;left:-2px;width:0px;height:2px' class='divTop'></div>";

    // right边框
    var divRight ="<div style='"+becurr+"top:-2px;right:-2px;width:2px;height:0px;' class='divRight'></div>";

    // Bottom边框
    var divBottom ="<div style='"+becurr+"bottom:-2px;right:-2px;width:0px;height:2px' class='divBottom'></div>";

    // Left边框
    var divLeft ="<div style='"+becurr+"bottom:-2px;left:-2px;width:2px;height:0px;' class='divLeft'></div>"; 

    $(this).append(divTop,divRight,divBottom,divLeft);

    $(this).find("div:nth-child(odd)").stop().animate({width:n1+3.5},300,function(){
        $(this).parent().find("div:nth-child(even)").stop().animate({height:h1+3.5},300);
    });
    
},function(){
    $(this).find("div:nth-child(odd)").stop().animate({width:0},300,function(){
        $(this).parent().find("div:nth-child(even)").stop().animate({height:0},300,function(){
            $(".num5 .divTop,.num5 .divRight,.num5 .divBottom,.num5 .divLeft").remove()
        });
    });
    
})