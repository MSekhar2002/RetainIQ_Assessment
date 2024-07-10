import "./styles.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, message, Dropdown, Menu } from "antd";

export default function App() {
  const [users, setUsers] = useState([
    {
      id: "1",
      "Product Filter": "Filter1",
      "Primary Varient": "Image",
    },
    {
      id: "2",
      "Product Filter": "Filter2",
      "Primary Varient": "Image",
    },
    {
      id: "3",
      "Product Filter": "Filter3",
      "Primary Varient": "Image",
    },
  ]);

  const [columns, setColumns] = useState(["Primary Varient"]);

  const [messageApi, contextHolder] = message.useMessage();

  const stateAdded = () => {
    messageApi.open({
      type: "success",
      content: "State Added",
    });
  };

  const stateRemoved = () => {
    messageApi.open({
      type: "success",
      content: "State Removed!",
    });
  };

  const addVarient = () => {
    messageApi.open({
      type: "success",
      content: "Variant Added",
    });
  };

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(users);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setUsers(tempData);
  };

  const handleAddRow = () => {
    const newRow = {
      id: `${users.length + 1}`,
      "Product Filter": (
        <button className="btn btn-light ml-2">+ Add Product Filter </button>
      ),
      "Primary Varient": (
        <button className="btn btn-light ml-2">+ Add Design</button>
      ),
    };
    setUsers([...users, newRow]);
    stateAdded();
  };

  const handleDeleteRow = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    stateRemoved();
  };

  const handleAddColumn = () => {
    setColumns([...columns, `New Variant ${columns.length}`]);
    addVarient();
  };

  const handleDeleteColumn = (index) => {
    const updatedColumns = columns.filter((_, i) => i !== index);
    setColumns(updatedColumns);
    const updatedUsers = users.map((user) => {
      const newUser = { ...user };
      delete newUser[columns[index]];
      return newUser;
    });
    setUsers(updatedUsers);
  };

  return (
    <div className="App d-flex">
      {contextHolder}
      <div className="d-flex flex-column align-items-center bg-dark p-3">
        <button className="btn btn-success mb-3">+</button>
      </div>
      <div className="flex-grow-1 p-3 ">
        <div className="bg-light p-3 mb-2"></div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="" style={{ overflowX: "auto" }}>
            <table
              style={{
                tableLayout: "fixed",
                overflowX: "hidden",
              }}
              className="table table-hover"
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "center",
                      width: "100px",
                    }}
                  />
                  <th
                    style={{
                      color: "grey",
                      textAlign: "center",
                      width: "220px",
                    }}
                  >
                    Product Filter
                  </th>
                  {columns.map((col, index) => (
                    <th
                      style={{ width: "170px", color: "grey" }}
                      className="text-center"
                      key={index}
                    >
                      {col}{" "}
                      {
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item
                                key="1"
                                onClick={() => handleDeleteColumn(index)}
                              >
                                Delete
                              </Menu.Item>
                            </Menu>
                          }
                          placement="bottom"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-three-dots-vertical"
                            viewBox="0 0 16 16"
                          >
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                          </svg>
                        </Dropdown>
                      }
                    </th>
                  ))}
                  <th
                    style={{
                      textAlign: "center",
                      width: "100px",
                    }}
                  />
                </tr>
              </thead>
              <Droppable droppableId="droppable-1">
                {(provider) => (
                  <tbody
                    className="text-capitalize"
                    ref={provider.innerRef}
                    {...provider.droppableProps}
                  >
                    {users.map((user, index) => (
                      <Draggable
                        key={user.id}
                        draggableId={user.id}
                        index={index}
                      >
                        {(provider) => (
                          <tr
                            {...provider.draggableProps}
                            ref={provider.innerRef}
                          >
                            <td {...provider.dragHandleProps}>
                              <button
                                className="btn delete-btn"
                                onClick={() => handleDeleteRow(index)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-trash3"
                                  viewBox="0 0 16 16"
                                  color="red"
                                >
                                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                </svg>
                              </button>
                              <span
                                style={{ fontSize: "20px", padding: "6px" }}
                              >
                                {index + 1}
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="currentColor"
                                className="bi bi-grid-3x3-gap-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                              </svg>{" "}
                            </td>
                            <td className="text-center">
                              {user["Product Filter"]}{" "}
                            </td>
                            <td className="text-center">
                              {user["Primary Varient"]}
                            </td>
                            {columns.slice(1).map((col, colIndex) => (
                              <td key={colIndex} className="text-center">
                                <button className="btn btn-light ml-2">
                                  + Add Design
                                </button>
                              </td>
                            ))}
                            <td className="text-center">
                              <button
                                className="btn btn-light ml-2"
                                onClick={handleAddColumn}
                              >
                                +
                              </button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provider.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </div>
        </DragDropContext>
        <div className="mb-3 d-flex align-items-center">
          <button className="btn btn-light mr-2" onClick={handleAddRow}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
