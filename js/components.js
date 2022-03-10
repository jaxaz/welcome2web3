function Loader(check,params){
	let self = this;
	// Create the object
	let options = {
		color:'#fff',
		top:'15rem',
		bottom:'0rem',
		size:'3rem',
		borderLeft:'none',
		borderRight:'none',
		background:'none'
	};
	if(typeof params !=='undefined'){
		options = params;
	}
	if(typeof check != 'function'){
		check = function(){return true;};
	}
	self.template = {
			nodeName:'div',
			class:'text-center',
			style:[
							{property:'padding-top',value:options.top},
							{property:'padding-bottom',value:options.bottom},
							{property:'font-size',value:options.size},
							{property:'color',value:options.color},
							{property:'border-left',value:options.borderLeft},
							{property:'border-right',value:options.borderRight},
							{property:'background',value:options.background},
						],
			innerHTML:'<i class="bx bx-loader-circle bx-spin"></i>',
			visible:function(){return check();}
	};
}
function Img(params){
	let self = this;
	let loaded = false;
	let loader = new Loader(
						function(){return !loaded},
						{
							color:'#262626',
							top:'5rem',
							bottom:'5rem',
							size:'3rem',
							background:'#fff',
							borderRight:'solid 1px #dbdbdb',
							borderLeft:'solid 1px #dbdbdb',
						}
					);
	self.template = {
      nodeName:'div',
      class:'bg-light',
      children:[
					loader,
          {
            nodeName:'img',
            class:'d-block w-100',
						src:params,
						load:function(){
							loaded=true;
						}
          },
      ]
	};
}
function CommentBox(params){
	let self = this;
	let loaded = false;
	let label = null;
	if(params.title){
		label = {
			nodeName:'label',
			innerHTML:params.title
		}
	}
	self.value = '';
	self.valid = true;
	self.template = {
			nodeName:'div',
			class:'col-11',
			style:[{property:'z-index',value:'100'}],
			after:function(){
				loaded = true;
			},
			children:[
				label
				,
				{
					nodeName:'div',
		      class:'input-group',
					children:[
						{
							nodeName:'textarea',
							class:"form-control",
							name: params.name,
							keyup:function(ev){
								let t = ev.target;
								if(self.value.length <= t.value.length){
									t.style.height = t.scrollHeight + 'px';
								}
								self.value=t.value;
							},
							attribute:[
								{
									name:'placeholder',
									value: params.placeholder
								}
							]
		        }
					]
				}
			]
		}
}
function Comment(params){
	let self = this;

	self.template = {
			nodeName:'div',
			class:'comment p-3',
			children:[
				{
					nodeName:'img',
					class:"rounded-circle",
					src:userData.image,
				},
				{
					nodeName:'span',
					class:'ms-3',
					innerHTML:params.message
				},
				{
					nodeName:'div',
					class:'text-end',
					innerHTML:'<i>'+params.token+'</i> <i class="bx bxs-component"></i>'
				}
			]
	}
}
function Form(params){
	let self = this;

	if(!params.submitText){
		params.submitText='Post';
	}
	self.response = '';
	let children = params.children;

	children.push({
		nodeName:'div',
		class:'text-start col-1 p-0',
		style:[{property:'z-index',value:'100'}],
		children:[
			{
				nodeName:'button',
				class:'post-comment p-0',
				type:'submit',
				innerHTML:params.submitText
			}
		]
	});

	self.template = {
		nodeName:"form",
		class:"row",
		children:children,
		submit:function(ev){
			ev.preventDefault();
			let form = ev.target;
			params.submit(form);
			console.log('hi');
		}
	};

}
function Post(params){
	let self = this;
  let images = null;
  let extras = [];
	let viewed = params.viewed;

	heart = new Heart(params.post_id);

  image = new Img(params.image);
	self.comments = [];
	userData.comments.forEach(function(comment,i){
		if(comment.post_id == params.post_id){
			self.comments.push(new Comment(comment));
		}
	});

	// Check if the user has posted to this feed
	params.placeholder = 'Add a comment...';

	let submit = function(f){
		let cost = kbCost(1);
		if(cost>userData.coins*appData.std){
			coinsOut(cost);
			return;
		}
		let textarea = find(f,'textarea');
		let comment = {
			post_id:params.post_id,
			message:textarea.value,
			token:'0x'+superSecureWalletID(36)
		}
		textarea.value = '';
		self.comments.push(new Comment(comment));
		userData.comments.push(comment);
		state('w2w3','user',JSON.stringify(userData));
		modal({
			title:'To the Chain!',
			close:'Like!',
			body:'<div class="text-center mt-3">The GAS to comment on this post is only $'+cost+"! </div><br>"+
						"<div class='text-center'>You currently have $"+Math.round(appData.std*userData.coins)+" worth of coins left.</div>",
			click:function(){
				pay(cost);
			}
		});
		generate(self);
	}

	add = new CommentBox(params);

	let form = new Form({children:[add],submit:submit});

	self.template = {
      nodeName:'div',
			class:'mt-3 post',
      children:[
          {
            nodeName:'div',
            class:'card-body',
            children:[
              {
                nodeName:'h5',
                class:'card-title',
                children:[
									{
										nodeName:'img',
										src:params.user_image
									},
									{
										nodeName:'span',
										innerHTML:params.username
									},
									{
										nodeName:'div',
										class:'token',
										innerHTML:params.token+' <i class="bx bxs-component"></i>'
									}
								]
              },
            ]
          },
          image,
					{
						nodeName:'div',
						class:'post-bottom',
						children:[
							{
								nodeName:'div',
								class:'actions',
								children:[
									heart,
									{
										nodeName: 'i',
										class:'bx bx-comment',
										click:function(ev){
											find(above(ev.target,'post-bottom'),'textarea').focus();
										}
									},
								]
							},
							{
								nodeName:'div',
								children:self.comments
							},
							form
						]
					}
      ]
	};
}
function Heart(post_id){
	let self = this;
	self.checked = false;
	if(userData.likes.indexOf(post_id)>-1){
		self.checked = true;
	}

	let rate = function(ev){
		var cost = kbCost(1);
		if(cost>userData.coins*appData.std){
			coinsOut(cost);
			return;
		}
		if(!self.checked){
			modal({
				title:'To the Chain!',
				close:'Like!',
				body:'<div class="text-center mt-3">The GAS to like this post is only $'+cost+"! </div><br>"+
							"<div class='text-center'>You currently have $"+Math.round(appData.std*userData.coins*100)/100+" worth of coins left.</div>",
				click:function(){
					userData.likes.push(post_id);
					pay(cost);
				}
			});

		}else{
			// Remove like
			modal({
				title:'Uh Oh!',
				close:'Okay',
				body:'<div class="text-center mt-3">You will have to burn this NFT to remove your like.</div><br>'+
							'<div class="text-center">Don\'t worry it will only cost $'+cost+'!</div><br>'+
							"<div class='text-center'>You currently have $"+Math.round(appData.std*userData.coins*100)/100+" worth of coins left.</div>",
				click:function(){
					userData.likes = userData.likes.filter(e => e !== post_id);
					pay(cost);
				}
			});
		}
		self.checked = !self.checked;
	}
	self.template = {
			nodeName:'span',
			class:'ms-2',
			click:rate,
			children:[
				{
					nodeName:'i',
					class:function(){
						let c = 'bx bx-heart';
						if(self.checked){
							c = 'bx bxs-heart hearted';
						}
						return c;
					}
				}
			]
		}
}
function Profile(params){
	let self = this;

	self.template = {
			nodeName:'div',
      class:'bg-white p-3 py-5 border row profile',
      children:[
					{
						nodeName:'div',
						class:'col-4',
						children:[
							{
								nodeName:'img',
								class:'w-100 rounded-circle',
								src:userData.image
							},
						]
					},
					{
						nodeName:'div',
						class:'col-8',
						children:[
							{
								nodeName:'ul',
								class:'w-100 text-start overflow-hidden',
								children:[
									{
										nodeName:'li',
										class:'py-2',
										innerHTML:'<b>Wallet</b> : <br>'+userData.wallet,
									},
									{
										nodeName:'li',
										class:'py-2',
										innerHTML:'<b>Coins</b> : <br>'+userData.coins,
									},
									{
										nodeName:'li',
										class:'py-2',
										innerHTML:'<b>USD</b> : <br>$'+ Math.round(appData.std*userData.coins*100)/100,
									},
								]
							}
						],
					},
					{
						nodeName:'div',
						class:'col-12 text-end',
						children:[
							{
								nodeName:'button',
								class:'w-50 btn btn-success',
								innerHTML:'Cash Out',
								click:function(){
									modal({
										title:'Important Message',
										close:'Okay',
										body:'You must post at least one image before you can cash out.'
									});
								}
							}
						]
					}
					]
			};

}
function Feed(params){
	let self = this;
  let posts = [];
	let type = params.t ? params.t : '';
	appData.posts.forEach(function(post,i){
		if(type==''||post.type==type){
			posts.push(new Post(post));
		}
	});
	self.template = {
			nodeName:'div',
      children:[
				{
					nodeName:'div',
					children:posts
				},
				{
					nodeName:"div",
					class:'bg-white py-3 text-center',
					innerHTML:"No posts have been made to this feed.",
					visible:function(){
						return posts.length==0;
					}
				},
				{
					nodeName:"div",
					innerHTML:"<br><br>"
				}
			]
	};

}
