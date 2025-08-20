export const DateExtensions = () => {
  if (Date.prototype.fromUnixDate === undefined) {
    Date.prototype.fromUnixDate = function (unix) {
      return new Date(unix * 1000);
    };
  }
  if (Date.prototype.formatDate === undefined) {
    Date.prototype.formatDate = function () {
      return `${this.getFullYear()}.${this.getMonth()}.${this.getDay()} ${this.getHours()}:${this.getMinutes()}`;
    };
  }
};
