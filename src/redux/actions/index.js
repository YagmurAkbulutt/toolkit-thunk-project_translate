import { api } from "../../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";


//apidan dil verilerini alıp stprea dispatch edecek asenkron thunk anksiyonu

export const getLanguages = createAsyncThunk("language/getLanguages" , async () => {
    const res = await api.get('/getLanguages')

    

    return res.data.data.languages
});

//apidan çeviri sonucunu alma
export const translateText = createAsyncThunk("translate/translateText", async (p) => {
    //apiya göndeirlecek parametreleri belirle
    const params = new URLSearchParams();
    params.set('source_language', p.sourceLang.value);
    params.set('target_language', p.targetLang.value);
    params.set('text', p.text);

    //apia gönderilecek headerı belirle
    const headers = {
        "content-type":"application/x-www-form-urlencoded"
    }

    //api isteği at
    const res = await api.post('/translate', params, {headers})

    //aksiyonun payloadını yazdırmak için 
    return res.data.data.translatedText;
})

