# Grader.js
Create interactive gradient animation on any html element with this small (< 10kB) .js library.

Currently (2016-September-15), only IE10+ supports gradients animation. This library allows you create gradient animation in IE9+, Chrome, FF, Opera with additional functionality (like multi-state support, animation loop, pause/resume, easy list of gradients animation etc.)

**See the [demo site](https://yliohenki.github.io/grader.js)**.

### Static

* Download the script in the `dist/` folder

## How to use
```html
<!-- Choose some html element -->
<div id="grader-element"></div>

<!-- Call the script -->
<script src="grader.min.js"></script>

<!-- Create a Grader instance -->
<script>
var graderInstance = new Grader({
   element: '#grader-element',
   name: 'some-grader',
   opacity: [1, 1],
   states : {
       "default-state": {
           gradients: [
               [{color: '#834D9B'}, {color: '#D04ED6'}],
               [{color: '#1CD8D2'}, {color: '#93EDC7'}]
           ]
       }
   }
});
</script>
```
Insiper by sarcadass/granim.js (which allows create gradient animations on canvas elements).
