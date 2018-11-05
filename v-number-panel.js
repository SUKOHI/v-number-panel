Vue.directive('number-panel', {
    bind: function(el, binding) {

        var panelId = 'vue-number-panel';

        if(document.getElementById(panelId) == null) {

            var getTargetInput = function() {

                var panel = document.getElementById(panelId);
                var targetInputId = panel.getAttribute('input-id');
                return document.querySelector('[vue-number-panel-input="'+ targetInputId +'"]');

            };
            var panelButtons = [];
            var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

            for(var i in numbers) {

                var number = numbers[i];
                panelButtons.push('<button class="vue-number-panel-button" input="'+ number +'">'+ number +'</button>');

            }

            if(binding.value && typeof binding.value.extraInputs == 'object') {

                for(var key in binding.value.extraInputs) {

                    var text = binding.value.extraInputs[key];
                    panelButtons.push('<button class="vue-number-panel-button" input="'+ key +'">'+ text +'</button>');

                }

            }

            panelButtons.push('<button class="vue-number-panel-button" input="c">c</button>');
            panelButtons.push('<button class="vue-number-panel-button" input="x">&times;</button>');

            var panel = document.createElement('div');
            panel.id = panelId;
            panel.innerHTML = '<div>'+ panelButtons.join('') +'</div>';
            panel.style.display = 'none';
            panel.style.position = 'absolute';
            panel.addEventListener('mouseenter', function(e){

                e.target.setAttribute('mouse-hover', 'yes');

            });
            panel.addEventListener('mouseleave', function(e){

                e.target.setAttribute('mouse-hover', '');

            });
            document.body.appendChild(panel);

            var buttons = document.getElementsByClassName('vue-number-panel-button');

            for(var i = 0; i < buttons.length; i++) {

                var button = buttons[i];
                var input = button.getAttribute('input');

                if(input == 'c') {

                    button.addEventListener('click', function() {

                        var targetInput = getTargetInput(panelId);
                        targetInput.value = '';
                        targetInput.focus();
                        targetInput.dispatchEvent(new Event('input'));

                    });

                } else if(input == 'x') {

                    button.addEventListener('click', function() {

                        var panel = document.getElementById(panelId);
                        panel.style.display = 'none';

                    });

                } else {

                    button.addEventListener('click', function(e) {

                        var input = e.target.getAttribute('input');
                        var targetInput = getTargetInput(panelId);
                        var currentValue = targetInput.value;
                        var selectionStart = targetInput.selectionStart;
                        var selectionEnd = targetInput.selectionEnd;

                        if(selectionStart != selectionEnd) {

                            currentValue = [
                                currentValue.substring(0, selectionStart),
                                currentValue.substring(selectionEnd)
                            ].join('');

                        }

                        var newValues = [
                            currentValue.substring(0, selectionStart),
                            input,
                            currentValue.substring(selectionStart)
                        ];
                        targetInput.value = newValues.join('');
                        targetInput.focus();
                        targetInput.selectionStart = selectionStart + 1;
                        targetInput.selectionEnd = selectionStart + 1;
                        targetInput.dispatchEvent(new Event('input'));

                    });

                }

            }

        }

        var randomKey = Date.now() +'-'+ Math.random().toString(36).substring(7);
        el.setAttribute('vue-number-panel-input', randomKey);
        el.addEventListener('focus', function(e) {

            var rect = e.target.getBoundingClientRect();
            var top = rect.top;
            var left = rect.left;
            var width = rect.width;
            var height = rect.height;
            var scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            var panel = document.getElementById(panelId);
            panel.style.top = (top+height+scrollTop) +'px';
            panel.style.left = (left+scrollLeft) +'px';
            panel.style.width = width +'px';
            panel.style.minWidth = '150px';
            panel.style.display = 'block';
            panel.style.zIndex = '10000';
            panel.setAttribute('input-id', e.target.getAttribute('vue-number-panel-input'))

        });
        el.addEventListener('blur', function() {

            var panel = document.getElementById(panelId);
            var mouseHover = panel.getAttribute('mouse-hover');

            if(mouseHover != 'yes') {

                panel.style.display = 'none';

            }

        });

    }
});