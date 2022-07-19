import ExtendetHTMLElement from './extendet-elem.js';

export default class FobElement extends ExtendetHTMLElement {
    static #instances = 2;

    constructor(name) {
        super();
        this.idFob = FobElement.#instances++;
        this.rect = this.getBoundingClientRect();

        // this.count++;
        // this.dataset.fobId = count;
        // console.log(`Create element FOB ${this.dataset.fobId++}`);
        // this.firstSplit = 
        // this.mouseDownOnThis = false;
    }

    connectedCallback() {
        this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        this._removeEventListeners();
    }

    _render() {
        this.onDraggableElement(this);
    }

    _addEventListeners() {
        this.addEventListener('click', this.createFob);
        this.querySelector('.draggable').addEventListener('mousemove', this.updateSplitLinePosition);
    }

    _removeEventListeners() {
        this.querySelector('.draggable').removeEventListener('mousemove', this.updateSplitLinePosition);
    }

    updateSplitLinePosition(event) {
        const fob = event.target.closest('.fob');
        fob.querySelector('.grid-field').dispatchEvent(new Event('mousemove'));
    }
 
    createFob(event) {
        const target = event.target;
        
        if (target.matches('.create-fob')) {

            function createNewFob(id) {
                let fobElem = document.createElement('fob-element'),
                    fobHead = document.createElement('div'),
                    fobGrid = document.createElement('div');

                    fobElem.classList.add('fob');
                    fobHead.classList.add('fob-head', 'draggable');
                    fobHead.textContent = `Drag This ${id}`;
                    fobElem.append(fobHead);
                    fobGrid.classList.add('grid-field');
                    fobElem.append(fobGrid);
            
                    function createFirstSplit() {
                        let split = document.createElement('split-element');
                        split.classList.add('row', 'split');
                        
                        split.innerHTML  = 
                            `<split-type-select class="row split-selected"></split-type-select>
                            <div class="vertical-center"><input class="in-split" name="in-signal" value="0"></div>
                            <div class="column out-split">
                                <div class="split-out row" data-id="0">
                                    <input class="out-signal" data-id="0" name="out-split" value="0" disabled="">
                                    <button class="btn-split create-split">+</button>
                                    <svg class="icon icon-out green create-fob"><use xlink:href="icon/icon.symbol.svg#arrow-right-line"></use></svg>
                                </div>
                                <div class="split-out row" data-id="0">
                                    <input class="out-signal" data-id="0" name="out-split" value="0" disabled="">
                                    <button class="btn-split create-split">+</button>
                                    <svg class="icon icon-out green create-fob"><use xlink:href="icon/icon.symbol.svg#arrow-right-line"></use></svg>
                                </div>
                            </div>`;

                        return split;
                    }

                    let split = createFirstSplit();
        
                    fobGrid.insertAdjacentElement('beforeend', split);

                    return fobElem;
            }

            function setPosition(thisFob) {
            
                function getTranslateXY(element) {
                    const style = window.getComputedStyle(element)
                    const matrix = new DOMMatrixReadOnly(style.transform)
                    return {
                        translateX: matrix.m41,
                        translateY: matrix.m42
                    }
                }

                let position = getTranslateXY(thisFob),
                    widthThisFob = thisFob.offsetWidth + 40;

                newFob.style.transform = `translate(${position.translateX + widthThisFob}px, ${position.translateY}px)`;
            }

            function updateSignal(inputSignal) {
                let parent = target.closest('.split-out');
                let getOutSignalElement = parent.querySelector('.out-signal');
                inputSignal.value = getOutSignalElement.value;
    
                getOutSignalElement.addEventListener('change', (event) => {
                    const target = event.target;
                    inputSignal.value = target.value;
    
                    inputSignal.dispatchEvent(new Event('change'));
                })
            }

            let newFob = createNewFob(this.idFob);
            let fob = newFob.querySelector('[name="in-signal"]');
            
            field.append(newFob);
            setPosition(this);
            this.line = this.createLine(this, target, fob);
            this.onDraggableElement(newFob);
            updateSignal(fob);
        }
    }

    // removeFob() {

    // }
}

customElements.define('fob-element', FobElement);