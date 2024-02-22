declare interface Date {
  toHuman: () => string;
}

(function () {
  Date.prototype.toHuman = () => {};
})();
