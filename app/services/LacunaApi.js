import config from 'config';

export default class LacunaApi {

    static getForm(formId) {
        const url = `${config.lacunaApiUrl}/forms/${formId}` 
        return fetch(url)
        .then(response => response.json())
    }

    static saveFormData(formId, data) {
        const url = `${config.lacunaApiUrl}/forms/${formId}/data` 
        return fetch(url, {method: 'PATCH', body: JSON.stringify(data)})
        .then(response => response.json())        
    }
}