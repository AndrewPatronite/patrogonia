export const advanceFocus = (
  activeElement: Element,
  reverse: boolean = false
) => {
  const focusEnabledControls = Array.prototype.filter.call(
    document.querySelectorAll('input, button, select, textarea, a[href]'),
    (control) => control.tabIndex >= 0
  );
  const nextControlIndex =
    focusEnabledControls.indexOf(activeElement) + (reverse ? -1 : 1);
  const nextControl =
    focusEnabledControls[nextControlIndex] || focusEnabledControls[0];
  nextControl.focus();
};
