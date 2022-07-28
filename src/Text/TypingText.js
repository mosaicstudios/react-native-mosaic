import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const wait = async (ms) =>
  await new Promise((resolve) => setTimeout(resolve, ms));
const getOverlap = (start, [...end]) =>
  [...start, NaN].findIndex((char, i) => end[i] !== char);

export default class TypingText extends Component {
  constructor(props) {
    super();
    this.state = {
      steps: props.steps,
      loop: props.loop,
      style: props.style,
      blinkCursor: props.blinkCursor,
      editDelay: props.editDelay,
      deleteDelay: props.deleteDelay,
      blinkingCursorColor: props.blinkingCursorColor,
    };
    this._type = this._type.bind(this);
  }

  componentDidMount() {
    let { loop, steps, blinkCursor } = this.state;
    if (loop === Infinity) {
      this._type(this.text, steps.concat(this._type));
    } else if (typeof loop === 'number')
      this._type(this.text, Array(loop).fill(steps).flat());
    else this._type(this.text, steps);

    if (blinkCursor) {
      setInterval(() => {
        this.setState({ blinkingCursor: !this.state.blinkingCursor });
      }, 500);
    }
  }

  async _type(ref, args) {
    for (const arg of args) {
      switch (typeof arg) {
        case 'string':
          await this._edit(ref, arg);
          break;
        case 'number':
          await wait(arg);
          break;
        case 'function':
          await arg(ref, args);
          break;
        default:
          await arg;
      }
    }
  }

  async _perform(ref, edits, speed = 60) {
    for (const op of this._editor(edits)) {
      op(ref);
      await wait(speed + speed * (Math.random() - 0.5));
    }
  }

  async _edit(ref, text) {
    if (!ref) return;
    const overlap = getOverlap(this.state.text || '', text);
    await this._perform(
      ref,
      [...this._deleter(this.state.text || '', overlap)],
      this.state.deleteDelay
    );
    await this._perform(
      ref,
      [...this._writer(text, overlap)],
      this.state.editDelay
    );
  }

  *_editor(edits) {
    for (const edit of edits) {
      yield (ref) =>
        requestAnimationFrame(() => {
          if (!ref) return;
          this.setState({ text: edit });
        });
    }
  }

  *_writer([...text], startIndex = 0, endIndex = text.length) {
    while (startIndex < endIndex) {
      yield text.slice(0, ++startIndex).join('');
    }
  }

  *_deleter([...text], startIndex = 0, endIndex = text.length) {
    while (endIndex > startIndex) {
      yield text.slice(0, --endIndex).join('');
    }
  }

  render() {
    let { blinkingCursor, style } = this.state;
    return (
      <Text ref={(text) => (this.text = text)} style={style}>
        {this.state.text}
        {blinkingCursor && (
          <Text
            style={{
              color: this.state.blinkingCursorColor,
            }}
          >
            |
          </Text>
        )}
      </Text>
    );
  }
}

TypingText.propTypes = {
  editDelay: PropTypes.number,
  deleteDelay: PropTypes.number,
};

TypingText.defaultProps = {
  steps: ['Design', 1000, 'Develop', 1000, 'Maintain', 1000],
  color: 'black',
  blinkingCursor: true,
  style: { fontSize: 14 },
  editDelay: 80,
  deleteDelay: 80,
  blinkCursor: true,
  blinkingCursorColor: 'black',
};
