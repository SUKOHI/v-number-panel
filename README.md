# v-number-panel
A Vue directive for entering numbers and additional characters with a virtual keyboard.

[Demo](https://demo-laravel52.capilano-fw.com/vue_number_panel)

# Installation

    npm i v-number-panel --save

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
                },
                clear: true // Clear when focus
            }
        }
    });
    
# License

This package is licensed under the MIT License.

Copyright 2018 Sukohi Kuhoh