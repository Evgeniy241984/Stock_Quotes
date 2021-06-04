let Component, Target;

export default function renderApp(componentFunction, targetElement) {
  if (componentFunction) Component = componentFunction;
  if (targetElement) Target = targetElement;
  document.getElementById(Target).innerHTML = `
    ${Component()}
    `;
}
