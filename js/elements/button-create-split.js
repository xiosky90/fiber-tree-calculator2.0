import SplitElement from './split-elem.js';

export default class ButtonCreateSplit extends SplitElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        this._removeEventListeners();
    }

    _render() {
        this.appendSVG();
    }

    _addEventListeners() {
        this.addEventListener('click', this.handlerCreateSplit);
        this.addEventListener('click', this.handlerRemoveSplit);
    }

    _removeEventListeners() {
        this.removeEventListener('click', this.handlerCreateSplit);
        this.removeEventListener('click', this.handlerRemoveSplit);
    }

    appendSVG () {
        this.insertAdjacentHTML('afterbegin','<svg class="icon icon-out"><use xlink:href="icon/icon.symbol.svg#add-fill"></use></svg>')
    }

    handlerCreateSplit(event) {
        const target = event.target;

        if (target.matches('.create-split')) {
            const split = super.createSplit();
            const selectWrapper = split.querySelector('.split-selected');

            const prevSplit = this.closest('.split');
            prevSplit.insertAdjacentElement('afterend', split);
            super.createDraggableElement(selectWrapper);
            this.handlerForceUpdateSignal(this, split);

            const fob = split.closest('.fob');

            const position = super.getTranslateXY(this.closest('.split'));
            split.style.transform = `translate(${position.translateX + 200}px, ${position.translateY}px)`;

            fob.addEventListener('mousemove', (event) => (super.onSplitMoveResizedFob(event, fob, split)));

            this.line = super.createLine(fob, this, split, 'coral');

            super.onChangeRemoveButton(this, 'subtract-line');
        }
    }

    handlerRemoveSplit(event) {
        const target = event.target;

        if (target.matches('.remove-split')) {
            const id = +target.dataset.lineId

            super.onChangeRemoveButton(target, 'add-fill')
            super.handlerRemoveElement(id);
        }
    }
}

customElements.define('button-create-split', ButtonCreateSplit);