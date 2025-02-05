import { ElementProps } from '../types/types';

export default class BaseComponentGenerator {
  private element: HTMLElement;

  constructor(props: ElementProps) {
    this.element = this.generateElement(props);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public appendElement(element: HTMLElement | BaseComponentGenerator): void {
    if (!this.element) return;
    let child;
    if (element instanceof BaseComponentGenerator) {
      child = element.getElement();
    } else {
      child = element;
    }
    if (child) this.element.append(child);
  }

  public appendChildren(
    children: (HTMLElement | BaseComponentGenerator)[]
  ): void {
    children.forEach((child) => {
      this.appendElement(child);
    });
  }

  private generateElement({
    tag,
    classNames,
    content,
    attributes,
    event,
    eventCallback,
    id,
  }: ElementProps): HTMLElement {
    const element = document.createElement(tag);
    this.element = element;
    if (classNames) {
      classNames.forEach((className) => {
        element.classList.add(className);
      });
    }
    if (content) {
      element.textContent = content;
    }
    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        element.setAttribute(key, attributes[key]);
      });
    }
    if (event && eventCallback) {
      element.addEventListener(event, eventCallback);
    }
    if (id) {
      element.setAttribute('id', id);
    }
    return element;
  }
}
