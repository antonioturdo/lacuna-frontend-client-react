export default class DataHandler {

    static setByPath(obj, path, value){
        const pList = path.split('.');
        const key = pList.pop();
        const pointer = pList.reduce((accumulator, currentValue) => {
          if (accumulator[currentValue] === undefined) {
              accumulator[currentValue] = {};
            }
          return accumulator[currentValue];
        }, obj);
        pointer[key] = value;
        return obj;
    }

    static getByPath(obj, path){
        const pList = path.split('.');
        const key = pList.pop();
        const pointer = pList.reduce((accumulator, currentValue) => {
          if (accumulator[currentValue] === undefined) {
              accumulator[currentValue] = {};
            }
          return accumulator[currentValue];
        }, obj);
        return pointer[key];
    }    

}