console.log('fetch gihtub users');

const form = document.getElementById('form');
const searchinputbox = document.getElementById('searchinputbox');
const searchboxerror = document.getElementById('searchbox-error');
const searchbtn = document.getElementById('searchbtn');
const img = document.getElementById('img');
const usernotfound = document.getElementById('usernotfound');
const loginname = document.getElementById('username');
const name = document.getElementById('name');
const followerslength = document.getElementById('followerslength');
const followinglength = document.getElementById('followinglength');
const userprofilebio = document.getElementById('user-profile-bio');
const profilelink = document.getElementById('profile-link');
const blog = document.getElementById('blog');


searchbtn.addEventListener('click', (e)=>{
	e.preventDefault();
	console.log('search btn are clicked');
	isEmptyCheckSearchBox();
	searchUser();
});

let isEmptyCheckSearchBox = ()=>{
	let value = searchinputbox.value;

	if(isRequired(value)){
		showError(searchboxerror, `Search Field Must required`);
	}else{
		showSuccess(searchboxerror);
	}
}

let isRequired = (value) => value === '' ? true : false;

let showError = (id, message) => {
	id.innerText = message;
	id.style.color = "red";
}

let showSuccess = (input) => { 
	searchboxerror.innerText = '';
}

let time = (fn, delay = 500) => {
	console.log("fn : ", fn);
	let letTimeOut;
	return (...args)=>{
		if(letTimeOut){
			clearTimeout(letTimeOut);
		}
		letTimeOut = setTimeout(()=>{
			fn.apply(null, args);
		}, delay);
	}
}


let searchUser = () => {
	const username = searchinputbox.value;
	let url = fetch('https://api.github.com/users/'+username)


	let userData = url.then((response)=> response.json())
	userData.then((actualdata)=> {
		console.log(actualdata);
		if(actualdata.message === 'Not Found'){
			usernotfound.innerHTML = `
				<h1 class="row justify-content-center fw-bold">
					${searchinputbox.value} this user are not Found
				</h1>
			`;
		}else{
			img.setAttribute("src", actualdata.avatar_url)
			img.setAttribute("width", "200");
			profilelink.setAttribute('href', 'https://github.com/' + username);
			name.innerText = actualdata.name;
			loginname.innerText = "@" + actualdata.login;

			if(actualdata.bio === null){
				// ...
			}else{
				userProBio(actualdata.bio);
			}			 
				
			if(actualdata.blog === null){
				// ...
			}else{
				((actualdata)=>{
					blog.innerText = actualdata.blog;
				})(actualdata);
			}

			followers_following_length('Followers ', followerslength,  actualdata.followers);
			
			followers_following_length('Following ', followinglength , actualdata.following);	

		}
	});
}


let followers_following_length = (title, id,  length) => {
		id.innerText = title +  length;
}

let userProBio = (bio) => {
	userprofilebio.innerHTML = `<div>${bio}</div>`;
}

form.addEventListener("input", time((e)=>{
	console.log(e)
	console.log("eeee", e.target.id);
	switch(e.target.id){
	case 'searchinputbox':
		isEmptyCheckSearchBox();
		break;
	}
}));