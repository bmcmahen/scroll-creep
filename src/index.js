// @flow
import * as React from "react";
import rafSchedule from "raf-schd";
import elementInView from "element-in-view";

type Props = {
  match: "first" | "last" | "all",
  elements: Array<string>,
  children: (string | Array<string>) => void,
  scrollContainer?: string,
  updateOnEmpty: boolean
};

type State = {
  elements: Array<HTMLElement>,
  elementsInView: Array<string>
};

function isInView(el) {
  return elementInView(el);
}

function filterNulls<T>(arr: Array<?T>): Array<T> {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] != null) {
      result.push(arr[i]);
    }
  }
  return result;
}

export default class ScrollSpy extends React.Component<Props, State> {
  static defaultProps = {
    match: "all",
    updateOnEmpty: false
  };

  state = {
    elements: [],
    elementsInView: []
  };

  scrollContainer: ?HTMLElement;

  componentDidMount() {
    this.scrollContainer = this.props.scrollContainer
      ? document.querySelector(this.props.scrollContainer)
      : window;

    if (this.scrollContainer) {
      this.scrollContainer.addEventListener("scroll", this.handleScroll, false);
    } else {
      console.warn("Scroll container not found");
    }
    this.buildNodeList();
  }

  componentWillUnmount() {
    if (this.scrollContainer) {
      this.scrollContainer.removeEventListener("scroll", this.handleScroll);
    } else {
      console.warn("Scroll container not found");
    }
  }

  handleScroll = rafSchedule((event?: Event) => {
    if (event) {
      event.preventDefault();
    }
    const { elements } = this.state;

    if (!elements.length) return;

    const idsInView = elements
      .filter(el => !!el)
      .filter(isInView)
      .map(i => i.getAttribute("id"));

    if (idsInView.length === 0 && !this.props.updateOnEmpty) {
      return;
    }

    this.setState({ elementsInView: filterNulls(idsInView) });
  });

  buildNodeList = () => {
    const elements = this.props.elements.map(id => {
      return document.getElementById(id);
    });

    this.setState(
      state => {
        return {
          ...state,
          elements: filterNulls(elements)
        };
      },
      () => this.handleScroll()
    );
  };

  render() {
    return this.props.children(this.getEls());
  }

  getEls = () => {
    if (this.props.match === "last") {
      return this.state.elementsInView[this.state.elementsInView.length - 1];
    }

    if (this.props.match === "first") {
      return this.state.elementsInView[0];
    }

    return this.state.elementsInView;
  };
}
