Vue.directive('number-panel', {
    bind(el, binding) {

        const panelId = 'vue-number-panel';
        const getTargetInput = function() {

            const panel = document.getElementById(panelId);
            const targetInputId = panel.getAttribute('input-id');
            return document.querySelector('[vue-number-panel-input="'+ targetInputId +'"]');

        };
        const onButtonClick = function(e){

            const value = e.target.getAttribute('input');
            const panel = document.getElementById(panelId);
            const targetInput = getTargetInput(panelId);

            if(value === '__CLEAR__') {

                targetInput.value = '';
                targetInput.focus();
                targetInput.dispatchEvent(new Event('input'));

            } else if(value === '__CLOSE__') {

                panel.style.display = 'none';

            } else {

                const selectionStart = targetInput.selectionStart;
                const selectionEnd = targetInput.selectionEnd;
                let currentValue = targetInput.value;

                if(selectionStart !== selectionEnd) {

                    currentValue = [
                        currentValue.substring(0, selectionStart),
                        currentValue.substring(selectionEnd)
                    ].join('');

                }

                const newValues = [
                    currentValue.substring(0, selectionStart),
                    value,
                    currentValue.substring(selectionStart)
                ];
                targetInput.value = newValues.join('');
                targetInput.focus();
                targetInput.selectionStart = selectionStart + 1;
                targetInput.selectionEnd = selectionStart + 1;
                targetInput.dispatchEvent(new Event('input'));

            }

        };
        const makeButton = function(input, text) {

            const button = document.createElement('button');
            button.setAttribute('input', input);
            button.setAttribute('class', 'v-number-panel-button');
            button.innerHTML = text;
            button.addEventListener('click', onButtonClick);
            return button;

        };
        const hasOptions = (binding.value !== undefined);
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        let panelButtons = [];

        for(let i in numbers) {

            const number = numbers[i];
            panelButtons.push(makeButton(number, number));

        }

        if(hasOptions && typeof binding.value.extraInputs == 'object') {

            for(let key in binding.value.extraInputs) {

                const text = binding.value.extraInputs[key];
                panelButtons.push(makeButton(key, text));

            }

        }

        panelButtons.push(makeButton('__CLEAR__', 'C'));
        panelButtons.push(makeButton('__CLOSE__', '&times;'));

        if(document.getElementById(panelId) === null) {

            const panel = document.createElement('div');
            panel.id = panelId;
            panel.style.display = 'none';
            panel.style.position = 'absolute';
            panel.addEventListener('mouseenter', function(e){

                e.target.setAttribute('mouse-hover', 'yes');

            });
            panel.addEventListener('mouseleave', function(e){

                e.target.setAttribute('mouse-hover', '');

            });
            document.body.appendChild(panel);

        }

        const randomKey = Date.now() +'-'+ Math.random().toString(36).substring(7);
        el.setAttribute('vue-number-panel-input', randomKey);
        el.addEventListener('focus', function(e) {

            const input = e.target;
            const rect = input.getBoundingClientRect();
            const top = rect.top;
            const left = rect.left;
            const width = rect.width;
            const height = rect.height;
            const scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            const panel = document.getElementById(panelId);
            const panelInit = (panel.style.display === 'none');
            panel.style.top = (top+height+scrollTop) +'px';
            panel.style.left = (left+scrollLeft) +'px';
            panel.style.width = width +'px';
            panel.style.minWidth = '150px';
            panel.style.display = 'block';
            panel.style.zIndex = '10000';
            panel.setAttribute('input-id', e.target.getAttribute('vue-number-panel-input'));
            panel.innerHTML = '';

            const buttonLength = panelButtons.length;

            for(let i = 0 ; i < buttonLength ; i++) {

                let button = panelButtons[i];
                panel.appendChild(button);

            }

            if(panelInit &&
                hasOptions &&
                binding.value.clear === true) {

                input.value = '';
                input.dispatchEvent(new Event('input'));

            }

        });
        el.addEventListener('blur', function() {

            const panel = document.getElementById(panelId);
            const mouseHover = panel.getAttribute('mouse-hover');

            if(mouseHover !== 'yes') {

                panel.style.display = 'none';

            }

        });

    }
});