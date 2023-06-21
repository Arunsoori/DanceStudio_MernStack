// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import "./chat.css";
// import { userDetails, sendMessage } from "../../services/userApi";

// function GroupList({ handleGroupClick }) {
//   const [groups, setGroups] = useState([]);

//   useEffect(() => {
//     userDetails()
//       .then((response) => {
//         console.log(response.data.user.enrolledCouseId);
//         setGroups(response.data.user.enrolledCouseId);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const joinGroup = (groupId) => {
//     handleGroupClick(groupId);
//   };

//   return (
//     <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
//       <div className="users-container">
//         <div className="chat-search-box">
//           <div className="input-group">
//             <input className="form-control" placeholder="Search" />
//             <div className="input-group-btn">
//               <button type="button" className="btn btn-info">
//                 <i className="fa fa-search" />
//               </button>
//             </div>
//           </div>
//         </div>
//         {groups && (
//           <ul className="users">
//             {groups.map((group) => (
//               <li
//                 className="person"
//                 key={group.courseId}
//                 onClick={() => joinGroup(group.groupId)}
//               >
//                 <div className="user">
//                   <img
//                     src={`${process.env.REACT_APP_BASE_URL}/${group.image_url}`}
//                     alt="image"
//                   />
//                   <span className="status busy" />
//                 </div>
//                 <p className="name-time">
//                   <span className="name">{group.coursename}</span>
//                   {/* Time or other information */}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// function GroupChat({ selectedGroup }) {
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [messageInput, setMessageInput] = useState("");
//   const [newSocket, setNewSocket] = useState(null);

//   useEffect(() => {
//     // Connect to the Socket.io server
//     newSocket = io("http://localhost:4000");
//     setSocket(newSocket);

//     // Join the group room
//     newSocket.emit("joinRoom", selectedGroup);

//     // Receive new messages
//     newSocket.on("receiveMessage", (newMessage) => {
//       console.log(newMessage, "newmessage");
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     // Clean up the socket connection
//     return () => {
//       newSocket.emit("leaveRoom", selectedGroup);
//       newSocket.disconnect();
//     };
//   }, [selectedGroup]);

//   const handleSendMessage = () => {
//     if (socket && messageInput.trim() !== "") {
//       sendMessage(selectedGroup, messageInput)
//         .then((response) => {
//           console.log(response.data, "rspoooooooooo");
//           // setMessageInput(""); // Clear the input field after sending

//           newSocket.emit('sendMessage', {})
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   };

//   return (
//     <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
//       <div className="selected-user">
//         <span>
//           To: <span className="name">{selectedGroup}</span>
//         </span>
//       </div>
//       {messages.length > 0 && (
//         <div className="chat-container">
//           {/* Render group chat messages here */}
//           {messages.map((message) => (
//             <p key={message._id}>{message.message}</p>
//           ))}
//         </div>
//       )}
//       <div className="form-group mt-3 mb-0">
//         <textarea
//           className="form-control"
//           rows={3}
//           placeholder="Type your message here..."
//           value={messageInput}
//           onChange={(e) => setMessageInput(e.target.value)}
//         />
//         <button onClick={handleSendMessage}>Send Message</button>
//       </div>
//     </div>
//   );
// }

