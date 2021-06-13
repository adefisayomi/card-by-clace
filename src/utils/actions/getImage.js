
// Gets single image
export const GetSingleImage = async (e) => {
    const validImageType = ['image/png', 'image/jpeg', 'image/jpg']
    const image = e.target.files[0]
   try{
    if( image && validImageType.includes(image.type) ) {
        return ({success: true, message: null, data: image})
    }
    else throw new Error('Image format not supported.')
   }
   catch(err) {
       return ({success: false, message: err.message, data: null})
   }
}

// Get multiple images
export const GetMultipleImage = async (e) => {
    const validImageType = ['image/png', 'image/jpeg', 'image/jpg']
    try{
        const fileRef = e.target.files
        if(fileRef) {
            const file = Array.from(fileRef)
            // 
            await file.map(file => {
                    if(validImageType.includes(file.type)){
                        return file[0]
                    }
                    else throw new Error('Image format not supported.')
                })
            return ({success: true, message: null, data: file})
        }
        else throw new Error('No image file was selected.')
    }
    catch(err) {
        return({success: false, message: err.message, data: null})
    }
}
