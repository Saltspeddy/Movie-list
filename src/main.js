import {initializeApp} from 'firebase/app'
import { 
    getFirestore, collection, getDocs, onSnapshot,
    doc, addDoc, deleteDoc, serverTimestamp, query, orderBy,

} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCtRYAc1A9PAVmAFNcqrJ2I-vm3OF4NcRc",
    authDomain: "movie-library-fec94.firebaseapp.com",
    projectId: "movie-library-fec94",
    storageBucket: "movie-library-fec94.appspot.com",
    messagingSenderId: "613246417159",
    appId: "1:613246417159:web:7e8d999ef4907977e56da2"
  };

  initializeApp(firebaseConfig);

  const db = getFirestore();

  const colRef = collection(db, 'movies');

  const q = query( colRef, orderBy("createdAt"));

  let bool = false;

 let movieList;

  onSnapshot(q, (snapshot) => {
    let container = document.querySelector(".container");

    if(bool != "false")
      for(let child of container.children){
        child.style.display = "none";
      }
    let movies = [];
      snapshot.docs.forEach((doc) => {
          movies.push({ ...doc.data(), id: doc.id });
      })
    movieList = movies;
    console.log(movieList);
      for(let movie of movies){
          container.innerHTML += '<div class="movie relative to-do flex flex-row justify-between">'+ movie.title +'<button onclick="deleteMovie()" id="trash"><img class="h-6" src="../dist/img/closed-trash-can-svgrepo-com.svg" alt="fuck"></button></div>';
      }
      bool = !bool;
  })

  const addMovieForm = document.querySelector("#add");
  addMovieForm.addEventListener("submit", (e) => {
    e.preventDefault();

      if(addMovieForm.movies.value != ""){
        addDoc(colRef, {
          title: addMovieForm.movies.value,
          createdAt: serverTimestamp(),
        })
        addMovieForm.reset();
      }

})

const deleteMovieForm = document.querySelector("#delete")

deleteMovieForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const docRef = doc(db, "movies", deleteMovieForm.id.value);
    console.log(docRef);
    deleteDoc(docRef);
    deleteMovieForm.reset();
})




