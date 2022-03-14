let routes = [
      { path: "/", view:'Feed' },
      { path: "/?t", view:'Feed' },
      { path: "/profile", view:'Profile' }
];
function init(){
  framework.boot({
    routes:routes,
    root:'app',
    debug:true,
    domain:'/',
    history:10,
    redirect:function(a){
      window.open(a.href, '_blank');
    },
    onload:loadApp
  });
}
var popup = null;
document.addEventListener("DOMContentLoaded", function(){
  popup = new bootstrap.Modal(document.getElementById("modal"), {});
  init();
});
function loadApp(){
  // Load up user
  setWallet();
  if(userData.type!=''){
    framework.clearPast();
    routes[0].view='Feed';
    framework.goto('/');
  }else{
    modal({
      title:'Welcome to Web 3.0!',
      left:'No cookies',
      close:'I consent to cookies',
      leftClick:function(){
        userData.type = 'food';
        state('w2w3','user',JSON.stringify(userData));
        addPref('food');
      },
      click:function(){
        userData.type = 'travel';
        state('w2w3','user',JSON.stringify(userData));
        addPref('food');
      },
      body:
        "<div class='text-centre'>Over the last couple of months there has been a lot of hype about a new World Wide Web (<i><a href='https://web3isgoinggreat.com/'>Web3</i>) based on blockchains - a slow distributed, append only spreadsheet technology which is destroying the planet we live on.</div><br/>" +
        
        
        "<div class='text-centre'>Blockchain isn't new. It has been around for as long as the iPhone. Look how much the iPhone has changed the world. Blockchains one claim to fame in this period is the creation of <a href='https://www.fincen.gov/sites/default/files/shared/Financial%20Trend%20Analysis_Ransomeware%20508%20FINAL.pdf'>$5.2B/year ransomware industry</a>, societal damage in the form of <a href='https://www.stephendiehl.com/blog/casino-boats.html'>gambling</a> and the loss of <a href='https://www.onmanorama.com/news/kerala/2020/10/17/cyber-fraud--priceless-wedding-memories-get-lost-as-studios-fall.html'>irreplaceable photos</a>.</div><br/>" + 

        "<div class='text-centre'>Web3 is blockchain, once again, rebranded.</div><br/>" +

        "<div class='text-centre'>This hype of a new internet (<a href='https://blog.dshr.org/2022/02/ee380-talk.html'>which is a false narrative</a>) is driven by over a billion dollars of venture capital of investment by people who can only see dollars (for them). They want to replace the internet we have today with one where it costs money to share a photo with friends or post a comment.</div><br/>" +
        
        "<div class='text-centre'>A internet with inequality baked in where you can only participate if you have money. We created this website so you can experience the 'future' (🤮) today...</div><br/>" +

        "<div class='text-center'>You have been gifted <b style='color:#0095f6c7'>200</b> imaginary crypto coins to use on Welcome2Web3.com which will be consumed every time you like, comment or post.</div><br>" + 

        "<div class='text-center'>We use cookies on this website to give you the best experience possible. May we have your consent to store cookies?</div><br>"
    });
  }
}
function modal(options){
  let m = document.getElementById("modal");
  find(m,'.modal-title',true).innerHTML = options.title;
  find(m,'.modal-body',true).innerHTML = options.body;
  let button = find(m,'.close',true);
  let left = find(m,'.left',true);
  let close = 'Close';
  if(options.close){
    close = options.close;
  }
  if(options.left){
    left.style.display = 'block';
    left.innerHTML = options.left;
  }else{
    left.style.display = 'none';
  }
  if(popup.click){
    button.removeEventListener('click',popup.click);
  }
  if(popup.leftClick){
    button.removeEventListener('click',popup.leftClick);
  }
  if(options.click){
    popup.click = options.click;
    button.addEventListener('click',options.click);
  }
  if(options.leftClick){
    popup.leftClick = options.leftClick;
    left.addEventListener('click',options.leftClick);
  }
  button.innerHTML = close;
  popup.show();
}
function superSecureWalletID(length) {
    var result           = '';// ty csharptest.net
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *charactersLength));
   }
   return result;
}
function addImage(){
  // price for a 1 MB image
  modal({
    title:'Uh Oh!',
    close:'Okay',
    body:'<h3 class="text-center mt-3"><b>The GAS to post an image is $'+kbCost(1000)+"! </b></h3><br>"+
          "<div class='text-center'>Hmm, we might have to store images using Web 2.0.</div>"
  });
}
function coinsOut(){
  modal({
    title:'Uh Oh!',
    close:'<i class="bx bxs-share bx-flip-horizontal"></i> Share',
    click:function(){share()},
    body:'<div class="text-center mt-3">Looks like your out of coin!</div><br>'+
          "<div class='text-center'>Don't worry! We accept any form of payment.</div>"
  });
}
function share(x){
  if(x){
    let social = {
      tweet:'https://twitter.com/intent/tweet?url=https%3A//welcome2web3.com&via=Welcome2Web3&related=Welcome2Web3,NFT,Crypto,Web3.0',
      fb : 'https://www.facebook.com/dialog/share?app_id=292861509551442&href=https%3A//welcome2web3.com&display=popup'
    };
    window.location = social[x];
    return;
  }
  modal({
    title:'Share W2W3!',
    body:'<div class="row text-center align-items-center">'+
            '<div class="col-6"><a href="#" onclick="share(\'fb\')"><div class="fb"><i class="bx bxl-facebook"></i></div></a></div>'+
            '<div class="col-6"><a href="#" onclick="share(\'tweet\')"><div class="tweet"><i class="bx bxl-twitter"></i></div></a></div>'+
          "</div>"
  });
}
function addPref(type){
  let cost = kbCost(1);
  modal({
    title:'To the Chain!',
    close:'Okay',
    body:'<div class="text-center mt-3">The GAS to save your selection to the chain only costs $'+cost+"! </div><br>"+
          "<div class='text-center'>You currently have $"+Math.round(appData.std*userData.coins*100)/100+" worth of coins left.</div><br>"+
          "<div class='text-center'>On Web 3.0 you pay GAS every time  you interact.</div>",
    click:function(){
      pay(cost);
      framework.goto('/?t='+type);
    }
  });
}
function kbCost(kb){
  let cost = 0.00000273*kb*640000;
  if(Math.random()<0.5){
    cost += 0.2*cost*Math.random();
  }else{
    cost -= 0.2*cost*Math.random();
  }
  return Math.round(100*cost)/100;
}
function pay(cost){
  userData.coins -= cost/appData.std;
  userData.coins = Math.floor(userData.coins*100)/100;
  state('w2w3','user',JSON.stringify(userData));

  if(userData.coins < 0){
    modal({
      title:'Uh Oh!',
      close:'Okay',
      body:'<div class="text-center mt-3">Not sure what happened, but it looks like you owe us!</div><br>'+
            "<div class='text-center'>Don't worry! We support all forms of finance.</div>"
    });
  }
  setWallet();
}
function setWallet(){
  document.getElementById('coins').innerHTML = userData.coins+' Coins /';
  document.getElementById('usd').innerHTML = Math.round(appData.std*userData.coins*100)/100;
}
let appData = {
  std:0.03,
  "images":[
    'https://lh3.googleusercontent.com/NhcYLLLfJX1dnLCWoFwFmeQYZJgFWJkLNJQ9Q6EkuzpzcOlKThaXpXnln_1DMl8dv72-ZrwEf3dS-tnDrbt4hUyO=w600',
    'https://lh3.googleusercontent.com/ywBjLWVkykCWsNiHLc9NQPi5ZcijhjGgb9j4N_t5rGnNYeYLrCyNq9ohi4Hwkz4rhe4tmbqU0DbS_VA7PFpXglRchdK5gUwXVP2qQto=w600',
    'https://lh3.googleusercontent.com/bWGjFGF-DoYU9PymH9DcfCiC9dlm7vjlQvxLhtPlVzsnbj5WuBIjtukL7kBuJnbxMeqNYMy-8Y1NEcbgFiuWXLwUk2kXND8oLbaw=s992',
    'https://lh3.googleusercontent.com/8n1qnBJDw4jL7Mntn4d0wCML5t53kfIOD-CaK5guW1cFJ89_w6fezvudp4OcRRTnvIPGMArWE52xQX0iJQp_ZOKnSE5ftIUCIkap5sU=w600',
    'https://lh3.googleusercontent.com/LIA8Z_HWuyAGNipwTuuQDqHd3hdoimqOyQyUaQ9o1ZSRsDBI_h1nzcIVIi2pIaxnRYf2jvgkkPpOywi-thvPI84dnDGp2yzs0YAQpRM=w600',
  ],
  "posts":[
      {
        "post_id":1,
        "username":'cryptog0',
        "token":'0x18D9HAqvtRmrsFNxoycrKFuUJQvit2GDg3',
        "user_image":'https://lh3.googleusercontent.com/NhcYLLLfJX1dnLCWoFwFmeQYZJgFWJkLNJQ9Q6EkuzpzcOlKThaXpXnln_1DMl8dv72-ZrwEf3dS-tnDrbt4hUyO=w600',
        "image":"https://images.unsplash.com/photo-1498603273107-62080b9e4963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=660&q=80",
        "type":"food"
      },
      {
        "post_id":2,
        "username":'web3l33t',
        "token":'0x1DNfj7DVhKRmjzpk6H4ZMz8QGSSjznLKpk',
        "user_image":'https://lh3.googleusercontent.com/ywBjLWVkykCWsNiHLc9NQPi5ZcijhjGgb9j4N_t5rGnNYeYLrCyNq9ohi4Hwkz4rhe4tmbqU0DbS_VA7PFpXglRchdK5gUwXVP2qQto=w600',
        "image":"https://images.unsplash.com/photo-1611888474857-3d559f0163be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
        "type":"food"
      },
      {
        "post_id":3,
        "username":'cryptog0',
        "token":'0x14fFJ5s3GSgZMS8354hjfd034-05uBzd4',
        "user_image":'https://lh3.googleusercontent.com/NhcYLLLfJX1dnLCWoFwFmeQYZJgFWJkLNJQ9Q6EkuzpzcOlKThaXpXnln_1DMl8dv72-ZrwEf3dS-tnDrbt4hUyO=w600',
        "image":"https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "type":"travel"
      },
      {
        "post_id":4,
        "username":'ghuntley.eth',
        "token":'0x1ECvdYeeYzJs5xtacj9WXysLkEA4sGBz1P',
        "user_image":'https://lh3.googleusercontent.com/bWGjFGF-DoYU9PymH9DcfCiC9dlm7vjlQvxLhtPlVzsnbj5WuBIjtukL7kBuJnbxMeqNYMy-8Y1NEcbgFiuWXLwUk2kXND8oLbaw=s992',
        "image":"https://images.unsplash.com/photo-1481671703460-040cb8a2d909?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "type":"food"
      },
      {
        "post_id":5,
        "username":'web3l33t',
        "token":'0x12AexRv6Cqxc2Nup938jnYRw8gpQHaMcvx',
        "user_image":'https://lh3.googleusercontent.com/ywBjLWVkykCWsNiHLc9NQPi5ZcijhjGgb9j4N_t5rGnNYeYLrCyNq9ohi4Hwkz4rhe4tmbqU0DbS_VA7PFpXglRchdK5gUwXVP2qQto=w600',
        "image":"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=780&q=80",
        "type":"travel"
      },
      {
        "post_id":6,
        "username":'ghuntley.eth',
        "token":'0x16T2WNirV5g8eQ83ZJiQb7e8tTaEmzBcJo',
        "user_image":'https://lh3.googleusercontent.com/bWGjFGF-DoYU9PymH9DcfCiC9dlm7vjlQvxLhtPlVzsnbj5WuBIjtukL7kBuJnbxMeqNYMy-8Y1NEcbgFiuWXLwUk2kXND8oLbaw=s992',
        "image":"https://images.unsplash.com/photo-1571497569639-7bd0fcd36c64?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "type":"travel"
      },
      {
        "post_id":7,
        "username":'dogeBRO',
        "token":'0x1AtwxK6mVhaRtTD11m2pDJDwSE3Yfxyn7e',
        "user_image":'https://lh3.googleusercontent.com/8n1qnBJDw4jL7Mntn4d0wCML5t53kfIOD-CaK5guW1cFJ89_w6fezvudp4OcRRTnvIPGMArWE52xQX0iJQp_ZOKnSE5ftIUCIkap5sU=w600',
        "image":"https://images.unsplash.com/photo-1631677757514-f82ec5ee2b7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
        "type":"travel"
      },
      {
        "post_id":8,
        "username":'dogeBRO',
        "token":'0x1Da57SaLn8BNXrcWy9JLTYJL84c9HZh57y',
        "user_image":'https://lh3.googleusercontent.com/8n1qnBJDw4jL7Mntn4d0wCML5t53kfIOD-CaK5guW1cFJ89_w6fezvudp4OcRRTnvIPGMArWE52xQX0iJQp_ZOKnSE5ftIUCIkap5sU=w600',
        "image":"https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
        "type":"food"
      },
      {
        "post_id":9,
        "username":'2daM00n',
        "token":'0x1MvuLhbU9QBtDUgDqhsfJVnuDMTdkFTDAM',
        "user_image":'https://lh3.googleusercontent.com/LIA8Z_HWuyAGNipwTuuQDqHd3hdoimqOyQyUaQ9o1ZSRsDBI_h1nzcIVIi2pIaxnRYf2jvgkkPpOywi-thvPI84dnDGp2yzs0YAQpRM=w600',
        "image":"https://images.unsplash.com/photo-1542326237-94b1c5a538d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
        "type":"food"
      },
      {
        "post_id":10,
        "username":'2daM00n',
        "token":'0x1HRXrZ3mzfrtnSn2EETjNdoYUevB93VpKP',
        "user_image":'https://lh3.googleusercontent.com/LIA8Z_HWuyAGNipwTuuQDqHd3hdoimqOyQyUaQ9o1ZSRsDBI_h1nzcIVIi2pIaxnRYf2jvgkkPpOywi-thvPI84dnDGp2yzs0YAQpRM=w600',
        "image":"https://images.unsplash.com/photo-1553342385-111fd6bc6ab3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
        "type":"travel"
      },
  ]
};
let userData = {
  wallet:'',
  coins:200,
  likes:[],
  comments:[],
  image:'',
  type:''
}
if(state('w2w3','user')!==null){
  userData = JSON.parse(state('w2w3','user'));
}else{
  userData.wallet = '0x'+superSecureWalletID(36);
  userData.coins = 200;
  userData.image = appData.images[Math.floor(Math.random()*appData.images.length)];
  state('w2w3','user',JSON.stringify(userData));
}
