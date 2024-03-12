import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../fireBase/firebaseConfig.mjs";


export async function uploadFileP(file) {
    const fileRef = ref(storage, `Portada/${file.originalname}_${Date.now()}`);

    const fileMetadata = {
        contentType: file.mimetype
    };
     console.log('referencia de la imagen ',fileRef);
    const fileUploadPromise = uploadBytesResumable(
        fileRef,
        file.buffer,
        fileMetadata
    );
    console.log('este es metadadta ', fileMetadata);
   

    await fileUploadPromise;

    const fileDownloadURL = await getDownloadURL(fileRef);


    return { ref: fileRef, downloadURL: fileDownloadURL };
}
