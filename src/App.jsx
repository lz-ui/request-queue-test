import React, { useState } from 'react'
import { Select } from 'antd';
import Request from './utils/Request'
import RequestQueue from './utils/RequestQueue'
import 'antd/dist/antd.css';
import './App.css'

const { Option } = Select;

function App() {
  const RequestQueueList = new RequestQueue();

  const add = () => {
    for (let i = 0; i < 10; i++) {
      let info = RequestQueueList.enqueue(Request({ url: '/common/ip' }), (res) => {
        console.log(res, RequestQueueList.getSize());
        return res;
      });
      console.log(info);
    };
  };

  const next = () => {
    RequestQueueList.processNext();
  };

  const getSize = () => {
    document.getElementById('count').innerHTML = `queue is:${RequestQueueList.getSize()}`
  };

  const cancel = () => {
    RequestQueueList.cancel();
  };

  const onSearch = (e) => {
    console.log(e);
    let info = RequestQueueList.enqueue(Request({ url: '/common/ip' }), (res) => {
      console.log(res, RequestQueueList.getSize());
      return res;
    });
    console.log(info);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Please open it network slow 3G</h3>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a person"
          optionFilterProp="children"
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
        <div id="count">queue is:0</div>
        <br />
        <button onClick={add}>Add</button>
        <br />
        <button onClick={next} >Next</button>
        <br />
        <button onClick={getSize} >getSize</button>
        <br />
        <button onClick={cancel}>cancel</button>
        <br />
      </header>
    </div>
  )
}

export default App