// function Chat() {
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   const handleGroupClick = (group) => {
//     setSelectedGroup(group);
//   };

//   return (
//     <div>
//       <link
//         href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
//         rel="stylesheet"
//       />
//       <div className="container">
//         {/* Page header start */}
//         <div className="page-title">
//           <div className="row gutters">
//             <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//               <h5 className="title">Chat App</h5>
//             </div>
//             <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
//           </div>
//         </div>
//         {/* Page header end */}
//         {/* Content wrapper start */}
//         <div className="content-wrapper">
//           {/* Row start */}
//           <div className="row gutters">
//             <GroupList handleGroupClick={handleGroupClick} />
//             {selectedGroup && <GroupChat selectedGroup={selectedGroup} />}
//           </div>
//           {/* Row end */}
//         </div>
//         {/* Content wrapper end */}
//       </div>
//     </div>
//   );
// }

// export default Chat;
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./chat.css";
import {
  userDetails,
  sendMessage,
  messageDetails,
} from "../../services/userApi";

function GroupList({ handleGroupClick }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    userDetails()
      .then((response) => {
        console.log(response.data.user.enrolledCouseId);
        setGroups(response.data.user.enrolledCouseId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const joinGroup = (groupId) => {
    handleGroupClick(groupId);
  };

  return (
    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
      <div className="users-container">
        <div className="chat-search-box">
          <div className="input-group">
            <input className="form-control" placeholder="Search" />
            <div className="input-group-btn">
              <button type="button" className="btn btn-info">
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </div>
        {groups && (
          <ul className="users">
            {groups.map((group) => (
              <li
                className="person"
                key={group.courseId}
                onClick={() => joinGroup(group.groupId)}
              >
                <div className="user">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/${group.image_url}`}
                    alt="image"
                  />
                  <span className="status busy" />
                </div>
                <p className="name-time">
                  <span className="name">{group.coursename}</span>
                  {/* Time or other information */}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function GroupChat({ selectedGroup }) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [newSocket, setNewSocket] = useState(null);
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    // Connect to the Socket.io server
    const socketInstance = io("http://localhost:4000");
    setNewSocket(socketInstance);
    setSocket(socketInstance);

    messageDetails(selectedGroup).then((response) => {
      console.log(response.data, "messagedetails");
      setMessages(response.data.messageDetails);
      setGroups(response.data.groupdetails);
    });

    // Join the group room
    socketInstance.emit("joinRoom", selectedGroup);

    // Receive new messages
    socketInstance.on("receiveMessage", (newMessage) => {
      console.log(newMessage, "newmessage");
      setMessages((prevMessage) => [...prevMessage, newMessage.newMessage]);
      setMessageInput("");
    });

    // Clean up the socket connection
    return () => {
      socketInstance.emit("leaveRoom", selectedGroup);
      socketInstance.disconnect();
    };
  }, [selectedGroup]);

  const handleSendMessage = () => {
    if (socket && messageInput.trim() !== "") {
      sendMessage(selectedGroup, messageInput)
        .then((response) => {
          console.log(response.data, "rspoooooooooo");
          // setMessageInput(""); // Clear the input field after sending

          newSocket.emit("sendMessage", response.data.newMessage);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
      {console.log("hhhhhhhhhhhjjjjjj", messages)}

      {groups && (
        <div className="selected-user">
          <span>
            To: <span className="name">{groups.name}</span>
          </span>
        </div>
      )}
      {/* } */}

      {/* {messages.length > 0 && (
        <div className="chat-container " style={{height:'500px', overflowY:'scroll',overflowX: 'hidden' }}>
          {/* Render group chat messages here */}

      {/* {messages.map((message) => {

            
            return (
             <div className="messagebox">
            <p className="sender" >{message.sender.firstName}</p>

              <p key={message._id}>{message.message}</p>
             </div>
            
             )
          }
          )}
        </div>
        
      )} */}

      {messages.length > 0 && (
        <div
          className="chat-container "
          style={{ height: "500px", overflowY: "scroll", overflowX: "hidden" }}
        >
          Render group chat messages here
          {messages.map((message) => {
            return (
              <div className="message info" key={message._id}>
                {/* <img alt className="img-circle medium-image" src="https://bootdey.com/img/Content/avatar/avatar1.png" /> */}
                <div className="message-body">
                  <div className="message-info">
                    <h4> {message.sender.firstName} </h4>
                    <h5>
                      <i className="fa fa-clock-o" /> {message.createdAt}
                    </h5>
                  </div>
                  <hr />
                  <div className="message-text"><p>{message.message}</p> </div>
                </div>
                <br />
              </div>
            );
          })}
        </div>
      )}

     

      <div className="form-group mt-3 mb-0">
        <textarea
          className="form-control"
          rows={3}
          placeholder="Type your message here..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button className="purchasebtn mt-3" onClick={handleSendMessage}>
          Send Message
        </button>
      </div>
    </div>
  );
}

function Chat() {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div className="container">
        {/* Page header start */}
        <div className="page-title">
          <div className="row gutters">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <h2 className="title">Community </h2>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
          </div>
        </div>
        {/* Page header end */}
        {/* Content wrapper start */}
        <div className="content-wrapper">
          {/* Row start */}
          <div className="row gutters">
            <GroupList handleGroupClick={handleGroupClick} />
            {selectedGroup && <GroupChat selectedGroup={selectedGroup} />}
          </div>
          {/* Row end */}
        </div>
        {/* Content wrapper end */}
      </div>
    </div>
  );
}

export default Chat;
