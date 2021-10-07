export function addFavorite(movie){
    let favorites = localStorage.getItem('favorites');
    if(!favorites){
        favorites = [];
    } else {
        favorites = JSON.parse(favorites);
    }
    if(!Array.isArray(favorites)){
        favorites = [];
    } 
    favorites.push(movie)
    localStorage.setItem('favorites',JSON.stringify(favorites));
}

export function getFavorite(imdbID){
    let favorites = localStorage.getItem('favorites');
    if(!favorites){
        return null;
    } 
    favorites = JSON.parse(favorites);
    if(!Array.isArray(favorites)){
        return null;
    } 
    return favorites.find(m=>m.imdbID === imdbID);
}
export function getAllFavorites(){
    let favorites = localStorage.getItem('favorites');
    if(!favorites){
        return null;
    } 
    favorites = JSON.parse(favorites);
    if(!Array.isArray(favorites)){
        return null;
    } 
    return favorites;
}export function removeFavorite(movie){
    let favorites = localStorage.getItem('favorites');
    if(!favorites){
        return null;
    } 
    favorites = JSON.parse(favorites);
    if(!Array.isArray(favorites)){
        return null;
    } 
    favorites = favorites.filter(function(m) {
        return m.imdbID !== movie.imdbID
    })
    localStorage.setItem('favorites',JSON.stringify(favorites));
    return favorites;
}