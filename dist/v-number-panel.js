'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.directive('number-panel', {
    bind: function bind(el, binding) {

        var panelId = 'vue-number-panel';
        var getTargetInput = function getTargetInput() {

            var panel = document.getElementById(panelId);
            var targetInputId = panel.getAttribute('input-id');
            return document.querySelector('[vue-number-panel-input="' + targetInputId + '"]');
        };
        var onButtonClick = function onButtonClick(e) {

            var value = e.target.getAttribute('input');
            var panel = document.getElementById(panelId);
            var targetInput = getTargetInput(panelId);

            if (value === '__CLEAR__') {

                targetInput.value = '';
                targetInput.focus();
                targetInput.dispatchEvent(new Event('input'));
            } else if (value === '__CLOSE__') {

                panel.style.display = 'none';
            } else {

                var selectionStart = targetInput.selectionStart;
                var selectionEnd = targetInput.selectionEnd;
                var currentValue = targetInput.value;

                if (selectionStart !== selectionEnd) {

                    currentValue = [currentValue.substring(0, selectionStart), currentValue.substring(selectionEnd)].join('');
                }

                var newValues = [currentValue.substring(0, selectionStart), value, currentValue.substring(selectionStart)];
                targetInput.value = newValues.join('');
                targetInput.focus();
                targetInput.selectionStart = selectionStart + 1;
                targetInput.selectionEnd = selectionStart + 1;
                targetInput.dispatchEvent(new Event('input'));
            }
        };
        var makeButton = function makeButton(input, text) {

            var button = document.createElement('button');
            button.setAttribute('input', input);
            button.setAttribute('class', 'v-number-panel-button');
            button.innerHTML = text;
            button.addEventListener('click', onButtonClick);
            return button;
        };
        var hasOptions = binding.value !== undefined;
        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        var panelButtons = [];

        for (var i in numbers) {

            var number = numbers[i];
            panelButtons.push(makeButton(number, number));
        }

        if (hasOptions && _typeof(binding.value.extraInputs) == 'object') {

            for (var key in binding.value.extraInputs) {

                var text = binding.value.extraInputs[key];
                panelButtons.push(makeButton(key, text));
            }
        }

        panelButtons.push(makeButton('__CLEAR__', 'C'));
        panelButtons.push(makeButton('__CLOSE__', '&times;'));

        if (document.getElementById(panelId) === null) {

            var panel = document.createElement('div');
            panel.id = panelId;
            panel.style.display = 'none';
            panel.style.position = 'absolute';
            panel.addEventListener('mouseenter', function (e) {

                e.target.setAttribute('mouse-hover', 'yes');
            });
            panel.addEventListener('mouseleave', function (e) {

                e.target.setAttribute('mouse-hover', '');
            });
            document.body.appendChild(panel);
        }

        var randomKey = Date.now() + '-' + Math.random().toString(36).substring(7);
        el.setAttribute('vue-number-panel-input', randomKey);
        el.addEventListener('focus', function (e) {

            var input = e.target;
            var rect = input.getBoundingClientRect();
            var top = rect.top;
            var left = rect.left;
            var width = rect.width;
            var height = rect.height;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            var panel = document.getElementById(panelId);
            var panelInit = panel.style.display === 'none';
            panel.style.top = top + height + scrollTop + 'px';
            panel.style.left = left + scrollLeft + 'px';
            panel.style.width = width + 'px';
            panel.style.minWidth = '150px';
            panel.style.display = 'block';
            panel.style.zIndex = '10000';
            panel.setAttribute('input-id', e.target.getAttribute('vue-number-panel-input'));
            panel.innerHTML = '';

            var buttonLength = panelButtons.length;

            for (var _i = 0; _i < buttonLength; _i++) {

                var button = panelButtons[_i];
                panel.appendChild(button);
            }

            if (panelInit && hasOptions && binding.value.clear === true) {

                input.value = '';
                input.dispatchEvent(new Event('input'));
            }
        });
        el.addEventListener('blur', function () {

            var panel = document.getElementById(panelId);
            var mouseHover = panel.getAttribute('mouse-hover');

            if (mouseHover !== 'yes') {

                panel.style.display = 'none';
            }
        });
    }
});