import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setInput} from '../../store/actions/editor';
import {getInput, getOutput} from '../../store/selectors/editor';

function InOutBox() {
  const input = useSelector(getInput);
  const dispatch = useDispatch();
  const output = useSelector(getOutput);
  const handleChange = (e) => {
    console.log('hello iput is ', e.target.value);
    dispatch(setInput(e.target.value));
  };
  return (
    <div id='inoutbox' className='fsHide resizable' style={{fontSize: '16px'}}>
      <div className='panel-input panel-default'>
        <div className='panel-heading p-2'>
          <span>Input</span>
          <label id='uploadInputFile'>
            <span
              aria-hidden='true'
              className='fa fa-folder-open'
              style={{marginLeft: '5px'}}
            ></span>
            <input type='file' style={{display: 'none'}} />
          </label>
          <a id='copy-input'>
            <i className='fa fa-paperclip'></i>
          </a>
        </div>
        <textarea
          id='test-input'
          rows='2'
          wrap='off'
          placeholder='Enter Input'
          className='textbox w-100'
          onChange={handleChange}
          value={input}
        ></textarea>
      </div>
      <div className='panel-output panel-default'>
        <div className='panel-heading p-2'>
          <span>Output</span>
          <button type='button' id='downloadOutput' className='btn btn-sm btn-menu'>
            <i aria-hidden='true' className='fa fa-download'></i>
          </button>
          <a id='copy-output'>
            <i className='fa fa-paperclip'></i>
          </a>
          <button type='button' id='toggleVerticalPane' className='btn btn-sm btn-menu'>
            <i
              aria-hidden='true'
              className='fa fa-ellipsis-v'
              style={{fontSize: '14px'}}
            ></i>
            <ul className='dropdown-menu'>
              <li>
                <button type='button' className='btn btn-sm btn-menu'>
                  <i
                    className='fa fa-window-maximize fa-rotate-180'
                    style={{marginRight: '4px'}}
                  ></i>
                  Dock to bottom
                  <i aria-hidden='true' className='fa fa-check'></i>
                </button>
              </li>
              <li>
                <button type='button' className='btn btn-sm btn-menu'>
                  <i
                    className='fa fa-window-maximize fa-rotate-90'
                    style={{marginRight: '4px'}}
                  ></i>
                  Dock to right
                </button>
              </li>
            </ul>
          </button>
        </div>
        <pre id='output'>{Buffer.from(output, 'base64').toString('ascii')}</pre>
      </div>
    </div>
  );
}

export default InOutBox;
