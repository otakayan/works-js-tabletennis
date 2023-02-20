let x,y,point,speed=100,zan=0; // ボールの初期位置
let dx=10,dy=10; // ボールの移動距離
let rx=200;//ラケットの初期位置

const wall=document.querySelector("#wall");
const bar=document.querySelector("#bar");
const ten=document.querySelector("#ten");

function move(){
    let TimeID=setTimeout("move()",speed);//くり返し処理、speedの変更を反映
    let ball=document.getElementById("ball");
    x+=dx;
    y+=dy;
    ball.style.left=x+"px";
    ball.style.top=y+"px";
    if (x<=50 || x+10>=450){//左枠もしくは右枠をはみ出ないように
        dx=-dx; //減算に切り替える
    }
    if (y<=50){ //上枠を超えないように
        dy=-dy; //縦を減算に切り替える
    }
    if (rx-10<=x && x<=rx+50 && y+10==400){ //ラケットにあたる判定
        dy=-dy;
        point+=10; //得点加算
        ten.value=point;
        if(point%100==0 && speed!=10){//何点になったらスピードをあげるか
            speed-=10; //減算でスピードアップ
        }
    }
    if(y>=440){ //下枠に当たったら終了
        clearTimeout(TimeID);
    }
}
function racket(event)
{
    rx=event.clientX-25; //rxはバーの位置。水平座標。バーのマウス位置を真ん中に定義
    if (50<=rx && rx+50<=450){ //rxはバーの左端。左端＋バー長さが右端
        bar.style.left=rx+"px"; //cssのleftの値を変動
    }
}
wall.onmousemove=function(event){ //壁の中でマウスが動いたら以下の関数発火
    racket(event);
}
bar.onclick=function(){ //ゲーム開始の関数
    let zanki=document.getElementById("zanki");
    if(zan==0){ 
        zan=2; //2機補充
        speed=100; //スピード初期値
        point=0; //得点初期値
        ten.value=point; //tenの値を初期値に置き換える
    }
    else{
        zan--; //残機を減算
    }
    zanki.value=zan;
    //開始位置に戻る
    x = 200;
    y = 100;
    move();
}
//開始位置ランダム、加算方式の変更、跳ね返りランダム、ボール個数増やす
//画像を使わない（壁、ボール、ラケットを作成する）→まずは同じサイズで
