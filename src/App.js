import React, { Component } from 'react';
import './App.css';
import Messages from "./components/Messages";
import Input from "./components/Input";

function randomName() {
  const partOne = [
    'Happy', 'Brave', 'Clever', 'Lucky', 'Daring', 'Cheerful', 'Eager', 'Friendly', 'Gentle', 'Hopeful', 'Joyful', 'Kind', 'Lively', 'Merry', 'Nimble', 'Polite', 'Quick', 'Silly', 'Tough', 'Witty', 'Zealous', 'Adventurous', 'Ambitious', 'Confident', 'Curious', 'Determined', 'Energetic', 'Enthusiastic', 'Fearless', 'Independent', 'Inquisitive', 'Optimistic', 'Passionate', 'Persistent', 'Resourceful', 'Strong', 'Successful', 'Thoughtful', 'Trustworthy', 'Warm', 'Wise', 'Witty', 'Agreeable', 'Artistic', 'Charismatic', 'Compassionate', 'Considerate', 'Creative', 'Empathetic', 'Funny'
  ];
  const partTwo = [
    'Cat', 'Dog', 'Bear', 'Wolf', 'Tiger', 'Lion', 'Elephant', 'Giraffe', 'Hippo', 'Kangaroo', 'Raccoon', 'Otter', 'Penguin', 'Koala', 'Sloth', 'Zebra', 'Hedgehog', 'Rabbit', 'Panda', 'Fox', 'Deer', 'Monkey', 'Gorilla', 'Whale', 'Shark', 'Dolphin', 'Octopus', 'Seahorse', 'Crab', 'Lobster', 'Butterfly', 'Dragonfly', 'Ladybug', 'Bee', 'Spider', 'Scorpion', 'Mantis', 'Snake', 'Frog', 'Turtle', 'Crocodile', 'Chameleon', 'Owl', 'Eagle', 'Peacock', 'Flamingo', 'Pelican', 'Swan', 'Duck', 'Goose'
  ];
  const one = partOne[Math.floor(Math.random() * partOne.length)];
  const two = partTwo[Math.floor(Math.random() * partTwo.length)];
  return one + " " + two;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("xmX78qQyBLakaXno", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Test Chat-App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default App;
