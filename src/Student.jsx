import React from "react";
import "./style.css";
import { student } from "./Mock";

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student,
      selected:null
    };
  }

  render() {

    const onDelete = (id) => {
      const res = this.state.student.filter((value) => value?.id !== id);
      this.setState({ student: res });
    };

      const onFilter = ({ target }) => {
      const { value, name } = target;
      const res = student.filter((item) =>`${item[name]}`.toLowerCase().includes(value.toLowerCase()));
      this.setState({ student: res });
    };
    // const onEdit=(id)=>{
    //   cons res=this.state.selected
    // }
    return (

      <div class="box1">
        <div>
          <h1>Students table </h1>
        </div>
        <div className="input">
        <input onChange={onFilter} name="id" type="number" placeholder="ID" />
        <input onChange={onFilter} name="name" type="text" placeholder="Name" />
        <input onChange={onFilter} name="status" type="text" placeholder="Status"/>
        <input onChange={onFilter} name="age" type="number" placeholder="Age" />
        </div>
         <div className="box">
         <table border="2px">
          <thead>
            <tr>
              <th className="id">ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Age</th>
              <th>Delete/Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.student.map((value) => {
              return (
                <tr key={value.id}>
                  <td className="id">{value.id}</td>
                  <td>{value.name} </td>
                  <td>{value.status}</td>
                  <td>{value.age}</td>
                  <td>
                    <div className="btn">
                    <div class="sardor">
                    <button className="btn1" onClick={() => onDelete(value.id)}>delete</button>
                    </div>
                      {/* <div>
                     {!this.state.selected ?(
                      <button className="btn1" onClick={this.setState({selected:value.id})}>update</button>
                     ):(
                      <button className="btn1" onClick={this.setState({selected:null})}>save</button>
                     )} 
                    </div>   */}
                    </div> 
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
         </div>
        
      </div>
    );
  }
}

export default Student;
