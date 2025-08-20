export const MapExtensions = () => {
  if (Map.prototype.addValueOrMakeCallback === undefined) {
    Map.prototype.addValueOrMakeCallback = function (key, value, fn) {
      if (this.has(key)) {
        this.set(key, value);
        fn(this);
        return;
      } else {
        this.set(key, value);
      }
    };
  }
  if (Map.prototype.getKeyFromValueIsExists === undefined) {
    Map.prototype.getKeyFromValueIsExists = function (value) {
      let result;
      this.forEach((el, key) => {
        if (el === value) {
          result = key;
        }
      });
      return result;
    };
  }
  if (Map.prototype.overrideValue === undefined) {
    Map.prototype.overrideValue = function (key, value) {
      const result = this.get(key);

      this.set(key, Object.assign(result, value));
    };
  }
  if (Map.prototype.keysToJson === undefined) {
    Map.prototype.keysToJson = function () {
      const result: any[] = [];
      this.forEach((el) => result.push(el));
      return JSON.stringify(result);
    };
  }
  if (Map.prototype.toArrayEntries === undefined) {
    Map.prototype.toArrayEntries = function () {
      const result = [];
      for (const el of this.entries()) {
        result.push({ key: el[0], value: el[1] });
      }
      return result;
    };
  }
  if (Map.prototype.toArray === undefined) {
    Map.prototype.toArray = function () {
      return Array.from(this.values());
    };
  }
   
  if (Map.prototype.getPredicateKey === undefined) {
    Map.prototype.getPredicateKey = function (callBack) {
      const result: any[] = [];
      this.forEach((el, key) => {
        const callBackExecute = callBack(el);
        if (callBackExecute) {
          result.push(key);
        }
      });
      return result;
    };
  }
  if (Map.prototype.incrementValue === undefined) {
    Map.prototype.incrementValue = function (key) {
      if (this.get(key)) {
        this.set(key, this.get(key) + 1);
      } else {
        this.set(key, 1);
      }
    };
  }
};
