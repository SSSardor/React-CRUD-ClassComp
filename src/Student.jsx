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
  // *************************************************
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

    const onSelect = (value) => {
      this.setState({ selected: value });
    };
    // input disable
    const getDisabled = (id) => {
      return this.state.selected?.id !== id;
    };
    //Cancel
    const onCancel = () => {
      this.setState({ selected: null });
    };
    //Save
    const onSave = () => {
      console.log(this.state);
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
      console.log(res, "resss");
      this.setState({ student: res, selected: null });
    };
    //Change
    const onChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    };

    //********************************* */
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
        {/* *************************************************** */}
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
            {/***************************/}
            <tbody>
              {this.state.student.map((value) => {
                const { id, name, status, age } = value;
                return (
                  <tr key={value.id}>
                    <td className="id">
                      <input disabled={true} defaultValue={id} type="text" />
                    </td>
                    <td>
                      <input
                        disabled={getDisabled(id)}
                        defaultValue={name}
                        type="text"
                        onChange={onChange}
                      />
                    </td>
                    <td>
                      <input
                        disabled={getDisabled(id)}
                        defaultValue={status}
                        type="text"
                        onChange={onChange}
                      />
                    </td>
                    <td>
                      <input
                        disabled={getDisabled(id)}
                        defaultValue={age}
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
                              onClick={() => onCancel(id)}
                            >
                              {" "}
                              cancel
                            </button>
                            <button
                              className="btn1"
                              onClick={() => onSave(value)}
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
                              delete{" "}
                            </button>
                            <button
                              className="btn1"
                              onClick={() => onSelect(value)}
                            >
                              {" "}
                              edit{" "}
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
