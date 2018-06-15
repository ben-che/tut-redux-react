# Redux with React
Before diving into things, it's important to clarify that although Redux is a way to manage state within apps, it can be used outside of the Reat ecosystem, even with other libraries such as Angular or Vue.

State, as a concept, exists outside of React - think about the case of a modal - it can have two states; open or closed. Traditionally, we may have accomplished this by adding an event listener on a button, and then either appending a new element on the DOM, or adding a class to show/hide a pre-existing element. In either case, this modal has a state that can be modeled with:
```
  state: {
    modalOpen : true || false
  }
```

That being said, the reason that Redux and React are used in conjunction so often is because up until recently, React had a poor time managing state the more complex the React application was.