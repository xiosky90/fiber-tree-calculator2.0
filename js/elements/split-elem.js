let i = 1
export default class SplitElement extends HTMLElement {
    static #instances = 2;

    constructor(name) {
        super();
        this.idSplit = SplitElement.#instances++;
        this.rect = this.getBoundingClientRect(); 
        // this.i = i;
        // this.count++;
        // this.dataset.fobId = count;
        // console.log(`Create element FOB ${this.dataset.fobId++}`);
        // setTimeout(() => {
        //     this.createSplit();
        // }, 1);
    }

    connectedCallback() {
        console.log(`Split element in DOM ${this.idSplit}`);
        this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        console.log('remove Split element');
        this._removeEventListeners();
    }

    _render() {
        this.calcSignal();
    }

    _addEventListeners() {
        this.addEventListener('click', this.createSplit);
        // this.addEventListener('click', this.hiddenLine);
    }

    createSplit(event) {
        const target = event.target;

        if (target.matches('.create-split')) {
            let line;
            let split = document.createElement('split-element');
            split.classList.add('row', 'split');
            split.id = `split-${this.idSplit}`; 
            
            // this.style.marginBottom ='150px'
            
            this.style.marginTop ='70px'
            split.style.transform = `translate(10px, 10px)`

            split.innerHTML = 
                `<div class="row split-selected">
                    <select class="select-type">
                        <option value="FBT">FBT</option>
                        <option value="PLC">PLC</option>
                    </select>
                    <select class="select-fiber">
                        <option value="5_95">5/95</option>
                        <option value="10_90">10/90</option>
                        <option value="15_85">15/85</option>
                    </select>
                </div>
                <div class="vertical-center"><input id="in-signal" class="in-split" name="in-signal" value="0"></div>
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
            this.insertAdjacentElement('afterend', split);

        
            line = new LeaderLine(target, split);
            line.setOptions({startSocket: 'right', endSocket: 'left'});
    
            const watchMoveThisSplit = this.parentElement.addEventListener('mousemove', AnimEvent.add(function() {
                    line.position();
            }), false);
        }
        
    }


    calcSignal() {
        let incoming = this.querySelector('.in-split'),
            outcoming = this.querySelectorAll('.out-signal');


            
            console.log('outcoming: ', outcoming);
            console.log('incoming: ', incoming);
    }
}

  customElements.define("split-element", SplitElement);