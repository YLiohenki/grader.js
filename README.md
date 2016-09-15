# Grader.js
Create interactive gradient animation on any html element with this small (< 10kB) .js library.

**See the [demo site](https://yliohenki.github.io/grader.js)**.

### Static

* Download the script in the `dist/` folder

## How to use
```html
<!-- Choose some html element a <canvas> element -->
<div id="grader-element"></div>

<!-- Call the script -->
<script src="granim.min.js"></script>

<!-- Create a Granim instance -->
<script>
var granimInstance = new Granim({
   element: '#grader-element',
   name: 'some-grader',
   opacity: [1, 1],
   states : {
       "default-state": {
           gradients: [
               ['#834D9B', '#D04ED6'],
               ['#1CD8D2', '#93EDC7']
           ]
       }
   }
});
</script>
```
Insiper by sarcadass/granim.js (which allows create gradient animations on canvas elements).
