/**
 * 得到layout侧边栏的折叠(收起)状态
 *
 */
export default class Print {
    constructor(dom, options) {
        this.options = { noPrint: '.no-print', ...options };
        if (typeof dom === 'string') {
            try {
                this.dom = document.querySelector(dom);
            } catch {
                const createDom = document.createElement('div');
                createDom.innerHTML = dom;
                this.dom = createDom;
            }
        } else {
            this.dom = this.isDOM(dom) ? dom : dom.$el;
        }
    }

    /**
     * 开始打印
     */
    async start() {
        const content = this.getStyle() + this.getHtml();
        try {
            await this.writeIframe(content);
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(typeof error === 'string' ? error : '打印失败');
        }
    }

    getStyle() {
        let str = '';
        const styles = document.querySelectorAll('style,link');
        for (let i = 0; i < styles.length; i++) {
            str += styles[i].outerHTML;
        }
        str += '<style>' + (this.options.noPrint ? this.options.noPrint : '.no-print') + '{display:none;}</style>';
        str += '<style>html,body{background-color:#fff;}</style>';
        return str;
    }

    getHtml() {
        const inputs = document.querySelectorAll('input');
        const textareas = document.querySelectorAll('textarea');
        const selects = document.querySelectorAll('select');

        for (let k = 0; k < inputs.length; k++) {
            if (inputs[k].type === 'checkbox' || inputs[k].type === 'radio') {
                if (inputs[k].checked === true) {
                    inputs[k].setAttribute('checked', 'checked');
                } else {
                    inputs[k].removeAttribute('checked');
                }
            } else if (inputs[k].type === 'text') {
                inputs[k].setAttribute('value', inputs[k].value);
            } else {
                inputs[k].setAttribute('value', inputs[k].value);
            }
        }

        for (let k2 = 0; k2 < textareas.length; k2++) {
            if (textareas[k2].type === 'textarea') {
                textareas[k2].innerHTML = textareas[k2].value;
            }
        }

        for (let k3 = 0; k3 < selects.length; k3++) {
            if (selects[k3].type === 'select-one') {
                const child = selects[k3].children;
                for (const i in child) {
                    if (child[i].tagName === 'OPTION') {
                        if (child[i].selected === true) {
                            child[i].setAttribute('selected', 'selected');
                        } else {
                            child[i].removeAttribute('selected');
                        }
                    }
                }
            }
        }
        return this.dom.outerHTML;
    }

    writeIframe(content) {
        const that = this;
        return new Promise((resolve, reject) => {
            const iframe = document.createElement('iframe');
            const f = document.body.appendChild(iframe);
            iframe.id = 'myIframe';
            iframe.setAttribute('style', 'position:absolute;width:0;height:0;top:-10px;left:-10px;');
            const win = f.contentWindow || f.contentDocument;
            const doc = f.contentDocument || f.contentWindow.document;
            doc.open();
            doc.write(content);
            doc.close();
            iframe.onload = () => {
                that.toPrint(win);
                setTimeout(() => {
                    document.body.removeChild(iframe);
                }, 100);
                resolve(true);
            };
            iframe.onerror = () => {
                reject('打印预览失败');
            };
        });
    }

    // eslint-disable-next-line class-methods-use-this
    toPrint(frameWindow) {
        try {
            setTimeout(() => {
                frameWindow.focus();
                try {
                    !frameWindow.document.execCommand('print', false, null) && frameWindow.print();
                } catch (e) {
                    frameWindow.print();
                }
                frameWindow.close();
            }, 10);
        } catch (err) {
            console.log('err', err);
        }
    }

    static isDOM(obj) {
        if (typeof HTMLElement === 'object') {
            return obj instanceof HTMLElement;
        } else {
            return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
        }
    }
}
