import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';

import domain from '../consts/domain';


export default class EmployeeHeader extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      dataSouce: [],
      dataSourceConfig: {
        text: 'textKey',
        value: 'valueKey',
      }
    }
  }

  autocompleteText = (value)=>{
    axios.get(domain.local+"/api/v1/employees/autocomplete?term="+value)
    .then((response)=>{
      this.setState({dataSource: response.data.map((el)=>{
        var obj = {};
        obj.textKey = el.name;
        obj.valueKey = el.id
        return obj
      })})
    })
  }

  selectElementAutocomplete = (value) => {
    this.props.onSelected(value)
  }

  render(){
    return(
      <div>
        <h2 >Lista de trabajadores </h2>
        <AutoComplete hintText="Busque por nombre" dataSource={this.state.dataSource} onUpdateInput={this.autocompleteText} onNewRequest={this.selectElementAutocomplete} dataSourceConfig={this.state.dataSourceConfig}/>
        <RaisedButton label="Todos" onClick={this.props.onAll} secondary={true} className="margin-left"/>
        <div className='container-colors'>
          <div className='employee-active'></div><span>Activados</span>
          <div className='employee-desactive'></div><span>Desactivados</span>
        </div>
      </div>
    )
  }
}
