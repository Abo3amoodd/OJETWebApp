define([], function () {
  class CoreUtils {
    /**
     * @description A singleton to hold the variable we want
     * generate a unique id by calling the generateUniqueID function
     * @returns The existing instance
     */
    constructor() {
      if (!CoreUtils.instance) {
        this.counter = 0;
        CoreUtils.instance = this;
      }
      return CoreUtils.instance;
    }
    /**
     * @function generateUniqueID
     * @description Generates a unique ID
     * @returns a unique ID based on a internal counter
     */
    generateUniqueId() {
      return `uid-${this.counter++}`;
    }

    checkValidationGroup(id) {
      const tracker = document.getElementById(id);
      if (tracker.valid == 'valid') {
        return true;
      } else {
        tracker.showMessages();
        tracker.focusOn('@firstInvalidShown');
        return false;
      }
    }
    toastMessagePosition() {
      return {
        my: { vertical: 'top', horizontal: 'end' },
        at: { vertical: 'top', horizontal: 'end' },
        of: 'window',
      };
    }

    getAutoTimeout() {
      return 4000;
    }
  }
  const instance = new CoreUtils();
  return instance;
});
