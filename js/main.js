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
      left:'Dogs',
      close:'Cats',
      leftClick:function(){
        userData.type = 'food';
        state('w2w3','user',JSON.stringify(userData));
        addPref('food');
      },
      click:function(){
        userData.type = 'fashion';
        state('w2w3','user',JSON.stringify(userData));
        addPref('food');
      },
      body:"<div class='text-center'>We have gifted you <b style='color:#0095f6c7'>200</b> crypto coins to use!</div><br>"+
            "<div class='text-center'>You are free to like, comment and post anonymously.</div><br>"+
            "<div class='text-center'>Start by choosing what you'd like to see.</div>"
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
    close:'Okay',
    body:'<div class="text-center mt-3">Looks like your out of coin!</div><br>'+
          "<div class='text-center'>Don't worry! We accept any form of payment.</div>"
  });
}
function addPref(type){
  let cost = kbCost(1);
  modal({
    title:'To the Chain!',
    close:'Okay',
    body:'<div class="text-center mt-3">The GAS to save your selection to the chain only costs $'+cost+"! </div><br>"+
          "<div class='text-center'>You currently have $"+Math.round(appData.std*userData.coins*100)/100+" worth of coins left.</div>",
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
        "image":"https://images.pexels.com/photos/3385375/pexels-photo-3385375.jpeg",
        "type":"food"
      },
      {
        "post_id":2,
        "username":'web3l33t',
        "token":'0x1DNfj7DVhKRmjzpk6H4ZMz8QGSSjznLKpk',
        "user_image":'https://lh3.googleusercontent.com/ywBjLWVkykCWsNiHLc9NQPi5ZcijhjGgb9j4N_t5rGnNYeYLrCyNq9ohi4Hwkz4rhe4tmbqU0DbS_VA7PFpXglRchdK5gUwXVP2qQto=w600',
        "image":"https://images.pexels.com/photos/3385375/pexels-photo-3385375.jpeg",
        "type":"food"
      },
      {
        "post_id":3,
        "username":'cryptog0',
        "token":'0x14fFJ5s3GSgZMS8354hjfd034-05uBzd4',
        "user_image":'https://lh3.googleusercontent.com/NhcYLLLfJX1dnLCWoFwFmeQYZJgFWJkLNJQ9Q6EkuzpzcOlKThaXpXnln_1DMl8dv72-ZrwEf3dS-tnDrbt4hUyO=w600',
        "image":"https://images.pexels.com/photos/3385375/pexels-photo-3385375.jpeg",
        "type":"fashion"
      },
      {
        "post_id":4,
        "username":'ghuntley.eth',
        "token":'0x1ECvdYeeYzJs5xtacj9WXysLkEA4sGBz1P',
        "user_image":'https://lh3.googleusercontent.com/bWGjFGF-DoYU9PymH9DcfCiC9dlm7vjlQvxLhtPlVzsnbj5WuBIjtukL7kBuJnbxMeqNYMy-8Y1NEcbgFiuWXLwUk2kXND8oLbaw=s992',
        "image":"https://images.pexels.com/photos/3385375/pexels-photo-3385375.jpeg",
        "type":"food"
      },
      {
        "post_id":5,
        "username":'web3l33t',
        "token":'0x12AexRv6Cqxc2Nup938jnYRw8gpQHaMcvx',
        "user_image":'https://lh3.googleusercontent.com/ywBjLWVkykCWsNiHLc9NQPi5ZcijhjGgb9j4N_t5rGnNYeYLrCyNq9ohi4Hwkz4rhe4tmbqU0DbS_VA7PFpXglRchdK5gUwXVP2qQto=w600',
        "image":"https://images.pexels.com/photos/3385375/pexels-photo-3385375.jpeg",
        "type":"fashion"
      },
      {
        "post_id":6,
        "username":'ghuntley.eth',
        "token":'0x16T2WNirV5g8eQ83ZJiQb7e8tTaEmzBcJo',
        "user_image":'https://lh3.googleusercontent.com/bWGjFGF-DoYU9PymH9DcfCiC9dlm7vjlQvxLhtPlVzsnbj5WuBIjtukL7kBuJnbxMeqNYMy-8Y1NEcbgFiuWXLwUk2kXND8oLbaw=s992',
        "image":"https://images.pexels.com/photos/3385375/pexels-photo-3385375.jpeg",
        "type":"fashion"
      },
      {
        "post_id":7,
        "username":'dogeBRO',
        "token":'0x1AtwxK6mVhaRtTD11m2pDJDwSE3Yfxyn7e',
        "user_image":'https://lh3.googleusercontent.com/8n1qnBJDw4jL7Mntn4d0wCML5t53kfIOD-CaK5guW1cFJ89_w6fezvudp4OcRRTnvIPGMArWE52xQX0iJQp_ZOKnSE5ftIUCIkap5sU=w600',
        "image":"https://images.pexels.com/photos/3385375/pexels-photo-3385375.jpeg",
        "type":"fashion"
      },
      {
        "post_id":8,
        "username":'dogeBRO',
        "token":'0x1Da57SaLn8BNXrcWy9JLTYJL84c9HZh57y',
        "user_image":'https://lh3.googleusercontent.com/8n1qnBJDw4jL7Mntn4d0wCML5t53kfIOD-CaK5guW1cFJ89_w6fezvudp4OcRRTnvIPGMArWE52xQX0iJQp_ZOKnSE5ftIUCIkap5sU=w600',
        "image":"https://images.pexels.com/photos/3385375/pexels-photo-3385375.jpeg",
        "type":"food"
      },
      {
        "post_id":9,
        "username":'2daM00n',
        "token":'0x1MvuLhbU9QBtDUgDqhsfJVnuDMTdkFTDAM',
        "user_image":'https://lh3.googleusercontent.com/LIA8Z_HWuyAGNipwTuuQDqHd3hdoimqOyQyUaQ9o1ZSRsDBI_h1nzcIVIi2pIaxnRYf2jvgkkPpOywi-thvPI84dnDGp2yzs0YAQpRM=w600',
        "image":"https://images.pexels.com/photos/3385375/pexels-photo-3385375.jpeg",
        "type":"food"
      },
      {
        "post_id":10,
        "username":'2daM00n',
        "token":'0x1HRXrZ3mzfrtnSn2EETjNdoYUevB93VpKP',
        "user_image":'https://lh3.googleusercontent.com/LIA8Z_HWuyAGNipwTuuQDqHd3hdoimqOyQyUaQ9o1ZSRsDBI_h1nzcIVIi2pIaxnRYf2jvgkkPpOywi-thvPI84dnDGp2yzs0YAQpRM=w600',
        "image":"https://images.pexels.com/photos/3385375/pexels-photo-3385375.jpeg",
        "type":"fashion"
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
