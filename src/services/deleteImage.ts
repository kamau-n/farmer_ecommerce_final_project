import fs from "fs"
export const deletesImage = (url: any) => {

    try {
        fs.unlink(url, (err) => {
            if (err) {
                return false;
            }
            return true
        })


    } catch (error) {
        console.log(error)
        return false;

    }
}


//delelesImage("iwerwer")