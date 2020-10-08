import validFormats from './validFormats'

export default {
    // validation
    isVideo(fileName) {
        if(fileName) {
            const validVideos = validFormats.video

            let format = fileName.slice(fileName.lastIndexOf('.'), fileName.length)
            format = format.toString().toLowerCase().trim()        

            return validVideos.includes(format)
        }
        return false
    },
    isImage(fileName){  
        if(fileName) {
            const validImages = validFormats.image

            let format = fileName.slice(fileName.lastIndexOf('.'), fileName.length)
            format = format.toString().toLowerCase().trim()
            
            return validImages.includes(format)
        }    
        return false
    },
    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    },
    // getters
    getYtbOmb(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
        ? match[2]
        : null;
    },

    sortArrayBy (array, property) {
        return array.sort((x,y) => {
            if(x[property] < y[property]) { return -1; }
            if(x[property] > y[property]) { return 1; }
            return 0;
        })
    }
}