# scroll-spy

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe scroll-spy here.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

# Usage

Supply the ids of elements you want to monitor while scrolling. The render callback provides the ids of the elements currently in view. Use that to style your navigation bar however you'd like.

```
import ScrollSpy from 'scroll-spy';

const elementIds = ['a', 'b', 'c']

const ScrollExample = () => (
  <div>
    <ScrollSpy elements={elementIds}>
      {(idsInView) => (
        <nav>
          {elementIds.map(id => (
            <div key={id} style={{ fontWeight: idsInView.includes(id) ? 'bold' : 'normal' }}>
              {id}
            </div>
          ))}
        </nav>
      )}
    </ScrollSpy>
    <main>
    {elementIds.map(id => (
      <div key={id}>{id}</div>
    ))}
    </main>
  </div>
)
```

| Props           | Type                   | Description                                                             |
| --------------- | ---------------------- | ----------------------------------------------------------------------- |
| match           | 'first', 'last', 'all' | match either the first, last, or all visible elements. **default: all** |
| elements        | Array<string>          | An array of ids of elements to monitor.                                 |
| children        | (Array<string>         | string) => React.Node                                                   | A render callback containing elements visible. |
| scrollContainer | query string           | Defaults to window.                                                     |
