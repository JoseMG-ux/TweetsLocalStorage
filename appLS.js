//Variables
const listaTweets = document.getElementById('lista-tweets');


//Event Listeners
eventListeners();
function eventListeners(){
     //Cuando se envia el formulario
     document.querySelector('#formulario').addEventListener('submit', agregarTweet);
     
     //borrar Tweets
     listaTweets.addEventListener('click',borrarTweet);

     //Contenido cargado

     document.addEventListener('DOMContentLoaded', localStorageListo);
}

//Funciones



//Añadir tweet del formulario
function agregarTweet(e){
     e.preventDefault();
     //Leer el valor del Textarea
     const tweet = document.getElementById('tweet').value;

     //Crear boton de eliminar
     const botonBorrar = document.createElement('a');
     botonBorrar.classList = 'borrar-tweet';
     botonBorrar.innerText = 'X';

     //Creal elemento y añadirle el contenido a la lista
     const li = document.createElement('li');
     li.innerText = tweet;
     //añade el boton borrar al tweet
     li.appendChild(botonBorrar);
     //añade el tweet a la lista
     listaTweets.appendChild(li);

     //Añade twwit a local storage
     agregarTweetLocalStorage(tweet);
}




//elimina el tweet del DOM
function borrarTweet(e){
     e.preventDefault();
     if(e.target.className === 'borrar-tweet'){
     e.target.parentElement.remove();
     borrarTweetLocalStorage(  e.target.parentElement.innerText);
   
}
};




//Mostrar datos del LS en la lista

function localStorageListo(){
     let tweets;

     tweets = obtenerTweetsLocalStorage();

     tweets.forEach(function(tweet){
          //Crear boton de eliminar
     const botonBorrar = document.createElement('a');
     botonBorrar.classList = 'borrar-tweet';
     botonBorrar.innerText = 'X';

     //Creal elemento y añadirle el contenido a la lista
     const li = document.createElement('li');
     li.innerText = tweet;
     //añade el boton borrar al tweet
     li.appendChild(botonBorrar);
     //añade el tweet a la lista
     listaTweets.appendChild(li);

     });
}



//Agrega tweet al LS
function agregarTweetLocalStorage(tweet){
     let tweets;
     tweets = obtenerTweetsLocalStorage();
     //añadir el nuevo tweet
     tweets.push(tweet);
     //convertir de string a arreglo para LS
     localStorage.setItem('tweets', JSON.stringify(tweets));

}   



//Comprobar que haya elementos en el LS, retorna un arreglo
function obtenerTweetsLocalStorage(){
     let tweets;
//revisamos los valores del LS
if(localStorage.getItem('tweets') === null){
     tweets = [];
}else{
     tweets = JSON.parse(localStorage.getItem('tweets'));
}
return tweets;

}

//eliminar tweet de lS

function borrarTweetLocalStorage(tweet){

     let tweets, tweetBorrar;
     //Elimina la X del tweet
     tweetBorrar = tweet.substring(0, tweet.length - 1);

          tweets = obtenerTweetsLocalStorage();

          tweets.forEach(function(tweet, index){
               if(tweetBorrar === tweet){
                    tweets.splice(index, 1);
               }
          });
          console.log(tweets);

          localStorage.setItem('tweets', JSON.stringify(tweets));
};
     