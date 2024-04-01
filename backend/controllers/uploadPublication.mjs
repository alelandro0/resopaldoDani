import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../fireBase/firebaseConfig.mjs";

export async function uploadFileP(file) {
    // Verificar si el archivo es una instancia de File
    try {
    console.log('entrada de imagen upload de publicacion', file);

    const fileRef = ref(storage,`ImagePublication/${file.originalname}_${Date.now()}`);
    
    const fileMetadata = {
        contentType: file.mimetype
    };
    console.log('referencia de carga uploadP',fileRef);

    
        const fileUploadTask = uploadBytesResumable(
            fileRef,
            file.buffer,
            fileMetadata
        );
       
        await fileUploadTask;
        const fileDownloadURL = await getDownloadURL(fileRef);
        console.log('resultado de uploadP',fileDownloadURL);
        return { ref: fileRef, downloadURL: fileDownloadURL };
    } catch (error) {
        console.error("Error al cargar el archivo:", error);
        throw new Error("Error al cargar el archivo");
    }
}

