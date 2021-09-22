export default class Utils {
  static deepClone(object) {
    if (!object) {
      return null;
    }
    let clonedObject = JSON.parse(JSON.stringify(object));
    return clonedObject;
  }
}
