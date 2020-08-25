
window.toUp = (a) => {
    if (a)
        return a.toUpperCase()
    else
        return 'UNDEFINED'
}
  
window.toLo = (a) => {
    if (a)
        return a.toLowerCase()
    else
        return 'UNDEFINED'
}
  
window.compare = (a, b) => {
    if (a && b) {
        if (window.toUp(a) == window.toUp(b))
            return true
        else 
            return false
    }
    else
        return false   
}
  
window.capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.substring(1);
}