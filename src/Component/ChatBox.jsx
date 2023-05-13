import React, { Component } from "react";
import io from "socket.io-client";

export default class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      message: "",
      messages: [],
    };
    this.socket = null;
  }

  componentDidMount() {
    this.socket = io("http://localhost:8000");

    this.socket.on("message", (data) => {
      const messages = [...this.state.messages];
      messages.push(data);
      this.setState({ messages });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleJoin = (e) => {
    e.preventDefault();
    const { username } = this.state;
    if (username) {
      this.socket.emit("join", username);
    }
    console.log();
  };

  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, message } = this.state;
    if (username && message) {
      this.socket.emit("message", message);
      this.setState({ message: "" });
    }
    console.log(this.state.messages);
  };

  render() {
    return (
      <div className="mainContainer">
        <div className="userContainer">
          <h4>Enter Name to join Chat</h4>
          <form onSubmit={this.handleJoin}>
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
            <button type="submit">Join</button>
          </form>
        </div>

        <div className="msgContainer">
          <ul>
            {this.state.messages.map((data, index) => (
              <li key={index} className="message">
                <strong>{data.username}:</strong> {data.message}
              </li>
            ))}
          </ul>
        </div>

        <div className="sendContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-8">
                <input
                  type="text"
                  value={this.state.message}
                  onChange={this.handleMessageChange}
                  className="form-control"
                />
              </div>
              <div className="col">
                <button type="submit" className="btn btn-dark">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
