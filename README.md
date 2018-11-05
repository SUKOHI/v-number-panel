# v-number-panel
Vue directive for inputing number and additional character in a virtual keyboard.

# Preparation

    <script src="/PATH/TO/PACKAGE/v-number-panel.js"></script>

# Usage

## The Simplest Way

    <input type="text" v-number-panel>

## with Additional inputs

You can input additional character(s).

    <!-- HTML -->
    <input type="text" v-number-panel="numberPanelOptions">
    
    // JS
    new Vue({
        el: '#app',
        data: {
            numberPanelOptions: {
                extraInputs: {
                    '-': 'Dash',
                    '*': 'Asterisk'
                }
            }
        }
    });
    
# License

This package is licensed under the MIT License.

Copyright 2018 Sukohi Kuhoh