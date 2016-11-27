# rn-halfcard
Halfcard for React Native. 
A flexible Halfcard component for React native with callbacks and adjustable slide duration!

# Demo
![rn-halfcard Demo](https://github.com/chethann/rn-halfcard/blob/master/demo/demo.gif)

# Usage

```javascript
  <HalfCard
    ref={component => this.my_halfcard = component}
    slideDuration={500}
    onShow={this.onShow}
    onClose={this.onCloseModalOne}>
    {this.halfcardOneContent()}
  </HalfCard>
}
```

To open the halfcard call ```this.my_halfcard.show() ``` method and to close call ```this.my_halfcard.close() ``` method!



