import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';


import Skill from '../components/skills/Skill';
import SkillModal from '../components/skills/SkillModal';
import ErrorToast from '../components/errors/ErrorToast';
import domain from '../consts/domain';

export default class Skills extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      skills: [],
      currentSkill: {},
      openModalSkill: false,
      isEdit: false,
      openSnackbar: false,
      errorsOnDelete: []
    }
  }

  componentDidMount(){
    this.loadSkills();
  }

  loadSkills = ()=>{
    axios.get(domain.local+"/api/v1/skills")
    .then((response)=>{
      this.setState({skills: response.data})
    })
  }

  // ADD SKILL IN SKILL LIST
  addSkill = (skill) => {
    this.setState(prevState => {
      return {
        skills: [...prevState.skills, skill]
      }
    })
  }

  // UPDATE SKILL IN SKILL LIST
  updateSkill = (skill) => {
    const i = this.state.skills.findIndex((e) => e.id === skill.id)
    const new_skills = this.state.skills
    new_skills[i] = skill

    this.setState((prevState)=>{
      return{
        skills: new_skills,
      }
    })
  }

  // OPEN MODAL TO NEW SKILL
  newSkill = () => {
    this.setState({
        openModalSkill: true,
        currentSkill: {},
        isEdit: false
    });
  }

  // OPEN MODAL TO EDIT SKILL
  editSkill = (skill) => () => {
    this.setState({
      openModalSkill: true,
      currentSkill: skill,
      isEdit: true
    });
  }

  // DELETE SKILL
  deleteSkill = (skill) => () => {
    axios.delete(domain.local+"/api/v1/skills/"+skill.id)
    .then((response)=>{
      this.setState((prevState)=>{
        return{
          skills: prevState.skills.filter((el)=> el.id !== skill.id)
        }
      })
    })
    .catch((err)=>{
      this.setState({errorsOnDelete: err.response.data.error, openSnackbar: true})
    })
  }

  // CLOSE MODAL OF SKILLS
  closeModalSkill = () => {
    this.setState({openModalSkill: false})
  }

  render(){
    return(
      <div className="row" style={{'padding': '24px'}}>
        <div className="col-xs-12">

        <RaisedButton label="Agregar" onClick={this.newSkill} primary={true} className="button-add"/>
        <SkillModal
          onAdd={this.addSkill} onUpdate={this.updateSkill}
          onDelete={this.deleteSkill} isEdit={this.state.isEdit}
          open={this.state.openModalSkill} onClose={this.closeModalSkill}
          currentSkill={this.state.currentSkill} />

        <h2 >Lista de habilidades </h2>

        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Nombre</TableHeaderColumn>
              <TableHeaderColumn>Acción</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.skills.map((skill) =>{
              return(<Skill skill={skill} key={skill.id} onEdit={this.editSkill} onDelete={this.deleteSkill} />)
            })}
          </TableBody>
        </Table>


        <ErrorToast open={this.state.openSnackbar} errors={this.state.errorsOnDelete} />
        </div>
      </div>
    )
  }






}
