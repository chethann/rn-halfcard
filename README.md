# rn-halfcard
Halfcard for React Native.
A flexible Halfcard component for React native with callbacks and adjustable slide duration!

# Demo
![rn-halfcard Demo](https://github.com/chethann/demo-images/blob/master/halfcard-demo.gif)

# Usage

```javascript
  <HalfCard
    ref={component => this.my_halfcard = component}
    slideDuration={500}
    onShow={this.onShow}
    onClose={this.onCloseModalOne}>
      {this.myHalfcardContent()}
  </HalfCard>
}
```

Any valid React Native View can be passed as content of the halfcard.
To open the halfcard call ```this.my_halfcard.show() ``` method and to close call ```this.my_halfcard.close() ``` method.

### Installation
- `npm install --save rn-halfcard`

License
----
MIT
