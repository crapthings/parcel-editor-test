import { Editor } from 'slate-react'
import { Inline, Text, Value } from 'slate'
import Plain from 'slate-plain-serializer'

@observer
export default class Comp extends Component {
  state = {
    picker: false,
    value: localStorage.getItem('_value') ? Plain.deserialize(localStorage.getItem('_value')) : Plain.deserialize(''),
  }

  onChange = ({ value }) => {
    const _value = Plain.serialize(value)
    this.setState({ value }, () => {
      localStorage.setItem('_value', _value)
    })
  }

  onFocus = (event, editor, next) => {
    editor.command('moveTo', 'End')
  }

  pickVar = () => {
    this.setState({ picker: !this.state.picker })
  }

  render() {
    const { picker, value } = this.state
    return (
      <>

        <Editor
          id='editor'
          value={value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          renderEditor={this.renderEditor}
        />
      </>
    )
  }

  renderEditor = (props, editor, next) => {
    const { picker, value } = this.state
    const children = next()

    this.editor = editor

    return (
      <div>
        <button onClick={this.pickVar}>选择</button>
          {picker && <div data-value='张宏' onClick={(evt) => {
            editor.command('insertInline', {
              type: 'replace',
              nodes: [Text.create(evt.target.dataset.value)]
            })
          }}>
            张宏
          </div>}
        {children}
      </div>
    )
  }

}
