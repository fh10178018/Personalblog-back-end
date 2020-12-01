import CheckBox from "./CheckBox.vue";
import CheckBoxGroup from "./CheckBoxGroup.vue";

/* istanbul ignore next */
CheckBox.install = function(app) {
  app.component(CheckBox.name, CheckBox);
};
CheckBoxGroup.install = function(app) {
  app.component(CheckBoxGroup.name, CheckBoxGroup);
};

export default {
  CheckBox,
  CheckBoxGroup
};
