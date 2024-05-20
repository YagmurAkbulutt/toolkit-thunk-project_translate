import axios from "axios";

export const api = axios.create({
    baseURL : 'https://text-translator2.p.rapidapi.com',

    headers: {
        'X-RapidAPI-Key': 'dffbb20932mshaca6757e3ecd48dp1d4946jsnb8f0184d720d',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      }
})