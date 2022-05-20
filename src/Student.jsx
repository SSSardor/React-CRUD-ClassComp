import React from "react";
import "./style.css";
import { student } from "./Mock";

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student,
      name: "",
      status: "",
      age: "",
      selected: {},
    };
  }
  // *******************************************************************************************
  render() {
    //delete
    const onDelete = (id) => {
      const res = this.state.student.filter((value) => value?.id !== id);
      this.setState({ student: res });
    };
    // search
    const onFilter = ({ target }) => {
      const { value, name } = target;
      const res = student.filter((item) =>
        `${item[name]}`.toLowerCase().includes(value.toLowerCase())
      );
      this.setState({ student: res });
    };

    //edit
    const onSelect = (item) => {
      this.setState({ selected: item,...item });
    };
    const onBorder=(id)=>{
      if(id==this.state.selected?.id){
        return "1px solid black"
      }else{
        return "none"
      }

    }
    // input disable

    const getDisabled = (id) => {
      return this.state.selected?.id !== id;
    };

    //Cancel
    const onCancel = () => {
      let res = this.state.student.map((value) => {
        return this.state.selected?.id === value.id
          ? {
              ...value,
              name: this.state.selected.name,
              age: this.state.selected.age,
              status: this.state.selected.status,
            }
          : value;
      });
    
      this.setState({ student: res, selected: null });
    };
    

    //Save
    const onSave = () => {

      let res = this.state.student.map((value) => {
        return this.state.selected?.id === value.id
          ? {
              ...value,
              name: this.state.name,
              age: this.state.age,
              status: this.state.status,
            }
          : value;
      });
    
      this.setState({ student: res, selected: null });
    };

    //Change
    const onChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
      // this.setState({ [name]: value });
    };

    //***********************   Filter input qismi */
    return (
      <div className="box1">
        <div>
          <h1>Students table </h1>
        </div>
        <div className="input">
          <input onChange={onFilter} name="id" type="number" placeholder="ID" />
          <input
            onChange={onFilter}
            name="name"
            type="text"
            placeholder="Name"
          />
          <input
            onChange={onFilter}
            name="status"
            type="text"
            placeholder="Status"
          />
          <input
            onChange={onFilter}
            name="age"
            type="number"
            placeholder="Age"
          />
        </div>
        {/* ******************************* Thead table ******************** */}
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
            {/****************** Tbody table Change input *********/}
            <tbody>
              {this.state.student.map((item) => {
                const { id, name, status, age } = item;
                return (
                  <tr key={id}>
                    <td className="id">
                     {id} 
                    </td>
                    <td>
                      <input
                      style={{border:onBorder(id)}}
                        disabled={getDisabled(id)}
                        value={getDisabled(id)?name:this.state.name}
                        name="name"
                        type="text"
                        onChange={onChange}
                      />
                    </td>
                    <td>
                      <input
                       style={{border:onBorder(id)}}
                        disabled={getDisabled(id)}
                        value={getDisabled(id)?status:this.state.status}
                        name="status"
                        type="text"
                        onChange={onChange}
                      />
                    </td>
                    <td>
                      <input
                       style={{border:onBorder(id)}}
                        disabled={getDisabled(id)}
                        value={getDisabled(id)?age:this.state.age}
                        name="age"
                        type="text"
                        onChange={onChange}
                      />
                    </td>

                    <td>

                      <div className="sardor">
                        {!getDisabled(id) ? (
                          <>
                            <button
                              className="btn1"
                              onClick={() => onCancel(item)}
                            >
                              cancel
                            </button>
                            <button
                              className="btn1"
                              onClick={() => onSave(id)}
                            >
                              save
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn1"
                              onClick={() => onDelete(id)}
                            >
                              {" "}
                              delete
                            </button>
                            <button
                              className="btn1"
                              onClick={() => onSelect(item)}
                            >
                              edit
                            </button>
                          </>
                        )}
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
